import React, { useState, useRef, useEffect } from 'react';
import { router, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { Sparkles, Phone, MapPin, Tag, ShoppingBag, ChevronDown, Check, Search, ChevronRight, MessageCircle } from 'lucide-react';

export default function PotentialsIndex({
    potentials = [],
    selectedCategory = 'Semua',
    categories = [],
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const otherDropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
                setIsOtherOpen(false);
            }
        };
        if (isOtherOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOtherOpen]);

    const handleCategoryFilter = (cat) => {
        router.get('/potensi', { category: cat === 'Semua' ? '' : cat });
    };

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(selectedCategory);

    const filteredPotentials = potentials.filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            (item.title && item.title.toLowerCase().includes(q)) ||
            (item.description && item.description.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q)) ||
            (item.contact_person && item.contact_person.toLowerCase().includes(q))
        );
    });

    return (
        <AppLayout>
            <SeoHead
                title="Potensi Desa & Produk UMKM Unggulan"
                description="Katalog Potensi Komoditas dan Produk UMKM Desa Karangwungu, Kecamatan Karanggeneng, Lamongan. Budidaya ikan bandeng, udang vaname, beras organik, kerupuk ikan, dan kerajinan anyaman mendong."
                keywords="Potensi Desa Karangwungu, Bandeng Karangwungu Lamongan, UMKM Karangwungu, Kerajinan Mendong Lamongan"
                breadcrumbs={[{ label: 'Potensi & UMKM', url: '/potensi' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Ekonomi & Potensi Lokal"
                    title="Potensi Unggulan & Direktori UMKM Desa"
                    subtitle="Mendukung pertumbuhan ekonomi mandiri warga Desa Karangwungu melalui hilirisasi komoditas tambak, pertanian, dan industri kreatif lokal."
                />

                {/* Category Filter Pills & Search Toolbar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {primaryCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryFilter(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    selectedCategory === cat || (cat === 'Semua' && !selectedCategory)
                                        ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Tombol ke-6: Lainnya + Dropdown Menu */}
                        {otherCategories.length > 0 && (
                            <div className="relative" ref={otherDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsOtherOpen(!isOtherOpen)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                        isOtherSelected
                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                    }`}
                                >
                                    <span>{isOtherSelected ? selectedCategory : 'Lainnya'}</span>
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                            isOtherOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOtherOpen && (
                                    <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                        <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                            Kategori Lainnya
                                        </div>
                                        {otherCategories.map((cat) => {
                                            const isCatActive = selectedCategory === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        handleCategoryFilter(cat);
                                                        setIsOtherOpen(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                                        isCatActive
                                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 font-bold'
                                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-amber-400'
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    {isCatActive && (
                                                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                        <input
                            type="text"
                            placeholder="Cari produk & potensi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400"
                        />
                    </div>
                </div>

                {/* Potentials Cards Grid (2 Columns on Mobile) */}
                {filteredPotentials.length === 0 ? (
                    <div className="p-12 rounded-lg bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-2">
                        <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                            Tidak ada potensi atau produk UMKM ditemukan.
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Silakan coba kata kunci lain atau pilih kategori Semua.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                        {filteredPotentials.map((item) => (
                            <div
                                key={item.id}
                                className="group rounded-lg overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                                {/* Clickable Link Area: Image + Details */}
                                <Link
                                    href={`/potensi/${item.slug}`}
                                    className="flex-1 flex flex-col cursor-pointer"
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] sm:aspect-auto sm:h-44 w-full overflow-hidden bg-zinc-950 relative">
                                        <img
                                            src={item.image || 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80'}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                            <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-amber-300 text-[8.5px] sm:text-[10px] font-bold shadow-xs truncate max-w-[120px] sm:max-w-none block">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Overlapping Official Logo Box like Lembaga */}
                                    <div className="px-3 sm:px-4 -mt-8 sm:-mt-10 relative z-10 flex items-end justify-between">
                                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-white dark:bg-zinc-900 p-1.5 sm:p-2 border-2 border-amber-400 shadow-2xl flex items-center justify-center shrink-0 ring-4 ring-red-950/60">
                                            {item.logo ? (
                                                <img
                                                    src={item.logo}
                                                    alt={`Logo ${item.title}`}
                                                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <img
                                                    src="/assets/images/logo.png"
                                                    alt="Logo"
                                                    className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>

                                        {item.price_range && (
                                            <span className="text-[9.5px] sm:text-[11px] font-bold text-amber-300 bg-black/60 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-md shadow-xs truncate max-w-[140px]">
                                                {item.price_range}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-2.5 sm:p-4 pt-2 sm:pt-3 flex-1 flex flex-col gap-1.5 sm:gap-2">
                                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                                            {item.title}
                                        </h3>

                                        {item.price_range && (
                                            <p className="text-[10px] sm:text-xs font-bold text-amber-300 flex items-center gap-1">
                                                <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                                                <span className="truncate">{item.price_range}</span>
                                            </p>
                                        )}

                                        <p className="text-[9.5px] sm:text-[11px] text-red-100/80 leading-relaxed line-clamp-2 sm:line-clamp-3">
                                            {item.description}
                                        </p>

                                        <div className="space-y-0.5 sm:space-y-1 text-[9px] sm:text-[11px] text-red-200/70 mt-auto pt-1.5 sm:pt-2 border-t border-white/10">
                                            {item.owner_name && (
                                                <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                                                    <ShoppingBag className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-300/80 shrink-0" />
                                                    <span className="truncate">Produsen: <strong className="text-white/90">{item.owner_name}</strong></span>
                                                </div>
                                            )}
                                            {item.location && (
                                                <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                                                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-300/80 shrink-0" />
                                                    <span className="truncate">{item.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                                {/* Footer Action Buttons: Lihat Detail + WA Order */}
                                <div className="p-2 sm:p-3 pt-0 flex items-center gap-1.5 border-t border-white/10 mt-1">
                                    <Link
                                        href={`/potensi/${item.slug}`}
                                        className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-[10px] sm:text-xs font-bold bg-white/15 hover:bg-white/25 text-white transition-all"
                                    >
                                        <span>Lihat Detail</span>
                                        <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>

                                    {(item.contact_whatsapp || item.contact_phone) && (
                                        <a
                                            href={`https://wa.me/${(item.contact_whatsapp || item.contact_phone).replace(/[^0-9]/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(`Halo saya tertarik dengan produk ${item.title} Desa Karangwungu`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Chat Penjual via WhatsApp"
                                            className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all shrink-0 cursor-pointer shadow-xs"
                                        >
                                            <MessageCircle className="h-3.5 w-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    </AppLayout>
);
}
