import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { formatRupiah } from '../../Utils/format';
import {
    Landmark,
    Hammer,
    Users,
    HeartHandshake,
    AlertTriangle,
    Layers,
    FileSpreadsheet,
    Calendar,
    CheckCircle2,
    DollarSign,
    ArrowUpRight,
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
} from 'lucide-react';

// Helper to compute SVG Donut Arc Path
function describeDonutArc(cx, cy, rOut, rIn, startAngle, endAngle) {
    const angleDiff = endAngle - startAngle;
    if (angleDiff >= 2 * Math.PI - 0.001) {
        return `M ${cx} ${cy - rOut} A ${rOut} ${rOut} 0 1 1 ${cx} ${cy + rOut} A ${rOut} ${rOut} 0 1 1 ${cx} ${cy - rOut} M ${cx} ${cy - rIn} A ${rIn} ${rIn} 0 1 0 ${cx} ${cy + rIn} A ${rIn} ${rIn} 0 1 0 ${cx} ${cy - rIn} Z`;
    }

    const xO1 = cx + rOut * Math.cos(startAngle);
    const yO1 = cy + rOut * Math.sin(startAngle);
    const xO2 = cx + rOut * Math.cos(endAngle);
    const yO2 = cy + rOut * Math.sin(endAngle);

    const xI2 = cx + rIn * Math.cos(endAngle);
    const yI2 = cy + rIn * Math.sin(endAngle);
    const xI1 = cx + rIn * Math.cos(startAngle);
    const yI1 = cy + rIn * Math.sin(startAngle);

    const largeArc = angleDiff > Math.PI ? 1 : 0;

    return `M ${xO1} ${yO1} A ${rOut} ${rOut} 0 ${largeArc} 1 ${xO2} ${yO2} L ${xI2} ${yI2} A ${rIn} ${rIn} 0 ${largeArc} 0 ${xI1} ${yI1} Z`;
}

