import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Image as ImageIcon,
    FileText,
    Sparkles,
    Compass,
    MapPin,
    Upload,
    ExternalLink,
    Save,
    Info,
    Check,
    Plus,
    Trash2,
    Search,
    X,
    ArrowUp,
    ArrowDown,
    ArrowRight,
    ArrowLeft,
    Building2,
    Layers,
    Wheat,
    Fish,
    HeartHandshake,
} from 'lucide-react';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';

export default function OverviewSettings({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('photos');
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Parse existing map points safely
    let initialMapPoints = [];
    if (settings.map_points_data && Array.isArray(settings.map_points_data)) {
        initialMapPoints = settings.map_points_data;
    } else if (settings.map_points && typeof settings.map_points === 'string') {
        try {
            initialMapPoints = JSON.parse(settings.map_points);
        } catch (e) {
            initialMapPoints = [];
        }
    }

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        // 1. 3 Foto Bentang Alam, Label & Icon
        overview_photo_1: settings.overview_photo_1 || '/assets/images/hero.jpg',
        overview_photo_1_label: settings.overview_photo_1_label || 'Kawasan Desa Karangwungu',
        overview_photo_1_icon: settings.overview_photo_1_icon || 'MapPin',
        overview_photo_1_file: null,

        overview_photo_2: settings.overview_photo_2 || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
        overview_photo_2_label: settings.overview_photo_2_label || 'Persawahan Padi',
        overview_photo_2_icon: settings.overview_photo_2_icon || 'Wheat',
        overview_photo_2_file: null,

        overview_photo_3: settings.overview_photo_3 || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
        overview_photo_3_label: settings.overview_photo_3_label || 'Tambak Ikan & Udang',
        overview_photo_3_icon: settings.overview_photo_3_icon || 'Fish',
        overview_photo_3_file: null,

        // 2. Deskripsi Narasi
        overview_paragraph_1: settings.overview_paragraph_1 || 'Desa Karangwungu merupakan salah satu dari 18 desa di wilayah administratif Kecamatan Karanggeneng, Kabupaten Lamongan, Provinsi Jawa Timur. Wilayah Karangwungu terletak di dataran rendah yang subur di sebelah utara aliran Bengawan Solo, beriklim tropis dengan bentang alam yang didominasi oleh hamparan persawahan padi produktif dan tambak budidaya air tawar/payau modern.',
        overview_paragraph_2: settings.overview_paragraph_2 || 'Masyarakat Desa Karangwungu dikenal memegang teguh tradisi gotong royong warisan leluhur, kehidupan beragama yang guyub rukun dan harmonis, serta etos kerja pantang menyerah di sektor pertanian agraris, budidaya ikan bandeng & udang vaname, serta perniagaan wirausaha lokal.',

        // 3. 3 Point Potensi & Icon
        overview_point_1_title: settings.overview_point_1_title || 'Sektor Agraris Produktif',
        overview_point_1_desc: settings.overview_point_1_desc || 'Didukung hamparan persawahan padi subur dengan sistem irigasi teknis mandiri.',
        overview_point_1_icon: settings.overview_point_1_icon || 'Wheat',

        overview_point_2_title: settings.overview_point_2_title || 'Budidaya Tambak Modern',
        overview_point_2_desc: settings.overview_point_2_desc || 'Sentra perikanan air tawar & payau penghasil bandeng dan udang vaname unggulan.',
        overview_point_2_icon: settings.overview_point_2_icon || 'Fish',

        overview_point_3_title: settings.overview_point_3_title || 'Kearifan Gotong Royong',
        overview_point_3_desc: settings.overview_point_3_desc || 'Kerukunan antarwarga yang harmonis dengan semangat kebersamaan yang lestari.',
        overview_point_3_icon: settings.overview_point_3_icon || 'HeartHandshake',

        // 4. Batas Wilayah 4 Arah
        border_north_title: settings.border_north_title || 'Desa Guci & Desa Sumberwudi',
        border_north_desc: settings.border_north_desc || 'Batas area pertanian utara & bantaran sungai Bengawan Solo',

        border_south_title: settings.border_south_title || 'Desa Karanggeneng',
        border_south_desc: settings.border_south_desc || 'Pusat kecamatan, SPBU Pertamina & jalan poros kabupaten',

        border_east_title: settings.border_east_title || 'Desa Sungelebak',
        border_east_desc: settings.border_east_desc || 'Kawasan perikanan air payau & sentra tambak produktif',

        border_west_title: settings.border_west_title || 'Desa Kalanganyar',
        border_west_desc: settings.border_west_desc || 'Akses perniagaan warga & hamparan persawahan barat',

        // 5. Titik Lokasi Peta (Array of objects)
        map_points: initialMapPoints,
    });

    // Previews for photo uploads
    const [photoPreviews, setPhotoPreviews] = useState({
        photo1: data.overview_photo_1,
        photo2: data.overview_photo_2,
        photo3: data.overview_photo_3,
    });

    const handleFileChange = (field, fileField, previewKey, e) => {
        const file = e.target.files[0];
        if (file) {
            setData(fileField, file);
            const objectUrl = URL.createObjectURL(file);
            setPhotoPreviews((prev) => ({ ...prev, [previewKey]: objectUrl }));
        }
    };

    // State for Icon Picker Modal
    const [iconPickerTarget, setIconPickerTarget] = useState(null); // 'point1' | 'point2' | 'point3' | null
    const [iconSearch, setIconSearch] = useState('');
    const [iconCategoryFilter, setIconCategoryFilter] = useState('all');

    const openIconPicker = (target) => {
        setIconPickerTarget(target);
        setIconSearch('');
        setIconCategoryFilter('all');
    };

    const handleSelectIcon = (iconKey) => {
        if (iconPickerTarget === 'photo1') setData('overview_photo_1_icon', iconKey);
        if (iconPickerTarget === 'photo2') setData('overview_photo_2_icon', iconKey);
        if (iconPickerTarget === 'photo3') setData('overview_photo_3_icon', iconKey);
        if (iconPickerTarget === 'point1') setData('overview_point_1_icon', iconKey);
        if (iconPickerTarget === 'point2') setData('overview_point_2_icon', iconKey);
        if (iconPickerTarget === 'point3') setData('overview_point_3_icon', iconKey);
        setIconPickerTarget(null);
    };

    // State for New Map Point Form
    const [newPoint, setNewPoint] = useState({
        name: '',
        category: 'gov',
        lat: '',
        lng: '',
        desc: '',
    });

    const handleAddMapPoint = (e) => {
        e.preventDefault();
        if (!newPoint.name || !newPoint.lat || !newPoint.lng) {
            alert('Mohon isi nama titik, latitude, dan longitude.');
            return;
        }

        const categoryLabels = {
            gov: 'Pemerintahan',
            pemukiman: 'Pemukiman',
            umkm: 'UMKM & Usaha Warga',
            fasum: 'Fasilitas Umum',
        };

        const pointToAdd = {
            id: 'point-' + Date.now(),
            name: newPoint.name.trim(),
            category: newPoint.category,
            categoryLabel: categoryLabels[newPoint.category] || 'Umum',
            lat: parseFloat(newPoint.lat),
            lng: parseFloat(newPoint.lng),
            desc: newPoint.desc.trim(),
        };

        setData('map_points', [...data.map_points, pointToAdd]);
        setNewPoint({
            name: '',
            category: 'gov',
            lat: '',
            lng: '',
            desc: '',
        });
    };

    const handleDeleteMapPoint = (idToDelete) => {
        if (confirm('Hapus titik ini dari peta desa?')) {
            setData(
                'map_points',
                data.map_points.filter((pt) => pt.id !== idToDelete)
            );
        }
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(`/${adminPath}/settings/overview`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const tabs = [
        { id: 'photos', name: '3 Foto Bentang Alam', icon: ImageIcon, desc: 'Foto utama & 2 foto sub bentang alam' },
        { id: 'narrative', name: 'Deskripsi Narasi', icon: FileText, desc: 'Narasi geografis & kearifan lokal desa' },
        { id: 'highlights', name: '3 Point & Pilihan Icon', icon: Sparkles, desc: '3 keunggulan desa & katalog referensi icon' },
        { id: 'borders', name: 'Batas Wilayah', icon: Compass, desc: 'Batas 4 arah mata angin desa' },
        { id: 'map', name: 'Titik Lokasi Peta', icon: MapPin, desc: 'Kelola titik spasial dengan latitude & longitude' },
    ];

    // Filter icons for picker modal
    const iconEntries = Object.entries(ICON_REGISTRY).filter(([key, item]) => {
        const matchesSearch =
            key.toLowerCase().includes(iconSearch.toLowerCase()) ||
            item.label.toLowerCase().includes(iconSearch.toLowerCase()) ||
            item.category.toLowerCase().includes(iconSearch.toLowerCase());
        const matchesCat = iconCategoryFilter === 'all' || item.category === iconCategoryFilter;
        return matchesSearch && matchesCat;
    });

    const iconCategories = [
        'all',
        'Pertanian & Alam',
        'Perikanan & Perairan',
        'Ekonomi & Wirausaha',
        'Sosial & Masyarakat',
        'Pemerintahan & Hukum',
        'Infrastruktur & Sarana',
        'Pendidikan & Edukasi',
        'Keagamaan & Budaya',
    ];

    return (
        <AdminLayout title="Konfigurasi Gambaran Umum & Wilayah">
            <div className="w-full space-y-6 pb-12">
                {/* 1. Clean Open Page Header (No Box Frame, No Icon Badge) */}
                <AdminPageHeader
                    title="Konfigurasi Gambaran Umum"
                    description="Kelola tampilan visual 3 foto bentang alam, narasi geografis, 3 point potensi unggulan, batas wilayah, dan titik koordinat peta desa."
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Gambaran Umum' },
                    ]}
                    actions={
                        <>
                            <a
                                href="/profil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white shadow-xs transition-colors"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Profil</span>
                            </a>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-md shadow-red-600/25 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                            </button>
                        </>
                    }
                />

                {/* 2. Unified Master-Detail Layout (Tabs on Left, Content on Right) */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* SISI KIRI: Navigasi Tab Vertikal (lg:col-span-3) */}
                    <div className="lg:col-span-3 space-y-3 lg:sticky lg:top-20">
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-2 space-y-1 shadow-xs">
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                                Navigasi Seksi
                            </span>
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-red-50 border-red-300 dark:bg-red-950/40 dark:border-red-500/50 shadow-xs'
                                                : 'bg-white border-transparent hover:bg-zinc-100 dark:bg-transparent dark:border-transparent dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-400'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                            isActive
                                                ? 'bg-red-600 text-white shadow-xs'
                                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                        }`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className={`text-xs font-bold leading-snug ${
                                                isActive ? 'text-red-700 dark:text-amber-400' : 'text-zinc-900 dark:text-zinc-200'
                                            }`}>
                                                {tab.name}
                                            </h3>
                                            <p className={`text-[11px] truncate mt-0.5 ${
                                                isActive ? 'text-red-600/80 dark:text-zinc-400' : 'text-zinc-500 dark:text-zinc-400'
                                            }`}>
                                                {tab.desc}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Petunjuk Singkat */}
                        <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80 dark:bg-zinc-900/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-400 shadow-xs">
                            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-zinc-200">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Sinkronisasi Publik</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Seluruh perubahan foto, deskripsi, icon, batas wilayah, dan titik koordinat akan langsung tampil pada halaman Profil Desa Karangwungu.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Formulir Pengaturan (lg:col-span-9) */}
                    <div className="lg:col-span-9">
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs space-y-6">
                                {/* ============================================================= */}
                                {/* TAB 1: 3 FOTO BENTANG ALAM */}
                                {/* ============================================================= */}
                                {activeTab === 'photos' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <ImageIcon className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>Galeri 3 Foto Bentang Alam Desa</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Kelola 1 foto lanskap utama berukuran besar dan 2 foto pendukung beserta teks label dan pilihan icon badge-nya.
                                            </p>
                                        </div>

                                        {/* Foto 1 (Utama / Besar) */}
                                        {(() => {
                                            const Photo1IconComp = getIconComponent(data.overview_photo_1_icon, MapPin);
                                            return (
                                                <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                1
                                                            </span>
                                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                Foto 1: Lanskap Utama (Kawasan Desa)
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900 font-semibold">
                                                            Ukuran Utama (Besar)
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                        {/* Preview Image */}
                                                        <div className="md:col-span-5 relative h-40 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-inner group">
                                                            <img
                                                                src={photoPreviews.photo1}
                                                                alt="Pratinjau Foto 1"
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs border border-white/20 text-white text-[10px] font-bold flex items-center gap-1.5">
                                                                <Photo1IconComp className="h-3 w-3 text-amber-300" />
                                                                <span>{data.overview_photo_1_label || 'Kawasan Desa Karangwungu'}</span>
                                                            </div>
                                                        </div>

                                                        {/* Form Input */}
                                                        <div className="md:col-span-7 space-y-3">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                                        Teks Label & Icon Badge Foto
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openIconPicker('photo1')}
                                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                                                                    >
                                                                        <Photo1IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                                        <span>Icon: {data.overview_photo_1_icon || 'MapPin'}</span>
                                                                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal underline ml-0.5">Ubah</span>
                                                                    </button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_photo_1_label}
                                                                    onChange={(e) => setData('overview_photo_1_label', e.target.value)}
                                                                    placeholder="Kawasan Desa Karangwungu"
                                                                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Unggah File Foto Baru (JPG / PNG, Max 5MB)
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange('overview_photo_1', 'overview_photo_1_file', 'photo1', e)}
                                                                    className="w-full text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-zinc-800 dark:file:text-zinc-300 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {/* Foto 2 (Sub 1: Persawahan Padi) */}
                                        {(() => {
                                            const Photo2IconComp = getIconComponent(data.overview_photo_2_icon, Wheat);
                                            return (
                                                <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                2
                                                            </span>
                                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                Foto 2: Sub Foto Atas (Persawahan)
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-semibold">
                                                            Sub Foto Atas
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                        <div className="md:col-span-5 relative h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-inner group">
                                                            <img
                                                                src={photoPreviews.photo2}
                                                                alt="Pratinjau Foto 2"
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs border border-white/20 text-amber-300 text-[10px] font-bold flex items-center gap-1.5">
                                                                <Photo2IconComp className="h-3 w-3" />
                                                                <span>{data.overview_photo_2_label || 'Persawahan Padi'}</span>
                                                            </div>
                                                        </div>

                                                        <div className="md:col-span-7 space-y-3">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                                        Teks Label & Icon Badge Foto
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openIconPicker('photo2')}
                                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                                                                    >
                                                                        <Photo2IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                                        <span>Icon: {data.overview_photo_2_icon || 'Wheat'}</span>
                                                                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal underline ml-0.5">Ubah</span>
                                                                    </button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_photo_2_label}
                                                                    onChange={(e) => setData('overview_photo_2_label', e.target.value)}
                                                                    placeholder="Persawahan Padi"
                                                                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Unggah File Foto Baru
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange('overview_photo_2', 'overview_photo_2_file', 'photo2', e)}
                                                                    className="w-full text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-zinc-800 dark:file:text-zinc-300 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        {/* Foto 3 (Sub 2: Tambak Ikan & Udang) */}
                                        {(() => {
                                            const Photo3IconComp = getIconComponent(data.overview_photo_3_icon, Fish);
                                            return (
                                                <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                3
                                                            </span>
                                                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                Foto 3: Sub Foto Bawah (Tambak Perikanan)
                                                            </h4>
                                                        </div>
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-semibold">
                                                            Sub Foto Bawah
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                        <div className="md:col-span-5 relative h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-inner group">
                                                            <img
                                                                src={photoPreviews.photo3}
                                                                alt="Pratinjau Foto 3"
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs border border-white/20 text-amber-300 text-[10px] font-bold flex items-center gap-1.5">
                                                                <Photo3IconComp className="h-3 w-3" />
                                                                <span>{data.overview_photo_3_label || 'Tambak Ikan & Udang'}</span>
                                                            </div>
                                                        </div>

                                                        <div className="md:col-span-7 space-y-3">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                                        Teks Label & Icon Badge Foto
                                                                    </label>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openIconPicker('photo3')}
                                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                                                                    >
                                                                        <Photo3IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                                        <span>Icon: {data.overview_photo_3_icon || 'Fish'}</span>
                                                                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal underline ml-0.5">Ubah</span>
                                                                    </button>
                                                                </div>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_photo_3_label}
                                                                    onChange={(e) => setData('overview_photo_3_label', e.target.value)}
                                                                    placeholder="Tambak Ikan & Udang"
                                                                    className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Unggah File Foto Baru
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleFileChange('overview_photo_3', 'overview_photo_3_file', 'photo3', e)}
                                                                    className="w-full text-xs text-zinc-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-zinc-800 dark:file:text-zinc-300 cursor-pointer"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 2: DESKRIPSI NARASI */}
                                {/* ============================================================= */}
                                {activeTab === 'narrative' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>Deskripsi Narasi Gambaran Umum Desa</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Atur 2 paragraf teks deskripsi mengenai letak geografis, bentang alam, serta kehidupan sosial gotong royong masyarakat desa.
                                            </p>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                                                        <span>Paragraf 1: Geografis & Bentang Alam Wilayah</span>
                                                    </label>
                                                    <span className="text-[10px] text-zinc-400">Menjelaskan posisi wilayah, kecamatan, sungai Bengawan Solo, sawah & tambak</span>
                                                </div>
                                                <textarea
                                                    rows={5}
                                                    value={data.overview_paragraph_1}
                                                    onChange={(e) => setData('overview_paragraph_1', e.target.value)}
                                                    className="w-full p-3.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed focus:ring-2 focus:ring-red-500/20"
                                                    placeholder="Tuliskan narasi paragraf pertama..."
                                                />
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                                                        <span>Paragraf 2: Tradisi Gotong Royong & Sektor Mata Pencaharian</span>
                                                    </label>
                                                    <span className="text-[10px] text-zinc-400">Menjelaskan kerukunan antarwarga, gotong royong, dan sektor usaha warga</span>
                                                </div>
                                                <textarea
                                                    rows={5}
                                                    value={data.overview_paragraph_2}
                                                    onChange={(e) => setData('overview_paragraph_2', e.target.value)}
                                                    className="w-full p-3.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed focus:ring-2 focus:ring-red-500/20"
                                                    placeholder="Tuliskan narasi paragraf kedua..."
                                                />
                                            </div>

                                            {/* Live Preview Box */}
                                            <div className="p-4 rounded-xl border border-red-500/20 bg-red-50/40 dark:bg-zinc-950/50 space-y-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-amber-400 block">
                                                    Pratinjau Hasil Tampilan Teks di Publik:
                                                </span>
                                                <div className="text-xs text-zinc-700 dark:text-zinc-300 space-y-2 leading-relaxed text-justify">
                                                    <p>{data.overview_paragraph_1}</p>
                                                    <p>{data.overview_paragraph_2}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 3: 3 POINT POTENSI & ICON PICKER */}
                                {/* ============================================================= */}
                                {activeTab === 'highlights' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>3 Point Potensi Unggulan & Katalog Icon</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Atur 3 kartu keunggulan desa di bawah narasi. Anda dapat memilih icon dari katalog referensi lengkap yang telah disediakan.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Point 1 */}
                                            {(() => {
                                                const Icon1Comp = ICON_REGISTRY[data.overview_point_1_icon]?.icon || Wheat;
                                                return (
                                                    <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                    1
                                                                </span>
                                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                    Point Potensi 1
                                                                </h4>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => openIconPicker('point1')}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/80 text-red-700 dark:text-amber-400 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                            >
                                                                <Icon1Comp className="h-4 w-4" />
                                                                <span>Ganti Icon: {data.overview_point_1_icon}</span>
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                            <div className="sm:col-span-5">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Judul Point
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_1_title}
                                                                    onChange={(e) => setData('overview_point_1_title', e.target.value)}
                                                                    placeholder="Sektor Agraris Produktif"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-7">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Deskripsi Singkat
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_1_desc}
                                                                    onChange={(e) => setData('overview_point_1_desc', e.target.value)}
                                                                    placeholder="Didukung hamparan persawahan padi subur..."
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* Point 2 */}
                                            {(() => {
                                                const Icon2Comp = ICON_REGISTRY[data.overview_point_2_icon]?.icon || Fish;
                                                return (
                                                    <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                    2
                                                                </span>
                                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                    Point Potensi 2
                                                                </h4>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => openIconPicker('point2')}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/80 text-red-700 dark:text-amber-400 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                            >
                                                                <Icon2Comp className="h-4 w-4" />
                                                                <span>Ganti Icon: {data.overview_point_2_icon}</span>
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                            <div className="sm:col-span-5">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Judul Point
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_2_title}
                                                                    onChange={(e) => setData('overview_point_2_title', e.target.value)}
                                                                    placeholder="Budidaya Tambak Modern"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-7">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Deskripsi Singkat
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_2_desc}
                                                                    onChange={(e) => setData('overview_point_2_desc', e.target.value)}
                                                                    placeholder="Sentra perikanan air tawar & payau..."
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}

                                            {/* Point 3 */}
                                            {(() => {
                                                const Icon3Comp = ICON_REGISTRY[data.overview_point_3_icon]?.icon || HeartHandshake;
                                                return (
                                                    <div className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="h-6 w-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                                                                    3
                                                                </span>
                                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                    Point Potensi 3
                                                                </h4>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => openIconPicker('point3')}
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-300 dark:border-red-900/60 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/80 text-red-700 dark:text-amber-400 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                            >
                                                                <Icon3Comp className="h-4 w-4" />
                                                                <span>Ganti Icon: {data.overview_point_3_icon}</span>
                                                            </button>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                            <div className="sm:col-span-5">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Judul Point
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_3_title}
                                                                    onChange={(e) => setData('overview_point_3_title', e.target.value)}
                                                                    placeholder="Kearifan Gotong Royong"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                                />
                                                            </div>
                                                            <div className="sm:col-span-7">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Deskripsi Singkat
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={data.overview_point_3_desc}
                                                                    onChange={(e) => setData('overview_point_3_desc', e.target.value)}
                                                                    placeholder="Kerukunan antarwarga yang harmonis..."
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 4: BATAS WILAYAH 4 ARAH */}
                                {/* ============================================================= */}
                                {activeTab === 'borders' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <Compass className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>Batas Wilayah 4 Arah Mata Angin</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Kelola informasi batas desa sebelah Utara, Selatan, Timur, dan Barat yang tampil pada 4 kartu merah di atas peta spasial.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Utara */}
                                            <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-700/10 to-transparent dark:from-red-950/30 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-black uppercase tracking-wider text-red-700 dark:text-amber-400 flex items-center gap-1.5">
                                                        <ArrowUp className="h-3.5 w-3.5" /> Sebelah Utara
                                                    </span>
                                                    <span className="h-5 w-5 rounded-full bg-red-600/20 text-red-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold">U</span>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Berbatasan Dengan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_north_title}
                                                        onChange={(e) => setData('border_north_title', e.target.value)}
                                                        placeholder="Desa Guci & Desa Sumberwudi"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Keterangan Batas
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_north_desc}
                                                        onChange={(e) => setData('border_north_desc', e.target.value)}
                                                        placeholder="Batas area pertanian utara & bantaran sungai..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                    />
                                                </div>
                                            </div>

                                            {/* Selatan */}
                                            <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-700/10 to-transparent dark:from-red-950/30 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-black uppercase tracking-wider text-red-700 dark:text-amber-400 flex items-center gap-1.5">
                                                        <ArrowDown className="h-3.5 w-3.5" /> Sebelah Selatan
                                                    </span>
                                                    <span className="h-5 w-5 rounded-full bg-red-600/20 text-red-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold">S</span>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Berbatasan Dengan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_south_title}
                                                        onChange={(e) => setData('border_south_title', e.target.value)}
                                                        placeholder="Desa Karanggeneng"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Keterangan Batas
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_south_desc}
                                                        onChange={(e) => setData('border_south_desc', e.target.value)}
                                                        placeholder="Pusat kecamatan, SPBU Pertamina..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                    />
                                                </div>
                                            </div>

                                            {/* Timur */}
                                            <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-700/10 to-transparent dark:from-red-950/30 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-black uppercase tracking-wider text-red-700 dark:text-amber-400 flex items-center gap-1.5">
                                                        <ArrowRight className="h-3.5 w-3.5" /> Sebelah Timur
                                                    </span>
                                                    <span className="h-5 w-5 rounded-full bg-red-600/20 text-red-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold">T</span>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Berbatasan Dengan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_east_title}
                                                        onChange={(e) => setData('border_east_title', e.target.value)}
                                                        placeholder="Desa Sungelebak"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Keterangan Batas
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_east_desc}
                                                        onChange={(e) => setData('border_east_desc', e.target.value)}
                                                        placeholder="Kawasan perikanan air payau & sentra tambak..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                    />
                                                </div>
                                            </div>

                                            {/* Barat */}
                                            <div className="p-4 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-700/10 to-transparent dark:from-red-950/30 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[11px] font-black uppercase tracking-wider text-red-700 dark:text-amber-400 flex items-center gap-1.5">
                                                        <ArrowLeft className="h-3.5 w-3.5" /> Sebelah Barat
                                                    </span>
                                                    <span className="h-5 w-5 rounded-full bg-red-600/20 text-red-700 dark:text-amber-300 flex items-center justify-center text-[10px] font-bold">B</span>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Berbatasan Dengan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_west_title}
                                                        onChange={(e) => setData('border_west_title', e.target.value)}
                                                        placeholder="Desa Kalanganyar"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Keterangan Batas
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.border_west_desc}
                                                        onChange={(e) => setData('border_west_desc', e.target.value)}
                                                        placeholder="Akses perniagaan warga & hamparan persawahan..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 5: TITIK LOKASI PETA (LATITUDE & LONGITUDE) */}
                                {/* ============================================================= */}
                                {activeTab === 'map' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>Titik Lokasi Peta Spasial Desa</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Tambahkan titik fasilitas, kantor, pemukiman, atau potensi desa baru dengan memasukkan koordinat <strong>Latitude</strong> dan <strong>Longitude</strong>.
                                            </p>
                                        </div>

                                        {/* Form Tambah Titik Baru */}
                                        <div className="p-4 sm:p-5 rounded-xl border border-red-500/30 bg-red-50/40 dark:bg-zinc-950/50 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs font-bold text-red-800 dark:text-amber-300 flex items-center gap-1.5">
                                                    <Plus className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                    <span>Tambah Titik Koordinat Baru ke Peta</span>
                                                </h4>
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                                    Titik tengah desa: -7.0009188, 112.3597668
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                                <div className="sm:col-span-5">
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Nama Titik Lokasi *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPoint.name}
                                                        onChange={(e) => setNewPoint({ ...newPoint, name: e.target.value })}
                                                        placeholder="Contoh: Puskesmas Pembantu Karangwungu"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                                    />
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Kategori
                                                    </label>
                                                    <select
                                                        value={newPoint.category}
                                                        onChange={(e) => setNewPoint({ ...newPoint, category: e.target.value })}
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    >
                                                        <option value="gov">Pemerintahan</option>
                                                        <option value="pemukiman">Pemukiman</option>
                                                        <option value="umkm">UMKM & Wirausaha</option>
                                                        <option value="fasum">Fasilitas Umum</option>
                                                    </select>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Latitude *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPoint.lat}
                                                        onChange={(e) => setNewPoint({ ...newPoint, lat: e.target.value })}
                                                        placeholder="-7.0015"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Longitude *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPoint.lng}
                                                        onChange={(e) => setNewPoint({ ...newPoint, lng: e.target.value })}
                                                        placeholder="112.3598"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                    />
                                                </div>

                                                <div className="sm:col-span-10">
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Deskripsi / Keterangan Titik
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPoint.desc}
                                                        onChange={(e) => setNewPoint({ ...newPoint, desc: e.target.value })}
                                                        placeholder="Keterangan singkat tentang lokasi ini..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2 flex items-end">
                                                    <button
                                                        type="button"
                                                        onClick={handleAddMapPoint}
                                                        className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        <span>Tambah</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Daftar Titik Lokasi yang Tersedia */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                    Daftar Titik Peta Aktif ({data.map_points.length} Titik)
                                                </h4>
                                                <span className="text-[11px] text-zinc-400">
                                                    Titik ini otomatis muncul sebagai marker di peta Leaflet publik
                                                </span>
                                            </div>

                                            <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
                                                {data.map_points.length === 0 ? (
                                                    <div className="p-8 text-center text-xs text-zinc-400">
                                                        Belum ada titik lokasi yang ditambahkan. Gunakan form di atas untuk menambah titik.
                                                    </div>
                                                ) : (
                                                    data.map_points.map((pt, idx) => {
                                                        const catBadgeStyles = {
                                                            gov: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900',
                                                            pemukiman: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900',
                                                            umkm: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900',
                                                            fasum: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900',
                                                        };

                                                        return (
                                                            <div
                                                                key={pt.id || idx}
                                                                className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                                                            >
                                                                <div className="flex items-start gap-3 min-w-0">
                                                                    <div className="h-8 w-8 rounded-lg bg-red-600/10 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <div className="min-w-0 space-y-1">
                                                                        <div className="flex items-center gap-2 flex-wrap">
                                                                            <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                                                {pt.name}
                                                                            </h5>
                                                                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${catBadgeStyles[pt.category] || 'bg-zinc-100 text-zinc-600'}`}>
                                                                                {pt.categoryLabel || pt.category}
                                                                            </span>
                                                                        </div>
                                                                        {pt.desc && (
                                                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                                                                                {pt.desc}
                                                                            </p>
                                                                        )}
                                                                        <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-mono pt-0.5">
                                                                            <span>Lat: {pt.lat}</span>
                                                                            <span>•</span>
                                                                            <span>Lng: {pt.lng}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteMapPoint(pt.id)}
                                                                    className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0 cursor-pointer"
                                                                    title="Hapus titik ini"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MODAL VISUAL ICON PICKER LENGKAP */}
            {/* ========================================================================= */}
            {iconPickerTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>
                                        Pilih Icon untuk{' '}
                                        {iconPickerTarget === 'photo1'
                                            ? 'Badge Foto 1 (Lanskap Utama)'
                                            : iconPickerTarget === 'photo2'
                                            ? 'Badge Foto 2 (Sub Atas)'
                                            : iconPickerTarget === 'photo3'
                                            ? 'Badge Foto 3 (Sub Bawah)'
                                            : iconPickerTarget === 'point1'
                                            ? 'Point Potensi 1'
                                            : iconPickerTarget === 'point2'
                                            ? 'Point Potensi 2'
                                            : 'Point Potensi 3'}
                                    </span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Pilih icon dari katalog referensi yang tersedia atau gunakan kotak pencarian.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIconPickerTarget(null)}
                                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Search & Category Filter */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={iconSearch}
                                    onChange={(e) => setIconSearch(e.target.value)}
                                    placeholder="Cari icon (misal: padi, ikan, toko, gotong royong, pohon...)"
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20"
                                    autoFocus
                                />
                            </div>

                            {/* Category Pills */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
                                {iconCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setIconCategoryFilter(cat)}
                                        className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                                            iconCategoryFilter === cat
                                                ? 'bg-red-600 text-white font-bold'
                                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                    >
                                        {cat === 'all' ? 'Semua Kategori' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Icon Grid */}
                        <div className="p-4 overflow-y-auto max-h-[50vh]">
                            {iconEntries.length === 0 ? (
                                <div className="p-8 text-center text-xs text-zinc-400">
                                    Tidak ditemukan icon yang cocok dengan pencarian "{iconSearch}".
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {iconEntries.map(([iconKey, item]) => {
                                        const Comp = item.icon;
                                        const isCurrent =
                                            (iconPickerTarget === 'photo1' && data.overview_photo_1_icon === iconKey) ||
                                            (iconPickerTarget === 'photo2' && data.overview_photo_2_icon === iconKey) ||
                                            (iconPickerTarget === 'photo3' && data.overview_photo_3_icon === iconKey) ||
                                            (iconPickerTarget === 'point1' && data.overview_point_1_icon === iconKey) ||
                                            (iconPickerTarget === 'point2' && data.overview_point_2_icon === iconKey) ||
                                            (iconPickerTarget === 'point3' && data.overview_point_3_icon === iconKey);

                                        return (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                onClick={() => handleSelectIcon(iconKey)}
                                                className={`p-3 rounded-xl border text-left flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                                                    isCurrent
                                                        ? 'bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500 shadow-xs'
                                                        : 'bg-white dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 hover:border-red-300 dark:hover:border-red-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                                                }`}
                                            >
                                                <div className={`p-2.5 rounded-lg ${
                                                    isCurrent
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-600 group-hover:text-white transition-colors'
                                                }`}>
                                                    <Comp className="h-5 w-5" />
                                                </div>
                                                <div className="text-center w-full min-w-0">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block truncate">
                                                        {iconKey}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate mt-0.5">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIconPickerTarget(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
