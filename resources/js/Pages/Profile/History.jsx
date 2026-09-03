import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Target,
    Clock,
    Calendar,
    User,
    CheckCircle2,
    Shield,
    HeartHandshake,
    GraduationCap,
    TrendingUp,
    Building2,
    Award,
    HeartPulse,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';

export default function History() {
    // 8 Silsilah Resmi Kepala Desa Karangwungu (1912 - Sekarang)
    const leaders = [
        {
            order: 1,
            name: 'H. ALI SARIBAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-1',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'SAEDJAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-2',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'MATARDJO. AS',
            period: '1984 – 1992',
            role: 'Kepala Desa Ke-3',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'KANAN',
            period: '1993 – 2001',
            role: 'Kepala Desa Ke-4',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'MATARDJO. AS',
            period: '2002 – 2007',
            role: 'Kepala Desa Ke-5',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'ABDUL WAHAB',
            period: '2008 – 2013',
            role: 'Kepala Desa Ke-6',
            isCurrent: false,
        },
        {
            order: 7,
            name: 'SUNARTO',
            period: '2014 – 2019',
            role: 'Kepala Desa Ke-7 (Periode I)',
            isCurrent: false,
        },
        {
            order: 8,
            name: 'SUNARTO',
            period: '2020 – 2026',
            role: 'Kepala Desa Ke-8 (Periode II)',
            isCurrent: true,
        },
    ];

    // 4 Misi Resmi Pembangunan Desa
    const missions = [
        {
            number: '01',
            title: 'Kehidupan Beragama & Sosial',
            desc: 'Meningkatkan Kualitas Kehidupan Beragama, Sosial Budaya dan Ketentraman Masyarakat;',
            icon: HeartHandshake,
        },
        {
            number: '02',
            title: 'Pendidikan & Kesehatan SDM',
            desc: 'Meningkatkan Kualitas Pendidikan, Kesehatan dan Sumberdaya Manusia;',
            icon: GraduationCap,
        },
        {
            number: '03',
            title: 'Ekonomi Pedesaan',
            desc: 'Meningkatkan Pembangunan Ekonomi Pedesaan, dan Kesejahteraan Masyarakat;',
            icon: TrendingUp,
        },
        {
            number: '04',
            title: 'Tata Kelola Pemerintahan',
            desc: 'Meningkatkan Kualitas dan Profesionalisme Aparatur dalam Tata Kelola Pemerintahan, Pembangunan dan Pelayanan pada Masyarakat;',
            icon: Building2,
        },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Visi, Misi & Kepemimpinan Desa Karangwungu"
                description="Informasi visi misi pembangunan jangka panjang serta silsilah estafet kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                keywords="Visi Misi Desa Karangwungu, Kepala Desa Karangwungu, Sunarto Kepala Desa"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Visi, Misi & Kepemimpinan', url: '/profil/sejarah' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
                {/* 1. PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Visi, Misi & Kepemimpinan Desa"
                    subtitle="Arah kebijakan pembangunan jangka panjang dan silsilah kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                />

                {/* ============================================================ */}
                {/* 2. SEKSI VISI & MISI DESA                                    */}
                {/* ============================================================ */}
                <div id="visi-misi" className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
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
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-xs font-bold text-amber-300">
                            <Target className="h-3.5 w-3.5" />
                            <span>VISI RESMI PEMERINTAH DESA KARANGWUNGU</span>
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

                                        <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                                            {m.title}
                                        </h3>

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
                {/* 3. SEKSI SILSILAH KEPEMIMPINAN (8 PERIODE KEPALA DESA)       */}
                {/* ============================================================ */}
                <div id="jejak-kepemimpinan" className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    Silsilah Kepala Desa Karangwungu
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Rekam jejak 8 periode kepemimpinan desa dari masa ke masa
                                </p>
                            </div>
                        </div>

                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                            8 Periode
                        </span>
                    </div>

                    {/* 4-Column Grid of 8 Leaders (2 Rows of 4) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {leaders.map((leader) => (
                            <div
                                key={leader.order}
                                className={`rounded-lg p-4 sm:p-5 transition-all flex flex-col justify-between space-y-3 ${
                                    leader.isCurrent
                                        ? 'bg-gradient-to-b from-red-800 via-red-900 to-zinc-950 text-white border border-red-500/50 shadow-xl'
                                        : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-red-500/40 dark:hover:border-amber-400/40'
                                }`}
                            >
                                <div className="space-y-3">
                                    {/* Header: Period & Status */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                                                leader.isCurrent
                                                    ? 'bg-black/40 text-amber-300 border-white/20'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <Calendar className="h-3 w-3" />
                                            <span>{leader.period}</span>
                                        </span>

                                        {leader.isCurrent ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                <span>Aktif</span>
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                                                #{leader.order}
                                            </span>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <div className="flex items-center gap-2.5 pt-1">
                                        <div
                                            className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 font-black'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                            }`}
                                        >
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3
                                                className={`text-xs sm:text-sm font-bold truncate ${
                                                    leader.isCurrent
                                                        ? 'text-white'
                                                        : 'text-zinc-900 dark:text-white'
                                                }`}
                                            >
                                                {leader.name}
                                            </h3>
                                            <p
                                                className={`text-[11px] font-medium ${
                                                    leader.isCurrent
                                                        ? 'text-amber-300 font-bold'
                                                        : 'text-zinc-500 dark:text-zinc-400'
                                                }`}
                                            >
                                                {leader.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`pt-2.5 border-t text-[10px] flex items-center justify-between ${
                                        leader.isCurrent
                                            ? 'border-white/20 text-zinc-300'
                                            : 'border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'
                                    }`}
                                >
                                    <span>Pemerintah Desa</span>
                                    <Shield
                                        className={`h-3 w-3 ${
                                            leader.isCurrent ? 'text-amber-300' : 'text-zinc-300 dark:text-zinc-600'
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
