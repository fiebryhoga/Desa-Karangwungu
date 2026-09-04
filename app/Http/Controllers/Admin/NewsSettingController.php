<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsSettingController extends Controller
{
    /**
     * Display listing of news posts, metrics, and comments.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category', 'all');
        $status = $request->input('status', 'all'); // all, featured, regular

        $query = Post::query()
            ->with(['allComments' => function ($q) {
                $q->with('allReplies')->latest();
            }])
            ->withCount(['allComments as all_comments_count'])
            ->orderBy('published_at', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if (!empty($category) && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($status === 'featured') {
            $query->where('is_featured', true);
        } elseif ($status === 'regular') {
            $query->where('is_featured', false);
        }

        $posts = $query->get()->map(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'categories' => $post->categories_list,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'image' => $post->image,
                'author' => $post->author ?: 'Pemerintah Desa Karangwungu',
                'views' => (int) $post->views,
                'is_featured' => (bool) $post->is_featured,
                'published_at' => $post->published_at ? $post->published_at->timezone('Asia/Jakarta')->format('Y-m-d\TH:i') : null,
                'published_at_formatted' => $this->formatIndoDateTime($post->published_at),
                'created_at' => $post->created_at ? $post->created_at->timezone('Asia/Jakarta')->format('Y-m-d\TH:i') : null,
                'all_comments_count' => $post->all_comments_count ?? 0,
                'comments' => $post->allComments->map(function ($c) {
                    return [
                        'id' => $c->id,
                        'name' => $c->name,
                        'email' => $c->email,
                        'content' => $c->content,
                        'is_approved' => (bool) $c->is_approved,
                        'created_at' => $this->formatIndoDateTime($c->created_at),
                        'replies' => $c->allReplies->map(function ($r) {
                            return [
                                'id' => $r->id,
                                'name' => $r->name,
                                'email' => $r->email,
                                'content' => $r->content,
                                'is_approved' => (bool) $r->is_approved,
                                'created_at' => $this->formatIndoDateTime($r->created_at),
                            ];
                        }),
                    ];
                }),
            ];
        });

        // Metrics
        $totalPosts = Post::count();
        $featuredPosts = Post::where('is_featured', true)->count();
        $totalViews = (int) Post::sum('views');
        $totalComments = Comment::count();

        // Master categories
        $defaultCategories = collect([
            'Berita',
            'Pengumuman',
            'Pertanian',
            'Perikanan',
            'Prestasi',
            'Agenda',
            'Pembangunan',
        ]);
        $existingCategories = Post::select('category')->distinct()->pluck('category')->filter()->values();
        $categories = $defaultCategories->merge($existingCategories)->unique()->values();

        return Inertia::render('Admin/Settings/News', [
            'posts' => $posts,
            'stats' => [
                'total' => $totalPosts,
                'featured' => $featuredPosts,
                'views' => $totalViews,
                'comments' => $totalComments,
            ],
            'categories' => $this->getCategories(),
            'filters' => [
                'search' => $search ?? '',
                'category' => $category,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show form to create a new post.
     */
    public function create()
    {
        return Inertia::render('Admin/Settings/NewsEditor', [
            'post' => null,
            'categories' => $this->getCategories(),
        ]);
    }

    /**
     * Show form to edit an existing post.
     */
    public function edit($id)
    {
        $post = Post::withCount('comments')->findOrFail($id);

        return Inertia::render('Admin/Settings/NewsEditor', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'categories' => $post->categories_list,
                'excerpt' => $post->excerpt,
                'content' => $post->content,
                'image' => $post->image,
                'author' => $post->author ?: 'Pemerintah Desa Karangwungu',
                'is_featured' => (bool) $post->is_featured,
                'published_at' => $post->published_at ? $post->published_at->timezone('Asia/Jakarta')->format('Y-m-d\TH:i') : now()->timezone('Asia/Jakarta')->format('Y-m-d\TH:i'),
                'views' => (int) $post->views,
                'comments_count' => $post->comments_count ?? 0,
            ],
            'categories' => $this->getCategories(),
        ]);
    }

    /**
     * Dedicated page to moderate and reply to comments of a post.
     */
    public function comments($id)
    {
        $post = Post::findOrFail($id);

        $comments = Comment::where('post_id', $id)
            ->whereNull('parent_id')
            ->with(['allReplies' => function ($rq) {
                $rq->oldest();
            }])
            ->latest()
            ->get();

        return Inertia::render('Admin/Settings/NewsComments', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'image' => $post->image,
                'author' => $post->author ?: 'Pemerintah Desa Karangwungu',
                'published_at_formatted' => $this->formatIndoDateTime($post->published_at),
                'views' => (int) $post->views,
                'comments_count' => Comment::where('post_id', $id)->count(),
            ],
            'comments' => $comments->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'email' => $c->email,
                    'content' => $c->content,
                    'is_approved' => (bool) $c->is_approved,
                    'created_at_formatted' => $this->formatIndoDateTime($c->created_at),
                    'replies' => $c->allReplies->map(function ($r) {
                        return [
                            'id' => $r->id,
                            'name' => $r->name,
                            'email' => $r->email,
                            'content' => $r->content,
                            'is_approved' => (bool) $r->is_approved,
                            'created_at_formatted' => $this->formatIndoDateTime($r->created_at),
                        ];
                    }),
                ];
            }),
        ]);
    }

    /**
     * Format a carbon date into Indonesian format: "Kamis, 29 Agustus jam 14:00" or with year if different year.
     */
    protected function formatIndoDateTime($carbonDate): string
    {
        if (!$carbonDate) {
            return '-';
        }

        $c = $carbonDate->copy()->timezone('Asia/Jakarta')->locale('id');
        $format = $c->year === now()->year ? 'l, j F' : 'l, j F Y';

        return $c->translatedFormat($format) . ' jam ' . $c->format('H:i');
    }

    /**
     * Helper to get categories list.
     */
    protected function getCategories()
    {
        $defaultCategories = collect([
            'Berita',
            'Pengumuman',
            'Pertanian',
            'Perikanan',
            'Prestasi',
            'Agenda',
            'Pembangunan',
        ]);
        $singleCategories = Post::select('category')->distinct()->pluck('category')->filter();
        $jsonCategories = Post::whereNotNull('categories')->pluck('categories')->flatten()->filter();

        return $defaultCategories->merge($singleCategories)->merge($jsonCategories)->unique()->values();
    }

    /**
     * Store a newly created post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'categories' => ['nullable', 'array', 'min:1', 'max:3'],
            'categories.*' => ['required', 'string', 'max:50'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'string'],
            'author' => ['nullable', 'string', 'max:150'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $categories = [];
        if (!empty($validated['categories']) && is_array($validated['categories'])) {
            $categories = array_slice(array_values(array_unique(array_filter(array_map('trim', $validated['categories'])))), 0, 3);
        } elseif (!empty($validated['category'])) {
            $categories = [trim($validated['category'])];
        }
        if (empty($categories)) {
            $categories = ['Berita'];
        }

        // Generate unique slug
        $baseSlug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $slug = $baseSlug;
        $counter = 1;
        while (Post::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $categories[0],
            'categories' => $categories,
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image' => $validated['image'] ?? null,
            'author' => !empty($validated['author']) ? $validated['author'] : 'Pemerintah Desa Karangwungu',
            'is_featured' => $validated['is_featured'] ?? false,
            'views' => 0,
            'published_at' => !empty($validated['published_at']) ? $validated['published_at'] : now(),
        ]);

        AdminActivityLog::log('create_news', "Menerbitkan warta berita baru: '{$post->title}'");

        return redirect()->route('admin.settings.news')->with('success', "Warta berita '{$post->title}' berhasil diterbitkan!");
    }

    /**
     * Update an existing post.
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'categories' => ['nullable', 'array', 'min:1', 'max:3'],
            'categories.*' => ['required', 'string', 'max:50'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'string'],
            'author' => ['nullable', 'string', 'max:150'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $categories = [];
        if (!empty($validated['categories']) && is_array($validated['categories'])) {
            $categories = array_slice(array_values(array_unique(array_filter(array_map('trim', $validated['categories'])))), 0, 3);
        } elseif (!empty($validated['category'])) {
            $categories = [trim($validated['category'])];
        }
        if (empty($categories)) {
            $categories = ['Berita'];
        }

        // Generate unique slug except current post
        $baseSlug = !empty($validated['slug']) ? Str::slug($validated['slug']) : Str::slug($validated['title']);
        $slug = $baseSlug;
        $counter = 1;
        while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        $post->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'category' => $categories[0],
            'categories' => $categories,
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'image' => $validated['image'] ?? $post->image,
            'author' => !empty($validated['author']) ? $validated['author'] : $post->author,
            'is_featured' => $validated['is_featured'] ?? false,
            'published_at' => !empty($validated['published_at']) ? $validated['published_at'] : $post->published_at,
        ]);

        AdminActivityLog::log('update_news', "Memperbarui artikel berita: '{$post->title}'");

        return redirect()->route('admin.settings.news')->with('success', "Artikel '{$post->title}' berhasil diperbarui!");
    }

    /**
     * Delete a post.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $title = $post->title;
        $post->delete();

        AdminActivityLog::log('delete_news', "Menghapus artikel berita: '{$title}'");

        return back()->with('success', "Artikel '{$title}' berhasil dihapus.");
    }

    /**
     * Toggle featured status for a post.
     */
    public function toggleFeatured($id)
    {
        $post = Post::findOrFail($id);
        $post->is_featured = !$post->is_featured;
        $post->save();

        $statusText = $post->is_featured ? 'dijadikan Berita Utama / Headline' : 'diturunkan dari Berita Utama';
        AdminActivityLog::log('toggle_featured_news', "Mengubah status berita '{$post->title}' menjadi {$statusText}");

        return back()->with('success', "Artikel '{$post->title}' kini {$statusText}.");
    }

    /**
     * Upload cover image for news article.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $file = $request->file('image');
        $uploadDir = public_path('uploads/posts');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = 'post_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadDir, $filename);

        return response()->json([
            'success' => true,
            'url' => '/uploads/posts/' . $filename,
            'message' => 'Gambar berita berhasil diunggah.',
        ]);
    }

    /**
     * Admin reply to a citizen's comment.
     */
    public function replyComment(Request $request, $postId, $commentId)
    {
        $post = Post::findOrFail($postId);
        $parentComment = Comment::where('id', $commentId)->where('post_id', $post->id)->firstOrFail();

        $validated = $request->validate([
            'content' => ['required', 'string', 'min:2', 'max:1000'],
            'author_name' => ['nullable', 'string', 'max:100'],
        ]);

        $authorName = !empty($validated['author_name']) ? $validated['author_name'] : 'Pemerintah Desa Karangwungu (Admin)';

        $reply = Comment::create([
            'post_id' => $post->id,
            'parent_id' => $parentComment->id,
            'name' => $authorName,
            'email' => $request->user()?->email ?: 'pemdes@karangwungu-lamongan.desa.id',
            'content' => $validated['content'],
            'is_approved' => true,
        ]);

        AdminActivityLog::log('reply_news_comment', "Membalas komentar warga di artikel '{$post->title}'");

        return back()->with('success', "Balasan komentar berhasil dikirim dan ditampilkan.");
    }

    /**
     * Delete a comment or reply.
     */
    public function destroyComment($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $author = $comment->name;
        $comment->delete();

        AdminActivityLog::log('delete_news_comment', "Menghapus komentar dari '{$author}'");

        return back()->with('success', "Komentar dari '{$author}' berhasil dihapus.");
    }

    /**
     * Toggle comment approval.
     */
    public function toggleCommentApproval($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->is_approved = !$comment->is_approved;
        $comment->save();

        $status = $comment->is_approved ? 'ditayangkan' : 'disembunyikan';
        AdminActivityLog::log('toggle_news_comment', "Mengubah status komentar '{$comment->name}' menjadi {$status}");

        return back()->with('success', "Komentar berhasil {$status}.");
    }
}
