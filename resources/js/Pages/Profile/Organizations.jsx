import React, { useState, useRef, useEffect } from 'react';
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
    ChevronDown,
    Check,
    CheckCircle2,
    Scale,
    Sparkles,
    Calendar,
    Phone,
    MapPin,
    ArrowRight,
} from 'lucide-react';

export default function Organizations({ organizationsSettings = {} }) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const otherDropdownRef = useRef(null);

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

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
                setIsOtherOpen(false);
            }
        };
        if (isOtherOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOtherOpen]);

    const defaultCategories = [
        'Semua',
        'BPD',
        'PKK',
        'Karang Taruna',
        'LPM',
        'Satlinmas',
        'RT / RW',
        'Kelompok Tani & Tambak',
    ];

    const dynamicCats = organizationsData.map((o) => o.category).filter(Boolean);
    const categories =
        dynamicCats.length > 0
            ? ['Semua', ...Array.from(new Set(dynamicCats))]
            : defaultCategories;

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(selectedCategory);

    // Filter Logic
    const filteredOrganizations = organizationsData.filter((org) => {
        const matchesCategory =
            selectedCategory === 'Semua' || org.category === selectedCategory;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
            q === '' ||
            (org.name || '').toLowerCase().includes(q) ||
            (org.description || '').toLowerCase().includes(q) ||
            (org.leader?.name || '').toLowerCase().includes(q) ||
            (org.tagline || '').toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
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

                {/* 2. CATEGORY FILTER & SEARCH TOOLBAR */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Filter Pills (5 Utama + 1 Lainnya Dropdown) */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {primaryCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Tombol ke-6: Lainnya + Dropdown Menu */}
                        {otherCategories.length > 0 && (
                            <div className="relative" ref={otherDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsOtherOpen(!isOtherOpen)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                        isOtherSelected
                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                    }`}
                                >
                                    <span>{isOtherSelected ? selectedCategory : 'Lainnya'}</span>
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                            isOtherOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOtherOpen && (
                                    <div className="absolute left-0 mt-2 w-52 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                        <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                            Lembaga Lainnya
                                        </div>
                                        {otherCategories.map((cat) => {
                                            const isCatActive = selectedCategory === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategory(cat);
                                                        setIsOtherOpen(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                                        isCatActive
                                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 font-bold'
                                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-amber-400'
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    {isCatActive && (
                                                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                        <input
                            type="text"
                            placeholder="Cari lembaga atau pengurus..."
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
                            Silakan coba kata kunci lain atau pilih kategori Semua.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrganizations.map((org) => {
                            const IconComponent = org.icon;
                            return (
                                <div
                                    key={org.id}
                                    className="group rounded-lg overflow-hidden bg-gradient-to-b from-red-800 via-red-900 to-[#2c0508] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-red-500/40"
                                >
                                    <div>
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
                                    <div className="p-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2 text-xs">
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
