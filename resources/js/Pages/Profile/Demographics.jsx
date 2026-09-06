import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Users,
    Briefcase,
    GraduationCap,
    MapPin,
    Building2,
    Activity,
    CheckCircle2,
    Award,
    Sparkles,
    Landmark,
    Compass,
    Wheat,
    Fish,
    LandPlot,
    Home,
    Layers,
    BookOpen,
    School,
} from 'lucide-react';
import { getIconComponent } from '@/Utils/iconRegistry';

// Helper icon untuk jenjang pendidikan
const getEducationIcon = (label = '') => {
    const l = label.toLowerCase();
    if (l.includes('sarjana') || l.includes('s1') || l.includes('s2') || l.includes('s3') || l.includes('tinggi')) return Landmark;
    if (l.includes('diploma') || l.includes('d1') || l.includes('d3') || l.includes('akademi')) return Award;
    if (l.includes('sma') || l.includes('smk') || l.includes('aliyah') || l.includes('menengah')) return GraduationCap;
    if (l.includes('smp') || l.includes('mts')) return School;
    if (l.includes('sd') || l.includes('dasar')) return BookOpen;
    return Users;
};

// Siluet Batik Sidomukti Kesuburan (Motif Kesuburan Bumi, Kemakmuran Warga & Tata Ruang Agraris Nusantara)
const BATIK_DEMOGRAFI_PATTERN = `data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' stroke='%23fbbf24'%3E%3Cpolygon points='35,18 47,35 35,52 23,35' fill='none' stroke-width='0.9' stroke-dasharray='2 2' /%3E%3Ccircle cx='35' cy='35' r='3' fill='none' stroke-width='0.8' /%3E%3Ccircle cx='35' cy='35' r='1.2' /%3E%3Cpath d='M35 24 C31 28, 31 31, 35 35 C39 31, 39 28, 35 24 Z' fill='none' stroke-width='0.7' /%3E%3Cpath d='M35 46 C31 42, 31 39, 35 35 C39 39, 39 42, 35 46 Z' fill='none' stroke-width='0.7' /%3E%3Cpath d='M24 35 C28 31, 31 31, 35 35 C31 39, 28 39, 24 35 Z' fill='none' stroke-width='0.7' /%3E%3Cpath d='M46 35 C42 31, 39 31, 35 35 C39 39, 42 39, 46 35 Z' fill='none' stroke-width='0.7' /%3E%3Ccircle cx='35' cy='12' r='1' /%3E%3Ccircle cx='35' cy='58' r='1' /%3E%3Ccircle cx='12' cy='35' r='1' /%3E%3Ccircle cx='58' cy='35' r='1' /%3E%3Cpath d='M0 35 L35 0 L70 35 L35 70 Z' fill='none' stroke-width='0.5' stroke-dasharray='1 4' opacity='0.5' /%3E%3Cpolygon points='0,0 12,0 0,12' fill='none' stroke-width='0.8' /%3E%3Cpolygon points='70,0 58,0 70,12' fill='none' stroke-width='0.8' /%3E%3Cpolygon points='0,70 12,70 0,58' fill='none' stroke-width='0.8' /%3E%3Cpolygon points='70,70 58,70 70,58' fill='none' stroke-width='0.8' /%3E%3Ccircle cx='0' cy='0' r='2' /%3E%3Ccircle cx='70' cy='0' r='2' /%3E%3Ccircle cx='0' cy='70' r='2' /%3E%3Ccircle cx='70' cy='70' r='2' /%3E%3C/g%3E%3C/svg%3E`;

