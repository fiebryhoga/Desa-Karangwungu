import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function PotentialsSection({ potentials = [] }) {
    return (
        <section
            id="potensi"
            className="relative min-h-[calc(100vh-64px)] flex items-center justify-center py-8 sm:py-10 lg:py-12 overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                            <span>Potensi & Ekonomi Kreatif</span>
                        </div>
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                            Produk Unggulan Desa Karangwungu
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                            Menampilkan hasil komoditas tambak ikan bandeng, pertanian padi sawah, serta kreasi produk UMKM warga desa.
                        </p>
                    </div>

                    <Link
                        href="/potensi"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-red-600 dark:hover:text-amber-400 text-xs font-semibold border border-zinc-200/80 dark:border-zinc-800 transition-all shrink-0 self-start md:self-auto group shadow-xs"
                    >
                        <span>Jelajahi Semua Produk</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {potentials.map((item) => (
                        <Link
                            key={item.id}
                            href={`/potensi/${item.slug}`}
                            className="group relative rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-red-500/60 dark:hover:border-red-500/50 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                        >
                            <div>
                                <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={
                                            item.image ||
                                            'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80'
                                        }
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2.5 left-2.5">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold text-[10px] tracking-wide shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 space-y-1.5">
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80">
                                <span className="text-xs font-bold text-red-600 dark:text-amber-400">
                                    {item.price_range}
                                </span>
                                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-amber-400 inline-flex items-center gap-0.5">
                                    <span>Detail</span>
                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
