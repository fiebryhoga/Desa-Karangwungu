<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    /**
     * Display the general & contact configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('general');

        return Inertia::render('Admin/Settings/General', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update general and contact configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // 1. Identitas & Tagline Desa
            'site_name' => ['nullable', 'string', 'max:255'],
            'site_subdistrict' => ['nullable', 'string', 'max:255'],
            'site_regency' => ['nullable', 'string', 'max:255'],
            'site_province' => ['nullable', 'string', 'max:255'],
            'site_postal_code' => ['nullable', 'string', 'max:50'],
            'site_tagline' => ['nullable', 'string', 'max:2000'],

            // 2. Kontak & Balai Desa
            'contact_address' => ['nullable', 'string', 'max:1000'],
            'contact_phone' => ['nullable', 'string', 'max:100'],
            'contact_whatsapp' => ['nullable', 'string', 'max:100'],
            'contact_email' => ['nullable', 'string', 'max:255'],
            'contact_working_hours' => ['nullable', 'string', 'max:255'],
            'contact_maps_url' => ['nullable', 'string', 'max:2000'],

            // 3. Web Terkait (Portal Instansi)
            'related_link_1_name' => ['nullable', 'string', 'max:255'],
            'related_link_1_url' => ['nullable', 'string', 'max:500'],
            'related_link_1_active' => ['nullable', 'string', 'in:0,1'],

            'related_link_2_name' => ['nullable', 'string', 'max:255'],
            'related_link_2_url' => ['nullable', 'string', 'max:500'],
            'related_link_2_active' => ['nullable', 'string', 'in:0,1'],

            'related_link_3_name' => ['nullable', 'string', 'max:255'],
            'related_link_3_url' => ['nullable', 'string', 'max:500'],
            'related_link_3_active' => ['nullable', 'string', 'in:0,1'],

            // 4. Media Sosial Resmi Desa
            'social_whatsapp_active' => ['nullable', 'string', 'in:0,1'],
            'social_whatsapp_url' => ['nullable', 'string', 'max:500'],

            'social_instagram_active' => ['nullable', 'string', 'in:0,1'],
            'social_instagram_url' => ['nullable', 'string', 'max:500'],

            'social_facebook_active' => ['nullable', 'string', 'in:0,1'],
            'social_facebook_url' => ['nullable', 'string', 'max:500'],

            'social_youtube_active' => ['nullable', 'string', 'in:0,1'],
            'social_youtube_url' => ['nullable', 'string', 'max:500'],

            'social_tiktok_active' => ['nullable', 'string', 'in:0,1'],
            'social_tiktok_url' => ['nullable', 'string', 'max:500'],

            'social_twitter_active' => ['nullable', 'string', 'in:0,1'],
            'social_twitter_url' => ['nullable', 'string', 'max:500'],
        ]);

        $dataToSave = [
            'site_name' => $validated['site_name'] ?? 'Desa Karangwungu',
            'site_subdistrict' => $validated['site_subdistrict'] ?? 'Kecamatan Karanggeneng',
            'site_regency' => $validated['site_regency'] ?? 'Kabupaten Lamongan',
            'site_province' => $validated['site_province'] ?? 'Jawa Timur',
            'site_postal_code' => $validated['site_postal_code'] ?? '62254',
            'site_tagline' => $validated['site_tagline'] ?? '',

            'contact_address' => $validated['contact_address'] ?? '',
            'contact_phone' => $validated['contact_phone'] ?? '',
            'contact_whatsapp' => $validated['contact_whatsapp'] ?? '',
            'contact_email' => $validated['contact_email'] ?? '',
            'contact_working_hours' => $validated['contact_working_hours'] ?? '',
            'contact_maps_url' => $validated['contact_maps_url'] ?? '',

            'related_link_1_name' => $validated['related_link_1_name'] ?? 'Pemkab Lamongan',
            'related_link_1_url' => $validated['related_link_1_url'] ?? 'https://lamongankab.go.id/',
            'related_link_1_active' => (string) ($validated['related_link_1_active'] ?? '1'),

            'related_link_2_name' => $validated['related_link_2_name'] ?? 'Kemendesa',
            'related_link_2_url' => $validated['related_link_2_url'] ?? 'https://kemendesa.go.id/',
            'related_link_2_active' => (string) ($validated['related_link_2_active'] ?? '1'),

            'related_link_3_name' => $validated['related_link_3_name'] ?? 'Kemendagri',
            'related_link_3_url' => $validated['related_link_3_url'] ?? 'https://kemendagri.go.id/',
            'related_link_3_active' => (string) ($validated['related_link_3_active'] ?? '0'),

            'social_whatsapp_active' => (string) ($validated['social_whatsapp_active'] ?? '1'),
            'social_whatsapp_url' => $validated['social_whatsapp_url'] ?? '',

            'social_instagram_active' => (string) ($validated['social_instagram_active'] ?? '1'),
            'social_instagram_url' => $validated['social_instagram_url'] ?? '',

            'social_facebook_active' => (string) ($validated['social_facebook_active'] ?? '1'),
            'social_facebook_url' => $validated['social_facebook_url'] ?? '',

            'social_youtube_active' => (string) ($validated['social_youtube_active'] ?? '1'),
            'social_youtube_url' => $validated['social_youtube_url'] ?? '',

            'social_tiktok_active' => (string) ($validated['social_tiktok_active'] ?? '0'),
            'social_tiktok_url' => $validated['social_tiktok_url'] ?? '',

            'social_twitter_active' => (string) ($validated['social_twitter_active'] ?? '0'),
            'social_twitter_url' => $validated['social_twitter_url'] ?? '',
        ];

        // Save settings to database
        SiteSetting::setGroup('general', $dataToSave);

        // Record audit activity
        $user = $request->user();
        AdminActivityLog::record(
            action: 'update_general_settings',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: 'Memperbarui konfigurasi umum, kontak balai desa, media sosial, dan tautan web terkait'
        );

        return back()->with('success', 'Konfigurasi umum & kontak desa berhasil diperbarui!');
    }
}
