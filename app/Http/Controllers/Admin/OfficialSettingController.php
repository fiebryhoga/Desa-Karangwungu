<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class OfficialSettingController extends Controller
{
    /**
     * Display the officials & SOTK configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('officials');

        // Parse kades_tasks JSON
        if (isset($settings['kades_tasks']) && is_string($settings['kades_tasks'])) {
            $decoded = json_decode($settings['kades_tasks'], true);
            $settings['kades_tasks_data'] = is_array($decoded) ? $decoded : [];
        } else {
            $settings['kades_tasks_data'] = is_array($settings['kades_tasks'] ?? null) ? $settings['kades_tasks'] : [];
        }

        // Parse bpd_tasks JSON
        if (isset($settings['bpd_tasks']) && is_string($settings['bpd_tasks'])) {
            $decoded = json_decode($settings['bpd_tasks'], true);
            $settings['bpd_tasks_data'] = is_array($decoded) ? $decoded : [];
        } else {
            $settings['bpd_tasks_data'] = is_array($settings['bpd_tasks'] ?? null) ? $settings['bpd_tasks'] : [];
        }

        // Parse officials_list JSON
        if (isset($settings['officials_list']) && is_string($settings['officials_list'])) {
            $decoded = json_decode($settings['officials_list'], true);
            $settings['officials_list_data'] = is_array($decoded) ? $decoded : [];
        } else {
            $settings['officials_list_data'] = is_array($settings['officials_list'] ?? null) ? $settings['officials_list'] : [];
        }

        return Inertia::render('Admin/Settings/Officials', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the officials & SOTK configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'sotk_title' => ['nullable', 'string', 'max:255'],
            'sotk_subtitle' => ['nullable', 'string', 'max:500'],

            // 1. Kepala Desa
            'kades_name' => ['required', 'string', 'max:255'],
            'kades_position' => ['nullable', 'string', 'max:100'],
            'kades_nip' => ['nullable', 'string', 'max:100'],
            'kades_phone' => ['nullable', 'string', 'max:50'],
            'kades_photo' => ['nullable', 'string'],
            'kades_photo_file' => ['nullable', 'image', 'max:5120'],
            'kades_category' => ['nullable', 'string', 'max:100'],
            'kades_role_desc' => ['nullable', 'string', 'max:1000'],
            'kades_basis' => ['nullable', 'string', 'max:255'],
            'kades_summary' => ['nullable', 'string', 'max:2000'],
            'kades_tasks' => ['nullable'],
            'kades_authorities' => ['nullable', 'string', 'max:1000'],

            // 2. Ketua BPD
            'bpd_name' => ['required', 'string', 'max:255'],
            'bpd_position' => ['nullable', 'string', 'max:100'],
            'bpd_nip' => ['nullable', 'string', 'max:100'],
            'bpd_phone' => ['nullable', 'string', 'max:50'],
            'bpd_photo' => ['nullable', 'string'],
            'bpd_photo_file' => ['nullable', 'image', 'max:5120'],
            'bpd_category' => ['nullable', 'string', 'max:100'],
            'bpd_role_desc' => ['nullable', 'string', 'max:1000'],
            'bpd_basis' => ['nullable', 'string', 'max:255'],
            'bpd_summary' => ['nullable', 'string', 'max:2000'],
            'bpd_tasks' => ['nullable'],
            'bpd_authorities' => ['nullable', 'string', 'max:1000'],

            // 3. Jajaran Perangkat & Staf Desa
            'officials_list' => ['nullable'],
        ]);

        $uploadDir = public_path('uploads/officials');
        if (!File::exists($uploadDir)) {
            File::makeDirectory($uploadDir, 0755, true);
        }

        // Handle Kades photo upload
        if ($request->hasFile('kades_photo_file')) {
            $file = $request->file('kades_photo_file');
            $filename = 'kades_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            $validated['kades_photo'] = '/uploads/officials/' . $filename;
        }
        unset($validated['kades_photo_file']);

        // Handle BPD photo upload
        if ($request->hasFile('bpd_photo_file')) {
            $file = $request->file('bpd_photo_file');
            $filename = 'bpd_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $filename);
            $validated['bpd_photo'] = '/uploads/officials/' . $filename;
        }
        unset($validated['bpd_photo_file']);

        // Encode tasks arrays
        if (isset($validated['kades_tasks']) && is_array($validated['kades_tasks'])) {
            $validated['kades_tasks'] = json_encode($validated['kades_tasks'], JSON_UNESCAPED_UNICODE);
        }

        if (isset($validated['bpd_tasks']) && is_array($validated['bpd_tasks'])) {
            $validated['bpd_tasks'] = json_encode($validated['bpd_tasks'], JSON_UNESCAPED_UNICODE);
        }

        // Handle officials_list
        $officialsList = $validated['officials_list'] ?? [];
        if (is_string($officialsList)) {
            $decoded = json_decode($officialsList, true);
            $officialsList = is_array($decoded) ? $decoded : [];
        }

        // Handle individual officials photo files if any
        if ($request->hasFile('official_photo_files')) {
            foreach ($request->file('official_photo_files') as $idx => $file) {
                if ($file && isset($officialsList[$idx])) {
                    $filename = 'official_' . $idx . '_' . time() . '.' . $file->getClientOriginalExtension();
                    $file->move($uploadDir, $filename);
                    $officialsList[$idx]['photo'] = '/uploads/officials/' . $filename;
                }
            }
        }
        unset($validated['official_photo_files']);

        $validated['officials_list'] = json_encode($officialsList, JSON_UNESCAPED_UNICODE);

        // Save to SiteSetting
        SiteSetting::setGroup('officials', $validated);

        // Synchronize with VillageOfficial database table
        $this->syncVillageOfficials($validated, $officialsList);

        // Record audit activity log
        AdminActivityLog::record(
            'update_officials_settings',
            'Memperbarui struktur perangkat desa, SOTK, tugas pokok, fungsi, dan jajaran aparatur desa Karangwungu.'
        );

        return back()->with('success', 'Konfigurasi perangkat desa dan SOTK berhasil disimpan.');
    }

    /**
     * Synchronize settings with the VillageOfficial database table.
     */
    protected function syncVillageOfficials(array $settings, array $officialsList): void
    {
        // 1. Sync Kepala Desa
        if (!empty($settings['kades_name'])) {
            VillageOfficial::updateOrCreate(
                ['position' => 'Kepala Desa'],
                [
                    'name' => $settings['kades_name'],
                    'position' => 'Kepala Desa',
                    'nip' => $settings['kades_nip'] ?? null,
                    'phone' => $settings['kades_phone'] ?? null,
                    'photo' => $settings['kades_photo'] ?? null,
                    'order' => 0,
                    'bio' => $settings['kades_role_desc'] ?? null,
                ]
            );
        }

        // 2. Sync BPD
        if (!empty($settings['bpd_name'])) {
            VillageOfficial::updateOrCreate(
                ['position' => 'Ketua BPD'],
                [
                    'name' => $settings['bpd_name'],
                    'position' => 'Ketua BPD',
                    'nip' => $settings['bpd_nip'] ?? null,
                    'phone' => $settings['bpd_phone'] ?? null,
                    'photo' => $settings['bpd_photo'] ?? null,
                    'order' => 1,
                    'bio' => $settings['bpd_role_desc'] ?? null,
                ]
            );
        }

        // 3. Sync Jajaran Perangkat Desa
        foreach ($officialsList as $index => $item) {
            if (!empty($item['name']) && !empty($item['position'])) {
                VillageOfficial::updateOrCreate(
                    ['name' => $item['name']],
                    [
                        'name' => $item['name'],
                        'position' => $item['position'],
                        'nip' => $item['nip'] ?? null,
                        'phone' => $item['phone'] ?? null,
                        'photo' => $item['photo'] ?? null,
                        'order' => $item['order'] ?? ($index + 2),
                        'bio' => $item['role_desc'] ?? ($item['summary'] ?? null),
                    ]
                );
            }
        }
    }
}
