import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import {
    Home,
    LayoutDashboard,
    Users,
    UserCheck,
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
    PanelLeftClose,
    PanelLeftOpen,
    RefreshCw,
    Sliders,
    Building2,
    Compass,
    Target,
    BarChart3,
    Landmark,
    Newspaper,
    Scale,
    FileText,
} from 'lucide-react';



export default function AdminLayout({ children, title = 'Panel Administrator', breadcrumbs }) {
    const { url, props } = usePage();
    const { auth, flash, admin_path } = props || {};
    const adminPath = admin_path || 'admin-karangwungu';

    // State 1: Mobile sidebar drawer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State 2: Desktop sidebar collapsed (buka-tutup)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('admin_sidebar_collapsed') === 'true';
        }
        return false;
    });

    // Ensure admin backend is always pure white / light mode (no theme toggle)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('admin_theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }, []);

    // Toggle Desktop Sidebar
    const toggleSidebarCollapse = () => {
        const nextState = !sidebarCollapsed;
        setSidebarCollapsed(nextState);
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_sidebar_collapsed', String(nextState));
        }
    };

    const handleLogout = () => {
        router.post(`/${adminPath}/logout`);
    };

    // Toast Flash Notification
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
            name: 'Dashboard',
            href: `/${adminPath}/settings/dashboard`,
            icon: Sliders,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/dashboard`) : false,
        },
        {
            name: 'Umum',
            href: `/${adminPath}/settings/general`,
            icon: Building2,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/general`) : false,
        },
        {
            name: 'Gambaran Umum',
            href: `/${adminPath}/settings/overview`,
            icon: Compass,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/overview`) : false,
        },
        {
            name: 'Visi & Kepemimpinan',
            href: `/${adminPath}/settings/vision-mission`,
            icon: Target,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/vision-mission`) : false,
        },
        {
            name: 'Perangkat Desa',
            href: `/${adminPath}/settings/officials`,
            icon: UserCheck,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/officials`) : false,
        },
        {
            name: 'Demografi',
            href: `/${adminPath}/settings/demographics`,
            icon: BarChart3,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/demographics`) : false,
        },
        {
            name: 'Lembaga Desa',
            href: `/${adminPath}/settings/organizations`,
            icon: Users,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/organizations`) : false,
        },
        {
            name: 'Fasilitas Umum',
            href: `/${adminPath}/settings/facilities`,
            icon: Landmark,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/facilities`) : false,
        },
        {
            name: 'Potensi & UMKM',
            href: `/${adminPath}/settings/potentials`,
            icon: Sparkles,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/potentials`) : false,
        },
        {
            name: 'Galeri Foto',
            href: `/${adminPath}/settings/gallery`,
            icon: Image,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/gallery`) : false,
        },
        {
            name: 'Transparansi APBDes',
            href: `/${adminPath}/settings/apbdes`,
            icon: DollarSign,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/apbdes`) : false,
        },
    ];

    const publicationNav = [
        {
            name: 'Permohonan Surat Warga',
            href: `/${adminPath}/settings/letters`,
            icon: FileText,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/letters`) : false,
        },
        {
            name: 'Warta & Berita Desa',
            href: `/${adminPath}/settings/news`,
            icon: Newspaper,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/news`) : false,
        },
        {
            name: 'Aspirasi & Pengaduan Warga',
            href: `/${adminPath}/settings/feedbacks`,
            icon: MessageSquare,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/feedbacks`) : false,
        },
        {
            name: 'Produk Hukum Desa',
            href: `/${adminPath}/settings/legal-products`,
            icon: Scale,
            active: currentUrl ? currentUrl.startsWith(`/${adminPath}/settings/legal-products`) : false,
        },
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

    // Dynamic Intelligent Breadcrumbs Resolver
    const getBreadcrumbs = () => {
        if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
            return breadcrumbs;
        }

        const crumbs = [
            { label: 'Admin', href: `/${adminPath}/dashboard` }
        ];

        // Check matching navigation items across categories
        const navSections = [
            { category: null, items: mainNav },
            { category: 'Konfigurasi', items: websiteConfigNav },
            { category: 'Publikasi & Layanan', items: publicationNav },
            { category: 'Sistem', items: systemNav },
        ];

        let matched = false;
        for (const section of navSections) {
            const activeItem = section.items.find((item) => item.active);
            if (activeItem) {
                if (section.category) {
                    crumbs.push({ label: section.category });
                }
                crumbs.push({ label: activeItem.name });
                matched = true;
                break;
            }
        }

        // Fallback to title if no nav item was marked active
        if (!matched && title && title !== 'Panel Administrator') {
            crumbs.push({ label: title });
        }

        return crumbs;
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-zinc-900 selection:bg-red-600 selection:text-white relative overflow-x-clip">
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
                className={`fixed inset-y-0 left-0 z-50 md:z-30 flex flex-col transition-all duration-300 ease-in-out h-screen bg-white border-r border-zinc-200 shadow-sm ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } ${
                    sidebarCollapsed ? 'w-12' : 'w-60'
                }`}
            >
                {/* Brand Header with Toggle beside Logo */}
                <div className={`relative h-14 border-b border-zinc-200 bg-white overflow-hidden shrink-0 flex items-center ${
                    sidebarCollapsed ? 'justify-center px-0' : 'justify-between px-3'
                }`}>
                    {sidebarCollapsed ? (
                        <button
                            onClick={toggleSidebarCollapse}
                            title="Buka Sidebar"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
                        >
                            <PanelLeftOpen className="h-4 w-4" />
                        </button>
                    ) : (
                        <>
                            <Link
                                href={`/${adminPath}/dashboard`}
                                className="relative z-10 flex items-center gap-2 min-w-0 group"
                            >
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Logo Karangwungu"
                                    className="h-7.5 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-xs"
                                />
                                <div className="min-w-0 leading-tight">
                                    <span className="text-[13px] font-bold tracking-tight text-zinc-900 block truncate">
                                        Panel Admin
                                    </span>
                                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-red-700 block truncate">
                                        Desa Karangwungu
                                    </span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-1 shrink-0">
                                {/* Desktop Sidebar Collapse Toggle Button (Clean Borderless) */}
                                <button
                                    onClick={toggleSidebarCollapse}
                                    title="Ciutkan Sidebar"
                                    className="hidden md:inline-flex p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
                                >
                                    <PanelLeftClose className="h-4 w-4" />
                                </button>

                                {/* Mobile Close Drawer Button */}
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Nav Links (overflow-visible when collapsed so tooltips are never cut off!) */}
                <div className={`flex-1 ${
                    sidebarCollapsed ? 'overflow-visible px-1.5 py-2.5 space-y-2' : 'overflow-y-auto custom-scrollbar px-2.5 py-3 space-y-3.5'
                }`}>
                    {/* 1. Main Admin Nav */}
                    <div className="space-y-0.5">
                        {!sidebarCollapsed && (
                            <span className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                                Menu Utama
                            </span>
                        )}
                        <div className="space-y-0.5">
                            {mainNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center transition-all relative group ${
                                            sidebarCollapsed
                                                ? 'w-8 h-8 aspect-square justify-center mx-auto rounded-lg p-0 shrink-0'
                                                : 'gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium'
                                        } ${
                                            item.active
                                                ? 'bg-red-600 text-white font-semibold shadow-xs shadow-red-600/20'
                                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Konfigurasi Website */}
                    <div className="space-y-0.5">
                        {!sidebarCollapsed && (
                            <span className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                                Konfigurasi Website
                            </span>
                        )}
                        <div className="space-y-0.5">
                            {websiteConfigNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center transition-all relative group ${
                                            sidebarCollapsed
                                                ? 'w-8 h-8 aspect-square justify-center mx-auto rounded-lg p-0 shrink-0'
                                                : 'gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium'
                                        } ${
                                            item.active
                                                ? 'bg-red-600 text-white font-semibold shadow-xs shadow-red-600/20'
                                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Publikasi & Layanan Warga */}
                    <div className="space-y-0.5">
                        {!sidebarCollapsed && (
                            <span className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                                Publikasi & Layanan Warga
                            </span>
                        )}
                        <div className="space-y-0.5">
                            {publicationNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center transition-all relative group ${
                                            sidebarCollapsed
                                                ? 'w-8 h-8 aspect-square justify-center mx-auto rounded-lg p-0 shrink-0'
                                                : 'gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium'
                                        } ${
                                            item.active
                                                ? 'bg-red-600 text-white font-semibold shadow-xs shadow-red-600/20'
                                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4. System & Admin Access Nav */}
                    <div className="space-y-0.5 pt-2 border-t border-zinc-100">
                        {!sidebarCollapsed && (
                            <span className="px-2 text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                                Pengaturan & Akses
                            </span>
                        )}
                        <div className="space-y-0.5">
                            {systemNav.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        title={item.name}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center transition-all relative group ${
                                            sidebarCollapsed
                                                ? 'w-8 h-8 aspect-square justify-center mx-auto rounded-lg p-0 shrink-0'
                                                : 'gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium'
                                        } ${
                                            item.active
                                                ? 'bg-red-600 text-white font-semibold shadow-xs shadow-red-600/20'
                                                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}

                                        {/* Floating Tooltip in Collapsed Mode */}
                                        {sidebarCollapsed && (
                                            <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                                <span>{item.name}</span>
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Admin User Footer & Logout (Clean Modern Card) */}
                <div className={`border-t border-zinc-200/80 bg-zinc-50/40 shrink-0 ${
                    sidebarCollapsed ? 'p-1.5' : 'p-2'
                }`}>
                    {sidebarCollapsed ? (
                        <div className="flex flex-col items-center gap-1.5 py-0.5">
                            <Link
                                href={`/${adminPath}/profile`}
                                className="group relative p-0.5 rounded-lg hover:bg-zinc-200/60 transition-colors"
                                title={`${currentUser.name} (Profil)`}
                            >
                                <div className="relative">
                                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-red-800 via-red-700 to-amber-500 text-amber-100 font-bold text-xs flex items-center justify-center shadow-xs ring-1 ring-amber-400/30">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                                </div>
                                <div className="hidden group-hover:flex flex-col absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                    <span>{currentUser.name}</span>
                                    <span className="text-[9.5px] text-zinc-400">Lihat Profil</span>
                                </div>
                            </Link>

                            <button
                                onClick={handleLogout}
                                title="Keluar Sistem"
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer group relative"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                <div className="hidden group-hover:flex items-center absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1 rounded-md bg-zinc-900 text-red-400 text-xs font-semibold whitespace-nowrap shadow-2xl border border-zinc-700 z-50 pointer-events-none">
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                                    <span>Keluar Sistem</span>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-zinc-200/80 bg-white p-2 shadow-2xs space-y-2">
                            {/* User Profile Info */}
                            <Link
                                href={`/${adminPath}/profile`}
                                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-zinc-50 transition-colors group/user"
                                title="Buka Profil Administrator"
                            >
                                <div className="relative shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-800 via-red-700 to-amber-500 text-amber-100 font-bold text-xs flex items-center justify-center shadow-xs ring-1 ring-amber-400/30 group-hover/user:scale-105 transition-transform">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                                </div>
                                <div className="min-w-0 flex-1 leading-tight">
                                    <p className="text-xs font-semibold text-zinc-900 truncate group-hover/user:text-red-700 transition-colors">
                                        {currentUser.name}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="text-[10px] text-zinc-400 truncate">
                                            @{currentUser.username || 'admin'}
                                        </span>
                                        <span className="text-zinc-300 text-[10px]">•</span>
                                        <span className="text-[10px] font-medium text-zinc-500 capitalize truncate">
                                            {currentUser.role || 'Admin'}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* Clean Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-medium text-zinc-600 hover:text-red-600 bg-zinc-50 hover:bg-red-50/70 border border-zinc-200/70 hover:border-red-200 transition-all cursor-pointer group/btn"
                            >
                                <LogOut className="h-3.5 w-3.5 text-zinc-400 group-hover/btn:text-red-600 transition-colors" />
                                <span>Keluar Sistem</span>
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ========================================================= */}
            {/* MAIN CONTENT AREA */}
            {/* ========================================================= */}
            <div className={`flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-300 bg-white ${
                sidebarCollapsed ? 'md:ml-12' : 'md:ml-60'
            }`}>
                {/* Topbar Header (Clean Full White with Breadcrumbs, No Theme Toggle) */}
                <header className="h-14 border-b border-zinc-200 px-4 sm:px-5 lg:px-6 flex items-center justify-between sticky top-0 z-40 bg-white shadow-xs shrink-0">
                    {/* Left: Mobile Toggle, Desktop Expand Toggle (When Collapsed), & Breadcrumbs Navigation */}
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200 transition-all shadow-xs shrink-0"
                        >
                            <Menu className="h-5 w-5" />
                        </button>


                        {/* Breadcrumbs Navigation */}
                        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs min-w-0">
                            {getBreadcrumbs().map((crumb, idx, arr) => {
                                const isLast = idx === arr.length - 1;
                                return (
                                    <React.Fragment key={idx}>
                                        {idx > 0 && (
                                            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                        )}
                                        {isLast ? (
                                            <span className="font-bold text-zinc-900 truncate max-w-[200px] sm:max-w-[320px]">
                                                {crumb.label}
                                            </span>
                                        ) : crumb.href ? (
                                            <Link
                                                href={crumb.href}
                                                className="font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 hover:underline shrink-0"
                                            >
                                                {idx === 0 && <Home className="h-3.5 w-3.5 text-zinc-400" />}
                                                <span>{crumb.label}</span>
                                            </Link>
                                        ) : (
                                            <span className="font-medium text-zinc-400 shrink-0">
                                                {crumb.label}
                                            </span>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </nav>

                        {/* Mobile Active Page Title */}
                        <span className="sm:hidden font-bold text-xs text-zinc-900 truncate max-w-[150px]">
                            {title}
                        </span>
                    </div>

                    {/* Right: Actions (Buka Web Desa, Profile - Clean Frameless) */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Open Public Web Link */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                        >
                            <Globe className="h-3.5 w-3.5 text-zinc-400" />
                            <span>Buka Web Desa</span>
                        </a>

                        {/* Topbar Profile (Frameless & Clean) */}
                        <Link
                            href={`/${adminPath}/profile`}
                            title="Buka Profil Administrator"
                            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-zinc-100/80 transition-colors group cursor-pointer"
                        >
                            <div className="relative shrink-0">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-red-800 via-red-700 to-amber-500 text-amber-100 flex items-center justify-center font-bold text-xs shadow-xs ring-1 ring-amber-400/30 group-hover:scale-105 transition-transform">
                                    {currentUser.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                            </div>
                            <div className="hidden sm:flex flex-col text-left leading-tight">
                                <span className="text-xs font-semibold text-zinc-900 group-hover:text-red-700 transition-colors truncate max-w-[140px]">
                                    {currentUser.name}
                                </span>
                                <span className="text-[10px] font-medium text-zinc-400 truncate">
                                    Administrator
                                </span>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Floating Top-Right Toast Notification (Auto-dismiss & Manual Close) */}
                {toast && (
                    <div
                        className={`fixed top-5 right-5 z-[9999] max-w-sm sm:max-w-md flex items-center justify-between gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${
                            toast.type === 'success'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-emerald-900/10'
                                : 'bg-red-50 border-red-300 text-red-900 shadow-red-900/10'
                        }`}
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            {toast.type === 'success' ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            ) : (
                                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
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
                                    ? 'text-emerald-700 hover:bg-emerald-100'
                                    : 'text-red-700 hover:bg-red-100'
                            }`}
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 p-3.5 sm:p-4 lg:p-5 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}
