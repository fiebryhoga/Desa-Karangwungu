<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'nullable|string|max:150',
            'content' => 'required|string|min:2|max:1000',
            'parent_id' => 'nullable',
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'content.required' => 'Isi komentar wajib ditulis.',
            'content.min' => 'Komentar minimal 2 karakter.',
            'content.max' => 'Komentar maksimal 1000 karakter.',
        ]);

        $validated['post_id'] = $post->id;
        $validated['is_approved'] = true;
        if (empty($validated['email'])) {
            $validated['email'] = null;
        }
        if (empty($validated['parent_id'])) {
            $validated['parent_id'] = null;
        } else {
            $validated['parent_id'] = (int) $validated['parent_id'];
        }

        Comment::create($validated);

        return redirect()->back()->with('success', 'Komentar Anda berhasil dikirim dan ditayangkan.');
    }
}
