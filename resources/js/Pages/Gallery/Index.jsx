import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { Card, CardContent } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Image, Calendar, MapPin, X, ZoomIn, ChevronDown, Check } from 'lucide-react';

export default function GalleryIndex({
    galleries = [],
    selectedCategory = 'Semua',
    categories = [],
}) {
    const [activeImage, setActiveImage] = useState(null);
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
        router.get('/galeri', { category: cat }, { preserveState: true });
    };

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(selectedCategory);

    return (
        <AppLayout>
            <SeoHead
                title="Galeri Dokumentasi & Kegiatan Desa Karangwungu"
                description="Dokumentasi foto kegiatan pembangunan, panen raya pertanian & tambak bandeng, pelayanan publik, dan tradisi kebudayaan Desa Karangwungu, Lamongan."
                keywords="Galeri Desa Karangwungu, Foto Desa Karangwungu Karanggeneng, Dokumentasi Kegiatan Desa Lamongan"
                breadcrumbs={[{ label: 'Galeri Desa', url: '/galeri' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Dokumentasi Visual & Galeri"
                    title="Galeri Foto & Dokumentasi Kegiatan"
                    subtitle="Koleksi arsip dokumentasi visual pembangunan, pelayanan masyarakat, keindahan alam, serta denyut kehidupan warga Desa Karangwungu."
                />

                {/* Category Filter Tabs (5 Utama + 1 Lainnya Dropdown) */}
                <div className="my-6 flex flex-wrap items-center gap-2">
                    {primaryCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                selectedCategory === cat
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

                {/* Gallery Masonry / Grid */}
                {galleries.length === 0 ? (
                    <Card className="my-8 border-dashed border-zinc-300 dark:border-zinc-800">
                        <CardContent className="p-8 text-center space-y-2">
                            <Image className="h-10 w-10 text-red-600 dark:text-amber-400 mx-auto" />
                            <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
                                Belum ada foto dalam kategori ini.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {galleries.map((item) => (
                            <div
                                key={item.id}
                                className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col"
                                onClick={() => setActiveImage(item)}
                            >
                                <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="p-2.5 rounded-full bg-zinc-950/80 text-amber-400 border border-amber-500/40">
                                            <ZoomIn className="h-5 w-5" />
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-bold shadow-xs">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-red-100/80 mt-1 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-red-200/70">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3 text-amber-300 shrink-0" />
                                            <span className="truncate max-w-[140px]">{item.location}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-amber-300 shrink-0" />
                                            <span>{formatDateIndo(item.date)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Lightbox Popup */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-150"
                    onClick={() => setActiveImage(null)}
                >
                    <div
                        className="relative max-w-4xl w-full rounded-lg bg-zinc-950 border border-amber-500/40 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setActiveImage(null)}
                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white hover:bg-black transition-colors cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
                            <img
                                src={activeImage.image}
                                alt={activeImage.title}
                                className="w-full h-full object-contain max-h-[65vh]"
                            />
                        </div>

                        <div className="p-5 space-y-2 bg-zinc-950">
                            <div className="flex items-center gap-2">
                                <Badge variant="gold" className="text-[11px]">{activeImage.category}</Badge>
                                <span className="text-xs text-zinc-400">&bull;</span>
                                <span className="text-xs text-zinc-400">{formatDateIndo(activeImage.date)}</span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white">
                                {activeImage.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                                {activeImage.description}
                            </p>
                            <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>Lokasi: {activeImage.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
