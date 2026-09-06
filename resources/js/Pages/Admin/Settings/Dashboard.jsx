import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Sliders,
    Sparkles,
    Image as ImageIcon,
    Upload,
    Check,
    Save,
    ExternalLink,
    Quote,
    Layers,
    Info,
    Eye,
    Shield,
    Wheat,
    Fish,
    Store,
    Search,
    ArrowRight,
    MapPin,
    BarChart3,
    Plus,
    Trash2,
    ArrowUp,
    ArrowDown,
    Home as HomeIcon,
    Users,
    User,
    UserCheck,
    LandPlot,
    Building2,
    Building,
    Activity,
    Briefcase,
    RotateCcw,
    CheckSquare,
    Square,
    Newspaper,
    ChevronDown,
} from 'lucide-react';
import ImageCropModal from '@/Components/Admin/ImageCropModal';
import IconPickerModal from '@/Components/Admin/IconPickerModal';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';

const AVAILABLE_ICONS = [
    { value: 'Home', label: 'Rumah (Kepala Keluarga)', icon: HomeIcon },
    { value: 'Users', label: 'Banyak Orang (Total Penduduk)', icon: Users },
    { value: 'User', label: 'Pria (Laki-laki)', icon: User },
    { value: 'UserCheck', label: 'Wanita (Perempuan)', icon: UserCheck },
    { value: 'LandPlot', label: 'Wilayah / Wilayah Luas', icon: LandPlot },
    { value: 'Wheat', label: 'Pertanian / Sawah Padi', icon: Wheat },
    { value: 'Fish', label: 'Perikanan / Tambak Bandeng', icon: Fish },
    { value: 'Building2', label: 'Gedung / Rukun Tetangga (RT)', icon: Building2 },
    { value: 'Building', label: 'Gedung / Rukun Warga (RW)', icon: Building },
    { value: 'Activity', label: 'Aktivitas / Usia Produktif', icon: Activity },
    { value: 'Store', label: 'Toko / UMKM Warga', icon: Store },
    { value: 'MapPin', label: 'Pin Lokasi / Fasilitas', icon: MapPin },
    { value: 'Shield', label: 'Perisai / Keamanan Hansip', icon: Shield },
    { value: 'Briefcase', label: 'Tas Kerja / Lapangan Kerja', icon: Briefcase },
];

const DEFAULT_DEMOGRAPHIC_METRICS = [
    {
        id: 'total_families',
        label: 'Kepala Keluarga',
        value: 985,
        suffix: 'KK',
        icon: 'Home',
        enabled: true,
        source_key: 'total_families',
    },
    {
        id: 'total_citizens',
        label: 'Total Jiwa',
        value: 3482,
        suffix: 'Jiwa',
        icon: 'Users',
        enabled: true,
        source_key: 'total_citizens',
    },
    {
        id: 'male_citizens',
        label: 'Laki-Laki',
        value: 1724,
        suffix: 'Jiwa',
        icon: 'User',
        enabled: true,
        source_key: 'male_citizens',
    },
    {
        id: 'female_citizens',
        label: 'Perempuan',
        value: 1758,
        suffix: 'Jiwa',
        icon: 'UserCheck',
        enabled: true,
        source_key: 'female_citizens',
    },
    {
        id: 'total_area_ha',
        label: 'Luas Wilayah',
        value: 245.8,
        suffix: 'Ha',
        icon: 'LandPlot',
        enabled: true,
        source_key: 'total_area_ha',
    },
    {
        id: 'agriculture_area_ha',
        label: 'Sawah Pertanian',
        value: 160.5,
        suffix: 'Ha',
        icon: 'Wheat',
        enabled: true,
        source_key: 'agriculture_area_ha',
    },
    {
        id: 'fishery_area_ha',
        label: 'Tambak Perikanan',
        value: 52.3,
        suffix: 'Ha',
        icon: 'Fish',
        enabled: true,
        source_key: 'fishery_area_ha',
    },
    {
        id: 'total_rt',
        label: 'Rukun Tetangga',
        value: 14,
        suffix: 'RT',
        icon: 'Building2',
        enabled: true,
        source_key: 'total_rt',
    },
    {
        id: 'total_rw',
        label: 'Rukun Warga',
        value: 4,
        suffix: 'RW',
        icon: 'Building',
        enabled: false,
        source_key: 'total_rw',
    },
    {
        id: 'productive_age',
        label: 'Usia Produktif',
        value: 2150,
        suffix: 'Jiwa',
        icon: 'Activity',
        enabled: false,
        source_key: '',
    },
    {
        id: 'umkm_count',
        label: 'UMKM & Usaha',
        value: 48,
        suffix: 'Unit',
        icon: 'Store',
        enabled: false,
        source_key: '',
    },
    {
        id: 'worship_facilities',
        label: 'Tempat Ibadah',
        value: 6,
        suffix: 'Unit',
        icon: 'MapPin',
        enabled: false,
        source_key: '',
    },
];

