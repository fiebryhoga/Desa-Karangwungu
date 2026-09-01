import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, Search, ArrowRight } from 'lucide-react';

export default function HeroSection({ heroImage = '/assets/images/hero.jpg' }) {
    return (
        <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden">
            {/* 1. Gambar Background Utama */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
                style={{
                    backgroundImage: `url('${heroImage}')`,
                }}
            />

            {/* 2. Layer Overlay: Bagian Atas Hitam Halus, Bagian Bawah Full Putih Menyatu */}
            {/* Overlay Atas & Kiri: Hitam transparan halus untuk langit dan kontras teks */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Overlay Bawah: Menyatu 100% mulus dengan latar belakang halaman (Ramping di Mobile) */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-40 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/80 to-transparent dark:from-[#060608] dark:via-[#060608]/80 dark:to-transparent pointer-events-none" />

            {/* Spacer Atas */}
            <div className="hidden sm:block sm:h-6" />

            {/* 3. Konten Hero Utama */}
            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto">
                <div className="max-w-3xl space-y-4 sm:space-y-6">
                    {/* Grand Title & Clean Subtitle */}
                    <div className="space-y-16 sm:space-y-5">
                        {/* Sleek Frosted Glass Municipality Pill Badge */}
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-zinc-100 tracking-wide shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                            <span className="sm:hidden">Kec. Karanggeneng &bull; Kab. Lamongan</span>
                            <span className="hidden sm:inline">Kecamatan Karanggeneng &bull; Kabupaten Lamongan</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-lg">
                            Website Resmi <br />
                            Desa Karangwungu
                        </h1>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-sm sm:text-base lg:text-lg font-medium text-zinc-200 leading-5 sm:leading-6 max-w-2xl drop-shadow-md">
                        Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.
                    </p>

                    {/* Dua Kartu Mini Interaktif (Card-Chips Transparan Tanpa Box Background Ikon) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-1.5 sm:pt-2 max-w-2xl">
                        <Link
                            href="/layanan/ajukan"
                            className="group flex items-center justify-between p-3 sm:p-3.5 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-red-400/80 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
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
                            href="/layanan/lacak"
                            className="group flex items-center justify-between p-3 sm:p-3.5 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-amber-400/80 shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                                        Lacak Status Surat
                                    </h4>
                                    <p className="text-xs text-zinc-200 mt-0.5 leading-tight">
                                        Pantau proses dokumen Anda
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Scroll Guide Indicator (Disembunyikan di Mobile) */}
            <div className="hidden sm:block relative pb-6 text-center z-10">
                <a
                    href="#sambutan"
                    className="inline-flex flex-col items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-red-700 dark:hover:text-amber-400 transition-colors group"
                >
                    <span className="text-[11px] font-semibold opacity-90">
                        Jelajahi Profil Desa
                    </span>
                    <div className="h-7 w-4 rounded-full border border-zinc-400 dark:border-zinc-700 flex items-start justify-center p-1 group-hover:border-red-600 dark:group-hover:border-amber-400 transition-colors">
                        <div className="h-1.5 w-1 rounded-full bg-red-600 dark:bg-amber-400 animate-bounce" />
                    </div>
                </a>
            </div>
        </section>
    );
}
