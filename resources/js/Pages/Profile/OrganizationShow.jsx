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
    ArrowRight,
    MapPin,
    Calendar,
    Mail,
    Phone,
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

    // Helper: render Rekomendasi Lembaga Lainnya (Desktop in sidebar, Mobile at bottom of page)
    const renderOtherOrganizations = (isMobile = false) => {
        if (!otherOrganizations || otherOrganizations.length === 0) return null;
        return (
            <div className={`space-y-3 ${isMobile ? 'block lg:hidden pt-4 border-t border-zinc-200/90 dark:border-zinc-800' : 'hidden lg:block pt-1'}`}>
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200/90 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                        <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100">
                            Lembaga Desa Lainnya
                        </h3>
                    </div>
                    <Link
                        href="/profil/lembaga"
                        className="text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                    >
                        <span>Lihat Semua</span>
                        <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>

                <div className="space-y-2.5">
                    {otherOrganizations.slice(0, 5).map((other) => {
                        const OtherIcon = getIconComponent(other.icon, Users);
                        return (
                            <Link
                                key={other.id}
                                href={`/profil/lembaga/${other.id}`}
                                className="group relative overflow-hidden p-3 sm:p-3.5 rounded-lg bg-gradient-to-br from-white via-red-50/40 to-amber-50/30 dark:from-zinc-900 dark:via-[#1c080b] dark:to-zinc-950 backdrop-blur-xl border border-red-500/20 dark:border-red-900/40 hover:border-amber-500/70 dark:hover:border-amber-400/60 shadow-xs hover:shadow-md hover:shadow-red-950/10 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-3 cursor-pointer pl-4"
                            >
                                {/* Aksen Gradasi Garis Tipis Vertikal: Merah - Hitam - Kuning */}
                                <div className="absolute left-0 inset-y-0 w-1 sm:w-1.5 bg-gradient-to-b from-red-600 via-zinc-900 to-amber-400 opacity-85 group-hover:opacity-100 transition-opacity" />

                                {/* Bias Gradasi Halus di Sudut Belakang */}
                                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-red-600/10 via-zinc-900/5 to-amber-500/15 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                                <div className="relative z-10 flex items-center gap-3 min-w-0">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500/15 via-red-500/10 to-amber-500/5 border border-amber-500/30 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-amber-500 group-hover:text-white group-hover:border-amber-300 transition-all shadow-xs">
                                        {other.logo ? (
                                            <img
                                                src={other.logo}
                                                alt={other.shortName || other.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <OtherIcon className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors truncate">
                                            {other.shortName || other.name}
                                        </h4>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                            {other.tagline || 'Lembaga Desa Karangwungu'}
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight className="relative z-10 h-4 w-4 text-zinc-400 dark:text-zinc-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-1" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
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
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-red-500/40 bg-gradient-to-r from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-black text-white">
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
                            {/* Official Logo (Clean, prominent rounded-xl container) */}
                            <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-xl bg-white dark:bg-zinc-900/95 p-2.5 sm:p-3 shadow-2xl border-2 border-amber-400/80 ring-4 ring-red-950/40 flex items-center justify-center shrink-0">
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

                        {/* Quick metadata cards (all rounded-xl, clean and readable) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/20">
                            {/* Masa Khidmat */}
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-black/35 backdrop-blur-md border border-white/15">
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
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-black/35 backdrop-blur-md border border-white/15">
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
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-black/35 backdrop-blur-md border border-white/15">
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
                    {/* LEFT COLUMN: Main Information (8 COLS) - order-2 on mobile so Leader Card appears first */}
                    <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">
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


                        </section>

                        {/* B. VISI, MISI & TUJUAN (Unboxed Editorial Section) */}
                        <section aria-labelledby="visi-misi-heading" className="space-y-4">
                            {/* Section Header (Bersih, tanpa badge, tanpa background kotak ikon) */}
                            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200/90 dark:border-zinc-800">
                                <Target className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                        Landasan Cita & Haluan Kerja
                                    </span>
                                    <h2 id="visi-misi-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                        Visi, Misi & Tujuan Lembaga
                                    </h2>
                                </div>
                            </div>

                            {/* 1. Visi Card (Executive Quote Card - Crimson Murni & Batik Halus) */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-zinc-950 p-5 sm:p-6 text-white border border-red-500/30 dark:border-red-500/40 shadow-xl space-y-3 group/visi">
                                {/* Siluet Batik Truntum Lembut (0.05 opacity, anti-coklat) */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover/visi:opacity-10 transition-opacity duration-500 bg-repeat"
                                    style={{
                                        backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                        backgroundSize: "60px 60px",
                                    }}
                                />
                                <div className="absolute -top-10 -right-10 w-36 h-36 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

                                <div className="relative z-10 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-amber-300 text-[10px] font-black tracking-widest uppercase border border-amber-400/40 shadow-xs">
                                            <Compass className="h-3.5 w-3.5 text-amber-400" />
                                            <span>VISI UTAMA</span>
                                        </span>
                                        <Quote className="h-8 w-8 text-amber-400/30 shrink-0" />
                                    </div>
                                    <p className="text-sm sm:text-base font-medium text-white italic leading-relaxed pl-3.5 border-l-2 border-amber-400/70">
                                        "{vision}"
                                    </p>
                                </div>
                            </div>

                            {/* 2. Misi & Tujuan Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                {/* Misi */}
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-600 dark:bg-amber-400" />
                                        <h3 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                            Misi Strategis ({missions.length})
                                        </h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {missions.map((misi, mIdx) => (
                                            <li
                                                key={mIdx}
                                                className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-red-400/50 dark:hover:border-amber-400/50 hover:shadow-xs transition-all text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium group/item"
                                            >
                                                <span className="h-5 w-5 rounded-md bg-gradient-to-br from-red-600 to-red-800 text-amber-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-amber-400/30">
                                                    {mIdx + 1}
                                                </span>
                                                <span>{misi}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tujuan */}
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                                        <h3 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                            Tujuan Pokok ({objectives.length})
                                        </h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {objectives.map((tujuan, tIdx) => (
                                            <li
                                                key={tIdx}
                                                className="flex items-start gap-3 p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-amber-400/70 dark:hover:border-amber-400/50 hover:shadow-xs transition-all text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium group/item"
                                            >
                                                <CheckCircle2 className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                                                <span>{tujuan}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* C. TUGAS POKOK & FUNGSI (TUPOKSI) (Unboxed Editorial Section) */}
                        <section aria-labelledby="tupoksi-heading" className="space-y-4">
                            {/* Section Header (Bersih, tanpa badge background) */}
                            <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/90 dark:border-zinc-800">
                                <div className="flex items-center gap-2.5">
                                    <Briefcase className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                            Mandat & Wewenang
                                        </span>
                                        <h2 id="tupoksi-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                            Tugas Pokok & Fungsi (Tupoksi)
                                        </h2>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                    {duties.length} Poin Mandat
                                </span>
                            </div>

                            {/* Duties Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {duties.map((duty, idx) => (
                                    <div
                                        key={idx}
                                        className="group/duty relative p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-red-500/40 dark:hover:border-amber-400/40 hover:shadow-xs transition-all flex items-start gap-3.5"
                                    >
                                        <span className="h-6 w-6 rounded-md bg-gradient-to-br from-red-600 to-red-800 text-amber-200 text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-amber-400/30">
                                            {idx + 1}
                                        </span>
                                        <p className="text-xs sm:text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium group-hover/duty:text-zinc-900 dark:group-hover/duty:text-zinc-100 transition-colors">
                                            {duty}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* D. PROGRAM KERJA (Unboxed Editorial Section) */}
                        <section aria-labelledby="proker-heading" className="space-y-4">
                            {/* Section Header (Bersih, tanpa badge background) */}
                            <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-200/90 dark:border-zinc-800">
                                <div className="flex items-center gap-2.5">
                                    <Sparkles className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                            Aksi Nyata & Kegiatan
                                        </span>
                                        <h2 id="proker-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                            Program Kerja & Agenda Prioritas
                                        </h2>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                    {programs.length} Agenda Prioritas
                                </span>
                            </div>

                            {/* Programs List */}
                            <div className="space-y-2.5">
                                {programs.map((program, idx) => {
                                    const title = typeof program === 'string' ? program : program.title || 'Agenda Kegiatan';
                                    const desc = typeof program === 'object' ? program.description : null;
                                    return (
                                        <div
                                            key={idx}
                                            className="group/prog relative p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-red-500/40 dark:hover:border-amber-400/40 hover:shadow-xs transition-all flex items-start gap-3.5"
                                        >
                                            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-red-600 to-red-800 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-amber-400/30">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover/prog:text-red-700 dark:group-hover/prog:text-amber-300 transition-colors">
                                                        {title}
                                                    </h4>
                                                    <span className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                                        #{String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                {desc && (
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                        {desc}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* E. SUSUNAN STRUKTUR PENGURUS (Unboxed Editorial Section) */}
                        <section aria-labelledby="struktur-heading" className="space-y-4">
                            {/* Section Header (Bersih, tanpa badge background) */}
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/90 dark:border-zinc-800">
                                <div className="flex items-center gap-2.5">
                                    <Users className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                                    <div>
                                        <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                            Aparatur & Keanggotaan
                                        </span>
                                        <h2 id="struktur-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                            Susunan Struktur Pengurus
                                        </h2>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                    {structure.length} Pengurus
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {structure.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-red-400/50 dark:hover:border-amber-400/50 hover:shadow-xs transition-all group"
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
                        </section>

                        {/* REKOMENDASI LEMBAGA LAINNYA (Mobile only: muncul di paling bawah setelah struktur pengurus) */}
                        {renderOtherOrganizations(true)}
                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 COLS) - order-1 on mobile so Leader Card and Quick Contacts appear right below Hero */}
                    <div className="lg:col-span-4 space-y-5 order-1 lg:order-2">
                        {/* 1. KETUA / PIMPINAN CARD (Executive Showcase Card with Batik Silhouette) */}
                        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-[#080102] text-white shadow-xl hover:shadow-2xl border border-amber-400/40 hover:border-amber-400/70 transition-all duration-300 flex flex-col">
                            {/* Siluet Batik Truntum Background Layer (Covering entire card) */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                    backgroundSize: "60px 60px",
                                }}
                            />

                            {/* Ambient Glows */}
                            <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-600/25 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/15 via-transparent to-transparent pointer-events-none" />

                            {/* Header Top Bar */}
                            <div className="relative z-10 px-4 py-3 border-b border-amber-400/25 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-6 w-6 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0">
                                        <Award className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                                        Pimpinan Lembaga
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-amber-200/90 bg-black/40 px-2.5 py-1 rounded-full border border-amber-400/30">
                                    {organization.period || '2020 - 2026'}
                                </span>
                            </div>

                            {/* Portrait Photo Container (With side spacing & rounded-xl frame) */}
                            <div className="px-4 sm:px-5 pt-3.5 sm:pt-4">
                                <div className="relative w-full h-[240px] sm:h-[265px] rounded-xl overflow-hidden bg-zinc-950 border border-amber-400/35 shadow-md group/photo">
                                    {leader.photo && !leaderPhotoError ? (
                                        <img
                                            src={leader.photo}
                                            alt={leader.name}
                                            onError={() => setLeaderPhotoError(true)}
                                            className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 text-amber-300 p-4">
                                            <div className="h-20 w-20 rounded-full bg-red-900/50 border-2 border-amber-400/50 flex items-center justify-center font-black text-2xl mb-2 shadow-inner">
                                                {getInitials(leader.name)}
                                            </div>
                                            <span className="text-xs text-amber-200/70 font-semibold">{leader.name}</span>
                                        </div>
                                    )}

                                    {/* Bottom Gradient Vignette on Photo */}
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                                    {/* Floating Role Badge over Photo Bottom */}
                                    <div className="absolute bottom-2.5 left-2.5">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-zinc-950 font-black text-[11px] sm:text-xs uppercase tracking-wide shadow-lg shadow-black/50">
                                            <ShieldCheck className="h-3.5 w-3.5 text-zinc-950 shrink-0" />
                                            <span className="truncate">{leader.role || 'Ketua Lembaga'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Content (With Batik Silhouette Backdrop) */}
                            <div className="relative z-10 p-4 sm:p-5 space-y-3">
                                <div>
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400/90 block mb-0.5">
                                        Nama Lengkap Pejabat
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors tracking-tight leading-snug">
                                        {leader.name}
                                    </h3>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-amber-400/50 via-amber-400/20 to-transparent" />

                                {/* Responsibility / Mandate Description */}
                                <div className="p-3 rounded-lg bg-black/40 backdrop-blur-xs border border-amber-400/25 space-y-1 text-left">
                                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-300 block">
                                        Amanat & Peran Kepemimpinan
                                    </span>
                                    <p className="text-xs text-red-100/90 leading-relaxed font-normal">
                                        Penanggung jawab tertinggi dalam memimpin tata kelola {organization.name || 'lembaga desa'}, mengkoordinasikan agenda kerja strategis, dan mewakili aspirasi warga Karangwungu.
                                    </p>
                                </div>

                                {/* Official Legitimacy Badge */}
                                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/10 text-xs">
                                    <div className="flex items-center gap-2 text-zinc-200">
                                        <Landmark className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                        <span className="text-[11px] font-semibold">SK & Regulasi Pemerintah Desa</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded">
                                        Sah
                                    </span>
                                </div>

                                {/* WhatsApp / Contact Button if Phone is available */}
                                {leader.phone && (
                                    <a
                                        href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>Hubungi Pimpinan Lembaga</span>
                                    </a>
                                )}

                                {/* INTEGRATED: SEKRETARIAT & KOORDINASI */}
                                <div className="pt-3 border-t border-amber-400/30 space-y-2 text-left">
                                    <div className="flex items-center gap-2 pb-1.5 border-b border-white/10">
                                        <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                                            Sekretariat & Koordinasi
                                        </span>
                                    </div>

                                    {/* Alamat Sekretariat */}
                                    <div className="p-2.5 rounded-lg bg-black/35 backdrop-blur-xs border border-white/10 flex items-start gap-2.5">
                                        <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[8.5px] font-bold text-amber-300/80 uppercase tracking-wider block">
                                                Alamat Kantor
                                            </span>
                                            <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                                                {organization.secretariat || 'Kompleks Balai Desa Karangwungu, Kec. Karanggeneng, Kab. Lamongan, Jawa Timur 62254'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Jadwal Koordinasi */}
                                    <div className="p-2.5 rounded-lg bg-black/35 backdrop-blur-xs border border-white/10 flex items-start gap-2.5">
                                        <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[8.5px] font-bold text-amber-300/80 uppercase tracking-wider block">
                                                Jadwal Koordinasi
                                            </span>
                                            <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                                                {organization.meeting_schedule || 'Setiap Minggu Ke-1 & Koordinasi Rutin Bulanan'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Resmi */}
                                    <div className="p-2.5 rounded-lg bg-black/35 backdrop-blur-xs border border-white/10 flex items-start gap-2.5">
                                        <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                        <div className="space-y-0.5 flex-1 min-w-0">
                                            <span className="text-[8.5px] font-bold text-amber-300/80 uppercase tracking-wider block">
                                                Email Resmi
                                            </span>
                                            <a
                                                href={`mailto:${organization.email || 'pemdes@karangwungu-lamongan.desa.id'}`}
                                                className="font-mono text-xs font-semibold text-amber-300 hover:text-white hover:underline block break-all"
                                            >
                                                {organization.email || 'pemdes@karangwungu-lamongan.desa.id'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. REKOMENDASI LEMBAGA LAINNYA (Desktop Sidebar only) */}
                        {renderOtherOrganizations(false)}
                    </div>
                </div>

                {/* Bagikan Informasi Lembaga (Posisi di paling bawah seluruh halaman, baik di mobile maupun desktop) */}
                <div className="mt-8 p-4 sm:p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                        <span>Bagikan Informasi Lembaga:</span>
                    </span>

                    <div className="flex items-center gap-2">
                        <a
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Profil ${organization.name}: ${currentUrl}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                        >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>WhatsApp</span>
                        </a>

                        <button
                            type="button"
                            onClick={handleCopyUrl}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700"
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
        </AppLayout>
    );
}
