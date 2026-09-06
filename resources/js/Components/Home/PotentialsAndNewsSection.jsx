import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDateIndo } from '../../Utils/format';
import { Calendar, Eye, ArrowRight, Sparkles } from 'lucide-react';
import NewsHeadlineSlider from './NewsHeadlineSlider';

export default function PotentialsAndNewsSection({
    potentials = [],
    latestPosts = [],
    featuredPosts = [],
    potentialsTitle,
    potentialsSubtitle,
    postsTitle,
    postsSubtitle,
}) {
    const headlineSlides = (featuredPosts && featuredPosts.length > 0) ? featuredPosts : latestPosts.slice(0, 4);
    const displayPosts = latestPosts;

    return (
        <section
            id="potensi-warta"
            className="relative py-8 sm:py-12 lg:py-14 overflow-hidden"
        >
            {/* Ambient Lighting Accents */}
            <div className="ambient-glow-red top-1/3 -right-24 opacity-40 pointer-events-none" />
            <div className="ambient-glow-gold bottom-1/4 -left-24 opacity-25 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
                {/* ============================================================ */}
                {/* 1. BAGIAN ATAS: PRODUK & POTENSI UNGGULAN DESA               */}
                {/* ============================================================ */}
                <div className="space-y-4 sm:space-y-5">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                        <div className="space-y-1.5 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[11px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                                <span>Potensi & Ekonomi Kreatif</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                {potentialsTitle || "Produk & Komoditas Unggulan Karangwungu"}
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                                {potentialsSubtitle || "Menampilkan komoditas tambak bandeng, pertanian padi sawah, serta aneka produk UMKM mandiri warga desa."}
                            </p>
                        </div>

                        <Link
                            href="/potensi"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-red-950/20 transition-all shrink-0 self-start md:self-auto group"
                        >
                            <span>Jelajahi Semua Produk</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Grid Produk Potensi Unggulan (2 Kolom di Mobile, 4 Kolom di Desktop) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                        {potentials.map((item) => (
                            <Link
                                key={item.id}
                                href={`/potensi/${item.slug}`}
                                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white border border-red-500/40 dark:border-red-700/50 hover:border-red-400 shadow-lg shadow-red-950/30 hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                                        <img
                                            src={
                                                item.image ||
                                                'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
                                            }
                                            alt={item.title}
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80';
                                            }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent opacity-70" />
                                        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
                                            <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white font-bold text-[8px] sm:text-[10px] tracking-wide shadow-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-2.5 sm:p-4.5 space-y-1 sm:space-y-1.5">
                                        <h3 className="text-xs sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] sm:text-xs text-red-100/85 line-clamp-2 leading-relaxed font-normal">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-2.5 pb-2.5 sm:px-4.5 sm:pb-4.5 pt-1.5 sm:pt-2 flex items-center justify-between border-t border-red-600/40 dark:border-red-800/40 gap-1">
                                    <span className="text-[10px] sm:text-xs font-bold text-amber-300 truncate">
                                        {item.price_range}
                                    </span>
                                    <span className="text-[9px] sm:text-[11px] font-bold text-white group-hover:text-amber-300 inline-flex items-center gap-0.5 shrink-0">
                                        <span>Detail</span>
                                        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pemisah Halus Elegan Antar-Seksi */}
                <div className="relative">
                    <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 dark:via-red-800/50 to-transparent" />
                </div>

                {/* ============================================================ */}
                {/* 2. BAGIAN BAWAH: WARTA & PENGUMUMAN DESA                     */}
                {/* ============================================================ */}
                <div className="space-y-4 sm:space-y-5">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                        <div className="space-y-1.5 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[11px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                                <span>Kabar Terkini & Publikasi</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                {postsTitle || "Warta & Pengumuman Desa"}
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                                {postsSubtitle || "Informasi kegiatan pemerintahan, pembangunan infrastruktur, pertanian, dan kemasyarakatan Desa Karangwungu."}
                            </p>
                        </div>

                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-red-950/20 transition-all shrink-0 self-start md:self-auto group"
                        >
                            <span>Lihat Semua Berita</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Card Berita Utama / Headline Slider (Sesuai Referensi Gambar) */}
                    {headlineSlides && headlineSlides.length > 0 && (
                        <NewsHeadlineSlider posts={headlineSlides} />
                    )}

                    {/* Grid 4 Kartu Warta Berita (2 Kolom di Mobile, 4 Kolom di Desktop) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 pt-1">
                        {displayPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/berita/${post.slug}`}
                                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white border border-red-500/40 dark:border-red-700/50 hover:border-red-400 shadow-lg shadow-red-950/30 hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                            >
                                <div>
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                                        <img
                                            src={
                                                post.image ||
                                                'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
                                            }
                                            alt={post.title}
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80';
                                            }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-transparent opacity-70" />
                                        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
                                            <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white font-bold text-[8px] sm:text-[10px] tracking-wide shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-2.5 sm:p-4.5 space-y-1 sm:space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-[10px] font-medium text-red-200/90">
                                            <span className="flex items-center gap-1 truncate">
                                                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-300 shrink-0" />
                                                <span className="truncate">{formatDateIndo(post.published_at)}</span>
                                            </span>
                                            <span className="hidden sm:inline">&bull;</span>
                                            <span className="flex items-center gap-1 shrink-0">
                                                <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-200/80" />
                                                {post.views}
                                            </span>
                                        </div>

                                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-[10px] sm:text-[11px] text-red-100/85 line-clamp-2 leading-relaxed font-normal">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-2.5 pb-2.5 sm:px-4.5 sm:pb-4.5 pt-1 sm:pt-1.5 border-t border-red-600/40 dark:border-red-800/40 flex items-center justify-between">
                                    <span className="text-[9px] sm:text-[11px] font-bold text-white group-hover:text-amber-300 inline-flex items-center gap-1">
                                        <span>Baca Selengkapnya</span>
                                        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 group-hover:translate-x-1 transition-transform shrink-0" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
