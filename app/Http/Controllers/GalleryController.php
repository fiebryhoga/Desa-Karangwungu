<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display gallery albums listing page.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $query = Gallery::query()
            ->where('is_published', true);

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $galleries = $query
            ->orderBy('order', 'asc')
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(function ($g) {
                $photos = is_array($g->photos) ? array_values(array_filter($g->photos)) : [];
                if (empty($photos) && !empty($g->image)) {
                    $photos = [$g->image];
                }

                return [
                    'id' => $g->id,
                    'title' => $g->title,
                    'slug' => $g->slug,
                    'image' => $g->image,
                    'photos' => $photos,
                    'photo_count' => count($photos),
                    'description' => $g->description,
                    'date' => $g->date ? $g->date->format('Y-m-d') : null,
                    'location' => $g->location,
                ];
            });

        return Inertia::render('Gallery/Index', [
            'galleries' => $galleries,
            'filters' => [
                'search' => $search ?? '',
            ],
        ]);
    }

    /**
     * Display single album detail page with all photos.
     */
    public function show(string $slug): Response
    {
        $album = Gallery::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $photos = is_array($album->photos) ? array_values(array_filter($album->photos)) : [];
        if (empty($photos) && !empty($album->image)) {
            $photos = [$album->image];
        }

        $albumData = [
            'id' => $album->id,
            'title' => $album->title,
            'slug' => $album->slug,
            'image' => $album->image,
            'photos' => $photos,
            'photo_count' => count($photos),
            'description' => $album->description,
            'date' => $album->date ? $album->date->format('Y-m-d') : null,
            'location' => $album->location,
        ];

        // Other albums recommendations
        $otherAlbums = Gallery::query()
            ->where('id', '!=', $album->id)
            ->where('is_published', true)
            ->orderBy('order', 'asc')
            ->orderBy('date', 'desc')
            ->take(4)
            ->get()
            ->map(function ($g) {
                $photos = is_array($g->photos) ? array_values(array_filter($g->photos)) : [];
                if (empty($photos) && !empty($g->image)) {
                    $photos = [$g->image];
                }

                return [
                    'id' => $g->id,
                    'title' => $g->title,
                    'slug' => $g->slug,
                    'image' => $g->image,
                    'photo_count' => count($photos),
                    'date' => $g->date ? $g->date->format('Y-m-d') : null,
                    'location' => $g->location,
                ];
            });

        return Inertia::render('Gallery/Show', [
            'album' => $albumData,
            'otherAlbums' => $otherAlbums,
        ]);
    }
}
