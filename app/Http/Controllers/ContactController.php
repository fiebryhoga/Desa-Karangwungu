<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('Contact', [
            'feedbacks' => $feedbacks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'contact_info' => 'required|string|max:100',
            'category' => 'required|string|max:50',
            'message' => 'required|string|max:1000',
        ]);

        Feedback::create([
            'name' => $validated['name'],
            'contact_info' => $validated['contact_info'],
            'category' => $validated['category'],
            'message' => $validated['message'],
            'is_public' => true,
        ]);

        return back()->with('success', 'Aspirasi / Pengaduan Anda berhasil dikirimkan. Terima kasih atas partisipasi Anda membangun Desa Karangwungu!');
    }
}
