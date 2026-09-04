import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import {
    Scale,
    FileText,
    Download,
    Search,
    Calendar,
    CheckCircle2,
    AlertCircle,
    X,
    Filter,
    BookOpen,
    Sparkles,
    FileCheck,
    ArrowRight,
    Building2,
    Shield,
    ExternalLink,
} from 'lucide-react';

export default function ServicesIndex({
    legalProducts = [],
    availableTypes = [],
    availableYears = [],
    filters = { search: '', type: 'all', year: 'all', status: 'all' },
}) {
    // Client-side search & filtering
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || 'all');
    const [selectedYear, setSelectedYear] = useState(filters.year || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');

    // Filter computation
    const filteredProducts = useMemo(() => {
        return legalProducts.filter((item) => {
            const matchSearch =
                !searchTerm.trim() ||
                item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.document_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchType =
                selectedType === 'all' || item.document_type === selectedType;

            const matchYear =
                selectedYear === 'all' || String(item.year) === String(selectedYear);

            const matchStatus =
                selectedStatus === 'all' || item.status === selectedStatus;

            return matchSearch && matchType && matchYear && matchStatus;
        });
    }, [legalProducts, searchTerm, selectedType, selectedYear, selectedStatus]);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedType('all');
        setSelectedYear('all');
        setSelectedStatus('all');
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Berlaku</span>
                    </span>
                );
            case 'amended':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        <AlertCircle className="h-3 w-3" />
                        <span>Diubah</span>
                    </span>
                );
            case 'repealed':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
                        <X className="h-3 w-3" />
                        <span>Dicabut</span>
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout>
            <SeoHead
                title="Produk Hukum & Regulasi Desa Karangwungu"
                description="Katalog resmi produk hukum Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Peraturan Desa (Perdes), Surat Keputusan (SK) Kepala Desa, dan Keputusan BPD yang berlaku."
                keywords="Produk Hukum Desa Karangwungu, Perdes Karangwungu, SK Kades Karangwungu, Regulasi Desa Lamongan, JDIH Desa Karangwungu"
                breadcrumbs={[{ label: 'Produk Hukum Desa', url: '/layanan' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header Banner */}
                <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-red-900 via-red-950 to-zinc-950 text-white border border-red-800/40 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
                                <Scale className="h-3.5 w-3.5" />
                                <span>JDIH & Keterbukaan Informasi Desa</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                                Katalog Produk Hukum & Regulasi Desa
                            </h1>
                            <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
                                Dokumentasi resmi hukum Pemerintah Desa Karangwungu. Akses dan unduh lembaran Peraturan Desa (Perdes), Surat Keputusan (SK) Kepala Desa, dan kebijakan tata kelola desa yang berlaku secara transparan.
                            </p>
                        </div>

                        {/* Quick Action: Permohonan Surat Online */}
                        <div className="p-4 sm:p-5 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md space-y-3 shrink-0 lg:max-w-sm">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                                <Sparkles className="h-4 w-4" />
                                <span>Layanan Administrasi Warga</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed">
                                Perlu mengajukan surat keterangan pengantar (SKU, Domisili, SKTM, dll) secara daring?
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                                <Link
                                    href="/layanan/ajukan"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors shadow-sm"
                                >
                                    <span>Ajukan Surat Online</span>
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                                <Link
                                    href="/layanan/lacak"
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                                >
                                    <span>Lacak Berkas</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-4 sm:p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
                    {/* Top Row: Search & Quick Counts */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari judul perdes, nomor SK kades, atau perihal regulasi..."
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter Selectors: Year & Status */}
                        <div className="flex items-center gap-2 shrink-0">
                            {/* Year Filter */}
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                            >
                                <option value="all">Semua Tahun</option>
                                {availableYears.map((y) => (
                                    <option key={y} value={y}>
                                        Tahun {y}
                                    </option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-3 py-2 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                            >
                                <option value="all">Semua Status</option>
                                <option value="active">Berlaku</option>
                                <option value="amended">Diubah</option>
                                <option value="repealed">Dicabut</option>
                            </select>
                        </div>
                    </div>

                    {/* Bottom Row: Document Type Pills / Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 mr-1">
                            Kategori:
                        </span>

                        <button
                            type="button"
                            onClick={() => setSelectedType('all')}
                            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                                selectedType === 'all'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                        >
                            Semua ({legalProducts.length})
                        </button>

                        {availableTypes.map((type) => {
                            const count = legalProducts.filter((p) => p.document_type === type).length;
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedType(type)}
                                    className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                                        selectedType === type
                                            ? 'bg-red-600 text-white shadow-xs'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                    }`}
                                >
                                    <span>{type}</span>
                                    <span className="ml-1 opacity-70 text-[10px]">({count})</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Catalog Grid of Legal Products */}
                {filteredProducts.length === 0 ? (
                    <div className="p-12 text-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                        <div className="inline-flex p-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                            <Scale className="h-8 w-8" />
                        </div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                            Tidak Ditemukan Produk Hukum
                        </h3>
                        <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                            Tidak ada dokumen regulasi atau surat keputusan yang sesuai dengan kata kunci atau filter pencarian Anda.
                        </p>
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white cursor-pointer"
                        >
                            <Filter className="h-3.5 w-3.5" />
                            <span>Reset Semua Filter</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredProducts.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs hover:border-red-500/40 dark:hover:border-amber-500/40 hover:shadow-md transition-all space-y-4"
                            >
                                <div className="space-y-2.5">
                                    {/* Badges: Type, Status, & Number */}
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                                                <BookOpen className="h-3 w-3 text-red-600 dark:text-amber-400" />
                                                <span>{item.document_type}</span>
                                            </span>
                                            {getStatusBadge(item.status)}
                                        </div>

                                        <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                                            {item.document_number}
                                        </span>
                                    </div>

                                    {/* Document Title */}
                                    <h2 className="text-base font-bold text-zinc-900 dark:text-white leading-snug hover:text-red-600 dark:hover:text-amber-400 transition-colors">
                                        {item.title}
                                    </h2>

                                    {/* Summary / Description */}
                                    {item.description && (
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                {/* Footer: Effective Date, File Info & Download Action */}
                                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                    <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                            <span>
                                                {item.effective_date
                                                    ? `Ditetapkan ${String(item.effective_date).slice(0, 10)}`
                                                    : `Tahun ${item.year}`}
                                            </span>
                                        </div>
                                        {item.file_size && (
                                            <span>• {item.file_size}</span>
                                        )}
                                    </div>

                                    {item.file_url ? (
                                        <a
                                            href={`/layanan/produk-hukum/${item.id}/unduh`}
                                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                            <span>Unduh Dokumen</span>
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 italic">
                                            <FileText className="h-3 w-3" />
                                            <span>Salinan fisik di Balai Desa</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
