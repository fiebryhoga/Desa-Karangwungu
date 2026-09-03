<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicSettingController extends Controller
{
    /**
     * Display the Demographics Settings page in Admin.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('demographics');

        // Decode JSON arrays for frontend manipulation
        $settings['land_use_list_data'] = isset($settings['land_use_list']) && is_string($settings['land_use_list'])
            ? json_decode($settings['land_use_list'], true) ?: []
            : (is_array($settings['land_use_list'] ?? null) ? $settings['land_use_list'] : []);

        $settings['professions_list_data'] = isset($settings['professions_list']) && is_string($settings['professions_list'])
            ? json_decode($settings['professions_list'], true) ?: []
            : (is_array($settings['professions_list'] ?? null) ? $settings['professions_list'] : []);

        $settings['age_groups_list_data'] = isset($settings['age_groups_list']) && is_string($settings['age_groups_list'])
            ? json_decode($settings['age_groups_list'], true) ?: []
            : (is_array($settings['age_groups_list'] ?? null) ? $settings['age_groups_list'] : []);

        $settings['education_list_data'] = isset($settings['education_list']) && is_string($settings['education_list'])
            ? json_decode($settings['education_list'], true) ?: []
            : (is_array($settings['education_list'] ?? null) ? $settings['education_list'] : []);

        return Inertia::render('Admin/Settings/Demographics', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the Demographics Settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // 1. Agregat Pokok
            'total_citizens' => ['required', 'numeric', 'min:0'],
            'male_citizens' => ['required', 'numeric', 'min:0'],
            'female_citizens' => ['required', 'numeric', 'min:0'],
            'total_families' => ['required', 'numeric', 'min:0'],
            'productive_age_count' => ['nullable', 'numeric', 'min:0'],
            'productive_age_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'area_ha' => ['nullable', 'numeric', 'min:0'],
            'density' => ['nullable', 'numeric', 'min:0'],

            // 2. Tata Guna Lahan
            'land_use_title' => ['nullable', 'string', 'max:255'],
            'land_use_subtitle' => ['nullable', 'string', 'max:500'],
            'land_use_list' => ['nullable'],

            // 3. Mata Pencaharian
            'professions_title' => ['nullable', 'string', 'max:255'],
            'professions_subtitle' => ['nullable', 'string', 'max:500'],
            'professions_list' => ['nullable'],

            // 4. Struktur Kelompok Usia
            'age_groups_title' => ['nullable', 'string', 'max:255'],
            'age_groups_subtitle' => ['nullable', 'string', 'max:500'],
            'age_groups_list' => ['nullable'],

            // 5. Tingkat Pendidikan
            'education_title' => ['nullable', 'string', 'max:255'],
            'education_subtitle' => ['nullable', 'string', 'max:500'],
            'education_list' => ['nullable'],
        ]);

        // Helper encode array to JSON
        $jsonFields = ['land_use_list', 'professions_list', 'age_groups_list', 'education_list'];
        foreach ($jsonFields as $field) {
            if (isset($validated[$field])) {
                if (is_array($validated[$field])) {
                    $validated[$field] = json_encode($validated[$field], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        // Save to SiteSetting
        SiteSetting::setGroup('demographics', $validated);

        // Record audit activity log
        AdminActivityLog::record(
            'update_demographics_settings',
            'Memperbarui konfigurasi data statistik demografi dan kependudukan desa Karangwungu.'
        );

        return back()->with('success', 'Data konfigurasi demografi kependudukan berhasil disimpan.');
    }
}
