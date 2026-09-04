import React from 'react';
import { Link } from '@inertiajs/react';
import { formatRupiah } from '../../Utils/format';
import { ArrowRight, ShieldCheck, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function ApbdesSection({ apbdes_summary = {} }) {
    return (
        <section
            id="apbdes"
            className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-8 sm:py-10 lg:py-12 overflow-hidden"
        >
            {/* Ambient Lighting Accents */}
            <div className="ambient-glow-red -bottom-24 left-1/4 opacity-25 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                            <span>Transparansi & Akuntabilitas Publik</span>
                        </div>

                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                            Transparansi APBDes Tahun Anggaran {apbdes_summary.year || 2026}
                        </h2>

                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                            Pengelolaan Keuangan Desa Karangwungu diselenggarakan secara terbuka, tertib, dan dapat dipertanggungjawabkan untuk kemakmuran seluruh masyarakat.
                        </p>

                        <div className="pt-2">
                            <Link
                                href={`/transparansi?year=${apbdes_summary.year || 2026}`}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-red-900/30 transition-all hover:scale-[1.02] border border-red-600 cursor-pointer"
                            >
                                <span>Lihat Rincian APBDes Lengkap</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-lg bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                                    Total Anggaran Pendapatan
                                </span>
                                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mt-2">
                                {formatRupiah(apbdes_summary.income || 1385979500)}
                            </p>
                            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 flex justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-2">
                                <span>Realisasi:</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatRupiah(
                                        apbdes_summary.realized_income || 1385979500
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 rounded-lg bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                                    Total Anggaran Belanja
                                </span>
                                <div className="h-7 w-7 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                                    <TrendingDown className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mt-2">
                                {formatRupiah(apbdes_summary.expense || 1705000000)}
                            </p>
                            <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 flex justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-2">
                                <span>Realisasi:</span>
                                <span className="font-bold text-red-600 dark:text-red-400">
                                    {formatRupiah(
                                        apbdes_summary.realized_expense || 1285000000
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
