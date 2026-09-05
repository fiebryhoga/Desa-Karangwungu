import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { formatDateIndo, formatIndoDateTime } from '../../Utils/format';
import {
    Search,
    Clock,
    CheckCircle2,
    AlertCircle,
    FileText,
    ArrowRight,
    UserCheck,
    Sparkles,
    Copy,
    Check,
    Building2,
    MapPin,
    Calendar,
    User,
    Phone,
    Mail,
    Briefcase,
    ShieldCheck,
    PackageCheck,
    XCircle,
    Info,
    MessageCircle,
    HelpCircle,
    Home,
    RotateCcw,
} from 'lucide-react';

const STATUS_CONFIG = {
    menunggu: {
        step: 1,
        title: 'Menunggu Verifikasi & Pemrosesan Berkas',
        shortBadge: 'Menunggu Verifikasi',
        badgeClass: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
        bannerBorder: 'border-amber-500/30 dark:border-amber-500/30',
        bannerBg: 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent',
        icon: Clock,
        iconColor: 'text-amber-600 dark:text-amber-400',
        iconBg: 'bg-amber-100 dark:bg-amber-950/60',
        leadText: 'Permohonan surat Anda telah diterima di sistem online Desa Karangwungu.',
        description: 'Petugas administrasi Balai Desa sedang memverifikasi kelengkapan data & memproses penerbitan nomor registrasi surat. Mohon pantau halaman ini secara berkala.',
    },
    bisa_diambil: {
        step: 3,
        title: 'Surat Telah Selesai & Siap Diambil di Balai Desa',
        shortBadge: 'Siap Diambil di Balai Desa',
        badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
        bannerBorder: 'border-blue-500/40 dark:border-blue-500/40',
        bannerBg: 'bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent',
        icon: PackageCheck,
        iconColor: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-100 dark:bg-blue-950/60',
        leadText: 'Kabar baik! Dokumen fisik surat permohonan Anda telah selesai diproses.',
        description: 'Surat resmi telah dicetak di atas Kop Dinas Desa Karangwungu, ditandatangani oleh Kepala Desa, dan dibubuhi stempel basah. Silakan datang ke kantor Balai Desa untuk mengambil dokumen fisik asli.',
    },
    selesai: {
        step: 4,
        title: 'Dokumen Surat Telah Resmi Diserahkan',
        shortBadge: 'Pelayanan Selesai',
        badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        bannerBorder: 'border-emerald-500/30 dark:border-emerald-500/30',
        bannerBg: 'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent',
        icon: CheckCircle2,
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        iconBg: 'bg-emerald-100 dark:bg-emerald-950/60',
        leadText: 'Dokumen fisik surat telah diserahkan kepada pemohon di Balai Desa.',
        description: 'Proses pelayanan administrasi mandiri untuk surat ini telah selesai dengan tuntas. Terima kasih telah menggunakan layanan digital Desa Karangwungu.',
    },
    ditolak: {
        step: 0,
        title: 'Permohonan Surat Ditolak / Dibatalkan',
        shortBadge: 'Permohonan Ditolak',
        badgeClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
        bannerBorder: 'border-rose-500/30 dark:border-rose-500/30',
        bannerBg: 'bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent',
        icon: XCircle,
        iconColor: 'text-rose-600 dark:text-rose-400',
        iconBg: 'bg-rose-100 dark:bg-rose-950/60',
        leadText: 'Mohon maaf, berkas permohonan Anda belum dapat diproses.',
        description: 'Silakan periksa catatan dari petugas pelayanan di bawah ini untuk melihat alasan penolakan atau perbaikan data yang diperlukan.',
    },
};

