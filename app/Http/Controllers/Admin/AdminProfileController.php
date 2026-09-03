<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class AdminProfileController extends Controller
{
    /**
     * Show the profile edit form for the logged-in admin with security audit logs.
     */
    public function edit(): Response
    {
        $user = Auth::user();

        $activityLogs = AdminActivityLog::where('user_id', $user->id)
            ->orWhere('username', $user->username)
            ->latest('id')
            ->take(10)
            ->get(['id', 'action', 'ip_address', 'details', 'created_at']);

        return Inertia::render('Admin/Profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'role' => $user->role,
                'created_at' => $user->created_at,
            ],
            'activityLogs' => $activityLogs,
        ]);
    }

    /**
     * Update the logged-in admin's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', Rule::unique('users')->ignore($user->id)],
        ]);

        $oldUsername = $user->username;

        $user->update([
            'name' => $validated['name'],
            'username' => strtolower($validated['username']),
        ]);

        AdminActivityLog::record(
            'profile_updated',
            $user->username,
            $user->id,
            "Informasi profil diperbarui (nama: {$user->name}, username: {$user->username})"
        );

        return back()->with('success', 'Profil Anda berhasil diperbarui.');
    }

    /**
     * Update the logged-in admin's password.
     */
    public function updatePassword(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $request->validate([
            'current_password' => ['required', 'string', 'current_password'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ], [
            'current_password.current_password' => 'Kata sandi saat ini tidak cocok.',
            'password.confirmed' => 'Konfirmasi kata sandi baru tidak sesuai.',
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        AdminActivityLog::record(
            'password_changed',
            $user->username,
            $user->id,
            'Kata sandi administrator berhasil diubah secara mandiri.'
        );

        return back()->with('success', 'Kata sandi Anda berhasil diperbarui.');
    }
}
