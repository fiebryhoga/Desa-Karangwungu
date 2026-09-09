import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, Scale, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({
    heroImages = [],
    heroImage = '/assets/images/hero.jpg',
    badge = 'Kecamatan Karanggeneng • Kabupaten Lamongan',
    title = "Website Resmi\nDesa Karangwungu",
    description = 'Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.',
}) {
    const displayBadge = badge || 'Kecamatan Karanggeneng • Kabupaten Lamongan';
    const displayTitle = title || "Website Resmi\nDesa Karangwungu";
    const displayDescription = description || 'Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.';

    // Maksimal 5 Foto Hero Slider
    const slides = (
        Array.isArray(heroImages) && heroImages.length > 0
            ? heroImages
            : [heroImage]
    ).filter(Boolean).slice(0, 5);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play slider setiap 3 detik (tetap berjalan walau kursor di atas hero)
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    return (
        <section
            className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden group/hero"
        >
            {/* 1. Multi-photo Crossfade Background Slider */}
            {slides.map((img, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
                        idx === currentIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                    style={{
                        backgroundImage: `url('${img}')`,
                    }}
                />
            ))}

            {/* 2. Layer Overlay Sinematik: Gelap di atas & kiri, menyatu ke bawah */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Overlay Bawah: Menyatu mulus dengan latar halaman (lebih tipis & elegan) */}
            <div className="absolute inset-x-0 bottom-0 h-10 sm:h-20 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/50 to-transparent dark:from-[#060608] dark:via-[#060608]/50 dark:to-transparent pointer-events-none" />

            {/* Spacer Atas */}
            <div className="hidden sm:block sm:h-6" />

            {/* 3. Konten Hero Utama */}
            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 my-auto">
                <div className="max-w-3xl space-y-4 sm:space-y-6">
                    {/* Pill Badge & Title with Village Logo Directly Beside It */}
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* Sleek Frosted Glass Municipality Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 lg:py-2.5 rounded-full bg-black/40 dark:bg-black/50 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-white tracking-wide shadow-lg">
                            <span className="h-2 w-2 rounded-full bg-red-500 shrink-0 animate-pulse" />
                            <span>{displayBadge}</span>
                        </div>

                        {/* Title with Village Logo Directly Beside It */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            <img
                                src="/assets/images/logo.png"
                                alt="Lambang Resmi Desa Karangwungu"
                                className="h-20 sm:h-28 lg:h-32 xl:h-36 w-auto object-contain shrink-0 drop-shadow-2xl hover:scale-105 transition-transform"
                            />
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-xl whitespace-pre-line">
                                {displayTitle}
                            </h1>
                        </div>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-sm sm:text-base lg:text-lg font-medium text-zinc-200 leading-5 sm:leading-6 max-w-2xl drop-shadow-md">
                        {displayDescription}
                    </p>

                    {/* Dua Kartu Mini Interaktif (Frosted Glass Action Chips) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1.5 sm:pt-2 max-w-2xl">
                        <Link
                            href="/layanan/ajukan"
                            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/20 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-red-400/80 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                                        Ajukan Surat Online
                                    </h4>
                                    <p className="text-xs text-zinc-200 mt-0.5 leading-tight">
                                        Pelayanan administrasi mandiri
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>

                        <Link
                            href="/produk-hukum"
                            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/20 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-amber-400/80 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                                        Produk Hukum Desa
                                    </h4>
                                    <p className="text-xs text-zinc-200 mt-0.5 leading-tight">
                                        Perdes & regulasi resmi desa
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigasi Panah Kiri & Kanan (Muncul Elegan saat Hover / Sentuh) */}
            {slides.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Foto Sebelumnya"
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-amber-300 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-75 sm:opacity-0 sm:group-hover/hero:opacity-100 cursor-pointer shadow-lg active:scale-95"
                    >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:-translate-x-0.5" />
                    </button>
                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Foto Selanjutnya"
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-amber-300 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-75 sm:opacity-0 sm:group-hover/hero:opacity-100 cursor-pointer shadow-lg active:scale-95"
                    >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform hover:translate-x-0.5" />
                    </button>
                </>
            )}

            {/* 4. Bottom Controls: Slider Dots & Scroll Guide */}
            <div className="relative pb-6 text-center z-20 flex flex-col items-center gap-3">
                {/* Dots Indikator Slide Minimalis */}
                {slides.length > 1 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-md">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Pindah ke foto ${idx + 1}`}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    idx === currentIndex
                                        ? 'w-4 sm:w-5 h-1 sm:h-1.5 bg-amber-400'
                                        : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/50 hover:bg-white'
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Bottom Scroll Guide Indicator (Smooth & Presisi ke Awal Sambutan) */}
                <div className="hidden sm:block">
                    <a
                        href="#sambutan"
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById('sambutan');
                            if (target) {
                                const navHeight = 70;
                                const targetPosition =
                                    target.getBoundingClientRect().top +
                                    window.pageYOffset -
                                    navHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth',
                                });
                            }
                        }}
                        className="inline-flex flex-col items-center gap-1 text-xs font-bold text-white hover:text-amber-300 transition-colors group cursor-pointer"
                    >
                        <span className="text-[11px] font-bold tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            Jelajahi Profil Desa
                        </span>
                        <div className="h-6 w-3.5 rounded-full border-2 border-white/90 flex items-start justify-center p-0.5 group-hover:border-amber-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                            <div className="h-1.5 w-1 rounded-full bg-red-500 animate-bounce shadow-xs" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
