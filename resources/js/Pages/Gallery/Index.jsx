import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import Pagination from '../../Components/UI/Pagination';
import { formatDateIndo } from '../../Utils/format';
import {
    Calendar,
    MapPin,
    Search,
    Images,
    ChevronRight,
    X,
} from 'lucide-react';

export default function GalleryIndex({
    galleries = { data: [], links: [] },
    filters = {},
}) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const albumList = Array.isArray(galleries) ? galleries : (galleries.data || []);
    const paginationLinks = galleries.links || [];

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        router.get(
            '/galeri',
            {
                search: searchQuery.trim() || undefined,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get(
            '/galeri',
            {},
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout>
            <SeoHead
                title="Galeri Dokumentasi & Kegiatan Desa Karangwungu"
                description="Dokumentasi foto dan album kegiatan pembangunan, panen raya pertanian & tambak bandeng, pelayanan publik, dan tradisi kebudayaan Desa Karangwungu, Lamongan."
                keywords="Galeri Desa Karangwungu, Foto Desa Karangwungu Karanggeneng, Album Kegiatan Desa Lamongan"
                breadcrumbs={[{ label: 'Galeri Desa', url: '/galeri' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Dokumentasi Visual & Galeri"
                    title="Galeri Foto & Dokumentasi Kegiatan"
                    subtitle="Koleksi album arsip dokumentasi visual pembangunan, pelayanan masyarakat, keindahan alam, serta denyut kehidupan warga Desa Karangwungu."
                />

                {/* Search Bar */}
                <div className="flex justify-end">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-red-600 dark:text-amber-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari album kegiatan, lokasi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-400 shadow-2xs"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                                title="Hapus pencarian"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </form>
                </div>

                {/* 3. Albums Grid */}
                {albumList.length === 0 ? (
                    <div className="p-12 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                        <Images className="h-10 w-10 text-red-600 dark:text-amber-400 mx-auto opacity-70" />
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            Tidak Ada Album Ditemukan
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Tidak ada arsip dokumentasi yang cocok dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {albumList.map((item) => {
                            const cover = item.image;
                            const allPhotos = Array.isArray(item.photos) && item.photos.length > 0
                                ? item.photos
                                : (cover ? [cover] : []);
                            // Ensure the cover photo is always position #1 in the card collage
                            const photos = cover
                                ? [cover, ...allPhotos.filter((p) => p !== cover)]
                                : allPhotos;
                            const totalPhotos = photos.length;

                            return (
                                <Link
                                    key={item.id}
                                    href={`/galeri/${item.slug}`}
                                    className="group rounded-lg overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between border border-red-500/30"
                                >
                                    <div>
                                        {/* Album Photo Collage Presentation */}
                                        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-zinc-950 select-none">
                                            {/* Layout when 1 Photo */}
                                            {totalPhotos <= 1 && (
                                                <div className="w-full h-full">
                                                    <img
                                                        src={photos[0] || item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}

                                            {/* Layout when 2 Photos (Seamless, unified without black gaps) */}
                                            {totalPhotos === 2 && (
                                                <div className="grid grid-cols-2 w-full h-full">
                                                    <div className="relative h-full overflow-hidden border-r border-white/20">
                                                        <img
                                                            src={photos[0]}
                                                            alt={`${item.title} - 1`}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div className="relative h-full overflow-hidden">
                                                        <img
                                                            src={photos[1]}
                                                            alt={`${item.title} - 2`}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Layout when 3 or More Photos (Seamless collage, touching directly without black gaps) */}
                                            {totalPhotos >= 3 && (
                                                <div className="grid grid-cols-3 w-full h-full">
                                                    {/* Slot 1: Main Hero Photo (2 columns wide, seamless border-r) */}
                                                    <div className="col-span-2 h-full overflow-hidden relative border-r border-white/20">
                                                        <img
                                                            src={photos[0]}
                                                            alt={`${item.title} - 1`}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            loading="lazy"
                                                        />
                                                    </div>

                                                    {/* Right Column: 2 Stacked Slots without gap */}
                                                    <div className="col-span-1 flex flex-col h-full">
                                                        {/* Slot 2: Second Photo (border-b separating from slot 3) */}
                                                        <div className="h-1/2 overflow-hidden relative border-b border-white/20">
                                                            <img
                                                                src={photos[1]}
                                                                alt={`${item.title} - 2`}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                loading="lazy"
                                                            />
                                                        </div>

                                                        {/* Slot 3: Third Photo (with "+N" overlay if > 3 photos) */}
                                                        <div className="h-1/2 overflow-hidden relative">
                                                            <img
                                                                src={photos[2]}
                                                                alt={`${item.title} - 3`}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                loading="lazy"
                                                            />

                                                            {/* More Overlay if totalPhotos > 3 */}
                                                            {totalPhotos > 3 && (
                                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center text-white text-center p-1">
                                                                    <span className="text-base sm:text-lg font-black text-amber-300 leading-none">
                                                                        +{totalPhotos - 2}
                                                                    </span>
                                                                    <span className="text-[9px] sm:text-[10px] uppercase font-black text-white/90 tracking-wider mt-0.5">
                                                                        Foto
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Photo Count Badge */}
                                            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                                                <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-black shadow-xs inline-flex items-center gap-1.5">
                                                    <Images className="h-3 w-3 text-amber-300" />
                                                    <span>{totalPhotos > 1 ? `${totalPhotos} Foto` : '1 Foto'}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-4 sm:p-5 space-y-2">
                                            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                                {item.title}
                                            </h3>
                                            {item.description && (
                                                <p className="text-xs text-red-100/80 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="p-4 sm:p-5 pt-0 mt-auto">
                                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-red-200/80">
                                            <div className="flex items-center gap-3 truncate max-w-[70%]">
                                                {item.location && (
                                                    <span className="flex items-center gap-1 truncate">
                                                        <MapPin className="h-3 w-3 text-amber-300 shrink-0" />
                                                        <span className="truncate">{item.location}</span>
                                                    </span>
                                                )}
                                                {item.date && (
                                                    <span className="flex items-center gap-1 shrink-0">
                                                        <Calendar className="h-3 w-3 text-amber-300 shrink-0" />
                                                        <span>{formatDateIndo(item.date)}</span>
                                                    </span>
                                                )}
                                            </div>

                                            <span className="inline-flex items-center gap-1 font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform shrink-0">
                                                <span>Buka</span>
                                                <ChevronRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* 4. Pagination (9 Albums per page) */}
                <Pagination
                    links={paginationLinks}
                    meta={galleries}
                    itemLabel="album"
                />
            </div>
        </AppLayout>
    );
}
