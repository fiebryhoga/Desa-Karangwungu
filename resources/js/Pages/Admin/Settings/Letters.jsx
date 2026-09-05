import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    FileText,
    Search,
    Clock,
    CheckCircle2,
    XCircle,
    PackageCheck,
    Loader2,
    ExternalLink,
    Trash2,
    Eye,
    Copy,
    Check,
    Ban,
    RotateCcw,
    AlertTriangle,
} from 'lucide-react';

const STATUS_MAP = {
    menunggu: {
        label: 'Menunggu',
        bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
        badgeBg: 'bg-amber-500',
        icon: Clock,
    },
    bisa_diambil: {
        label: 'Bisa Diambil',
        bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
        badgeBg: 'bg-blue-500',
        icon: PackageCheck,
    },
    selesai: {
        label: 'Selesai',
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        badgeBg: 'bg-emerald-500',
        icon: CheckCircle2,
    },
    ditolak: {
        label: 'Ditolak',
        bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
        badgeBg: 'bg-rose-500',
        icon: XCircle,
    },
};

export default function LettersIndex({
    letters = { data: [], links: [], total: 0 },
    filters = { search: '', status: 'menunggu', letter_type: 'all' },
    counts = { menunggu: 0, bisa_diambil: 0, selesai: 0, ditolak: 0 },
    availableTypes = [],
}) {
    const { flash, admin_path } = usePage().props;
    const adminPath = admin_path || 'portal-karangwungu';

    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(
        filters.status === 'all' || !filters.status ? 'menunggu' : filters.status
    );
    const [typeFilter, setTypeFilter] = useState(filters.letter_type || 'all');

    // Selection state for checkboxes & bulk actions
    const [selectedCodes, setSelectedCodes] = useState([]);

    // Modals
    const [rejectTarget, setRejectTarget] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isRestoring, setIsRestoring] = useState(false);

    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
    const [showBulkRejectModal, setShowBulkRejectModal] = useState(false);
    const [bulkRejectReason, setBulkRejectReason] = useState('');
    const [isBulkProcessing, setIsBulkProcessing] = useState(false);

    // Copy state
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Filter submit
    const applyFilters = (newStatus, newType, newSearch) => {
        setSelectedCodes([]);
        router.get(
            `/${adminPath}/settings/letters`,
            {
                status: newStatus !== undefined ? newStatus : statusFilter,
                letter_type: newType !== undefined ? newType : typeFilter,
                search: newSearch !== undefined ? newSearch : search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters(statusFilter, typeFilter, search);
    };

    const handleResetFilters = () => {
        setSearch('');
        setStatusFilter('menunggu');
        setTypeFilter('all');
        setSelectedCodes([]);
        router.get(`/${adminPath}/settings/letters`, { status: 'menunggu' }, { preserveState: true });
    };

    // Checkbox selection logic
    const allCodesOnPage = (letters.data || []).map((item) => item.tracking_code);
    const isAllSelected =
        allCodesOnPage.length > 0 && allCodesOnPage.every((c) => selectedCodes.includes(c));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedCodes([]);
        } else {
            setSelectedCodes(allCodesOnPage);
        }
    };

    const toggleSelectOne = (code) => {
        setSelectedCodes((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );
    };

    // Single Reject
    const handleOpenReject = (item) => {
        setRejectTarget(item);
        setRejectReason('Berkas persyaratan belum memenuhi atau data tidak valid. Silakan hubungi kantor balai desa.');
    };

    const confirmReject = (e) => {
        e.preventDefault();
        if (!rejectTarget) return;
        setIsRejecting(true);

        router.post(
            `/${adminPath}/settings/letters/${rejectTarget.tracking_code}/reject`,
            { admin_notes: rejectReason },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsRejecting(false);
                    setRejectTarget(null);
                    setSelectedCodes((prev) => prev.filter((c) => c !== rejectTarget.tracking_code));
                },
                onError: () => {
                    setIsRejecting(false);
                },
            }
        );
    };

    // Single Restore
    const handleRestore = (item) => {
        setIsRestoring(true);
        router.post(
            `/${adminPath}/settings/letters/${item.tracking_code}/restore`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsRestoring(false);
                    setSelectedCodes((prev) => prev.filter((c) => c !== item.tracking_code));
                },
                onError: () => {
                    setIsRestoring(false);
                },
            }
        );
    };

    // Single Permanent Delete
    const confirmDelete = (e) => {
        e.preventDefault();
        if (!deleteTarget) return;

        setIsDeleting(true);
        router.delete(`/${adminPath}/settings/letters/${deleteTarget.tracking_code || deleteTarget.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
                setDeleteTarget(null);
                setSelectedCodes((prev) => prev.filter((c) => c !== deleteTarget.tracking_code));
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    // Bulk Restore
    const handleBulkRestore = () => {
        if (selectedCodes.length === 0) return;
        setIsBulkProcessing(true);
        router.post(
            `/${adminPath}/settings/letters/bulk-action`,
            {
                codes: selectedCodes,
                action: 'restore',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsBulkProcessing(false);
                    setSelectedCodes([]);
                },
                onError: () => {
                    setIsBulkProcessing(false);
                },
            }
        );
    };

    // Bulk Permanent Delete
    const handleBulkDeleteConfirm = () => {
        if (selectedCodes.length === 0) return;
        setIsBulkProcessing(true);
        router.post(
            `/${adminPath}/settings/letters/bulk-action`,
            {
                codes: selectedCodes,
                action: 'delete',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsBulkProcessing(false);
                    setShowBulkDeleteModal(false);
                    setSelectedCodes([]);
                },
                onError: () => {
                    setIsBulkProcessing(false);
                    setShowBulkDeleteModal(false);
                },
            }
        );
    };

    // Bulk Reject
    const handleBulkRejectConfirm = () => {
        if (selectedCodes.length === 0) return;
        setIsBulkProcessing(true);
        router.post(
            `/${adminPath}/settings/letters/bulk-action`,
            {
                codes: selectedCodes,
                action: 'reject',
                reason: bulkRejectReason || 'Permohonan ditolak secara massal oleh admin desa.',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsBulkProcessing(false);
                    setShowBulkRejectModal(false);
                    setSelectedCodes([]);
                },
                onError: () => {
                    setIsBulkProcessing(false);
                    setShowBulkRejectModal(false);
                },
            }
        );
    };

    return (
        <AdminLayout title="Permohonan Surat Warga">
            <Head title="Permohonan & Layanan Surat Warga - Panel Admin Desa Karangwungu" />

            <div className="space-y-6">
                {/* 1. Header Page */}
                <AdminPageHeader
                    title="Permohonan & Layanan Surat Warga"
                    description="Kelola pengajuan surat mandiri oleh warga Desa Karangwungu. Buka menu pertinjau untuk memverifikasi dokumen resmi, mengoreksi data pemohon, memperbarui nomor registrasi surat, dan mengubah status."
                    breadcrumbs={[
                        { label: 'Admin', href: `/${adminPath}/dashboard` },
                        { label: 'Publikasi & Layanan Warga' },
                        { label: 'Permohonan Surat' },
                    ]}
                    actions={
                        <div className="flex flex-wrap items-center gap-2">
                            <a
                                href="/layanan/lacak"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 shadow-2xs transition-all"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                                <span>Portal Lacak Warga</span>
                            </a>
                            <a
                                href="/layanan/surat"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-sm transition-all"
                            >
                                <FileText className="h-3.5 w-3.5" />
                                <span>Form Pengajuan Publik</span>
                            </a>
                        </div>
                    }
                />

                {/* 2. Metric Cards: 4 Status Utama (Tanpa 'Semua Status') */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* 1. Menunggu */}
                    <button
                        type="button"
                        onClick={() => {
                            setStatusFilter('menunggu');
                            applyFilters('menunggu', typeFilter, search);
                        }}
                        className={`text-left p-4 rounded-lg border transition-all cursor-pointer shadow-2xs space-y-1 ${
                            statusFilter === 'menunggu'
                                ? 'bg-amber-500/10 border-amber-500/50 dark:border-amber-400/60 ring-2 ring-amber-500/20'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-400/50'
                        }`}
                    >
                        <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                            <span className="text-xs font-bold uppercase tracking-wider">Menunggu</span>
                            <Clock className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-black text-amber-700 dark:text-amber-400 flex items-center gap-2">
                            {counts.menunggu}
                            {counts.menunggu > 0 && (
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-zinc-400">Antrean masuk / verifikasi</p>
                    </button>

                    {/* 2. Bisa Diambil */}
                    <button
                        type="button"
                        onClick={() => {
                            setStatusFilter('bisa_diambil');
                            applyFilters('bisa_diambil', typeFilter, search);
                        }}
                        className={`text-left p-4 rounded-lg border transition-all cursor-pointer shadow-2xs space-y-1 ${
                            statusFilter === 'bisa_diambil'
                                ? 'bg-blue-500/10 border-blue-500/50 dark:border-blue-400/60 ring-2 ring-blue-500/20'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-400/50'
                        }`}
                    >
                        <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
                            <span className="text-xs font-bold uppercase tracking-wider">Bisa Diambil</span>
                            <PackageCheck className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-black text-blue-700 dark:text-blue-400">
                            {counts.bisa_diambil}
                        </div>
                        <p className="text-[11px] text-zinc-400">Siap diambil di balai desa</p>
                    </button>

                    {/* 3. Selesai */}
                    <button
                        type="button"
                        onClick={() => {
                            setStatusFilter('selesai');
                            applyFilters('selesai', typeFilter, search);
                        }}
                        className={`text-left p-4 rounded-lg border transition-all cursor-pointer shadow-2xs space-y-1 ${
                            statusFilter === 'selesai'
                                ? 'bg-emerald-500/10 border-emerald-500/50 dark:border-emerald-400/60 ring-2 ring-emerald-500/20'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-400/50'
                        }`}
                    >
                        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                            <span className="text-xs font-bold uppercase tracking-wider">Selesai</span>
                            <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                            {counts.selesai}
                        </div>
                        <p className="text-[11px] text-zinc-400">Dokumen telah diserahkan</p>
                    </button>

                    {/* 4. Ditolak */}
                    <button
                        type="button"
                        onClick={() => {
                            setStatusFilter('ditolak');
                            applyFilters('ditolak', typeFilter, search);
                        }}
                        className={`text-left p-4 rounded-lg border transition-all cursor-pointer shadow-2xs space-y-1 ${
                            statusFilter === 'ditolak'
                                ? 'bg-rose-500/10 border-rose-500/50 dark:border-rose-400/60 ring-2 ring-rose-500/20'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-rose-400/50'
                        }`}
                    >
                        <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                            <span className="text-xs font-bold uppercase tracking-wider">Ditolak</span>
                            <XCircle className="h-4 w-4" />
                        </div>
                        <div className="text-2xl font-black text-rose-700 dark:text-rose-400">
                            {counts.ditolak}
                        </div>
                        <p className="text-[11px] text-zinc-400">Berkas ditolak (Hapus otomatis 1 mgg)</p>
                    </button>
                </div>

                {/* 3. Filter & Search Toolbar */}
                <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
                    <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari kode tracking, nama pemohon, NIK, no. register surat..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-white placeholder-zinc-400/60 dark:placeholder-zinc-500/50 focus:outline-hidden focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all"
                            />
                        </div>

                        {/* Status Filter Dropdown (Pilihan 'Semua Status' DITIADAKAN) */}
                        <div className="w-full md:w-48">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    applyFilters(e.target.value, typeFilter, search);
                                }}
                                className="w-full px-3 py-2.5 rounded-lg text-xs font-bold bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all cursor-pointer"
                            >
                                <option value="menunggu">Menunggu</option>
                                <option value="bisa_diambil">Bisa Diambil</option>
                                <option value="selesai">Selesai</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>

                        {/* Letter Type Filter */}
                        {availableTypes.length > 0 && (
                            <div className="w-full md:w-56">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => {
                                        setTypeFilter(e.target.value);
                                        applyFilters(statusFilter, e.target.value, search);
                                    }}
                                    className="w-full px-3 py-2.5 rounded-lg text-xs font-semibold bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all cursor-pointer"
                                >
                                    <option value="all">Semua Jenis Surat</option>
                                    {availableTypes.map((type, idx) => (
                                        <option key={idx} value={type}>
                                             {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="submit"
                                className="px-4 py-2.5 rounded-lg text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 transition-all shadow-xs cursor-pointer"
                            >
                                Cari
                            </button>
                            {(search || statusFilter !== 'menunggu' || typeFilter !== 'all') && (
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="px-3 py-2.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* 4. Notice Banner Saat Membuka Tab Status DITOLAK */}
                {statusFilter === 'ditolak' && (
                    <div className="p-4 rounded-lg bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3 text-xs text-rose-800 dark:text-rose-300 shadow-2xs">
                        <Clock className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                        <div className="space-y-1 leading-relaxed">
                            <span className="font-bold block">
                                Ketentuan Penghapusan Otomatis (1 Minggu / 7 Hari)
                            </span>
                            <p className="text-[11px] text-rose-700/90 dark:text-rose-300/90">
                                Berkas pada status <strong>Ditolak</strong> akan tersimpan selama <strong>7 hari</strong> sebelum dihapus permanen secara otomatis oleh sistem. Anda dapat memulihkan berkas kembali ke antrean <strong>Menunggu</strong> atau menghapusnya secara manual kapan saja (baik satu per satu maupun massal dengan memilih checkbox).
                            </p>
                        </div>
                    </div>
                )}

                {/* 5. Floating / Sticky Bulk Action Bar jika ada data yang dicentang */}
                {selectedCodes.length > 0 && (
                    <div className="p-3.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-800 border border-zinc-700 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
                        <div className="flex items-center gap-2 text-xs font-bold">
                            <span className="inline-flex items-center justify-center h-5 px-2.5 rounded-full bg-red-600 text-white text-[11px]">
                                {selectedCodes.length}
                            </span>
                            <span>Permohonan terpilih</span>
                        </div>

                        <div className="flex items-center gap-2">
                            {statusFilter === 'ditolak' ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleBulkRestore}
                                        disabled={isBulkProcessing}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
                                    >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                        <span>Pulihkan Terpilih ({selectedCodes.length})</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowBulkDeleteModal(true)}
                                        disabled={isBulkProcessing}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Hapus Permanen Terpilih ({selectedCodes.length})</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowBulkRejectModal(true)}
                                    disabled={isBulkProcessing}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors cursor-pointer"
                                >
                                    <Ban className="h-3.5 w-3.5" />
                                    <span>Tolak Terpilih ({selectedCodes.length})</span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => setSelectedCodes([])}
                                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                                Batal Pilihan
                            </button>
                        </div>
                    </div>
                )}

                {/* 6. Table of Letter Requests */}
                <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs overflow-hidden">
                    <table className="w-full text-left text-xs table-auto">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-3 py-3 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={toggleSelectAll}
                                        className="rounded text-red-600 focus:ring-red-500 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer h-4 w-4"
                                        title="Pilih semua baris pada halaman ini"
                                    />
                                </th>
                                <th className="px-3.5 py-3">Kode Tracking</th>
                                <th className="px-3.5 py-3">Pemohon & NIK</th>
                                <th className="px-3.5 py-3">Jenis Surat</th>
                                <th className="px-3.5 py-3">No. Register Surat</th>
                                <th className="px-3.5 py-3">Status</th>
                                <th className="px-3.5 py-3">Tgl Pengajuan</th>
                                <th className="px-3.5 py-3 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/70">
                            {letters.data && letters.data.length > 0 ? (
                                letters.data.map((item) => {
                                    const statusCfg = STATUS_MAP[item.status] || STATUS_MAP.menunggu;
                                    const StatusIcon = statusCfg.icon;
                                    const isSelected = selectedCodes.includes(item.tracking_code);

                                    return (
                                        <tr
                                            key={item.id}
                                            className={`transition-colors ${
                                                isSelected
                                                    ? 'bg-red-50/50 dark:bg-red-950/20'
                                                    : 'hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40'
                                            }`}
                                        >
                                            {/* Checkbox */}
                                            <td className="px-3 py-3 text-center align-middle">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelectOne(item.tracking_code)}
                                                    className="rounded text-red-600 focus:ring-red-500 dark:bg-zinc-800 dark:border-zinc-700 cursor-pointer h-4 w-4"
                                                />
                                            </td>

                                            {/* Kode Tracking */}
                                            <td className="px-3.5 py-3 align-middle">
                                                <div className="flex items-center gap-1.5 font-mono font-bold text-zinc-900 dark:text-white">
                                                    <span>{item.tracking_code}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopy(item.tracking_code)}
                                                        title="Salin kode tracking"
                                                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                                    >
                                                        {copiedCode === item.tracking_code ? (
                                                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                                                        ) : (
                                                            <Copy className="h-3.5 w-3.5" />
                                                        )}
                                                    </button>
                                                </div>
                                                {item.citizen_phone && (
                                                    <span className="text-[11px] text-zinc-400 block font-sans">
                                                        WA: {item.citizen_phone}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Pemohon & NIK */}
                                            <td className="px-3.5 py-3 align-middle">
                                                <div className="font-bold text-zinc-900 dark:text-white line-clamp-1">
                                                    {item.citizen_name}
                                                </div>
                                                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                                                    NIK: {item.citizen_nik}
                                                </div>
                                            </td>

                                            {/* Jenis Surat */}
                                            <td className="px-3.5 py-3 align-middle">
                                                <span className="font-semibold text-zinc-800 dark:text-zinc-200 block line-clamp-1">
                                                    {item.letter_type}
                                                </span>
                                                <span className="text-[11px] text-zinc-400 line-clamp-1 italic max-w-[180px]">
                                                    "{item.purpose}"
                                                </span>
                                            </td>

                                            {/* No. Register Surat */}
                                            <td className="px-3.5 py-3 align-middle">
                                                {item.letter_number ? (
                                                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 block truncate max-w-[170px]">
                                                        {item.letter_number}
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] text-zinc-400 italic">
                                                        Belum diberi nomor
                                                    </span>
                                                )}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-3.5 py-3 align-middle">
                                                <div className="space-y-1">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border whitespace-nowrap ${statusCfg.bg}`}
                                                    >
                                                        <StatusIcon className="h-3 w-3 shrink-0" />
                                                        <span>{statusCfg.label}</span>
                                                    </span>
                                                    {item.status === 'ditolak' && item.days_left !== null && (
                                                        <span className="text-[10px] text-rose-500 dark:text-rose-400 block font-medium whitespace-nowrap">
                                                            ⏳ Sisa {item.days_left} hari lagi
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Tanggal Pengajuan */}
                                            <td className="px-3.5 py-3 align-middle">
                                                <span className="text-zinc-700 dark:text-zinc-300 block whitespace-nowrap">
                                                    {item.created_at?.split(',')[0] || item.created_at}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 block whitespace-nowrap">
                                                    {item.created_at_human}
                                                </span>
                                            </td>

                                            {/* Aksi: Pertinjau & Tolak (atau Pulihkan & Hapus Permanen jika status ditolak) */}
                                            <td className="px-3.5 py-3 align-middle text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/${adminPath}/settings/letters/${item.tracking_code || item.id}/preview`}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-2xs transition-all whitespace-nowrap"
                                                        title="Buka pratinjau & proses permohonan surat"
                                                    >
                                                        <Eye className="h-3.5 w-3.5" />
                                                        <span>Pertinjau</span>
                                                    </Link>

                                                    {item.status === 'ditolak' ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRestore(item)}
                                                                disabled={isRestoring}
                                                                title="Pulihkan permohonan ke status Menunggu"
                                                                className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                                                            >
                                                                <RotateCcw className="h-3.5 w-3.5" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteTarget(item)}
                                                                title="Hapus permanen permohonan ini dari basis data"
                                                                className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleOpenReject(item)}
                                                            title="Tolak permohonan (pindahkan ke status Ditolak)"
                                                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                                                        >
                                                            <Ban className="h-3.5 w-3.5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-4 py-12 text-center">
                                        <div className="max-w-sm mx-auto space-y-2">
                                            <FileText className="h-10 w-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
                                            <div className="font-bold text-zinc-700 dark:text-zinc-300">
                                                Tidak ada permohonan surat
                                            </div>
                                            <p className="text-xs text-zinc-400">
                                                Belum ada data pengajuan surat pada kategori status ini.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {letters.links && letters.links.length > 3 && (
                        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                            <div>
                                Menampilkan total <span className="font-bold text-zinc-900 dark:text-white">{letters.total}</span> data
                            </div>
                            <div className="flex items-center gap-1">
                                {letters.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="px-2.5 py-1 rounded-lg text-zinc-400 dark:text-zinc-600"
                                            />
                                        );
                                    }
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => router.get(link.url, {}, { preserveState: true })}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                                                link.active
                                                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal: Tolak Permohonan Surat (Single) */}
            {rejectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Ban className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Tolak Permohonan Surat?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Permohonan atas nama <strong className="text-zinc-900 dark:text-white">{rejectTarget.citizen_name}</strong> (Kode: <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{rejectTarget.tracking_code}</span>) akan dialihkan ke status <strong>Ditolak</strong>.
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                💡 Berkas yang ditolak akan tersimpan selama 7 hari sebelum dihapus permanen otomatis oleh sistem, atau dapat dipulihkan sewaktu-waktu.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Alasan / Catatan Penolakan (Tampil pada portal lacak warga):
                            </label>
                            <textarea
                                rows={3}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500"
                                placeholder="Contoh: Berkas persyaratan belum lengkap atau data KTP tidak valid..."
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setRejectTarget(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={confirmReject}
                                disabled={isRejecting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isRejecting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <Ban className="h-3.5 w-3.5" />
                                        <span>Ya, Tolak Permohonan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Hapus Permanen Permohonan Surat (Single) */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Trash2 className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Hapus Permanen Permohonan Surat?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah Anda yakin ingin menghapus permanen permohonan surat dengan kode{' '}
                                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                                    {deleteTarget.tracking_code}
                                </span>{' '}
                                atas nama <span className="font-bold">{deleteTarget.citizen_name}</span>?
                            </p>
                            <p className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                                ⚠️ Tindakan ini akan menghapus data selamanya dari basis data dan <strong>tidak dapat dibatalkan</strong>.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menghapus...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Ya, Hapus Permanen</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Bulk Hapus Permanen */}
            {showBulkDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Trash2 className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Hapus Permanen {selectedCodes.length} Permohonan?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah Anda yakin ingin menghapus permanen <strong>{selectedCodes.length}</strong> permohonan surat yang dipilih?
                            </p>
                            <p className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                                ⚠️ Seluruh data terpilih akan dihapus selamanya dari sistem dan tidak dapat dipulihkan.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowBulkDeleteModal(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleBulkDeleteConfirm}
                                disabled={isBulkProcessing}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isBulkProcessing ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menghapus Massal...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Ya, Hapus Semua Terpilih</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Bulk Reject */}
            {showBulkRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Ban className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Tolak {selectedCodes.length} Permohonan Terpilih?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Semua (<strong>{selectedCodes.length}</strong>) permohonan yang dipilih akan dialihkan ke status <strong>Ditolak</strong>.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Alasan / Catatan Penolakan:
                            </label>
                            <textarea
                                rows={3}
                                value={bulkRejectReason}
                                onChange={(e) => setBulkRejectReason(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500"
                                placeholder="Contoh: Berkas persyaratan belum lengkap..."
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowBulkRejectModal(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleBulkRejectConfirm}
                                disabled={isBulkProcessing}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isBulkProcessing ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menolak Massal...</span>
                                    </>
                                ) : (
                                    <>
                                        <Ban className="h-3.5 w-3.5" />
                                        <span>Ya, Tolak Terpilih</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
