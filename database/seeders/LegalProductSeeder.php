<?php

namespace Database\Seeders;

use App\Models\LegalProduct;
use Illuminate\Database\Seeder;

class LegalProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Penetapan Penerima Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahun Anggaran 2026',
                'document_type' => 'Keputusan Kepala Desa (SK)',
                'document_number' => '141/04/KEP/413.312.08/2026',
                'year' => 2026,
                'effective_date' => '2026-01-15',
                'status' => 'active',
                'description' => 'Menetapkan daftar nama keluarga penerima manfaat Bantuan Langsung Tunai Dana Desa (BLT-DD) Desa Karangwungu Tahun Anggaran 2026 sebagai upaya percepatan penghapusan kemiskinan ekstrem.',
                'file_url' => null,
                'file_name' => 'SK_Kades_BLTDD_2026_Karangwungu.pdf',
                'file_size' => '1.4 MB',
                'download_count' => 48,
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu Tahun Anggaran 2026',
                'document_type' => 'Peraturan Desa (Perdes)',
                'document_number' => 'Nomor 01 Tahun 2026',
                'year' => 2026,
                'effective_date' => '2026-01-05',
                'status' => 'active',
                'description' => 'Peraturan Desa Karangwungu tentang Anggaran Pendapatan dan Belanja Desa Tahun Anggaran 2026, memuat alokasi pendapatan asli desa, dana transfer, belanja pembangunan, dan pembiayaan.',
                'file_url' => null,
                'file_name' => 'Perdes_APBDes_2026_Desa_Karangwungu.pdf',
                'file_size' => '2.8 MB',
                'download_count' => 124,
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Rencana Kerja Pemerintah Desa (RKPDes) Karangwungu Tahun 2026',
                'document_type' => 'Peraturan Desa (Perdes)',
                'document_number' => 'Nomor 05 Tahun 2025',
                'year' => 2025,
                'effective_date' => '2025-09-30',
                'status' => 'active',
                'description' => 'Dokumen perencanaan tahunan desa yang memuat rancangan prioritas program pembangunan sarana prasarana, ketahanan pangan, dan pemberdayaan masyarakat desa.',
                'file_url' => null,
                'file_name' => 'Perdes_RKPDes_2026_Karangwungu.pdf',
                'file_size' => '3.5 MB',
                'download_count' => 67,
                'is_active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Pengangkatan dan Penetapan Pengurus Badan Usaha Milik Desa (BUMDes) Karangwungu Sejahtera Masa Bakti 2025–2028',
                'document_type' => 'Keputusan Kepala Desa (SK)',
                'document_number' => '141/18/KEP/413.312.08/2025',
                'year' => 2025,
                'effective_date' => '2025-06-10',
                'status' => 'active',
                'description' => 'Pengangkatan pengurus harian dan unit usaha BUMDes Karangwungu Sejahtera dalam rangka optimalisasi pengelolaan tambak air payau, pasar desa, dan unit jasa keuangan desa.',
                'file_url' => null,
                'file_name' => 'SK_Pengurus_BUMDes_2025_2028.pdf',
                'file_size' => '1.1 MB',
                'download_count' => 35,
                'is_active' => true,
                'order' => 4,
            ],
            [
                'title' => 'Pengelolaan Sampah Mandiri dan Ketertiban Lingkungan Permukiman Desa Karangwungu',
                'document_type' => 'Peraturan Desa (Perdes)',
                'document_number' => 'Nomor 03 Tahun 2024',
                'year' => 2024,
                'effective_date' => '2024-04-18',
                'status' => 'active',
                'description' => 'Ketentuan tata tertib kebersihan lingkungan desa, pemilahan sampah rumah tangga berbasis 3R, serta larangan membuang limbah ke saluran irigasi tambak.',
                'file_url' => null,
                'file_name' => 'Perdes_Pengelolaan_Sampah_Lingkungan_Karangwungu.pdf',
                'file_size' => '1.8 MB',
                'download_count' => 82,
                'is_active' => true,
                'order' => 5,
            ],
            [
                'title' => 'Pembentukan Kader Posyandu Terintegrasi dan Tim Pendamping Penurunan Stunting Desa Karangwungu',
                'document_type' => 'Keputusan Kepala Desa (SK)',
                'document_number' => '141/07/KEP/413.312.08/2026',
                'year' => 2026,
                'effective_date' => '2026-02-01',
                'status' => 'active',
                'description' => 'Susunan tim kerja pendampingan keluarga berisiko stunting dan petugas penimbangan rutin balita di Posyandu Balai Desa Karangwungu.',
                'file_url' => null,
                'file_name' => 'SK_Kader_Posyandu_Stunting_2026.pdf',
                'file_size' => '950 KB',
                'download_count' => 29,
                'is_active' => true,
                'order' => 6,
            ],
            [
                'title' => 'Laporan Pertanggungjawaban Realisasi Pelaksanaan APBDes Karangwungu Tahun Anggaran 2024',
                'document_type' => 'Peraturan Desa (Perdes)',
                'document_number' => 'Nomor 01 Tahun 2025',
                'year' => 2025,
                'effective_date' => '2025-01-20',
                'status' => 'active',
                'description' => 'Laporan akuntabilitas keuangan dan evaluasi pelaksanaan program kerja APBDes Karangwungu tahun anggaran sebelumnya.',
                'file_url' => null,
                'file_name' => 'Perdes_LPJ_APBDes_2024.pdf',
                'file_size' => '2.1 MB',
                'download_count' => 91,
                'is_active' => true,
                'order' => 7,
            ],
        ];

        foreach ($items as $item) {
            LegalProduct::updateOrCreate(
                ['document_number' => $item['document_number']],
                $item
            );
        }
    }
}
