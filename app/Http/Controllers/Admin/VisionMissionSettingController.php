<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisionMissionSettingController extends Controller
{
    /**
     * Display the Vision, Mission & Leadership configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('vision_mission');

        // Parse missions JSON
        if (isset($settings['missions']) && is_string($settings['missions'])) {
            $decodedMissions = json_decode($settings['missions'], true);
            $settings['missions_data'] = is_array($decodedMissions) ? $decodedMissions : [];
        } else {
            $settings['missions_data'] = [];
        }

        // Parse leaders JSON
        if (isset($settings['leaders']) && is_string($settings['leaders'])) {
            $decodedLeaders = json_decode($settings['leaders'], true);
            $settings['leaders_data'] = is_array($decodedLeaders) ? $decodedLeaders : [];
        } else {
            $settings['leaders_data'] = [];
        }

        return Inertia::render('Admin/Settings/VisionMission', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update Vision, Mission & Leadership configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // Visi Utama
            'vision_badge' => ['nullable', 'string', 'max:255'],
            'vision_text' => ['nullable', 'string', 'max:2000'],

            // 4 Pilar Visi
            'vision_pillar_1_text' => ['nullable', 'string', 'max:100'],
            'vision_pillar_1_icon' => ['nullable', 'string', 'max:100'],

            'vision_pillar_2_text' => ['nullable', 'string', 'max:100'],
            'vision_pillar_2_icon' => ['nullable', 'string', 'max:100'],

            'vision_pillar_3_text' => ['nullable', 'string', 'max:100'],
            'vision_pillar_3_icon' => ['nullable', 'string', 'max:100'],

            'vision_pillar_4_text' => ['nullable', 'string', 'max:100'],
            'vision_pillar_4_icon' => ['nullable', 'string', 'max:100'],

            // Misi & Kepemimpinan
            'missions' => ['nullable'],
            'leaders' => ['nullable'],
        ]);

        $dataToSave = [
            'vision_badge' => $validated['vision_badge'] ?? 'Visi Resmi Pemerintah Desa Karangwungu',
            'vision_text' => $validated['vision_text'] ?? '',

            'vision_pillar_1_text' => $validated['vision_pillar_1_text'] ?? 'Berakhlak Mulia',
            'vision_pillar_1_icon' => $validated['vision_pillar_1_icon'] ?? 'Award',

            'vision_pillar_2_text' => $validated['vision_pillar_2_text'] ?? 'Sehat & Bugar',
            'vision_pillar_2_icon' => $validated['vision_pillar_2_icon'] ?? 'HeartPulse',

            'vision_pillar_3_text' => $validated['vision_pillar_3_text'] ?? 'Masyarakat Sejahtera',
            'vision_pillar_3_icon' => $validated['vision_pillar_3_icon'] ?? 'ShieldCheck',

            'vision_pillar_4_text' => $validated['vision_pillar_4_text'] ?? 'Demokratis & Amanah',
            'vision_pillar_4_icon' => $validated['vision_pillar_4_icon'] ?? 'UserCheck',
        ];

        // Format missions
        if ($request->has('missions')) {
            $missions = $request->input('missions');
            if (is_string($missions)) {
                $missions = json_decode($missions, true);
            }
            if (is_array($missions)) {
                $cleanMissions = [];
                foreach ($missions as $m) {
                    if (!empty($m['title'])) {
                        $cleanMissions[] = [
                            'id' => $m['id'] ?? 'misi-' . uniqid(),
                            'number' => $m['number'] ?? sprintf('%02d', count($cleanMissions) + 1),
                            'category' => $m['category'] ?? 'Pembangunan Desa',
                            'title' => $m['title'],
                            'desc' => $m['desc'] ?? '',
                            'icon' => $m['icon'] ?? 'Target',
                            'badge' => $m['badge'] ?? 'Prioritas Strategis',
                        ];
                    }
                }
                $dataToSave['missions'] = json_encode($cleanMissions, JSON_UNESCAPED_UNICODE);
            }
        }

        // Format leaders
        if ($request->has('leaders')) {
            $leaders = $request->input('leaders');
            if (is_string($leaders)) {
                $leaders = json_decode($leaders, true);
            }
            if (is_array($leaders)) {
                $cleanLeaders = [];
                foreach ($leaders as $l) {
                    if (!empty($l['name'])) {
                        $cleanLeaders[] = [
                            'id' => $l['id'] ?? 'leader-' . uniqid(),
                            'order' => (int) ($l['order'] ?? (count($cleanLeaders) + 1)),
                            'name' => $l['name'],
                            'period' => $l['period'] ?? '',
                            'role' => $l['role'] ?? 'Kepala Desa',
                            'desc' => $l['desc'] ?? '',
                            'isCurrent' => (bool) ($l['isCurrent'] ?? false),
                        ];
                    }
                }
                $dataToSave['leaders'] = json_encode($cleanLeaders, JSON_UNESCAPED_UNICODE);
            }
        }

        // Save to SiteSetting
        SiteSetting::setGroup('vision_mission', $dataToSave);

        // Record audit activity
        $user = $request->user();
        AdminActivityLog::record(
            action: 'update_vision_mission_settings',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: 'Memperbarui konfigurasi visi, 4 pilar nilai, misi strategis pembangunan, dan silsilah kepemimpinan Kepala Desa.'
        );

        return back()->with('success', 'Konfigurasi Visi, Misi & Kepemimpinan berhasil disimpan.');
    }
}
