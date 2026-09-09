import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Scale,
    FileText,
    Download,
    Search,
    Calendar,
    CheckCircle2,
    AlertCircle,
    X,
    BookOpen,
    Sparkles,
} from 'lucide-react';

export default function ServicesIndex({
    legalProducts = [],
}) {
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="JDIH & Keterbukaan Informasi Desa"
                    title="Katalog Produk Hukum & Regulasi Desa"
                    subtitle="Dokumentasi resmi hukum Pemerintah Desa Karangwungu. Akses dan unduh lembaran Peraturan Desa (Perdes), Surat Keputusan (SK) Kepala Desa, dan kebijakan tata kelola desa yang berlaku secara transparan."
                    actions={[
                        {
                            label: 'Ajukan Surat Online',
                            href: '/layanan/ajukan',
                            icon: Sparkles,
                            variant: 'primary',
                        },
                    ]}
                />

                {/* Catalog Grid of Legal Products */}
                {legalProducts.length === 0 ? (
                    <div className="p-12 text-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs space-y-3">
                        <div className="inline-flex p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                            <Scale className="h-8 w-8" />
                        </div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                            Belum Ada Produk Hukum
                        </h3>
                        <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                            Belum ada dokumen regulasi atau surat keputusan desa yang diterbitkan.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {legalProducts.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/80 shadow-xs hover:border-red-500/40 dark:hover:border-amber-500/40 hover:shadow-md transition-all space-y-4"
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
                                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
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
