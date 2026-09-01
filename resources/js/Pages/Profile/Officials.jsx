import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../Components/UI/Card';
import { Shield, Phone, Mail, UserCheck } from 'lucide-react';

export default function Officials({ officials = [] }) {
    return (
        <AppLayout>
            <SeoHead
                title="Struktur Perangkat Desa"
                description="Daftar Perangkat Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Kepala Desa, Sekretaris Desa, Kepala Urusan, Kepala Seksi, dan Kepala Dusun."
                keywords="Perangkat Desa Karangwungu, Kepala Desa Karangwungu Lamongan, Struktur Organisasi Pemdes Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Perangkat Desa', url: '/profil/perangkat-desa' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        { label: 'Profil Desa', url: '/profil' },
                        { label: 'Perangkat Desa', url: '/profil/perangkat-desa' },
                    ]}
                />

                <div className="my-6">
                    <Badge variant="secondary">Tata Kelola Desa</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                        Pemerintah Desa Karangwungu
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Susunan Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan.
                    </p>
                </div>

                {/* Officials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
                    {officials.map((official) => (
                        <Card key={official.id} className="overflow-hidden flex flex-col hover:border-zinc-400 dark:hover:border-zinc-700 transition-all hover:shadow-md">
                            <div className="h-60 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                                <img
                                    src={official.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                                    alt={official.name}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge variant="default" className="bg-black/70 backdrop-blur-sm text-white border-0 text-xs">
                                        {official.position}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="p-4 pb-2 flex-1">
                                <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                    {official.name}
                                </CardTitle>
                                {official.nip && (
                                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                                        NIP: {official.nip}
                                    </p>
                                )}
                                {official.bio && (
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                                        {official.bio}
                                    </p>
                                )}
                            </CardHeader>

                            <CardFooter className="p-4 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                    <UserCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Aktif Menjabat</span>
                                </span>
                                {official.phone && (
                                    <span className="text-zinc-400">{official.phone}</span>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
