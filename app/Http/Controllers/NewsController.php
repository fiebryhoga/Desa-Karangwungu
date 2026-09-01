<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $query = Post::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'Semua') {
            $query->where('category', $category);
        }

        $posts = $query->orderBy('published_at', 'desc')->paginate(9)->withQueryString();

        $categories = ['Semua', 'Berita', 'Pertanian', 'Perikanan', 'Pengumuman', 'Prestasi'];

        return Inertia::render('News/Index', [
            'posts' => $posts,
            'filters' => [
                'search' => $search,
                'category' => $category ?: 'Semua',
            ],
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        // Increment view count
        $post->increment('views');

        $relatedPosts = Post::where('id', '!=', $post->id)
            ->where(function ($q) use ($post) {
                $q->where('category', $post->category)
                  ->orWhere('is_featured', true);
            })
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        return Inertia::render('News/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
