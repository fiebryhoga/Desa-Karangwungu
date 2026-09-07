import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Search,
    X,
    Newspaper,
    FileText,
    Scale,
    UserCheck,
    Building2,
    TrendingUp,
    Image as ImageIcon,
    PieChart,
    Compass,
    ArrowRight,
    ArrowUpRight,
    Calendar,
    Sparkles,
    CheckCircle2,
    HelpCircle,
} from 'lucide-react';

const CATEGORY_TABS = [
    { key: 'all', label: 'Semua Hasil', icon: Sparkles },
    { key: 'berita', label: 'Berita & Artikel', icon: Newspaper },
    { key: 'layanan', label: 'Layanan Surat', icon: FileText },
    { key: 'regulasi', label: 'Produk Hukum', icon: Scale },
    { key: 'aparatur', label: 'Aparatur Desa', icon: UserCheck },
    { key: 'lembaga', label: 'Lembaga Desa', icon: Building2 },
    { key: 'potensi', label: 'Potensi & UMKM', icon: TrendingUp },
    { key: 'transparansi', label: 'Transparansi APBDes', icon: PieChart },
    { key: 'galeri', label: 'Galeri', icon: ImageIcon },
    { key: 'halaman', label: 'Menu & Halaman', icon: Compass },
];

const getCategoryIcon = (key) => {
    switch (key) {
        case 'berita': return Newspaper;
        case 'layanan': return FileText;
        case 'regulasi': return Scale;
        case 'aparatur': return UserCheck;
        case 'lembaga': return Building2;
        case 'potensi': return TrendingUp;
        case 'transparansi': return PieChart;
        case 'galeri': return ImageIcon;
        default: return Compass;
    }
};

const getCategoryBadgeClass = (key) => {
    switch (key) {
        case 'berita':
            return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
        case 'layanan':
            return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
        case 'regulasi':
            return 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25';
        case 'aparatur':
            return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
        case 'lembaga':
            return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
        case 'potensi':
            return 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20';
        case 'transparansi':
            return 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20';
        case 'galeri':
            return 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20';
        default:
            return 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20';
    }
};

