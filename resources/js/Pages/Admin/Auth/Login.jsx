import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { ShieldCheck, Eye, EyeOff, Lock, User, ArrowLeft, LogIn, KeyRound } from 'lucide-react';

export default function Login({ adminPath = 'portal-karangwungu' }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        security_pin: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/${adminPath}/login`, {
            onFinish: () => reset('password', 'security_pin'),
        });
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-red-600 selection:text-white">
            <Head title="Masuk Portal Administrator - Desa Karangwungu" />

            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-800/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Back to Public Web Link */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-300 transition-colors px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Kembali ke Website</span>
                </Link>
            </div>

            <div className="w-full max-w-md mx-auto z-10">
                {/* Header Branding */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Desa Karangwungu"
                            className="h-20 w-auto object-contain drop-shadow-xl"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Portal Administrator
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                            Pemerintah Desa Karangwungu &bull; Kec. Karanggeneng
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="mt-8">
                    <div className="bg-zinc-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-zinc-800 space-y-6">
                        <div className="border-b border-zinc-800/80 pb-4">
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                                Autentikasi Pengguna & Keamanan Berlapis
                            </span>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Masukkan username, kata sandi, dan PIN pengaman resmi aparatur desa.
                            </p>
                        </div>

                        {errors.username && (
                            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 font-medium animate-in fade-in duration-200">
                                {errors.username}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-zinc-300">
                                    Username Administrator
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Contoh: admin"
                                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950/60 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-zinc-300">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950/60 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Security PIN / Passkey */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="block text-xs font-semibold text-amber-400">
                                        Token / PIN Keamanan Sistem
                                    </label>
                                    <span className="text-[10px] text-zinc-500">6 Digit Rahasia</span>
                                </div>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-amber-400/80" />
                                    <input
                                        type={showPin ? 'text' : 'password'}
                                        required
                                        maxLength={10}
                                        value={data.security_pin}
                                        onChange={(e) => setData('security_pin', e.target.value)}
                                        placeholder="Contoh: 622540"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-amber-500/40 bg-zinc-950/80 text-sm text-amber-300 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-mono tracking-wider"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPin(!showPin)}
                                        className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        {showPin ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.security_pin && (
                                    <p className="text-xs text-red-400">{errors.security_pin}</p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-red-600 focus:ring-red-500 focus:ring-offset-zinc-900"
                                    />
                                    <span className="text-xs text-zinc-400">
                                        Ingat sesi masuk di perangkat ini
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:from-red-600 hover:to-red-900 text-amber-300 font-bold text-sm border border-amber-400/40 shadow-lg shadow-red-950/40 hover:shadow-xl transition-all disabled:opacity-50 cursor-pointer"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>{processing ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                            </button>
                        </form>

                        {/* Security Notice */}
                        <div className="pt-4 border-t border-zinc-800/80 text-center">
                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                                Dilindungi dengan enkripsi berlapis, pembatasan brute-force, dan pengikatan sidik jari perangkat sesi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
