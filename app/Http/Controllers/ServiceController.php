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

    public function getAvailableLetterServices()
    {
        return [
            [
                'id' => 'sktm',
                'title' => 'Surat Keterangan Tidak Mampu (SKTM)',
                'short_name' => 'SKTM',
                'description' => 'Surat keterangan resmi dari Pemerintah Desa Karangwungu yang menerangkan keadaan ekonomi keluarga prasejahtera atau tidak mampu untuk keperluan beasiswa, keringanan biaya pendidikan, pengajuan KIP Kuliah, maupun keringanan biaya kesehatan/RS.',
                'requirements' => [
                    'Warga berdomisili sah di Desa Karangwungu (memiliki KTP / Kartu Keluarga)',
                    'Termasuk dalam kategori keluarga prasejahtera atau kurang mampu',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.sktm.preview'),
            ],
            [
                'id' => 'sku',
                'title' => 'Surat Keterangan Usaha (SKU)',
                'short_name' => 'SKU',
                'description' => 'Surat resmi yang menerangkan bahwa warga benar-benar memiliki usaha perorangan atau UMKM aktif di wilayah Desa Karangwungu guna pengajuan kredit perbankan (KUR BRI/BNI/Mandiri), permodalan usaha, atau perizinan.',
                'requirements' => [
                    'Warga berdomisili atau menjalankan usaha di wilayah Desa Karangwungu',
                    'Memiliki kegiatan usaha / UMKM yang sedang aktif berjalan',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW lokasi usaha',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
            [
                'id' => 'domisili',
                'title' => 'Surat Keterangan Domisili (SKD)',
                'short_name' => 'Domisili',
                'description' => 'Surat yang menyatakan bahwa seseorang atau badan berdomisili/bertempat tinggal sah di wilayah RT/RW Desa Karangwungu untuk melamar pekerjaan, administrasi bank, atau pendaftaran sekolah.',
                'requirements' => [
                    'Bertempat tinggal atau menetap di lingkungan RT/RW Desa Karangwungu',
                    'Menunjukkan identitas kependudukan (KTP / KK asli atau bukti tinggal bagi pendatang)',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
            [
                'id' => 'kelahiran',
                'title' => 'Surat Keterangan Kelahiran',
                'short_name' => 'Kelahiran',
                'description' => 'Surat pengantar desa atas kelahiran bayi/anak warga Desa Karangwungu guna penerbitan Akta Kelahiran dan penambahan anggota keluarga baru di Kartu Keluarga pada Disdukcapil Lamongan.',
                'requirements' => [
                    'Kelahiran anak dari orang tua yang merupakan warga Desa Karangwungu',
                    'Memiliki surat keterangan lahir dari bidan, dokter, atau fasilitas kesehatan',
                    'Menyertakan identitas orang tua (KTP & Kartu Keluarga Desa Karangwungu)',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
            [
                'id' => 'kematian',
                'title' => 'Surat Keterangan Kematian',
                'short_name' => 'Kematian',
                'description' => 'Surat resmi dari desa atas meninggalnya warga Desa Karangwungu untuk pelaporan pembuatan Akta Kematian, klaim santunan atau asuransi/BPJS, serta pemutakhiran data kependudukan keluarga.',
                'requirements' => [
                    'Almarhum / Almarhumah tercatat sebagai warga Desa Karangwungu',
                    'Pelapor merupakan ahli waris sah atau anggota keluarga dalam satu KK',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
            [
                'id' => 'pengantar-nikah',
                'title' => 'Surat Pengantar Nikah (Model N1 - N4)',
                'short_name' => 'Pengantar Nikah',
                'description' => 'Berkas pengantar resmi dari Pemerintah Desa Karangwungu bagi calon mempelai pengantin pria atau wanita untuk proses pendaftaran perkawinan di Kantor Urusan Agama (KUA) Karanggeneng.',
                'requirements' => [
                    'Calon mempelai merupakan warga Desa Karangwungu',
                    'Status perkawinan jelas (jejaka, perawan, duda, atau janda)',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
            [
                'id' => 'kehilangan',
                'title' => 'Surat Pengantar Kehilangan',
                'short_name' => 'Kehilangan',
                'description' => 'Surat pengantar keterangan kehilangan barang berharga atau dokumen kependudukan penting (KTP, KK, SIM, Ijazah, Buku Tabungan) untuk dasar pembuatan laporan polisi di Polsek Karanggeneng.',
                'requirements' => [
                    'Warga Desa Karangwungu atau berdomisili sah di wilayah desa',
                    'Mengetahui rincian dan kronologi barang atau dokumen yang hilang',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
                ],
                'has_pdf_template' => false,
                'preview_url' => null,
            ],
        ];
    }

    public function letterCatalog(Request $request)
    {
        return redirect()->route('services.create');
    }

    public function create(Request $request)
    {
        $type = $request->query('type');
        $services = $this->getAvailableLetterServices();

        if (!empty($type)) {
            return $this->createForm($type);
        }

        return Inertia::render('Services/Request', [
            'services' => $services,
        ]);
    }

    public function createForm($type)
    {
        $services = $this->getAvailableLetterServices();
        $selectedService = collect($services)->first(function ($s) use ($type) {
            return $s['id'] === $type || strtolower($s['short_name']) === strtolower($type);
        }) ?: $services[0];

        return Inertia::render('Services/Form', [
            'service' => $selectedService,
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'citizen_name' => 'required|string|max:150',
            'citizen_nik' => 'required|string|size:16|regex:/^[0-9]+$/',
            'citizen_phone' => 'required|string|max:20',
            'citizen_email' => 'nullable|email|max:100',
            'citizen_address' => 'required|string|max:255',
            'letter_type' => 'required|string|max:100',
            'purpose' => 'required|string|max:500',
            'birth_place' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'religion' => 'nullable|string|max:50',
            'occupation' => 'nullable|string|max:100',
        ], [
            'citizen_nik.size' => 'NIK harus berjumlah 16 digit angka.',
            'citizen_nik.regex' => 'NIK hanya boleh memuat angka.',
            'citizen_email.email' => 'Format alamat email tidak valid.',
        ]);

        $code = 'KW-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        $letter = LetterRequest::create([
            'tracking_code' => $code,
            'letter_number' => null, // Diisi secara manual oleh admin di panel administrasi desa
            'citizen_name' => $validated['citizen_name'],
            'citizen_nik' => $validated['citizen_nik'],
            'birth_place' => $validated['birth_place'] ?? 'Lamongan',
            'birth_date' => $validated['birth_date'] ?? null,
            'gender' => $validated['gender'] ?? 'Laki-laki',
            'religion' => $validated['religion'] ?? 'Islam',
            'occupation' => $validated['occupation'] ?? 'Belum Bekerja',
            'citizen_phone' => $validated['citizen_phone'],
            'citizen_email' => $validated['citizen_email'] ?? null,
            'citizen_address' => self::formatFullAddress($validated['citizen_address']),
            'letter_type' => $validated['letter_type'],
            'purpose' => $validated['purpose'],
            'status' => 'menunggu',
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

    /**
     * Preview sample SKTM PDF template.
     */
    public function previewSktm(Request $request)
    {
        $logoPath = public_path('assets/images/logo_kop_sm.png');
        if (!file_exists($logoPath)) {
            $logoPath = public_path('assets/images/logo_kop.png');
        }
        $logoBase64 = file_exists($logoPath) ? ('data:image/png;base64,' . base64_encode(file_get_contents($logoPath))) : null;

        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'H. SUNARTO');

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $now = now();
        $letterDate = sprintf('%02d %s %d', $now->day, $months[$now->month] ?? '', $now->year);

        $data = [
            'title' => 'Surat Keterangan Tidak Mampu - Contoh Template Resmi',
            'logo_base64' => $logoBase64,
            'letter_number' => '... / ... / ... / ' . date('Y'),
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $request->query('name', '...'),
            'citizen_nik' => $request->query('nik', '...'),
            'birth_place_date' => $request->query('birth', '...'),
            'gender' => $request->query('gender', '...'),
            'occupation' => $request->query('occupation', '...'),
            'citizen_address' => self::formatFullAddress($request->query('address', '...')),
            'religion' => $request->query('religion', '...'),
            'purpose' => $request->query('purpose', '...'),
            'tracking_code' => $request->query('ticket', '...'),
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.sktm', $data);
        return $pdf->stream('Template_SKTM_Desa_Karangwungu.pdf');
    }

    /**
     * Download or stream PDF for an existing LetterRequest.
     */
    public function downloadLetterPdf($tracking_code)
    {
        $letter = LetterRequest::where('tracking_code', trim($tracking_code))->firstOrFail();

        $logoPath = public_path('assets/images/logo_kop_sm.png');
        if (!file_exists($logoPath)) {
            $logoPath = public_path('assets/images/logo_kop.png');
        }
        $logoBase64 = file_exists($logoPath) ? ('data:image/png;base64,' . base64_encode(file_get_contents($logoPath))) : null;

        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'H. SUNARTO');

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $targetDate = $letter->letter_date ?: ($letter->created_at ?: now());
        $letterDate = sprintf('%02d %s %d', $targetDate->day, $months[$targetDate->month] ?? '', $targetDate->year);

        // Format birth info
        $birthStr = 'Lamongan';
        if ($letter->birth_place && $letter->birth_date) {
            $bd = $letter->birth_date;
            $birthStr = sprintf('%s, %02d %s %d', $letter->birth_place, $bd->day, $months[$bd->month] ?? '', $bd->year);
        } elseif ($letter->birth_place) {
            $birthStr = $letter->birth_place;
        }

        // Letter Number: jika belum diisi admin, gunakan format placeholder dengan tahun
        $letterNumber = $letter->letter_number ?: ('... / ... / ... / ' . $targetDate->format('Y'));

        $data = [
            'title' => 'Surat Keterangan Tidak Mampu - ' . $letter->citizen_name,
            'logo_base64' => $logoBase64,
            'letter_number' => $letterNumber,
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $letter->citizen_name,
            'citizen_nik' => $letter->citizen_nik,
            'birth_place_date' => $birthStr,
            'gender' => $letter->gender ?? 'Laki-laki',
            'occupation' => $letter->occupation ?? 'Wiraswasta / Pekerja Bebas',
            'citizen_address' => self::formatFullAddress($letter->citizen_address),
            'religion' => $letter->religion ?? 'Islam',
            'purpose' => $letter->purpose,
            'tracking_code' => $letter->tracking_code,
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => $targetDate->format('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.sktm', $data);
        $filename = 'SKTM_' . Str::slug($letter->citizen_name) . '_' . $letter->tracking_code . '.pdf';

        return $pdf->stream($filename);
    }

    /**
     * Pastikan format alamat warga lengkap sesuai standar administrasi kedinasan desa.
     */
    public static function formatFullAddress(?string $address): string
    {
        $defaultRest = 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
        $trimmed = trim($address ?? '');

        if (empty($trimmed) || $trimmed === '...') {
            return $defaultRest;
        }

        $lower = strtolower($trimmed);

        // Jika sudah lengkap ada nama kecamatan dan kabupaten
        if ((str_contains($lower, 'karanggeneng') || str_contains($lower, 'kec.')) && 
            (str_contains($lower, 'lamongan') || str_contains($lower, 'kab.'))) {
            return $trimmed;
        }

        // Jika mengandung "Desa Karangwungu" tapi belum ada Kecamatan & Kabupaten
        if (str_contains($lower, 'desa karangwungu')) {
            return preg_replace('/desa\s+karangwungu.*/i', 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan', $trimmed);
        }

        // Cek jika diawali RT/RW
        if (preg_match('/^(RT(?:\/RW)?[:\s]*\d+[\s\/\.,]*(?:RW[:\s]*\d+)?)\s*(.*)$/i', $trimmed, $matches)) {
            $prefix = trim($matches[1]);
            $rest = trim($matches[2]);

            // Normalisasi prefix: "RT/RW: 003/001" -> "RT 03 RW 01" jika digit ada
            if (preg_match('/RT(?:\/RW)?[:\s]*(\d+)[\s\/]+(?:RW[:\s]*)?(\d+)/i', $prefix, $m)) {
                $prefix = 'RT ' . $m[1] . ' RW ' . $m[2];
            }

            if (empty($rest) || strtolower($rest) === 'desa karangwungu') {
                return $prefix . ' ' . $defaultRest;
            }

            if (!str_contains(strtolower($rest), 'karanggeneng')) {
                return $prefix . ' ' . $rest . ' Kecamatan Karanggeneng Kabupaten Lamongan';
            }

            return $prefix . ' ' . $rest;
        }

        return $trimmed . ' ' . $defaultRest;
    }
}
