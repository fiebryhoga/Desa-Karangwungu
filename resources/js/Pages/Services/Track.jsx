import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Button from '../../Components/UI/Button';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Search, Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, UserCheck } from 'lucide-react';

export default function Track({ searchedCode = '', letter = null }) {
    const [code, setCode] = useState(searchedCode || '');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!code.trim()) return;
        router.get('/layanan/lacak', { code: code.trim() });
    };

    const statusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <Badge variant="success">Selesai / Siap Diambil</Badge>;
            case 'processing':
                return <Badge variant="warning">Sedang Diproses / Tanda Tangan</Badge>;
            case 'verified':
                return <Badge variant="info">Berkas Terverifikasi</Badge>;
            case 'rejected':
                return <Badge variant="danger">Ditolak / Perlu Perbaikan</Badge>;
            default:
                return <Badge variant="secondary">Menunggu Verifikasi Petugas</Badge>;
        }
    };

    return (
        <AppLayout>
            <SeoHead
                title="Lacak Status Permohonan Surat"
                description="Pantau progres pengajuan surat administrasi desa Anda secara realtime menggunakan kode tracking permohonan."
                keywords="Lacak Surat Desa Karangwungu, Cek Status Surat Karangwungu, Tracking Surat Desa Lamongan"
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Lacak Status Surat', url: '/layanan/lacak' },
                ]}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="my-6">
                    <Badge variant="gold">Tracking Surat</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
                        Lacak Status Permohonan Surat
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                        Masukkan kode permohonan surat Anda (contoh: <code className="text-red-600 dark:text-amber-400 font-mono">KW-20260901-001</code>) untuk mengecek status pemrosesan.
                    </p>
                </div>

                {/* Search Bar Box */}
                <Card className="my-6">
                    <CardContent className="p-6">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                                <input
                                    type="text"
                                    placeholder="Masukkan Kode Tracking (Contoh: KW-20260901-001)"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                                    required
                                />
                            </div>
                            <Button type="submit" variant="red" size="default" className="shrink-0">
                                <span>Cari Permohonan</span>
                                <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Search Result Not Found */}
                {searchedCode && !letter && (
                    <Card className="my-6 border-dashed border-zinc-300 dark:border-zinc-800">
                        <CardContent className="p-8 text-center space-y-3">
                            <AlertCircle className="h-10 w-10 text-red-600 dark:text-amber-400 mx-auto" />
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                Permohonan Tidak Ditemukan
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                                Tidak ditemukan data pengajuan surat dengan kode <strong className="text-zinc-900 dark:text-white">{searchedCode}</strong>. Pastikan Anda memasukkan kode dengan benar.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Letter Result */}
                {letter && (
                    <div className="space-y-6 my-6">
                        <Card className="border-red-500/30 dark:border-amber-500/40 shadow-xl">
                            <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Kode Tracking Surat:</span>
                                        <p className="text-xl font-bold font-mono text-red-600 dark:text-amber-400">
                                            {letter.tracking_code}
                                        </p>
                                    </div>
                                    <div>{statusBadge(letter.status)}</div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 space-y-6">
                                {/* Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Nama Pemohon:</span>
                                        <span className="font-semibold text-zinc-900 dark:text-white">{letter.citizen_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">NIK (Disamarkan):</span>
                                        <span className="font-mono text-zinc-700 dark:text-zinc-300">
                                            {letter.citizen_nik.substring(0, 6)}******{letter.citizen_nik.substring(12)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Jenis Surat:</span>
                                        <span className="font-semibold text-zinc-900 dark:text-white">{letter.letter_type}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 block">Waktu Pengajuan:</span>
                                        <span className="text-zinc-700 dark:text-zinc-300">{formatDateIndo(letter.created_at)}</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="text-xs text-zinc-400 block">Keperluan:</span>
                                        <span className="text-zinc-300">{letter.purpose}</span>
                                    </div>
                                </div>

                                {/* Status Timeline Note */}
                                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                                        <UserCheck className="h-4 w-4 text-amber-400" />
                                        <span>Catatan dari Petugas Pelayanan Desa:</span>
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                        {letter.admin_notes || 'Permohonan Anda sedang dalam proses verifikasi administrasi.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
