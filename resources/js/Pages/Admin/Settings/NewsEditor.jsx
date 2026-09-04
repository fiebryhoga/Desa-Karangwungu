import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import RichTextEditor from '@/Components/Admin/RichTextEditor';
import {
    ArrowLeft,
    Save,
    Eye,
    Edit3,
    Upload,
    ImageIcon,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Calendar,
    User,
    Tag,
    MessageSquare,
    ExternalLink,
    ChevronDown,
    Loader2,
    Search,
    Plus,
    X,
    Check,
} from 'lucide-react';

import { getIndoDateTimeLocalNow } from '@/Utils/format';

export default function NewsEditor({ auth, post = null, categories = [] }) {
    const isEditing = Boolean(post && post.id);

    const initialCategories = Array.isArray(post?.categories) && post.categories.length > 0
        ? post.categories
        : (post?.category ? [post.category] : [categories[0] || 'Berita']);

    const { data, setData, post: submitPost, put: submitPut, processing, errors } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        category: initialCategories[0] || 'Berita',
        categories: initialCategories,
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        image: post?.image || '',
        author: post?.author || 'Pemerintah Desa Karangwungu',
        is_featured: post?.is_featured || false,
        published_at: post?.published_at || getIndoDateTimeLocalNow(),
    });

    const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
    const [imageInputMode, setImageInputMode] = useState('upload'); // 'upload' or 'url'
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');
    const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
    const fileInputRef = useRef(null);

    // Custom Category Dropdown State & Handlers
    const [availableCategories, setAvailableCategories] = useState(() => {
        const initial = Array.isArray(categories) ? [...categories] : [];
        initialCategories.forEach((c) => {
            if (!initial.includes(c)) initial.push(c);
        });
        return initial.filter(Boolean);
    });
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const categoryDropdownRef = useRef(null);

    // Click outside to close category dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleCategory = (cat) => {
        const current = Array.isArray(data.categories) ? data.categories : [];
        if (current.includes(cat)) {
            if (current.length === 1) return; // Minimal 1 kategori
            const updated = current.filter((c) => c !== cat);
            setData((prev) => ({
                ...prev,
                categories: updated,
                category: updated[0] || 'Berita',
            }));
        } else {
            if (current.length >= 3) return; // Maksimal 3 kategori
            const updated = [...current, cat];
            setData((prev) => ({
                ...prev,
                categories: updated,
                category: updated[0],
            }));
        }
    };

    const handleAddNewCategory = (rawName) => {
        const trimmed = rawName.trim();
        if (!trimmed) return;

        const existing = availableCategories.find(
            (c) => c.toLowerCase() === trimmed.toLowerCase()
        );
        const categoryToAdd = existing || trimmed;

        if (!availableCategories.includes(categoryToAdd)) {
            setAvailableCategories((prev) => [...prev, categoryToAdd]);
        }

        const current = Array.isArray(data.categories) ? data.categories : [];
        if (!current.includes(categoryToAdd)) {
            if (current.length < 3) {
                const updated = [...current, categoryToAdd];
                setData((prev) => ({
                    ...prev,
                    categories: updated,
                    category: updated[0],
                }));
            }
        }
        setCategorySearch('');
    };

    const removeCategory = (cat) => {
        const current = Array.isArray(data.categories) ? data.categories : [];
        if (current.length <= 1) return; // Minimal 1 kategori
        const updated = current.filter((c) => c !== cat);
        setData((prev) => ({
            ...prev,
            categories: updated,
            category: updated[0] || 'Berita',
        }));
    };

    const filteredCategories = availableCategories.filter((cat) =>
        cat.toLowerCase().includes(categorySearch.toLowerCase().trim())
    );

    // Auto-generate slug from title if not manually customized
    const handleTitleChange = (e) => {
        const titleVal = e.target.value;
        setData((prev) => {
            const shouldUpdateSlug = !isEditing || !prev.slug || prev.slug === slugify(prev.title);
            return {
                ...prev,
                title: titleVal,
                slug: shouldUpdateSlug ? slugify(titleVal) : prev.slug,
            };
        });
    };

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    };

    // Upload cover image
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
            setImageUploadError('Format berkas gambar harus JPG, PNG, WEBP, atau GIF');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            setImageUploadError('Ukuran gambar maksimal 4 MB');
            return;
        }

        setImageUploadError('');
        setUploadingImage(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/portal-karangwungu/settings/news/upload-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                },
                body: formData,
            });

            const result = await res.json();
            if (result.success && result.url) {
                setData('image', result.url);
            } else {
                setImageUploadError(result.message || 'Gagal mengunggah gambar');
            }
        } catch (err) {
            console.error(err);
            setImageUploadError('Terjadi kesalahan saat mengunggah gambar ke server');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setImageUploadError('');

        if (isEditing) {
            submitPut(`/portal-karangwungu/settings/news/${post.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setSaveSuccessMsg('Perubahan artikel berhasil disimpan!');
                    setTimeout(() => setSaveSuccessMsg(''), 4000);
                },
            });
        } else {
            submitPost('/portal-karangwungu/settings/news', {
                onSuccess: () => {
                    // Redirects to news listing
                },
            });
        }
    };

    return (
        <AdminLayout
            title={isEditing ? `Edit Berita: ${post.title}` : 'Tulis Warta Berita Baru'}
            auth={auth}
        >
            <Head title={isEditing ? `Edit Berita: ${post.title}` : 'Tulis Warta Berita Baru - Admin Karangwungu'} />

            <div className="space-y-6">
                {/* Standard Admin Header */}
                <AdminPageHeader
                    icon={Edit3}
                    title={isEditing ? 'Edit Warta Berita Desa' : 'Tulis Warta Berita Baru'}
                    description={
                        isEditing
                            ? `Perbarui isi berita, sampul foto, status headline, dan informasi warta desa.`
                            : 'Tulis naskah berita, informasi kegiatan, atau pengumuman resmi desa untuk warga.'
                    }
                    breadcrumbs={[
                        { label: 'Admin', href: '/portal-karangwungu/dashboard' },
                        { label: 'Pengaturan Website', href: '/portal-karangwungu/settings/dashboard' },
                        { label: 'Warta & Berita Desa', href: '/portal-karangwungu/settings/news' },
                        { label: isEditing ? 'Edit Berita' : 'Tulis Berita Baru' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <Link
                                href="/portal-karangwungu/settings/news"
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-2xs cursor-pointer"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                <span>Kembali ke Berita</span>
                            </Link>
                            {isEditing && (
                                <>
                                    <a
                                        href={`/berita/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-2xs"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                                        <span>Lihat di Portal</span>
                                    </a>
                                    <Link
                                        href={`/portal-karangwungu/settings/news/${post.id}/comments`}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-2xs"
                                    >
                                        <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Komentar ({post.comments_count || 0})</span>
                                    </Link>
                                </>
                            )}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 shadow-md shadow-red-600/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Berita'}</span>
                            </button>
                        </div>
                    }
                />

                {saveSuccessMsg && (
                    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-xs">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{saveSuccessMsg}</span>
                    </div>
                )}

                {/* 2-Column Responsive Layout */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT COLUMN: Main Editorial Content (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Title & Slug & Excerpt */}
                        <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                            <div>
                                <label className="block text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5">
                                    Judul Warta Berita <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="Contoh: Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap III"
                                    required
                                    className="w-full px-3.5 py-2.5 text-sm sm:text-base font-bold rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 transition-all"
                                />
                                {errors.title && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                                    Permalink / Slug URL
                                </label>
                                <div className="flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-500">
                                    <span className="shrink-0 text-zinc-400 font-mono">/berita/</span>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', slugify(e.target.value))}
                                        placeholder="penyaluran-blt-dana-desa"
                                        className="w-full bg-transparent border-none text-xs font-mono font-medium text-zinc-900 dark:text-white focus:outline-none px-1"
                                    />
                                </div>
                                {errors.slug && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.slug}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="block text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                        Ringkasan Singkat / Excerpt <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-[11px] text-zinc-400">
                                        {data.excerpt.length}/500 karakter
                                    </span>
                                </div>
                                <textarea
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={2}
                                    maxLength={500}
                                    placeholder="Tuliskan 1-2 kalimat ringkasan yang menarik untuk cuplikan berita di portal publik dan media sosial..."
                                    required
                                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500 transition-all resize-none"
                                />
                                {errors.excerpt && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.excerpt}</p>
                                )}
                            </div>
                        </div>

                        {/* Rich Content Editor & Live Preview */}
                        <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                <div>
                                    <h3 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                        Isi Berita Lengkap <span className="text-red-500">*</span>
                                    </h3>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                        Tulis dan format naskah berita secara visual tanpa perlu menulis tag HTML manual.
                                    </p>
                                </div>

                                {/* Mode switcher: Write vs Preview */}
                                <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('write')}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            activeTab === 'write'
                                                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <Edit3 className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                        <span>Editor Visual</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('preview')}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            activeTab === 'preview'
                                                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                    >
                                        <Eye className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                        <span>Live Pratinjau</span>
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'write' ? (
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(html) => setData('content', html)}
                                    placeholder="Tuliskan naskah berita lengkap di sini..."
                                    error={errors.content}
                                />
                            ) : (
                                /* Live Preview Tab */
                                <div className="p-6 rounded-lg bg-zinc-50/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 min-h-[420px]">
                                    <div className="max-w-3xl mx-auto space-y-4">
                                        <div className="flex flex-wrap items-center gap-1.5">
                                            {(data.categories && data.categories.length > 0 ? data.categories : [data.category]).map((cat, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 text-xs font-bold border border-red-500/20 dark:border-amber-500/30"
                                                >
                                                    <Tag className="h-2.5 w-2.5" />
                                                    <span>{cat}</span>
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                                            {data.title || 'Judul Berita Akan Ditampilkan Di Sini'}
                                        </h1>
                                        <div className="flex items-center gap-3 text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <span>Oleh: {data.author}</span>
                                            <span>•</span>
                                            <span>{data.published_at?.slice(0, 10)}</span>
                                        </div>

                                        {data.image && (
                                            <div className="rounded-lg overflow-hidden max-h-[360px] border border-zinc-200 dark:border-zinc-800 shadow-xs">
                                                <img
                                                    src={data.image}
                                                    alt={data.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <p className="text-sm font-semibold italic text-zinc-700 dark:text-zinc-300">
                                            {data.excerpt || 'Ringkasan berita akan tampil di sini.'}
                                        </p>

                                        <div
                                            className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 space-y-3 pt-2"
                                            dangerouslySetInnerHTML={{
                                                __html: data.content || '<p class="text-zinc-400 italic">Isi artikel berita masih kosong...</p>',
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Publishing Controls & Cover Image (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Publishing Box */}
                        <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                            <h3 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                Pengaturan Publikasi
                            </h3>

                            {/* Custom Multi-Category Dropdown (1 to 3 categories, can add new) */}
                            <div className="relative" ref={categoryDropdownRef}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Kategori Warta <span className="text-red-500">*</span>
                                    </label>
                                    <span className="text-[10px] font-semibold text-zinc-400">
                                        {data.categories?.length || 0}/3 dipilih
                                    </span>
                                </div>

                                {/* Custom Dropdown Trigger Box */}
                                <div
                                    onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                                    className={`w-full min-h-[38px] p-1.5 pr-8 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border transition-all cursor-pointer flex flex-wrap items-center gap-1.5 relative ${
                                        isCategoryDropdownOpen
                                            ? 'border-red-500 dark:border-amber-500 ring-2 ring-red-500/20 dark:ring-amber-500/20 bg-white dark:bg-zinc-900'
                                            : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                                    }`}
                                >
                                    {data.categories && data.categories.length > 0 ? (
                                        data.categories.map((cat) => (
                                            <span
                                                key={cat}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-500/10 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 border border-red-500/20 dark:border-amber-500/30 text-xs font-bold shadow-2xs"
                                            >
                                                <Tag className="h-2.5 w-2.5 shrink-0" />
                                                <span className="truncate max-w-[120px]">{cat}</span>
                                                {data.categories.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeCategory(cat);
                                                        }}
                                                        className="p-0.5 -mr-0.5 hover:bg-red-500/20 dark:hover:bg-amber-500/20 rounded text-red-600 dark:text-amber-400 transition-colors cursor-pointer"
                                                        title={`Hapus kategori ${cat}`}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-zinc-400 px-1">
                                            Pilih kategori warta...
                                        </span>
                                    )}

                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none transition-transform">
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-red-500 dark:text-amber-400' : ''}`} />
                                    </div>
                                </div>

                                {errors.categories && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.categories}</p>
                                )}
                                {errors.category && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.category}</p>
                                )}

                                {/* Dropdown Menu Panel */}
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1.5 z-40 p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
                                        {/* Search & Add New Input */}
                                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                                            <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                            <input
                                                type="text"
                                                value={categorySearch}
                                                onChange={(e) => setCategorySearch(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddNewCategory(categorySearch);
                                                    }
                                                }}
                                                placeholder="Cari atau ketik baru..."
                                                className="w-full bg-transparent text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                                            />
                                            {categorySearch.trim() && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddNewCategory(categorySearch)}
                                                    disabled={data.categories.length >= 3}
                                                    className="px-2 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 text-white text-[10px] font-bold shrink-0 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                                                    title="Tambah kategori baru"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                    <span>Tambah</span>
                                                </button>
                                            )}
                                        </div>

                                        {/* Selection info helper */}
                                        <div className="flex items-center justify-between text-[10px] text-zinc-400 px-1">
                                            <span>Pilih 1 - 3 kategori</span>
                                            <span className={data.categories.length >= 3 ? 'text-amber-500 font-bold' : ''}>
                                                {data.categories.length >= 3 ? 'Maksimal 3 tercapai' : `Sisa ${3 - data.categories.length} slot`}
                                            </span>
                                        </div>

                                        {/* Categories List */}
                                        <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                            {filteredCategories.length > 0 ? (
                                                filteredCategories.map((cat) => {
                                                    const isSelected = data.categories.includes(cat);
                                                    const isMaxReached = !isSelected && data.categories.length >= 3;

                                                    return (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            onClick={() => toggleCategory(cat)}
                                                            disabled={isMaxReached}
                                                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left ${
                                                                isSelected
                                                                    ? 'bg-red-50 dark:bg-amber-500/10 text-red-600 dark:text-amber-400 font-bold border border-red-200/80 dark:border-amber-500/30'
                                                                    : isMaxReached
                                                                    ? 'opacity-40 cursor-not-allowed text-zinc-400'
                                                                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-2 min-w-0">
                                                                <Tag className={`h-3 w-3 shrink-0 ${isSelected ? 'text-red-600 dark:text-amber-400' : 'text-zinc-400'}`} />
                                                                <span className="truncate">{cat}</span>
                                                            </div>
                                                            {isSelected ? (
                                                                <Check className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                                            ) : isMaxReached ? (
                                                                <span className="text-[9px] text-zinc-400">Penuh</span>
                                                            ) : (
                                                                <Plus className="h-3.5 w-3.5 text-zinc-400 opacity-40 hover:opacity-100 shrink-0" />
                                                            )}
                                                        </button>
                                                    );
                                                })
                                            ) : (
                                                <div className="p-3 text-center space-y-2">
                                                    <p className="text-xs text-zinc-400">
                                                        Kategori <strong>"{categorySearch}"</strong> belum ada.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddNewCategory(categorySearch)}
                                                        disabled={data.categories.length >= 3}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-bold hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        <span>Buat & Pilih "{categorySearch.trim()}"</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    Penulis / Redaksi
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.author}
                                        onChange={(e) => setData('author', e.target.value)}
                                        placeholder="Pemerintah Desa Karangwungu"
                                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500"
                                    />
                                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                                </div>
                                {errors.author && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.author}</p>
                                )}
                            </div>

                            {/* Published At */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    Tanggal & Waktu Publikasi
                                </label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) => setData('published_at', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500"
                                    />
                                    <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                                </div>
                                {errors.published_at && (
                                    <p className="text-xs text-red-500 mt-1 font-medium">{errors.published_at}</p>
                                )}
                            </div>

                            {/* Headline / Featured Toggle */}
                            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                <label className="flex items-center justify-between cursor-pointer group">
                                    <div>
                                        <div className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 transition-colors flex items-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                            <span>Jadikan Berita Utama</span>
                                        </div>
                                        <p className="text-[11px] text-zinc-500">
                                            Ditampilkan di banner berita portal depan
                                        </p>
                                    </div>
                                    <div className="relative inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-5.5 bg-zinc-200 peer-focus:outline-none rounded-lg peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-lg after:h-4.5 after:w-4.5 after:transition-all dark:border-zinc-600 peer-checked:bg-amber-500"></div>
                                    </div>
                                </label>
                            </div>

                            {/* Submit Button in Sidebar */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-red-600/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {processing ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    <span>{isEditing ? 'Simpan Perubahan Artikel' : 'Terbitkan Artikel Sekarang'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Cover Image Upload Card */}
                        <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                    Foto Sampul / Cover
                                </h3>
                                <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 text-[10px] font-bold">
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('upload')}
                                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                            imageInputMode === 'upload'
                                                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                    >
                                        Upload File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setImageInputMode('url')}
                                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                                            imageInputMode === 'url'
                                                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                                                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                        }`}
                                    >
                                        Tautan URL
                                    </button>
                                </div>
                            </div>

                            {/* Cover Preview */}
                            {data.image ? (
                                <div className="space-y-2">
                                    <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-950 aspect-video shadow-xs group">
                                        <img
                                            src={data.image}
                                            alt="Pratinjau Cover"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-2.5 py-1.5 rounded-lg bg-white/90 text-zinc-900 text-[11px] font-bold hover:bg-white shadow-xs cursor-pointer"
                                            >
                                                Ganti Gambar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setData('image', '')}
                                                className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 shadow-xs cursor-pointer"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 dark:hover:border-amber-500 rounded-lg p-6 text-center cursor-pointer transition-colors bg-zinc-50/50 dark:bg-zinc-800/30"
                                >
                                    <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Klik untuk memilih berkas gambar
                                    </p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">
                                        PNG, JPG, WEBP maks 4 MB
                                    </p>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                            />

                            {uploadingImage && (
                                <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    <span>Sedang mengunggah gambar ke server...</span>
                                </div>
                            )}

                            {imageUploadError && (
                                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-1.5">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                                    <span>{imageUploadError}</span>
                                </div>
                            )}

                            {/* Direct URL input mode */}
                            {imageInputMode === 'url' && (
                                <div>
                                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                                        Tautan Langsung Gambar (URL)
                                    </label>
                                    <input
                                        type="url"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
