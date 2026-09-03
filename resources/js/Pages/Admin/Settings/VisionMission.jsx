import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Target,
    Award,
    Sparkles,
    Users,
    Save,
    ExternalLink,
    Info,
    Check,
    Plus,
    Trash2,
    Search,
    X,
    Layers,
    Crown,
    CheckCircle2,
    Calendar,
    ChevronUp,
    ChevronDown,
    User,
    Hash,
    Landmark,
    Edit3,
    ArrowUp,
    ArrowDown,
    Eye,
    SlidersHorizontal,
    Clock,
    HeartPulse,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';

export default function VisionMissionSettings({ settings = {} }) {
    const [activeTab, setActiveTab] = useState('leaders'); // default to leaders or vision
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Parse existing missions
    let initialMissions = [];
    if (settings.missions_data && Array.isArray(settings.missions_data)) {
        initialMissions = settings.missions_data;
    } else if (settings.missions && typeof settings.missions === 'string') {
        try {
            initialMissions = JSON.parse(settings.missions);
        } catch (e) {
            initialMissions = [];
        }
    }

    // Parse existing leaders
    let initialLeaders = [];
    if (settings.leaders_data && Array.isArray(settings.leaders_data)) {
        initialLeaders = settings.leaders_data;
    } else if (settings.leaders && typeof settings.leaders === 'string') {
        try {
            initialLeaders = JSON.parse(settings.leaders);
        } catch (e) {
            initialLeaders = [];
        }
    }

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        // 1. Visi Utama
        vision_badge: settings.vision_badge || 'Visi Resmi Pemerintah Desa Karangwungu',
        vision_text:
            settings.vision_text ||
            'Terwujudnya Masyarakat Desa Karangwungu Yang Berakhlak Mulia, Sehat, Sejahtera dan Bermartabat Dalam Naungan Pemerintah Desa Yang Demokratis dan Amanah',

        // 2. 4 Pilar Nilai Visi
        vision_pillar_1_text: settings.vision_pillar_1_text || 'Berakhlak Mulia',
        vision_pillar_1_icon: settings.vision_pillar_1_icon || 'Award',

        vision_pillar_2_text: settings.vision_pillar_2_text || 'Sehat & Bugar',
        vision_pillar_2_icon: settings.vision_pillar_2_icon || 'HeartPulse',

        vision_pillar_3_text: settings.vision_pillar_3_text || 'Masyarakat Sejahtera',
        vision_pillar_3_icon: settings.vision_pillar_3_icon || 'ShieldCheck',

        vision_pillar_4_text: settings.vision_pillar_4_text || 'Demokratis & Amanah',
        vision_pillar_4_icon: settings.vision_pillar_4_icon || 'UserCheck',

        // 3. Misi Pembangunan (Array)
        missions: initialMissions,

        // 4. Silsilah Kepemimpinan Kepala Desa (Array)
        leaders: initialLeaders,
    });

    // Expand/Collapse state for leader cards
    const [expandedLeaders, setExpandedLeaders] = useState(() => {
        // Expand the active leader by default
        const activeIdx = initialLeaders.findIndex((l) => l.isCurrent);
        return new Set([activeIdx !== -1 ? activeIdx : 0]);
    });

    const [leaderSearch, setLeaderSearch] = useState('');
    const [missionSearch, setMissionSearch] = useState('');

    const toggleLeaderExpand = (idx) => {
        setExpandedLeaders((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) {
                next.delete(idx);
            } else {
                next.add(idx);
            }
            return next;
        });
    };

    const expandAllLeaders = () => {
        setExpandedLeaders(new Set(data.leaders.map((_, i) => i)));
    };

    const collapseAllLeaders = () => {
        setExpandedLeaders(new Set());
    };

    const handleMoveLeader = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= data.leaders.length) return;
        const updated = [...data.leaders];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;
        setData('leaders', updated);
    };

    // State for Icon Picker Modal
    const [iconPickerTarget, setIconPickerTarget] = useState(null);
    const [iconSearch, setIconSearch] = useState('');
    const [iconCategoryFilter, setIconCategoryFilter] = useState('all');

    const openIconPicker = (target) => {
        setIconPickerTarget(target);
        setIconSearch('');
        setIconCategoryFilter('all');
    };

    const handleSelectIcon = (iconKey) => {
        if (iconPickerTarget === 'pillar1') setData('vision_pillar_1_icon', iconKey);
        else if (iconPickerTarget === 'pillar2') setData('vision_pillar_2_icon', iconKey);
        else if (iconPickerTarget === 'pillar3') setData('vision_pillar_3_icon', iconKey);
        else if (iconPickerTarget === 'pillar4') setData('vision_pillar_4_icon', iconKey);
        else if (iconPickerTarget && iconPickerTarget.startsWith('mission-')) {
            const idx = parseInt(iconPickerTarget.replace('mission-', ''), 10);
            const updated = [...data.missions];
            if (updated[idx]) {
                updated[idx].icon = iconKey;
                setData('missions', updated);
            }
        }
        setIconPickerTarget(null);
    };

    // Mission Handlers
    const handleAddMission = () => {
        const nextNum = String(data.missions.length + 1).padStart(2, '0');
        const newMission = {
            id: 'misi-' + Date.now(),
            number: nextNum,
            category: 'Pembangunan Desa',
            title: 'Misi Baru Pembangunan',
            desc: 'Deskripsi langkah nyata misi pembangunan desa...',
            icon: 'Target',
            badge: 'Prioritas Strategis',
        };
        setData('missions', [...data.missions, newMission]);
    };

    const handleUpdateMission = (index, field, value) => {
        const updated = [...data.missions];
        updated[index][field] = value;
        setData('missions', updated);
    };

    const handleDeleteMission = (index) => {
        if (confirm('Apakah Anda yakin ingin menghapus misi ini?')) {
            const updated = data.missions.filter((_, i) => i !== index);
            const reindexed = updated.map((m, i) => ({
                ...m,
                number: String(i + 1).padStart(2, '0'),
            }));
            setData('missions', reindexed);
        }
    };

    // Leader Handlers
    const handleAddLeader = () => {
        const nextOrder = data.leaders.length > 0 ? Math.max(...data.leaders.map((l) => l.order || 0)) + 1 : 1;
        const newLeader = {
            id: 'leader-' + Date.now(),
            order: nextOrder,
            name: '',
            period: '2026 – 2032',
            role: `Kepala Desa Ke-${nextOrder}`,
            desc: 'Kepala Desa pengemban amanah masyarakat Desa Karangwungu.',
            isCurrent: false,
        };
        setData('leaders', [newLeader, ...data.leaders]);
        // Expand the newly created leader
        setExpandedLeaders((prev) => new Set([0, ...prev]));
    };

    const handleUpdateLeader = (index, field, value) => {
        const updated = [...data.leaders];
        updated[index][field] = value;
        // If toggling isCurrent to true, ensure single active leader
        if (field === 'isCurrent' && value === true) {
            updated.forEach((l, i) => {
                if (i !== index) l.isCurrent = false;
            });
        }
        setData('leaders', updated);
    };

    const handleDeleteLeader = (index) => {
        if (confirm('Apakah Anda yakin ingin menghapus data Kepala Desa ini?')) {
            const updated = data.leaders.filter((_, i) => i !== index);
            setData('leaders', updated);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/${adminPath}/settings/vision-mission`, {
            preserveScroll: true,
        });
    };

    // Tabs definition
    const tabs = [
        {
            id: 'vision',
            name: 'Visi & 4 Pilar Nilai',
            desc: 'Rumusan visi & 4 pilar penopang',
            icon: Target,
        },
        {
            id: 'missions',
            name: 'Misi Pembangunan',
            desc: `${data.missions.length} misi strategis desa`,
            icon: Layers,
        },
        {
            id: 'leaders',
            name: 'Silsilah Kepala Desa',
            desc: `${data.leaders.length} periode kepemimpinan`,
            icon: Crown,
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

    const getModalTargetLabel = () => {
        if (iconPickerTarget === 'pillar1') return 'Pilar 1 (' + data.vision_pillar_1_text + ')';
        if (iconPickerTarget === 'pillar2') return 'Pilar 2 (' + data.vision_pillar_2_text + ')';
        if (iconPickerTarget === 'pillar3') return 'Pilar 3 (' + data.vision_pillar_3_text + ')';
        if (iconPickerTarget === 'pillar4') return 'Pilar 4 (' + data.vision_pillar_4_text + ')';
        if (iconPickerTarget && iconPickerTarget.startsWith('mission-')) {
            const idx = parseInt(iconPickerTarget.replace('mission-', ''), 10);
            return `Misi ${data.missions[idx]?.number || idx + 1} (${data.missions[idx]?.title || ''})`;
        }
        return 'Pilar / Misi';
    };

    // Resolved pillar icons
    const Pillar1IconComp = getIconComponent(data.vision_pillar_1_icon, Award);
    const Pillar2IconComp = getIconComponent(data.vision_pillar_2_icon, HeartPulse);
    const Pillar3IconComp = getIconComponent(data.vision_pillar_3_icon, ShieldCheck);
    const Pillar4IconComp = getIconComponent(data.vision_pillar_4_icon, UserCheck);

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* 1. Header Admin Terpadu */}
                <AdminPageHeader
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Konfigurasi Visi & Kepemimpinan' },
                    ]}
                    title="Konfigurasi Visi, Misi & Kepemimpinan"
                    description="Kelola rumusan visi resmi, 4 pilar nilai luhur, misi strategis pembangunan, dan silsilah kepemimpinan Kepala Desa dari masa ke masa."
                    actions={
                        <>
                            <a
                                href="/profil/visi-misi"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Halaman Visi Misi</span>
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
                                            <h3
                                                className={`text-xs font-bold leading-snug ${
                                                    isActive
                                                        ? 'text-red-700 dark:text-amber-400'
                                                        : 'text-zinc-900 dark:text-zinc-200'
                                                }`}
                                            >
                                                {tab.name}
                                            </h3>
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

                        {/* Petunjuk Sinkronisasi */}
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 dark:bg-zinc-900/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-400 shadow-xs">
                            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-zinc-200">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Sinkronisasi Publik</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Seluruh pembaruan visi, pilar nilai, misi strategis, dan riwayat silsilah kepala desa akan langsung tampil di halaman publik <strong>/profil/visi-misi</strong>.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Formulir Pengaturan (9 cols) */}
                    <div className="lg:col-span-9">
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs space-y-6">
                                {/* ============================================================= */}
                                {/* TAB 1: VISI & 4 PILAR NILAI                                   */}
                                {/* ============================================================= */}
                                {activeTab === 'vision' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                <Target className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <span>Rumusan Visi Resmi & 4 Pilar Nilai</span>
                                            </h3>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Atur teks visi desa dan 4 pilar nilai penopang yang tampil pada banner merah utama.
                                            </p>
                                        </div>

                                        {/* Box Banner Visi Utama (Live Preview) */}
                                        <div className="w-full rounded-xl overflow-hidden border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-xl p-5 sm:p-7 space-y-3.5 text-center relative">
                                            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-300">
                                                <Target className="h-4 w-4 text-amber-400 shrink-0 aspect-square" />
                                                <span>{data.vision_badge || 'Visi Resmi Pemerintah Desa Karangwungu'}</span>
                                            </div>

                                            <blockquote className="text-sm sm:text-base font-bold leading-relaxed text-white max-w-3xl mx-auto drop-shadow-sm">
                                                &ldquo;{data.vision_text || 'Terwujudnya Masyarakat Desa...'}&rdquo;
                                            </blockquote>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 max-w-2xl mx-auto">
                                                <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11px] font-bold text-amber-300">
                                                    <Pillar1IconComp className="h-3.5 w-3.5 text-amber-400" />
                                                    <span className="truncate">{data.vision_pillar_1_text || 'Pilar 1'}</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11px] font-bold text-amber-300">
                                                    <Pillar2IconComp className="h-3.5 w-3.5 text-amber-400" />
                                                    <span className="truncate">{data.vision_pillar_2_text || 'Pilar 2'}</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11px] font-bold text-amber-300">
                                                    <Pillar3IconComp className="h-3.5 w-3.5 text-amber-400" />
                                                    <span className="truncate">{data.vision_pillar_3_text || 'Pilar 3'}</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/15 text-[11px] font-bold text-amber-300">
                                                    <Pillar4IconComp className="h-3.5 w-3.5 text-amber-400" />
                                                    <span className="truncate">{data.vision_pillar_4_text || 'Pilar 4'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Editor Form */}
                                        <div className="space-y-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                                    Judul Badge Banner Visi
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.vision_badge}
                                                    onChange={(e) => setData('vision_badge', e.target.value)}
                                                    placeholder="Visi Resmi Pemerintah Desa Karangwungu"
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                                    Teks Utama Visi Desa
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={data.vision_text}
                                                    onChange={(e) => setData('vision_text', e.target.value)}
                                                    placeholder="Tuliskan rumusan visi desa secara lengkap..."
                                                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* 4 Pilar Nilai */}
                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                    <Award className="h-4 w-4 text-amber-500" />
                                                    <span>4 Pilar Nilai Luhur Desa</span>
                                                </h4>
                                                <span className="text-[10px] text-zinc-400">
                                                    Klik tombol icon untuk mengganti icon dari katalog
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Pilar 1 */}
                                                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                                            <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                                                            <span>Pilar Pertama</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('pillar1')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                        >
                                                            <Pillar1IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                            <span>{data.vision_pillar_1_icon || 'Award'}</span>
                                                            <span className="text-[10px] text-zinc-400 underline font-normal ml-0.5">Ubah</span>
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={data.vision_pillar_1_text}
                                                        onChange={(e) => setData('vision_pillar_1_text', e.target.value)}
                                                        placeholder="Berakhlak Mulia"
                                                        className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>

                                                {/* Pilar 2 */}
                                                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                                            <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                                                            <span>Pilar Kedua</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('pillar2')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                        >
                                                            <Pillar2IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                            <span>{data.vision_pillar_2_icon || 'HeartPulse'}</span>
                                                            <span className="text-[10px] text-zinc-400 underline font-normal ml-0.5">Ubah</span>
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={data.vision_pillar_2_text}
                                                        onChange={(e) => setData('vision_pillar_2_text', e.target.value)}
                                                        placeholder="Sehat & Bugar"
                                                        className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>

                                                {/* Pilar 3 */}
                                                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                                            <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                                                            <span>Pilar Ketiga</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('pillar3')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                        >
                                                            <Pillar3IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                            <span>{data.vision_pillar_3_icon || 'ShieldCheck'}</span>
                                                            <span className="text-[10px] text-zinc-400 underline font-normal ml-0.5">Ubah</span>
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={data.vision_pillar_3_text}
                                                        onChange={(e) => setData('vision_pillar_3_text', e.target.value)}
                                                        placeholder="Masyarakat Sejahtera"
                                                        className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>

                                                {/* Pilar 4 */}
                                                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                                            <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                                                            <span>Pilar Keempat</span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('pillar4')}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                        >
                                                            <Pillar4IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                            <span>{data.vision_pillar_4_icon || 'UserCheck'}</span>
                                                            <span className="text-[10px] text-zinc-400 underline font-normal ml-0.5">Ubah</span>
                                                        </button>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={data.vision_pillar_4_text}
                                                        onChange={(e) => setData('vision_pillar_4_text', e.target.value)}
                                                        placeholder="Demokratis & Amanah"
                                                        className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 2: MISI PEMBANGUNAN DESA                                  */}
                                {/* ============================================================= */}
                                {activeTab === 'missions' && (
                                    <div className="space-y-6">
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                    <Layers className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                    <span>Misi Strategis Pembangunan ({data.missions.length})</span>
                                                </h3>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Kelola misi strategis desa lengkap dengan pemilihan icon kategori.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleAddMission}
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-all cursor-pointer shrink-0"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Tambah Misi</span>
                                            </button>
                                        </div>

                                        {/* Missions List */}
                                        <div className="space-y-4">
                                            {data.missions.map((mission, idx) => {
                                                const IconComp = getIconComponent(mission.icon, Target);
                                                return (
                                                    <div
                                                        key={mission.id || idx}
                                                        className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-5 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                                                    >
                                                        {/* Top bar */}
                                                        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
                                                            <div className="flex items-center gap-3">
                                                                <span className="h-7 w-7 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                                    {mission.number || String(idx + 1).padStart(2, '0')}
                                                                </span>
                                                                <div>
                                                                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                                                                        {mission.title || `Misi Ke-${idx + 1}`}
                                                                    </h4>
                                                                    <span className="text-[10px] text-zinc-400">
                                                                        Kategori: {mission.category || 'Pembangunan'}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openIconPicker(`mission-${idx}`)}
                                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-red-500 hover:text-red-600 dark:hover:text-amber-400 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-all cursor-pointer shadow-2xs"
                                                                >
                                                                    <IconComp className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                                    <span>{mission.icon || 'Target'}</span>
                                                                    <span className="text-[10px] text-zinc-400 underline font-normal ml-0.5">Ubah</span>
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteMission(idx)}
                                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                                                    title="Hapus Misi"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Form Fields */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                                                            <div className="sm:col-span-4">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Kategori Misi
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={mission.category || ''}
                                                                    onChange={(e) => handleUpdateMission(idx, 'category', e.target.value)}
                                                                    placeholder="Sosial & Keagamaan"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>

                                                            <div className="sm:col-span-8">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Judul Misi
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={mission.title || ''}
                                                                    onChange={(e) => handleUpdateMission(idx, 'title', e.target.value)}
                                                                    placeholder="Kehidupan Beragama & Sosial"
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                                />
                                                            </div>

                                                            <div className="sm:col-span-12">
                                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                                    Uraian Narasi Misi
                                                                </label>
                                                                <textarea
                                                                    rows={2}
                                                                    value={mission.desc || ''}
                                                                    onChange={(e) => handleUpdateMission(idx, 'desc', e.target.value)}
                                                                    placeholder="Meningkatkan kualitas kehidupan beragama, sosial budaya..."
                                                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed font-medium"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {data.missions.length === 0 && (
                                                <div className="p-8 text-center text-xs text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
                                                    Belum ada misi terdaftar. Klik tombol "Tambah Misi" untuk menambahkan.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* ============================================================= */}
                                {/* TAB 3: SILSILAH KEPALA DESA (CLEAN TIMELINE INTERAKTIF)     */}
                                {/* ============================================================= */}
                                {activeTab === 'leaders' && (
                                    <div className="space-y-6">
                                        {/* Integrated Header Bar (Clean border-b, no detached box) */}
                                        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-4 flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                    <Crown className="h-4 w-4 text-amber-500" />
                                                    <span>Silsilah Kepala Desa ({data.leaders.length} Periode)</span>
                                                </h3>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                    Daftar riwayat estafet kepemimpinan desa. Klik pada kartu untuk membuka/menutup form detail.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2.5 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={expandedLeaders.size === data.leaders.length ? collapseAllLeaders : expandAllLeaders}
                                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs transition-colors whitespace-nowrap"
                                                >
                                                    {expandedLeaders.size === data.leaders.length ? (
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

                                                <button
                                                    type="button"
                                                    onClick={handleAddLeader}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-xs whitespace-nowrap transition-all cursor-pointer"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                    <span>Tambah Kepala Desa</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Timeline Cards List */}
                                        <div className="relative space-y-4 pt-1">
                                            {/* Continuous Vertical Timeline Line (Dead Center) */}
                                            <div className="absolute left-[14px] sm:left-[16px] top-6 bottom-6 w-0.5 bg-red-500/40 dark:bg-red-500/30 -translate-x-1/2 pointer-events-none" />

                                            {data.leaders.map((leader, idx) => {
                                                const isExpanded = expandedLeaders.has(idx);

                                                return (
                                                    <div key={leader.id || idx} className="relative flex items-start gap-3.5 sm:gap-4 group">
                                                        {/* Timeline Node Icon/Circle on the Spine (Dead Center) */}
                                                        <div
                                                            className={`shrink-0 mt-3.5 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
                                                                leader.isCurrent
                                                                    ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-zinc-950 ring-4 ring-amber-400/30 font-black'
                                                                    : 'bg-gradient-to-br from-red-700 via-red-800 to-red-950 border border-red-500/60 text-amber-300 font-bold'
                                                            }`}
                                                        >
                                                            <span className="text-xs leading-none font-bold">
                                                                {leader.order}
                                                            </span>
                                                        </div>

                                                        {/* Main Leader Card */}
                                                        <div
                                                            className={`flex-1 min-w-0 rounded-xl border transition-all duration-200 overflow-hidden shadow-xs ${
                                                                leader.isCurrent
                                                                    ? 'border-amber-400/70 dark:border-amber-400/60 bg-white dark:bg-zinc-950 shadow-md shadow-amber-500/5'
                                                                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                            }`}
                                                        >
                                                            {/* Summary Header Bar (Clickable) */}
                                                            <div
                                                                onClick={() => toggleLeaderExpand(idx)}
                                                                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                                                                    leader.isCurrent
                                                                        ? 'bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/30'
                                                                        : 'hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                                                                }`}
                                                            >
                                                                {/* Left: Rank, Name & Role */}
                                                                <div className="flex items-center gap-3 min-w-0">
                                                                    <div className="min-w-0">
                                                                        <div className="flex items-center gap-2">
                                                                            <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                                                                                {leader.name || 'Nama Kepala Desa (Belum Diisi)'}
                                                                            </h4>
                                                                            {leader.isCurrent && (
                                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-bold shrink-0">
                                                                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                                                    <span>Menjabat Aktif</span>
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                                                            {leader.role || `Kepala Desa Ke-${leader.order}`}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Right: Period Pill & Controls */}
                                                                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                                                        <Calendar className="h-3 w-3 text-zinc-400" />
                                                                        <span>{leader.period || 'Periode Jabatan'}</span>
                                                                    </span>

                                                                    {/* Move Up / Down Buttons */}
                                                                    <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700 shadow-2xs" onClick={(e) => e.stopPropagation()}>
                                                                        <button
                                                                            type="button"
                                                                            disabled={idx === 0}
                                                                            onClick={() => handleMoveLeader(idx, -1)}
                                                                            className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 disabled:opacity-25 transition-colors cursor-pointer"
                                                                            title="Geser Ke Atas"
                                                                        >
                                                                            <ArrowUp className="h-3.5 w-3.5" />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            disabled={idx === data.leaders.length - 1}
                                                                            onClick={() => handleMoveLeader(idx, 1)}
                                                                            className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 disabled:opacity-25 transition-colors cursor-pointer"
                                                                            title="Geser Ke Bawah"
                                                                        >
                                                                            <ArrowDown className="h-3.5 w-3.5" />
                                                                        </button>
                                                                    </div>

                                                                    {/* Expand Toggle */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleLeaderExpand(idx);
                                                                        }}
                                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                                                                    >
                                                                        {isExpanded ? (
                                                                            <ChevronUp className="h-4 w-4" />
                                                                        ) : (
                                                                            <ChevronDown className="h-4 w-4" />
                                                                        )}
                                                                    </button>

                                                                    {/* Delete Button */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDeleteLeader(idx);
                                                                        }}
                                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                                                                        title="Hapus Kepala Desa"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Expandable Form Body */}
                                                            {isExpanded && (
                                                                <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 space-y-4 animate-in fade-in duration-150">
                                                                    {/* Row 1: Nama & Periode (Spacious 2-column) */}
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                                                                                <User className="h-3.5 w-3.5 text-zinc-400" />
                                                                                <span>Nama Lengkap Kepala Desa</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={leader.name}
                                                                                onChange={(e) => handleUpdateLeader(idx, 'name', e.target.value)}
                                                                                placeholder="Contoh: Sunarto"
                                                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-red-500/20"
                                                                            />
                                                                        </div>

                                                                        <div>
                                                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                                                                                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                                                                <span>Periode Masa Jabatan</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={leader.period}
                                                                                onChange={(e) => handleUpdateLeader(idx, 'period', e.target.value)}
                                                                                placeholder="Contoh: 2020 – 2026 atau Seumur Hidup"
                                                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-red-500/20"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {/* Row 2: Jabatan & Nomor Urut */}
                                                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                                                                        <div className="sm:col-span-8">
                                                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                                                                                <Landmark className="h-3.5 w-3.5 text-zinc-400" />
                                                                                <span>Keterangan Jabatan</span>
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                value={leader.role}
                                                                                onChange={(e) => handleUpdateLeader(idx, 'role', e.target.value)}
                                                                                placeholder="Contoh: Kepala Desa Ke-8 (Periode II)"
                                                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium focus:ring-2 focus:ring-red-500/20"
                                                                            />
                                                                        </div>

                                                                        <div className="sm:col-span-4">
                                                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                                                                                <Hash className="h-3.5 w-3.5 text-zinc-400" />
                                                                                <span>Nomor Urut</span>
                                                                            </label>
                                                                            <input
                                                                                type="number"
                                                                                value={leader.order}
                                                                                onChange={(e) => handleUpdateLeader(idx, 'order', parseInt(e.target.value, 10) || 1)}
                                                                                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-red-500/20"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {/* Row 3: Status Menjabat Aktif Toggle Card */}
                                                                    <div>
                                                                        <div
                                                                            onClick={() => handleUpdateLeader(idx, 'isCurrent', !leader.isCurrent)}
                                                                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                                                                leader.isCurrent
                                                                                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-900 dark:text-amber-300'
                                                                                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                                            }`}
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div
                                                                                    className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                                                                                        leader.isCurrent
                                                                                            ? 'bg-amber-500 text-zinc-950 shadow-xs'
                                                                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
                                                                                    }`}
                                                                                >
                                                                                    {leader.isCurrent ? <Check className="h-4 w-4 stroke-[3]" /> : <Clock className="h-4 w-4" />}
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-xs font-bold block">
                                                                                        {leader.isCurrent
                                                                                            ? 'Status: Kepala Desa Menjabat Aktif'
                                                                                            : 'Status: Masa Pengabdian Selesai'}
                                                                                    </span>
                                                                                    <span className="text-[11px] opacity-80 block mt-0.5">
                                                                                        {leader.isCurrent
                                                                                            ? 'Akan disematkan badge khusus emas "Menjabat Aktif" di halaman publik'
                                                                                            : 'Tercatat dalam rekam jejak kepemimpinan historis desa'}
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                                                                                leader.isCurrent ? 'bg-amber-500 justify-end' : 'bg-zinc-300 dark:bg-zinc-700 justify-start'
                                                                            }`}>
                                                                                <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Row 4: Uraian Singkat Dedikasi */}
                                                                    <div>
                                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                                                            Uraian Singkat Dedikasi, Rekam Jejak & Sejarah Pengabdian
                                                                        </label>
                                                                        <textarea
                                                                            rows={3}
                                                                            value={leader.desc || ''}
                                                                            onChange={(e) => handleUpdateLeader(idx, 'desc', e.target.value)}
                                                                            placeholder="Tuliskan catatan dedikasi kepemimpinan, program terobosan, atau tonggak sejarah pada masa kepemimpinan ini..."
                                                                            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 leading-relaxed font-medium focus:ring-2 focus:ring-red-500/20"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {data.leaders.length === 0 && (
                                                <div className="p-8 text-center text-xs text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl">
                                                    Belum ada data riwayat kepala desa. Klik tombol "Tambah Kepala Desa" untuk menambahkan.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* MODAL VISUAL ICON PICKER LENGKAP                                          */}
            {/* ========================================================================= */}
            {iconPickerTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                            <div>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Pilih Icon untuk {getModalTargetLabel()}</span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Pilih icon dari katalog referensi yang tersedia atau gunakan kotak pencarian.
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

                        {/* Search & Category Filter */}
                        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                <input
                                    type="text"
                                    value={iconSearch}
                                    onChange={(e) => setIconSearch(e.target.value)}
                                    placeholder="Cari icon (misal: target, bintang, hati, penghargaan, bangunan, pendidikan...)"
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500/20"
                                    autoFocus
                                />
                            </div>

                            {/* Category Pills */}
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

                        {/* Icon Grid */}
                        <div className="p-4 overflow-y-auto max-h-[50vh]">
                            {iconEntries.length === 0 ? (
                                <div className="p-8 text-center text-xs text-zinc-400">
                                    Tidak ditemukan icon yang cocok dengan pencarian "{iconSearch}".
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {iconEntries.map(([iconKey, item]) => {
                                        const Comp = item.icon;
                                        let isCurrent = false;
                                        if (iconPickerTarget === 'pillar1') isCurrent = data.vision_pillar_1_icon === iconKey;
                                        else if (iconPickerTarget === 'pillar2') isCurrent = data.vision_pillar_2_icon === iconKey;
                                        else if (iconPickerTarget === 'pillar3') isCurrent = data.vision_pillar_3_icon === iconKey;
                                        else if (iconPickerTarget === 'pillar4') isCurrent = data.vision_pillar_4_icon === iconKey;
                                        else if (iconPickerTarget && iconPickerTarget.startsWith('mission-')) {
                                            const idx = parseInt(iconPickerTarget.replace('mission-', ''), 10);
                                            isCurrent = data.missions[idx]?.icon === iconKey;
                                        }

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

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIconPickerTarget(null)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
