import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Users,
    Award,
    Sparkles,
    Save,
    ExternalLink,
    Info,
    Plus,
    Trash2,
    Search,
    X,
    Briefcase,
    Building2,
    Landmark,
    ChevronDown,
    ChevronUp,
    User,
    Phone,
    Scale,
    Layers,
    ArrowLeft,
    ArrowRight,
    FileText,
    Image,
    Edit3,
    CheckCircle2,
    SlidersHorizontal,
    Upload,
} from 'lucide-react';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';

export default function OfficialsSettings({ settings = {} }) {
    // 2 Tab Utama: 'struktur' (Card Grid) dan 'wewenang' (Tupoksi Cards)
    const [activeTab, setActiveTab] = useState('struktur');
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Parse existing lists
    let initialOfficialsList = [];
    if (settings.officials_list_data && Array.isArray(settings.officials_list_data)) {
        initialOfficialsList = settings.officials_list_data;
    } else if (settings.officials_list && typeof settings.officials_list === 'string') {
        try {
            initialOfficialsList = JSON.parse(settings.officials_list);
        } catch (e) {
            initialOfficialsList = [];
        }
    }

    let initialKadesTasks = [];
    if (settings.kades_tasks_data && Array.isArray(settings.kades_tasks_data)) {
        initialKadesTasks = settings.kades_tasks_data;
    } else if (settings.kades_tasks && typeof settings.kades_tasks === 'string') {
        try {
            initialKadesTasks = JSON.parse(settings.kades_tasks);
        } catch (e) {
            initialKadesTasks = [];
        }
    }

    let initialBpdTasks = [];
    if (settings.bpd_tasks_data && Array.isArray(settings.bpd_tasks_data)) {
        initialBpdTasks = settings.bpd_tasks_data;
    } else if (settings.bpd_tasks && typeof settings.bpd_tasks === 'string') {
        try {
            initialBpdTasks = JSON.parse(settings.bpd_tasks);
        } catch (e) {
            initialBpdTasks = [];
        }
    }

    const { data, setData, post, processing } = useForm({
        sotk_title:
            settings.sotk_title ||
            'Bagan Struktur Organisasi & Tata Kerja (SOTK) Pemerintah Desa Karangwungu',
        sotk_subtitle:
            settings.sotk_subtitle ||
            'Berdasarkan Permendagri No. 84 Tahun 2015 tentang Susunan Organisasi dan Tata Kerja Pemerintah Desa',

        // 1. Kepala Desa
        kades_name: settings.kades_name || 'H. SUNARTO',
        kades_position: settings.kades_position || 'Kepala Desa',
        kades_nip: settings.kades_nip || '19750812 200501 1 003',
        kades_phone: settings.kades_phone || '0812-3344-5566',
        kades_photo: settings.kades_photo || '',
        kades_photo_file: null,
        kades_category: settings.kades_category || 'Pimpinan Eksekutif',
        kades_role_desc:
            settings.kades_role_desc ||
            'Pimpinan penyelenggaraan pemerintahan, pembangunan, pembinaan, dan pemberdayaan masyarakat desa.',
        kades_basis: settings.kades_basis || 'UU No. 6/2014 & Permendagri No. 84/2015',
        kades_summary:
            settings.kades_summary ||
            'Pimpinan tertinggi pemerintah desa yang bertugas menyelenggarakan Pemerintahan Desa, melaksanakan Pembangunan, Pembinaan Kemasyarakatan, dan Pemberdayaan Masyarakat.',
        kades_tasks: initialKadesTasks,
        kades_authorities:
            settings.kades_authorities ||
            'Menetapkan kebijakan desa, mengelola keuangan & aset desa, serta mengangkat dan memberhentikan perangkat desa.',

        // 2. Ketua BPD
        bpd_name: settings.bpd_name || 'ALI NASIHIN, SH',
        bpd_position: settings.bpd_position || 'Ketua BPD',
        bpd_nip: settings.bpd_nip || '',
        bpd_phone: settings.bpd_phone || '0813-4455-6677',
        bpd_photo: settings.bpd_photo || '',
        bpd_photo_file: null,
        bpd_category: settings.bpd_category || 'Badan Permusyawaratan Desa',
        bpd_role_desc:
            settings.bpd_role_desc ||
            'Mitra kerja strategis pemerintah desa dalam pengawasan, legislasi peraturan desa, dan penampung aspirasi warga.',
        bpd_basis: settings.bpd_basis || 'Permendagri No. 110/2016',
        bpd_summary:
            settings.bpd_summary ||
            'Lembaga perwakilan permusyawaratan warga desa yang berkedudukan sebagai mitra kerja sejajar Pemerintah Desa dalam fungsi legislasi dan pengawasan.',
        bpd_tasks: initialBpdTasks,
        bpd_authorities:
            settings.bpd_authorities ||
            'Mengawasi pelaksanaan peraturan desa & APBDes, serta meminta keterangan penyelenggaraan pemerintahan desa.',

        // 3. Jajaran Perangkat, Kasun & Lembaga Desa
        officials_list: initialOfficialsList,
        official_photo_files: {},
    });

    // Helper avatar
    const avatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Aparatur')}&background=7f1d1d&color=fcd34d&size=256&bold=true&font-size=0.35`;

    // Local instant previews for uploaded files
    const [localPreviews, setLocalPreviews] = useState({});

    // Modal Edit State: null | 'kades' | 'bpd' | number (index)
    const [editingTarget, setEditingTarget] = useState(null);

    // State for Icon Picker Modal
    const [iconPickerTarget, setIconPickerTarget] = useState(null);
    const [iconSearch, setIconSearch] = useState('');
    const [iconCategoryFilter, setIconCategoryFilter] = useState('all');

    // Search filters
    const [searchStruktur, setSearchStruktur] = useState('');
    const [searchWewenang, setSearchWewenang] = useState('');
    const [expandedWewenang, setExpandedWewenang] = useState(new Set(['kades', 'bpd', 0]));
    const [showBannerConfig, setShowBannerConfig] = useState(false);

    // Photo change handlers with instant local preview
    const handleKadesFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('kades_photo_file', file);
            const objUrl = URL.createObjectURL(file);
            setLocalPreviews((prev) => ({ ...prev, kades: objUrl }));
        }
    };

    const handleKadesUrlChange = (val) => {
        setData('kades_photo', val);
        setLocalPreviews((prev) => {
            const next = { ...prev };
            delete next.kades;
            return next;
        });
    };

    const handleBpdFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('bpd_photo_file', file);
            const objUrl = URL.createObjectURL(file);
            setLocalPreviews((prev) => ({ ...prev, bpd: objUrl }));
        }
    };

    const handleBpdUrlChange = (val) => {
        setData('bpd_photo', val);
        setLocalPreviews((prev) => {
            const next = { ...prev };
            delete next.bpd;
            return next;
        });
    };

    const handleOfficialFileChange = (idx, e) => {
        const file = e.target.files?.[0];
        if (file) {
            const updatedFiles = { ...(data.official_photo_files || {}) };
            updatedFiles[idx] = file;
            setData('official_photo_files', updatedFiles);
            const objUrl = URL.createObjectURL(file);
            setLocalPreviews((prev) => ({ ...prev, [idx]: objUrl }));
        }
    };

    const handleOfficialUrlChange = (idx, val) => {
        handleUpdateOfficial(idx, 'photo', val);
        setLocalPreviews((prev) => {
            const next = { ...prev };
            delete next[idx];
            return next;
        });
    };

    // Modular photo preview and input field
    const renderPhotoField = ({ title, photoUrl, onUrlChange, onFileChange, targetKey, personName }) => {
        const previewSrc = localPreviews[targetKey] || photoUrl || avatarUrl(personName);

        return (
            <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Image className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{title}</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800">
                    {/* Visual Photo Preview Thumbnail */}
                    <div className="relative h-28 w-24 sm:h-32 sm:w-28 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-300 dark:border-zinc-700 shadow-inner group">
                        <img
                            src={previewSrc}
                            alt="Pratinjau Foto"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src = avatarUrl(personName);
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-1.5 left-1.5 right-1.5 text-center text-[9px] font-bold bg-black/70 backdrop-blur-xs text-white rounded px-1 py-0.5 border border-white/20 truncate">
                            Pratinjau Foto
                        </span>
                    </div>

                    {/* Inputs */}
                    <div className="flex-1 w-full space-y-2.5">
                        <div>
                            <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                                URL Berkas Foto (Web / Cloud / Storage)
                            </span>
                            <input
                                type="text"
                                value={photoUrl || ''}
                                onChange={(e) => onUrlChange(e.target.value)}
                                placeholder="https://... atau /uploads/officials/..."
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                            />
                        </div>

                        <div>
                            <span className="block text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                                Atau Pilih Berkas Foto Baru dari Komputer / HP
                            </span>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 cursor-pointer transition-all shadow-2xs">
                                    <Upload className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                    <span>Pilih Berkas Foto</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onFileChange}
                                        className="hidden"
                                    />
                                </label>

                                {localPreviews[targetKey] ? (
                                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Berkas Baru Terpilih</span>
                                    </span>
                                ) : (
                                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                        Belum ada berkas baru
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const toggleExpandWewenang = (key) => {
        setExpandedWewenang((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const expandAllWewenang = () => {
        setExpandedWewenang(new Set(['kades', 'bpd', ...data.officials_list.map((_, i) => i)]));
    };

    const collapseAllWewenang = () => {
        setExpandedWewenang(new Set());
    };

    const handleMoveOfficial = (index, direction, e) => {
        if (e) e.stopPropagation();
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= data.officials_list.length) return;
        const updated = [...data.officials_list];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;
        setData('officials_list', updated);
    };

    const openIconPicker = (index, e) => {
        if (e) e.stopPropagation();
        setIconPickerTarget(index);
        setIconSearch('');
        setIconCategoryFilter('all');
    };

    const handleSelectIcon = (iconKey) => {
        if (iconPickerTarget !== null) {
            const updated = [...data.officials_list];
            if (updated[iconPickerTarget]) {
                updated[iconPickerTarget].icon = iconKey;
                setData('officials_list', updated);
            }
        }
        setIconPickerTarget(null);
    };

    // Add official
    const handleAddOfficial = () => {
        const newOfficial = {
            id: 'off-' + Date.now(),
            name: '',
            position: 'Jabatan Baru',
            nip: '',
            phone: '',
            category: 'Sekretariat Desa',
            photo: '',
            icon: 'Briefcase',
            order: data.officials_list.length + 1,
            role_desc: 'Koordinator urusan dan pelayanan administrasi masyarakat desa.',
            basis: 'Permendagri No. 84/2015',
            summary: 'Membantu tugas pemerintah desa sesuai urusan bidangnya.',
            tasks: ['Melaksanakan tugas operasional sesuai bidang tugas dan arahan pimpinan.'],
            authorities: 'Menyelenggarakan urusan kedinasan dan pelayanan masyarakat sesuai bidangnya.',
        };
        const nextList = [...data.officials_list, newOfficial];
        setData('officials_list', nextList);
        setEditingTarget(nextList.length - 1);
    };

    const handleUpdateOfficial = (index, field, value) => {
        const updated = [...data.officials_list];
        updated[index][field] = value;
        setData('officials_list', updated);
    };

    const handleDeleteOfficial = (index, e) => {
        if (e) e.stopPropagation();
        if (confirm('Apakah Anda yakin ingin menghapus kartu perangkat desa ini?')) {
            const updated = data.officials_list.filter((_, i) => i !== index);
            setData('officials_list', updated);
            if (editingTarget === index) setEditingTarget(null);
        }
    };

    // Task point handlers
    const handleAddTaskPoint = (target) => {
        if (target === 'kades') {
            setData('kades_tasks', [...data.kades_tasks, 'Tugas pokok baru Kepala Desa...']);
        } else if (target === 'bpd') {
            setData('bpd_tasks', [...data.bpd_tasks, 'Tugas pokok baru BPD...']);
        }
    };

    const handleUpdateTaskPoint = (target, index, value) => {
        if (target === 'kades') {
            const updated = [...data.kades_tasks];
            updated[index] = value;
            setData('kades_tasks', updated);
        } else if (target === 'bpd') {
            const updated = [...data.bpd_tasks];
            updated[index] = value;
            setData('bpd_tasks', updated);
        }
    };

    const handleDeleteTaskPoint = (target, index) => {
        if (target === 'kades') {
            setData('kades_tasks', data.kades_tasks.filter((_, i) => i !== index));
        } else if (target === 'bpd') {
            setData('bpd_tasks', data.bpd_tasks.filter((_, i) => i !== index));
        }
    };

    const handleAddOfficialTask = (officialIndex) => {
        const updated = [...data.officials_list];
        const currentTasks = Array.isArray(updated[officialIndex].tasks) ? updated[officialIndex].tasks : [];
        updated[officialIndex].tasks = [...currentTasks, 'Poin tugas pokok baru...'];
        setData('officials_list', updated);
    };

    const handleUpdateOfficialTask = (officialIndex, taskIndex, value) => {
        const updated = [...data.officials_list];
        const currentTasks = [...(updated[officialIndex].tasks || [])];
        currentTasks[taskIndex] = value;
        updated[officialIndex].tasks = currentTasks;
        setData('officials_list', updated);
    };

    const handleDeleteOfficialTask = (officialIndex, taskIndex) => {
        const updated = [...data.officials_list];
        updated[officialIndex].tasks = (updated[officialIndex].tasks || []).filter((_, i) => i !== taskIndex);
        setData('officials_list', updated);
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(`/${adminPath}/settings/officials`, {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    // Navigation Tabs
    const tabs = [
        {
            id: 'struktur',
            name: 'Struktur Organisasi',
            desc: 'Bagan kartu profil & tambah perangkat',
            icon: Layers,
            badge: `${data.officials_list.length + 2} Kartu`,
        },
        {
            id: 'wewenang',
            name: 'Wewenang & Tupoksi',
            desc: 'Regulasi, fungsi & butir tugas resmi',
            icon: Scale,
            badge: 'Tupoksi',
        },
    ];

    // Filtered icons for Icon Picker Modal
    const iconCategories = ['all', ...Array.from(new Set(Object.values(ICON_REGISTRY).map((i) => i.category)))];
    const iconEntries = Object.entries(ICON_REGISTRY).filter(([key, item]) => {
        const matchCategory = iconCategoryFilter === 'all' || item.category === iconCategoryFilter;
        const matchSearch =
            !iconSearch ||
            key.toLowerCase().includes(iconSearch.toLowerCase()) ||
            item.label.toLowerCase().includes(iconSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    const filteredOfficialsStruktur = data.officials_list.map((item, originalIndex) => ({
        ...item,
        originalIndex,
    })).filter((item) => {
        if (!searchStruktur) return true;
        const q = searchStruktur.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.position && item.position.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q))
        );
    });

    const filteredOfficialsWewenang = data.officials_list.map((item, originalIndex) => ({
        ...item,
        originalIndex,
    })).filter((item) => {
        if (!searchWewenang) return true;
        const q = searchWewenang.toLowerCase();
        return (
            (item.name && item.name.toLowerCase().includes(q)) ||
            (item.position && item.position.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q))
        );
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* 1. Header Admin Terpadu */}
                <AdminPageHeader
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Konfigurasi Perangkat Desa' },
                    ]}
                    title="Konfigurasi Perangkat Desa & SOTK"
                    description="Kelola susunan struktur bagan kartu perangkat desa, foto profil resmi, serta wewenang dan tugas pokok sesuai orang-orang yang ada."
                    actions={
                        <>
                            <a
                                href="/profil/perangkat-desa"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Bagan SOTK</span>
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

                {/* 2. Master-Detail Layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* SISI KIRI: Navigasi Tab Vertikal (3 cols) */}
                    <div className="lg:col-span-3 space-y-3 lg:sticky lg:top-20">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 space-y-1 shadow-xs">
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                                Navigasi Seksi
                            </span>
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                                            isActive
                                                ? 'bg-red-50 border-red-300 dark:bg-red-950/40 dark:border-red-500/50 shadow-xs'
                                                : 'bg-white border-transparent hover:bg-zinc-100 dark:bg-transparent dark:border-transparent dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-400'
                                        }`}
                                    >
                                        <div
                                            className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                                isActive
                                                    ? 'bg-red-600 text-white shadow-xs'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-1">
                                                <h3
                                                    className={`text-xs font-bold leading-snug ${
                                                        isActive
                                                            ? 'text-red-700 dark:text-amber-400'
                                                            : 'text-zinc-900 dark:text-zinc-200'
                                                    }`}
                                                >
                                                    {tab.name}
                                                </h3>
                                                <span className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-bold ${
                                                    isActive
                                                        ? 'bg-red-600/15 text-red-700 dark:text-amber-400'
                                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                                }`}>
                                                    {tab.badge}
                                                </span>
                                            </div>
                                            <p
                                                className={`text-[11px] truncate mt-0.5 ${
                                                    isActive
                                                        ? 'text-red-600/80 dark:text-zinc-400'
                                                        : 'text-zinc-500 dark:text-zinc-400'
                                                }`}
                                            >
                                                {tab.desc}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Petunjuk Kartu */}
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 dark:bg-zinc-900/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-400 shadow-xs">
                            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-zinc-200">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Tampilan Kartu SOTK</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Sisi kanan telah disesuaikan menjadi deretan <strong>kartu visual (card)</strong> seperti tampilan pada website publik. Klik <strong>Edit Profil</strong> pada kartu mana pun untuk mengganti nama, foto, jabatan, atau nomor telepon.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Grid Card & Pengaturan (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* ========================================================================= */}
                        {/* TAB 1: STRUKTUR ORGANISASI (KARTU-KARTU VISUAL PERANGKAT DESA)           */}
                        {/* ========================================================================= */}
                        {activeTab === 'struktur' && (
                            <div className="space-y-6">
                                {/* Top Control Bar */}
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Layers className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                Bagan Kartu Perangkat Desa Karangwungu
                                            </h3>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {data.officials_list.length + 2} kartu profil terdaftar (Kepala Desa, BPD, dan {data.officials_list.length} jajaran perangkat).
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => setShowBannerConfig(!showBannerConfig)}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-200 shadow-2xs transition-colors cursor-pointer"
                                        >
                                            <SlidersHorizontal className="h-3.5 w-3.5" />
                                            <span>{showBannerConfig ? 'Tutup Banner' : 'Ubah Judul Bagan'}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleAddOfficial}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-all cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Tambah Perangkat Desa</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Banner SOTK Config (Collapsible) */}
                                {showBannerConfig && (
                                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-3 animate-in fade-in duration-150">
                                        <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                                            <Building2 className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                            <span>Banner Judul & Keterangan Bagan Struktur SOTK</span>
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Judul Bagan SOTK
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.sotk_title}
                                                    onChange={(e) => setData('sotk_title', e.target.value)}
                                                    placeholder="Bagan Struktur Organisasi & Tata Kerja (SOTK)..."
                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                    Dasar Regulasi / Subtitle Bagan
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.sotk_subtitle}
                                                    onChange={(e) => setData('sotk_subtitle', e.target.value)}
                                                    placeholder="Berdasarkan Permendagri No. 84 Tahun 2015..."
                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Search Filter */}
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={searchStruktur}
                                        onChange={(e) => setSearchStruktur(e.target.value)}
                                        placeholder="Cari kartu perangkat (nama, jabatan seperti Kades, Sekdes, Kasun, atau kategori)..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium shadow-2xs focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>

                                {/* ========================================================= */}
                                {/* GRID KARTU PERANGKAT DESA (SAMA DENGAN TAMPILAN PUBLIK)   */}
                                {/* ========================================================= */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {/* 1. KARTU KEPALA DESA */}
                                    {(!searchStruktur || 'kepala desa kades'.includes(searchStruktur.toLowerCase()) || (data.kades_name && data.kades_name.toLowerCase().includes(searchStruktur.toLowerCase()))) && (
                                        <div className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-amber-400/90 shadow-red-950/40 flex flex-col relative">
                                            {/* Photo */}
                                            <div className="relative w-full overflow-hidden bg-zinc-950 aspect-[4/3]">
                                                <img
                                                    src={localPreviews.kades || data.kades_photo || avatarUrl(data.kades_name)}
                                                    alt={data.kades_name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent" />
                                                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                                    <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 font-bold shadow-xs px-2.5 py-0.5 text-[10px]">
                                                        <Award className="h-3 w-3 text-amber-400 shrink-0" />
                                                        <span className="truncate">{data.kades_position || 'Kepala Desa'}</span>
                                                    </span>
                                                    <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-zinc-950 font-black text-[9px] uppercase tracking-wider">
                                                        Pimpinan
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="p-4 space-y-1.5 flex-1 flex flex-col">
                                                <h4 className="font-bold text-base group-hover:text-amber-300 transition-colors leading-tight">
                                                    {data.kades_name || 'H. SUNARTO'}
                                                </h4>
                                                <p className="text-amber-300/80 font-semibold text-xs truncate">
                                                    {data.kades_category || 'Pimpinan Eksekutif'}
                                                </p>
                                                <p className="text-red-100/70 text-xs leading-relaxed line-clamp-3 mt-1">
                                                    {data.kades_role_desc || 'Pimpinan penyelenggaraan pemerintahan, pembangunan, pembinaan, dan pemberdayaan masyarakat desa.'}
                                                </p>
                                            </div>

                                            {/* Action Toolbar on Card */}
                                            <div className="p-3 border-t border-red-500/20 bg-black/20 backdrop-blur-xs flex items-center justify-between gap-2 mt-auto">
                                                <span className="text-[10px] text-red-200/70 truncate font-mono">
                                                    {data.kades_phone || 'Kepala Desa'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingTarget('kades')}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                                                >
                                                    <Edit3 className="h-3 w-3" />
                                                    <span>Edit Profil</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. KARTU KETUA BPD */}
                                    {(!searchStruktur || 'ketua bpd badan permusyawaratan'.includes(searchStruktur.toLowerCase()) || (data.bpd_name && data.bpd_name.toLowerCase().includes(searchStruktur.toLowerCase()))) && (
                                        <div className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 border border-red-400/30 flex flex-col relative">
                                            {/* Photo */}
                                            <div className="relative w-full overflow-hidden bg-zinc-950 aspect-[4/3]">
                                                <img
                                                    src={localPreviews.bpd || data.bpd_photo || avatarUrl(data.bpd_name)}
                                                    alt={data.bpd_name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent" />
                                                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                                    <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 font-bold shadow-xs px-2.5 py-0.5 text-[10px]">
                                                        <Landmark className="h-3 w-3 text-amber-400 shrink-0" />
                                                        <span className="truncate">{data.bpd_position || 'Ketua BPD'}</span>
                                                    </span>
                                                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-800 border border-white/20 text-amber-300 font-bold text-[9px]">
                                                        Mitra Sejajar
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="p-4 space-y-1.5 flex-1 flex flex-col">
                                                <h4 className="font-bold text-base group-hover:text-amber-300 transition-colors leading-tight">
                                                    {data.bpd_name || 'ALI NASIHIN, SH'}
                                                </h4>
                                                <p className="text-amber-300/80 font-semibold text-xs truncate">
                                                    {data.bpd_category || 'Badan Permusyawaratan Desa'}
                                                </p>
                                                <p className="text-red-100/70 text-xs leading-relaxed line-clamp-3 mt-1">
                                                    {data.bpd_role_desc || 'Mitra kerja strategis pemerintah desa dalam pengawasan, legislasi peraturan desa, dan penampung aspirasi warga.'}
                                                </p>
                                            </div>

                                            {/* Action Toolbar on Card */}
                                            <div className="p-3 border-t border-red-500/20 bg-black/20 backdrop-blur-xs flex items-center justify-between gap-2 mt-auto">
                                                <span className="text-[10px] text-red-200/70 truncate font-mono">
                                                    {data.bpd_phone || 'Ketua BPD'}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingTarget('bpd')}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/20 shadow-xs transition-colors cursor-pointer"
                                                >
                                                    <Edit3 className="h-3 w-3" />
                                                    <span>Edit Profil</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* 3..N KARTU JAJARAN PERANGKAT DESA */}
                                    {filteredOfficialsStruktur.map((official) => {
                                        const idx = official.originalIndex;
                                        const IconComp = getIconComponent(official.icon, Briefcase);

                                        return (
                                            <div
                                                key={official.id || idx}
                                                className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 border border-red-400/25 flex flex-col relative"
                                            >
                                                {/* Photo */}
                                                <div className="relative w-full overflow-hidden bg-zinc-950 aspect-[4/3]">
                                                    <img
                                                        src={localPreviews[idx] || official.photo || avatarUrl(official.name)}
                                                        alt={official.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent" />
                                                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                                                        <span className="inline-flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 font-bold shadow-xs px-2.5 py-0.5 text-[10px]">
                                                            <IconComp className="h-3 w-3 text-amber-400 shrink-0" />
                                                            <span className="truncate">{official.position || 'Perangkat Desa'}</span>
                                                        </span>
                                                        <span className="px-1.5 py-0.5 rounded-md bg-black/50 text-[9px] font-mono text-zinc-300 border border-white/10">
                                                            #{idx + 1}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="p-4 space-y-1.5 flex-1 flex flex-col">
                                                    <h4 className="font-bold text-sm sm:text-base group-hover:text-amber-300 transition-colors leading-tight truncate">
                                                        {official.name || 'Nama Perangkat'}
                                                    </h4>
                                                    <p className="text-amber-300/80 font-semibold text-xs truncate">
                                                        {official.category || 'Perangkat Desa'}
                                                    </p>
                                                    <p className="text-red-100/70 text-xs leading-relaxed line-clamp-3 mt-1">
                                                        {official.role_desc || official.summary || 'Aparatur pelayan masyarakat Desa Karangwungu.'}
                                                    </p>
                                                </div>

                                                {/* Action Toolbar on Card */}
                                                <div className="p-2.5 border-t border-red-500/20 bg-black/25 backdrop-blur-xs flex items-center justify-between gap-1.5 mt-auto">
                                                    {/* Move buttons */}
                                                    <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/15">
                                                        <button
                                                            type="button"
                                                            disabled={idx === 0}
                                                            onClick={(e) => handleMoveOfficial(idx, -1, e)}
                                                            className="p-1 text-zinc-300 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                                                            title="Geser Ke Kiri / Atas"
                                                        >
                                                            <ArrowLeft className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            disabled={idx === data.officials_list.length - 1}
                                                            onClick={(e) => handleMoveOfficial(idx, 1, e)}
                                                            className="p-1 text-zinc-300 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                                                            title="Geser Ke Kanan / Bawah"
                                                        >
                                                            <ArrowRight className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>

                                                    {/* Icon Button */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => openIconPicker(idx, e)}
                                                        className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-amber-300 border border-white/15 transition-colors cursor-pointer"
                                                        title="Ganti Icon"
                                                    >
                                                        <IconComp className="h-3.5 w-3.5" />
                                                    </button>

                                                    {/* Edit Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingTarget(idx)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/20 shadow-xs transition-colors cursor-pointer"
                                                    >
                                                        <Edit3 className="h-3 w-3" />
                                                        <span>Edit</span>
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDeleteOfficial(idx, e)}
                                                        className="p-1.5 rounded-lg text-red-300 hover:text-white hover:bg-red-600/60 transition-colors cursor-pointer"
                                                        title="Hapus Kartu"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* N+1: KARTU TAMBAH PERANGKAT DESA BARU */}
                                    <button
                                        type="button"
                                        onClick={handleAddOfficial}
                                        className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 bg-white/50 dark:bg-zinc-900/40 hover:bg-red-50/50 dark:hover:bg-red-950/20 p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 group min-h-[300px] cursor-pointer"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-600 group-hover:text-white text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-colors shadow-xs">
                                            <Plus className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                                                Tambah Perangkat Desa
                                            </h4>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px]">
                                                Klik untuk mendaftarkan kartu aparatur desa baru
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* TAB 2: WEWENANG & TUPOKSI RESMI (KARTU-KARTU TUPOKSI)                     */}
                        {/* ========================================================================= */}
                        {activeTab === 'wewenang' && (
                            <div className="space-y-6">
                                {/* Top Header Bar */}
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Scale className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                Wewenang & Butir Tugas Pokok Resmi
                                            </h3>
                                        </div>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Dasar regulasi perundang-undangan, fungsi, kewenangan, dan butir tupoksi resmi sesuai orang yang terdaftar.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={expandedWewenang.size >= 2 ? collapseAllWewenang : expandAllWewenang}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-200 shadow-2xs transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                                    >
                                        {expandedWewenang.size >= 2 ? (
                                            <>
                                                <ChevronUp className="h-3.5 w-3.5" />
                                                <span>Tutup Semua</span>
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="h-3.5 w-3.5" />
                                                <span>Buka Semua</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Search Filter */}
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={searchWewenang}
                                        onChange={(e) => setSearchWewenang(e.target.value)}
                                        placeholder="Cari pejabat untuk diatur wewenangnya (Kades, BPD, Sekdes, Kasun...)..."
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium shadow-2xs focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>

                                {/* KARTU WEWENANG 1: KEPALA DESA */}
                                {(!searchWewenang || 'kepala desa kades'.includes(searchWewenang.toLowerCase()) || (data.kades_name && data.kades_name.toLowerCase().includes(searchWewenang.toLowerCase()))) && (
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-amber-400/60 dark:border-amber-500/40 shadow-xs overflow-hidden">
                                        <div
                                            onClick={() => toggleExpandWewenang('kades')}
                                            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-3.5 min-w-0">
                                                <div className="h-10 w-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                                                    ★
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                                                            {data.kades_name || 'Kepala Desa'}
                                                        </h4>
                                                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold">
                                                            Pimpinan Eksekutif
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold truncate mt-0.5">
                                                        {data.kades_position || 'Kepala Desa'} • {data.kades_tasks.length} Butir Tugas Pokok
                                                    </p>
                                                </div>
                                            </div>

                                            <button type="button" className="p-1.5 text-zinc-400">
                                                {expandedWewenang.has('kades') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </button>
                                        </div>

                                        {expandedWewenang.has('kades') && (
                                            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-4 animate-in fade-in duration-150">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                            <Scale className="h-3.5 w-3.5 text-zinc-400" />
                                                            <span>Dasar Regulasi Hukum</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.kades_basis}
                                                            onChange={(e) => setData('kades_basis', e.target.value)}
                                                            placeholder="UU No. 6/2014 & Permendagri No. 84/2015"
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Kewenangan Resmi
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.kades_authorities}
                                                            onChange={(e) => setData('kades_authorities', e.target.value)}
                                                            placeholder="Menetapkan kebijakan desa, mengelola keuangan & aset desa..."
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Ringkasan Tupoksi & Peran Utama
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        value={data.kades_summary}
                                                        onChange={(e) => setData('kades_summary', e.target.value)}
                                                        placeholder="Pimpinan tertinggi pemerintah desa yang bertugas menyelenggarakan..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>

                                                {/* Butir Rincian Tugas */}
                                                <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                                    <div className="flex items-center justify-between">
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                            Daftar Butir Tugas Pokok (Tupoksi) Kepala Desa
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddTaskPoint('kades')}
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                            <span>Tambah Butir Tugas</span>
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {data.kades_tasks.map((task, tIdx) => (
                                                            <div key={tIdx} className="flex items-center gap-2">
                                                                <span className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                                                                    {tIdx + 1}
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    value={task}
                                                                    onChange={(e) => handleUpdateTaskPoint('kades', tIdx, e.target.value)}
                                                                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteTaskPoint('kades', tIdx)}
                                                                    className="p-1.5 text-zinc-400 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* KARTU WEWENANG 2: KETUA BPD */}
                                {(!searchWewenang || 'ketua bpd mitra legislasi'.includes(searchWewenang.toLowerCase()) || (data.bpd_name && data.bpd_name.toLowerCase().includes(searchWewenang.toLowerCase()))) && (
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
                                        <div
                                            onClick={() => toggleExpandWewenang('bpd')}
                                            className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-3.5 min-w-0">
                                                <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                                                    <Landmark className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                                                            {data.bpd_name || 'Ketua BPD'}
                                                        </h4>
                                                        <span className="px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold">
                                                            Badan Permusyawaratan Desa
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold truncate mt-0.5">
                                                        {data.bpd_position || 'Ketua BPD'} • {data.bpd_tasks.length} Butir Tugas Pokok
                                                    </p>
                                                </div>
                                            </div>

                                            <button type="button" className="p-1.5 text-zinc-400">
                                                {expandedWewenang.has('bpd') ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                            </button>
                                        </div>

                                        {expandedWewenang.has('bpd') && (
                                            <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-4 animate-in fade-in duration-150">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                            <Scale className="h-3.5 w-3.5 text-zinc-400" />
                                                            <span>Dasar Regulasi Hukum</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.bpd_basis}
                                                            onChange={(e) => setData('bpd_basis', e.target.value)}
                                                            placeholder="Permendagri No. 110/2016"
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Kewenangan Resmi
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={data.bpd_authorities}
                                                            onChange={(e) => setData('bpd_authorities', e.target.value)}
                                                            placeholder="Mengawasi pelaksanaan peraturan desa & APBDes..."
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Ringkasan Tupoksi & Peran Utama
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        value={data.bpd_summary}
                                                        onChange={(e) => setData('bpd_summary', e.target.value)}
                                                        placeholder="Lembaga perwakilan permusyawaratan warga desa yang berkedudukan..."
                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>

                                                {/* Butir Rincian Tugas */}
                                                <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                                    <div className="flex items-center justify-between">
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                            Daftar Butir Tugas Pokok (Tupoksi) BPD
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddTaskPoint('bpd')}
                                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline cursor-pointer"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                            <span>Tambah Butir Tugas</span>
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {data.bpd_tasks.map((task, tIdx) => (
                                                            <div key={tIdx} className="flex items-center gap-2">
                                                                <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                                                                    {tIdx + 1}
                                                                </span>
                                                                <input
                                                                    type="text"
                                                                    value={task}
                                                                    onChange={(e) => handleUpdateTaskPoint('bpd', tIdx, e.target.value)}
                                                                    className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteTaskPoint('bpd', tIdx)}
                                                                    className="p-1.5 text-zinc-400 hover:text-red-600"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* KARTU WEWENANG 3..N: APARATUR DESA */}
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                        <span>Wewenang Aparatur Terdaftar ({data.officials_list.length} Orang)</span>
                                    </h4>

                                    {filteredOfficialsWewenang.map((official) => {
                                        const idx = official.originalIndex;
                                        const isExpanded = expandedWewenang.has(idx);
                                        const IconComp = getIconComponent(official.icon, Briefcase);

                                        return (
                                            <div
                                                key={official.id || idx}
                                                className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                                            >
                                                {/* Summary Row */}
                                                <div
                                                    onClick={() => toggleExpandWewenang(idx)}
                                                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                                                >
                                                    <div className="flex items-center gap-3.5 min-w-0">
                                                        <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center font-bold text-base shrink-0 border border-zinc-200 dark:border-zinc-700">
                                                            <IconComp className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                                                                    {official.name || 'Perangkat Desa Tanpa Nama'}
                                                                </h4>
                                                                <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                                                    {official.category || 'Perangkat Desa'}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-red-600 dark:text-amber-400 font-semibold truncate mt-0.5">
                                                                {official.position || 'Jabatan Perangkat Desa'} • {(official.tasks || []).length} Butir Tugas
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button type="button" className="p-1.5 text-zinc-400">
                                                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                    </button>
                                                </div>

                                                {/* Wewenang Form Body */}
                                                {isExpanded && (
                                                    <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-4 animate-in fade-in duration-150">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                                    <Scale className="h-3.5 w-3.5 text-zinc-400" />
                                                                    <span>Dasar Hukum Regulasi Tupoksi</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={official.basis || ''}
                                                                    onChange={(e) => handleUpdateOfficial(idx, 'basis', e.target.value)}
                                                                    placeholder="Permendagri No. 84/2015 Pasal 7"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Kewenangan Resmi
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={official.authorities || ''}
                                                                    onChange={(e) => handleUpdateOfficial(idx, 'authorities', e.target.value)}
                                                                    placeholder="Memverifikasi kelengkapan administrasi dan..."
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                Ringkasan Tugas Pokok & Fungsi ({official.position})
                                                            </label>
                                                            <textarea
                                                                rows={2}
                                                                value={official.summary || ''}
                                                                onChange={(e) => handleUpdateOfficial(idx, 'summary', e.target.value)}
                                                                placeholder="Koordinator administrasi desa yang membantu Kepala Desa dalam..."
                                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                            />
                                                        </div>

                                                        {/* Butir Rincian Tugas */}
                                                        <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                                                            <div className="flex items-center justify-between">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                                    Daftar Butir Rincian Tugas Pokok Resmi
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleAddOfficialTask(idx)}
                                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline cursor-pointer"
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                    <span>Tambah Butir Tugas</span>
                                                                </button>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {(official.tasks || []).map((task, tIdx) => (
                                                                    <div key={tIdx} className="flex items-center gap-2">
                                                                        <span className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                                                                            {tIdx + 1}
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            value={task}
                                                                            onChange={(e) => handleUpdateOfficialTask(idx, tIdx, e.target.value)}
                                                                            className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDeleteOfficialTask(idx, tIdx)}
                                                                            className="p-1.5 text-zinc-400 hover:text-red-600"
                                                                        >
                                                                            <Trash2 className="h-3.5 w-3.5" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MODAL EDIT PROFIL LENGKAP KARTU (UNTUK KADES, BPD, MAUPUN PERANGKAT)      */}
            {/* ========================================================================= */}
            {editingTarget !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl w-full my-8 shadow-2xl overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                            <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                    <Edit3 className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        {editingTarget === 'kades'
                                            ? 'Edit Profil Kepala Desa'
                                            : editingTarget === 'bpd'
                                            ? 'Edit Profil Ketua BPD'
                                            : `Edit Kartu: ${data.officials_list[editingTarget]?.position || 'Perangkat Desa'}`}
                                    </h3>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                        Perubahan pada kartu ini akan tampil langsung di bagan SOTK publik.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingTarget(null)}
                                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* 1. KADES FORM */}
                            {editingTarget === 'kades' && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Nama Lengkap & Gelar *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kades_name}
                                                onChange={(e) => setData('kades_name', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Award className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Jabatan Resmi</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kades_position}
                                                onChange={(e) => setData('kades_position', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                NIP / NIAP
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kades_nip}
                                                onChange={(e) => setData('kades_nip', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Nomor Kontak / WhatsApp</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kades_phone}
                                                onChange={(e) => setData('kades_phone', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {renderPhotoField({
                                        title: 'Foto Resmi Kepala Desa',
                                        photoUrl: data.kades_photo,
                                        onUrlChange: handleKadesUrlChange,
                                        onFileChange: handleKadesFileChange,
                                        targetKey: 'kades',
                                        personName: data.kades_name,
                                    })}

                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Uraian Singkat Peran (Tampil pada Bagan Kartu)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.kades_role_desc}
                                            onChange={(e) => setData('kades_role_desc', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                        />
                                    </div>
                                </>
                            )}

                            {/* 2. BPD FORM */}
                            {editingTarget === 'bpd' && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Nama Lengkap & Gelar *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.bpd_name}
                                                onChange={(e) => setData('bpd_name', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Landmark className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Jabatan</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.bpd_position}
                                                onChange={(e) => setData('bpd_position', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Nomor Kontak / WhatsApp</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.bpd_phone}
                                                onChange={(e) => setData('bpd_phone', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Kategori Lembaga
                                            </label>
                                            <input
                                                type="text"
                                                value={data.bpd_category}
                                                onChange={(e) => setData('bpd_category', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {renderPhotoField({
                                        title: 'Foto Resmi Ketua BPD',
                                        photoUrl: data.bpd_photo,
                                        onUrlChange: handleBpdUrlChange,
                                        onFileChange: handleBpdFileChange,
                                        targetKey: 'bpd',
                                        personName: data.bpd_name,
                                    })}

                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Uraian Singkat Peran (Tampil pada Bagan Kartu)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.bpd_role_desc}
                                            onChange={(e) => setData('bpd_role_desc', e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                        />
                                    </div>
                                </>
                            )}

                            {/* 3. APARATUR FORM */}
                            {typeof editingTarget === 'number' && data.officials_list[editingTarget] && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Nama Lengkap & Gelar *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.officials_list[editingTarget].name || ''}
                                                onChange={(e) => handleUpdateOfficial(editingTarget, 'name', e.target.value)}
                                                placeholder="Contoh: RIDUWAN HADI P"
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Briefcase className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Jabatan SOTK *</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.officials_list[editingTarget].position || ''}
                                                onChange={(e) => handleUpdateOfficial(editingTarget, 'position', e.target.value)}
                                                placeholder="Contoh: Sekretaris Desa"
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold text-red-600 dark:text-amber-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Kategori SOTK
                                            </label>
                                            <select
                                                value={data.officials_list[editingTarget].category || 'Perangkat Desa'}
                                                onChange={(e) => handleUpdateOfficial(editingTarget, 'category', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            >
                                                <option value="Sekretariat Desa">Sekretariat Desa</option>
                                                <option value="Perangkat Desa / Urusan Staf">Perangkat Desa / Urusan Staf</option>
                                                <option value="Pelaksana Teknis">Pelaksana Teknis</option>
                                                <option value="Pelaksana Kewilayahan">Pelaksana Kewilayahan (Kasun)</option>
                                                <option value="Lembaga Pemberdayaan">Lembaga Pemberdayaan (LPM)</option>
                                                <option value="Ketenteraman & Ketertiban">Ketenteraman & Ketertiban (Linmas)</option>
                                                <option value="Perangkat Desa">Lainnya / Umum</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                NIP / NIAP
                                            </label>
                                            <input
                                                type="text"
                                                value={data.officials_list[editingTarget].nip || ''}
                                                onChange={(e) => handleUpdateOfficial(editingTarget, 'nip', e.target.value)}
                                                placeholder="19820315 201001 1 012"
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-mono text-[11px]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>No. WhatsApp / Telepon</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.officials_list[editingTarget].phone || ''}
                                                onChange={(e) => handleUpdateOfficial(editingTarget, 'phone', e.target.value)}
                                                placeholder="0813-4455-6677"
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                <Sparkles className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>Icon Penanda Visual</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={(e) => openIconPicker(editingTarget, e)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium flex items-center justify-between hover:border-red-500 transition-colors"
                                            >
                                                <span>{data.officials_list[editingTarget].icon || 'Briefcase'}</span>
                                                <span className="text-[10px] text-red-600 dark:text-amber-400 font-bold">Ganti Icon</span>
                                            </button>
                                        </div>
                                    </div>

                                    {renderPhotoField({
                                        title: `Foto Resmi: ${data.officials_list[editingTarget].position || 'Perangkat Desa'}`,
                                        photoUrl: data.officials_list[editingTarget].photo,
                                        onUrlChange: (val) => handleOfficialUrlChange(editingTarget, val),
                                        onFileChange: (e) => handleOfficialFileChange(editingTarget, e),
                                        targetKey: editingTarget,
                                        personName: data.officials_list[editingTarget].name,
                                    })}

                                    <div>
                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Uraian Singkat Peran (Tampil pada Bagan Kartu)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.officials_list[editingTarget].role_desc || ''}
                                            onChange={(e) => handleUpdateOfficial(editingTarget, 'role_desc', e.target.value)}
                                            placeholder="Koordinator administrasi umum, keuangan, kepegawaian..."
                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">
                                Klik tombol selesai untuk menutup dialog.
                            </span>
                            <button
                                type="button"
                                onClick={() => setEditingTarget(null)}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                            >
                                Selesai & Perbarui Kartu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* MODAL VISUAL ICON PICKER                                                  */}
            {/* ========================================================================= */}
            {iconPickerTarget !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Pilih Icon untuk {data.officials_list[iconPickerTarget]?.position || 'Perangkat Desa'}</span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Pilih icon dari katalog referensi visual yang tersedia.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIconPickerTarget(null)}
                                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={iconSearch}
                                    onChange={(e) => setIconSearch(e.target.value)}
                                    placeholder="Cari icon (misal: tas, bangunan, peta, perisai, hati, pengguna...)"
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

                        <div className="p-4 overflow-y-auto max-h-[50vh]">
                            {iconEntries.length === 0 ? (
                                <div className="p-8 text-center text-xs text-zinc-400">
                                    Tidak ditemukan icon yang cocok dengan pencarian "{iconSearch}".
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {iconEntries.map(([iconKey, item]) => {
                                        const Comp = item.icon;
                                        const isCurrent = data.officials_list[iconPickerTarget]?.icon === iconKey;

                                        return (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                onClick={() => handleSelectIcon(iconKey)}
                                                className={`p-3 rounded-xl border text-left flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                                                    isCurrent
                                                        ? 'bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500 shadow-xs'
                                                        : 'bg-white dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 hover:border-red-300 dark:hover:border-red-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                                                }`}
                                            >
                                                <div
                                                    className={`p-2.5 rounded-lg ${
                                                        isCurrent
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-600 group-hover:text-white transition-colors'
                                                    }`}
                                                >
                                                    <Comp className="h-5 w-5" />
                                                </div>
                                                <div className="text-center w-full min-w-0">
                                                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block truncate">
                                                        {iconKey}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block truncate mt-0.5">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIconPickerTarget(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
