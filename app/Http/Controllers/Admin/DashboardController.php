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

        $demoSettings = SiteSetting::getGroup('demographics');

        $ageGroups = isset($demoSettings['age_groups_list']) && is_string($demoSettings['age_groups_list'])
            ? json_decode($demoSettings['age_groups_list'], true) ?: []
            : (is_array($demoSettings['age_groups_list'] ?? null) ? $demoSettings['age_groups_list'] : []);

        $professions = isset($demoSettings['professions_list']) && is_string($demoSettings['professions_list'])
            ? json_decode($demoSettings['professions_list'], true) ?: []
            : (is_array($demoSettings['professions_list'] ?? null) ? $demoSettings['professions_list'] : []);

        $education = isset($demoSettings['education_list']) && is_string($demoSettings['education_list'])
            ? json_decode($demoSettings['education_list'], true) ?: []
            : (is_array($demoSettings['education_list'] ?? null) ? $demoSettings['education_list'] : []);

        $landUse = isset($demoSettings['land_use_list']) && is_string($demoSettings['land_use_list'])
            ? json_decode($demoSettings['land_use_list'], true) ?: []
            : (is_array($demoSettings['land_use_list'] ?? null) ? $demoSettings['land_use_list'] : []);

        $demographics = [
            'total_citizens' => (int) ($demoSettings['total_citizens'] ?? 3482),
            'male_citizens' => (int) ($demoSettings['male_citizens'] ?? 1724),
            'female_citizens' => (int) ($demoSettings['female_citizens'] ?? 1758),
            'total_families' => (int) ($demoSettings['total_families'] ?? 985),
            'productive_age_count' => (int) ($demoSettings['productive_age_count'] ?? 2380),
            'productive_age_percent' => (float) ($demoSettings['productive_age_percent'] ?? 68.3),
            'area_ha' => (float) ($demoSettings['area_ha'] ?? 123),
            'density' => (int) ($demoSettings['density'] ?? 2830),
            'age_groups' => $ageGroups,
            'professions' => $professions,
            'education' => $education,
            'land_use' => $landUse,
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