// Precision SVG Donut Chart with Pop-Out Hover and Royal Village Center Medallion
function SvgDonutChart({
    data = [],
    totalAmount = 0,
    centerLabel = 'Total',
    size = 260,
    hoveredIdx,
    setHoveredIdx,
}) {
    const cx = size / 2;
    const cy = size / 2;
    const rOut = 116;
    const rIn = 80;

    const total = data.reduce((acc, item) => acc + item.value, 0) || 1;
    const activeItem = hoveredIdx !== null ? data[hoveredIdx] : null;

    const validSegments = data.filter((item) => item.value > 0);
    const hasMultiple = validSegments.length > 1;
    const gapAngle = hasMultiple ? 0.028 : 0; // ~1.6 degree clean separation gap

    let currentAngle = -Math.PI / 2;

    const slices = data.map((item, idx) => {
        const percent = item.value / total;
        if (percent <= 0) return null;

        const sliceAngle = percent * 2 * Math.PI;
        const start = currentAngle + gapAngle / 2;
        const end = currentAngle + sliceAngle - gapAngle / 2;
        const midAngle = currentAngle + sliceAngle / 2;

        currentAngle += sliceAngle;

        const pathD = describeDonutArc(cx, cy, rOut, rIn, start, end);
        const isHovered = hoveredIdx === idx;

        // Subtle 5px pop-out effect along the bisector angle when hovered
        const tx = isHovered ? Math.cos(midAngle) * 5 : 0;
        const ty = isHovered ? Math.sin(midAngle) * 5 : 0;

        return {
            idx,
            item,
            pathD,
            isHovered,
            tx,
            ty,
        };
    });

    return (
        <div className="relative flex flex-col items-center justify-center select-none py-2">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="overflow-visible"
            >
                {/* Subtle Backdrop Ring */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={(rOut + rIn) / 2}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={rOut - rIn}
                    className="text-zinc-200/50 dark:text-zinc-800/50"
                />

                {/* Slices with Hover Pop-Out & Drop Shadows */}
                {slices.map((slice) => {
                    if (!slice) return null;
                    return (
                        <path
                            key={slice.idx}
                            d={slice.pathD}
                            fill={slice.item.color}
                            className="transition-all duration-200 cursor-pointer"
                            style={{
                                transform: `translate(${slice.tx}px, ${slice.ty}px)`,
                                transformOrigin: `${cx}px ${cy}px`,
                                opacity: hoveredIdx !== null && !slice.isHovered ? 0.45 : 1,
                                filter: slice.isHovered
                                    ? `drop-shadow(0 4px 10px ${slice.item.color}99)`
                                    : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                            }}
                            onMouseEnter={() => setHoveredIdx(slice.idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        />
                    );
                })}
            </svg>

            {/* Royal Crimson & Gold Village Medallion */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-[146px] h-[146px] rounded-full bg-gradient-to-br from-red-800 via-red-900 to-red-950 text-white border border-amber-400/50 shadow-xl shadow-red-950/70 flex flex-col items-center justify-center text-center p-2.5 transition-all duration-300 ring-2 ring-black/40">
                    {activeItem ? (
                        <div className="flex flex-col items-center space-y-0.5 animate-in fade-in zoom-in duration-150 px-1">
                            <span
                                className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white shadow-xs border border-white/20"
                                style={{ backgroundColor: activeItem.color || '#dc2626' }}
                            >
                                {activeItem.code || 'RINCIAN'}
                            </span>
                            <span className="text-sm sm:text-base font-black text-amber-300 tracking-tight leading-tight max-w-[124px] truncate block drop-shadow-xs pt-0.5">
                                {formatRupiah(activeItem.value)}
                            </span>
                            <span className="text-xs font-black text-white">
                                {activeItem.percent}% Porsi
                            </span>
                            <span className="text-[9px] font-semibold text-red-200/90 truncate max-w-[115px] leading-none block">
                                {activeItem.name}
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-1 px-1">
                            <span className="px-2 py-0.5 rounded-full bg-black/40 border border-white/15 text-[8.5px] font-bold uppercase tracking-widest text-amber-300">
                                TOTAL {centerLabel}
                            </span>
                            <span className="text-sm sm:text-base font-black text-white tracking-tight leading-tight max-w-[126px] block drop-shadow-xs">
                                {formatRupiah(totalAmount)}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/40 text-emerald-300 border border-emerald-400/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>Anggaran Resmi</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TransparencyIndex({
    selectedYear = 2026,
    availableYears = [2026, 2025, 2024],
    incomeItems = [],
    expenseCategories = [],
    financings = [],
    summary = {},
}) {
    const [hoveredIncome, setHoveredIncome] = useState(null);
    const [hoveredExpense, setHoveredExpense] = useState(null);

    const totalIncome = summary?.income_budget || incomeItems.reduce((acc, i) => acc + i.amount, 0);
    const totalExpense = summary?.expense_budget || expenseCategories.reduce((acc, g) => acc + g.subtotal, 0);

    // Chart datasets
    const incomeChartData = incomeItems.map((item) => ({
        name: item.name,
        code: item.code,
        value: item.amount > 0 ? item.amount : 0.001,
        percent: item.percent,
        color: item.color,
    }));

    const expenseChartData = expenseCategories.map((group) => ({
        name: group.title,
        value: group.subtotal > 0 ? group.subtotal : 0.001,
        percent: group.percent,
        color: group.color,
    }));

    const iconMap = {
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

    const getBidangIcon = (iconName) => {
        return iconMap[iconName] || Layers;
    };

    return (
        <AppLayout>
            <SeoHead
                title={`Transparansi APBDes Tahun ${selectedYear} - Desa Karangwungu`}
                description={`Laporan resmi publikasi Transparansi Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu Tahun Anggaran ${selectedYear}. Rincian alokasi pendapatan dan belanja 5 bidang desa.`}
                keywords={`APBDes ${selectedYear} Karangwungu, Transparansi Dana Desa ${selectedYear} Karangwungu, APBDes Karanggeneng Lamongan`}
                breadcrumbs={[
                    { label: 'Beranda', url: '/' },
                    { label: 'Transparansi APBDes', url: '/transparansi' },
                    { label: `TA ${selectedYear}`, url: `/transparansi?year=${selectedYear}` },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Akuntabilitas & Publikasi Resmi"
                    title={`Transparansi APBDes Tahun Anggaran ${selectedYear}`}
                    subtitle="Laporan resmi publikasi Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu. Mewujudkan tata kelola keuangan desa yang terbuka, akuntabel, dan tepat sasaran."
                />

                {/* 2. MULTI-YEAR SELECTOR BAR (THEMED RED & GOLD) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 sm:p-4 rounded-lg bg-gradient-to-r from-red-800 via-red-900 to-red-950 text-white border border-red-500/40 shadow-lg">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-amber-400" />
                            <span>Pilih Tahun Anggaran:</span>
                        </span>
                        <div className="inline-flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/15 shadow-inner">
                            {availableYears.map((yr) => {
                                const isCurrent = yr === selectedYear;
                                return (
                                    <Link
                                        key={yr}
                                        href={`/transparansi?year=${yr}`}
                                        preserveScroll
                                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                            isCurrent
                                                ? 'bg-amber-400 text-zinc-950 shadow-md font-black ring-1 ring-amber-300 scale-[1.02]'
                                                : 'text-zinc-200 hover:text-amber-300 hover:bg-white/10'
                                        }`}
                                    >
                                        TA {yr}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-red-200 font-medium">Status Publikasi:</span>
                        <span className="px-3 py-1.5 rounded-lg bg-black/40 text-amber-300 font-bold border border-white/20 inline-flex items-center gap-1.5 shadow-inner">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>Perdes APBDes {selectedYear} Resmi</span>
                        </span>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* 4. PENDAPATAN DESA                                        */}
                {/* ========================================================= */}
                <section id="pendapatan-desa" className="space-y-6 scroll-mt-24">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-lg bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white border border-red-500/40 shadow-lg">
                        <div>
                            <h2 className="text-base sm:text-lg font-black text-white">
                                Pendapatan Desa (TA {selectedYear})
                            </h2>
                            <p className="text-xs text-red-200 font-medium">
                                Alokasi penerimaan dari dana transfer pemerintah pusat, daerah, dan Pendapatan Asli Desa (PADes).
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-xs font-bold text-red-200">Total Anggaran:</span>
                            <span className="text-amber-300 font-black text-lg sm:text-xl tracking-tight">
                                {formatRupiah(totalIncome)}
                            </span>
                        </div>
                    </div>

                    {/* Chart & Legend Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
                            <SvgDonutChart
                                data={incomeChartData}
                                totalAmount={totalIncome}
                                centerLabel="Pendapatan"
                                size={260}
                                hoveredIdx={hoveredIncome}
                                setHoveredIdx={setHoveredIncome}
                            />
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {incomeItems.map((item, idx) => {
                                const isHovered = hoveredIncome === idx;
                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredIncome(idx)}
                                        onMouseLeave={() => setHoveredIncome(null)}
                                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between bg-gradient-to-b from-red-800 to-red-950 text-white shadow-sm ${
                                            isHovered
                                                ? 'border-amber-400 shadow-md scale-[1.01] ring-1 ring-amber-400/40'
                                                : 'border-red-500/40 hover:border-amber-400/80'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white/20"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-black/50 text-amber-300 border border-white/20 shrink-0">
                                                {item.code}
                                            </span>
                                            <div className="min-w-0">
                                                <span className="text-xs font-bold text-white truncate block">
                                                    {item.name}
                                                </span>
                                                <span className="text-[11px] font-semibold text-red-200 block truncate">
                                                    {formatRupiah(item.amount)}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-zinc-950 shrink-0 shadow-xs">
                                            {item.percent}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Table Rincian Pendapatan */}
                    <div className="rounded-lg overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-800 to-red-950 text-white shadow-lg">
                        <div className="px-4 py-3 flex items-center justify-between border-b border-red-500/30 bg-black/25">
                            <div className="flex items-center gap-2">
                                <FileSpreadsheet className="h-4 w-4 text-amber-300" />
                                <h4 className="font-black text-xs sm:text-sm text-white">
                                    Tabel Rincian Sumber Pendapatan Desa
                                </h4>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-zinc-950 font-black text-xs shadow-xs">
                                {formatRupiah(totalIncome)}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-black/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-red-500/20">
                                    <tr>
                                        <th className="py-2.5 px-3 w-10 text-center">No</th>
                                        <th className="py-2.5 px-3">Uraian Sumber Pendapatan</th>
                                        <th className="py-2.5 px-3 w-32 text-center">Porsi (%)</th>
                                        <th className="py-2.5 px-4 text-right">Jumlah Anggaran</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-red-500/20 text-white">
                                    {incomeItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-black/20 transition-colors">
                                            <td className="py-2.5 px-3 text-center text-red-300 font-bold text-[11px]">
                                                {idx + 1}
                                            </td>
                                            <td className="py-2.5 px-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-1.5 py-0.5 rounded-lg text-[9.5px] font-black bg-black/40 text-amber-300 border border-white/20 shrink-0">
                                                        {item.code}
                                                    </span>
                                                    <div>
                                                        <span className="font-bold text-white block text-xs">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[10.5px] text-red-200/80 block">
                                                            {item.desc}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span className="text-xs font-black text-amber-300">
                                                    {item.percent}%
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-4 text-right font-mono font-bold text-white">
                                                {formatRupiah(item.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ========================================================= */}
                {/* 5. BELANJA DESA (5 BIDANG)                                */}
                {/* ========================================================= */}
                <section id="belanja-desa" className="space-y-6 scroll-mt-24 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-lg bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white border border-red-500/40 shadow-lg">
                        <div>
                            <h2 className="text-base sm:text-lg font-black text-white">
                                Belanja Desa ({expenseCategories.length} Bidang) – TA {selectedYear}
                            </h2>
                            <p className="text-xs text-red-200 font-medium">
                                Pengeluaran anggaran untuk pembangunan infrastruktur, tata kelola pemerintahan, pembinaan, dan penanggulangan bencana.
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-xs font-bold text-red-200">Total Anggaran:</span>
                            <span className="text-amber-300 font-black text-lg sm:text-xl tracking-tight">
                                {formatRupiah(totalExpense)}
                            </span>
                        </div>
                    </div>

                    {/* Chart & Bidang Summary Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
                            <SvgDonutChart
                                data={expenseChartData}
                                totalAmount={totalExpense}
                                centerLabel="Belanja"
                                size={260}
                                hoveredIdx={hoveredExpense}
                                setHoveredIdx={setHoveredExpense}
                            />
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {expenseCategories.map((group, idx) => {
                                const isHovered = hoveredExpense === idx;
                                const IconComponent = getBidangIcon(group.icon);

                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredExpense(idx)}
                                        onMouseLeave={() => setHoveredExpense(null)}
                                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer flex items-center justify-between bg-gradient-to-b from-red-800 to-red-950 text-white shadow-sm ${
                                            isHovered
                                                ? 'border-amber-400 shadow-md scale-[1.01] ring-1 ring-amber-400/40'
                                                : 'border-red-500/40 hover:border-amber-400/80'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white/20"
                                                style={{ backgroundColor: group.color }}
                                            />
                                            <div className="h-7 w-7 rounded-lg bg-black/40 border border-white/20 text-amber-300 flex items-center justify-center shrink-0">
                                                <IconComponent className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-xs font-bold text-white truncate block">
                                                    {group.title}
                                                </span>
                                                <span className="text-[11px] font-semibold text-red-200 block truncate">
                                                    {formatRupiah(group.subtotal)}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-zinc-950 shrink-0 shadow-xs">
                                            {group.percent}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detailed Activities per Bidang (Cards with rounded-lg) */}
                    <div className="space-y-4 pt-2">
                        {expenseCategories.map((group, gIdx) => {
                            const IconComponent = getBidangIcon(group.icon);

                            return (
                                <div
                                    key={gIdx}
                                    className="rounded-lg overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-800 to-red-950 text-white shadow-md"
                                >
                                    <div className="px-4 py-3 flex items-center justify-between border-b border-red-500/30 bg-black/25">
                                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                            <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                                <IconComponent className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-black text-xs sm:text-sm text-white truncate">
                                                    {group.title}
                                                </h4>
                                                <span className="text-[10px] text-red-200 block font-medium">
                                                    {group.items?.length || 0} Subkegiatan • Porsi {group.percent}%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-zinc-950 font-black text-xs shadow-xs">
                                                {formatRupiah(group.subtotal)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Activities table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-black/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-red-500/20">
                                                <tr>
                                                    <th className="py-2 px-3 w-10 text-center">No</th>
                                                    <th className="py-2 px-3">Uraian Rencana Kegiatan</th>
                                                    <th className="py-2 px-4 text-right">Jumlah Anggaran</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-red-500/20 text-white">
                                                {group.items && group.items.length > 0 ? (
                                                    group.items.map((act, aIdx) => (
                                                        <tr key={aIdx} className="hover:bg-black/20 transition-colors">
                                                            <td className="py-2.5 px-3 text-center text-red-300 font-bold text-[11px]">
                                                                {aIdx + 1}
                                                            </td>
                                                            <td className="py-2.5 px-3 font-medium text-white text-xs">
                                                                {act.subcategory_name}
                                                            </td>
                                                            <td className="py-2.5 px-4 text-right font-mono font-bold text-white">
                                                                {formatRupiah(act.budget_amount)}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="py-4 text-center text-xs text-red-200/60">
                                                            Belum ada rincian kegiatan tercatat pada bidang ini.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>


            </div>
        </AppLayout>
    );
}
