import React, { useState, useEffect, useRef } from 'react';
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
    Sun,
    Moon,
    Bell,
    BellRing,
    PanelLeftClose,
    PanelLeftOpen,
    Activity,
    ShieldAlert,
    UserPlus,
    Trash2,
    Clock,
    RefreshCw,
    Sliders,
    Building2,
    Compass,
} from 'lucide-react';

const BATIK_DARK = `data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23fde047'/%3E%3C/svg%3E`;

const BATIK_LIGHT = `data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23b91c1c' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23b91c1c' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='30' cy='30' r='3.5' fill='%23d97706'/%3E%3Ccircle cx='90' cy='90' r='3.5' fill='%23d97706'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23d97706'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23d97706'/%3E%3C/svg%3E`;

function formatTimeAgo(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSec = Math.floor((now - date) / 1000);
        if (diffInSec < 60) return 'Baru saja';
        const diffInMin = Math.floor(diffInSec / 60);
        if (diffInMin < 60) return `${diffInMin} mnt lalu`;
        const diffInHours = Math.floor(diffInMin / 60);
        if (diffInHours < 24) return `${diffInHours} jam lalu`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} hari lalu`;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    } catch {
        return '';
    }
}

export default function AdminLayout({ children, title = 'Panel Administrator' }) {
    const { url, props } = usePage();
    const { auth, flash, admin_path, admin_notifications } = props || {};
    const adminPath = admin_path || 'portal-karangwungu';
    const notifications = Array.isArray(admin_notifications) ? admin_notifications : [];

    // State 1: Mobile sidebar drawer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State 2: Desktop sidebar collapsed (buka-tutup)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin_sidebar_collapsed') === 'true';
        }
        return false;
    });

    // State 3: Dark / Light Theme
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin_theme') || 'dark';
        }
        return 'dark';
    });

    // State 4: Notification Dropdown
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);

    // State 5: Floating Toast Flash Notification (Top-Right, Auto-dismiss or Closeable)
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (typeof flash?.success === 'string' && flash.success.trim().length > 0) {
            setToast({ type: 'success', message: flash.success });
        } else if (typeof flash?.error === 'string' && flash.error.trim().length > 0) {
            setToast({ type: 'error', message: flash.error });
        }
    }, [flash]);

    // Auto-dismiss toast after 4.5 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const currentUrl = url || (typeof window !== 'undefined' ? window.location.pathname : '');

    const currentUser = auth?.user || {
        name: 'Administrator',
        username: 'admin',
        role: 'superadmin',
    };

    // Toggle Theme
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            if (nextTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
        }
    };

    // Toggle Desktop Sidebar
    const toggleSidebarCollapse = () => {
        const nextState = !sidebarCollapsed;
        setSidebarCollapsed(nextState);
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_sidebar_collapsed', String(nextState));
        }
    };

    // Sync theme class to html root
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
        }
    }, [theme]);

    // Close notification dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        router.post(`/${adminPath}/logout`);
    };

    const mainNav = [
        {
            name: 'Dashboard Ikhtisar',
            href: `/${adminPath}/dashboard`,
            icon: LayoutDashboard,
            active: currentUrl === `/${adminPath}/dashboard` || currentUrl === `/${adminPath}`,
        },
    ];

    const websiteConfigNav = [
        {
            name: 'Konfigurasi Dashboard',
            href: `/${adminPath}/settings/dashboard`,
            icon: Sliders,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/dashboard`) : false,
        },
        {
            name: 'Konfigurasi Umum / Kontak',
            href: `/${adminPath}/settings/general`,
            icon: Building2,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/general`) : false,
        },
        {
            name: 'Konfigurasi Gambaran Umum',
            href: `/${adminPath}/settings/overview`,
            icon: Compass,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/overview`) : false,
        },
    ];

    const publicModules = [
        { name: 'Layanan Surat', href: '/layanan', icon: FileText },
        { name: 'Berita Desa', href: '/berita', icon: Newspaper },
        { name: 'Potensi & UMKM', href: '/potensi', icon: Sparkles },
        { name: 'Galeri Foto', href: '/galeri', icon: Image },
        { name: 'Transparansi APBDes', href: '/transparansi', icon: DollarSign },
        { name: 'Layanan Kontak', href: '/kontak', icon: MessageSquare },
    ];

    const systemNav = [
        {
            name: 'Manajemen Administrator',
            href: `/${adminPath}/users`,
            icon: Users,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/users`) : false,
        },
        {
            name: 'Profil & Keamanan',
            href: `/${adminPath}/profile`,
            icon: KeyRound,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/profile`) : false,
        },
    ];

    const isDark = theme === 'dark';
    const currentBatik = isDark ? BATIK_DARK : BATIK_LIGHT;

    const getLogIcon = (action) => {
        switch (action) {
            case 'login_success':
                return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />;
            case 'login_failed_bad_credentials':
            case 'login_failed_invalid_pin':
                return <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0" />;
            case 'login_rate_limited':
            case 'session_hijack_blocked':
                return <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 animate-pulse" />;
            case 'password_changed':
            case 'admin_password_reset':
                return <KeyRound className="h-4 w-4 text-amber-400 shrink-0" />;
            case 'admin_created':
                return <UserPlus className="h-4 w-4 text-blue-400 shrink-0" />;
            case 'admin_deleted':
                return <Trash2 className="h-4 w-4 text-red-400 shrink-0" />;
            default:
                return <Activity className="h-4 w-4 text-zinc-400 shrink-0" />;
        }
    };

    const getLogTitle = (action) => {
        switch (action) {
            case 'login_success':
                return 'Login Berhasil';
            case 'login_failed_bad_credentials':
                return 'Gagal Masuk (Sandi Salah)';
            case 'login_failed_invalid_pin':
                return 'Gagal Masuk (PIN Salah)';
            case 'login_rate_limited':
                return 'Percobaan Diblokir (Rate Limit)';
            case 'session_hijack_blocked':
                return 'Pembajakan Sesi Dicegah';
            case 'password_changed':
                return 'Kata Sandi Diubah';
            case 'admin_created':
                return 'Admin Baru Ditambahkan';
            case 'admin_updated':
                return 'Data Admin Diperbarui';
            case 'admin_deleted':
                return 'Akun Admin Dihapus';
            default:
                return action;
        }
    };

    return (
        <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 relative overflow-x-hidden ${
            isDark
                ? 'dark bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white'
                : 'bg-slate-100 text-zinc-900 selection:bg-red-600 selection:text-white'
        }`}>
            <Head title={`${title} - Admin Desa Karangwungu`} />

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ========================================================= */}
            {/* SIDEBAR NAVIGATION (Collapsible on Desktop & Drawer on Mobile) */}
            {/* ========================================================= */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 md:z-30 flex flex-col transition-all duration-300 ease-in-out h-screen ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } ${
                    sidebarCollapsed ? 'w-20' : 'w-72 md:w-64 lg:w-72'
                } ${
                    isDark
                        ? 'bg-zinc-900 border-r border-zinc-800 shadow-2xl'
                        : 'bg-white border-r border-zinc-200 shadow-lg'
                }`}
            >
                {/* Brand Header with Theme-Adaptive Batik Silhouette (h-16, pixel-perfect sejajar dgn Navbar) */}
                <div className={`relative h-16 px-4 flex items-center justify-between border-b overflow-hidden shrink-0 transition-colors duration-300 ${
                    isDark
                        ? 'border-zinc-800 bg-gradient-to-r from-red-950 via-red-900 to-zinc-950'
                        : 'border-zinc-200 bg-gradient-to-r from-red-50/90 via-red-50/50 to-white'
                }`}>
                    {/* Siluet Motif Batik Tradisional Sinkron */}
                    <div
                        className={`absolute inset-0 pointer-events-none bg-repeat transition-opacity duration-300 ${
                            isDark ? 'opacity-20' : 'opacity-15'
                        }`}
                        style={{
                            backgroundImage: `url("${currentBatik}")`,
                            backgroundSize: '80px 80px',
                            backgroundPosition: '0 0',
                        }}
                    />
                    <div className={`absolute inset-0 pointer-events-none ${
                        isDark
                            ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
                            : 'bg-gradient-to-r from-red-100/25 via-transparent to-transparent'
                    }`} />

                    <Link
                        href={`/${adminPath}/dashboard`}
                        title={sidebarCollapsed ? 'Panel Admin Desa Karangwungu' : undefined}
                        className={`relative z-10 flex items-center gap-3 group transition-transform ${
                            sidebarCollapsed ? 'mx-auto' : ''
                        }`}
                    >
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Karangwungu"
                            className="h-10 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-md"
                        />
                        {!sidebarCollapsed && (
                            <div className="min-w-0">
                                <span className={`text-sm font-black tracking-tight block truncate ${
                                    isDark ? 'text-white drop-shadow-xs' : 'text-zinc-900'
                                }`}>
                                    Panel Admin
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider block truncate ${
                                    isDark ? 'text-amber-300 drop-shadow-xs' : 'text-red-700'
                                }`}>
                                    Desa Karangwungu
                                </span>
                            </div>
                        )}
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className={`md:hidden relative z-10 p-1.5 rounded-lg transition-colors ${
                            isDark
                                ? 'text-zinc-300 hover:text-white hover:bg-white/10'
                                : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                        }`}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Nav Links (overflow-visible when collapsed so tooltips are never cut off!) */}
                <div className={`flex-1 px-3 py-4 space-y-6 ${
                    sidebarCollapsed ? 'overflow-visible' : 'overflow-y-auto custom-scrollbar'
                }`}>
                    {/* 1. Main Admin Nav */}
                    <div className="space-y-1">
                        {!sidebarCollapsed && (
                            <span className={`px-3 text-[10px] font-bold uppercase tracking-wider ${
                                isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                                Menu Utama
                            </span>
                        )}
                        <div className="mt-1.5 space-y-1">
                            {mainNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                                            sidebarCollapsed ? 'justify-center' : ''
                                        } ${
                                            item.active
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 shadow-md shadow-red-950/40'
                                                : isDark
                                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Konfigurasi Website */}
                    <div className="space-y-1">
                        {!sidebarCollapsed && (
                            <span className={`px-3 text-[10px] font-bold uppercase tracking-wider ${
                                isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                                Konfigurasi Website
                            </span>
                        )}
                        <div className="mt-1.5 space-y-1">
                            {websiteConfigNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                                            sidebarCollapsed ? 'justify-center' : ''
                                        } ${
                                            item.active
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 shadow-md shadow-red-950/40'
                                                : isDark
                                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Public Preview Links */}
                    <div className="space-y-1">
                        {!sidebarCollapsed && (
                            <span className={`px-3 text-[10px] font-bold uppercase tracking-wider ${
                                isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                                Website & Layanan Desa
                            </span>
                        )}
                        <div className="mt-1.5 space-y-0.5">
                            {publicModules.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={item.name}
                                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                                            sidebarCollapsed ? 'justify-center' : ''
                                        } ${
                                            isDark
                                                ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <Icon className={`h-3.5 w-3.5 shrink-0 ${
                                                isDark ? 'text-zinc-500 group-hover:text-amber-400' : 'text-zinc-400 group-hover:text-red-700'
                                            }`} />
                                            {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                                        </div>
                                        {!sidebarCollapsed && (
                                            <Globe className="h-3 w-3 text-zinc-500 opacity-60 group-hover:opacity-100" />
                                        )}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. System & Admin Access Nav (Ditaruh di Bagian Bawah) */}
                    <div className="space-y-1 pt-2 border-t border-zinc-200 dark:border-zinc-800/60">
                        {!sidebarCollapsed && (
                            <span className={`px-3 text-[10px] font-bold uppercase tracking-wider ${
                                isDark ? 'text-zinc-500' : 'text-zinc-400'
                            }`}>
                                Pengaturan & Akses
                            </span>
                        )}
                        <div className="mt-1.5 space-y-1">
                            {systemNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative group ${
                                            sidebarCollapsed ? 'justify-center' : ''
                                        } ${
                                            item.active
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 shadow-md shadow-red-950/40'
                                                : isDark
                                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar Desktop Collapse Toggle Button */}
                <div className={`hidden md:flex items-center justify-center p-2 border-t relative group shrink-0 ${
                    isDark ? 'border-zinc-800 bg-zinc-950/50' : 'border-zinc-200 bg-zinc-50'
                }`}>
                    <button
                        onClick={toggleSidebarCollapse}
                        title={sidebarCollapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
                        className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer w-full justify-center ${
                            isDark
                                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                        }`}
                    >
                        {sidebarCollapsed ? (
                            <PanelLeftOpen className="h-4 w-4 text-amber-400" />
                        ) : (
                            <>
                                <PanelLeftClose className="h-4 w-4" />
                                <span className="text-[11px]">Sembunyikan Sidebar</span>
                            </>
                        )}
                    </button>

                    {/* Tooltip for toggle button when collapsed */}
                    {sidebarCollapsed && (
                        <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                            <span>Buka Sidebar</span>
                        </div>
                    )}
                </div>

                {/* Admin User Footer & Logout */}
                <div className={`p-3.5 border-t space-y-2.5 relative shrink-0 ${
                    isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
                }`}>
                    <div
                        title={sidebarCollapsed ? `${currentUser.name} (@${currentUser.username || 'admin'})` : undefined}
                        className={`flex items-center gap-3 px-2 py-1.5 rounded-xl group relative ${
                            sidebarCollapsed ? 'justify-center cursor-pointer' : ''
                        }`}
                    >
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-b from-red-800 to-red-950 border border-red-700 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0 shadow-sm">
                            {currentUser.name.charAt(0)}
                        </div>
                        {!sidebarCollapsed && (
                            <div className="min-w-0 flex-1">
                                <p className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                                    {currentUser.name}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="font-mono text-[10px] text-amber-500 font-bold">
                                        @{currentUser.username || 'admin'}
                                    </span>
                                    <span className="inline-block px-1.5 py-0.2 rounded text-[8px] font-semibold bg-amber-400/10 text-amber-500 border border-amber-400/20 uppercase tracking-wider">
                                        {currentUser.role}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Tooltip for avatar in collapsed mode */}
                        {sidebarCollapsed && (
                            <div className="hidden group-hover:flex flex-col absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                <span>{currentUser.name}</span>
                                <span className="text-[10px] text-amber-400 font-mono">@{currentUser.username || 'admin'} ({currentUser.role})</span>
                            </div>
                        )}
                    </div>

                    <div className="relative group">
                        <button
                            onClick={handleLogout}
                            title={sidebarCollapsed ? 'Keluar Sistem' : undefined}
                            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:text-red-400 transition-all cursor-pointer ${
                                isDark
                                    ? 'bg-red-950/25 hover:bg-red-950/50 border border-red-900/40'
                                    : 'bg-red-50 hover:bg-red-100 border border-red-200'
                            }`}
                        >
                            <LogOut className="h-3.5 w-3.5 shrink-0" />
                            {!sidebarCollapsed && <span>Keluar Sistem</span>}
                        </button>

                        {/* Tooltip for logout in collapsed mode */}
                        {sidebarCollapsed && (
                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-zinc-900 text-red-400 text-xs font-bold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                <span>Keluar Sistem</span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* ========================================================= */}
            {/* MAIN CONTENT AREA */}
            {/* ========================================================= */}
            <div className={`flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 ${
                sidebarCollapsed ? 'md:ml-20' : 'md:ml-64 lg:ml-72'
            }`}>
                {/* Topbar Header (Sinkron & Sejajar Siluet Batik dgn Sidebar Brand Header) */}
                <header className={`h-16 border-b px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300 relative shrink-0 ${
                    isDark
                        ? 'bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-zinc-800'
                        : 'bg-gradient-to-r from-white via-white to-slate-50 border-zinc-200 shadow-xs'
                }`}>
                    {/* Siluet Batik Parang Sinkron & Sejajar */}
                    <div
                        className={`absolute inset-0 pointer-events-none bg-repeat transition-opacity duration-300 ${
                            isDark ? 'opacity-20' : 'opacity-15'
                        }`}
                        style={{
                            backgroundImage: `url("${currentBatik}")`,
                            backgroundSize: '80px 80px',
                            backgroundPosition: '0 0',
                        }}
                    />
                    <div className={`absolute inset-0 pointer-events-none ${
                        isDark
                            ? 'bg-gradient-to-r from-red-950/40 via-transparent to-black/30'
                            : 'bg-gradient-to-r from-red-100/25 via-transparent to-transparent'
                    }`} />

                    {/* Left: Mobile Toggle & Breadcrumb */}
                    <div className="relative z-10 flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className={`md:hidden p-2 rounded-xl transition-colors ${
                                isDark
                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                            }`}
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <button
                            onClick={toggleSidebarCollapse}
                            title={sidebarCollapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
                            className={`hidden md:inline-flex p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isDark
                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                            }`}
                        >
                            {sidebarCollapsed ? (
                                <PanelLeftOpen className="h-4 w-4 text-amber-400" />
                            ) : (
                                <PanelLeftClose className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    {/* Right: Actions (Theme Toggle, Notifications Bell, Web Preview, Profile) */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                        {/* 1. Theme Toggle (Dark / Light) */}
                        <button
                            onClick={toggleTheme}
                            title={isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
                            className={`p-2 rounded-xl transition-all cursor-pointer border ${
                                isDark
                                    ? 'bg-zinc-800/80 border-zinc-700 text-amber-400 hover:bg-zinc-700'
                                    : 'bg-zinc-100 border-zinc-200 text-indigo-600 hover:bg-zinc-200'
                            }`}
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 transform hover:rotate-45 transition-transform" />
                            ) : (
                                <Moon className="h-4 w-4 transform hover:-rotate-12 transition-transform" />
                            )}
                        </button>

                        {/* 2. Log Activity Notification Bell with Interactive Dropdown */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(!notifOpen)}
                                title="Catatan Audit Keamanan & Notifikasi"
                                className={`p-2 rounded-xl transition-all relative cursor-pointer border ${
                                    isDark
                                        ? 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700'
                                        : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200'
                                }`}
                            >
                                <Bell className="h-4 w-4" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-600 text-white font-black text-[9px] rounded-full flex items-center justify-center border-2 border-zinc-900 animate-pulse">
                                        {notifications.length > 9 ? '9+' : notifications.length}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown Modal/Pop-over */}
                            {notifOpen && (
                                <div className={`absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden ${
                                    isDark
                                        ? 'bg-zinc-900/98 backdrop-blur-md border-zinc-800 text-zinc-100 shadow-black/90'
                                        : 'bg-white/98 backdrop-blur-md border-zinc-200 text-zinc-900 shadow-2xl'
                                }`}>
                                    {/* Header */}
                                    <div className={`p-3.5 border-b flex items-center justify-between ${
                                        isDark
                                            ? 'border-zinc-800/80 bg-gradient-to-r from-red-950/60 to-zinc-900'
                                            : 'border-zinc-200 bg-gradient-to-r from-red-50/70 to-slate-50'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-amber-500" />
                                            <span className="text-xs font-bold">Log Aktivitas & Keamanan</span>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-400/10 text-amber-500 border border-amber-400/20">
                                            {notifications.length} Catatan
                                        </span>
                                    </div>

                                    {/* Logs List */}
                                    <div className={`max-h-80 overflow-y-auto divide-y custom-scrollbar ${
                                        isDark ? 'divide-zinc-800/50' : 'divide-zinc-100'
                                    }`}>
                                        {notifications.length === 0 ? (
                                            <div className="p-6 text-center text-xs text-zinc-500">
                                                Belum ada catatan aktivitas baru.
                                            </div>
                                        ) : (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    className={`p-3 flex items-start gap-3 transition-colors ${
                                                        isDark ? 'hover:bg-zinc-800/50' : 'hover:bg-red-50/30'
                                                    }`}
                                                >
                                                    <div className="mt-0.5">
                                                        {getLogIcon(notif.action)}
                                                    </div>
                                                    <div className="min-w-0 flex-1 space-y-0.5">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <span className={`text-xs font-bold truncate ${
                                                                isDark ? 'text-zinc-100' : 'text-zinc-900'
                                                            }`}>
                                                                {getLogTitle(notif.action)}
                                                            </span>
                                                            <span className="text-[10px] text-zinc-500 shrink-0">
                                                                {formatTimeAgo(notif.created_at)}
                                                            </span>
                                                        </div>
                                                        <p className={`text-[11px] leading-snug line-clamp-2 ${
                                                            isDark ? 'text-zinc-400' : 'text-zinc-600'
                                                        }`}>
                                                            {notif.details || `Aktivitas dilakukan oleh @${notif.username}`}
                                                        </p>
                                                        <div className="flex items-center gap-2 pt-0.5 text-[10px] text-zinc-500 font-mono">
                                                            <span>IP: {notif.ip_address}</span>
                                                            <span>&bull;</span>
                                                            <span>@{notif.username}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className={`p-2.5 text-center border-t ${
                                        isDark ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50'
                                    }`}>
                                        <Link
                                            href={`/${adminPath}/profile`}
                                            onClick={() => setNotifOpen(false)}
                                            className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors block py-1"
                                        >
                                            Buka Semua Riwayat Audit Lengkap &rarr;
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. Open Public Web Link */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                                isDark
                                    ? 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border-zinc-700'
                                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 border-zinc-200'
                            }`}
                        >
                            <Globe className="h-3.5 w-3.5" />
                            <span>Buka Web Desa</span>
                        </a>

                        {/* 4. Topbar Profile Link */}
                        <Link
                            href={`/${adminPath}/profile`}
                            className={`flex items-center gap-2 px-2.5 py-1 rounded-xl transition-colors ${
                                isDark ? 'hover:bg-zinc-800/80' : 'hover:bg-zinc-200/60'
                            }`}
                        >
                            <div className="h-7 w-7 rounded-lg bg-gradient-to-b from-red-700 to-red-900 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-400/30 shrink-0 shadow-xs">
                                {currentUser.name.charAt(0)}
                            </div>
                            <span className={`text-xs font-bold hidden md:inline truncate max-w-[120px] ${
                                isDark ? 'text-zinc-200' : 'text-zinc-800'
                            }`}>
                                {currentUser.name}
                            </span>
                        </Link>
                    </div>
                </header>

                {/* Floating Top-Right Toast Notification (Auto-dismiss & Manual Close) */}
                {toast && (
                    <div
                        className={`fixed top-5 right-5 z-[9999] max-w-sm sm:max-w-md flex items-center justify-between gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${
                            toast.type === 'success'
                                ? isDark
                                    ? 'bg-emerald-950/95 border-emerald-800/90 text-emerald-200 shadow-emerald-950/50'
                                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-emerald-900/10'
                                : isDark
                                    ? 'bg-red-950/95 border-red-800/90 text-red-200 shadow-red-950/50'
                                    : 'bg-red-50 border-red-300 text-red-900 shadow-red-900/10'
                        }`}
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            {toast.type === 'success' ? (
                                <CheckCircle2 className={`h-4 w-4 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            ) : (
                                <AlertCircle className={`h-4 w-4 shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                            )}
                            <span className="text-xs font-semibold leading-snug">
                                {toast.message}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            title="Tutup Notifikasi"
                            className={`p-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                                toast.type === 'success'
                                    ? isDark
                                        ? 'text-emerald-400 hover:text-emerald-200 hover:bg-emerald-900/60'
                                        : 'text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100'
                                    : isDark
                                        ? 'text-red-400 hover:text-red-200 hover:bg-red-900/60'
                                        : 'text-red-700 hover:text-red-950 hover:bg-red-100'
                            }`}
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
