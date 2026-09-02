import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import { Card, CardContent } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Image, Calendar, MapPin, X, ZoomIn } from 'lucide-react';

export default function GalleryIndex({
    galleries = [],
    selectedCategory = 'Semua',
    categories = [],
}) {
    const [activeImage, setActiveImage] = useState(null);

    const handleCategoryFilter = (cat) => {
        router.get('/galeri', { category: cat }, { preserveState: true });
    };

    return (
        <AppLayout>
            <SeoHead
                title="Galeri Dokumentasi & Kegiatan Desa"
                description="Dokumentasi foto kegiatan pembangunan, panen raya pertanian & tambak bandeng, pelayanan publik, dan tradisi kebudayaan Desa Karangwungu, Lamongan."
                keywords="Galeri Desa Karangwungu, Foto Desa Karangwungu Karanggeneng, Dokumentasi Kegiatan Desa Lamongan"
                breadcrumbs={[{ label: 'Galeri Desa', url: '/galeri' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Title */}
                <div className="my-6">
                    <Badge variant="gold">Dokumentasi Visual</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2">
                        Galeri Foto & Dokumentasi Kegiatan
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Koleksi arsip dokumentasi visual pembangunan, pelayanan masyarakat, keindahan alam, serta denyut kehidupan warga Desa Karangwungu.
                    </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="my-6 flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                selectedCategory === cat
                                    ? 'bg-amber-500 text-zinc-950 shadow-md'
                                    : 'bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                        {galleries.map((item) => (
                            <Card
                                key={item.id}
                                className="overflow-hidden flex flex-col group cursor-pointer hover:border-red-500/50 dark:hover:border-amber-500/60 transition-all hover:shadow-2xl bg-white dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-800 backdrop-blur-md"
                                onClick={() => setActiveImage(item)}
                            >
                                <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="p-2.5 rounded-full bg-zinc-950/80 text-amber-400 border border-amber-500/40">
                                            <ZoomIn className="h-5 w-5" />
                                        </span>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="default" className="bg-black/90 backdrop-blur-sm text-amber-300 border border-amber-500/40 text-[11px]">
                                            {item.category}
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
                                            <span className="truncate max-w-[140px]">{item.location}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-amber-400 shrink-0" />
                                            <span>{formatDateIndo(item.date)}</span>
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
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
