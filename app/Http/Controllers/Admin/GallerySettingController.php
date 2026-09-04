<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GallerySettingController extends Controller
{
    /**
     * Display the Gallery & Activity Album Settings page in Admin.
     */
    public function index()
    {
        $galleries = Gallery::orderBy('order', 'asc')
            ->orderBy('date', 'desc')
            ->orderBy('id', 'desc')
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
                    'photos' => $photos,
                    'photo_count' => count($photos),
                    'description' => $g->description,
                    'date' => $g->date ? $g->date->format('Y-m-d') : null,
                    'location' => $g->location,
                    'order' => $g->order ?? 0,
                    'is_published' => (bool) $g->is_published,
                    'created_at' => $g->created_at ? $g->created_at->format('Y-m-d H:i') : null,
                ];
            });

        return Inertia::render('Admin/Settings/Gallery', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Store a new Gallery album.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:1000'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        // Generate unique slug
        $baseSlug = Str::slug($validated['slug'] ?: $validated['title']);
        $slug = $baseSlug ?: 'album-' . time();
        $counter = 1;
        while (Gallery::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }
        $validated['slug'] = $slug;

        // Clean photos array
        $photos = isset($validated['photos']) && is_array($validated['photos'])
            ? array_values(array_filter($validated['photos'], fn($p) => !empty(trim($p))))
            : [];

        // If photos is empty, populate with cover image
        if (empty($photos) && !empty($validated['image'])) {
            $photos = [$validated['image']];
        }
        $validated['photos'] = $photos;

        if (!isset($validated['order']) || $validated['order'] === null) {
            $maxOrder = Gallery::max('order') ?? 0;
            $validated['order'] = $maxOrder + 1;
        }

        $validated['is_published'] = $request->boolean('is_published', true);

        $gallery = Gallery::create($validated);

        AdminActivityLog::log(
            'create_gallery',
            "Menambahkan album dokumentasi galeri baru: {$gallery->title}",
            auth()->id()
        );

        return redirect()->back()->with('success', "Album dokumentasi \"{$gallery->title}\" berhasil ditambahkan.");
    }

    /**
     * Update an existing Gallery album.
     */
    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:1000'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        // Check / update slug
        if (!empty($validated['slug'])) {
            $baseSlug = Str::slug($validated['slug']);
        } else {
            $baseSlug = Str::slug($validated['title']);
        }

        if ($baseSlug !== $gallery->slug) {
            $slug = $baseSlug ?: 'album-' . time();
            $counter = 1;
            while (Gallery::where('slug', $slug)->where('id', '!=', $gallery->id)->exists()) {
                $slug = "{$baseSlug}-{$counter}";
                $counter++;
            }
            $validated['slug'] = $slug;
        }

        // Clean photos array
        $photos = isset($validated['photos']) && is_array($validated['photos'])
            ? array_values(array_filter($validated['photos'], fn($p) => !empty(trim($p))))
            : [];

        if (empty($photos) && !empty($validated['image'])) {
            $photos = [$validated['image']];
        }
        $validated['photos'] = $photos;

        $validated['is_published'] = $request->boolean('is_published', true);

        $gallery->update($validated);

        AdminActivityLog::log(
            'update_gallery',
            "Memperbarui album dokumentasi galeri: {$gallery->title}",
            auth()->id()
        );

        return redirect()->back()->with('success', "Album dokumentasi \"{$gallery->title}\" berhasil diperbarui.");
    }

    /**
     * Delete a Gallery album.
     */
    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $title = $gallery->title;

        $gallery->delete();

        AdminActivityLog::log(
            'delete_gallery',
            "Menghapus album dokumentasi galeri: {$title}",
            auth()->id()
        );

        return redirect()->back()->with('success', "Album dokumentasi \"{$title}\" berhasil dihapus.");
    }

    /**
     * Upload cover image for gallery album.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image_file' => 'required|file|mimes:png,jpg,jpeg,webp|max:8192',
        ]);

        $file = $request->file('image_file');
        $uploadDir = public_path('uploads/gallery');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'cover_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/gallery/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto sampul album berhasil diunggah.',
        ]);
    }

    /**
     * Upload multiple photos into gallery album.
     */
    public function uploadPhotos(Request $request)
    {
        $request->validate([
            'photos' => 'required|array',
            'photos.*' => 'file|mimes:png,jpg,jpeg,webp|max:8192',
        ]);

        $uploadDir = public_path('uploads/gallery');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $uploadedUrls = [];
        foreach ($request->file('photos') as $file) {
            $extension = $file->getClientOriginalExtension();
            $filename = 'photo_' . time() . '_' . uniqid() . '.' . $extension;
            $file->move($uploadDir, $filename);
            $uploadedUrls[] = '/uploads/gallery/' . $filename;
        }

        return response()->json([
            'success' => true,
            'urls' => $uploadedUrls,
            'message' => count($uploadedUrls) . ' foto berhasil diunggah ke album.',
        ]);
    }

    /**
     * Reorder gallery albums via drag and drop.
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:galleries,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($request->orders as $item) {
            Gallery::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        AdminActivityLog::log(
            'reorder_gallery',
            'Memperbarui urutan tampilan album galeri kegiatan desa.',
            auth()->id()
        );

        return response()->json([
            'success' => true,
            'message' => 'Urutan album berhasil diperbarui.',
        ]);
    }
}
