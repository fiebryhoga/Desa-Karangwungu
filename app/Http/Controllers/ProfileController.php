<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use App\Models\VillageOfficial;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $officials = VillageOfficial::orderBy('order', 'asc')->get();
        $overviewSettings = SiteSetting::getGroup('overview');

        // Parse map_points JSON
        if (isset($overviewSettings['map_points']) && is_string($overviewSettings['map_points'])) {
            $decoded = json_decode($overviewSettings['map_points'], true);
            $overviewSettings['map_points_data'] = is_array($decoded) ? $decoded : [];
        } else {
            $overviewSettings['map_points_data'] = [];
        }

        $demographics = [
            'total_citizens' => 3482,
            'male' => 1724,
            'female' => 1758,
            'families' => 985,
            'dusuns' => [
                ['name' => 'Dusun Krajan', 'rt' => 4, 'citizens' => 1120],
                ['name' => 'Dusun Karangwungu Timur', 'rt' => 4, 'citizens' => 980],
                ['name' => 'Dusun Karangwungu Barat', 'rt' => 3, 'citizens' => 750],
                ['name' => 'Dusun Sumberagung', 'rt' => 3, 'citizens' => 632],
            ],
            'professions' => [
                ['label' => 'Petani Sawah / Palawija', 'count' => 1150, 'percent' => 33],
                ['label' => 'Petambak Ikan Bandeng & Udang', 'count' => 840, 'percent' => 24],
                ['label' => 'Pelaku UMKM & Pedagang', 'count' => 460, 'percent' => 13],
                ['label' => 'Karyawan Swasta & Buruh', 'count' => 520, 'percent' => 15],
                ['label' => 'PNS / TNI / Polri / Guru', 'count' => 112, 'percent' => 3],
                ['label' => 'Lainnya / Pelajar / Wirausaha', 'count' => 400, 'percent' => 12],
            ],
            'education' => [
                ['label' => 'Belum / Tidak Sekolah', 'count' => 180],
                ['label' => 'SD / Sederajat', 'count' => 890],
                ['label' => 'SMP / MTs', 'count' => 960],
                ['label' => 'SMA / SMK / MA', 'count' => 1132],
                ['label' => 'Diploma / Sarjana (S1/S2)', 'count' => 320],
            ],
        ];

        return Inertia::render('Profile/Index', [
            'officials' => $officials,
            'demographics' => $demographics,
            'overview' => $overviewSettings,
        ]);
    }

    public function visionMission()
    {
        $settings = SiteSetting::getGroup('vision_mission');
        if (isset($settings['missions']) && is_string($settings['missions'])) {
            $settings['missions_data'] = json_decode($settings['missions'], true) ?: [];
        }
        if (isset($settings['leaders']) && is_string($settings['leaders'])) {
            $settings['leaders_data'] = json_decode($settings['leaders'], true) ?: [];
        }

        return Inertia::render('Profile/VisionMission', [
            'visionMission' => $settings,
        ]);
    }

    public function leadership()
    {
        $settings = SiteSetting::getGroup('vision_mission');
        if (isset($settings['leaders']) && is_string($settings['leaders'])) {
            $settings['leaders_data'] = json_decode($settings['leaders'], true) ?: [];
        }

        return Inertia::render('Profile/Leadership', [
            'leadership' => $settings,
        ]);
    }

    public function history()
    {
        return $this->visionMission();
    }

    public function officials()
    {
        $settings = SiteSetting::getGroup('officials');

        // Parse JSON fields
        if (isset($settings['kades_tasks']) && is_string($settings['kades_tasks'])) {
            $settings['kades_tasks_data'] = json_decode($settings['kades_tasks'], true) ?: [];
        } else {
            $settings['kades_tasks_data'] = is_array($settings['kades_tasks'] ?? null) ? $settings['kades_tasks'] : [];
        }

        if (isset($settings['bpd_tasks']) && is_string($settings['bpd_tasks'])) {
            $settings['bpd_tasks_data'] = json_decode($settings['bpd_tasks'], true) ?: [];
        } else {
            $settings['bpd_tasks_data'] = is_array($settings['bpd_tasks'] ?? null) ? $settings['bpd_tasks'] : [];
        }

        if (isset($settings['officials_list']) && is_string($settings['officials_list'])) {
            $settings['officials_list_data'] = json_decode($settings['officials_list'], true) ?: [];
        } else {
            $settings['officials_list_data'] = is_array($settings['officials_list'] ?? null) ? $settings['officials_list'] : [];
        }

        $officials = VillageOfficial::orderBy('order', 'asc')->get();

        return Inertia::render('Profile/Officials', [
            'officials' => $officials,
            'officialsSettings' => $settings,
        ]);
    }

    public function demographics()
    {
        $settings = SiteSetting::getGroup('demographics');

        // Parse JSON lists
        if (isset($settings['land_use_list']) && is_string($settings['land_use_list'])) {
            $settings['land_use_list_data'] = json_decode($settings['land_use_list'], true) ?: [];
        } else {
            $settings['land_use_list_data'] = is_array($settings['land_use_list'] ?? null) ? $settings['land_use_list'] : [];
        }

        if (isset($settings['professions_list']) && is_string($settings['professions_list'])) {
            $settings['professions_list_data'] = json_decode($settings['professions_list'], true) ?: [];
        } else {
            $settings['professions_list_data'] = is_array($settings['professions_list'] ?? null) ? $settings['professions_list'] : [];
        }

        if (isset($settings['age_groups_list']) && is_string($settings['age_groups_list'])) {
            $settings['age_groups_list_data'] = json_decode($settings['age_groups_list'], true) ?: [];
        } else {
            $settings['age_groups_list_data'] = is_array($settings['age_groups_list'] ?? null) ? $settings['age_groups_list'] : [];
        }

        if (isset($settings['education_list']) && is_string($settings['education_list'])) {
            $settings['education_list_data'] = json_decode($settings['education_list'], true) ?: [];
        } else {
            $settings['education_list_data'] = is_array($settings['education_list'] ?? null) ? $settings['education_list'] : [];
        }

        return Inertia::render('Profile/Demographics', [
            'demographicsSettings' => $settings,
            'data' => [
                'total_citizens' => (int)($settings['total_citizens'] ?? 3482),
                'male' => (int)($settings['male_citizens'] ?? 1724),
                'female' => (int)($settings['female_citizens'] ?? 1758),
                'families' => (int)($settings['total_families'] ?? 985),
                'area_ha' => (float)($settings['area_ha'] ?? 123),
            ],
        ]);
    }

    public function facilities()
    {
        $settings = SiteSetting::getGroup('facilities');

        $facilitiesList = [];
        if (isset($settings['facilities_list']) && is_string($settings['facilities_list'])) {
            $facilitiesList = json_decode($settings['facilities_list'], true) ?: [];
        } elseif (isset($settings['facilities_list']) && is_array($settings['facilities_list'])) {
            $facilitiesList = $settings['facilities_list'];
        }

        if (empty($facilitiesList)) {
            $facilitiesList = \App\Http\Controllers\Admin\FacilitySettingController::getDefaultFacilities();
        }

        $settings['facilities_title'] = $settings['facilities_title'] ?? 'Fasilitas Umum Desa Karangwungu';
        $settings['facilities_subtitle'] = $settings['facilities_subtitle'] ?? 'Informasi lengkap sarana prasarana pelayanan masyarakat, tempat ibadah, fasilitas kesehatan, pendidikan, ruang terbuka publik, serta infrastruktur pertanian.';

        return Inertia::render('Profile/Facilities', [
            'facilities' => $facilitiesList,
            'facilitiesSettings' => $settings,
        ]);
    }

    public function organizations()
    {
        $settings = SiteSetting::getGroup('organizations');

        if (isset($settings['organizations_list']) && is_string($settings['organizations_list'])) {
            $settings['organizations_list_data'] = json_decode($settings['organizations_list'], true) ?: [];
        } else {
            $settings['organizations_list_data'] = is_array($settings['organizations_list'] ?? null) ? $settings['organizations_list'] : [];
        }

        return Inertia::render('Profile/Organizations', [
            'organizationsSettings' => $settings,
        ]);
    }

    public function organizationShow($id)
    {
        $settings = SiteSetting::getGroup('organizations');

        $list = [];
        if (isset($settings['organizations_list']) && is_string($settings['organizations_list'])) {
            $list = json_decode($settings['organizations_list'], true) ?: [];
        } elseif (is_array($settings['organizations_list'] ?? null)) {
            $list = $settings['organizations_list'];
        }

        // Find organization by id
        $organization = null;
        foreach ($list as $item) {
            if (isset($item['id']) && strtolower($item['id']) === strtolower($id)) {
                $organization = $item;
                break;
            }
        }

        if (!$organization) {
            abort(404, 'Data lembaga atau organisasi kemasyarakatan desa tidak ditemukan.');
        }

        // Filter other organizations for sidebar recommendations
        $otherOrganizations = array_values(array_filter($list, function ($item) use ($organization) {
            return ($item['id'] ?? null) !== ($organization['id'] ?? null);
        }));

        return Inertia::render('Profile/OrganizationShow', [
            'organization' => $organization,
            'otherOrganizations' => $otherOrganizations,
            'organizationsSettings' => $settings,
        ]);
    }
}
