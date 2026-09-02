import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Button from '../../Components/UI/Button';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../Components/UI/Card';
import { FileText, CheckCircle2, Clock, Sparkles, Search, ArrowRight, Shield } from 'lucide-react';

export default function ServicesIndex({ services = [] }) {
    return (
        <AppLayout>
            <SeoHead
                title="Layanan Surat & Administrasi Warga"
                description="Katalog resmi pelayanan administrasi surat menyurat Pemerintah Desa Karangwungu, Karanggeneng, Lamongan. Syarat pembuatan SKU, Domisili, SKTM, Kelahiran, Kematian, dan Pengantar Nikah."
                keywords="Layanan Surat Desa Karangwungu, Surat Keterangan Usaha Karangwungu, SKTM Karangwungu Lamongan, Surat Domisili Desa"
                breadcrumbs={[{ label: 'Layanan Online', url: '/layanan' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Banner */}
                <div className="my-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Badge variant="success">Pelayanan Mandiri</Badge>
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                            Katalog Layanan Surat & Administrasi
                        </h1>
                        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                            Pemerintah Desa Karangwungu menyediakan layanan pengajuan surat secara daring untuk efisiensi waktu warga.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button href="/layanan/ajukan" variant="accent" size="default">
                            <Sparkles className="h-4 w-4 mr-2" />
                            <span>Ajukan Surat Sekarang</span>
                        </Button>
                        <Button href="/layanan/lacak" variant="outline" size="default">
                            <Search className="h-4 w-4 mr-2" />
                            <span>Lacak Permohonan</span>
                        </Button>
                    </div>
                </div>

                {/* Services Catalog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                    {services.map((service) => (
                        <Card key={service.id} className="flex flex-col hover:border-zinc-400 dark:hover:border-zinc-700 transition-all hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <Badge variant="secondary" className="text-[11px]">
                                        {service.category}
                                    </Badge>
                                </div>
                                <CardTitle className="text-base font-bold">
                                    {service.title}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1 space-y-3 pt-0">
                                <div>
                                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 block mb-1.5">
                                        Persyaratan Dokumen:
                                    </span>
                                    <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                                        {service.requirements.map((req, idx) => (
                                            <li key={idx} className="flex items-start gap-1.5">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-2.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                    <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    <span>Estimasi: <strong>{service.processing_time}</strong></span>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-2">
                                <Button
                                    href={`/layanan/ajukan?type=${service.id}`}
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                >
                                    <span>Buat Permohonan Ini</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
