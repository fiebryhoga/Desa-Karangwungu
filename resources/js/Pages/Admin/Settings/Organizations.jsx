import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';
import {
    Save,
    ExternalLink,
    Plus,
    Trash2,
    AlertTriangle,
    Palette,
    Users,
    Landmark,
    HeartHandshake,
    Flame,
    Building2,
    ShieldAlert,
    Home,
    Wheat,
    Fish,
    Phone,
    MapPin,
    Award,
    Scale,
    FileText,
    CheckCircle2,
    X,
    Search,
    Eye,
    Briefcase,
    Target,
    Compass,
    Sparkles,
    Calendar,
    Clock,
    Mail,
    ArrowUp,
    ArrowDown,
    Layers,
    UserCheck,
    ChevronRight,
    Upload,
    Loader2,
} from 'lucide-react';

export default function OrganizationsSettings({ settings = {} }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Parse initial organizations list
    let initialOrganizations = [];
    if (settings.organizations_list_data && Array.isArray(settings.organizations_list_data)) {
        initialOrganizations = settings.organizations_list_data;
    } else if (settings.organizations_list && typeof settings.organizations_list === 'string') {
        try {
            initialOrganizations = JSON.parse(settings.organizations_list);
        } catch (e) {
            initialOrganizations = [];
        }
    }

    const { data, setData, post, processing } = useForm({
        organizations_title: settings.organizations_title || 'Lembaga & Organisasi Kemasyarakatan Desa',
        organizations_subtitle: settings.organizations_subtitle || 'Data lengkap kelembagaan, organisasi, dan lembaga kemasyarakatan Desa Karangwungu',
        organizations_list: initialOrganizations,
    });

    // Active selected organization index
    const [selectedIndex, setSelectedIndex] = useState(data.organizations_list.length > 0 ? 0 : null);
    // Active subtab on the right side
    const [activeTab, setActiveTab] = useState('profile');
    // Search query for left list
    const [searchQuery, setSearchQuery] = useState('');

    // Uploading states
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [uploadingLeaderPhoto, setUploadingLeaderPhoto] = useState(false);

    const handleSubmit = () => {
        post(`/${adminPath}/settings/organizations`, {
            preserveScroll: true,
        });
    };

    // Category options
    const categoryOptions = [
        'BPD',
        'PKK',
        'Karang Taruna',
        'LPM',
        'Satlinmas',
        'RT / RW',
        'Kelompok Tani & Tambak',
        'Lainnya',
    ];

    // Delete Confirmation Modal State
    const [deleteConfirmOrg, setDeleteConfirmOrg] = useState(null);

    // Icon Picker Modal State
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [iconSearch, setIconSearch] = useState('');
    const [iconCategoryFilter, setIconCategoryFilter] = useState('all');

    const iconCategories = ['all', ...Array.from(new Set(Object.values(ICON_REGISTRY).map((i) => i.category)))];
    const iconEntries = Object.entries(ICON_REGISTRY).filter(([key, item]) => {
        const matchesCategory = iconCategoryFilter === 'all' || item.category === iconCategoryFilter;
        const matchesSearch =
            !iconSearch.trim() ||
            key.toLowerCase().includes(iconSearch.toLowerCase()) ||
            (item.label || '').toLowerCase().includes(iconSearch.toLowerCase()) ||
            (item.category || '').toLowerCase().includes(iconSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handlers
    const handleAddOrganization = () => {
        const newOrg = {
            id: `org-${Date.now()}`,
            name: 'Lembaga Baru',
            shortName: '',
            tagline: '',
            category: 'Lainnya',
            icon: 'Users',
            logo: '',
            image: '',
            memberCount: 'Kader Aktif',
            period: '2020 - 2026',
            secretariat: 'Kompleks Balai Desa Karangwungu',
            meeting_schedule: 'Pertemuan Rutin Bulanan',
            email: 'pemdes@karangwungu-lamongan.desa.id',
            description: '',
            vision: '',
            missions: [''],
            objectives: [''],
            duties: [''],
            leader: { name: '', role: '', photo: '' },
            programs: [''],
            structure: [{ role: '', name: '' }],
        };
        const updated = [...data.organizations_list, newOrg];
        setData('organizations_list', updated);
        setSelectedIndex(updated.length - 1);
        setActiveTab('profile');
    };

    // Asynchronous upload handler for custom organization logo
    const handleLogoFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || selectedIndex === null) return;

        setUploadingLogo(true);
        const formData = new FormData();
        formData.append('logo_file', file);
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        try {
            const response = await fetch(`/${adminPath}/settings/organizations/upload-logo`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const resData = await response.json();
            if (response.ok && resData?.url) {
                handleUpdateOrg(selectedIndex, 'logo', resData.url);
            } else {
                throw new Error(resData?.message || 'Gagal mengunggah logo');
            }
        } catch (err) {
            console.error('Error uploading logo:', err);
            alert(`Gagal mengunggah logo: ${err.message || 'Terjadi kesalahan'}`);
        } finally {
            setUploadingLogo(false);
            e.target.value = '';
        }
    };

    // Asynchronous upload handler for custom organization banner photo
    const handleBannerFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || selectedIndex === null) return;

        setUploadingBanner(true);
        const formData = new FormData();
        formData.append('banner_file', file);
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        try {
            const response = await fetch(`/${adminPath}/settings/organizations/upload-banner`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const resData = await response.json();
            if (response.ok && resData?.url) {
                handleUpdateOrg(selectedIndex, 'image', resData.url);
            } else {
                throw new Error(resData?.message || 'Gagal mengunggah foto banner');
            }
        } catch (err) {
            console.error('Error uploading banner:', err);
            alert(`Gagal mengunggah foto banner: ${err.message || 'Terjadi kesalahan'}`);
        } finally {
            setUploadingBanner(false);
            e.target.value = '';
        }
    };

    // Asynchronous upload handler for leader portrait photo
    const handleLeaderPhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || selectedIndex === null) return;

        setUploadingLeaderPhoto(true);
        const formData = new FormData();
        formData.append('leader_photo_file', file);
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        try {
            const response = await fetch(`/${adminPath}/settings/organizations/upload-leader-photo`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: formData,
            });
            const resData = await response.json();
            if (response.ok && resData?.url) {
                handleUpdateLeader(selectedIndex, 'photo', resData.url);
            } else {
                throw new Error(resData?.message || 'Gagal mengunggah foto pimpinan');
            }
        } catch (err) {
            console.error('Error uploading leader photo:', err);
            alert(`Gagal mengunggah foto pimpinan: ${err.message || 'Terjadi kesalahan'}`);
        } finally {
            setUploadingLeaderPhoto(false);
            e.target.value = '';
        }
    };

    const handleUpdateOrg = (index, field, value) => {
        const updated = [...data.organizations_list];
        updated[index] = { ...updated[index], [field]: value };
        setData('organizations_list', updated);
    };

    const handleUpdateLeader = (index, field, value) => {
        const updated = [...data.organizations_list];
        updated[index] = {
            ...updated[index],
            leader: { ...updated[index].leader, [field]: value },
        };
        setData('organizations_list', updated);
    };

    const handleDeleteOrg = (index) => {
        const org = data.organizations_list[index];
        if (!org) return;
        setDeleteConfirmOrg({
            index,
            name: org.name || 'Lembaga Desa',
        });
    };

    const confirmDeleteOrg = () => {
        if (!deleteConfirmOrg) return;
        const { index } = deleteConfirmOrg;
        const updated = data.organizations_list.filter((_, i) => i !== index);
        setData('organizations_list', updated);
        if (selectedIndex === index) {
            setSelectedIndex(updated.length > 0 ? 0 : null);
        } else if (selectedIndex > index) {
            setSelectedIndex(selectedIndex - 1);
        }
        setDeleteConfirmOrg(null);
    };

    const handleMoveOrg = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= data.organizations_list.length) return;
        const updated = [...data.organizations_list];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;
        setData('organizations_list', updated);
        setSelectedIndex(targetIndex);
    };

    // Generic list field handlers (missions, objectives, duties, programs)
    const handleAddListItem = (orgIndex, field, defaultValue = '') => {
        const updated = [...data.organizations_list];
        updated[orgIndex] = {
            ...updated[orgIndex],
            [field]: [...(updated[orgIndex][field] || []), defaultValue],
        };
        setData('organizations_list', updated);
    };

    const handleUpdateListItem = (orgIndex, field, itemIndex, value) => {
        const updated = [...data.organizations_list];
        const items = [...(updated[orgIndex][field] || [])];
        items[itemIndex] = value;
        updated[orgIndex] = { ...updated[orgIndex], [field]: items };
        setData('organizations_list', updated);
    };

    const handleDeleteListItem = (orgIndex, field, itemIndex) => {
        const updated = [...data.organizations_list];
        updated[orgIndex] = {
            ...updated[orgIndex],
            [field]: (updated[orgIndex][field] || []).filter((_, i) => i !== itemIndex),
        };
        setData('organizations_list', updated);
    };

    // Structure handlers
    const handleAddStructure = (orgIndex) => {
        const updated = [...data.organizations_list];
        updated[orgIndex] = {
            ...updated[orgIndex],
            structure: [...(updated[orgIndex].structure || []), { role: '', name: '' }],
        };
        setData('organizations_list', updated);
    };

    const handleUpdateStructure = (orgIndex, structIndex, field, value) => {
        const updated = [...data.organizations_list];
        const structure = [...(updated[orgIndex].structure || [])];
        structure[structIndex] = { ...structure[structIndex], [field]: value };
        updated[orgIndex] = { ...updated[orgIndex], structure };
        setData('organizations_list', updated);
    };

    const handleDeleteStructure = (orgIndex, structIndex) => {
        const updated = [...data.organizations_list];
        updated[orgIndex] = {
            ...updated[orgIndex],
            structure: updated[orgIndex].structure.filter((_, i) => i !== structIndex),
        };
        setData('organizations_list', updated);
    };

    // Filtered list for left side
    const filteredList = data.organizations_list.map((org, index) => ({ ...org, originalIndex: index })).filter((org) => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return (
            (org.name || '').toLowerCase().includes(q) ||
            (org.category || '').toLowerCase().includes(q) ||
            (org.shortName || '').toLowerCase().includes(q)
        );
    });

    const selectedOrg = selectedIndex !== null && data.organizations_list[selectedIndex]
        ? data.organizations_list[selectedIndex]
        : null;

    const SelectedIcon = selectedOrg ? getIconComponent(selectedOrg.icon) : Users;

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* 1. Header Admin */}
                <AdminPageHeader
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Lembaga Desa' },
                    ]}
                    title="Konfigurasi Lembaga & Organisasi Kemasyarakatan"
                    description="Kelola seluruh data kelembagaan desa: profil resmi, lambang logo, pimpinan, visi-misi, tupoksi, dan susunan pengurus."
                    actions={
                        <>
                            <a
                                href="/profil/lembaga"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Publik</span>
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

                {/* 2. LAYOUT SPLIT KANAN - KIRI */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* ======================================================== */}
                    {/* SISI KIRI: DAFTAR LEMBAGA & PENGATURAN GLOBAL (4 COLS)  */}
                    {/* ======================================================== */}
                    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
                        {/* A. Pengaturan Judul Halaman Publik */}
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-3">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <FileText className="h-3.5 w-3.5 text-red-500" />
                                <span>Judul Header Publik</span>
                            </h4>
                            <div className="space-y-2">
                                <div>
                                    <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        value={data.organizations_title}
                                        onChange={(e) => setData('organizations_title', e.target.value)}
                                        className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">
                                        Deskripsi Singkat
                                    </label>
                                    <textarea
                                        value={data.organizations_subtitle}
                                        onChange={(e) => setData('organizations_subtitle', e.target.value)}
                                        rows={2}
                                        className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* B. Master List Lembaga */}
                        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
                            {/* Header Master List */}
                            <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5 text-red-600" />
                                        <span>Daftar Lembaga ({data.organizations_list.length})</span>
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddOrganization}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
                                >
                                    <Plus className="h-3 w-3" />
                                    <span>Tambah</span>
                                </button>
                            </div>

                            {/* Search Filter */}
                            <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari lembaga..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* List of Organizations */}
                            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-[calc(100vh-320px)] overflow-y-auto">
                                {filteredList.length === 0 ? (
                                    <div className="p-6 text-center text-xs text-zinc-400">
                                        Tidak ada lembaga ditemukan.
                                    </div>
                                ) : (
                                    filteredList.map((item) => {
                                        const isSelected = selectedIndex === item.originalIndex;
                                        const ItemIcon = getIconComponent(item.icon);

                                        return (
                                            <div
                                                key={item.id || item.originalIndex}
                                                onClick={() => setSelectedIndex(item.originalIndex)}
                                                className={`group p-3 flex items-center justify-between gap-2.5 cursor-pointer transition-colors ${
                                                    isSelected
                                                        ? 'bg-red-50 dark:bg-red-950/40 border-l-4 border-l-red-600'
                                                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                                                }`}
                                            >
                                                {/* Logo & Info */}
                                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                    {/* Logo box */}
                                                    <div className="h-10 w-10 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                                                        {item.logo ? (
                                                            <img
                                                                src={item.logo}
                                                                alt={item.name}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <ItemIcon className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h4 className={`text-xs font-bold truncate leading-snug ${
                                                            isSelected
                                                                ? 'text-red-700 dark:text-amber-400'
                                                                : 'text-zinc-900 dark:text-zinc-100'
                                                        }`}>
                                                            {item.name || 'Lembaga Baru'}
                                                        </h4>
                                                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                                                            {item.category} • {item.memberCount || 'Kader'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleMoveOrg(item.originalIndex, -1); }}
                                                        disabled={item.originalIndex === 0}
                                                        className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                                                        title="Pindah ke atas"
                                                    >
                                                        <ArrowUp className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleMoveOrg(item.originalIndex, 1); }}
                                                        disabled={item.originalIndex === data.organizations_list.length - 1}
                                                        className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-20 cursor-pointer"
                                                        title="Pindah ke bawah"
                                                    >
                                                        <ArrowDown className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteOrg(item.originalIndex); }}
                                                        className="p-1 rounded text-zinc-400 hover:text-red-500 cursor-pointer"
                                                        title="Hapus lembaga"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </button>
                                                    <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-red-600 dark:text-amber-400' : 'text-zinc-300 dark:text-zinc-600'}`} />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* SISI KANAN: FORM DETAIL EDITOR & LIVE PREVIEW (8 COLS)   */}
                    {/* ======================================================== */}
                    <div className="lg:col-span-8 space-y-4">
                        {selectedOrg ? (
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden space-y-0">
                                {/* Header of Selected Organization */}
                                <div className="p-4 sm:p-5 bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="h-14 w-14 rounded-lg bg-white dark:bg-zinc-900 p-1.5 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0">
                                            {selectedOrg.logo ? (
                                                <img
                                                    src={selectedOrg.logo}
                                                    alt={selectedOrg.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <SelectedIcon className="h-7 w-7 text-amber-500" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-md bg-black/40 text-amber-300 text-[10px] font-bold border border-white/20">
                                                    {selectedOrg.category}
                                                </span>
                                            </div>
                                            <h2 className="text-base sm:text-lg font-black text-white truncate leading-tight mt-0.5">
                                                {selectedOrg.name || 'Lembaga Desa'}
                                            </h2>
                                            <p className="text-xs text-amber-200/90 truncate italic">
                                                "{selectedOrg.tagline || 'Semboyan Lembaga'}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action links */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <a
                                            href={`/profil/lembaga/${selectedOrg.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-colors"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" />
                                            <span>Lihat Halaman</span>
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteOrg(selectedIndex)}
                                            className="p-1.5 rounded-lg bg-black/30 hover:bg-red-900 text-red-300 hover:text-white border border-red-400/30 transition-colors cursor-pointer"
                                            title="Hapus lembaga ini"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Subtabs Navigation Bar */}
                                <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 px-3 flex flex-wrap gap-1 overflow-x-auto">
                                    {[
                                        { id: 'profile', label: 'Profil & Identitas', icon: Landmark },
                                        { id: 'contact', label: 'Pimpinan & Kontak', icon: Phone },
                                        { id: 'vision', label: 'Visi & Misi', icon: Compass },
                                        { id: 'duties', label: 'Tupoksi & Program', icon: Briefcase },
                                        { id: 'structure', label: 'Struktur Pengurus', icon: Users },
                                        { id: 'preview', label: 'Pratinjau Kartu', icon: Eye },
                                    ].map((tab) => {
                                        const TabIcon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`px-3 py-2.5 text-xs font-bold inline-flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                                                    isActive
                                                        ? 'border-red-600 text-red-600 dark:text-amber-400 bg-white dark:bg-zinc-900'
                                                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-red-600 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                                                }`}
                                            >
                                                <TabIcon className="h-3.5 w-3.5" />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Form Content based on Active Tab */}
                                <div className="p-5 sm:p-6 space-y-5">
                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 1: PROFIL & IDENTITAS                           */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'profile' && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Nama Lengkap Lembaga *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.name}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'name', e.target.value)}
                                                        placeholder="Badan Permusyawaratan Desa (BPD)"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Singkatan / Short Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.shortName || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'shortName', e.target.value)}
                                                        placeholder="BPD"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Kategori Lembaga
                                                    </label>
                                                    <select
                                                        value={selectedOrg.category}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'category', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    >
                                                        {categoryOptions.map((cat) => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Semboyan / Tagline
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.tagline || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'tagline', e.target.value)}
                                                        placeholder="Lembaga Legislasi, Permusyawaratan & Pengawasan Penyelenggaraan Pemerintahan Desa"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>


                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Jumlah Anggota / Kader
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.memberCount || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'memberCount', e.target.value)}
                                                        placeholder="5 Anggota Terpilih"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Ikon Lembaga
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowIconPicker(true)}
                                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all text-left group cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0">
                                                            <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-amber-400 border border-red-200 dark:border-red-900/50 shrink-0">
                                                                <SelectedIcon className="h-4 w-4" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block truncate">
                                                                    {ICON_REGISTRY[selectedOrg.icon]?.label?.split('/')[0]?.trim() || selectedOrg.icon || 'Pilih Ikon'}
                                                                </span>
                                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono block truncate">
                                                                    {selectedOrg.icon || 'Users'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-amber-400 shrink-0 group-hover:underline">
                                                            <Palette className="h-3.5 w-3.5" />
                                                            <span>Pilih Ikon</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Media & Lambang Lembaga (Upload Langsung Gambar) */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-5">
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                                                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                                                    <span>Media & Lambang Resmi Lembaga</span>
                                                </h4>

                                                {/* Upload Gambar Logo Resmi */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Logo / Lambang Resmi
                                                        </label>
                                                        <span className="text-[11px] text-zinc-400">
                                                            Format: SVG, PNG, JPG, WebP (Maks 3MB)
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
                                                        {/* Logo Box Preview */}
                                                        <div className="h-20 w-20 rounded-lg bg-white dark:bg-zinc-800 border-2 border-amber-400 p-2 flex items-center justify-center shrink-0 shadow-sm">
                                                            {selectedOrg.logo ? (
                                                                <img
                                                                    src={selectedOrg.logo}
                                                                    alt="Logo"
                                                                    className="w-full h-full object-contain filter drop-shadow-sm"
                                                                />
                                                            ) : (
                                                                <SelectedIcon className="h-8 w-8 text-zinc-400" />
                                                            )}
                                                        </div>

                                                        {/* Upload & Delete Actions */}
                                                        <div className="flex-1 space-y-1.5">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                                                                    uploadingLogo
                                                                        ? 'bg-zinc-400 text-white cursor-not-allowed'
                                                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                                                }`}>
                                                                    {uploadingLogo ? (
                                                                        <>
                                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                                            <span>Mengunggah Logo...</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Upload className="h-4 w-4" />
                                                                            <span>{selectedOrg.logo ? 'Ganti Logo' : 'Unggah Gambar Logo'}</span>
                                                                        </>
                                                                    )}
                                                                    <input
                                                                        type="file"
                                                                        accept=".svg,.png,.jpg,.jpeg,.webp,.gif"
                                                                        onChange={handleLogoFileUpload}
                                                                        disabled={uploadingLogo}
                                                                        className="hidden"
                                                                    />
                                                                </label>

                                                                {selectedOrg.logo && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUpdateOrg(selectedIndex, 'logo', '')}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-red-100 hover:text-red-700 dark:bg-zinc-800 dark:hover:bg-red-950/60 dark:hover:text-red-300 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                                        <span>Hapus Logo</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                                Pilih berkas gambar logo dari perangkat Anda. Disarankan gambar berlatar transparan (PNG atau SVG).
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Upload Foto Sampul / Banner */}
                                                <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                                            Foto Sampul / Banner Lembaga
                                                        </label>
                                                        <span className="text-[11px] text-zinc-400">
                                                            Format: JPG, PNG, WebP (Maks 5MB)
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
                                                        {/* Banner Box Preview */}
                                                        <div className="h-20 w-32 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-300 dark:border-zinc-700 shadow-sm">
                                                            {selectedOrg.image ? (
                                                                <img
                                                                    src={selectedOrg.image}
                                                                    alt="Banner"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500">
                                                                    Belum Ada Foto
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Upload & Delete Actions */}
                                                        <div className="flex-1 space-y-1.5">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                                                                    uploadingBanner
                                                                        ? 'bg-zinc-400 text-white cursor-not-allowed'
                                                                        : 'bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600'
                                                                }`}>
                                                                    {uploadingBanner ? (
                                                                        <>
                                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                                            <span>Mengunggah Foto...</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Upload className="h-4 w-4" />
                                                                            <span>{selectedOrg.image ? 'Ganti Foto Banner' : 'Unggah Foto Banner'}</span>
                                                                        </>
                                                                    )}
                                                                    <input
                                                                        type="file"
                                                                        accept=".png,.jpg,.jpeg,.webp"
                                                                        onChange={handleBannerFileUpload}
                                                                        disabled={uploadingBanner}
                                                                        className="hidden"
                                                                    />
                                                                </label>

                                                                {selectedOrg.image && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUpdateOrg(selectedIndex, 'image', '')}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-red-100 hover:text-red-700 dark:bg-zinc-800 dark:hover:bg-red-950/60 dark:hover:text-red-300 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                                        <span>Hapus Foto</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                                Foto lanskap untuk latar header kartu dan halaman rincian lembaga desa.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Deskripsi Lengkap */}
                                            <div>
                                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Deskripsi Lembaga
                                                </label>
                                                <textarea
                                                    value={selectedOrg.description || ''}
                                                    onChange={(e) => handleUpdateOrg(selectedIndex, 'description', e.target.value)}
                                                    rows={4}
                                                    placeholder="Deskripsi peran, kedudukan, dan fungsi lembaga di Desa Karangwungu..."
                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 leading-relaxed"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 2: PIMPINAN & KONTAK                            */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'contact' && (
                                        <div className="space-y-4">
                                            {/* Pimpinan Box */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-4">
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                    <UserCheck className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Data Ketua / Pimpinan Lembaga</span>
                                                </h4>

                                                {/* Upload Foto Pimpinan & Preview */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 rounded-lg bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-700">
                                                    {/* Foto Portrait Box Preview */}
                                                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-red-950 border-2 border-amber-400 p-0.5 flex items-center justify-center shrink-0 shadow-sm">
                                                        {selectedOrg.leader?.photo ? (
                                                            <img
                                                                src={selectedOrg.leader.photo}
                                                                alt={selectedOrg.leader?.name || 'Pimpinan'}
                                                                className="w-full h-full object-cover rounded-[6px]"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-red-950 text-amber-300 font-extrabold text-xl tracking-wider select-none">
                                                                {(selectedOrg.leader?.name || 'PL').split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Upload / Delete Actions */}
                                                    <div className="flex-1 space-y-1.5">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer ${
                                                                uploadingLeaderPhoto
                                                                    ? 'bg-zinc-400 text-white cursor-not-allowed'
                                                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                                            }`}>
                                                                {uploadingLeaderPhoto ? (
                                                                    <>
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                        <span>Mengunggah Foto...</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Upload className="h-4 w-4" />
                                                                        <span>{selectedOrg.leader?.photo ? 'Ganti Foto Pimpinan' : 'Unggah Foto Pimpinan'}</span>
                                                                    </>
                                                                )}
                                                                <input
                                                                    type="file"
                                                                    accept=".png,.jpg,.jpeg,.webp"
                                                                    onChange={handleLeaderPhotoUpload}
                                                                    disabled={uploadingLeaderPhoto}
                                                                    className="hidden"
                                                                />
                                                            </label>

                                                            {selectedOrg.leader?.photo && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleUpdateLeader(selectedIndex, 'photo', '')}
                                                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-red-100 hover:text-red-700 dark:bg-zinc-800 dark:hover:bg-red-950/60 dark:hover:text-red-300 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                                                    <span>Hapus Foto (Gunakan Inisial)</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                            Format: JPG, PNG, WebP (Maks 5MB). Jika dikosongkan, kartu pimpinan otomatis menampilkan inisial nama.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Nama Lengkap Pimpinan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={selectedOrg.leader?.name || ''}
                                                            onChange={(e) => handleUpdateLeader(selectedIndex, 'name', e.target.value)}
                                                            placeholder="ALI NASIHIN, SH"
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Jabatan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={selectedOrg.leader?.role || ''}
                                                            onChange={(e) => handleUpdateLeader(selectedIndex, 'role', e.target.value)}
                                                            placeholder="Ketua BPD"
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sekretariat & Jadwal */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Masa Bakti / Periode
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.period || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'period', e.target.value)}
                                                        placeholder="2020 - 2026"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Email Resmi Lembaga
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.email || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'email', e.target.value)}
                                                        placeholder="bpd@karangwungu-lamongan.desa.id"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Jadwal Koordinasi Rutin
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={selectedOrg.meeting_schedule || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'meeting_schedule', e.target.value)}
                                                        placeholder="Malam Kamis Legi (Rapat Rutin) & Sidang Paripurna Triwulan"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Alamat Sekretariat Lengkap
                                                    </label>
                                                    <textarea
                                                        value={selectedOrg.secretariat || ''}
                                                        onChange={(e) => handleUpdateOrg(selectedIndex, 'secretariat', e.target.value)}
                                                        rows={2}
                                                        placeholder="Ruang BPD, Lantai 1 Sayap Timur Balai Desa Karangwungu, Kec. Karanggeneng, Kab. Lamongan"
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 3: VISI, MISI & TUJUAN                          */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'vision' && (
                                        <div className="space-y-5">
                                            {/* Visi */}
                                            <div>
                                                <label className="block text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                    <Compass className="h-3.5 w-3.5 text-red-500" />
                                                    <span>Visi Utama Lembaga</span>
                                                </label>
                                                <textarea
                                                    value={selectedOrg.vision || ''}
                                                    onChange={(e) => handleUpdateOrg(selectedIndex, 'vision', e.target.value)}
                                                    rows={3}
                                                    placeholder="Pernyataan visi cita-cita kelembagaan..."
                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 leading-relaxed italic"
                                                />
                                            </div>

                                            {/* Misi List */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                        <Target className="h-3.5 w-3.5 text-red-500" />
                                                        <span>Misi Strategis ({(selectedOrg.missions || []).length})</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddListItem(selectedIndex, 'missions')}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span>Tambah Misi</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    {(selectedOrg.missions || []).map((misi, mIdx) => (
                                                        <div key={mIdx} className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-red-700 dark:text-amber-400 w-5 shrink-0 text-center">
                                                                {mIdx + 1}.
                                                            </span>
                                                            <input
                                                                type="text"
                                                                value={misi}
                                                                onChange={(e) => handleUpdateListItem(selectedIndex, 'missions', mIdx, e.target.value)}
                                                                placeholder="Uraian misi operasional..."
                                                                className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteListItem(selectedIndex, 'missions', mIdx)}
                                                                className="p-1.5 rounded text-zinc-400 hover:text-red-500 cursor-pointer"
                                                            >
                                                                <X className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tujuan List */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                                        <span>Tujuan Pokok ({(selectedOrg.objectives || []).length})</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddListItem(selectedIndex, 'objectives')}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span>Tambah Tujuan</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    {(selectedOrg.objectives || []).map((tujuan, tIdx) => (
                                                        <div key={tIdx} className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-emerald-600 w-5 shrink-0 text-center">
                                                                ✓
                                                            </span>
                                                            <input
                                                                type="text"
                                                                value={tujuan}
                                                                onChange={(e) => handleUpdateListItem(selectedIndex, 'objectives', tIdx, e.target.value)}
                                                                placeholder="Sasaran tujuan capaian lembaga..."
                                                                className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteListItem(selectedIndex, 'objectives', tIdx)}
                                                                className="p-1.5 rounded text-zinc-400 hover:text-red-500 cursor-pointer"
                                                            >
                                                                <X className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 4: TUPOKSI & PROGRAM KERJA                      */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'duties' && (
                                        <div className="space-y-5">
                                            {/* Tugas Pokok & Fungsi (Tupoksi) */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                        <Briefcase className="h-3.5 w-3.5 text-amber-500" />
                                                        <span>Tugas Pokok & Fungsi / Mandat ({(selectedOrg.duties || []).length})</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddListItem(selectedIndex, 'duties')}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span>Tambah Tupoksi</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    {(selectedOrg.duties || []).map((duty, dIdx) => (
                                                        <div key={dIdx} className="flex items-center gap-2">
                                                            <span className="text-xs font-bold text-amber-600 w-5 shrink-0 text-center">
                                                                {dIdx + 1}.
                                                            </span>
                                                            <input
                                                                type="text"
                                                                value={duty}
                                                                onChange={(e) => handleUpdateListItem(selectedIndex, 'duties', dIdx, e.target.value)}
                                                                placeholder="Uraian wewenang atau tugas pokok..."
                                                                className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteListItem(selectedIndex, 'duties', dIdx)}
                                                                className="p-1.5 rounded text-zinc-400 hover:text-red-500 cursor-pointer"
                                                            >
                                                                <X className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Program Kerja */}
                                            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                        <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                                                        <span>Program Kerja & Agenda Prioritas ({(selectedOrg.programs || []).length})</span>
                                                    </label>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddListItem(selectedIndex, 'programs')}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span>Tambah Program</span>
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    {(selectedOrg.programs || []).map((prog, pIdx) => {
                                                        const progText = typeof prog === 'string' ? prog : (prog?.title || '');
                                                        return (
                                                            <div key={pIdx} className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-emerald-600 w-5 shrink-0 text-center">
                                                                    {pIdx + 1}.
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    value={progText}
                                                                    onChange={(e) => handleUpdateListItem(selectedIndex, 'programs', pIdx, e.target.value)}
                                                                    placeholder="Agenda kegiatan atau program prioritas..."
                                                                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteListItem(selectedIndex, 'programs', pIdx)}
                                                                    className="p-1.5 rounded text-zinc-400 hover:text-red-500 cursor-pointer"
                                                                >
                                                                    <X className="h-3.5 w-3.5" />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 5: STRUKTUR PENGURUS                            */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'structure' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                                    <Users className="h-3.5 w-3.5 text-blue-500" />
                                                    <span>Aparatur & Struktur Pengurus ({(selectedOrg.structure || []).length})</span>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddStructure(selectedIndex)}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    <span>Tambah Pengurus</span>
                                                </button>
                                            </div>

                                            <div className="space-y-2.5">
                                                {(selectedOrg.structure || []).map((member, sIdx) => (
                                                    <div
                                                        key={sIdx}
                                                        className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700"
                                                    >
                                                        <span className="text-xs font-bold text-zinc-400 w-6 text-center shrink-0">
                                                            #{sIdx + 1}
                                                        </span>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                                                            <input
                                                                type="text"
                                                                value={member.role || ''}
                                                                onChange={(e) => handleUpdateStructure(selectedIndex, sIdx, 'role', e.target.value)}
                                                                placeholder="Jabatan (cth: Wakil Ketua, Sekretaris)"
                                                                className="px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 font-semibold"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={member.name || ''}
                                                                onChange={(e) => handleUpdateStructure(selectedIndex, sIdx, 'name', e.target.value)}
                                                                placeholder="Nama Lengkap Pengurus"
                                                                className="px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 font-bold"
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteStructure(selectedIndex, sIdx)}
                                                            className="p-1.5 rounded text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer shrink-0"
                                                            title="Hapus pengurus"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* ---------------------------------------------------- */}
                                    {/* TAB 6: PRATINJAU KARTU (LIVE PREVIEW)               */}
                                    {/* ---------------------------------------------------- */}
                                    {activeTab === 'preview' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                                    Pratinjau Kartu di Halaman Katalog Publik
                                                </h4>
                                                <span className="text-[11px] text-zinc-400">
                                                    Tampilan dinamis real-time
                                                </span>
                                            </div>

                                            {/* Preview Card */}
                                            <div className="max-w-md mx-auto">
                                                <div className="rounded-lg overflow-hidden bg-gradient-to-b from-red-800 via-red-900 to-[#2c0508] text-white shadow-xl border border-red-500/40">
                                                    {/* Banner with Badges */}
                                                    <div className="h-36 w-full overflow-hidden bg-zinc-950 relative">
                                                        <img
                                                            src={selectedOrg.image || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'}
                                                            alt={selectedOrg.name}
                                                            className="w-full h-full object-cover opacity-60"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/40 to-transparent" />
                                                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                                            <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5">
                                                                <SelectedIcon className="h-3.5 w-3.5" />
                                                                <span>{selectedOrg.category}</span>
                                                            </span>
                                                            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                                                                {selectedOrg.memberCount || '5 Anggota'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Overlapping Large Logo */}
                                                    <div className="px-4 -mt-10 relative z-10 flex items-end justify-between">
                                                        <div className="h-20 w-20 rounded-lg bg-white dark:bg-zinc-900 p-2 border-2 border-amber-400 shadow-2xl flex items-center justify-center shrink-0 ring-4 ring-red-950/60">
                                                            {selectedOrg.logo ? (
                                                                <img
                                                                    src={selectedOrg.logo}
                                                                    alt={selectedOrg.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <SelectedIcon className="h-8 w-8 text-red-600" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Title & Tagline */}
                                                    <div className="px-4 pt-3 space-y-1">
                                                        <h3 className="text-base font-black text-white leading-snug">
                                                            {selectedOrg.name}
                                                        </h3>
                                                        <p className="text-xs text-amber-300 font-medium italic line-clamp-1">
                                                            "{selectedOrg.tagline}"
                                                        </p>
                                                    </div>

                                                    {/* Pimpinan Box */}
                                                    <div className="p-4 pt-3 space-y-3">
                                                        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/35 border border-white/10">
                                                            <div className="h-9 w-9 rounded-lg overflow-hidden bg-red-950 border border-amber-400/50 shrink-0 flex items-center justify-center text-amber-300 font-bold text-xs">
                                                                {selectedOrg.leader?.photo ? (
                                                                    <img
                                                                        src={selectedOrg.leader.photo}
                                                                        alt={selectedOrg.leader?.name || 'Pimpinan'}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    (selectedOrg.leader?.name || 'P').slice(0, 2).toUpperCase()
                                                                )}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <span className="text-[9.5px] text-amber-300 font-bold uppercase tracking-wider block">
                                                                    {selectedOrg.leader?.role || 'Ketua'}
                                                                </span>
                                                                <h4 className="text-xs font-bold text-white truncate">
                                                                    {selectedOrg.leader?.name || 'Belum diatur'}
                                                                </h4>
                                                            </div>
                                                        </div>

                                                        <p className="text-xs text-red-100/85 line-clamp-2 leading-relaxed">
                                                            {selectedOrg.description || 'Deskripsi peran dan tugas lembaga...'}
                                                        </p>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="p-4 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs">
                                                        <span className="text-[10px] text-red-200/70">
                                                            {selectedOrg.period || '2020 - 2026'}
                                                        </span>
                                                        <span className="px-3 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold">
                                                            Detail Lembaga →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center space-y-3">
                                <Users className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto" />
                                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                    Pilih Lembaga di Kolom Kiri
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                                    Pilih salah satu lembaga dari daftar di sebelah kiri untuk membuka form editor lengkap atau klik tombol "Tambah" untuk membuat lembaga baru.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ==================================================== */}
            {/* MODAL PILIH IKON CUSTOM                             */}
            {/* ==================================================== */}
            {showIconPicker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Header Modal */}
                        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Pilih Ikon untuk {selectedOrg?.name || 'Lembaga Desa'}</span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Pilih ikon visual dari katalog referensi resmi kelembagaan desa.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowIconPicker(false)}
                                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Search & Kategori Filter */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={iconSearch}
                                    onChange={(e) => setIconSearch(e.target.value)}
                                    placeholder="Cari ikon (misal: landmark, pemuda, keamanan, pertanian, warga, perikanan...)"
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20"
                                    autoFocus
                                />
                            </div>

                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
                                {iconCategories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setIconCategoryFilter(cat)}
                                        className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                                            iconCategoryFilter === cat
                                                ? 'bg-red-600 text-white font-bold'
                                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                        }`}
                                    >
                                        {cat === 'all' ? 'Semua Kategori' : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid Ikon */}
                        <div className="p-4 overflow-y-auto max-h-[50vh]">
                            {iconEntries.length === 0 ? (
                                <div className="p-8 text-center text-xs text-zinc-400">
                                    Tidak ditemukan ikon yang cocok dengan pencarian "{iconSearch}".
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {iconEntries.map(([iconKey, item]) => {
                                        const Comp = item.icon;
                                        const isCurrent = selectedOrg?.icon === iconKey;

                                        return (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                onClick={() => {
                                                    handleUpdateOrg(selectedIndex, 'icon', iconKey);
                                                    setShowIconPicker(false);
                                                }}
                                                className={`p-3 rounded-xl border text-left flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                                                    isCurrent
                                                        ? 'bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500 shadow-xs ring-2 ring-red-500/40'
                                                        : 'bg-zinc-50/60 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-white dark:hover:bg-zinc-800'
                                                }`}
                                            >
                                                <div
                                                    className={`p-2.5 rounded-lg transition-transform group-hover:scale-110 ${
                                                        isCurrent
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-zinc-100 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 group-hover:text-red-600 dark:group-hover:text-amber-400'
                                                    }`}
                                                >
                                                    <Comp className="h-5 w-5" />
                                                </div>
                                                <div className="text-center w-full min-w-0">
                                                    <div className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                                                        {item.label.split('/')[0].trim()}
                                                    </div>
                                                    <div className="text-[9px] text-zinc-400 font-mono truncate mt-0.5">
                                                        {iconKey}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer Modal */}
                        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end bg-zinc-50/50 dark:bg-zinc-900/50">
                            <button
                                type="button"
                                onClick={() => setShowIconPicker(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* ==================================================== */}
            {/* MODAL KONFIRMASI HAPUS LEMBAGA                      */}
            {/* ==================================================== */}
            {deleteConfirmOrg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 shrink-0">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                    Hapus Lembaga Desa?
                                </h3>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                                    Apakah Anda yakin ingin menghapus <span className="font-bold text-zinc-900 dark:text-zinc-100">"{deleteConfirmOrg.name}"</span>?
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDeleteConfirmOrg(null)}
                                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                            Data lembaga ini akan dihapus dari daftar konfigurasi. Perubahan akan disimpan secara permanen saat Anda menekan tombol <strong>"Simpan Semua Pengaturan"</strong>.
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setDeleteConfirmOrg(null)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={confirmDeleteOrg}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/30 transition-all cursor-pointer"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Ya, Hapus Lembaga</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
