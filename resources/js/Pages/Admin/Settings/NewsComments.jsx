import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    ArrowLeft,
    MessageSquare,
    Send,
    Trash2,
    EyeOff,
    CornerDownRight,
    User,
    Tag,
    Calendar,
    Eye,
    ExternalLink,
    Edit3,
    AlertTriangle,
    ShieldCheck,
    Loader2
} from 'lucide-react';

export default function NewsComments({ auth, post, comments = [] }) {
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Form for official admin replies
    const replyForm = useForm({
        content: '',
    });

    const handleSendAdminReply = (e, commentId) => {
        e.preventDefault();
        if (!replyForm.data.content.trim()) return;

        replyForm.post(`/portal-karangwungu/settings/news/${post.id}/comments/${commentId}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                replyForm.reset();
                setReplyingToCommentId(null);
            },
        });
    };

    const handleToggleApproval = (commentId) => {
        router.patch(`/portal-karangwungu/settings/news/comments/${commentId}/toggle-approval`, {}, {
            preserveScroll: true,
        });
    };

    const handleConfirmDelete = () => {
        if (!commentToDelete) return;
        setIsDeleting(true);

        router.delete(`/portal-karangwungu/settings/news/comments/${commentToDelete.id}`, {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setCommentToDelete(null);
            },
        });
    };

    const getInitials = (name) => {
        if (!name) return 'W';
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const totalReplies = comments.reduce((acc, c) => acc + (c.replies ? c.replies.length : 0), 0);
    const totalAllComments = comments.length + totalReplies;

    // Render an individual comment card with independent natural height
    const renderCommentCard = (comment) => (
        <div
            key={comment.id}
            className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3"
        >
            {/* Top Row: Sender on left, Status & Actions on right (Kanan Kiri) */}
            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 border border-red-500/20 dark:border-amber-500/30 font-black text-xs flex items-center justify-center shrink-0">
                        {getInitials(comment.name)}
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {comment.name}
                        </h4>
                        {comment.email && (
                            <p className="text-[10px] text-zinc-400 truncate">
                                {comment.email}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        comment.is_approved
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700'
                    }`}>
                        {comment.is_approved ? 'Ditayangkan' : 'Disembunyikan'}
                    </span>
                    <button
                        type="button"
                        onClick={() => handleToggleApproval(comment.id)}
                        title={comment.is_approved ? 'Klik untuk sembunyikan dari publik' : 'Klik untuk tayangkan ke publik'}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            comment.is_approved
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:text-emerald-600 hover:bg-zinc-200'
                        }`}
                    >
                        {comment.is_approved ? (
                            <Eye className="h-3.5 w-3.5" />
                        ) : (
                            <EyeOff className="h-3.5 w-3.5" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setCommentToDelete(comment)}
                        title="Hapus Komentar"
                        className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-zinc-200 dark:border-zinc-700 hover:border-red-200 transition-all cursor-pointer"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Middle: Content Text */}
            <div className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-normal leading-relaxed">
                {comment.content}
            </div>

            {/* Bottom Section: Footer (Date on left, Balas on right - Kanan Kiri) */}
            <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span className="text-[10px] text-zinc-400">
                        {comment.created_at_formatted}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            if (replyingToCommentId === comment.id) {
                                setReplyingToCommentId(null);
                            } else {
                                setReplyingToCommentId(comment.id);
                                replyForm.setData('content', '');
                            }
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-amber-400 hover:text-red-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                    >
                        <CornerDownRight className="h-3 w-3" />
                        <span>{replyingToCommentId === comment.id ? 'Tutup Balasan' : 'Balas Resmi'}</span>
                    </button>
                </div>

                {/* Official Admin Reply Box */}
                {replyingToCommentId === comment.id && (
                    <form
                        onSubmit={(e) => handleSendAdminReply(e, comment.id)}
                        className="p-3 rounded-lg bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/30 space-y-2.5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                                <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                                <span>Balas Resmi Pemdes</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setReplyingToCommentId(null)}
                                className="text-[10px] text-zinc-400 hover:text-zinc-600 cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>

                        <textarea
                            value={replyForm.data.content}
                            onChange={(e) => replyForm.setData('content', e.target.value)}
                            rows={2}
                            placeholder={`Tuliskan tanggapan resmi untuk ${comment.name}...`}
                            required
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                        />

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={replyForm.processing || !replyForm.data.content.trim()}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-[11px] font-bold shadow-xs disabled:opacity-50 cursor-pointer"
                            >
                                {replyForm.processing ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Send className="h-3 w-3" />
                                )}
                                <span>Kirim</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="space-y-2 pt-1 border-l-2 border-red-500/20 dark:border-amber-500/20 pl-2.5">
                        {comment.replies.map((reply) => {
                            const isAdminReply =
                                reply.name.toLowerCase().includes('admin') ||
                                reply.name.toLowerCase().includes('pemdes');

                            return (
                                <div
                                    key={reply.id}
                                    className={`p-2.5 rounded-lg border flex items-start justify-between gap-2 ${
                                        isAdminReply
                                            ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/30'
                                            : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/80 dark:border-zinc-800/80'
                                    }`}
                                >
                                    <div className="flex items-start gap-2 min-w-0">
                                        <div className={`h-6 w-6 rounded-lg text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5 ${
                                            isAdminReply
                                                ? 'bg-gradient-to-br from-red-600 to-amber-500 text-white'
                                                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                                        }`}>
                                            {getInitials(reply.name)}
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <div className="flex items-center gap-1 flex-wrap">
                                                <span className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">
                                                    {reply.name}
                                                </span>
                                                {isAdminReply && (
                                                    <span className="px-1 py-0.2 rounded-md text-[8px] font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                                        Admin Pemdes
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
                                                {reply.content}
                                            </p>
                                            <p className="text-[9px] text-zinc-400">
                                                {reply.created_at_formatted}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setCommentToDelete(reply)}
                                        title="Hapus Balasan"
                                        className="p-1 rounded-md text-zinc-400 hover:text-red-600 transition-colors shrink-0"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <AdminLayout
            title={`Moderasi Komentar: ${post.title}`}
            auth={auth}
        >
            <Head title={`Komentar: ${post.title} - Admin Karangwungu`} />

            <div className="space-y-6">
                {/* Standard Admin Header with Breadcrumbs & Action Buttons */}
                <AdminPageHeader
                    title="Moderasi & Diskusi Komentar Warga"
                    description="Pantau seluruh masukan masyarakat, berikan respon resmi pemerintah desa, atau kelola penayangan komentar."
                    breadcrumbs={[
                        { label: 'Admin', href: '/portal-karangwungu/dashboard' },
                        { label: 'Pengaturan Website', href: '/portal-karangwungu/settings/dashboard' },
                        { label: 'Warta & Berita Desa', href: '/portal-karangwungu/settings/news' },
                        { label: 'Moderasi Komentar' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <Link
                                href="/portal-karangwungu/settings/news"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                <span>Kembali ke Berita</span>
                            </Link>
                            <a
                                href={`/berita/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                                <span>Buka di Portal</span>
                            </a>
                            <Link
                                href={`/portal-karangwungu/settings/news/${post.id}/edit`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 shadow-md shadow-red-600/20 active:scale-95 transition-all"
                            >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit Artikel</span>
                            </Link>
                        </div>
                    }
                />

                {/* 2-Column Responsive Layout (Kiri: Detail Berita, Kanan: Komentar Grid 2) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: Clean Redesigned Article Overview & Info Card (4 cols on desktop) */}
                    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-6">
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs overflow-hidden">
                            {/* Cover image with subtle overlay & category badge */}
                            <div className="relative aspect-video bg-zinc-950 overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white">
                                        <MessageSquare className="h-10 w-10 opacity-80" />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-red-600 dark:text-amber-400 shadow-xs border border-white/20">
                                        <Tag className="h-3 w-3" />
                                        <span>{post.category}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Card Content Area */}
                            <div className="p-4 sm:p-5 space-y-4">
                                {/* Title */}
                                <div>
                                    <h2 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white leading-snug tracking-tight">
                                        {post.title}
                                    </h2>
                                </div>

                                {/* Clean Full Information Rows (No truncation!) */}
                                <div className="space-y-2 pt-1">
                                    {/* Tanggal Terbit */}
                                    <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                                        <div className="h-7 w-7 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                                Waktu Terbit
                                            </span>
                                            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">
                                                {post.published_at_formatted}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Penulis / Redaksi */}
                                    <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                                        <div className="h-7 w-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <User className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                                Penulis Redaksi
                                            </span>
                                            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 leading-relaxed">
                                                {post.author}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Statistik Pembaca */}
                                    <div className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60">
                                        <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                                            <Eye className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                                Jumlah Pembaca
                                            </span>
                                            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                                                {post.views?.toLocaleString('id-ID')} kali dibaca
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Clean Statistics Strip */}
                                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500">
                                        <span className="flex items-center gap-1.5">
                                            <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                                            <span>Statistik Tanggapan</span>
                                        </span>
                                        <span className="text-[10px] uppercase text-zinc-400">Diskusi Warga</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 text-center">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Utama</span>
                                            <span className="text-base font-black text-zinc-900 dark:text-white mt-0.5 block">{comments.length}</span>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/70 text-center">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Balasan</span>
                                            <span className="text-base font-black text-zinc-900 dark:text-white mt-0.5 block">{totalReplies}</span>
                                        </div>
                                        <div className="p-2.5 rounded-lg bg-red-500/10 dark:bg-amber-500/10 border border-red-500/20 dark:border-amber-500/30 text-center">
                                            <span className="block text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">Total</span>
                                            <span className="text-base font-black text-red-600 dark:text-amber-400 mt-0.5 block">{totalAllComments}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Direct Quick Action Buttons */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <a
                                        href={`/berita/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                                        <span>Buka Portal</span>
                                    </a>
                                    <Link
                                        href={`/portal-karangwungu/settings/news/${post.id}/edit`}
                                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 shadow-xs transition-all"
                                    >
                                        <Edit3 className="h-3.5 w-3.5" />
                                        <span>Edit Artikel</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Komentar Warga (Independent 2-Column Masonry) */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center justify-between pb-1">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                    Daftar Komentar Warga ({comments.length})
                                </h3>
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                Balasan admin otomatis diverifikasi lencana Pemdes
                            </span>
                        </div>

                        {comments.length === 0 ? (
                            <div className="p-12 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
                                <div className="h-12 w-12 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Belum Ada Komentar untuk Warta Ini
                                </h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                                    Komentar warga yang masuk dari portal publik akan langsung tampil di sini dalam format kartu 2 kolom.
                                </p>
                            </div>
                        ) : (
                            /* Independent 2-Column Masonry: Columns flow naturally without forcing equal heights */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* Left Column of Comments (Even indexes) */}
                                <div className="space-y-4">
                                    {comments
                                        .filter((_, idx) => idx % 2 === 0)
                                        .map((comment) => renderCommentCard(comment))}
                                </div>

                                {/* Right Column of Comments (Odd indexes) */}
                                <div className="space-y-4">
                                    {comments
                                        .filter((_, idx) => idx % 2 === 1)
                                        .map((comment) => renderCommentCard(comment))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {commentToDelete && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-md w-full p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Hapus Komentar Ini?
                                </h3>
                                <p className="text-xs text-zinc-500">
                                    Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300">
                            <p className="font-semibold text-zinc-900 dark:text-white mb-1">
                                Komentar oleh {commentToDelete.name}:
                            </p>
                            <p className="italic line-clamp-3">
                                "{commentToDelete.content}"
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setCommentToDelete(null)}
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
                                <span>Hapus Sekarang</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
