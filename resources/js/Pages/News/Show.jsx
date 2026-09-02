import React, { useState } from 'react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import { formatDateIndo } from '../../Utils/format';
import {
    Calendar,
    Eye,
    User,
    Share2,
    Check,
    ArrowLeft,
    Sparkles,
    Flame,
    Tag,
    MessageSquare,
    Send,
    CheckCircle2,
    ShieldCheck,
    CornerDownRight
} from 'lucide-react';

export default function NewsShow({ post, relatedPosts = [], popularPosts = [] }) {
    const { props } = usePage();
    const [copied, setCopied] = useState(false);
    const [submittedSuccess, setSubmittedSuccess] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyProcessing, setReplyProcessing] = useState(false);
    const [replyErrors, setReplyErrors] = useState({});

    const appUrl = props.app_url || window?.location?.origin || 'https://karangwungu-lamongan.desa.id';
    const postUrl = `${appUrl}/berita/${post.slug}`;

    const comments = post.comments || [];
    const totalCommentsCount = comments.reduce((acc, c) => acc + 1 + (c.replies ? c.replies.length : 0), 0);

    // Inertia Form for Main Comment
    const { data, setData, post: submitComment, processing, errors, reset } = useForm({
        name: typeof window !== 'undefined' ? (localStorage.getItem('karangwungu_comment_name') || '') : '',
        email: typeof window !== 'undefined' ? (localStorage.getItem('karangwungu_comment_email') || '') : '',
        content: '',
        parent_id: null,
    });

    // Inertia Form for Reply
    const replyForm = useForm({
        name: typeof window !== 'undefined' ? (localStorage.getItem('karangwungu_comment_name') || '') : '',
        email: typeof window !== 'undefined' ? (localStorage.getItem('karangwungu_comment_email') || '') : '',
        content: '',
        parent_id: null,
    });

    // Auto-load from LocalStorage on mount
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedName = localStorage.getItem('karangwungu_comment_name');
            const savedEmail = localStorage.getItem('karangwungu_comment_email');
            if (savedName) {
                setData('name', savedName);
                replyForm.setData('name', savedName);
            }
            if (savedEmail) {
                setData('email', savedEmail);
                replyForm.setData('email', savedEmail);
            }
        }
    }, []);

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        // Save name and email into LocalStorage
        if (typeof window !== 'undefined') {
            if (data.name) localStorage.setItem('karangwungu_comment_name', data.name);
            if (data.email) localStorage.setItem('karangwungu_comment_email', data.email);
        }

        submitComment(`/berita/${post.slug}/komentar`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setSubmittedSuccess(true);
                setTimeout(() => setSubmittedSuccess(false), 4000);
            },
        });
    };

    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();
        setReplyProcessing(true);
        setReplyErrors({});

        const replyPayload = {
            name: replyForm.data.name,
            email: replyForm.data.email || '',
            content: replyForm.data.content,
            parent_id: parentId,
        };

        if (typeof window !== 'undefined') {
            if (replyPayload.name) localStorage.setItem('karangwungu_comment_name', replyPayload.name);
            if (replyPayload.email) localStorage.setItem('karangwungu_comment_email', replyPayload.email);
        }

        router.post(`/berita/${post.slug}/komentar`, replyPayload, {
            preserveScroll: true,
            onSuccess: () => {
                replyForm.setData('content', '');
                setReplyingTo(null);
                setReplyProcessing(false);
                setSubmittedSuccess(true);
                setTimeout(() => setSubmittedSuccess(false), 4000);
            },
            onError: (errs) => {
                setReplyProcessing(false);
                setReplyErrors(errs || {});
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

    const newsSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': post.title,
        'image': [
            post.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80'
        ],
        'datePublished': post.published_at,
        'dateModified': post.updated_at,
        'author': [{
            '@type': 'Organization',
            'name': post.author || 'Pemerintah Desa Karangwungu',
            'url': appUrl,
        }],
        'publisher': {
            '@type': 'GovernmentOrganization',
            'name': 'Pemerintah Desa Karangwungu',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
            }
        },
        'description': post.excerpt,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': postUrl,
        }
    };

    return (
        <AppLayout>
            <SeoHead
                title={post.title}
                description={post.excerpt}
                image={post.image}
                type="article"
                schemaData={newsSchema}
                breadcrumbs={[
                    { label: 'Berita & Informasi', url: '/berita' },
                    { label: post.title, url: `/berita/${post.slug}` },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pb-16">
                {/* Back navigation */}
                <div className="mb-4">
                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-amber-400 hover:text-red-700 dark:hover:text-amber-300 transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Kembali ke Semua Berita</span>
                    </Link>
                </div>

                {/* 2-Column Grid: Left (Article Content) + Right (Sidebar Widgets) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: Main Article & Comments (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        <article className="space-y-4">
                            {/* Main Title */}
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight tracking-tight">
                                {post.title}
                            </h1>

                            {/* Metadata bar */}
                            <div className="flex flex-wrap items-center gap-3.5 text-xs text-zinc-600 dark:text-zinc-400 py-2.5 border-y border-zinc-200 dark:border-zinc-800">
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 dark:bg-amber-500/10 border border-red-500/20 dark:border-amber-500/30 text-[11px] font-bold text-red-600 dark:text-amber-400">
                                    <Tag className="h-3 w-3" />
                                    <span>{post.category}</span>
                                </span>
                                <span className="flex items-center gap-1.5 font-bold text-red-600 dark:text-amber-400">
                                    <User className="h-3.5 w-3.5" />
                                    <span>{post.author || 'Pemerintah Desa Karangwungu'}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                    <span>{formatDateIndo(post.published_at)}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Eye className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                                    <span>Dibaca {post.views} kali</span>
                                </span>
                            </div>

                            {/* Featured Image */}
                            {post.image && (
                                <div className="my-6 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-950">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full max-h-[480px] object-cover"
                                    />
                                </div>
                            )}

                            {/* Article Body Content */}
                            <div
                                className="text-zinc-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed space-y-4 my-8 font-normal"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Social Share Buttons Strip */}
                            <div className="p-4 rounded-lg bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 my-8 shadow-sm">
                                <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                                    <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Bagikan Informasi Ini:</span>
                                </span>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow-xs"
                                    >
                                        WhatsApp
                                    </a>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-xs"
                                    >
                                        Facebook
                                    </a>
                                    <button
                                        onClick={handleCopy}
                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-amber-400" /> : null}
                                        <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* COMMENTS SECTION */}
                        <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center">
                                        <MessageSquare className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                                            Tanggapan & Komentar Warga
                                        </h2>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Ruang aspirasi dan diskusi terbuka masyarakat Desa Karangwungu
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900/50 text-xs font-extrabold">
                                    {totalCommentsCount} Komentar
                                </span>
                            </div>

                            {/* Comment Form */}
                            <div className="rounded-lg p-4 sm:p-5 bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3.5">
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                    Tulis Tanggapan
                                </h3>

                                {submittedSuccess && (
                                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 font-medium">
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                        <span>Terima kasih! Komentar Anda berhasil dikirim dan ditayangkan.</span>
                                    </div>
                                )}

                                <form onSubmit={handleCommentSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="Contoh: Budi Santoso"
                                                required
                                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all"
                                            />
                                            {errors.name && (
                                                <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Email / Kontak <span className="text-zinc-400 font-normal">(Opsional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="nama@email.com"
                                                className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all"
                                            />
                                            {errors.email && (
                                                <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Isi Komentar / Masukan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            rows={2}
                                            placeholder="Tuliskan tanggapan atau saran Anda..."
                                            required
                                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                                        />
                                        {errors.content && (
                                            <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.content}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-0.5">
                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                            <span>Komentar publik yang santun & membangun</span>
                                        </span>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-bold hover:from-red-700 hover:to-amber-600 shadow-md shadow-red-600/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                                        >
                                            <Send className="h-3 w-3" />
                                            <span>{processing ? 'Mengirim...' : 'Kirim Komentar'}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Compact Comment List with Replies */}
                            <div className="space-y-2.5">
                                {comments.length === 0 ? (
                                    <div className="p-5 text-center rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-1">
                                        <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Belum ada komentar untuk artikel ini.
                                        </p>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                            Jadilah orang pertama yang memberikan tanggapan melalui formulir di atas!
                                        </p>
                                    </div>
                                ) : (
                                    comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className="p-3.5 rounded-lg bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-2"
                                        >
                                            {/* Parent Comment */}
                                            <div className="flex items-start gap-3">
                                                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                                                    {getInitials(comment.name)}
                                                </div>
                                                <div className="space-y-1 min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                            {comment.name}
                                                        </h4>
                                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 shrink-0">
                                                            {formatDateIndo(comment.created_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                                                        {comment.content}
                                                    </p>

                                                    {/* Reply Toggle Button */}
                                                    <div className="pt-0.5">
                                                        <button
                                                            onClick={() => {
                                                                if (replyingTo === comment.id) {
                                                                    setReplyingTo(null);
                                                                } else {
                                                                    setReplyingTo(comment.id);
                                                                    const savedName = localStorage.getItem('karangwungu_comment_name') || data.name;
                                                                    const savedEmail = localStorage.getItem('karangwungu_comment_email') || data.email;
                                                                    replyForm.setData('name', savedName);
                                                                    replyForm.setData('email', savedEmail);
                                                                }
                                                            }}
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-amber-400 hover:text-red-700 dark:hover:text-amber-300 transition-colors cursor-pointer"
                                                        >
                                                            <CornerDownRight className="h-3 w-3" />
                                                            <span>{replyingTo === comment.id ? 'Batal Balas' : 'Balas'}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Inline Reply Form */}
                                            {replyingTo === comment.id && (
                                                <form
                                                    onSubmit={(e) => handleReplySubmit(e, comment.id)}
                                                    className="ml-10 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 space-y-2.5"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-red-600 dark:text-amber-400">
                                                            Membalas @{comment.name}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setReplyingTo(null)}
                                                            className="text-[10px] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                                        >
                                                            Batal
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            value={replyForm.data.name}
                                                            onChange={(e) => replyForm.setData('name', e.target.value)}
                                                            placeholder="Nama Anda *"
                                                            required
                                                            className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                                                        />
                                                        <input
                                                            type="email"
                                                            value={replyForm.data.email}
                                                            onChange={(e) => replyForm.setData('email', e.target.value)}
                                                            placeholder="Email (Opsional)"
                                                            className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                                                        />
                                                    </div>
                                                    <textarea
                                                        value={replyForm.data.content}
                                                        onChange={(e) => replyForm.setData('content', e.target.value)}
                                                        rows={2}
                                                        placeholder={`Tulis balasan untuk ${comment.name}...`}
                                                        required
                                                        className="w-full px-2.5 py-1 text-xs rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white resize-none"
                                                    />
                                                    {replyErrors.content && (
                                                        <p className="text-[10px] text-red-500 font-medium">{replyErrors.content}</p>
                                                    )}
                                                    <div className="flex justify-end">
                                                        <button
                                                            type="submit"
                                                            disabled={replyProcessing}
                                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gradient-to-r from-red-600 to-amber-500 text-white text-[11px] font-bold shadow-xs hover:from-red-700 hover:to-amber-600 disabled:opacity-50 cursor-pointer"
                                                        >
                                                            <Send className="h-2.5 w-2.5" />
                                                            <span>{replyProcessing ? 'Mengirim...' : 'Kirim Balasan'}</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {/* Nested Replies List */}
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className="mt-2 pl-6 sm:pl-8 space-y-2 border-l-2 border-red-500/20 dark:border-amber-500/20">
                                                    {comment.replies.map((reply) => (
                                                        <div
                                                            key={reply.id}
                                                            className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 flex items-start gap-2.5"
                                                        >
                                                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-red-600 text-white text-[9px] font-black flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                                                                {getInitials(reply.name)}
                                                            </div>
                                                            <div className="space-y-0.5 min-w-0 flex-1">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <div className="flex items-center gap-1.5 min-w-0">
                                                                        <h5 className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">
                                                                            {reply.name}
                                                                        </h5>
                                                                        {reply.name.toLowerCase().includes('admin') || reply.name.toLowerCase().includes('pemdes') ? (
                                                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-amber-400 border border-red-200 dark:border-red-900/50">
                                                                                Admin
                                                                            </span>
                                                                        ) : null}
                                                                    </div>
                                                                    <span className="text-[9px] text-zinc-500 dark:text-zinc-400 shrink-0">
                                                                        {formatDateIndo(reply.created_at)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                                                                    {reply.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Berita Lainnya & Populer - 4 Cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* 1. Berita Terkait / Lainnya */}
                        <div className="rounded-lg p-5 bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider">
                                        Berita Terkait
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/50">
                                    Pilihan
                                </span>
                            </div>

                            <div className="space-y-3.5">
                                {relatedPosts.length === 0 ? (
                                    <p className="text-xs text-zinc-500">Belum ada berita terkait lainnya.</p>
                                ) : (
                                    relatedPosts.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/berita/${item.slug}`}
                                            className="group flex gap-3 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 p-2 -mx-2 rounded-lg transition-colors"
                                        >
                                            <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-zinc-950 relative">
                                                <img
                                                    src={item.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=200&q=80'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="space-y-1 min-w-0 flex-1">
                                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 block truncate">
                                                    {item.category}
                                                </span>
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                                                    {formatDateIndo(item.published_at)}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* 2. Berita Terpopuler (Top Views) */}
                        {popularPosts.length > 0 && (
                            <div className="rounded-lg p-5 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 border border-red-500/40 space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-red-500/30">
                                    <div className="flex items-center gap-2">
                                        <div className="h-7 w-7 rounded-lg bg-black/30 text-amber-300 flex items-center justify-center border border-white/10">
                                            <Flame className="h-4 w-4 text-amber-400" />
                                        </div>
                                        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                                            Paling Populer
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded-full border border-white/15">
                                        Top Views
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {popularPosts.map((item, idx) => (
                                        <Link
                                            key={item.id}
                                            href={`/berita/${item.slug}`}
                                            className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-black/25 transition-colors"
                                        >
                                            <span className="h-6 w-6 rounded-lg bg-amber-400 text-zinc-950 text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                                                {idx + 1}
                                            </span>
                                            <div className="space-y-0.5 min-w-0 flex-1">
                                                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[10px] text-red-200">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3 text-amber-300" />
                                                        <span>{item.views}x dibaca</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
