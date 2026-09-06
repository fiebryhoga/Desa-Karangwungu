import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
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
    Search,
    CheckCircle2,
    Scale,
    Sparkles,
    Calendar,
    Phone,
    MapPin,
    ArrowRight,
} from 'lucide-react';

// Siluet Batik Truntum Kencana (Motif Kuntum Bintang Melati - Simbol Kebersamaan, Guyub Rukun & Pengabdian Lembaga Kemasyarakatan)
const BATIK_TRUNTUM_PATTERN = `data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' stroke='%23fbbf24'%3E%3Ccircle cx='35' cy='35' r='2.2' /%3E%3Cpath d='M35 24 C32 29, 32 32, 35 35 C38 32, 38 29, 35 24 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M35 46 C32 41, 32 38, 35 35 C38 38, 38 41, 35 46 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M24 35 C29 32, 32 32, 35 35 C32 38, 29 38, 24 35 Z' stroke-width='0.8' fill='none' /%3E%3Cpath d='M46 35 C41 32, 38 32, 35 35 C38 38, 41 38, 46 35 Z' stroke-width='0.8' fill='none' /%3E%3Ccircle cx='28' cy='28' r='1.2' /%3E%3Ccircle cx='42' cy='28' r='1.2' /%3E%3Ccircle cx='28' cy='42' r='1.2' /%3E%3Ccircle cx='42' cy='42' r='1.2' /%3E%3Ccircle cx='35' cy='35' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Cpath d='M0 0 L70 70 M70 0 L0 70' stroke='%23fbbf24' stroke-width='0.6' stroke-dasharray='1 4' opacity='0.5' /%3E%3Ccircle cx='35' cy='7' r='1' /%3E%3Ccircle cx='35' cy='63' r='1' /%3E%3Ccircle cx='7' cy='35' r='1' /%3E%3Ccircle cx='63' cy='35' r='1' /%3E%3Ccircle cx='0' cy='0' r='2.2' /%3E%3Ccircle cx='0' cy='0' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='70' cy='0' r='2.2' /%3E%3Ccircle cx='70' cy='0' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='0' cy='70' r='2.2' /%3E%3Ccircle cx='0' cy='70' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3Ccircle cx='70' cy='70' r='2.2' /%3E%3Ccircle cx='70' cy='70' r='15' fill='none' stroke='%23fbbf24' stroke-width='0.8' stroke-dasharray='2 3' opacity='0.75' /%3E%3C/g%3E%3C/svg%3E`;

