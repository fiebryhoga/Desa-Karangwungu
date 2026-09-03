<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Display the admin login view.
     */
    public function create(): Response|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }

        return Inertia::render('Admin/Auth/Login', [
            'adminPath' => config('app.admin_path', 'portal-karangwungu'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
            'security_pin' => ['required', 'string'],
        ], [
            'username.required' => 'Username administrator wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
            'security_pin.required' => 'Token / PIN Keamanan wajib dimasukkan.',
        ]);

        $throttleKey = Str::lower($request->input('username')) . '|' . $request->ip();

        // 1. Anti Brute-Force Rate Limiting (Max 5 attempts / minute)
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            AdminActivityLog::record(
                'login_rate_limited',
                $request->input('username'),
                null,
                "Terlalu banyak percobaan gagal. Akses dikunci sementara selama {$seconds} detik."
            );

            throw ValidationException::withMessages([
                'username' => "Terlalu banyak percobaan masuk yang gagal. Akses Anda dikunci sementara. Silakan tunggu {$seconds} detik lagi.",
            ]);
        }

        // 2. Secret Security PIN Verification
        $expectedPin = (string) config('app.admin_security_pin', '622540');
        if (!hash_equals($expectedPin, (string) $request->input('security_pin'))) {
            RateLimiter::hit($throttleKey, 60);

            AdminActivityLog::record(
                'login_failed_invalid_pin',
                $request->input('username'),
                null,
                'Percobaan masuk gagal: Kode Token / PIN Keamanan salah.'
            );

            throw ValidationException::withMessages([
                'security_pin' => 'Token / PIN Keamanan yang Anda masukkan tidak valid.',
            ]);
        }

        // 3. Username & Password Credentials Attempt
        $credentials = [
            'username' => $request->username,
            'password' => $request->password,
        ];

        $remember = $request->boolean('remember');

        if (!Auth::attempt($credentials, $remember)) {
            RateLimiter::hit($throttleKey, 60);

            AdminActivityLog::record(
                'login_failed_bad_credentials',
                $request->input('username'),
                null,
                'Percobaan masuk gagal: Username atau kata sandi tidak cocok.'
            );

            throw ValidationException::withMessages([
                'username' => __('Username atau kata sandi tidak cocok dengan data administrator.'),
            ]);
        }

        $user = Auth::user();

        // 4. Inactive Account Check
        if (!$user->is_active) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            AdminActivityLog::record(
                'login_blocked_inactive',
                $user->username,
                $user->id,
                'Akses ditolak: Akun administrator dinonaktifkan.'
            );

            throw ValidationException::withMessages([
                'username' => __('Akun administrator Anda saat ini dinonaktifkan. Silakan hubungi Superadmin.'),
            ]);
        }

        // 5. Successful Login: Clear Rate Limiter, Regenerate Session & Bind Device Fingerprint
        RateLimiter::clear($throttleKey);
        $request->session()->regenerate();

        // Fingerprint: IP + User-Agent Hash
        $deviceFingerprint = hash('sha256', $request->ip() . '|' . ($request->userAgent() ?? ''));
        $request->session()->put('admin_device_fingerprint', $deviceFingerprint);

        AdminActivityLog::record(
            'login_success',
            $user->username,
            $user->id,
            'Masuk berhasil ke panel administrator.'
        );

        return redirect()->intended(route('admin.dashboard'))
            ->with('success', 'Autentikasi keamanan berhasil. Selamat datang kembali, ' . $user->name . '!');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();

        if ($user) {
            AdminActivityLog::record(
                'logout',
                $user->username,
                $user->id,
                'Keluar dari sesi administrator.'
            );
        }

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')
            ->with('success', 'Anda telah berhasil keluar dari sistem administrator.');
    }
}
