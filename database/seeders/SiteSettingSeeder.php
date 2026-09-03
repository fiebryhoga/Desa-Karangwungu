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
    }
}
