import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import {
    Phone,
    MapPin,
    Tag,
    ShoppingBag,
    Clock,
    ShieldCheck,
    CheckCircle2,
    ArrowLeft,
    Share2,
    Check,
    ExternalLink,
    Sparkles,
    Calendar,
    Layers,
    Truck,
    MessageCircle,
    ChevronRight,
    Award,
} from 'lucide-react';

export default function PotentialsShow({
    potential,
    relatedPotentials = [],
}) {
    const [copied, setCopied] = useState(false);
    const [activeImage, setActiveImage] = useState(potential?.image || '');

    if (!potential) {
        return null;
    }

    // Gallery images: main image + extra gallery images
    const allImages = Array.from(
        new Set([
            potential.image,
            ...(Array.isArray(potential.gallery) ? potential.gallery : []),
        ].filter(Boolean))
    );

    const whatsappNumber = (potential.contact_whatsapp || potential.contact_phone || '')
        .replace(/[^0-9]/g, '')
        .replace(/^0/, '62');

    const whatsappMessage = encodeURIComponent(
        `Halo ${potential.owner_name || 'Bapak/Ibu'}, saya melihat produk "${potential.title}" melalui website resmi Desa Karangwungu. Saya tertarik dan ingin menanyakan informasi pemesanan serta ketersediaannya. Terima kasih!`
    );

    const whatsappUrl = whatsappNumber
        ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
        : null;

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <AppLayout>
            <SeoHead
                title={`${potential.title} - Potensi & UMKM Desa Karangwungu`}
                description={potential.description || `Informasi komoditas dan produk UMKM unggulan ${potential.title} dari Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan.`}
                image={potential.image}
                keywords={`${potential.title}, UMKM Karangwungu, Potensi Desa Karangwungu, Produk Lamongan, ${potential.category}`}
                breadcrumbs={[
                    { label: 'Potensi & UMKM', url: '/potensi' },
                    { label: potential.title, url: `/potensi/${potential.slug}` },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
                {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <Link
                            href="/"
                            className="hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                        >
                            Beranda
                        </Link>
                        <ChevronRight className="h-3 w-3 text-zinc-400 dark:text-zinc-600 shrink-0" />
                        <Link
                            href="/potensi"
                            className="hover:text-red-600 dark:hover:text-amber-400 transition-colors font-medium"
                        >
                            Potensi & UMKM
                        </Link>
                        <ChevronRight className="h-3 w-3 text-zinc-400 dark:text-zinc-600 shrink-0" />
                        <span className="text-zinc-900 dark:text-zinc-200 font-bold truncate max-w-[200px] sm:max-w-sm">
                            {potential.title}
                        </span>
                    </nav>

                    <Link
                        href="/potensi"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-2xs"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Kembali ke Katalog</span>
                    </Link>
                </div>

                {/* 2. HEADER HERO SECTION */}
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-bold shadow-xs">
                            <Sparkles className="h-3 w-3 text-amber-300" />
                            <span>{potential.category}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            <span>Produk Binaan Desa Karangwungu</span>
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        {potential.title}
                    </h1>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
                        {potential.description}
                    </p>
                </div>

                {/* 3. MAIN CONTENT GRID (8 COLS DETAILS + 4 COLS ACTION SIDEBAR) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: VISUALS, STORY, SPECIFICATIONS (lg:col-span-8) */}
                    <div className="lg:col-span-8 space-y-6 sm:space-y-8">
                        {/* A. Image Gallery Showcase */}
                        <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-4 space-y-3">
                            {/* Main Active Photo */}
                            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950">
                                <img
                                    src={activeImage || potential.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'}
                                    alt={potential.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                                />
                                <div className="absolute bottom-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[11px] font-medium border border-white/20 shadow-xs flex items-center gap-1.5">
                                        <Award className="h-3.5 w-3.5 text-amber-400" />
                                        <span>Dokumentasi Resmi Potensi Desa Karangwungu</span>
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Switcher (if multiple images) */}
                            {allImages.length > 1 && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                                    {allImages.map((imgUrl, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setActiveImage(imgUrl)}
                                            className={`relative h-16 w-24 sm:h-20 sm:w-28 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                                                activeImage === imgUrl
                                                    ? 'border-red-600 ring-2 ring-red-600/30'
                                                    : 'border-zinc-200 dark:border-zinc-700 opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${potential.title} - Foto ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* B. Highlight Keunggulan (Features) */}
                        {Array.isArray(potential.features) && potential.features.length > 0 && (
                            <div className="rounded-2xl bg-gradient-to-r from-red-50/60 via-amber-50/40 to-white dark:from-red-950/20 dark:via-zinc-900 dark:to-zinc-900 border border-red-200/60 dark:border-red-900/40 p-5 sm:p-6 shadow-xs space-y-4">
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-amber-500" />
                                    <span>Keunggulan & Karakteristik Komoditas</span>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    {potential.features.map((feat, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                                                {feat}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* C. Narasi Lengkap & Kisah Profil Komoditas / Usaha */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Profil & Deskripsi Lengkap Potensi</span>
                            </h3>

                            <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                                {potential.content || potential.description}
                            </div>
                        </div>

                        {/* D. Tabel Spesifikasi & Detail Lengkap */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Rincian Spesifikasi Usaha & Produk</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Produsen / Pengelola
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.owner_name || 'Masyarakat Desa Karangwungu'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Kisaran Harga
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 block font-mono">
                                        {potential.price_range || 'Sesuai Kesepakatan / Musim'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Kapasitas Produksi / Panen
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.production_capacity || 'Pasokan Terjaga Rutin'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Minimal Pemesanan
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.min_order || 'Fleksibel (Eceran & Grosir)'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Jam & Hari Operasional
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.operating_hours || 'Senin - Sabtu (08.00 - 17.00 WIB)'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase tracking-wider">
                                        Sertifikasi & Legalitas
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                                        {potential.certification || 'Binaan Pemerintah Desa Karangwungu'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* E. Lokasi & Peta Wilayah */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Lokasi Produksi / Sentra Usaha</span>
                            </h3>

                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div>
                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.location || 'Desa Karangwungu'}
                                    </span>
                                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                        Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur 62254
                                    </span>
                                </div>

                                {potential.gmaps_url && (
                                    <a
                                        href={potential.gmaps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-white transition-all shrink-0 shadow-xs"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        <span>Petunjuk Arah Google Maps</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: STICKY ORDER & CONTACT SIDEBAR (lg:col-span-4) */}
                    <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                        {/* 1. KARTU HARGA & PEMESANAN UTAMA */}
                        <div className="rounded-2xl bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white border border-red-500/40 p-5 sm:p-6 shadow-xl shadow-red-950/30 space-y-5">
                            <div>
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-300 block">
                                    Kisaran Harga Resmi
                                </span>
                                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight mt-1">
                                    {potential.price_range || 'Hubungi Kontak'}
                                </div>
                                <span className="text-[11px] text-red-200/80 block mt-1">
                                    Harga bersahabat langsung dari produsen lokal tanpa perantara.
                                </span>
                            </div>

                            <div className="pt-4 border-t border-white/15 space-y-3">
                                {whatsappUrl ? (
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/30 hover:shadow-lg transition-all cursor-pointer"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Pesan via WhatsApp</span>
                                    </a>
                                ) : (
                                    <div className="text-xs text-red-200/80 text-center p-2 bg-black/20 rounded-lg">
                                        Kontak WhatsApp sedang diperbarui
                                    </div>
                                )}

                                {potential.contact_phone && (
                                    <a
                                        href={`tel:${potential.contact_phone.replace(/[^0-9+]/g, '')}`}
                                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black/30 hover:bg-black/50 text-white font-bold text-xs border border-white/15 hover:border-white/30 transition-all cursor-pointer"
                                    >
                                        <Phone className="h-3.5 w-3.5 text-amber-300" />
                                        <span>Hubungi: {potential.contact_phone}</span>
                                    </a>
                                )}
                            </div>

                            <div className="pt-3 border-t border-white/15 space-y-2 text-[11px] text-red-100/85">
                                <div className="flex items-center gap-2">
                                    <Truck className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                    <span>Melayani pengiriman lokal & pesanan partai</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                    <span>Respon cepat hari kerja via WhatsApp</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                    <span>Transaksi aman langsung dengan pengelola</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. KARTU DUKUNG UMKM WARGA */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                <Award className="h-4 w-4 text-amber-500" />
                                <span>Dukung Perekonomian Warga</span>
                            </div>
                            <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Setiap pembelian komoditas dan produk UMKM ini berkontribusi langsung pada peningkatan pendapatan keluarga dan perputaran ekonomi mandiri Desa Karangwungu.
                            </p>
                        </div>

                        {/* 3. WIDGET BAGIKAN PRODUK */}
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <span>Bagikan Informasi Ini</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Lihat potensi & produk unggulan ${potential.title} di Desa Karangwungu: ${currentUrl}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                                >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>WhatsApp</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                                            <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="h-3.5 w-3.5" />
                                            <span>Salin Link</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. REKOMENDASI PRODUK & POTENSI TERKAIT */}
                {relatedPotentials.length > 0 && (
                    <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                                    Potensi & Produk Terkait Lainnya
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Jelajahi komoditas unggulan dan kerajinan warga Desa Karangwungu lainnya.
                                </p>
                            </div>
                            <Link
                                href="/potensi"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-amber-400 hover:underline shrink-0"
                            >
                                <span>Lihat Semua Katalog</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                            {relatedPotentials.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/potensi/${item.slug}`}
                                    className="group rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer border border-red-500/30"
                                >
                                    <div>
                                        <div className="aspect-[4/3] sm:aspect-auto sm:h-40 w-full overflow-hidden bg-zinc-950 relative">
                                            <img
                                                src={item.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-amber-300 text-[9px] font-bold shadow-xs truncate max-w-[120px] block">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-3 sm:p-4 space-y-1.5">
                                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                                                {item.title}
                                            </h4>
                                            {item.price_range && (
                                                <p className="text-[10px] sm:text-xs font-bold text-amber-300 font-mono">
                                                    {item.price_range}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-3 pt-0 mt-auto">
                                        <div className="text-[10px] sm:text-xs font-bold text-red-200 group-hover:text-white flex items-center justify-between pt-2 border-t border-white/10">
                                            <span>Lihat Detail</span>
                                            <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
