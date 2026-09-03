import React, { useState } from 'react';
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
} from 'lucide-react';

// Sleek Interactive SVG Donut Chart with News-Style Red-Gold Center Hub
function SvgDonutChart({ data = [], totalAmount = 0, centerLabel = 'Total', size = 250, strokeWidth = 32, hoveredIdx, setHoveredIdx }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    const total = data.reduce((acc, item) => acc + item.value, 0) || 1;
    let accumulatedPercent = 0;

    const activeItem = hoveredIdx !== null ? data[hoveredIdx] : null;

    return (
        <div className="relative flex flex-col items-center justify-center select-none">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">

                {/* Inner Track Ring */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-zinc-200/90 dark:text-zinc-800"
                />

                {/* Data Segments */}
                {data.map((item, idx) => {
                    const percent = (item.value / total);
                    const strokeDasharray = `${percent * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedPercent * circumference;
                    accumulatedPercent += percent;

                    const isHovered = hoveredIdx === idx;

                    return (
                        <circle
                            key={idx}
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="transparent"
                            stroke={item.color}
                            strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="butt"
                            className="transition-all duration-300 cursor-pointer origin-center"
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            style={{
                                opacity: hoveredIdx !== null && !isHovered ? 0.4 : 1,
                                filter: isHovered ? `drop-shadow(0 0 8px ${item.color}80)` : 'none'
                            }}
                        />
                    );
                })}
            </svg>

            {/* Center Summary Hub */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="h-28 w-28 rounded-full bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white border-2 border-amber-400 shadow-xl shadow-red-950/50 flex flex-col items-center justify-center text-center p-2.5 transition-all duration-300">
                    {activeItem ? (
                        <div className="animate-in fade-in zoom-in duration-150 flex flex-col items-center space-y-0.5">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-zinc-950 uppercase tracking-wider shadow-xs">
                                {activeItem.code || 'Item'}
                            </span>
                            <span className="text-lg font-black text-amber-300 tracking-tight leading-none pt-0.5">
                                {activeItem.percent}%
                            </span>
                            <span className="text-[10px] font-semibold text-red-100 truncate max-w-[85px] leading-tight">
                                {formatRupiah(activeItem.value)}
                            </span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-0.5">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300">
                                {centerLabel}
                            </span>
                            <span className="text-sm font-black text-white tracking-tight leading-tight">
                                Rp 1,38 M
                            </span>
                            <span className="text-[9px] font-bold text-red-200">
                                100% Total
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TransparencyIndex({
    incomes = [],
    expenses = [],
}) {
    const [hoveredIncome, setHoveredIncome] = useState(null);
    const [hoveredExpense, setHoveredExpense] = useState(null);

    // 1. PENDAPATAN DATA (Official Poster Items)
    const incomeItems = [
        {
            name: 'Dana Desa (DD)',
            desc: 'Pemerintah Pusat (APBN)',
            percent: '56.66',
            amount: 785251000,
            color: '#ef4444', // Red
            code: 'DD',
        },
        {
            name: 'Alokasi Dana Desa (ADD)',
            desc: 'Pemerintah Kabupaten Lamongan',
            percent: '19.93',
            amount: 276248000,
            color: '#a855f7', // Purple
            code: 'ADD',
        },
        {
            name: 'Bantuan Keuangan Kabupaten (PBK)',
            desc: 'Bantuan Keuangan Khusus Kab. Lamongan',
            percent: '15.15',
            amount: 210000000,
            color: '#06b6d4', // Cyan
            code: 'PBK',
        },
        {
            name: 'Pendapatan Asli Desa (PAD)',
            desc: 'Hasil Tanah Kas & Aset Desa',
            percent: '5.77',
            amount: 80000000,
            color: '#3b82f6', // Blue
            code: 'PAD',
        },
        {
            name: 'Bagi Hasil Pajak & Retribusi (PBH)',
            desc: 'Pemerintah Daerah Lamongan',
            percent: '2.05',
            amount: 28480500,
            color: '#10b981', // Green
            code: 'PBH',
        },
        {
            name: 'Pendapatan Lain-Lain Sah (DLL)',
            desc: 'Pendapatan Sah Lainnya',
            percent: '0.43',
            amount: 6000000,
            color: '#818cf8', // Indigo
            code: 'DLL',
        },
        {
            name: 'Bantuan Keuangan Provinsi (PBP)',
            desc: 'Pemerintah Provinsi Jawa Timur',
            percent: '0.00',
            amount: 0,
            color: '#fbbf24', // Amber
            code: 'PBP',
        },
    ];

    const totalIncome = incomeItems.reduce((acc, i) => acc + i.amount, 0);

    const incomeChartData = incomeItems.map((item) => ({
        name: item.name,
        code: item.code,
        value: item.amount > 0 ? item.amount : 0.001,
        percent: item.percent,
        color: item.color,
    }));

    // 2. BELANJA DATA - Exact Authentic Activities per 5 Bidang
    const fallbackPembangunanItems = [
        { subcategory_name: 'Pembangunan Gedung Serba Guna', budget_amount: 360000000 },
        { subcategory_name: 'TPT (Tembok Penahan Tanah) Dan Makadam', budget_amount: 160000000 },
        { subcategory_name: 'Rehabilitasi Kantor Desa', budget_amount: 100000000 },
        { subcategory_name: 'Tembok Penahan Tanah (Depan Balai Desa)', budget_amount: 75000000 },
        { subcategory_name: 'Pembangunan Jalan Utama', budget_amount: 35000000 },
        { subcategory_name: 'Pencegahan Stunting', budget_amount: 24801000 },
        { subcategory_name: 'Bantuan Operasional Mobil Sehat', budget_amount: 20000000 },
        { subcategory_name: 'Insentif Guru PAUD/TK/TPA/TPQ/Madrasah', budget_amount: 14250000 },
        { subcategory_name: 'Pemutakhiran data SDGs Desa', budget_amount: 10000000 },
    ];

    const fallbackPemerintahanItems = [
        { subcategory_name: 'Penghasilan Tetap dan Tunjangan', budget_amount: 312557840 },
        { subcategory_name: 'Operasional Pemerintahan Desa', budget_amount: 46036536 },
        { subcategory_name: 'Kegiatan Pembayaran Premi Asuransi/BPJS', budget_amount: 18209124 },
        { subcategory_name: 'Penyediaan Operasional dan Tunjangan BPD', budget_amount: 11900000 },
        { subcategory_name: 'Operasional operator siskeudes', budget_amount: 9000000 },
        { subcategory_name: 'Insentif RT/RW', budget_amount: 5200000 },
        { subcategory_name: 'Kegiatan Fasilitasi Kegiatan Hari Besar', budget_amount: 5100000 },
        { subcategory_name: 'Operasional PKK', budget_amount: 4000000 },
        { subcategory_name: 'Operasional LPM', budget_amount: 2500000 },
        { subcategory_name: 'Penyusunan RKP', budget_amount: 2500000 },
        { subcategory_name: 'Penyusunan APBDes', budget_amount: 2500000 },
        { subcategory_name: 'Operasional Karangtaruna', budget_amount: 1500000 },
        { subcategory_name: 'Operasional Posyandu', budget_amount: 1000000 },
        { subcategory_name: 'Operasional Linmas', budget_amount: 725000 },
    ];

    const fallbackBencanaItems = [
        { subcategory_name: 'Bantuan Langsung Tunai (BLT)', budget_amount: 79200000 },
        { subcategory_name: 'Mitigasi Bencana', budget_amount: 25000000 },
    ];

    const fallbackPemberdayaanItems = [
        { subcategory_name: 'Penyertaan Modal Bumdes', budget_amount: 50000000 },
    ];

    const fallbackPembinaanItems = [
        { subcategory_name: 'Kegiatan Pembinaan Peningkatan Kapasitas Perangkat Desa', budget_amount: 10000000 },
    ];

    const expenseCategories = [
        {
            key: 'Bidang Pelaksanaan Pembangunan Desa',
            title: 'Pelaksanaan Pembangunan Desa',
            color: '#ef4444',
            percent: '57.65',
            icon: Hammer,
            items: fallbackPembangunanItems,
            subtotal: 799051000,
        },
        {
            key: 'Bidang Penyelenggaraan Pemerintahan Desa',
            title: 'Penyelenggaraan Pemerintahan',
            color: '#06b6d4',
            percent: '30.50',
            icon: Landmark,
            items: fallbackPemerintahanItems,
            subtotal: 422728500,
        },
        {
            key: 'Bidang Penanggulangan Bencana',
            title: 'Penanggulangan Bencana & Mendesak',
            color: '#f59e0b',
            percent: '7.52',
            icon: AlertTriangle,
            items: fallbackBencanaItems,
            subtotal: 104200000,
        },
        {
            key: 'Bidang Pemberdayaan Masyarakat',
            title: 'Pemberdayaan Masyarakat',
            color: '#a855f7',
            percent: '3.61',
            icon: Users,
            items: fallbackPemberdayaanItems,
            subtotal: 50000000,
        },
        {
            key: 'Bidang Pembinaan Kemasyarakatan',
            title: 'Pembinaan Kemasyarakatan',
            color: '#10b981',
            percent: '0.72',
            icon: HeartHandshake,
            items: fallbackPembinaanItems,
            subtotal: 10000000,
        },
    ];

    const totalExpense = 1385979500;

    const expenseChartData = expenseCategories.map((group) => ({
        name: group.title,
        value: group.subtotal,
        percent: group.percent,
        color: group.color,
    }));

    return (
        <AppLayout>
            <SeoHead
                title="Transparansi APBDes Desa Karangwungu"
                description="Laporan Transparansi Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu, Kec. Karanggeneng, Kab. Lamongan. Rincian Pendapatan dan Belanja 5 Bidang Desa."
                keywords="APBDes Karangwungu, Transparansi Dana Desa Karangwungu, APBDes Karanggeneng Lamongan"
                breadcrumbs={[{ label: 'Transparansi APBDes', url: '/transparansi' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Akuntabilitas & Publikasi Resmi"
                    title="Transparansi Anggaran & Realisasi APBDes"
                    subtitle="Laporan resmi publikasi Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu. Mewujudkan tata kelola keuangan desa yang terbuka, akuntabel, dan tepat sasaran."
                />


                {/* ========================================================= */}
                {/* 1. PENDAPATAN DESA                                        */}
                {/* ========================================================= */}
                <section id="pendapatan-desa" className="space-y-8 scroll-mt-24">
                    {/* Header Bar with News-Style Red Gradient */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white border border-red-500/40 shadow-lg shadow-red-950/20">
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-white">
                                Pendapatan Desa
                            </h2>
                            <p className="text-xs text-red-200 font-medium">
                                Alokasi penerimaan dari dana transfer pemerintah pusat, daerah, dan PADes
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-xs font-bold text-red-200">Total:</span>
                            <span className="text-amber-300 font-black text-xl sm:text-2xl tracking-tight">
                                {formatRupiah(totalIncome)}
                            </span>
                        </div>
                    </div>

                    {/* Chart & Modern Legend Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Donut Chart (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
                            <SvgDonutChart
                                data={incomeChartData}
                                totalAmount={totalIncome}
                                centerLabel="Pendapatan"
                                size={230}
                                strokeWidth={34}
                                hoveredIdx={hoveredIncome}
                                setHoveredIdx={setHoveredIncome}
                            />
                        </div>

                        {/* News-Style Red Gradient Legend Grid */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {incomeItems.map((item, idx) => {
                                const isHovered = hoveredIncome === idx;
                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredIncome(idx)}
                                        onMouseLeave={() => setHoveredIncome(null)}
                                        className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-md shadow-red-950/20 ${
                                            isHovered
                                                ? 'border-amber-400 shadow-xl shadow-red-950/40 scale-102 -translate-y-0.5'
                                                : 'border-red-500/40 hover:border-amber-400'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0 pr-2">
                                            <span className="px-2 py-1 rounded-md text-[10px] font-black bg-black/40 text-amber-300 border border-white/20 shrink-0 shadow-xs">
                                                {item.code}
                                            </span>
                                            <div className="min-w-0">
                                                <span className="text-xs font-bold text-white truncate block group-hover:text-amber-300 transition-colors">
                                                    {item.name}
                                                </span>
                                                <span className="text-[11px] font-semibold text-red-200 block truncate">
                                                    {formatRupiah(item.amount)}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-zinc-950 shrink-0 shadow-xs">
                                            {item.percent}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Rincian Pendapatan Desa Card */}
                    <div className="space-y-3 pt-2">
                        <div className="rounded-xl overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 flex flex-col">
                            {/* Card Header with News-Style Red Bar */}
                            <div className="px-4 py-3.5 flex items-center justify-between border-b border-red-500/30 bg-black/20">
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                    <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <FileSpreadsheet className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black text-xs sm:text-sm text-white truncate">
                                            Rincian Sumber Pendapatan Desa
                                        </h4>
                                        <span className="text-[10px] text-red-200 block font-medium">
                                            7 Sumber Penerimaan Anggaran
                                        </span>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-xs shrink-0 shadow-xs">
                                    {formatRupiah(totalIncome)}
                                </span>
                            </div>

                            {/* Table Content */}
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-black/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-red-500/20">
                                        <tr>
                                            <th className="py-2.5 px-3 w-10 text-center">No</th>
                                            <th className="py-2.5 px-3">Uraian Sumber Pendapatan</th>
                                            <th className="py-2.5 px-3 w-36 text-center">Porsi (%)</th>
                                            <th className="py-2.5 px-4 text-right">Jumlah Anggaran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-red-500/20 text-white">
                                        {incomeItems.map((item, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-black/20 transition-colors"
                                            >
                                                <td className="py-3 px-3 text-center text-red-300 font-bold text-[11px]">
                                                    {idx + 1}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-black/40 text-amber-300 border border-white/20 shrink-0">
                                                            {item.code}
                                                        </span>
                                                        <div>
                                                            <span className="font-bold text-white block text-xs sm:text-sm">
                                                                {item.name}
                                                            </span>
                                                            <span className="text-[11px] text-red-200/80 block">
                                                                {item.desc}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-16 h-1.5 rounded-full bg-black/40 overflow-hidden hidden sm:block">
                                                            <div
                                                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300"
                                                                style={{
                                                                    width: `${Math.min(Number(item.percent), 100)}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-black text-amber-300">
                                                            {item.percent}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-right font-bold text-white text-xs sm:text-sm whitespace-nowrap">
                                                    {item.amount > 0 ? formatRupiah(item.amount) : 'Rp 0'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-black/40 border-t border-red-500/30 text-white font-bold text-xs">
                                        <tr>
                                            <td colSpan={2} className="py-3 px-4 text-white uppercase text-[11px] font-black tracking-wider">
                                                Jumlah Total Pendapatan
                                            </td>
                                            <td className="py-3 px-3 text-center font-black text-xs text-amber-300">
                                                100%
                                            </td>
                                            <td className="py-3 px-4 text-right font-black text-sm sm:text-base text-amber-300 whitespace-nowrap">
                                                {formatRupiah(totalIncome)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================= */}
                {/* 2. BELANJA DESA                                           */}
                {/* ========================================================= */}
                <section id="belanja-desa" className="space-y-8 pt-4 scroll-mt-24">
                    {/* Header Bar with News-Style Red Gradient */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white border border-red-500/40 shadow-lg shadow-red-950/20">
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-white">
                                Belanja & Pengeluaran Desa
                            </h2>
                            <p className="text-xs text-red-200 font-medium">
                                Alokasi anggaran pembangunan, pemerintahan, pemberdayaan, dan tanggap darurat
                            </p>
                        </div>

                        <div className="flex items-baseline gap-2 shrink-0">
                            <span className="text-xs font-bold text-red-200">Total:</span>
                            <span className="text-amber-300 font-black text-xl sm:text-2xl tracking-tight">
                                {formatRupiah(totalExpense)}
                            </span>
                        </div>
                    </div>

                    {/* Chart & 5 Bidang Proportion Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Donut Chart (5 cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center py-2">
                            <SvgDonutChart
                                data={expenseChartData}
                                totalAmount={totalExpense}
                                centerLabel="Belanja"
                                size={230}
                                strokeWidth={34}
                                hoveredIdx={hoveredExpense}
                                setHoveredIdx={setHoveredExpense}
                            />
                        </div>

                        {/* 5 Bidang Cards */}
                        <div className="lg:col-span-7 space-y-2.5">
                            {expenseCategories.map((cat, idx) => {
                                const IconComponent = cat.icon || Hammer;
                                const isHovered = hoveredExpense === idx;
                                return (
                                    <div
                                        key={idx}
                                        onMouseEnter={() => setHoveredExpense(idx)}
                                        onMouseLeave={() => setHoveredExpense(null)}
                                        className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-md shadow-red-950/20 ${
                                            isHovered
                                                ? 'border-amber-400 shadow-xl shadow-red-950/40 scale-102 -translate-y-0.5'
                                                : 'border-red-500/40 hover:border-amber-400'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                <div className="h-6 w-6 rounded-md bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                                                    <IconComponent className="h-3.5 w-3.5" />
                                                </div>
                                                <span className="font-bold text-white truncate text-xs sm:text-sm">
                                                    {cat.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="text-red-100 font-bold">
                                                    {formatRupiah(cat.subtotal)}
                                                </span>
                                                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-zinc-950 shrink-0 shadow-xs">
                                                    {cat.percent}%
                                                </span>
                                            </div>
                                        </div>
                                        {/* Progress Line */}
                                        <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-300"
                                                style={{
                                                    width: `${Math.min(Number(cat.percent), 100)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3-COLUMN NEWS-STYLE RED GRADIENT CARDS FOR 5 BIDANG ACTIVITIES */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                <Layers className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                <span>Rincian Kegiatan per Bidang Belanja</span>
                            </h3>
                            <span className="text-xs text-zinc-500 font-medium">5 Bidang Penyerapan</span>
                        </div>

                        {/* 3-Column Responsive Grid with News-Style Red Gradient Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                            {expenseCategories.map((group, gIdx) => {
                                const IconComponent = group.icon || Hammer;
                                return (
                                    <div
                                        key={gIdx}
                                        className="rounded-xl overflow-hidden border border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/25 flex flex-col hover:border-amber-400 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        {/* Card Header with News-Style Red Bar */}
                                        <div className="px-4 py-3.5 flex items-center justify-between border-b border-red-500/30 bg-black/20">
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                                    <IconComponent className="h-3.5 w-3.5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-black text-xs sm:text-sm text-white truncate">
                                                        {group.title}
                                                    </h4>
                                                    <span className="text-[10px] text-red-200 block font-medium">
                                                        {group.items.length} Rincian Kegiatan
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="px-2.5 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-xs shrink-0 shadow-xs">
                                                {formatRupiah(group.subtotal)}
                                            </span>
                                        </div>

                                        {/* Activity List with Clean Headers */}
                                        <div className="overflow-x-auto flex-1">
                                            <table className="w-full text-left text-xs">
                                                <thead className="bg-black/40 text-[10px] font-bold text-amber-300 uppercase tracking-wider border-b border-red-500/20">
                                                    <tr>
                                                        <th className="py-2.5 px-3 w-8 text-center">No</th>
                                                        <th className="py-2.5 px-2">Nama Kegiatan</th>
                                                        <th className="py-2.5 px-3 text-right">Jumlah Anggaran</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-red-500/20 text-white">
                                                    {group.items.map((item, itemIdx) => (
                                                        <tr
                                                            key={itemIdx}
                                                            className="hover:bg-black/20 transition-colors"
                                                        >
                                                            <td className="py-2.5 px-3 text-center text-red-300 font-bold text-[11px] w-8">
                                                                {itemIdx + 1}
                                                            </td>
                                                            <td className="py-2.5 px-2 text-white font-medium">
                                                                {item.subcategory_name}
                                                            </td>
                                                            <td className="py-2.5 px-3 text-right font-bold text-amber-200 whitespace-nowrap">
                                                                {formatRupiah(item.budget_amount)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot className="bg-black/40 border-t border-red-500/30 text-white font-bold text-xs">
                                                    <tr>
                                                        <td colSpan={2} className="py-2.5 px-3 text-white uppercase text-[10px] font-black tracking-wider">
                                                            Jumlah Total
                                                        </td>
                                                        <td className="py-2.5 px-3 text-right font-black text-xs text-amber-300">
                                                            {formatRupiah(group.subtotal)}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Bottom Slogan Brush Banner */}
                <div className="pt-6 pb-4 text-center">
                    <span className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-red-500/40 font-black text-base sm:text-lg italic tracking-wide shadow-xl shadow-red-950/20">
                        &ldquo;Bangga membangun desa..!&rdquo;
                    </span>
                    <p className="text-xs text-zinc-400 mt-2">
                        Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
