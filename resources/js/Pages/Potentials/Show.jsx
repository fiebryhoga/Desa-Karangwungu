import React, { useState, useMemo } from 'react';
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
    Search,
    Info,
    Store,
    HeartHandshake,
    Eye,
} from 'lucide-react';

export default function PotentialsShow({
    potential,
    relatedPotentials = [],
}) {
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const whatsappNumber = (potential?.contact_whatsapp || potential?.contact_phone || '')
        .replace(/[^0-9]/g, '')
        .replace(/^0/, '62');

    // Products list
    const productsList = useMemo(() => {
        if (!Array.isArray(potential.products) || potential.products.length === 0) {
            return [];
        }
        return potential.products;
    }, [potential.products]);

    // Extract product images
    const productImages = useMemo(() => {
        return productsList
            .map((p) => p.image)
            .filter((img) => img && typeof img === 'string' && img.trim().length > 0);
    }, [productsList]);

    // Synchronize gallery images: main image + product images + custom gallery
    const allImages = useMemo(() => {
        const rawList = [
            potential.image,
            ...productImages,
            ...(Array.isArray(potential.gallery) ? potential.gallery : []),
        ].filter(Boolean);

        // Filter out known mismatched legacy stock photos (dogs, bibimbap, piglet)
        const cleaned = rawList.filter(
            (url) =>
                !url.includes('photo-1555897209') && // dog photo
                !url.includes('photo-1498654896293') && // bibimbap korean food
                !url.includes('photo-1516467508483') // piglet photo
        );

        return Array.from(new Set(cleaned.length > 0 ? cleaned : rawList));
    }, [potential.image, productImages, potential.gallery]);

    const [activeImage, setActiveImage] = useState(() => {
        const list = [
            potential?.image,
            ...(Array.isArray(potential?.products) ? potential.products.map(p => p.image) : []),
            ...(Array.isArray(potential?.gallery) ? potential.gallery : []),
        ].filter(Boolean).filter(
            (url) =>
                !url.includes('photo-1555897209') &&
                !url.includes('photo-1498654896293') &&
                !url.includes('photo-1516467508483')
        );
        return list[0] || potential?.image || '';
    });

    // Active product matching current hero image
    const activeProduct = useMemo(() => {
        if (!activeImage || !Array.isArray(potential?.products)) return null;
        return potential.products.find((p) => p.image === activeImage) || null;
    }, [activeImage, potential?.products]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return productsList;
        const q = searchQuery.toLowerCase();
        return productsList.filter(
            (p) =>
                (p.name && p.name.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q)) ||
                (p.unit && p.unit.toLowerCase().includes(q))
        );
    }, [productsList, searchQuery]);

    const generalWhatsappMessage = encodeURIComponent(
        `Halo ${potential.owner_name || 'Bapak/Ibu'}, saya melihat informasi komoditas "${potential.title}" melalui website resmi Desa Karangwungu. Saya ingin menanyakan informasi lebih lanjut mengenai ketersediaan dan detail produknya. Terima kasih!`
    );

    const generalWhatsappUrl = whatsappNumber
        ? `https://wa.me/${whatsappNumber}?text=${generalWhatsappMessage}`
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
                title={`${potential.title} - Potensi & Produk Desa Karangwungu`}
                description={potential.description || `Informasi daftar produk dan harga komoditas ${potential.title} Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan.`}
                image={potential.image}
                keywords={`${potential.title}, Produk Karangwungu, UMKM Lamongan, Harga Telur Bebek, Bebek Pedaging, Ayam Potong, Bandeng, Beras Lamongan, ${potential.category}`}
                breadcrumbs={[
                    { label: 'Potensi & UMKM', url: '/potensi' },
                    { label: potential.title, url: `/potensi/${potential.slug}` },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* 1. HERO BANNER WITH PRESTIGIOUS LOGO (Integrated Glassmorphic Navigation) */}
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white">
                    {/* Background Landscape Photo Overlay */}
                    {potential.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 pointer-events-none"
                            style={{ backgroundImage: `url('${potential.image}')` }}
                        />
                    )}

                    {/* Geometric Layered Chevron / Polygon Facets */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -left-20 top-0 bottom-0 w-1/2 bg-gradient-to-r from-red-950/60 via-red-900/40 to-transparent transform -skew-x-12" />
                        <svg
                            className="absolute inset-0 w-full h-full opacity-30"
                            viewBox="0 0 1200 400"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M-100 0 L350 200 L-100 400 Z" fill="#ef4444" opacity="0.6" />
                            <path d="M100 0 L600 200 L100 400 Z" fill="#f59e0b" opacity="0.4" />
                            <path d="M600 0 L1100 200 L600 400 Z" fill="#dc2626" opacity="0.5" />
                        </svg>

                        {/* Traditional Batik Silhouette Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.12] bg-repeat pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2.5' fill='%23fde047'/%3E%3C/svg%3E")`,
                                backgroundSize: '90px 90px',
                            }}
                        />
                    </div>

                    {/* Content inside Hero Banner */}
                    <div className="relative z-10 p-5 sm:p-7 md:p-8 space-y-5">
                        {/* Top Action Bar inside Hero (Integrated Glassmorphism) */}
                        <div className="flex items-center justify-between gap-3">
                            <Link
                                href="/potensi"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-amber-400/50 shadow-sm transition-all group w-fit"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:-translate-x-1" />
                                <span>Kembali ke Katalog Potensi & UMKM</span>
                            </Link>

                            <span className="text-[11px] font-bold text-amber-200/90 hidden sm:inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                <span>Potensi & Komoditas Unggulan Desa</span>
                            </span>
                        </div>
                        {/* Top: Logo Container + Badges + Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {/* Official Logo Box (Clean, prominent rounded-lg container) */}
                            <div className="h-20 w-20 sm:h-22 sm:w-22 md:h-24 md:w-24 rounded-lg bg-white dark:bg-zinc-900/95 p-2 sm:p-2.5 shadow-xl border-2 border-amber-400 ring-4 ring-red-950/40 flex items-center justify-center shrink-0">
                                {potential.logo ? (
                                    <img
                                        src={potential.logo}
                                        alt={`Logo ${potential.title}`}
                                        className="w-full h-full object-contain filter drop-shadow-md"
                                    />
                                ) : (
                                    <img
                                        src="/assets/images/logo.png"
                                        alt="Logo Desa Karangwungu"
                                        className="w-full h-full object-contain filter drop-shadow-md"
                                    />
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <div>
                                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                                        {potential.title}
                                    </h1>
                                    <p className="text-xs sm:text-[13px] text-red-100/90 font-normal mt-1 leading-relaxed drop-shadow-xs max-w-3xl">
                                        {potential.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick metadata strip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/20">
                            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/15">
                                <Store className="h-4 w-4 text-amber-300 shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[10px] text-red-200/80 block uppercase font-bold tracking-wider">
                                        Pengelola / Produsen
                                    </span>
                                    <span className="text-xs font-bold text-white truncate block">
                                        {potential.owner_name || 'Peternak Lokal Karangwungu'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/15">
                                <Clock className="h-4 w-4 text-amber-300 shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[10px] text-red-200/80 block uppercase font-bold tracking-wider">
                                        Jam Pelayanan
                                    </span>
                                    <span className="text-xs font-bold text-white truncate block">
                                        {potential.operating_hours || 'Buka Setiap Hari'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/15">
                                <MapPin className="h-4 w-4 text-amber-300 shrink-0" />
                                <div className="min-w-0">
                                    <span className="text-[10px] text-red-200/80 block uppercase font-bold tracking-wider">
                                        Lokasi Sentra Usaha
                                    </span>
                                    <span className="text-xs font-bold text-white truncate block">
                                        {potential.location || 'Desa Karangwungu'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. MAIN CONTENT GRID (8 COLS PRODUCTS & SPECS + 4 COLS SIDEBAR) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: VISUALS, PRODUCT CATALOG, STORIES (lg:col-span-8) */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* A. Image Gallery Showcase */}
                        <div id="hero-gallery-view" className="rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 sm:p-4 space-y-3 scroll-mt-24">
                            {/* Main Active Photo */}
                            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-lg overflow-hidden bg-zinc-950">
                                <img
                                    src={activeImage || potential.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'}
                                    alt={potential.title}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                                />
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                                    {activeProduct ? (
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs sm:text-sm font-black border border-white/25 shadow-lg flex items-center gap-2">
                                                <ShoppingBag className="h-4 w-4 text-amber-400 shrink-0" />
                                                <span>{activeProduct.name}</span>
                                                {activeProduct.price && (
                                                    <span className="text-amber-300 font-bold ml-1 text-xs border-l border-white/25 pl-2">
                                                        {activeProduct.price} {activeProduct.unit ? `(${activeProduct.unit})` : ''}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="px-2.5 py-1.5 rounded-lg bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-xs flex items-center gap-1.5">
                                            <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                            <span>{potential.title}</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Switcher */}
                            {allImages.length > 1 && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                                    {allImages.map((imgUrl, idx) => {
                                        const matchedProd = potential.products?.find((p) => p.image === imgUrl);
                                        const label = matchedProd ? matchedProd.name : `${potential.title} - Foto ${idx + 1}`;
                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setActiveImage(imgUrl)}
                                                title={label}
                                                className={`relative h-16 w-24 sm:h-20 sm:w-28 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                                                    activeImage === imgUrl
                                                        ? 'border-red-600 ring-2 ring-red-600/30 shadow-md'
                                                        : 'border-zinc-200 dark:border-zinc-700 opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <img
                                                    src={imgUrl}
                                                    alt={label}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* B. DAFTAR & RINCIAN DETAIL PER PRODUK (PREMIUM INTERACTIVE CATALOG) */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 dark:bg-red-950/40 border border-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 shadow-2xs">
                                        <ShoppingBag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                                                Katalog Produk & Varian Harga
                                            </h2>
                                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                                {productsList.length} Varian
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Pesan langsung kepada peternak / produsen resmi binaan Desa Karangwungu.
                                        </p>
                                    </div>
                                </div>

                                {productsList.length > 2 && (
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Cari varian produk..."
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-xs focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all placeholder:text-zinc-400 shadow-2xs"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Products Grid / Cards */}
                            {filteredProducts.length > 0 ? (
                                <div className="space-y-3">
                                    {filteredProducts.map((prod) => {
                                        const prodId = prod.id || prod.name;

                                        return (
                                            <div
                                                key={prodId}
                                                className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/50 hover:bg-white dark:hover:bg-zinc-800/40 hover:border-zinc-300 dark:hover:border-zinc-700 p-4 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                            >
                                                {/* Left: Product Photo & Details */}
                                                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                                    {/* Photo with interactive Zoom/Preview */}
                                                    {prod.image ? (
                                                        <div
                                                            onClick={() => {
                                                                setActiveImage(prod.image);
                                                                const el = document.getElementById('hero-gallery-view');
                                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                            }}
                                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 relative cursor-pointer group/thumb shadow-xs"
                                                            title="Klik untuk melihat foto di galeri utama"
                                                        >
                                                            <img
                                                                src={prod.image}
                                                                alt={prod.name}
                                                                className="w-full h-full object-cover group-hover/thumb:scale-108 transition-transform duration-300"
                                                                loading="lazy"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Eye className="w-4 h-4 text-white drop-shadow-md" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shrink-0 border border-zinc-200 dark:border-zinc-700 bg-red-500/5 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                                            <ShoppingBag className="h-6 w-6 opacity-60" />
                                                        </div>
                                                    )}

                                                    {/* Details */}
                                                    <div className="space-y-1 flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                                                                {prod.name}
                                                            </h3>
                                                            {prod.stock_status && (
                                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                                    <span>{prod.stock_status}</span>
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Price & Unit Display */}
                                                        <div className="flex items-baseline gap-1.5 flex-wrap">
                                                            <span className="text-sm sm:text-base font-black text-red-600 dark:text-amber-400">
                                                                {prod.price}
                                                            </span>
                                                            {prod.unit && (
                                                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                                                    /{prod.unit}
                                                                </span>
                                                            )}
                                                            {prod.min_order && (
                                                                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 ml-2">
                                                                    Min: <strong className="text-zinc-600 dark:text-zinc-400 font-medium">{prod.min_order}</strong>
                                                                </span>
                                                            )}
                                                        </div>

                                                        {prod.description && (
                                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl line-clamp-2 pt-0.5">
                                                                {prod.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Quick View in Gallery button */}
                                                {prod.image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setActiveImage(prod.image);
                                                            const el = document.getElementById('hero-gallery-view');
                                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 text-xs font-semibold border border-zinc-200/80 dark:border-zinc-700/60 transition-all shrink-0 cursor-pointer self-start sm:self-center"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 text-zinc-400" />
                                                        <span>Lihat di Galeri</span>
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 px-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 space-y-2">
                                    <ShoppingBag className="h-8 w-8 text-zinc-400 mx-auto" />
                                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                        Tidak ada produk yang cocok dengan pencarian "{searchQuery}"
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                                    >
                                        Tampilkan Semua Produk
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* C. Highlight Keunggulan (Features) */}
                        {Array.isArray(potential.features) && potential.features.length > 0 && (
                            <div className="rounded-lg bg-gradient-to-r from-red-50/60 via-amber-50/40 to-white dark:from-red-950/20 dark:via-zinc-900 dark:to-zinc-900 border border-red-200/60 dark:border-red-900/40 p-5 sm:p-6 shadow-xs space-y-4">
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

                        {/* D. Narasi Lengkap & Kisah Profil Komoditas / Usaha */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                                <Info className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Profil & Deskripsi Lengkap Potensi</span>
                            </h3>

                            <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                                {potential.content || potential.description}
                            </div>
                        </div>

                        {/* E. Tabel Spesifikasi & Detail Legalitas */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                                <Layers className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Spesifikasi Produksi & Legalitas Usaha</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider">
                                        Produsen / Pengelola
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.owner_name || 'Peternak Lokal Karangwungu'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider">
                                        Kisaran Harga Resmi
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 block">
                                        {potential.price_range || 'Sesuai Pilihan Produk'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider">
                                        Kapasitas Produksi / Panen
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.production_capacity || 'Pasokan Rutin Harian'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1">
                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider">
                                        Jam Pelayanan
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                                        {potential.operating_hours || '07.00 - 17.00 WIB'}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 space-y-1 sm:col-span-2">
                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 block uppercase tracking-wider">
                                        Sertifikasi & Legalitas
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                                        {potential.certification || 'Binaan Pemerintah Desa Karangwungu'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* F. Lokasi & Peta Peternakan / Usaha */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                <span>Lokasi Sentra Usaha / Peternakan</span>
                            </h3>

                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                                        <span>Buka di Google Maps</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: CONTACT & SHARING SIDEBAR (lg:col-span-4) */}
                    <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                        {/* 1. KARTU INFORMASI PENGELOLA & PEMESANAN (Signature Karangwungu Red-Gold Theme) */}
                        <div className="rounded-lg overflow-hidden bg-gradient-to-b from-red-800 via-red-900 to-[#2e0508] text-white shadow-md border border-amber-400/40 p-5 sm:p-6 space-y-4">
                            {/* Top Badge */}
                            <div>
                                <span className="text-[10px] font-black tracking-widest text-amber-300 uppercase px-2.5 py-1 rounded-md bg-black/40 border border-amber-400/30 inline-block">
                                    Pengelola & Kontak Resmi
                                </span>
                            </div>

                            {/* Owner & Certification */}
                            <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                                    {potential.owner_name || 'Peternak Lokal Karangwungu'}
                                </h3>
                                <p className="text-xs font-semibold text-amber-300">
                                    {potential.certification || 'Binaan Pemerintah Desa Karangwungu'}
                                </p>
                            </div>

                            {/* Informasi Harga Resmi */}
                            <div className="pt-3 border-t border-white/15 space-y-1">
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-300/90 block">
                                    Kisaran Harga Resmi
                                </span>
                                <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                    {potential.price_range || 'Sesuai Pilihan Produk'}
                                </div>
                                <p className="text-[11px] text-red-100/80 leading-relaxed">
                                    Informasi harga resmi langsung dari produsen / peternak lokal tanpa perantara.
                                </p>
                            </div>

                            {/* Actions: WhatsApp & Telepon */}
                            <div className="space-y-2 pt-1">
                                {generalWhatsappUrl ? (
                                    <a
                                        href={generalWhatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Hubungi via WhatsApp</span>
                                    </a>
                                ) : (
                                    <div className="text-xs text-red-200/80 text-center p-2.5 bg-black/20 rounded-lg">
                                        Kontak WhatsApp sedang dipersiapkan
                                    </div>
                                )}

                                {potential.contact_phone && (
                                    <a
                                        href={`tel:${potential.contact_phone.replace(/[^0-9+]/g, '')}`}
                                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-black/30 hover:bg-black/50 text-white font-semibold text-xs border border-white/20 hover:border-amber-400/50 transition-colors cursor-pointer"
                                    >
                                        <Phone className="h-3.5 w-3.5 text-amber-300" />
                                        <span>Telepon: {potential.contact_phone}</span>
                                    </a>
                                )}
                            </div>

                            {/* Keunggulan Layanan Komoditas */}
                            <div className="pt-3 border-t border-white/15 space-y-2 text-[11px] text-red-100/90">
                                <div className="flex items-center gap-2">
                                    <Truck className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                    <span>Tersedia untuk eceran harian maupun partai besar</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Store className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                    <span>Transaksi langsung dengan pengelola / peternak desa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                    <span>Kualitas komoditas asli binaan Desa Karangwungu</span>
                                </div>
                            </div>

                            {/* Metadata Usaha: Lokasi & Jam Pelayanan */}
                            <div className="pt-3 border-t border-white/15 space-y-1.5 text-[11px] text-red-100/80">
                                <div className="flex items-center justify-between">
                                    <span className="text-red-200/70">Lokasi Sentra</span>
                                    <span className="font-semibold text-white truncate max-w-[180px]">
                                        {potential.location || 'Desa Karangwungu'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-red-200/70">Jam Pelayanan</span>
                                    <span className="font-semibold text-white">
                                        {potential.operating_hours || '07.00 - 17.00 WIB'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. KARTU DUKUNG PEREKONOMIAN DESA */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                <HeartHandshake className="h-4 w-4 text-red-600 dark:text-amber-500" />
                                <span>Dukung Komoditas Desa</span>
                            </div>
                            <p className="text-[11.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Publikasi potensi dan komoditas ini bertujuan untuk memperluas akses informasi produk warga Desa Karangwungu kepada masyarakat luas.
                            </p>
                        </div>

                        {/* 3. WIDGET BAGIKAN INFORMASI */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                <Share2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <span>Bagikan Informasi Ini</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Lihat rincian produk & harga ${potential.title} Desa Karangwungu: ${currentUrl}`)}`}
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
                                    Potensi & Produk Desa Lainnya
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Jelajahi beragam komoditas tambak, pertanian, dan olahan kuliner Desa Karangwungu.
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
                                    className="group rounded-lg overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer border border-red-500/30"
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

                                        {/* Overlapping Logo Box like Lembaga */}
                                        <div className="px-3 -mt-6 sm:-mt-7 relative z-10 flex items-end justify-between">
                                            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-white dark:bg-zinc-900 p-1 border-2 border-amber-400 shadow-xl flex items-center justify-center shrink-0 ring-2 ring-red-950/60">
                                                {item.logo ? (
                                                    <img
                                                        src={item.logo}
                                                        alt=""
                                                        className="w-full h-full object-contain filter drop-shadow-sm"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/assets/images/logo.png"
                                                        alt=""
                                                        className="w-full h-full object-contain filter drop-shadow-sm"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </div>

                                            {item.price_range && (
                                                <span className="text-[9px] sm:text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md border border-white/20 px-1.5 py-0.5 rounded-md shadow-xs truncate max-w-[120px]">
                                                    {item.price_range}
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-3 sm:p-4 pt-1.5 sm:pt-2 space-y-1.5">
                                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                                                {item.title}
                                            </h4>
                                            {item.price_range && (
                                                <p className="text-[10px] sm:text-xs font-bold text-amber-300">
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
