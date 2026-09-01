import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
    Briefcase,
    Home as HomeIcon,
    ShieldCheck,
    Search,
    ArrowRight,
    Baby,
    HeartHandshake,
    FileText,
} from 'lucide-react';

export default function ServicesSection() {
    const [trackingCode, setTrackingCode] = useState('');

    const handleTrackingSubmit = (e) => {
        e.preventDefault();
        if (trackingCode.trim()) {
            router.get(`/layanan/tracking?code=${encodeURIComponent(trackingCode.trim())}`);
        }
    };

    const services = [
        {
            title: 'Surat Keterangan Usaha (SKU)',
            desc: 'Legalitas resmi untuk toko, pertanian, perikanan tambak & modal bank.',
            href: '/layanan/ajukan?type=sku',
            icon: Briefcase,
        },
        {
            title: 'Surat Keterangan Domisili',
            desc: 'Bukti tempat tinggal resmi kependudukan dan persyaratan kerja.',
            href: '/layanan/ajukan?type=domisili',
            icon: HomeIcon,
        },
        {
            title: 'Surat Keterangan Tidak Mampu (SKTM)',
            desc: 'Pengantar beasiswa, bantuan sosial DTKS & jaminan kesehatan BPJS.',
            href: '/layanan/ajukan?type=sktm',
            icon: ShieldCheck,
        },
        {
            title: 'Surat Keterangan Kelahiran',
            desc: 'Pencatatan kelahiran baru untuk Akta Kelahiran dan penambahan KK.',
            href: '/layanan/ajukan?type=kelahiran',
            icon: Baby,
        },
        {
            title: 'Surat Keterangan Kematian',
            desc: 'Pelaporan kematian warga untuk tertib administrasi kependudukan.',
            href: '/layanan/ajukan?type=kematian',
            icon: HeartHandshake,
        },
        {
            title: 'Surat Pengantar Umum',
            desc: 'Pengantar pindah domisili, SKCK, izin keramaian & keperluan umum.',
            href: '/layanan/ajukan?type=umum',
            icon: FileText,
        },
    ];

    return (
        <section
            id="layanan"
            className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
        >
            {/* Ambient Lighting Effects */}
            <div className="ambient-glow-red top-1/4 -left-32 opacity-20 pointer-events-none" />
            <div className="ambient-glow-gold bottom-1/4 -right-32 opacity-15 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* KOLOM KIRI (5 Cols): Editorial, Tracking Box, Alur Singkat */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[10px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                                <span>Pelayanan Mandiri Cepat & Praktis</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                Layanan Surat Online Mandiri
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                                Ajukan berbagai kebutuhan surat pengantar desa secara mandiri dari mana saja. Proses cepat, transparan, dan status berkas dapat dipantau langsung.
                            </p>
                        </div>

                        {/* Kotak Lacak Berkas Terintegrasi */}
                        <div className="p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm backdrop-blur-xl space-y-2.5">
                            <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200">
                                <span className="flex items-center gap-1.5">
                                    <Search className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
                                    <span>Lacak Status Permohonan Surat</span>
                                </span>
                                <Link
                                    href="/layanan/tracking"
                                    className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    Riwayat &rarr;
                                </Link>
                            </div>
                            <form onSubmit={handleTrackingSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={trackingCode}
                                    onChange={(e) => setTrackingCode(e.target.value)}
                                    placeholder="Masukkan NIK atau Kode Tiket..."
                                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs focus:outline-hidden focus:border-red-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1 shrink-0"
                                >
                                    <span>Lacak</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </form>
                        </div>

                        {/* Alur 3 Langkah Sederhana */}
                        <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100/80 dark:bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
                            <div className="flex items-center gap-1.5">
                                <span className="h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                                <span>Pilih Surat</span>
                            </div>
                            <span className="text-zinc-400">&rarr;</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                                <span>Isi Data</span>
                            </div>
                            <span className="text-zinc-400">&rarr;</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                                <span>Selesai</span>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN (7 Cols): 6 Kartu Layanan Ramping (Grid 2 Kolom x 3 Baris) */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                        {services.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className="group p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-red-500/60 dark:hover:border-red-500/50 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-between gap-3 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="h-10 w-10 rounded-xl bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xs">
                                            <IconComponent className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-red-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
