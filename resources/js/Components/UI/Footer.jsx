import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Shield,
    MapPin,
    Phone,
    Mail,
    Clock,
    ExternalLink,
    ChevronRight,
    FileCode,
    Sparkles,
    MessageCircle,
    Building2,
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/90 dark:border-zinc-800/90 transition-colors overflow-hidden">
            {/* 1. Siluet Motif Batik Parang & Mega Mendung Tradisional (Mode Terang: Terracotta/Crimson Halus) */}
            <div
                className="dark:hidden absolute inset-0 opacity-[0.10] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50 M0 0 Q 25 -25, 50 0 T 100 0 M0 100 Q 25 75, 50 100 T 100 100 M-25 25 L 25 75 M25 -25 L 75 25 M75 -25 L 125 25 M-25 75 L 25 125 M25 75 L 75 125 M75 75 L 125 125' stroke='%23b91c1c' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M10 40 Q 25 20, 40 40 Q 55 60, 70 40 Q 85 20, 100 40' stroke='%23b91c1c' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='25' cy='25' r='3.5' fill='%23b91c1c'/%3E%3Ccircle cx='75' cy='75' r='3.5' fill='%23b91c1c'/%3E%3Ccircle cx='75' cy='25' r='2' fill='%23b91c1c'/%3E%3Ccircle cx='25' cy='75' r='2' fill='%23b91c1c'/%3E%3C/svg%3E")`,
                    backgroundSize: '70px 70px',
                }}
            />

            {/* 1. Siluet Motif Batik Parang & Mega Mendung Tradisional (Mode Gelap: Emas & Amber Menyala) */}
            <div
                className="hidden dark:block absolute inset-0 opacity-[0.14] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50 M0 0 Q 25 -25, 50 0 T 100 0 M0 100 Q 25 75, 50 100 T 100 100 M-25 25 L 25 75 M25 -25 L 75 25 M75 -25 L 125 25 M-25 75 L 25 125 M25 75 L 75 125 M75 75 L 125 125' stroke='%23fbbf24' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M10 40 Q 25 20, 40 40 Q 55 60, 70 40 Q 85 20, 100 40' stroke='%23fbbf24' stroke-width='1.5' fill='none'/%3E%3Ccircle cx='25' cy='25' r='3.5' fill='%23fbbf24'/%3E%3Ccircle cx='75' cy='75' r='3.5' fill='%23fbbf24'/%3E%3Ccircle cx='75' cy='25' r='2' fill='%23fbbf24'/%3E%3Ccircle cx='25' cy='75' r='2' fill='%23fbbf24'/%3E%3C/svg%3E")`,
                    backgroundSize: '70px 70px',
                }}
            />

            {/* Ambient Lighting Accents */}
            <div className="ambient-glow-red -bottom-32 -left-32 opacity-20 pointer-events-none" />
            <div className="ambient-glow-gold -bottom-32 -right-32 opacity-15 pointer-events-none" />

            {/* 2. TOP QUICK HELP STRIP (Pusat Bantuan Bersih & Terpadu) */}
            <div className="relative z-10 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/60 backdrop-blur-md py-4 sm:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 text-left w-full sm:w-auto">
                        <div className="h-9 w-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                            <MessageCircle className="h-4.5 w-4.5" />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                                Pusat Bantuan & Layanan Warga
                            </h4>
                            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                Konsultasi syarat surat dan informasi langsung dengan tim admin desa.
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Karangwungu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span>Hubungi WhatsApp Desa</span>
                    </a>
                </div>
            </div>

            {/* 3. MAIN NAVIGATION (Kompak 2 Kolom di Mobile, 4 Kolom di Desktop) */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
                    {/* Col 1: Profil & Identitas Resmi (4 cols di desktop) */}
                    <div className="lg:col-span-4 space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/logo.png"
                                alt="Logo Desa Karangwungu"
                                className="h-11 sm:h-14 lg:h-16 w-auto object-contain shrink-0 drop-shadow-xs"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden h-10 w-10 items-center justify-center">
                                <Shield className="h-6 w-6 text-red-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-zinc-900 dark:text-white leading-tight">
                                    Pemerintah Desa Karangwungu
                                </h3>
                                <p className="text-[11px] sm:text-xs text-red-600 dark:text-amber-400 font-semibold mt-0.5">
                                    Kec. Karanggeneng, Kab. Lamongan
                                </p>
                            </div>
                        </div>

                        <p className="hidden sm:block text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                            Portal resmi informasi publik dan pelayanan administrasi daring Pemerintah Desa Karangwungu dalam mewujudkan tata kelola desa yang transparan, maju, agamis, dan melayani.
                        </p>
                    </div>

                    {/* Navigasi Links: 2 Kolom Berdampingan di Mobile (Jelajah Desa & Layanan Publik) */}
                    <div className="grid grid-cols-2 gap-4 lg:contents">
                        {/* Col 2: Jelajah Profil Desa (2 cols di desktop) */}
                        <div className="lg:col-span-2 space-y-2.5 sm:space-y-3.5">
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b sm:border-0 border-zinc-200/60 dark:border-zinc-800 pb-1 sm:pb-0">
                                Jelajah Desa
                            </h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li>
                                    <Link href="/profil" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Profil Desa</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/sejarah" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Sejarah & Visi</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/perangkat-desa" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Perangkat Desa</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/demografi" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Data Demografi</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/potensi" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Potensi & UMKM</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/galeri" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Galeri Foto</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Layanan & Informasi (3 cols di desktop) */}
                        <div className="lg:col-span-3 space-y-2.5 sm:space-y-3.5">
                            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white border-b sm:border-0 border-zinc-200/60 dark:border-zinc-800 pb-1 sm:pb-0">
                                Layanan Publik
                            </h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li>
                                    <Link href="/layanan" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Katalog Surat</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/layanan/ajukan" className="text-red-600 dark:text-amber-400 font-semibold flex items-center gap-1 transition-colors">
                                        <Sparkles className="h-3 w-3 shrink-0" />
                                        <span>Ajukan Surat</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/layanan/tracking" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Lacak Berkas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/berita" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>Warta Berita</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/transparansi" className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                        <span>APBDes</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Col 4: Kontak & Jam Operasional (3 cols di desktop) */}
                    <div className="lg:col-span-3 space-y-3 sm:space-y-3.5 pt-2 sm:pt-0 border-t sm:border-0 border-zinc-200/60 dark:border-zinc-800">
                        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                            Kontak & Balai Desa
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-tight text-[11px] sm:text-xs">
                                    Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                <span className="text-zinc-900 dark:text-zinc-200 font-semibold text-xs">(0812) 3456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                <span className="truncate text-xs">pemdes@karangwungu-lamongan.desa.id</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
                                <Clock className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                <span>Senin – Jumat: 08.00 – 15.30 WIB</span>
                            </div>
                        </div>

                        {/* External Portal Links */}
                        <div className="flex items-center gap-2 pt-1 text-[11px]">
                            <a
                                href="https://lamongankab.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 inline-flex items-center gap-1 transition-colors"
                            >
                                <span>Pemkab Lamongan</span>
                                <ExternalLink className="h-2.5 w-2.5 text-red-600 dark:text-amber-400" />
                            </a>
                            <a
                                href="https://kemendesa.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 inline-flex items-center gap-1 transition-colors"
                            >
                                <span>Kemendesa</span>
                                <ExternalLink className="h-2.5 w-2.5 text-red-600 dark:text-amber-400" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM BAR: COPYRIGHT */}
            <div className="relative z-10 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-black/60 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 text-center sm:text-left">
                    <p>
                        &copy; {currentYear} <strong>Pemerintah Desa Karangwungu</strong>, Kec. Karanggeneng, Kab. Lamongan.
                    </p>
                    <p className="flex items-center justify-center gap-2.5">
                        <Link href="/kontak" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                            Bantuan
                        </Link>
                        <span>&bull;</span>
                        <Link href="/transparansi" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                            Transparansi
                        </Link>
                        <span>&bull;</span>
                        <a href="/sitemap.xml" target="_blank" className="hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                            Sitemap
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
