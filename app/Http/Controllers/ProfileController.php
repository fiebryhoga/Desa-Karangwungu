<?php

namespace App\Http\Controllers;

use App\Models\VillageOfficial;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $officials = VillageOfficial::orderBy('order', 'asc')->get();

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
        ]);
    }

    public function visionMission()
    {
        return Inertia::render('Profile/VisionMission');
    }

    public function leadership()
    {
        return Inertia::render('Profile/Leadership');
    }

    public function history()
    {
        return Inertia::render('Profile/VisionMission');
    }

    public function officials()
    {
        $officials = VillageOfficial::orderBy('order', 'asc')->get();
        return Inertia::render('Profile/Officials', [
            'officials' => $officials,
        ]);
    }

    public function demographics()
    {
        return Inertia::render('Profile/Demographics', [
            'data' => [
                'total_citizens' => 3482,
                'male' => 1724,
                'female' => 1758,
                'families' => 985,
                'area_ha' => 245.8,
            ]
        ]);
    }

    public function facilities()
    {
        return Inertia::render('Profile/Facilities');
    }
}
