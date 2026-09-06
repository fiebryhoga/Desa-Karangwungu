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
                'id' => 'domisili-usaha',
                'title' => 'Surat Keterangan Domisili Usaha',
                'short_name' => 'Domisili Usaha',
                'description' => 'Surat keterangan resmi dari Pemerintah Desa Karangwungu yang menerangkan domisili tinggal pemohon serta keberadaan/domisili tempat usaha atau kantor yang beroperasi di wilayah Desa Karangwungu.',
                'requirements' => [
                    'Pemohon memiliki identitas kependudukan (KTP / KK sah)',
                    'Memiliki tempat usaha atau kantor yang berdomisili/beroperasi di Desa Karangwungu',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.domisili-usaha.preview'),
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
                'has_pdf_template' => true,
                'preview_url' => route('services.domisili-usaha.preview'),
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
                'has_pdf_template' => true,
                'preview_url' => route('services.kematian.preview'),
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
                'title' => 'Surat Keterangan Kehilangan',
                'short_name' => 'Kehilangan',
                'description' => 'Surat keterangan resmi dari Pemerintah Desa Karangwungu bagi warga yang kehilangan barang berharga atau dokumen kependudukan (KTP, KK, SIM, Ijazah, Buku Tabungan, dll) untuk dasar penerbitan ulang atau laporan kepolisian.',
                'requirements' => [
                    'Warga Desa Karangwungu atau berdomisili sah di wilayah desa',
                    'Mengetahui rincian dan rujukan dokumen atau barang yang hilang',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.kehilangan.preview'),
            ],
            [
                'id' => 'wali-nikah',
                'title' => 'Surat Keterangan Wali Nikah',
                'short_name' => 'Wali Nikah',
                'description' => 'Surat keterangan resmi dari Pemerintah Desa Karangwungu yang menerangkan bahwa pemohon adalah warga desa yang bertindak sebagai Wali Nikah sah bagi calon pengantin.',
                'requirements' => [
                    'Wali nikah merupakan warga sah Desa Karangwungu (memiliki KTP / KK Karangwungu)',
                    'Mengetahui identitas lengkap calon pengantin wanita dan calon pengantin pria',
                    'Mengetahui kejelasan hubungan nasab atau perwalian dengan calon mempelai wanita',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.wali-nikah.preview'),
            ],
            [
                'id' => 'wali-hakim',
                'title' => 'Surat Keterangan Wali Hakim',
                'short_name' => 'Wali Hakim',
                'description' => 'Surat keterangan resmi dari Pemerintah Desa Karangwungu yang menerangkan permohonan pernikahan menggunakan Wali Hakim dari Kantor Urusan Agama (KUA) Karanggeneng karena ketiadaan atau halangan wali nasab sah.',
                'requirements' => [
                    'Calon pengantin wanita berdomisili sah di wilayah Desa Karangwungu',
                    'Menyertakan identitas lengkap calon pengantin wanita dan calon pengantin pria',
                    'Menyatakan sebab/alasan penunjukan wali hakim (wali nasab tidak ada, adhol, tidak diketahui keberadaannya, dll)',
                    'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.wali-hakim.preview'),
            ],
            [
                'id' => 'kuasa',
                'title' => 'Surat Kuasa',
                'short_name' => 'Surat Kuasa',
                'description' => 'Surat kuasa perseorangan yang diketahui oleh Kepala Desa Karangwungu untuk pelimpahan wewenang resmi (pengambilan bantuan Baznas/Bansos, dokumen administrasi kependudukan, atau urusan penting lainnya).',
                'requirements' => [
                    'Pemberi kuasa dan penerima kuasa memiliki identitas kependudukan (KTP / KK) yang jelas',
                    'Mengetahui maksud dan tujuan pelimpahan wewenang / kuasa secara spesifik',
                    'Mendapatkan persetujuan dari kedua belah pihak (pemberi kuasa dan penerima kuasa)',
                ],
                'has_pdf_template' => true,
                'preview_url' => route('services.kuasa.preview'),
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
            'extra_data' => 'nullable|array',
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
            'extra_data' => $request->input('extra_data') ?: null,
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
     * Preview sample Surat Keterangan Kehilangan PDF template.
     */
    public function previewKehilangan(Request $request)
    {
        $logoPath = public_path('assets/images/logo_kop_sm.png');
        if (!file_exists($logoPath)) {
            $logoPath = public_path('assets/images/logo_kop.png');
        }
        $logoBase64 = file_exists($logoPath) ? ('data:image/png;base64,' . base64_encode(file_get_contents($logoPath))) : null;

        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'SUNARTO');

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $now = now();
        $letterDate = sprintf('%02d %s %d', $now->day, $months[$now->month] ?? '', $now->year);

        $data = [
            'title' => 'Surat Keterangan Kehilangan - Contoh Dokumen Resmi',
            'logo_base64' => $logoBase64,
            'letter_number' => '... / ... / ... / ' . date('Y'),
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $request->query('name', 'DODI SETYO PUTRO PURWANTO'),
            'citizen_nik' => $request->query('nik', '35241810304920001'),
            'birth_place_date' => $request->query('birth', 'Lamongan, 03-04-1992'),
            'gender' => $request->query('gender', 'Laki-laki'),
            'occupation' => $request->query('occupation', 'Wiraswasta'),
            'citizen_address' => self::formatFullAddress($request->query('address', 'Desa Karangwungu Rt 007 / Rw 001 Kecamatan Karanggeneng Kabupaten Lamongan.')),
            'religion' => $request->query('religion', 'Islam'),
            'purpose' => $request->query('purpose', 'KTP (KARTU TANDA PENDUDUK)'),
            'tracking_code' => $request->query('ticket', 'KW-SAMPLE-01'),
            'letter_date' => $letterDate,
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.kehilangan', $data);
        return $pdf->stream('Template_Surat_Kehilangan_Desa_Karangwungu.pdf');
    }

    /**
     * Preview sample Surat Keterangan Wali Nikah PDF template.
     */
    public function previewWaliNikah(Request $request)
    {
        $logoPath = public_path('assets/images/logo_kop_sm.png');
        if (!file_exists($logoPath)) {
            $logoPath = public_path('assets/images/logo_kop.png');
        }
        $logoBase64 = file_exists($logoPath) ? ('data:image/png;base64,' . base64_encode(file_get_contents($logoPath))) : null;

        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'SUNARTO');

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $now = now();
        $letterDate = sprintf('%02d %s %d', $now->day, $months[$now->month] ?? '', $now->year);

        $waliAddress = self::formatFullAddress($request->query('address', 'Desa Karangwungu Rt. 001 Rw. 001 Kec. Karanggeneng Kab. Lamongan'));
        $rtRwMatch = [];
        preg_match('/(RT\s*[:.\s]?\s*\d+\s*RW\s*[:.\s]?\s*\d+)/i', $waliAddress, $rtRwMatch);
        $waliRtRw = !empty($rtRwMatch[1]) ? $rtRwMatch[1] : 'Rt. 001 Rw. 001';

        $data = [
            'title' => 'Surat Keterangan Wali Nikah - Contoh Dokumen Resmi',
            'logo_base64' => $logoBase64,
            'letter_number' => $request->query('letter_number', '470 / 255 / 413.318.15 / ' . date('Y')),
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $request->query('name', 'ERIK SETIAWAN'),
            'citizen_nik' => $request->query('nik', '3505070510890001'),
            'birth_place_date' => $request->query('birth', 'Blitar, 05-10-1989'),
            'gender' => $request->query('gender', 'Laki-laki'),
            'religion' => $request->query('religion', 'Islam'),
            'marital_status' => $request->query('marital_status', 'Kawin'),
            'citizen_address' => $waliAddress,
            'catin_relation' => $request->query('catin_relation', 'Saudara Kandung'),
            'wali_rt_rw' => $request->query('wali_rt_rw', $waliRtRw),

            // Catin Wanita (yang dinikahkan)
            'bride_name' => $request->query('bride_name', 'DITA YULI WULANDARI'),
            'bride_nik' => $request->query('bride_nik', '3504145507990002'),
            'bride_birth_place_date' => $request->query('bride_birth', 'Lamongan, 15-07-1999'),
            'bride_religion' => $request->query('bride_religion', 'Islam'),
            'bride_address' => $request->query('bride_address', 'Dsn. Sumberjo RT 003 RW 002 Desa Sumberjo Kec. Sanankulon Kab. Blitar'),

            // Catin Pria (calon suami)
            'groom_name' => $request->query('groom_name', 'FAUZI INDRA WIYANTO'),
            'groom_nik' => $request->query('groom_nik', '3505071402930003'),
            'groom_birth_place_date' => $request->query('groom_birth', 'Blitar, 14-02-1993'),
            'groom_religion' => $request->query('groom_religion', 'Islam'),
            'groom_address' => $request->query('groom_address', 'Dsn. Sumberjo RT 003 RW 002 Desa Sumberjo Kec. Sanankulon Kab. Blitar'),

            'tracking_code' => $request->query('ticket', 'KW-WALI-01'),
            'letter_date' => $letterDate,
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.wali_nikah', $data);
        return $pdf->stream('Template_Surat_Wali_Nikah_Desa_Karangwungu.pdf');
    }

    /**
     * Preview sample Surat Keterangan Kematian PDF template.
     */
    public function previewKematian(Request $request)
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
            'title' => 'Surat Keterangan Kematian - Contoh Dokumen Resmi',
            'logo_base64' => $logoBase64,
            'letter_number' => $request->query('letter_number', '141 / 126 / 413.318.15 / ' . date('Y')),
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $request->query('name', 'KAMINEM'),
            'citizen_nik' => $request->query('nik', '3524185002720001'),
            'birth_place_date' => $request->query('birth', 'Lamongan, 10-02-1972'),
            'gender' => $request->query('gender', 'Perempuan'),
            'religion' => $request->query('religion', 'Islam'),
            'citizen_address' => self::formatFullAddress($request->query('address', 'Desa Karangwungu Rt 004 Rw 001 kec.Karanggeneng Kab Lamongan')),
            'death_date' => $request->query('death_date', '16/07/2022'),
            'death_cause' => $request->query('death_cause', 'Karena Sakit'),
            'death_place' => $request->query('death_place', 'Di rumah dan di semayamkan di Desa Karangwungu'),
            'tracking_code' => $request->query('ticket', 'KW-MATI-01'),
            'letter_date' => $letterDate,
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.kematian', $data);
        return $pdf->stream('Template_Surat_Kematian_Desa_Karangwungu.pdf');
    }

    /**
     * Preview sample Surat Kuasa PDF template.
     */
    public function previewKuasa(Request $request)
    {
        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'SUNARTO');
        // Bersihkan gelar H. jika di fisik tertulis SUNARTO murni, atau pakai nama kades
        $kadesDisplay = preg_replace('/^H\.\s+/i', '', $kadesName);

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $now = now();
        $letterDate = sprintf('%02d %s %d', $now->day, $months[$now->month] ?? '', $now->year);

        $data = [
            'title' => 'Surat Kuasa - Contoh Template Resmi Desa Karangwungu',
            'kades_name' => $kadesDisplay,
            'citizen_name' => $request->query('name', 'RAMITEN'),
            'citizen_nik' => $request->query('nik', '3524184101780001'),
            'citizen_address' => $request->query('address', 'Desa Karangwungu RT/RW: 003 /001 Kecamatan Karanggeneng, Kabupaten Lamongan.'),
            'grantee_name' => $request->query('grantee_name', 'AINUN NAJIB'),
            'grantee_nik' => $request->query('grantee_nik', '6402132707970007'),
            'grantee_address' => $request->query('grantee_address', 'Desa Karangwungu RT/RW: 007/001 Kecamatan Karanggeneng, Kabupaten Lamongan.'),
            'purpose' => $request->query('purpose', 'pengambilan Bantuan Mustahik dari Baznas.'),
            'tracking_code' => $request->query('ticket', 'KW-KUASA-01'),
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.kuasa', $data);
        return $pdf->stream('Template_Surat_Kuasa_Desa_Karangwungu.pdf');
    }

    /**
     * Preview sample Surat Keterangan Domisili Usaha PDF template.
     */
    public function previewDomisiliUsaha(Request $request)
    {
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
            'title' => 'Surat Keterangan Domisili Usaha - Contoh Template Resmi Desa Karangwungu',
            'letter_number' => $request->query('letter_number', '470 / 60 / 413.318.15 / ' . date('Y')),
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $request->query('name', 'SITI MUSLIMAH'),
            'citizen_nik' => $request->query('nik', '3523176412860003'),
            'gender' => $request->query('gender', 'Perempuan'),
            'birth_place_date' => $request->query('birth', 'Tuban, 24-10-1987'),
            'religion' => $request->query('religion', 'Islam'),
            'nationality' => $request->query('nationality', 'Indonesia'),
            'marital_status' => $request->query('marital_status', 'Kawin'),
            'occupation' => $request->query('occupation', 'Wiraswasta'),
            'citizen_address' => $request->query('address', 'Dsn Sundulan RT/RW 002/004 Desa Sumberagung Kec Plumpang Kab Tuban.'),
            'stay_status' => $request->query('stay_status', 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan'),
            'business_name' => $request->query('business_name', 'PT LIMAN JAYA GRESIK'),
            'business_status_desc' => $request->query('business_status_desc', 'berpindah Tempat atau Kantor'),
            'business_address' => $request->query('business_address', 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan'),
            'description_text' => $request->query('description_text', null),
            'tracking_code' => $request->query('ticket', 'KW-DOMUSAHA-01'),
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.domisili_usaha', $data);
        return $pdf->stream('Template_Surat_Keterangan_Domisili_Usaha_Desa_Karangwungu.pdf');
    }

    /**
     * Preview sample Surat Keterangan Wali Hakim PDF template.
     */
    public function previewWaliHakim(Request $request)
    {
        $kades = \App\Models\VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: \App\Models\SiteSetting::getValue('kades_name', 'SUNARTO');
        $kadesDisplay = preg_replace('/^H\.\s+/i', '', $kadesName);

        $months = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];
        $now = now();
        $letterDate = sprintf('%02d %s %d', $now->day, $months[$now->month] ?? '', $now->year);

        $data = [
            'title' => 'Surat Keterangan Wali Hakim - Contoh Template Resmi Desa Karangwungu',
            'letter_number' => $request->query('letter_number', '470 / 38 / 413.318.15 / ' . date('Y')),
            'kades_name' => $kadesDisplay,
            'kua_title' => $request->query('kua_title', 'Kepala KUA Kecamatan Karanggeneng'),
            'kua_name' => $request->query('kua_name', 'H.MOH KHOIRUL ANAM, M.Ag'),

            // Calon Pengantin Wanita (Perempuan)
            'bride_name' => $request->query('bride_name', 'Susi Wantoro Sari'),
            'bride_father_name' => $request->query('bride_father_name', '................................................................'),
            'bride_birth_place_date' => $request->query('bride_birth', 'Lamongan, 24 Mei 1998'),
            'bride_nationality' => $request->query('bride_nationality', 'Indonesia'),
            'bride_religion' => $request->query('bride_religion', 'Islam'),
            'bride_occupation' => $request->query('bride_occupation', 'Wiraswasta'),
            'bride_address' => $request->query('bride_address', 'Desa Karangwungu RT 002 RW 001 Kec Karanggeneng'),

            // Calon Pengantin Pria (Laki-laki)
            'groom_name' => $request->query('groom_name', 'Muchammad Dhaniel Ibrahim Al Thohiri'),
            'groom_father_name' => $request->query('groom_father_name', 'Moch Tohir'),
            'groom_birth_place_date' => $request->query('groom_birth', 'Gresik, 28 Maret 1998'),
            'groom_nationality' => $request->query('groom_nationality', 'Indonesia'),
            'groom_religion' => $request->query('groom_religion', 'Islam'),
            'groom_occupation' => $request->query('groom_occupation', 'Karyawan Swasta'),
            'groom_address' => $request->query('groom_address', 'RT 005 RW 003 Indro Kebomas Gresik'),

            // Alasan Wali Hakim (a sampai f)
            'reason_code' => $request->query('reason', 'a'),

            'tracking_code' => $request->query('ticket', 'KW-HAKIM-01'),
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => date('Y'),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('letters.wali_hakim', $data);
        return $pdf->stream('Template_Surat_Keterangan_Wali_Hakim_Desa_Karangwungu.pdf');
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

        $lowerType = strtolower($letter->letter_type ?? '');
        $isWaliHakim = (str_contains($lowerType, 'wali') && str_contains($lowerType, 'hakim')) || $lowerType === 'wali-hakim';
        $isDomisiliUsaha = !$isWaliHakim && (((str_contains($lowerType, 'domisili') && str_contains($lowerType, 'usaha')) || $lowerType === 'domisili-usaha' || $lowerType === 'sku'));
        $isKuasa = !$isWaliHakim && !$isDomisiliUsaha && str_contains($lowerType, 'kuasa');
        $isWaliNikah = !$isWaliHakim && !$isDomisiliUsaha && str_contains($lowerType, 'wali');
        $isKehilangan = !$isWaliHakim && !$isDomisiliUsaha && str_contains($lowerType, 'kehilangan');
        $isKematian = !$isWaliHakim && !$isDomisiliUsaha && (str_contains($lowerType, 'kematian') || str_contains($lowerType, 'meninggal'));

        // Format birth info
        $birthStr = 'Lamongan';
        if ($letter->birth_place && $letter->birth_date) {
            $bd = $letter->birth_date;
            if ($isDomisiliUsaha) {
                $birthStr = sprintf('%s, %02d-%02d-%d', $letter->birth_place, $bd->day, $bd->month, $bd->year);
            } else {
                $birthStr = sprintf('%s, %02d %s %d', $letter->birth_place, $bd->day, $months[$bd->month] ?? '', $bd->year);
            }
        } elseif ($letter->birth_place) {
            $birthStr = $letter->birth_place;
        }

        // Letter Number: jika belum diisi admin, gunakan format placeholder dengan tahun
        $letterNumber = $letter->letter_number ?: ('... / ... / ... / ' . $targetDate->format('Y'));

        if ($isWaliHakim) {
            $viewName = 'letters.wali_hakim';
            $docTitle = 'Surat Keterangan Wali Hakim - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Wali_Hakim_';
        } elseif ($isDomisiliUsaha) {
            $viewName = 'letters.domisili_usaha';
            $docTitle = 'Surat Keterangan Domisili Usaha - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Domisili_Usaha_';
        } elseif ($isKuasa) {
            $viewName = 'letters.kuasa';
            $docTitle = 'Surat Kuasa - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Kuasa_';
        } elseif ($isWaliNikah) {
            $viewName = 'letters.wali_nikah';
            $docTitle = 'Surat Keterangan Wali Nikah - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Wali_Nikah_';
        } elseif ($isKehilangan) {
            $viewName = 'letters.kehilangan';
            $docTitle = 'Surat Keterangan Kehilangan - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Kehilangan_';
        } elseif ($isKematian) {
            $viewName = 'letters.kematian';
            $docTitle = 'Surat Keterangan Kematian - ' . $letter->citizen_name;
            $filePrefix = 'Surat_Kematian_';
        } else {
            $viewName = 'letters.sktm';
            $docTitle = 'Surat Keterangan Tidak Mampu - ' . $letter->citizen_name;
            $filePrefix = 'SKTM_';
        }

        $extra = is_array($letter->extra_data) ? $letter->extra_data : [];
        $fullAddress = $isDomisiliUsaha 
            ? ($letter->citizen_address ?: self::formatFullAddress($letter->citizen_address))
            : self::formatFullAddress($letter->citizen_address);

        $rtRwMatch = [];
        preg_match('/(RT\s*[:.\s]?\s*\d+\s*RW\s*[:.\s]?\s*\d+)/i', $fullAddress, $rtRwMatch);
        $waliRtRw = !empty($rtRwMatch[1]) ? $rtRwMatch[1] : 'Rt. 001 Rw. 001';

        $data = [
            'title' => $docTitle,
            'logo_base64' => $logoBase64,
            'letter_number' => $letterNumber,
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
            'citizen_name' => $letter->citizen_name,
            'citizen_nik' => $letter->citizen_nik,
            'birth_place_date' => $birthStr,
            'gender' => $letter->gender ?? 'Laki-laki',
            'occupation' => $letter->occupation ?? 'Wiraswasta / Pekerja Bebas',
            'citizen_address' => $fullAddress,
            'religion' => $letter->religion ?? 'Islam',
            'purpose' => $letter->purpose,
            'tracking_code' => $letter->tracking_code,
            'letter_date' => $letterDate,
            'printed_at' => date('d-m-Y H:i'),
            'year' => $targetDate->format('Y'),

            // Domisili Usaha specific data
            'nationality' => $extra['nationality'] ?? 'Indonesia',
            'stay_status' => $extra['stay_status'] ?? 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan',
            'business_name' => $extra['business_name'] ?? ($extra['usaha_nama'] ?? 'PT LIMAN JAYA GRESIK'),
            'business_status_desc' => $extra['business_status_desc'] ?? 'berpindah Tempat atau Kantor',
            'business_address' => $extra['business_address'] ?? ($extra['usaha_alamat'] ?? 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan'),
            'description_text' => $extra['description_text'] ?? null,

            // Wali Hakim specific data
            'bride_father_name' => $extra['bride_father_name'] ?? ($extra['binti'] ?? '................................................................'),
            'bride_nationality' => $extra['bride_nationality'] ?? ($extra['nationality'] ?? 'Indonesia'),
            'bride_occupation' => $extra['bride_occupation'] ?? ($letter->occupation ?? 'Wiraswasta'),
            'groom_father_name' => $extra['groom_father_name'] ?? ($extra['bin'] ?? 'Moch Tohir'),
            'groom_nationality' => $extra['groom_nationality'] ?? 'Indonesia',
            'groom_occupation' => $extra['groom_occupation'] ?? 'Karyawan Swasta',
            'reason_code' => $extra['reason_code'] ?? ($extra['alasan_wali_hakim'] ?? 'a'),
            'kua_title' => $extra['kua_title'] ?? 'Kepala KUA Kecamatan Karanggeneng',
            'kua_name' => $extra['kua_name'] ?? 'H.MOH KHOIRUL ANAM, M.Ag',

            // Wali Nikah & Catin shared data
            'marital_status' => $extra['marital_status'] ?? 'Kawin',
            'catin_relation' => $extra['catin_relation'] ?? 'Saudara Kandung',
            'wali_rt_rw' => $waliRtRw,
            // Catin Wanita
            'bride_name' => $extra['bride_name'] ?? ($letter->citizen_name ?: '...'),
            'bride_nik' => $extra['bride_nik'] ?? ($letter->citizen_nik ?: '...'),
            'bride_birth_place_date' => $extra['bride_birth_place_date'] ?? $birthStr,
            'bride_religion' => $extra['bride_religion'] ?? ($letter->religion ?: 'Islam'),
            'bride_address' => $extra['bride_address'] ?? $fullAddress,
            // Catin Pria
            'groom_name' => $extra['groom_name'] ?? '...',
            'groom_nik' => $extra['groom_nik'] ?? '...',
            'groom_birth_place_date' => $extra['groom_birth_place_date'] ?? '...',
            'groom_religion' => $extra['groom_religion'] ?? 'Islam',
            'groom_address' => $extra['groom_address'] ?? '...',

            // Kematian specific data
            'death_date' => $extra['death_date'] ?? ($letter->purpose ?: '-'),
            'death_cause' => $extra['death_cause'] ?? 'Karena Sakit',
            'death_place' => $extra['death_place'] ?? 'Di rumah dan di semayamkan di Desa Karangwungu',

            // Surat Kuasa specific data (Pihak Kedua / Penerima Kuasa)
            'grantee_name' => $extra['grantee_name'] ?? '...',
            'grantee_nik' => $extra['grantee_nik'] ?? '...',
            'grantee_address' => $extra['grantee_address'] ?? '...',
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView($viewName, $data);
        $filename = $filePrefix . Str::slug($letter->citizen_name) . '_' . $letter->tracking_code . '.pdf';

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
