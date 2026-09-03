<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class OverviewSettingController extends Controller
{
    /**
     * Display the overview & spatial profile configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('overview');

        // Parse map_points JSON if exists
        if (isset($settings['map_points']) && is_string($settings['map_points'])) {
            $decoded = json_decode($settings['map_points'], true);
            $settings['map_points_data'] = is_array($decoded) ? $decoded : [];
        } else {
            $settings['map_points_data'] = [];
        }

        return Inertia::render('Admin/Settings/Overview', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update overview and spatial map configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // 1. 3 Foto Bentang Alam
            'overview_photo_1' => ['nullable', 'string'],
            'overview_photo_1_label' => ['nullable', 'string', 'max:255'],
            'overview_photo_1_file' => ['nullable', 'image', 'max:5120'],

            'overview_photo_2' => ['nullable', 'string'],
            'overview_photo_2_label' => ['nullable', 'string', 'max:255'],
            'overview_photo_2_file' => ['nullable', 'image', 'max:5120'],

            'overview_photo_3' => ['nullable', 'string'],
            'overview_photo_3_label' => ['nullable', 'string', 'max:255'],
            'overview_photo_3_file' => ['nullable', 'image', 'max:5120'],

            // 2. Deskripsi Narasi
            'overview_paragraph_1' => ['nullable', 'string', 'max:5000'],
            'overview_paragraph_2' => ['nullable', 'string', 'max:5000'],

            // 3. 3 Point Unggulan & Icon
            'overview_point_1_title' => ['nullable', 'string', 'max:255'],
            'overview_point_1_desc' => ['nullable', 'string', 'max:1000'],
            'overview_point_1_icon' => ['nullable', 'string', 'max:100'],

            'overview_point_2_title' => ['nullable', 'string', 'max:255'],
            'overview_point_2_desc' => ['nullable', 'string', 'max:1000'],
            'overview_point_2_icon' => ['nullable', 'string', 'max:100'],

            'overview_point_3_title' => ['nullable', 'string', 'max:255'],
            'overview_point_3_desc' => ['nullable', 'string', 'max:1000'],
            'overview_point_3_icon' => ['nullable', 'string', 'max:100'],

            // 4. Batas Wilayah 4 Arah
            'border_north_title' => ['nullable', 'string', 'max:255'],
            'border_north_desc' => ['nullable', 'string', 'max:1000'],

            'border_south_title' => ['nullable', 'string', 'max:255'],
            'border_south_desc' => ['nullable', 'string', 'max:1000'],

            'border_east_title' => ['nullable', 'string', 'max:255'],
            'border_east_desc' => ['nullable', 'string', 'max:1000'],

            'border_west_title' => ['nullable', 'string', 'max:255'],
            'border_west_desc' => ['nullable', 'string', 'max:1000'],

            // 5. Titik Peta (JSON or Array)
            'map_points' => ['nullable'],
        ]);

        $uploadDir = public_path('uploads/settings');
        if (!File::exists($uploadDir)) {
            File::makeDirectory($uploadDir, 0755, true);
        }

        // Handle File Uploads
        $photoKeys = [
            'overview_photo_1' => 'overview_photo_1_file',
            'overview_photo_2' => 'overview_photo_2_file',
            'overview_photo_3' => 'overview_photo_3_file',
        ];

        foreach ($photoKeys as $settingKey => $fileKey) {
            if ($request->hasFile($fileKey)) {
                $file = $request->file($fileKey);
                $filename = 'overview_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadDir, $filename);
                $validated[$settingKey] = '/uploads/settings/' . $filename;
            }
            unset($validated[$fileKey]);
        }

        // Ensure map_points is stored as string JSON
        if (isset($validated['map_points'])) {
            if (is_array($validated['map_points'])) {
                $validated['map_points'] = json_encode($validated['map_points'], JSON_UNESCAPED_UNICODE);
            }
        }

        // Save to SiteSetting
        SiteSetting::setGroup('overview', $validated);

        // Activity log
        AdminActivityLog::log(
            'update_overview_settings',
            'Memperbarui konfigurasi gambaran umum wilayah, 3 foto bentang alam, 3 point potensi, batas wilayah, dan titik koordinat peta spasial desa.'
        );

        return back()->with('success', 'Konfigurasi gambaran umum dan titik peta berhasil disimpan.');
    }
}
