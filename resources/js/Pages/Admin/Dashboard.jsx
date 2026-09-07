import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatDateIndo } from '../../Utils/format';
import {
    FileText,
    Newspaper,
    Sparkles,
    MessageSquare,
    Users,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    TrendingUp,
    Shield,
    ExternalLink,
    Printer,
    ChevronRight,
    Activity,
    PieChart,
    BarChart3,
    AlertCircle,
    PlusCircle,
    Globe,
    Award,
    Calendar,
    CheckSquare,
    Zap,
    Lock,
    UserCheck,
    Check,
    Coins,
} from 'lucide-react';

export default function Dashboard({
    stats = {},
    demographics = {},
    monthlyTrend = [],
    recentLetters = [],
    recentPosts = [],
    recentActivities = [],
}) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';
    const currentUser = props?.auth?.user || { name: 'Administrator', username: 'admin', role: 'Superadmin' };

    // State for interactive chart tooltip
    const [hoveredMonth, setHoveredMonth] = useState(null);

    // Dynamic greeting based on current hour
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 4 && hour < 11) return 'Selamat Pagi';
        if (hour >= 11 && hour < 15) return 'Selamat Siang';
        if (hour >= 15 && hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    // Format current date in Indonesian
    const todayFormatted = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());

    // Relative time helper for activity logs
    const timeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffSecs = Math.floor((now - date) / 1000);
        if (diffSecs < 60) return 'Baru saja';
        const diffMins = Math.floor(diffSecs / 60);
        if (diffMins < 60) return `${diffMins} mnt lalu`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} jam lalu`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 30) return `${diffDays} hari lalu`;
        return formatDateIndo(dateString);
    };

    // Demographics data with safe fallbacks
    const totalCitizens = demographics.total_citizens || 3482;
    const maleCitizens = demographics.male_citizens || 1724;
    const femaleCitizens = demographics.female_citizens || 1758;
    const totalFamilies = demographics.total_families || 985;
    const productivePercent = demographics.productive_age_percent || 66.5;

    // SVG Donut calculation for Demographics
    const donutRadius = 42;
    const circumference = 2 * Math.PI * donutRadius; // ~263.89
    const malePercent = (maleCitizens / totalCitizens) * 100;
    const femalePercent = (femaleCitizens / totalCitizens) * 100;
    const maleDash = (malePercent / 100) * circumference;
    const femaleDash = (femalePercent / 100) * circumference;

    // KPI Stat cards configuration
    const statCards = [
        {
            title: 'Permohonan Surat',
            value: stats.total_letters || 0,
            badge: `${stats.pending_letters || 0} Perlu Verifikasi`,
            badgeColor: stats.pending_letters > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
            icon: FileText,
            iconBg: 'bg-red-50 text-red-600 border border-red-100',
            link: '/layanan/lacak',
        },
        {
            title: 'Berita & Publikasi',
            value: stats.total_posts || 0,
            badge: 'Publikasi Aktif',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            icon: Newspaper,
            iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
            link: '/berita',
        },
        {
            title: 'Potensi & UMKM',
            value: stats.total_potentials || 0,
            badge: 'Direktori Warga',
            badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
            icon: Sparkles,
            iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
            link: '/potensi',
        },
        {
            title: 'Aspirasi Masuk',
            value: stats.total_feedbacks || 0,
            badge: 'Kritik & Saran',
            badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
            icon: MessageSquare,
            iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
            link: `/${adminPath}/settings/feedbacks`,
        },
    ];

    // Status badge formatter
    const getStatusBadge = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'menunggu' || s === 'pending') {
            return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Menunggu</span>;
        }
        if (s === 'diproses' || s === 'processing') {
            return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Diproses</span>;
        }
        if (s === 'selesai' || s === 'completed' || s === 'siap_diambil' || s === 'bisa_diambil' || s === 'ready') {
            return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Selesai</span>;
        }
        if (s === 'ditolak' || s === 'rejected') {
            return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">Ditolak</span>;
        }
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">{status}</span>;
    };

    // Calculate max value for chart scaling
    const trendMax = Math.max(...monthlyTrend.map((d) => d.total || 0), 6);

    return (
        <AdminLayout title="Dashboard">
            {/* 2-Column Responsive Layout: Left Main Column (9/12) & Right Info Rail (3/12) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4.5 items-start">
                {/* ========================================================= */}
                {/* LEFT MAIN COLUMN (Width ~75%) */}
                {/* ========================================================= */}
                <div className="xl:col-span-9 space-y-4 sm:space-y-4.5">
                    {/* 1. Welcome Banner (Merah, Hitam, Kuning dengan Siluet Batik & Logo Desa) */}
                    <div className="relative rounded-lg bg-gradient-to-br from-red-700 via-red-800 to-red-950 border border-red-500/40 shadow-xl overflow-hidden p-5 sm:px-6 sm:py-5.5 text-white">
                        {/* Batik Kawung Traditional SVG Pattern Overlay */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <pattern id="batik-kawung" width="60" height="60" patternUnits="userSpaceOnUse">
                                    <circle cx="30" cy="30" r="16" fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
                                    <ellipse cx="30" cy="14" rx="9" ry="14" fill="none" stroke="#fecaca" strokeWidth="1" opacity="0.4" />
                                    <ellipse cx="30" cy="46" rx="9" ry="14" fill="none" stroke="#fecaca" strokeWidth="1" opacity="0.4" />
                                    <ellipse cx="14" cy="30" rx="14" ry="9" fill="none" stroke="#fecaca" strokeWidth="1" opacity="0.4" />
                                    <ellipse cx="46" cy="30" rx="14" ry="9" fill="none" stroke="#fecaca" strokeWidth="1" opacity="0.4" />
                                    <circle cx="30" cy="30" r="3" fill="#fde047" opacity="0.4" />
                                    <circle cx="0" cy="0" r="3" fill="#fde047" opacity="0.4" />
                                    <circle cx="60" cy="0" r="3" fill="#fde047" opacity="0.4" />
                                    <circle cx="0" cy="60" r="3" fill="#fde047" opacity="0.4" />
                                    <circle cx="60" cy="60" r="3" fill="#fde047" opacity="0.4" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#batik-kawung)" />
                        </svg>

                        {/* Ambient Glows */}
                        <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-500/30 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 right-20 w-64 h-64 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />

                        {/* Content: Text on Left, Village Logo on Right */}
                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                            <div className="flex-1 min-w-0 space-y-2.5">
                                {/* Top Kicker: Clean typography without badge frame */}
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 tracking-wide">
                                    <Shield className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                    <span>Pusat Kendali Administrasi Digital</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                </div>

                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                    Selamat Datang di Portal Admin{' '}
                                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                                        Desa Karangwungu
                                    </span>
                                </h1>

                                <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed font-normal max-w-2xl">
                                    Kelola permohonan surat warga, arsip publikasi kegiatan, dan transparansi pemerintahan desa secara terpadu, aman, dan transparan.
                                </p>

                                {/* Meta indicators: Clean typography with subtle divider without badge frame */}
                                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-red-100/90 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-amber-300" />
                                        <span>{todayFormatted}</span>
                                    </div>
                                    <span className="text-red-300/40">&bull;</span>
                                    <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span>Sistem Terintegrasi Online</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Village Logo (Directly without frame div) */}
                            <div className="shrink-0 flex flex-col items-center justify-center text-center">
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Logo Desa Karangwungu"
                                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform"
                                />
                                <div className="mt-1.5 text-center">
                                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block drop-shadow-xs">
                                        Desa Karangwungu
                                    </span>
                                    <span className="text-[9px] text-red-100 font-medium block">
                                        Kec. Karangdowo, Klaten
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stat KPI Cards Grid (4 Cards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {statCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={card.link}
                                    className="p-3.5 sm:p-4 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between space-y-2.5"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-zinc-500 truncate">
                                            {card.title}
                                        </span>
                                        <div className={`p-2 rounded-lg ${card.iconBg} group-hover:scale-110 transition-transform`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-zinc-900 tracking-tight">
                                            {card.value}
                                        </div>
                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${card.badgeColor}`}>
                                            {card.badge}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3. Charts & Analytics Grid (Bar Chart & Service Efficiency Gauge) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Chart 1: Tren Layanan Surat 6 Bulan Terakhir (8 of 12) */}
                        <div className="lg:col-span-7 rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div>
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-red-600" />
                                        <span>Tren Permohonan Surat</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Volume pelayanan 6 bulan terakhir
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
                                        <span className="text-zinc-600 font-medium">Selesai</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-xs bg-amber-500" />
                                        <span className="text-zinc-600 font-medium">Diproses</span>
                                    </div>
                                </div>
                            </div>

                            {/* SVG Bar Chart */}
                            <div className="relative pt-1">
                                <div className="h-40 flex items-end justify-between gap-3 px-2 border-b border-zinc-200 pb-2">
                                    {monthlyTrend.map((item, i) => {
                                        const total = item.total || 0;
                                        const completed = item.completed || 0;
                                        const pending = (item.pending || 0) + (item.rejected || 0);

                                        // Height percentages (min 8% for visibility)
                                        const totalHeightPct = total > 0 ? Math.max((total / trendMax) * 100, 14) : 8;
                                        const completedHeightPct = total > 0 ? (completed / total) * 100 : 50;

                                        const isHovered = hoveredMonth === i;

                                        return (
                                            <div
                                                key={i}
                                                className="flex-1 flex flex-col items-center h-full justify-end group/bar cursor-pointer"
                                                onMouseEnter={() => setHoveredMonth(i)}
                                                onMouseLeave={() => setHoveredMonth(null)}
                                            >
                                                {/* Tooltip on hover */}
                                                {isHovered && (
                                                    <div className="absolute -top-7 px-2 py-1 rounded-md bg-zinc-900 text-white text-[10px] font-semibold shadow-lg whitespace-nowrap z-20 pointer-events-none animate-in fade-in zoom-in-95">
                                                        {item.month}: {completed} Selesai, {pending} Proses
                                                    </div>
                                                )}

                                                {/* Stacked Bar Container */}
                                                <div
                                                    style={{ height: `${totalHeightPct}%` }}
                                                    className="w-full max-w-[32px] rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover/bar:brightness-110 shadow-xs"
                                                >
                                                    {/* Pending portion (top) */}
                                                    {pending > 0 && (
                                                        <div
                                                            style={{ height: `${100 - completedHeightPct}%` }}
                                                            className="w-full bg-amber-400"
                                                            title={`Proses: ${pending}`}
                                                        />
                                                    )}
                                                    {/* Completed portion (bottom) */}
                                                    <div
                                                        style={{ height: `${completedHeightPct}%` }}
                                                        className={`w-full ${total > 0 ? 'bg-emerald-500' : 'bg-zinc-200'}`}
                                                        title={`Selesai: ${completed}`}
                                                    />
                                                </div>

                                                {/* Month Label */}
                                                <span className={`text-[11px] font-semibold mt-1.5 transition-colors ${
                                                    isHovered ? 'text-red-600 font-bold' : 'text-zinc-500'
                                                }`}>
                                                    {item.month}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 px-1">
                                    <span>Skala otomatis berdasarkan arsip sistem</span>
                                    <span className="font-semibold text-zinc-600">Total Periode: {stats.total_letters || 0} Pengajuan</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart 2: Indeks & Efisiensi Pelayanan Desa (5 of 12) */}
                        <div className="lg:col-span-5 rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                            <div className="border-b border-zinc-100 pb-2.5">
                                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                    <Award className="h-4 w-4 text-amber-500" />
                                    <span>Kinerja Layanan Desa</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Kepatuhan SOP & kecepatan respon
                                </p>
                            </div>

                            {/* Gauge / Score Display */}
                            <div className="flex flex-col items-center justify-center py-1">
                                <div className="relative flex items-center justify-center">
                                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="transparent"
                                            stroke="#f4f4f5"
                                            strokeWidth="8"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="transparent"
                                            stroke="#10b981"
                                            strokeWidth="8"
                                            strokeDasharray="251.2"
                                            strokeDashoffset="25.12"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center justify-center text-center">
                                        <span className="text-xl font-black text-zinc-900">96.8%</span>
                                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Kategori Prima</span>
                                    </div>
                                </div>
                            </div>

                            {/* Service Benchmarks */}
                            <div className="space-y-1.5 pt-1.5 border-t border-zinc-100 text-xs">
                                <div className="flex items-center justify-between text-zinc-600">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                        <span>Rata-rata Respon</span>
                                    </span>
                                    <span className="font-bold text-zinc-900">&lt; 24 Jam</span>
                                </div>
                                <div className="flex items-center justify-between text-zinc-600">
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                        <span>Penyelesaian Surat</span>
                                    </span>
                                    <span className="font-bold text-emerald-600">{stats.completed_letters || 0} Terverifikasi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Permohonan Surat Masuk Terbaru (Tabel) */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                            <div>
                                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-red-600" />
                                    <span>Permohonan Surat Terbaru</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Pengajuan surat mandiri yang masuk dari warga
                                </p>
                            </div>
                            <a
                                href="/layanan/lacak"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lacak Surat</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        {recentLetters.length === 0 ? (
                            <div className="py-8 text-center text-xs text-zinc-400">
                                Belum ada permohonan surat masuk.
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-100">
                                {recentLetters.map((letter) => (
                                    <div key={letter.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                                        <div className="min-w-0">
                                            <p className="font-bold text-zinc-900 truncate">
                                                {letter.citizen_name}
                                            </p>
                                            <p className="text-zinc-500 text-[11px] truncate mt-0.5">
                                                {letter.letter_type} &bull;{' '}
                                                <span className="text-red-700 font-mono font-semibold">
                                                    {letter.tracking_code}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-2.5">
                                            <a
                                                href={`/layanan/surat/pdf/${letter.tracking_code}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                title="Cetak PDF Format Resmi"
                                                className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition-colors"
                                            >
                                                <Printer className="h-3.5 w-3.5 text-red-600" />
                                            </a>
                                            <div className="flex flex-col items-end gap-1">
                                                {getStatusBadge(letter.status)}
                                                <span className="text-[10px] text-zinc-400">
                                                    {formatDateIndo(letter.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 5. Publikasi Berita Desa Terbaru */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                            <div>
                                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-amber-500" />
                                    <span>Publikasi Berita & Pengumuman Terbaru</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Arsip artikel informasi dan kegiatan desa
                                </p>
                            </div>
                            <a
                                href="/berita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Semua</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        {recentPosts.length === 0 ? (
                            <div className="py-6 text-center text-xs text-zinc-400">
                                Belum ada publikasi berita.
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-100">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                                        <div className="min-w-0">
                                            <p className="font-bold text-zinc-900 truncate hover:text-red-700 transition-colors">
                                                {post.title}
                                            </p>
                                            <p className="text-zinc-500 text-[11px] mt-0.5">
                                                Kategori:{' '}
                                                <span className="text-amber-700 font-semibold">{post.category}</span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-[10px] text-zinc-400 block">
                                                {formatDateIndo(post.created_at)}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 font-medium">
                                                {post.views || 0} dibaca
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ========================================================= */}
                {/* RIGHT SIDEBAR / RAIL COLUMN (Width ~25%) */}
                {/* ========================================================= */}
                <div className="xl:col-span-3 space-y-4 sm:space-y-4.5">
                    {/* Widget 1: Status Petugas & Operasional Hari Ini */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8.5 w-8.5 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-1 ring-black/5 shrink-0">
                                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="min-w-0 flex-1 leading-tight">
                                <span className="text-[10px] font-semibold text-zinc-400 block truncate">
                                    {getGreeting()},
                                </span>
                                <h3 className="text-xs font-bold text-zinc-900 truncate">
                                    {currentUser.name}
                                </h3>
                                <span className="text-[10px] text-red-700 font-medium capitalize block truncate">
                                    {currentUser.role || 'Administrator'}
                                </span>
                            </div>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                Aktif
                            </span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-zinc-600 gap-1 text-[11px]">
                                <span className="text-zinc-500">Jam Layanan:</span>
                                <span className="font-semibold text-zinc-900">08:00 - 15:00 WIB</span>
                            </div>
                            <div className="flex items-center justify-between text-zinc-600 gap-1 text-[11px]">
                                <span className="text-zinc-500">Loket Digital:</span>
                                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    24 Jam Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Widget 2: Demografi Warga (Donut Chart seperti Referensi 2) */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                        <div className="border-b border-zinc-100 pb-2.5">
                            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                <PieChart className="h-4 w-4 text-blue-600" />
                                <span>Demografi Kependudukan</span>
                            </h3>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Distribusi warga Desa Karangwungu
                            </p>
                        </div>

                        {/* Donut Chart SVG */}
                        <div className="flex items-center justify-center py-1">
                            <div className="relative flex items-center justify-center">
                                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                                    {/* Base track */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={donutRadius}
                                        fill="transparent"
                                        stroke="#f4f4f5"
                                        strokeWidth="10"
                                    />
                                    {/* Male Segment (Blue) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={donutRadius}
                                        fill="transparent"
                                        stroke="#3b82f6"
                                        strokeWidth="10"
                                        strokeDasharray={`${maleDash} ${circumference}`}
                                        strokeDashoffset="0"
                                    />
                                    {/* Female Segment (Rose/Red) */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={donutRadius}
                                        fill="transparent"
                                        stroke="#f43f5e"
                                        strokeWidth="10"
                                        strokeDasharray={`${femaleDash} ${circumference}`}
                                        strokeDashoffset={`-${maleDash}`}
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center text-center">
                                    <span className="text-sm font-black text-zinc-900">
                                        {totalCitizens.toLocaleString('id-ID')}
                                    </span>
                                    <span className="text-[9px] text-zinc-400 font-medium">
                                        Total Warga
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Demography Legend & Numbers */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                                    <span className="text-[11px] font-semibold text-blue-900">Laki-Laki</span>
                                </div>
                                <div className="text-sm font-black text-blue-950 mt-0.5">
                                    {maleCitizens.toLocaleString('id-ID')}
                                </div>
                                <span className="text-[10px] text-blue-600 font-medium">
                                    {malePercent.toFixed(1)}%
                                </span>
                            </div>

                            <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-100">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                                    <span className="text-[11px] font-semibold text-rose-900">Perempuan</span>
                                </div>
                                <div className="text-sm font-black text-rose-950 mt-0.5">
                                    {femaleCitizens.toLocaleString('id-ID')}
                                </div>
                                <span className="text-[10px] text-rose-600 font-medium">
                                    {femalePercent.toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        {/* Additional Metrics: KK & Usia Produktif */}
                        <div className="pt-1.5 border-t border-zinc-100 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-zinc-600">
                                <span className="text-zinc-500">Jumlah Kepala Keluarga:</span>
                                <span className="font-bold text-zinc-900">{totalFamilies} KK</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-zinc-500">Usia Produktif (15-64 th):</span>
                                    <span className="font-bold text-emerald-600">{productivePercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                    <div
                                        style={{ width: `${productivePercent}%` }}
                                        className="h-full bg-emerald-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Widget 3: Pintasan Cepat (Quick Actions) */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-2.5 shadow-xs">
                        <div className="border-b border-zinc-100 pb-2">
                            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-amber-500" />
                                <span>Pintasan Cepat Pelayanan</span>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 gap-1.5 text-xs">
                            <Link
                                href={`/${adminPath}/posts`}
                                className="p-2 rounded-lg border border-zinc-200 hover:border-red-300 hover:bg-red-50/50 transition-all flex items-center justify-between gap-2 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <PlusCircle className="h-4 w-4 text-red-600 shrink-0" />
                                    <span className="font-semibold text-zinc-800 group-hover:text-red-700 truncate text-[11.5px]">
                                        Buat Berita / Pengumuman
                                    </span>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                            </Link>

                            <a
                                href="/layanan/lacak"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all flex items-center justify-between gap-2 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <CheckSquare className="h-4 w-4 text-amber-600 shrink-0" />
                                    <span className="font-semibold text-zinc-800 group-hover:text-amber-700 truncate text-[11.5px]">
                                        Verifikasi Permohonan Surat
                                    </span>
                                </div>
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                            </a>

                            <Link
                                href={`/${adminPath}/apbdes`}
                                className="p-2 rounded-lg border border-zinc-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-center justify-between gap-2 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <Coins className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span className="font-semibold text-zinc-800 group-hover:text-emerald-700 truncate text-[11.5px]">
                                        Transparansi APBDes
                                    </span>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                            </Link>

                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg border border-zinc-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-center justify-between gap-2 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <Globe className="h-4 w-4 text-blue-600 shrink-0" />
                                    <span className="font-semibold text-zinc-800 group-hover:text-blue-700 truncate text-[11.5px]">
                                        Kunjungi Web Publik Desa
                                    </span>
                                </div>
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                            </a>
                        </div>
                    </div>

                    {/* Widget 4: Log Aktivitas Administrator Terbaru (Recent Activity Feed) */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-2.5 shadow-xs">
                        <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                            <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-zinc-600" />
                                <span>Aktivitas Sistem Terkini</span>
                            </h3>
                            <span className="text-[10px] text-zinc-400">Live Audit</span>
                        </div>

                        {recentActivities.length === 0 ? (
                            <div className="py-4 text-center text-xs text-zinc-400">
                                Belum ada riwayat aktivitas tercatat.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recentActivities.map((act) => (
                                    <div key={act.id} className="flex items-start gap-2.5 text-xs">
                                        <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0 mt-0.5">
                                            {act.action?.includes('login') ? (
                                                <Lock className="h-3 w-3 text-emerald-600" />
                                            ) : act.action?.includes('logout') ? (
                                                <Activity className="h-3 w-3 text-zinc-400" />
                                            ) : (
                                                <CheckCircle2 className="h-3 w-3 text-blue-600" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-zinc-800 truncate">
                                                {act.details || act.action}
                                            </p>
                                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-0.5">
                                                <span className="font-mono text-zinc-500">@{act.username}</span>
                                                <span>&bull;</span>
                                                <span>{timeAgo(act.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
