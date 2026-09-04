import React, { useState, useMemo, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Image as ImageIcon,
    Search,
    Plus,
    Trash2,
    Save,
    ExternalLink,
    AlertTriangle,
    Upload,
    Loader2,
    CheckCircle2,
    X,
    Calendar,
    MapPin,
    Eye,
    EyeOff,
    Camera,
    Images,
    Sparkles,
    Star,
    GripVertical,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const DEFAULT_BLANK_GALLERY = {
    title: '',
    slug: '',
    image: '',
    photos: [],
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: 'Desa Karangwungu',
    order: 0,
    is_published: true,
};

export default function GallerySettings({ galleries = [] }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Search query
    const [searchQuery, setSearchQuery] = useState('');

    // Selected album ID (null = new)
    const [selectedGalleryId, setSelectedGalleryId] = useState(() => {
        return galleries.length > 0 ? galleries[0].id : null;
    });

    // Form state
    const [formData, setFormData] = useState(() => {
        if (galleries.length > 0) {
            const first = galleries[0];
            return {
                ...first,
                photos: Array.isArray(first.photos) ? [...first.photos] : (first.image ? [first.image] : []),
            };
        }
        return { ...DEFAULT_BLANK_GALLERY };
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
    const [errors, setErrors] = useState({});

    // Drag and Drop reordering states for albums
    const [albumList, setAlbumList] = useState(galleries);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [dragOverIndex, setDragOverIndex] = useState(null);
    const [isReordering, setIsReordering] = useState(false);

    // Drag and Drop states for photos inside album
    const [draggedPhotoIdx, setDraggedPhotoIdx] = useState(null);
    const [dragOverPhotoIdx, setDragOverPhotoIdx] = useState(null);

    useEffect(() => {
        setAlbumList(galleries);
    }, [galleries]);

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Filtered album list
    const filteredGalleries = useMemo(() => {
        if (!searchQuery.trim()) return albumList;
        const q = searchQuery.toLowerCase();
        return albumList.filter((item) => {
            return (
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.location && item.location.toLowerCase().includes(q)) ||
                (item.description && item.description.toLowerCase().includes(q))
            );
        });
    }, [albumList, searchQuery]);

    // Drag & Drop handlers
    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIndex !== index) {
            setDragOverIndex(index);
        }
    };

    const handleDrop = async (e, targetIndex) => {
        e.preventDefault();
        if (draggedItemIndex === null || draggedItemIndex === targetIndex) {
            setDraggedItemIndex(null);
            setDragOverIndex(null);
            return;
        }

        const updated = [...albumList];
        const [movedItem] = updated.splice(draggedItemIndex, 1);
        updated.splice(targetIndex, 0, movedItem);

        const reordered = updated.map((item, idx) => ({
            ...item,
            order: idx + 1,
        }));

        setAlbumList(reordered);
        setDraggedItemIndex(null);
        setDragOverIndex(null);

        setIsReordering(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const payload = reordered.map((item) => ({
                id: item.id,
                order: item.order,
            }));

            await fetch(`/${adminPath}/settings/gallery/reorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ orders: payload }),
            });
        } catch (err) {
            console.error('Failed to save reorder', err);
        } finally {
            setIsReordering(false);
        }
    };

    const handleDragEnd = () => {
        setDraggedItemIndex(null);
        setDragOverIndex(null);
    };

    // Handle selecting an album from list
    const handleSelectGallery = (item) => {
        setSelectedGalleryId(item.id);
        const photos = Array.isArray(item.photos) && item.photos.length > 0
            ? [...item.photos]
            : (item.image ? [item.image] : []);

        setFormData({
            id: item.id,
            title: item.title || '',
            slug: item.slug || '',
            image: item.image || '',
            photos: photos,
            description: item.description || '',
            date: item.date || '',
            location: item.location || '',
            order: item.order ?? 0,
            is_published: item.is_published ?? true,
        });
        setErrors({});
    };

    // Handle creating a new album
    const handleCreateNew = () => {
        setSelectedGalleryId(null);
        setFormData({
            ...DEFAULT_BLANK_GALLERY,
            order: galleries.length + 1,
            date: new Date().toISOString().split('T')[0],
            photos: [],
        });
        setErrors({});
    };

    // Handle form input change
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    // Cover image upload
    const handleCoverUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 8 * 1024 * 1024) {
            alert('Ukuran file maksimal 8MB.');
            return;
        }

        const data = new FormData();
        data.append('image_file', file);

        setIsUploadingCover(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(`/${adminPath}/settings/gallery/upload-image`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                },
                body: data,
            });

            const result = await response.json();
            if (result.success && result.url) {
                // If photos is empty, also add as first photo
                setFormData((prev) => {
                    const nextPhotos = prev.photos.length === 0 ? [result.url] : prev.photos;
                    return {
                        ...prev,
                        image: result.url,
                        photos: nextPhotos,
                    };
                });
            } else {
                alert(result.message || 'Gagal mengunggah foto sampul.');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan jaringan saat mengunggah foto sampul.');
        } finally {
            setIsUploadingCover(false);
        }
    };

    // Multiple photos upload into album
    const handleMultiPhotosUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const data = new FormData();
        files.forEach((file) => {
            data.append('photos[]', file);
        });

        setIsUploadingPhotos(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(`/${adminPath}/settings/gallery/upload-photos`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    'Accept': 'application/json',
                },
                body: data,
            });

            const result = await response.json();
            if (result.success && Array.isArray(result.urls)) {
                setFormData((prev) => {
                    const updatedPhotos = [...prev.photos, ...result.urls];
                    const updatedCover = prev.image ? prev.image : result.urls[0];
                    return {
                        ...prev,
                        image: updatedCover,
                        photos: updatedPhotos,
                    };
                });
            } else {
                alert(result.message || 'Gagal mengunggah foto-foto album.');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan jaringan saat mengunggah foto-foto.');
        } finally {
            setIsUploadingPhotos(false);
        }
    };

    // Remove a photo from album
    const handleRemovePhoto = (indexToRemove) => {
        setFormData((prev) => {
            const nextPhotos = prev.photos.filter((_, idx) => idx !== indexToRemove);
            let nextCover = prev.image;
            // If the removed photo was the cover photo, update cover to first remaining photo
            if (prev.photos[indexToRemove] === prev.image) {
                nextCover = nextPhotos.length > 0 ? nextPhotos[0] : '';
            }
            return {
                ...prev,
                photos: nextPhotos,
                image: nextCover,
            };
        });
    };

    // Drag & Drop handlers for photos inside the album
    const handlePhotoDragStart = (e, idx) => {
        setDraggedPhotoIdx(idx);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', idx.toString());
    };

    const handlePhotoDragOver = (e, idx) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverPhotoIdx !== idx) {
            setDragOverPhotoIdx(idx);
        }
    };

    const handlePhotoDrop = (e, targetIdx) => {
        e.preventDefault();
        if (draggedPhotoIdx === null || draggedPhotoIdx === targetIdx) {
            setDraggedPhotoIdx(null);
            setDragOverPhotoIdx(null);
            return;
        }

        setFormData((prev) => {
            const nextPhotos = [...prev.photos];
            const [moved] = nextPhotos.splice(draggedPhotoIdx, 1);
            nextPhotos.splice(targetIdx, 0, moved);

            return {
                ...prev,
                photos: nextPhotos,
                image: nextPhotos[0] || '',
            };
        });

        setDraggedPhotoIdx(null);
        setDragOverPhotoIdx(null);
    };

    const handlePhotoDragEnd = () => {
        setDraggedPhotoIdx(null);
        setDragOverPhotoIdx(null);
    };

    // Move photo position by direction (-1 left, 1 right)
    const handleMovePhoto = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= formData.photos.length) return;

        setFormData((prev) => {
            const nextPhotos = [...prev.photos];
            const [moved] = nextPhotos.splice(index, 1);
            nextPhotos.splice(targetIndex, 0, moved);

            return {
                ...prev,
                photos: nextPhotos,
                image: nextPhotos[0] || '',
            };
        });
    };

    // Set photo as album cover (automatically moves it to position #1)
    const handleSetAsCover = (photoUrl) => {
        setFormData((prev) => {
            const nextPhotos = [photoUrl, ...prev.photos.filter((p) => p !== photoUrl)];
            return {
                ...prev,
                image: photoUrl,
                photos: nextPhotos,
            };
        });
    };

    // Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Judul album kegiatan wajib diisi.';
        if (!formData.image.trim() && formData.photos.length === 0) {
            newErrors.image = 'Minimal harus memiliki 1 foto sampul atau foto album.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Ensure image is set from photos if empty
        const payload = {
            ...formData,
            image: formData.image || (formData.photos.length > 0 ? formData.photos[0] : ''),
        };

        setIsSaving(true);
        if (selectedGalleryId) {
            router.put(`/${adminPath}/settings/gallery/${selectedGalleryId}`, payload, {
                preserveScroll: true,
                onSuccess: () => setIsSaving(false),
                onError: (err) => {
                    setErrors(err);
                    setIsSaving(false);
                },
            });
        } else {
            router.post(`/${adminPath}/settings/gallery`, payload, {
                preserveScroll: true,
                onSuccess: () => setIsSaving(false),
                onError: (err) => {
                    setErrors(err);
                    setIsSaving(false);
                },
            });
        }
    };

    // Confirm Delete
    const triggerDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;
        router.delete(`/${adminPath}/settings/gallery/${itemToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setItemToDelete(null);
                if (selectedGalleryId === itemToDelete.id) {
                    handleCreateNew();
                }
            },
        });
    };

    const activePhotoCount = formData.photos.length > 0
        ? formData.photos.length
        : (formData.image ? 1 : 0);

    return (
        <AdminLayout title="Konfigurasi Album Galeri - Panel Admin">
            <div className="space-y-6">
                {/* 1. Page Header */}
                <AdminPageHeader
                    badge="Dokumentasi Visual & Kegiatan"
                    title="Konfigurasi Album Galeri Desa"
                    description="Kelola album arsip dokumentasi visual kegiatan desa. Setiap album dapat memuat kumpulan banyak foto maupun foto tunggal."
                    icon={ImageIcon}
                    breadcrumbs={[
                        { label: 'Dashboard', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Galeri' },
                    ]}
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href={selectedGalleryId && formData.slug ? `/galeri/${formData.slug}` : '/galeri'}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-xs"
                            >
                                <Eye className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Publik</span>
                                <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                            </a>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-3.5 w-3.5" />
                                        <span>{selectedGalleryId ? 'Simpan Perubahan' : 'Simpan Album'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    }
                />

                {/* 2. Top Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="p-2.5 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 border border-red-500/20">
                            <Images className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                                Total Album Terdaftar
                            </span>
                            <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                                {galleries.length} Album
                            </span>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            <Camera className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                                Total Foto Terarsip
                            </span>
                            <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                                {galleries.reduce((acc, curr) => acc + (curr.photo_count || 1), 0)} Foto
                            </span>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5">
                        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                                Album Dipublikasikan
                            </span>
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                                {galleries.filter((g) => g.is_published).length} Album
                            </span>
                        </div>
                    </div>
                </div>

                {/* 3. Main Split Layout: Left List & Right Editor */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT PANEL: ALBUMS CATALOG (lg:col-span-5) */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari album, lokasi kegiatan..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCreateNew}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    <span>Tambah Album</span>
                                </button>
                            </div>
                        </div>

                        {/* Reorder Hint & Status */}
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 px-1">
                            <span className="flex items-center gap-1 font-medium">
                                <GripVertical className="h-3.5 w-3.5 text-zinc-400" />
                                <span>Tarik & lepas item untuk mengubah urutan</span>
                            </span>
                            {isReordering && (
                                <span className="text-amber-500 font-bold inline-flex items-center gap-1">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    <span>Menyimpan urutan...</span>
                                </span>
                            )}
                        </div>

                        {/* List Items Container */}
                        <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                            {filteredGalleries.length === 0 ? (
                                <div className="p-8 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs">
                                    Tidak ada album kegiatan yang sesuai filter pencarian.
                                </div>
                            ) : (
                                filteredGalleries.map((item, index) => {
                                    const isSelected = selectedGalleryId === item.id;
                                    const count = item.photo_count || 1;
                                    const isDragging = draggedItemIndex === index;
                                    const isOver = dragOverIndex === index;

                                    return (
                                        <div
                                            key={item.id}
                                            draggable={!searchQuery.trim()}
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            onDragEnd={handleDragEnd}
                                            onClick={() => handleSelectGallery(item)}
                                            className={`p-3 rounded-lg border transition-all cursor-pointer relative group flex gap-3 items-center ${
                                                isSelected
                                                    ? 'bg-red-50/50 dark:bg-red-950/20 border-red-500/60 shadow-xs ring-1 ring-red-500/30'
                                                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            } ${isDragging ? 'opacity-30 border-dashed border-red-400 scale-[0.98]' : ''} ${
                                                isOver ? 'border-t-2 border-red-500 shadow-md' : ''
                                            }`}
                                        >
                                            {/* Drag Grip Handle */}
                                            {!searchQuery.trim() && (
                                                <div
                                                    className="cursor-grab active:cursor-grabbing p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 shrink-0 select-none"
                                                    title="Tarik & lepas untuk mengubah urutan"
                                                >
                                                    <GripVertical className="h-4 w-4" />
                                                </div>
                                            )}

                                            {/* Thumbnail Cover */}
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0 relative">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                                        <ImageIcon className="h-6 w-6" />
                                                    </div>
                                                )}
                                                {!item.is_published && (
                                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                                                        <EyeOff className="h-4 w-4 text-white/80" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex items-center justify-between gap-1.5">
                                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                                                        <Images className="h-3 w-3" />
                                                        <span>{count} Foto</span>
                                                    </span>
                                                    <span className="text-[10.5px] font-bold text-zinc-400 dark:text-zinc-500 shrink-0">
                                                        #{index + 1}
                                                    </span>
                                                </div>

                                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                                                    {item.title}
                                                </h4>

                                                <div className="flex items-center gap-3 text-[10.5px] text-zinc-500 dark:text-zinc-400 pt-0.5">
                                                    {item.date && (
                                                        <span className="flex items-center gap-1 shrink-0">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{item.date}</span>
                                                        </span>
                                                    )}
                                                    {item.location && (
                                                        <span className="flex items-center gap-1 truncate">
                                                            <MapPin className="h-3 w-3 shrink-0" />
                                                            <span className="truncate">{item.location}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* RIGHT PANEL: ALBUM FORM EDITOR (lg:col-span-7) */}
                    <div className="lg:col-span-7">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs p-5 sm:p-6 space-y-5"
                        >
                            {/* Editor Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <div>
                                    <span className="text-[10px] font-bold text-red-600 dark:text-amber-400 uppercase tracking-wider block">
                                        {selectedGalleryId ? 'Sunting Album Dokumentasi' : 'Buat Album Dokumentasi Baru'}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-zinc-100">
                                        {formData.title || 'Dokumentasi Kegiatan Baru'}
                                    </h3>
                                </div>

                                {selectedGalleryId && (
                                    <button
                                        type="button"
                                        onClick={() => triggerDelete(formData)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900/50 transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Hapus Album</span>
                                    </button>
                                )}
                            </div>

                            {/* Section 1: Title, Slug, Date, Location */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                                        <span>Nama / Judul Album Kegiatan <span className="text-red-500">*</span></span>
                                        <span className="text-[10px] font-normal text-zinc-400">Contoh: Panen Raya Sawah Organik</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="Judul album dokumentasi kegiatan..."
                                        className="w-full px-3.5 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                    {errors.title && (
                                        <p className="text-[11px] text-red-500">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                        <span>Tanggal Pelaksanaan Acara</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date || ''}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        className="w-full px-3.5 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                                        <span>Lokasi Dokumentasi / Kegiatan</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleChange('location', e.target.value)}
                                        placeholder="Contoh: Balai Pertemuan Desa Karangwungu"
                                        className="w-full px-3.5 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* Section 2: Cover Photo */}
                            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                                    <span>Foto Sampul Album (Cover Utama) <span className="text-red-500">*</span></span>
                                    <span className="text-[10.5px] text-zinc-400 font-normal">
                                        Foto yang tampil pada kartu galeri depan
                                    </span>
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                                    {/* Cover Preview */}
                                    <div className="sm:col-span-4 aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 relative flex items-center justify-center">
                                        {formData.image ? (
                                            <>
                                                <img
                                                    src={formData.image}
                                                    alt="Sampul Album"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-amber-300 text-[9.5px] font-bold border border-white/20">
                                                    Foto Sampul
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-3 text-zinc-400">
                                                <ImageIcon className="h-8 w-8 mx-auto mb-1 opacity-50" />
                                                <span className="text-[10px] block">Belum ada sampul</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload Trigger */}
                                    <div className="sm:col-span-8 space-y-2">
                                        <div>
                                            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900/60 text-xs font-bold transition-colors cursor-pointer shadow-xs">
                                                {isUploadingCover ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin text-red-600 dark:text-amber-400" />
                                                        <span>Mengunggah sampul...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        <span>Pilih & Unggah Foto Sampul</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/png,image/jpeg,image/webp"
                                                    onChange={handleCoverUpload}
                                                    disabled={isUploadingCover}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                            Format file didukung: JPG, PNG, atau WebP (Maksimal 8MB).
                                        </p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="text-[11px] text-red-500">{errors.image}</p>
                                )}
                            </div>

                            {/* Section 3: Album Photos Collection (Multi-upload) */}
                            <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                                            <Images className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <span>Foto-Foto Isi Album Dokumentasi ({formData.photos.length} Foto)</span>
                                        </h4>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                            Bisa memuat beberapa foto kegiatan sekaligus atau hanya 1 foto utama saja.
                                        </p>
                                    </div>

                                    {/* Multi-upload Button */}
                                    <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900/60 text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs">
                                        {isUploadingPhotos ? (
                                            <>
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                <span>Mengunggah...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Tambah Foto Sekaligus (Multi)</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            multiple
                                            onChange={handleMultiPhotosUpload}
                                            disabled={isUploadingPhotos}
                                            className="hidden"
                                        />
                                    </label>
                                </div>



                                {/* Reorder Hint */}
                                {formData.photos.length > 1 && (
                                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                                        <GripVertical className="h-3.5 w-3.5 shrink-0" />
                                        <span>Tarik & lepas foto (atau gunakan tombol panah) untuk mengatur urutan. Foto urutan <strong>#1</strong> otomatis menjadi foto sampul utama di kartu depan.</span>
                                    </p>
                                )}

                                {/* Photos Grid in Form */}
                                {formData.photos.length === 0 ? (
                                    <div className="p-6 text-center rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-dashed border-zinc-300 dark:border-zinc-700/80 space-y-1">
                                        <ImageIcon className="h-6 w-6 text-zinc-400 mx-auto" />
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Belum ada foto dalam album. Unggah foto atau gunakan tombol multi-upload di atas.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {formData.photos.map((photoUrl, idx) => {
                                            const isCover = photoUrl === formData.image || idx === 0;
                                            const isDragging = draggedPhotoIdx === idx;
                                            const isOver = dragOverPhotoIdx === idx;

                                            return (
                                                <div
                                                    key={idx}
                                                    draggable={true}
                                                    onDragStart={(e) => handlePhotoDragStart(e, idx)}
                                                    onDragOver={(e) => handlePhotoDragOver(e, idx)}
                                                    onDrop={(e) => handlePhotoDrop(e, idx)}
                                                    onDragEnd={handlePhotoDragEnd}
                                                    className={`group relative aspect-[4/3] rounded-lg overflow-hidden border bg-zinc-950 transition-all cursor-grab active:cursor-grabbing ${
                                                        isCover
                                                            ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                                                            : 'border-zinc-200 dark:border-zinc-700'
                                                    } ${isDragging ? 'opacity-30 border-dashed border-amber-400 scale-95' : ''} ${
                                                        isOver ? 'ring-2 ring-red-500 scale-[1.02]' : ''
                                                    }`}
                                                >
                                                    <img
                                                        src={photoUrl}
                                                        alt={`Foto ${idx + 1}`}
                                                        className="w-full h-full object-cover pointer-events-none select-none"
                                                    />

                                                    {/* Index Tag */}
                                                    <div className="absolute top-1.5 left-1.5 pointer-events-none">
                                                        <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold backdrop-blur-xs ${
                                                            isCover
                                                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                                                : 'bg-black/75 text-white'
                                                        }`}>
                                                            #{idx + 1}
                                                        </span>
                                                    </div>

                                                    {/* Cover Star Badge */}
                                                    {isCover && (
                                                        <div className="absolute top-1.5 right-1.5 pointer-events-none">
                                                            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-zinc-950 font-bold text-[9px] flex items-center gap-1 shadow-xs" title="Foto Sampul Utama">
                                                                <Star className="h-2.5 w-2.5 fill-current" />
                                                                <span>Sampul</span>
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Hover Action Bar with Reorder Arrows, Star, and Delete */}
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-1">
                                                        {/* Move Left Button */}
                                                        {idx > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleMovePhoto(idx, -1);
                                                                }}
                                                                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                                                title="Pindah urutan ke kiri (lebih awal)"
                                                            >
                                                                <ChevronLeft className="h-3 w-3" />
                                                            </button>
                                                        )}

                                                        {/* Star as Cover Button */}
                                                        {!isCover && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleSetAsCover(photoUrl);
                                                                }}
                                                                className="p-1.5 rounded-md bg-amber-400 hover:bg-amber-300 text-zinc-950 text-[10px] font-bold transition-colors cursor-pointer"
                                                                title="Jadikan Foto Sampul Utama (#1)"
                                                            >
                                                                <Star className="h-3 w-3" />
                                                            </button>
                                                        )}

                                                        {/* Move Right Button */}
                                                        {idx < formData.photos.length - 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleMovePhoto(idx, 1);
                                                                }}
                                                                className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                                                title="Pindah urutan ke kanan (lebih akhir)"
                                                            >
                                                                <ChevronRight className="h-3 w-3" />
                                                            </button>
                                                        )}

                                                        {/* Delete Photo Button */}
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemovePhoto(idx);
                                                            }}
                                                            className="p-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold transition-colors cursor-pointer"
                                                            title="Hapus foto dari album"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Section 4: Description */}
                            <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between">
                                    <span>Keterangan & Rincian Album Kegiatan</span>
                                    <span className="text-[10.5px] font-normal text-zinc-400">
                                        {formData.description ? formData.description.length : 0} karakter
                                    </span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Tuliskan catatan, tujuan, atau rangkuman kegiatan yang diabadikan dalam album foto ini..."
                                    className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 leading-relaxed"
                                />
                            </div>

                            {/* Section 5: Visibility */}
                            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                                            Status Publikasi Album
                                        </label>
                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                            {formData.is_published
                                                ? 'Album tampil untuk seluruh pengunjung pada halaman galeri publik.'
                                                : 'Album tersimpan sebagai draf dan disembunyikan dari galeri publik.'}
                                        </p>
                                    </div>
                                    <label className="inline-flex items-center gap-2 cursor-pointer select-none shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_published}
                                            onChange={(e) => handleChange('is_published', e.target.checked)}
                                            className="rounded text-red-600 focus:ring-red-500 h-4 w-4 border-zinc-300 dark:border-zinc-700"
                                        />
                                        <span className="text-xs font-bold">
                                            {formData.is_published ? (
                                                <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                                                    <Eye className="h-3.5 w-3.5" />
                                                    Terbit
                                                </span>
                                            ) : (
                                                <span className="text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1">
                                                    <EyeOff className="h-3.5 w-3.5" />
                                                    Draf
                                                </span>
                                            )}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* 4. Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                        <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xl">
                            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                    Hapus Album Dokumentasi?
                                </h4>
                            </div>

                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah Anda yakin ingin menghapus album dokumentasi{' '}
                                <strong className="text-zinc-900 dark:text-zinc-100">
                                    "{itemToDelete?.title}"
                                </strong>
                                ? Seluruh foto di dalam album ini akan dihapus dari publikasi galeri desa.
                            </p>

                            <div className="flex items-center justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                                >
                                    Ya, Hapus Album
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
