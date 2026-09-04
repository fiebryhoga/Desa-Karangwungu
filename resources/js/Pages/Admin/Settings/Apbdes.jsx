import React, { useState } from 'react';
import { useForm, usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import { formatRupiah } from '@/Utils/format';
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
} from 'lucide-react';

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
    // Active expense category accordion/tab
    const [activeExpenseCategory, setActiveExpenseCategory] = useState(
        officialExpenseCategories[0] || 'Bidang Penyelenggaraan Pemerintahan Desa'
    );

    // Modal state for adding a new year
    const [showAddYearModal, setShowAddYearModal] = useState(false);
    const [newYearInput, setNewYearInput] = useState(selectedYear + 1);
    const [cloneFromYear, setCloneFromYear] = useState(selectedYear);

    // Main Form Data for the selected year
    const { data, setData, post, processing } = useForm({
        year: selectedYear,
        incomes: incomes.map((i) => ({
            category_name: i.category_name || '',
            subcategory_name: i.subcategory_name || '',
            budget_amount: Number(i.budget_amount) || 0,
            realized_amount: Number(i.realized_amount) || 0,
        })),
        expenses: expenses.map((e) => ({
            category_name: e.category_name || '',
            subcategory_name: e.subcategory_name || '',
            budget_amount: Number(e.budget_amount) || 0,
            realized_amount: Number(e.realized_amount) || 0,
        })),
        financings: financings.map((f) => ({
            category_name: f.category_name || '',
            subcategory_name: f.subcategory_name || '',
            budget_amount: Number(f.budget_amount) || 0,
            realized_amount: Number(f.realized_amount) || 0,
        })),
    });

    // Handle Year Switch
    const handleSwitchYear = (year) => {
        if (year === selectedYear) return;
        router.get(`/${adminPath}/settings/apbdes`, { year }, { preserveState: false });
    };

    // Save Changes
    const handleSubmit = (e) => {
        e?.preventDefault();
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
                category_name: 'Pendapatan Lain-Lain',
                subcategory_name: '',
                budget_amount: 0,
                realized_amount: 0,
            },
        ]);
    };

    const handleUpdateIncome = (index, field, value) => {
        const updated = [...data.incomes];
        updated[index] = {
            ...updated[index],
            [field]: field.includes('amount') ? Number(value) || 0 : value,
        };
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
        setData('expenses', [
            ...data.expenses,
            {
                category_name: categoryName,
                subcategory_name: 'Kegiatan Baru',
                budget_amount: 0,
                realized_amount: 0,
            },
        ]);
    };

    const handleUpdateExpense = (index, field, value) => {
        const updated = [...data.expenses];
        updated[index] = {
            ...updated[index],
            [field]: field.includes('amount') ? Number(value) || 0 : value,
        };
        setData('expenses', updated);
    };

    const handleDeleteExpense = (index) => {
        setData(
            'expenses',
            data.expenses.filter((_, i) => i !== index)
        );
    };

    // === FINANCING HANDLERS ===
    const handleAddFinancing = (categoryName = 'Penerimaan Pembiayaan (SILPA)') => {
        setData('financings', [
            ...data.financings,
            {
                category_name: categoryName,
                subcategory_name: '',
                budget_amount: 0,
                realized_amount: 0,
            },
        ]);
    };

    const handleUpdateFinancing = (index, field, value) => {
        const updated = [...data.financings];
        updated[index] = {
            ...updated[index],
            [field]: field.includes('amount') ? Number(value) || 0 : value,
        };
        setData('financings', updated);
    };

    const handleDeleteFinancing = (index) => {
        setData(
            'financings',
            data.financings.filter((_, i) => i !== index)
        );
    };

    // Real-time calculations from local state
    const currentIncomeBudget = data.incomes.reduce((acc, i) => acc + (Number(i.budget_amount) || 0), 0);
    const currentIncomeRealized = data.incomes.reduce((acc, i) => acc + (Number(i.realized_amount) || 0), 0);

    const currentExpenseBudget = data.expenses.reduce((acc, e) => acc + (Number(e.budget_amount) || 0), 0);
    const currentExpenseRealized = data.expenses.reduce((acc, e) => acc + (Number(e.realized_amount) || 0), 0);

    const currentSurplusBudget = currentIncomeBudget - currentExpenseBudget;
    const currentSurplusRealized = currentIncomeRealized - currentExpenseRealized;

    const incomePercent = currentIncomeBudget > 0 ? ((currentIncomeRealized / currentIncomeBudget) * 100).toFixed(1) : '0';
    const expensePercent = currentExpenseBudget > 0 ? ((currentExpenseRealized / currentExpenseBudget) * 100).toFixed(1) : '0';

    // Helper: Map official icons for expense bidang
    const getBidangIcon = (catName) => {
        if (catName.includes('Pemerintahan')) return Landmark;
        if (catName.includes('Pembangunan')) return Hammer;
        if (catName.includes('Pembinaan')) return HeartHandshake;
        if (catName.includes('Pemberdayaan')) return Users;
        if (catName.includes('Bencana')) return AlertTriangle;
        return Layers;
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-12">
                {/* Page Header */}
                <AdminPageHeader
                    badge="Keuangan & Akuntabilitas Desa"
                    title={`Transparansi APBDes - Tahun Anggaran ${selectedYear}`}
                    description="Kelola alokasi pendapatan, belanja per 5 bidang, dan pembiayaan desa tahunan. Publikasi otomatis tersinkronisasi ke portal transparansi warga."
                    actions={
                        <div className="flex items-center gap-2">
                            <a
                                href={`/transparansi?year=${selectedYear}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-bold border border-zinc-300 dark:border-zinc-700 transition-colors shadow-xs"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>Lihat Portal Publik</span>
                            </a>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                            >
                                <Save className="h-3.5 w-3.5" />
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
                                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                                    <span>Tahun Anggaran APBDes</span>
                                </h3>
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
                                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                                isSelected
                                                    ? 'bg-gradient-to-r from-red-800 to-red-900 text-white border-amber-400 shadow-md ring-1 ring-amber-400/40'
                                                    : 'bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black ${
                                                        isSelected
                                                            ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                                                    }`}
                                                >
                                                    {yr}
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold block">
                                                        Tahun Anggaran {yr}
                                                    </span>
                                                    <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-zinc-400'}`}>
                                                        {isSelected ? 'Sedang Diedit' : 'Klik untuk Beralih'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                {availableYears.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteYear(yr);
                                                        }}
                                                        title={`Hapus Data Tahun ${yr}`}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            isSelected
                                                                ? 'text-red-300 hover:text-white hover:bg-red-700'
                                                                : 'text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40'
                                                        }`}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                                <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`} />
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
                                    <span className="font-bold text-amber-300">{incomePercent}% Realisasi</span>
                                </div>
                                <div className="text-base sm:text-lg font-black text-white">
                                    {formatRupiah(currentIncomeBudget)}
                                </div>
                                <div className="text-[11px] text-amber-200/90 font-medium">
                                    Terealisasi: {formatRupiah(currentIncomeRealized)}
                                </div>
                            </div>

                            {/* Belanja Box */}
                            <div className="p-3 rounded-lg bg-black/35 border border-white/10 space-y-1">
                                <div className="flex items-center justify-between text-[11px] text-red-200">
                                    <span>Total Belanja:</span>
                                    <span className="font-bold text-amber-300">{expensePercent}% Realisasi</span>
                                </div>
                                <div className="text-base sm:text-lg font-black text-white">
                                    {formatRupiah(currentExpenseBudget)}
                                </div>
                                <div className="text-[11px] text-amber-200/90 font-medium">
                                    Terealisasi: {formatRupiah(currentExpenseRealized)}
                                </div>
                            </div>

                            {/* Surplus / Defisit Indicator */}
                            <div className="p-3 rounded-lg bg-black/45 border border-white/15 space-y-1">
                                <div className="flex items-center justify-between text-[11px]">
                                    <span className="text-zinc-300">Surplus / (Defisit):</span>
                                    <span
                                        className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                                            currentSurplusBudget >= 0
                                                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40'
                                                : 'bg-red-500/30 text-red-300 border border-red-400/40'
                                        }`}
                                    >
                                        {currentSurplusBudget >= 0 ? 'Surplus Anggaran' : 'Defisit Anggaran'}
                                    </span>
                                </div>
                                <div
                                    className={`text-base font-black ${
                                        currentSurplusBudget >= 0 ? 'text-emerald-400' : 'text-red-400'
                                    }`}
                                >
                                    {formatRupiah(currentSurplusBudget)}
                                </div>
                                <div className="text-[10px] text-zinc-400">
                                    Surplus Riil Realisasi: {formatRupiah(currentSurplusRealized)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ==================================================== */}
                    {/* SISI KANAN: FORM PENGISIAN TERSTRUKTUR DENGAN TAB    */}
                    {/* ==================================================== */}
                    <div className="lg:col-span-8 space-y-4">
                        {/* Tab Switcher: Pendapatan, Belanja, Pembiayaan */}
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-x-auto">
                            <button
                                type="button"
                                onClick={() => setActiveTab('income')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center shrink-0 cursor-pointer flex items-center justify-center gap-2 ${
                                    activeTab === 'income'
                                        ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-amber-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                }`}
                            >
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Pendapatan Desa ({data.incomes.length})</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('expense')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center shrink-0 cursor-pointer flex items-center justify-center gap-2 ${
                                    activeTab === 'expense'
                                        ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-amber-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                }`}
                            >
                                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                                <span>Belanja Desa ({data.expenses.length})</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('financing')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-center shrink-0 cursor-pointer flex items-center justify-center gap-2 ${
                                    activeTab === 'financing'
                                        ? 'bg-white dark:bg-zinc-900 text-red-600 dark:text-amber-400 shadow-sm border border-zinc-200 dark:border-zinc-700'
                                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                                }`}
                            >
                                <DollarSign className="h-3.5 w-3.5 text-amber-500" />
                                <span>Pembiayaan Desa ({data.financings.length})</span>
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
                                            <span>Rincian Sumber Pendapatan Desa</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Atur nominal anggaran dan capaian realisasi penerimaan kas desa.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddIncome}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-colors w-fit cursor-pointer"
                                    >
                                        <Plus className="h-3.5 w-3.5 text-emerald-600" />
                                        <span>Tambah Sumber Pendapatan</span>
                                    </button>
                                </div>

                                {/* List of Incomes */}
                                <div className="space-y-3">
                                    {data.incomes.map((item, idx) => {
                                        const pVal = Number(item.budget_amount) || 0;
                                        const rVal = Number(item.realized_amount) || 0;
                                        const pct = pVal > 0 ? ((rVal / pVal) * 100).toFixed(1) : '0';

                                        return (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-3"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                                                        <div>
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
                                                        <div>
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
                                                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer mt-5"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Numbers: Anggaran vs Realisasi */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-200/80 dark:border-zinc-700/80">
                                                    <div>
                                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                            Pagu Anggaran (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={item.budget_amount}
                                                            onChange={(e) => handleUpdateIncome(idx, 'budget_amount', e.target.value)}
                                                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                        <span className="text-[10.5px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                                            {formatRupiah(pVal)}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                            Nilai Realisasi (Rp)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={item.realized_amount}
                                                            onChange={(e) => handleUpdateIncome(idx, 'realized_amount', e.target.value)}
                                                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                        <span className="text-[10.5px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                                            {formatRupiah(rVal)}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col justify-center sm:items-end">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                                            Persentase Capaian
                                                        </span>
                                                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                                            {pct}%
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
                        {/* TAB 2: BELANJA DESA (5 BIDANG RESMI)                 */}
                        {/* ==================================================== */}
                        {activeTab === 'expense' && (
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm space-y-5">
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                        <TrendingDown className="h-4 w-4 text-red-600" />
                                        <span>Rincian Belanja Desa Berdasarkan 5 Bidang Resmi</span>
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Pilih bidang belanja di bawah ini untuk melihat dan mengelola daftar kegiatan.
                                    </p>
                                </div>

                                {/* Bidang Selector Pills */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {officialExpenseCategories.map((catName) => {
                                        const isCatActive = activeExpenseCategory === catName;
                                        const IconComp = getBidangIcon(catName);
                                        const catItems = data.expenses.filter((e) => e.category_name === catName);
                                        const catTotal = catItems.reduce((acc, c) => acc + (Number(c.budget_amount) || 0), 0);

                                        return (
                                            <div
                                                key={catName}
                                                onClick={() => setActiveExpenseCategory(catName)}
                                                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                                                    isCatActive
                                                        ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-950 dark:text-red-200 shadow-xs'
                                                        : 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                                                }`}
                                            >
                                                <div
                                                    className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                                                        isCatActive
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                                    }`}
                                                >
                                                    <IconComp className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-xs font-bold truncate">
                                                        {catName.replace('Bidang ', '')}
                                                    </h4>
                                                    <span className="text-[10.5px] font-semibold text-zinc-500 dark:text-zinc-400 block">
                                                        {catItems.length} Kegiatan • {formatRupiah(catTotal)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Active Bidang Detail Container */}
                                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                                {activeExpenseCategory}
                                            </h4>
                                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                                Kelola subkegiatan fisik/non-fisik dalam bidang ini
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleAddExpense(activeExpenseCategory)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
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
                                                const rVal = Number(item.realized_amount) || 0;
                                                const pct = pVal > 0 ? ((rVal / pVal) * 100).toFixed(1) : '0';

                                                return (
                                                    <div
                                                        key={originalIndex}
                                                        className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-3"
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
                                                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer mt-5"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>

                                                        {/* Anggaran vs Realisasi */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-zinc-200/80 dark:border-zinc-700/80">
                                                            <div>
                                                                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                    Pagu Anggaran (Rp)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={item.budget_amount}
                                                                    onChange={(e) =>
                                                                        handleUpdateExpense(originalIndex, 'budget_amount', e.target.value)
                                                                    }
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                                />
                                                                <span className="text-[10.5px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                                                    {formatRupiah(pVal)}
                                                                </span>
                                                            </div>

                                                            <div>
                                                                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                                    Nilai Realisasi (Rp)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={item.realized_amount}
                                                                    onChange={(e) =>
                                                                        handleUpdateExpense(originalIndex, 'realized_amount', e.target.value)
                                                                    }
                                                                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                                />
                                                                <span className="text-[10.5px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                                                                    {formatRupiah(rVal)}
                                                                </span>
                                                            </div>

                                                            <div className="flex flex-col justify-center sm:items-end">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                                                    Persentase Realisasi
                                                                </span>
                                                                <span className="text-sm font-black text-red-600 dark:text-amber-400">
                                                                    {pct}%
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
                            </div>
                        )}

                        {/* ==================================================== */}
                        {/* TAB 3: PEMBIAYAAN DESA                               */}
                        {/* ==================================================== */}
                        {activeTab === 'financing' && (
                            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-amber-500" />
                                            <span>Rincian Pembiayaan Desa</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Kelola penerimaan pembiayaan (SILPA tahun lalu) dan pengeluaran pembiayaan (Penyertaan Modal BUMDes).
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleAddFinancing('Penerimaan Pembiayaan (SILPA)')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Penerimaan</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAddFinancing('Pengeluaran Pembiayaan (BUMDes)')}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>+ Pengeluaran</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {data.financings.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 space-y-3"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                                                    <div>
                                                        <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                                            Pos Pembiayaan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={item.category_name}
                                                            onChange={(e) => handleUpdateFinancing(idx, 'category_name', e.target.value)}
                                                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                                            Uraian / Keterangan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={item.subcategory_name || ''}
                                                            onChange={(e) => handleUpdateFinancing(idx, 'subcategory_name', e.target.value)}
                                                            placeholder="Misal: Sisa Lebih Perhitungan Anggaran Tahun Lalu"
                                                            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteFinancing(idx)}
                                                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer mt-5"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-zinc-200/80 dark:border-zinc-700/80">
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                        Pagu Anggaran (Rp)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.budget_amount}
                                                        onChange={(e) => handleUpdateFinancing(idx, 'budget_amount', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                                                        Nilai Realisasi (Rp)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={item.realized_amount}
                                                        onChange={(e) => handleUpdateFinancing(idx, 'realized_amount', e.target.value)}
                                                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-red-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {data.financings.length === 0 && (
                                        <div className="p-8 text-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 space-y-2">
                                            <DollarSign className="h-8 w-8 text-zinc-400 mx-auto" />
                                            <p className="text-xs text-zinc-500">
                                                Belum ada data pos pembiayaan untuk tahun ini.
                                            </p>
                                        </div>
                                    )}
                                </div>
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
                                    Menyalin nama pos & bidang kegiatan, dan mereset nilai realisasi ke 0.
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
        </AdminLayout>
    );
}
