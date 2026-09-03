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
} from 'lucide-react';

export default function Demographics() {
    // 1. Data Agregat Pokok
    const stats = {
        total: 3482,
        male: 1724,
        malePercent: 49.5,
        female: 1758,
        femalePercent: 50.5,
        families: 985,
        area: 123,
        density: 2830,
        productivePercent: 68.3,
    };

    // 2. Data Tata Guna Lahan Wilayah (Total 123 Ha / 1,23 km²)
    const landUseData = [
        {
            category: 'Sawah / Pertanian',
            areaHa: 70,
            percent: 56.9,
            icon: Wheat,
            badge: 'Lahan Terluas (56,9%)',
            desc: 'Komoditas utama padi sawah, palawija, dan tanaman pangan pendukung ketahanan pangan desa.',
        },
        {
            category: 'Tanah Kering / Kebun',
            areaHa: 33,
            percent: 26.8,
            icon: Layers,
            badge: 'Tegalan & Kebun (26,8%)',
            desc: 'Pekarangan produktif, tegalan kering, tanaman musiman hortikultura, dan pohon peneduh.',
        },
        {
            category: 'Tambak Perikanan',
            areaHa: 11,
            percent: 8.9,
            icon: Fish,
            badge: 'Sektor Unggulan (8,9%)',
            desc: 'Kawasan budidaya perikanan air payau produktif untuk komoditas ikan bandeng dan udang vaname.',
        },
        {
            category: 'Perkampungan / Permukiman',
            areaHa: 9,
            percent: 7.3,
            icon: Home,
            badge: 'Kawasan Hunian (7,3%)',
            desc: 'Kompleks pemukiman warga desa, balai desa, fasilitas umum, sarana ibadah, dan jalan perdesaan.',
        },
    ];

    // 3. Data Mata Pencaharian
    const professions = [
        { label: 'Petani Sawah / Palawija', count: 1150, percent: 33.0 },
        { label: 'Petambak Ikan Bandeng & Udang', count: 840, percent: 24.1 },
        { label: 'Karyawan Swasta & Buruh Pabrik', count: 520, percent: 14.9 },
        { label: 'Pelaku UMKM & Pedagang', count: 460, percent: 13.2 },
        { label: 'Lainnya / Wirausaha & Jasa', count: 400, percent: 11.6 },
        { label: 'PNS / TNI / Polri / Guru', count: 112, percent: 3.2 },
    ];

    // 4. Data Piramida Usia
    const ageGroups = [
        { label: '0 – 4 Th (Balita)', count: 260, percent: 7.5, male: 132, female: 128 },
        { label: '5 – 14 Th (Anak-Anak)', count: 540, percent: 15.5, male: 275, female: 265 },
        { label: '15 – 24 Th (Remaja)', count: 580, percent: 16.7, male: 290, female: 290 },
        { label: '25 – 54 Th (Usia Produktif)', count: 1510, percent: 43.4, male: 742, female: 768 },
        { label: '55 – 64 Th (Pra-Lansia)', count: 342, percent: 9.8, male: 165, female: 177 },
        { label: '65+ Th (Lansia)', count: 250, percent: 7.1, male: 120, female: 130 },
    ];

    // 5. Data Pendidikan
    const education = [
        { label: 'SMA / SMK / MA', count: 1132, percent: 32.5 },
        { label: 'SMP / MTs', count: 960, percent: 27.6 },
        { label: 'SD / Sederajat', count: 890, percent: 25.6 },
        { label: 'Diploma / Sarjana (S1/S2)', count: 320, percent: 9.1 },
        { label: 'Belum / Tidak Sekolah', count: 180, percent: 5.2 },
    ];

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
                    {/* Total Penduduk (Royal Red Card) */}
                    <div className="p-5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-xl shadow-red-950/20 space-y-2">
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

                    {/* Rasio Gender */}
                    <div className="p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Komposisi Gender</span>
                            <span className="text-[11px] font-bold text-red-600 dark:text-amber-400">1:1 Seimbang</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <div>
                                <span className="text-xs text-zinc-400 block">Laki-Laki</span>
                                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                                    {stats.male.toLocaleString('id-ID')} <span className="text-xs font-normal text-zinc-400">({stats.malePercent}%)</span>
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-zinc-400 block">Perempuan</span>
                                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                                    {stats.female.toLocaleString('id-ID')} <span className="text-xs font-normal text-zinc-400">({stats.femalePercent}%)</span>
                                </span>
                            </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                            <div className="h-full bg-red-600" style={{ width: `${stats.malePercent}%` }} />
                            <div className="h-full bg-amber-500" style={{ width: `${stats.femalePercent}%` }} />
                        </div>
                    </div>

                    {/* Kepala Keluarga */}
                    <div className="p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Kepala Keluarga (KK)</span>
                            <div className="h-7 w-7 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-amber-400 flex items-center justify-center">
                                <Building2 className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            {stats.families.toLocaleString('id-ID')}
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Rata-rata 3.5 Jiwa per KK
                        </p>
                    </div>

                    {/* Usia Produktif */}
                    <div className="p-5 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Usia Produktif</span>
                            <div className="h-7 w-7 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                                <Activity className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            {stats.productivePercent}%
                        </p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            2.380 Jiwa Usia Kerja (15–64 Th)
                        </p>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. SEKSI TATA GUNA LAHAN & WILAYAH DESA (123 Ha / 1,23 km²)  */}
                {/* ============================================================ */}
                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                                <LandPlot className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    Tata Guna Lahan & Luas Wilayah
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Distribusi pemanfaatan ruang dan peruntukan wilayah desa seluas 123 Ha (1,23 km²)
                                </p>
                            </div>
                        </div>

                        {/* Total Luas Badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-amber-400 text-xs font-bold shadow-xs">
                                <Compass className="h-3.5 w-3.5" />
                                <span>Total Luas: 123 Ha (1,23 km²)</span>
                            </span>
                        </div>
                    </div>


                    {/* 4 Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {landUseData.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 space-y-3 flex flex-col justify-between group border border-red-500/30"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2.5 py-0.5 rounded-md bg-black/40 border border-white/15 text-amber-300 font-bold text-[10px]">
                                                {item.badge}
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
                                                    {item.areaHa}
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

                                    <div className="space-y-1.5 pt-2 border-t border-white/10">
                                        <div className="flex items-center justify-between text-[10px] text-red-200/70 font-semibold">
                                            <span>Porsi Wilayah</span>
                                            <span className="text-amber-300 font-bold">{item.percent}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-700"
                                                style={{ width: `${item.percent}%` }}
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
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                                <Briefcase className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Mata Pencaharian Utama Warga
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Distribusi sektor pekerjaan masyarakat Desa Karangwungu
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {professions.map((prof, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="font-semibold text-zinc-900 dark:text-white">
                                            {prof.label}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-zinc-900 dark:text-white">
                                                {prof.count.toLocaleString('id-ID')} Orang
                                            </span>
                                            <span className="text-xs font-semibold text-red-600 dark:text-amber-400">
                                                ({prof.percent}%)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 via-red-700 to-amber-500 rounded-full transition-all duration-700"
                                            style={{ width: `${prof.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* GRAFIK 2: PIRAMIDA STRUKTUR KELOMPOK USIA */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                                <Activity className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Struktur Penduduk Berdasarkan Kelompok Usia
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Komposisi kelompok usia dan proporsi gender warga desa
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {ageGroups.map((group, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="font-semibold text-zinc-900 dark:text-white">
                                            {group.label}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-zinc-500 dark:text-zinc-400">
                                                L: {group.male} | P: {group.female}
                                            </span>
                                            <span className="font-bold text-zinc-900 dark:text-white">
                                                {group.count} Jiwa ({group.percent}%)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                                        <div
                                            className="h-full bg-red-600 transition-all duration-500"
                                            style={{ width: `${(group.male / stats.total) * 100 * 2}%` }}
                                        />
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-500"
                                            style={{ width: `${(group.female / stats.total) * 100 * 2}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-red-600" />
                                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Laki-Laki (1.724 Jiwa)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-amber-500" />
                                <span className="text-zinc-600 dark:text-zinc-400 font-medium">Perempuan (1.758 Jiwa)</span>
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
                                Tingkat Pendidikan Terakhir Masyarakat
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Jenjang pendidikan formal penduduk usia sekolah ke atas
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {education.map((edu, idx) => (
                            <div
                                key={idx}
                                className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3 hover:border-red-500/50 dark:hover:border-amber-400/50 transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-1">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block font-medium">
                                        {edu.label}
                                    </span>
                                    <p className="text-xl font-bold text-zinc-900 dark:text-white">
                                        {edu.count.toLocaleString('id-ID')} <span className="text-xs font-normal text-zinc-400">Jiwa</span>
                                    </p>
                                </div>

                                <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex justify-between text-[11px] font-semibold text-red-600 dark:text-amber-400">
                                        <span>Proporsi</span>
                                        <span>{edu.percent}%</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                                            style={{ width: `${edu.percent}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
