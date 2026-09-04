import React, { useState, useMemo } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Scale,
    Plus,
    Search,
    FileText,
    Download,
    Edit2,
    Trash2,
    Calendar,
    CheckCircle2,
    AlertCircle,
    X,
    FileCheck,
    Upload,
    ExternalLink,
    Filter,
    Shield,
    Clock,
    BookOpen,
    Eye,
} from 'lucide-react';

export default function LegalProductsIndex({
    products = [],
    stats = { total: 0, perdes: 0, sk: 0, active: 0 },
    availableTypes = [],
    availableYears = [],
    filters = { search: '', type: 'all', year: 'all', status: 'all' },
}) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Local filters state
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || 'all');
    const [selectedYear, setSelectedYear] = useState(filters.year || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    // Modal state for Add / Edit
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Form data state
    const [formData, setFormData] = useState({
        title: '',
        document_type: 'Keputusan Kepala Desa (SK)',
        document_number: '',
        year: new Date().getFullYear(),
        effective_date: '',
        status: 'active',
        description: '',
        is_active: true,
        file: null,
    });

    // Delete confirmation modal
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Filter logic on client-side
    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const matchSearch =
                !searchTerm.trim() ||
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.document_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchType =
                selectedType === 'all' || item.document_type === selectedType;

            const matchYear =
                selectedYear === 'all' || String(item.year) === String(selectedYear);

            const matchStatus =
                selectedStatus === 'all' || item.status === selectedStatus;

            return matchSearch && matchType && matchYear && matchStatus;
        });
    }, [products, searchTerm, selectedType, selectedYear, selectedStatus]);

    // Open Modal for Create
    const handleOpenCreate = () => {
        setEditingProduct(null);
        setFormData({
            title: '',
            document_type: availableTypes[0] || 'Keputusan Kepala Desa (SK)',
            document_number: '',
            year: new Date().getFullYear(),
            effective_date: new Date().toISOString().slice(0, 10),
            status: 'active',
            description: '',
            is_active: true,
            file: null,
        });
        setFormErrors({});
        setIsFormModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEdit = (item) => {
        setEditingProduct(item);
        setFormData({
            title: item.title || '',
            document_type: item.document_type || 'Keputusan Kepala Desa (SK)',
            document_number: item.document_number || '',
            year: item.year || new Date().getFullYear(),
            effective_date: item.effective_date ? String(item.effective_date).slice(0, 10) : '',
            status: item.status || 'active',
            description: item.description || '',
            is_active: Boolean(item.is_active),
            file: null,
        });
        setFormErrors({});
        setIsFormModalOpen(true);
    };

    // Handle form submit (Create or Update)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormErrors({});

        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('document_type', formData.document_type);
        payload.append('document_number', formData.document_number);
        payload.append('year', formData.year);
        if (formData.effective_date) payload.append('effective_date', formData.effective_date);
        payload.append('status', formData.status);
        payload.append('description', formData.description || '');
        payload.append('is_active', formData.is_active ? '1' : '0');
        if (formData.file) payload.append('file', formData.file);

        if (editingProduct) {
            payload.append('_method', 'PUT');
            router.post(`/${adminPath}/settings/legal-products/${editingProduct.id}`, payload, {
                onSuccess: () => {
                    setIsFormModalOpen(false);
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    setFormErrors(errors);
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post(`/${adminPath}/settings/legal-products`, payload, {
                onSuccess: () => {
                    setIsFormModalOpen(false);
                    setIsSubmitting(false);
                },
                onError: (errors) => {
                    setFormErrors(errors);
                    setIsSubmitting(false);
                },
            });
        }
    };

    // Open Delete Modal
    const handleOpenDelete = (item) => {
        setDeleteTarget(item);
        setIsDeleteModalOpen(true);
    };

    // Confirm Delete
    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        router.delete(`/${adminPath}/settings/legal-products/${deleteTarget.id}`, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setDeleteTarget(null);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Berlaku</span>
                    </span>
                );
            case 'amended':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <AlertCircle className="h-3 w-3" />
                        <span>Diubah</span>
                    </span>
                );
            case 'repealed':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        <X className="h-3 w-3" />
                        <span>Dicabut</span>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <AdminLayout title="Produk Hukum Desa">
            <div className="space-y-6">
                {/* Header with Title & Add Action */}
                <AdminPageHeader
                    title="Produk Hukum & Regulasi Desa"
                    description="Kelola dokumentasi Peraturan Desa (Perdes), Surat Keputusan (SK) Kepala Desa, dan produk hukum yang berlaku di Desa Karangwungu."
                    action={
                        <div className="flex flex-wrap items-center gap-2">
                            <a
                                href="/layanan"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>Lihat Halaman Publik</span>
                            </a>
                            <button
                                type="button"
                                onClick={handleOpenCreate}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-sm transition-all cursor-pointer"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tambah Produk Hukum</span>
                            </button>
                        </div>
                    }
                />

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Produk Hukum</span>
                            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                <Scale className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-zinc-900 dark:text-white">
                            {stats.total || products.length}
                        </div>
                        <p className="text-[11px] text-zinc-500">Seluruh regulasi tersimpan</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Peraturan Desa (Perdes)</span>
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <BookOpen className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-zinc-900 dark:text-white">
                            {stats.perdes || 0}
                        </div>
                        <p className="text-[11px] text-blue-600 dark:text-blue-400">Perdes yang ditetapkan</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">SK Kepala Desa</span>
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                <FileCheck className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-zinc-900 dark:text-white">
                            {stats.sk || 0}
                        </div>
                        <p className="text-[11px] text-amber-600 dark:text-amber-400">Surat keputusan kades</p>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Status Berlaku</span>
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-zinc-900 dark:text-white">
                            {stats.active || 0}
                        </div>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Hukum aktif saat ini</p>
                    </div>
                </div>

                {/* Search & Filter Toolbar */}
                <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari judul, nomor SK/Perdes..."
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    {/* Filter Selectors */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                            <option value="all">Semua Jenis Dokumen</option>
                            {availableTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>

                        {/* Year Filter */}
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                            <option value="all">Semua Tahun</option>
                            {availableYears.map((y) => (
                                <option key={y} value={y}>
                                    Tahun {y}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Berlaku</option>
                            <option value="amended">Diubah</option>
                            <option value="repealed">Dicabut</option>
                        </select>
                    </div>
                </div>

                {/* Legal Products Cards / List */}
                {filteredProducts.length === 0 ? (
                    <div className="p-12 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                        <div className="inline-flex p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                            <Scale className="h-8 w-8" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                            Tidak ada produk hukum ditemukan
                        </h4>
                        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                            Coba sesuaikan kata kunci pencarian atau filter yang Anda pilih, atau tambahkan produk hukum baru.
                        </p>
                        <button
                            type="button"
                            onClick={handleOpenCreate}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Tambah Produk Hukum Baru</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredProducts.map((item) => (
                            <div
                                key={item.id}
                                className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all space-y-3"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                                <BookOpen className="h-3 w-3 text-red-600 dark:text-amber-400" />
                                                <span>{item.document_type}</span>
                                            </span>
                                            {getStatusBadge(item.status)}
                                            <span className="text-xs font-mono font-bold text-zinc-500">
                                                {item.document_number}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                                            {item.title}
                                        </h3>

                                        {item.description && (
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-500 pt-1">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>
                                                    Ditetapkan:{' '}
                                                    {item.effective_date
                                                        ? String(item.effective_date).slice(0, 10)
                                                        : `Tahun ${item.year}`}
                                                </span>
                                            </div>
                                            {item.file_name && (
                                                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                                    <FileText className="h-3.5 w-3.5" />
                                                    <span>
                                                        {item.file_name} ({item.file_size || 'Berkas Dokumen'})
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1 text-zinc-400">
                                                <Download className="h-3 w-3" />
                                                <span>{item.download_count || 0} kali diunduh</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0 pt-2 sm:pt-0">
                                        {item.file_url ? (
                                            <a
                                                href={item.file_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                title="Lihat / Unduh Berkas PDF"
                                                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors"
                                            >
                                                <Download className="h-4 w-4" />
                                            </a>
                                        ) : null}

                                        <button
                                            type="button"
                                            onClick={() => handleOpenEdit(item)}
                                            title="Edit Produk Hukum"
                                            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleOpenDelete(item)}
                                            title="Hapus Produk Hukum"
                                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FORM MODAL: CREATE / EDIT */}
            {isFormModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-2xl rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400">
                                    <Scale className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        {editingProduct ? 'Edit Produk Hukum' : 'Tambah Produk Hukum Baru'}
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        Isi parameter regulasi desa sesuai dokumen fisik/digital resmi.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsFormModalOpen(false)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Modal Body Form */}
                        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
                            {/* Judul Dokumen */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    Judul / Tentang Regulasi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Contoh: Penetapan Penerima BLT Dana Desa Tahun 2026..."
                                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                {formErrors.title && (
                                    <p className="text-[11px] text-red-500 font-medium">{formErrors.title}</p>
                                )}
                            </div>

                            {/* Jenis Dokumen & Nomor Dokumen */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Jenis Produk Hukum <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.document_type}
                                        onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                                        className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                                    >
                                        {availableTypes.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                    {formErrors.document_type && (
                                        <p className="text-[11px] text-red-500 font-medium">{formErrors.document_type}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Nomor Dokumen <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.document_number}
                                        onChange={(e) => setFormData({ ...formData, document_number: e.target.value })}
                                        placeholder="Contoh: 141/04/KEP/413.312.08/2026 atau Nomor 01 Tahun 2026"
                                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    {formErrors.document_number && (
                                        <p className="text-[11px] text-red-500 font-medium">{formErrors.document_number}</p>
                                    )}
                                </div>
                            </div>

                            {/* Tahun, Tanggal Ditetapkan, Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Tahun Dokumen <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="2000"
                                        max="2100"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    {formErrors.year && (
                                        <p className="text-[11px] text-red-500 font-medium">{formErrors.year}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Tanggal Ditetapkan
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.effective_date}
                                        onChange={(e) => setFormData({ ...formData, effective_date: e.target.value })}
                                        className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Status Keberlakuan <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                                    >
                                        <option value="active">Berlaku</option>
                                        <option value="amended">Diubah</option>
                                        <option value="repealed">Dicabut</option>
                                    </select>
                                </div>
                            </div>

                            {/* Ringkasan Deskripsi */}
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    Ringkasan / Materi Pokok
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Tuliskan uraian ringkas mengenai isi atau tujuan ditetapkannya regulasi ini..."
                                    className="w-full px-3.5 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed"
                                />
                            </div>

                            {/* Upload File Dokumen (PDF, DOC, DOCX) */}
                            <div className="space-y-1.5 p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    Berkas Dokumen Digital (PDF / Dokumen)
                                </label>
                                {editingProduct && editingProduct.file_name && (
                                    <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 mb-2">
                                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                                            <FileText className="h-3.5 w-3.5 text-emerald-500" />
                                            <span>{editingProduct.file_name}</span>
                                            <span className="text-zinc-400 text-[10px]">
                                                ({editingProduct.file_size || 'Ukuran tersedia'})
                                            </span>
                                        </div>
                                        {editingProduct.file_url && (
                                            <a
                                                href={editingProduct.file_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline"
                                            >
                                                Unduh
                                            </a>
                                        )}
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                    className="block w-full text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-500/10 file:text-red-600 dark:file:text-amber-400 hover:file:bg-red-500/20 cursor-pointer"
                                />
                                <p className="text-[11px] text-zinc-400">
                                    Format: PDF, DOC, atau DOCX. Maksimal ukuran 15 MB.
                                </p>
                                {formErrors.file && (
                                    <p className="text-[11px] text-red-500 font-medium">{formErrors.file}</p>
                                )}
                            </div>

                            {/* Checkbox Aktif */}
                            <label className="flex items-center gap-2 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="rounded-sm text-red-600 focus:ring-red-500"
                                />
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Tampilkan produk hukum ini di katalog website publik
                                </span>
                            </label>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsFormModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {isSubmitting ? 'Menyimpan...' : editingProduct ? 'Perbarui Regulasi' : 'Simpan Produk Hukum'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {isDeleteModalOpen && deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                                <Trash2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                    Hapus Produk Hukum
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            Apakah Anda yakin ingin menghapus produk hukum{' '}
                            <strong>&quot;{deleteTarget.title}&quot;</strong> (No. {deleteTarget.document_number})? Berkas dokumen terkait juga akan dihapus.
                        </p>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleConfirmDelete}
                                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
