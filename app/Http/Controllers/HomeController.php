<?php

namespace App\Http\Controllers;

use App\Models\ApbdesRecord;
use App\Models\Post;
use App\Models\Potential;
use App\Models\SiteSetting;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredPosts = Post::where('is_featured', true)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        $latestPosts = Post::orderBy('published_at', 'desc')
            ->take(6)
            ->get();

        $headOfficial = VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();

        $potentials = Potential::take(4)->get();

        // Pengaturan Tampilan Beranda dari Panel Admin
        $dashboardSettings = SiteSetting::getGroup('dashboard');

        // Statistik APBDes Ringkas (Tahun Anggaran Terbaru)
        $latestApbdesYear = ApbdesRecord::max('year') ?? (int) date('Y');
        $totalIncome = ApbdesRecord::where('year', $latestApbdesYear)->where('type', 'income')->sum('budget_amount');
        $totalExpense = ApbdesRecord::where('year', $latestApbdesYear)->where('type', 'expense')->sum('budget_amount');
        $realizedIncome = ApbdesRecord::where('year', $latestApbdesYear)->where('type', 'income')->sum('realized_amount');
        $realizedExpense = ApbdesRecord::where('year', $latestApbdesYear)->where('type', 'expense')->sum('realized_amount');

        // Statistik Wilayah & Penduduk
        $stats = [
            'total_citizens' => 3482,
            'male_citizens' => 1724,
            'female_citizens' => 1758,
            'total_families' => 985,
            'total_rt' => 14,
            'total_rw' => 4,
            'total_area_ha' => 245.8,
            'agriculture_area_ha' => 160.5,
            'fishery_area_ha' => 52.3,
        ];

        return Inertia::render('Home', [
            'featuredPosts' => $featuredPosts,
            'latestPosts' => $latestPosts,
            'headOfficial' => $headOfficial,
            'potentials' => $potentials,
            'stats' => $stats,
            'dashboard_settings' => $dashboardSettings,
            'apbdes_summary' => [
                'year' => $latestApbdesYear,
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'realized_income' => $realizedIncome,
                'realized_expense' => $realizedExpense,
            ],
        ]);
                'expense' => $totalExpense,
                'realized_income' => $realizedIncome,
                'realized_expense' => $realizedExpense,
            ],
        ]);
    }
}
