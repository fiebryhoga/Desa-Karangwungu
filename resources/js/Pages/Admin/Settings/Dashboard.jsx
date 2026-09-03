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
} from 'lucide-react';

export default function DashboardSettings({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('hero');
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Form state
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        // 1. Hero Section
        hero_badge: settings.hero_badge || 'Kecamatan Karanggeneng • Kabupaten Lamongan',
        hero_title: settings.hero_title || "Website Resmi\nDesa Karangwungu",
        hero_description: settings.hero_description || 'Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.',
        hero_image: settings.hero_image || '/assets/images/hero.jpg',
        hero_image_file: null,

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
    });

    // Local previews for uploaded files
    const [previews, setPreviews] = useState({
        hero: data.hero_image,
        leader: data.welcome_leader_photo,
        card1: data.overview_card_1_image,
        card2: data.overview_card_2_image,
        card3: data.overview_card_3_image,
    });

    const handleFileChange = (field, previewKey, e) => {
        const file = e.target.files[0];
        if (file) {
            setData(field, file);
            const objectUrl = URL.createObjectURL(file);
            setPreviews((prev) => ({ ...prev, [previewKey]: objectUrl }));
        }
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
                                    {/* Pratinjau Visual & Tombol Unggah Langsung */}
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                                    <span>Pratinjau & Foto Sampul Hero</span>
                                                </h2>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Simulasi tampilan latar belakang seksi hero utama di beranda desa.
                                                </p>
                                            </div>

                                            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all shadow-2xs shrink-0 self-start sm:self-center">
                                                <Upload className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                <span>Ganti Foto Hero</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('hero_image_file', 'hero', e)}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Live Realistic Website Hero Mockup */}
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
                                                    Pratinjau Halaman Beranda
                                                </span>
                                            </div>

                                            {/* Background Image Container */}
                                            <div className="relative min-h-[440px] sm:min-h-[500px] flex flex-col justify-between overflow-hidden">
                                                <img
                                                    src={previews.hero}
                                                    alt="Hero Background Preview"
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
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

                                                {/* Bottom Scroll Guide Indicator */}
                                                <div className="relative z-10 pb-3 text-center flex flex-col items-center gap-0.5 opacity-80 self-center">
                                                    <span className="text-[9px] font-bold text-zinc-300 tracking-wide">
                                                        Jelajahi Profil Desa
                                                    </span>
                                                    <div className="h-4 w-2.5 rounded-full border border-white/70 flex items-start justify-center p-0.5">
                                                        <div className="h-1 w-0.5 rounded-full bg-red-500 animate-bounce" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                                            Rekomendasi resolusi: 1920x1080 landscape, format JPG atau WebP (Maks 5MB)
                                        </p>
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

                                            <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white cursor-pointer transition-all w-full shadow-2xs">
                                                <Upload className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                <span>Ganti Foto Kades</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange('welcome_leader_photo_file', 'leader', e)}
                                                    className="hidden"
                                                />
                                            </label>
                                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-center">
                                                Rasio 3:4 vertikal potret dinas
                                            </p>
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
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 sm:p-3.5 text-white">
                                                                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                                                                    {data.overview_card_1_badge || 'Pertanian Unggul'}
                                                                </span>
                                                                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug mt-0.5">
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
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                                                                <span className="text-[8px] sm:text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                                                                    {data.overview_card_2_badge || 'Tambak Modern'}
                                                                </span>
                                                                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight mt-0.5 truncate">
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
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-white">
                                                                <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                                                                    {data.overview_card_3_badge || 'UMKM & Warga'}
                                                                </span>
                                                                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight mt-0.5 truncate">
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
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
