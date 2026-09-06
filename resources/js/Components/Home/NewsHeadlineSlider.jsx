import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import { formatDateIndo } from '../../Utils/format';
import { Calendar, Eye, User, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export default function NewsHeadlineSlider({ posts = [] }) {
    if (!posts || posts.length === 0) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const timerRef = useRef(null);

    const total = posts.length;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
    }, [total]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
    }, [total]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-advance timer (5 seconds)
    useEffect(() => {
        if (total <= 1 || isPaused) return;

        timerRef.current = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [total, isPaused, nextSlide]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }

        setTouchStartX(null);
        setTouchEndX(null);
    };

    const activePost = posts[currentIndex];

    return (
        <div
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-white/10 shadow-xl shadow-black/25 bg-zinc-950 group select-none transition-all duration-300"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Aspect Ratio Container */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[290px] sm:min-h-[350px] md:min-h-[380px] lg:min-h-[410px] w-full flex flex-col justify-between overflow-hidden">
                {/* Background Images with Crossfade */}
                {posts.map((post, idx) => (
                    <div
                        key={post.id || idx}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <img
                            src={
                                post.image ||
                                'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80'
                            }
                            alt={post.title}
                            onError={(e) => {
                                e.target.src =
                                    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80';
                            }}
                            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                                idx === currentIndex ? 'scale-100 group-hover:scale-105' : 'scale-110'
                            }`}
                        />
                        {/* 1. Cinematic dark gradient overlays untuk keterbacaan teks yang tajam */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />

                        {/* 2. Gradasi merah halus dari BAGIAN BAWAH KANAN (bottom-right) */}
                        <div className="absolute inset-0 bg-gradient-to-tl from-red-600/35 via-red-950/20 to-transparent" />
                    </div>
                ))}

                {/* Ambient accent glow: pendaran merah halus di sudut bawah kanan */}
                <div className="absolute -bottom-16 -right-16 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-red-600/25 blur-3xl pointer-events-none z-[1]" />
                <div className="absolute -bottom-10 right-28 w-44 h-44 rounded-full bg-amber-500/15 blur-2xl pointer-events-none z-[1]" />

                {/* Top Section: Badges */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-7 flex items-center justify-between gap-3">
                    <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
                        {/* Kategori Badge (Gold / Amber Style seperti di referensi) */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500 text-zinc-950 font-black text-[10px] sm:text-xs tracking-wider uppercase shadow-md shadow-amber-500/25">
                            <Sparkles className="h-3 w-3 fill-zinc-950 text-zinc-950" />
                            <span>{activePost.category || 'Berita Utama'}</span>
                        </span>

                        {/* Headline Counter Badge */}
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md border border-white/20 text-white font-medium text-[10px] sm:text-xs tracking-wide">
                            Headline {currentIndex + 1} dari {total}
                        </span>
                    </div>

                    {/* Quick Link Indikator */}
                    <Link
                        href={`/berita/${activePost.slug}`}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white text-xs font-medium transition-all group-hover:translate-x-0.5"
                    >
                        <span>Baca Berita</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* Bottom Section: Title, Meta Info & Slider Controls */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-7 pt-0 flex flex-col justify-end gap-3 sm:gap-4">
                    {/* Clickable Title & Excerpt */}
                    <Link
                        href={`/berita/${activePost.slug}`}
                        className="group/title block max-w-4xl cursor-pointer"
                    >
                        <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black text-white group-hover/title:text-amber-300 transition-colors duration-200 leading-snug sm:leading-tight drop-shadow-md line-clamp-2 sm:line-clamp-3">
                            {activePost.title}
                        </h3>

                        {activePost.excerpt && (
                            <p className="mt-2 text-xs sm:text-sm text-zinc-200/90 line-clamp-1 sm:line-clamp-2 leading-relaxed font-normal max-w-3xl drop-shadow-sm hidden sm:block">
                                {activePost.excerpt}
                            </p>
                        )}
                    </Link>

                    {/* Bottom Row: Metadata & Carousel Navigation Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-red-500/25 dark:border-white/15">
                        {/* Meta Tags: Tanggal & Penulis */}
                        <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium text-zinc-300/90">
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                <span>{formatDateIndo(activePost.published_at)}</span>
                            </span>

                            <span className="text-white/40">•</span>

                            <span className="inline-flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                <span className="line-clamp-1 max-w-[180px] sm:max-w-none">
                                    {activePost.author || 'Pemerintah Desa Karangwungu'}
                                </span>
                            </span>

                            {activePost.views !== undefined && (
                                <>
                                    <span className="text-white/40 hidden sm:inline">•</span>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-300/80">
                                        <Eye className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                        <span>{activePost.views} dilihat</span>
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Slider Navigation Bar (Kanan Bawah persis referensi) */}
                        {total > 1 && (
                            <div
                                className="self-end sm:self-auto inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Tombol Panah Kiri */}
                                <button
                                    type="button"
                                    onClick={prevSlide}
                                    aria-label="Slide Sebelumnya"
                                    className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-white/80 hover:text-white cursor-pointer"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>

                                {/* Slider Indicators (Bar aktif oranye + dots) */}
                                <div className="flex items-center gap-1 px-1">
                                    {posts.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => goToSlide(idx)}
                                            aria-label={`Ke slide ${idx + 1}`}
                                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                                idx === currentIndex
                                                    ? 'w-5 sm:w-6 h-1.5 bg-amber-400'
                                                    : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Tombol Panah Kanan */}
                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    aria-label="Slide Berikutnya"
                                    className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-white/80 hover:text-white cursor-pointer"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
