<?php

namespace App\Http\Middleware;

use App\Models\AdminActivityLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminSecurityMiddleware
{
    /**
     * Handle an incoming request for admin routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('admin.login');
        }

        $user = Auth::user();

        // 1. Inactive account check
        if (!$user->is_active) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('admin.login')
                ->with('error', 'Akun administrator Anda telah dinonaktifkan.');
        }

        // 2. Session Hijacking Protection (IP & Device Fingerprint Binding)
        $currentFingerprint = hash('sha256', $request->ip() . '|' . ($request->userAgent() ?? ''));
        $sessionFingerprint = $request->session()->get('admin_device_fingerprint');

        if (!$sessionFingerprint) {
            $request->session()->put('admin_device_fingerprint', $currentFingerprint);
        } elseif (!hash_equals($sessionFingerprint, $currentFingerprint)) {
            // Suspicious session transfer across different IP/User-Agent
            AdminActivityLog::record('session_hijack_blocked', $user->username, $user->id, 'Percobaan pembajakan sesi ditolak dari IP: ' . $request->ip());

            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('admin.login')
                ->with('error', 'Sesi Anda dibatalkan demi keamanan karena terdeteksi perubahan perangkat atau jaringan.');
        }

        return $next($request);
    }
}