export default function Demographics({ demographicsSettings = {} }) {
    // 1. Data Agregat Pokok
    const total = Number(demographicsSettings.total_citizens || 3482);
    const male = Number(demographicsSettings.male_citizens || 1724);
    const female = Number(demographicsSettings.female_citizens || 1758);
    const malePercent = ((male / (total || 1)) * 100).toFixed(1);
    const femalePercent = ((female / (total || 1)) * 100).toFixed(1);

    const stats = {
        total,
        male,
        malePercent,
        female,
        femalePercent,
        families: Number(demographicsSettings.total_families || 985),
        area: Number(demographicsSettings.area_ha || 123),
        density: Number(demographicsSettings.density || 2830),
        productivePercent: Number(demographicsSettings.productive_age_percent || 68.3),
        productiveCount: Number(demographicsSettings.productive_age_count || 2380),
    };

    // 2. Data Tata Guna Lahan Wilayah
    const defaultLandUse = [
        {
            category: 'Sawah / Pertanian',
            area_ha: 70,
            percent: 56.9,
            icon: 'Wheat',
            badge: 'Lahan Terluas (56,9%)',
            desc: 'Komoditas utama padi sawah, palawija, dan tanaman pangan pendukung ketahanan pangan desa.',
        },
        {
            category: 'Tanah Kering / Kebun',
            area_ha: 33,
            percent: 26.8,
            icon: 'Layers',
            badge: 'Tegalan & Kebun (26,8%)',
            desc: 'Pekarangan produktif, tegalan kering, tanaman musiman hortikultura, dan pohon peneduh.',
        },
        {
            category: 'Tambak Perikanan',
            area_ha: 11,
            percent: 8.9,
            icon: 'Fish',
            badge: 'Sektor Unggulan (8,9%)',
            desc: 'Kawasan budidaya perikanan air payau produktif untuk komoditas ikan bandeng dan udang vaname.',
        },
        {
            category: 'Perkampungan / Permukiman',
            area_ha: 9,
            percent: 7.3,
            icon: 'Home',
            badge: 'Kawasan Hunian (7,3%)',
            desc: 'Kompleks pemukiman warga desa, balai desa, fasilitas umum, sarana ibadah, dan jalan perdesaan.',
        },
    ];
    const landUseData =
        Array.isArray(demographicsSettings.land_use_list_data) && demographicsSettings.land_use_list_data.length > 0
            ? demographicsSettings.land_use_list_data
            : defaultLandUse;

    // 3. Data Mata Pencaharian
    const defaultProfessions = [
        { label: 'Petani Sawah / Palawija', count: 1150, percent: 33.0 },
        { label: 'Petambak Ikan Bandeng & Udang', count: 840, percent: 24.1 },
        { label: 'Karyawan Swasta & Buruh Pabrik', count: 520, percent: 14.9 },
        { label: 'Pelaku UMKM & Pedagang', count: 460, percent: 13.2 },
        { label: 'Lainnya / Wirausaha & Jasa', count: 400, percent: 11.6 },
        { label: 'PNS / TNI / Polri / Guru', count: 112, percent: 3.2 },
    ];
    const professions =
        Array.isArray(demographicsSettings.professions_list_data) && demographicsSettings.professions_list_data.length > 0
            ? demographicsSettings.professions_list_data
            : defaultProfessions;

    // 4. Data Piramida Usia
    const defaultAgeGroups = [
        { label: '0 – 4 Th (Balita)', count: 260, percent: 7.5, male: 132, female: 128 },
        { label: '5 – 14 Th (Anak-Anak)', count: 540, percent: 15.5, male: 275, female: 265 },
        { label: '15 – 24 Th (Remaja)', count: 580, percent: 16.7, male: 290, female: 290 },
        { label: '25 – 54 Th (Usia Produktif)', count: 1510, percent: 43.4, male: 742, female: 768 },
        { label: '55 – 64 Th (Pra-Lansia)', count: 342, percent: 9.8, male: 165, female: 177 },
        { label: '65+ Th (Lansia)', count: 250, percent: 7.1, male: 120, female: 130 },
    ];
    const ageGroups =
        Array.isArray(demographicsSettings.age_groups_list_data) && demographicsSettings.age_groups_list_data.length > 0
            ? demographicsSettings.age_groups_list_data
            : defaultAgeGroups;

    // 5. Data Pendidikan
    const defaultEducation = [
        { label: 'SMA / SMK / MA', count: 1132, percent: 32.5 },
        { label: 'SMP / MTs', count: 960, percent: 27.6 },
        { label: 'SD / Sederajat', count: 890, percent: 25.6 },
        { label: 'Diploma / Sarjana (S1/S2)', count: 320, percent: 9.1 },
        { label: 'Belum / Tidak Sekolah', count: 180, percent: 5.2 },
    ];
    const education =
        Array.isArray(demographicsSettings.education_list_data) && demographicsSettings.education_list_data.length > 0
            ? demographicsSettings.education_list_data
            : defaultEducation;

    return (
        <AppLayout>
            <SeoHead
                title="Data Demografi & Kependudukan Desa Karangwungu"
                description="Statistik resmi demografis kependudukan Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Sebaran per dusun, piramida usia, dan mata pencaharian warga."
                keywords="Demografi Desa Karangwungu, Penduduk Karangwungu Lamongan, Statistik Desa Karangwungu, Sensus Warga Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Data Demografi', url: '/profil/demografi' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Statistik & Kependudukan"
                    title="Data Demografi & Kependudukan"
                    subtitle="Gambaran agregat statistik kependudukan, sebaran wilayah dusun, piramida usia, serta mata pencaharian warga Desa Karangwungu."
                />

                {/* 2. PRIMARY KPI SUMMARY CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Penduduk (Royal Red Card with Batik Silhouette) */}
                    <div className="relative overflow-hidden p-5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-xl shadow-red-950/20 group">
                        {/* Siluet Batik Sidomukti Kesuburan */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-12 dark:opacity-10 group-hover:opacity-20 transition-opacity duration-500 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "65px 65px",
                            }}
                        />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-red-200/90">Total Penduduk</span>
                                <div className="h-7 w-7 rounded-lg bg-black/40 text-amber-300 flex items-center justify-center border border-amber-400/30">
                                    <Users className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="text-3xl font-black text-white tracking-tight">
                                {stats.total.toLocaleString('id-ID')}
                            </p>
                            <p className="text-[11px] text-amber-300 font-semibold">
                                Jiwa Terdaftar di Desa
                            </p>
                        </div>
                    </div>

                    {/* Rasio Gender */}
                    <div className="group relative overflow-hidden p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-300 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "55px 55px",
                            }}
                        />
                        <div className="relative z-10 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Komposisi Gender</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                                    1:1 Seimbang
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-0.5">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <span className="w-2 h-2 rounded-full bg-red-600 inline-block shrink-0" />
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Laki-Laki</span>
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                                        {stats.male.toLocaleString('id-ID')}
                                        <span className="ml-1 text-xs font-normal text-zinc-400">({stats.malePercent}%)</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 mb-0.5">
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Perempuan</span>
                                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0" />
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                                        {stats.female.toLocaleString('id-ID')}
                                        <span className="ml-1 text-xs font-normal text-zinc-400">({stats.femalePercent}%)</span>
                                    </p>
                                </div>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                                <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${stats.malePercent}%` }} />
                                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${stats.femalePercent}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Kepala Keluarga */}
                    <div className="group relative overflow-hidden p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-300 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "55px 55px",
                            }}
                        />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Kepala Keluarga (KK)</span>
                                <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 flex items-center justify-center border border-red-100/80 dark:border-red-900/30">
                                    <Building2 className="h-4 w-4" />
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    {stats.families.toLocaleString('id-ID')}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                                    Rata-rata 3,5 Jiwa per KK
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Usia Produktif */}
                    <div className="group relative overflow-hidden p-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-300 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "55px 55px",
                            }}
                        />
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Usia Produktif</span>
                                <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100/80 dark:border-amber-900/30">
                                    <Activity className="h-4 w-4" />
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    {stats.productivePercent}%
                                </p>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5 font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                    {stats.productiveCount.toLocaleString('id-ID')} Jiwa Usia Kerja (15–64 Th)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. SEKSI TATA GUNA LAHAN & WILAYAH DESA                      */}
                {/* ============================================================ */}
                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                                <LandPlot className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    {demographicsSettings.land_use_title || 'Tata Guna Lahan & Luas Wilayah'}
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {demographicsSettings.land_use_subtitle || `Distribusi pemanfaatan ruang dan peruntukan wilayah desa seluas ${stats.area} Ha (${(stats.area / 100).toFixed(2).replace('.', ',')} km²)`}
                                </p>
                            </div>
                        </div>

                        {/* Total Luas Badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-amber-400 text-xs font-bold shadow-xs">
                                <Compass className="h-3.5 w-3.5" />
                                <span>Total Luas: {stats.area} Ha ({(stats.area / 100).toFixed(2).replace('.', ',')} km²)</span>
                            </span>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {landUseData.map((item, idx) => {
                            const IconComponent =
                                typeof item.icon === 'string'
                                    ? getIconComponent(item.icon, Layers)
                                    : item.icon || Layers;
                            const areaHa = item.area_ha ?? item.areaHa ?? 0;

                            return (
                                <div
                                    key={idx}
                                    className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 space-y-3 flex flex-col justify-between group border border-red-500/30"
                                >
                                    {/* Siluet Batik Sidomukti Kesuburan */}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-10 sm:opacity-12 dark:opacity-10 group-hover:opacity-20 dark:group-hover:opacity-15 transition-opacity duration-500 bg-repeat"
                                        style={{
                                            backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                            backgroundSize: "65px 65px",
                                        }}
                                    />

                                    <div className="relative z-10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2.5 py-0.5 rounded-md bg-black/40 border border-white/15 text-amber-300 font-bold text-[10px]">
                                                {item.badge || `Sektor ${idx + 1}`}
                                            </span>
                                            <div className="h-8 w-8 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center">
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                                                {item.category}
                                            </h3>
                                            <div className="flex items-baseline gap-1.5 mt-1.5">
                                                <span className="text-3xl font-black text-white tracking-tight">
                                                    {areaHa}
                                                </span>
                                                <span className="text-xs font-bold text-amber-300">
                                                    Hektar (Ha)
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-red-100/75 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 space-y-1.5 pt-2 border-t border-white/10">
                                        <div className="flex items-center justify-between text-[10px] text-red-200/70 font-semibold">
                                            <span>Porsi Wilayah</span>
                                            <span className="text-amber-300 font-bold">{item.percent}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-700"
                                                style={{ width: `${Math.min(item.percent, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 4. DUA GRAFIK UTAMA: MATA PENCAHARIAN & PIRAMIDA USIA        */}
                {/* ============================================================ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GRAFIK 1: MATA PENCAHARIAN UTAMA WARGA */}
                    <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        {/* Subtle Batik Watermark Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "70px 70px",
                            }}
                        />

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 flex items-center justify-center border border-red-100/80 dark:border-red-900/40 shrink-0">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                                            {demographicsSettings.professions_title || 'Mata Pencaharian Utama Warga'}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {demographicsSettings.professions_subtitle || 'Distribusi sektor pekerjaan masyarakat Desa Karangwungu'}
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                                    {professions.length} Sektor Terdata
                                </span>
                            </div>

                            <div className="space-y-3.5 pt-1">
                                {professions.map((prof, idx) => (
                                    <div key={idx} className="space-y-1.5 p-2 -mx-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                {prof.label}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-zinc-900 dark:text-white">
                                                    {Number(prof.count).toLocaleString('id-ID')} <span className="text-[11px] font-normal text-zinc-400">Orang</span>
                                                </span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-amber-400 border border-red-100 dark:border-red-900/30">
                                                    {prof.percent}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 rounded-full transition-all duration-700"
                                                style={{ width: `${Math.min(prof.percent, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* GRAFIK 2: PIRAMIDA STRUKTUR KELOMPOK USIA */}
                    <div className="group relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                        {/* Subtle Batik Watermark Overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-500 bg-repeat"
                            style={{
                                backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                backgroundSize: "70px 70px",
                            }}
                        />

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-100/80 dark:border-amber-900/40 shrink-0">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                                            {demographicsSettings.age_groups_title || 'Struktur Penduduk Berdasarkan Kelompok Usia'}
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {demographicsSettings.age_groups_subtitle || 'Komposisi kelompok usia dan proporsi gender warga desa'}
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                                    {ageGroups.length} Rentang Usia
                                </span>
                            </div>

                            <div className="space-y-3.5 pt-1">
                                {ageGroups.map((group, idx) => (
                                    <div key={idx} className="space-y-1.5 p-2 -mx-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                                        <div className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                {group.label}
                                            </span>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                                                    L: {Number(group.male).toLocaleString('id-ID')} | P: {Number(group.female).toLocaleString('id-ID')}
                                                </span>
                                                <span className="font-bold text-zinc-900 dark:text-white">
                                                    {Number(group.count).toLocaleString('id-ID')} Jiwa
                                                </span>
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/30">
                                                    {group.percent}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                                            <div
                                                className="h-full bg-red-600 transition-all duration-500"
                                                style={{ width: `${(Number(group.male) / (stats.total || 1)) * 100 * 2}%` }}
                                            />
                                            <div
                                                className="h-full bg-amber-500 transition-all duration-500"
                                                style={{ width: `${(Number(group.female) / (stats.total || 1)) * 100 * 2}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50/70 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 shrink-0" />
                                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                                        Laki-Laki <strong className="font-bold text-zinc-900 dark:text-white">({stats.male.toLocaleString('id-ID')} Jiwa)</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30">
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                                    <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                                        Perempuan <strong className="font-bold text-zinc-900 dark:text-white">({stats.female.toLocaleString('id-ID')} Jiwa)</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 5. SEKSI TINGKAT PENDIDIKAN MASYARAKAT                       */}
                {/* ============================================================ */}
                <div className="space-y-5">
                    <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                            <GraduationCap className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                {demographicsSettings.education_title || 'Tingkat Pendidikan Terakhir Masyarakat'}
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {demographicsSettings.education_subtitle || 'Jenjang pendidikan formal penduduk usia sekolah ke atas'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {education.map((edu, idx) => {
                            const EduIcon = getEducationIcon(edu.label);
                            return (
                                <div
                                    key={idx}
                                    className="group relative overflow-hidden p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05] group-hover:opacity-[0.04] transition-opacity duration-300 bg-repeat"
                                        style={{
                                            backgroundImage: `url("${BATIK_DEMOGRAFI_PATTERN}")`,
                                            backgroundSize: "55px 55px",
                                        }}
                                    />

                                    <div className="relative z-10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="h-9 w-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-50 group-hover:text-red-600 dark:group-hover:bg-red-950/50 dark:group-hover:text-amber-400 flex items-center justify-center transition-colors">
                                                <EduIcon className="h-4 w-4" />
                                            </div>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-50 group-hover:text-red-600 dark:group-hover:bg-red-950/50 dark:group-hover:text-amber-400 transition-colors">
                                                {edu.percent}%
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium line-clamp-1" title={edu.label}>
                                                {edu.label}
                                            </span>
                                            <p className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
                                                {Number(edu.count).toLocaleString('id-ID')}
                                                <span className="ml-1 text-xs font-normal text-zinc-400">Jiwa</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-700"
                                                style={{ width: `${Math.min(edu.percent, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
