import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
    FileSignature,
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
    X,
} from 'lucide-react';

const BATIK_PARANG_PATTERN = `data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' stroke='%23fbbf24'%3E%3Cpath d='M0 0 L80 80 M0 40 L40 80 M40 0 L80 40' stroke-width='1.2' fill='none' stroke-linecap='round' opacity='0.75'/%3E%3Cpath d='M-5 15 L65 85 M15 -5 L85 65' stroke-width='0.7' fill='none' stroke-dasharray='2 3' opacity='0.5'/%3E%3Cpath d='M14 26 C10 22 10 14 18 14 C26 14 28 22 22 26 C18 28 16 28 14 26 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M54 66 C50 62 50 54 58 54 C66 54 68 62 62 66 C58 68 56 68 54 66 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M54 26 C50 22 50 14 58 14 C66 14 68 22 62 26 C58 28 56 28 54 26 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpath d='M14 66 C10 62 10 54 18 54 C26 54 28 62 22 66 C18 68 16 68 14 66 Z' fill='%23fbbf24' fill-opacity='0.25' stroke-width='0.9'/%3E%3Cpolygon points='40,16 44,20 40,24 36,20' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='20,36 24,40 20,44 16,40' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='60,36 64,40 60,44 56,40' fill='%23fbbf24' stroke-width='0.5'/%3E%3Cpolygon points='40,56 44,60 40,64 36,60' fill='%23fbbf24' stroke-width='0.5'/%3E%3Ccircle cx='0' cy='0' r='2' /%3E%3Ccircle cx='80' cy='0' r='2' /%3E%3Ccircle cx='0' cy='80' r='2' /%3E%3Ccircle cx='80' cy='80' r='2' /%3E%3Ccircle cx='40' cy='40' r='2.2' /%3E%3Ccircle cx='20' cy='20' r='1.2' /%3E%3Ccircle cx='60' cy='60' r='1.2' /%3E%3Ccircle cx='60' cy='20' r='1.2' /%3E%3Ccircle cx='20' cy='60' r='1.2' /%3E%3C/g%3E%3C/svg%3E`;

const STATUS_CONFIG = {
    menunggu: {
        step: 1,
        title: 'Menunggu Verifikasi & Pemrosesan Berkas',
        shortBadge: 'Menunggu Verifikasi',
        badgeClass: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
        icon: Clock,
        leadText: 'Permohonan surat Anda telah diterima di sistem online Desa Karangwungu.',
        description: 'Petugas administrasi Balai Desa sedang memverifikasi kelengkapan data & memproses penerbitan nomor registrasi surat. Mohon pantau halaman ini secara berkala.',
    },
    bisa_diambil: {
        step: 3,
        title: 'Surat Telah Selesai & Siap Diambil di Balai Desa',
        shortBadge: 'Siap Diambil di Balai Desa',
        badgeClass: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
        icon: PackageCheck,
        leadText: 'Kabar baik! Dokumen fisik surat permohonan Anda telah selesai diproses.',
        description: 'Surat resmi telah dicetak di atas Kop Dinas Desa Karangwungu, ditandatangani oleh Kepala Desa, dan dibubuhi stempel basah. Silakan datang ke kantor Balai Desa untuk mengambil dokumen fisik asli.',
    },
    selesai: {
        step: 4,
        title: 'Dokumen Surat Telah Resmi Diserahkan',
        shortBadge: 'Pelayanan Tuntas',
        badgeClass: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40',
        icon: CheckCircle2,
        leadText: 'Dokumen fisik surat telah diserahkan kepada pemohon di Balai Desa.',
        description: 'Proses pelayanan administrasi mandiri untuk surat ini telah selesai dengan tuntas. Terima kasih telah menggunakan layanan digital Desa Karangwungu.',
    },
    ditolak: {
        step: 0,
        title: 'Permohonan Surat Ditolak / Dibatalkan',
        shortBadge: 'Permohonan Ditolak',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        icon: XCircle,
        leadText: 'Mohon maaf, berkas permohonan Anda belum dapat diproses.',
        description: 'Silakan periksa catatan dari petugas pelayanan di bawah ini untuk melihat alasan penolakan atau perbaikan data yang diperlukan.',
    },
};

