import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import {
    Users,
    Layers,
    Briefcase,
    Activity,
    GraduationCap,
    Save,
    ExternalLink,
    Info,
    Plus,
    Trash2,
    Search,
    X,
    Sparkles,
    CheckCircle2,
    PieChart,
    BarChart3,
    Wheat,
    Fish,
    Home,
    Building2,
    Store,
    Landmark,
    Award,
    Shield,
    TrendingUp,
    Scale,
    RefreshCw,
    Calculator,
} from 'lucide-react';
import { ICON_REGISTRY, getIconComponent } from '@/Utils/iconRegistry';

export default function DemographicsSettings({ settings = {} }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // 5 Tab Utama
    const [activeTab, setActiveTab] = useState('agregat');

    // Parse list data from settings
    let initialLandUse = [];
    if (settings.land_use_list_data && Array.isArray(settings.land_use_list_data)) {
        initialLandUse = settings.land_use_list_data;
    } else if (settings.land_use_list && typeof settings.land_use_list === 'string') {
        try {
            initialLandUse = JSON.parse(settings.land_use_list);
        } catch (e) {
            initialLandUse = [];
        }
    }

    let initialProfessions = [];
    if (settings.professions_list_data && Array.isArray(settings.professions_list_data)) {
        initialProfessions = settings.professions_list_data;
    } else if (settings.professions_list && typeof settings.professions_list === 'string') {
        try {
            initialProfessions = JSON.parse(settings.professions_list);
        } catch (e) {
            initialProfessions = [];
        }
    }

    let initialAgeGroups = [];
    if (settings.age_groups_list_data && Array.isArray(settings.age_groups_list_data)) {
        initialAgeGroups = settings.age_groups_list_data;
    } else if (settings.age_groups_list && typeof settings.age_groups_list === 'string') {
        try {
            initialAgeGroups = JSON.parse(settings.age_groups_list);
        } catch (e) {
            initialAgeGroups = [];
        }
    }

    let initialEducation = [];
    if (settings.education_list_data && Array.isArray(settings.education_list_data)) {
        initialEducation = settings.education_list_data;
    } else if (settings.education_list && typeof settings.education_list === 'string') {
        try {
            initialEducation = JSON.parse(settings.education_list);
        } catch (e) {
            initialEducation = [];
        }
    }

    const { data, setData, post, processing } = useForm({
        // 1. Agregat Pokok
        total_citizens: settings.total_citizens || 3482,
        male_citizens: settings.male_citizens || 1724,
        female_citizens: settings.female_citizens || 1758,
        total_families: settings.total_families || 985,
        productive_age_count: settings.productive_age_count || 2380,
        productive_age_percent: settings.productive_age_percent || 68.3,
        area_ha: settings.area_ha || 123,
        density: settings.density || 2830,

        // 2. Tata Guna Lahan
        land_use_title: settings.land_use_title || 'Tata Guna Lahan & Luas Wilayah',
        land_use_subtitle:
            settings.land_use_subtitle ||
            'Distribusi pemanfaatan ruang dan peruntukan wilayah desa seluas 123 Ha (1,23 km²)',
        land_use_list: initialLandUse,

        // 3. Mata Pencaharian
        professions_title: settings.professions_title || 'Mata Pencaharian Utama Warga',
        professions_subtitle:
            settings.professions_subtitle || 'Distribusi sektor pekerjaan masyarakat Desa Karangwungu',
        professions_list: initialProfessions,

        // 4. Struktur Kelompok Usia
        age_groups_title:
            settings.age_groups_title || 'Struktur Penduduk Berdasarkan Kelompok Usia',
        age_groups_subtitle:
            settings.age_groups_subtitle || 'Komposisi kelompok usia dan proporsi gender warga desa',
        age_groups_list: initialAgeGroups,

        // 5. Tingkat Pendidikan
        education_title:
            settings.education_title || 'Tingkat Pendidikan Terakhir Masyarakat',
        education_subtitle:
            settings.education_subtitle || 'Jenjang pendidikan formal penduduk usia sekolah ke atas',
        education_list: initialEducation,
    });

    // Modal Icon Picker State: null | { type: 'land_use' | 'profession', index: number }
    const [iconPickerTarget, setIconPickerTarget] = useState(null);
    const [iconSearch, setIconSearch] = useState('');
    const [iconCategoryFilter, setIconCategoryFilter] = useState('all');

    const openIconPicker = (type, index) => {
        setIconPickerTarget({ type, index });
        setIconSearch('');
        setIconCategoryFilter('all');
    };

    const handleSelectIcon = (iconKey) => {
        if (!iconPickerTarget) return;
        const { type, index } = iconPickerTarget;
        if (type === 'land_use') {
            const updated = [...data.land_use_list];
            if (updated[index]) {
                updated[index].icon = iconKey;
                setData('land_use_list', updated);
            }
        } else if (type === 'profession') {
            const updated = [...data.professions_list];
            if (updated[index]) {
                updated[index].icon = iconKey;
                setData('professions_list', updated);
            }
        }
        setIconPickerTarget(null);
    };

    // Calculate gender percentages live
    const totalPop = Number(data.total_citizens) || 1;
    const maleCount = Number(data.male_citizens) || 0;
    const femaleCount = Number(data.female_citizens) || 0;
    const malePercent = ((maleCount / totalPop) * 100).toFixed(1);
    const femalePercent = ((femaleCount / totalPop) * 100).toFixed(1);
    const avgPerFamily = (totalPop / (Number(data.total_families) || 1)).toFixed(1);

    // Calculate Land Use totals and percentage auto-calculator
    const totalAreaHa = Number(data.area_ha) > 0 ? Number(data.area_ha) : 123;
    const sumLandAreaHa = data.land_use_list.reduce((acc, curr) => acc + (Number(curr.area_ha) || 0), 0);
    const sumLandPercent = data.land_use_list.reduce((acc, curr) => acc + (Number(curr.percent) || 0), 0).toFixed(1);

    // Recompute all land percentages based on totalAreaHa
    const recalculateAllLandPercentages = (customTotal = null) => {
        const target = Number(customTotal ?? data.area_ha) || sumLandAreaHa || 123;
        const recalculated = data.land_use_list.map((item) => {
            const aVal = Number(item.area_ha) || 0;
            const pVal = Number(((aVal / target) * 100).toFixed(1));
            let newBadge = item.badge;
            if (newBadge && newBadge.includes('%')) {
                newBadge = newBadge.replace(/\([\d.,]+%\)/, `(${pVal.toString().replace('.', ',')}%)`);
            }
            return {
                ...item,
                percent: pVal,
                badge: newBadge,
            };
        });
        setData((prev) => ({
            ...prev,
            land_use_list: recalculated,
        }));
    };

    // Handler when user updates total land area (data.area_ha)
    const handleTotalAreaChange = (newTotal) => {
        const target = Number(newTotal) || 0;
        if (target > 0) {
            const recalculated = data.land_use_list.map((item) => {
                const aVal = Number(item.area_ha) || 0;
                const pVal = Number(((aVal / target) * 100).toFixed(1));
                let newBadge = item.badge;
                if (newBadge && newBadge.includes('%')) {
                    newBadge = newBadge.replace(/\([\d.,]+%\)/, `(${pVal.toString().replace('.', ',')}%)`);
                }
                return {
                    ...item,
                    percent: pVal,
                    badge: newBadge,
                };
            });
            setData((prev) => ({
                ...prev,
                area_ha: newTotal,
                land_use_list: recalculated,
                land_use_subtitle: `Distribusi pemanfaatan ruang dan peruntukan wilayah desa seluas ${newTotal} Ha (${(target / 100).toFixed(2).replace('.', ',')} km²)`,
            }));
        } else {
            setData('area_ha', newTotal);
        }
    };

    // Handler when user updates productive age count (auto calculates percentage)
    const handleProductiveAgeCountChange = (val) => {
        const count = Number(val) || 0;
        const total = Number(data.total_citizens) || 1;
        const percent = total > 0 ? Number(((count / total) * 100).toFixed(1)) : 0;
        setData((prev) => ({
            ...prev,
            productive_age_count: val,
            productive_age_percent: percent,
        }));
    };

    // Handler when user updates total citizens (recalculates all population-based percentages)
    const handleTotalCitizensChange = (newTotal, extraFields = {}) => {
        const total = Number(newTotal) || 0;
        const prodCount = Number(data.productive_age_count) || 0;
        const prodPercent = total > 0 ? Number(((prodCount / total) * 100).toFixed(1)) : 0;

        const recalculatedProfessions = data.professions_list.map((item) => ({
            ...item,
            percent: total > 0 ? Number(((Number(item.count || 0) / total) * 100).toFixed(1)) : item.percent,
        }));

        const recalculatedAgeGroups = data.age_groups_list.map((item) => ({
            ...item,
            percent: total > 0 ? Number(((Number(item.count || 0) / total) * 100).toFixed(1)) : item.percent,
        }));

        const recalculatedEducation = data.education_list.map((item) => ({
            ...item,
            percent: total > 0 ? Number(((Number(item.count || 0) / total) * 100).toFixed(1)) : item.percent,
        }));

        setData((prev) => ({
            ...prev,
            ...extraFields,
            total_citizens: newTotal,
            productive_age_percent: prodPercent,
            professions_list: recalculatedProfessions,
            age_groups_list: recalculatedAgeGroups,
            education_list: recalculatedEducation,
        }));
    };

    // Handler when user updates male or female count (auto calculates total & all percentages)
    const handleGenderChange = (type, val) => {
        const male = type === 'male' ? Number(val) || 0 : Number(data.male_citizens) || 0;
        const female = type === 'female' ? Number(val) || 0 : Number(data.female_citizens) || 0;
        const newTotal = male + female;

        handleTotalCitizensChange(newTotal, {
            male_citizens: type === 'male' ? val : data.male_citizens,
            female_citizens: type === 'female' ? val : data.female_citizens,
        });
    };

    // Form Submit
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        post(`/${adminPath}/settings/demographics`, {
            preserveScroll: true,
        });
    };

    // Handlers for Land Use
    const handleAddLandUse = () => {
        const defaultArea = 10;
        const calcPercent = totalAreaHa > 0 ? Number(((defaultArea / totalAreaHa) * 100).toFixed(1)) : 8.0;
        const newItem = {
            category: 'Kategori Lahan Baru',
            area_ha: defaultArea,
            percent: calcPercent,
            badge: `Porsi (${calcPercent.toString().replace('.', ',')}%)`,
            desc: 'Keterangan pemanfaatan lahan dan komoditas peruntukan wilayah.',
            icon: 'Layers',
        };
        setData('land_use_list', [...data.land_use_list, newItem]);
    };

    const handleUpdateLandUse = (index, field, value) => {
        const updated = [...data.land_use_list];
        updated[index][field] = value;

        // Auto calculate percentage when area_ha is updated
        if (field === 'area_ha') {
            const areaVal = Number(value) || 0;
            const target = Number(data.area_ha) > 0 ? Number(data.area_ha) : 123;
            const calcPercent = target > 0 ? Number(((areaVal / target) * 100).toFixed(1)) : 0;
            updated[index].percent = calcPercent;

            if (updated[index].badge && updated[index].badge.includes('%')) {
                updated[index].badge = updated[index].badge.replace(
                    /\([\d.,]+%\)/,
                    `(${calcPercent.toString().replace('.', ',')}%)`
                );
            }
        }

        setData('land_use_list', updated);
    };

    const handleDeleteLandUse = (index) => {
        if (confirm('Hapus kartu tata guna lahan ini?')) {
            setData(
                'land_use_list',
                data.land_use_list.filter((_, i) => i !== index)
            );
        }
    };

    // Handlers for Professions
    const handleAddProfession = () => {
        const countVal = 100;
        const calcPercent = totalPop > 0 ? Number(((countVal / totalPop) * 100).toFixed(1)) : 2.9;
        const newItem = {
            label: 'Sektor Profesi Baru',
            count: countVal,
            percent: calcPercent,
            icon: 'Briefcase',
        };
        setData('professions_list', [...data.professions_list, newItem]);
    };

    const handleUpdateProfession = (index, field, value) => {
        const updated = [...data.professions_list];
        updated[index][field] = value;

        // Auto calculate percentage when count is updated
        if (field === 'count') {
            const countVal = Number(value) || 0;
            if (totalPop > 0) {
                updated[index].percent = Number(((countVal / totalPop) * 100).toFixed(1));
            }
        }

        setData('professions_list', updated);
    };

    const handleDeleteProfession = (index) => {
        if (confirm('Hapus sektor pekerjaan ini?')) {
            setData(
                'professions_list',
                data.professions_list.filter((_, i) => i !== index)
            );
        }
    };

    // Handlers for Age Groups
    const handleAddAgeGroup = () => {
        const newItem = {
            label: 'Kelompok Usia Baru',
            male: 50,
            female: 50,
            count: 100,
            percent: 2.9,
        };
        setData('age_groups_list', [...data.age_groups_list, newItem]);
    };

    const handleUpdateAgeGroup = (index, field, value) => {
        const updated = [...data.age_groups_list];
        updated[index][field] = value;
        if (field === 'male' || field === 'female') {
            const m = Number(field === 'male' ? value : updated[index].male) || 0;
            const f = Number(field === 'female' ? value : updated[index].female) || 0;
            updated[index].count = m + f;
            if (totalPop > 0) {
                updated[index].percent = Number(((updated[index].count / totalPop) * 100).toFixed(1));
            }
        }
        setData('age_groups_list', updated);
    };

    const handleDeleteAgeGroup = (index) => {
        if (confirm('Hapus kelompok usia ini?')) {
            setData(
                'age_groups_list',
                data.age_groups_list.filter((_, i) => i !== index)
            );
        }
    };

    // Handlers for Education
    const handleAddEducation = () => {
        const newItem = {
            label: 'Jenjang Pendidikan Baru',
            count: 150,
            percent: 4.3,
        };
        setData('education_list', [...data.education_list, newItem]);
    };

    const handleUpdateEducation = (index, field, value) => {
        const updated = [...data.education_list];
        updated[index][field] = value;

        // Auto calculate percentage when count is updated
        if (field === 'count') {
            const countVal = Number(value) || 0;
            if (totalPop > 0) {
                updated[index].percent = Number(((countVal / totalPop) * 100).toFixed(1));
            }
        }

        setData('education_list', updated);
    };

    const handleDeleteEducation = (index) => {
        if (confirm('Hapus data pendidikan ini?')) {
            setData(
                'education_list',
                data.education_list.filter((_, i) => i !== index)
            );
        }
    };

    // Tabs definition
    const tabs = [
        {
            id: 'agregat',
            name: 'Agregat Pokok',
            desc: 'Total jiwa, gender, KK & usia kerja',
            icon: Users,
            badge: `${totalPop.toLocaleString('id-ID')} Jiwa`,
        },
        {
            id: 'lahan',
            name: 'Tata Guna Lahan',
            desc: 'Sawah, kebun, tambak & pemukiman',
            icon: Layers,
            badge: `${data.land_use_list.length} Sektor`,
        },
        {
            id: 'profesi',
            name: 'Mata Pencaharian',
            desc: 'Distribusi profesi dan mata pencaharian',
            icon: Briefcase,
            badge: `${data.professions_list.length} Profesi`,
        },
        {
            id: 'usia',
            name: 'Kelompok Usia',
            desc: 'Piramida penduduk & sebaran gender',
            icon: Activity,
            badge: `${data.age_groups_list.length} Kelompok`,
        },
        {
            id: 'pendidikan',
            name: 'Tingkat Pendidikan',
            desc: 'Jenjang sekolah masyarakat desa',
            icon: GraduationCap,
            badge: `${data.education_list.length} Jenjang`,
        },
    ];

    // Filtered icons for Icon Picker
    const iconCategories = ['all', ...Array.from(new Set(Object.values(ICON_REGISTRY).map((i) => i.category)))];
    const iconEntries = Object.entries(ICON_REGISTRY).filter(([key, item]) => {
        const matchCategory = iconCategoryFilter === 'all' || item.category === iconCategoryFilter;
        const matchSearch =
            !iconSearch ||
            key.toLowerCase().includes(iconSearch.toLowerCase()) ||
            item.label.toLowerCase().includes(iconSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* 1. Header Admin Terpadu */}
                <AdminPageHeader
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Konfigurasi Demografi' },
                    ]}
                    title="Konfigurasi Demografi & Statistik Kependudukan"
                    description="Kelola data agregat kependudukan, tata guna lahan, mata pencaharian, struktur usia, dan tingkat pendidikan masyarakat Desa Karangwungu."
                    actions={
                        <>
                            <a
                                href="/profil/demografi"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-2xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Halaman Publik</span>
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
                    {/* SISI KIRI: Navigasi Tab (3 cols) */}
                    <div className="lg:col-span-3 space-y-3 lg:sticky lg:top-20">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-2 space-y-1 shadow-xs">
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                                Seksi Demografi
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
                                                <span
                                                    className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-bold ${
                                                        isActive
                                                            ? 'bg-red-600/15 text-red-700 dark:text-amber-400'
                                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                                                    }`}
                                                >
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

                        {/* Petunjuk Live Auto-Calc */}
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 dark:bg-zinc-900/60 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-400 shadow-xs">
                            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-zinc-200">
                                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                                <span>Kalkulasi Otomatis</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Sistem menghitung rasio gender dan rata-rata jiwa per KK secara langsung. Anda dapat menambah, mengubah, atau menghapus kartu pada setiap seksi.
                            </p>
                        </div>
                    </div>

                    {/* SISI KANAN: Konten Kartu-Kartu Konfigurasi (9 cols) */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* ========================================================================= */}
                        {/* TAB 1: AGREGAT POKOK KEPENDUDUKAN                                         */}
                        {/* ========================================================================= */}
                        {activeTab === 'agregat' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs">
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <Users className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                            Indikator Pokok Demografi Desa
                                        </h3>
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
                                        Data agregat kependudukan utama yang tampil pada kartu KPI paling atas di beranda dan halaman profil.
                                    </p>

                                    {/* Preview 4 KPI Cards (Matching Public) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-6">
                                        <div className="p-4 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-md space-y-1">
                                            <span className="text-[11px] font-semibold text-red-200">Total Penduduk</span>
                                            <p className="text-2xl font-black text-white">
                                                {Number(data.total_citizens).toLocaleString('id-ID')}
                                            </p>
                                            <span className="text-[10px] text-amber-300 font-semibold block">
                                                Jiwa Terdaftar di Desa
                                            </span>
                                        </div>

                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-semibold text-zinc-500">Komposisi Gender</span>
                                                <span className="text-[10px] font-bold text-red-600 dark:text-amber-400">
                                                    {malePercent}% : {femalePercent}%
                                                </span>
                                            </div>
                                            <div className="flex items-baseline justify-between text-xs pt-1">
                                                <div>
                                                    <span className="text-[10px] text-zinc-400 block">Laki-Laki</span>
                                                    <span className="font-bold text-zinc-900 dark:text-white">
                                                        {Number(data.male_citizens).toLocaleString('id-ID')} ({malePercent}%)
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] text-zinc-400 block">Perempuan</span>
                                                    <span className="font-bold text-zinc-900 dark:text-white">
                                                        {Number(data.female_citizens).toLocaleString('id-ID')} ({femalePercent}%)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-1">
                                            <span className="text-[11px] font-semibold text-zinc-500">Kepala Keluarga (KK)</span>
                                            <p className="text-2xl font-black text-zinc-900 dark:text-white">
                                                {Number(data.total_families).toLocaleString('id-ID')}
                                            </p>
                                            <span className="text-[10px] text-zinc-500 block">
                                                Rata-rata {avgPerFamily} Jiwa per KK
                                            </span>
                                        </div>

                                        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-1">
                                            <span className="text-[11px] font-semibold text-zinc-500">Usia Produktif</span>
                                            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                                {data.productive_age_percent}%
                                            </p>
                                            <span className="text-[10px] text-zinc-500 block">
                                                {Number(data.productive_age_count).toLocaleString('id-ID')} Jiwa (15–64 Th)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Inputs Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Total Penduduk (Jiwa) *
                                            </label>
                                            <input
                                                type="number"
                                                value={data.total_citizens}
                                                onChange={(e) => handleTotalCitizensChange(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-bold text-zinc-900 dark:text-white"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Jumlah Laki-Laki (Jiwa) *
                                            </label>
                                            <input
                                                type="number"
                                                value={data.male_citizens}
                                                onChange={(e) => handleGenderChange('male', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Jumlah Perempuan (Jiwa) *
                                            </label>
                                            <input
                                                type="number"
                                                value={data.female_citizens}
                                                onChange={(e) => handleGenderChange('female', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Kepala Keluarga (KK) *
                                            </label>
                                            <input
                                                type="number"
                                                value={data.total_families}
                                                onChange={(e) => setData('total_families', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Jumlah Usia Produktif (Jiwa)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.productive_age_count}
                                                onChange={(e) => handleProductiveAgeCountChange(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                                                    Persentase Usia Produktif (%)
                                                </label>
                                                <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                                    Dihitung Otomatis
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={data.productive_age_percent}
                                                    onChange={(e) => setData('productive_age_percent', e.target.value)}
                                                    className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/70 text-xs font-black text-emerald-600 dark:text-emerald-400"
                                                    title="Dihitung otomatis: (Jumlah Usia Produktif ÷ Total Penduduk) × 100%"
                                                />
                                                <span className="text-xs font-bold text-zinc-500">%</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Total Luas Wilayah (Hektar / Ha)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={data.area_ha}
                                                onChange={(e) => handleTotalAreaChange(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Kepadatan Penduduk (Jiwa/km²)
                                            </label>
                                            <input
                                                type="number"
                                                value={data.density}
                                                onChange={(e) => setData('density', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* TAB 2: TATA GUNA LAHAN & LUAS WILAYAH (CARDS GRID)                        */}
                        {/* ========================================================================= */}
                        {activeTab === 'lahan' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Layers className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                    Tata Guna Lahan & Luas Wilayah
                                                </h3>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Distribusi peruntukan ruang wilayah desa (Total 123 Ha).
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddLandUse}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Tambah Kartu Lahan</span>
                                        </button>
                                    </div>

                                    {/* Judul & Subtitle Seksi */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Judul Seksi Lahan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.land_use_title}
                                                onChange={(e) => setData('land_use_title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Subtitle / Keterangan Total
                                            </label>
                                            <input
                                                type="text"
                                                value={data.land_use_subtitle}
                                                onChange={(e) => setData('land_use_subtitle', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>

                                    {/* Status Bar: Kalkulasi Otomatis Berdasarkan Total Luas Lahan */}
                                    <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/90 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div>
                                                <span className="block text-[10px] font-bold text-zinc-400 uppercase">
                                                    Dasar Total Luas Desa
                                                </span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={data.area_ha}
                                                        onChange={(e) => handleTotalAreaChange(e.target.value)}
                                                        className="w-20 px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-black text-zinc-900 dark:text-white text-xs"
                                                    />
                                                    <span className="font-bold text-zinc-600 dark:text-zinc-400">Ha</span>
                                                </div>
                                            </div>

                                            <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

                                            <div>
                                                <span className="block text-[10px] font-bold text-zinc-400 uppercase">
                                                    Akumulasi Kartu Lahan
                                                </span>
                                                <span className="text-xs font-black text-zinc-900 dark:text-white mt-0.5 block">
                                                    {sumLandAreaHa.toFixed(1)} Ha{' '}
                                                    <span
                                                        className={`text-[11px] font-bold ${
                                                            Math.abs(Number(sumLandPercent) - 100) < 0.2
                                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                                : 'text-amber-600 dark:text-amber-400'
                                                        }`}
                                                    >
                                                        ({sumLandPercent}%)
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => recalculateAllLandPercentages()}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold transition-all shadow-2xs self-start sm:self-center cursor-pointer"
                                            title="Hitung ulang semua persen otomatis: (Luas Kartu ÷ Total Luas) × 100%"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                            <span>Hitung Ulang Semua Persen</span>
                                        </button>
                                    </div>
                                </div>

                                {/* CARDS GRID FOR LAND USE */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.land_use_list.map((item, idx) => {
                                        const IconComp = getIconComponent(item.icon, Layers);

                                        return (
                                            <div
                                                key={idx}
                                                className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                                            >
                                                {/* Card Header */}
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('land_use', idx)}
                                                            className="h-11 w-11 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                                            title="Klik untuk ganti icon"
                                                        >
                                                            <IconComp className="h-5 w-5" />
                                                        </button>
                                                        <div className="min-w-0">
                                                            <input
                                                                type="text"
                                                                value={item.category}
                                                                onChange={(e) => handleUpdateLandUse(idx, 'category', e.target.value)}
                                                                placeholder="Nama Kategori Lahan"
                                                                className="font-bold text-sm text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-red-500 w-full outline-hidden"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={item.badge || ''}
                                                                onChange={(e) => handleUpdateLandUse(idx, 'badge', e.target.value)}
                                                                placeholder="Badge (cth: Lahan Terluas 56,9%)"
                                                                className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-red-500 w-full outline-hidden"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteLandUse(idx)}
                                                        className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                                                        title="Hapus Kartu Lahan"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Stats numbers row */}
                                                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                                                    <div>
                                                        <span className="block text-[10px] font-bold text-zinc-400 uppercase">Luas (Hektar)</span>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <input
                                                                type="number"
                                                                step="0.1"
                                                                value={item.area_ha}
                                                                onChange={(e) => handleUpdateLandUse(idx, 'area_ha', e.target.value)}
                                                                className="w-20 px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-black text-zinc-900 dark:text-white"
                                                            />
                                                            <span className="text-xs font-bold text-zinc-500">Ha</span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="block text-[10px] font-bold text-zinc-400 uppercase">Porsi Wilayah</span>
                                                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/60">
                                                                Otomatis
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <input
                                                                type="number"
                                                                step="0.1"
                                                                value={item.percent}
                                                                onChange={(e) => handleUpdateLandUse(idx, 'percent', e.target.value)}
                                                                className="w-20 px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/70 text-sm font-black text-red-600 dark:text-amber-400"
                                                                title="Dihitung otomatis: (Luas Kartu ÷ Total Luas Lahan) × 100%"
                                                            />
                                                            <span className="text-xs font-bold text-zinc-500">%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Deskripsi */}
                                                <div>
                                                    <label className="block text-[10px] font-bold text-zinc-400 mb-1">
                                                        Uraian Komoditas & Pemanfaatan:
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        value={item.desc || ''}
                                                        onChange={(e) => handleUpdateLandUse(idx, 'desc', e.target.value)}
                                                        placeholder="Komoditas utama padi sawah, palawija..."
                                                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* TAB 3: MATA PENCAHARIAN UTAMA WARGA (CARDS GRID)                          */}
                        {/* ========================================================================= */}
                        {activeTab === 'profesi' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                    Mata Pencaharian Utama Warga
                                                </h3>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Distribusi sektor pekerjaan masyarakat Desa Karangwungu.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddProfession}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Tambah Sektor Profesi</span>
                                        </button>
                                    </div>

                                    {/* Judul & Subtitle Seksi */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Judul Seksi Profesi
                                            </label>
                                            <input
                                                type="text"
                                                value={data.professions_title}
                                                onChange={(e) => setData('professions_title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Subtitle Keterangan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.professions_subtitle}
                                                onChange={(e) => setData('professions_subtitle', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CARDS GRID FOR PROFESSIONS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {data.professions_list.map((item, idx) => {
                                        const IconComp = getIconComponent(item.icon, Briefcase);

                                        return (
                                            <div
                                                key={idx}
                                                className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => openIconPicker('profession', idx)}
                                                            className="h-9 w-9 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                                                            title="Ganti Icon"
                                                        >
                                                            <IconComp className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={item.label}
                                                            onChange={(e) => handleUpdateProfession(idx, 'label', e.target.value)}
                                                            placeholder="Nama Sektor Profesi"
                                                            className="font-bold text-xs text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-red-500 w-full outline-hidden"
                                                        />
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteProfession(idx)}
                                                        className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                                    <div>
                                                        <span className="block text-[9px] font-bold text-zinc-400 uppercase">Jumlah Orang</span>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <input
                                                                type="number"
                                                                value={item.count}
                                                                onChange={(e) => handleUpdateProfession(idx, 'count', e.target.value)}
                                                                className="w-full px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-black text-zinc-900 dark:text-white"
                                                            />
                                                            <span className="text-[10px] text-zinc-400">Org</span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="block text-[9px] font-bold text-zinc-400 uppercase">Persentase</span>
                                                            <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded border border-emerald-200 dark:border-emerald-800/60">
                                                                Otomatis
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <input
                                                                type="number"
                                                                step="0.1"
                                                                value={item.percent}
                                                                onChange={(e) => handleUpdateProfession(idx, 'percent', e.target.value)}
                                                                className="w-full px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/70 text-xs font-black text-amber-600 dark:text-amber-400"
                                                                title="Dihitung otomatis: (Jumlah Orang ÷ Total Penduduk) × 100%"
                                                            />
                                                            <span className="text-[10px] text-zinc-400">%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Visual Bar Preview */}
                                                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-red-600 dark:bg-amber-400 h-full rounded-full transition-all"
                                                        style={{ width: `${Math.min(item.percent, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* TAB 4: STRUKTUR PENDUDUK BERDASARKAN KELOMPOK USIA (CARDS GRID)           */}
                        {/* ========================================================================= */}
                        {activeTab === 'usia' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Activity className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                    Struktur Penduduk Berdasarkan Kelompok Usia
                                                </h3>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Komposisi kelompok usia dan proporsi gender warga desa.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddAgeGroup}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Tambah Kelompok Usia</span>
                                        </button>
                                    </div>

                                    {/* Judul & Subtitle Seksi */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Judul Seksi Usia
                                            </label>
                                            <input
                                                type="text"
                                                value={data.age_groups_title}
                                                onChange={(e) => setData('age_groups_title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Subtitle Keterangan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.age_groups_subtitle}
                                                onChange={(e) => setData('age_groups_subtitle', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CARDS GRID FOR AGE GROUPS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {data.age_groups_list.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <input
                                                    type="text"
                                                    value={item.label}
                                                    onChange={(e) => handleUpdateAgeGroup(idx, 'label', e.target.value)}
                                                    placeholder="Contoh: 0 – 4 Th (Balita)"
                                                    className="font-bold text-xs text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-red-500 w-full outline-hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteAgeGroup(idx)}
                                                    className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer shrink-0"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>

                                            {/* Laki & Perempuan Inputs */}
                                            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs">
                                                <div>
                                                    <span className="block text-[9px] font-bold text-blue-600 dark:text-blue-400">
                                                        Laki-Laki (L)
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={item.male}
                                                        onChange={(e) => handleUpdateAgeGroup(idx, 'male', e.target.value)}
                                                        className="w-full px-2 py-1 rounded border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-white mt-0.5"
                                                    />
                                                </div>

                                                <div>
                                                    <span className="block text-[9px] font-bold text-pink-600 dark:text-pink-400">
                                                        Perempuan (P)
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={item.female}
                                                        onChange={(e) => handleUpdateAgeGroup(idx, 'female', e.target.value)}
                                                        className="w-full px-2 py-1 rounded border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-white mt-0.5"
                                                    />
                                                </div>
                                            </div>

                                            {/* Total & Persentase summary */}
                                            <div className="flex items-center justify-between text-xs font-bold px-1">
                                                <span className="text-zinc-700 dark:text-zinc-300">
                                                    Total: {item.count} Jiwa
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-red-600 dark:text-amber-400">
                                                        {item.percent}%
                                                    </span>
                                                    <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1 py-0.2 rounded border border-emerald-200 dark:border-emerald-800/60">
                                                        Otomatis
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ========================================================================= */}
                        {/* TAB 5: TINGKAT PENDIDIKAN TERAKHIR (CARDS GRID)                           */}
                        {/* ========================================================================= */}
                        {activeTab === 'pendidikan' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                                                    Tingkat Pendidikan Terakhir Masyarakat
                                                </h3>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Jenjang pendidikan formal penduduk usia sekolah ke atas.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleAddEducation}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Tambah Jenjang Pendidikan</span>
                                        </button>
                                    </div>

                                    {/* Judul & Subtitle Seksi */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Judul Seksi Pendidikan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.education_title}
                                                onChange={(e) => setData('education_title', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Subtitle Keterangan
                                            </label>
                                            <input
                                                type="text"
                                                value={data.education_subtitle}
                                                onChange={(e) => setData('education_subtitle', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CARDS GRID FOR EDUCATION */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {data.education_list.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-xs space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <div className="h-8 w-8 rounded-lg bg-red-50 dark:bg-zinc-800 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                                                        <GraduationCap className="h-4 w-4" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={item.label}
                                                        onChange={(e) => handleUpdateEducation(idx, 'label', e.target.value)}
                                                        placeholder="Contoh: SMA / SMK / MA"
                                                        className="font-bold text-xs text-zinc-900 dark:text-white bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-red-500 w-full outline-hidden"
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteEducation(idx)}
                                                    className="p-1 text-zinc-400 hover:text-red-600 rounded cursor-pointer shrink-0"
                                                    title="Hapus"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                                <div>
                                                    <span className="block text-[9px] font-bold text-zinc-400 uppercase">Jumlah Jiwa</span>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <input
                                                            type="number"
                                                            value={item.count}
                                                            onChange={(e) => handleUpdateEducation(idx, 'count', e.target.value)}
                                                            className="w-full px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-black text-zinc-900 dark:text-white"
                                                        />
                                                        <span className="text-[10px] text-zinc-400">Jiwa</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="block text-[9px] font-bold text-zinc-400 uppercase">Proporsi</span>
                                                        <span className="text-[8.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1 rounded border border-emerald-200 dark:border-emerald-800/60">
                                                            Otomatis
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            value={item.percent}
                                                            onChange={(e) => handleUpdateEducation(idx, 'percent', e.target.value)}
                                                            className="w-full px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/70 text-xs font-black text-red-600 dark:text-amber-400"
                                                            title="Dihitung otomatis: (Jumlah Jiwa ÷ Total Penduduk) × 100%"
                                                        />
                                                        <span className="text-[10px] text-zinc-400">%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Visual Progress Bar */}
                                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-red-600 dark:bg-amber-400 h-full rounded-full transition-all"
                                                    style={{ width: `${Math.min(item.percent, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

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
                                    <span>Pilih Icon Visual</span>
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
                                    placeholder="Cari icon (misal: gandum, ikan, rumah, bangunan, toko, tas...)"
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

                                        return (
                                            <button
                                                key={iconKey}
                                                type="button"
                                                onClick={() => handleSelectIcon(iconKey)}
                                                className="p-3 rounded-xl border text-left flex flex-col items-center gap-2 transition-all cursor-pointer group bg-white dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 hover:border-red-300 dark:hover:border-red-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                                            >
                                                <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-600 group-hover:text-white transition-colors">
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
