import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../Components/UI/Card';
import { Users, PieChart, Briefcase, GraduationCap, MapPin } from 'lucide-react';

export default function Demographics({ data = {} }) {
    const dusuns = [
        { name: 'Dusun Krajan', rt: 4, citizens: 1120, percent: 32 },
        { name: 'Dusun Karangwungu Timur', rt: 4, citizens: 980, percent: 28 },
        { name: 'Dusun Karangwungu Barat', rt: 3, citizens: 750, percent: 22 },
        { name: 'Dusun Sumberagung', rt: 3, citizens: 632, percent: 18 },
    ];

    const professions = [
        { label: 'Petani Sawah / Palawija', count: 1150, percent: 33 },
        { label: 'Petambak Ikan Bandeng & Udang', count: 840, percent: 24 },
        { label: 'Pelaku UMKM & Pedagang', count: 460, percent: 13 },
        { label: 'Karyawan Swasta & Buruh Pabrik', count: 520, percent: 15 },
        { label: 'PNS / TNI / Polri / Tenaga Pengajar', count: 112, percent: 3 },
        { label: 'Lainnya / Pelajar / Wirausaha', count: 400, percent: 12 },
    ];

    const education = [
        { label: 'Belum / Tidak Sekolah', count: 180, percent: 5 },
        { label: 'SD / Sederajat', count: 890, percent: 25 },
        { label: 'SMP / MTs', count: 960, percent: 28 },
        { label: 'SMA / SMK / MA', count: 1132, percent: 33 },
        { label: 'Diploma / Sarjana (D3/S1/S2)', count: 320, percent: 9 },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Data Demografi & Statistik Kependudukan"
                description="Statistik demografis kependudukan Desa Karangwungu, Lamongan. Komposisi jumlah penduduk per dusun, mata pencaharian, dan tingkat pendidikan masyarakat."
                keywords="Demografi Desa Karangwungu, Penduduk Karangwungu Lamongan, Statistik Desa Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Data Demografi', url: '/profil/demografi' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        { label: 'Profil Desa', url: '/profil' },
                        { label: 'Data Demografi', url: '/profil/demografi' },
                    ]}
                />

                <div className="my-6">
                    <Badge variant="secondary">Data Statistik</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                        Data Demografi & Kependudukan
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Gambaran statistik agregat kependudukan Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan.
                    </p>
                </div>

                {/* Primary Stats Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                    <Card>
                        <CardContent className="p-4 sm:p-5">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Penduduk</span>
                            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">3.482</p>
                            <span className="text-[11px] text-zinc-400">Jiwa Terdaftar</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 sm:p-5">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Laki-Laki</span>
                            <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">1.724</p>
                            <span className="text-[11px] text-zinc-400">49.5% dari total</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 sm:p-5">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Perempuan</span>
                            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">1.758</p>
                            <span className="text-[11px] text-zinc-400">50.5% dari total</span>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 sm:p-5">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Kepala Keluarga</span>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">985</p>
                            <span className="text-[11px] text-zinc-400">KK Aktif</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Dusun Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Distribusi Penduduk Berdasarkan Dusun</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {dusuns.map((dusun, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{dusun.name} ({dusun.rt} RT)</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">{dusun.citizens} Jiwa ({dusun.percent}%)</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-500"
                                            style={{ width: `${dusun.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Mata Pencaharian */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                <span>Mata Pencaharian Utama Warga</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {professions.map((prof, idx) => (
                                <div key={idx} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{prof.label}</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">{prof.count} Orang ({prof.percent}%)</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 dark:bg-amber-400 transition-all duration-500"
                                            style={{ width: `${prof.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Tingkat Pendidikan */}
                <Card className="my-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            <span>Tingkat Pendidikan Masyarakat</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {education.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-md bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 block">{item.label}</span>
                                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">{item.count} Jiwa</p>
                                <span className="text-[11px] text-sky-600 dark:text-sky-400">{item.percent}% populasi</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