export default function Track({ searchedCode = '', letter = null }) {
    const { general_settings, village_info } = usePage().props;
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

    // Mask Name: e.g. DODI SETYO PUTRO PURWANTO -> D**I S***O P***O P******O
    const maskedName = (name) => {
        if (!name) return '-';
        const words = String(name).trim().split(/\s+/);
        return words
            .map((w) => {
                if (w.length <= 1) return w;
                if (w.length === 2) return `${w[0]}*`;
                if (w.length === 3) return `${w[0]}*${w[2]}`;
                return `${w[0]}${'*'.repeat(w.length - 2)}${w[w.length - 1]}`;
            })
            .join(' ');
    };

    // Mask NIK: e.g. 3524182304920001 -> 3524**********01 (10 digit tersensor penuh)
    const maskedNik = (nik) => {
        if (!nik) return '-';
        const clean = String(nik).trim().replace(/[^0-9]/g, '');
        if (clean.length >= 16) {
            return `${clean.substring(0, 4)}**********${clean.substring(clean.length - 2)}`;
        }
        if (clean.length >= 8) {
            return `${clean.substring(0, 2)}${'*'.repeat(clean.length - 4)}${clean.slice(-2)}`;
        }
        return `${clean.substring(0, 2)}****`;
    };

    // Mask Phone: e.g. 081234567890 -> 0812-****-**90 (Sensor lebih rapat di tengah, nomor terakhir tetap tampil untuk verifikasi pemohon)
    const maskedPhone = (phone) => {
        if (!phone) return '-';
        let clean = String(phone).trim().replace(/[^0-9]/g, '');
        if (clean.startsWith('62')) {
            clean = '0' + clean.substring(2);
        }
        if (clean.length >= 10) {
            const prefix = clean.substring(0, 4);
            const suffix = clean.slice(-2);
            const middleLen = clean.length - 4 - 2;
            if (middleLen <= 4) {
                return `${prefix}-****-${suffix}`;
            }
            return `${prefix}-****-${'*'.repeat(middleLen - 4)}${suffix}`;
        }
        if (clean.length >= 6) {
            return `${clean.substring(0, 3)}-****-${clean.slice(-2)}`;
        }
        return phone;
    };

    // Mask Birth Date: e.g. "03 April 1992" -> "**-**-1992" (Sensor hari & bulan, tampilkan tahun lahir untuk verifikasi pemohon)
    const maskedBirthDate = (formattedDate, rawDate) => {
        const source = formattedDate || rawDate;
        if (!source) return '';
        const match = String(source).match(/\b(19\d{2}|20\d{2})\b/);
        if (match) {
            return `**-**-${match[1]}`;
        }
        return '**-**-****';
    };

    // Format birth place & date (dengan penyensoran tanggal lahir UU PDP)
    const birthInfo = () => {
        if (!letter) return '-';
        const maskedDate = maskedBirthDate(letter.formatted_birth_date, letter.birth_date);
        if (letter.birth_place && maskedDate) {
            return `${letter.birth_place}, ${maskedDate}`;
        }
        if (maskedDate) {
            return maskedDate;
        }
        return letter.birth_place || '-';
    };

    // Link konfirmasi tindak lanjut via WhatsApp resmi ke petugas desa
    const getWhatsappFollowUpUrl = () => {
        if (!letter) return '#';

        // Nomor WhatsApp tujuan (Balai Desa Karangwungu)
        const rawPhone = general_settings?.contact_whatsapp || village_info?.phone || '081234567890';
        let cleanPhone = String(rawPhone).trim().replace(/[^0-9]/g, '');
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '62' + cleanPhone.substring(1);
        } else if (!cleanPhone.startsWith('62')) {
            cleanPhone = '62' + cleanPhone;
        }

        const tglPengajuan = formatDateIndo(letter.created_at) || '-';
        const namaPemohon = letter.citizen_name || '-';
        const jenisSurat = letter.letter_type || 'Surat Administrasi Desa';
        const statusSaatIni = currentStatus?.shortBadge || currentStatus?.title || 'Menunggu Verifikasi';

        const message = `Halo Admin Pelayanan Balai Desa Karangwungu,

Saya ingin melakukan konfirmasi tindak lanjut terkait permohonan surat saya yang belum selesai diproses dengan rincian berikut:

• Kode Tracking : *${letter.tracking_code}*
• Jenis Surat   : ${jenisSurat}
• Nama Pemohon  : ${namaPemohon}
• Tgl Pengajuan : ${tglPengajuan}
• Status Saat Ini : ${statusSaatIni}

Mohon bantuannya untuk memeriksa kembali progres pemrosesan berkas surat saya ini nggih. Terima kasih banyak atas bantuan dan pelayanannya. 🙏`;

        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
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

                {/* 2. SEARCH BOX (Tema Khas Desa: Merah - Hitam - Kuning Emas & Siluet Batik) */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-[#080102] border border-amber-400/40 dark:border-amber-400/40 shadow-2xl transition-all">
                    {/* Siluet Motif Batik Parang Kencana Background Layer */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.05] sm:opacity-[0.06] transition-opacity duration-500 bg-repeat"
                        style={{
                            backgroundImage: `url("${BATIK_PARANG_PATTERN}")`,
                            backgroundSize: '80px 80px',
                        }}
                    />

                    {/* Ambient Glow Merah Segar & Emas */}
                    <div className="absolute -top-12 -right-12 w-52 h-52 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-red-700/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 relative z-10 text-white">
                        {/* Header Pencarian: Konteks & Judul */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 text-amber-300 border border-amber-400/50 shadow-inner backdrop-blur-xs">
                                        <Search className="h-3 w-3 text-amber-300" />
                                        <span>Pencarian Cepat Berkas</span>
                                        <span className="text-amber-200/60 font-normal hidden sm:inline">&bull; Layanan Terintegrasi</span>
                                    </span>
                                </div>
                                <h3 className="text-normal sm:text-xl font-black text-white drop-shadow-sm">
                                    Cek Status & Lacak Permohonan Surat Mandiri
                                </h3>
                                <p className="text-xs sm:text-sm text-amber-100/90 font-medium leading-relaxed">
                                    Masukkan kode tracking resmi dari tanda terima permohonan untuk memantau proses verifikasi dokumen secara realtime.
                                </p>
                            </div>

                            {searchedCode && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCode('');
                                        router.get('/layanan/lacak');
                                    }}
                                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 bg-black/60 hover:bg-black/80 hover:text-white border border-amber-400/50 backdrop-blur-xs transition-all cursor-pointer shadow-sm"
                                >
                                    <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
                                    <span>Reset Pencarian</span>
                                </button>
                            )}
                        </div>

                        {/* Search Bar Input Terpadu Khas Karangwungu (Hitam Frosted + Aksen Emas) */}
                        <form onSubmit={handleSearch} className="space-y-3">
                            <div className="p-2 sm:p-2.5 rounded-xl bg-black/60 border-2 border-amber-400/50 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/25 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center transition-all">
                                <div className="flex items-center gap-2.5 sm:gap-3 flex-1 px-2 sm:px-2.5 py-1">
                                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-md font-bold">
                                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-950 stroke-[2.5]" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Ketik Kode Tracking (Contoh: KW-20260905-HLG1)"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="w-full bg-transparent text-xs sm:text-base font-mono font-bold text-white placeholder-amber-200/50 focus:outline-none uppercase tracking-normal sm:tracking-wider truncate"
                                        required
                                    />
                                    {code && (
                                        <button
                                            type="button"
                                            onClick={() => setCode('')}
                                            className="p-1.5 rounded-md text-amber-300/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                            title="Hapus ketikan"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 shadow-lg shadow-amber-950/40 active:scale-[0.98] transition-all cursor-pointer shrink-0"
                                >
                                    <span>Lacak Permohonan</span>
                                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                                </button>
                            </div>

                            {/* Info Bawah: Contoh Kode & Panduan */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs">
                                <div className="flex flex-wrap items-center gap-2 text-amber-100/90">
                                    <span className="font-semibold text-[11px] text-amber-300 flex items-center gap-1">
                                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                        <span>Coba Kode Contoh:</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const sample = 'KW-20260905-HLG1';
                                            setCode(sample);
                                            router.get('/layanan/lacak', { code: sample });
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/60 hover:bg-amber-400/20 text-amber-300 hover:text-amber-200 border border-amber-400/40 font-mono text-xs font-bold transition-all cursor-pointer shadow-xs"
                                        title="Klik untuk langsung melacak kode contoh"
                                    >
                                        <span>KW-20260905-HLG1</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-1.5 text-[11px] text-amber-200/80 font-medium">
                                    <HelpCircle className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                    <span>Kode tracking diberikan otomatis saat Anda selesai mengisi formulir surat.</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* 3. SEARCH RESULT NOT FOUND */}
                {searchedCode && !letter && (
                    <div className="p-8 sm:p-10 rounded-lg bg-white dark:bg-zinc-900/90 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-4 shadow-xs">
                        <div className="h-14 w-14 rounded-lg bg-red-600/10 dark:bg-amber-400/10 border border-red-600/20 dark:border-amber-400/30 text-red-600 dark:text-amber-400 flex items-center justify-center mx-auto">
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

                {/* 4. MAIN LETTER TRACKING DETAILS (SENADA TEMA KHAS DESA) */}
                {letter && currentStatus && (
                    <div className="space-y-6">
                        {/* A. STATUS BANNER UTAMA (Gradien Merah Khas Desa + Batik Parang + Aksen Emas) */}
                        <div className="relative group overflow-hidden rounded-xl bg-gradient-to-b from-red-700 via-red-800 to-zinc-950 dark:from-red-800 dark:via-red-950 dark:to-[#080102] text-white p-6 sm:p-7 border border-amber-400/40 dark:border-amber-400/40 shadow-xl space-y-6">
                            {/* Siluet Batik Parang Background Layer */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.05] transition-opacity duration-500 bg-repeat"
                                style={{
                                    backgroundImage: `url("${BATIK_PARANG_PATTERN}")`,
                                    backgroundSize: '80px 80px',
                                }}
                            />
                            {/* Ambient Glows Merah & Emas */}
                            <div className="absolute -top-12 -right-12 w-44 h-44 bg-red-600/25 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-400/10 via-transparent to-transparent pointer-events-none" />

                            {/* Header Status + Tiket Lacak */}
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                                <div className="space-y-2 max-w-2xl">
                                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold block">
                                        Status Permohonan Surat
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-wide">
                                        {currentStatus.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                                        {currentStatus.leadText}
                                    </p>
                                    <p className="text-xs text-zinc-300/85 leading-relaxed pt-0.5">
                                        {currentStatus.description}
                                    </p>

                                    {/* Catatan Khusus Petugas Pelayanan Desa */}
                                    {letter.admin_notes && (
                                        <div className="pt-2">
                                            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-amber-400/35 backdrop-blur-xs text-xs sm:text-sm">
                                                <UserCheck className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                                <div className="space-y-0.5 min-w-0">
                                                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block">
                                                        Catatan Petugas Pelayanan Desa:
                                                    </span>
                                                    <p className="text-zinc-100 font-medium leading-relaxed italic">
                                                        &ldquo;{letter.admin_notes}&rdquo;
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Tiket Kode Lacak Resmi Box */}
                                <div className="shrink-0 bg-black/40 border border-amber-400/40 backdrop-blur-sm p-4 rounded-lg shadow-inner space-y-1.5 lg:text-right lg:min-w-[230px]">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/90 font-bold block">
                                        Kode Lacak Resmi
                                    </span>
                                    <div className="flex items-center lg:justify-end gap-2">
                                        <span className="font-mono text-lg sm:text-xl font-black text-amber-300 tracking-wider">
                                            {letter.tracking_code}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(letter.tracking_code)}
                                            className="p-1 rounded-md text-amber-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                                            title="Salin kode tracking"
                                        >
                                            {copiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <span className="text-[10px] text-zinc-400 block font-sans">
                                        Diajukan: {formatDateIndo(letter.created_at)}
                                    </span>
                                </div>
                            </div>

                            {/* Alur Langkah Pelayanan (Progress Stepper Terpadu) */}
                            {letter.status !== 'ditolak' && (
                                <div className="relative z-10 pt-5 border-t border-amber-400/20 space-y-2.5">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80 font-bold block">
                                        Progres Tahapan Berkas Pelayanan
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        {/* Step 1: Pengajuan Masuk */}
                                        <div className="p-3 rounded-lg bg-black/35 border border-emerald-400/40 space-y-1 shadow-xs">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                <span>1. Masuk Sistem</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-300 leading-tight">Pengajuan berhasil dikirim</p>
                                        </div>

                                        {/* Step 2: Verifikasi Petugas */}
                                        <div className={`p-3 rounded-lg bg-black/35 border space-y-1 shadow-xs ${
                                            ['bisa_diambil', 'selesai'].includes(letter.status)
                                                ? 'border-emerald-400/40 text-emerald-300'
                                                : 'border-amber-400/60 ring-1 ring-amber-400/30 text-amber-200'
                                        }`}>
                                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                                {['bisa_diambil', 'selesai'].includes(letter.status) ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                ) : (
                                                    <Clock className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                                                )}
                                                <span>2. Verifikasi Data</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-300 leading-tight">
                                                {['bisa_diambil', 'selesai'].includes(letter.status) ? 'Telah diverifikasi' : 'Sedang diperiksa petugas'}
                                            </p>
                                        </div>

                                        {/* Step 3: Siap Diambil di Balai Desa */}
                                        <div className={`p-3 rounded-lg bg-black/35 border space-y-1 shadow-xs ${
                                            letter.status === 'selesai'
                                                ? 'border-emerald-400/40 text-emerald-300'
                                                : letter.status === 'bisa_diambil'
                                                ? 'border-amber-400 ring-2 ring-amber-400/40 text-amber-200 bg-amber-400/10'
                                                : 'border-white/10 text-zinc-400 opacity-60'
                                        }`}>
                                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                                {letter.status === 'selesai' ? (
                                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                ) : letter.status === 'bisa_diambil' ? (
                                                    <PackageCheck className="h-3.5 w-3.5 text-amber-300 animate-bounce" />
                                                ) : (
                                                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                                )}
                                                <span>3. Siap Diambil</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-300 leading-tight">
                                                {letter.status === 'bisa_diambil' ? 'Bisa diambil di balai desa' : 'Cetak & tanda tangan kades'}
                                            </p>
                                        </div>

                                        {/* Step 4: Selesai Diserahkan */}
                                        <div className={`p-3 rounded-lg bg-black/35 border space-y-1 shadow-xs ${
                                            letter.status === 'selesai'
                                                ? 'border-emerald-400 ring-2 ring-emerald-400/40 text-emerald-200 bg-emerald-400/10'
                                                : 'border-white/10 text-zinc-400 opacity-60'
                                        }`}>
                                            <div className="flex items-center gap-1.5 text-xs font-bold">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                <span>4. Selesai</span>
                                            </div>
                                            <p className="text-[11px] text-zinc-300 leading-tight">
                                                {letter.status === 'selesai' ? 'Berkas diserahkan ke warga' : 'Penyerahan fisik di desa'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* PANDUAN PENGAMBILAN BERKAS JIKA STATUS BISA_DIAMBIL */}
                            {letter.status === 'bisa_diambil' && (
                                <div className="relative z-10 p-4 sm:p-5 rounded-lg bg-black/35 border border-amber-400/35 backdrop-blur-sm space-y-3">
                                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300">
                                        <Building2 className="h-4 w-4 text-amber-400" />
                                        <span>Panduan Pengambilan Lembar Fisik Surat di Balai Desa:</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                        <div className="space-y-1">
                                            <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                                                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                                                <span>Lokasi Pengambilan</span>
                                            </span>
                                            <p className="text-zinc-300 text-[11px] leading-snug">
                                                Meja Pelayanan Kantor Balai Desa Karangwungu, Kec. Karanggeneng
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5 text-amber-400" />
                                                <span>Jam Pelayanan</span>
                                            </span>
                                            <p className="text-zinc-300 text-[11px] leading-snug">
                                                Senin – Jumat, Pukul 08.00 – 15.00 WIB (Hari Kerja)
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="font-semibold text-amber-200 flex items-center gap-1.5">
                                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                                                <span>Syarat Pengambilan</span>
                                            </span>
                                            <p className="text-zinc-300 text-[11px] leading-snug">
                                                Membawa KTP Asli pemohon untuk verifikasi penerima berkas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* B. ISIAN-ISIAN DATA PERMOHONAN (2 KOLOM ARSIP RESMI DESA) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            {/* KOLOM KIRI: Data Identitas Pemohon (7 Cols) */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="rounded-lg bg-white dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 shadow-sm space-y-5">
                                    {/* Section Header (Badge e-KTP Dihapus Sesuai Permintaan) */}
                                    <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs flex items-center justify-center shrink-0">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-bold text-red-700 dark:text-amber-400 tracking-wider uppercase block">
                                                Bagian 1 &middot; Data Warga
                                            </span>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
                                                Data Identitas Pemohon
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Profil Pemohon Highlight (Unboxed, Tanpa Kerangka Bersarang) */}
                                    <div className="flex items-start sm:items-center gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-amber-300 border-2 border-amber-400/50 font-serif font-black text-lg flex items-center justify-center shrink-0 shadow-xs">
                                            {(letter.citizen_name || 'W').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                                    Nama Pemohon (Disamarkan)
                                                </span>
                                                <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                                                    UU PDP
                                                </span>
                                            </div>
                                            <h4 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white uppercase font-mono tracking-wide break-words leading-tight">
                                                {maskedName(letter.citizen_name)}
                                            </h4>
                                            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                                <span className="font-medium">Nomor Induk Kependudukan (NIK):</span>
                                                <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-wider bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200/80 dark:border-zinc-700/60">
                                                    {maskedNik(letter.citizen_nik)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Biodata List (Editorial Key-Value Rows, Bersih & Bebas Kotak Bertumpuk) */}
                                    <dl className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs sm:text-sm">
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span>Tempat, Tanggal Lahir</span>
                                            </dt>
                                            <dd className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{birthInfo()}</dd>
                                        </div>
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <User className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span>Jenis Kelamin</span>
                                            </dt>
                                            <dd className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{letter.gender || '-'}</dd>
                                        </div>
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span>Agama</span>
                                            </dt>
                                            <dd className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{letter.religion || 'Islam'}</dd>
                                        </div>
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span>Pekerjaan</span>
                                            </dt>
                                            <dd className="font-bold text-zinc-900 dark:text-zinc-100 text-right">{letter.occupation || '-'}</dd>
                                        </div>
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                <span>Kontak WhatsApp Terdaftar</span>
                                            </dt>
                                            <dd className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-right">{maskedPhone(letter.citizen_phone)}</dd>
                                        </div>
                                        <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 flex items-center gap-2">
                                                <Home className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                                <span>Alamat Domisili Resmi</span>
                                            </dt>
                                            <dd className="font-semibold text-zinc-800 dark:text-zinc-200 text-left sm:text-right leading-relaxed max-w-md">
                                                {letter.citizen_address || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan'}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* KOLOM KANAN: Rincian Surat & Keperluan (5 Cols) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="rounded-lg bg-white dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 shadow-sm space-y-5">
                                    {/* Section Header */}
                                    <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs flex items-center justify-center shrink-0">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] font-bold text-red-700 dark:text-amber-400 tracking-wider uppercase block">
                                                Bagian 2 &middot; Dokumen
                                            </span>
                                            <h3 className="text-base font-black text-zinc-900 dark:text-white leading-tight">
                                                Rincian Permohonan Surat
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Jenis Dokumen Highlight (Unboxed) */}
                                    <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800 space-y-1">
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-700 dark:text-amber-400 block">
                                            Dokumen Yang Dimohon
                                        </span>
                                        <h4 className="font-black text-base sm:text-lg text-zinc-900 dark:text-white leading-snug">
                                            {letter.letter_type}
                                        </h4>
                                    </div>

                                    {/* Rincian Dokumen List (Editorial Key-Value Rows) */}
                                    <dl className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs sm:text-sm">
                                        <div className="py-3 flex items-center justify-between gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span>Waktu Registrasi</span>
                                            </dt>
                                            <dd className="font-bold text-zinc-900 dark:text-zinc-100 text-right">
                                                {formatIndoDateTime(letter.created_at) || formatDateIndo(letter.created_at)}
                                            </dd>
                                        </div>
                                        <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 flex items-center gap-2">
                                                <Info className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                                <span>Keperluan Pengajuan</span>
                                            </dt>
                                            <dd className="font-semibold text-zinc-800 dark:text-zinc-200 italic text-left sm:text-right leading-relaxed">
                                                &ldquo;{letter.purpose || '-'}&rdquo;
                                            </dd>
                                        </div>
                                        <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                                            <dt className="text-zinc-500 dark:text-zinc-400 font-medium shrink-0 flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                                <span>Pengambilan Fisik</span>
                                            </dt>
                                            <dd className="text-xs text-zinc-600 dark:text-zinc-400 text-left sm:text-right leading-relaxed">
                                                Surat resmi berstempel basah & tanda tangan Kepala Desa diambil di Kantor Balai Desa Karangwungu.
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* Card Konfirmasi & Tindak Lanjut Layanan via WhatsApp (Aksi Terpadu) */}
                                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white dark:from-emerald-950/30 dark:via-zinc-900/90 dark:to-zinc-950 border-2 border-emerald-500/30 dark:border-emerald-500/30 p-5 sm:p-6 shadow-sm space-y-4">
                                    <div className="flex items-start gap-3.5">
                                        <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                            <MessageCircle className="h-5 w-5 fill-white/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                                                    Pusat Bantuan Warga
                                                </span>
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">WhatsApp Aktif</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                                                Konfirmasi Tindak Lanjut ke Petugas Desa
                                            </h4>
                                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                Belum ada pembaruan status atau butuh verifikasi mendesak? Hubungi langsung petugas pelayanan Balai Desa dengan pesan konfirmasi otomatis.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                                        <a
                                            href={getWhatsappFollowUpUrl()}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-md shadow-emerald-900/20 transition-all cursor-pointer group"
                                        >
                                            <MessageCircle className="h-4 w-4 text-white shrink-0 fill-white/20 group-hover:scale-110 transition-transform" />
                                            <span>Konfirmasi via WhatsApp</span>
                                        </a>
                                        <Link
                                            href="/layanan/ajukan"
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 active:scale-[0.99] transition-all"
                                        >
                                            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
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
