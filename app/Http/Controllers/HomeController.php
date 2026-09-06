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
        // Pengaturan Tampilan Beranda dari Panel Admin
        $dashboardSettings = SiteSetting::getGroup('dashboard');
        if (isset($dashboardSettings['demographics_metrics']) && is_string($dashboardSettings['demographics_metrics'])) {
            $dashboardSettings['demographics_metrics'] = json_decode($dashboardSettings['demographics_metrics'], true) ?: [];
        }

        // 0. Parse Hero Images Slider (Maksimal 5 Foto)
        $heroImages = [];
        if (!empty($dashboardSettings['hero_images'])) {
            $heroImages = is_string($dashboardSettings['hero_images'])
                ? json_decode($dashboardSettings['hero_images'], true)
                : $dashboardSettings['hero_images'];
        }
        if (!is_array($heroImages) || empty($heroImages)) {
            $primaryHero = $dashboardSettings['hero_image'] ?? '/assets/images/hero.jpg';
            $heroImages = array_values(array_unique(array_filter([
                $primaryHero,
                '/assets/images/hero.jpg',
                'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80',
                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
            ])));
        }
        $dashboardSettings['hero_images'] = array_values(array_slice(array_filter($heroImages), 0, 5));

        // 1. Fetch Potentials based on settings (Latest / Custom)
        $potentialsMode = $dashboardSettings['potentials_mode'] ?? 'latest';
        $potentialsLimit = (int) ($dashboardSettings['potentials_limit'] ?? 4);
        if ($potentialsLimit <= 0) $potentialsLimit = 4;

        if ($potentialsMode === 'custom' && !empty($dashboardSettings['potentials_custom_ids'])) {
            $customIds = is_string($dashboardSettings['potentials_custom_ids'])
                ? json_decode($dashboardSettings['potentials_custom_ids'], true)
                : $dashboardSettings['potentials_custom_ids'];

            if (is_array($customIds) && count($customIds) > 0) {
                $potentials = Potential::whereIn('id', $customIds)
                    ->get()
                    ->sortBy(function ($item) use ($customIds) {
                        return array_search($item->id, $customIds);
                    })
                    ->values();
            } else {
                $potentials = Potential::orderBy('id', 'desc')->take($potentialsLimit)->get();
            }
        } else {
            $potentials = Potential::orderBy('id', 'desc')->take($potentialsLimit)->get();
        }

        // 2. Fetch Posts based on settings (Latest / Featured / Custom)
        $postsMode = $dashboardSettings['posts_mode'] ?? 'latest';
        $postsLimit = (int) ($dashboardSettings['posts_limit'] ?? 4);
        if ($postsLimit <= 0) $postsLimit = 4;

        if ($postsMode === 'custom' && !empty($dashboardSettings['posts_custom_ids'])) {
            $customPostIds = is_string($dashboardSettings['posts_custom_ids'])
                ? json_decode($dashboardSettings['posts_custom_ids'], true)
                : $dashboardSettings['posts_custom_ids'];

            if (is_array($customPostIds) && count($customPostIds) > 0) {
                $latestPosts = Post::whereIn('id', $customPostIds)
                    ->get()
                    ->sortBy(function ($item) use ($customPostIds) {
                        return array_search($item->id, $customPostIds);
                    })
                    ->values();
            } else {
                $latestPosts = Post::orderBy('published_at', 'desc')->take($postsLimit)->get();
            }
        } elseif ($postsMode === 'featured') {
            $latestPosts = Post::where('is_featured', true)
                ->orderBy('published_at', 'desc')
                ->take($postsLimit)
                ->get();
            if ($latestPosts->isEmpty()) {
                $latestPosts = Post::orderBy('published_at', 'desc')->take($postsLimit)->get();
            }
        } else {
            $latestPosts = Post::orderBy('published_at', 'desc')->take($postsLimit)->get();
        }

        $featuredPosts = Post::where('is_featured', true)
            ->orderBy('published_at', 'desc')
            ->take(5)
            ->get();

        if ($featuredPosts->isEmpty()) {
            $featuredPosts = Post::orderBy('published_at', 'desc')->take(4)->get();
        }

        $headOfficial = VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();

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
    }
}
