<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationSettingController extends Controller
{
    /**
     * Display the Organizations Settings page in Admin.
     */
    public function index()
    {
        $settings = SiteSetting::getGroup('organizations');

        // Decode JSON arrays for frontend manipulation
        $settings['organizations_list_data'] = isset($settings['organizations_list']) && is_string($settings['organizations_list'])
            ? json_decode($settings['organizations_list'], true) ?: []
            : (is_array($settings['organizations_list'] ?? null) ? $settings['organizations_list'] : []);

        return Inertia::render('Admin/Settings/Organizations', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the Organizations Settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'organizations_title' => ['nullable', 'string', 'max:255'],
            'organizations_subtitle' => ['nullable', 'string', 'max:500'],
            'organizations_list' => ['nullable'],
        ]);

        // Encode array to JSON
        if (isset($validated['organizations_list']) && is_array($validated['organizations_list'])) {
            $validated['organizations_list'] = json_encode($validated['organizations_list'], JSON_UNESCAPED_UNICODE);
        }

        // Save to SiteSetting
        SiteSetting::setGroup('organizations', $validated);

        // Record audit activity log
        AdminActivityLog::record(
            'update_organizations_settings',
            'Memperbarui konfigurasi data lembaga dan organisasi kemasyarakatan desa.'
        );

        return back()->with('success', 'Data konfigurasi lembaga & organisasi berhasil disimpan.');
    }

    /**
     * Upload custom organization logo file (SVG, PNG, JPG, WebP).
     */
    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo_file' => 'required|file|mimes:svg,png,jpg,jpeg,webp,gif|max:3072',
        ]);

        $file = $request->file('logo_file');
        $uploadDir = public_path('uploads/organizations');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'logo_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/organizations/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Logo berhasil diunggah.',
        ]);
    }

    /**
     * Upload custom organization banner photo file.
     */
    public function uploadBanner(Request $request)
    {
        $request->validate([
            'banner_file' => 'required|file|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $file = $request->file('banner_file');
        $uploadDir = public_path('uploads/organizations');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'banner_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/organizations/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto banner berhasil diunggah.',
        ]);
    }

    /**
     * Upload custom organization leader photo file.
     */
    public function uploadLeaderPhoto(Request $request)
    {
        $request->validate([
            'leader_photo_file' => 'required|file|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        $file = $request->file('leader_photo_file');
        $uploadDir = public_path('uploads/organizations/leaders');
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = $file->getClientOriginalExtension();
        $filename = 'leader_' . time() . '_' . uniqid() . '.' . $extension;
        $file->move($uploadDir, $filename);

        $url = '/uploads/organizations/leaders/' . $filename;

        return response()->json([
            'success' => true,
            'url' => $url,
            'message' => 'Foto pimpinan berhasil diunggah.',
        ]);
    }
}
