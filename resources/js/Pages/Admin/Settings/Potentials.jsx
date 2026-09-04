import React, { useState, useMemo } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Sparkles,
    Search,
    Plus,
    Trash2,
    Save,
    ExternalLink,
    AlertTriangle,
    Upload,
    Loader2,
    Image as ImageIcon,
    CheckCircle2,
    X,
    ChevronRight,
    MapPin,
    Phone,
    MessageCircle,
    Clock,
    Tag,
    ShoppingBag,
    ShieldCheck,
    Layers,
    DollarSign,
    Copy,
    Store,
    Wheat,
    Fish,
    Award,
    Eye,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';

const CATEGORY_COLORS = {
    'Perikanan Tambak': 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    'Pertanian': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    'UMKM Makanan': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    'Kerajinan': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    'Peternakan': 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
    'Industri Kreatif': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    'Jasa & Perdagangan': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    'Pariwisata & Budaya': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    'Lainnya': 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20',
};

const DEFAULT_BLANK_POTENTIAL = {
    title: '',
    slug: '',
    category: 'UMKM Makanan',
    description: '',
    content: '',
    owner_name: '',
    contact_phone: '',
    contact_whatsapp: '',
    location: '',
    gmaps_url: '',
    operating_hours: 'Setiap Hari, 08.00 - 17.00 WIB',
    price_range: '',
    certification: '',
    production_capacity: '',
    min_order: '',
    image: '',
    logo: '',
    features: ['Bahan baku berkualitas tinggi', 'Diproduksi langsung oleh warga desa'],
    gallery: [],
    products: [],
};

