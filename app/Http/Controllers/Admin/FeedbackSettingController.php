<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackSettingController extends Controller
{
    /**
     * Display a listing of citizen feedbacks and aspirations.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $status = $request->input('status', 'all');

        $query = Feedback::query()->orderBy('created_at', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('contact_info', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        if (!empty($category) && $category !== 'all') {
            $query->where('category', $category);
        }

        if ($status === 'public') {
            $query->where('is_public', true);
        } elseif ($status === 'private') {
            $query->where('is_public', false);
        }

        $feedbacks = $query->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'contact_info' => $item->contact_info,
                'category' => $item->category,
                'message' => $item->message,
                'is_public' => (bool) $item->is_public,
                'response' => $item->response,
                'created_at' => $item->created_at ? ($item->created_at->timezone('Asia/Jakarta')->locale('id')->translatedFormat('l, j F') . ' jam ' . $item->created_at->timezone('Asia/Jakarta')->format('H:i')) : '-',
                'created_at_human' => $item->created_at ? $item->created_at->timezone('Asia/Jakarta')->locale('id')->diffForHumans() : '-',
            ];
        });

        // Calculate summary metrics
        $totalCount = Feedback::count();
        $publicCount = Feedback::where('is_public', true)->count();
        $privateCount = Feedback::where('is_public', false)->count();

        // Master categories matching the frontend Contact submission form
        $masterCategories = collect([
            'Saran & Masukan Pembangunan',
            'Kritik & Pelayanan Administrasi',
            'Infrastruktur & Fasilitas Umum',
            'Kebersihan & Lingkungan Hidup',
            'Ketertiban & Keamanan Warga',
        ]);

        // Merge with any distinct categories in the database to ensure no existing feedback category is omitted
        $existingCategories = Feedback::select('category')->distinct()->pluck('category')->filter()->values();
        $allCategories = $masterCategories->merge($existingCategories)->unique()->values();

        return Inertia::render('Admin/Settings/Feedbacks', [
            'feedbacks' => $feedbacks,
            'stats' => [
                'total' => $totalCount,
                'public' => $publicCount,
                'private' => $privateCount,
            ],
            'categories' => $allCategories,
            'filters' => [
                'search' => $search ?? '',
                'category' => $category ?? 'all',
                'status' => $status,
            ],
        ]);
    }

    /**
     * Toggle public status for a single feedback item.
     */
    public function togglePublic(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->is_public = !$feedback->is_public;
        $feedback->save();

        $statusText = $feedback->is_public ? 'ditampilkan di publik' : 'disembunyikan dari publik';

        $user = $request->user();
        AdminActivityLog::record(
            action: 'toggle_feedback_visibility',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: "Mengubah status visibilitas masukan #{$feedback->id} dari {$feedback->name} menjadi {$statusText}"
        );

        return back()->with('success', "Aspirasi dari {$feedback->name} berhasil {$statusText}!");
    }

    /**
     * Update an existing feedback (response or category or visibility).
     */
    public function update(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);

        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'is_public' => ['required', 'boolean'],
            'response' => ['nullable', 'string', 'max:2000'],
        ]);

        $feedback->update([
            'category' => $validated['category'],
            'is_public' => $validated['is_public'],
            'response' => $validated['response'] ?? null,
        ]);

        $user = $request->user();
        AdminActivityLog::record(
            action: 'update_feedback',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: "Memperbarui data dan tindak lanjut masukan warga #{$feedback->id} ({$feedback->name})"
        );

        return back()->with('success', "Data dan tanggapan masukan dari {$feedback->name} berhasil disimpan!");
    }

    /**
     * Bulk actions (publish, unpublish, delete).
     */
    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:feedbacks,id'],
            'action' => ['required', 'string', 'in:make_public,make_private,delete'],
        ]);

        $ids = $validated['ids'];
        $action = $validated['action'];
        $count = count($ids);

        $user = $request->user();

        if ($action === 'make_public') {
            Feedback::whereIn('id', $ids)->update(['is_public' => true]);
            AdminActivityLog::record(
                action: 'bulk_publish_feedback',
                username: $user->username ?? 'admin',
                userId: $user->id ?? null,
                details: "Menampilkan {$count} masukan warga ke halaman publik secara massal"
            );
            return back()->with('success', "{$count} masukan warga berhasil diaktifkan ke publik!");
        }

        if ($action === 'make_private') {
            Feedback::whereIn('id', $ids)->update(['is_public' => false]);
            AdminActivityLog::record(
                action: 'bulk_hide_feedback',
                username: $user->username ?? 'admin',
                userId: $user->id ?? null,
                details: "Menyembunyikan {$count} masukan warga dari publik secara massal"
            );
            return back()->with('success', "{$count} masukan warga berhasil disembunyikan dari publik!");
        }

        if ($action === 'delete') {
            Feedback::whereIn('id', $ids)->delete();
            AdminActivityLog::record(
                action: 'bulk_delete_feedback',
                username: $user->username ?? 'admin',
                userId: $user->id ?? null,
                details: "Menghapus {$count} masukan warga secara permanen"
            );
            return back()->with('success', "{$count} masukan warga berhasil dihapus secara permanen!");
        }

        return back();
    }

    /**
     * Delete a single feedback.
     */
    public function destroy(Request $request, $id)
    {
        $feedback = Feedback::findOrFail($id);
        $name = $feedback->name;
        $feedback->delete();

        $user = $request->user();
        AdminActivityLog::record(
            action: 'delete_feedback',
            username: $user->username ?? 'admin',
            userId: $user->id ?? null,
            details: "Menghapus masukan/pengaduan warga dari {$name} (#{$id})"
        );

        return back()->with('success', "Masukan dari {$name} berhasil dihapus!");
    }
}
