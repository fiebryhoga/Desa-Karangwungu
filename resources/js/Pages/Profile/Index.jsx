import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    MapPin,
    Building2,
    Compass,
    ArrowRight,
    Shield,
    History as HistoryIcon,
    PieChart,
    Landmark,
    Layers,
    Wheat,
    Fish,
    HeartHandshake,
    Target,
} from 'lucide-react';
import VillageMap from '../../Components/Profile/VillageMap';

export default function ProfileIndex({ officials = [], demographics = {} }) {
    const profileSubmenus = [
        {
            href: '/profil/visi-misi',
            icon: Target,
            title: 'Visi, Misi & Kepemimpinan',
            desc: 'Arah pembangunan & silsilah Kepala Desa',
        },
        {
            href: '/profil/perangkat-desa',
            icon: Shield,
            title: 'Struktur Perangkat Desa',
            desc: 'Bagan organisasi & pamong desa',
        },
        {
            href: '/profil/demografi',
            icon: PieChart,
            title: 'Data Demografi Penduduk',
            desc: 'Statistik kependudukan per dusun & profesi',
        },
        {
            href: '/profil/fasilitas',
            icon: Building2,
            title: 'Fasilitas & Sarana Umum',
            desc: 'Sarana prasarana publik & tempat ibadah',
        },
    ];

    const villageFacts = [
        { label: 'Nama Desa', value: 'Karangwungu' },
        { label: 'Kecamatan', value: 'Karanggeneng' },
        { label: 'Kabupaten', value: 'Lamongan' },
        { label: 'Provinsi', value: 'Jawa Timur' },
        { label: 'Kode Pos', value: '62254' },
        { label: 'Jumlah Dusun', value: '4 Dusun' },
        { label: 'Jumlah RT / RW', value: '14 RT / 4 RW' },
    ];

    const villageHighlights = [
        {
            icon: Wheat,
            title: 'Sektor Agraris Produktif',
            desc: 'Didukung hamparan persawahan padi subur dengan sistem irigasi teknis mandiri.',
        },
        {
            icon: Fish,
            title: 'Budidaya Tambak Modern',
            desc: 'Sentra perikanan air tawar & payau penghasil bandeng dan udang vaname unggulan.',
        },
        {
            icon: HeartHandshake,
            title: 'Kearifan Gotong Royong',
            desc: 'Kerukunan antarwarga yang harmonis dengan semangat kebersamaan yang lestari.',
        },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Profil Desa Karangwungu"
                description="Profil Lengkap Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Informasi letak geografis, batas wilayah, demografi penduduk, dan visi misi pembangunan desa."
                keywords="Profil Desa Karangwungu, Wilayah Karangwungu Karanggeneng, Karangwungu Lamongan, Sejarah Karangwungu"
                breadcrumbs={[{ label: 'Profil Desa', url: '/profil' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
                {/* 1. REUSABLE DYNAMIC GEOMETRIC FACETED PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Tentang Desa Karangwungu"
                    subtitle="Kenali lebih dalam sejarah, kearifan lokal, bentang alam, dan batas wilayah administratif desa kami."
                />

                {/* 2. TOP 2-COLUMN SECTION: Overview Gallery (8 cols) & Sidebar Data (4 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: Overview & Vision Mission Highlights (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* 1. Gambaran Umum Desa Karangwungu */}
                        <div className="rounded-lg overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl space-y-0">
                            {/* Header Section */}
                            <div className="px-5 sm:px-7 py-4 flex items-center justify-between border-b border-red-500/30 bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white shadow-xs">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <Building2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-sm sm:text-base text-white">
                                            Gambaran Umum Wilayah
                                        </h3>
                                        <span className="text-[11px] text-red-200 block font-medium">
                                            Karakteristik Geografis & Bentang Alam
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Showcase: Main Landscape Photo + Sub Photos */}
                            <div className="p-5 sm:p-7 space-y-6">
                                {/* Photo Gallery Strip */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                                    {/* Main Large Photo (8 cols) */}
                                    <div className="md:col-span-7 relative rounded-lg overflow-hidden shadow-lg group min-h-[220px] sm:min-h-[260px]">
                                        <img
                                            src="/assets/images/hero.jpg"
                                            alt="Bentang Alam Desa Karangwungu"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                                            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
                                                <MapPin className="h-3.5 w-3.5 text-amber-300" />
                                                <span className="text-xs font-bold">Kawasan Desa Karangwungu</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Two Stacked Sub Photos (5 cols) */}
                                    <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3">
                                        {/* Sub Photo 1: Sawah Padi */}
                                        <div className="relative rounded-lg overflow-hidden shadow-md group h-28 sm:h-[125px]">
                                            <img
                                                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
                                                alt="Pertanian Padi Karangwungu"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/60 text-[10px] font-bold text-amber-300 border border-white/15 backdrop-blur-xs">
                                                <Wheat className="h-3 w-3" />
                                                <span>Persawahan Padi</span>
                                            </div>
                                        </div>

                                        {/* Sub Photo 2: Budidaya Tambak */}
                                        <div className="relative rounded-lg overflow-hidden shadow-md group h-28 sm:h-[125px]">
                                            <img
                                                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"
                                                alt="Tambak Budidaya Karangwungu"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/60 text-[10px] font-bold text-amber-300 border border-white/15 backdrop-blur-xs">
                                                <Fish className="h-3 w-3" />
                                                <span>Tambak Ikan & Udang</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Narrative Text */}
                                <div className="space-y-3.5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1 text-justify">
                                    <p>
                                        <strong className="text-zinc-900 dark:text-white font-bold">Desa Karangwungu</strong> merupakan salah satu dari 18 desa di wilayah administratif <strong className="text-zinc-900 dark:text-white font-bold">Kecamatan Karanggeneng, Kabupaten Lamongan, Provinsi Jawa Timur</strong>. Wilayah Karangwungu terletak di dataran rendah yang subur di sebelah utara aliran Bengawan Solo, beriklim tropis dengan bentang alam yang didominasi oleh hamparan persawahan padi produktif dan tambak budidaya air tawar/payau modern.
                                    </p>
                                    <p>
                                        Masyarakat Desa Karangwungu dikenal memegang teguh tradisi gotong royong warisan leluhur, kehidupan beragama yang guyub rukun dan harmonis, serta etos kerja pantang menyerah di sektor pertanian agraris, budidaya ikan bandeng & udang vaname, serta perniagaan wirausaha lokal.
                                    </p>
                                </div>

                                {/* 3 Feature Highlight Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                    {villageHighlights.map((hl, idx) => {
                                        const IconComp = hl.icon;
                                        return (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-lg border border-red-500/20 bg-gradient-to-b from-red-500/5 to-transparent dark:from-red-950/20 dark:to-transparent space-y-1.5"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-lg bg-red-600/10 dark:bg-red-500/20 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                                        <IconComp className="h-4 w-4" />
                                                    </div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                                                        {hl.title}
                                                    </h4>
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                                                    {hl.desc}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar Navigation & Village Facts (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 1. Sub Menu Profil (Interaktif) */}
                        <div className="rounded-lg overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 p-5 space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-red-500/30">
                                <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                    <Layers className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                                    Jelajah Profil Desa
                                </h3>
                            </div>

                            <div className="space-y-2.5">
                                {profileSubmenus.map((item, idx) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            className="group flex items-center justify-between p-3 rounded-lg bg-black/25 hover:bg-black/45 border border-white/10 hover:border-amber-400 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3 min-w-0 pr-2">
                                                <div className="h-8 w-8 rounded-lg bg-black/30 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    <IconComponent className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-[10px] text-red-200/80 truncate">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-3.5 w-3.5 text-red-200 group-hover:text-amber-300 group-hover:translate-x-1 transition-all shrink-0" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Identitas & Fakta Pokok Desa */}
                        <div className="rounded-lg overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 p-5 space-y-4">
                            <div className="flex items-center gap-2 pb-3 border-b border-red-500/30">
                                <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                    <Landmark className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                                    Identitas Resmi Desa
                                </h3>
                            </div>

                            <div className="space-y-2.5 text-xs divide-y divide-red-500/20">
                                {villageFacts.map((fact, idx) => (
                                    <div key={idx} className={`flex items-center justify-between pt-2 ${idx === 0 ? 'pt-0' : ''}`}>
                                        <span className="text-red-200/90 font-medium">{fact.label}</span>
                                        <span className="text-white font-bold text-right">{fact.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. FULL WIDTH UNIFIED BATAS WILAYAH & PETA SPASIAL LEAFLET */}
                <div className="w-full">
                    <VillageMap />
                </div>
            </div>
        </AppLayout>
    );
}
