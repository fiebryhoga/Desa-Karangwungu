import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Badge from '../../Components/UI/Badge';
import Button from '../../Components/UI/Button';
import Pagination from '../../Components/UI/Pagination';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Search, Calendar, Eye, ChevronRight, Sparkles, Flame, Bell, ArrowUpRight } from 'lucide-react';

export default function NewsIndex({
    posts = { data: [], links: [] },
    recommendedPosts = [],
    popularPosts = [],
    filters = {},
    categories = [],
}) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/berita', {
            search: searchTerm,
            category: filters.category !== 'Semua' ? filters.category : undefined,
        }, { preserveState: true });
    };

    const handleCategoryFilter = (cat) => {
        router.get('/berita', {
            search: searchTerm || undefined,
            category: cat === 'Semua' ? undefined : cat,
        }, { preserveState: true });
    };

    const allPosts = posts.data || [];
    const recommendedList = (recommendedPosts && recommendedPosts.length > 0) ? recommendedPosts : allPosts.slice(0, 3);
    const popularList = (popularPosts && popularPosts.length > 0) ? popularPosts : [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

    return (
        <AppLayout>
            <SeoHead
                title="Warta Berita & Pengumuman Desa"
                description="Kabar terkini seputar kegiatan pemerintahan, pembangunan, pertanian, panen raya, dan pengumuman resmi Pemerintah Desa Karangwungu, Karanggeneng, Lamongan."
                keywords="Berita Desa Karangwungu, Pengumuman Desa Karangwungu, Agenda Karangwungu Lamongan"
                breadcrumbs={[{ label: 'Berita & Informasi', url: '/berita' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-12 space-y-6">
                {/* Clean Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Warta Desa & Pengumuman Resmi
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                        Pusat rilis berita pembangunan, agenda musyawarah, program bantuan sosial, dan informasi publik Desa Karangwungu.
                    </p>
                </div>

                {/* Search & Category Filter Strip */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Pills */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryFilter(cat)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    filters.category === cat || (cat === 'Semua' && !filters.category)
                                        ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full md:w-80 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                            <input
                                type="text"
                                placeholder="Cari artikel berita..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                            />
                        </div>
                        <Button type="submit" variant="red" size="sm" className="shrink-0 shadow-md">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* 2-Column Layout: Left (4-Grid Main Articles) + Right (Sidebar Widgets) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: Main Articles (3 Grid) */}
                    <div className="lg:col-span-8 space-y-6">
                        {allPosts.length === 0 ? (
                            <Card className="border-dashed border-zinc-300 dark:border-zinc-800">
                                <CardContent className="p-8 text-center space-y-2">
                                    <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                                        Tidak ada artikel berita ditemukan.
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Silakan gunakan kata kunci pencarian lain atau pilih kategori lain.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {allPosts.map((post) => (
                                    <Link
                                        key={post.id}
                                        href={`/berita/${post.slug}`}
                                        className="group rounded-lg overflow-hidden flex flex-col bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white border border-red-500/40 dark:border-red-700/50 hover:border-amber-400 shadow-md shadow-red-950/20 hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                                    >
                                        <div className="h-40 w-full overflow-hidden bg-zinc-950 relative">
                                            <img
                                                src={post.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                                            <div className="absolute top-2.5 left-2.5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-extrabold tracking-wide shadow-md">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2.5 text-[10px] text-red-200">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3 text-amber-300" />
                                                        <span>{formatDateIndo(post.published_at)}</span>
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3 text-amber-300" />
                                                        <span>{post.views}x</span>
                                                    </span>
                                                </div>

                                                <h3 className="text-xs sm:text-sm font-extrabold line-clamp-2 text-white group-hover:text-amber-300 transition-colors leading-snug">
                                                    {post.title}
                                                </h3>

                                                <p className="text-[11px] line-clamp-2 leading-relaxed text-red-100/80">
                                                    {post.excerpt}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-red-500/30 flex items-center justify-between text-[11px] font-bold text-amber-300 group-hover:text-amber-200">
                                                <span>Baca</span>
                                                <div className="h-5 w-5 rounded-full bg-black/30 border border-white/15 text-amber-300 group-hover:bg-amber-400 group-hover:text-zinc-950 group-hover:border-amber-400 flex items-center justify-center transition-all duration-300 shadow-xs">
                                                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination Component */}
                        <Pagination links={posts.links} meta={posts} />
                    </div>

                    {/* RIGHT COLUMN: Sidebar Widgets (Rekomendasi, Populer, Pengumuman) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 1. Berita Rekomendasi (Pilihan Redaksi) */}
                        <div className="rounded-lg p-5 bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                                        Rekomendasi
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/50">
                                    Pilihan
                                </span>
                            </div>

                            <div className="space-y-3.5">
                                {recommendedList.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/berita/${item.slug}`}
                                        className="group flex gap-3 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 -mx-2 rounded-lg transition-colors"
                                    >
                                        <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-zinc-950 relative">
                                            <img
                                                src={item.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=200&q=80'}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1 min-w-0 flex-1">
                                            <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 block truncate">
                                                {item.category}
                                            </span>
                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
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

                        {/* 2. Berita Terpopuler (Banyak Dibaca) */}
                        <div className="rounded-lg p-5 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 border border-red-500/40 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-red-500/30">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-black/30 text-amber-300 flex items-center justify-center border border-white/10">
                                        <Flame className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
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
                                        className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-black/25 transition-colors"
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
