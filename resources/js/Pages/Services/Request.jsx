import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Search,
    CheckCircle2,
    ArrowRight,
    FileCheck,
    Info,
    ChevronRight,
    Scale,
    Briefcase,
    Home,
    ShieldCheck,
    HeartHandshake,
    Users,
    FileText,
    FileSignature,
    Layers,
} from 'lucide-react';

const BATIK_PARANG_PATTERN = `data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' stroke='%23fbbf24'%3E%3Cpath d='M0 0 L80 80 M0 40 L40 80 M40 0 L80 40' stroke-width='1.2' fill='none' stroke-linecap='round' opacity='0.75'/%3E%3Cpath d='M-5 15 L65 85 M15 -5 L85 65' stroke-width='0.7' fill='none' stroke-dasharray='2 3' opacity='0.5'/%3E%3Cpath d='M14 26 C10 22 10 14 18 14 C26 14 28 22 22 26 C18 28 16 28 14 26 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M54 66 C50 62 50 54 58 54 C66 54 68 62 62 66 C58 68 56 68 54 66 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M54 26 C50 22 50 14 58 14 C66 14 68 22 62 26 C58 28 56 28 54 26 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M14 66 C10 62 10 54 18 54 C26 54 28 62 22 66 C18 68 16 68 14 66 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpolygon points='40,16 44,20 40,24 36,20' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='20,36 24,40 20,44 16,40' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='60,36 64,40 60,44 56,40' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='40,56 44,60 40,64 36,60' fill='%23fbbf24' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='2' /%3E%3Ccircle cx='80' cy='0' r='2' /%3E%3Ccircle cx='0' cy='80' r='2' /%3E%3Ccircle cx='80' cy='80' r='2' /%3E%3Ccircle cx='40' cy='40' r='2.2' /%3E%3Ccircle cx='20' cy='20' r='1.2' /%3E%3Ccircle cx='60' cy='60' r='1.2' /%3E%3Ccircle cx='60' cy='20' r='1.2' /%3E%3Ccircle cx='20' cy='60' r='1.2' /%3E%3C/g%3E%3C/svg%3E`;

const getServiceIcon = (id = '') => {
    const key = (id || '').toLowerCase();
    if (key.includes('sktm') || key.includes('tidak-mampu') || key.includes('kurang-mampu')) return ShieldCheck;
    if (key.includes('sku') || key.includes('usaha')) return Briefcase;
    if (key.includes('domisili') || key.includes('skd') || key.includes('tinggal')) return Home;
    if (key.includes('kelahiran') || key.includes('lahir') || key.includes('bayi')) return Baby;
    if (key.includes('kematian') || key.includes('meninggal') || key.includes('wafat')) return HeartHandshake;
    if (key.includes('nikah') || key.includes('kawin')) return Users;
    if (key.includes('kehilangan') || key.includes('hilang')) return Search;
    if (key.includes('wali') || key.includes('hakim')) return Scale;
    if (key.includes('kuasa')) return FileSignature;
    return FileText;
};

const DEFAULT_SERVICES = [
    {
        id: 'sktm',
        title: 'Surat Keterangan Tidak Mampu (SKTM)',
        short_name: 'SKTM',
        description: 'Surat keterangan resmi untuk keluarga prasejahtera atau tidak mampu guna keperluan beasiswa, keringanan biaya pendidikan, KIP Kuliah, maupun keringanan biaya kesehatan/RS.',
        requirements: [
            'Warga berdomisili sah di Desa Karangwungu (memiliki KTP / Kartu Keluarga)',
            'Termasuk dalam kategori keluarga prasejahtera atau kurang mampu',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
        ],
    },
    {
        id: 'domisili-usaha',
        title: 'Surat Keterangan Domisili Usaha',
        short_name: 'Domisili Usaha',
        description: 'Surat keterangan resmi dari Pemerintah Desa Karangwungu yang menerangkan domisili tinggal pemohon serta keberadaan/domisili tempat usaha atau kantor yang beroperasi di wilayah Desa Karangwungu.',
        requirements: [
            'Pemohon memiliki identitas kependudukan (KTP / KK sah)',
            'Memiliki tempat usaha atau kantor yang berdomisili/beroperasi di Desa Karangwungu',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
        ],
    },
    {
        id: 'kematian',
        title: 'Surat Keterangan Kematian',
        short_name: 'Kematian',
        description: 'Keterangan resmi atas meninggalnya warga untuk penerbitan Akta Kematian, klaim santunan/BPJS, dan tertib administrasi KK.',
        requirements: [
            'Almarhum / Almarhumah tercatat sebagai warga Desa Karangwungu',
            'Pelapor merupakan ahli waris sah atau anggota keluarga dalam satu KK',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
        ],
    },
    {
        id: 'kehilangan',
        title: 'Surat Pengantar Kehilangan',
        short_name: 'Kehilangan',
        description: 'Pengantar desa atas kehilangan dokumen/barang penting (KTP, KK, SIM, Ijazah, Buku Tabungan) untuk pelaporan ke Polsek Karanggeneng.',
        requirements: [
            'Warga Desa Karangwungu atau berdomisili sah di wilayah desa',
            'Mengetahui rincian dan kronologi barang atau dokumen yang hilang',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
        ],
    },
];