export default function PotentialsSettings({ potentials = [], categories = [] }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // List search & category filter
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Semua');

    // Selection state: null (no selection), 'new' (creating), or potential object
    const [selectedId, setSelectedId] = useState(() => (potentials.length > 0 ? potentials[0].id : 'new'));
    const [formData, setFormData] = useState(() => {
        if (potentials.length > 0) {
            return { ...potentials[0] };
        }
        return { ...DEFAULT_BLANK_POTENTIAL };
    });

    // Active Tab in the editor panel
    const [activeTab, setActiveTab] = useState('info'); // 'info' | 'contact' | 'specs' | 'media' | 'products'

    // Status states
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);
    const [uploadingProductIdx, setUploadingProductIdx] = useState(null);

    // Delete confirmation modal state
    const [itemToDelete, setItemToDelete] = useState(null);

    // Active product being edited in product modal (optional, or inline)
    const [editingProductIdx, setEditingProductIdx] = useState(null);

    // Filtered list
    const filteredPotentials = useMemo(() => {
        return potentials.filter((item) => {
            const matchesCategory =
                selectedCategoryFilter === 'Semua' || item.category === selectedCategoryFilter;
            const q = searchQuery.toLowerCase();
            const matchesSearch =
                !searchQuery.trim() ||
                item.title?.toLowerCase().includes(q) ||
                item.owner_name?.toLowerCase().includes(q) ||
                item.category?.toLowerCase().includes(q) ||
                item.location?.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });
    }, [potentials, searchQuery, selectedCategoryFilter]);

    // Handle switching selected potential
    const handleSelectPotential = (item) => {
        setSelectedId(item.id);
        setFormData({
            ...item,
            features: Array.isArray(item.features) ? item.features : [],
            gallery: Array.isArray(item.gallery) ? item.gallery : [],
            products: Array.isArray(item.products) ? item.products : [],
        });
        setActiveTab('info');
    };

    // Handle new potential creation click
    const handleAddNewClick = () => {
        setSelectedId('new');
        setFormData({
            ...DEFAULT_BLANK_POTENTIAL,
            features: ['Bahan baku berkualitas tinggi', 'Diproduksi langsung oleh warga Karangwungu'],
            gallery: [],
            products: [],
        });
        setActiveTab('info');
    };

    // Form field updater helper
    const updateField = (field, value) => {
        setFormData((prev) => {
            const next = { ...prev, [field]: value };
            // Auto generate slug if title is changing and we are creating or slug is empty
            if (field === 'title' && (selectedId === 'new' || !prev.slug)) {
                next.slug = value
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, '')
                    .trim()
                    .replace(/\s+/g, '-');
            }
            return next;
        });
    };

    // Features list handlers
    const handleAddFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...(prev.features || []), ''],
        }));
    };

    const handleUpdateFeature = (idx, val) => {
        setFormData((prev) => {
            const list = [...(prev.features || [])];
            list[idx] = val;
            return { ...prev, features: list };
        });
    };

    const handleRemoveFeature = (idx) => {
        setFormData((prev) => {
            const list = (prev.features || []).filter((_, i) => i !== idx);
            return { ...prev, features: list };
        });
    };

    // Gallery list handlers
    const handleAddGalleryUrl = (url) => {
        if (!url || !url.trim()) return;
        setFormData((prev) => ({
            ...prev,
            gallery: [...(prev.gallery || []), url.trim()],
        }));
    };

    const handleRemoveGallery = (idx) => {
        setFormData((prev) => {
            const list = (prev.gallery || []).filter((_, i) => i !== idx);
            return { ...prev, gallery: list };
        });
    };

    // Auto-sync gallery images from products list
    const handleSyncGalleryWithProducts = () => {
        const productImgs = (formData.products || [])
            .map((p) => p.image)
            .filter((img) => img && typeof img === 'string' && img.trim().length > 0);

        if (productImgs.length === 0) {
            alert('Belum ada foto pada daftar produk untuk disinkronkan.');
            return;
        }

        const newGallery = Array.from(new Set([...(formData.gallery || []), ...productImgs]));
        setFormData((prev) => ({
            ...prev,
            image: prev.image && !prev.image.includes('photo-1555897209') && !prev.image.includes('photo-1498654896293') && !prev.image.includes('photo-1516467508483')
                ? prev.image
                : productImgs[0],
            gallery: newGallery,
        }));
    };

    // Products list handlers
    const handleAddProduct = () => {
        const newProd = {
            id: `prod-${Date.now()}`,
            name: '',
            price: 'Rp ',
            price_number: 0,
            unit: 'per kg',
            stock_status: 'Tersedia Harian',
            min_order: '1 kg',
            description: '',
            image: '',
        };
        setFormData((prev) => {
            const updated = [...(prev.products || []), newProd];
            return { ...prev, products: updated };
        });
        setEditingProductIdx((formData.products || []).length);
    };

    const handleUpdateProduct = (idx, field, value) => {
        setFormData((prev) => {
            const prods = [...(prev.products || [])];
            prods[idx] = { ...prods[idx], [field]: value };
            return { ...prev, products: prods };
        });
    };

    const handleRemoveProduct = (idx) => {
        setFormData((prev) => {
            const prods = (prev.products || []).filter((_, i) => i !== idx);
            return { ...prev, products: prods };
        });
        if (editingProductIdx === idx) {
            setEditingProductIdx(null);
        } else if (editingProductIdx > idx) {
            setEditingProductIdx(editingProductIdx - 1);
        }
    };

    const handleMoveProduct = (idx, direction) => {
        setFormData((prev) => {
            const prods = [...(prev.products || [])];
            const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
            if (targetIdx < 0 || targetIdx >= prods.length) return prev;
            const temp = prods[idx];
            prods[idx] = prods[targetIdx];
            prods[targetIdx] = temp;
            return { ...prev, products: prods };
        });
    };

    // Image Upload Handlers
    const getCsrfToken = () =>
        document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const handleBannerUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        const form = new FormData();
        form.append('image_file', file);
        try {
            const res = await fetch(`/${adminPath}/settings/potentials/upload-image`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
                body: form,
            });
            const data = await res.json();
            if (res.ok && data?.url) {
                updateField('image', data.url);
            } else {
                alert(data?.message || 'Gagal mengunggah foto banner');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengunggah foto');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingLogo(true);
        const form = new FormData();
        form.append('logo_file', file);
        try {
            const res = await fetch(`/${adminPath}/settings/potentials/upload-logo`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
                body: form,
            });
            const data = await res.json();
            if (res.ok && data?.url) {
                updateField('logo', data.url);
            } else {
                alert(data?.message || 'Gagal mengunggah logo');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengunggah logo');
        } finally {
            setUploadingLogo(false);
            e.target.value = '';
        }
    };

    const handleGalleryUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingGallery(true);
        const form = new FormData();
        form.append('gallery_file', file);
        try {
            const res = await fetch(`/${adminPath}/settings/potentials/upload-gallery`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
                body: form,
            });
            const data = await res.json();
            if (res.ok && data?.url) {
                handleAddGalleryUrl(data.url);
            } else {
                alert(data?.message || 'Gagal mengunggah foto galeri');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengunggah foto');
        } finally {
            setUploadingGallery(false);
            e.target.value = '';
        }
    };

    const handleProductPhotoUpload = async (e, idx) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingProductIdx(idx);
        const form = new FormData();
        form.append('product_file', file);
        try {
            const res = await fetch(`/${adminPath}/settings/potentials/upload-product-image`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': getCsrfToken(), Accept: 'application/json' },
                body: form,
            });
            const data = await res.json();
            if (res.ok && data?.url) {
                handleUpdateProduct(idx, 'image', data.url);
            } else {
                alert(data?.message || 'Gagal mengunggah foto produk');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengunggah foto produk');
        } finally {
            setUploadingProductIdx(null);
            e.target.value = '';
        }
    };

    // Save submit handler
    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        if (!formData.title?.trim()) {
            alert('Judul potensi atau nama usaha wajib diisi!');
            setActiveTab('info');
            return;
        }

        if (!formData.category?.trim()) {
            alert('Kategori potensi wajib dipilih!');
            setActiveTab('info');
            return;
        }

        if (!formData.description?.trim()) {
            alert('Ringkasan singkat potensi wajib diisi!');
            setActiveTab('info');
            return;
        }

        setSaving(true);

        const payload = {
            ...formData,
            features: (formData.features || []).filter((f) => f && f.trim()),
            gallery: (formData.gallery || []).filter((g) => g && g.trim()),
            products: formData.products || [],
        };

        if (selectedId === 'new') {
            router.post(`/${adminPath}/settings/potentials`, payload, {
                onSuccess: () => {
                    setSaving(false);
                },
                onError: (err) => {
                    setSaving(false);
                    console.error('Error saving potential:', err);
                },
            });
        } else {
            router.put(`/${adminPath}/settings/potentials/${selectedId}`, payload, {
                onSuccess: () => {
                    setSaving(false);
                },
                onError: (err) => {
                    setSaving(false);
                    console.error('Error updating potential:', err);
                },
            });
        }
    };

    // Delete confirm action
    const handleConfirmDelete = () => {
        if (!itemToDelete) return;
        router.delete(`/${adminPath}/settings/potentials/${itemToDelete.id}`, {
            onSuccess: () => {
                setItemToDelete(null);
                if (selectedId === itemToDelete.id) {
                    setSelectedId(potentials.length > 1 ? potentials.find((p) => p.id !== itemToDelete.id)?.id : 'new');
                }
            },
        });
    };

    return (
        <AdminLayout title="Konfigurasi Potensi & UMKM Desa">
            <div className="space-y-6">
                {/* Header with Title & Top Actions */}
                <AdminPageHeader
                    title="Konfigurasi Potensi & UMKM Desa"
                    description="Kelola katalog potensi unggulan, komoditas pertanian, perikanan, peternakan, serta produk UMKM warga Desa Karangwungu secara lengkap dan terstruktur."
                    breadcrumbs={[
                        { label: 'Panel Administrator', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Potensi & UMKM' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href="/potensi"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-300/60 dark:border-zinc-700/60 shadow-sm"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat Publik</span>
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                            </a>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={saving}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 rounded-lg shadow-sm shadow-amber-900/20 transition-all disabled:opacity-50"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-3.5 h-3.5" />
                                        <span>Simpan Perubahan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    }
                />

                {/* Main Split Layout: Left Catalog Sidebar & Right Form Editor */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT PANEL: Catalog List & Filter (4 cols on lg) */}
                    <div className="lg:col-span-4 bg-white dark:bg-zinc-900/90 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-180px)]">
                        {/* Sidebar Header & Search */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-zinc-50/70 dark:bg-zinc-900/50">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                                            Daftar Potensi & UMKM
                                        </h3>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                            Total {potentials.length} komoditas
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddNewClick}
                                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs ${
                                        selectedId === 'new'
                                            ? 'bg-red-700 text-white ring-2 ring-red-500/50'
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                    }`}
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Tambah</span>
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Cari potensi, pemilik, atau kategori..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter Pills */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategoryFilter('Semua')}
                                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md shrink-0 transition-colors ${
                                        selectedCategoryFilter === 'Semua'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300/70 dark:hover:bg-zinc-700'
                                    }`}
                                >
                                    Semua ({potentials.length})
                                </button>
                                {categories.map((cat) => {
                                    const count = potentials.filter((p) => p.category === cat).length;
                                    if (count === 0 && selectedCategoryFilter !== cat) return null;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setSelectedCategoryFilter(cat)}
                                            className={`px-2 py-1 text-[11px] font-semibold rounded-md shrink-0 transition-colors ${
                                                selectedCategoryFilter === cat
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300/70 dark:hover:bg-zinc-700'
                                            }`}
                                        >
                                            {cat} ({count})
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* List Items */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-transparent">
                            {selectedId === 'new' && (
                                <div className="p-3 rounded-lg border-2 border-dashed border-red-500 bg-red-50/50 dark:bg-red-950/20 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-red-700 dark:text-red-400">
                                            Sedang Menambah Potensi Baru...
                                        </p>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                            {formData.title || 'Isi formulir di sebelah kanan'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {filteredPotentials.length === 0 ? (
                                <div className="p-8 text-center space-y-2 text-zinc-400">
                                    <Sparkles className="w-8 h-8 mx-auto opacity-40 text-zinc-400" />
                                    <p className="text-xs">Tidak ada data potensi yang sesuai pencarian.</p>
                                </div>
                            ) : (
                                filteredPotentials.map((item) => {
                                    const isSelected = selectedId === item.id;
                                    const categoryColor =
                                        CATEGORY_COLORS[item.category] || CATEGORY_COLORS['Lainnya'];
                                    const productCount = Array.isArray(item.products) ? item.products.length : 0;

                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => handleSelectPotential(item)}
                                            className={`group relative p-3 rounded-lg border transition-all cursor-pointer ${
                                                isSelected
                                                    ? 'bg-red-500/10 dark:bg-red-950/40 border-red-500/80 dark:border-red-500/60 shadow-sm ring-1 ring-red-500/20'
                                                    : 'bg-zinc-50/70 dark:bg-zinc-800/40 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/90 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Thumbnail */}
                                                <div className="w-14 h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 relative">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : item.logo ? (
                                                        <img
                                                            src={item.logo}
                                                            alt={item.title}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                                            <Sparkles className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="min-w-0 flex-1 space-y-1">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <span
                                                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded border ${categoryColor}`}
                                                        >
                                                            {item.category}
                                                        </span>
                                                        {productCount > 0 && (
                                                            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded border border-zinc-200 dark:border-zinc-700">
                                                                {productCount} Produk
                                                            </span>
                                                        )}
                                                    </div>

                                                    <h4 className={`text-xs font-bold line-clamp-1 leading-snug transition-colors ${
                                                        isSelected
                                                            ? 'text-red-700 dark:text-amber-400'
                                                            : 'text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-amber-300'
                                                    }`}>
                                                        {item.title}
                                                    </h4>

                                                    {item.owner_name && (
                                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 truncate transition-colors">
                                                            Pengelola: {item.owner_name}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Quick Delete Action */}
                                                <button
                                                    type="button"
                                                    title="Hapus Potensi"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setItemToDelete(item);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/60 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Detail Form Editor (8 cols on lg) */}
                    <div className="lg:col-span-8 bg-white dark:bg-zinc-900/90 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                        {/* Editor Header with Selected Item Details */}
                        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5 min-w-0">
                                {/* Thumbnail Preview Box */}
                                <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt={formData.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : formData.logo ? (
                                        <img
                                            src={formData.logo}
                                            alt={formData.title}
                                            className="w-full h-full object-contain p-1.5"
                                        />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-red-600 dark:text-amber-400" />
                                    )}
                                </div>

                                {/* Title & Metadata */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md border bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                                            {formData.category || 'Kategori'}
                                        </span>
                                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                            {selectedId === 'new' ? 'Item Baru' : `Slug: ${formData.slug || '-'}`}
                                        </span>
                                    </div>
                                    <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white truncate mt-0.5">
                                        {formData.title || (selectedId === 'new' ? 'Tambah Komoditas / UMKM Baru' : 'Edit Potensi')}
                                    </h2>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                        {formData.owner_name ? `Pengelola: ${formData.owner_name}` : 'Potensi Unggulan Desa Karangwungu'}
                                        {formData.location ? ` • ${formData.location}` : ''}
                                    </p>
                                </div>
                            </div>

                            {/* Quick Action on Right */}
                            {selectedId !== 'new' && (
                                <button
                                    type="button"
                                    onClick={() => setItemToDelete(potentials.find((p) => p.id === selectedId))}
                                    className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors shrink-0"
                                    title="Hapus komoditas ini"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Subtabs Navigation Bar on its own full-width row */}
                        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 sm:px-5 flex gap-2 overflow-x-auto">
                            {[
                                { id: 'info', label: 'Profil Utama', icon: Store },
                                { id: 'contact', label: 'Kontak & Lokasi', icon: Phone },
                                { id: 'specs', label: 'Spesifikasi & Fitur', icon: ShieldCheck },
                                { id: 'media', label: 'Media & Galeri', icon: ImageIcon },
                                { id: 'products', label: `Katalog Produk (${formData.products?.length || 0})`, icon: ShoppingBag },
                            ].map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                                            isActive
                                                ? 'border-red-600 text-red-600 dark:text-amber-400 dark:border-amber-400'
                                                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-red-600 dark:text-amber-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Editor Tab Contents */}
                        <div className="p-5 sm:p-6 space-y-6">
                            {/* TAB 1: INFORMASI POKOK */}
                            {activeTab === 'info' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                        {/* Title */}
                                        <div className="sm:col-span-8 space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Nama Potensi / Usaha / Komoditas <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Contoh: Budidaya Ikan Bandeng & Udang Vaname"
                                                value={formData.title || ''}
                                                onChange={(e) => updateField('title', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div className="sm:col-span-4 space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Kategori <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={formData.category || 'UMKM Makanan'}
                                                onChange={(e) => updateField('category', e.target.value)}
                                                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none font-medium"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Slug URL */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                            <span>Slug URL (Permalink Publik)</span>
                                            <span className="text-[11px] text-zinc-400 font-normal">
                                                URL: /potensi/{formData.slug || 'slug-url'}
                                            </span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-r-0 border-zinc-300 dark:border-zinc-700 rounded-l-lg select-none">
                                                /potensi/
                                            </span>
                                            <input
                                                type="text"
                                                value={formData.slug || ''}
                                                onChange={(e) => updateField('slug', e.target.value)}
                                                className="flex-1 -ml-2 px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Excerpt / Description */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Ringkasan Singkat (Muncul di Kartu Katalog & Preview) <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            placeholder="Deskripsi ringkas 1-2 kalimat mengenai komoditas atau usaha ini..."
                                            value={formData.description || ''}
                                            onChange={(e) => updateField('description', e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none leading-relaxed"
                                        />
                                    </div>

                                    {/* Full Content / Article */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                            <span>Cerita & Ulasan Lengkap Komoditas</span>
                                            <span className="text-[11px] text-zinc-400 font-normal">
                                                Mendukung beberapa paragraf cerita komoditas
                                            </span>
                                        </label>
                                        <textarea
                                            rows={8}
                                            placeholder="Tuliskan sejarah, latar belakang, metode budidaya, atau keunikan komoditas ini secara lengkap..."
                                            value={formData.content || ''}
                                            onChange={(e) => updateField('content', e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none leading-relaxed font-mono"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: KONTAK & LOKASI */}
                            {activeTab === 'contact' && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Owner Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Nama Pemilik / Kelompok Tani / Pengelola
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Bpk. H. Sukardi / Pokdakan"
                                                value={formData.owner_name || ''}
                                                onChange={(e) => updateField('owner_name', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Phone Number */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Nomor Telepon
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="0812-3456-7890"
                                                value={formData.contact_phone || ''}
                                                onChange={(e) => updateField('contact_phone', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* WhatsApp Number */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Nomor WhatsApp (Pemesanan Langsung)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="081234567890"
                                                value={formData.contact_whatsapp || ''}
                                                onChange={(e) => updateField('contact_whatsapp', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Location Address */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Alamat / Lokasi Kandang / Tempat Usaha
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Dusun Karanganyar RT 02/RW 01, Desa Karangwungu, Lamongan"
                                            value={formData.location || ''}
                                            onChange={(e) => updateField('location', e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Google Maps Link */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Tautan Google Maps
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="https://maps.google.com/?q=..."
                                                value={formData.gmaps_url || ''}
                                                onChange={(e) => updateField('gmaps_url', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Operating Hours */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Jam Operasional / Kunjungan
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Setiap Hari, 07.00 - 17.00 WIB"
                                                value={formData.operating_hours || ''}
                                                onChange={(e) => updateField('operating_hours', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: SPESIFIKASI & FITUR */}
                            {activeTab === 'specs' && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Price Range */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Rentang Harga Umum
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Rp 25.000 - Rp 85.000 / kg"
                                                value={formData.price_range || ''}
                                                onChange={(e) => updateField('price_range', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Certification */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Sertifikasi & Mutu / Pengawasan
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Sertifikasi Halal / P-IRT / Uji Puskeswan"
                                                value={formData.certification || ''}
                                                onChange={(e) => updateField('certification', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Capacity */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Kapasitas Produksi / Panen
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: 500 - 700 butir / hari atau 2 Ton / Panen"
                                                value={formData.production_capacity || ''}
                                                onChange={(e) => updateField('production_capacity', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>

                                        {/* Min Order */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Minimal Pemesanan Umum
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: 1 kg / 1 box / 1 tray"
                                                value={formData.min_order || ''}
                                                onChange={(e) => updateField('min_order', e.target.value)}
                                                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Features / Highlights List */}
                                    <div className="space-y-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                    Poin Keunggulan & Layanan Utama
                                                </h4>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Daftar keunggulan produk/komoditas yang ditampilkan dalam checklist hijau.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleAddFeature}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Tambah Poin</span>
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {(formData.features || []).map((feat, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                                                        ✓
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Tuliskan poin keunggulan..."
                                                        value={feat}
                                                        onChange={(e) => handleUpdateFeature(idx, e.target.value)}
                                                        className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(idx)}
                                                        className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {(formData.features || []).length === 0 && (
                                                <p className="text-xs text-zinc-400 italic py-2">
                                                    Belum ada poin keunggulan. Klik "Tambah Poin" di atas.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: MEDIA & GALERI */}
                            {activeTab === 'media' && (
                                <div className="space-y-6">
                                    {/* Main Banner Image */}
                                    <div className="space-y-2 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <ImageIcon className="w-4 h-4 text-red-500" />
                                                    <span>Foto Banner Utama Potensi</span>
                                                </label>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Tampil di halaman katalog publik dan tajuk utama halaman detail.
                                                </p>
                                            </div>

                                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer transition-colors shadow-sm">
                                                {uploadingImage ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Upload className="w-3.5 h-3.5" />
                                                )}
                                                <span>Unggah Banner</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleBannerUpload}
                                                    disabled={uploadingImage}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                                            {formData.image ? (
                                                <div className="w-full sm:w-64 h-36 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 shrink-0 relative group">
                                                    <img
                                                        src={formData.image}
                                                        alt="Preview Banner"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => updateField('image', '')}
                                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Hapus gambar"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-full sm:w-64 h-36 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-zinc-400 text-xs shrink-0">
                                                    <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                                                    <span>Belum ada banner</span>
                                                </div>
                                            )}

                                            <div className="w-full flex-1 space-y-1">
                                                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                                                    Atau masukkan URL gambar langsung:
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="https://images.unsplash.com/..."
                                                    value={formData.image || ''}
                                                    onChange={(e) => updateField('image', e.target.value)}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logo / Ikon Usaha */}
                                    <div className="space-y-2 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <Store className="w-4 h-4 text-amber-500" />
                                                    <span>Logo / Ikon Bisnis</span>
                                                </label>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Format SVG / PNG transparan atau ikon identitas komoditas.
                                                </p>
                                            </div>

                                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg cursor-pointer transition-colors shadow-sm">
                                                {uploadingLogo ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Upload className="w-3.5 h-3.5" />
                                                )}
                                                <span>Unggah Logo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*,.svg"
                                                    onChange={handleLogoUpload}
                                                    disabled={uploadingLogo}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                                            {formData.logo ? (
                                                <div className="w-20 h-20 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white p-2 shrink-0 relative group flex items-center justify-center">
                                                    <img
                                                        src={formData.logo}
                                                        alt="Preview Logo"
                                                        className="w-full h-full object-contain"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => updateField('logo', '')}
                                                        className="absolute top-1 right-1 p-0.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Hapus logo"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="w-20 h-20 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-zinc-400 text-[10px] shrink-0">
                                                    <span>Tanpa Logo</span>
                                                </div>
                                            )}

                                            <div className="w-full flex-1 space-y-1">
                                                <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                                                    Atau masukkan URL / path file logo:
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="/assets/images/potentials/...svg"
                                                    value={formData.logo || ''}
                                                    onChange={(e) => updateField('logo', e.target.value)}
                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gallery Photos */}
                                    <div className="space-y-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <Layers className="w-4 h-4 text-blue-500" />
                                                    <span>Galeri Foto Dokumentasi & Aktivitas</span>
                                                </label>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Koleksi foto tambahan kandang, proses produksi, atau kemasan.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                <button
                                                    type="button"
                                                    onClick={handleSyncGalleryWithProducts}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/70 dark:border-emerald-700/60 rounded-lg transition-colors cursor-pointer shadow-xs"
                                                    title="Ambil foto dari daftar produk dan tambahkan otomatis ke galeri komoditas ini"
                                                >
                                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span>Sinkronkan Foto Produk</span>
                                                </button>

                                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors shadow-sm">
                                                    {uploadingGallery ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Plus className="w-3.5 h-3.5" />
                                                    )}
                                                    <span>Tambah Foto Galeri</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleGalleryUpload}
                                                        disabled={uploadingGallery}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        {/* Gallery Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                            {(formData.gallery || []).map((imgUrl, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group relative h-28 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100"
                                                >
                                                    <img
                                                        src={imgUrl}
                                                        alt={`Galeri ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveGallery(idx)}
                                                        className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                        title="Hapus foto"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}

                                            {(formData.gallery || []).length === 0 && (
                                                <div className="col-span-full py-6 text-center text-xs text-zinc-400 italic">
                                                    Belum ada foto galeri tambahan.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 5: KATALOG PRODUK & KOMODITAS */}
                            {activeTab === 'products' && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                                        <div>
                                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                Daftar Produk & Varian Komoditas
                                            </h4>
                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                Daftar varian produk yang dapat dipesan langsung oleh masyarakat / pembeli.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddProduct}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>Tambah Produk</span>
                                        </button>
                                    </div>

                                    {/* Products Cards List */}
                                    <div className="space-y-4">
                                        {(formData.products || []).map((prod, idx) => (
                                            <div
                                                key={prod.id || idx}
                                                className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-4 relative"
                                            >
                                                 {/* Card Header with numbering, photo preview & reorder */}
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black flex items-center justify-center shrink-0">
                                                            {idx + 1}
                                                        </span>
                                                        {prod.image ? (
                                                            <img
                                                                src={prod.image}
                                                                alt={prod.name || 'Produk'}
                                                                className="w-8 h-8 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-lg bg-zinc-200/70 dark:bg-zinc-700/50 flex items-center justify-center text-zinc-400 shrink-0">
                                                                <ImageIcon className="w-4 h-4 opacity-50" />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex items-center gap-2">
                                                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                                                {prod.name || 'Produk Baru Tanpa Nama'}
                                                            </span>
                                                            {prod.price && (
                                                                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0 hidden sm:inline-block">
                                                                    {prod.price} {prod.unit ? `(${prod.unit})` : ''}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1 shrink-0">
                                                        <button
                                                            type="button"
                                                            disabled={idx === 0}
                                                            onClick={() => handleMoveProduct(idx, 'up')}
                                                            className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 rounded"
                                                            title="Geser ke atas"
                                                        >
                                                            <ArrowUp className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            disabled={idx === (formData.products || []).length - 1}
                                                            onClick={() => handleMoveProduct(idx, 'down')}
                                                            className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 rounded"
                                                            title="Geser ke bawah"
                                                        >
                                                            <ArrowDown className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveProduct(idx)}
                                                            className="p-1 text-zinc-400 hover:text-red-500 rounded ml-1"
                                                            title="Hapus produk ini"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Product Form Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                    {/* Name */}
                                                    <div className="sm:col-span-6 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Nama Produk / Varian
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: Telur Bebek Mentah Pilihan"
                                                            value={prod.name || ''}
                                                            onChange={(e) => handleUpdateProduct(idx, 'name', e.target.value)}
                                                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    {/* Price Format (Text) */}
                                                    <div className="sm:col-span-3 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Harga Teks Tampil
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Rp 35.000"
                                                            value={prod.price || ''}
                                                            onChange={(e) => handleUpdateProduct(idx, 'price', e.target.value)}
                                                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    {/* Unit */}
                                                    <div className="sm:col-span-3 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Satuan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="per kg / butir / tray"
                                                            value={prod.unit || ''}
                                                            onChange={(e) => handleUpdateProduct(idx, 'unit', e.target.value)}
                                                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    {/* Stock Status */}
                                                    <div className="sm:col-span-6 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Status Ketersediaan
                                                        </label>
                                                        <select
                                                            value={prod.stock_status || 'Tersedia Harian'}
                                                            onChange={(e) => handleUpdateProduct(idx, 'stock_status', e.target.value)}
                                                            className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        >
                                                            <option value="Tersedia Harian">Tersedia Harian</option>
                                                            <option value="Musiman / Panen">Musiman / Panen</option>
                                                            <option value="Pre-Order">Pre-Order</option>
                                                            <option value="Stok Terbatas">Stok Terbatas</option>
                                                            <option value="Habis Sementara">Habis Sementara</option>
                                                        </select>
                                                    </div>

                                                    {/* Min Order */}
                                                    <div className="sm:col-span-6 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Minimal Order
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: 1 kg / 10 butir"
                                                            value={prod.min_order || ''}
                                                            onChange={(e) => handleUpdateProduct(idx, 'min_order', e.target.value)}
                                                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    {/* Product Photo with Live Visual Preview */}
                                                    <div className="sm:col-span-12 p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
                                                        {/* Visual Preview Box */}
                                                        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 shrink-0 relative group flex items-center justify-center shadow-xs">
                                                            {prod.image ? (
                                                                <>
                                                                    <img
                                                                        src={prod.image}
                                                                        alt={prod.name || 'Foto Produk'}
                                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleUpdateProduct(idx, 'image', '')}
                                                                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition-colors cursor-pointer"
                                                                            title="Hapus foto produk"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="flex flex-col items-center justify-center text-zinc-400 p-2 text-center select-none">
                                                                    <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                                                                    <span className="text-[10px] font-semibold text-zinc-400 leading-tight">Belum Ada Foto</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Photo Details & Upload Actions */}
                                                        <div className="flex-1 w-full space-y-2">
                                                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                                                <div>
                                                                    <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                                                                        <ImageIcon className="w-3.5 h-3.5 text-red-500" />
                                                                        <span>Pratinjau & Foto Produk</span>
                                                                    </label>
                                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                                        Format gambar JPG, PNG, atau WebP untuk katalog varian produk.
                                                                    </p>
                                                                </div>

                                                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg cursor-pointer transition-colors shadow-xs">
                                                                    {uploadingProductIdx === idx ? (
                                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                    ) : (
                                                                        <Upload className="w-3.5 h-3.5" />
                                                                    )}
                                                                    <span>{prod.image ? 'Ganti Foto' : 'Unggah Foto'}</span>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleProductPhotoUpload(e, idx)}
                                                                        disabled={uploadingProductIdx === idx}
                                                                        className="hidden"
                                                                    />
                                                                </label>
                                                            </div>

                                                            <div className="relative">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Atau tempel URL gambar langsung (https://...)"
                                                                    value={prod.image || ''}
                                                                    onChange={(e) => handleUpdateProduct(idx, 'image', e.target.value)}
                                                                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:ring-1 focus:ring-red-500 font-mono text-[11px] pr-8"
                                                                />
                                                                {prod.image && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUpdateProduct(idx, 'image', '')}
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500 p-1"
                                                                        title="Kosongkan foto"
                                                                    >
                                                                        <X className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Product Description */}
                                                    <div className="sm:col-span-12 space-y-1">
                                                        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Deskripsi / Catatan Produk
                                                        </label>
                                                        <textarea
                                                            rows={2}
                                                            placeholder="Jelaskan kualitas, rasa, kemasan, atau ketentuan khusus..."
                                                            value={prod.description || ''}
                                                            onChange={(e) => handleUpdateProduct(idx, 'description', e.target.value)}
                                                            className="w-full px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:ring-1 focus:ring-red-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(formData.products || []).length === 0 && (
                                            <div className="p-8 text-center space-y-2 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                                                <ShoppingBag className="w-8 h-8 mx-auto opacity-30 text-zinc-400" />
                                                <p className="text-xs text-zinc-400">
                                                    Belum ada produk atau varian harga yang ditambahkan.
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={handleAddProduct}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-lg"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Tambah Produk Pertama</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Sticky Action Bar */}
                        <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between">
                            <div>
                                {selectedId !== 'new' && (
                                    <button
                                        type="button"
                                        onClick={() => setItemToDelete(potentials.find((p) => p.id === selectedId))}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/70 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Hapus Potensi Ini</span>
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 rounded-lg shadow-md shadow-red-900/20 transition-all disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Simpan Perubahan</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CUSTOM DELETE CONFIRMATION MODAL (NO BROWSER ALERT!) */}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="p-6 space-y-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
                                <AlertTriangle className="w-6 h-6" />
                            </div>

                            <div className="text-center space-y-2">
                                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                                    Konfirmasi Hapus Potensi Desa
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Apakah Anda yakin ingin menghapus data potensi/UMKM{' '}
                                    <strong className="text-zinc-800 dark:text-zinc-200 font-bold">
                                        "{itemToDelete.title}"
                                    </strong>
                                    ? Tindakan ini akan menghapus seluruh data produk, galeri, dan ulasan terkait dari database publik secara permanen.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setItemToDelete(null)}
                                className="px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm shadow-red-900/20"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Ya, Hapus Permanen</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
