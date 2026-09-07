<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\LetterRequest;
use App\Models\Post;
use App\Models\Potential;
use App\Models\SiteSetting;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $stats = [
            'total_letters' => LetterRequest::count(),
            'today_letters' => LetterRequest::whereDate('created_at', today())->count(),
            'pending_letters' => LetterRequest::whereIn('status', ['menunggu', 'pending'])->count(),
            'processing_letters' => LetterRequest::whereIn('status', ['diproses', 'processing'])->count(),
            'completed_letters' => LetterRequest::whereIn('status', ['selesai', 'completed', 'bisa_diambil', 'ready'])->count(),
            'rejected_letters' => LetterRequest::whereIn('status', ['ditolak', 'rejected'])->count(),
            'total_posts' => Post::count(),
            'today_posts' => Post::whereDate('created_at', today())->count(),
            'total_comments' => Comment::count(),
            'today_comments' => Comment::whereDate('created_at', today())->count(),
            'pending_comments' => Comment::where('is_approved', false)->count(),
            'total_feedbacks' => Feedback::count(),
            'today_feedbacks' => Feedback::whereDate('created_at', today())->count(),
            'total_potentials' => Potential::count(),
            'total_admins' => User::count(),
        ];

        $demographics = [
            'total_citizens' => (int) (SiteSetting::getValue('total_citizens', 3482) ?: 3482),
            'male_citizens' => (int) (SiteSetting::getValue('male_citizens', 1724) ?: 1724),
            'female_citizens' => (int) (SiteSetting::getValue('female_citizens', 1758) ?: 1758),
            'total_families' => (int) (SiteSetting::getValue('total_families', 985) ?: 985),
            'productive_age_count' => (int) (SiteSetting::getValue('productive_age_count', 2315) ?: 2315),
            'productive_age_percent' => (float) (SiteSetting::getValue('productive_age_percent', 66.5) ?: 66.5),
        ];

        // 6 Month Letter Trend
        $monthlyTrend = [];
        $indoMonths = ['Jan' => 'Jan', 'Feb' => 'Feb', 'Mar' => 'Mar', 'Apr' => 'Apr', 'May' => 'Mei', 'Jun' => 'Jun', 'Jul' => 'Jul', 'Aug' => 'Agu', 'Sep' => 'Sep', 'Oct' => 'Okt', 'Nov' => 'Nov', 'Dec' => 'Des'];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $rawMonth = $date->format('M');
            $label = $indoMonths[$rawMonth] ?? $rawMonth;
            $year = $date->year;
            $month = $date->month;

            $completed = LetterRequest::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereIn('status', ['selesai', 'completed', 'bisa_diambil', 'ready'])
                ->count();
            $pending = LetterRequest::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereIn('status', ['menunggu', 'pending', 'diproses', 'processing'])
                ->count();
            $rejected = LetterRequest::whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereIn('status', ['ditolak', 'rejected'])
                ->count();

            $monthlyTrend[] = [
                'month' => $label,
                'completed' => $completed,
                'pending' => $pending,
                'rejected' => $rejected,
                'total' => $completed + $pending + $rejected,
            ];
        }

        $recentLetters = LetterRequest::latest()
            ->take(6)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $recentPosts = Post::latest()
            ->take(5)
            ->get(['id', 'title', 'category', 'views', 'created_at']);

        $recentActivities = AdminActivityLog::latest('created_at')
            ->take(5)
            ->get(['id', 'username', 'action', 'details', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'demographics' => $demographics,
            'monthlyTrend' => $monthlyTrend,
            'recentLetters' => $recentLetters,
            'recentPosts' => $recentPosts,
            'recentActivities' => $recentActivities,
        ]);
    }
}
