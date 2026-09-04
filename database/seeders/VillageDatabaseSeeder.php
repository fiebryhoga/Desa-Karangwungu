<?php

namespace Database\Seeders;

use App\Models\ApbdesRecord;
use App\Models\Comment;
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
        // 1. Berita & Artikel Desa (20 Artikel Lengkap)
        $posts = [
            [
                'title' => 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap III Tahun Anggaran 2026',
                'slug' => 'penyaluran-blt-dana-desa-tahap-iii-2026-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Pemerintah Desa Karangwungu sukses menyalurkan BLT-DD kepada 45 Keluarga Penerima Manfaat (KPM) secara transparan di Balai Desa.',
                'content' => '<p>Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan kembali menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap III Tahun Anggaran 2026. Penyaluran dilaksanakan dengan tertib dan transparan di Balai Desa Karangwungu.</p><p>Kepala Desa Karangwungu dalam sambutannya menyampaikan bahwa program BLT-DD ini ditujukan untuk membantu perekonomian masyarakat serta percepatan pengentasan kemiskinan ekstrem di wilayah Karangwungu.</p>',
                'image' => 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Sekretariat Desa Karangwungu',
                'views' => 742,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(1),
            ],
            [
                'title' => 'Panen Raya Padi dan Peningkatan Produktivitas Lahan Sawah Karangwungu Lamongan',
                'slug' => 'panen-raya-padi-dan-peningkatan-produktivitas-karangwungu',
                'category' => 'Pertanian',
                'excerpt' => 'Gabungan Kelompok Tani (Gapoktan) Desa Karangwungu membukukan hasil panen padi mencapai 7,8 ton per hektar berkat modernisasi irigasi.',
                'content' => '<p>Musim panen padi kali ini membawa kabar gembira bagi para petani di Desa Karangwungu, Kecamatan Karanggeneng. Berkat perbaikan sistem saluran irigasi tersier dan penerapan pupuk organik terpadu, produktivitas padi melonjak mencapai rata-rata 7,8 ton per hektar.</p>',
                'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Tim Media Desa Karangwungu',
                'views' => 1250,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Inovasi Budidaya Ikan Bandeng & Udang Vaname di Kawasan Tambak Karangwungu',
                'slug' => 'inovasi-budidaya-ikan-bandeng-udang-vaname-karangwungu',
                'category' => 'Perikanan',
                'excerpt' => 'Petambak Karangwungu mulai menerapkan teknik mina padi dan tambak ramah lingkungan untuk mendongkrak nilai jual komoditas air payau.',
                'content' => '<p>Sektor perikanan tambak menjadi salah satu pilar ekonomi terkuat di Desa Karangwungu, Karanggeneng, Lamongan. Gabungan petambak lokal kini aktif mengembangkan metode budidaya polikultur bandeng dan udang vaname semi-intensif.</p>',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kaur Ekonomi & Pembangunan',
                'views' => 890,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Karangwungu Tahun 2027',
                'slug' => 'musrenbangdes-karangwungu-2027-aspirasi-warga',
                'category' => 'Pengumuman',
                'excerpt' => 'Pemerintah Desa Karangwungu mengundang seluruh elemen masyarakat untuk menghadiri Musrenbangdes guna merumuskan prioritas pembangunan.',
                'content' => '<p>Diberitahukan kepada seluruh warga Desa Karangwungu, tokoh masyarakat, BPD, LPM, Karang Taruna, dan perwakilan perempuan bahwa Musrenbangdes RKPDes akan diselenggarakan pada hari Kamis malam di Balai Pertemuan Umum Desa Karangwungu.</p>',
                'image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
                'author' => 'BPD & Pemdes Karangwungu',
                'views' => 450,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(4),
            ],
            [
                'title' => 'Pelatihan Digital Marketing & Sertifikasi Halal Gratis untuk Pelaku UMKM Desa',
                'slug' => 'pelatihan-digital-marketing-umkm-desa-karangwungu',
                'category' => 'Prestasi',
                'excerpt' => 'Sebanyak 30 pelaku usaha mikro di Karangwungu mendapatkan pendampingan foto produk, branding kemasan, dan izin edar.',
                'content' => '<p>Dalam rangka memajukan produk lokal, Pemerintah Desa Karangwungu bekerjasama dengan akademisi dan dinas terkait menyelenggarakan lokakarya pemasaran daring dan pendaftaran sertifikasi halal untuk olahan pangan khas Lamongan.</p>',
                'image' => 'https://images.unsplash.com/photo-1556742049-0a67e557b683?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Karang Taruna Karangwungu',
                'views' => 620,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Pelayanan Posyandu Balita & Lansia Terpadu Cegah Stunting di Desa Karangwungu',
                'slug' => 'pelayanan-posyandu-balita-dan-lansia-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Kader PKK dan Bidan Desa Karangwungu aktif berikan pemeriksaan gizi, vitamin, serta penimbangan balita berkala.',
                'content' => '<p>Pemerintah Desa Karangwungu melalui Pokja IV PKK dan Tenaga Kesehatan Puskesmas Karanggeneng rutin menggelar Posyandu Balita dan Lansia Terpadu di Balai Dusun. Upaya ini penting menjaga angka stunting tetap 0%.</p>',
                'image' => 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kader PKK Karangwungu',
                'views' => 580,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(6),
            ],
            [
                'title' => 'Pembangunan Rabat Beton Jalan Usaha Tani Dusun Karangwungu Tuntas 100%',
                'slug' => 'pembangunan-rabat-beton-jalan-usaha-tani-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Akses pengangkutan hasil panen padi dan tambak semakin lancar berkat selesainya pembangunan rabat beton jalan sepanjang 850 meter.',
                'content' => '<p>Pemerintah Desa Karangwungu meresmikan selesainya proyek jalan usaha tani yang menghubungkan persawahan dengan jalan poros desa. Pembangunan menggunakan alokasi Dana Desa tahun 2026 dengan sistem swakelola warga.</p>',
                'image' => 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Tim Pelaksana Kegiatan (TPK)',
                'views' => 430,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Peluncuran Aplikasi Pelayanan Surat Mandiri Online Desa Karangwungu',
                'slug' => 'peluncuran-aplikasi-surat-mandiri-online-karangwungu',
                'category' => 'Pengumuman',
                'excerpt' => 'Warga kini dapat mengajukan surat keterangan domisili, usaha, dan pengantar SKCK dari rumah secara instan melalui HP.',
                'content' => '<p>Langkah percepatan transformasi digital desa resmi dirilis oleh Kepala Desa Karangwungu. Melalui modul Layanan Online di website desa, warga hanya perlu mengisi formulir dan melacak statusnya secara real-time.</p>',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Operator Sistem Informasi Desa',
                'views' => 1120,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(8),
            ],
            [
                'title' => 'Kerja Bakti Massal Bersih Desa dan Normalisasi Saluran Irigasi Pertanian',
                'slug' => 'kerja-bakti-massal-bersih-desa-normalisasi-irigasi',
                'category' => 'Berita',
                'excerpt' => 'Ratusan warga bersama perangkat desa bergotong-royong membersihkan sedimentasi kali demi kelancaran pasokan air tanam padi.',
                'content' => '<p>Budaya gotong royong tetap mengakar kuat di Desa Karangwungu. Pada Minggu pagi, warga serentak membersihkan gulma air dan sedimentasi lumpur di saluran primer sepanjang 2 kilometer.</p>',
                'image' => 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Ketua RT / RW Se-Karangwungu',
                'views' => 375,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(9),
            ],
            [
                'title' => 'Turnamen Bola Voli Antar-Dusun Piala Kades Karangwungu Cup 2026',
                'slug' => 'turnamen-bola-voli-kades-karangwungu-cup-2026',
                'category' => 'Prestasi',
                'excerpt' => 'Ajang kompetisi olahraga pemuda menyedot antusiasme tinggi warga dengan sajian pertandingan sportivitas yang meriah.',
                'content' => '<p>Dalam rangka memupuk solidaritas generasi muda, Karang Taruna Karangwungu menggelar kejuaraan bola voli antar-dusun di lapangan olahraga desa yang baru saja direnovasi.</p>',
                'image' => 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Panitia Olahraga Karang Taruna',
                'views' => 690,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(10),
            ],
            [
                'title' => 'BUMDes Karangwungu Sukses Pasarkan Olahan Abon Ikan Bandeng ke Luar Daerah',
                'slug' => 'bumdes-karangwungu-pasarkan-abon-bandeng-luar-daerah',
                'category' => 'Perikanan',
                'excerpt' => 'Unit usaha BUMDes Karangwungu berhasil menembus pasar ritel modern di Surabaya dan Malang dengan produk abon tanpa duri.',
                'content' => '<p>Diversifikasi hasil perikanan tambak Karangwungu mulai membuahkan hasil manis. BUMDes mengolah ikan bandeng segar menjadi abon gurih higienis yang laris manis dipesan sebagai oleh-oleh khas Lamongan.</p>',
                'image' => 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Direktur BUMDes Karangwungu',
                'views' => 840,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(11),
            ],
            [
                'title' => 'Sosialisasi Pencegahan Demam Berdarah dan Pembagian Abate Gratis Door to Door',
                'slug' => 'sosialisasi-pencegahan-dbd-pembagian-abate-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Kader Jumantik Karangwungu menyisir bak penampungan air warga untuk memastikan bebas dari jentik nyamuk Aedes aegypti.',
                'content' => '<p>Memasuki peralihan musim hujan, Pemerintah Desa Karangwungu mengintensifkan gerakan 3M Plus dan membagikan bubuk abate secara gratis kepada seluruh rumah warga tanpa terkecuali.</p>',
                'image' => 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kader Kesehatan Desa',
                'views' => 310,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(12),
            ],
            [
                'title' => 'Pengukuhan Pengurus Baru Karang Taruna Karya Mandiri Masa Bakti 2026-2029',
                'slug' => 'pengukuhan-pengurus-karang-taruna-karya-mandiri',
                'category' => 'Pengumuman',
                'excerpt' => 'Kepala Desa resmi melantik jajaran pemuda penggerak desa yang siap berkontribusi dalam digitalisasi dan sosial kemasyarakatan.',
                'content' => '<p>Prosesi pelantikan berlangsung khidmat di pendopo balai desa. Pengurus baru berkomitmen membawa energi inovasi untuk memajukan potensi wisata desa dan pemberdayaan pemuda karangwungu.</p>',
                'image' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Sekretariat Desa Karangwungu',
                'views' => 460,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(13),
            ],
            [
                'title' => 'Workshop Budidaya Hidroponik dan Pemanfaatan Pekarangan Rumah Ibu PKK',
                'slug' => 'workshop-budidaya-hidroponik-pekarangan-rumah-pkk',
                'category' => 'Pertanian',
                'excerpt' => 'Ibu-ibu PKK Karangwungu memanen sayuran organik pakcoy dan selada hidroponik hasil pemanfaatan pekarangan rumah tangga.',
                'content' => '<p>Program Aku Hatinya PKK di Desa Karangwungu sukses mengajak warga menanam sayur mandiri ramah lingkungan menggunakan pipa paralon dan nutrisi organik, hemat lahan dan bernilai ekonomis tinggi.</p>',
                'image' => 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Tim Penggerak PKK Karangwungu',
                'views' => 520,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(14),
            ],
            [
                'title' => 'Pemdes Karangwungu Raih Penghargaan Desa Sadar Hukum Kemenkumham RI',
                'slug' => 'pemdes-karangwungu-raih-penghargaan-desa-sadar-hukum',
                'category' => 'Prestasi',
                'excerpt' => 'Tingkat kepatuhan hukum, keamanan lingkungan yang kondusif, dan tertib administrasi mengantarkan Karangwungu raih predikat istimewa.',
                'content' => '<p>Desa Karangwungu dinobatkan sebagai salah satu Desa Binaan Sadar Hukum terbaik tingkat Kabupaten Lamongan dengan nihilnya angka sengketa tanah dan tingginya kesadaran kamtibmas warga.</p>',
                'image' => 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Bagian Hukum Pemdes Karangwungu',
                'views' => 970,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(15),
            ],
            [
                'title' => 'Peringatan Maulid Nabi Muhammad SAW dan Santunan Anak Yatim di Balai Desa',
                'slug' => 'peringatan-maulid-nabi-santunan-anak-yatim-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Ratusan jamaah pengajian memadati balai desa dalam lantunan shalawat serta penyaluran santunan bagi puluhan anak yatim.',
                'content' => '<p>Kegiatan keagamaan rutin tahunan Desa Karangwungu berlangsung khusyuk dan penuh berkah. Donasi yang terkumpul disalurkan langsung kepada anak yatim dan dhuafa di lingkungan desa.</p>',
                'image' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Takmir Masjid & Pemdes Karangwungu',
                'views' => 610,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(16),
            ],
            [
                'title' => 'Bantuan Bibit Padi Unggul dan Pupuk Bersubsidi Disalurkan ke Gapoktan',
                'slug' => 'bantuan-bibit-padi-unggul-pupuk-bersubsidi-gapoktan',
                'category' => 'Pertanian',
                'excerpt' => 'Sebanyak 5 ton benih padi bersertifikat varietas Inpari 32 dibagikan gratis untuk menjamin ketahanan pangan musim tanam kedua.',
                'content' => '<p>Pemerintah Desa Karangwungu bekerja sama dengan Dinas Pertanian Kabupaten Lamongan memastikan distribusi pupuk bersubsidi dan bantuan bibit tepat sasaran kepada seluruh anggota kelompok tani.</p>',
                'image' => 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kaur Ekonomi & Pembangunan',
                'views' => 480,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(17),
            ],
            [
                'title' => 'Pemasangan 50 Titik Lampu Penerangan Jalan Umum Tenaga Surya (PJU-TS)',
                'slug' => 'pemasangan-50-titik-pju-tenaga-surya-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Jalan desa dan persimpangan dusun kini terang benderang di malam hari dengan penerangan ramah lingkungan tanpa beban tagihan listrik.',
                'content' => '<p>Infrastruktur penerangan jalan umum tenaga surya dipasang merata di jalur utama dan jalan tembus antar-dusun Karangwungu guna meningkatkan keselamatan berkendara dan keamanan lingkungan malam hari.</p>',
                'image' => 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kaur Perencanaan & Umum',
                'views' => 780,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(18),
            ],
            [
                'title' => 'Pembentukan Bank Sampah Berkah Mandiri Karangwungu untuk Atasi Sampah Plastik',
                'slug' => 'pembentukan-bank-sampah-berkah-mandiri-karangwungu',
                'category' => 'Berita',
                'excerpt' => 'Warga dapat menukarkan sampah anorganik terpilah menjadi tabungan emas dan saldo rekening sembako.',
                'content' => '<p>Inisiatif lingkungan hijau Desa Karangwungu meluncurkan Bank Sampah Berkah Mandiri. Edukasi pemilahan sampah dari tingkat rumah tangga disambut positif oleh kader dasawisma dan pemuda desa.</p>',
                'image' => 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Pengurus Bank Sampah Desa',
                'views' => 390,
                'is_featured' => false,
                'published_at' => Carbon::now()->subDays(19),
            ],
            [
                'title' => 'Layanan Jemput Bola Perekaman E-KTP dan Kartu Identitas Anak (KIA) di Balai Desa',
                'slug' => 'layanan-jemput-bola-e-ktp-dan-kia-balai-desa',
                'category' => 'Pengumuman',
                'excerpt' => 'Disdukcapil Kabupaten Lamongan bersama Pemdes Karangwungu membuka pelayanan adminduk kilat langsung jadi satu hari.',
                'content' => '<p>Kemudahan pengurusan dokumen kependudukan dirasakan langsung oleh lebih dari 150 warga lansia, disabilitas, dan pelajar yang mengurus KTP Elektronik serta KIA tanpa perlu datang ke kantor kecamatan.</p>',
                'image' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
                'author' => 'Kasi Pemerintahan Desa Karangwungu',
                'views' => 1050,
                'is_featured' => true,
                'published_at' => Carbon::now()->subDays(20),
            ],
        ];

        foreach ($posts as $postData) {
            $post = Post::updateOrCreate(['slug' => $postData['slug']], $postData);
        }

        // Seed Sample Comments for Posts
        $musrenbangPost = Post::where('slug', 'musrenbangdes-karangwungu-2027-aspirasi-warga')->first();
        if ($musrenbangPost) {
            $budiComment = Comment::updateOrCreate(
                ['post_id' => $musrenbangPost->id, 'name' => 'Budi Santoso'],
                [
                    'email' => 'budi.santoso@gmail.com',
                    'content' => 'Alhamdulillah, usulan perbaikan jalan poros dusun akhirnya masuk dalam prioritas Musrenbangdes 2027. Semoga proses realisasinya lancar.',
                    'is_approved' => true,
                    'created_at' => Carbon::now()->subDays(2),
                ]
            );

            // Sample Reply from Admin / Village Official
            Comment::updateOrCreate(
                ['post_id' => $musrenbangPost->id, 'name' => 'Admin Pemdes Karangwungu', 'parent_id' => $budiComment->id],
                [
                    'email' => 'pemdes@karangwungu-lamongan.desa.id',
                    'content' => 'Terima kasih atas masukannya Pak Budi. Tahap pengukuran dan verifikasi teknis oleh tim PU akan dimulai akhir bulan ini.',
                    'is_approved' => true,
                    'created_at' => Carbon::now()->subDays(1)->subHours(3),
                ]
            );

            Comment::updateOrCreate(
                ['post_id' => $musrenbangPost->id, 'name' => 'Hj. Aminah'],
                [
                    'email' => 'aminah.karangwungu@gmail.com',
                    'content' => 'Sangat mengapresiasi transparansi pemerintah desa dalam menampung aspirasi ibu-ibu kelompok tani dan posyandu.',
                    'is_approved' => true,
                    'created_at' => Carbon::now()->subHours(18),
                ]
            );

            Comment::updateOrCreate(
                ['post_id' => $musrenbangPost->id, 'name' => 'Faris Pratama'],
                [
                    'email' => 'faris.pemuda@yahoo.com',
                    'content' => 'Maju terus Desa Karangwungu! Jangan lupa fasilitas olahraga dan ruang kreasi pemuda juga perlu terus didukung.',
                    'is_approved' => true,
                    'created_at' => Carbon::now()->subHours(5),
                ]
            );
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

        // 3. APBDes Transparansi Karangwungu (Official Infographic Data)
        $apbdes = [
            // PENDAPATAN DESA (Total: Rp 1.385.979.500)
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Dana Desa (DD)', 'subcategory_name' => 'Pemerintah Pusat (APBN)', 'budget_amount' => 785251000, 'realized_amount' => 785251000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Alokasi Dana Desa (ADD)', 'subcategory_name' => 'Pemerintah Kabupaten Lamongan', 'budget_amount' => 276248000, 'realized_amount' => 276248000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Bantuan Keuangan APBD Kabupaten (PBK)', 'subcategory_name' => 'Bantuan Keuangan Khusus Kabupaten', 'budget_amount' => 210000000, 'realized_amount' => 210000000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Pendapatan Asli Desa (PAD)', 'subcategory_name' => 'Hasil Tanah Kas Desa & Pemanfaatan Aset', 'budget_amount' => 80000000, 'realized_amount' => 80000000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Bagi Hasil Pajak & Retribusi Daerah (PBH)', 'subcategory_name' => 'Bagi Hasil Pajak & Retribusi Daerah', 'budget_amount' => 28480500, 'realized_amount' => 28480500],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Lain-Lain Pendapatan Asli Desa Yang Sah (DLL)', 'subcategory_name' => 'Pendapatan Lain-Lain Yang Sah', 'budget_amount' => 6000000, 'realized_amount' => 6000000],
            ['year' => 2026, 'type' => 'income', 'category_name' => 'Bantuan Keuangan APBD Provinsi (PBP)', 'subcategory_name' => 'Pemerintah Provinsi Jawa Timur', 'budget_amount' => 0, 'realized_amount' => 0],

            // BELANJA DESA (Total: Rp 1.385.979.500)
            // 1. Bidang Pelaksanaan Pembangunan Desa (Rp 799.051.000)
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Pembangunan Gedung Serba Guna', 'budget_amount' => 360000000, 'realized_amount' => 360000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'TPT (Tembok Penahan Tanah) Dan Makadam', 'budget_amount' => 160000000, 'realized_amount' => 160000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Rehabilitasi Kantor Desa', 'budget_amount' => 100000000, 'realized_amount' => 100000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Tembok Penahan Tanah (Depan Balai Desa)', 'budget_amount' => 75000000, 'realized_amount' => 75000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Pembangunan Jalan Utama', 'budget_amount' => 35000000, 'realized_amount' => 35000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Pencegahan Stunting', 'budget_amount' => 24801000, 'realized_amount' => 24801000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Bantuan Operasional Mobil Sehat', 'budget_amount' => 20000000, 'realized_amount' => 20000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Insentif Guru PAUD/TK/TPA/TPQ/Madrasah', 'budget_amount' => 14250000, 'realized_amount' => 14250000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pelaksanaan Pembangunan Desa', 'subcategory_name' => 'Pemutakhiran data SDGs Desa', 'budget_amount' => 10000000, 'realized_amount' => 10000000],

            // 2. Bidang Penyelenggaraan Pemerintahan Desa (Rp 422.728.500)
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Penghasilan Tetap dan Tunjangan', 'budget_amount' => 312557840, 'realized_amount' => 312557840],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional Pemerintahan Desa', 'budget_amount' => 46036536, 'realized_amount' => 46036536],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Kegiatan Pembayaran Premi Asuransi/BPJS', 'budget_amount' => 18209124, 'realized_amount' => 18209124],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Penyediaan Operasional dan Tunjangan BPD', 'budget_amount' => 11900000, 'realized_amount' => 11900000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional operator siskeudes', 'budget_amount' => 9000000, 'realized_amount' => 9000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Insentif RT/RW', 'budget_amount' => 5200000, 'realized_amount' => 5200000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Kegiatan Fasilitasi Kegiatan Hari Besar', 'budget_amount' => 5100000, 'realized_amount' => 5100000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional PKK', 'budget_amount' => 4000000, 'realized_amount' => 4000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional LPM', 'budget_amount' => 2500000, 'realized_amount' => 2500000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Penyusunan RKP', 'budget_amount' => 2500000, 'realized_amount' => 2500000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Penyusunan APBDes', 'budget_amount' => 2500000, 'realized_amount' => 2500000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional Karangtaruna', 'budget_amount' => 1500000, 'realized_amount' => 1500000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional Posyandu', 'budget_amount' => 1000000, 'realized_amount' => 1000000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penyelenggaraan Pemerintahan Desa', 'subcategory_name' => 'Operasional Linmas', 'budget_amount' => 725000, 'realized_amount' => 725000],

            // 3. Bidang Penanggulangan Bencana (Rp 104.200.000)
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penanggulangan Bencana', 'subcategory_name' => 'Bantuan Langsung Tunai (BLT)', 'budget_amount' => 79200000, 'realized_amount' => 79200000],
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Penanggulangan Bencana', 'subcategory_name' => 'Mitigasi Bencana', 'budget_amount' => 25000000, 'realized_amount' => 25000000],

            // 4. Bidang Pemberdayaan Masyarakat (Rp 50.000.000)
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pemberdayaan Masyarakat', 'subcategory_name' => 'Penyertaan Modal Bumdes', 'budget_amount' => 50000000, 'realized_amount' => 50000000],

            // 5. Bidang Pembinaan Kemasyarakatan (Rp 10.000.000)
            ['year' => 2026, 'type' => 'expense', 'category_name' => 'Bidang Pembinaan Kemasyarakatan', 'subcategory_name' => 'Kegiatan Pembinaan Peningkatan Kapasitas Perangkat Desa', 'budget_amount' => 10000000, 'realized_amount' => 10000000],
        ];

        ApbdesRecord::truncate();
        foreach ($apbdes as $record) {
            ApbdesRecord::create($record);
            // Also seed for 2025 & 2024
            $record2025 = $record;
            $record2025['year'] = 2025;
            $record2025['budget_amount'] = (int) ($record['budget_amount'] * 0.95);
            $record2025['realized_amount'] = (int) ($record['realized_amount'] * 0.95);
            ApbdesRecord::create($record2025);

            $record2024 = $record;
            $record2024['year'] = 2024;
            $record2024['budget_amount'] = (int) ($record['budget_amount'] * 0.88);
            $record2024['realized_amount'] = (int) ($record['realized_amount'] * 0.88);
            ApbdesRecord::create($record2024);
        }

        // 4. Potensi & Produk Unggulan Desa Karangwungu
        $potentials = [
            [
                'title' => 'Budidaya Bandeng & Udang Vaname Tambak Karangwungu',
                'slug' => 'bandeng-dan-udang-vaname-karangwungu',
                'category' => 'Perikanan Tambak',
                'description' => 'Komoditas perikanan unggulan hasil budidaya air payau/tawar dengan kualitas daging padat dan segar, dipasok rutin ke pasar ikan Lamongan dan restoran se-Jawa Timur.',
                'content' => "Desa Karangwungu memiliki hamparan tambak produktif seluas puluhan hektar yang dialiri ekosistem air payau berkualitas prima. Budidaya ikan bandeng dan udang vaname di desa ini dikelola secara semi-intensif dan tradisional oleh para petambak berpengalaman yang tergabung dalam Kelompok Pembudidaya Ikan (Pokdakan) Mina Makmur.\n\nKeunggulan bandeng Karangwungu terletak pada rasa dagingnya yang manis gurih, tidak berbau lumpur, dan memiliki tekstur kenyal padat karena sirkulasi air tambak yang terjaga alami. Sementara udang vaname dipanen dalam kondisi prima dengan ukuran seragam (size 40-60) yang sangat diminati oleh para pengepul besar dan industri kuliner seafood di Lamongan, Surabaya, hingga Gresik.\n\nKelompok pembudidaya juga melayani pemesanan partai besar langsung dari lokasi tambak saat panen raya, maupun kemitraan suplai berkala untuk rumah makan, katering, dan pedagang pasar grosir.",
                'owner_name' => 'Kelompok Pembudidaya Ikan Mina Makmur',
                'contact_phone' => '0812-9988-1122',
                'contact_whatsapp' => '081299881122',
                'price_range' => 'Rp 28.000 - Rp 75.000 / kg',
                'location' => 'Kawasan Tambak Dusun Krajan & Sumberagung, Desa Karangwungu',
                'operating_hours' => 'Setiap Hari (Senin - Minggu), 06.00 - 18.00 WIB',
                'certification' => 'Sertifikasi CBIB (Cara Budidaya Ikan yang Baik) Dinas Perikanan Lamongan',
                'production_capacity' => '3 - 5 Ton per Siklus Panen (Tiap 3-4 Bulan)',
                'min_order' => 'Minimal 5 kg untuk eceran, tidak terbatas untuk partai grosir',
                'features' => [
                    'Daging Segar & Tidak Berbau Lumpur',
                    'Langsung Dipanen dari Tambak Petani Lokal',
                    'Ukuran Seragam & Kualitas Terjamin',
                    'Menerima Suplai Restoran & Pasar Ikan',
                    'Tersedia Bandeng Segar & Udang Vaname Hidup',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Padi Varietas Unggul & Beras Organik Karangwungu',
                'slug' => 'beras-organik-karangwungu',
                'category' => 'Pertanian',
                'description' => 'Padi sawah berkualitas tinggi hasil panen tanah subur bantaran sungai Karanggeneng, diproses secara higienis menghasilkan beras pulen dan wangi alami.',
                'content' => "Lahan persawahan Desa Karangwungu terbentang subur di sepanjang jaringan irigasi Bengawan Solo dan anak sungainya. Gabungan Kelompok Tani (Gapoktan) Sumber Rejeki membina puluhan petani lokal untuk mengembangkan budidaya padi varietas unggul seperti Inpari 32, Ciherang, serta percontohan beras organik bebas pestisida kimia berbahaya.\n\nProses pascapanen dilakukan dengan sistem pengeringan terukur dan penggilingan modern desa sehingga butir beras utuh, minim patah (*broken rice* rendah), serta tanpa pemutih kimia maupun pengawet sintetis. Nasi yang dihasilkan bertekstur pulen lembut, tahan basi hingga lebih dari 24 jam, serta memiliki aroma harum khas sawah pedesaan.\n\nBeras ini tersedia dalam kemasan premium 5 kg, 10 kg, dan 25 kg yang cocok untuk konsumsi rumah tangga harian, hajatan warga, hingga pasokan toko kelontong di kecamatan.",
                'owner_name' => 'Gapoktan Sumber Rejeki Karangwungu',
                'contact_phone' => '0857-4433-2211',
                'contact_whatsapp' => '085744332211',
                'price_range' => 'Rp 14.500 - Rp 16.000 / kg',
                'location' => 'Lahan Persawahan Blok Tengah, Desa Karangwungu',
                'operating_hours' => 'Senin - Sabtu, 07.00 - 16.00 WIB',
                'certification' => 'Binaan Dinas Ketahanan Pangan & Pertanian Kabupaten Lamongan',
                'production_capacity' => '15 - 20 Ton per Musim Tanam',
                'min_order' => '1 Sak (5 kg / 10 kg / 25 kg)',
                'features' => [
                    'Beras Pulen Alami Tanpa Pemutih Kimia',
                    'Penggilingan Bersih & Butir Utuh Berkualitas',
                    'Kadar Air Terjaga, Tahan Simpan Lebih Lama',
                    'Harga Terjangkau Langsung dari Petani Desa',
                    'Tersedia Kemasan 5 kg, 10 kg, dan 25 kg',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Kerupuk Ikan & Otak-otak Bandeng Khas Karangwungu',
                'slug' => 'kerupuk-ikan-dan-otak-otak-bandeng-karangwungu',
                'category' => 'UMKM Makanan',
                'description' => 'Produk olahan ikan tradisional resep turun-temurun tanpa bahan pengawet buatan, gurih dan renyah cocok sebagai oleh-oleh khas Lamongan.',
                'content' => "Hilirisasi hasil tambak perikanan Desa Karangwungu melahirkan produk olahan kuliner unggulan, salah satunya Kerupuk Ikan dan Otak-otak Bandeng yang diproduksi oleh UMKM Barokah Rasa. Berlokasi di RT 02 RW 01, usaha rumahan ini memberdayakan para ibu rumah tangga desa untuk memproduksi cemilan bergizi tinggi berbahan dasar ikan segar pilihan.\n\nKerupuk ikan diproses secara higienis menggunakan rempah bumbu alami, menghasilkan tekstur yang sangat renyah, mekar sempurna saat digoreng, dan kaya akan cita rasa ikan asli tanpa amis. Sedangkan Otak-otak Bandeng dibuat dari daging bandeng cabut duri yang dihaluskan bersama bumbu rempah kelapa tradisional dan dibungkus daun pisang sebelum dikukus dan dipanggang.\n\nProduk ini telah mengantongi sertifikat P-IRT dan Halal resmi, menjadikannya pilihan oleh-oleh favorit para pemudik dan wisatawan yang berkunjung ke kawasan pantura Lamongan.",
                'owner_name' => 'Ibu Siti Munawaroh (UMKM Barokah Rasa)',
                'contact_phone' => '0822-6655-4433',
                'contact_whatsapp' => '082266554433',
                'price_range' => 'Rp 15.000 - Rp 35.000 / kemasan',
                'location' => 'RT 02 RW 01 Dusun Krajan, Desa Karangwungu',
                'operating_hours' => 'Senin - Sabtu, 08.00 - 17.00 WIB',
                'certification' => 'SPP-PIRT & Sertifikat Halal Indonesia (Kemenag)',
                'production_capacity' => '100 - 200 bungkus per hari',
                'min_order' => '1 Kemasan (Menerima pesanan katering & grosir toko oleh-oleh)',
                'features' => [
                    'Kandungan Ikan Segar Tinggi & Gurih Alami',
                    'Bebas Pengawet Kimia & MSG Berlebihan',
                    'Kemasan Rapi, Higienis, & Tahan Renyah',
                    'Sudah Berizin P-IRT & Bersertifikat Halal',
                    'Cocok untuk Oleh-Oleh Khas Lamongan & Lauk Keluarga',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Kerajinan Anyaman Tikar Mendong & Souvenir Alami',
                'slug' => 'anyaman-tikar-mendong-karangwungu',
                'category' => 'Kerajinan',
                'description' => 'Kerajinan anyaman tangan karya ibu-ibu PKK Desa Karangwungu yang ramah lingkungan dan memiliki nilai estetika tinggi untuk dekorasi interior.',
                'content' => "Kreativitas kelompok wanita Desa Karangwungu terwujud dalam kerajinan tangan anyaman tanaman mendong dan eceng gondok kering yang melimpah di bantaran sungai. Dikelola oleh Kelompok Pengrajin Melati di bawah bimbingan TP PKK Desa Karangwungu, produk ini mengubah serat tanaman alami menjadi barang fungsional bernilai seni tinggi.\n\nProduk yang dihasilkan mencakup tikar lantai tradisional, tatakan piring/gelas (*placemat*), keranjang serbaguna (*storage box*), tas jinjing etnik, hingga souvenir pernikahan ramah lingkungan. Setiap helai serat dianyam dengan ketelitian tinggi, diberi pewarna nabati yang tahan pudar, dan dilapisi anti-jamur alami sehingga awet bertahun-tahun.\n\nSelain melayani pesanan suvenir untuk instansi dan perorangan, produk anyaman ini juga rutin dipamerkan pada bazar UMKM tingkat kecamatan dan kabupaten.",
                'owner_name' => 'Ibu Nurhayati (Kelompok Pengrajin Melati)',
                'contact_phone' => '0813-8877-6655',
                'contact_whatsapp' => '081388776655',
                'price_range' => 'Rp 30.000 - Rp 120.000 / item',
                'location' => 'Sanggar PKK Dusun Timur, Desa Karangwungu',
                'operating_hours' => 'Senin - Jumat, 08.30 - 15.30 WIB',
                'certification' => 'Binaan Dekranasda Kabupaten Lamongan & TP PKK Desa',
                'production_capacity' => '50 - 100 produk per bulan (Custom kerajinan tangan)',
                'min_order' => '1 Pcs untuk eceran, minimal 50 pcs untuk suvenir hajatan',
                'features' => [
                    '100% Anyaman Tangan Ramah Lingkungan (*Eco-Friendly*)',
                    'Serat Alami Kuat, Rapi, & Dilapisi Anti-Jamur',
                    'Desain Etnik Modern Cocok untuk Estetika Rumah',
                    'Bisa Custom Model, Ukuran, dan Warna Sesuai Pesanan',
                    'Mendukung Pemberdayaan Ekonomi Perempuan Desa',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Peternakan Bebek Petelur & Telur Asin Rempah Karangwungu',
                'slug' => 'bebek-petelur-dan-telur-asin-karangwungu',
                'category' => 'Peternakan',
                'description' => 'Sentra budidaya bebek petelur unggulan dan telur asin asap rempah dengan kuning telur berminyak oranye pekat yang gurih lezat.',
                'content' => "Memanfaatkan ekosistem perairan sawah dan tambak desa yang subur, kelompok peternak 'Bebek Makmur' Dusun Krajan membudidayakan bebek petelur varietas lokal berkualitas tinggi. Pemberian pakan alami kaya protein dari hasil samping perikanan tambak menghasilkan telur bebek berukuran besar dengan kuning telur pekat bernutrisi tinggi.\n\nSelain menyediakan telur bebek mentah segar untuk warung dan pengusaha martabak, kelompok ini juga mengolah Telur Asin Rempah Asap. Melalui proses pemeraman bata merah berempah selama 14 hari dan pengasapan kayu alami, tercipta telur asin dengan tekstur masir berminyak (*oily yolk*), tidak berbau amis, dan rasa asin gurih yang pas di lidah.\n\nProduk ini menjadi salah satu primadona lauk makan keluarga dan sajian pelengkap di warung-warung kuliner khas Lamongan.",
                'owner_name' => 'Bapak Joko Santoso (Kelompok Ternak Bebek Makmur)',
                'contact_phone' => '0821-4455-7788',
                'contact_whatsapp' => '082144557788',
                'price_range' => 'Rp 2.800 / butir (mentah) • Rp 4.500 / butir (asin asap)',
                'location' => 'Area Peternakan Selatan Dusun Krajan, Desa Karangwungu',
                'operating_hours' => 'Setiap Hari (Senin - Minggu), 06.30 - 17.00 WIB',
                'certification' => 'Uji Mutu Pangan & Pengawasan Puskeswan Kecamatan Karanggeneng',
                'production_capacity' => '500 - 700 butir per hari',
                'min_order' => '1 Tray (30 butir) untuk harga grosir, eceran minimal 10 butir',
                'features' => [
                    'Kuning Telur Berwarna Oranye Pekat & Masir Alami',
                    'Bebek Diberi Pakan Bergizi Tanpa Bahan Kimia',
                    'Tersedia Telur Bebek Segar & Telur Asin Asap Rempah',
                    'Harga Kompetitif Langsung dari Kandang Peternak',
                    'Melayani Suplai Harian Warung Makan & Pedagang Martabak',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
            ],
            [
                'title' => 'Madu Murni Lebah Klanceng (Trigona) Karangwungu',
                'slug' => 'madu-klanceng-karangwungu',
                'category' => 'Industri Kreatif',
                'description' => 'Madu murni lebah tanpa sengat (Trigona) hasil budidaya pekarangan hijau desa, kaya antioksidan dan propolis alami dengan rasa manis asam segar.',
                'content' => "Inovasi agro-industri kreatif warga Karangwungu diinisiasi oleh komunitas pemuda desa melalui budidaya lebah klanceng (*Trigona sp.*) di pekarangan rumah yang dipenuhi vegetasi bunga air mata pengantin, kaliandra, dan tanaman buah lokal. Lebah tanpa sengat ini menghasilkan madu dengan kadar propolis dan bioflavonoid alami yang jauh lebih tinggi dibandingkan madu lebah biasa.\n\nMadu klanceng Karangwungu dipanen secara higienis menggunakan metode sedot tanpa merusak sarang telur lebah, kemudian langsung disaring murni tanpa proses pemanasan (*raw honey*). Hal ini memastikan enzim diastase, vitamin, dan khasiat obat alaminya tetap utuh 100%.\n\nKarakter rasanya unik dengan perpaduan manis lembut dan sensasi asam segar khas madu propolis. Sangat dianjurkan untuk meningkatkan imunitas tubuh, menjaga kesehatan pencernaan, serta pemulihan stamina.",
                'owner_name' => 'Ahmad Rifa\'i (Omah Klanceng Karangwungu)',
                'contact_phone' => '0858-1122-3344',
                'contact_whatsapp' => '085811223344',
                'price_range' => 'Rp 65.000 (150 ml) - Rp 180.000 (500 ml)',
                'location' => 'Pekarangan Hijau RT 01 RW 02, Desa Karangwungu',
                'operating_hours' => 'Senin - Sabtu, 08.00 - 16.30 WIB',
                'certification' => 'Sertifikat Madu Murni Uji Lab & Binaan Balai Penyuluhan Pertanian',
                'production_capacity' => '30 - 50 Botol per Bulan (Madu Murni Terbatas)',
                'min_order' => '1 Botol (150 ml / 250 ml / 500 ml)',
                'features' => [
                    '100% Raw Honey Murni Tanpa Pemanasan & Campuran Gula',
                    'Kaya Senyawa Propolis & Antioksidan Tinggi',
                    'Rasa Khas Manis dengan Sensasi Asam Segar Alami',
                    'Membantu Menjaga Imunitas & Stamina Tubuh',
                    'Kemasan Botol Kaca Higienis & Tersegel Rapi',
                ],
                'gallery' => [
                    'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80',
                ],
                'gmaps_url' => 'https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan',
                'image' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
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
