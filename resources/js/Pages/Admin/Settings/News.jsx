import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Newspaper,
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    Sparkles,
    MessageSquare,
    ExternalLink,
    Calendar,
    User,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    Tag,
    Loader2
} from 'lucide-react';

export default function NewsIndex({
    posts = [],
    stats = { total: 0, featured: 0, views: 0, comments: 0 },
    categories = [],
    filters = { search: '', category: 'all', status: 'all' },
}) {
    // Local filters
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    // Pagination: 9 cards per page
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);

    // Delete confirmation state
    const [postToDelete, setPostToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter((p) => {
            const matchSearch =
                !searchTerm.trim() ||
                p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.author?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchCategory =
                selectedCategory === 'all' || p.category === selectedCategory;

            const matchStatus =
                statusFilter === 'all' ||
                (statusFilter === 'featured' && p.is_featured) ||
                (statusFilter === 'regular' && !p.is_featured);

            return matchSearch && matchCategory && matchStatus;
        });
    }, [posts, searchTerm, selectedCategory, statusFilter]);

    // Paginated slice
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE) || 1;
    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPosts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Quick toggle headline status
    const handleToggleFeatured = (id) => {
        router.patch(`/portal-karangwungu/settings/news/${id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    // Confirm post deletion
    const handleConfirmDelete = () => {
        if (!postToDelete) return;
        setIsDeleting(true);

        router.delete(`/portal-karangwungu/settings/news/${postToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setPostToDelete(null);
            },
        });
    };

    return (
        <AdminLayout title="Manajemen Warta & Berita Desa">
            <Head title="Manajemen Warta & Berita Desa - Admin Karangwungu" />

            <div className="space-y-6">
                {/* Header with standard breadcrumbs and action buttons matching other pages */}
                <AdminPageHeader
                    title="Warta & Berita Desa"
                    description="Kelola publikasi berita desa, pengumuman warga, headline berita utama, serta tanggapan dan diskusi masyarakat."
                    breadcrumbs={[
                        { label: 'Admin', href: '/portal-karangwungu/dashboard' },
                        { label: 'Pengaturan Website', href: '/portal-karangwungu/settings/dashboard' },
                        { label: 'Warta & Berita Desa' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href="/berita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                                <span>Lihat di Portal</span>
                            </a>
                            <Link
                                href="/portal-karangwungu/settings/news/create"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 shadow-md shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tulis Berita Baru</span>
                            </Link>
                        </div>
                    }
                />

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <Newspaper className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">Total Artikel</p>
                            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
                                {stats.total}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">Berita Utama</p>
                            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
                                {stats.featured}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <Eye className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">Total Pembaca</p>
                            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
                                {stats.views.toLocaleString('id-ID')}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                            <MessageSquare className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">Komentar Warga</p>
                            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
                                {stats.comments}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar without outer boxed div frame */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Cari judul warta, penulis, atau isi berita..."
                            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 shadow-xs transition-all"
                        />
                    </div>

                    {/* Category & Status Filters with appearance-none and custom centered ChevronDown */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3.5 py-2 pr-8 text-xs font-medium rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 shadow-xs appearance-none cursor-pointer"
                            >
                                <option value="all">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-400">
                                <ChevronDown className="h-3.5 w-3.5" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="px-3.5 py-2 pr-8 text-xs font-medium rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 shadow-xs appearance-none cursor-pointer"
                            >
                                <option value="all">Semua Tipe</option>
                                <option value="featured">Berita Utama</option>
                                <option value="regular">Berita Reguler</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-400">
                                <ChevronDown className="h-3.5 w-3.5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3-Column Card Grid (9 Items per page) */}
                {paginatedPosts.length === 0 ? (
                    <div className="p-12 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
                        <div className="h-12 w-12 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                            <Newspaper className="h-6 w-6" />
                        </div>
                        <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                            Tidak Ada Warta Ditemukan
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Tidak ada artikel yang cocok dengan kata kunci atau filter yang Anda pilih. Coba sesuaikan filter atau tambahkan warta baru.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/portal-karangwungu/settings/news/create"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-amber-500 shadow-md shadow-red-600/20"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tulis Berita Baru</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                            >
                                {/* Card Cover Image */}
                                <div className="relative aspect-video bg-zinc-950 overflow-hidden">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500">
                                            <Newspaper className="h-10 w-10 opacity-40" />
                                        </div>
                                    )}

                                    {/* Category badge(s) */}
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-1 max-w-[70%]">
                                        {(post.categories && post.categories.length > 0 ? post.categories : [post.category]).map((cat, i) => (
                                            <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-red-600 dark:text-amber-400 shadow-xs border border-white/20">
                                                <Tag className="h-2.5 w-2.5" />
                                                <span>{cat}</span>
                                            </span>
                                        ))}
                                    </div>

                                    {/* Headline toggle switch on top right */}
                                    <div className="absolute top-3 right-3">
                                        <button
                                            type="button"
                                            onClick={() => handleToggleFeatured(post.id)}
                                            title={post.is_featured ? 'Hapus dari Berita Utama' : 'Jadikan Berita Utama'}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold backdrop-blur-md transition-all cursor-pointer shadow-xs ${
                                                post.is_featured
                                                    ? 'bg-amber-500 text-white'
                                                    : 'bg-black/50 text-zinc-300 hover:bg-black/70 hover:text-white'
                                            }`}
                                        >
                                            <Sparkles className="h-3 w-3" />
                                            <span>{post.is_featured ? 'Headline' : 'Biasa'}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div className="space-y-2">
                                        {/* Meta info row */}
                                        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                                            <span className="flex items-center gap-1 truncate">
                                                <User className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                                <span className="truncate">{post.author}</span>
                                            </span>
                                            <span className="flex items-center gap-1 shrink-0">
                                                <Calendar className="h-3 w-3 text-zinc-400" />
                                                <span>{post.published_at_formatted}</span>
                                            </span>
                                        </div>

                                        {/* Title with link */}
                                        <Link
                                            href={`/portal-karangwungu/settings/news/${post.id}/edit`}
                                            className="block text-sm sm:text-base font-bold text-zinc-900 dark:text-white line-clamp-2 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            {post.title}
                                        </Link>

                                        {/* Excerpt */}
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 font-normal leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    {/* Card Footer: Metrics & Action Buttons */}
                                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                                        {/* Stats */}
                                        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                                            <span className="flex items-center gap-1" title="Jumlah Pembaca">
                                                <Eye className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>{post.views}</span>
                                            </span>
                                            <Link
                                                href={`/portal-karangwungu/settings/news/${post.id}/comments`}
                                                className="flex items-center gap-1 hover:text-amber-500 transition-colors"
                                                title="Buka Halaman Diskusi Komentar"
                                            >
                                                <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                                                <span className="font-bold">{post.all_comments_count || 0}</span>
                                            </Link>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex items-center gap-1">
                                            <a
                                                href={`/berita/${post.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Lihat di Portal Publik"
                                                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>

                                            <Link
                                                href={`/portal-karangwungu/settings/news/${post.id}/comments`}
                                                title="Moderasi Komentar & Balasan"
                                                className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-transparent hover:border-amber-200 transition-colors"
                                            >
                                                <MessageSquare className="h-3.5 w-3.5" />
                                            </Link>

                                            <Link
                                                href={`/portal-karangwungu/settings/news/${post.id}/edit`}
                                                title="Buka Halaman Edit"
                                                className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                            >
                                                <Edit className="h-3.5 w-3.5" />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() => setPostToDelete(post)}
                                                title="Hapus Artikel"
                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                        <span className="text-zinc-500">
                            Menampilkan halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong> ({filteredPosts.length} artikel)
                        </span>

                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => handlePageChange(page)}
                                    className={`h-8 w-8 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                                        currentPage === page
                                            ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-red-600/20'
                                            : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-xs"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {postToDelete && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Hapus Warta Berita?
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Semua komentar dan data artikel ini akan dihapus permanen.
                                </p>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs">
                            <p className="font-bold text-zinc-900 dark:text-white line-clamp-2">
                                {postToDelete.title}
                            </p>
                            <p className="text-zinc-500 mt-1">
                                Kategori: {postToDelete.category} • {postToDelete.all_comments_count || 0} komentar
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setPostToDelete(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                )}
                                <span>Hapus Berita</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
