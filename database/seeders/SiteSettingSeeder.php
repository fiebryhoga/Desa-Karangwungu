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
            'overview_photo_2' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
            'overview_photo_2_label' => 'Persawahan Padi',
            'overview_photo_3' => 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
            'overview_photo_3_label' => 'Tambak Ikan & Udang',

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
    }
}
