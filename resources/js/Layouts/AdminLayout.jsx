import React, { useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    UserCheck,
    FileText,
    Newspaper,
    Sparkles,
    Image,
    DollarSign,
    MessageSquare,
    Globe,
    LogOut,
    Menu,
    X,
    ShieldCheck,
    ChevronRight,
    KeyRound,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Panel Administrator' }) {
    const { url, props } = usePage();
    const { auth, flash, admin_path } = props || {};
    const adminPath = admin_path || 'portal-karangwungu';
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentUrl = url || (typeof window !== 'undefined' ? window.location.pathname : '');

    const currentUser = auth?.user || {
        name: 'Administrator',
        username: 'admin',
        role: 'superadmin',
    };

    const handleLogout = () => {
        router.post(`/${adminPath}/logout`);
    };

    const navItems = [
        {
            name: 'Dashboard Ikhtisar',
            href: `/${adminPath}/dashboard`,
            icon: LayoutDashboard,
            active: currentUrl === `/${adminPath}/dashboard` || currentUrl === `/${adminPath}`,
        },
        {
            name: 'Manajemen Administrator',
            href: `/${adminPath}/users`,
            icon: Users,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/users`) : false,
        },
        {
            name: 'Profil & Kata Sandi',
            href: `/${adminPath}/profile`,
            icon: KeyRound,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/profile`) : false,
        },
    ];

    const publicModules = [
        { name: 'Layanan Persuratan', href: '/layanan', icon: FileText },
        { name: 'Berita & Pengumuman', href: '/berita', icon: Newspaper },
        { name: 'Potensi & UMKM', href: '/potensi', icon: Sparkles },
        { name: 'Galeri Foto Kegiatan', href: '/galeri', icon: Image },
        { name: 'Transparansi APBDes', href: '/transparansi', icon: DollarSign },
        { name: 'Layanan Kontak Warga', href: '/kontak', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row selection:bg-red-600 selection:text-white">
            <Head title={`${title} - Admin Desa Karangwungu`} />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="h-16 px-5 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90">
                    <Link href={`/${adminPath}/dashboard`} className="flex items-center gap-3">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Karangwungu"
                            className="h-9 w-auto object-contain shrink-0"
                        />
                        <div>
                            <span className="text-sm font-black text-white tracking-tight block">
                                Panel Admin
                            </span>
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                                Desa Karangwungu
                            </span>
                        </div>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
                    {/* Main Admin Nav */}
                    <div className="space-y-1">
                        <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Menu Utama
                        </span>
                        <div className="mt-1.5 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                            item.active
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 shadow-md shadow-red-950/40'
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Public Preview Links */}
                    <div className="space-y-1">
                        <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Tinjau Modul Web Publik
                        </span>
                        <div className="mt-1.5 space-y-0.5">
                            {publicModules.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon className="h-3.5 w-3.5 text-zinc-500" />
                                            <span>{item.name}</span>
                                        </div>
                                        <Globe className="h-3 w-3 text-zinc-600" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Admin User Footer & Logout */}
                <div className="p-3.5 border-t border-zinc-800 bg-zinc-950/40 space-y-2.5">
                    <div className="flex items-center gap-3 px-2 py-1.5">
                        <div className="h-9 w-9 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0">
                            {currentUser.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white truncate">
                                {currentUser.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[10px] text-amber-400 font-bold">
                                    @{currentUser.username || 'admin'}
                                </span>
                                <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold bg-amber-400/10 text-amber-400/90 border border-amber-400/20 uppercase tracking-wider">
                                    {currentUser.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 transition-all cursor-pointer"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Keluar Sistem</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Topbar */}
                <header className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <span className="font-medium">Administrator</span>
                            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
                            <span className="font-bold text-white">{title}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-amber-300 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 transition-colors"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            <span>Buka Web Desa</span>
                        </a>

                        <Link
                            href={`/${adminPath}/profile`}
                            className="flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-zinc-800/80 transition-colors"
                        >
                            <div className="h-7 w-7 rounded-lg bg-gradient-to-b from-red-700 to-red-900 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-400/30">
                                {currentUser.name.charAt(0)}
                            </div>
                            <span className="text-xs font-bold text-zinc-200 hidden md:inline">
                                {currentUser.name}
                            </span>
                        </Link>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-4 sm:mx-6 lg:mx-8 mt-4 p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                        <span>{flash.error}</span>
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