export default function Track({ searchedCode = '', letter = null }) {
    const [code, setCode] = useState(searchedCode || '');
    const [copiedCode, setCopiedCode] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!code.trim()) return;
        router.get('/layanan/lacak', { code: code.trim() });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const currentStatus = letter ? (STATUS_CONFIG[letter.status] || STATUS_CONFIG.menunggu) : null;
    const StatusIcon = currentStatus?.icon || Clock;

    // Mask NIK: e.g. 352418******0001
    const maskedNik = (nik) => {
        if (!nik) return '-';
        if (nik.length >= 16) {
            return `${nik.substring(0, 6)}******${nik.substring(12)}`;
        }
        return `${nik.substring(0, 4)}****`;
    };

    // Mask Phone: e.g. 0857-3097-****
    const maskedPhone = (phone) => {
        if (!phone) return '-';
        const clean = phone.replace(/[^0-9]/g, '');
        if (clean.length > 7) {
            return `${clean.substring(0, 4)}-${clean.substring(4, 8)}-****`;
        }
        return phone;
    };

    // Format birth place & date
    const birthInfo = () => {
        if (!letter) return '-';
        if (letter.formatted_birth_date) {
            return letter.birth_place ? `${letter.birth_place}, ${letter.formatted_birth_date}` : letter.formatted_birth_date;
        }
        if (letter.birth_date) {
            const formatted = formatDateIndo(letter.birth_date);
            return letter.birth_place ? `${letter.birth_place}, ${formatted}` : formatted;
        }
        return letter.birth_place || '-';
    };

    return (
        <AppLayout>
            <SeoHead
                title="Lacak Status Permohonan Surat - Desa Karangwungu"
                description="Pantau perkembangan dan status surat administrasi kependudukan Anda secara realtime dengan memasukkan kode tracking permohonan."
                keywords="Lacak Surat Desa Karangwungu, Cek Status SKTM Karangwungu, Tracking Surat Desa Lamongan"
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Lacak Permohonan', url: '/layanan/lacak' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Pelayanan Mandiri Persuratan Desa"
                    title="Lacak Status Permohonan Surat"
                    subtitle="Pantau status verifikasi dan jadwal pengambilan dokumen fisik surat administrasi Anda secara realtime."
                    actions={[
                        {
                            label: 'Ajukan Surat Baru',
                            href: '/layanan/ajukan',
                            icon: Sparkles,
                            variant: 'primary',
                        },
                    ]}
                />

                {/* 2. SEARCH BOX */}
                <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                            <input
                                type="text"
                                placeholder="Masukkan Kode Tracking Surat (Contoh: KW-20260905-0WHP)"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 focus:border-transparent transition-all uppercase"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:brightness-110 text-white shadow-sm transition-all cursor-pointer shrink-0"
                        >
                            <span>Lacak Permohonan</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </form>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                        <span className="flex items-center gap-1.5">
                            <HelpCircle className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                            <span>Kode tracking diberikan otomatis saat Anda selesai mengisi formulir surat.</span>
                        </span>
                        {searchedCode && (
                            <button
                                type="button"
                                onClick={() => {
                                    setCode('');
                                    router.get('/layanan/lacak');
                                }}
                                className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-amber-400 hover:underline cursor-pointer"
                            >
                                <RotateCcw className="h-3 w-3" />
                                <span>Reset Pencarian</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* 3. SEARCH RESULT NOT FOUND */}
                {searchedCode && !letter && (
                    <div className="p-8 sm:p-10 rounded-lg bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-4 shadow-sm">
                        <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                            <AlertCircle className="h-7 w-7" />
                        </div>
                        <div className="space-y-1.5 max-w-md mx-auto">
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                                Permohonan Tidak Ditemukan
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Tidak ditemukan permohonan surat dengan kode tracking <strong className="font-mono text-zinc-900 dark:text-zinc-200 uppercase">{searchedCode}</strong>.
                            </p>
                            <p className="text-xs text-zinc-500 pt-1">
                                Pastikan kode tracking yang Anda masukkan lengkap tanpa salah ketik, atau ajukan permohonan baru melalui katalog layanan desa.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/layanan/ajukan"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
                            >
                                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                <span>Katalog Pengajuan Surat Mandiri</span>
                            </Link>
                        </div>
                    </div>
                )}

                {/* 4. MAIN LETTER TRACKING DETAILS */}
                {letter && currentStatus && (
                    <div className="space-y-6">
                        {/* A. STATUS BANNER (Paling Menonjol) */}
                        <div className={`p-6 sm:p-7 rounded-lg border shadow-sm ${currentStatus.bannerBorder} ${currentStatus.bannerBg} bg-white dark:bg-zinc-900 relative overflow-hidden space-y-5`}>
                            {/* Header Status */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex items-start gap-3.5">
                                    <div className={`p-3 rounded-lg ${currentStatus.iconBg} ${currentStatus.iconColor} shrink-0 mt-0.5 shadow-xs`}>
                                        <StatusIcon className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">
                                                Status Permohonan
                                            </span>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${currentStatus.badgeClass}`}>
                                                <StatusIcon className="h-3 w-3 shrink-0" />
                                                <span>{currentStatus.shortBadge}</span>
                                            </span>
                                        </div>
                                        <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white leading-snug">
                                            {currentStatus.title}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                                            {currentStatus.leadText}
                                        </p>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-0.5">
                                            {currentStatus.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Kode Tracking Box */}
                                <div className="sm:text-right shrink-0 bg-white/70 dark:bg-zinc-950/70 p-3.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xs space-y-1">
                                    <span className="text-[11px] font-medium text-zinc-500 block">Kode Lacak Resmi</span>
                                    <div className="flex items-center sm:justify-end gap-2">
                                        <span className="font-mono text-base sm:text-lg font-black text-red-700 dark:text-amber-400 tracking-wider">
                                            {letter.tracking_code}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(letter.tracking_code)}
                                            className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer transition-colors"
                                            title="Salin kode tracking"
                                        >
                                            {copiedCode ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <span className="text-[10px] text-zinc-400 block">
                                        Diajukan: {formatDateIndo(letter.created_at)}
                                    </span>
                                </div>
                            </div>

                            {/* Alur Langkah Pelayanan (Progress Stepper) */}
                            {letter.status !== 'ditolak' && (
                                <div className="pt-4 border-t border-zinc-200/70 dark:border-zinc-800/80">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {/* Step 1: Pengajuan Masuk */}
                                        <div className="p-2.5 rounded-lg bg-white/80 dark:bg-zinc-950/60 border border-emerald-500/40 space-y-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                <span>1. Masuk Sistem</span>
                                            </div>
                                            <p className="text-[10.5px] text-zinc-500 leading-tight">Pengajuan berhasil dikirim</p>
                                        </div>

                                        {/* Step 2: Verifikasi Petugas */}
                                        <div className={`p-2.5 rounded-lg bg-white/80 dark:bg-zinc-950/60 border space-y-1 ${
                                            ['bisa_diambil', 'selesai'].includes(letter.status)
                                                ? 'border-emerald-500/40'
                                                : 'border-amber-500/50 ring-1 ring-amber-500/20'
                                        }`}>
                                            <div className={`flex items-center gap-1.5 text-xs font-bold ${
                                                ['bisa_diambil', 'selesai'].includes(letter.status)
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : 'text-amber-700 dark:text-amber-400'
                                            }`}>
                                                {['bisa_diambil', 'selesai'].includes(letter.status) ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                ) : (
                                                    <Clock className="h-3.5 w-3.5 animate-pulse" />
                                                )}
                                                <span>2. Verifikasi Data</span>
                                            </div>
                                            <p className="text-[10.5px] text-zinc-500 leading-tight">
                                                {['bisa_diambil', 'selesai'].includes(letter.status) ? 'Telah diverifikasi' : 'Sedang diperiksa petugas'}
                                            </p>
                                        </div>

                                        {/* Step 3: Siap Diambil di Balai Desa */}
                                        <div className={`p-2.5 rounded-lg bg-white/80 dark:bg-zinc-950/60 border space-y-1 ${
                                            letter.status === 'selesai'
                                                ? 'border-emerald-500/40'
                                                : letter.status === 'bisa_diambil'
                                                ? 'border-blue-500/60 ring-2 ring-blue-500/30'
                                                : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                                        }`}>
                                            <div className={`flex items-center gap-1.5 text-xs font-bold ${
                                                letter.status === 'selesai'
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : letter.status === 'bisa_diambil'
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-zinc-500'
                                            }`}>
                                                {letter.status === 'selesai' ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                ) : letter.status === 'bisa_diambil' ? (
                                                    <PackageCheck className="h-3.5 w-3.5 animate-bounce" />
                                                ) : (
                                                    <Clock className="h-3.5 w-3.5" />
                                                )}
                                                <span>3. Siap Diambil</span>
                                            </div>
                                            <p className="text-[10.5px] text-zinc-500 leading-tight">
                                                {letter.status === 'bisa_diambil' ? 'Bisa diambil di balai desa' : 'Cetak & tanda tangan kades'}
                                            </p>
                                        </div>

                                        {/* Step 4: Selesai Diserahkan */}
                                        <div className={`p-2.5 rounded-lg bg-white/80 dark:bg-zinc-950/60 border space-y-1 ${
                                            letter.status === 'selesai'
                                                ? 'border-emerald-500/60 ring-2 ring-emerald-500/30'
                                                : 'border-zinc-200 dark:border-zinc-800 opacity-60'
                                        }`}>
                                            <div className={`flex items-center gap-1.5 text-xs font-bold ${
                                                letter.status === 'selesai' ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-500'
                                            }`}>
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                <span>4. Selesai</span>
                                            </div>
                                            <p className="text-[10.5px] text-zinc-500 leading-tight">
                                                {letter.status === 'selesai' ? 'Berkas diserahkan ke warga' : 'Penyerahan fisik di desa'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* PANDUAN PENGAMBILAN BERKAS JIKA STATUS BISA_DIAMBIL */}
                            {letter.status === 'bisa_diambil' && (
                                <div className="p-4 sm:p-5 rounded-lg bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-blue-900 dark:text-blue-300">
                                        <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span>Panduan Pengambilan Lembar Fisik Surat di Balai Desa:</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                        <div className="space-y-1">
                                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                <span>Lokasi Pengambilan</span>
                                            </span>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">
                                                Meja Pelayanan Kantor Balai Desa Karangwungu, Kec. Karanggeneng
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                <span>Jam Pelayanan</span>
                                            </span>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">
                                                Senin – Jumat, Pukul 08.00 – 15.00 WIB (Hari Kerja)
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                <span>Syarat Pengambilan</span>
                                            </span>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-snug">
                                                Membawa KTP Asli pemohon untuk verifikasi data penerima.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* B. CATATAN RESMI PETUGAS PELAYANAN DESA (Bila ada) */}
                        {letter.admin_notes && (
                            <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2.5">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-amber-400">
                                    <UserCheck className="h-4 w-4" />
                                    <span>Pemberitahuan Resmi Petugas Pelayanan Desa</span>
                                </div>
                                <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                                    {letter.admin_notes}
                                </div>
                            </div>
                        )}

                        {/* C. ISIAN-ISIAN DATA PERMOHONAN (2 KOLOM RAPI & LENGKAP) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* KOLOM KIRI: Data Identitas Pemohon (7 Cols) */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
                                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                                Data Identitas Pemohon
                                            </h3>
                                        </div>
                                        <span className="text-[11px] text-zinc-400 font-medium">Sesuai KTP / KK</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                        {/* Nama Lengkap */}
                                        <div className="sm:col-span-2 space-y-1 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-700/60">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Nama Lengkap Pemohon</span>
                                            <span className="font-bold text-sm text-zinc-900 dark:text-white block uppercase tracking-wide">
                                                {letter.citizen_name || '-'}
                                            </span>
                                        </div>

                                        {/* NIK */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">NIK (Disamarkan)</span>
                                            <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200 block text-xs sm:text-sm">
                                                {maskedNik(letter.citizen_nik)}
                                            </span>
                                        </div>

                                        {/* Tempat & Tanggal Lahir */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Tempat, Tanggal Lahir</span>
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                                                {birthInfo()}
                                            </span>
                                        </div>

                                        {/* Jenis Kelamin */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Jenis Kelamin</span>
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                                                {letter.gender || '-'}
                                            </span>
                                        </div>

                                        {/* Agama */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Agama</span>
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                                                {letter.religion || 'Islam'}
                                            </span>
                                        </div>

                                        {/* Pekerjaan */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Pekerjaan</span>
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">
                                                {letter.occupation || '-'}
                                            </span>
                                        </div>

                                        {/* Kontak Telepon */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Nomor WhatsApp / HP</span>
                                            <span className="font-mono text-zinc-800 dark:text-zinc-200 block">
                                                {maskedPhone(letter.citizen_phone)}
                                            </span>
                                        </div>

                                        {/* Alamat Tempat Tinggal */}
                                        <div className="sm:col-span-2 space-y-1 pt-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Alamat Tempat Tinggal (Domisili)</span>
                                            <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 font-medium text-zinc-800 dark:text-zinc-200 text-xs leading-relaxed">
                                                {letter.citizen_address || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* KOLOM KANAN: Rincian Surat & Keperluan (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
                                    <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                                Rincian Permohonan Surat
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-xs">
                                        {/* Jenis Surat */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Jenis Dokumen Surat</span>
                                            <span className="font-bold text-sm text-red-700 dark:text-amber-400 block">
                                                {letter.letter_type}
                                            </span>
                                        </div>

                                        {/* Nomor Registrasi Resmi Surat (Jika ada) */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Nomor Registrasi Surat Resmi</span>
                                            {letter.letter_number ? (
                                                <span className="font-mono font-bold text-zinc-900 dark:text-white block bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                                    {letter.letter_number}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[11px] font-medium border border-zinc-200 dark:border-zinc-700">
                                                    <Clock className="h-3 w-3" />
                                                    <span>Diberikan saat berkas diverifikasi desa</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Tanggal Pengajuan */}
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Waktu Pengajuan</span>
                                            <span className="text-zinc-800 dark:text-zinc-200 font-semibold block">
                                                {formatIndoDateTime(letter.created_at) || formatDateIndo(letter.created_at)}
                                            </span>
                                        </div>

                                        {/* Keperluan Pengajuan */}
                                        <div className="space-y-1.5 pt-1">
                                            <span className="text-zinc-500 dark:text-zinc-400 block font-medium">Keperluan / Alasan Pengajuan</span>
                                            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/60 font-medium text-zinc-800 dark:text-zinc-200 text-xs leading-relaxed italic">
                                                "{letter.purpose || '-'}"
                                            </div>
                                        </div>

                                        {/* Info Dokumen Fisik */}
                                        <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-[11.5px] text-amber-900 dark:text-amber-300 space-y-1">
                                            <div className="font-bold flex items-center gap-1.5">
                                                <Info className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                                                <span>Pengambilan Surat Fisik Resmi</span>
                                            </div>
                                            <p className="leading-snug text-amber-800/90 dark:text-amber-300/90 text-[11px]">
                                                Surat resmi diterbitkan di atas lembar fisik asli berstempel basah & tanda tangan Kepala Desa di Balai Desa Karangwungu. Dokumen tidak diunduh mandiri guna menjaga keabsahan berkas kedinasan.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hubungi Petugas Desa */}
                                <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-xs text-zinc-900 dark:text-white">
                                        <Building2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                        <span>Pusat Informasi & Pelayanan Warga</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                        Jika ada pertanyaan mengenai status permohonan surat Anda, silakan hubungi kontak resmi Balai Desa atau datang langsung pada jam kerja.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                                        <Link
                                            href="/kontak"
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
                                        >
                                            <Phone className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                            <span>Kontak Desa</span>
                                        </Link>
                                        <Link
                                            href="/layanan/ajukan"
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white hover:brightness-110 shadow-2xs transition-all"
                                        >
                                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                                            <span>Ajukan Surat Lain</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
