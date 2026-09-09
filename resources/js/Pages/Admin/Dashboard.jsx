import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatDateIndo } from '../../Utils/format';
import {
    FileText,
    Newspaper,
    Sparkles,
    MessageSquare,
    MessageCircle,
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
    Briefcase,
    GraduationCap,
} from 'lucide-react';

export default function Dashboard({
    stats = {},
    demographics = {},
    dailyTrend = [],
    monthlyTrend = [],
    letterTypeDistribution = [],
    pendingLetters = [],
    processingLetters = [],
    completedLetters = [],
    recentLetters = [],
    recentPosts = [],
    recentComments = [],
    recentActivities = [],
}) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'admin-karangwungu';
    const currentUser = props?.auth?.user || { name: 'Administrator', username: 'admin', role: 'Superadmin' };

    // 7-day service trend data
    const serviceTrend = dailyTrend && dailyTrend.length > 0 ? dailyTrend : monthlyTrend;

    // State for interactive chart tooltip
    const [hoveredDay, setHoveredDay] = useState(null);

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

    // State for demographics tab and hover
    const [activeDemoTab, setActiveDemoTab] = useState('gender'); // 'gender' | 'usia' | 'pekerjaan' | 'pendidikan'
    const [hoveredDemoIndex, setHoveredDemoIndex] = useState(null);

    // Demographics data with safe fallbacks
    const totalCitizens = Number(demographics.total_citizens) || 3482;
    const maleCitizens = Number(demographics.male_citizens) || 1724;
    const femaleCitizens = Number(demographics.female_citizens) || 1758;
    const totalFamilies = Number(demographics.total_families) || 985;
    const productivePercent = Number(demographics.productive_age_percent) || 68.3;
    const areaHa = Number(demographics.area_ha) || 123;
    const density = Number(demographics.density) || 2830;

    // Demographic segments based on active tab
    const getDemoSegments = () => {
        if (activeDemoTab === 'usia') {
            const list = demographics.age_groups && demographics.age_groups.length > 0
                ? demographics.age_groups
                : [
                    { label: '0 – 4 Th (Balita)', count: 260, percent: 7.5, male: 132, female: 128 },
                    { label: '5 – 14 Th (Anak-Anak)', count: 540, percent: 15.5, male: 275, female: 265 },
                    { label: '15 – 24 Th (Remaja)', count: 580, percent: 16.7, male: 290, female: 290 },
                    { label: '25 – 54 Th (Produktif)', count: 1510, percent: 43.4, male: 742, female: 768 },
                    { label: '55 – 64 Th (Pra-Lansia)', count: 342, percent: 9.8, male: 165, female: 177 },
                    { label: '65+ Th (Lansia)', count: 250, percent: 7.1, male: 120, female: 130 },
                ];
            const palette = [
                { stroke: '#0284c7', bg: 'bg-sky-500', text: 'text-sky-600' },
                { stroke: '#3b82f6', bg: 'bg-blue-500', text: 'text-blue-600' },
                { stroke: '#6366f1', bg: 'bg-indigo-500', text: 'text-indigo-600' },
                { stroke: '#059669', bg: 'bg-emerald-600', text: 'text-emerald-600' },
                { stroke: '#d97706', bg: 'bg-amber-600', text: 'text-amber-600' },
                { stroke: '#dc2626', bg: 'bg-red-600', text: 'text-red-600' },
            ];
            return list.map((item, idx) => ({
                label: item.label,
                count: Number(item.count) || 0,
                percent: Number(item.percent) || 0,
                color: palette[idx % palette.length],
                extra: item.male ? `${item.male} L / ${item.female} P` : null,
            }));
        }

        if (activeDemoTab === 'pekerjaan') {
            const list = demographics.professions && demographics.professions.length > 0
                ? demographics.professions
                : [
                    { label: 'Petani Sawah / Palawija', count: 1150, percent: 33.0 },
                    { label: 'Petambak Ikan Bandeng & Udang', count: 840, percent: 24.1 },
                    { label: 'Karyawan Swasta & Buruh', count: 520, percent: 14.9 },
                    { label: 'Pelaku UMKM & Pedagang', count: 460, percent: 13.2 },
                    { label: 'Lainnya / Wirausaha & Jasa', count: 400, percent: 11.6 },
                    { label: 'PNS / TNI / Polri / Guru', count: 112, percent: 3.2 },
                ];
            const palette = [
                { stroke: '#16a34a', bg: 'bg-emerald-600', text: 'text-emerald-600' },
                { stroke: '#0284c7', bg: 'bg-sky-600', text: 'text-sky-600' },
                { stroke: '#4f46e5', bg: 'bg-indigo-600', text: 'text-indigo-600' },
                { stroke: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-600' },
                { stroke: '#8b5cf6', bg: 'bg-purple-500', text: 'text-purple-600' },
                { stroke: '#e11d48', bg: 'bg-rose-600', text: 'text-rose-600' },
            ];
            return list.map((item, idx) => ({
                label: item.label,
                count: Number(item.count) || 0,
                percent: Number(item.percent) || 0,
                color: palette[idx % palette.length],
            }));
        }

        if (activeDemoTab === 'pendidikan') {
            const list = demographics.education && demographics.education.length > 0
                ? demographics.education
                : [
                    { label: 'SMA / SMK / MA', count: 1132, percent: 32.5 },
                    { label: 'SMP / MTs', count: 960, percent: 27.6 },
                    { label: 'SD / Sederajat', count: 890, percent: 25.6 },
                    { label: 'Diploma / Sarjana (S1/S2)', count: 320, percent: 9.1 },
                    { label: 'Belum / Tidak Sekolah', count: 180, percent: 5.2 },
                ];
            const palette = [
                { stroke: '#2563eb', bg: 'bg-blue-600', text: 'text-blue-600' },
                { stroke: '#0d9488', bg: 'bg-teal-600', text: 'text-teal-600' },
                { stroke: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-600' },
                { stroke: '#7c3aed', bg: 'bg-violet-600', text: 'text-violet-600' },
                { stroke: '#64748b', bg: 'bg-slate-500', text: 'text-slate-600' },
            ];
            return list.map((item, idx) => ({
                label: item.label,
                count: Number(item.count) || 0,
                percent: Number(item.percent) || 0,
                color: palette[idx % palette.length],
            }));
        }

        // Default: 'gender'
        return [
            {
                label: 'Laki-Laki',
                count: maleCitizens,
                percent: totalCitizens > 0 ? (maleCitizens / totalCitizens) * 100 : 49.5,
                color: { stroke: '#2563eb', bg: 'bg-blue-600', text: 'text-blue-600' },
            },
            {
                label: 'Perempuan',
                count: femaleCitizens,
                percent: totalCitizens > 0 ? (femaleCitizens / totalCitizens) * 100 : 50.5,
                color: { stroke: '#dc2626', bg: 'bg-red-600', text: 'text-red-600' },
            },
        ];
    };

    const demoSegments = getDemoSegments();
    const demoTotal = demoSegments.reduce((acc, curr) => acc + curr.count, 0) || totalCitizens;
    const demoRadius = 38;
    const demoCircumference = 2 * Math.PI * demoRadius; // ~238.76

    let demoCumulativeOffset = 0;
    const calculatedDemoSegments = demoSegments.map((item) => {
        const percent = demoTotal > 0 ? (item.count / demoTotal) * 100 : item.percent || 0;
        const segmentLength = (percent / 100) * demoCircumference;
        const gap = demoSegments.length > 1 ? 1.5 : 0;
        const strokeLength = Math.max(0, segmentLength - gap);
        const offset = demoCumulativeOffset;
        demoCumulativeOffset += segmentLength;
        return {
            ...item,
            percent,
            strokeLength,
            offset,
        };
    });

    // Donut calculation for Letter Type Distribution (100% Real Database Data)
    const letterColors = [
        { stroke: '#dc2626', bg: 'bg-red-600', text: 'text-red-700' },
        { stroke: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-700' },
        { stroke: '#2563eb', bg: 'bg-blue-600', text: 'text-blue-700' },
        { stroke: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-700' },
        { stroke: '#8b5cf6', bg: 'bg-purple-500', text: 'text-purple-700' },
        { stroke: '#06b6d4', bg: 'bg-cyan-500', text: 'text-cyan-700' },
    ];

    const totalLetterTypes = letterTypeDistribution.reduce((acc, curr) => acc + (curr.count || 0), 0) || (stats.total_letters || 0);
    const letterDonutRadius = 38;
    const letterCircumference = 2 * Math.PI * letterDonutRadius; // ~238.76

    let letterCumulativeOffset = 0;
    const letterSegments = letterTypeDistribution.map((item, idx) => {
        const count = item.count || 0;
        const percent = totalLetterTypes > 0 ? (count / totalLetterTypes) * 100 : 0;
        const dashLength = (percent / 100) * letterCircumference;
        const dashOffset = letterCumulativeOffset;
        letterCumulativeOffset += dashLength;
        const color = letterColors[idx % letterColors.length];
        return {
            ...item,
            percent: Math.round(percent),
            dashLength,
            dashOffset,
            color,
        };
    });

    // KPI Stat cards configuration: Total (Semua) & Hari Ini (Today)
    const statCards = [
        {
            title: 'Permohonan Surat',
            total: stats.total_letters || 0,
            today: stats.today_letters || 0,
            subtext: stats.pending_letters > 0 ? `${stats.pending_letters} perlu verifikasi` : 'Semua terverifikasi',
            icon: FileText,
            iconColor: 'text-red-500',
            link: `/${adminPath}/settings/letters`,
        },
        {
            title: 'Berita & Publikasi',
            total: stats.total_posts || 0,
            today: stats.today_posts || 0,
            subtext: 'Warta informasi desa',
            icon: Newspaper,
            iconColor: 'text-emerald-500',
            link: `/${adminPath}/settings/news`,
        },
        {
            title: 'Komentar di Berita',
            total: stats.total_comments || 0,
            today: stats.today_comments || 0,
            subtext: stats.pending_comments > 0 ? `${stats.pending_comments} belum disetujui` : 'Interaksi pembaca',
            icon: MessageCircle,
            iconColor: 'text-blue-500',
            link: `/${adminPath}/settings/news`,
        },
        {
            title: 'Aspirasi Masuk',
            total: stats.total_feedbacks || 0,
            today: stats.today_feedbacks || 0,
            subtext: 'Kritik & masukan warga',
            icon: MessageSquare,
            iconColor: 'text-purple-500',
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

    // Calculate max value and 7-day total for chart scaling
    const trendMax = Math.max(...serviceTrend.map((d) => d.total || 0), 4);
    const total7Days = serviceTrend.reduce((acc, curr) => acc + (curr.total || 0), 0);

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
                                        Kec. Karanggeneng, Lamongan
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stat KPI Cards Grid (4 Cards: Total & Hari Ini - White Background with Subtle Dark Red-Gold Gradient Touch) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {statCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={card.link}
                                    className="relative p-3.5 sm:p-4 rounded-lg bg-white border border-zinc-200/90 hover:border-red-600/40 hover:shadow-md transition-all group flex flex-col justify-between"
                                >
                                    {/* Header: Title & Frameless Accent Icon */}
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">
                                            {card.title}
                                        </span>
                                        <Icon className={`h-4.5 w-4.5 ${card.iconColor} group-hover:scale-110 transition-transform`} />
                                    </div>

                                    {/* Metrics: Semua (Total) & Hari Ini */}
                                    <div className="relative z-10 mt-3 pt-2.5 border-t border-zinc-100 flex items-baseline justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                                                Semua
                                            </span>
                                            <span className="text-2xl sm:text-[26px] font-black text-zinc-900 tracking-tight leading-none mt-1 block">
                                                {card.total}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                                                Hari Ini
                                            </span>
                                            <span className={`text-lg sm:text-xl font-black leading-none mt-1 block ${
                                                card.today > 0 ? 'bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent' : 'text-zinc-400'
                                            }`}>
                                                {card.today > 0 ? `+${card.today}` : '0'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer: Clean Subtext info without badge frame */}
                                    <div className="relative z-10 mt-2.5 pt-1.5 border-t border-zinc-50 flex items-center justify-between text-[11px] text-zinc-400">
                                        <span className="truncate group-hover:text-zinc-600 transition-colors">
                                            {card.subtext}
                                        </span>
                                        <ChevronRight className="h-3 w-3 text-zinc-300 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3. Charts & Analytics Grid (Bar Chart & Service Efficiency Gauge) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Chart 1: Tren Layanan Surat 7 Hari Terakhir (8 of 12) */}
                        <div className="lg:col-span-7 rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div>
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-red-600" />
                                        <span>Tren Permohonan Surat</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Volume pelayanan 7 hari terakhir
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
                                <div className="h-40 flex items-end justify-between gap-2.5 px-2 border-b border-zinc-200 pb-2">
                                    {serviceTrend.map((item, i) => {
                                        const total = item.total || 0;
                                        const completed = item.completed || 0;
                                        const pending = (item.pending || 0) + (item.rejected || 0);

                                        // Height percentages (min 8% for visibility)
                                        const totalHeightPct = total > 0 ? Math.max((total / trendMax) * 100, 14) : 8;
                                        const completedHeightPct = total > 0 ? (completed / total) * 100 : 50;

                                        const isHovered = hoveredDay === i;

                                        return (
                                            <div
                                                key={i}
                                                className="flex-1 flex flex-col items-center h-full justify-end group/bar cursor-pointer"
                                                onMouseEnter={() => setHoveredDay(i)}
                                                onMouseLeave={() => setHoveredDay(null)}
                                            >
                                                {/* Tooltip on hover */}
                                                {isHovered && (
                                                    <div className="absolute -top-8 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[10px] font-semibold shadow-lg whitespace-nowrap z-20 pointer-events-none animate-in fade-in zoom-in-95">
                                                        {item.day}, {item.date} {item.is_today ? '(Hari Ini)' : ''}: {completed} Selesai, {pending} Proses
                                                    </div>
                                                )}

                                                {/* Stacked Bar Container */}
                                                <div
                                                    style={{ height: `${totalHeightPct}%` }}
                                                    className={`w-full max-w-[32px] rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-300 group-hover/bar:brightness-110 shadow-xs ${
                                                        item.is_today ? 'ring-1.5 ring-red-500/40' : ''
                                                    }`}
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

                                                {/* Day & Date Label */}
                                                <div className="flex flex-col items-center mt-1.5 text-center leading-tight">
                                                    <span className={`text-[11px] font-bold transition-colors ${
                                                        item.is_today ? 'text-red-700' : isHovered ? 'text-zinc-900' : 'text-zinc-600'
                                                    }`}>
                                                        {item.day}
                                                    </span>
                                                    <span className="text-[9.5px] text-zinc-400 font-medium">
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 px-1">
                                    <span>Skala otomatis arsip harian</span>
                                    <span className="font-semibold text-zinc-600">Total 7 Hari: {total7Days} Pengajuan</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart 2: Distribusi Jenis Surat (5 of 12) */}
                        <div className="lg:col-span-5 rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                            {/* Header with Total Pill */}
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div>
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                                        <PieChart className="h-4 w-4 text-red-600" />
                                        <span>Distribusi Jenis Surat</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        Surat paling sering diajukan warga
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xs font-black text-zinc-900">{totalLetterTypes}</span>
                                    <span className="text-[11px] text-zinc-400 font-medium ml-1">Berkas</span>
                                </div>
                            </div>

                            {letterSegments.length === 0 ? (
                                <div className="py-10 text-center text-xs text-zinc-400">
                                    Belum ada data pengajuan surat masuk.
                                </div>
                            ) : (
                                <>
                                    {/* Donut Chart & Category Breakdown */}
                                    <div className="flex flex-col sm:flex-row items-center gap-4 py-1">
                                        {/* Donut Graphic */}
                                        <div className="relative shrink-0 flex items-center justify-center">
                                            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                                                {/* Base track */}
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r={letterDonutRadius}
                                                    fill="transparent"
                                                    stroke="#f4f4f5"
                                                    strokeWidth="9"
                                                />
                                                {/* Segments */}
                                                {letterSegments.map((seg, idx) => (
                                                    <circle
                                                        key={idx}
                                                        cx="50"
                                                        cy="50"
                                                        r={letterDonutRadius}
                                                        fill="transparent"
                                                        stroke={seg.color.stroke}
                                                        strokeWidth="9"
                                                        strokeDasharray={`${seg.dashLength} ${letterCircumference}`}
                                                        strokeDashoffset={-seg.dashOffset}
                                                        className="transition-all duration-700"
                                                    />
                                                ))}
                                            </svg>
                                            {/* Center Label */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                                <span className="text-xl font-black text-zinc-900 leading-none">
                                                    {totalLetterTypes}
                                                </span>
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
                                                    Surat
                                                </span>
                                            </div>
                                        </div>

                                        {/* Category List & Progress */}
                                        <div className="flex-1 w-full min-w-0 space-y-2">
                                            {letterSegments.slice(0, 4).map((item, idx) => (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex items-center justify-between text-[11px] gap-2">
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            <span className={`h-2 w-2 rounded-full ${item.color.bg} shrink-0`} />
                                                            <span className="font-semibold text-zinc-800 truncate" title={item.type}>
                                                                {item.type}
                                                            </span>
                                                        </div>
                                                        <span className="font-bold text-zinc-900 shrink-0">
                                                            {item.count} <span className="text-[10px] text-zinc-400 font-normal">({item.percent}%)</span>
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.color.bg} rounded-full transition-all duration-700`}
                                                            style={{ width: `${item.percent}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer: Most popular category */}
                                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400">
                                        <span>Permohonan Terbanyak:</span>
                                        <span className="font-bold text-zinc-800 truncate max-w-[200px]" title={letterSegments[0]?.type}>
                                            {letterSegments[0]?.type} ({letterSegments[0]?.count} berkas)
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 4. Tiga Kolom Status Permohonan Surat: Menunggu, Diproses, dan Selesai */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                        {/* Kolom 1: Status Menunggu / Baru Diterima */}
                        <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 truncate">
                                        <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                                        <span className="truncate">Menunggu / Baru Masuk</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                        Permohonan butuh verifikasi
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <span className="text-xs font-bold text-amber-600 font-mono">
                                        {stats.pending_letters ?? pendingLetters.length}
                                    </span>
                                    <span className="text-[10px] text-zinc-400">berkas</span>
                                </div>
                            </div>

                            {pendingLetters.length === 0 ? (
                                <div className="py-8 text-center text-xs text-zinc-400 flex-1 flex items-center justify-center">
                                    Tidak ada permohonan yang menunggu.
                                </div>
                            ) : (
                                <div className="divide-y divide-zinc-100 flex-1">
                                    {pendingLetters.slice(0, 5).map((letter) => (
                                        <div key={letter.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href={`/${adminPath}/settings/letters?status=menunggu&search=${encodeURIComponent(letter.citizen_name)}`}
                                                    className="font-bold text-zinc-900 truncate hover:text-red-700 block transition-colors"
                                                    title={letter.citizen_name}
                                                >
                                                    {letter.citizen_name}
                                                </Link>
                                                <p className="text-zinc-500 text-[11px] truncate mt-0.5">
                                                    {letter.letter_type} &bull;{' '}
                                                    <span className="text-zinc-500 font-mono font-semibold">
                                                        #{letter.id}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2">
                                                <a
                                                    href={`/layanan/surat/pdf/${letter.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Cetak PDF Format Resmi"
                                                    className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition-colors"
                                                >
                                                    <Printer className="h-3.5 w-3.5 text-red-600" />
                                                </a>
                                                <span className="text-[9.5px] text-zinc-400 shrink-0">
                                                    {timeAgo(letter.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={`/${adminPath}/settings/letters?status=menunggu`}
                                className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:underline flex items-center justify-between pt-2 border-t border-zinc-100 group"
                            >
                                <span>Verifikasi Permohonan</span>
                                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Kolom 2: Status Sedang Diproses */}
                        <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 truncate">
                                        <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                                        <span className="truncate">Sedang Diproses</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                        Pengerjaan & siap diambil
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <span className="text-xs font-bold text-blue-600 font-mono">
                                        {stats.processing_letters ?? processingLetters.length}
                                    </span>
                                    <span className="text-[10px] text-zinc-400">berkas</span>
                                </div>
                            </div>

                            {processingLetters.length === 0 ? (
                                <div className="py-8 text-center text-xs text-zinc-400 flex-1 flex items-center justify-center">
                                    Tidak ada surat yang sedang diproses.
                                </div>
                            ) : (
                                <div className="divide-y divide-zinc-100 flex-1">
                                    {processingLetters.slice(0, 5).map((letter) => (
                                        <div key={letter.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href={`/${adminPath}/settings/letters?status=bisa_diambil&search=${encodeURIComponent(letter.citizen_name)}`}
                                                    className="font-bold text-zinc-900 truncate hover:text-red-700 block transition-colors"
                                                    title={letter.citizen_name}
                                                >
                                                    {letter.citizen_name}
                                                </Link>
                                                <p className="text-zinc-500 text-[11px] truncate mt-0.5">
                                                    {letter.letter_type} &bull;{' '}
                                                    <span className="text-zinc-500 font-mono font-semibold">
                                                        #{letter.id}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2">
                                                <a
                                                    href={`/layanan/surat/pdf/${letter.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Cetak PDF Format Resmi"
                                                    className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition-colors"
                                                >
                                                    <Printer className="h-3.5 w-3.5 text-red-600" />
                                                </a>
                                                <span className="text-[9.5px] text-zinc-400 shrink-0">
                                                    {timeAgo(letter.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={`/${adminPath}/settings/letters?status=bisa_diambil`}
                                className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 hover:underline flex items-center justify-between pt-2 border-t border-zinc-100 group"
                            >
                                <span>Kelola Surat Diproses</span>
                                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Kolom 3: Status Selesai */}
                        <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2 truncate">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                        <span className="truncate">Selesai / Diambil</span>
                                    </h2>
                                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                        Dokumen diserahkan ke warga
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <span className="text-xs font-bold text-emerald-600 font-mono">
                                        {stats.completed_letters ?? completedLetters.length}
                                    </span>
                                    <span className="text-[10px] text-zinc-400">berkas</span>
                                </div>
                            </div>

                            {completedLetters.length === 0 ? (
                                <div className="py-8 text-center text-xs text-zinc-400 flex-1 flex items-center justify-center">
                                    Belum ada arsip surat yang selesai.
                                </div>
                            ) : (
                                <div className="divide-y divide-zinc-100 flex-1">
                                    {completedLetters.slice(0, 5).map((letter) => (
                                        <div key={letter.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href={`/${adminPath}/settings/letters?status=selesai&search=${encodeURIComponent(letter.citizen_name)}`}
                                                    className="font-bold text-zinc-900 truncate hover:text-red-700 block transition-colors"
                                                    title={letter.citizen_name}
                                                >
                                                    {letter.citizen_name}
                                                </Link>
                                                <p className="text-zinc-500 text-[11px] truncate mt-0.5">
                                                    {letter.letter_type} &bull;{' '}
                                                    <span className="text-zinc-500 font-mono font-semibold">
                                                        #{letter.id}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2">
                                                <a
                                                    href={`/layanan/surat/pdf/${letter.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Cetak PDF Format Resmi"
                                                    className="p-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 transition-colors"
                                                >
                                                    <Printer className="h-3.5 w-3.5 text-red-600" />
                                                </a>
                                                <span className="text-[9.5px] text-zinc-400 shrink-0">
                                                    {timeAgo(letter.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={`/${adminPath}/settings/letters?status=selesai`}
                                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center justify-between pt-2 border-t border-zinc-100 group"
                            >
                                <span>Arsip Surat Selesai</span>
                                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* RIGHT SIDEBAR / RAIL COLUMN (Width ~25%) */}
                {/* ========================================================= */}
                <div className="xl:col-span-3 space-y-4 sm:space-y-4.5">
                    {/* Widget 1: Status Petugas & Operasional Hari Ini */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3 shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-red-800 via-red-700 to-amber-500 text-amber-100 font-bold text-xs flex items-center justify-center shadow-xs ring-1 ring-amber-400/30 shrink-0">
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
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 shrink-0">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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

                    {/* Widget 2: Demografi Kependudukan (Multi-Dimensi & Interactive Donut Chart) */}
                    <div className="rounded-lg bg-white border border-zinc-200 p-4 space-y-3.5 shadow-xs">
                        {/* Header with Title & Settings link */}
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                            <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2 truncate">
                                    <PieChart className="h-4 w-4 text-red-600 shrink-0" />
                                    <span className="truncate">Demografi Kependudukan</span>
                                </h3>
                                <p className="text-xs text-zinc-400 mt-0.5 truncate">
                                    Statistik warga Desa Karangwungu
                                </p>
                            </div>
                            <Link
                                href={`/${adminPath}/settings/demographics`}
                                title="Kelola Data Demografi"
                                className="p-1 rounded-md text-zinc-400 hover:text-red-700 hover:bg-zinc-100 transition-colors shrink-0 ml-1.5"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        {/* Segmented Tab Switcher (Gender, Usia, Pekerjaan, Pendidikan) */}
                        <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-100/80 rounded-lg text-[11px] font-semibold text-zinc-600">
                            {[
                                { id: 'gender', label: 'Gender' },
                                { id: 'usia', label: 'Usia' },
                                { id: 'pekerjaan', label: 'Kerja' },
                                { id: 'pendidikan', label: 'Didik' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => {
                                        setActiveDemoTab(tab.id);
                                        setHoveredDemoIndex(null);
                                    }}
                                    className={`py-1 rounded-md text-center transition-all cursor-pointer ${
                                        activeDemoTab === tab.id
                                            ? 'bg-white text-zinc-900 font-bold shadow-xs'
                                            : 'hover:text-zinc-900 hover:bg-zinc-200/50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Interactive Modern Donut Chart */}
                        <div className="flex items-center justify-center py-1">
                            <div className="relative flex items-center justify-center">
                                <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
                                    {/* Base track */}
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={demoRadius}
                                        fill="transparent"
                                        stroke="#f4f4f5"
                                        strokeWidth="7.5"
                                    />
                                    {/* Slices */}
                                    {calculatedDemoSegments.map((item, idx) => {
                                        const isHovered = hoveredDemoIndex === idx;
                                        return (
                                            <circle
                                                key={idx}
                                                cx="50"
                                                cy="50"
                                                r={demoRadius}
                                                fill="transparent"
                                                stroke={item.color.stroke}
                                                strokeWidth={isHovered ? 9.5 : 7.5}
                                                strokeDasharray={`${item.strokeLength} ${demoCircumference - item.strokeLength}`}
                                                strokeDashoffset={-item.offset}
                                                className="transition-all duration-300 cursor-pointer"
                                                onMouseEnter={() => setHoveredDemoIndex(idx)}
                                                onMouseLeave={() => setHoveredDemoIndex(null)}
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Central Dynamic Metric */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 pointer-events-none">
                                    {hoveredDemoIndex !== null && calculatedDemoSegments[hoveredDemoIndex] ? (
                                        <>
                                            <span className="text-[10px] text-zinc-500 font-medium truncate max-w-[80px]">
                                                {calculatedDemoSegments[hoveredDemoIndex].label.split('(')[0].trim()}
                                            </span>
                                            <span className="text-sm font-black text-zinc-900 leading-tight">
                                                {calculatedDemoSegments[hoveredDemoIndex].count.toLocaleString('id-ID')}
                                            </span>
                                            <span className={`text-[10px] font-bold ${calculatedDemoSegments[hoveredDemoIndex].color.text}`}>
                                                {calculatedDemoSegments[hoveredDemoIndex].percent.toFixed(1)}%
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-sm font-black text-zinc-900 leading-tight">
                                                {activeDemoTab === 'gender' && totalCitizens.toLocaleString('id-ID')}
                                                {activeDemoTab === 'usia' && `${productivePercent}%`}
                                                {activeDemoTab === 'pekerjaan' && totalCitizens.toLocaleString('id-ID')}
                                                {activeDemoTab === 'pendidikan' && '94.8%'}
                                            </span>
                                            <span className="text-[9px] text-zinc-400 font-medium mt-0.5">
                                                {activeDemoTab === 'gender' && 'Total Warga'}
                                                {activeDemoTab === 'usia' && 'Usia Produktif'}
                                                {activeDemoTab === 'pekerjaan' && 'Total Warga'}
                                                {activeDemoTab === 'pendidikan' && 'Melek Huruf'}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Data Based on Active Tab */}
                        {activeDemoTab === 'gender' && (
                            <div className="space-y-2.5">
                                <div className="grid grid-cols-2 gap-2.5">
                                    <div
                                        onMouseEnter={() => setHoveredDemoIndex(0)}
                                        onMouseLeave={() => setHoveredDemoIndex(null)}
                                        className={`p-2.5 rounded-lg border bg-white transition-all cursor-pointer ${
                                            hoveredDemoIndex === 0
                                                ? 'border-blue-500 ring-1 ring-blue-500/20 shadow-xs'
                                                : 'border-zinc-200 hover:border-zinc-300'
                                        }`}
                                    >
                                        <span className="text-[11px] font-medium text-zinc-500 block">Laki-Laki</span>
                                        <div className="flex items-baseline justify-between mt-1">
                                            <span className="text-base font-bold text-zinc-900">{maleCitizens.toLocaleString('id-ID')}</span>
                                            <span className="text-xs font-semibold text-blue-600">{((maleCitizens / totalCitizens) * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>

                                    <div
                                        onMouseEnter={() => setHoveredDemoIndex(1)}
                                        onMouseLeave={() => setHoveredDemoIndex(null)}
                                        className={`p-2.5 rounded-lg border bg-white transition-all cursor-pointer ${
                                            hoveredDemoIndex === 1
                                                ? 'border-red-500 ring-1 ring-red-500/20 shadow-xs'
                                                : 'border-zinc-200 hover:border-zinc-300'
                                        }`}
                                    >
                                        <span className="text-[11px] font-medium text-zinc-500 block">Perempuan</span>
                                        <div className="flex items-baseline justify-between mt-1">
                                            <span className="text-base font-bold text-zinc-900">{femaleCitizens.toLocaleString('id-ID')}</span>
                                            <span className="text-xs font-semibold text-red-600">{((femaleCitizens / totalCitizens) * 100).toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Proportional horizontal bar */}
                                <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden flex">
                                    <div
                                        style={{ width: `${(maleCitizens / totalCitizens) * 100}%` }}
                                        className="h-full bg-blue-600 transition-all duration-500"
                                    />
                                    <div
                                        style={{ width: `${(femaleCitizens / totalCitizens) * 100}%` }}
                                        className="h-full bg-red-600 transition-all duration-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                                    <span>Rasio Gender</span>
                                    <span className="font-semibold text-zinc-800">
                                        {femaleCitizens > 0 ? ((maleCitizens / femaleCitizens) * 100).toFixed(1) : 100} pria per 100 wanita
                                    </span>
                                </div>
                            </div>
                        )}

                        {activeDemoTab !== 'gender' && (
                            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 divide-y divide-zinc-100">
                                {calculatedDemoSegments.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredDemoIndex(idx)}
                                        onMouseLeave={() => setHoveredDemoIndex(null)}
                                        className={`pt-1.5 first:pt-0 pb-1 flex flex-col gap-1 text-xs cursor-pointer transition-colors rounded px-1.5 ${
                                            hoveredDemoIndex === idx ? 'bg-zinc-50' : 'hover:bg-zinc-50/70'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-1.5">
                                            <span className="font-medium text-zinc-800 truncate text-[11px]" title={item.label}>
                                                {item.label}
                                            </span>
                                            <span className="font-semibold text-zinc-900 text-[11px] shrink-0">
                                                {item.count.toLocaleString('id-ID')} <span className="font-normal text-zinc-400">({item.percent.toFixed(1)}%)</span>
                                            </span>
                                        </div>
                                        <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color.bg} rounded-full transition-all duration-500`}
                                                style={{ width: `${item.percent}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Village Macro Statistics (Clean 3-column, zero dots, zero brackets) */}
                        <div className="grid grid-cols-3 pt-2.5 border-t border-zinc-100 text-center">
                            <div>
                                <span className="text-[10px] text-zinc-400 block">Keluarga</span>
                                <span className="text-xs font-bold text-zinc-900 block mt-0.5">{totalFamilies} KK</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 block">Wilayah</span>
                                <span className="text-xs font-bold text-zinc-900 block mt-0.5">{areaHa} Ha</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-zinc-400 block">Produktif</span>
                                <span className="text-xs font-bold text-emerald-600 block mt-0.5">{productivePercent}%</span>
                            </div>
                        </div>

                        {/* Direct Link to Demographics Management */}
                        <Link
                            href={`/${adminPath}/settings/demographics`}
                            className="text-[11px] font-semibold text-red-700 hover:text-red-800 hover:underline flex items-center justify-between pt-2 border-t border-zinc-100 group"
                        >
                            <span>Kelola Data Demografi Lengkap</span>
                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
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

                            <Link
                                href={`/${adminPath}/settings/letters`}
                                className="p-2 rounded-lg border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all flex items-center justify-between gap-2 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <CheckSquare className="h-4 w-4 text-amber-600 shrink-0" />
                                    <span className="font-semibold text-zinc-800 group-hover:text-amber-700 truncate text-[11.5px]">
                                        Verifikasi Permohonan Surat
                                    </span>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                            </Link>

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
