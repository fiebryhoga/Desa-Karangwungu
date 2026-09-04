<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FacilitySettingController extends Controller
{
    /**
     * Default facilities list for fresh installation or fallback.
     */
    public static function getDefaultFacilities(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Kantor Balai Desa & Pendopo Karangwungu',
                'category' => 'Pemerintahan & Layanan',
                'location' => 'Jl. Raya Karangwungu No. 01, Dusun Krajan',
                'hours' => 'Senin – Jumat: 08.00 – 15.30 WIB',
                'phone' => '(0812) 3456-7890',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                'description' => 'Pusat pelayanan administrasi publik, kependudukan, musyawarah desa (Musrenbangdes), dan pertemuan warga.',
                'features' => ['Pelayanan Administrasi & Surat', 'Pendopo Serbaguna', 'Ruang Rapat BPD & LPM', 'Akses WiFi Publik Desa'],
            ],
            [
                'id' => 2,
                'name' => 'Puskesdes & Polindes Karangwungu',
                'category' => 'Kesehatan & Posyandu',
                'location' => 'Kompleks Balai Desa, Dusun Krajan',
                'hours' => 'Senin – Sabtu: 08.00 – 13.00 WIB (Darurat 24 Jam)',
                'phone' => '(0813) 9988-7766',
                'image' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
                'description' => 'Fasilitas layanan kesehatan primer desa, konsultasi bidan desa, imunisasi balita, dan pemeriksaan kesehatan lansia.',
                'features' => ['Pemeriksaan Umum & Bidan', 'Posyandu Balita & Lansia', 'Ruang Rawat Tindakan Pertama', 'Ambulans Siaga Desa'],
            ],
            [
                'id' => 3,
                'name' => 'Masjid Jami’ Karangwungu',
                'category' => 'Ibadah & Keagamaan',
                'location' => 'Dusun Krajan (Pusat Desa)',
                'hours' => 'Terbuka 24 Jam',
                'phone' => '(0857) 1122-3344',
                'image' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
                'description' => 'Pusat peribadatan utama umat Islam, pengajian rutin warga, peringatan hari besar Islam (PHBI), dan madrasah diniyah.',
                'features' => ['Ruang Utama Sholat Ber-AC', 'Area Wudhu Bersih & Luas', 'Tempat Parkir Luas', 'Perpustakaan Masjid'],
            ],
            [
                'id' => 4,
                'name' => 'SD Negeri Karangwungu',
                'category' => 'Pendidikan',
                'location' => 'Jl. Pendidikan No. 04, Dusun Karangwungu Timur',
                'hours' => 'Senin – Sabtu: 07.00 – 13.00 WIB',
                'phone' => '(0812) 5544-3322',
                'image' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
                'description' => 'Institusi pendidikan dasar formal pencetak generasi unggul berprestasi dan berkarakter akhlak mulia.',
                'features' => ['Ruang Kelas Representatif', 'Laboratorium Komputer', 'Perpustakaan Sekolah', 'Lapangan Olahraga'],
            ],
            [
                'id' => 5,
                'name' => 'Lapangan Olahraga & Ruang Terbuka Hijau (RTH)',
                'category' => 'Olahraga & Publik',
                'location' => 'Blok Lapangan, Dusun Karangwungu Barat',
                'hours' => 'Setiap Hari: 06.00 – 18.00 WIB',
                'phone' => 'Pengelola Karang Taruna Desa',
                'image' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
                'description' => 'Fasilitas sarana olahraga sepak bola, voli, jogging track, senam mingguan warga, dan panggung pertunjukan rakyat.',
                'features' => ['Lapangan Sepak Bola Standar', 'Lapangan Bola Voli', 'Jogging Track', 'Area Main Anak & Santai'],
            ],
            [
                'id' => 6,
                'name' => 'Sentra Pemasaran Ikan Bandeng & Hasil Tambak',
                'category' => 'Pertanian & Ekonomi',
                'location' => 'Dusun Sumberagung (Dekat Kawasan Tambak)',
                'hours' => 'Setiap Hari: 05.00 – 12.00 WIB',
                'phone' => 'Gapoktan / Kelompok Pembudidaya Ikan',
                'image' => 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
                'description' => 'Pusat pelelangan dan distribusi hasil panen bandeng segar, udang vaname, serta produk olahan UMKM desa.',
                'features' => ['Timbangan Digital Bersama', 'Tempat Penyimpanan Es & Cold Box', 'Akses Truk Pengangkut', 'Kios Pemasaran UMKM'],
            ],
            [
                'id' => 7,
                'name' => 'Tempat Pengelolaan Sampah (TPS3R) Mandiri',
                'category' => 'Pemerintahan & Layanan',
                'location' => 'Bantaran Timur Dusun Karangwungu',
                'hours' => 'Senin – Sabtu: 07.30 – 16.00 WIB',
                'phone' => 'Unit Pengelola Kebersihan Desa',
                'image' => 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
                'description' => 'Pusat pemilahan sampah organik dan anorganik, pembuatan pupuk kompos pertanian, serta bank sampah desa.',
                'features' => ['Mesin Pencacah Organik', 'Pengolahan Pupuk Kompos', 'Bank Sampah Daur Ulang', 'Armada Motor Roda Tiga'],
            ],
            [
                'id' => 8,
                'name' => 'Pintu Air & Saluran Irigasi Primer Pertanian',
                'category' => 'Pertanian & Ekonomi',
                'location' => 'Blok Sawah Tengah & Saluran Induk Irigasi',
                'hours' => 'Pengawasan Petugas Pintu Air 24 Jam',
                'phone' => 'Himpunan Petani Pemakai Air (HIPPA)',
                'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
                'description' => 'Infrastruktur pengendali debit air penunjang irigasi persawahan dan sirkulasi air tambak bandeng warga.',
                'features' => ['Pintu Bendung Otomatis', 'Saluran Beton Primer', 'Pengukur Ketinggian Air', 'Pos Jaga HIPPA Desa'],
            ],
        ];
    }

    /**
     * Display the Facilities Settings page in Admin.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('facilities');

        // Decode JSON arrays for frontend manipulation
        $facilitiesList = [];
        if (isset($settings['facilities_list']) && is_string($settings['facilities_list'])) {
            $facilitiesList = json_decode($settings['facilities_list'], true) ?: [];
        } elseif (isset($settings['facilities_list']) && is_array($settings['facilities_list'])) {
            $facilitiesList = $settings['facilities_list'];
        }

        if (empty($facilitiesList)) {
            $facilitiesList = self::getDefaultFacilities();
        }

        $settings['facilities_list_data'] = $facilitiesList;
        $settings['facilities_title'] = $settings['facilities_title'] ?? 'Fasilitas Umum Desa Karangwungu';
        $settings['facilities_subtitle'] = $settings['facilities_subtitle'] ?? 'Informasi lengkap sarana prasarana pelayanan masyarakat, tempat ibadah, fasilitas kesehatan, pendidikan, ruang terbuka publik, serta infrastruktur pertanian.';

        return Inertia::render('Admin/Settings/Facilities', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the Facilities Settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'facilities_title' => ['nullable', 'string', 'max:255'],
            'facilities_subtitle' => ['nullable', 'string', 'max:500'],
            'facilities_list' => ['nullable', 'array'],
        ]);

        if (isset($validated['facilities_list']) && is_array($validated['facilities_list'])) {
            $validated['facilities_list'] = json_encode($validated['facilities_list'], JSON_UNESCAPED_UNICODE);
        }

        SiteSetting::setGroup('facilities', $validated);

        AdminActivityLog::record(
            'update_facilities_settings',
            'Memperbarui konfigurasi data sarana prasarana dan fasilitas umum desa.'
        );

        return back()->with('success', 'Data konfigurasi fasilitas umum berhasil disimpan.');
    }

    /**
     * Upload photo for facility.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:8192'],
        ]);

        $file = $request->file('image');
        $filename = 'facility_' . Str::random(16) . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('facilities', $filename, 'public');
        $url = Storage::url($path);

        return response()->json([
            'url' => $url,
            'message' => 'Foto fasilitas berhasil diunggah.',
        ]);
    }
}
