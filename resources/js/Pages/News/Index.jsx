import React, { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import Button from '../../Components/UI/Button';
import Pagination from '../../Components/UI/Pagination';
import { formatDateIndo } from '../../Utils/format';
import {
    Search,
    Calendar,
    Eye,
    ChevronRight,
    ChevronDown,
    Check,
    Sparkles,
    Flame,
    ArrowUpRight,
    Tag,
    Newspaper,
    Clock,
} from 'lucide-react';

export default function NewsIndex({
    posts = { data: [], links: [] },
    recommendedPosts = [],
    popularPosts = [],
    filters = {},
    categories = [],
}) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const otherDropdownRef = useRef(null);

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

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            '/berita',
            {
                search: searchTerm,
                category: filters.category !== 'Semua' ? filters.category : undefined,
            },
            { preserveState: true }
        );
    };

    const handleCategoryFilter = (cat) => {
        router.get(
            '/berita',
            {
                search: searchTerm || undefined,
                category: cat === 'Semua' ? undefined : cat,
            },
            { preserveState: true }
        );
    };

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(filters.category);

    const allPosts = posts.data || [];
    const headlinePost = allPosts.length > 0 ? allPosts[0] : null;
    const gridPosts = allPosts.length > 0 ? allPosts.slice(1) : [];

    const recommendedList =
        recommendedPosts && recommendedPosts.length > 0
            ? recommendedPosts
            : allPosts.slice(0, 3);
    const popularList =
        popularPosts && popularPosts.length > 0
            ? popularPosts
            : [...allPosts]
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 4);

    return (
        <AppLayout>
            <SeoHead
                title="Warta Berita & Pengumuman Desa Karangwungu"
                description="Kabar terkini seputar kegiatan pemerintahan, pembangunan infrastruktur, pertanian, panen raya, dan pengumuman resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Lamongan."
                keywords="Berita Desa Karangwungu, Pengumuman Desa Karangwungu, Agenda Karangwungu Lamongan, Berita Lamongan"
                breadcrumbs={[{ label: 'Berita & Informasi', url: '/berita' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Kanal Informasi & Warta Desa"
                    title="Berita & Pengumuman Resmi"
                    subtitle="Pusat rilis berita pembangunan, agenda musyawarah desa, program ketahanan pangan, bantuan sosial, dan informasi publik Pemerintah Desa Karangwungu."
                />

                {/* 2. SEARCH & CATEGORY FILTER TOOLBAR */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Filter Pills (5 Utama + 1 Lainnya Dropdown) */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {primaryCategories.map((cat) => {
                            const isActive =
                                filters.category === cat ||
                                (cat === 'Semua' && !filters.category);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryFilter(cat)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}

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
                                    <span>{isOtherSelected ? filters.category : 'Lainnya'}</span>
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                            isOtherOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOtherOpen && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                        <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                            Kategori Lainnya
                                        </div>
                                        {otherCategories.map((cat) => {
                                            const isCatActive = filters.category === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        handleCategoryFilter(cat);
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

                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="w-full md:w-80 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                            <input
                                type="text"
                                placeholder="Cari warta berita..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400"
                            />
                        </div>
                        <Button type="submit" variant="red" size="sm" className="shrink-0 shadow-xs cursor-pointer">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* 3. HEADLINE / FEATURED ARTICLE (IF AVAILABLE) */}
                {headlinePost && !filters.search && !filters.category && (
                    <div className="relative rounded-2xl overflow-hidden border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-xl shadow-red-950/25">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                            {/* Headline Image */}
                            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 w-full overflow-hidden relative">
                                <img
                                    src={
                                        headlinePost.image ||
                                        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80'
                                    }
                                    alt={headlinePost.title}
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-xs font-extrabold shadow-md">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        <span>Berita Utama</span>
                                    </span>
                                </div>
                            </div>

                            {/* Headline Content */}
                            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-red-200">
                                        <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 font-bold">
                                            {headlinePost.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-amber-300" />
                                            <span>{formatDateIndo(headlinePost.published_at)}</span>
                                        </span>
                                    </div>

                                    <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                                        <Link
                                            href={`/berita/${headlinePost.slug}`}
                                            className="hover:text-amber-300 transition-colors"
                                        >
                                            {headlinePost.title}
                                        </Link>
                                    </h2>

                                    <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed line-clamp-3">
                                        {headlinePost.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                                    <span className="text-xs text-red-200 flex items-center gap-1">
                                        <Eye className="h-3.5 w-3.5 text-amber-300" />
                                        <span>{headlinePost.views}x dibaca</span>
                                    </span>

                                    <Link
                                        href={`/berita/${headlinePost.slug}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs hover:bg-amber-300 transition-all shadow-md cursor-pointer"
                                    >
                                        <span>Baca Selengkapnya</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 4. MAIN ARTICLE GRID & SIDEBAR WIDGETS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT: Articles List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                                    <Newspaper className="h-4 w-4" />
                                </div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Daftar Artikel & Warta Terkini
                                </h3>
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {allPosts.length} Berita
                            </span>
                        </div>

                        {allPosts.length === 0 ? (
                            <div className="p-12 rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-2">
                                <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                                    Tidak ada artikel berita ditemukan.
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Silakan gunakan kata kunci pencarian lain atau pilih kategori lain.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {(headlinePost && !filters.search && !filters.category ? gridPosts : allPosts).map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/berita/${post.slug}`}
                                        className="group rounded-2xl overflow-hidden flex flex-col bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer justify-between"
                                    >
                                        <div>
                                            <div className="h-44 w-full overflow-hidden bg-zinc-950 relative">
                                                <img
                                                    src={
                                                        post.image ||
                                                        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
                                                    }
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-2.5 left-2.5">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-bold shadow-xs">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-4 space-y-2">
                                                <div className="flex items-center gap-2.5 text-[11px] text-red-200/70">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3 text-amber-300" />
                                                        <span>{formatDateIndo(post.published_at)}</span>
                                                    </span>
                                                    <span>&bull;</span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3 text-amber-300" />
                                                        <span>{post.views}x</span>
                                                    </span>
                                                </div>

                                                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                                    {post.title}
                                                </h4>

                                                <p className="text-xs text-red-100/80 line-clamp-2 leading-relaxed">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4 pt-2 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center justify-between">
                                            <span>Baca Selengkapnya</span>
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination links={posts.links} meta={posts} />
                    </div>

                    {/* RIGHT: Sidebar Widgets */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Paling Populer (Card Merah-Emas) */}
                        <div className="rounded-2xl p-5 bg-gradient-to-br from-red-800 via-red-900 to-zinc-950 text-white shadow-xl shadow-red-950/20 border border-red-500/40 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-white/15">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-black/40 text-amber-300 flex items-center justify-center border border-amber-400/30">
                                        <Flame className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                        Paling Populer
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded-full border border-white/15">
                                    Top Views
                                </span>
                            </div>

                            <div className="space-y-3">
                                {popularList.map((item, idx) => (
                                    <Link
                                        key={item.id}
                                        href={`/berita/${item.slug}`}
                                        className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-black/25 transition-colors cursor-pointer"
                                    >
                                        <span className="h-6 w-6 rounded-lg bg-amber-400 text-zinc-950 text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                            {idx + 1}
                                        </span>
                                        <div className="space-y-0.5 min-w-0 flex-1">
                                            <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-red-200">
                                                <span className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3 text-amber-300" />
                                                    <span>{item.views}x dibaca</span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Rekomendasi Redaksi */}
                        <div className="rounded-2xl p-5 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-amber-400 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                        Rekomendasi
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/50">
                                    Pilihan
                                </span>
                            </div>

                            <div className="space-y-3">
                                {recommendedList.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/berita/${item.slug}`}
                                        className="group flex gap-3 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 -mx-2 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-zinc-950 relative">
                                            <img
                                                src={
                                                    item.image ||
                                                    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=200&q=80'
                                                }
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="space-y-0.5 min-w-0 flex-1">
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 block truncate">
                                                {item.category}
                                            </span>
                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h4>
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                                                {formatDateIndo(item.published_at)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
