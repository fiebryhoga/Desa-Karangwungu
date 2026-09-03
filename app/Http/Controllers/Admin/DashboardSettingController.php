<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DashboardSettingController extends Controller
{
    /**
     * Display the dashboard configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('dashboard');

        return Inertia::render('Admin/Settings/Dashboard', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the dashboard configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // 1. Hero Section
            'hero_badge' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:500'],
            'hero_description' => ['nullable', 'string', 'max:2000'],
            'hero_image' => ['nullable', 'string'],
            'hero_image_file' => ['nullable', 'image', 'max:5120'], // max 5MB

            // 2. Sambutan Kepala Desa
            'welcome_title' => ['nullable', 'string', 'max:500'],
            'welcome_greeting' => ['nullable', 'string', 'max:500'],
            'welcome_content' => ['nullable', 'string', 'max:5000'],
            'welcome_leader_name' => ['nullable', 'string', 'max:255'],
            'welcome_leader_position' => ['nullable', 'string', 'max:255'],
            'welcome_leader_photo' => ['nullable', 'string'],
            'welcome_leader_photo_file' => ['nullable', 'image', 'max:5120'],

            // 3. Selayang Pandang
            'overview_location' => ['nullable', 'string', 'max:255'],
            'overview_content' => ['nullable', 'string', 'max:5000'],

            // 3. Selayang Pandang Card 1
            'overview_card_1_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_1_title' => ['nullable', 'string', 'max:255'],
            'overview_card_1_image' => ['nullable', 'string'],
            'overview_card_1_image_file' => ['nullable', 'image', 'max:5120'],

            // 3. Selayang Pandang Card 2
            'overview_card_2_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_2_title' => ['nullable', 'string', 'max:255'],
            'overview_card_2_image' => ['nullable', 'string'],
            'overview_card_2_image_file' => ['nullable', 'image', 'max:5120'],

            // 3. Selayang Pandang Card 3
            'overview_card_3_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_3_title' => ['nullable', 'string', 'max:255'],
            'overview_card_3_image' => ['nullable', 'string'],
            'overview_card_3_image_file' => ['nullable', 'image', 'max:5120'],
        ]);

        $uploadDir = public_path('uploads/settings');
        if (!File::exists($uploadDir)) {
            File::makeDirectory($uploadDir, 0755, true);
        }

        $imageFields = [
            'hero_image' => 'hero_image_file',
            'welcome_leader_photo' => 'welcome_leader_photo_file',
            'overview_card_1_image' => 'overview_card_1_image_file',
            'overview_card_2_image' => 'overview_card_2_image_file',
            'overview_card_3_image' => 'overview_card_3_image_file',
        ];

        $dataToSave = [
            'hero_badge' => $validated['hero_badge'] ?? '',
            'hero_title' => $validated['hero_title'] ?? '',
            'hero_description' => $validated['hero_description'] ?? '',
            'welcome_title' => $validated['welcome_title'] ?? '',
            'welcome_greeting' => $validated['welcome_greeting'] ?? '',
            'welcome_content' => $validated['welcome_content'] ?? '',
            'welcome_leader_name' => $validated['welcome_leader_name'] ?? '',
            'welcome_leader_position' => $validated['welcome_leader_position'] ?? '',
            'overview_location' => $validated['overview_location'] ?? '',
            'overview_content' => $validated['overview_content'] ?? '',
            'overview_card_1_badge' => $validated['overview_card_1_badge'] ?? '',
            'overview_card_1_title' => $validated['overview_card_1_title'] ?? '',
            'overview_card_2_badge' => $validated['overview_card_2_badge'] ?? '',
            'overview_card_2_title' => $validated['overview_card_2_title'] ?? '',
            'overview_card_3_badge' => $validated['overview_card_3_badge'] ?? '',
            'overview_card_3_title' => $validated['overview_card_3_title'] ?? '',
        ];

        // Handle Image uploads and fallbacks
        foreach ($imageFields as $targetKey => $fileInputKey) {
            if ($request->hasFile($fileInputKey)) {
                $file = $request->file($fileInputKey);
                $filename = $targetKey . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadDir, $filename);
                $dataToSave[$targetKey] = '/uploads/settings/' . $filename;
            } else {
                // Keep existing or incoming text URL
                $dataToSave[$targetKey] = $request->input($targetKey, SiteSetting::getValue($targetKey, ''));
            }
        }

        // Save settings to database
        SiteSetting::setGroup('dashboard', $dataToSave);

        // Record audit activity
        $user = $request->user();
        AdminActivityLog::record(
            action: 'update_dashboard_settings',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: 'Memperbarui konfigurasi landing page / beranda website desa'
        );

        return back()->with('success', 'Konfigurasi beranda website berhasil disimpan dan diperbarui!');
    }
}
