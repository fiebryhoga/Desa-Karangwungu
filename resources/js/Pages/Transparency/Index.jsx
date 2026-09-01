import React from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../Components/UI/Card';
import { formatRupiah } from '../../Utils/format';
import { DollarSign, TrendingUp, TrendingDown, PieChart, ShieldCheck, CheckCircle2, FileSpreadsheet } from 'lucide-react';

export default function TransparencyIndex({
    selectedYear = 2026,
    availableYears = [2026, 2025, 2024],
    incomes = [],
    expenses = [],
    financings = [],
    summary = {},
}) {
    const handleYearChange = (year) => {
        router.get('/transparansi', { year });
    };

    return (
        <AppLayout>
            <SeoHead
                title={`Transparansi APBDes Tahun Anggaran ${selectedYear}`}
                description={`Laporan Transparansi Anggaran Pendapatan dan Belanja Desa (APBDes) Karangwungu Tahun ${selectedYear}. Rincian Dana Desa, Alokasi Dana Desa, Belanja Pembangunan, dan Pemberdayaan Warga.`}
                keywords={`APBDes Karangwungu ${selectedYear}, Transparansi Dana Desa Karangwungu, Anggaran Desa Karanggeneng Lamongan`}
                breadcrumbs={[{ label: 'Transparansi APBDes', url: '/transparansi' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={[{ label: 'Transparansi APBDes', url: '/transparansi' }]} />

                {/* Header Banner */}
                <div className="my-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Badge variant="gold">Akuntabilitas Publik</Badge>
                        <h1 className="text-3xl font-extrabold text-white mt-2">
                            Transparansi APBDes Tahun {selectedYear}
                        </h1>
                        <p className="text-base text-zinc-300 mt-1 max-w-2xl leading-relaxed">
                            Laporan realisasi Anggaran Pendapatan dan Belanja Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan.
                        </p>
                    </div>

                    {/* Year Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-400">Pilih Tahun:</span>
                        <div className="flex rounded-lg border border-zinc-700 p-1 bg-zinc-950">
                            {availableYears.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => handleYearChange(y)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                                        selectedYear === y
                                            ? 'bg-amber-500 text-zinc-950 shadow-sm'
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    {/* Pendapatan */}
                    <Card className="border-l-4 border-l-amber-500">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-zinc-400">Total Pendapatan Desa</span>
                                <Badge variant="gold">{summary.income_percent}%</Badge>
                            </div>
                            <CardTitle className="text-2xl font-bold text-amber-400 mt-1">
                                {formatRupiah(summary.income_budget)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Realisasi:</span>
                                <span className="font-semibold text-white">{formatRupiah(summary.income_realized)}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                                <div
                                    className="h-full bg-amber-500"
                                    style={{ width: `${Math.min(summary.income_percent || 0, 100)}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Belanja */}
                    <Card className="border-l-4 border-l-red-600">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-zinc-400">Total Belanja Desa</span>
                                <Badge variant="red">{summary.expense_percent}%</Badge>
                            </div>
                            <CardTitle className="text-2xl font-bold text-red-400 mt-1">
                                {formatRupiah(summary.expense_budget)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Realisasi:</span>
                                <span className="font-semibold text-white">{formatRupiah(summary.expense_realized)}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                                <div
                                    className="h-full bg-red-600"
                                    style={{ width: `${Math.min(summary.expense_percent || 0, 100)}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pembiayaan */}
                    <Card className="border-l-4 border-l-amber-600">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-semibold text-zinc-400">Pembiayaan Neto</span>
                                <Badge variant="gold">{summary.financing_percent}%</Badge>
                            </div>
                            <CardTitle className="text-2xl font-bold text-amber-300 mt-1">
                                {formatRupiah(summary.financing_budget)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>Realisasi:</span>
                                <span className="font-semibold text-white">{formatRupiah(summary.financing_realized)}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                                <div
                                    className="h-full bg-amber-600"
                                    style={{ width: `${Math.min(summary.financing_percent || 0, 100)}%` }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detail Table: Pendapatan */}
                <div className="space-y-8 my-8">
                    <Card>
                        <CardHeader className="border-b border-zinc-800">
                            <CardTitle className="text-base flex items-center gap-2 text-amber-400">
                                <TrendingUp className="h-5 w-5 text-amber-400" />
                                <span>Rincian Pendapatan Desa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-950 text-xs font-semibold text-zinc-400 border-b border-zinc-800">
                                    <tr>
                                        <th className="px-6 py-3">Kategori Sumber Pendapatan</th>
                                        <th className="px-6 py-3">Sub Kategori</th>
                                        <th className="px-6 py-3 text-right">Anggaran (Rp)</th>
                                        <th className="px-6 py-3 text-right">Realisasi (Rp)</th>
                                        <th className="px-6 py-3 text-right">%</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {incomes.map((item, idx) => {
                                        const percent = item.budget_amount > 0 ? Math.round((item.realized_amount / item.budget_amount) * 100) : 0;
                                        return (
                                            <tr key={idx} className="hover:bg-zinc-800/40">
                                                <td className="px-6 py-3.5 font-semibold text-white">{item.category_name}</td>
                                                <td className="px-6 py-3.5 text-zinc-400">{item.subcategory_name || '-'}</td>
                                                <td className="px-6 py-3.5 text-right font-mono text-zinc-300">{formatRupiah(item.budget_amount)}</td>
                                                <td className="px-6 py-3.5 text-right font-mono font-bold text-amber-400">{formatRupiah(item.realized_amount)}</td>
                                                <td className="px-6 py-3.5 text-right font-bold text-amber-400">{percent}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Detail Table: Belanja */}
                    <Card>
                        <CardHeader className="border-b border-zinc-800">
                            <CardTitle className="text-base flex items-center gap-2 text-red-400">
                                <TrendingDown className="h-5 w-5 text-red-400" />
                                <span>Rincian Belanja & Pembangunan Desa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-950 text-xs font-semibold text-zinc-400 border-b border-zinc-800">
                                    <tr>
                                        <th className="px-6 py-3">Bidang Belanja</th>
                                        <th className="px-6 py-3">Peruntukan Kegiatan</th>
                                        <th className="px-6 py-3 text-right">Anggaran (Rp)</th>
                                        <th className="px-6 py-3 text-right">Realisasi (Rp)</th>
                                        <th className="px-6 py-3 text-right">%</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {expenses.map((item, idx) => {
                                        const percent = item.budget_amount > 0 ? Math.round((item.realized_amount / item.budget_amount) * 100) : 0;
                                        return (
                                            <tr key={idx} className="hover:bg-zinc-800/40">
                                                <td className="px-6 py-3.5 font-semibold text-white">{item.category_name}</td>
                                                <td className="px-6 py-3.5 text-zinc-400">{item.subcategory_name || '-'}</td>
                                                <td className="px-6 py-3.5 text-right font-mono text-zinc-300">{formatRupiah(item.budget_amount)}</td>
                                                <td className="px-6 py-3.5 text-right font-mono font-bold text-red-400">{formatRupiah(item.realized_amount)}</td>
                                                <td className="px-6 py-3.5 text-right font-bold text-red-400">{percent}%</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
