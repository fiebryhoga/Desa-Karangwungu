<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Post;
use App\Models\Potential;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DashboardSettingController extends Controller
{
    /**
     * Display the dashboard configuration page.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('dashboard');

        // Decode hero_images data
        if (isset($settings['hero_images']) && is_string($settings['hero_images'])) {
            $settings['hero_images_data'] = json_decode($settings['hero_images'], true) ?: [];
        } else {
            $settings['hero_images_data'] = is_array($settings['hero_images'] ?? null)
                ? $settings['hero_images']
                : [];
        }
        if (empty($settings['hero_images_data']) && !empty($settings['hero_image'])) {
            $settings['hero_images_data'] = [$settings['hero_image']];
        }

        // Decode demographics metrics data if present
        if (isset($settings['demographics_metrics']) && is_string($settings['demographics_metrics'])) {
            $settings['demographics_metrics_data'] = json_decode($settings['demographics_metrics'], true) ?: [];
        } else {
            $settings['demographics_metrics_data'] = is_array($settings['demographics_metrics'] ?? null)
                ? $settings['demographics_metrics']
                : [];
        }

        // Decode potentials custom IDs
        if (isset($settings['potentials_custom_ids']) && is_string($settings['potentials_custom_ids'])) {
            $settings['potentials_custom_ids_data'] = json_decode($settings['potentials_custom_ids'], true) ?: [];
        } else {
            $settings['potentials_custom_ids_data'] = is_array($settings['potentials_custom_ids'] ?? null)
                ? $settings['potentials_custom_ids']
                : [];
        }

        // Decode posts custom IDs
        if (isset($settings['posts_custom_ids']) && is_string($settings['posts_custom_ids'])) {
            $settings['posts_custom_ids_data'] = json_decode($settings['posts_custom_ids'], true) ?: [];
        } else {
            $settings['posts_custom_ids_data'] = is_array($settings['posts_custom_ids'] ?? null)
                ? $settings['posts_custom_ids']
                : [];
        }

        $allPotentials = Potential::select('id', 'title', 'category', 'image', 'price_range')
            ->orderBy('id', 'desc')
            ->get();

        $allPosts = Post::select('id', 'title', 'category', 'image', 'published_at', 'views', 'is_featured')
            ->orderBy('published_at', 'desc')
            ->take(50)
            ->get();

        return Inertia::render('Admin/Settings/Dashboard', [
            'settings' => $settings,
            'allPotentials' => $allPotentials,
            'allPosts' => $allPosts,
        ]);
    }

    /**
     * Update the dashboard configuration settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            // 1. Hero Section
            'hero_badge' => ['nullable', 'string', 'max:255'],
            'hero_title' => ['nullable', 'string', 'max:500'],
            'hero_description' => ['nullable', 'string', 'max:2000'],
            'hero_image' => ['nullable', 'string'],
            'hero_image_file' => ['nullable', 'image', 'max:20480'], // max 20MB
            'hero_image_file_0' => ['nullable', 'image', 'max:20480'],
            'hero_image_file_1' => ['nullable', 'image', 'max:20480'],
            'hero_image_file_2' => ['nullable', 'image', 'max:20480'],
            'hero_image_file_3' => ['nullable', 'image', 'max:20480'],
            'hero_image_file_4' => ['nullable', 'image', 'max:20480'],
            'hero_images' => ['nullable'],

            // 2. Sambutan Kepala Desa
            'welcome_title' => ['nullable', 'string', 'max:500'],
            'welcome_greeting' => ['nullable', 'string', 'max:500'],
            'welcome_content' => ['nullable', 'string', 'max:5000'],
            'welcome_leader_name' => ['nullable', 'string', 'max:255'],
            'welcome_leader_position' => ['nullable', 'string', 'max:255'],
            'welcome_leader_photo' => ['nullable', 'string'],
            'welcome_leader_photo_file' => ['nullable', 'image', 'max:20480'],

            // 3. Selayang Pandang
            'overview_location' => ['nullable', 'string', 'max:255'],
            'overview_content' => ['nullable', 'string', 'max:5000'],

            // 3. Selayang Pandang Card 1
            'overview_card_1_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_1_title' => ['nullable', 'string', 'max:255'],
            'overview_card_1_image' => ['nullable', 'string'],
            'overview_card_1_image_file' => ['nullable', 'image', 'max:20480'],

            // 3. Selayang Pandang Card 2
            'overview_card_2_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_2_title' => ['nullable', 'string', 'max:255'],
            'overview_card_2_image' => ['nullable', 'string'],
            'overview_card_2_image_file' => ['nullable', 'image', 'max:20480'],

            // 3. Selayang Pandang Card 3
            'overview_card_3_badge' => ['nullable', 'string', 'max:100'],
            'overview_card_3_title' => ['nullable', 'string', 'max:255'],
            'overview_card_3_image' => ['nullable', 'string'],
            'overview_card_3_image_file' => ['nullable', 'image', 'max:20480'],

            // 4. Statistik Demografi & Wilayah di Beranda
            'demographics_section_title' => ['nullable', 'string', 'max:255'],
            'demographics_section_subtitle' => ['nullable', 'string', 'max:255'],
            'demographics_metrics' => ['nullable'],

            // 5. Produk & Komoditas Unggulan (Potensi)
            'potentials_mode' => ['nullable', 'string', 'in:latest,custom'],
            'potentials_limit' => ['nullable', 'integer', 'min:1', 'max:20'],
            'potentials_custom_ids' => ['nullable'],
            'potentials_title' => ['nullable', 'string', 'max:255'],
            'potentials_subtitle' => ['nullable', 'string', 'max:500'],

            // 6. Warta & Berita Desa
            'posts_mode' => ['nullable', 'string', 'in:latest,featured,custom'],
            'posts_limit' => ['nullable', 'integer', 'min:1', 'max:20'],
            'posts_custom_ids' => ['nullable'],
            'posts_title' => ['nullable', 'string', 'max:255'],
            'posts_subtitle' => ['nullable', 'string', 'max:500'],
        ]);

        $uploadDir = public_path('uploads/settings');
        if (!File::exists($uploadDir)) {
            File::makeDirectory($uploadDir, 0755, true);
        }

        $imageFields = [
            'hero_image' => 'hero_image_file',
            'welcome_leader_photo' => 'welcome_leader_photo_file',
            'overview_card_1_image' => 'overview_card_1_image_file',
            'overview_card_2_image' => 'overview_card_2_image_file',
            'overview_card_3_image' => 'overview_card_3_image_file',
        ];

        $dataToSave = [
            'hero_badge' => $validated['hero_badge'] ?? '',
            'hero_title' => $validated['hero_title'] ?? '',
            'hero_description' => $validated['hero_description'] ?? '',
            'welcome_title' => $validated['welcome_title'] ?? '',
            'welcome_greeting' => $validated['welcome_greeting'] ?? '',
            'welcome_content' => $validated['welcome_content'] ?? '',
            'welcome_leader_name' => $validated['welcome_leader_name'] ?? '',
            'welcome_leader_position' => $validated['welcome_leader_position'] ?? '',
            'overview_location' => $validated['overview_location'] ?? '',
            'overview_content' => $validated['overview_content'] ?? '',
            'overview_card_1_badge' => $validated['overview_card_1_badge'] ?? '',
            'overview_card_1_title' => $validated['overview_card_1_title'] ?? '',
            'overview_card_2_badge' => $validated['overview_card_2_badge'] ?? '',
            'overview_card_2_title' => $validated['overview_card_2_title'] ?? '',
            'overview_card_3_badge' => $validated['overview_card_3_badge'] ?? '',
            'overview_card_3_title' => $validated['overview_card_3_title'] ?? '',
            'demographics_section_title' => $validated['demographics_section_title'] ?? 'Statistik Demografi & Wilayah Desa',
            'demographics_section_subtitle' => $validated['demographics_section_subtitle'] ?? 'Data Terverifikasi 2026',
            'potentials_mode' => $validated['potentials_mode'] ?? 'latest',
            'potentials_limit' => $validated['potentials_limit'] ?? 4,
            'potentials_title' => $validated['potentials_title'] ?? 'Produk & Komoditas Unggulan Karangwungu',
            'potentials_subtitle' => $validated['potentials_subtitle'] ?? 'Menampilkan komoditas tambak bandeng, pertanian padi sawah, serta aneka produk UMKM mandiri warga desa.',
            'posts_mode' => $validated['posts_mode'] ?? 'latest',
            'posts_limit' => $validated['posts_limit'] ?? 4,
            'posts_title' => $validated['posts_title'] ?? 'Warta & Pengumuman Desa',
            'posts_subtitle' => $validated['posts_subtitle'] ?? 'Informasi kegiatan pemerintahan, pembangunan infrastruktur, pertanian, dan kemasyarakatan Desa Karangwungu.',
        ];

        // Process potentials custom IDs
        if ($request->has('potentials_custom_ids')) {
            $rawPotentials = $request->input('potentials_custom_ids');
            if (is_string($rawPotentials)) {
                $decoded = json_decode($rawPotentials, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $rawPotentials = $decoded;
                }
            }
            $dataToSave['potentials_custom_ids'] = is_array($rawPotentials)
                ? json_encode(array_values(array_map('intval', $rawPotentials)))
                : $rawPotentials;
        }

        // Process posts custom IDs
        if ($request->has('posts_custom_ids')) {
            $rawPosts = $request->input('posts_custom_ids');
            if (is_string($rawPosts)) {
                $decoded = json_decode($rawPosts, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $rawPosts = $decoded;
                }
            }
            $dataToSave['posts_custom_ids'] = is_array($rawPosts)
                ? json_encode(array_values(array_map('intval', $rawPosts)))
                : $rawPosts;
        }

        // Process demographics metrics (JSON string / Array)
        if ($request->has('demographics_metrics')) {
            $rawMetrics = $request->input('demographics_metrics');
            if (is_string($rawMetrics)) {
                $decoded = json_decode($rawMetrics, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $rawMetrics = $decoded;
                }
            }

            if (is_array($rawMetrics)) {
                $normalized = [];
                foreach ($rawMetrics as $m) {
                    if (!is_array($m)) continue;
                    $normalized[] = [
                        'id' => $m['id'] ?? uniqid('metric_'),
                        'label' => (string) ($m['label'] ?? ''),
                        'value' => $m['value'] ?? '',
                        'suffix' => (string) ($m['suffix'] ?? ''),
                        'icon' => (string) ($m['icon'] ?? 'Activity'),
                        'enabled' => filter_var($m['enabled'] ?? false, FILTER_VALIDATE_BOOLEAN),
                        'source_key' => (string) ($m['source_key'] ?? ''),
                    ];
                }
                $dataToSave['demographics_metrics'] = json_encode($normalized);
            } else {
                $dataToSave['demographics_metrics'] = $rawMetrics;
            }
        }

        // Handle Image uploads and fallbacks
        foreach ($imageFields as $targetKey => $fileInputKey) {
            if ($request->hasFile($fileInputKey)) {
                $file = $request->file($fileInputKey);
                $filename = $targetKey . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadDir, $filename);
                $dataToSave[$targetKey] = '/uploads/settings/' . $filename;
            } else {
                // Keep existing or incoming text URL
                $dataToSave[$targetKey] = $request->input($targetKey, SiteSetting::getValue($targetKey, ''));
            }
        }

        // Handle Multi-Photo Hero Images Slider (Maksimal 5 Foto)
        $heroImages = [];
        if ($request->has('hero_images')) {
            $rawHero = $request->input('hero_images');
            if (is_string($rawHero)) {
                $decHero = json_decode($rawHero, true);
                if (is_array($decHero)) $rawHero = $decHero;
            }
            if (is_array($rawHero)) {
                $heroImages = array_values($rawHero);
            }
        }
        if (empty($heroImages) && !empty($dataToSave['hero_image'])) {
            $heroImages = [$dataToSave['hero_image']];
        }

        for ($i = 0; $i < 5; $i++) {
            $fKey = "hero_image_file_{$i}";
            if ($request->hasFile($fKey)) {
                $file = $request->file($fKey);
                $filename = "hero_slide_{$i}_" . time() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadDir, $filename);
                $heroImages[$i] = '/uploads/settings/' . $filename;
            }
        }

        // Filter and limit to maximum 5 photos
        $heroImages = array_values(array_slice(array_filter($heroImages), 0, 5));
        if (!empty($heroImages)) {
            $dataToSave['hero_images'] = json_encode($heroImages);
            $dataToSave['hero_image'] = $heroImages[0];
        }

        // Save settings to database
        SiteSetting::setGroup('dashboard', $dataToSave);

        // Record audit activity
        $user = $request->user();
        AdminActivityLog::record(
            action: 'update_dashboard_settings',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: 'Memperbarui konfigurasi landing page / beranda website desa'
        );

        return back()->with('success', 'Konfigurasi beranda website berhasil disimpan dan diperbarui!');
    }
}
