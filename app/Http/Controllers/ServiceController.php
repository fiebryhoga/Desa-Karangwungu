<?php

namespace App\Http\Controllers;

use App\Models\LetterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = [
            [
                'id' => 'sku',
                'title' => 'Surat Keterangan Usaha (SKU)',
                'category' => 'Ekonomi & Usaha',
                'description' => 'Surat keterangan untuk legalitas pembukaan rekening usaha, pengajuan KUR/kredit bank, atau izin usaha mikro di wilayah Karangwungu.',
                'requirements' => ['Fotokopi KTP Pemohon', 'Fotokopi Kartu Keluarga (KK)', 'Surat Pengantar dari Ketua RT/RW', 'Foto Lokasi/Aktivitas Usaha'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'domisili',
                'title' => 'Surat Keterangan Domisili',
                'category' => 'Kependudukan',
                'description' => 'Surat keterangan tempat tinggal resmi bagi warga ber-KTP Karangwungu maupun warga pendatang yang berdomisili di Desa Karangwungu.',
                'requirements' => ['Fotokopi KTP', 'Fotokopi KK', 'Surat Pengantar RT/RW setempat'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'sktm',
                'title' => 'Surat Keterangan Tidak Mampu (SKTM)',
                'category' => 'Kesejahteraan Sosial',
                'description' => 'Surat keterangan untuk keperluan beasiswa pendidikan siswa/mahasiswa, keringanan biaya kesehatan/BPJS, atau bantuan sosial.',
                'requirements' => ['Fotokopi KTP Orang Tua/Wali', 'Fotokopi Kartu Keluarga', 'Surat Pengantar RT/RW menyatakan tidak mampu'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'kelahiran',
                'title' => 'Surat Keterangan Kelahiran',
                'category' => 'Kependudukan',
                'description' => 'Surat pengantar untuk penerbitan Akta Kelahiran resmi di Dinas Kependudukan dan Pencatatan Sipil Kab. Lamongan.',
                'requirements' => ['Surat Keterangan Lahir dari Bidan/Puskesmas/RS', 'Fotokopi KTP Suami & Istri', 'Fotokopi Buku Nikah', 'Fotokopi KK'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'kematian',
                'title' => 'Surat Keterangan Kematian',
                'category' => 'Kependudukan',
                'description' => 'Surat keterangan pencatatan warga yang meninggal dunia untuk kepengurusan Akta Kematian, perbankan, dan waris.',
                'requirements' => ['KTP & KK Asli Almarhum/Almarhumah', 'Fotokopi KTP Pelapor/Ahli Waris', 'Surat Kematian dari Medis/RT'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'pengantar-nikah',
                'title' => 'Surat Pengantar Nikah (N1-N4)',
                'category' => 'Administrasi Pernikahan',
                'description' => 'Surat pengantar resmi bagi warga yang akan melangsungkan pernikahan di KUA Kecamatan Karanggeneng.',
                'requirements' => ['Fotokopi KTP & KK Calon Pengantin', 'Fotokopi KTP Orang Tua', 'Fotokopi Ijazah Terakhir & Akta Kelahiran', 'Pas foto 2x3 dan 4x6 latar biru'],
                'processing_time' => '2 Hari Kerja (Gratis / Rp 0)',
            ],
            [
                'id' => 'kehilangan',
                'title' => 'Surat Pengantar Kehilangan',
                'category' => 'Umum',
                'description' => 'Surat pengantar permohonan laporan kehilangan dokumen (KTP, KK, SIM, Ijazah) ke Polsek Karanggeneng.',
                'requirements' => ['Fotokopi dokumen yang hilang (jika ada)', 'Fotokopi KTP & KK pemohon', 'Surat Pengantar RT/RW'],
                'processing_time' => '1 Hari Kerja (Gratis / Rp 0)',
            ],
        ];

        return Inertia::render('Services/Index', [
            'services' => $services,
        ]);
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
