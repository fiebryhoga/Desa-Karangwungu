<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display gallery page.
     */
    public function index(Request $request): Response
    {
        $category = $request->query('category', 'Semua');

        $allGalleries = [
            [
                'id' => 1,
                'title' => 'Panen Raya Padi Sawah Organik Kelompok Tani Makmur',
                'category' => 'Pertanian & Tambak',
                'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Kegiatan panen raya musim tanam bersama petani sawah Dusun Krajan Desa Karangwungu.',
                'date' => '2026-08-25',
                'location' => 'Lahan Pertanian Dusun Krajan',
            ],
            [
                'id' => 2,
                'title' => 'Penebaran Benih Bandeng Unggul di Kawasan Tambak Desa',
                'category' => 'Pertanian & Tambak',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Penyaluran bantuan bibit ikan bandeng dan udang vaname kepada kelompok pembudidaya tambak.',
                'date' => '2026-08-18',
                'location' => 'Tambak Dusun Karangan',
            ],
            [
                'id' => 3,
                'title' => 'Musyawarah Rencana Pembangunan Desa (Musrenbangdes) 2026',
                'category' => 'Pemerintahan & Pelayanan',
                'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Rapat paripurna penetapan prioritas APBDes bersama BPD, LPMD, tokoh masyarakat, dan perangkat desa.',
                'date' => '2026-08-10',
                'location' => 'Balai Pertemuan Desa Karangwungu',
            ],
            [
                'id' => 4,
                'title' => 'Pavingisasi dan Drainase Jalan Lingkungan Dusun Wungu',
                'category' => 'Infrastruktur',
                'image' => 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Pekerjaan peningkatan akses jalan pemukiman warga bersumber dari alokasi Dana Desa 2026.',
                'date' => '2026-07-28',
                'location' => 'RT 03 RW 02 Dusun Wungu',
            ],
            [
                'id' => 5,
                'title' => 'Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Triwulan II',
                'category' => 'Pemerintahan & Pelayanan',
                'image' => 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Penyerahan BLT tunai kepada 45 Keluarga Penerima Manfaat (KPM) secara tertib dan transparan.',
                'date' => '2026-07-15',
                'location' => 'Kantor Balai Desa',
            ],
            [
                'id' => 6,
                'title' => 'Pawai Budaya & Sedekah Bumi Wujud Syukur Warga Desa',
                'category' => 'Seni & Tradisi Budaya',
                'image' => 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Karnaval tradisi adat sedekah bumi mengarak gunungan hasil bumi dan pertunjukan seni karawitan.',
                'date' => '2026-06-20',
                'location' => 'Sepanjang Jalan Protokol Desa',
            ],
            [
                'id' => 7,
                'title' => 'Pelatihan Digitalisasi Pemasaran UMKM & Produk Olahan Bandeng',
                'category' => 'Kegiatan Warga',
                'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Workshop bagi pelaku usaha rumahan agar produk olahan seperti bandeng presto dapat dijual via e-commerce.',
                'date' => '2026-05-12',
                'location' => 'Gedung Serbaguna Desa',
            ],
            [
                'id' => 8,
                'title' => 'Kerja Bakti Gotong Royong Normalisasi Saluran Irigasi Tersier',
                'category' => 'Kegiatan Warga',
                'image' => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
                'description' => 'Gotong royong warga membersihkan enceng gondok dan sedimen lumpur menjelang musim tanam rendeng.',
                'date' => '2026-04-05',
                'location' => 'Saluran Irigasi Dusun Krajan',
            ],
        ];

        $categories = ['Semua', 'Pemerintahan & Pelayanan', 'Pertanian & Tambak', 'Infrastruktur', 'Kegiatan Warga', 'Seni & Tradisi Budaya'];

        $filteredGalleries = $category === 'Semua'
            ? $allGalleries
            : array_values(array_filter($allGalleries, fn($g) => $g['category'] === $category));

        return Inertia::render('Gallery/Index', [
            'galleries' => $filteredGalleries,
            'selectedCategory' => $category,
            'categories' => $categories,
        ]);
    }
}
