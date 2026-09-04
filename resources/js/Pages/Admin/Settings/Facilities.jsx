import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Save,
    ExternalLink,
    Plus,
    Trash2,
    AlertTriangle,
    Building2,
    Landmark,
    HeartPulse,
    GraduationCap,
    Trophy,
    ShoppingBag,
    MapPin,
    Clock,
    Phone,
    Search,
    Eye,
    Upload,
    Loader2,
    CheckCircle2,
    ArrowUp,
    ArrowDown,
    X,
    Sparkles,
    Check,
    Layers,
    GripVertical,
} from 'lucide-react';

const CATEGORY_OPTIONS = [
    { label: 'Pemerintahan & Layanan', icon: Building2 },
    { label: 'Kesehatan & Posyandu', icon: HeartPulse },
    { label: 'Ibadah & Keagamaan', icon: Landmark },
    { label: 'Pendidikan', icon: GraduationCap },
    { label: 'Olahraga & Publik', icon: Trophy },
    { label: 'Pertanian & Ekonomi', icon: ShoppingBag },
    { label: 'Lainnya', icon: Sparkles },
];

export default function FacilitiesSettings({ settings = {} }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Parse initial facilities list
    let initialFacilities = [];
    if (settings.facilities_list_data && Array.isArray(settings.facilities_list_data)) {
        initialFacilities = settings.facilities_list_data;
    } else if (settings.facilities_list && typeof settings.facilities_list === 'string') {
        try {
            initialFacilities = JSON.parse(settings.facilities_list);
        } catch (e) {
            initialFacilities = [];
        }
    }

    const { data, setData, post, processing } = useForm({
        facilities_title: settings.facilities_title || 'Fasilitas Umum Desa Karangwungu',
        facilities_subtitle: settings.facilities_subtitle || 'Informasi lengkap sarana prasarana pelayanan masyarakat, tempat ibadah, fasilitas kesehatan, pendidikan, ruang terbuka publik, serta infrastruktur pertanian.',
        facilities_list: initialFacilities,
    });

    const [selectedIndex, setSelectedIndex] = useState(data.facilities_list.length > 0 ? 0 : null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('Semua');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [newFeatureInput, setNewFeatureInput] = useState('');
    const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null);

    // Drag & drop state for reordering
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);

    // Selected facility item
    const currentItem = selectedIndex !== null && data.facilities_list[selectedIndex]
        ? data.facilities_list[selectedIndex]
        : null;

    // Filtered facilities for sidebar list
    const filteredList = data.facilities_list.map((item, originalIndex) => ({
        ...item,
        originalIndex,
    })).filter((item) => {
        const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q ||
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.location && item.location.toLowerCase().includes(q)) ||
            (item.description && item.description.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    // Save changes
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(`/${adminPath}/settings/facilities`, {
            preserveScroll: true,
        });
    };

    // Update single field of active item
    const updateCurrentItem = (field, value) => {
        if (selectedIndex === null) return;
        const updatedList = [...data.facilities_list];
        updatedList[selectedIndex] = {
            ...updatedList[selectedIndex],
            [field]: value,
        };
        setData('facilities_list', updatedList);
    };

    // Add new facility
    const handleAddNewFacility = () => {
        const newItem = {
            id: Date.now(),
            name: 'Fasilitas Baru',
            category: 'Pemerintahan & Layanan',
            location: 'Desa Karangwungu',
            hours: 'Senin – Jumat: 08.00 – 15.30 WIB',
            phone: '',
            image: '',
            description: '',
            features: ['Pelayanan Ramah & Cepat'],
        };
        const updatedList = [...data.facilities_list, newItem];
        setData('facilities_list', updatedList);
        setSelectedIndex(updatedList.length - 1);
    };

    // Move item position in array
    const handleMoveItem = (index, direction) => {
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= data.facilities_list.length) return;

        const updatedList = [...data.facilities_list];
        const temp = updatedList[index];
        updatedList[index] = updatedList[newIndex];
        updatedList[newIndex] = temp;

        setData('facilities_list', updatedList);
        if (selectedIndex === index) {
            setSelectedIndex(newIndex);
        } else if (selectedIndex === newIndex) {
            setSelectedIndex(index);
        }
    };

    // Drag and drop handlers
    const handleDragStart = (e, originalIndex) => {
        setDraggedIndex(originalIndex);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', originalIndex.toString());
    };

    const handleDragOver = (e, originalIndex) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIndex !== originalIndex) {
            setDragOverIndex(originalIndex);
        }
    };

    const handleDrop = (e, targetOriginalIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetOriginalIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const updatedList = [...data.facilities_list];
        const [movedItem] = updatedList.splice(draggedIndex, 1);
        updatedList.splice(targetOriginalIndex, 0, movedItem);

        setData('facilities_list', updatedList);

        // Adjust selectedIndex
        if (selectedIndex === draggedIndex) {
            setSelectedIndex(targetOriginalIndex);
        } else if (draggedIndex < selectedIndex && targetOriginalIndex >= selectedIndex) {
            setSelectedIndex(selectedIndex - 1);
        } else if (draggedIndex > selectedIndex && targetOriginalIndex <= selectedIndex) {
            setSelectedIndex(selectedIndex + 1);
        }

        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    // Delete item
    const handleDeleteFacility = (indexToDelete) => {
        const updatedList = data.facilities_list.filter((_, idx) => idx !== indexToDelete);
        setData('facilities_list', updatedList);
        setDeleteConfirmIndex(null);

        if (updatedList.length === 0) {
            setSelectedIndex(null);
        } else if (selectedIndex >= updatedList.length) {
            setSelectedIndex(updatedList.length - 1);
        }
    };

    // Upload photo
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || selectedIndex === null) return;

        setUploadingImage(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const res = await fetch(`/${adminPath}/settings/facilities/upload-image`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: uploadData,
            });

            if (!res.ok) throw new Error('Gagal mengunggah foto');
            const result = await res.json();
            if (result.url) {
                updateCurrentItem('image', result.url);
            }
        } catch (err) {
            alert(err.message || 'Terjadi kesalahan saat mengunggah foto.');
        } finally {
            setUploadingImage(false);
            e.target.value = '';
        }
    };

    // Features tags manipulation
    const handleAddFeature = () => {
        if (!newFeatureInput.trim() || selectedIndex === null) return;
        const currentFeatures = Array.isArray(currentItem.features) ? currentItem.features : [];
        updateCurrentItem('features', [...currentFeatures, newFeatureInput.trim()]);
        setNewFeatureInput('');
    };

    const handleRemoveFeature = (featureIdx) => {
        if (selectedIndex === null) return;
        const currentFeatures = Array.isArray(currentItem.features) ? currentItem.features : [];
        updateCurrentItem('features', currentFeatures.filter((_, idx) => idx !== featureIdx));
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-20">
                {/* 1. Header Page */}
                <AdminPageHeader
                    title="Konfigurasi Fasilitas Umum & Sarana Prasarana"
                    subtitle="Kelola direktori sarana umum, tempat ibadah, fasilitas kesehatan, pendidikan, ruang publik, dan infrastruktur desa."
                    breadcrumbs={[
                        { label: 'Dashboard', href: `/${adminPath}/dashboard` },
                        { label: 'Pengaturan Website' },
                        { label: 'Fasilitas Umum' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2.5">
                            <a
                                href="/profil/fasilitas"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-colors border border-zinc-200 dark:border-zinc-700 cursor-pointer shadow-xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>Lihat Publik</span>
                            </a>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-800 hover:to-amber-700 text-white text-xs font-bold transition-all shadow-md shadow-red-700/20 disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-3.5 w-3.5" />
                                        <span>Simpan Perubahan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    }
                />

                {/* Main Split Layout: Left Catalog Sidebar & Right Form Editor */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Facilities Master Catalog */}
                    <div className="lg:col-span-4 xl:col-span-4 space-y-4">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
                            {/* Panel Header */}
                            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                                        Daftar Fasilitas
                                    </h3>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        {data.facilities_list.length} fasilitas terdaftar
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleAddNewFacility}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shrink-0 cursor-pointer shadow-xs"
                                    title="Tambah Fasilitas Baru"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Tambah</span>
                                </button>
                            </div>

                            {/* Search Box */}
                            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2.5">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Cari nama, lokasi fasilitas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2.5 top-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Category Pills Scroll */}
                                <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
                                    {['Semua', ...CATEGORY_OPTIONS.map((c) => c.label)].map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setFilterCategory(cat)}
                                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                                filterCategory === cat
                                                    ? 'bg-red-600 text-white shadow-2xs'
                                                    : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities Items List */}
                            <div className="max-h-[580px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60 p-2 space-y-1">
                                {filteredList.length === 0 ? (
                                    <div className="py-12 px-4 text-center">
                                        <Building2 className="h-8 w-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                            Tidak ada fasilitas yang sesuai
                                        </p>
                                    </div>
                                ) : (
                                    filteredList.map((item) => {
                                        const isSelected = selectedIndex === item.originalIndex;
                                        const isDragging = draggedIndex === item.originalIndex;
                                        const isOver = dragOverIndex === item.originalIndex;
                                        const isDraggable = !searchQuery.trim() && filterCategory === 'Semua';

                                        return (
                                            <div
                                                key={item.id || item.originalIndex}
                                                draggable={isDraggable}
                                                onDragStart={(e) => handleDragStart(e, item.originalIndex)}
                                                onDragOver={(e) => handleDragOver(e, item.originalIndex)}
                                                onDrop={(e) => handleDrop(e, item.originalIndex)}
                                                onDragEnd={handleDragEnd}
                                                onClick={() => setSelectedIndex(item.originalIndex)}
                                                className={`group p-2.5 rounded-lg transition-all cursor-pointer border flex items-center gap-2.5 relative select-none ${
                                                    isSelected
                                                        ? 'bg-red-50/70 dark:bg-red-950/30 border-red-300 dark:border-red-900/60 shadow-xs ring-1 ring-red-500/20'
                                                        : 'bg-white dark:bg-zinc-900 border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                                                } ${isDragging ? 'opacity-30 border-dashed border-red-500 scale-[0.98]' : ''} ${
                                                    isOver && !isDragging ? 'border-t-2 border-red-500 shadow-md ring-1 ring-red-500/20' : ''
                                                }`}
                                            >
                                                {/* Drag Grip Handle */}
                                                {isDraggable && (
                                                    <div
                                                        className="cursor-grab active:cursor-grabbing p-1 text-zinc-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-200 shrink-0 transition-colors"
                                                        title="Tarik & lepas untuk mengubah urutan"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <GripVertical className="h-4 w-4" />
                                                    </div>
                                                )}

                                                {/* Thumbnail Preview */}
                                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/60 dark:border-zinc-700/60 pointer-events-none">
                                                    {item.image ? (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                                            <Building2 className="h-5 w-5 opacity-40" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0 pointer-events-none">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 truncate">
                                                            {item.category || 'Fasilitas'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                                                        {item.name || 'Fasilitas Tanpa Nama'}
                                                    </h4>
                                                    <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                                        {item.location || 'Lokasi belum diisi'}
                                                    </p>
                                                </div>

                                                {/* Reorder Arrows */}
                                                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMoveItem(item.originalIndex, -1);
                                                        }}
                                                        disabled={item.originalIndex === 0}
                                                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-20 cursor-pointer"
                                                        title="Pindah ke atas"
                                                    >
                                                        <ArrowUp className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleMoveItem(item.originalIndex, 1);
                                                        }}
                                                        disabled={item.originalIndex === data.facilities_list.length - 1}
                                                        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-20 cursor-pointer"
                                                        title="Pindah ke bawah"
                                                    >
                                                        <ArrowDown className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Tambah Fasilitas Baru Bottom Button */}
                            <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={handleAddNewFacility}
                                    className="w-full py-2 px-3 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 bg-zinc-50/50 hover:bg-red-50/50 dark:bg-zinc-800/40 dark:hover:bg-red-950/20 text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Tambah Fasilitas Baru</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Active Facility Form Editor */}
                    <div className="lg:col-span-8 xl:col-span-8">
                        {currentItem ? (
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs p-5 sm:p-6 space-y-6">
                                {/* Editor Header */}
                                <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                    <div className="space-y-0.5">
                                        <span className="text-[11px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                            {currentItem.category || 'Fasilitas'}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                            {currentItem.name || 'Fasilitas Baru'}
                                        </h3>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirmIndex(selectedIndex)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Hapus</span>
                                    </button>
                                </div>

                                {/* Section 1: Basic Information */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        1. Informasi Utama Fasilitas
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2 space-y-1">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Nama Sarana / Fasilitas Umum *
                                            </label>
                                            <input
                                                type="text"
                                                value={currentItem.name || ''}
                                                onChange={(e) => updateCurrentItem('name', e.target.value)}
                                                placeholder="Contoh: Kantor Balai Desa & Pendopo Karangwungu"
                                                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Kategori Fasilitas *
                                            </label>
                                            <select
                                                value={currentItem.category || 'Pemerintahan & Layanan'}
                                                onChange={(e) => updateCurrentItem('category', e.target.value)}
                                                className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                            >
                                                {CATEGORY_OPTIONS.map((cat) => (
                                                    <option key={cat.label} value={cat.label}>
                                                        {cat.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Kontak / Telepon Pengelola
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={currentItem.phone || ''}
                                                    onChange={(e) => updateCurrentItem('phone', e.target.value)}
                                                    placeholder="(0812) 3456-7890 atau Nama Pengelola"
                                                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Photo Documentation */}
                                <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        2. Foto Dokumentasi Fasilitas
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                                        {/* Photo Preview */}
                                        <div className="sm:col-span-5 aspect-video sm:aspect-4/3 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 relative group">
                                            {currentItem.image ? (
                                                <img
                                                    src={currentItem.image}
                                                    alt={currentItem.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-zinc-400">
                                                    <Building2 className="h-8 w-8 mb-1 opacity-40" />
                                                    <span className="text-[11px]">Belum ada foto</span>
                                                </div>
                                            )}

                                            {uploadingImage && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs gap-1.5">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                    <span>Mengunggah...</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload & URL Controls */}
                                        <div className="sm:col-span-7 space-y-3">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                    Unggah Foto dari Komputer
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold transition-colors cursor-pointer shadow-xs">
                                                        <Upload className="h-3.5 w-3.5" />
                                                        <span>Pilih Foto (JPG/PNG/WebP)</span>
                                                        <input
                                                            type="file"
                                                            accept="image/png,image/jpeg,image/webp"
                                                            onChange={handleImageUpload}
                                                            disabled={uploadingImage}
                                                            className="hidden"
                                                        />
                                                    </label>

                                                    {currentItem.image && (
                                                        <button
                                                            type="button"
                                                            onClick={() => updateCurrentItem('image', '')}
                                                            className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold transition-colors cursor-pointer"
                                                        >
                                                            Hapus Foto
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-zinc-400">
                                                    Rekomendasi rasio lanskap 16:9 atau 4:3, ukuran maksimal 8 MB.
                                                </p>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                    Atau Tautan URL Foto
                                                </label>
                                                <input
                                                    type="url"
                                                    value={currentItem.image || ''}
                                                    onChange={(e) => updateCurrentItem('image', e.target.value)}
                                                    placeholder="https://images.unsplash.com/..."
                                                    className="w-full px-3.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Location & Operational Hours */}
                                <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        3. Lokasi & Jam Operasional
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Alamat / Lokasi Fasilitas
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={currentItem.location || ''}
                                                    onChange={(e) => updateCurrentItem('location', e.target.value)}
                                                    placeholder="Contoh: Jl. Raya Karangwungu No. 01, Dusun Krajan"
                                                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Jam Layanan / Operasional
                                            </label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    value={currentItem.hours || ''}
                                                    onChange={(e) => updateCurrentItem('hours', e.target.value)}
                                                    placeholder="Contoh: Senin – Jumat: 08.00 – 15.30 WIB"
                                                    className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Description & Features */}
                                <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        4. Deskripsi & Fasilitas Sarana Unggulan
                                    </h4>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Deskripsi Ringkas Fasilitas
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={currentItem.description || ''}
                                            onChange={(e) => updateCurrentItem('description', e.target.value)}
                                            placeholder="Tuliskan gambaran ringkas fungsi sarana dan manfaat bagi warga desa..."
                                            className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium leading-relaxed"
                                        />
                                    </div>

                                    {/* Features / Sarana List */}
                                    <div className="space-y-2.5">
                                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Sarana & Kelengkapan Unggulan
                                        </label>

                                        {/* Existing chips */}
                                        <div className="flex flex-wrap items-center gap-1.5 min-h-[36px] p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60">
                                            {Array.isArray(currentItem.features) && currentItem.features.length > 0 ? (
                                                currentItem.features.map((feat, fIdx) => (
                                                    <span
                                                        key={fIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold shadow-2xs"
                                                    >
                                                        <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                                        <span>{feat}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFeature(fIdx)}
                                                            className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors ml-0.5 cursor-pointer"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-zinc-400 italic">
                                                    Belum ada sarana unggulan ditambahkan.
                                                </span>
                                            )}
                                        </div>

                                        {/* Add feature input */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={newFeatureInput}
                                                onChange={(e) => setNewFeatureInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddFeature();
                                                    }
                                                }}
                                                placeholder="Ketik sarana baru (misal: 'Ruang Sholat Ber-AC', 'WiFi Publik') lalu tekan Tambah"
                                                className="flex-1 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 shadow-2xs font-medium"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddFeature}
                                                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Tambah Sarana</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center space-y-3">
                                <Building2 className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
                                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                    Pilih atau Tambah Fasilitas Baru
                                </h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                                    Pilih fasilitas dari daftar di panel sebelah kiri untuk mengedit data, atau klik tombol di bawah untuk menambah fasilitas baru.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleAddNewFacility}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Tambah Fasilitas Baru</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmIndex !== null && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-sm w-full p-5 space-y-4 animate-in fade-in zoom-in duration-150">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                        Hapus Fasilitas Ini?
                                    </h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Data fasilitas "<strong>{data.facilities_list[deleteConfirmIndex]?.name}</strong>" akan dihapus dari daftar.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setDeleteConfirmIndex(null)}
                                    className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteFacility(deleteConfirmIndex)}
                                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
