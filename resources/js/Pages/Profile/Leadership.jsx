import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Clock,
    Calendar,
    User,
    Shield,
    CheckCircle2,
    Landmark,
} from 'lucide-react';

export default function Leadership({ leadership = {} }) {
    // 8 Silsilah Resmi Kepala Desa Karangwungu (1912 - Sekarang)
    const defaultLeaders = [
        {
            order: 1,
            name: 'H. ALI SARIBAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-1',
            desc: 'Kepala Desa periode awal kepemimpinan masa jabatan seumur hidup Desa Karangwungu.',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'SAEDJAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-2',
            desc: 'Melanjutkan estafet kepemimpinan desa pada era masa jabatan seumur hidup.',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'MATARDJO. AS',
            period: '1984 – 1992',
            role: 'Kepala Desa Ke-3',
            desc: 'Kepala Desa periode 1984 – 1992 pembina awal tata kelola infrastruktur desa.',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'KANAN',
            period: '1993 – 2001',
            role: 'Kepala Desa Ke-4',
            desc: 'Kepala Desa periode 1993 – 2001 penguatan ketahanan pangan dan sosial kemasyarakatan.',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'MATARDJO. AS',
            period: '2002 – 2007',
            role: 'Kepala Desa Ke-5',
            desc: 'Kembali terpilih mengabdi memimpin roda pemerintahan desa periode 2002 – 2007.',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'ABDUL WAHAB',
            period: '2008 – 2013',
            role: 'Kepala Desa Ke-6',
            desc: 'Kepala Desa periode 2008 – 2013 penguatan kelembagaan dan perluasan potensi tambak.',
            isCurrent: false,
        },
        {
            order: 7,
            name: 'SUNARTO',
            period: '2014 – 2019',
            role: 'Kepala Desa Ke-7 (Periode I)',
            desc: 'Kepala Desa periode pertama 2014 – 2019 percepatan pembangunan jalan poros dan fasilitas umum.',
            isCurrent: false,
        },
        {
            order: 8,
            name: 'SUNARTO',
            period: '2020 – 2026',
            role: 'Kepala Desa Ke-8 (Periode II)',
            desc: 'Kembali dipercaya masyarakat melanjutkan pengabdian periode 2020 – 2026, memimpin era modernisasi dan pelayanan publik terpadu.',
            isCurrent: true,
        },
    ];

    const leaders =
        leadership.leaders_data && leadership.leaders_data.length > 0
            ? [...leadership.leaders_data].sort((a, b) => (a.order || 0) - (b.order || 0))
            : defaultLeaders;

    return (
        <AppLayout>
            <SeoHead
                title="Silsilah Kepala Desa Karangwungu"
                description="Rekam jejak 8 periode kepemimpinan Kepala Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan dari masa ke masa."
                keywords="Kepala Desa Karangwungu, Silsilah Kades Karangwungu, Sunarto Kepala Desa"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Silsilah Kepala Desa', url: '/profil/kepemimpinan' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                {/* 1. PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Silsilah Kepala Desa"
                    subtitle="Rekam jejak 8 periode estafet kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                />

                {/* 2. SILSILAH KEPALA DESA GRID */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                                <Landmark className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    Daftar Kepala Desa Dari Masa Ke Masa
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Penghormatan atas jasa dan dedikasi para pemimpin yang telah membangun Desa Karangwungu
                                </p>
                            </div>
                        </div>

                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                            8 Periode Pengabdian
                        </span>
                    </div>

                    {/* 4-Column Grid of 8 Leaders (2 Rows of 4) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {leaders.map((leader) => (
                            <div
                                key={leader.order}
                                className={`rounded-lg p-5 transition-all flex flex-col justify-between space-y-4 ${
                                    leader.isCurrent
                                        ? 'bg-gradient-to-b from-red-800 via-red-900 to-zinc-950 text-white border border-red-500/50 shadow-xl'
                                        : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-red-500/40 dark:hover:border-amber-400/40'
                                }`}
                            >
                                <div className="space-y-3">
                                    {/* Header: Period & Status */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                                                leader.isCurrent
                                                    ? 'bg-black/40 text-amber-300 border-white/20'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <Calendar className="h-3 w-3" />
                                            <span>{leader.period}</span>
                                        </span>

                                        {leader.isCurrent ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                <span>Menjabat Aktif</span>
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                                                #{String(leader.order).padStart(2, '0')}
                                            </span>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <div className="flex items-center gap-3 pt-1">
                                        <div
                                            className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 font-black'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3
                                                className={`text-sm sm:text-base font-bold truncate ${
                                                    leader.isCurrent
                                                        ? 'text-white'
                                                        : 'text-zinc-900 dark:text-white'
                                                }`}
                                            >
                                                {leader.name}
                                            </h3>
                                            <p
                                                className={`text-[11px] font-medium ${
                                                    leader.isCurrent
                                                        ? 'text-amber-300 font-bold'
                                                        : 'text-zinc-500 dark:text-zinc-400'
                                                }`}
                                            >
                                                {leader.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Short Note */}
                                    <p
                                        className={`text-xs leading-relaxed text-justify ${
                                            leader.isCurrent
                                                ? 'text-zinc-200'
                                                : 'text-zinc-600 dark:text-zinc-400'
                                        }`}
                                    >
                                        {leader.desc}
                                    </p>
                                </div>

                                <div
                                    className={`pt-3 border-t text-[11px] flex items-center justify-between ${
                                        leader.isCurrent
                                            ? 'border-white/20 text-zinc-300'
                                            : 'border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'
                                    }`}
                                >
                                    <span>Pemerintah Desa</span>
                                    <Shield
                                        className={`h-3.5 w-3.5 ${
                                            leader.isCurrent ? 'text-amber-300' : 'text-zinc-300 dark:text-zinc-600'
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
