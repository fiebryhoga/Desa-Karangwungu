import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { Sparkles, Phone, MapPin, Tag, ShoppingBag, ChevronDown, Check } from 'lucide-react';

export default function PotentialsIndex({
    potentials = [],
    selectedCategory = 'Semua',
    categories = [],
}) {
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

                {/* Category Filter Pills (5 Utama + 1 Lainnya Dropdown) */}
                <div className="flex flex-wrap items-center gap-2">
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
                                <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
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

                {/* Potentials Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {potentials.map((item) => (
                        <div
                            key={item.id}
                            className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                        >
                            {/* Image */}
                            <div className="h-44 w-full overflow-hidden bg-zinc-950 relative">
                                <img
                                    src={item.image || 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80'}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-bold shadow-xs">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col gap-2.5">
                                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                    {item.title}
                                </h3>

                                {item.price_range && (
                                    <p className="text-xs font-bold text-amber-300 flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        <span>{item.price_range}</span>
                                    </p>
                                )}

                                <p className="text-[11px] text-red-100/80 leading-relaxed line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="space-y-1 text-[11px] text-red-200/70 mt-auto pt-2 border-t border-white/10">
                                    {item.owner_name && (
                                        <div className="flex items-center gap-1.5">
                                            <ShoppingBag className="h-3 w-3 text-amber-300/80 shrink-0" />
                                            <span>Produsen: <strong className="text-white/90">{item.owner_name}</strong></span>
                                        </div>
                                    )}
                                    {item.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="h-3 w-3 text-amber-300/80 shrink-0" />
                                            <span>{item.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer */}
                            {item.contact_phone && (
                                <div className="p-3 pt-0">
                                    <a
                                        href={`https://wa.me/62${item.contact_phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.title)}%20Desa%20Karangwungu`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-black/30 hover:bg-black/50 text-emerald-300 border border-white/10 hover:border-emerald-400/40 transition-all"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>Hubungi Penjual / Petani</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
