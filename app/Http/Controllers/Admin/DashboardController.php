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
            'processing_letters' => LetterRequest::whereIn('status', ['diproses', 'processing', 'bisa_diambil'])->count(),
            'completed_letters' => LetterRequest::whereIn('status', ['selesai', 'completed'])->count(),
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

        // 7 Days Letter Trend (7 Hari Terakhir)
        $dailyTrend = [];
        $indoDays = [
            'Sun' => 'Min',
            'Mon' => 'Sen',
            'Tue' => 'Sel',
            'Wed' => 'Rab',
            'Thu' => 'Kam',
            'Fri' => 'Jum',
            'Sat' => 'Sab',
        ];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $dayCode = $date->format('D');
            $dayName = $indoDays[$dayCode] ?? $dayCode;
            $dateShort = $date->format('d/m');
            $dateStr = $date->toDateString();

            $completed = LetterRequest::whereDate('created_at', $dateStr)
                ->whereIn('status', ['selesai', 'completed'])
                ->count();
            $pending = LetterRequest::whereDate('created_at', $dateStr)
                ->whereIn('status', ['menunggu', 'pending', 'diproses', 'processing', 'bisa_diambil'])
                ->count();
            $rejected = LetterRequest::whereDate('created_at', $dateStr)
                ->whereIn('status', ['ditolak', 'rejected'])
                ->count();

            $dailyTrend[] = [
                'day' => $dayName,
                'date' => $dateShort,
                'full_date' => $date->format('d M Y'),
                'is_today' => $i === 0,
                'completed' => $completed,
                'pending' => $pending,
                'rejected' => $rejected,
                'total' => $completed + $pending + $rejected,
            ];
        }

        $pendingLetters = LetterRequest::whereIn('status', ['menunggu', 'pending'])
            ->latest()
            ->take(5)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $processingLetters = LetterRequest::whereIn('status', ['diproses', 'processing', 'bisa_diambil'])
            ->latest()
            ->take(5)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $completedLetters = LetterRequest::whereIn('status', ['selesai', 'completed'])
            ->latest()
            ->take(5)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $recentLetters = LetterRequest::latest()
            ->take(6)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $recentPosts = Post::latest()
            ->take(5)
            ->get(['id', 'title', 'category', 'views', 'created_at']);

        $recentActivities = AdminActivityLog::latest('created_at')
            ->take(5)
            ->get(['id', 'username', 'action', 'details', 'created_at']);

        // Letter Type Distribution (Top categories)
        $letterTypeDistribution = LetterRequest::selectRaw('letter_type, count(*) as count')
            ->groupBy('letter_type')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->letter_type ?: 'Lainnya',
                    'count' => (int) $item->count,
                ];
            })
            ->values();

        $recentComments = Comment::with('post:id,title')
            ->latest('created_at')
            ->take(5)
            ->get(['id', 'post_id', 'name', 'content', 'is_approved', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'demographics' => $demographics,
            'dailyTrend' => $dailyTrend,
            'monthlyTrend' => $dailyTrend,
            'letterTypeDistribution' => $letterTypeDistribution,
            'pendingLetters' => $pendingLetters,
            'processingLetters' => $processingLetters,
            'completedLetters' => $completedLetters,
            'recentLetters' => $recentLetters,
            'recentPosts' => $recentPosts,
            'recentComments' => $recentComments,
            'recentActivities' => $recentActivities,
        ]);
    }
}
