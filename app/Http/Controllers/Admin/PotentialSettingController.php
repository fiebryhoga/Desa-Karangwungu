<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Potential;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PotentialSettingController extends Controller
{
    /**
     * Display the Potentials & UMKM Settings page in Admin.
     */
    public function index()
    {
        $potentials = Potential::orderBy('id', 'asc')->get();

        $categories = [
            'Perikanan Tambak',
            'Pertanian',
            'UMKM Makanan',
            'Kerajinan',
            'Peternakan',
            'Industri Kreatif',
            'Jasa & Perdagangan',
            'Pariwisata & Budaya',
            'Lainnya',
        ];

        return Inertia::render('Admin/Settings/Potentials', [
            'potentials' => $potentials,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new Potential or UMKM item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:1000'],
            'logo' => ['nullable', 'string', 'max:1000'],
            'owner_name' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:100'],
            'contact_whatsapp' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'gmaps_url' => ['nullable', 'string', 'max:1000'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'price_range' => ['nullable', 'string', 'max:255'],
            'certification' => ['nullable', 'string', 'max:255'],
            'production_capacity' => ['nullable', 'string', 'max:255'],
            'min_order' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'features.*' => ['nullable', 'string'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'string'],
            'products' => ['nullable', 'array'],
        ]);

        // Generate slug if empty or ensure uniqueness
        $baseSlug = Str::slug($validated['slug'] ?: $validated['title']);
        $slug = $baseSlug;
        $counter = 1;
        while (Potential::where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }
        $validated['slug'] = $slug;

        // Clean empty features and gallery
        if (isset($validated['features'])) {
            $validated['features'] = array_values(array_filter($validated['features'], fn($f) => !empty(trim($f))));
        }
        if (isset($validated['gallery'])) {
            $validated['gallery'] = array_values(array_filter($validated['gallery'], fn($g) => !empty(trim($g))));
        }

        $potential = Potential::create($validated);

        AdminActivityLog::log(
            'create_potential',
            "Menambahkan data potensi/UMKM baru: '{$potential->title}'"
        );

        return back()->with('success', "Potensi '{$potential->title}' berhasil ditambahkan.");
    }

    /**
     * Update an existing Potential or UMKM item.
     */
    public function update(Request $request, $id)
    {
        $potential = Potential::findOrFail($id);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:1000'],
            'logo' => ['nullable', 'string', 'max:1000'],
            'owner_name' => ['nullable', 'string', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:100'],
            'contact_whatsapp' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:255'],
            'gmaps_url' => ['nullable', 'string', 'max:1000'],
            'operating_hours' => ['nullable', 'string', 'max:255'],
            'price_range' => ['nullable', 'string', 'max:255'],
            'certification' => ['nullable', 'string', 'max:255'],
            'production_capacity' => ['nullable', 'string', 'max:255'],
            'min_order' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'features.*' => ['nullable', 'string'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'string'],
            'products' => ['nullable', 'array'],
        ]);

        // Ensure slug is unique except current record
        $baseSlug = Str::slug($validated['slug']);
        $slug = $baseSlug;
        $counter = 1;
        while (Potential::where('slug', $slug)->where('id', '!=', $potential->id)->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }
        $validated['slug'] = $slug;

        // Clean empty features and gallery
        if (isset($validated['features'])) {
            $validated['features'] = array_values(array_filter($validated['features'], fn($f) => !empty(trim($f))));
        }
        if (isset($validated['gallery'])) {
            $validated['gallery'] = array_values(array_filter($validated['gallery'], fn($g) => !empty(trim($g))));
        }

        $potential->update($validated);

        AdminActivityLog::log(
            'update_potential',
            "Memperbarui data potensi/UMKM: '{$potential->title}'"
        );

        return back()->with('success', "Potensi '{$potential->title}' berhasil diperbarui.");
    }

    /**
     * Delete a Potential or UMKM item.
     */
    public function destroy($id)
    {
        $potential = Potential::findOrFail($id);
        $title = $potential->title;
        $potential->delete();

        AdminActivityLog::log(
            'delete_potential',
            "Menghapus data potensi/UMKM: '{$title}'"
        );

        return back()->with('success', "Potensi '{$title}' berhasil dihapus.");
    }

    /**
     * Upload custom main banner image file.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image_file' => 'required|file|mimes:png,jpg,jpeg,webp,svg|max:5120',
        ]);

        $file = $request->file('image_file');
        $uploadDir = public_path('uploads/potentials/banners');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'banner_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/potentials/banners/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto banner berhasil diunggah.',
        ]);
    }

    /**
     * Upload custom logo/icon file.
     */
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo_file' => 'required|file|mimes:svg,png,jpg,jpeg,webp|max:3072',
        ]);

        $file = $request->file('logo_file');
        $uploadDir = public_path('uploads/potentials/logos');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'logo_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/potentials/logos/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Logo berhasil diunggah.',
        ]);
    }

    /**
     * Upload custom gallery photo file.
     */
    public function uploadGallery(Request $request)
    {
        $request->validate([
            'gallery_file' => 'required|file|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $file = $request->file('gallery_file');
        $uploadDir = public_path('uploads/potentials/gallery');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'gal_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/potentials/gallery/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto galeri berhasil diunggah.',
        ]);
    }

    /**
     * Upload product item photo file.
     */
    public function uploadProductImage(Request $request)
    {
        $request->validate([
            'product_file' => 'required|file|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $file = $request->file('product_file');
        $uploadDir = public_path('uploads/potentials/products');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'prod_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/potentials/products/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto produk berhasil diunggah.',
        ]);
    }
}
