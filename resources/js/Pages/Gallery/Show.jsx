import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import { formatDateIndo } from '../../Utils/format';
import {
    ArrowLeft,
    Calendar,
    MapPin,
    Images,
    Share2,
    Check,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
    Camera,
    Sparkles,
} from 'lucide-react';

export default function GalleryShow({ album, otherAlbums = [] }) {
    const [activePhotoIndex, setActivePhotoIndex] = useState(null);
    const [copied, setCopied] = useState(false);

    const cover = album.image;
    const allPhotos = Array.isArray(album.photos) && album.photos.length > 0
        ? album.photos
        : (cover ? [cover] : []);

    const photos = cover
        ? [cover, ...allPhotos.filter((p) => p !== cover)]
        : allPhotos;

    const totalPhotos = photos.length;
    const isMultiPhoto = totalPhotos > 1;

    // Handle Copy Link
    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activePhotoIndex === null) return;

            if (e.key === 'Escape') {
                setActivePhotoIndex(null);
            } else if (e.key === 'ArrowRight') {
                setActivePhotoIndex((prev) => (prev + 1) % totalPhotos);
            } else if (e.key === 'ArrowLeft') {
                setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePhotoIndex, totalPhotos]);

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <AppLayout>
            <SeoHead
                title={`${album.title} - Galeri Dokumentasi Desa Karangwungu`}
                description={album.description || `Dokumentasi foto kegiatan ${album.title} di ${album.location || 'Desa Karangwungu'}.`}
                keywords={`Galeri ${album.title}, Dokumentasi ${album.title}, Foto Desa Karangwungu`}
                breadcrumbs={[
                    { label: 'Galeri Desa', url: '/galeri' },
                    { label: album.title, url: `/galeri/${album.slug}` },
                ]}
                image={album.image}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* 1. SIGNATURE HERO BANNER with Integrated Glassmorphism Navigation */}
                <div className="relative rounded-lg overflow-hidden shadow-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white">
                    {/* Background Landscape Photo Overlay */}
                    {album.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25 pointer-events-none"
                            style={{ backgroundImage: `url('${album.image}')` }}
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
                                href="/galeri"
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-amber-400/50 shadow-sm transition-all group w-fit"
                            >
                                <ArrowLeft className="h-3.5 w-3.5 text-amber-300 transition-transform group-hover:-translate-x-1" />
                                <span>Kembali ke Semua Album Galeri</span>
                            </Link>

                            <span className="text-[11px] font-bold text-amber-200/90 hidden sm:inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                <span>Dokumentasi Visual & Kegiatan</span>
                            </span>
                        </div>

                        {/* Top: Cover Box + Badges + Title */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            {/* Official Cover Thumbnail (No white border padding, fills edge-to-edge) */}
                            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-lg overflow-hidden bg-zinc-950 shadow-2xl border-2 border-amber-400 ring-4 ring-black/40 shrink-0">
                                <img
                                    src={album.image || photos[0]}
                                    alt={album.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Badges, Title & Description */}
                            <div className="space-y-2 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/40 border border-amber-400/40 text-amber-300 text-[10.5px] font-black uppercase tracking-wider backdrop-blur-xs">
                                        <Images className="h-3 w-3" />
                                        <span>{isMultiPhoto ? `Album Dokumentasi (${totalPhotos} Foto)` : 'Foto Dokumentasi'}</span>
                                    </span>

                                    {album.date && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/30 border border-white/20 text-white text-[10.5px] font-semibold backdrop-blur-xs">
                                            <Calendar className="h-3 w-3 text-amber-400" />
                                            <span>{formatDateIndo(album.date)}</span>
                                        </span>
                                    )}

                                    {album.location && (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/30 border border-white/20 text-white text-[10.5px] font-semibold backdrop-blur-xs">
                                            <MapPin className="h-3 w-3 text-amber-400" />
                                            <span>{album.location}</span>
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                                    {album.title}
                                </h1>

                                {album.description && (
                                    <p className="text-xs sm:text-[13px] text-red-100/90 font-normal leading-relaxed drop-shadow-xs max-w-4xl">
                                        {album.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Toolbar inside Hero */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2.5">
                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(`Lihat album dokumentasi ${album.title} di Desa Karangwungu: ${currentUrl}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>Bagikan via WhatsApp</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg bg-black/40 hover:bg-black/60 text-white font-bold border border-white/20 transition-colors cursor-pointer"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                                            <span className="text-emerald-400">Tautan Disalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="h-3.5 w-3.5 text-amber-300" />
                                            <span>Salin Tautan</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            <span className="text-[11px] text-amber-200/80 font-medium">
                                Klik foto untuk memperbesar & navigasi layar penuh
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Photo Gallery Presentation */}
                {totalPhotos === 1 ? (
                    /* Single Photo Hero Frame */
                    <div
                        onClick={() => setActivePhotoIndex(0)}
                        className="rounded-lg overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md group cursor-pointer relative max-h-[75vh] flex items-center justify-center"
                    >
                        <img
                            src={photos[0]}
                            alt={album.title}
                            className="w-full h-full object-contain max-h-[75vh] group-hover:scale-[1.01] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20 flex items-center gap-2 shadow-lg">
                                <ZoomIn className="h-4 w-4" />
                                <span>Buka Layar Penuh</span>
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Multi-Photo Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {photos.map((photoUrl, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActivePhotoIndex(idx)}
                                className="group rounded-lg overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer relative aspect-[4/3]"
                            >
                                <img
                                    src={photoUrl}
                                    alt={`${album.title} - Foto ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="p-2.5 rounded-lg bg-black/70 text-amber-300 border border-white/20">
                                        <ZoomIn className="h-5 w-5" />
                                    </span>
                                </div>

                                {/* Index Pill */}
                                <div className="absolute bottom-2.5 left-2.5">
                                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                                        Foto #{idx + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Other Albums Recommendations */}
                {otherAlbums.length > 0 && (
                    <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    Album Dokumentasi Kegiatan Lainnya
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Arsip visual dokumentasi pembangunan dan pelayanan Desa Karangwungu.
                                </p>
                            </div>
                            <Link
                                href="/galeri"
                                className="text-xs font-bold text-red-600 dark:text-amber-400 hover:underline"
                            >
                                Lihat Semua Album →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {otherAlbums.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/galeri/${item.slug}`}
                                    className="group rounded-lg overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col cursor-pointer"
                                >
                                    <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-950 relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-amber-300 text-[9.5px] font-bold border border-white/20 flex items-center gap-1">
                                                <Images className="h-2.5 w-2.5" />
                                                <span>{item.photo_count} Foto</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h4>
                                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
                                            <span>{item.location || 'Desa Karangwungu'}</span>
                                            <span>{formatDateIndo(item.date)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Fullscreen Lightbox Modal */}
            {activePhotoIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in-50 duration-150"
                    onClick={() => setActivePhotoIndex(null)}
                >
                    {/* Top Bar: Title, Counter & Close */}
                    <div
                        className="w-full max-w-6xl flex items-center justify-between text-white text-xs z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="truncate max-w-[70%]">
                            <span className="font-bold block truncate text-sm text-zinc-100">
                                {album.title}
                            </span>
                            <span className="text-[11px] text-amber-300">
                                Foto {activePhotoIndex + 1} dari {totalPhotos}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setActivePhotoIndex(null)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            title="Tutup (Esc)"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Main Photo Center Frame */}
                    <div
                        className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Prev Button */}
                        {isMultiPhoto && (
                            <button
                                type="button"
                                onClick={() =>
                                    setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
                                }
                                className="absolute left-2 sm:left-4 z-10 p-2.5 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                                title="Foto Sebelumnya (Panah Kiri)"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                        )}

                        {/* Image */}
                        <div className="max-h-[78vh] max-w-full overflow-hidden flex items-center justify-center">
                            <img
                                src={photos[activePhotoIndex]}
                                alt={`${album.title} - Foto ${activePhotoIndex + 1}`}
                                className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
                            />
                        </div>

                        {/* Next Button */}
                        {isMultiPhoto && (
                            <button
                                type="button"
                                onClick={() =>
                                    setActivePhotoIndex((prev) => (prev + 1) % totalPhotos)
                                }
                                className="absolute right-2 sm:right-4 z-10 p-2.5 rounded-lg bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                                title="Foto Selanjutnya (Panah Kanan)"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        )}
                    </div>

                    {/* Bottom Thumbnail Strip for Multi-photo */}
                    {isMultiPhoto && (
                        <div
                            className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-1 z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {photos.map((p, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setActivePhotoIndex(idx)}
                                    className={`h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                                        activePhotoIndex === idx
                                            ? 'border-amber-400 scale-105 shadow-lg'
                                            : 'border-white/20 opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={p}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
