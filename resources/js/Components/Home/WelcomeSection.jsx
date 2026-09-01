import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Quote, Shield, Compass, Users } from 'lucide-react';

export default function WelcomeSection({ headOfficial }) {
    const leaderName = headOfficial?.name || 'H. Moh. Suhartono, S.Sos';
    const leaderPhoto =
        headOfficial?.photo ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80';

    return (
        <section
            id="sambutan"
            className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-8 sm:py-16 lg:py-20 overflow-hidden"
        >
            {/* Ambient Lighting Accents */}
            <div className="ambient-glow-red top-1/4 -right-20 opacity-30 pointer-events-none" />
            <div className="ambient-glow-gold -bottom-10 -left-20 opacity-25 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Desktop Only: Grand Portrait Card (Disembunyikan di mobile agar layout tidak kepanjangan) */}
                    <div className="hidden lg:flex lg:col-span-5 justify-center">
                        <div className="relative group max-w-sm w-full">
                            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                                <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                                    <img
                                        src={leaderPhoto}
                                        alt={leaderName}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-xs text-white">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xs">
                                            <Shield className="h-3 w-3 text-amber-300" />
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                            Pemerintah Desa
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold leading-tight text-white">
                                        {leaderName}
                                    </h3>
                                    <p className="text-xs text-zinc-300 font-medium mt-0.5">
                                        Kepala Desa Karangwungu
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right / Main Content (Optimal untuk Mobile & Desktop) */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6 relative">
                        {/* Mobile Only: Kartu Profil Eksekutif Kompak (Posisi di Atas Judul) */}
                        <div className="lg:hidden flex items-center gap-3.5 p-3 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                            <img
                                src={leaderPhoto}
                                alt={leaderName}
                                className="h-14 w-14 rounded-lg object-cover object-top shrink-0 ring-2 ring-red-600/30"
                            />
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider">
                                        Kepala Desa
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mt-0.5 truncate">
                                    {leaderName}
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                                    Pemerintah Desa Karangwungu
                                </p>
                            </div>
                        </div>

                        {/* Judul Utama Elegan */}
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white leading-[1.25] tracking-tight">
                            Membangun Desa Karangwungu yang Modern, Guyub Rukun, dan Sejahtera
                        </h2>

                        {/* Speech Narrative Body */}
                        <div className="space-y-3.5 sm:space-y-4">
                            {/* Distinctive Opening Greeting */}
                            <div className="border-l-2 border-red-600 dark:border-amber-400 pl-3.5 py-0.5">
                                <p className="text-sm sm:text-base lg:text-lg font-semibold text-zinc-900 dark:text-zinc-100 italic">
                                    &ldquo;Assalamu’alaikum Warahmatullahi Wabarakatuh.&rdquo;
                                </p>
                            </div>

                            <p className="text-xs sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal text-justify">
                                Selamat datang di portal resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Website ini kami dedikasikan sebagai wujud komitmen keterbukaan informasi publik, kemudahan pelayanan surat mandiri daring, serta etalase potensi pertanian dan tambak modern desa tercinta kita.
                            </p>

                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                                Melalui semangat kebersamaan dan inovasi digital, mari kita bersama melangkah memajukan Desa Karangwungu menjadi desa yang mandiri, transparan, dan memberikan kemakmuran nyata bagi seluruh masyarakat.
                            </p>
                        </div>

                        {/* CTA Navigation Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5">
                            <Link
                                href="/profil/sejarah"
                                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-red-900/30 transition-all hover:scale-[1.02] border border-red-600 cursor-pointer"
                            >
                                <Compass className="h-4 w-4 text-amber-300" />
                                <span>Visi, Misi & Sejarah</span>
                                <ArrowRight className="h-4 w-4 ml-0.5" />
                            </Link>

                            <Link
                                href="/profil/perangkat-desa"
                                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white/90 hover:bg-white text-zinc-900 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-zinc-100 text-xs sm:text-sm font-semibold shadow-md border border-zinc-300 dark:border-zinc-700 transition-all hover:scale-[1.02] cursor-pointer"
                            >
                                <Users className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <span>Struktur Perangkat Desa</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
