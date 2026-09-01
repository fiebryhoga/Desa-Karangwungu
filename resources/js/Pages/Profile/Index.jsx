import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Button from '../../Components/UI/Button';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../Components/UI/Card';
import { MapPin, Users, Building, Compass, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

export default function ProfileIndex({ officials = [], demographics = {} }) {
    return (
        <AppLayout>
            <SeoHead
                title="Profil Desa"
                description="Profil Lengkap Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Informasi letak geografis, batas wilayah, demografi penduduk, dan visi misi pembangunan desa."
                keywords="Profil Desa Karangwungu, Wilayah Karangwungu Karanggeneng, Karangwungu Lamongan, Sejarah Karangwungu"
                breadcrumbs={[{ label: 'Profil Desa', url: '/profil' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={[{ label: 'Profil Desa', url: '/profil' }]} />

                {/* Header Title */}
                <div className="my-6">
                    <Badge variant="secondary">Pemerintah Desa</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                        Profil Desa Karangwungu
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Kecamatan Karanggeneng, Kabupaten Lamongan, Provinsi Jawa Timur.
                    </p>
                </div>

                {/* Top Grid: Overview & Quick Facts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Gambaran Umum Wilayah</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
                                <p>
                                    <strong>Desa Karangwungu</strong> merupakan salah satu dari 18 desa di wilayah administratif <strong>Kecamatan Karanggeneng, Kabupaten Lamongan</strong>. Wilayah Karangwungu terletak di dataran rendah yang subur di sebelah utara Bengawan Solo, beriklim tropis dengan bentang alam yang didominasi oleh persawahan padi produktif dan tambak budidaya air tawar/payau.
                                </p>
                                <p>
                                    Masyarakat Desa Karangwungu dikenal dengan tradisi gotong royong yang kental, kehidupan beragama yang harmonis, serta etos kerja yang tinggi di bidang pertanian, perikanan darat, dan perdagangan wirausaha.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Batas Wilayah */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Compass className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                                    <span>Batas Wilayah Administratif</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Sebelah Utara</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">Desa Guci & Desa Sumberwudi</span>
                                    </div>
                                    <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Sebelah Selatan</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">Desa Karanggeneng</span>
                                    </div>
                                    <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Sebelah Timur</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">Desa Sungelebak</span>
                                    </div>
                                    <div className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">Sebelah Barat</span>
                                        <span className="text-zinc-600 dark:text-zinc-400">Desa Kalanganyar</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Menu Profil & Key Highlights */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Sub Menu Profil</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link
                                    href="/profil/sejarah"
                                    className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
                                >
                                    <span>Sejarah & Visi Misi Desa</span>
                                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                                </Link>
                                <Link
                                    href="/profil/perangkat-desa"
                                    className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
                                >
                                    <span>Struktur Perangkat Desa</span>
                                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                                </Link>
                                <Link
                                    href="/profil/demografi"
                                    className="flex items-center justify-between p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors"
                                >
                                    <span>Data Demografi Penduduk</span>
                                    <ArrowRight className="h-4 w-4 text-zinc-400" />
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
                            <CardHeader>
                                <CardTitle className="text-emerald-900 dark:text-emerald-200 text-base">
                                    Identitas Desa
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-emerald-900 dark:text-emerald-300 space-y-2">
                                <div><strong>Nama Desa:</strong> Karangwungu</div>
                                <div><strong>Kecamatan:</strong> Karanggeneng</div>
                                <div><strong>Kabupaten:</strong> Lamongan</div>
                                <div><strong>Provinsi:</strong> Jawa Timur</div>
                                <div><strong>Kode Pos:</strong> 62254</div>
                                <div><strong>Jumlah Dusun:</strong> 4 Dusun</div>
                                <div><strong>Jumlah RT / RW:</strong> 14 RT / 4 RW</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
