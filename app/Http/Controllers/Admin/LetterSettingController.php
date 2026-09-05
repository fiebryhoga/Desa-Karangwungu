<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ServiceController;
use App\Models\AdminActivityLog;
use App\Models\LetterRequest;
use App\Models\SiteSetting;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LetterSettingController extends Controller
{
    /**
     * Display a listing of citizen letter requests.
     */
    public function index(Request $request)
    {
        // Auto-prune surat berstatus 'ditolak' yang sudah lebih dari 7 hari (1 minggu)
        $prunedCount = LetterRequest::where('status', 'ditolak')
            ->where('updated_at', '<', now()->subDays(7))
            ->delete();

        if ($prunedCount > 0) {
            AdminActivityLog::log(
                'auto_prune_letters',
                "Sistem otomatis membersihkan {$prunedCount} permohonan surat berstatus ditolak yang lebih dari 7 hari"
            );
        }

        $search = $request->input('search');
        $status = $request->input('status', 'menunggu');
        if (empty($status) || $status === 'all' || !in_array($status, ['menunggu', 'bisa_diambil', 'selesai', 'ditolak'])) {
            $status = 'menunggu';
        }
        $letterType = $request->input('letter_type', 'all');

        $query = LetterRequest::query()->orderBy('created_at', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('tracking_code', 'like', "%{$search}%")
                  ->orWhere('citizen_name', 'like', "%{$search}%")
                  ->orWhere('citizen_nik', 'like', "%{$search}%")
                  ->orWhere('citizen_phone', 'like', "%{$search}%")
                  ->orWhere('citizen_email', 'like', "%{$search}%")
                  ->orWhere('letter_number', 'like', "%{$search}%")
                  ->orWhere('purpose', 'like', "%{$search}%");
            });
        }

        // Filter selalu berdasarkan status aktif (tanpa filter 'all')
        $query->where('status', $status);

        if (!empty($letterType) && $letterType !== 'all') {
            $query->where('letter_type', $letterType);
        }

        // Metrics count: hanya 4 status: menunggu, bisa_diambil, selesai, ditolak
        $counts = [
            'menunggu' => LetterRequest::where('status', 'menunggu')->count(),
            'bisa_diambil' => LetterRequest::where('status', 'bisa_diambil')->count(),
            'selesai' => LetterRequest::where('status', 'selesai')->count(),
            'ditolak' => LetterRequest::where('status', 'ditolak')->count(),
        ];

        // Available letter types for dropdown filter
        $availableTypes = LetterRequest::select('letter_type')
            ->distinct()
            ->pluck('letter_type')
            ->filter()
            ->values();

        $letters = $query->paginate(15)->through(function ($item) {
            $daysLeft = null;
            if ($item->status === 'ditolak' && $item->updated_at) {
                $diff = (int) $item->updated_at->diffInDays(now());
                $daysLeft = max(1, 7 - $diff);
            }

            return [
                'id' => $item->id,
                'tracking_code' => $item->tracking_code,
                'citizen_name' => $item->citizen_name,
                'citizen_nik' => $item->citizen_nik,
                'birth_place' => $item->birth_place,
                'birth_date' => $item->birth_date ? $item->birth_date->format('Y-m-d') : null,
                'birth_date_formatted' => $item->formatted_birth_date,
                'gender' => $item->gender,
                'religion' => $item->religion,
                'occupation' => $item->occupation,
                'citizen_phone' => $item->citizen_phone,
                'citizen_email' => $item->citizen_email,
                'citizen_address' => $item->citizen_address,
                'letter_type' => $item->letter_type,
                'letter_number' => $item->letter_number,
                'purpose' => $item->purpose,
                'status' => $item->status,
                'admin_notes' => $item->admin_notes,
                'days_left' => $daysLeft,
                'created_at' => $item->created_at ? $item->created_at->timezone('Asia/Jakarta')->translatedFormat('d F Y, H:i') : '-',
                'created_at_human' => $item->created_at ? $item->created_at->timezone('Asia/Jakarta')->diffForHumans() : '-',
                'updated_at' => $item->updated_at ? $item->updated_at->timezone('Asia/Jakarta')->translatedFormat('d F Y, H:i') : '-',
            ];
        })->withQueryString();

        return Inertia::render('Admin/Settings/Letters', [
            'letters' => $letters,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status,
                'letter_type' => $letterType,
            ],
            'counts' => $counts,
            'availableTypes' => $availableTypes,
        ]);
    }

    /**
     * Find a letter request by tracking code or fallback numeric id.
     */
    protected function findLetter($identifier): LetterRequest
    {
        return LetterRequest::where('tracking_code', trim($identifier))
            ->orWhere('id', is_numeric($identifier) ? $identifier : -1)
            ->firstOrFail();
    }

    /**
     * Display the preview and edit page for a specific letter request.
     */
    public function preview($tracking_code)
    {
        $letter = $this->findLetter($tracking_code);

        $kades = VillageOfficial::where('position', 'like', '%Kepala Desa%')->first();
        $kadesName = $kades?->name ?: SiteSetting::getValue('kades_name', 'H. SUNARTO');

        $formattedLetter = [
            'id' => $letter->id,
            'tracking_code' => $letter->tracking_code,
            'citizen_name' => $letter->citizen_name,
            'citizen_nik' => $letter->citizen_nik,
            'birth_place' => $letter->birth_place,
            'birth_date' => $letter->birth_date ? $letter->birth_date->format('Y-m-d') : '',
            'birth_date_formatted' => $letter->formatted_birth_date,
            'gender' => $letter->gender ?? 'Laki-laki',
            'religion' => $letter->religion ?? 'Islam',
            'occupation' => $letter->occupation ?? 'Wiraswasta',
            'citizen_phone' => $letter->citizen_phone,
            'citizen_email' => $letter->citizen_email,
            'citizen_address' => ServiceController::formatFullAddress($letter->citizen_address),
            'letter_type' => $letter->letter_type,
            'letter_number' => $letter->letter_number,
            'letter_date' => $letter->letter_date ? $letter->letter_date->format('Y-m-d') : now()->format('Y-m-d'),
            'letter_date_formatted' => $letter->formatted_letter_date,
            'purpose' => $letter->purpose,
            'status' => $letter->status,
            'admin_notes' => $letter->admin_notes,
            'created_at' => $letter->created_at ? $letter->created_at->timezone('Asia/Jakarta')->translatedFormat('d F Y, H:i') : '-',
            'created_at_human' => $letter->created_at ? $letter->created_at->timezone('Asia/Jakarta')->diffForHumans() : '-',
            'updated_at' => $letter->updated_at ? $letter->updated_at->timezone('Asia/Jakarta')->translatedFormat('d F Y, H:i') : '-',
            'created_year' => $letter->created_at ? $letter->created_at->format('Y') : date('Y'),
        ];

        return Inertia::render('Admin/Settings/LetterPreview', [
            'letter' => $formattedLetter,
            'kades_name' => $kadesName,
            'kades_title' => 'Kepala Desa Karangwungu',
        ]);
    }

    /**
     * Update the specified letter request (status, official letter number, citizen inputs, admin notes, etc.).
     */
    public function update(Request $request, $tracking_code)
    {
        $letter = $this->findLetter($tracking_code);

        $validated = $request->validate([
            'status' => 'required|in:menunggu,bisa_diambil,selesai,ditolak',
            'letter_number' => 'nullable|string|max:100',
            'letter_date' => 'nullable|date',
            'admin_notes' => 'nullable|string|max:1000',
            'citizen_name' => 'nullable|string|max:255',
            'citizen_nik' => 'nullable|string|max:20',
            'birth_place' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|max:20',
            'religion' => 'nullable|string|max:50',
            'occupation' => 'nullable|string|max:100',
            'citizen_phone' => 'nullable|string|max:30',
            'citizen_email' => 'nullable|email|max:255',
            'citizen_address' => 'nullable|string|max:500',
            'purpose' => 'nullable|string|max:1000',
        ]);

        if (!empty($validated['citizen_address'])) {
            $validated['citizen_address'] = ServiceController::formatFullAddress($validated['citizen_address']);
        }

        $letter->update($validated);

        AdminActivityLog::log(
            'update_letter_request',
            "Memperbarui permohonan surat [{$letter->tracking_code}] milik {$letter->citizen_name} (Status: {$letter->status}, No Surat: {$letter->letter_number})"
        );

        return back()->with('success', "Permohonan surat [{$letter->tracking_code}] berhasil diperbarui.");
    }

    /**
     * Reject a letter request and move it to 'ditolak'.
     */
    public function reject(Request $request, $tracking_code)
    {
        $letter = $this->findLetter($tracking_code);
        $reason = $request->input('admin_notes') ?: 'Berkas persyaratan belum memenuhi atau data tidak valid. Silakan hubungi kantor balai desa.';

        $letter->update([
            'status' => 'ditolak',
            'admin_notes' => $reason,
        ]);

        AdminActivityLog::log(
            'reject_letter_request',
            "Menolak permohonan surat [{$letter->tracking_code}] milik {$letter->citizen_name}. Alasan: {$reason}"
        );

        return back()->with('success', "Permohonan surat [{$letter->tracking_code}] telah ditolak dan dipindahkan ke status Ditolak.");
    }

    /**
     * Restore a rejected letter request back to 'menunggu'.
     */
    public function restore($tracking_code)
    {
        $letter = $this->findLetter($tracking_code);

        $letter->update([
            'status' => 'menunggu',
            'admin_notes' => 'Permohonan surat dipulihkan kembali oleh admin desa dan siap ditinjau ulang.',
        ]);

        AdminActivityLog::log(
            'restore_letter_request',
            "Memulihkan permohonan surat [{$letter->tracking_code}] milik {$letter->citizen_name} kembali ke status Menunggu"
        );

        return back()->with('success', "Permohonan surat [{$letter->tracking_code}] berhasil dipulihkan ke status Menunggu.");
    }

    /**
     * Bulk actions for letters: delete permanently, restore, or reject.
     */
    public function bulkAction(Request $request)
    {
        $validated = $request->validate([
            'codes' => ['required', 'array'],
            'codes.*' => ['string'],
            'action' => ['required', 'string', 'in:delete,restore,reject'],
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $codes = $validated['codes'];
        $action = $validated['action'];
        $count = count($codes);

        if ($action === 'restore') {
            LetterRequest::whereIn('tracking_code', $codes)->update([
                'status' => 'menunggu',
                'admin_notes' => 'Permohonan surat dipulihkan kembali secara massal oleh admin desa.',
            ]);

            AdminActivityLog::log(
                'bulk_restore_letter',
                "Memulihkan {$count} permohonan surat massal ke status Menunggu"
            );

            return back()->with('success', "{$count} permohonan surat berhasil dipulihkan ke status Menunggu!");
        }

        if ($action === 'reject') {
            $reason = $validated['reason'] ?? 'Permohonan ditolak secara massal oleh admin desa.';
            LetterRequest::whereIn('tracking_code', $codes)->update([
                'status' => 'ditolak',
                'admin_notes' => $reason,
            ]);

            AdminActivityLog::log(
                'bulk_reject_letter',
                "Menolak {$count} permohonan surat secara massal"
            );

            return back()->with('success', "{$count} permohonan surat berhasil ditolak!");
        }

        if ($action === 'delete') {
            LetterRequest::whereIn('tracking_code', $codes)->delete();

            AdminActivityLog::log(
                'bulk_delete_letter',
                "Menghapus permanen {$count} permohonan surat secara massal"
            );

            return back()->with('success', "{$count} permohonan surat berhasil dihapus permanen!");
        }

        return back();
    }

    /**
     * Remove the specified letter request from storage permanently.
     */
    public function destroy($tracking_code)
    {
        $letter = $this->findLetter($tracking_code);
        $code = $letter->tracking_code;
        $name = $letter->citizen_name;

        $letter->delete();

        AdminActivityLog::log(
            'delete_letter_request',
            "Menghapus permohonan surat [{$code}] atas nama {$name}"
        );

        return back()->with('success', "Permohonan surat [{$code}] berhasil dihapus permanen.");
    }

    /**
     * Stream or download the official PDF for this letter request.
     */
    public function downloadPdf($tracking_code)
    {
        $letter = $this->findLetter($tracking_code);

        return app(ServiceController::class)->downloadLetterPdf($letter->tracking_code);
    }
}
