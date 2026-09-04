<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dashboardSettings = [
            // 1. Hero Section
            'hero_badge' => 'Kecamatan Karanggeneng • Kabupaten Lamongan',
            'hero_title' => "Website Resmi\nDesa Karangwungu",
            'hero_description' => 'Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.',
            'hero_image' => '/assets/images/hero.jpg',

            // 2. Sambutan Kepala Desa
            'welcome_title' => 'Membangun Desa Karangwungu yang Modern, Guyub Rukun, dan Sejahtera',
            'welcome_content' => "“Assalamu’alaikum Warahmatullahi Wabarakatuh.”\n\nSelamat datang di portal resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Website ini kami dedikasikan sebagai wujud komitmen keterbukaan informasi publik, kemudahan pelayanan surat mandiri daring, serta etalase potensi pertanian dan tambak modern desa tercinta kita.\n\nMelalui semangat kebersamaan dan inovasi digital, mari kita bersama melangkah memajukan Desa Karangwungu menjadi desa yang mandiri, transparan, dan memberikan kemakmuran nyata bagi seluruh masyarakat.",
            'welcome_leader_name' => 'H. Moh. Suhartono, S.Sos',
            'welcome_leader_position' => 'Kepala Desa Karangwungu',
            'welcome_leader_photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',

            // 3. Selayang Pandang (3 Foto & Keterangan)
            'overview_card_1_badge' => 'Pertanian Unggul',
            'overview_card_1_title' => 'Hamparan Sawah Padi & Ketahanan Pangan',
            'overview_card_1_image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',

            'overview_card_2_badge' => 'Tambak Modern',
            'overview_card_2_title' => 'Budidaya Bandeng & Udang',
            'overview_card_2_image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',

            'overview_card_3_badge' => 'UMKM & Warga',
            'overview_card_3_title' => 'Wirausaha & Guyub Rukun',
            'overview_card_3_image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
        ];

        SiteSetting::setGroup('dashboard', $dashboardSettings);

        $generalSettings = [
            // 1. Identitas & Tagline Desa
            'site_name' => 'Desa Karangwungu',
            'site_subdistrict' => 'Kecamatan Karanggeneng',
            'site_regency' => 'Kabupaten Lamongan',
            'site_province' => 'Jawa Timur',
            'site_postal_code' => '62254',
            'site_tagline' => 'Portal resmi informasi publik dan pelayanan administrasi daring Pemerintah Desa Karangwungu dalam mewujudkan tata kelola desa yang transparan, maju, agamis, dan melayani.',

            // 2. Kontak & Balai Desa
            'contact_address' => 'Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254',
            'contact_phone' => '(0812) 3456-7890',
            'contact_whatsapp' => '081234567890',
            'contact_email' => 'pemdes@karangwungu-lamongan.desa.id',
            'contact_working_hours' => 'Senin – Jumat: 08.00 – 15.30 WIB',
            'contact_maps_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.293417724128!2d112.355112!3d-7.039615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e778fc33246f48f%3A0xbca12a8421d00c3b!2sKarangwungu%2C%20Kec.%20Karang%20Geneng%2C%20Kabupaten%20Lamongan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',

            // 3. Web Terkait (Portal Instansi)
            'related_link_1_name' => 'Pemkab Lamongan',
            'related_link_1_url' => 'https://lamongankab.go.id/',
            'related_link_1_active' => '1',

            'related_link_2_name' => 'Kemendesa',
            'related_link_2_url' => 'https://kemendesa.go.id/',
            'related_link_2_active' => '1',

            'related_link_3_name' => 'Kemendagri',
            'related_link_3_url' => 'https://kemendagri.go.id/',
            'related_link_3_active' => '0',

            // 4. Media Sosial Resmi Desa (dengan status On/Off)
            'social_whatsapp_active' => '1',
            'social_whatsapp_url' => 'https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Karangwungu',

            'social_instagram_active' => '1',
            'social_instagram_url' => 'https://instagram.com/desakarangwungu',

            'social_facebook_active' => '1',
            'social_facebook_url' => 'https://facebook.com/desakarangwungu',

            'social_youtube_active' => '1',
            'social_youtube_url' => 'https://youtube.com/@desakarangwungu',

            'social_tiktok_active' => '0',
            'social_tiktok_url' => 'https://tiktok.com/@desakarangwungu',

            'social_twitter_active' => '0',
            'social_twitter_url' => 'https://x.com/desakarangwungu',
        ];

        SiteSetting::setGroup('general', $generalSettings);

        // ==========================================
        // 3. GROUP: OVERVIEW (Gambaran Umum & Peta)
        // ==========================================
        $defaultMapPoints = [
            [
                'id' => 'balai-desa',
                'name' => 'Balai Desa Karangwungu',
                'category' => 'gov',
                'categoryLabel' => 'Pemerintahan',
                'lat' => -7.0009188,
                'lng' => 112.3597668,
                'desc' => 'Kantor Balai Desa Karangwungu & Pusat Pelayanan Administrasi Publik Warga.',
            ],
            [
                'id' => 'kantor-bpd',
                'name' => 'Sekretariat BPD & Lembaga Desa',
                'category' => 'gov',
                'categoryLabel' => 'Pemerintahan',
                'lat' => -7.0013,
                'lng' => 112.3601,
                'desc' => 'Badan Permusyawaratan Desa & ruang koordinasi kelembagaan masyarakat desa.',
            ],
            [
                'id' => 'pemukiman-pusat',
                'name' => 'Kawasan Pemukiman Karangwungu',
                'category' => 'pemukiman',
                'categoryLabel' => 'Pemukiman',
                'lat' => -6.9985,
                'lng' => 112.3595,
                'desc' => 'Pusat kawasan pemukiman warga dan permukiman rukun tetangga.',
            ],
            [
                'id' => 'pemukiman-timur',
                'name' => 'Kawasan Pemukiman Karangwungu Timur',
                'category' => 'pemukiman',
                'categoryLabel' => 'Pemukiman',
                'lat' => -7.0028,
                'lng' => 112.3615,
                'desc' => 'Pemukiman warga timur dekat jalur akses persawahan dan tambak.',
            ],
            [
                'id' => 'jalan-sumberwudi',
                'name' => 'Akses Jalan Poros Desa',
                'category' => 'pemukiman',
                'categoryLabel' => 'Pemukiman',
                'lat' => -7.0035,
                'lng' => 112.3598,
                'desc' => 'Akses perlintasan utama masyarakat antar dusun dan menuju jalan poros kabupaten.',
            ],
            [
                'id' => 'masjid-jami',
                'name' => 'Masjid Jami’ Karangwungu',
                'category' => 'fasum',
                'categoryLabel' => 'Fasilitas Umum',
                'lat' => -7.0004,
                'lng' => 112.3592,
                'desc' => 'Pusat kegiatan ibadah keagamaan umat Islam dan pengajian rutin warga desa.',
            ],
            [
                'id' => 'sentra-tambak',
                'name' => 'Sentra Budidaya Tambak Modern',
                'category' => 'umkm',
                'categoryLabel' => 'UMKM & Usaha Warga',
                'lat' => -6.9962,
                'lng' => 112.3608,
                'desc' => 'Kawasan budidaya tambak ikan bandeng dan udang vaname unggulan petani desa.',
            ],
            [
                'id' => 'pertanian-selatan',
                'name' => 'Kawasan Persawahan Produktif',
                'category' => 'umkm',
                'categoryLabel' => 'UMKM & Usaha Warga',
                'lat' => -7.0055,
                'lng' => 112.3590,
                'desc' => 'Hamparan persawahan padi irigasi teknis mandiri lumbung pangan desa.',
            ],
        ];

        $overviewSettings = [
            // 3 Foto Bentang Alam
            'overview_photo_1' => '/assets/images/hero.jpg',
            'overview_photo_1_label' => 'Kawasan Desa Karangwungu',
            'overview_photo_1_icon' => 'MapPin',

            'overview_photo_2' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
            'overview_photo_2_label' => 'Persawahan Padi',
            'overview_photo_2_icon' => 'Wheat',

            'overview_photo_3' => 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
            'overview_photo_3_label' => 'Tambak Ikan & Udang',
            'overview_photo_3_icon' => 'Fish',

            // Deskripsi Narasi
            'overview_paragraph_1' => 'Desa Karangwungu merupakan salah satu dari 18 desa di wilayah administratif Kecamatan Karanggeneng, Kabupaten Lamongan, Provinsi Jawa Timur. Wilayah Karangwungu terletak di dataran rendah yang subur di sebelah utara aliran Bengawan Solo, beriklim tropis dengan bentang alam yang didominasi oleh hamparan persawahan padi produktif dan tambak budidaya air tawar/payau modern.',
            'overview_paragraph_2' => 'Masyarakat Desa Karangwungu dikenal memegang teguh tradisi gotong royong warisan leluhur, kehidupan beragama yang guyub rukun dan harmonis, serta etos kerja pantang menyerah di sektor pertanian agraris, budidaya ikan bandeng & udang vaname, serta perniagaan wirausaha lokal.',

            // 3 Point Potensi & Icon
            'overview_point_1_title' => 'Sektor Agraris Produktif',
            'overview_point_1_desc' => 'Didukung hamparan persawahan padi subur dengan sistem irigasi teknis mandiri.',
            'overview_point_1_icon' => 'Wheat',

            'overview_point_2_title' => 'Budidaya Tambak Modern',
            'overview_point_2_desc' => 'Sentra perikanan air tawar & payau penghasil bandeng dan udang vaname unggulan.',
            'overview_point_2_icon' => 'Fish',

            'overview_point_3_title' => 'Kearifan Gotong Royong',
            'overview_point_3_desc' => 'Kerukunan antarwarga yang harmonis dengan semangat kebersamaan yang lestari.',
            'overview_point_3_icon' => 'HeartHandshake',

            // 4 Batas Wilayah
            'border_north_title' => 'Desa Guci & Desa Sumberwudi',
            'border_north_desc' => 'Batas area pertanian utara & bantaran sungai Bengawan Solo',

            'border_south_title' => 'Desa Karanggeneng',
            'border_south_desc' => 'Pusat kecamatan, SPBU Pertamina & jalan poros kabupaten',

            'border_east_title' => 'Desa Sungelebak',
            'border_east_desc' => 'Kawasan perikanan air payau & sentra tambak produktif',

            'border_west_title' => 'Desa Kalanganyar',
            'border_west_desc' => 'Akses perniagaan warga & hamparan persawahan barat',

            // Titik Lokasi Peta (JSON)
            'map_points' => json_encode($defaultMapPoints, JSON_UNESCAPED_UNICODE),
        ];

        SiteSetting::setGroup('overview', $overviewSettings);

        // 3. Konfigurasi Visi, Misi & Kepemimpinan
        $defaultMissions = [
            [
                'id' => 'misi-1',
                'number' => '01',
                'category' => 'Sosial & Keagamaan',
                'title' => 'Kehidupan Beragama & Sosial',
                'desc' => 'Meningkatkan Kualitas Kehidupan Beragama, Sosial Budaya dan Ketentraman Masyarakat;',
                'icon' => 'HeartHandshake',
                'badge' => 'Prioritas Strategis',
            ],
            [
                'id' => 'misi-2',
                'number' => '02',
                'category' => 'Pendidikan & Kesehatan',
                'title' => 'Pendidikan & Kesehatan SDM',
                'desc' => 'Meningkatkan Kualitas Pendidikan, Kesehatan dan Sumberdaya Manusia;',
                'icon' => 'GraduationCap',
                'badge' => 'Prioritas Strategis',
            ],
            [
                'id' => 'misi-3',
                'number' => '03',
                'category' => 'Ekonomi Pedesaan',
                'title' => 'Pembangunan Ekonomi Pedesaan',
                'desc' => 'Meningkatkan Pembangunan Ekonomi Pedesaan, dan Kesejahteraan Masyarakat;',
                'icon' => 'TrendingUp',
                'badge' => 'Prioritas Strategis',
            ],
            [
                'id' => 'misi-4',
                'number' => '04',
                'category' => 'Tata Kelola Pemerintahan',
                'title' => 'Profesionalisme Aparatur',
                'desc' => 'Meningkatkan Kualitas dan Profesionalisme Aparatur dalam Tata Kelola Pemerintahan, Pembangunan dan Pelayanan pada Masyarakat;',
                'icon' => 'Building2',
                'badge' => 'Prioritas Strategis',
            ],
        ];

        $defaultLeaders = [
            [
                'id' => 'leader-8',
                'order' => 8,
                'name' => 'Sunarto',
                'period' => '2020 – 2026',
                'role' => 'Kepala Desa Ke-8 (Periode II)',
                'desc' => 'Kembali dipercaya masyarakat melanjutkan pengabdian periode 2020 – 2026, memimpin era modernisasi dan pelayanan publik terpadu.',
                'isCurrent' => true,
            ],
            [
                'id' => 'leader-7',
                'order' => 7,
                'name' => 'Sunarto',
                'period' => '2014 – 2019',
                'role' => 'Kepala Desa Ke-7 (Periode I)',
                'desc' => 'Kepala Desa periode pertama 2014 – 2019 percepatan pembangunan jalan poros dan fasilitas umum.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-6',
                'order' => 6,
                'name' => 'Abdul Wahab',
                'period' => '2008 – 2013',
                'role' => 'Kepala Desa Ke-6',
                'desc' => 'Kepala Desa periode 2008 – 2013 penguatan kelembagaan dan perluasan potensi tambak.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-5',
                'order' => 5,
                'name' => 'Matardjo. AS',
                'period' => '2002 – 2007',
                'role' => 'Kepala Desa Ke-5',
                'desc' => 'Kembali terpilih mengabdi memimpin roda pemerintahan desa periode 2002 – 2007.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-4',
                'order' => 4,
                'name' => 'Kanan',
                'period' => '1993 – 2001',
                'role' => 'Kepala Desa Ke-4',
                'desc' => 'Kepala Desa periode 1993 – 2001 penguatan ketahanan pangan dan sosial kemasyarakatan.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-3',
                'order' => 3,
                'name' => 'Matardjo. AS',
                'period' => '1984 – 1992',
                'role' => 'Kepala Desa Ke-3',
                'desc' => 'Kepala Desa periode 1984 – 1992 pembina awal tata kelola infrastruktur desa.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-2',
                'order' => 2,
                'name' => 'Saedjan',
                'period' => 'Seumur Hidup',
                'role' => 'Kepala Desa Ke-2',
                'desc' => 'Melanjutkan estafet kepemimpinan desa pada era masa jabatan seumur hidup.',
                'isCurrent' => false,
            ],
            [
                'id' => 'leader-1',
                'order' => 1,
                'name' => 'H. Ali Sariban',
                'period' => 'Seumur Hidup',
                'role' => 'Kepala Desa Ke-1 (Perintis)',
                'desc' => 'Kepala Desa periode awal kepemimpinan masa jabatan seumur hidup Desa Karangwungu.',
                'isCurrent' => false,
            ],
        ];

        $visionMissionSettings = [
            'vision_badge' => 'Visi Resmi Pemerintah Desa Karangwungu',
            'vision_text' => 'Terwujudnya Masyarakat Desa Karangwungu Yang Berakhlak Mulia, Sehat, Sejahtera dan Bermartabat Dalam Naungan Pemerintah Desa Yang Demokratis dan Amanah',

            'vision_pillar_1_text' => 'Berakhlak Mulia',
            'vision_pillar_1_icon' => 'Award',

            'vision_pillar_2_text' => 'Sehat & Bugar',
            'vision_pillar_2_icon' => 'HeartPulse',

            'vision_pillar_3_text' => 'Masyarakat Sejahtera',
            'vision_pillar_3_icon' => 'ShieldCheck',

            'vision_pillar_4_text' => 'Demokratis & Amanah',
            'vision_pillar_4_icon' => 'UserCheck',

            'missions' => json_encode($defaultMissions, JSON_UNESCAPED_UNICODE),
            'leaders' => json_encode($defaultLeaders, JSON_UNESCAPED_UNICODE),
        ];

        SiteSetting::setGroup('vision_mission', $visionMissionSettings);

        // 5. Konfigurasi Perangkat Desa & SOTK
        $defaultOfficialsList = [
            [
                'id' => 'off-sekdes',
                'name' => 'RIDUWAN HADI P',
                'position' => 'Sekretaris Desa',
                'nip' => '19820315 201001 1 012',
                'phone' => '0813-4455-6677',
                'category' => 'Sekretariat Desa',
                'photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
                'icon' => 'Briefcase',
                'order' => 1,
                'role_desc' => 'Koordinator administrasi umum, keuangan, kepegawaian, dan pelayanan perkantoran desa.',
                'basis' => 'Permendagri No. 84/2015 Pasal 7',
                'summary' => 'Koordinator administrasi desa yang membantu Kepala Desa dalam bidang ketatausahaan, keuangan, kepegawaian, dan pelayanan perkantoran.',
                'tasks' => [
                    'Mengoordinasikan penyusunan kebijakan perencanaan dan program kerja pemerintah desa.',
                    'Mengoordinasikan urusan ketatausahaan, surat-menyurat, arsip dokumen resmi, dan ekspedisi desa.',
                    'Mengoordinasikan pengelolaan keuangan desa dan penyusunan laporan pertanggungjawaban realisasi APBDes (LPJ).',
                    'Mengoordinasikan urusan umum, perlengkapan inventaris, dan rumah tangga kantor desa.',
                ],
                'authorities' => 'Memverifikasi kelengkapan administrasi dan mengendalikan pelaksanaan kegiatan perangkat kesekretariatan.',
            ],
            [
                'id' => 'off-keuangan',
                'name' => 'Siti Nur Kholifah, S.E',
                'position' => 'Kaur Keuangan',
                'nip' => '19890420 201602 2 008',
                'phone' => '0812-5566-7788',
                'category' => 'Sekretariat Desa',
                'photo' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
                'icon' => 'Briefcase',
                'order' => 2,
                'role_desc' => 'Pengelolaan sistem perbendaharaan, pembukuan kas, dan verifikasi SPJ keuangan desa.',
                'basis' => 'Permendagri No. 84/2015 Pasal 8',
                'summary' => 'Membantu Sekretaris Desa dalam tata kelola administrasi keuangan, penatausahaan kas, dan pelaporan APBDes.',
                'tasks' => [
                    'Menyiapkan dokumen penatausahaan keuangan dan buku kas umum desa.',
                    'Melakukan pencatatan penerimaan dan pengeluaran kas secara akuntabel.',
                    'Menyiapkan SPJ dan dokumen verifikasi pencairan dana desa.',
                ],
                'authorities' => 'Menyimpan bukti transaksi keuangan dan memverifikasi kelayakan kuitansi pencairan kas.',
            ],
            [
                'id' => 'off-kesra',
                'name' => 'AINUN NAJIB',
                'position' => 'Kaur Kesejahteraan Rakyat (Kesra)',
                'nip' => '19881105 201501 1 007',
                'phone' => '0821-3322-1100',
                'category' => 'Perangkat Desa / Urusan Staf',
                'photo' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
                'icon' => 'HeartHandshake',
                'order' => 3,
                'role_desc' => 'Pengelolaan urusan kesejahteraan rakyat, bantuan sosial, dan layanan kemasyarakatan.',
                'basis' => 'Permendagri No. 84/2015 Pasal 9',
                'summary' => 'Unsur staf sekretariat yang bertugas membantu Sekretaris Desa dalam pelaksanaan urusan pelayanan sosial dan kesejahteraan masyarakat.',
                'tasks' => [
                    'Melaksanakan pelayanan bidang keagamaan, sosial budaya, pendidikan, dan pembinaan kepemudaan.',
                    'Pencatatan dan pendataan keluarga pra-sejahtera, bantuan sosial (PKH, BLT, BPNT), dan data kesehatan warga.',
                    'Memfasilitasi kegiatan kemasyarakatan, posyandu balita & lansia, serta bantuan tanggap darurat sosial.',
                    'Menyiapkan bahan laporan pelaksanaan urusan kesejahteraan masyarakat desa.',
                ],
                'authorities' => 'Verifikasi usulan bantuan sosial kemasyarakatan dan fasilitasi program jaminan kesejahteraan warga.',
            ],
            [
                'id' => 'off-perencanaan',
                'name' => 'Rahmat Hidayat, S.T',
                'position' => 'Kaur Perencanaan & Umum',
                'nip' => '19920110 201901 1 005',
                'phone' => '0857-1122-3344',
                'category' => 'Sekretariat Desa',
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                'icon' => 'Building2',
                'order' => 4,
                'role_desc' => 'Penyusunan dokumen RKPDes, inventarisasi aset desa, dan administrasi umum.',
                'basis' => 'Permendagri No. 84/2015 Pasal 10',
                'summary' => 'Membantu penyusunan dokumen perencanaan pembangunan jangka menengah dan tahunan desa.',
                'tasks' => [
                    'Mengkoordinasikan penyusunan draft RKPDes dan RPJMDes.',
                    'Melakukan inventarisasi dan pemeliharaan barang inventaris aset kantor desa.',
                    'Menyiapkan sarana dan prasarana rapat musyawarah desa.',
                ],
                'authorities' => 'Mengelola buku inventaris aset desa dan memfasilitasi administrasi perencanaan.',
            ],
            [
                'id' => 'off-pelayanan',
                'name' => 'Bambang Kusuma, S.Sos',
                'position' => 'Kasi Pelayanan',
                'nip' => '19850614 201201 1 009',
                'phone' => '0813-7788-9900',
                'category' => 'Pelaksana Teknis',
                'photo' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
                'icon' => 'Award',
                'order' => 5,
                'role_desc' => 'Pelaksana teknis operasional pelayanan permohonan surat warga dan perizinan.',
                'basis' => 'Permendagri No. 84/2015 Pasal 11',
                'summary' => 'Pelaksana teknis operasional urusan pelayanan umum dan administrasi kependudukan warga desa.',
                'tasks' => [
                    'Memproses permohonan surat keterangan dan dokumen administrasi kependudukan warga.',
                    'Pencatatan mutasi penduduk (kelahiran, kematian, pindah, datang).',
                    'Pelayanan konsultasi dan pengaduan pelayanan masyarakat.',
                ],
                'authorities' => 'Memvalidasi kelengkapan berkas pemohon surat mandiri desa.',
            ],
            [
                'id' => 'off-kasun',
                'name' => 'SUJIANTO',
                'position' => 'Kasun Karangwungu',
                'nip' => null,
                'phone' => '0858-9988-7766',
                'category' => 'Pelaksana Kewilayahan',
                'photo' => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
                'icon' => 'MapPin',
                'order' => 6,
                'role_desc' => 'Kepala Dusun pengampu wilayah administrasi dan pelayanan masyarakat Dusun Karangwungu.',
                'basis' => 'Permendagri No. 84/2015 Pasal 13',
                'summary' => 'Unsur pembantu Kepala Desa dalam pelaksanaan tugas di wilayah kerja dusun.',
                'tasks' => [
                    'Membina ketenteraman, ketertiban, dan kerukunan warga di tingkat dusun.',
                    'Menggerakkan partisipasi dan gotong royong warga dalam kegiatan dusun.',
                    'Menyalurkan aspirasi warga dusun ke musyawarah tingkat desa.',
                ],
                'authorities' => 'Mengkoordinasikan ketua RT dan RW di wilayah kerja dusun Karangwungu.',
            ],
            [
                'id' => 'off-lpm',
                'name' => 'SUNARTO',
                'position' => 'Ketua LPM',
                'nip' => null,
                'phone' => '0812-7766-5544',
                'category' => 'Lembaga Pemberdayaan',
                'photo' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
                'icon' => 'Building2',
                'order' => 7,
                'role_desc' => 'Perencanaan pembangunan partisipatif dan pemberdayaan ekonomi masyarakat desa.',
                'basis' => 'Permendagri No. 18/2018',
                'summary' => 'Wadah partisipasi masyarakat yang bertugas merencanakan pembangunan secara partisipatif dan menggerakkan swadaya gotong royong warga.',
                'tasks' => [
                    'Menyusun rencana pembangunan secara partisipatif bersama warga dalam Musrenbangdes.',
                    'Menggerakkan swadaya dan semangat gotong royong masyarakat dalam pembangunan fisik desa.',
                    'Meningkatkan kualitas sumber daya manusia dan memfasilitasi pemberdayaan ekonomi lokal.',
                    'Menampung aspirasi masyarakat dalam bidang pembangunan infrastruktur dan lingkungan.',
                ],
                'authorities' => 'Memberikan masukan teknis perencanaan pembangunan dan memobilisasi gotong royong swadaya masyarakat.',
            ],
            [
                'id' => 'off-linmas',
                'name' => 'ISMAIL EFENDI',
                'position' => 'Ketua Satlinmas',
                'nip' => null,
                'phone' => '0852-3344-5566',
                'category' => 'Ketenteraman & Ketertiban',
                'photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
                'icon' => 'ShieldAlert',
                'order' => 8,
                'role_desc' => 'Perlindungan masyarakat, keamanan lingkungan, dan penanggulangan bencana desa.',
                'basis' => 'Permendagri No. 26/2020',
                'summary' => 'Satuan tugas garda terdepan perlindungan masyarakat dalam memelihara ketenteraman, ketertiban umum, dan kesiapsiagaan bencana desa.',
                'tasks' => [
                    'Membantu penanganan ketenteraman, ketertiban umum, dan keamanan lingkungan desa.',
                    'Membantu penanggulangan dan evakuasi dini saat terjadi bencana alam atau keadaan darurat.',
                    'Mendukung pengamanan kegiatan sosial warga, pengajian, hajatan, dan agenda Pemilu/Pilkades.',
                    'Mengkoordinasikan pos ronda malam (siskamling) bersama warga masyarakat.',
                ],
                'authorities' => 'Melakukan tindakan pengamanan dini lingkungan dan penanganan kedaruratan bencana desa.',
            ],
        ];

        $officialsSettings = [
            'sotk_title' => 'Bagan Struktur Organisasi & Tata Kerja (SOTK) Pemerintah Desa Karangwungu',
            'sotk_subtitle' => 'Berdasarkan Permendagri No. 84 Tahun 2015 tentang Susunan Organisasi dan Tata Kerja Pemerintah Desa',

            // Pimpinan Eksekutif (Kepala Desa)
            'kades_name' => 'H. SUNARTO',
            'kades_position' => 'Kepala Desa',
            'kades_nip' => '19750812 200501 1 003',
            'kades_phone' => '0812-3344-5566',
            'kades_photo' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
            'kades_category' => 'Pimpinan Eksekutif',
            'kades_role_desc' => 'Pimpinan penyelenggaraan pemerintahan, pembangunan, pembinaan, dan pemberdayaan masyarakat desa.',
            'kades_basis' => 'UU No. 6/2014 & Permendagri No. 84/2015',
            'kades_summary' => 'Pimpinan tertinggi pemerintah desa yang bertugas menyelenggarakan Pemerintahan Desa, melaksanakan Pembangunan, Pembinaan Kemasyarakatan, dan Pemberdayaan Masyarakat.',
            'kades_tasks' => json_encode([
                'Memimpin penyelenggaraan pemerintahan desa berdasarkan kebijakan yang ditetapkan bersama BPD.',
                'Mengajukan rancangan dan menetapkan Peraturan Desa (Perdes) yang telah disepakati.',
                'Menyusun dan mengajukan rancangan APBDes untuk dibahas dan ditetapkan bersama BPD.',
                'Membina ketenteraman, ketertiban masyarakat, dan kerukunan warga desa.',
                'Mewakili desa di dalam dan di luar pengadilan atau menunjuk kuasa hukum sesuai ketentuan perundang-undangan.',
            ], JSON_UNESCAPED_UNICODE),
            'kades_authorities' => 'Menetapkan kebijakan desa, mengelola keuangan & aset desa, serta mengangkat dan memberhentikan perangkat desa.',

            // Mitra Kerja Sejajar (Ketua BPD)
            'bpd_name' => 'ALI NASIHIN, SH',
            'bpd_position' => 'Ketua BPD',
            'bpd_nip' => '',
            'bpd_phone' => '0813-4455-6677',
            'bpd_photo' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
            'bpd_category' => 'Badan Permusyawaratan Desa',
            'bpd_role_desc' => 'Mitra kerja strategis pemerintah desa dalam pengawasan, legislasi peraturan desa, dan penampung aspirasi warga.',
            'bpd_basis' => 'Permendagri No. 110/2016',
            'bpd_summary' => 'Lembaga perwakilan permusyawaratan warga desa yang berkedudukan sebagai mitra kerja sejajar Pemerintah Desa dalam fungsi legislasi dan pengawasan.',
            'bpd_tasks' => json_encode([
                'Membahas dan menyepakati rancangan Peraturan Desa bersama Kepala Desa.',
                'Menampung, menghimpun, mengelola, dan menyalurkan aspirasi masyarakat desa secara objektif.',
                'Melakukan pengawasan kinerja Kepala Desa dalam pelaksanaan APBDes dan kebijakan desa.',
                'Menyelenggarakan Musyawarah Desa (Musdes) tahunan dan musyawarah perencanaan pembangunan.',
            ], JSON_UNESCAPED_UNICODE),
            'bpd_authorities' => 'Mengawasi pelaksanaan peraturan desa & APBDes, serta meminta keterangan penyelenggaraan pemerintahan desa.',

            // Jajaran Perangkat, Staf & Lembaga Desa
            'officials_list' => json_encode($defaultOfficialsList, JSON_UNESCAPED_UNICODE),
        ];

        SiteSetting::setGroup('officials', $officialsSettings);

        // 6. Demografi & Kependudukan
        $demographicsSettings = [
            // Agregat Pokok
            'total_citizens' => 3482,
            'male_citizens' => 1724,
            'female_citizens' => 1758,
            'total_families' => 985,
            'productive_age_count' => 2380,
            'productive_age_percent' => 68.3,
            'area_ha' => 123,
            'density' => 2830,

            // Tata Guna Lahan & Luas Wilayah (123 Ha / 1,23 km²)
            'land_use_title' => 'Tata Guna Lahan & Luas Wilayah',
            'land_use_subtitle' => 'Distribusi pemanfaatan ruang dan peruntukan wilayah desa seluas 123 Ha (1,23 km²)',
            'land_use_list' => json_encode([
                [
                    'category' => 'Sawah / Pertanian',
                    'area_ha' => 70,
                    'percent' => 56.9,
                    'badge' => 'Lahan Terluas (56,9%)',
                    'desc' => 'Komoditas utama padi sawah, palawija, dan tanaman pangan pendukung ketahanan pangan desa.',
                    'icon' => 'Wheat',
                ],
                [
                    'category' => 'Tanah Kering / Kebun',
                    'area_ha' => 33,
                    'percent' => 26.8,
                    'badge' => 'Tegalan & Kebun (26,8%)',
                    'desc' => 'Pekarangan produktif, tegalan kering, tanaman musiman hortikultura, dan pohon peneduh.',
                    'icon' => 'Layers',
                ],
                [
                    'category' => 'Tambak Perikanan',
                    'area_ha' => 11,
                    'percent' => 8.9,
                    'badge' => 'Sektor Unggulan (8,9%)',
                    'desc' => 'Kawasan budidaya perikanan air payau produktif untuk komoditas ikan bandeng dan udang vaname.',
                    'icon' => 'Fish',
                ],
                [
                    'category' => 'Perkampungan / Permukiman',
                    'area_ha' => 9,
                    'percent' => 7.3,
                    'badge' => 'Kawasan Hunian (7,3%)',
                    'desc' => 'Kompleks pemukiman warga desa, balai desa, fasilitas umum, sarana ibadah, dan jalan perdesaan.',
                    'icon' => 'Home',
                ],
            ], JSON_UNESCAPED_UNICODE),

            // Mata Pencaharian Utama Warga
            'professions_title' => 'Mata Pencaharian Utama Warga',
            'professions_subtitle' => 'Distribusi sektor pekerjaan masyarakat Desa Karangwungu',
            'professions_list' => json_encode([
                ['label' => 'Petani Sawah / Palawija', 'count' => 1150, 'percent' => 33.0, 'icon' => 'Wheat'],
                ['label' => 'Petambak Ikan Bandeng & Udang', 'count' => 840, 'percent' => 24.1, 'icon' => 'Fish'],
                ['label' => 'Karyawan Swasta & Buruh Pabrik', 'count' => 520, 'percent' => 14.9, 'icon' => 'Building2'],
                ['label' => 'Pelaku UMKM & Pedagang', 'count' => 460, 'percent' => 13.2, 'icon' => 'Store'],
                ['label' => 'Lainnya / Wirausaha & Jasa', 'count' => 400, 'percent' => 11.6, 'icon' => 'Briefcase'],
                ['label' => 'PNS / TNI / Polri / Guru', 'count' => 112, 'percent' => 3.2, 'icon' => 'Award'],
            ], JSON_UNESCAPED_UNICODE),

            // Struktur Penduduk Berdasarkan Kelompok Usia
            'age_groups_title' => 'Struktur Penduduk Berdasarkan Kelompok Usia',
            'age_groups_subtitle' => 'Komposisi kelompok usia dan proporsi gender warga desa',
            'age_groups_list' => json_encode([
                ['label' => '0 – 4 Th (Balita)', 'male' => 132, 'female' => 128, 'count' => 260, 'percent' => 7.5],
                ['label' => '5 – 14 Th (Anak-Anak)', 'male' => 275, 'female' => 265, 'count' => 540, 'percent' => 15.5],
                ['label' => '15 – 24 Th (Remaja)', 'male' => 290, 'female' => 290, 'count' => 580, 'percent' => 16.7],
                ['label' => '25 – 54 Th (Usia Produktif)', 'male' => 742, 'female' => 768, 'count' => 1510, 'percent' => 43.4],
                ['label' => '55 – 64 Th (Pra-Lansia)', 'male' => 165, 'female' => 177, 'count' => 342, 'percent' => 9.8],
                ['label' => '65+ Th (Lansia)', 'male' => 120, 'female' => 130, 'count' => 250, 'percent' => 7.1],
            ], JSON_UNESCAPED_UNICODE),

            // Tingkat Pendidikan Terakhir Masyarakat
            'education_title' => 'Tingkat Pendidikan Terakhir Masyarakat',
            'education_subtitle' => 'Jenjang pendidikan formal penduduk usia sekolah ke atas',
            'education_list' => json_encode([
                ['label' => 'SMA / SMK / MA', 'count' => 1132, 'percent' => 32.5],
                ['label' => 'SMP / MTs', 'count' => 960, 'percent' => 27.6],
                ['label' => 'SD / Sederajat', 'count' => 890, 'percent' => 25.6],
                ['label' => 'Diploma / Sarjana (S1/S2)', 'count' => 320, 'percent' => 9.1],
                ['label' => 'Belum / Tidak Sekolah', 'count' => 180, 'percent' => 5.2],
            ], JSON_UNESCAPED_UNICODE),
        ];

        SiteSetting::setGroup('demographics', $demographicsSettings);

        // ============================================================
        // LEMBAGA & ORGANISASI KEMASYARAKATAN
        // ============================================================
        $organizationsSettings = [
            'organizations_title' => 'Lembaga & Organisasi Kemasyarakatan Desa',
            'organizations_subtitle' => 'Data lengkap kelembagaan, organisasi, dan lembaga kemasyarakatan Desa Karangwungu',
            'organizations_list' => json_encode([
                [
                    'id' => 'bpd',
                    'name' => 'Badan Permusyawaratan Desa (BPD)',
                    'shortName' => 'BPD',
                    'tagline' => 'Lembaga Legislasi, Permusyawaratan & Pengawasan Penyelenggaraan Pemerintahan Desa',
                    'category' => 'BPD',
                    'icon' => 'Landmark',
                    'logo' => '/assets/images/organizations/bpd.svg',
                    'image' => 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '5 Anggota Terpilih',
                    'period' => '2020 - 2026',
                    'secretariat' => 'Ruang BPD, Lantai 1 Sayap Timur Balai Desa Karangwungu, Kec. Karanggeneng, Kab. Lamongan',
                    'meeting_schedule' => 'Malam Kamis Legi (Rapat Rutin) & Sidang Paripurna Triwulan',
                    'email' => 'bpd@karangwungu-lamongan.desa.id',
                    'description' => 'Lembaga perwakilan warga desa yang berkedudukan sejajar sebagai mitra strategis Pemerintah Desa Karangwungu. BPD berperan krusial dalam menyerap aspirasi masyarakat, membahas serta menyepakati Rancangan Peraturan Desa (Perdes), dan mengawasi kinerja Kepala Desa demi terwujudnya tata kelola pemerintahan yang bersih, transparan, dan akuntabel.',
                                        'vision' => 'Terwujudnya BPD Karangwungu yang aspiratif, profesional, dan berintegritas dalam mengawal tata kelola pemerintahan desa yang partisipatif, transparan, dan berkeadilan sosial.',
                    'missions' => [
                        'Menyalurkan aspirasi dan kehendak masyarakat desa secara transparan, objektif, dan bertanggung jawab.',
                        'Mendorong pembentukan Peraturan Desa (Perdes) yang responsif dan berpihak kepada kepentingan masyarakat.',
                        'Mengoptimalkan pengawasan independen terhadap penyelenggaraan pemerintahan dan realisasi APBDes.',
                        'Mempererat kemitraan strategis yang sinergis bersama Kepala Desa dan seluruh lembaga desa.',
                    ],
                    'objectives' => [
                        'Meningkatnya keterlibatan partisipatif masyarakat dalam setiap Musyawarah Desa (Musdes).',
                        'Terwujudnya transparansi tata kelola anggaran desa yang akuntabel dan tepat sasaran.',
                        'Terciptanya payung hukum regulasi desa yang melindungi hak warga serta memajukan perekonomian desa.',
                    ],
'leader' => ['name' => 'ALI NASIHIN, SH', 'role' => 'Ketua BPD'],
                    'duties' => [
                        'Membahas dan menyepakati Rancangan Peraturan Desa bersama Kepala Desa.',
                        'Menampung, menghimpun, dan menyalurkan aspirasi seluruh masyarakat desa.',
                        'Melakukan pengawasan terhadap kinerja Kepala Desa dan realisasi APBDes.',
                        'Menyelenggarakan Musyawarah Desa (Musdes) dan Musrenbangdes bersama Pemdes.',
                        'Membentuk panitia pemilihan kepala desa sesuai regulasi perundang-undangan.',
                    ],
                    'programs' => [
                        'Penyelenggaraan Musyawarah Desa (Musdes) penetapan RKPDes & APBDes tahunan.',
                        'Penyusunan Peraturan Desa inisiatif dan harmonisasi regulasi desa bersama Pemdes.',
                        'Pengawasan triwulan terhadap realisasi fisik dan serapan dana APBDes.',
                        'Penjaringan aspirasi warga (Reses Desa) di setiap dusun secara berkala.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua BPD', 'name' => 'ALI NASIHIN, SH'],
                        ['role' => 'Wakil Ketua', 'name' => 'M. SHOLIKHIN'],
                        ['role' => 'Sekretaris', 'name' => 'AHMAD RIFAI'],
                        ['role' => 'Ketua Bidang Penyelenggaraan Pemerintahan', 'name' => 'SUTRISNO'],
                        ['role' => 'Ketua Bidang Pembangunan & Kesejahteraan Warga', 'name' => 'ZAINAL ABIDIN'],
                    ],
                ],
                [
                    'id' => 'pkk',
                    'name' => 'Tim Penggerak PKK (Pemberdayaan Kesejahteraan Keluarga)',
                    'shortName' => 'PKK',
                    'tagline' => 'Gerakan Pemberdayaan Perempuan, Ketahanan Pangan & Kesejahteraan Keluarga Sehat',
                    'category' => 'PKK',
                    'icon' => 'HeartHandshake',
                    'logo' => '/assets/images/organizations/pkk.svg',
                    'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '35 Kader Aktif',
                    'period' => '2020 - 2026',
                    'secretariat' => 'Gedung PKK & Rumah Sayang Ibu Karangwungu, Kompleks Balai Desa Karangwungu',
                    'meeting_schedule' => 'Tanggal 10 Setiap Bulan & Pertemuan Dasawisma Mingguan',
                    'email' => 'pkk@karangwungu-lamongan.desa.id',
                    'description' => 'Organisasi kemasyarakatan yang memberdayakan kaum perempuan dalam mengelola 10 Program Pokok PKK demi mewujudkan keluarga yang beriman, sehat, cerdas, berdaya saing, dan sejahtera lahir batin di seluruh pelosok Desa Karangwungu.',
                                        'vision' => 'Terwujudnya keluarga Desa Karangwungu yang beriman, bertakwa, sehat, cerdas, berdaya saing, berakhlak mulia, dan sejahtera lahir batin.',
                    'missions' => [
                        'Meningkatkan pembinaan pola asuh anak, ketahanan mental spiritual, dan gotong royong keluarga.',
                        'Meningkatkan derajat kesehatan ibu, bayi, balita, dan lansia secara terpadu demi pencegahan stunting.',
                        'Mengembangkan keterampilan ekonomi produktif keluarga melalui Usaha Peningkatan Pendapatan Keluarga (UP2K).',
                        'Mengoptimalkan pemanfaatan pekarangan rumah sebagai lumbung pangan bergizi dan asri (Hatinya PKK).',
                    ],
                    'objectives' => [
                        'Menurunkan angka risiko stunting hingga terwujud zero stunting di Desa Karangwungu.',
                        'Meningkatnya kemandirian ekonomi kaum perempuan berbasis olahan pangan lokal dan kerajinan.',
                        'Terbentuknya lingkungan tempat tinggal yang bersih, sehat, dan asri melalui gerakan aktif Dasawisma.',
                    ],
'leader' => ['name' => 'Hj. NUR LAILI', 'role' => 'Ketua TP-PKK Desa'],
                    'duties' => [
                        'Menyusun rencana kerja TP-PKK Desa sesuai dengan hasil Rakerda PKK Kabupaten.',
                        'Menggerakkan partisipasi keluarga dalam peningkatan pola asuh dan gizi balita.',
                        'Membina kelompok PKK Dusun, RW, RT, dan kelompok Dasawisma se-Desa Karangwungu.',
                        'Menjalin koordinasi kemitraan dengan Puskesmas, Bidan Desa, dan lembaga kemasyarakatan.',
                    ],
                    'programs' => [
                        'Pelaksanaan Posyandu Balita, Ibu Hamil, dan Posyandu Lansia terintegrasi bulanan.',
                        'Gerakan intervensi pencegahan stunting melalui demo PMT & edukasi gizi seimbang.',
                        'Pelatihan kewirausahaan boga, membatik, dan pemanfaatan pekarangan (Hatinya PKK).',
                        'Pembinaan intensif kelompok Dasawisma dan pencatatan rekapitulasi data keluarga.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua TP-PKK', 'name' => 'Hj. NUR LAILI'],
                        ['role' => 'Sekretaris', 'name' => 'SITI AMINAH, S.Pd'],
                        ['role' => 'Bendahara', 'name' => 'SRI WAHYUNI'],
                        ['role' => 'Ketua Pokja I (Pancasila & Gotong Royong)', 'name' => 'KHOIRIYAH'],
                        ['role' => 'Ketua Pokja II (Pendidikan & Keterampilan)', 'name' => 'ENI SURYANI'],
                        ['role' => 'Ketua Pokja III (Penguatan Pangan, Sandang & Tata Graha)', 'name' => 'FATIMAH'],
                        ['role' => 'Ketua Pokja IV (Kesehatan, Kelestarian Lingkungan & Perencanaan Sehat)', 'name' => 'Bdn. RINAWATI'],
                    ],
                ],
                [
                    'id' => 'karang-taruna',
                    'name' => 'Karang Taruna "Wungu Sakti"',
                    'shortName' => 'Karang Taruna',
                    'tagline' => 'Wadah Kreativitas, Olahraga, Kewirausahaan & Kepeloporan Pemuda Desa',
                    'category' => 'Karang Taruna',
                    'icon' => 'Flame',
                    'logo' => '/assets/images/organizations/karang-taruna.svg',
                    'image' => 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '48 Pemuda Aktif',
                    'period' => '2022 - 2027',
                    'secretariat' => 'Gedung Kepemudaan Karang Taruna, Lapangan Gelora Karangwungu',
                    'meeting_schedule' => 'Minggu Pertama Setiap Bulan & Rapat Insidental Tim Kerja',
                    'email' => 'karangtaruna@karangwungu-lamongan.desa.id',
                    'description' => 'Organisasi kepemudaan yang menjadi wadah pengembangan potensi generasi muda Desa Karangwungu. Karang Taruna Wungu Sakti aktif dalam kepeloporan sosial kemanusiaan, turnamen olahraga, pelestarian seni budaya daerah, dan inkubasi usaha pemuda.',
                                        'vision' => 'Mewujudkan generasi muda Karangwungu yang berkarakter tangguh, inovatif, berdaya saing, dan berjiwa kepeloporan sosial dalam membangun kemandirian desa.',
                    'missions' => [
                        'Mengembangkan potensi, bakat olahraga, kreativitas digital, dan seni budaya pemuda desa.',
                        'Menumbuhkan kesetiakawanan sosial, kepedulian kemanusiaan, dan kesiapsiagaan bencana alam.',
                        'Membangun inkubasi wirausaha muda desa berbasis ekonomi kreatif dan pemanfaatan teknologi.',
                        'Mencegah timbulnya dekadensi moral, kenakalan remaja, dan bahaya penyalahgunaan narkotika.',
                    ],
                    'objectives' => [
                        'Mencetak kader pemuda berprestasi di bidang olahraga dan seni di tingkat daerah maupun regional.',
                        'Mendorong kemandirian ekonomi para pemuda desa melalui usaha produktif berkelanjutan.',
                        'Terciptanya iklim persatuan pemuda yang solid, guyub rukun, dan harmonis di seluruh dusun.',
                    ],
'leader' => ['name' => 'MUHAMMAD FAHRUDIN', 'role' => 'Ketua Karang Taruna'],
                    'duties' => [
                        'Menyelenggarakan pembinaan kepemudaan di bidang olahraga, kebudayaan, dan sosial.',
                        'Menjadi motor penggerak gotong royong dan kesiapsiagaan sosial kemasyarakatan.',
                        'Mendorong kemandirian ekonomi pemuda melalui pelatihan kejuruan dan digital.',
                        'Mencegah timbulnya kenakalan remaja, narkoba, dan dekadensi moral di kalangan muda.',
                    ],
                    'programs' => [
                        'Penyelenggaraan turnamen olahraga tahunan (Voli & Sepak Bola Karangwungu Cup).',
                        'Kepanitiaan peringatan HUT RI, karnaval budaya, festival obor, dan tirakatan desa.',
                        'Aksi tanggap sosial bencana, donor darah sukarela, dan santunan yatim piatu.',
                        'Workshop digital marketing & fotografi produk untuk pemuda pegiat UMKM desa.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua Karang Taruna', 'name' => 'MUHAMMAD FAHRUDIN'],
                        ['role' => 'Wakil Ketua', 'name' => 'DIMAS PRASETYO'],
                        ['role' => 'Sekretaris', 'name' => 'ANGGA SAPUTRA'],
                        ['role' => 'Bendahara', 'name' => 'BAYU PERMANA'],
                        ['role' => 'Koordinator Olahraga & Rekreasi', 'name' => 'FERRY IRAWAN'],
                        ['role' => 'Koordinator Seni, Budaya & Keagamaan', 'name' => 'ILHAM MAULANA'],
                        ['role' => 'Koordinator Humas & Media Komunikasi', 'name' => 'REZA ADITYA'],
                    ],
                ],
                [
                    'id' => 'lpm',
                    'name' => 'Lembaga Pemberdayaan Masyarakat (LPM)',
                    'shortName' => 'LPM',
                    'tagline' => 'Mitra Perencanaan Partisipatif, Gotong Royong & Penguatan Swadaya Pembangunan',
                    'category' => 'LPM',
                    'icon' => 'Building2',
                    'logo' => '/assets/images/organizations/lpm.svg',
                    'image' => 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '12 Pengurus',
                    'period' => '2021 - 2026',
                    'secretariat' => 'Ruang Kerja LPM, Balai Desa Karangwungu',
                    'meeting_schedule' => 'Setiap Menjelang Musrenbangdes & Pra-Pekerjaan Fisik Desa',
                    'email' => 'lpm@karangwungu-lamongan.desa.id',
                    'description' => 'Lembaga yang bertugas mendampingi Pemerintah Desa dalam menampung dan menyusun aspirasi kebutuhan pembangunan secara partisipatif dari tingkat akar rumput, serta menggerakkan partisipasi swadaya gotong royong warga dalam pelaksanaan dan pengawasan mutu fisik proyek desa.',
                                        'vision' => 'Menjadi motor penggerak partisipasi, gotong royong, dan swadaya masyarakat demi percepatan pembangunan desa yang berkualitas, merata, dan berkelanjutan.',
                    'missions' => [
                        'Menyusun rencana pembangunan partisipatif yang bersumber langsung dari aspirasi warga dusun.',
                        'Menggerakkan semangat gotong royong dan keswadayaan warga dalam memelihara fasilitas umum.',
                        'Melakukan pemantauan dan pengawasan mutu hasil pembangunan sarana prasarana fisik desa.',
                        'Mendorong penguatan potensi ekonomi lokal melalui kemitraan strategis kelompok masyarakat.',
                    ],
                    'objectives' => [
                        'Terserapnya skala prioritas usulan pembangunan secara adil di seluruh wilayah dusun Karangwungu.',
                        'Meningkatnya kepedulian dan kontribusi swadaya warga dalam pemeliharaan infrastruktur desa.',
                        'Terwujudnya sarana prasarana desa yang kokoh, berdaya guna tinggi, dan bermanfaat jangka panjang.',
                    ],
'leader' => ['name' => 'SUNARTO', 'role' => 'Ketua LPM'],
                    'duties' => [
                        'Menyusun rencana pembangunan partisipatif dan mengusulkannya dalam Musrenbangdes.',
                        'Menggerakkan dan menumbuhkembangkan swadaya serta gotong royong masyarakat.',
                        'Melakukan pengawasan partisipatif terhadap mutu hasil pembangunan fisik desa.',
                        'Membantu menciptakan ketahanan masyarakat di bidang sosial, ekonomi, dan lingkungan.',
                    ],
                    'programs' => [
                        'Penyusunan matriks usulan prioritas infrastruktur per dusun pada Musrenbangdes.',
                        'Gerakan gotong royong serentak pembersihan drainase dan pengerasan jalan usaha tani.',
                        'Audit pengawasan partisipatif pelaksanaan proyek pavingisasi & saluran irigasi.',
                        'Pemberdayaan kelompok usaha ekonomi masyarakat berbasis potensi lokal perdesaan.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua LPM', 'name' => 'SUNARTO'],
                        ['role' => 'Sekretaris', 'name' => 'SUGIYANTO'],
                        ['role' => 'Bendahara', 'name' => 'KASDI'],
                        ['role' => 'Seksi Pembangunan Sarana & Prasarana Fisik', 'name' => 'WARNO'],
                        ['role' => 'Seksi Pemberdayaan Ekonomi & Koperasi', 'name' => 'DUL JALIL'],
                        ['role' => 'Seksi Lingkungan Hidup & Kebersihan', 'name' => 'SUWANDI'],
                    ],
                ],
                [
                    'id' => 'satlinmas',
                    'name' => 'Satuan Perlindungan Masyarakat (Satlinmas)',
                    'shortName' => 'Satlinmas',
                    'tagline' => 'Garda Terdepan Ketenteraman, Ketertiban Lingkungan & Tanggap Bencana Desa',
                    'category' => 'Satlinmas',
                    'icon' => 'ShieldAlert',
                    'logo' => '/assets/images/organizations/satlinmas.svg',
                    'image' => 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '20 Personel Siaga',
                    'period' => 'Aktif Berkelanjutan',
                    'secretariat' => 'Posko Komando Linmas, Sayap Barat Balai Desa Karangwungu',
                    'meeting_schedule' => 'Apel Malam Minggu (Bulanan) & Pengarahan Pengamanan Insidental',
                    'email' => 'satlinmas@karangwungu-lamongan.desa.id',
                    'description' => 'Satuan relawan warga yang dilatih secara profesional untuk membantu memelihara keamanan lingkungan, ketertiban masyarakat saat hajatan/acara desa, penanganan dini situasi darurat bencana banjir dan angin kencang, serta membantu pengamanan pemilu.',
                                        'vision' => 'Terwujudnya lingkungan Desa Karangwungu yang aman, tenteram, tertib, kondusif, dan tanggap darurat terhadap potensi bencana demi ketenangan warga.',
                    'missions' => [
                        'Menyelenggarakan sistem ronda keamanan lingkungan (Siskamling) terpadu di setiap lingkungan RT.',
                        'Meningkatkan keterampilan personel Linmas dalam mitigasi, evakuasi dini, dan pertolongan pertama bencana.',
                        'Melaksanakan pengamanan ketertiban pada kegiatan perayaan adat, keagamaan, hajatan, dan pemilu.',
                        'Memperkuat sinergi keamanan bersama unsur Babinsa Koramil dan Bhabinkamtibmas Polsek Karanggeneng.',
                    ],
                    'objectives' => [
                        'Terpeliharanya situasi ketenteraman dan ketertiban warga tanpa gangguan kriminalitas.',
                        'Kesiapsiagaan respon cepat personel dalam waktu kurang dari 15 menit saat terjadi situasi darurat.',
                        'Meningkatnya rasa aman, nyaman, dan kepastian perlindungan bagi seluruh warga masyarakat.',
                    ],
'leader' => ['name' => 'SLAMET RIYADI', 'role' => 'Komandan Satlinmas'],
                    'duties' => [
                        'Membantu penanganan ketenteraman, ketertiban umum, dan keamanan desa.',
                        'Membantu penanggulangan dini dan evakuasi korban bencana alam dan kebakaran.',
                        'Membantu pengamanan penyelenggaraan pemilu legislatif, pilpres, dan pilkades.',
                        'Membantu kegiatan sosial kemasyarakatan dan pengaturan kelancaran lalu lintas.',
                    ],
                    'programs' => [
                        'Patroli ronda malam (Siskamling) rutin terjadwal di seluruh dusun Karangwungu.',
                        'Pengamanan acara peringatan hari besar keagamaan, sedekah bumi, dan karnaval desa.',
                        'Simulasi tanggap darurat bencana bersama BPBD Kabupaten Lamongan.',
                        'Koordinasi berkala bersama Babinsa Koramil & Bhabinkamtibmas Polsek Karanggeneng.',
                    ],
                    'structure' => [
                        ['role' => 'Komandan Satlinmas', 'name' => 'SLAMET RIYADI'],
                        ['role' => 'Wakil Komandan', 'name' => 'SUPARMAN'],
                        ['role' => 'Sekretaris & Logistik', 'name' => 'HADI PURNOMO'],
                        ['role' => 'Komandan Regu Kesiapsiagaan & Patroli', 'name' => 'TEGUH SANTOSO'],
                        ['role' => 'Komandan Regu Evakuasi & Penyelamatan', 'name' => 'AGUS WIBOWO'],
                    ],
                ],
                [
                    'id' => 'rt-rw',
                    'name' => 'Rukun Tetangga / Rukun Warga (RT/RW)',
                    'shortName' => 'RT / RW',
                    'tagline' => 'Ujung Tombak Kerukunan, Pelayanan Administrasi & Keharmonisan Warga Dusun',
                    'category' => 'RT / RW',
                    'icon' => 'Home',
                    'logo' => '/assets/images/organizations/rt-rw.svg',
                    'image' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '14 RT & 4 RW',
                    'period' => '2020 - 2026',
                    'secretariat' => 'Sekretariat RW 01 - RW 04 di Balai Dusun Masing-Masing Desa Karangwungu',
                    'meeting_schedule' => 'Pertemuan Rembuk RT Bulanan (Arisan & Sambung Rasa Warga)',
                    'email' => 'pelayanan@karangwungu-lamongan.desa.id',
                    'description' => 'Lembaga kemasyarakatan terdepan yang langsung berinteraksi dengan warga setiap hari. Bertanggung jawab memelihara ketertiban lingkungan, mendata kependudukan, memberikan surat pengantar layanan, serta memimpin mediasi kerukunan antarwarga.',
                                        'vision' => 'Terwujudnya lingkungan rukun tetangga dan rukun warga yang guyub, harmonis, tertib administrasi, religius, dan berkeadilan sosial.',
                    'missions' => [
                        'Memberikan pelayanan administrasi pengantar warga secara cepat, ramah, dan bebas pungutan liar.',
                        'Menyelenggarakan forum rembuk warga berkala sebagai sarana musyawarah mufakat dan resolusi masalah.',
                        'Mengkoordinasikan kegiatan gotong royong kebersihan lingkungan dan kelestarian sanitasi.',
                        'Memutakhirkan basis data kependudukan secara akurat demi ketepatan penyaluran program sosial.',
                    ],
                    'objectives' => [
                        'Terpeliharanya kerukunan hidup bertetangga yang harmonis tanpa gesekan sosial di tingkat akar rumput.',
                        'Kelancaran dan ketertiban administrasi kependudukan warga di seluruh 14 RT dan 4 RW.',
                        'Terciptanya lingkungan permukiman yang bersih, hijau, tertata, dan nyaman untuk ditinggali.',
                    ],
'leader' => ['name' => 'H. MUKHTAR', 'role' => 'Koordinator Forum RW Desa'],
                    'duties' => [
                        'Membantu Kepala Desa dalam bidang pelayanan administrasi kependudukan warga.',
                        'Memelihara kerukunan hidup, persatuan, dan ketertiban lingkungan tempat tinggal.',
                        'Menjembatani penyampaian aspirasi dan keluhan warga kepada Pemerintah Desa.',
                        'Mengkoordinasikan kegiatan gotong royong, kebersihan saluran, dan arisan sosial.',
                    ],
                    'programs' => [
                        'Pelayanan penerbitan surat pengantar RT/RW untuk keperluan adminduk & perizinan.',
                        'Rembuk warga bulanan untuk transparansi iuran kas lingkungan dan perbaikan fasilitas.',
                        'Kerja bakti pembersihan selokan, jalan gang, dan pemasangan lampu penerangan jalan.',
                        'Pendataan berkala status warga baru, mutasi kependudukan, dan bantuan sosial tepat sasaran.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua RW 01 (Dusun Krajan)', 'name' => 'H. MUKHTAR'],
                        ['role' => 'Ketua RW 02 (Dusun Karangwungu Timur)', 'name' => 'SHODIQIN'],
                        ['role' => 'Ketua RW 03 (Dusun Karangwungu Barat)', 'name' => 'MISKAN'],
                        ['role' => 'Ketua RW 04 (Dusun Sumberagung)', 'name' => 'SUNARYO'],
                    ],
                ],
                [
                    'id' => 'kelompok-tani',
                    'name' => 'Gabungan Kelompok Tani & Pembudidaya Ikan (Gapoktan Sido Makmur)',
                    'shortName' => 'Gapoktan',
                    'tagline' => 'Pilar Kedaulatan Pangan, Tata Kelola Irigasi, Perikanan Tambak & Kesejahteraan Petani',
                    'category' => 'Kelompok Tani & Tambak',
                    'icon' => 'Wheat',
                    'logo' => '/assets/images/organizations/gapoktan.svg',
                    'image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
                    'memberCount' => '8 Poktan & 160+ Petani & Petambak',
                    'period' => '2021 - 2026',
                    'secretariat' => 'Gudang Pertanian & Sekretariat Gapoktan Sido Makmur, Karangwungu',
                    'meeting_schedule' => 'Pertemuan Selapanan (Setiap 35 Hari) Menjelang Musim Tanam/Tebar',
                    'email' => 'gapoktan@karangwungu-lamongan.desa.id',
                    'description' => 'Wadah kebersamaan para petani sawah padi-palawija dan petambak budidaya ikan bandeng serta udang vaname di Desa Karangwungu. Gapoktan mengkoordinasikan distribusi pupuk bersubsidi, pembagian pintu air irigasi, adopsi bibit unggul, serta kerja sama pemasaran komoditas pertanian.',
                                        'vision' => 'Terwujudnya kemandirian pangan, ketahanan perikanan tambak, dan kemakmuran petani serta petambak Desa Karangwungu yang modern dan ramah lingkungan.',
                    'missions' => [
                        'Menjamin pemerataan dan ketepatan waktu distribusi pupuk bersubsidi serta benih unggul bersertifikat.',
                        'Mengoptimalkan tata kelola pembagian air irigasi sawah dan tambak secara berkeadilan.',
                        'Mendorong penerapan teknologi pertanian ramah lingkungan, pupuk organik, dan biosecurity tambak.',
                        'Membangun jejaring pemasaran komoditas hasil panen demi kepastian harga yang menguntungkan petani.',
                    ],
                    'objectives' => [
                        'Peningkatan produktivitas panen padi sawah mencapai target optimal dan hasil tambak melimpah.',
                        'Ketersediaan pasokan irigasi yang stabil dan terpeliharanya kelancaran saluran air desa.',
                        'Meningkatnya pendapatan bersih dan kesejahteraan ekonomi keluarga petani serta petambak Karangwungu.',
                    ],
'leader' => ['name' => 'H. MULYADI', 'role' => 'Ketua Gapoktan'],
                    'duties' => [
                        'Menyusun Rencana Definitif Kebutuhan Kelompok (RDKK) pupuk dan saprotan pertanian.',
                        'Mengatur jadwal pembagian air irigasi dan tata kelola tanggul tambak secara adil.',
                        'Memfasilitasi bimbingan teknis bersama Petugas Penyuluh Lapangan (PPL) Pertanian & Perikanan.',
                        'Membantu stabilitas harga jual gabah, beras, serta panen ikan bandeng dan udang.',
                    ],
                    'programs' => [
                        'Sekolah Lapang Pengendalian Hama Terpadu (SLPHT) dan penggunaan pupuk organik hayati.',
                        'Pengelolaan dan pemerataan distribusi pupuk bersubsidi resmi pemerintah.',
                        'Normalisasi berkala pintu air dan saluran irigasi primer persawahan desa.',
                        'Kemitraan penyerapan hasil tangkapan ikan tambak dengan pasar ikan Lamongan.',
                    ],
                    'structure' => [
                        ['role' => 'Ketua Gapoktan', 'name' => 'H. MULYADI'],
                        ['role' => 'Sekretaris', 'name' => 'MUKSIN'],
                        ['role' => 'Bendahara', 'name' => 'SUKARTI'],
                        ['role' => 'Koordinator Poktan Padi Sawah', 'name' => 'KAMTO'],
                        ['role' => 'Koordinator Pokdakan Budidaya Tambak', 'name' => 'NUR HASAN'],
                        ['role' => 'Koordinator Distribusi Pupuk & Sarana Pertanian', 'name' => 'SUWARDI'],
                    ],
                ],
            ], JSON_UNESCAPED_UNICODE),
        ];

        SiteSetting::setGroup('organizations', $organizationsSettings);
    }
}
