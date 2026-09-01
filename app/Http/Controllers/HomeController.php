<?php

namespace App\Http\Controllers;

use App\Models\ApbdesRecord;
use App\Models\Post;
use App\Models\Potential;
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

        // Statistik APBDes Ringkas
        $totalIncome = ApbdesRecord::where('type', 'income')->sum('budget_amount');
        $totalExpense = ApbdesRecord::where('type', 'expense')->sum('budget_amount');
        $realizedIncome = ApbdesRecord::where('type', 'income')->sum('realized_amount');
        $realizedExpense = ApbdesRecord::where('type', 'expense')->sum('realized_amount');

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
            'apbdes_summary' => [
                'income' => $totalIncome,
                'expense' => $totalExpense,
                'realized_income' => $realizedIncome,
                'realized_expense' => $realizedExpense,
            ],
        ]);
    }
}
