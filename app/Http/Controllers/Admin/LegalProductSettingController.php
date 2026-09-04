<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LegalProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LegalProductSettingController extends Controller
{
    protected array $defaultDocumentTypes = [
        'Keputusan Kepala Desa (SK)',
        'Peraturan Desa (Perdes)',
        'Peraturan Bersama Kepala Desa',
        'Keputusan BPD',
        'Instruksi Kepala Desa',
        'Surat Edaran Desa',
    ];

    /**
     * Display a listing of legal products for admin management.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $type = $request->query('type');
        $year = $request->query('year');
        $status = $request->query('status');

        $query = LegalProduct::query();

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

        $products = $query->orderBy('year', 'desc')
            ->orderBy('effective_date', 'desc')
            ->orderBy('id', 'desc')
            ->get();

        // Calculate statistics
        $allProducts = LegalProduct::all();
        $stats = [
            'total' => $allProducts->count(),
            'perdes' => $allProducts->where('document_type', 'Peraturan Desa (Perdes)')->count(),
            'sk' => $allProducts->where('document_type', 'Keputusan Kepala Desa (SK)')->count(),
            'active' => $allProducts->where('status', 'active')->count(),
        ];

        // Distinct years for filter
        $availableYears = LegalProduct::select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        if (empty($availableYears)) {
            $availableYears = [(int) date('Y')];
        }

        return Inertia::render('Admin/Settings/LegalProducts', [
            'products' => $products,
            'stats' => $stats,
            'availableTypes' => $this->defaultDocumentTypes,
            'availableYears' => $availableYears,
            'filters' => [
                'search' => $search ?? '',
                'type' => $type ?? 'all',
                'year' => $year ?? 'all',
                'status' => $status ?? 'all',
            ],
        ]);
    }

    /**
     * Store a newly created legal product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'document_number' => 'required|string|max:150',
            'year' => 'required|integer|min:2000|max:2100',
            'effective_date' => 'nullable|date',
            'status' => 'required|in:active,amended,repealed',
            'description' => 'nullable|string|max:2000',
            'is_active' => 'nullable|boolean',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:15360', // Max 15MB
        ], [
            'title.required' => 'Judul atau tentang produk hukum wajib diisi.',
            'document_type.required' => 'Jenis produk hukum wajib dipilih.',
            'document_number.required' => 'Nomor dokumen wajib diisi.',
            'year.required' => 'Tahun dokumen wajib diisi.',
            'file.mimes' => 'Format berkas harus berupa dokumen PDF, DOC, atau DOCX.',
            'file.max' => 'Ukuran berkas maksimal 15 MB.',
        ]);

        $productData = [
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title'] . '-' . $validated['document_number']),
            'document_type' => $validated['document_type'],
            'document_number' => $validated['document_number'],
            'year' => (int) $validated['year'],
            'effective_date' => $validated['effective_date'] ?? null,
            'status' => $validated['status'],
            'description' => $validated['description'] ?? null,
            'is_active' => $request->boolean('is_active', true),
        ];

        // Handle uploaded file
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $uploadDir = public_path('uploads/legal-products');
            if (!File::exists($uploadDir)) {
                File::makeDirectory($uploadDir, 0755, true);
            }

            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $cleanName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
            $filename = $cleanName . '-' . time() . '.' . $extension;

            $file->move($uploadDir, $filename);

            $productData['file_url'] = '/uploads/legal-products/' . $filename;
            $productData['file_name'] = $originalName;
            $productData['file_size'] = $this->formatFileSize(filesize($uploadDir . '/' . $filename));
        }

        LegalProduct::create($productData);

        return redirect()->back()->with('success', 'Produk hukum berhasil ditambahkan.');
    }

    /**
     * Update the specified legal product in storage.
     */
    public function update(Request $request, $id)
    {
        $product = LegalProduct::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'document_type' => 'required|string|max:100',
            'document_number' => 'required|string|max:150',
            'year' => 'required|integer|min:2000|max:2100',
            'effective_date' => 'nullable|date',
            'status' => 'required|in:active,amended,repealed',
            'description' => 'nullable|string|max:2000',
            'is_active' => 'nullable|boolean',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:15360',
        ], [
            'title.required' => 'Judul atau tentang produk hukum wajib diisi.',
            'document_type.required' => 'Jenis produk hukum wajib dipilih.',
            'document_number.required' => 'Nomor dokumen wajib diisi.',
            'year.required' => 'Tahun dokumen wajib diisi.',
            'file.mimes' => 'Format berkas harus berupa dokumen PDF, DOC, atau DOCX.',
            'file.max' => 'Ukuran berkas maksimal 15 MB.',
        ]);

        $product->title = $validated['title'];
        $product->document_type = $validated['document_type'];
        $product->document_number = $validated['document_number'];
        $product->year = (int) $validated['year'];
        $product->effective_date = $validated['effective_date'] ?? null;
        $product->status = $validated['status'];
        $product->description = $validated['description'] ?? null;
        $product->is_active = $request->boolean('is_active', true);

        // Handle file replacement
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $uploadDir = public_path('uploads/legal-products');
            if (!File::exists($uploadDir)) {
                File::makeDirectory($uploadDir, 0755, true);
            }

            // Remove old file if exists
            if (!empty($product->file_url)) {
                $oldPath = public_path(ltrim($product->file_url, '/'));
                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }

            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $cleanName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME));
            $filename = $cleanName . '-' . time() . '.' . $extension;

            $file->move($uploadDir, $filename);

            $product->file_url = '/uploads/legal-products/' . $filename;
            $product->file_name = $originalName;
            $product->file_size = $this->formatFileSize(filesize($uploadDir . '/' . $filename));
        }

        $product->save();

        return redirect()->back()->with('success', 'Produk hukum berhasil diperbarui.');
    }

    /**
     * Remove the specified legal product from storage.
     */
    public function destroy($id)
    {
        $product = LegalProduct::findOrFail($id);

        // Remove file if exists
        if (!empty($product->file_url)) {
            $filePath = public_path(ltrim($product->file_url, '/'));
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        $product->delete();

        return redirect()->back()->with('success', 'Produk hukum berhasil dihapus.');
    }

    /**
     * Helper to format bytes into readable size.
     */
    protected function formatFileSize($bytes): string
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 1) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 0) . ' KB';
        } elseif ($bytes > 1) {
            return $bytes . ' bytes';
        } elseif ($bytes == 1) {
            return $bytes . ' byte';
        } else {
            return '0 bytes';
        }
    }
}