export default function SearchIndex({
    query = '',
    category = 'all',
    results = [],
    counts = {},
    popularSearches = [],
}) {
    const [searchInput, setSearchInput] = useState(query);
    const [activeTab, setActiveTab] = useState(category);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchInput.trim();
        router.get('/cari', { q: trimmed, category: 'all' }, { preserveState: false });
    };

    const handleTabChange = (tabKey) => {
        setActiveTab(tabKey);
        router.get('/cari', { q: query, category: tabKey }, { preserveState: true, replace: true });
    };

    const handlePopularClick = (term) => {
        setSearchInput(term);
        router.get('/cari', { q: term, category: 'all' }, { preserveState: false });
    };

    return (
        <AppLayout>
            <SeoHead
                title={query ? `Pencarian: "${query}" - Desa Karangwungu` : 'Pencarian Informasi - Desa Karangwungu'}
                description="Pencarian terpadu informasi dan layanan publik Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Telusuri berita, permohonan surat online, produk hukum, aparatur, dan dokumen desa."
                keywords="Cari Informasi Karangwungu, Search Desa Karangwungu, Layanan Online Karangwungu, APBDes Karangwungu"
                breadcrumbs={[
                    { label: 'Beranda', url: '/' },
                    { label: 'Pencarian Informasi', url: '/cari' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Pusat Penelusuran Informasi Desa"
                    title={query ? `Hasil Penelusuran: "${query}"` : "Pencarian Informasi Desa"}
                    subtitle="Temukan seluruh informasi berita, permohonan surat warga, produk hukum, aparatur pemerintah, lembaga, dan transparansi APBDes dalam satu pintu."
                    actions={[
                        {
                            label: 'Layanan Surat Online',
                            href: '/layanan/ajukan',
                            icon: FileText,
                            variant: 'primary',
                        },
                        {
                            label: 'Lacak Berkas',
                            href: '/layanan/lacak',
                            icon: Search,
                            variant: 'secondary',
                        },
                    ]}
                />

                {/* 2. SEARCH INPUT BOX & POPULAR SUGGESTIONS */}
                <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2 sm:gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Ketik kata kunci apa saja (contoh: SKTM, BPD, Kades, BLT, Perdes, Fasilitas)..."
                                className="w-full pl-10 sm:pl-12 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                autoFocus
                            />
                            {searchInput && (
                                <button
                                    type="button"
                                    onClick={() => setSearchInput('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 cursor-pointer"
                        >
                            <Search className="h-4 w-4" />
                            <span className="hidden sm:inline">Cari Informasi</span>
                            <span className="sm:hidden">Cari</span>
                        </button>
                    </form>

                    {/* Popular search pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-amber-500" />
                            <span>Pencarian Populer:</span>
                        </span>
                        {popularSearches.map((term, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handlePopularClick(term)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-zinc-700 dark:hover:text-amber-300 transition-colors cursor-pointer border border-transparent hover:border-red-200 dark:hover:border-amber-400/30"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. CATEGORY TABS BAR */}
                {query && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs scrollbar-none">
                        {CATEGORY_TABS.map((tab) => {
                            const TabIcon = tab.icon;
                            const count = counts[tab.key] ?? 0;
                            const isActive = activeTab === tab.key;

                            // Only display tabs that have results or if it's the 'all' tab
                            if (tab.key !== 'all' && count === 0) return null;

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => handleTabChange(tab.key)}
                                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-red-600 text-white shadow-md'
                                            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300'
                                    }`}
                                >
                                    <TabIcon className="h-3.5 w-3.5" />
                                    <span>{tab.label}</span>
                                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                                        isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 4. RESULTS SECTION */}
                <div>
                    {!query ? (
                        // Initial State (No search yet)
                        <div className="p-8 sm:p-12 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4 max-w-2xl mx-auto">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-amber-300 flex items-center justify-center mx-auto shadow-md border border-amber-400/30">
                                <Search className="h-7 w-7" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                                    Mulai Penelusuran Anda
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Ketik kata kunci pada bilah pencarian di atas untuk menelusuri seluruh data, publikasi, layanan surat, dan profil resmi Desa Karangwungu secara cepat.
                                </p>
                            </div>
                        </div>
                    ) : results.length === 0 ? (
                        // Empty State (No match found)
                        <div className="p-8 sm:p-12 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4 max-w-xl mx-auto">
                            <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                                <HelpCircle className="h-7 w-7" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                                    Tidak Ada Hasil Ditemukan
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Tidak menemukan informasi yang cocok untuk kata kunci <span className="font-bold text-zinc-800 dark:text-zinc-200">"{query}"</span>.
                                </p>
                            </div>
                            <div className="pt-2 text-xs text-zinc-500 space-y-1 text-left bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80">
                                <p className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">Tips pencarian:</p>
                                <ul className="list-disc list-inside space-y-0.5 text-zinc-600 dark:text-zinc-400">
                                    <li>Periksa kembali ejaan kata kunci Anda.</li>
                                    <li>Gunakan kata yang lebih umum (misal: "SKTM", "surat", "BPD", "bansos", "lurah").</li>
                                    <li>Coba pilih tab kategori lain atau klik "Semua Hasil".</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        // Results Grid
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
                                <span>
                                    Menampilkan <strong className="text-zinc-900 dark:text-white font-bold">{results.length}</strong> hasil untuk "{query}"
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {results.map((item) => {
                                    const IconComponent = getCategoryIcon(item.category_key);
                                    const badgeClass = getCategoryBadgeClass(item.category_key);

                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.url}
                                            className="group relative p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-red-500/40 dark:hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3 cursor-pointer"
                                        >
                                            <div className="space-y-2">
                                                {/* Top Meta: Category & Date/Label */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold border ${badgeClass}`}>
                                                        <IconComponent className="h-3 w-3 shrink-0" />
                                                        <span>{item.badge || item.category}</span>
                                                    </span>

                                                    {item.date && (
                                                        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
                                                            {item.date}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-amber-300 transition-colors leading-snug">
                                                    {item.title}
                                                </h4>

                                                {/* Description */}
                                                {item.description && (
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Action Link Footer */}
                                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                                                <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
                                                    {item.category}
                                                </span>
                                                <span className="inline-flex items-center gap-1 font-bold text-red-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
                                                    <span>Buka Informasi</span>
                                                    <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
