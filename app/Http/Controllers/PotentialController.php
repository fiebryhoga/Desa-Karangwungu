<?php

namespace App\Http\Controllers;

use App\Models\Potential;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotentialController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');

        $query = Potential::query();

        if ($category && $category !== 'Semua') {
            $query->where('category', 'like', "%{$category}%");
        }

        $potentials = $query->orderBy('created_at', 'desc')->get();

        $categories = ['Semua', 'Perikanan Tambak', 'Pertanian', 'UMKM Makanan', 'Kerajinan'];

        return Inertia::render('Potentials/Index', [
            'potentials' => $potentials,
            'selectedCategory' => $category ?: 'Semua',
            'categories' => $categories,
        ]);
    }
}
