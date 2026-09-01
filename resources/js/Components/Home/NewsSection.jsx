import React from 'react';
import { Link } from '@inertiajs/react';
import { formatDateIndo } from '../../Utils/format';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

export default function NewsSection({ latestPosts = [] }) {
    const displayPosts = latestPosts.slice(0, 4);

    return (
        <section
            id="berita"
            className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-10 sm:py-14 lg:py-16 overflow-hidden"
        >
            {/* Ambient Lighting Accents */}
            <div className="ambient-glow-red -bottom-20 -right-20 opacity-25 pointer-events-none" />
            <div className="ambient-glow-gold top-1/4 -left-20 opacity-20 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto space-y-6 sm:space-y-8">
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                            <span>Kabar Terkini & Publikasi</span>
                        </div>
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                            Warta & Pengumuman Desa
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                            Informasi kegiatan pemerintahan, pembangunan infrastruktur, pertanian, dan kemasyarakatan Desa Karangwungu.
                        </p>
                    </div>

                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-amber-400 text-xs font-semibold border border-zinc-200/80 dark:border-zinc-800 transition-all shrink-0 self-start md:self-auto group shadow-xs"
                    >
                        <span>Lihat Semua Berita</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* 2. Grid 4 News Cards (1 Baris 4 Kolom di Desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {displayPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/berita/${post.slug}`}
                            className="group relative rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-red-500/60 dark:hover:border-red-500/50 shadow-md hover:shadow-xl hover:shadow-red-950/10 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                        >
                            <div>
                                {/* Card Image Banner */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={
                                            post.image ||
                                            'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
                                        }
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    {/* Top Category Badge */}
                                    <div className="absolute top-2.5 left-2.5 z-10">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold text-[9px] tracking-wide shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-1.5">
                                    {/* Meta Bar */}
                                    <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-red-600 dark:text-amber-400" />
                                            {formatDateIndo(post.published_at)}
                                        </span>
                                        <span>&bull;</span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {post.views}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer Link */}
                            <div className="px-4 pb-4 pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-red-600 dark:text-amber-400 group-hover:text-red-700 dark:group-hover:text-amber-300 inline-flex items-center gap-1">
                                    <span>Baca Selengkapnya</span>
                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