export default function DashboardSettings({ settings = {}, allPotentials = [], allPosts = [] }) {
    const [activeTab, setActiveTab] = useState('hero');
    const [potentialSearch, setPotentialSearch] = useState('');
    const [postSearch, setPostSearch] = useState('');
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Initial metrics from backend or default
    const initialMetrics = (settings.demographics_metrics_data && settings.demographics_metrics_data.length > 0)
        ? settings.demographics_metrics_data
        : DEFAULT_DEMOGRAPHIC_METRICS;
    // Form state
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        // 1. Hero Section
        hero_badge: settings.hero_badge || 'Kecamatan Karanggeneng • Kabupaten Lamongan',
        hero_title: settings.hero_title || "Website Resmi\nDesa Karangwungu",
        hero_description: settings.hero_description || 'Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.',
        hero_image: settings.hero_image || '/assets/images/hero.jpg',
        hero_images: Array.isArray(settings.hero_images_data) && settings.hero_images_data.length > 0
            ? settings.hero_images_data
            : [settings.hero_image || '/assets/images/hero.jpg'],
        hero_image_file: null,
        hero_image_file_0: null,
        hero_image_file_1: null,
        hero_image_file_2: null,
        hero_image_file_3: null,
        hero_image_file_4: null,

        // 2. Sambutan Kepala Desa
        welcome_title: settings.welcome_title || 'Membangun Desa Karangwungu yang Modern, Guyub Rukun, dan Sejahtera',
        welcome_greeting: settings.welcome_greeting || (
            settings.welcome_content?.startsWith('“Assalamu')
                ? settings.welcome_content.split('\n\n')[0]
                : '“Assalamu’alaikum Warahmatullahi Wabarakatuh.”'
        ),
        welcome_content: settings.welcome_greeting
            ? (settings.welcome_content || '')
            : (
                settings.welcome_content?.startsWith('“Assalamu')
                    ? settings.welcome_content.split('\n\n').slice(1).join('\n\n')
                    : (settings.welcome_content || "Selamat datang di portal resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Website ini kami dedikasikan sebagai wujud komitmen keterbukaan informasi publik, kemudahan pelayanan surat mandiri daring, serta etalase potensi pertanian dan tambak modern desa tercinta kita.\n\nMelalui semangat kebersamaan dan inovasi digital, mari kita bersama melangkah memajukan Desa Karangwungu menjadi desa yang mandiri, transparan, dan memberikan kemakmuran nyata bagi seluruh masyarakat.")
            ),
        welcome_leader_name: settings.welcome_leader_name || 'H. Moh. Suhartono, S.Sos',
        welcome_leader_position: settings.welcome_leader_position || 'Kepala Desa Karangwungu',
        welcome_leader_photo: settings.welcome_leader_photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        welcome_leader_photo_file: null,

        // 3. Selayang Pandang
        overview_location: settings.overview_location || 'Kecamatan Karanggeneng, Kabupaten Lamongan',
        overview_content: settings.overview_content || "Desa Karangwungu adalah salah satu dari 18 desa di Kecamatan Karanggeneng, Kabupaten Lamongan, dengan mayoritas penduduk beragama Islam dan beragam mata pencaharian seperti petani, petambak, pedagang, PNS, hingga wirausaha.\n\nWilayah pertaniannya terdiri dari sawah dan tambak yang menghasilkan dua kali panen padi dan satu kali palawija, atau dua kali panen ikan dan satu kali padi setiap tahun. Terletak strategis di jalur jalan kolektor primer Lamongan - Gresik.",
        overview_card_1_badge: settings.overview_card_1_badge || 'Pertanian Unggul',
        overview_card_1_title: settings.overview_card_1_title || 'Hamparan Sawah Padi & Ketahanan Pangan',
        overview_card_1_image: settings.overview_card_1_image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
        overview_card_1_image_file: null,

        overview_card_2_badge: settings.overview_card_2_badge || 'Tambak Modern',
        overview_card_2_title: settings.overview_card_2_title || 'Budidaya Bandeng & Udang',
        overview_card_2_image: settings.overview_card_2_image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        overview_card_2_image_file: null,

        overview_card_3_badge: settings.overview_card_3_badge || 'UMKM & Warga',
        overview_card_3_title: settings.overview_card_3_title || 'Wirausaha & Guyub Rukun',
        overview_card_3_image: settings.overview_card_3_image || 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
        overview_card_3_image_file: null,

        // 4. Statistik Demografi & Wilayah di Beranda
        demographics_section_title: settings.demographics_section_title || 'Statistik Demografi & Wilayah Desa',
        demographics_section_subtitle: settings.demographics_section_subtitle || 'Data Terverifikasi 2026',
        demographics_metrics: Array.isArray(settings.demographics_metrics_data) && settings.demographics_metrics_data.length > 0
            ? settings.demographics_metrics_data
            : DEFAULT_DEMOGRAPHIC_METRICS,

        // 5. Produk & Komoditas Unggulan (Potensi)
        potentials_mode: settings.potentials_mode || 'latest',
        potentials_limit: Number(settings.potentials_limit) || 4,
        potentials_custom_ids: settings.potentials_custom_ids_data || [],
        potentials_title: settings.potentials_title || 'Produk & Komoditas Unggulan Karangwungu',
        potentials_subtitle: settings.potentials_subtitle || 'Menampilkan komoditas tambak bandeng, pertanian padi sawah, serta aneka produk UMKM mandiri warga desa.',

        // 6. Warta & Berita Desa
        posts_mode: settings.posts_mode || 'latest',
        posts_limit: Number(settings.posts_limit) || 4,
        posts_custom_ids: settings.posts_custom_ids_data || [],
        posts_title: settings.posts_title || 'Warta & Pengumuman Desa',
        posts_subtitle: settings.posts_subtitle || 'Informasi kegiatan pemerintahan, pembangunan infrastruktur, pertanian, dan kemasyarakatan Desa Karangwungu.',
    });

    const initialHeroImages = Array.isArray(settings.hero_images_data) && settings.hero_images_data.length > 0
        ? settings.hero_images_data
        : [settings.hero_image || '/assets/images/hero.jpg'];

    // Local previews for uploaded files
    const [previews, setPreviews] = useState({
        hero: data.hero_image,
        hero_images: initialHeroImages,
        leader: data.welcome_leader_photo,
        card1: data.overview_card_1_image,
        card2: data.overview_card_2_image,
        card3: data.overview_card_3_image,
    });
    const [previewHeroIdx, setPreviewHeroIdx] = useState(0);

    // Crop Modal State for Kades Leader Photo (3:4 ratio)
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState(null);

    // Visual Icon Picker Modal State for Demographics & Statistics
    const [iconPickerIndex, setIconPickerIndex] = useState(null);

    const handleLeaderPhotoSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImageToCrop(event.target.result);
            setCropModalOpen(true);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const handleOpenCropperForCurrentLeader = () => {
        if (previews.leader) {
            setImageToCrop(previews.leader);
            setCropModalOpen(true);
        }
    };

    const handleLeaderCropComplete = (croppedFile, previewUrl) => {
        setData('welcome_leader_photo_file', croppedFile);
        setPreviews((prev) => ({ ...prev, leader: previewUrl }));
    };

    // Helper to compress/resize large image files before upload (canvas-based)
    const compressImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.85) => {
        return new Promise((resolve) => {
            if (!file || !file.type.startsWith('image/') || file.size <= 800 * 1024) {
                resolve(file);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let { width, height } = img;
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width = Math.round(width * ratio);
                        height = Math.round(height * ratio);
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                resolve(file);
                                return;
                            }
                            const compressedFile = new File(
                                [blob],
                                file.name.replace(/\.[^/.]+$/, '') + '.jpg',
                                {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                }
                            );
                            resolve(compressedFile);
                        },
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = () => resolve(file);
            };
            reader.onerror = () => resolve(file);
        });
    };

    const handleFileChange = async (field, previewKey, e) => {
        const rawFile = e.target.files[0];
        if (rawFile) {
            const file = await compressImage(rawFile);
            setData(field, file);
            const objectUrl = URL.createObjectURL(file);
            setPreviews((prev) => ({ ...prev, [previewKey]: objectUrl }));
        }
    };

    const handleSliderFileChange = async (index, e) => {
        const rawFile = e.target.files[0];
        if (rawFile) {
            const file = await compressImage(rawFile);
            setData(`hero_image_file_${index}`, file);
            const objectUrl = URL.createObjectURL(file);

            const nextHeroImages = [...(data.hero_images || [])];
            nextHeroImages[index] = objectUrl;
            setData('hero_images', nextHeroImages);

            setPreviews((prev) => {
                const nextPrev = [...(prev.hero_images || [])];
                nextPrev[index] = objectUrl;
                return {
                    ...prev,
                    hero: index === 0 ? objectUrl : prev.hero,
                    hero_images: nextPrev,
                };
            });
            setPreviewHeroIdx(index);
        }
    };

    const handleRemoveSliderImage = (index) => {
        if (index === 0 && (data.hero_images || []).length <= 1) {
            alert('Minimal harus ada 1 foto hero utama.');
            return;
        }
        const nextHeroImages = (data.hero_images || []).filter((_, i) => i !== index);
        setData('hero_images', nextHeroImages);
        setPreviews((prev) => {
            const nextPrev = (prev.hero_images || []).filter((_, i) => i !== index);
            return {
                ...prev,
                hero: nextPrev[0] || prev.hero,
                hero_images: nextPrev,
            };
        });
        setPreviewHeroIdx(0);
    };

    // Metric management handlers
    const handleToggleMetric = (index) => {
        const next = [...data.demographics_metrics];
        next[index] = {
            ...next[index],
            enabled: !next[index].enabled,
        };
        setData('demographics_metrics', next);
    };

    const handleUpdateMetric = (index, field, value) => {
        const next = [...data.demographics_metrics];
        next[index] = {
            ...next[index],
            [field]: value,
        };
        setData('demographics_metrics', next);
    };

    const handleMoveMetric = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= data.demographics_metrics.length) return;
        const next = [...data.demographics_metrics];
        const temp = next[index];
        next[index] = next[targetIndex];
        next[targetIndex] = temp;
        setData('demographics_metrics', next);
    };

    const handleAddMetric = () => {
        const newMetric = {
            id: `custom_${Date.now()}`,
            label: 'Data Statistik Baru',
            value: '0',
            suffix: '',
            icon: 'Activity',
            enabled: true,
            source_key: '',
        };
        setData('demographics_metrics', [...data.demographics_metrics, newMetric]);
    };

    const handleDeleteMetric = (index) => {
        const next = data.demographics_metrics.filter((_, i) => i !== index);
        setData('demographics_metrics', next);
    };

    const handleResetMetrics = () => {
        if (window.confirm('Kembalikan data statistik demografi ke daftar standar default?')) {
            setData('demographics_metrics', DEFAULT_DEMOGRAPHIC_METRICS);
        }
    };

    // Potentials handlers
    const handleTogglePotentialCustom = (id) => {
        const current = data.potentials_custom_ids || [];
        if (current.includes(id)) {
            setData('potentials_custom_ids', current.filter((item) => item !== id));
        } else {
            setData('potentials_custom_ids', [...current, id]);
        }
    };

    const handleSelectAllPotentials = () => {
        setData('potentials_custom_ids', allPotentials.map((p) => p.id));
    };

    const handleClearAllPotentials = () => {
        setData('potentials_custom_ids', []);
    };

    // Posts handlers
    const handleTogglePostCustom = (id) => {
        const current = data.posts_custom_ids || [];
        if (current.includes(id)) {
            setData('posts_custom_ids', current.filter((item) => item !== id));
        } else {
            setData('posts_custom_ids', [...current, id]);
        }
    };

    const handleSelectLatestPosts = (count = 4) => {
        setData('posts_custom_ids', allPosts.slice(0, count).map((p) => p.id));
    };

    const handleClearAllPosts = () => {
        setData('posts_custom_ids', []);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(`/${adminPath}/settings/dashboard`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const tabs = [
        { id: 'hero', name: 'Hero Banner Utama', icon: Sparkles, desc: 'Judul, narasi utama & foto sampul beranda' },
        { id: 'welcome', name: 'Sambutan Kepala Desa', icon: Quote, desc: 'Pesan sambutan, foto profil & identitas Kades' },
        { id: 'overview', name: 'Selayang Pandang (3 Foto)', icon: Layers, desc: '3 kartu visual potensi unggulan desa' },
        { id: 'demographics', name: 'Statistik Demografi & Wilayah', icon: BarChart3, desc: 'Pilih & atur data statistik yang tampil di beranda' },
        { id: 'potentials', name: 'Produk & Komoditas Unggulan', icon: Store, desc: 'Atur mode terbaru atau kustom produk unggulan' },
        { id: 'posts', name: 'Warta & Berita Desa', icon: Newspaper, desc: 'Atur mode terbaru, unggulan, atau kustom artikel' },
    ];

    return (
        <AdminLayout title="Konfigurasi Dashboard">
            <div className="w-full space-y-6 pb-12">
                {/* 1. Clean Open Page Header (No Box Frame, No Icon Badge) */}
                <AdminPageHeader
                    title="Konfigurasi Beranda Website"
                    description="Kelola tampilan visual, teks narasi, sambutan kepala desa, dan 3 foto unggulan beranda desa secara langsung."
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Beranda' },
                    ]}
                    actions={
                        <>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white shadow-xs transition-colors"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Website</span>
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

                {/* 2. Unified Master-Detail Layout (Tabs on Left, Integrated Clean Content on Right) */}
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

                        {/* Petunjuk Pengisian Singkat */}
                        <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200/80 dark:bg-zinc-900/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-400 shadow-xs">
                            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-zinc-200">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Petunjuk Pengisian</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Pilih seksi di atas. Form dan pratinjau foto terpadu langsung dalam satu tampilan rapi tanpa perlu berpindah-pindah.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Unified Single Content Area (lg:col-span-9, Tanpa Bungkus Container Ganda) */}
                    <div className="lg:col-span-9">
                        <form onSubmit={handleSubmit} className="w-full">
                            {/* TAB 1: HERO BANNER UTAMA */}
                            {activeTab === 'hero' && (
                                <div className="space-y-6">
                                    {/* 1. Manajemen Koleksi 5 Foto Slider Hero */}
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                                    <span>Slider Foto Sampul Hero (Maksimal 5 Foto)</span>
                                                </h2>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Unggah hingga 5 foto pemandangan / kegiatan desa. Foto akan berganti otomatis secara halus di beranda utama.
                                                </p>
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-amber-400 border border-red-500/20 shrink-0 self-start sm:self-center font-mono">
                                                {(previews.hero_images || []).length} / 5 Foto Aktif
                                            </span>
                                        </div>

                                        {/* Grid 5 Slot Foto Slider */}
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                            {[0, 1, 2, 3, 4].map((slotIdx) => {
                                                const currentImg = previews.hero_images?.[slotIdx];
                                                const isFilled = Boolean(currentImg);
                                                const isNextAvailable = slotIdx === (previews.hero_images?.length || 0);

                                                return (
                                                    <div
                                                        key={slotIdx}
                                                        className={`relative rounded-xl overflow-hidden border transition-all ${
                                                            isFilled
                                                                ? slotIdx === previewHeroIdx
                                                                    ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-md bg-zinc-900'
                                                                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300'
                                                                : isNextAvailable
                                                                    ? 'border-2 border-dashed border-red-500/40 dark:border-amber-400/40 bg-red-50/20 dark:bg-amber-950/10'
                                                                    : 'border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30 opacity-40'
                                                        }`}
                                                    >
                                                        {isFilled ? (
                                                            <div className="flex flex-col h-full">
                                                                {/* Thumbnail Image */}
                                                                <div
                                                                    onClick={() => setPreviewHeroIdx(slotIdx)}
                                                                    className="relative h-24 sm:h-28 w-full bg-cover bg-center cursor-pointer group"
                                                                    style={{ backgroundImage: `url('${currentImg}')` }}
                                                                >
                                                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                                                                    <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                                                                        {slotIdx === 0 ? 'Foto 1 (Utama)' : `Foto ${slotIdx + 1}`}
                                                                    </span>
                                                                    {slotIdx === previewHeroIdx && (
                                                                        <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400 text-zinc-950">
                                                                            Ditampilkan
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {/* Action Buttons */}
                                                                <div className="p-2 bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-1">
                                                                    <label className="text-[10px] font-bold text-zinc-700 dark:text-zinc-200 hover:text-red-600 dark:hover:text-amber-300 cursor-pointer transition-colors flex items-center gap-1">
                                                                        <Upload className="h-3 w-3" />
                                                                        <span>Ganti</span>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            onChange={(e) => handleSliderFileChange(slotIdx, e)}
                                                                            className="hidden"
                                                                        />
                                                                    </label>

                                                                    {slotIdx > 0 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleRemoveSliderImage(slotIdx)}
                                                                            className="text-[10px] font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-0.5 cursor-pointer"
                                                                        >
                                                                            <Trash2 className="h-3 w-3" />
                                                                            <span>Hapus</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : isNextAvailable ? (
                                                            <label className="h-32 sm:h-36 flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-red-50/50 dark:hover:bg-amber-950/20 transition-all group">
                                                                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-amber-400/10 text-red-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                                                                    <Plus className="h-4 w-4" />
                                                                </div>
                                                                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 mt-2 leading-tight">
                                                                    + Foto Slot {slotIdx + 1}
                                                                </span>
                                                                <span className="text-[9px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                                    Klik untuk unggah
                                                                </span>
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleSliderFileChange(slotIdx, e)}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        ) : (
                                                            <div className="h-32 sm:h-36 flex flex-col items-center justify-center p-3 text-center">
                                                                <span className="text-[10px] font-medium text-zinc-400">
                                                                    Slot {slotIdx + 1}
                                                                </span>
                                                                <span className="text-[9px] text-zinc-400/80 mt-0.5">
                                                                    Belum terisi
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                            Format gambar yang didukung: JPG, PNG, WebP (maksimal 5MB per foto). Rekomendasi resolusi landscape 1920x1080.
                                        </p>
                                    </div>

                                    {/* 2. Pratinjau Live Simulasi Mockup Website */}
                                    <div className="space-y-2.5 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                                <Eye className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                <span>Simulasi Tampilan Beranda: Foto {previewHeroIdx + 1} dari {(previews.hero_images || []).length}</span>
                                            </span>
                                            {(previews.hero_images || []).length > 1 && (
                                                <div className="flex items-center gap-1.5">
                                                    {(previews.hero_images || []).map((_, dotIdx) => (
                                                        <button
                                                            key={dotIdx}
                                                            type="button"
                                                            onClick={() => setPreviewHeroIdx(dotIdx)}
                                                            className={`transition-all duration-200 rounded-full cursor-pointer ${
                                                                dotIdx === previewHeroIdx
                                                                    ? 'w-5 h-1.5 bg-amber-400'
                                                                    : 'w-1.5 h-1.5 bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-200'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-xl group">
                                            {/* Simulated Top Navbar Bar */}
                                            <div className="relative z-10 bg-red-700/95 border-b border-red-800/80 px-4 py-2 flex items-center justify-between text-white shadow-xs">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/assets/images/logo.png"
                                                        alt="Logo Desa"
                                                        className="h-4 sm:h-5 w-auto object-contain drop-shadow-xs"
                                                    />
                                                    <span className="text-[11px] font-bold tracking-tight">
                                                        Kec. Karanggeneng, Kab. Lamongan
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-medium text-red-200 hidden sm:inline">
                                                    Pratinjau Halaman Beranda (Foto {previewHeroIdx + 1})
                                                </span>
                                            </div>

                                            {/* Background Image Container */}
                                            <div className="relative min-h-[440px] sm:min-h-[500px] flex flex-col justify-between overflow-hidden">
                                                <img
                                                    src={previews.hero_images?.[previewHeroIdx] || previews.hero}
                                                    alt="Hero Background Preview"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-101 transition-all duration-700"
                                                />

                                                {/* Cinematic Vignette & Gradients Identical to Live Web */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/70" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />

                                                {/* Hero Content Canvas */}
                                                <div className="relative z-10 p-5 sm:p-8 lg:p-10 my-auto">
                                                    <div className="max-w-xl space-y-3 sm:space-y-4">
                                                        {/* Pill Badge */}
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white tracking-wide shadow-md">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                                                            <span>{data.hero_badge || 'Kecamatan Karanggeneng • Kabupaten Lamongan'}</span>
                                                        </div>

                                                        {/* Title with Village Emblem Beside It */}
                                                        <div className="flex items-center gap-3 sm:gap-4">
                                                            <img
                                                                src="/assets/images/logo.png"
                                                                alt="Lambang Resmi Desa Karangwungu"
                                                                className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0 drop-shadow-2xl"
                                                            />
                                                            <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white leading-[1.15] drop-shadow-xl whitespace-pre-line">
                                                                {data.hero_title || 'Website Resmi\nDesa Karangwungu'}
                                                            </h1>
                                                        </div>

                                                        {/* Narrative Description */}
                                                        <p className="text-[11px] sm:text-xs font-normal text-zinc-200 leading-relaxed max-w-lg drop-shadow-md">
                                                            {data.hero_description}
                                                        </p>

                                                        {/* 2 Interactive Action Chips */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5 max-w-lg">
                                                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                                                                <div className="flex items-center gap-2">
                                                                    <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                                                                    <div>
                                                                        <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                                                                            Ajukan Surat Online
                                                                        </h4>
                                                                        <p className="text-[9px] sm:text-[10px] text-zinc-300 mt-0.5 leading-tight">
                                                                            Pelayanan administrasi mandiri
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <ArrowRight className="h-3.5 w-3.5 text-zinc-300 shrink-0 ml-1.5" />
                                                            </div>

                                                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
                                                                <div className="flex items-center gap-2">
                                                                    <Search className="h-4 w-4 text-amber-400 shrink-0" />
                                                                    <div>
                                                                        <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                                                                            Lacak Status Surat
                                                                        </h4>
                                                                        <p className="text-[9px] sm:text-[10px] text-zinc-300 mt-0.5 leading-tight">
                                                                            Pantau proses dokumen Anda
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <ArrowRight className="h-3.5 w-3.5 text-zinc-300 shrink-0 ml-1.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Bottom Slider Dots in Mockup */}
                                                {(previews.hero_images || []).length > 1 && (
                                                    <div className="relative z-10 pb-3 flex items-center justify-center gap-1.5">
                                                        {(previews.hero_images || []).map((_, dotIdx) => (
                                                            <button
                                                                key={dotIdx}
                                                                type="button"
                                                                onClick={() => setPreviewHeroIdx(dotIdx)}
                                                                className={`transition-all duration-200 rounded-full ${
                                                                    dotIdx === previewHeroIdx
                                                                        ? 'w-5 h-1 bg-amber-400'
                                                                        : 'w-1.5 h-1 bg-white/50 hover:bg-white'
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pembatas Bersih */}
                                    <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                    {/* Input Teks Hero */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Pill Badge / Subtitle Lokasi
                                            </label>
                                            <input
                                                type="text"
                                                value={data.hero_badge}
                                                onChange={(e) => setData('hero_badge', e.target.value)}
                                                placeholder="Kecamatan Karanggeneng • Kabupaten Lamongan"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-medium"
                                            />
                                            {errors.hero_badge && (
                                                <p className="text-[11px] text-red-500 mt-1">{errors.hero_badge}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Judul Utama Hero
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={data.hero_title}
                                                onChange={(e) => setData('hero_title', e.target.value)}
                                                placeholder="Website Resmi&#10;Desa Karangwungu"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-bold"
                                            />
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">
                                                Gunakan enter untuk memisahkan baris pertama dan baris kedua teks judul.
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Deskripsi Narasi Beranda
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={data.hero_description}
                                                onChange={(e) => setData('hero_description', e.target.value)}
                                                placeholder="Mewujudkan tata kelola desa yang transparan..."
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all leading-relaxed font-normal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: SAMBUTAN KEPALA DESA */}
                            {activeTab === 'welcome' && (
                                <div className="space-y-6">
                                    {/* Baris Atas Terpadu: Foto Potret & Identitas Kades */}
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                                        {/* Foto Potret Kades (Persis Sesuai Tampilan Kartu di Web) */}
                                        <div className="sm:col-span-4 lg:col-span-3 space-y-2">
                                            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl group max-w-sm mx-auto">
                                                <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                                                    <img
                                                        src={previews.leader}
                                                        alt={data.welcome_leader_name}
                                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent backdrop-blur-xs text-white">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <div className="h-4 w-4 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xs shrink-0">
                                                            <Shield className="h-2.5 w-2.5 text-amber-300" />
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                                                            Pemerintah Desa
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xs sm:text-sm font-bold leading-tight text-white">
                                                        {data.welcome_leader_name || 'H. Moh. Suhartono, S.Sos'}
                                                    </h3>
                                                    <p className="text-[11px] text-zinc-300 font-medium mt-0.5">
                                                        {data.welcome_leader_position || 'Kepala Desa Karangwungu'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all shadow-2xs">
                                                        <Upload className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                        <span>Ganti Foto</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleLeaderPhotoSelect}
                                                            className="hidden"
                                                        />
                                                    </label>

                                                    {previews.leader && (
                                                        <button
                                                            type="button"
                                                            onClick={handleOpenCropperForCurrentLeader}
                                                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-amber-300/60 dark:border-amber-500/40 bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-xs font-bold text-amber-900 dark:text-amber-200 transition-all shadow-2xs cursor-pointer"
                                                            title="Sesuaikan posisi atau crop foto ini ke rasio 3:4"
                                                        >
                                                            <Crop className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                                                            <span>Crop Foto</span>
                                                        </button>
                                                    )}
                                                </div>

                                                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
                                                    Rasio 3:4 vertikal potret dinas
                                                </p>
                                            </div>
                                        </div>

                                        {/* Input Identitas Kades & Judul Sambutan */}
                                        <div className="sm:col-span-8 lg:col-span-9 space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Nama Lengkap Kepala Desa
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.welcome_leader_name}
                                                        onChange={(e) => setData('welcome_leader_name', e.target.value)}
                                                        placeholder="H. Moh. Suhartono, S.Sos"
                                                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-semibold"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Jabatan Resmi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.welcome_leader_position}
                                                        onChange={(e) => setData('welcome_leader_position', e.target.value)}
                                                        placeholder="Kepala Desa Karangwungu"
                                                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-semibold"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Judul Sambutan
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.welcome_title}
                                                    onChange={(e) => setData('welcome_title', e.target.value)}
                                                    placeholder="Membangun Desa Karangwungu yang Modern..."
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-bold"
                                                />
                                            </div>

                                            {/* Salam Pembuka Sambutan (Terpisah dari Isi) */}
                                            <div>
                                                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Salam Pembuka Sambutan
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.welcome_greeting}
                                                    onChange={(e) => setData('welcome_greeting', e.target.value)}
                                                    placeholder="“Assalamu’alaikum Warahmatullahi Wabarakatuh.”"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-medium italic"
                                                />
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">
                                                    Teks salam pembuka (akan otomatis bergaris aksen khas di halaman publik).
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pembatas Bersih */}
                                    <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                    {/* Isi Teks Sambutan Lengkap */}
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                            Isi Teks Sambutan (Paragraf Narasi)
                                        </label>
                                        <textarea
                                            rows={8}
                                            value={data.welcome_content}
                                            onChange={(e) => setData('welcome_content', e.target.value)}
                                            placeholder="Selamat datang di portal resmi Pemerintah Desa Karangwungu..."
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all leading-relaxed font-normal"
                                        />
                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">
                                            Gunakan enter dua kali antar paragraf untuk memisahkan alinea teks sambutan.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: SELAYANG PANDANG (3 FOTO TERPADU LANGSUNG) */}
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    {/* 1. Pratinjau Langsung Persis Sesuai Tampilan Web */}
                                    <div className="space-y-3">
                                        <div>
                                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                <Eye className="h-4 w-4 text-amber-500" />
                                                <span>Pratinjau Selayang Pandang Halaman Depan</span>
                                            </h2>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Simulasi susunan narasi wilayah desa berdampingan langsung dengan 3 kartu bento visual.
                                            </p>
                                        </div>

                                        {/* Mockup Card (Sesuai Persis Tampilan Web) */}
                                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-7 shadow-xl">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                                                {/* Left Column: Narrative & Info */}
                                                <div className="lg:col-span-6 space-y-3 sm:space-y-3.5">
                                                    <div className="space-y-1.5">
                                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/10 dark:bg-white/5 border border-zinc-300/70 dark:border-white/15 text-[9px] sm:text-[10px] font-semibold text-zinc-800 dark:text-zinc-200">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                                            <span>Selayang Pandang Desa</span>
                                                        </div>
                                                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
                                                            Mengenal Lebih Dekat <br className="hidden sm:inline" />
                                                            Desa Karangwungu
                                                        </h3>
                                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                                                            <MapPin className="h-3 w-3 text-red-600 dark:text-amber-400 shrink-0" />
                                                            <span>{data.overview_location || 'Kecamatan Karanggeneng, Kabupaten Lamongan'}</span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify font-normal">
                                                        {(data.overview_content || '').split('\n\n').filter(p => p.trim().length > 0).map((paragraph, pIdx) => (
                                                            <p key={pIdx} className={pIdx > 0 ? 'text-zinc-600 dark:text-zinc-400' : ''}>
                                                                {paragraph}
                                                            </p>
                                                        ))}
                                                    </div>

                                                    <div className="pt-0.5">
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-700 text-white text-[11px] font-semibold shadow-2xs">
                                                            <span>Jelajahi Profil & Sejarah Desa</span>
                                                            <ArrowRight className="h-3 w-3" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Column: 3 Bento Cards Gallery */}
                                                <div className="lg:col-span-6">
                                                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                                        {/* Card 1: Featured Large (Panen Sawah) */}
                                                        <div className="col-span-2 relative rounded-2xl overflow-hidden aspect-[16/7] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                                            <img
                                                                src={previews.card1}
                                                                alt={data.overview_card_1_title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 via-30% to-transparent flex flex-col justify-end p-3 sm:p-3.5 text-white">
                                                                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider drop-shadow-xs">
                                                                    {data.overview_card_1_badge || 'Pertanian Unggul'}
                                                                </span>
                                                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5 drop-shadow-md">
                                                                    {data.overview_card_1_title || 'Hamparan Sawah Padi & Ketahanan Pangan'}
                                                                </h4>
                                                            </div>
                                                        </div>

                                                        {/* Card 2: Tambak Modern */}
                                                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                                            <img
                                                                src={previews.card2}
                                                                alt={data.overview_card_2_title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-30% to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                                                                <span className="text-[8px] sm:text-[9px] font-bold text-sky-400 uppercase tracking-wider drop-shadow-xs">
                                                                    {data.overview_card_2_badge || 'Tambak Modern'}
                                                                </span>
                                                                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight mt-0.5 truncate drop-shadow-md">
                                                                    {data.overview_card_2_title || 'Budidaya Bandeng & Udang'}
                                                                </h4>
                                                            </div>
                                                        </div>

                                                        {/* Card 3: UMKM & Warga */}
                                                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                                            <img
                                                                src={previews.card3}
                                                                alt={data.overview_card_3_title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 via-30% to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                                                                <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-wider drop-shadow-xs">
                                                                    {data.overview_card_3_badge || 'UMKM & Warga'}
                                                                </span>
                                                                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight mt-0.5 truncate drop-shadow-md">
                                                                    {data.overview_card_3_title || 'Wirausaha & Guyub Rukun'}
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pembatas Bersih */}
                                    <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                    {/* 2. Formulir Wilayah & Narasi Teks Selayang Pandang */}
                                    <div className="space-y-4">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                                                Teks Wilayah & Narasi Selayang Pandang
                                            </h3>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Kecamatan & Kabupaten (Sub-lokasi)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.overview_location}
                                                onChange={(e) => setData('overview_location', e.target.value)}
                                                placeholder="Kecamatan Karanggeneng, Kabupaten Lamongan"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all font-semibold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Isi Teks Selayang Pandang (2 Paragraf Narasi)
                                            </label>
                                            <textarea
                                                rows={6}
                                                value={data.overview_content}
                                                onChange={(e) => setData('overview_content', e.target.value)}
                                                placeholder="Desa Karangwungu adalah salah satu dari 18 desa di Kecamatan Karanggeneng..."
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 transition-all leading-relaxed font-normal"
                                            />
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-1">
                                                Gunakan enter dua kali untuk memisahkan alinea profil desa dan potensi pertanian/tambak.
                                            </span>
                                        </div>
                                    </div>

                                    {/* Pembatas Bersih */}
                                    <div className="border-t border-zinc-200 dark:border-zinc-800" />

                                    {/* 3. Pengaturan 3 Gambar Selayang Pandang */}
                                    <div className="space-y-4">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <ImageIcon className="h-4 w-4 text-amber-500" />
                                                <span>Pengaturan 3 Gambar Selayang Pandang</span>
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Kartu 1: Pertanian Unggul */}
                                            <div className="p-4.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                                <div className="md:col-span-4 space-y-2">
                                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-sm group">
                                                        <img
                                                            src={previews.card1}
                                                            alt={data.overview_card_1_title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 text-white">
                                                            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                                                                {data.overview_card_1_badge || 'Pertanian Unggul'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all w-full shadow-2xs">
                                                        <Upload className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                                                        <span>Ganti Gambar 1</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange('overview_card_1_image_file', 'card1', e)}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="md:col-span-8 space-y-3">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                                                        <ImageIcon className="h-4 w-4" />
                                                        <span>Gambar 1</span>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Badge Kategori
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_1_badge}
                                                            onChange={(e) => setData('overview_card_1_badge', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-semibold"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Judul Keterangan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_1_title}
                                                            onChange={(e) => setData('overview_card_1_title', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Kartu 2: Tambak Modern */}
                                            <div className="p-4.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                                <div className="md:col-span-4 space-y-2">
                                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-sm group">
                                                        <img
                                                            src={previews.card2}
                                                            alt={data.overview_card_2_title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 text-white">
                                                            <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                                                                {data.overview_card_2_badge || 'Tambak Modern'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all w-full shadow-2xs">
                                                        <Upload className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                                                        <span>Ganti Gambar 2</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange('overview_card_2_image_file', 'card2', e)}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="md:col-span-8 space-y-3">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400">
                                                        <ImageIcon className="h-4 w-4" />
                                                        <span>Gambar 2</span>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Badge Kategori
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_2_badge}
                                                            onChange={(e) => setData('overview_card_2_badge', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-semibold"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Judul Keterangan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_2_title}
                                                            onChange={(e) => setData('overview_card_2_title', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Kartu 3: UMKM & Warga */}
                                            <div className="p-4.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                                                <div className="md:col-span-4 space-y-2">
                                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-sm group">
                                                        <img
                                                            src={previews.card3}
                                                            alt={data.overview_card_3_title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-3 text-white">
                                                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                                                                {data.overview_card_3_badge || 'UMKM & Warga'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <label className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all w-full shadow-2xs">
                                                        <Upload className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                        <span>Ganti Gambar 3</span>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleFileChange('overview_card_3_image_file', 'card3', e)}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="md:col-span-8 space-y-3">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                        <ImageIcon className="h-4 w-4" />
                                                        <span>Gambar 3</span>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Badge Kategori
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_3_badge}
                                                            onChange={(e) => setData('overview_card_3_badge', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-semibold"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Judul Keterangan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.overview_card_3_title}
                                                            onChange={(e) => setData('overview_card_3_title', e.target.value)}
                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 dark:focus:bg-zinc-950 font-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: STATISTIK DEMOGRAFI & WILAYAH DESA */}
                            {activeTab === 'demographics' && (
                                <div className="space-y-6">
                                    {/* Section Header Card */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                                                    <BarChart3 className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                        Pilih & Atur Data Statistik Beranda
                                                    </h2>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                        Pilih data statistik apa saja yang ingin Anda tampilkan pada strip kartu merah di bawah Selayang Pandang beranda. Anda dapat memilih, mengubah nilai, satuan, maupun icon visualnya.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-bold text-red-700 dark:text-red-300 shrink-0 self-start sm:self-center">
                                                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                                                <span>
                                                    {data.demographics_metrics.filter((m) => m.enabled).length} dari {data.demographics_metrics.length} Data Aktif
                                                </span>
                                            </div>
                                        </div>

                                        {/* Global Titles */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Judul Seksi Statistik
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.demographics_section_title}
                                                    onChange={(e) => setData('demographics_section_title', e.target.value)}
                                                    placeholder="Contoh: STATISTIK DEMOGRAFI & WILAYAH DESA"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Subjudul / Tanggal Verifikasi
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.demographics_section_subtitle}
                                                    onChange={(e) => setData('demographics_section_subtitle', e.target.value)}
                                                    placeholder="Contoh: Data Terverifikasi 2026"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/30 focus:border-red-600 dark:focus:border-red-500 font-semibold"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Bar: Add & Reset */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                                Daftar Data Metrik Statistik
                                            </span>
                                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                (Centang untuk menampilkan di beranda)
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleAddMetric}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Tambah Data Baru</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleResetMetrics}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                                                title="Kembalikan ke susunan 8 metrik standar"
                                            >
                                                <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
                                                <span>Reset Standar</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Metrics Cards List */}
                                    <div className="space-y-3">
                                        {data.demographics_metrics.map((metric, index) => {
                                            const isEnabled = !!metric.enabled;
                                            const IconComp = getIconComponent(metric.icon, BarChart3);

                                            return (
                                                <div
                                                    key={metric.id || index}
                                                    className={`p-4 rounded-xl border transition-all ${
                                                        isEnabled
                                                            ? 'border-red-300 dark:border-red-900/60 bg-white dark:bg-zinc-900 shadow-xs'
                                                            : 'border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/50 opacity-75'
                                                    }`}
                                                >
                                                    {/* Header row: Checkbox toggle & Action buttons */}
                                                    <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                                                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                                            <input
                                                                type="checkbox"
                                                                checked={isEnabled}
                                                                onChange={() => handleToggleMetric(index)}
                                                                className="h-4 w-4 rounded-sm border-zinc-300 text-red-600 focus:ring-red-500 dark:border-zinc-700 dark:bg-zinc-800 cursor-pointer"
                                                            />
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                                                                    Tampilkan di Beranda
                                                                </span>
                                                                {isEnabled ? (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                                                                        <Check className="h-2.5 w-2.5" />
                                                                        Aktif
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                                                        Disembunyikan
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </label>

                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleMoveMetric(index, -1)}
                                                                disabled={index === 0}
                                                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                                                title="Pindah ke Atas"
                                                            >
                                                                <ArrowUp className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleMoveMetric(index, 1)}
                                                                disabled={index === data.demographics_metrics.length - 1}
                                                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                                                title="Pindah ke Bawah"
                                                            >
                                                                <ArrowDown className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteMetric(index)}
                                                                className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/50 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                                title="Hapus Data Ini"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Field Inputs Grid */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
                                                        {/* Label Field */}
                                                        <div className="lg:col-span-4">
                                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                Label / Nama Data
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={metric.label}
                                                                onChange={(e) => handleUpdateMetric(index, 'label', e.target.value)}
                                                                placeholder="Contoh: Kepala Keluarga"
                                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-semibold"
                                                            />
                                                        </div>

                                                        {/* Nilai / Angka Field */}
                                                        <div className="lg:col-span-3">
                                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                Nilai / Angka
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={metric.value}
                                                                onChange={(e) => handleUpdateMetric(index, 'value', e.target.value)}
                                                                placeholder="Contoh: 985 atau 245.8"
                                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-bold"
                                                            />
                                                        </div>

                                                        {/* Satuan / Suffix Field */}
                                                        <div className="lg:col-span-2">
                                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                Satuan (Suffix)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={metric.suffix}
                                                                onChange={(e) => handleUpdateMetric(index, 'suffix', e.target.value)}
                                                                placeholder="KK / Jiwa / Ha"
                                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-bold text-amber-600 dark:text-amber-400"
                                                            />
                                                        </div>

                                                        {/* Icon Selector (Visual Modal Picker) */}
                                                        <div className="lg:col-span-3">
                                                            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                Icon Visual
                                                            </label>
                                                            <button
                                                                type="button"
                                                                onClick={() => setIconPickerIndex(index)}
                                                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-300 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-800/80 text-xs text-zinc-900 dark:text-zinc-100 transition-all cursor-pointer group shadow-2xs"
                                                                title="Klik untuk memilih icon visual dari katalog"
                                                            >
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <div className="h-6 w-6 rounded-md bg-red-50 dark:bg-zinc-800 border border-red-200/60 dark:border-zinc-700 flex items-center justify-center text-red-600 dark:text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                                                                        <IconComp className="h-3.5 w-3.5" />
                                                                    </div>
                                                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate text-[11px]">
                                                                        {ICON_REGISTRY[metric.icon]?.label?.split('/')?.[0]?.trim() || metric.icon || 'Pilih Icon'}
                                                                    </span>
                                                                </div>
                                                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 shrink-0 ml-1.5 underline">
                                                                    Pilih
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Live Strip Preview (Exact Red Gradient Design from Homepage) */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 shadow-xs">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                                                <Eye className="h-4 w-4 text-red-600" />
                                                <span>Pratinjau Langsung di Halaman Beranda</span>
                                            </div>
                                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                Hanya kartu yang dicentang yang akan muncul
                                            </span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 space-y-3">
                                            {/* Preview Title & Subtitle */}
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white">
                                                    {data.demographics_section_title || 'Statistik Demografi & Wilayah Desa'}
                                                </h3>
                                                <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                                                    {data.demographics_section_subtitle || 'Data Terverifikasi 2026'}
                                                </span>
                                            </div>

                                            {/* Preview Cards Grid */}
                                            {data.demographics_metrics.filter((m) => m.enabled).length > 0 ? (
                                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                                                    {data.demographics_metrics
                                                        .filter((m) => m.enabled)
                                                        .map((m, idx) => {
                                                            const IconC = getIconComponent(m.icon, BarChart3);
                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="relative p-2.5 rounded-lg bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xs flex flex-col justify-between overflow-hidden"
                                                                >
                                                                    <div className="flex items-center justify-between gap-1">
                                                                        <span className="text-[10px] font-semibold text-red-100 truncate">
                                                                            {m.label || 'Label'}
                                                                        </span>
                                                                        <IconC className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                                                    </div>
                                                                    <div className="mt-1.5 flex items-baseline gap-1">
                                                                        <span className="text-sm sm:text-base font-black text-white tracking-tight leading-none">
                                                                            {m.value || '0'}
                                                                        </span>
                                                                        <span className="text-[9px] font-bold text-amber-300">
                                                                            {m.suffix}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            ) : (
                                                <div className="p-6 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-white/50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800">
                                                    Belum ada data statistik yang dicentang aktif. Silakan centang opsi "Tampilkan di Beranda" di atas agar kartu statistik muncul di sini.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 5: PRODUK & KOMODITAS UNGGULAN (POTENSI) */}
                            {activeTab === 'potentials' && (
                                <div className="space-y-6">
                                    {/* Header Section */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                                                    <Store className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                        Konfigurasi Produk & Komoditas Unggulan
                                                    </h2>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                        Atur komoditas potensi desa yang ditampilkan pada seksi Produk Unggulan di halaman beranda. Anda dapat memilih mode otomatis terbaru atau memilih produk spesifik secara manual.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-bold text-red-700 dark:text-red-300 shrink-0 self-start sm:self-center">
                                                <span>
                                                    Mode: {data.potentials_mode === 'custom' ? `Kustom (${data.potentials_custom_ids.length} Dipilih)` : 'Otomatis Terbaru'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Titles */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Judul Seksi Produk
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.potentials_title}
                                                    onChange={(e) => setData('potentials_title', e.target.value)}
                                                    placeholder="Produk & Komoditas Unggulan Karangwungu"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Subjudul / Deskripsi Singkat
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.potentials_subtitle}
                                                    onChange={(e) => setData('potentials_subtitle', e.target.value)}
                                                    placeholder="Deskripsi seksi produk..."
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-semibold"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mode Selector Card */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                                    Sumber Data Produk
                                                </h3>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Pilih bagaimana sistem mengambil data komoditas yang tampil di beranda.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                                                    Jumlah Tampil:
                                                </label>
                                                <div className="relative inline-flex items-center">
                                                    <select
                                                        value={data.potentials_limit}
                                                        onChange={(e) => setData('potentials_limit', Number(e.target.value))}
                                                        className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 cursor-pointer shadow-2xs"
                                                    >
                                                        <option value={2}>2 Produk</option>
                                                        <option value={4}>4 Produk (Standar)</option>
                                                        <option value={6}>6 Produk</option>
                                                        <option value={8}>8 Produk</option>
                                                    </select>
                                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Option 1: Latest */}
                                            <div
                                                onClick={() => setData('potentials_mode', 'latest')}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.potentials_mode === 'latest'
                                                        ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                        <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Otomatis Produk Terbaru</span>
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="potentials_mode"
                                                        checked={data.potentials_mode === 'latest'}
                                                        onChange={() => setData('potentials_mode', 'latest')}
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                                    Sistem otomatis menampilkan {data.potentials_limit} komoditas produk paling baru yang terdaftar di database.
                                                </p>
                                            </div>

                                            {/* Option 2: Custom */}
                                            <div
                                                onClick={() => setData('potentials_mode', 'custom')}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.potentials_mode === 'custom'
                                                        ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                        <CheckSquare className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Pilih Manual (Custom)</span>
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="potentials_mode"
                                                        checked={data.potentials_mode === 'custom'}
                                                        onChange={() => setData('potentials_mode', 'custom')}
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                                    Pilih sendiri secara spesifik produk komoditas mana saja yang ingin dimunculkan di halaman depan.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Custom Selection Area */}
                                        {data.potentials_mode === 'custom' && (
                                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="relative flex-1 max-w-sm">
                                                        <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                                        <input
                                                            type="text"
                                                            value={potentialSearch}
                                                            onChange={(e) => setPotentialSearch(e.target.value)}
                                                            placeholder="Cari produk potensi..."
                                                            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={handleSelectAllPotentials}
                                                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                                                        >
                                                            Pilih Semua
                                                        </button>
                                                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                                                        <button
                                                            type="button"
                                                            onClick={handleClearAllPotentials}
                                                            className="text-xs font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
                                                        >
                                                            Kosongkan
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                                                    {allPotentials
                                                        .filter((p) => p.title.toLowerCase().includes(potentialSearch.toLowerCase()) || (p.category && p.category.toLowerCase().includes(potentialSearch.toLowerCase())))
                                                        .map((p) => {
                                                            const isSelected = data.potentials_custom_ids.includes(p.id);
                                                            return (
                                                                <div
                                                                    key={p.id}
                                                                    onClick={() => handleTogglePotentialCustom(p.id)}
                                                                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                                                                        isSelected
                                                                            ? 'border-red-500 bg-red-50/60 dark:bg-red-950/40 shadow-xs ring-1 ring-red-500/30'
                                                                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950'
                                                                    }`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => {}}
                                                                        className="h-4 w-4 rounded-sm border-zinc-300 text-red-600 focus:ring-red-500 pointer-events-none shrink-0"
                                                                    />
                                                                    <div className="h-11 w-11 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-200 dark:border-zinc-800">
                                                                        <img
                                                                            src={p.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80'}
                                                                            alt={p.title}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-red-600 dark:text-amber-400 block truncate">
                                                                            {p.category || 'Potensi'}
                                                                        </span>
                                                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                                            {p.title}
                                                                        </h4>
                                                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                                                                            {p.price_range || '-'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB 6: WARTA & BERITA DESA */}
                            {activeTab === 'posts' && (
                                <div className="space-y-6">
                                    {/* Header Section */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0 mt-0.5">
                                                    <Newspaper className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                                                        Konfigurasi Warta & Berita Desa
                                                    </h2>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                        Atur artikel berita yang tampil pada seksi Warta Desa di beranda. Anda dapat memilih berita terbaru, hanya berita unggulan, atau memilih artikel berita tertentu secara manual (custom).
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs font-bold text-red-700 dark:text-red-300 shrink-0 self-start sm:self-center">
                                                <span>
                                                    Mode: {data.posts_mode === 'custom' ? `Kustom (${data.posts_custom_ids.length} Dipilih)` : data.posts_mode === 'featured' ? 'Unggulan' : 'Otomatis Terbaru'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Titles */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Judul Seksi Warta
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.posts_title}
                                                    onChange={(e) => setData('posts_title', e.target.value)}
                                                    placeholder="Warta & Pengumuman Desa"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-semibold"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Subjudul / Deskripsi Singkat
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.posts_subtitle}
                                                    onChange={(e) => setData('posts_subtitle', e.target.value)}
                                                    placeholder="Deskripsi seksi warta..."
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 font-semibold"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mode Selector Card */}
                                    <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                                                    Sumber Data Artikel Berita
                                                </h3>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                    Pilih kriteria artikel berita yang ditampilkan di beranda.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 shrink-0">
                                                    Jumlah Tampil:
                                                </label>
                                                <div className="relative inline-flex items-center">
                                                    <select
                                                        value={data.posts_limit}
                                                        onChange={(e) => setData('posts_limit', Number(e.target.value))}
                                                        className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-bold text-zinc-800 dark:text-zinc-200 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 cursor-pointer shadow-2xs"
                                                    >
                                                        <option value={2}>2 Berita</option>
                                                        <option value={4}>4 Berita (Standar)</option>
                                                        <option value={6}>6 Berita</option>
                                                        <option value={8}>8 Berita</option>
                                                    </select>
                                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {/* Option 1: Latest */}
                                            <div
                                                onClick={() => setData('posts_mode', 'latest')}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.posts_mode === 'latest'
                                                        ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                        <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Otomatis Terbaru</span>
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="posts_mode"
                                                        checked={data.posts_mode === 'latest'}
                                                        onChange={() => setData('posts_mode', 'latest')}
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                                    Menampilkan {data.posts_limit} berita terbaru berdasarkan tanggal terbit.
                                                </p>
                                            </div>

                                            {/* Option 2: Featured */}
                                            <div
                                                onClick={() => setData('posts_mode', 'featured')}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.posts_mode === 'featured'
                                                        ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                        <Shield className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Hanya Unggulan</span>
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="posts_mode"
                                                        checked={data.posts_mode === 'featured'}
                                                        onChange={() => setData('posts_mode', 'featured')}
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                                    Hanya menampilkan berita yang ditandai sebagai berita pilihan / featured.
                                                </p>
                                            </div>

                                            {/* Option 3: Custom */}
                                            <div
                                                onClick={() => setData('posts_mode', 'custom')}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                    data.posts_mode === 'custom'
                                                        ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                                                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                        <CheckSquare className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Pilih Manual (Custom)</span>
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="posts_mode"
                                                        checked={data.posts_mode === 'custom'}
                                                        onChange={() => setData('posts_mode', 'custom')}
                                                        className="text-red-600 focus:ring-red-500"
                                                    />
                                                </div>
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                                    Pilih sendiri secara spesifik artikel berita mana saja yang ingin dimunculkan.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Custom Selection Area */}
                                        {data.posts_mode === 'custom' && (
                                            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <div className="relative flex-1 max-w-sm">
                                                        <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                                        <input
                                                            type="text"
                                                            value={postSearch}
                                                            onChange={(e) => setPostSearch(e.target.value)}
                                                            placeholder="Cari judul artikel berita..."
                                                            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSelectLatestPosts(4)}
                                                            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                                                        >
                                                            Pilih 4 Terbaru
                                                        </button>
                                                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                                                        <button
                                                            type="button"
                                                            onClick={handleClearAllPosts}
                                                            className="text-xs font-bold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
                                                        >
                                                            Kosongkan
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                                                    {allPosts
                                                        .filter((p) => p.title.toLowerCase().includes(postSearch.toLowerCase()) || (p.category && p.category.toLowerCase().includes(postSearch.toLowerCase())))
                                                        .map((p) => {
                                                            const isSelected = data.posts_custom_ids.includes(p.id);
                                                            return (
                                                                <div
                                                                    key={p.id}
                                                                    onClick={() => handleTogglePostCustom(p.id)}
                                                                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                                                                        isSelected
                                                                            ? 'border-red-500 bg-red-50/60 dark:bg-red-950/40 shadow-xs ring-1 ring-red-500/30'
                                                                            : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950'
                                                                    }`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => {}}
                                                                        className="h-4 w-4 rounded-sm border-zinc-300 text-red-600 focus:ring-red-500 pointer-events-none shrink-0"
                                                                    />
                                                                    <div className="h-11 w-11 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-zinc-200 dark:border-zinc-800">
                                                                        <img
                                                                            src={p.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80'}
                                                                            alt={p.title}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-red-600 dark:text-amber-400 truncate">
                                                                                {p.category || 'Berita'}
                                                                            </span>
                                                                            {p.is_featured ? (
                                                                                <span className="text-[8px] font-bold px-1 rounded-sm bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                                                                                    Unggulan
                                                                                </span>
                                                                            ) : null}
                                                                        </div>
                                                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                                                            {p.title}
                                                                        </h4>
                                                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                                                                            {p.views}x dibaca
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal Crop Foto Kades 3:4 */}
            <ImageCropModal
                isOpen={cropModalOpen}
                onClose={() => setCropModalOpen(false)}
                imageSrc={imageToCrop}
                onCropComplete={handleLeaderCropComplete}
                aspectRatio={3 / 4}
                outputWidth={900}
                outputHeight={1200}
                title="Sesuaikan & Crop Foto Kades"
                subtitle="Geser dan atur perbesaran foto agar pas dengan bingkai dinas 3:4"
            />

            {/* Modal Visual Icon Picker untuk Statistik Demografi */}
            <IconPickerModal
                isOpen={iconPickerIndex !== null}
                onClose={() => setIconPickerIndex(null)}
                selectedIcon={iconPickerIndex !== null ? data.demographics_metrics[iconPickerIndex]?.icon : null}
                onSelect={(newIcon) => {
                    if (iconPickerIndex !== null) {
                        handleUpdateMetric(iconPickerIndex, 'icon', newIcon);
                    }
                }}
                title={`Pilih Icon untuk ${iconPickerIndex !== null ? (data.demographics_metrics[iconPickerIndex]?.label || 'Metrik Statistik') : 'Metrik'}`}
                subtitle="Pilih icon visual dari katalog referensi yang tersedia atau gunakan kotak pencarian."
            />
        </AdminLayout>
    );
}
