import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Building2,
    Phone,
    Mail,
    Clock,
    MapPin,
    Globe,
    ExternalLink,
    Save,
    Check,
    Share2,
    MessageCircle,
    Eye,
    Info,
    Sparkles,
    Shield,
    ChevronRight,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';
import {
    InstagramIcon,
    FacebookIcon,
    YoutubeIcon,
    TiktokIcon,
    TwitterIcon,
} from '@/Components/UI/SocialIcons';

export default function GeneralSettings({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('contact');
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    const { data, setData, post, processing, recentlySuccessful, isDirty } = useForm({
        // 1. Identitas & Tagline Desa
        site_name: settings.site_name || 'Desa Karangwungu',
        site_subdistrict: settings.site_subdistrict || 'Kecamatan Karanggeneng',
        site_regency: settings.site_regency || 'Kabupaten Lamongan',
        site_province: settings.site_province || 'Jawa Timur',
        site_postal_code: settings.site_postal_code || '62254',
        site_tagline: settings.site_tagline || 'Portal resmi informasi publik dan pelayanan administrasi daring Pemerintah Desa Karangwungu dalam mewujudkan tata kelola desa yang transparan, maju, agamis, dan melayani.',

        // 2. Kontak & Balai Desa
        contact_address: settings.contact_address || 'Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254',
        contact_phone: settings.contact_phone || '(0812) 3456-7890',
        contact_whatsapp: settings.contact_whatsapp || '081234567890',
        contact_email: settings.contact_email || 'pemdes@karangwungu-lamongan.desa.id',
        contact_working_hours: settings.contact_working_hours || 'Senin – Jumat: 08.00 – 15.30 WIB',
        contact_maps_url: settings.contact_maps_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.293417724128!2d112.355112!3d-7.039615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e778fc33246f48f%3A0xbca12a8421d00c3b!2sKarangwungu%2C%20Kec.%20Karang%20Geneng%2C%20Kabupaten%20Lamongan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',

        // 3. Web Terkait (Portal Instansi)
        related_link_1_name: settings.related_link_1_name || 'Pemkab Lamongan',
        related_link_1_url: settings.related_link_1_url || 'https://lamongankab.go.id/',
        related_link_1_active: settings.related_link_1_active ?? '1',

        related_link_2_name: settings.related_link_2_name || 'Kemendesa',
        related_link_2_url: settings.related_link_2_url || 'https://kemendesa.go.id/',
        related_link_2_active: settings.related_link_2_active ?? '1',

        related_link_3_name: settings.related_link_3_name || 'Kemendagri',
        related_link_3_url: settings.related_link_3_url || 'https://kemendagri.go.id/',
        related_link_3_active: settings.related_link_3_active ?? '0',

        // 4. Media Sosial Resmi Desa
        social_whatsapp_active: settings.social_whatsapp_active ?? '1',
        social_whatsapp_url: settings.social_whatsapp_url || 'https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Karangwungu',

        social_instagram_active: settings.social_instagram_active ?? '1',
        social_instagram_url: settings.social_instagram_url || 'https://instagram.com/desakarangwungu',

        social_facebook_active: settings.social_facebook_active ?? '1',
        social_facebook_url: settings.social_facebook_url || 'https://facebook.com/desakarangwungu',

        social_youtube_active: settings.social_youtube_active ?? '1',
        social_youtube_url: settings.social_youtube_url || 'https://youtube.com/@desakarangwungu',

        social_tiktok_active: settings.social_tiktok_active ?? '0',
        social_tiktok_url: settings.social_tiktok_url || 'https://tiktok.com/@desakarangwungu',

        social_twitter_active: settings.social_twitter_active ?? '0',
        social_twitter_url: settings.social_twitter_url || 'https://x.com/desakarangwungu',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/${adminPath}/settings/general`, {
            preserveScroll: true,
        });
    };

    const tabs = [
        { id: 'contact', name: 'Kontak & Balai Desa', icon: Building2, desc: 'Alamat balai, telepon, email, jam kerja & maps' },
        { id: 'identity', name: 'Identitas & Deskripsi', icon: Info, desc: 'Profil wilayah, nama desa & narasi portal' },
        { id: 'social', name: 'Media Sosial Resmi', icon: Share2, desc: 'WhatsApp, IG, FB, YT, TikTok, X (On/Off)' },
        { id: 'related', name: 'Web Terkait Instansi', icon: Globe, desc: 'Pemkab Lamongan, Kemendesa, dll (On/Off)' },
    ];

    const toggleField = (field) => {
        setData(field, data[field] === '1' ? '0' : '1');
    };

    return (
        <AdminLayout title="Konfigurasi Umum & Kontak">
            <div className="w-full space-y-6 pb-12">
                {/* 1. Clean Open Page Header (No Box Frame, No Icon Badge) */}
                <AdminPageHeader
                    title="Konfigurasi Umum & Kontak"
                    description="Kelola identitas resmi desa, alamat balai desa, jam operasional, tautan web terkait instansi, dan akun media sosial desa."
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Umum & Kontak' },
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
                                <span>Sinkronisasi Otomatis</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Seluruh informasi kontak, alamat, tautan instansi, dan akun media sosial otomatis disinkronkan ke footer seluruh halaman website dan halaman kontak publik.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Formulir Pengaturan (lg:col-span-9) */}
                    <div className="lg:col-span-9">
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs space-y-5">
                            {/* ------------------------------------------------------------- */}
                            {/* TAB 1: KONTAK & BALAI DESA */}
                            {/* ------------------------------------------------------------- */}
                            {activeTab === 'contact' && (
                                <div className="space-y-5">
                                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <span>Informasi Kontak & Balai Desa Karangwungu</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Data kontak ini akan tampil di seluruh bagian footer website dan halaman kontak resmi.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Alamat Kantor Balai Desa
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_address}
                                                onChange={(e) => setData('contact_address', e.target.value)}
                                                placeholder="Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Nomor Telepon Kantor
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_phone}
                                                onChange={(e) => setData('contact_phone', e.target.value)}
                                                placeholder="(0812) 3456-7890"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Nomor WhatsApp Pelayanan Warga (Format Nomor)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_whatsapp}
                                                onChange={(e) => setData('contact_whatsapp', e.target.value)}
                                                placeholder="081234567890"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-mono font-medium"
                                            />
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                                                Digunakan untuk tombol pintas chat WhatsApp bantuan di halaman publik.
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Alamat Email Resmi Pemdes
                                            </label>
                                            <input
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                                placeholder="pemdes@karangwungu-lamongan.desa.id"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Jam Operasional Pelayanan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_working_hours}
                                                onChange={(e) => setData('contact_working_hours', e.target.value)}
                                                placeholder="Senin – Jumat: 08.00 – 15.30 WIB"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-medium"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                URL Embed Peta Google Maps Balai Desa
                                            </label>
                                            <input
                                                type="text"
                                                value={data.contact_maps_url}
                                                onChange={(e) => setData('contact_maps_url', e.target.value)}
                                                placeholder="https://www.google.com/maps/embed?pb=..."
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 dark:focus:border-red-500 font-mono text-[11px]"
                                            />
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                                                Salin tautan dari Google Maps: Bagikan &gt; Sematkan Peta &gt; Ambil nilai parameter src iframe.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ------------------------------------------------------------- */}
                            {/* TAB 2: IDENTITAS & DESKRIPSI DESA */}
                            {/* ------------------------------------------------------------- */}
                            {activeTab === 'identity' && (
                                <div className="space-y-5">
                                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                            <Info className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <span>Identitas Wilayah & Deskripsi Resmi Desa</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Informasi dasar entitas wilayah pemerintahan desa.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Nama Desa
                                            </label>
                                            <input
                                                type="text"
                                                value={data.site_name}
                                                onChange={(e) => setData('site_name', e.target.value)}
                                                placeholder="Desa Karangwungu"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Kecamatan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.site_subdistrict}
                                                onChange={(e) => setData('site_subdistrict', e.target.value)}
                                                placeholder="Kecamatan Karanggeneng"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Kabupaten
                                            </label>
                                            <input
                                                type="text"
                                                value={data.site_regency}
                                                onChange={(e) => setData('site_regency', e.target.value)}
                                                placeholder="Kabupaten Lamongan"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Kode Pos
                                            </label>
                                            <input
                                                type="text"
                                                value={data.site_postal_code}
                                                onChange={(e) => setData('site_postal_code', e.target.value)}
                                                placeholder="62254"
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono font-medium"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Deskripsi Singkat / Tagline Publik (Footer & Profil)
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={data.site_tagline}
                                                onChange={(e) => setData('site_tagline', e.target.value)}
                                                placeholder="Portal resmi informasi publik dan pelayanan administrasi daring..."
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed font-normal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ------------------------------------------------------------- */}
                            {/* TAB 3: MEDIA SOSIAL RESMI (TOGGLE ON/OFF + URL) */}
                            {/* ------------------------------------------------------------- */}
                            {activeTab === 'social' && (
                                <div className="space-y-5">
                                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                            <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <span>Akun Media Sosial Resmi Pemerintah Desa</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Aktifkan atau nonaktifkan (On/Off) setiap kanal sosial media yang ingin Anda tampilkan kepada masyarakat.
                                        </p>
                                    </div>

                                    <div className="space-y-3.5">
                                        {/* 1. WhatsApp */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                                    <MessageCircle className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        WhatsApp Pelayanan
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Tautan obrolan langsung layanan warga
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_whatsapp_url}
                                                    onChange={(e) => setData('social_whatsapp_url', e.target.value)}
                                                    placeholder="https://wa.me/6281234567890"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_whatsapp_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_whatsapp_active === '1'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_whatsapp_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 2. Instagram */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-pink-600/10 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/20">
                                                    <InstagramIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        Instagram Desa
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Galeri aktivitas dan publikasi visual desa
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_instagram_url}
                                                    onChange={(e) => setData('social_instagram_url', e.target.value)}
                                                    placeholder="https://instagram.com/desakarangwungu"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_instagram_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_instagram_active === '1'
                                                            ? 'bg-pink-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_instagram_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 3. Facebook */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                                                    <FacebookIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        Facebook Page
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Halaman komunitas & informasi warga
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_facebook_url}
                                                    onChange={(e) => setData('social_facebook_url', e.target.value)}
                                                    placeholder="https://facebook.com/desakarangwungu"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_facebook_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_facebook_active === '1'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_facebook_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 4. YouTube */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-red-600/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-500/20">
                                                    <YoutubeIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        YouTube Channel
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Video dokumentasi & siaran kegiatan desa
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_youtube_url}
                                                    onChange={(e) => setData('social_youtube_url', e.target.value)}
                                                    placeholder="https://youtube.com/@desakarangwungu"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_youtube_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_youtube_active === '1'
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_youtube_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 5. TikTok */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-zinc-900/10 text-zinc-900 dark:text-zinc-100 flex items-center justify-center shrink-0 border border-zinc-500/20 font-bold text-xs">
                                                    <TiktokIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        TikTok Resmi
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Konten video singkat potensi & warga
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_tiktok_url}
                                                    onChange={(e) => setData('social_tiktok_url', e.target.value)}
                                                    placeholder="https://tiktok.com/@desakarangwungu"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_tiktok_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_tiktok_active === '1'
                                                            ? 'bg-zinc-900 text-white dark:bg-zinc-700'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_tiktok_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* 6. X (Twitter) */}
                                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-sky-600/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20 font-bold text-xs">
                                                    <TwitterIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        X / Twitter Desa
                                                    </h4>
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                        Publikasi pengumuman cepat & berita ringkas
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                <input
                                                    type="text"
                                                    value={data.social_twitter_url}
                                                    onChange={(e) => setData('social_twitter_url', e.target.value)}
                                                    placeholder="https://x.com/desakarangwungu"
                                                    className="flex-1 sm:w-80 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('social_twitter_active')}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.social_twitter_active === '1'
                                                            ? 'bg-sky-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.social_twitter_active === '1' ? 'Aktif' : 'Mati'}</span>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* ------------------------------------------------------------- */}
                            {/* TAB 4: WEB TERKAIT INSTANSI */}
                            {/* ------------------------------------------------------------- */}
                            {activeTab === 'related' && (
                                <div className="space-y-5">
                                    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <span>Tautan Web Terkait & Portal Instansi Resmi</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Tautan portal resmi seperti Pemkab Lamongan, Kemendesa, dan instansi pembina desa lainnya yang tampil di footer.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Link 1: Pemkab Lamongan */}
                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-6 w-6 rounded-full bg-red-600/10 text-red-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                                                        1
                                                    </span>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        Tautan Portal 1 (Default: Pemkab Lamongan)
                                                    </h4>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('related_link_1_active')}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.related_link_1_active === '1'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.related_link_1_active === '1' ? 'Aktif (Tampil)' : 'Nonaktif (Disembunyikan)'}</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Nama / Label Instansi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.related_link_1_name}
                                                        onChange={(e) => setData('related_link_1_name', e.target.value)}
                                                        placeholder="Pemkab Lamongan"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Alamat URL Website
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={data.related_link_1_url}
                                                        onChange={(e) => setData('related_link_1_url', e.target.value)}
                                                        placeholder="https://lamongankab.go.id/"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link 2: Kemendesa */}
                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-6 w-6 rounded-full bg-red-600/10 text-red-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                                                        2
                                                    </span>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        Tautan Portal 2 (Default: Kemendesa)
                                                    </h4>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('related_link_2_active')}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.related_link_2_active === '1'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.related_link_2_active === '1' ? 'Aktif (Tampil)' : 'Nonaktif (Disembunyikan)'}</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Nama / Label Instansi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.related_link_2_name}
                                                        onChange={(e) => setData('related_link_2_name', e.target.value)}
                                                        placeholder="Kemendesa"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Alamat URL Website
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={data.related_link_2_url}
                                                        onChange={(e) => setData('related_link_2_url', e.target.value)}
                                                        placeholder="https://kemendesa.go.id/"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link 3: Instansi Tambahan */}
                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/40 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-6 w-6 rounded-full bg-red-600/10 text-red-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                                                        3
                                                    </span>
                                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                                                        Tautan Portal 3 (Instansi Opsional / Tambahan)
                                                    </h4>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleField('related_link_3_active')}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                                        data.related_link_3_active === '1'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                                    }`}
                                                >
                                                    <span>{data.related_link_3_active === '1' ? 'Aktif (Tampil)' : 'Nonaktif (Disembunyikan)'}</span>
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Nama / Label Instansi
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.related_link_3_name}
                                                        onChange={(e) => setData('related_link_3_name', e.target.value)}
                                                        placeholder="Kemendagri"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-semibold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Alamat URL Website
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={data.related_link_3_url}
                                                        onChange={(e) => setData('related_link_3_url', e.target.value)}
                                                        placeholder="https://kemendagri.go.id/"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
