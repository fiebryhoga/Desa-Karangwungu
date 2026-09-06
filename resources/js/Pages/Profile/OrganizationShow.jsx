import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import { getIconComponent } from '@/Utils/iconRegistry';
import {
    Users,
    Landmark,
    HeartHandshake,
    Flame,
    Building2,
    ShieldAlert,
    Home,
    Wheat,
    Fish,
    Scale,
    ArrowLeft,
    MapPin,
    Calendar,
    Mail,
    Share2,
    Check,
    CheckCircle2,
    Award,
    Sparkles,
    Clock,
    ChevronRight,
    Briefcase,
    Target,
    Compass,
    Quote,
    ShieldCheck,
} from 'lucide-react';

// Siluet Batik Truntum Kencana (Motif Kuntum Bintang Melati - Simbol Kebersamaan, Guyub Rukun & Pengabdian Lembaga Kemasyarakatan)
const BATIK_TRUNTUM_PATTERN = `data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' stroke='%23fbbf24'%3E%3Ccircle cx='35' cy='35' r='2.2' /%3E%3Cpath d='M35 24 C32 29, 32 32, 35 35 C38 32, 38 29, 35 24 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M35 46 C32 41, 32 38, 35 35 C38 38, 38 41, 35 46 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M24 35 C29 32, 32 32, 35 35 C32 38, 29 38, 24 35 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M46 35 C41 32, 38 32, 35 35 C38 38, 41 38, 46 35 Z' stroke-width='0.8' fill='none' /%3E%3Ccircle cx='28' cy='28' r='1.2' /%3E%3Ccircle cx='42' cy='28' r='1.2' /%3E%3Ccircle cx='28' cy='42' r='1.2' /%3E%3Ccircle cx='42' cy='42' r='1.2' /%3E%3Ccircle cx='35' cy='35' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Cpath d='M0 0 L70 70 M70 0 L0 70' stroke='%23fbbf24' stroke-width='0.6' stroke-dasharray='1 4' opacity='0.5' /%3E%3Ccircle cx='35' cy='7' r='1' /%3E%3Ccircle cx='35' cy='63' r='1' /%3E%3Ccircle cx='7' cy='35' r='1' /%3E%3Ccircle cx='63' cy='35' r='1' /%3E%3Ccircle cx='0' cy='0' r='2.2' /%3E%3Ccircle cx='0' cy='0' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='70' cy='0' r='2.2' /%3E%3Ccircle cx='70' cy='0' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='0' cy='70' r='2.2' /%3E%3Ccircle cx='0' cy='70' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='70' cy='70' r='2.2' /%3E%3Ccircle cx='70' cy='70' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3C/g%3E%3C/svg%3E`;

