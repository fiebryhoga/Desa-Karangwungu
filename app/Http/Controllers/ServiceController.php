<?php

namespace App\Http\Controllers;

use App\Models\LegalProduct;
use App\Models\LetterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $type = $request->query('type');
        $year = $request->query('year');
        $status = $request->query('status');

        $query = LegalProduct::active();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('document_number', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (!empty($type) && $type !== 'all') {
            $query->where('document_type', $type);
        }

        if (!empty($year) && $year !== 'all') {
            $query->where('year', $year);
        }

        if (!empty($status) && $status !== 'all') {
            $query->where('status', $status);
        }

        $legalProducts = $query->orderBy('year', 'desc')
            ->orderBy('effective_date', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        $availableTypes = [
            'Keputusan Kepala Desa (SK)',
            'Peraturan Desa (Perdes)',
            'Peraturan Bersama Kepala Desa',
            'Keputusan BPD',
        ];

        $availableYears = LegalProduct::active()
            ->select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        return Inertia::render('Services/Index', [
            'legalProducts' => $legalProducts,
            'availableTypes' => $availableTypes,
            'availableYears' => $availableYears ?: [(int) date('Y')],
            'filters' => [
                'search' => $search ?? '',
                'type' => $type ?? 'all',
                'year' => $year ?? 'all',
                'status' => $status ?? 'all',
            ],
        ]);
    }

    public function downloadLegalProduct($id)
    {
        $product = LegalProduct::findOrFail($id);
        $product->increment('download_count');

        if (!empty($product->file_url)) {
            $path = public_path(ltrim($product->file_url, '/'));
            if (file_exists($path)) {
                return response()->download($path, $product->file_name ?: basename($path));
            }
        }

        return redirect()->back()->with('error', 'Berkas dokumen belum tersedia untuk diunduh.');
    }

    public function create(Request $request)
    {
        $selectedService = $request->query('type', 'sku');

        return Inertia::render('Services/Request', [
            'defaultType' => $selectedService,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'citizen_name' => 'required|string|max:150',
            'citizen_nik' => 'required|string|size:16|regex:/^[0-9]+$/',
            'citizen_phone' => 'required|string|max:20',
            'citizen_address' => 'required|string|max:255',
            'letter_type' => 'required|string|max:100',
            'purpose' => 'required|string|max:500',
        ], [
            'citizen_nik.size' => 'NIK harus berjumlah 16 digit angka.',
            'citizen_nik.regex' => 'NIK hanya boleh memuat angka.',
        ]);

        $code = 'KW-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        $letter = LetterRequest::create([
            'tracking_code' => $code,
            'citizen_name' => $validated['citizen_name'],
            'citizen_nik' => $validated['citizen_nik'],
            'citizen_phone' => $validated['citizen_phone'],
            'citizen_address' => $validated['citizen_address'],
            'letter_type' => $validated['letter_type'],
            'purpose' => $validated['purpose'],
            'status' => 'pending',
            'admin_notes' => 'Permohonan surat berhasil dikirim. Petugas pelayanan Desa Karangwungu akan segera memverifikasi kelengkapan data Anda.',
        ]);

        return redirect()->route('services.track', ['code' => $code])
            ->with('success', 'Permohonan surat berhasil diajukan! Simpan kode tracking Anda: ' . $code);
    }

    public function track(Request $request)
    {
        $code = $request->query('code');
        $letter = null;

        if ($code) {
            $letter = LetterRequest::where('tracking_code', trim($code))->first();
        }

        return Inertia::render('Services/Track', [
            'searchedCode' => $code,
            'letter' => $letter,
        ]);
    }
}
