import React, { useState, useEffect } from 'react';
import { useForm, usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import { formatRupiah, formatNumberDots } from '@/Utils/format';
import {
    Save,
    Plus,
    Trash2,
    Calendar,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Landmark,
    
    Hammer,
    Users,
    HeartHandshake,
    AlertTriangle,
    Layers,
    FileSpreadsheet,
    ExternalLink,
    CheckCircle2,
    Copy,
    X,
    Sparkles,
    ChevronRight,
    Edit3,
    Sprout,
    Trees,
    GraduationCap,
    HeartPulse,
    Briefcase,
    ShoppingBag,
    Trophy,
    ShieldCheck,
    Home,
    Coins,
    Lightbulb,
    Truck,
    Wifi,
    BookOpen,
    Palette,
    Check,
} from 'lucide-react';

const BIDANG_ICONS_LIST = [
    { name: 'Landmark', label: 'Pemerintahan', icon: Landmark },
    { name: 'Hammer', label: 'Pembangunan / Fisik', icon: Hammer },
    { name: 'HeartHandshake', label: 'Pembinaan Warga', icon: HeartHandshake },
    { name: 'Users', label: 'Pemberdayaan', icon: Users },
    { name: 'AlertTriangle', label: 'Bencana / Darurat', icon: AlertTriangle },
    { name: 'Sprout', label: 'Pertanian & Pangan', icon: Sprout },
    { name: 'Trees', label: 'Lingkungan Hidup', icon: Trees },
    { name: 'GraduationCap', label: 'Pendidikan', icon: GraduationCap },
    { name: 'HeartPulse', label: 'Kesehatan & Posyandu', icon: HeartPulse },
    { name: 'Briefcase', label: 'Ekonomi Desa', icon: Briefcase },
    { name: 'ShoppingBag', label: 'Pasar & UMKM', icon: ShoppingBag },
    { name: 'Sparkles', label: 'Pariwisata & Budaya', icon: Sparkles },
    { name: 'Trophy', label: 'Kepemudaan & Olahraga', icon: Trophy },
    { name: 'ShieldCheck', label: 'Keamanan & Ketertiban', icon: ShieldCheck },
    { name: 'Home', label: 'Perumahan & Sanitasi', icon: Home },
    { name: 'Coins', label: 'Keuangan & Bantuan', icon: Coins },
    { name: 'Lightbulb', label: 'Inovasi & Penerangan', icon: Lightbulb },
    { name: 'Truck', label: 'Transportasi & Sarana', icon: Truck },
    { name: 'Wifi', label: 'Informasi & Digital', icon: Wifi },
    { name: 'BookOpen', label: 'Perpustakaan & Arsip', icon: BookOpen },
    { name: 'Layers', label: 'Lainnya / Umum', icon: Layers },
];

const BIDANG_ICON_MAP = {
    Landmark,
    Hammer,
    HeartHandshake,
    Users,
    AlertTriangle,
    Sprout,
    Trees,
    GraduationCap,
    HeartPulse,
    Briefcase,
    ShoppingBag,
    Sparkles,
    Trophy,
    ShieldCheck,
    Home,
    Coins,
    Lightbulb,
    Truck,
    Wifi,
    BookOpen,
    Layers,
};

export default function ApbdesSettings({
    availableYears = [2026],
    selectedYear = 2026,
    incomes = [],
    expenses = [],
    financings = [],
    officialExpenseCategories = [],
    summary = {},
}) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    // Active subtab on the right side: 'income' | 'expense' | 'financing'
    const [activeTab, setActiveTab] = useState('income');

    // Dynamic Bidang Belanja List
    const getInitialBidangList = () => {
        const fromExp = Array.from(new Set((expenses || []).map((e) => e.category_name).filter(Boolean)));
        if (fromExp.length > 0) return fromExp;
        return officialExpenseCategories && officialExpenseCategories.length > 0
            ? officialExpenseCategories
            : [
                'Bidang Penyelenggaraan Pemerintahan Desa',
                'Bidang Pelaksanaan Pembangunan Desa',
                'Bidang Pembinaan Kemasyarakatan Desa',
                'Bidang Pemberdayaan Masyarakat Desa',
                'Bidang Penanggulangan Bencana, Darurat & Mendesak Desa',
            ];
    };

    const [expenseBidangList, setExpenseBidangList] = useState(getInitialBidangList);
    const [activeExpenseCategory, setActiveExpenseCategory] = useState(() => {
        const initial = getInitialBidangList();
        return initial[0] || 'Bidang Penyelenggaraan Pemerintahan Desa';
    });

    // Modal & editing state for Bidang Belanja
    const [showAddBidangModal, setShowAddBidangModal] = useState(false);
    const [newBidangInput, setNewBidangInput] = useState('');
    const [newBidangIcon, setNewBidangIcon] = useState('Layers');
    const [editingBidangName, setEditingBidangName] = useState(null);
    const [editBidangInput, setEditBidangInput] = useState('');
    const [showIconPickerModal, setShowIconPickerModal] = useState(false);

    // Modal state for adding a new year
    const [showAddYearModal, setShowAddYearModal] = useState(false);
    const [newYearInput, setNewYearInput] = useState(selectedYear + 1);
    const [cloneFromYear, setCloneFromYear] = useState(selectedYear);

    // Formatters for form state initialization and syncing
    const mapIncomes = (list) =>
        (list || []).map((i) => {
            let code = i.code || '';
            if (!code && i.category_name) {
                const match = i.category_name.match(/\(([^)]+)\)/);
                if (match && match[1]) {
                    code = match[1].trim().toUpperCase();
                }
            }
            return {
                id: i.id || null,
                category_name: i.category_name || '',
                code: code,
                subcategory_name: i.subcategory_name || '',
                budget_amount: i.budget_amount === '' ? '' : Number(i.budget_amount) || 0,
                realized_amount: Number(i.realized_amount) || 0,
            };
        });

    const mapExpenses = (list) =>
        (list || []).map((e) => ({
            id: e.id || null,
            category_name: e.category_name || '',
            subcategory_name: e.subcategory_name || '',
            icon: e.icon || null,
            budget_amount: e.budget_amount === '' ? '' : (Number(e.budget_amount) || 0),
            realized_amount: Number(e.realized_amount) || 0,
        }));

    const mapFinancings = (list) =>
        (list || []).map((f) => ({
            id: f.id || null,
            category_name: f.category_name || '',
            subcategory_name: f.subcategory_name || '',
            budget_amount: Number(f.budget_amount) || 0,
            realized_amount: Number(f.realized_amount) || 0,
        }));

    // Main Form Data for the selected year
    const { data, setData, post, processing, errors, transform } = useForm({
        year: selectedYear,
        incomes: mapIncomes(incomes),
        expenses: mapExpenses(expenses),
        financings: mapFinancings(financings),
    });

    // Automatically synchronize form state when server props update
    useEffect(() => {
        setData({
            year: selectedYear,
            incomes: mapIncomes(incomes),
            expenses: mapExpenses(expenses),
            financings: mapFinancings(financings),
        });

        const fromExp = Array.from(new Set((expenses || []).map((e) => e.category_name).filter(Boolean)));
        const list = fromExp.length > 0 ? fromExp : (officialExpenseCategories || []);
        setExpenseBidangList(list);
        if (list.length > 0 && !list.includes(activeExpenseCategory)) {
            setActiveExpenseCategory(list[0]);
        }
    }, [selectedYear, incomes, expenses, financings]);

    // Handle Year Switch
    const handleSwitchYear = (year) => {
        if (year === selectedYear) return;
        router.get(`/${adminPath}/settings/apbdes`, { year }, { preserveState: false });
    };

    // Save Changes
    const handleSubmit = (e) => {
        e?.preventDefault();
        transform((curr) => ({
            ...curr,
            incomes: curr.incomes.map((i) => {
                const bVal = i.budget_amount === '' ? 0 : Number(String(i.budget_amount).replace(/\D/g, '')) || 0;
                return {
                    ...i,
                    budget_amount: bVal,
                    realized_amount: bVal,
                };
            }),
            expenses: curr.expenses.map((exp) => {
                const bVal = exp.budget_amount === '' ? 0 : Number(String(exp.budget_amount).replace(/\D/g, '')) || 0;
                return {
                    ...exp,
                    budget_amount: bVal,
                    realized_amount: bVal,
                };
            }),
        }));
        post(`/${adminPath}/settings/apbdes`, {
            preserveScroll: true,
        });
    };

    // Handle Create New Year
    const handleCreateYear = (e) => {
        e.preventDefault();
        router.post(
            `/${adminPath}/settings/apbdes/year`,
            {
                new_year: Number(newYearInput),
                clone_from_year: cloneFromYear ? Number(cloneFromYear) : null,
            },
            {
                onSuccess: () => setShowAddYearModal(false),
            }
        );
    };

    // Handle Delete Year
    const handleDeleteYear = (year) => {
        if (confirm(`Hapus seluruh data APBDes Tahun ${year}? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(`/${adminPath}/settings/apbdes/year/${year}`);
        }
    };

    // === INCOME HANDLERS ===
    const handleAddIncome = () => {
        setData('incomes', [
            ...data.incomes,
            {
                category_name: 'Pendapatan Baru',
                code: 'BARU',
                subcategory_name: '',
                budget_amount: '',
                realized_amount: 0,
            },
        ]);
    };

    const handleUpdateIncome = (index, field, value) => {
        const updated = [...data.incomes];
        if (field === 'budget_amount') {
            const raw = value === '' ? '' : String(value).replace(/\D/g, '');
            updated[index] = {
                ...updated[index],
                budget_amount: raw,
                realized_amount: raw === '' ? 0 : (Number(raw) || 0),
            };
        } else if (field === 'category_name') {
            const currentItem = updated[index];
            let code = currentItem.code;
            // Auto extract code from parentheses if code is empty or default
            if (!code || code === 'BARU' || code === 'LAIN') {
                const match = value.match(/\(([^)]+)\)/);
                if (match && match[1]) {
                    code = match[1].trim().toUpperCase();
                }
            }
            updated[index] = {
                ...currentItem,
                category_name: value,
                code: code,
            };
        } else if (field === 'code') {
            updated[index] = {
                ...updated[index],
                code: value.toUpperCase(),
            };
        } else {
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
        }
        setData('incomes', updated);
    };

    const handleDeleteIncome = (index) => {
        setData(
            'incomes',
            data.incomes.filter((_, i) => i !== index)
        );
    };

    // === EXPENSE HANDLERS ===
    const handleAddExpense = (categoryName) => {
        const catIcon = getBidangIconName(categoryName);
        setData('expenses', [
            ...data.expenses,
            {
                category_name: categoryName,
                subcategory_name: 'Kegiatan Baru',
                icon: catIcon,
                budget_amount: '',
                realized_amount: 0,
            },
        ]);
    };

    const handleUpdateExpense = (index, field, value) => {
        const updated = [...data.expenses];
        if (field === 'budget_amount') {
            const raw = value === '' ? '' : String(value).replace(/\D/g, '');
            updated[index] = {
                ...updated[index],
                budget_amount: raw,
                realized_amount: raw === '' ? 0 : (Number(raw) || 0),
            };
        } else {
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
        }
        setData('expenses', updated);
    };

    const handleDeleteExpense = (index) => {
        setData(
            'expenses',
            data.expenses.filter((_, i) => i !== index)
        );
    };

    // === BIDANG BELANJA HANDLERS (ADD / DELETE / RENAME) ===
    const handleCreateBidang = (e) => {
        e?.preventDefault();
        const trimmed = newBidangInput.trim();
        if (!trimmed) return;

        if (expenseBidangList.some((b) => b.toLowerCase() === trimmed.toLowerCase())) {
            alert(`Bidang "${trimmed}" sudah ada.`);
            return;
        }

        const updatedList = [...expenseBidangList, trimmed];
        setExpenseBidangList(updatedList);

        const iconToUse = newBidangIcon || getBidangIconName(trimmed);

        // Add an initial activity so the category is registered in records
        setData('expenses', [
            ...data.expenses,
            {
                category_name: trimmed,
                subcategory_name: 'Kegiatan Baru',
                icon: iconToUse,
                budget_amount: '',
                realized_amount: 0,
            },
        ]);

        setActiveExpenseCategory(trimmed);
        setNewBidangInput('');
        setNewBidangIcon('Layers');
        setShowAddBidangModal(false);
    };

    const handleDeleteBidang = (bidangName) => {
        const count = data.expenses.filter((e) => e.category_name === bidangName).length;
        const confirmMsg = count > 0
            ? `Apakah Anda yakin ingin menghapus "${bidangName}" beserta ${count} kegiatan di dalamnya?`
            : `Apakah Anda yakin ingin menghapus bidang "${bidangName}"?`;

        if (!confirm(confirmMsg)) return;

        const updatedList = expenseBidangList.filter((b) => b !== bidangName);
        setExpenseBidangList(updatedList);

        // Remove all expenses belonging to this bidang
        const updatedExpenses = data.expenses.filter((e) => e.category_name !== bidangName);
        setData('expenses', updatedExpenses);

        if (activeExpenseCategory === bidangName) {
            setActiveExpenseCategory(updatedList[0] || '');
        }
    };

    const handleStartRenameBidang = (bidangName) => {
        setEditingBidangName(bidangName);
        setEditBidangInput(bidangName);
    };

    const handleSaveRenameBidang = (e) => {
        e?.preventDefault();
        const trimmed = editBidangInput.trim();
        if (!trimmed || trimmed === editingBidangName) {
            setEditingBidangName(null);
            return;
        }

        if (
            expenseBidangList.some(
                (b) => b.toLowerCase() === trimmed.toLowerCase() && b.toLowerCase() !== editingBidangName.toLowerCase()
            )
        ) {
            alert(`Bidang "${trimmed}" sudah ada.`);
            return;
        }

        const updatedList = expenseBidangList.map((b) => (b === editingBidangName ? trimmed : b));
        setExpenseBidangList(updatedList);

        const updatedExpenses = data.expenses.map((e) => {
            if (e.category_name === editingBidangName) {
                return { ...e, category_name: trimmed };
            }
            return e;
        });
        setData('expenses', updatedExpenses);

        if (activeExpenseCategory === editingBidangName) {
            setActiveExpenseCategory(trimmed);
        }

        setEditingBidangName(null);
    };

    // Helper: Determine icon name for a category (from custom record or smart keyword detection)
    const getBidangIconName = (catName) => {
        const found = data.expenses.find((e) => e.category_name === catName && e.icon);
        if (found && found.icon && BIDANG_ICON_MAP[found.icon]) {
            return found.icon;
        }
        const lower = (catName || '').toLowerCase();
        if (lower.includes('pemerintahan')) return 'Landmark';
        if (lower.includes('pembangunan')) return 'Hammer';
        if (lower.includes('pembinaan')) return 'HeartHandshake';
        if (lower.includes('pemberdayaan')) return 'Users';
        if (lower.includes('bencana')) return 'AlertTriangle';
        if (lower.includes('tani') || lower.includes('pangan') || lower.includes('ternak')) return 'Sprout';
        if (lower.includes('lingkungan') || lower.includes('hutan')) return 'Trees';
        if (lower.includes('didik') || lower.includes('sekolah')) return 'GraduationCap';
        if (lower.includes('sehat') || lower.includes('posyandu')) return 'HeartPulse';
        if (lower.includes('wisata') || lower.includes('budaya')) return 'Sparkles';
        if (lower.includes('olahraga') || lower.includes('pemuda')) return 'Trophy';
        return 'Layers';
    };

    const getBidangIcon = (catName) => {
        const name = getBidangIconName(catName);
        return BIDANG_ICON_MAP[name] || Layers;
    };

    // Change icon for all records in the given bidang
    const handleChangeBidangIcon = (catName, newIcon) => {
        const updated = data.expenses.map((e) => {
            if (e.category_name === catName) {
                return { ...e, icon: newIcon };
            }
            return e;
        });
        setData('expenses', updated);
        setShowIconPickerModal(false);
    };

    // Real-time calculations from local state
    const currentIncomeBudget = data.incomes.reduce((acc, i) => acc + (Number(i.budget_amount) || 0), 0);
    const currentExpenseBudget = data.expenses.reduce((acc, e) => acc + (Number(e.budget_amount) || 0), 0);

    return (
        <AdminLayout title="Transparansi APBDes">
            <div className="space-y-6 pb-12">
                {/* Page Header Terpadu */}
                <AdminPageHeader
                    breadcrumbs={[
                        { label: 'Desa Karangwungu', href: `/${adminPath}/dashboard` },
                        { label: 'Konfigurasi Website' },
                        { label: 'Transparansi APBDes' },
                    ]}
                    title={`Transparansi APBDes - Tahun Anggaran ${selectedYear}`}
                    description="Kelola alokasi pendapatan dan belanja desa. Publikasi otomatis tersinkronisasi ke portal transparansi warga."
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href={`/transparansi?year=${selectedYear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700/80 transition-all shadow-2xs cursor-pointer"
                            >
                                <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Lihat Portal Publik</span>
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
                        </div>
                    }
                />

                {/* Main Split Layout: Kiri (Tahun & Ringkasan) - Kanan (Pengisian Data Terstruktur) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* ==================================================== */}
                    {/* SISI KIRI: PEMILIHAN TAHUN & KARTU RINGKASAN CEPAT   */}
                    {/* ==================================================== */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* 1. Selector Tahun Anggaran */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Tahun Anggaran</span>
                                    </h3>
                                    <span className="px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold">
                                        {availableYears.length}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddYearModal(true)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
                                >
                                    <Plus className="h-3 w-3" />
                                    <span>Tambah Tahun</span>
                                </button>
                            </div>

                            {/* Year List Pills */}
                            <div className="grid grid-cols-1 gap-2 pt-1">
                                {availableYears.map((yr) => {
                                    const isSelected = yr === selectedYear;
                                    return (
                                        <div
                                            key={yr}
                                            onClick={() => handleSwitchYear(yr)}
                                            className={`group p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                                isSelected
                                                    ? 'bg-gradient-to-r from-red-800 via-red-800/95 to-red-900 text-white border-amber-400/70 shadow-md shadow-red-950/25 ring-1 ring-amber-400/30'
                                                    : 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                {/* Spacious, properly proportioned Year Badge */}
                                                <div
                                                    className={`min-w-[50px] px-2.5 py-1.5 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 tracking-tight transition-all ${
                                                        isSelected
                                                            ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                                            : 'bg-zinc-200/90 dark:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200'
                                                    }`}
                                                >
                                                    {yr}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs font-bold leading-tight truncate ${isSelected ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>
                                                            Tahun Anggaran {yr}
                                                        </span>
                                                        {isSelected && (
                                                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide bg-amber-400/20 text-amber-200 border border-amber-400/30 shrink-0">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                                Aktif
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-[10px] block truncate mt-0.5 ${isSelected ? 'text-red-200/80' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                                        {isSelected ? 'Sedang aktif diedit' : 'Klik untuk beralih'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 shrink-0">
                                                {availableYears.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteYear(yr);
                                                        }}
                                                        title={`Hapus Data Tahun ${yr}`}
                                                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                                            isSelected
                                                                ? 'text-red-200 hover:text-white hover:bg-red-700/70'
                                                                : 'text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40'
                                                        }`}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                                <ChevronRight className={`h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 2. Kartu Ringkasan Cepat APBDes */}
                        <div className="rounded-lg bg-gradient-to-b from-red-800 via-red-900 to-[#2a0609] text-white border border-red-500/40 p-4 sm:p-5 shadow-lg space-y-4">
                            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                                    <FileSpreadsheet className="h-3.5 w-3.5" />
                                    <span>Ringkasan APBDes {selectedYear}</span>
                                </h4>
                                <span className="px-2 py-0.5 rounded-lg bg-black/40 text-amber-300 text-[10px] font-black border border-white/15">
                                    Live Kalkulasi
                                </span>
                            </div>

                            {/* Pendapatan Box */}
                            <div className="p-3 rounded-lg bg-black/35 border border-white/10 space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-red-200">
                                    <span>Total Pendapatan:</span>
                                    <span className="font-bold text-amber-300">{data.incomes.length} Sumber</span>
                                </div>
                                <div className="text-base sm:text-lg font-black text-white">
                                    {formatRupiah(currentIncomeBudget)}
                                </div>
                            </div>

                            {/* Belanja Box */}
                            <div className="p-3 rounded-lg bg-black/35 border border-white/10 space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-red-200">
                                    <span>Total Belanja:</span>
                                    <span className="font-bold text-amber-300">{data.expenses.length} Kegiatan</span>
                                </div>
                                <div className="text-base sm:text-lg font-black text-white">
                                    {formatRupiah(currentExpenseBudget)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SISI KANAN: FORM PENGISIAN TERSTRUKTUR DENGAN TAB    */}
                    {/* ==================================================== */}
                    <div className="lg:col-span-8 space-y-4">
                        {/* Tab Switcher: Pendapatan vs Belanja */}
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                            <button
                                type="button"
                                onClick={() => setActiveTab('income')}
                                className={`flex-1 py-2.5 px-3.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
                                    activeTab === 'income'
                                        ? 'bg-red-600 text-white shadow-xs'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60'
                                }`}
                            >
                                <TrendingUp className={`h-3.5 w-3.5 ${activeTab === 'income' ? 'text-white' : 'text-emerald-500'}`} />
                                <span>Pendapatan Desa</span>
                                <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                        activeTab === 'income'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                                    }`}
                                >
                                    {data.incomes.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('expense')}
                                className={`flex-1 py-2.5 px-3.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-2 ${
                                    activeTab === 'expense'
                                        ? 'bg-red-600 text-white shadow-xs'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-700/60'
                                }`}
                            >
                                <TrendingDown className={`h-3.5 w-3.5 ${activeTab === 'expense' ? 'text-white' : 'text-red-500'}`} />
                                <span>Belanja Desa</span>
                                <span
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                        activeTab === 'expense'
                                            ? 'bg-white/20 text-white'
                                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                                    }`}
                                >
                                    {data.expenses.length}
                                </span>
                            </button>
                        </div>

                        {/* ==================================================== */}
                        {/* TAB 1: PENDAPATAN DESA                               */}
                        {/* ==================================================== */}
                        {activeTab === 'income' && (
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                                            <span>Daftar Sumber Pendapatan Desa</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Masukkan nama sumber pendapatan, asal dana, dan nominal anggarannya.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddIncome}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors w-fit cursor-pointer shadow-xs"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Tambah Sumber Pendapatan</span>
                                    </button>
                                </div>

                                {/* List of Incomes */}
                                <div className="space-y-3">
                                    {data.incomes.map((item, idx) => {
                                        const pVal = Number(item.budget_amount) || 0;

                                        return (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 flex-1">
                                                        <div className="md:col-span-6">
                                                            <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                                                Sumber / Pos Pendapatan
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.category_name}
                                                                onChange={(e) => handleUpdateIncome(idx, 'category_name', e.target.value)}
                                                                placeholder="Misal: Dana Desa (DD)"
                                                                className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500 font-bold"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1 flex items-center justify-between">
                                                                <span>Singkatan / Kode</span>
                                                                <span className="px-1.5 py-0.5 rounded-lg text-[9px] font-black bg-zinc-900 text-amber-300 border border-white/20">
                                                                    {item.code || '-'}
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                maxLength={8}
                                                                value={item.code || ''}
                                                                onChange={(e) => handleUpdateIncome(idx, 'code', e.target.value)}
                                                                placeholder="DD"
                                                                className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-black uppercase text-center text-amber-600 dark:text-amber-400 focus:ring-2 focus:ring-red-500"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-4">
                                                            <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                                                Keterangan / Asal Dana
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={item.subcategory_name || ''}
                                                                onChange={(e) => handleUpdateIncome(idx, 'subcategory_name', e.target.value)}
                                                                placeholder="Misal: Pemerintah Pusat (APBN)"
                                                                className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteIncome(idx)}
                                                        title="Hapus pos pendapatan"
                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer mt-5"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Single Clear Budget Amount Input */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-zinc-200/80 dark:border-zinc-700/80">
                                                    <div className="flex-1 max-w-sm">
                                                        <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                            <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                                                            <span>Jumlah Anggaran (Rp)</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            value={formatNumberDots(item.budget_amount)}
                                                            onChange={(e) => handleUpdateIncome(idx, 'budget_amount', e.target.value)}
                                                            onFocus={(e) => e.target.select()}
                                                            placeholder="0"
                                                            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-2 sm:self-end pb-1">
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Tercatat:</span>
                                                        <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                                                            {formatRupiah(pVal)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ==================================================== */}
                        {/* TAB 2: BELANJA DESA (BIDANG DINAMIS)                 */}
                        {/* ==================================================== */}
                        {activeTab === 'expense' && (
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm space-y-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            <TrendingDown className="h-4 w-4 text-red-600" />
                                            <span>Rincian Belanja Desa ({expenseBidangList.length} Bidang)</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Pilih bidang belanja untuk mengelola daftar kegiatan. Anda dapat menambah, mengubah, atau menghapus bidang belanja sesuai kebutuhan.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewBidangInput('');
                                            setShowAddBidangModal(true);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Tambah Bidang Baru</span>
                                    </button>
                                </div>

                                {/* Bidang Selector Pills & Quick Actions */}
                                {expenseBidangList.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                        {expenseBidangList.map((catName) => {
                                            const isCatActive = activeExpenseCategory === catName;
                                            const IconComp = getBidangIcon(catName);
                                            const catItems = data.expenses.filter((e) => e.category_name === catName);
                                            const catTotal = catItems.reduce((acc, c) => acc + (Number(c.budget_amount) || 0), 0);

                                            return (
                                                <div
                                                    key={catName}
                                                    onClick={() => setActiveExpenseCategory(catName)}
                                                    className={`group relative p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                                        isCatActive
                                                            ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-200 shadow-xs ring-1 ring-red-500/30'
                                                            : 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                                                            isCatActive
                                                                ? 'bg-red-600 text-white shadow-2xs'
                                                                : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                                        }`}
                                                    >
                                                        <IconComp className="h-4 w-4" />
                                                    </div>
                                                    <div className="min-w-0 flex-1 pr-6">
                                                        <h4 className="text-xs font-bold truncate" title={catName}>
                                                            {catName.replace(/^Bidang\s+/i, '')}
                                                        </h4>
                                                        <span className="text-[10.5px] font-semibold text-zinc-500 dark:text-zinc-400 block">
                                                            {catItems.length} Kegiatan • {formatRupiah(catTotal)}
                                                        </span>
                                                    </div>

                                                    {/* Quick Delete Bidang button */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteBidang(catName);
                                                        }}
                                                        title={`Hapus Bidang "${catName}"`}
                                                        className="absolute top-2.5 right-2.5 p-1 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-950/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            );
                                        })}

                                        {/* Quick Add Bidang Card */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setNewBidangInput('');
                                                setShowAddBidangModal(true);
                                            }}
                                            className="p-3 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50/40 dark:hover:bg-red-950/20 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Tambah Bidang Belanja</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 space-y-3">
                                        <Layers className="h-10 w-10 text-zinc-400 mx-auto" />
                                        <div>
                                            <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                                                Belum Ada Bidang Belanja
                                            </h4>
                                            <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                                                Silakan buat bidang belanja baru untuk mulai mengalokasikan anggaran kegiatan desa.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setNewBidangInput('');
                                                setShowAddBidangModal(true);
                                            }}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>Buat Bidang Belanja Pertama</span>
                                        </button>
                                    </div>
                                )}

                                {/* Active Bidang Detail Container */}
                                {activeExpenseCategory && expenseBidangList.includes(activeExpenseCategory) && (
                                    <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80">
                                            {editingBidangName === activeExpenseCategory ? (
                                                <form onSubmit={handleSaveRenameBidang} className="flex items-center gap-2 flex-1 max-w-lg">
                                                    <input
                                                        type="text"
                                                        value={editBidangInput}
                                                        onChange={(e) => setEditBidangInput(e.target.value)}
                                                        placeholder="Nama bidang belanja..."
                                                        className="flex-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-red-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                                    >
                                                        Simpan
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingBidangName(null)}
                                                        className="px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 text-xs font-semibold cursor-pointer"
                                                    >
                                                        Batal
                                                    </button>
                                                </form>
                                            ) : (
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowIconPickerModal(true)}
                                                            title="Klik untuk ubah ikon bidang ini"
                                                            className="h-7 w-7 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-xs"
                                                        >
                                                            {React.createElement(getBidangIcon(activeExpenseCategory), { className: 'h-4 w-4' })}
                                                        </button>
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                                            {activeExpenseCategory}
                                                        </h4>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowIconPickerModal(true)}
                                                        title="Ubah ikon bidang belanja"
                                                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                                    >
                                                        <Palette className="h-3 w-3 text-red-500" />
                                                        <span>Ubah Ikon</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleStartRenameBidang(activeExpenseCategory)}
                                                        title="Ubah nama bidang"
                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 hover:bg-zinc-200/70 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                                    >
                                                        <Edit3 className="h-3 w-3 text-zinc-500" />
                                                        <span>Ubah Nama</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteBidang(activeExpenseCategory)}
                                                        title="Hapus bidang ini beserta seluruh kegiatannya"
                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-semibold text-red-600 hover:text-red-700 hover:bg-red-100/70 dark:hover:bg-red-950/50 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                        <span>Hapus Bidang</span>
                                                    </button>
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => handleAddExpense(activeExpenseCategory)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Tambah Kegiatan</span>
                                            </button>
                                        </div>

                                        {/* Activities in active category */}
                                        <div className="space-y-3">
                                            {data.expenses
                                                .map((item, originalIndex) => ({ item, originalIndex }))
                                                .filter(({ item }) => item.category_name === activeExpenseCategory)
                                                .map(({ item, originalIndex }) => {
                                                    const pVal = Number(item.budget_amount) || 0;

                                                    return (
                                                        <div
                                                            key={originalIndex}
                                                            className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="flex-1">
                                                                    <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                                                        Uraian Kegiatan / Belanja
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={item.subcategory_name}
                                                                        onChange={(e) =>
                                                                            handleUpdateExpense(originalIndex, 'subcategory_name', e.target.value)
                                                                        }
                                                                        placeholder="Contoh: Pembangunan Tembok Penahan Tanah (TPT)"
                                                                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                                    />
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDeleteExpense(originalIndex)}
                                                                    title="Hapus kegiatan"
                                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer mt-5"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>

                                                            {/* Single Clear Budget Amount Input */}
                                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-zinc-200/80 dark:border-zinc-700/80">
                                                                <div className="flex-1 max-w-sm">
                                                                    <label className="block text-[11px] font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
                                                                        <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                                                                        <span>Jumlah Anggaran Kegiatan (Rp)</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        inputMode="numeric"
                                                                        value={formatNumberDots(item.budget_amount)}
                                                                        onChange={(e) =>
                                                                            handleUpdateExpense(originalIndex, 'budget_amount', e.target.value)
                                                                        }
                                                                        onFocus={(e) => e.target.select()}
                                                                        placeholder="0"
                                                                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                                    />
                                                                </div>

                                                                <div className="flex items-center gap-2 sm:self-end pb-1">
                                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Tercatat:</span>
                                                                    <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs border border-emerald-200/60 dark:border-emerald-800/40 shadow-2xs">
                                                                        {formatRupiah(pVal)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                            {data.expenses.filter((e) => e.category_name === activeExpenseCategory).length === 0 && (
                                                <div className="p-8 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 space-y-2">
                                                    <Layers className="h-8 w-8 text-zinc-400 mx-auto" />
                                                    <p className="text-xs text-zinc-500">
                                                        Belum ada kegiatan dalam bidang ini.
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddExpense(activeExpenseCategory)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                        <span>Tambah Kegiatan Pertama</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}



                    </div>
                </div>
            </div>

            {/* ==================================================== */}
            {/* MODAL: TAMBAH TAHUN ANGGARAN BARU                   */}
            {/* ==================================================== */}
            {showAddYearModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Plus className="h-4 w-4 text-red-600" />
                                <span>Tambah Tahun Anggaran Baru</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowAddYearModal(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateYear} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Tahun Anggaran Baru
                                </label>
                                <input
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    required
                                    value={newYearInput}
                                    onChange={(e) => setNewYearInput(e.target.value)}
                                    placeholder="2027"
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Salin Template Data Dari
                                </label>
                                <select
                                    value={cloneFromYear || ''}
                                    onChange={(e) => setCloneFromYear(e.target.value ? Number(e.target.value) : null)}
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">-- Buat Dari Template Standar Kosong --</option>
                                    {availableYears.map((yr) => (
                                        <option key={yr} value={yr}>
                                            Salin struktur pos belanja & pendapatan dari Tahun {yr}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                    Menyalin struktur pos pendapatan & belanja dari tahun pilihan.
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddYearModal(false)}
                                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    Buat Tahun Anggaran
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================================================== */}
            {/* MODAL: TAMBAH BIDANG BELANJA BARU                    */}
            {/* ==================================================== */}
            {showAddBidangModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <Layers className="h-4 w-4 text-red-600" />
                                <span>Tambah Bidang Belanja Baru</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setShowAddBidangModal(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBidang} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    Nama Bidang Belanja:
                                </label>
                                <input
                                    type="text"
                                    value={newBidangInput}
                                    onChange={(e) => {
                                        setNewBidangInput(e.target.value);
                                        // auto update icon if default
                                        if (newBidangIcon === 'Layers') {
                                            const auto = getBidangIconName(e.target.value);
                                            if (auto !== 'Layers') setNewBidangIcon(auto);
                                        }
                                    }}
                                    placeholder="Contoh: Bidang Pariwisata & Ekonomi Kreatif"
                                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                    autoFocus
                                />
                            </div>

                            {/* Icon picker inside modal */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                                    <span>Pilih Ikon Bidang:</span>
                                    <span className="text-[11px] text-red-600 dark:text-amber-400 font-bold flex items-center gap-1">
                                        {React.createElement(BIDANG_ICON_MAP[newBidangIcon] || Layers, { className: 'h-3.5 w-3.5' })}
                                        <span>{BIDANG_ICONS_LIST.find((i) => i.name === newBidangIcon)?.label}</span>
                                    </span>
                                </label>
                                <div className="grid grid-cols-7 gap-1.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 max-h-32 overflow-y-auto">
                                    {BIDANG_ICONS_LIST.map((ic) => {
                                        const IconComp = ic.icon;
                                        const isSel = newBidangIcon === ic.name;
                                        return (
                                            <button
                                                key={ic.name}
                                                type="button"
                                                onClick={() => setNewBidangIcon(ic.name)}
                                                title={ic.label}
                                                className={`p-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                                    isSel
                                                        ? 'bg-red-600 text-white shadow-xs'
                                                        : 'bg-white dark:bg-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-600/60'
                                                }`}
                                            >
                                                <IconComp className="h-4 w-4" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quick suggestion chips */}
                            <div className="space-y-1.5">
                                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                                    Pilihan cepat:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {[
                                        'Bidang Penyelenggaraan Pemerintahan Desa',
                                        'Bidang Pelaksanaan Pembangunan Desa',
                                        'Bidang Pembinaan Kemasyarakatan Desa',
                                        'Bidang Pemberdayaan Masyarakat Desa',
                                        'Bidang Penanggulangan Bencana, Darurat & Mendesak Desa',
                                        'Bidang Pariwisata & Kebudayaan',
                                        'Bidang Pertanian, Perikanan & Peternakan',
                                        'Bidang Lingkungan Hidup & Kebersihan',
                                        'Bidang Kepemudaan & Olahraga',
                                    ]
                                        .filter((s) => !expenseBidangList.some((b) => b.toLowerCase() === s.toLowerCase()))
                                        .slice(0, 5)
                                        .map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                type="button"
                                                onClick={() => {
                                                    setNewBidangInput(suggestion);
                                                    setNewBidangIcon(getBidangIconName(suggestion));
                                                }}
                                                className="text-[10.5px] px-2 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-300 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                            >
                                                + {suggestion.replace(/^Bidang\s+/i, '')}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddBidangModal(false)}
                                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newBidangInput.trim()}
                                    className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                                >
                                    Tambah Bidang
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================================================== */}
            {/* MODAL: PILIH / UBAH IKON BIDANG BELANJA              */}
            {/* ==================================================== */}
            {showIconPickerModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                    <div className="w-full max-w-xl rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            <div>
                                <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <Palette className="h-4 w-4 text-red-600" />
                                    <span>Pilih Ikon Bidang Belanja</span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Pilih ikon yang mewakili <span className="font-bold text-zinc-800 dark:text-zinc-200">"{activeExpenseCategory}"</span>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowIconPickerModal(false)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Icon grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-72 overflow-y-auto p-1">
                            {BIDANG_ICONS_LIST.map((item) => {
                                const IconC = item.icon;
                                const isSelected = getBidangIconName(activeExpenseCategory) === item.name;
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => handleChangeBidangIcon(activeExpenseCategory, item.name)}
                                        className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-600 dark:text-red-400 shadow-xs ring-2 ring-red-500/40'
                                                : 'bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-red-600 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'}`}>
                                            <IconC className="h-5 w-5" />
                                        </div>
                                        <span className="text-[10px] font-bold leading-tight line-clamp-2">
                                            {item.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-end pt-3 border-t border-zinc-200 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowIconPickerModal(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
