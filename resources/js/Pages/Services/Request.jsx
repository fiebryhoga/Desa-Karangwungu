import React, { useState, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import Badge from '../../Components/UI/Badge';
import {
    Search,
    CheckCircle2,
    ArrowRight,
    FileCheck,
    FileText,
    Info,
    ChevronRight,
    Scale,
} from 'lucide-react';

const DEFAULT_SERVICES = [
    {
        id: 'sktm',
        title: 'Surat Keterangan Tidak Mampu (SKTM)',
        short_name: 'SKTM',
        description: 'Surat keterangan resmi untuk keluarga prasejahtera atau tidak mampu guna keperluan beasiswa, keringanan biaya pendidikan, KIP Kuliah, maupun keringanan biaya kesehatan/RS.',
        requirements: [
            'Warga berdomisili sah di Desa Karangwungu (memiliki KTP / Kartu Keluarga)',
            'Termasuk dalam kategori keluarga prasejahtera atau kurang mampu',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
        ],
    },
    {
        id: 'sku',
        title: 'Surat Keterangan Usaha (SKU)',
        short_name: 'SKU',
        description: 'Menerangkan kepemilikan kegiatan usaha aktif di Desa Karangwungu untuk pengajuan kredit bank (KUR BRI/BNI/Mandiri), modal usaha, atau perizinan.',
        requirements: [
            'Warga berdomisili atau menjalankan usaha di wilayah Desa Karangwungu',
            'Memiliki kegiatan usaha / UMKM yang sedang aktif berjalan',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW lokasi usaha',
        ],
    },
    {
        id: 'domisili',
        title: 'Surat Keterangan Domisili',
        short_name: 'Domisili',
        description: 'Keterangan tempat tinggal sah di wilayah RT/RW Desa Karangwungu untuk melamar kerja, pendaftaran sekolah, atau perbankan.',
        requirements: [
            'Bertempat tinggal atau menetap di lingkungan RT/RW Desa Karangwungu',
            'Menunjukkan identitas kependudukan (KTP / KK asli atau bukti tinggal bagi pendatang)',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
        ],
    },
    {
        id: 'kelahiran',
        title: 'Surat Keterangan Kelahiran',
        short_name: 'Kelahiran',
        description: 'Pengantar desa atas kelahiran anak guna pembuatan Akta Kelahiran dan penambahan anggota keluarga di KK Disdukcapil Lamongan.',
        requirements: [
            'Kelahiran anak dari orang tua yang merupakan warga Desa Karangwungu',
            'Memiliki surat keterangan lahir dari bidan, dokter, atau fasilitas kesehatan',
            'Menyertakan identitas orang tua (KTP & Kartu Keluarga Desa Karangwungu)',
        ],
    },
    {
        id: 'kematian',
        title: 'Surat Keterangan Kematian',
        short_name: 'Kematian',
        description: 'Keterangan resmi atas meninggalnya warga untuk penerbitan Akta Kematian, klaim santunan/BPJS, dan tertib administrasi KK.',
        requirements: [
            'Almarhum / Almarhumah tercatat sebagai warga Desa Karangwungu',
            'Pelapor merupakan ahli waris sah atau anggota keluarga dalam satu KK',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
        ],
    },
    {
        id: 'pengantar-nikah',
        title: 'Surat Pengantar Nikah (N1-N4)',
        short_name: 'Pengantar Nikah',
        description: 'Berkas pengantar resmi (formulir N1 hingga N4) bagi calon pengantin untuk pendaftaran di KUA Kecamatan Karanggeneng.',
        requirements: [
            'Calon mempelai merupakan warga Desa Karangwungu',
            'Status perkawinan jelas (jejaka, perawan, duda, atau janda)',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW dusun setempat',
        ],
    },
    {
        id: 'kehilangan',
        title: 'Surat Pengantar Kehilangan',
        short_name: 'Kehilangan',
        description: 'Pengantar desa atas kehilangan dokumen/barang penting (KTP, KK, SIM, Ijazah, Buku Tabungan) untuk pelaporan ke Polsek Karanggeneng.',
        requirements: [
            'Warga Desa Karangwungu atau berdomisili sah di wilayah desa',
            'Mengetahui rincian dan kronologi barang atau dokumen yang hilang',
            'Mendapatkan Surat Pengantar dari Ketua RT / RW setempat',
        ],
    },
];

export default function Request({ services = [] }) {
    const letterServices = services && services.length > 0 ? services : DEFAULT_SERVICES;
    const [searchQuery, setSearchQuery] = useState('');

    // Filter services by search query
    const filteredServices = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return letterServices;

        return letterServices.filter((service) => {
            const matchesTitle = service.title?.toLowerCase().includes(q);
            const matchesShortName = service.short_name?.toLowerCase().includes(q);
            const matchesDesc = service.description?.toLowerCase().includes(q);
            const matchesReq = Array.isArray(service.requirements) &&
                service.requirements.some((r) => r.toLowerCase().includes(q));

            return matchesTitle || matchesShortName || matchesDesc || matchesReq;
        });
    }, [letterServices, searchQuery]);

    return (
        <AppLayout>
            <SeoHead
                title="Layanan Surat Mandiri Online"
                description="Pilih jenis surat keterangan dan pengantar resmi Pemerintah Desa Karangwungu, Lamongan. Dapatkan syarat pembuatan dan langsung isi formulir permohonan surat secara mandiri."
                keywords="Pengajuan Surat Desa Online, Buat Surat Desa Karangwungu, SKTM Karangwungu Lamongan, Layanan Mandiri Karangwungu"
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Ajukan Surat Mandiri', url: '/layanan/ajukan' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Pelayanan Mandiri Persuratan Desa"
                    title="Permohonan Surat Mandiri Online"
                    subtitle="Pilih jenis surat keterangan yang Anda butuhkan di bawah ini, pelajari persyaratannya jika ada, lalu klik untuk mengisi formulir permohonan."
                    actions={[
                        {
                            label: 'Lacak Status Permohonan',
                            href: '/layanan/lacak',
                            icon: Search,
                            variant: 'primary',
                        },
                        {
                            label: 'Produk Hukum Desa',
                            href: '/layanan',
                            icon: Scale,
                            variant: 'secondary',
                        },
                    ]}
                />

                {/* 2. TOOLBAR: SEARCH & COUNT */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Cari jenis surat (contoh: SKTM, SKU, Domisili)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                            >
                                Bersihkan
                            </button>
                        )}
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Tersedia <strong>{filteredServices.length}</strong> jenis permohonan surat resmi
                    </div>
                </div>

                {/* 3. SERVICES CARDS GRID */}
                {filteredServices.length === 0 ? (
                    <div className="p-12 text-center rounded-xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 space-y-3">
                        <FileText className="h-10 w-10 text-zinc-400 mx-auto" />
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                            Tidak Ditemukan Surat yang Sesuai
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                            Tidak ada jenis surat yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain.
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            Lihat Semua Surat
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className="group flex flex-col justify-between rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-400 dark:hover:border-amber-400/60 p-6 shadow-xs hover:shadow-lg transition-all"
                            >
                                <div className="space-y-4">
                                    {/* Title & Description */}
                                    <div>
                                        <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                                            {service.title}
                                        </h3>
                                        {service.description && (
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                                                {service.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Persyaratan Dokumen (Hanya muncul jika ada / tidak kosong) */}
                                    {Array.isArray(service.requirements) && service.requirements.length > 0 && (
                                        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                                <FileCheck className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                <span>Persyaratan:</span>
                                            </span>
                                            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                                                {service.requirements.map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                                        <span className="leading-tight">{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button: Navigate directly to the dedicated form page */}
                                <div className="pt-5 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                                    <Link
                                        href={`/layanan/ajukan/${service.id}`}
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-sm transition-all group/btn"
                                    >
                                        <span>Buat Formulir Surat Ini</span>
                                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 4. ALUR PELAYANAN MANDIRI */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-900/10 via-amber-900/10 to-red-900/10 border border-red-500/20 dark:border-amber-500/20 space-y-6">
                    <div className="max-w-2xl">
                        <Badge variant="gold">Alur Layanan</Badge>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white mt-2">
                            Alur Pengajuan Surat Mandiri
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Sistem persuratan terpadu Desa Karangwungu dirancang praktis, transparan, dan terverifikasi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
                            <span className="h-6 w-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                                1
                            </span>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Pilih Jenis Surat</h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Klik tombol <strong>Buat Formulir Surat Ini</strong> pada jenis surat yang Anda perlukan.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
                            <span className="h-6 w-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                                2
                            </span>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Isi Formulir Khusus</h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Masuk ke halaman form khusus surat tersebut dan lengkapi data pemohon sesuai KTP/KK.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
                            <span className="h-6 w-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                                3
                            </span>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Dapatkan Kode Tiket</h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Simpan kode tracking (KW-xxxx) untuk memantau proses verifikasi berkas oleh perangkat desa.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
                            <span className="h-6 w-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">
                                4
                            </span>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Verifikasi & Cetak PDF</h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Dokumen surat resmi diterbitkan dengan nomor kedinasan dan siap dicetak/diunduh.
                            </p>
                        </div>
                    </div>

                    {/* Bantuan & Kontak Info */}
                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                            <span>
                                Layanan Balai Desa Karangwungu buka <strong>Senin - Jumat (08.00 - 15.00 WIB)</strong> di Jl. Raya Sumberwudi-Maduran.
                            </span>
                        </div>
                        <Link
                            href="/kontak"
                            className="font-bold text-red-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                        >
                            <span>Hubungi Pelayanan Desa</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
