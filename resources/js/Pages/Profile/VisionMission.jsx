import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Target,
    Clock,
    Calendar,
    User,
    Users,
    CheckCircle2,
    Check,
    Shield,
    HeartHandshake,
    GraduationCap,
    TrendingUp,
    Building2,
    Award,
    HeartPulse,
    ShieldCheck,
    UserCheck,
    Sparkles,
} from 'lucide-react';

export default function VisionMission() {
    // 8 Silsilah Resmi Kepala Desa Karangwungu (Urutan Terbaru di Atas - Tema Merah Hitam Kuning/Emas)
    const leaders = [
        {
            order: 8,
            name: 'Sunarto',
            period: '2020 – 2026',
            role: 'Kepala Desa Ke-8 (Periode II)',
            isCurrent: true,
        },
        {
            order: 7,
            name: 'Sunarto',
            period: '2014 – 2019',
            role: 'Kepala Desa Ke-7 (Periode I)',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'Abdul Wahab',
            period: '2008 – 2013',
            role: 'Kepala Desa Ke-6',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'Matardjo. AS',
            period: '2002 – 2007',
            role: 'Kepala Desa Ke-5',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'Kanan',
            period: '1993 – 2001',
            role: 'Kepala Desa Ke-4',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'Matardjo. AS',
            period: '1984 – 1992',
            role: 'Kepala Desa Ke-3',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'Saedjan',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-2',
            isCurrent: false,
        },
        {
            order: 1,
            name: 'H. Ali Sariban',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-1 (Perintis)',
            isCurrent: false,
        },
    ];

    // 4 Misi Resmi Pembangunan Desa Karangwungu
    const missions = [
        {
            number: '01',
            category: 'Sosial & Keagamaan',
            title: 'Kehidupan Beragama & Sosial',
            desc: 'Meningkatkan Kualitas Kehidupan Beragama, Sosial Budaya dan Ketentraman Masyarakat;',
            icon: HeartHandshake,
        },
        {
            number: '02',
            category: 'Pendidikan & Kesehatan',
            title: 'Pendidikan & Kesehatan SDM',
            desc: 'Meningkatkan Kualitas Pendidikan, Kesehatan dan Sumberdaya Manusia;',
            icon: GraduationCap,
        },
        {
            number: '03',
            category: 'Ekonomi Pedesaan',
            title: 'Pembangunan Ekonomi Pedesaan',
            desc: 'Meningkatkan Pembangunan Ekonomi Pedesaan, dan Kesejahteraan Masyarakat;',
            icon: TrendingUp,
        },
        {
            number: '04',
            category: 'Tata Kelola Pemerintahan',
            title: 'Profesionalisme Aparatur',
            desc: 'Meningkatkan Kualitas dan Profesionalisme Aparatur dalam Tata Kelola Pemerintahan, Pembangunan dan Pelayanan pada Masyarakat;',
            icon: Building2,
        },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Visi, Misi & Kepemimpinan Desa Karangwungu"
                description="Visi, 4 Misi Strategis Pembangunan, dan Sejarah Silsilah 8 Periode Kepemimpinan Kepala Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan."
                keywords="Visi Misi Desa Karangwungu, Kepala Desa Karangwungu, Sunarto Kepala Desa, Profil Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Visi, Misi & Kepemimpinan', url: '/profil/visi-misi' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
                {/* 1. PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Visi, Misi & Kepemimpinan Desa"
                    subtitle="Arah kebijakan jangka panjang dan rekam jejak estafet kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                />

                {/* ============================================================ */}
                {/* 2. SEKSI VISI & MISI DESA                                    */}
                {/* ============================================================ */}
                <div id="visi-misi" className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                            <Target className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                Visi & Misi Pembangunan
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Arah kebijakan jangka panjang dan langkah nyata pelayanan masyarakat Desa Karangwungu
                            </p>
                        </div>
                    </div>

                    {/* Banner Visi Utama (Royal Red Gradient) */}
                    <div className="w-full rounded-lg overflow-hidden border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-xl p-6 sm:p-8 space-y-4 text-center relative">
                        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-amber-300">
                            <Target className="h-4 w-4 text-amber-400 shrink-0 aspect-square" />
                            <span>Visi Resmi Pemerintah Desa Karangwungu</span>
                        </div>

                        <blockquote className="text-sm sm:text-base md:text-lg font-bold leading-relaxed text-white max-w-4xl mx-auto drop-shadow-sm">
                            &ldquo;Terwujudnya Masyarakat Desa Karangwungu Yang Berakhlak Mulia, Sehat, Sejahtera dan Bermartabat Dalam Naungan Pemerintah Desa Yang Demokratis dan Amanah&rdquo;
                        </blockquote>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 max-w-3xl mx-auto">
                            <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/35 border border-white/15 text-[11px] font-bold text-amber-300">
                                <Award className="h-3.5 w-3.5 text-amber-400" />
                                <span>Berakhlak Mulia</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/35 border border-white/15 text-[11px] font-bold text-amber-300">
                                <HeartPulse className="h-3.5 w-3.5 text-amber-400" />
                                <span>Sehat & Bugar</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/35 border border-white/15 text-[11px] font-bold text-amber-300">
                                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                                <span>Masyarakat Sejahtera</span>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/35 border border-white/15 text-[11px] font-bold text-amber-300">
                                <UserCheck className="h-3.5 w-3.5 text-amber-400" />
                                <span>Demokratis & Amanah</span>
                            </div>
                        </div>
                    </div>

                    {/* 4 Misi Strategis (4-Column Balanced Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {missions.map((m) => {
                            const IconComponent = m.icon;
                            return (
                                <div
                                    key={m.number}
                                    className="p-4 sm:p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 hover:border-red-500/50 dark:hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-3 shadow-xs group"
                                >
                                    <div className="space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="h-7 w-7 rounded-lg bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-red-500/40 font-bold text-xs flex items-center justify-center shadow-xs">
                                                {m.number}
                                            </span>
                                            <div className="h-7 w-7 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <IconComponent className="h-3.5 w-3.5" />
                                            </div>
                                        </div>

                                        <div className="space-y-0.5">
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                                {m.category}
                                            </div>
                                            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                                                {m.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                                            {m.desc}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="h-3 w-3" />
                                        <span>Prioritas Strategis</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. SEKSI SEJARAH KEPEMIMPINAN (KARTU MERAH-HITAM-EMAS)       */}
                {/* ============================================================ */}
                <div id="jejak-kepemimpinan" className="space-y-8 pt-4">
                    {/* Centered Reference Header */}
                    <div className="max-w-2xl mx-auto text-center space-y-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-zinc-950 border border-red-500/40 text-amber-300 flex items-center justify-center mx-auto shadow-sm">
                            <Users className="h-5 w-5" />
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                Sejarah Kepemimpinan
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                                Daftar nama-nama yang pernah menjabat sebagai Kepala Desa Karangwungu dari masa ke masa.
                            </p>
                        </div>
                    </div>

                    {/* Timeline List (Cards in Red-Black-Gold Gradient Theme) */}
                    <div className="max-w-3xl mx-auto px-3 sm:px-6">
                        <div className="relative pl-8 sm:pl-10 border-l-2 border-red-500/50 dark:border-red-500/40 space-y-5 sm:space-y-6">
                            {leaders.map((leader) => (
                                <div key={leader.order} className="relative group">
                                    {/* Circular Number Node on the Line */}
                                    <div
                                        className={`absolute -left-[49px] sm:-left-[57px] top-1/2 -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                                            leader.isCurrent
                                                ? 'bg-amber-400 text-zinc-950 border-2 border-red-600 ring-4 ring-amber-400/30 scale-110 font-black'
                                                : 'bg-gradient-to-br from-red-700 via-red-800 to-red-950 border-2 border-red-500/80 text-amber-300 group-hover:scale-110 group-hover:border-amber-400 font-bold'
                                        }`}
                                    >
                                        <span className="text-xs sm:text-sm leading-none font-bold">
                                            {leader.order}
                                        </span>
                                    </div>

                                    {/* Leader Card (Signature Royal Red & Gold Gradient) */}
                                    <div
                                        className={`p-3.5 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md ${
                                            leader.isCurrent
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 border-2 border-amber-400 shadow-xl shadow-red-950/30'
                                                : 'bg-gradient-to-r from-red-800 via-red-900 to-red-950 border-red-500/40 hover:border-amber-400/70 hover:shadow-lg hover:shadow-red-950/20'
                                        }`}
                                    >
                                        {/* Name & Role */}
                                        <div className="space-y-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3
                                                    className={`text-base sm:text-lg font-bold tracking-tight ${
                                                        leader.isCurrent
                                                            ? 'text-white font-black'
                                                            : 'text-white group-hover:text-amber-300 transition-colors'
                                                    }`}
                                                >
                                                    {leader.name}
                                                </h3>
                                                {leader.isCurrent && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 text-amber-300 border border-amber-400/50 text-[10px] font-bold shrink-0 shadow-xs">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                        <span>Menjabat Aktif</span>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-red-200/80 font-medium">
                                                {leader.role}
                                            </p>
                                        </div>

                                        {/* Period Pill Badge (Gold Accent on Dark) */}
                                        <div
                                            className={`self-start sm:self-auto shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow-xs ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold'
                                                    : 'bg-black/50 text-amber-300 border-amber-400/30 group-hover:border-amber-400/60'
                                            }`}
                                        >
                                            {leader.period}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
