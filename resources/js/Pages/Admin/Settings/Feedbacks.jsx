import React, { useState, useMemo, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    MessageSquare,
    Eye,
    EyeOff,
    Trash2,
    Search,
    Clock,
    Phone,
    ExternalLink,
    AlertTriangle,
    X,
    MessageCircle,
    User,
    RefreshCw,
    CheckSquare,
    Square,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { formatIndoDateTime } from '@/Utils/format';

export default function FeedbacksIndex({
    feedbacks = [],
    stats = { total: 0, public: 0, private: 0 },
    categories = [],
    filters = { search: '', category: 'all', status: 'all' },
}) {
    // Local state for search and filtering
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    // Selection for bulk actions
    const [selectedIds, setSelectedIds] = useState([]);

    // Modal state for reading full message (read-only)
    const [activeFeedback, setActiveFeedback] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Delete modal confirmation
    const [deleteTarget, setDeleteTarget] = useState(null); // single item or 'bulk'
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Pagination: limit 9 cards per page
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    // Filter logic on client-side for rapid response
    const filteredFeedbacks = useMemo(() => {
        return feedbacks.filter((item) => {
            // Search match
            const matchSearch =
                !searchTerm.trim() ||
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.contact_info?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.message?.toLowerCase().includes(searchTerm.toLowerCase());

            // Category match
            const matchCat =
                selectedCategory === 'all' || item.category === selectedCategory;

            // Status match
            const matchStatus =
                statusFilter === 'all' ||
                (statusFilter === 'public' && item.is_public) ||
                (statusFilter === 'private' && !item.is_public);

            return matchSearch && matchCat && matchStatus;
        });
    }, [feedbacks, searchTerm, selectedCategory, statusFilter]);

    // Reset pagination to page 1 whenever search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, statusFilter]);

    const totalPages = Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE) || 1;

    // Slice feedbacks for the current page
    const paginatedFeedbacks = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredFeedbacks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredFeedbacks, currentPage]);

    // Bulk selection handlers
    const isAllSelected =
        filteredFeedbacks.length > 0 &&
        filteredFeedbacks.every((fb) => selectedIds.includes(fb.id));

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredFeedbacks.map((fb) => fb.id));
        }
    };

    const handleToggleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // Quick single toggle visibility
    const handleTogglePublic = (id) => {
        router.patch(
            `/portal-karangwungu/settings/feedbacks/${id}/toggle-public`,
            {},
            { preserveScroll: true }
        );
    };

    // Bulk action execution
    const handleBulkAction = (action) => {
        if (selectedIds.length === 0) return;

        if (action === 'delete') {
            setDeleteTarget('bulk');
            setIsDeleteModalOpen(true);
            return;
        }

        router.post(
            '/portal-karangwungu/settings/feedbacks/bulk-action',
            { ids: selectedIds, action },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedIds([]);
                },
            }
        );
    };

    // Open read-only detail modal
    const handleOpenDetail = (feedback) => {
        setActiveFeedback(feedback);
        setIsDetailModalOpen(true);
    };

    // Open single delete modal
    const handleConfirmDelete = (feedback) => {
        setDeleteTarget(feedback);
        setIsDeleteModalOpen(true);
    };

    // Execute delete
    const handleExecuteDelete = () => {
        setIsDeleting(true);

        if (deleteTarget === 'bulk') {
            router.post(
                '/portal-karangwungu/settings/feedbacks/bulk-action',
                { ids: selectedIds, action: 'delete' },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsDeleting(false);
                        setIsDeleteModalOpen(false);
                        setSelectedIds([]);
                        setDeleteTarget(null);
                    },
                    onError: () => setIsDeleting(false),
                }
            );
        } else if (deleteTarget?.id) {
            router.delete(
                `/portal-karangwungu/settings/feedbacks/${deleteTarget.id}`,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsDeleting(false);
                        setIsDeleteModalOpen(false);
                        setDeleteTarget(null);
                    },
                    onError: () => setIsDeleting(false),
                }
            );
        }
    };

    // WhatsApp clean link helper
    const getWaUrl = (contact) => {
        if (!contact) return null;
        const clean = contact.replace(/[^0-9]/g, '');
        if (!clean || clean.length < 9) return null;
        const phoneFormatted = clean.startsWith('0') ? '62' + clean.slice(1) : clean;
        return `https://wa.me/${phoneFormatted}?text=${encodeURIComponent(
            'Halo, terima kasih atas aspirasi / pengaduan Anda ke Pemdes Karangwungu.'
        )}`;
    };

    // Category badge styling helper
    const getCategoryColor = (cat) => {
        const text = (cat || '').toLowerCase();
        if (text.includes('pembangunan') || text.includes('saran')) {
            return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60';
        }
        if (text.includes('pelayanan') || text.includes('kritik')) {
            return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60';
        }
        if (text.includes('infrastruktur') || text.includes('fasilitas')) {
            return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';
        }
        if (text.includes('kebersihan') || text.includes('lingkungan')) {
            return 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/60';
        }
        if (text.includes('keamanan') || text.includes('ketertiban')) {
            return 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/60';
        }
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
    };

    return (
        <AdminLayout title="Aspirasi & Pengaduan Warga">
            <div className="space-y-6 max-w-7xl mx-auto pb-12">
                {/* 1. Header Section */}
                <AdminPageHeader
                    title="Aspirasi & Pengaduan Warga"
                    description="Kelola masukan, kritik, dan pengaduan dari warga desa Karangwungu. Pilih masukan yang layak ditampilkan pada portal publik atau hapus pesan yang tidak relevan."
                    breadcrumbs={[
                        { label: 'Admin', href: '/portal-karangwungu/dashboard' },
                        { label: 'Pengaturan Portal', href: '/portal-karangwungu/settings/dashboard' },
                        { label: 'Aspirasi Warga' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href="/kontak"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
                            >
                                <span>Lihat di Portal Publik</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    }
                />

                {/* 2. Stat Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Total Aspirasi */}
                    <div
                        onClick={() => setStatusFilter('all')}
                        className={`group p-4 rounded-lg bg-white dark:bg-zinc-900 border shadow-xs flex items-center justify-between gap-3.5 transition-all cursor-pointer ${
                            statusFilter === 'all'
                                ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-50/60 dark:bg-zinc-800/40'
                                : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                    >
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="p-2.5 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 border border-red-500/20 shrink-0">
                                <MessageSquare className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block truncate">
                                    Total Masukan Diterima
                                </span>
                                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-baseline gap-1.5 mt-0.5">
                                    <span>{stats.total}</span>
                                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">aspirasi</span>
                                </div>
                            </div>
                        </div>
                        {statusFilter === 'all' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shrink-0">
                                Aktif
                            </span>
                        )}
                    </div>

                    {/* Card 2: Ditampilkan ke Publik */}
                    <div
                        onClick={() => setStatusFilter('public')}
                        className={`group p-4 rounded-lg bg-white dark:bg-zinc-900 border shadow-xs flex items-center justify-between gap-3.5 transition-all cursor-pointer ${
                            statusFilter === 'public'
                                ? 'border-emerald-500/60 dark:border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                                : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                    >
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                                <Eye className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block truncate">
                                    Ditampilkan di Publik
                                </span>
                                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-baseline gap-1.5 mt-0.5">
                                    <span>{stats.public}</span>
                                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">terpublikasi</span>
                                </div>
                            </div>
                        </div>
                        {statusFilter === 'public' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shrink-0">
                                Aktif
                            </span>
                        )}
                    </div>

                    {/* Card 3: Disembunyikan / Belum Publik */}
                    <div
                        onClick={() => setStatusFilter('private')}
                        className={`group p-4 rounded-lg bg-white dark:bg-zinc-900 border shadow-xs flex items-center justify-between gap-3.5 transition-all cursor-pointer ${
                            statusFilter === 'private'
                                ? 'border-amber-500/60 dark:border-amber-500/50 bg-amber-50/30 dark:bg-amber-950/20'
                                : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                    >
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                                <EyeOff className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block truncate">
                                    Disembunyikan / Internal
                                </span>
                                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-baseline gap-1.5 mt-0.5">
                                    <span>{stats.private}</span>
                                    <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">privat</span>
                                </div>
                            </div>
                        </div>
                        {statusFilter === 'private' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 shrink-0">
                                Aktif
                            </span>
                        )}
                    </div>
                </div>

                {/* 3. Search, Filter Bar & Bulk Actions */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Cari nama pengirim, kontak, atau kata kunci..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500/50 shadow-2xs"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Filters Controls */}
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Category Filter */}
                            <div className="relative">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="appearance-none pl-3 pr-8 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer font-medium shadow-2xs"
                                >
                                    <option value="all">Semua Kategori</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Status Filter Tabs */}
                            <div className="inline-flex rounded-lg border border-zinc-300 dark:border-zinc-700 p-0.5 bg-zinc-100 dark:bg-zinc-900 shadow-2xs">
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('all')}
                                    className={`px-2.5 py-1.5 text-[11px] font-bold rounded-md transition-colors ${
                                        statusFilter === 'all'
                                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                >
                                    Semua
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('public')}
                                    className={`px-2.5 py-1.5 text-[11px] font-bold rounded-md transition-colors ${
                                        statusFilter === 'public'
                                            ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                >
                                    Publik
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('private')}
                                    className={`px-2.5 py-1.5 text-[11px] font-bold rounded-md transition-colors ${
                                        statusFilter === 'private'
                                            ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-2xs'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                >
                                    Disembunyikan
                                </button>
                            </div>

                            {/* Reset filter button if active */}
                            {(searchTerm || selectedCategory !== 'all' || statusFilter !== 'all') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('all');
                                        setStatusFilter('all');
                                    }}
                                    className="p-2 text-xs text-red-600 dark:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                                    title="Reset Semua Filter"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Bulk Action Bar (Visible when items are selected) */}
                    {selectedIds.length > 0 && (
                        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100 shadow-md animate-fadeIn">
                            <div className="flex items-center gap-2 text-xs font-semibold">
                                <CheckSquare className="w-4 h-4 text-emerald-400" />
                                <span>
                                    <strong>{selectedIds.length}</strong> masukan dipilih
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleBulkAction('make_public')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Tampilkan di Publik</span>
                                </button>
                                <button
                                    onClick={() => handleBulkAction('make_private')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <EyeOff className="w-3.5 h-3.5" />
                                    <span>Sembunyikan</span>
                                </button>
                                <button
                                    onClick={() => handleBulkAction('delete')}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Hapus</span>
                                </button>
                                <button
                                    onClick={() => setSelectedIds([])}
                                    className="px-2 py-1.5 text-zinc-400 hover:text-white text-xs"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Feedbacks Cards Grid Section */}
                <div className="space-y-4">
                    {/* Header Bar with Select All & Counter */}
                    <div className="flex items-center justify-between px-1 text-xs text-zinc-600 dark:text-zinc-400">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="inline-flex items-center gap-2 font-bold hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            {isAllSelected ? (
                                <CheckSquare className="w-4 h-4 text-red-600 dark:text-amber-400" />
                            ) : (
                                <Square className="w-4 h-4 text-zinc-400" />
                            )}
                            <span>Pilih Semua Masukan</span>
                        </button>

                        <span>
                            Menampilkan{' '}
                            <strong>
                                {filteredFeedbacks.length === 0
                                    ? 0
                                    : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                                -{Math.min(currentPage * ITEMS_PER_PAGE, filteredFeedbacks.length)}
                            </strong>{' '}
                            dari <strong>{filteredFeedbacks.length}</strong> masukan
                            {filteredFeedbacks.length !== feedbacks.length && (
                                <span className="text-zinc-400"> (total {feedbacks.length})</span>
                            )}
                        </span>
                    </div>

                    {/* Cards Grid */}
                    {paginatedFeedbacks.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                                {paginatedFeedbacks.map((fb) => {
                                    const isSelected = selectedIds.includes(fb.id);
                                    const waLink = getWaUrl(fb.contact_info);

                                    return (
                                        <div
                                            key={fb.id}
                                            className={`group relative flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 border p-5 shadow-xs hover:shadow-md transition-all duration-200 ${
                                                isSelected
                                                    ? 'border-red-500/50 dark:border-amber-500/50 ring-2 ring-red-500/20 dark:ring-amber-500/20 bg-red-50/10 dark:bg-zinc-900'
                                                    : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            }`}
                                        >
                                            {/* Card Top: Checkbox, Category, Visibility Switch & Delete */}
                                            <div>
                                                <div className="flex items-center justify-between gap-2">
                                                    {/* Left: Checkbox & Category */}
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleSelect(fb.id)}
                                                            className="shrink-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                                            title={isSelected ? 'Batal pilih' : 'Pilih masukan'}
                                                        >
                                                            {isSelected ? (
                                                                <CheckSquare className="w-4 h-4 text-red-600 dark:text-amber-400" />
                                                            ) : (
                                                                <Square className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border truncate ${getCategoryColor(
                                                                fb.category
                                                            )}`}
                                                        >
                                                            {fb.category}
                                                        </span>
                                                    </div>

                                                    {/* Right: Visibility Switch & Delete */}
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleTogglePublic(fb.id)}
                                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                                    fb.is_public
                                                                        ? 'bg-emerald-500'
                                                                        : 'bg-zinc-300 dark:bg-zinc-700'
                                                                }`}
                                                                title={
                                                                    fb.is_public
                                                                        ? 'Status: Publik (Klik untuk sembunyikan)'
                                                                        : 'Status: Privat (Klik untuk tampilkan)'
                                                                }
                                                            >
                                                                <span
                                                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                                                        fb.is_public
                                                                            ? 'translate-x-4'
                                                                            : 'translate-x-0'
                                                                    }`}
                                                                />
                                                            </button>
                                                            <span
                                                                className={`text-[10px] font-bold ${
                                                                    fb.is_public
                                                                        ? 'text-emerald-600 dark:text-emerald-400'
                                                                        : 'text-zinc-400 dark:text-zinc-500'
                                                                }`}
                                                            >
                                                                {fb.is_public ? 'Publik' : 'Privat'}
                                                            </span>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleConfirmDelete(fb)}
                                                            className="p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                                                            title="Hapus masukan"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Timestamp */}
                                                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 mt-2.5">
                                                    <Clock className="w-3 h-3 shrink-0" />
                                                    <span>{fb.created_at_human}</span>
                                                    <span>•</span>
                                                    <span className="truncate">{formatIndoDateTime(fb.created_at)}</span>
                                                </div>

                                                {/* Message Content */}
                                                <div className="mt-3 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal whitespace-pre-line break-words line-clamp-4">
                                                    {fb.message}
                                                </div>
                                            </div>

                                            {/* Card Footer: Citizen Info & WhatsApp */}
                                            <div className="pt-3 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 min-w-0">
                                                        <User className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                        <span className="truncate">{fb.name}</span>
                                                    </div>

                                                    {fb.message && fb.message.length > 160 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleOpenDetail(fb)}
                                                            className="text-[11px] font-semibold text-red-600 dark:text-amber-400 hover:underline shrink-0"
                                                        >
                                                            Lihat Penuh
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1.5 truncate">
                                                        <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                                                        <span className="truncate">{fb.contact_info}</span>
                                                    </div>

                                                    {waLink && (
                                                        <a
                                                            href={waLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 hover:underline shrink-0"
                                                        >
                                                            <MessageCircle className="w-3 h-3" />
                                                            <span>WhatsApp</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-zinc-200/80 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Halaman{' '}
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                            {currentPage}
                                        </span>{' '}
                                        dari{' '}
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                            {totalPages}
                                        </span>{' '}
                                        (9 kartu per halaman)
                                    </p>

                                    <div className="flex items-center gap-1.5">
                                        {/* Previous Page Button */}
                                        <button
                                            type="button"
                                            disabled={currentPage === 1}
                                            onClick={() => {
                                                setCurrentPage((p) => Math.max(p - 1, 1));
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="h-8.5 px-3 rounded-lg flex items-center gap-1 text-xs font-semibold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                                        >
                                            <ChevronLeft className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">Sebelumnya</span>
                                        </button>

                                        {/* Page Number Buttons */}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            if (
                                                totalPages > 7 &&
                                                page !== 1 &&
                                                page !== totalPages &&
                                                Math.abs(page - currentPage) > 1
                                            ) {
                                                if (page === 2 || page === totalPages - 1) {
                                                    return (
                                                        <span
                                                            key={page}
                                                            className="w-7 text-center text-zinc-400 text-xs"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            }

                                            const isActive = currentPage === page;
                                            return (
                                                <button
                                                    key={page}
                                                    type="button"
                                                    onClick={() => {
                                                        setCurrentPage(page);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                                                        isActive
                                                            ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/20'
                                                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            );
                                        })}

                                        {/* Next Page Button */}
                                        <button
                                            type="button"
                                            disabled={currentPage === totalPages}
                                            onClick={() => {
                                                setCurrentPage((p) => Math.min(p + 1, totalPages));
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="h-8.5 px-3 rounded-lg flex items-center gap-1 text-xs font-semibold border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-2xs"
                                        >
                                            <span className="hidden sm:inline">Berikutnya</span>
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                    Tidak Ada Masukan / Pengaduan Ditemukan
                                </h4>
                                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                                    {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all'
                                        ? 'Coba sesuaikan kata kunci pencarian atau reset filter di atas.'
                                        : 'Belum ada aspirasi atau pengaduan yang dikirimkan warga melalui kanal kontak.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. Read-Only Full Message Modal (Tanpa Form Tanggapan/Komen) */}
            {isDetailModalOpen && activeFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden space-y-0">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                        Pesan Aspirasi Warga
                                    </h3>
                                    <p className="text-[11px] text-zinc-500">
                                        Diterima pada {formatIndoDateTime(activeFeedback.created_at)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDetailModalOpen(false)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body Details */}
                        <div className="p-6 space-y-4">
                            {/* Citizen Info */}
                            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500">Kategori:</span>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryColor(
                                            activeFeedback.category
                                        )}`}
                                    >
                                        {activeFeedback.category}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500">Nama Pengirim:</span>
                                    <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                                        {activeFeedback.name}
                                    </strong>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500">Kontak:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                            {activeFeedback.contact_info}
                                        </span>
                                        {getWaUrl(activeFeedback.contact_info) && (
                                            <a
                                                href={getWaUrl(activeFeedback.contact_info)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                            >
                                                <MessageCircle className="w-3 h-3" />
                                                <span>WhatsApp</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                                    <span className="text-zinc-500">Status Visibilitas:</span>
                                    <span
                                        className={`font-bold text-[11px] ${
                                            activeFeedback.is_public
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-zinc-400'
                                        }`}
                                    >
                                        {activeFeedback.is_public ? 'Publik (Ditampilkan)' : 'Privat (Disembunyikan)'}
                                    </span>
                                </div>
                            </div>

                            {/* Message Full Text */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    Isi Pesan Masukan
                                </label>
                                <div className="p-4 rounded-lg bg-zinc-100/70 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-line">
                                    {activeFeedback.message}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setIsDetailModalOpen(false)}
                                className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 space-y-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                    Konfirmasi Penghapusan
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {deleteTarget === 'bulk' ? (
                                        <>
                                            Apakah Anda yakin ingin menghapus{' '}
                                            <strong>{selectedIds.length}</strong> masukan warga yang dipilih? Tindakan ini tidak dapat dibatalkan.
                                        </>
                                    ) : (
                                        <>
                                            Apakah Anda yakin ingin menghapus masukan dari{' '}
                                            <strong>{deleteTarget?.name}</strong>? Data pesan akan terhapus permanen dari sistem.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2.5">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeleteTarget(null);
                                }}
                                className="px-3.5 py-2 text-xs font-semibold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                disabled={isDeleting}
                                onClick={handleExecuteDelete}
                                className="px-4 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? 'Menghapus...' : 'Ya, Hapus Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
