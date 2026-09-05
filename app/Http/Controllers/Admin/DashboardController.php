<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\LetterRequest;
use App\Models\Post;
use App\Models\Potential;
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
            'pending_letters' => LetterRequest::whereIn('status', ['menunggu', 'pending'])->count(),
            'completed_letters' => LetterRequest::whereIn('status', ['selesai', 'completed'])->count(),
            'total_posts' => Post::count(),
            'total_potentials' => Potential::count(),
            'total_comments' => Comment::count(),
            'pending_comments' => Comment::where('is_approved', false)->count(),
            'total_feedbacks' => Feedback::count(),
            'total_admins' => User::count(),
        ];

        $recentLetters = LetterRequest::latest()
            ->take(5)
            ->get(['id', 'tracking_code', 'citizen_name', 'letter_type', 'status', 'created_at']);

        $recentPosts = Post::latest()
            ->take(5)
            ->get(['id', 'title', 'category', 'views', 'created_at']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentLetters' => $recentLetters,
            'recentPosts' => $recentPosts,
        ]);
    }
}