export default function Organizations({ organizationsSettings = {} }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Parse organizations list from backend settings
    let rawOrgs = [];
    if (organizationsSettings.organizations_list_data && Array.isArray(organizationsSettings.organizations_list_data)) {
        rawOrgs = organizationsSettings.organizations_list_data;
    } else if (organizationsSettings.organizations_list && typeof organizationsSettings.organizations_list === 'string') {
        try {
            rawOrgs = JSON.parse(organizationsSettings.organizations_list);
        } catch (e) {
            rawOrgs = [];
        }
    } else if (Array.isArray(organizationsSettings.organizations_list)) {
        rawOrgs = organizationsSettings.organizations_list;
    }

    // Map icon string to component
    const organizationsData = rawOrgs.map((org) => ({
        ...org,
        icon: getIconComponent(org.icon, Users),
        programs: org.programs || [],
        structure: org.structure || [],
        leader: org.leader || { name: '', role: '', phone: '' },
    }));

    // Helper: generate placeholder avatar URL with royal red / amber gold
    const avatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f1d1d&color=fcd34d&size=256&bold=true&font-size=0.35`;

    // Filter Logic
    const filteredOrganizations = organizationsData.filter((org) => {
        const q = searchQuery.trim().toLowerCase();
        return (
            q === '' ||
            (org.name || '').toLowerCase().includes(q) ||
            (org.description || '').toLowerCase().includes(q) ||
            (org.leader?.name || '').toLowerCase().includes(q) ||
            (org.tagline || '').toLowerCase().includes(q)
        );
    });

    return (
        <AppLayout>
            <SeoHead
                title="Lembaga & Organisasi Kemasyarakatan Desa Karangwungu"
                description="Daftar Lembaga dan Organisasi Kemasyarakatan Desa Karangwungu: BPD, PKK, Karang Taruna, LPM, Satlinmas, RT/RW, Kelompok Tani, dan Pembudidaya Ikan Tambak."
                keywords="Lembaga Desa Karangwungu, BPD Karangwungu, Karang Taruna Karangwungu, PKK Karangwungu Lamongan, LPM Karangwungu, RT RW Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Lembaga & Organisasi', url: '/profil/lembaga' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Mitra & Kemasyarakatan Desa"
                    title="Lembaga & Organisasi Desa Karangwungu"
                    subtitle="Wadah aspirasi, musyawarah perwakilan warga, pemberdayaan perempuan, kepemudaan, gotong royong swadaya, serta ketertiban lingkungan Desa Karangwungu."
                />

                {/* 2. SEARCH & COUNT TOOLBAR */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            {filteredOrganizations.length} Lembaga & Organisasi
                        </span>
                        <span>Desa Karangwungu</span>
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                        <input
                            type="text"
                            placeholder="Cari nama lembaga atau pengurus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400"
                        />
                    </div>
                </div>

                {/* 3. ORGANIZATIONS GRID */}
                {filteredOrganizations.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-2">
                        <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                            Tidak ada lembaga atau organisasi ditemukan.
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Silakan coba kata kunci pencarian lain.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrganizations.map((org) => {
                            const IconComponent = org.icon;
                            return (
                                <div
                                    key={org.id}
                                    className="group relative rounded-lg overflow-hidden bg-gradient-to-b from-red-800 via-red-900 to-[#2c0508] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-red-500/40"
                                >
                                    {/* Siluet Batik Truntum Kencana Background Layer */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-12 dark:opacity-10 group-hover:opacity-20 dark:group-hover:opacity-15 transition-opacity duration-500 bg-repeat"
                                        style={{
                                            backgroundImage: `url("${BATIK_TRUNTUM_PATTERN}")`,
                                            backgroundSize: "70px 70px",
                                        }}
                                    />

                                    <div className="relative z-10">
                                        {/* 1. Header Banner with Badges */}
                                        <div className="h-36 sm:h-40 w-full overflow-hidden bg-zinc-950 relative">
                                            <img
                                                src={org.image}
                                                alt={org.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/40 to-transparent" />


                                        </div>

                                        {/* 2. Overlapping Large Official Logo */}
                                        <div className="px-4 sm:px-5 -mt-10 sm:-mt-12 relative z-10 flex items-end justify-between">
                                            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-white dark:bg-zinc-900 p-2 sm:p-2.5 border-2 border-amber-400 shadow-2xl flex items-center justify-center shrink-0 ring-4 ring-red-950/60">
                                                {org.logo ? (
                                                    <img
                                                        src={org.logo}
                                                        alt={`Logo ${org.name}`}
                                                        className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <IconComponent className="h-10 w-10 text-red-600 dark:text-amber-400" />
                                                )}
                                            </div>
                                        </div>

                                        {/* 3. Title & Tagline */}
                                        <div className="px-4 sm:px-5 pt-3.5 space-y-1">
                                            <Link href={`/profil/lembaga/${org.id}`}>
                                                <h3 className="text-base sm:text-lg font-black text-white hover:text-amber-300 transition-colors leading-snug">
                                                    {org.name}
                                                </h3>
                                            </Link>
                                            <p className="text-xs text-amber-300 font-medium italic line-clamp-1">
                                                "{org.tagline}"
                                            </p>
                                        </div>

                                        {/* 4. Card Body */}
                                        <div className="p-4 sm:p-5 pt-3 space-y-3.5">
                                            {/* Pimpinan Bar */}
                                            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-black/35 border border-white/10">
                                                <div className="h-10 w-10 rounded-lg overflow-hidden bg-red-950 border border-amber-400/50 shrink-0 flex items-center justify-center">
                                                    <img
                                                        src={avatarUrl(org.leader.name)}
                                                        alt={org.leader.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                                                        {org.leader.role || 'Pimpinan'}
                                                    </span>
                                                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                                                        {org.leader.name}
                                                    </h4>
                                                </div>
                                            </div>

                                            {/* Deskripsi */}
                                            <p className="text-xs text-red-100/85 leading-relaxed line-clamp-2">
                                                {org.description}
                                            </p>

                                            {/* Program Prioritas */}
                                            {org.programs && org.programs.length > 0 && (
                                                <div className="space-y-1.5 pt-0.5">
                                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                                                        Fokus & Agenda Utama
                                                    </span>
                                                    <ul className="space-y-1 text-xs text-red-100/90">
                                                        {org.programs.slice(0, 2).map((prog, pIdx) => (
                                                            <li key={pIdx} className="flex items-start gap-2">
                                                                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                                                <span className="text-[11px] leading-snug line-clamp-1">
                                                                    {typeof prog === 'string' ? prog : prog.title}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* 5. Card Footer */}
                                    <div className="relative z-10 p-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
                                        <span className="text-[10px] text-red-200/70 truncate max-w-[150px] sm:max-w-[170px]" title={org.secretariat}>
                                            {org.period || 'Periode Aktif'}
                                        </span>
                                        <Link
                                            href={`/profil/lembaga/${org.id}`}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-amber-100 hover:text-white text-xs font-bold border border-amber-400/40 shadow-sm hover:shadow-md transition-all shrink-0"
                                        >
                                            <span>Detail Lembaga</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
