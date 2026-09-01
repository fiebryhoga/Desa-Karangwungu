<?php

namespace Database\Seeders;

use App\Models\ApbdesRecord;
use App\Models\Feedback;
use App\Models\LetterRequest;
use App\Models\Post;
use App\Models\Potential;
use App\Models\VillageOfficial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class VillageDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Berita & Artikel Desa
        $posts = [
            [
                'title' => 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap III Tahun Anggaran 2026',
                'slug' => 'penyaluran-blt-dana-desa-tahap-iii-2026-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Pemerintah Desa Karangwungu sukses menyalurkan BLT-DD kepada 45 Keluarga Penerima Manfaat (KPM) secara transparan di Balai Desa.',
                'content' => '<p>Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan kembali menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap III Tahun Anggaran 2026. Penyaluran dilaksanakan dengan tertib dan transparan di Balai Desa Karangwungu.</p><p>Kepala Desa Karangwungu dalam sambutannya menyampaikan bahwa program BLT-DD ini ditujukan untuk membantu perekonomian masyarakat serta percepatan pengentasan kemiskinan ekstrem di wilayah Karangwungu. Setiap KPM menerima bantuan sesuai regulasi yang berlaku dengan pengawasan langsung dari BPD, Babinsa, dan Bhabinkamtibmas.</p><p>Masyarakat penerima manfaat menyambut gembira bantuan ini untuk memenuhi kebutuhan pokok keluarga dan modal usaha mikro di bidang pertanian maupun tambak ikan.</p>',
                'image' => 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Sekretariat Desa Karangwungu',
                'views' => 342,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Panen Raya Padi dan Peningkatan Produktivitas Lahan Sawah Karangwungu Lamongan',
                'slug' => 'panen-raya-padi-dan-peningkatan-produktivitas-karangwungu',
                'category' => 'Pertanian',
                'excerpt' => 'Gabungan Kelompok Tani (Gapoktan) Desa Karangwungu membukukan hasil panen padi mencapai 7,8 ton per hektar berkat modernisasi irigasi.',
                'content' => '<p>Musim panen padi kali ini membawa kabar gembira bagi para petani di Desa Karangwungu, Kecamatan Karanggeneng. Berkat perbaikan sistem saluran irigasi tersier dan penerapan pupuk organik terpadu, produktivitas padi melonjak mencapai rata-rata 7,8 ton Gabah Kering Panen (GKP) per hektar.</p><p>Kepala Desa didampingi Petugas Penyuluh Lapangan (PPL) Pertanian Kabupaten Lamongan meninjau langsung proses panen raya di hamparan sawah Dusun Karangwungu. Modernisasi alat mesin pertanian (alsintan) seperti combine harvester turut mempercepat proses pemanenan dan menekan susut panen.</p>',
                'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Tim Media Desa Karangwungu',
                'views' => 520,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Inovasi Budidaya Ikan Bandeng & Udang Vaname di Kawasan Tambak Karangwungu',
                'slug' => 'inovasi-budidaya-ikan-bandeng-udang-vaname-karangwungu',
                'category' => 'Perikanan',
                'excerpt' => 'Petambak Karangwungu mulai menerapkan teknik mina padi dan tambak ramah lingkungan untuk mendongkrak nilai jual komoditas air tawar.',
                'content' => '<p>Sektor perikanan tambak menjadi salah satu pilar ekonomi terkuat di Desa Karangwungu, Karanggeneng, Lamongan. Gabungan petambak lokal kini aktif mengembangkan metode budidaya polikultur bandeng dan udang vaname semi-intensif.</p><p>Dengan dukungan pelatihan manajemen kualitas air dari Dinas Perikanan Kabupaten Lamongan, risiko mortalitas benur dapat ditekan hingga di bawah 15%. Hasil panen bandeng Karangwungu terkenal gurih dan tidak berbau lumpur, menjadikannya primadona di pasar ikan Lamongan, Tuban, hingga Surabaya.</p>',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kaur Ekonomi & Pembangunan',
                'views' => 418,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(9),
            ],
            [
                'title' => 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Karangwungu Tahun 2027',
                'slug' => 'musrenbangdes-karangwungu-2027-aspirasi-warga',
                'category' => 'Pengumuman',
                'excerpt' => 'Pemerintah Desa Karangwungu mengundang seluruh elemen masyarakat untuk menghadiri Musrenbangdes guna merumuskan prioritas pembangunan.',
                'content' => '<p>Diberitahukan kepada seluruh warga Desa Karangwungu, tokoh masyarakat, BPD, LPM, Karang Taruna, dan perwakilan perempuan bahwa Musrenbangdes RKPDes akan diselenggarakan pada hari Kamis malam di Balai Pertemuan Umum Desa Karangwungu.</p><p>Fokus musyawarah meliputi pemantapan jalan poros desa, perluasan digitalisasi layanan masyarakat melalui portal web desa, penguatan Bumdes, dan sarana olahraga pemuda.</p>',
                'image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
                'author' => 'BPD & Pemdes Karangwungu',
                'views' => 289,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(12),
            ],
            [
                'title' => 'Pelatihan Digital Marketing & Sertifikasi Halal Gratis untuk Pelaku UMKM Desa',
                'slug' => 'pelatihan-digital-marketing-umkm-desa-karangwungu',
                'category' => 'Prestasi',
                'excerpt' => 'Sebanyak 30 pelaku usaha mikro di Karangwungu mendapatkan pendampingan foto produk, branding kemasan, dan izin edar.',
                'content' => '<p>Dalam rangka memajukan produk lokal, Pemerintah Desa Karangwungu bekerjasama dengan akademisi dan dinas terkait menyelenggarakan lokakarya pemasaran daring dan pendaftaran sertifikasi halal untuk olahan pangan khas Lamongan.</p>',
                'image' => 'https://images.unsplash.com/photo-1556742049-0a67e557b683?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Karang Taruna Karangwungu',
                'views' => 195,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(18),
            ]
        ];

        foreach ($posts as $post) {
            Post::updateOrCreate(['slug' => $post['slug']], $post);
        }

        // 2. Perangkat Desa (Pemerintahan Desa Karangwungu)
        $officials = [
            [
                'name' => 'H. Moh. Suhartono, S.Sos',
                'position' => 'Kepala Desa',
                'nip' => '19750812 200501 1 003',
                'phone' => '0812-3344-5566',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                'order' => 1,
                'bio' => 'Memimpin Desa Karangwungu dengan visi terwujudnya masyarakat yang agamis, maju, berdaya saing, transparan, dan sejahtera.',
            ],
            [
                'name' => 'Ahmad Zainuddin, S.Pd',
                'position' => 'Sekretaris Desa (Sekdes)',
                'nip' => '19820315 201001 1 012',
                'phone' => '0813-4455-6677',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                'order' => 2,
                'bio' => 'Mengkoordinasikan administrasi umum, perencanaan program kerja, dan tata kelola sistem informasi desa.',
            ],
            [
                'name' => 'Siti Nur Kholifah, S.E',
                'position' => 'Kepala Urusan Keuangan',
                'nip' => '19890420 201602 2 008',
                'phone' => '0812-5566-7788',
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                'order' => 3,
                'bio' => 'Pengelolaan sistem keuangan desa, pencatatan kas, dan pelaporan akuntabilitas APBDes Karangwungu.',
            ],
            [
                'name' => 'Rahmat Hidayat, S.T',
                'position' => 'Kepala Urusan Perencanaan & Umum',
                'nip' => '19920110 201901 1 005',
                'phone' => '0857-1122-3344',
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                'order' => 4,
                'bio' => 'Penyusunan dokumen perencanaan desa, aset, serta inventarisasi sarana prasarana.',
            ],
            [
                'name' => 'Bambang Kusuma, S.Sos',
                'position' => 'Kepala Seksi Pelayanan',
                'nip' => '19850614 201201 1 009',
                'phone' => '0813-7788-9900',
                'photo' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
                'order' => 5,
                'bio' => 'Bertanggung jawab atas administrasi kependudukan, permohonan surat warga, dan perizinan.',
            ],
            [
                'name' => 'Miftahul Huda',
                'position' => 'Kepala Seksi Kesejahteraan & Pembangunan',
                'nip' => '19881105 201501 1 007',
                'phone' => '0821-3322-1100',
                'photo' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
                'order' => 6,
                'bio' => 'Mengawasi pelaksanaan pembangunan fisik, saluran air tambak, dan pemberdayaan sosial.',
            ],
            [
                'name' => 'Sunarto',
                'position' => 'Kepala Dusun (Kasun) Karangwungu',
                'nip' => null,
                'phone' => '0858-9988-7766',
                'photo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
                'order' => 7,
                'bio' => 'Pelayan masyarakat tingkat kewilayahan dusun dan koordinator ketenteraman lingkungan.',
            ],
        ];

        foreach ($officials as $official) {
            VillageOfficial::updateOrCreate(['name' => $official['name']], $official);
        }

        // 3. APBDes Transparansi Tahun Berjalan (2026)
        $apbdes = [
            // Pendapatan
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Dana Desa (APBN)', 'subcategory_name' => 'Alokasi Pemerintah Pusat', 'budget_amount' => 920000000, 'realized_amount' => 690000000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Alokasi Dana Desa (ADD Kab. Lamongan)', 'subcategory_name' => 'Pemerintah Kabupaten', 'budget_amount' => 485000000, 'realized_amount' => 363750000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Pendapatan Asli Desa (PADes)', 'subcategory_name' => 'Hasil Tanah Kas Desa & Pasar Desa', 'budget_amount' => 95000000, 'realized_amount' => 78000000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Bagi Hasil Pajak & Retribusi Daerah', 'subcategory_name' => 'Pemerintah Daerah Lamongan', 'budget_amount' => 65000000, 'realized_amount' => 45500000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Bantuan Keuangan Provinsi Jawa Timur', 'subcategory_name' => 'Infrastruktur Pedesaan', 'budget_amount' => 150000000, 'realized_amount' => 150000000],

            // Belanja
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Siltap, Operasional Kantor & BPD', 'budget_amount' => 480000000, 'realized_amount' => 360000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Jalan Rabat Beton, JUT, & Irigasi', 'budget_amount' => 745000000, 'realized_amount' => 590000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Pembinaan Kemasyarakatan', 'subcategory_name' => 'Karang Taruna, Keagamaan, & Olahraga', 'budget_amount' => 140000000, 'realized_amount' => 105000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Pemberdayaan Masyarakat', 'subcategory_name' => 'Pelatihan Petani & Tambak Ikan, UMKM', 'budget_amount' => 210000000, 'realized_amount' => 155000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Penanggulangan Bencana & Mendesak', 'subcategory_name' => 'BLT-DD & Tanggap Darurat', 'budget_amount' => 140000000, 'realized_amount' => 117250000],

            // Pembiayaan
            ['year' => 2026, 'type' => 'financing', 'category_name' => 'Penerimaan Pembiayaan (SiLPA 2025)', 'subcategory_name' => 'Sisa Lebih Perhitungan Anggaran', 'budget_amount' => 60000000, 'realized_amount' => 60000000],
            ['year' => 2026, 'type' => 'financing', 'category_name' => 'Penyertaan Modal BUMDes Karangwungu', 'subcategory_name' => 'Unit Usaha Simpan Pinjam & Sarana Tani', 'budget_amount' => 50000000, 'realized_amount' => 50000000],
        ];

        foreach ($apbdes as $record) {
            ApbdesRecord::create($record);
        }

        // 4. Potensi & Produk Unggulan Desa Karangwungu
        $potentials = [
            [
                'title' => 'Budidaya Bandeng & Udang Vaname Tambak Karangwungu',
                'slug' => 'bandeng-dan-udang-vaname-karangwungu',
                'category' => 'Perikanan Tambak',
                'description' => 'Komoditas perikanan unggulan hasil budidaya air payau/tawar dengan kualitas daging padat dan segar, dipasok rutin ke pasar ikan Lamongan dan restoran se-Jawa Timur.',
                'owner_name' => 'Kelompok Pembudidaya Ikan Mina Makmur',
                'contact_phone' => '0812-9988-1122',
                'price_range' => 'Rp 28.000 - Rp 75.000 / kg',
                'location' => 'Kawasan Tambak Dusun Krajan & Sumberagung',
                'image' => 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Padi Varietas Unggul & Beras Organik Karangwungu',
                'slug' => 'beras-organik-karangwungu',
                'category' => 'Pertanian',
                'description' => 'Padi sawah berkualitas tinggi hasil panen tanah subur bantaran sungai Karanggeneng, diproses secara higienis menghasilkan beras pulen dan wangi alami.',
                'owner_name' => 'Gapoktan Sumber Rejeki Karangwungu',
                'contact_phone' => '0857-4433-2211',
                'price_range' => 'Rp 14.500 / kg',
                'location' => 'Lahan Persawahan Blok Tengah',
                'image' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Kerupuk Ikan & Otak-otak Bandeng Khas Karangwungu',
                'slug' => 'kerupuk-ikan-dan-otak-otak-bandeng-karangwungu',
                'category' => 'UMKM Makanan',
                'description' => 'Produk olahan ikan tradisional resep turun-temurun tanpa bahan pengawet buatan, gurih dan renyah cocok sebagai oleh-oleh khas Lamongan.',
                'owner_name' => 'UMKM Barokah Rasa',
                'contact_phone' => '0822-6655-4433',
                'price_range' => 'Rp 15.000 - Rp 35.000 / kemasan',
                'location' => 'RT 02 RW 01 Desa Karangwungu',
                'image' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Kerajinan Anyaman Tikar Mendong & Souvenir Alami',
                'slug' => 'anyaman-tikar-mendong-karangwungu',
                'category' => 'Kerajinan',
                'description' => 'Kerajinan anyaman tangan karya ibu-ibu PKK Desa Karangwungu yang ramah lingkungan dan memiliki nilai estetika tinggi untuk dekorasi interior.',
                'owner_name' => 'Kelompok Pengrajin Melati Karangwungu',
                'contact_phone' => '0813-8877-6655',
                'price_range' => 'Rp 30.000 - Rp 120.000',
                'location' => 'Sanggar PKK Dusun Timur',
                'image' => 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
            ],
        ];

        foreach ($potentials as $item) {
            Potential::updateOrCreate(['slug' => $item['slug']], $item);
        }

        // 5. Contoh Surat Permohonan Online (Tracking Code)
        $sampleLetters = [
            [
                'tracking_code' => 'KW-20260901-001',
                'citizen_name' => 'Budi Prasetyo',
                'citizen_nik' => '3524101205900001',
                'citizen_phone' => '081234567891',
                'citizen_address' => 'RT 01 RW 01 Dusun Krajan Desa Karangwungu',
                'letter_type' => 'Surat Keterangan Usaha (SKU)',
                'purpose' => 'Persyaratan pengajuan modal usaha KUR BRI Unit Karanggeneng',
                'status' => 'completed',
                'admin_notes' => 'Surat telah ditandatangani Kepala Desa dan siap diambil di kantor Balai Desa atau diunduh online.',
                'created_at' => Carbon::now()->subDays(1),
            ],
            [
                'tracking_code' => 'KW-20260901-002',
                'citizen_name' => 'Nurul Aini',
                'citizen_nik' => '3524105508950003',
                'citizen_phone' => '085712349876',
                'citizen_address' => 'RT 03 RW 02 Dusun Karangwungu',
                'letter_type' => 'Surat Keterangan Domisili',
                'purpose' => 'Kelengkapan berkas pendaftaran beasiswa perguruan tinggi',
                'status' => 'processing',
                'admin_notes' => 'Berkas sedang diverifikasi oleh Kepala Seksi Pelayanan.',
                'created_at' => Carbon::now()->subHours(4),
            ],
        ];

        foreach ($sampleLetters as $letter) {
            LetterRequest::updateOrCreate(['tracking_code' => $letter['tracking_code']], $letter);
        }

        // 6. Aspirasi & Feedback Warga
        $feedbacks = [
            [
                'name' => 'Hasan Basri',
                'contact_info' => '0813-xxxx-xxxx',
                'category' => 'Infrastruktur',
                'message' => 'Terima kasih kepada Pemdes Karangwungu atas perbaikan saluran drainase di jalan poros dusun timur, saat hujan deras kemarin air langsung lancar tidak menggenang lagi.',
                'is_public' => true,
                'response' => 'Terima kasih atas apresiasinya bapak Hasan. Pemdes Karangwungu terus berkomitmen menjaga dan merawat infrastruktur demi kenyamanan seluruh warga.',
            ],
            [
                'name' => 'Warga RT 02',
                'contact_info' => 'warga.rt02@gmail.com',
                'category' => 'Pelayanan',
                'message' => 'Layanan surat online di website desa ini sangat mempermudah warga yang bekerja di luar kota sehingga tidak perlu bolak-balik ke kantor desa hanya untuk cek berkas.',
                'is_public' => true,
                'response' => 'Alhamdulillah, kami senang layanan digital desa dapat bermanfaat optimal untuk seluruh masyarakat Karangwungu di manapun berada.',
            ],
        ];

        foreach ($feedbacks as $fb) {
            Feedback::create($fb);
        }
    }
}
