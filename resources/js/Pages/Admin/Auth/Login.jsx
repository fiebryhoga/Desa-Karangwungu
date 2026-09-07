import React, { useState, useEffect } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import {
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowLeft,
    AlertCircle,
    Sun,
    Moon,
    HelpCircle,
    Check,
} from 'lucide-react';

export default function Login({ adminPath = 'portal-karangwungu' }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [showHelp, setShowHelp] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        security_pin: '62254',
        remember: false,
    });

    useEffect(() => {
        const storedTheme = localStorage.getItem('admin_theme') || localStorage.getItem('theme');
        const isDarkMode =
            storedTheme === 'dark' ||
            (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
            document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDark;
        setIsDark(nextTheme);
        if (nextTheme) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('admin_theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('admin_theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleKeyDown = (e) => {
        if (e.getModifierState) {
            setCapsLockOn(e.getModifierState('CapsLock'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/${adminPath}/login`, {
            onFinish: () => reset('password', 'security_pin'),
        });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative selection:bg-red-600 selection:text-white">
            <Head title="Masuk Portal Administrator - Desa Karangwungu" />

            {/* ========================================================= */}
            {/* SISI KIRI (Left Showcase Pane - 50% Desktop & Tablet)     */}
            {/* ========================================================= */}
            <div className="hidden md:flex md:w-1/2 xl:w-[52%] flex-col justify-between p-8 md:p-10 lg:p-12 xl:p-16 relative bg-gradient-to-br from-red-950 via-[#100608] to-zinc-950 text-white overflow-hidden border-r border-red-500/20">
                {/* 1. Background Photo: hero.jpg dengan Opacity & Cinematic Blending */}
                <img
                    src="/assets/images/hero.jpg"
                    alt="Pemandangan Desa Karangwungu"
                    className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105 pointer-events-none transition-transform duration-1000"
                />

                {/* 2. Gradient Vignette Overlay untuk Kontras Maksimal */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-red-950/80 to-[#180407]/90 pointer-events-none" />

                {/* 3. Siluet Motif Batik Tradisional Emas */}
                <div
                    className="absolute inset-0 opacity-[0.10] pointer-events-none bg-repeat"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23fde047'/%3E%3C/svg%3E")`,
                        backgroundSize: '100px 100px',
                    }}
                />

                {/* 4. Ambient Radial Glows */}
                <div className="absolute -top-24 -left-24 w-[450px] h-[450px] bg-red-600/25 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />

                {/* Top Bar: Kembali ke Website */}
                <div className="relative z-10 flex items-center">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 text-amber-400/80 group-hover:text-amber-300 group-hover:-translate-x-1 transition-all" />
                        <span>Kembali ke Website</span>
                    </Link>
                </div>

                {/* Centerpiece: Clean, Unboxed Identity Elements */}
                <div className="relative z-10 my-auto py-6 max-w-lg space-y-6">
                    {/* Official Logo directly without boxed div frame */}
                    <div className="inline-block">
                        <img
                            src="/assets/images/logo.png"
                            alt="Lambang Resmi Desa Karangwungu"
                            className="h-24 lg:h-28 xl:h-32 w-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Titles */}
                    <div className="space-y-2">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400/90">
                            Sistem Tata Kelola Pemerintahan Desa
                        </span>
                        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight">
                            Portal Administrator <br />
                            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                                Desa Karangwungu
                            </span>
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed pt-1 font-normal">
                            Pusat kendali digital terpadu untuk pelayanan administrasi persuratan warga, tata kelola kependudukan, dan transparansi anggaran Desa Karangwungu, Kecamatan Karanggeneng.
                        </p>
                    </div>

                    {/* Official Motto (Clean Open Typography without Box Frame) */}
                    <div className="space-y-1.5 pt-2 border-l-2 border-amber-400/60 pl-4">
                        <p className="text-xs sm:text-sm font-semibold text-amber-300 italic">
                            "Melayani dengan Integritas, Transparansi & Akuntabilitas"
                        </p>
                        <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                            Seluruh riwayat akses dan aktivitas sistem tercatat secara otomatis demi keamanan data dan audit kepatuhan aparatur desa.
                        </p>
                    </div>
                </div>

                {/* Bottom Trust & Security Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        <span className="text-emerald-300 font-medium text-[11px]">Sistem Operasional Normal</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                        <span>Enkripsi TLS 1.3 | Multi-PIN</span>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* SISI KANAN (Right Login Form Pane - Modern Clean SaaS)    */}
            {/* ========================================================= */}
            <div className="w-full md:w-1/2 xl:w-[48%] min-h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-16 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-200">
                {/* Top Bar: Back Link (Mobile only) & Dark/Light Toggle */}
                <div className="w-full max-w-[420px] mx-auto flex items-center justify-between md:justify-end gap-3">
                    <Link
                        href="/"
                        className="md:hidden inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white group-hover:-translate-x-1 transition-all" />
                        <span>Kembali ke Website</span>
                    </Link>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
                        title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
                        className="h-9 w-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-amber-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-180 duration-300" />
                        ) : (
                            <Moon className="h-4 w-4 text-zinc-700 animate-in spin-in-180 duration-300" />
                        )}
                    </button>
                </div>

                {/* Form Container (Rata Kiri, Posisi Tengah Sisi Kanan) */}
                <div className="w-full max-w-[420px] mx-auto my-auto py-10 space-y-7 text-left">
                    {/* Mobile Only Logo */}
                    <div className="md:hidden text-left pb-2">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Desa Karangwungu"
                            className="h-12 w-auto object-contain mb-2"
                        />
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                            Pemerintah Desa Karangwungu
                        </p>
                    </div>

                    {/* Clean Heading & Subtitle */}
                    <div className="space-y-2 text-left">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            Masuk ke Dashboard
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Silakan masukkan kredensial administrator Anda untuk melanjutkan.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {errors.username && (
                        <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-xs text-red-700 dark:text-red-300 flex items-start gap-2.5">
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            <div className="leading-snug">
                                <span className="font-semibold block text-red-900 dark:text-white">Gagal Masuk</span>
                                <span>{errors.username}</span>
                            </div>
                        </div>
                    )}

                    {/* Clean Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                autoFocus
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                placeholder="Masukkan username Anda"
                                className="w-full h-11 px-3.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Kata Sandi <span className="text-red-500">*</span>
                                </label>
                                {capsLockOn && (
                                    <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
                                        Caps Lock Aktif
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    onKeyDown={handleKeyDown}
                                    onKeyUp={handleKeyDown}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan kata sandi"
                                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                                    tabIndex={-1}
                                    title={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Token / PIN Keamanan */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                    Token / PIN Keamanan <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPin ? 'text' : 'password'}
                                    required
                                    maxLength={10}
                                    value={data.security_pin}
                                    onChange={(e) => setData('security_pin', e.target.value)}
                                    placeholder="****"
                                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-colors tracking-wider font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                                    tabIndex={-1}
                                    title={showPin ? "Sembunyikan PIN" : "Tampilkan PIN"}
                                >
                                    {showPin ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.security_pin && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.security_pin}</p>
                            )}
                        </div>

                        {/* Remember Me & Help Row with Interactive Popover */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                                <div
                                    className={`w-4 h-4 rounded flex items-center justify-center transition-all duration-150 ${
                                        data.remember
                                            ? 'bg-red-600 border border-red-600 text-white shadow-2xs'
                                            : 'border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-600'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="sr-only"
                                    />
                                    {data.remember && (
                                        <Check className="h-3 w-3 stroke-[3]" />
                                    )}
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                                    Ingat sesi saya
                                </span>
                            </label>

                            {/* Bantuan Akses with Popover */}
                            <div
                                className="relative inline-block"
                                onMouseEnter={() => setShowHelp(true)}
                                onMouseLeave={() => setShowHelp(false)}
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowHelp((prev) => !prev)}
                                    className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    <span>Bantuan Akses?</span>
                                    <HelpCircle className="h-3.5 w-3.5 opacity-80" />
                                </button>

                                {/* Popover Tooltip */}
                                <div
                                    className={`absolute right-0 bottom-full mb-2.5 w-72 sm:w-80 p-3.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 text-white shadow-2xl border border-zinc-700/80 transition-all duration-200 z-50 ${
                                        showHelp
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible translate-y-1 pointer-events-none'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-1.5 text-amber-400 font-semibold text-xs">
                                        <HelpCircle className="h-3.5 w-3.5" />
                                        <span>Kendala Akses Administrator</span>
                                    </div>
                                    <p className="text-zinc-300 text-[11px] leading-relaxed">
                                        Jika Anda mengalami kendala login, lupa kata sandi, atau kehilangan Token PIN keamanan, silakan hubungi <strong>Administrator Utama</strong> atau <strong>Tim Developer</strong> Desa Karangwungu untuk verifikasi identitas dan reset kredensial akun Anda.
                                    </p>
                                    <div className="mt-2.5 pt-2 border-t border-zinc-700/60 flex items-center justify-between text-[10px] text-zinc-400">
                                        <span>Sekretariat Desa</span>
                                        <span className="text-amber-400 font-medium">Bantuan Resmi</span>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-zinc-900 dark:bg-zinc-800 border-b border-r border-zinc-700/80 rotate-45" />
                                </div>
                            </div>
                        </div>

                        {/* Solid Clean Primary Button (Like Image 1) */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-11 sm:h-12 mt-3 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm tracking-wide transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                            {processing ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Memverifikasi...</span>
                                </>
                            ) : (
                                <span>Masuk ke Dashboard</span>
                            )}
                        </button>

                        {/* Security Assurance */}
                        <div className="pt-2 text-left">
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center justify-start gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                                <span>Enkripsi TLS 1.3 | Akses Terbatas Aparatur</span>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Bottom Footer */}
                <div className="w-full max-w-[420px] mx-auto text-left text-xs text-zinc-400 dark:text-zinc-600">
                    &copy; 2026 Pemerintah Desa Karangwungu. Hak Cipta Dilindungi.
                </div>
            </div>
        </div>
    );
}