export default function OrganizationShow({
    organization = {},
    otherOrganizations = [],
    organizationsSettings = {},
}) {
    const { props } = usePage();
    const [copied, setCopied] = useState(false);
    const [leaderPhotoError, setLeaderPhotoError] = useState(false);

    const IconComponent = getIconComponent(organization.icon, Users);

    const leader = organization.leader || { name: 'Pimpinan Lembaga', role: 'Ketua', phone: '' };
    const structure = organization.structure || [];
    const programs = organization.programs || [];
    const duties = organization.duties || [
        'Menjalankan amanat peraturan dan pedoman kelembagaan desa.',
        'Menampung aspirasi masyarakat dan bersinergi bersama Pemerintah Desa.',
        'Mendorong partisipasi warga dalam pembangunan dan pemberdayaan perdesaan.',
        'Melaporkan pelaksanaan agenda kegiatan secara berkala kepada masyarakat desa.',
    ];

    const vision = organization.vision || `Terwujudnya ${organization.name || 'lembaga desa'} yang berintegritas, aspiratif, dan berdampak nyata bagi kemajuan warga Desa Karangwungu.`;
    const missions = (organization.missions && organization.missions.length > 0)
        ? organization.missions
        : [
            'Menjalankan amanat peraturan dan pedoman kelembagaan desa secara transparan.',
            'Menampung aspirasi masyarakat dan bersinergi harmonis bersama Pemerintah Desa.',
            'Mendorong partisipasi aktif warga dalam pembangunan dan pemberdayaan perdesaan.',
            'Melaporkan pelaksanaan agenda kegiatan secara berkala kepada masyarakat desa.',
        ];
    const objectives = (organization.objectives && organization.objectives.length > 0)
        ? organization.objectives
        : [
            'Meningkatnya partisipasi dan kerukunan sosial warga Desa Karangwungu.',
            'Terwujudnya transparansi dan akuntabilitas kinerja kelembagaan desa.',
            'Tercapainya kesejahteraan masyarakat melalui program kerja yang tepat sasaran.',
        ];

    const appUrl = props?.app_url || (typeof window !== 'undefined' ? window.location.origin : 'https://karangwungu-lamongan.desa.id');
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `${appUrl}/profil/lembaga/${organization.id}`;

    const handleCopyUrl = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(currentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    // Helper: generate avatar URL with royal red / amber gold
    const avatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Pengurus')}&background=991b1b&color=fef08a&size=256&bold=true&font-size=0.36`;

    // Helper: extract initials for avatar badge
    const getInitials = (name) => {
        if (!name) return 'PL';
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <AppLayout>
            <SeoHead
                title={`${organization.name || 'Lembaga Desa'} - Desa Karangwungu`}
                description={organization.description || organization.tagline || 'Informasi profil lengkap, lambang resmi, struktur pengurus, dan program kerja lembaga desa Karangwungu.'}
                keywords={`${organization.name}, ${organization.shortName}, Lambang ${organization.shortName}, BPD Karangwungu, Lembaga Karangwungu, PKK Karangwungu Lamongan`}
                breadcrumbs={[
                    { label: 'Beranda', url: '/' },
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Lembaga & Organisasi', url: '/profil/lembaga' },
                    { label: organization.shortName || organization.name || 'Detail Lembaga', url: `/profil/lembaga/${organization.id}` },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* 1. HERO BANNER with Integrated Glassmorphism Navigation */}
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white">
                    {/* Background Landscape Photo Overlay */}
                    {organization.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 pointer-events-none"
                            style={{ backgroundImage: `url('${organization.image}')` }}
                        />
                    )}

                    {/* Geometric Layered Chevron / Polygon Facets */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -left-20 top-0 bottom-0 w-1/2 bg-gradient-to-r from-red-950/60 via-red-900/40 to-transparent transform -skew-x-12" />
                        <svg
                            className="absolute inset-0 w-full h-full opacity-30"
                            viewBox="0 0 1200 400"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M-100 0 L350 200 L-100 400 Z" fill="#ef4444" opacity="0.6" />
                            <path d="M100 0 L600 200 L100 400 Z" fill="#f59e0b" opacity="0.4" />
                            <path d="M600 0 L1100 200 L600 400 Z" fill="#dc2626" opacity="0.5" />
                        </svg>

                        {/* Traditional Batik Silhouette Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.12] bg-repeat pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2.5' fill='%23fde047'/%3E%3C/svg%3E")`,
                                backgroundSize: '90px 90px',
                            }}
                        />
                    </div>

                    {/* Content inside Hero */}
                    <div className="relative z-10 p-5 sm:p-7 md:p-8 space-y-5">
                        {/* Top Action Bar inside Hero (Integrated Glassmorphism) */}
                        <div className="flex items-center justify-between gap-3">
                            <Link
                                href="/profil/lembaga"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-amber-400/50 shadow-sm transition-all group w-fit"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:-translate-x-1" />
                                <span>Kembali ke Katalog Lembaga Desa</span>
                            </Link>

                            <span className="text-[11px] font-bold text-amber-200/90 hidden sm:inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <Landmark className="h-3.5 w-3.5 text-amber-400" />
                                <span>Kelembagaan Desa Karangwungu</span>
                            </span>
                        </div>

                        {/* Top: Logo + Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {/* Official Logo (Clean, prominent rounded-lg container) */}
                            <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-lg bg-white dark:bg-zinc-900/95 p-2.5 sm:p-3 shadow-2xl border-2 border-amber-400 ring-4 ring-red-950/40 flex items-center justify-center shrink-0">
                                {organization.logo ? (
                                    <img
                                        src={organization.logo}
                                        alt={`Logo ${organization.name}`}
                                        className="w-full h-full object-contain filter drop-shadow-md"
                                    />
                                ) : (
                                    <IconComponent className="h-12 w-12 sm:h-14 sm:w-14 text-red-600 dark:text-amber-400" />
                                )}
                            </div>

                            {/* Title & Badges */}
                            <div className="space-y-2 flex-1 min-w-0">


                                {/* Main Title */}
                                <div>
                                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                                        {organization.name}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-amber-200 font-medium italic mt-1 leading-relaxed drop-shadow-xs">
                                        "{organization.tagline || 'Bersinergi membangun kemandirian dan keharmonisan Desa Karangwungu'}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick metadata cards (all rounded-lg, clean and readable) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/20">
                            {/* Masa Khidmat */}
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/35 backdrop-blur-md border border-white/15">
                                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
                                    <Clock className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] text-amber-200/80 block uppercase font-bold tracking-wider">
                                        Masa Khidmat / Periode
                                    </span>
                                    <span className="font-bold text-white text-xs sm:text-sm">
                                        {organization.period || '2020 - 2026'}
                                    </span>
                                </div>
                            </div>

                            {/* Jadwal Koordinasi */}
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/35 backdrop-blur-md border border-white/15">
                                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] text-amber-200/80 block uppercase font-bold tracking-wider">
                                        Jadwal Koordinasi
                                    </span>
                                    <span className="font-bold text-white text-xs leading-snug block">
                                        {organization.meeting_schedule || 'Pertemuan Rutin Bulanan'}
                                    </span>
                                </div>
                            </div>

                            {/* Sekretariat */}
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/35 backdrop-blur-md border border-white/15">
                                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] text-amber-200/80 block uppercase font-bold tracking-wider">
                                        Sekretariat Lembaga
                                    </span>
                                    <span className="font-bold text-white text-xs leading-snug block">
                                        {organization.secretariat || 'Kompleks Balai Desa Karangwungu'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. MAIN CONTENT GRID (8 COLS / 4 COLS) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: Main Information (8 COLS) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* A. TENTANG LEMBAGA (Unboxed Editorial Presentation) */}
                        <section aria-labelledby="tentang-lembaga-heading" className="space-y-4">
                            {/* Section Header (Bersih, tanpa badge, tanpa background kotak ikon) */}
                            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200/90 dark:border-zinc-800">
                                <IconComponent className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                        Profil & Kedudukan Resmi
                                    </span>
                                    <h2 id="tentang-lembaga-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                        Tentang {organization.name}
                                    </h2>
                                </div>
                            </div>

                            {/* Narasi Editorial */}
                            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-justify">
                                <p className="font-medium text-zinc-900 dark:text-zinc-100 pl-3.5 border-l-2 border-red-600 dark:border-amber-400">
                                    {organization.description || 'Lembaga kemasyarakatan yang berpartisipasi aktif dalam penyelenggaraan pembangunan, pembinaan, dan pemberdayaan masyarakat di Desa Karangwungu.'}
                                </p>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    Sebagai bagian tak terpisahkan dari tata kelola pemerintahan dan sosial kemasyarakatan Desa Karangwungu, lembaga ini berkedudukan di wilayah Kecamatan Karanggeneng, Kabupaten Lamongan, serta senantiasa menjunjung tinggi musyawarah mufakat, transparansi, dan nilai-nilai kearifan lokal.
                                </p>
                            </div>

                            {/* Ringkasan Spesifikasi Kelembagaan (Royal Red Gradient Hitam Coklat & Batik Watermark) */}
                            <div className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-r from-[#74151e] via-[#561017] to-[#2a0509] dark:from-[#2d070b] dark:via-[#1a0406] dark:to-[#0d0203] text-white border border-amber-400/35 shadow-md">
                                {/* Siluet Batik Truntum Watermark */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.08] dark:opacity-[0.12] bg-repeat"
                                    style={{
                                        backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                        backgroundSize: "60px 60px",
                                    }}
                                />
                                {/* Ambient gold light flare */}
                                <div className="absolute top-0 right-0 w-36 h-full bg-gradient-to-l from-amber-400/15 via-transparent to-transparent pointer-events-none" />

                                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-amber-200/80 uppercase tracking-wider block">Kedudukan</span>
                                        <span className="text-xs sm:text-sm font-bold text-white block">Mitra Pemdes</span>
                                    </div>
                                    <div className="space-y-0.5 sm:border-l sm:border-white/15 dark:sm:border-amber-400/20 sm:pl-4">
                                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-amber-200/80 uppercase tracking-wider block">Wilayah Kerja</span>
                                        <span className="text-xs sm:text-sm font-bold text-white block">Karangwungu</span>
                                    </div>
                                    <div className="space-y-0.5 sm:border-l sm:border-white/15 dark:sm:border-amber-400/20 sm:pl-4">
                                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-amber-200/80 uppercase tracking-wider block">Asas Kerja</span>
                                        <span className="text-xs sm:text-sm font-bold text-white block">Musyawarah Mufakat</span>
                                    </div>
                                    <div className="space-y-0.5 sm:border-l sm:border-white/15 dark:sm:border-amber-400/20 sm:pl-4">
                                        <span className="text-[10px] sm:text-[10.5px] font-semibold text-amber-200/80 uppercase tracking-wider block">Masa Bakti</span>
                                        <span className="text-xs sm:text-sm font-bold text-white block">{organization.period || '2020 - 2026'}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* B. VISI, MISI & TUJUAN */}
                        <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 space-y-6">
                            {/* Siluet Batik Truntum Watermark */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "65px 65px",
                                }}
                            />

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 flex items-center justify-center border border-red-100 dark:border-red-900/40 shrink-0">
                                            <Target className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                                Landasan Cita & Haluan Kerja
                                            </span>
                                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
                                                Visi, Misi & Tujuan Lembaga
                                            </h2>
                                        </div>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                                        Haluan Pokok
                                    </span>
                                </div>

                                {/* 1. Visi Card */}
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 via-red-900 to-[#2c0508] p-5 sm:p-6 text-white border border-amber-400/40 shadow-md space-y-3 group/visi">
                                    {/* Siluet Batik Truntum */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-15 group-hover/visi:opacity-20 transition-opacity duration-500 bg-repeat"
                                        style={{
                                            backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                            backgroundSize: "60px 60px",
                                        }}
                                    />
                                    <div className="relative z-10 space-y-2.5">
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 text-amber-300 text-[10px] font-black tracking-widest uppercase border border-amber-400/40">
                                                <Compass className="h-3.5 w-3.5 text-amber-400" />
                                                <span>VISI UTAMA</span>
                                            </span>
                                            <Quote className="h-7 w-7 text-amber-300/30 shrink-0" />
                                        </div>
                                        <p className="text-sm sm:text-base font-bold text-amber-100 italic leading-relaxed">
                                            "{vision}"
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Misi & Tujuan Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                                    {/* Misi */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-amber-400" />
                                            <h3 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                                Misi Strategis ({missions.length})
                                            </h3>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {missions.map((misi, mIdx) => (
                                                <li
                                                    key={mIdx}
                                                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 hover:border-red-400/50 dark:hover:border-amber-400/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xs transition-all text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium group/item"
                                                >
                                                    <span className="h-5 w-5 rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-amber-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-amber-400/30">
                                                        {mIdx + 1}
                                                    </span>
                                                    <span>{misi}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tujuan */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                                            <h3 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                                Tujuan Pokok ({objectives.length})
                                            </h3>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {objectives.map((tujuan, tIdx) => (
                                                <li
                                                    key={tIdx}
                                                    className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/40 dark:bg-zinc-800/60 border border-amber-200/60 dark:border-zinc-700/60 hover:border-amber-400/70 hover:bg-amber-50/70 dark:hover:bg-zinc-800 hover:shadow-xs transition-all text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium group/item"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                                                    <span>{tujuan}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* C. TUGAS POKOK & FUNGSI (TUPOKSI) */}
                        <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 space-y-5">
                            {/* Siluet Batik Truntum Watermark */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "65px 65px",
                                }}
                            />

                            <div className="relative z-10 space-y-5">
                                <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100 dark:border-amber-900/40 shrink-0">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                                Mandat & Wewenang
                                            </span>
                                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
                                                Tugas Pokok & Fungsi (Tupoksi)
                                            </h2>
                                        </div>
                                    </div>
                                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                                        {duties.length} Poin Mandat
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {duties.map((duty, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3.5 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 hover:border-amber-400/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-sm transition-all duration-300 group/duty"
                                        >
                                            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border border-amber-400/30 group-hover/duty:scale-105 transition-transform">
                                                {idx + 1}
                                            </div>
                                            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                                                {duty}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* D. PROGRAM KERJA */}
                        <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 space-y-5">
                            {/* Siluet Batik Truntum Watermark */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "65px 65px",
                                }}
                            />

                            <div className="relative z-10 space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/40 shrink-0">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                                Aksi Nyata & Kegiatan
                                            </span>
                                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
                                                Program Kerja & Agenda Prioritas
                                            </h2>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
                                        {programs.length} Program
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {programs.map((program, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3.5 p-4 rounded-xl bg-gradient-to-r from-red-50/25 via-white to-amber-50/15 dark:from-zinc-850 dark:via-zinc-800/80 dark:to-zinc-850 border border-zinc-200/90 dark:border-zinc-750 hover:border-emerald-500/40 hover:shadow-xs transition-all group/prog"
                                        >
                                            <div className="h-7 w-7 rounded-xl bg-red-700 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100">
                                                        {typeof program === 'string' ? program : program.title || 'Agenda Kegiatan'}
                                                    </h4>
                                                    <span className="text-[10px] font-bold text-zinc-400 shrink-0">
                                                        #{idx + 1}
                                                    </span>
                                                </div>
                                                {typeof program === 'object' && program.description && (
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                        {program.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* E. SUSUNAN STRUKTUR PENGURUS */}
                        <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 space-y-5">
                            {/* Siluet Batik Truntum Watermark */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "65px 65px",
                                }}
                            />

                            <div className="relative z-10 space-y-5">
                                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/40 shrink-0">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                                Aparatur & Keanggotaan
                                            </span>
                                            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
                                                Susunan Struktur Pengurus
                                            </h2>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                                        {structure.length} Pengurus
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {structure.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-red-400/50 dark:hover:border-amber-400/50 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xs transition-all group"
                                        >
                                            <div className="h-11 w-11 rounded-xl overflow-hidden bg-red-950 shrink-0 border border-amber-400/40 flex items-center justify-center shadow-xs">
                                                {item.photo ? (
                                                    <img
                                                        src={item.photo}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="text-amber-300 font-bold text-xs select-none">
                                                        {getInitials(item.name)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <span className="text-[10px] font-bold text-red-700 dark:text-amber-400 uppercase tracking-wider block truncate">
                                                    {item.role}
                                                </span>
                                                <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 truncate">
                                                    {item.name}
                                                </h4>
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                                                    Periode: {organization.period || '2020 - 2026'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bagikan Informasi Lembaga */}
                        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <span>Bagikan Informasi Lembaga:</span>
                            </span>

                            <div className="flex items-center gap-2">
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Profil ${organization.name}: ${currentUrl}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                    <span>WhatsApp</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleCopyUrl}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">Tautan Disalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="h-3.5 w-3.5" />
                                            <span>Salin Tautan</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 COLS) */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* 1. KETUA / PIMPINAN CARD */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-red-800 via-red-900 to-[#2e0508] text-white shadow-md border border-amber-400/40 p-6 space-y-4">
                            {/* Siluet Batik Truntum Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-15 transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "60px 60px",
                                }}
                            />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase px-2.5 py-0.5 rounded-lg bg-black/40 border border-amber-400/30">
                                        Pimpinan Lembaga
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-200/80">
                                        {organization.period || '2020 - 2026'}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center text-center space-y-3 pt-1">
                                    {/* Leader Portrait */}
                                    <div className="h-28 w-28 rounded-2xl overflow-hidden bg-red-950 border-2 border-amber-400 shadow-lg ring-4 ring-amber-400/20 flex items-center justify-center">
                                        {leader.photo && !leaderPhotoError ? (
                                            <img
                                                src={leader.photo}
                                                alt={leader.name}
                                                onError={() => setLeaderPhotoError(true)}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-red-950 text-amber-300 font-extrabold text-2xl tracking-wider select-none">
                                                {getInitials(leader.name)}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-base font-black text-white leading-tight">
                                            {leader.name}
                                        </h3>
                                        <p className="text-xs font-bold text-amber-300 mt-1 uppercase tracking-wider">
                                            {leader.role || 'Ketua Lembaga'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. INFORMASI SEKRETARIAT & LAYANAN */}
                        <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                            {/* Siluet Batik Truntum Watermark */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "65px 65px",
                                }}
                            />

                            <div className="relative z-10 space-y-4">
                                <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                    <MapPin className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Sekretariat & Koordinasi</span>
                                </h3>

                                <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                                        <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Alamat Sekretariat:</span>
                                            <p className="font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                                {organization.secretariat || 'Kompleks Balai Desa Karangwungu, Kec. Karanggeneng, Kab. Lamongan, Jawa Timur 62254'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                                        <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Jadwal Koordinasi:</span>
                                            <p className="font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                                {organization.meeting_schedule || 'Setiap Minggu Ke-1 & Koordinasi Rutin Bulanan'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60">
                                        <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Email Resmi:</span>
                                            <p className="font-medium text-red-600 dark:text-amber-400 font-mono text-xs break-all">
                                                {organization.email || 'pemdes@karangwungu-lamongan.desa.id'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. REKOMENDASI LEMBAGA LAINNYA */}
                        {otherOrganizations.length > 0 && (
                            <div className="group relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                                {/* Siluet Batik Truntum Watermark */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                                    style={{
                                        backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                        backgroundSize: "65px 65px",
                                    }}
                                />

                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                        <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                                            Lembaga Desa Lainnya
                                        </h3>
                                        <Link
                                            href="/profil/lembaga"
                                            className="text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline"
                                        >
                                            Lihat Semua
                                        </Link>
                                    </div>

                                    <div className="space-y-2">
                                        {otherOrganizations.slice(0, 5).map((other) => {
                                            const OtherIcon = getIconComponent(other.icon, Users);
                                            return (
                                                <Link
                                                    key={other.id}
                                                    href={`/profil/lembaga/${other.id}`}
                                                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-red-50/80 dark:hover:bg-red-950/30 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-red-300 dark:hover:border-red-900/50 transition-all group/other cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <div className="h-8 w-8 rounded-lg bg-white dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                                                            {other.logo ? (
                                                                <img
                                                                    src={other.logo}
                                                                    alt={other.shortName || other.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <OtherIcon className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover/other:text-red-700 dark:group-hover/other:text-amber-400 transition-colors truncate">
                                                                {other.shortName || other.name}
                                                            </h4>
                                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                                                                {other.tagline || 'Lembaga Desa Karangwungu'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover/other:text-red-600 dark:group-hover/other:text-amber-400 group-hover/other:translate-x-0.5 transition-transform shrink-0" />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