export default function Request({ services = [] }) {
    const letterServices = services && services.length > 0 ? services : DEFAULT_SERVICES;

    return (
        <AppLayout>
            <SeoHead
                title="Layanan Surat Mandiri Online"
                description="Pilih jenis surat keterangan dan pengantar resmi Pemerintah Desa Karangwungu, Lamongan. Dapatkan syarat pembuatan dan langsung isi formulir permohonan surat secara mandiri."
                keywords="Pengajuan Surat Desa Online, Buat Surat Desa Karangwungu, SKTM Karangwungu Lamongan, Layanan Mandiri Karangwungu"
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Ajukan Surat Mandiri', url: '/layanan/ajukan' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Pelayanan Mandiri Persuratan Desa"
                    title="Permohonan Surat Mandiri Online"
                    subtitle="Pilih jenis surat keterangan yang Anda butuhkan di bawah ini, pelajari persyaratannya jika ada, lalu klik untuk mengisi formulir permohonan."
                    actions={[
                        {
                            label: 'Produk Hukum Desa',
                            href: '/layanan',
                            icon: Scale,
                            variant: 'primary',
                        },
                    ]}
                />

                {/* 2. SERVICES CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {letterServices.map((service) => {
                        const IconComponent = getServiceIcon(service.id);
                        return (
                            <div
                                key={service.id}
                                className="group relative rounded-lg overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-[#080102] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between border border-amber-400/40 dark:border-amber-500/35 hover:border-amber-400/80 p-5 sm:p-6"
                            >
                                {/* Siluet Motif Batik Parang Kencana Background Layer */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.045] sm:opacity-[0.045] dark:opacity-[0.06] group-hover:opacity-[0.12] dark:group-hover:opacity-[0.10] transition-opacity duration-500 bg-repeat"
                                    style={{
                                        backgroundImage: `url("${BATIK_PARANG_PATTERN}")`,
                                        backgroundSize: '80px 80px',
                                    }}
                                />

                                {/* Ambient Glow di Sudut Atas */}
                                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-amber-400/15 via-red-500/8 to-transparent blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                                <div className="relative z-10 space-y-4">
                                    {/* Header Bar: Icon Box + Short Name Badge */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="h-11 w-11 rounded-lg bg-black/40 border border-amber-400/50 text-amber-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all">
                                            <IconComponent className="h-5 w-5" />
                                        </div>

                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-black/40 border border-amber-400/50 text-amber-300 text-[10px] font-bold tracking-wider shadow-xs">
                                            {service.short_name || 'SURAT'}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <div className="space-y-1.5">
                                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        {service.description && (
                                            <p className="text-xs text-red-100/85 dark:text-zinc-300 leading-relaxed">
                                                {service.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Persyaratan Dokumen (Hanya muncul jika ada / tidak kosong) */}
                                    {Array.isArray(service.requirements) && service.requirements.length > 0 && (
                                        <div className="pt-3.5 border-t border-white/15 dark:border-white/15 space-y-2">
                                            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                                                <FileCheck className="h-3.5 w-3.5 text-amber-400" />
                                                <span>Persyaratan Berkas:</span>
                                            </span>
                                            <ul className="space-y-1.5 text-xs text-red-100/90 dark:text-zinc-200">
                                                {service.requirements.map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                                        <span className="leading-tight">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button: Navigate directly to the dedicated form page */}
                                <div className="relative z-10 pt-4 mt-5 border-t border-white/15 dark:border-white/15">
                                    <Link
                                        href={`/layanan/ajukan/${service.id}`}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-amber-100 hover:text-white border border-amber-400/40 shadow-md hover:shadow-lg transition-all group/btn cursor-pointer"
                                    >
                                        <span>Buat Formulir Surat Ini</span>
                                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* 3. ALUR PELAYANAN MANDIRI (Unboxed Editorial Section) */}
                <section aria-labelledby="alur-layanan-heading" className="space-y-5 pt-2">
                    {/* Section Header (Unboxed editorial, tanpa kerangka div) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-zinc-200/90 dark:border-zinc-800 gap-2">
                        <div className="flex items-center gap-2.5">
                            <Layers className="h-5 w-5 text-red-600 dark:text-amber-400 shrink-0" />
                            <div>
                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                    Panduan & Prosedur
                                </span>
                                <h2 id="alur-layanan-heading" className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                                    Alur Pengajuan Surat Mandiri
                                </h2>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
                            Sistem persuratan terpadu Desa Karangwungu dirancang praktis, transparan, dan terverifikasi.
                        </p>
                    </div>

                    {/* Step Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                num: '01',
                                stepOrder: '1 dari 4',
                                title: 'Pilih Jenis Surat',
                                desc: 'Tentukan jenis surat permohonan yang Anda butuhkan dari katalog resmi di atas.',
                                status: 'Pilih Surat',
                                icon: FileText,
                            },
                            {
                                num: '02',
                                stepOrder: '2 dari 4',
                                title: 'Isi Formulir Khusus',
                                desc: 'Masuk ke form formulir online dan lengkapi data pemohon sesuai KTP/KK.',
                                status: 'Input Data',
                                icon: FileSignature,
                            },
                            {
                                num: '03',
                                stepOrder: '3 dari 4',
                                title: 'Dapatkan Kode Tiket',
                                desc: 'Simpan kode tracking unik (KW-xxxx) untuk memantau proses verifikasi berkas.',
                                status: 'Kode Tracking',
                                icon: Search,
                            },
                            {
                                num: '04',
                                stepOrder: '4 dari 4',
                                title: 'Verifikasi & Cetak',
                                desc: 'Surat resmi diverifikasi perangkat desa, bertanda tangan dan siap diambil/dicetak.',
                                status: 'Dokumen Terbit',
                                icon: CheckCircle2,
                            },
                        ].map((step) => {
                            const StepIcon = step.icon;
                            return (
                                <div
                                    key={step.num}
                                    className="group/step relative p-4 sm:p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800 hover:border-red-500/40 dark:hover:border-amber-400/40 hover:shadow-xs transition-all flex flex-col justify-between space-y-3.5"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-amber-200 flex items-center justify-center font-mono font-black text-xs shadow-xs border border-amber-400/30">
                                                {step.num}
                                            </div>
                                            <div className="h-7 w-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center group-hover/step:text-red-600 dark:group-hover/step:text-amber-400 transition-colors">
                                                <StepIcon className="h-3.5 w-3.5" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover/step:text-red-600 dark:group-hover/step:text-amber-400 transition-colors leading-snug">
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                                        <span>Langkah {step.stepOrder}</span>
                                        <span className="font-semibold text-zinc-600 dark:text-zinc-300">{step.status}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bantuan & Kontak Info */}
                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                            <Info className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                            <span>
                                Layanan Balai Desa Karangwungu buka <strong>Senin - Jumat (08.00 - 15.00 WIB)</strong> di Jl. Raya Sumberwudi-Maduran.
                            </span>
                        </div>
                        <Link
                            href="/kontak"
                            className="font-bold text-red-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 shrink-0"
                        >
                            <span>Hubungi Pelayanan Desa</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
