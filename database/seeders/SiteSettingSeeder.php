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
    }
}
