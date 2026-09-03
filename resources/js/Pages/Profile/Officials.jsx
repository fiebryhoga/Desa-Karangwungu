import React, { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    GitFork,
    Building2,
    Award,
    Briefcase,
    HeartHandshake,
    ShieldAlert,
    Landmark,
    MapPin,
    ArrowRightLeft,
    FileText,
    CheckCircle2,
    ShieldCheck,
    Scale,
} from 'lucide-react';

import { getIconComponent } from '@/Utils/iconRegistry';

export default function Officials({ officials = [], officialsSettings = {} }) {
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'tupoksi'

    // Helper: generate placeholder avatar URL
    const avatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Aparatur')}&background=7f1d1d&color=fcd34d&size=256&bold=true&font-size=0.35`;

    const kadesName = officialsSettings.kades_name || 'H. SUNARTO';
    const kadesPos = officialsSettings.kades_position || 'Kepala Desa';
    const kadesCategory = officialsSettings.kades_category || 'Pimpinan Eksekutif';
    const kadesPhoto = officialsSettings.kades_photo || null;
    const kadesRoleDesc = officialsSettings.kades_role_desc || 'Pimpinan penyelenggaraan pemerintahan, pembangunan, pembinaan, dan pemberdayaan masyarakat desa.';

    const bpdName = officialsSettings.bpd_name || 'ALI NASIHIN, SH';
    const bpdPos = officialsSettings.bpd_position || 'Ketua BPD';
    const bpdCategory = officialsSettings.bpd_category || 'Badan Permusyawaratan Desa';
    const bpdPhoto = officialsSettings.bpd_photo || null;
    const bpdRoleDesc = officialsSettings.bpd_role_desc || 'Mitra kerja strategis pemerintah desa dalam pengawasan, legislasi peraturan desa, dan penampung aspirasi warga.';

    const rawBawahan = officialsSettings.officials_list_data || [];
    const bawahanKades = rawBawahan.length > 0 ? rawBawahan.map((b) => ({
        position: b.position,
        name: b.name,
        category: b.category || 'Perangkat Desa',
        photo: b.photo || null,
        icon: getIconComponent(b.icon, Briefcase),
        roleDesc: b.role_desc || b.summary || 'Aparatur pelayan masyarakat desa.',
    })) : [
        {
            position: 'Sekretaris Desa',
            name: 'RIDUWAN HADI P',
            category: 'Sekretariat Desa',
            photo: null,
            icon: Briefcase,
            roleDesc: 'Koordinator administrasi umum, keuangan, kepegawaian, dan pelayanan perkantoran desa.',
        },
        {
            position: 'Kaur Kesra',
            name: 'AINUN NAJIB',
            category: 'Perangkat Desa',
            photo: null,
            icon: HeartHandshake,
            roleDesc: 'Pengelolaan urusan kesejahteraan rakyat, bantuan sosial, dan layanan kemasyarakatan.',
        },
        {
            position: 'Ketua LPM',
            name: 'SUNARTO',
            category: 'Lembaga Pemberdayaan',
            photo: null,
            icon: Building2,
            roleDesc: 'Perencanaan pembangunan partisipatif dan pemberdayaan ekonomi masyarakat desa.',
        },
        {
            position: 'Ketua Linmas',
            name: 'ISMAIL EFENDI',
            category: 'Ketenteraman & Ketertiban',
            photo: null,
            icon: ShieldAlert,
            roleDesc: 'Perlindungan masyarakat, keamanan lingkungan, dan penanggulangan bencana desa.',
        },
        {
            position: 'Kasun Karangwungu',
            name: 'SUJIANTO',
            category: 'Pelaksana Kewilayahan',
            photo: null,
            icon: MapPin,
            roleDesc: 'Kepala Dusun pengampu wilayah administrasi dan pelayanan masyarakat Dusun Karangwungu.',
        },
    ];

    // Data Resmi SOTK
    const structureData = {
        kades: {
            position: kadesPos,
            name: kadesName,
            category: kadesCategory,
            photo: kadesPhoto,
            roleDesc: kadesRoleDesc,
        },
        bpd: {
            position: bpdPos,
            name: bpdName,
            category: bpdCategory,
            photo: bpdPhoto,
            roleDesc: bpdRoleDesc,
        },
        bawahanKades,
    };

    // Data Rincian Tupoksi Resmi (Permendagri No. 84/2015 & UU Desa No. 6/2014)
    const tupoksiList = [
        {
            position: kadesPos,
            name: kadesName,
            category: kadesCategory,
            basis: officialsSettings.kades_basis || 'UU No. 6/2014 & Permendagri No. 84/2015',
            icon: Award,
            accent: true,
            summary: officialsSettings.kades_summary || 'Pimpinan tertinggi pemerintah desa yang bertugas menyelenggarakan Pemerintahan Desa, melaksanakan Pembangunan, Pembinaan Kemasyarakatan, dan Pemberdayaan Masyarakat.',
            tasks: Array.isArray(officialsSettings.kades_tasks_data) && officialsSettings.kades_tasks_data.length > 0
                ? officialsSettings.kades_tasks_data
                : [
                    'Memimpin penyelenggaraan pemerintahan desa berdasarkan kebijakan yang ditetapkan bersama BPD.',
                    'Mengajukan rancangan dan menetapkan Peraturan Desa (Perdes) yang telah disepakati.',
                    'Menyusun dan mengajukan rancangan APBDes untuk dibahas dan ditetapkan bersama BPD.',
                    'Membina ketenteraman, ketertiban masyarakat, dan kerukunan warga desa.',
                    'Mewakili desa di dalam dan di luar pengadilan atau menunjuk kuasa hukum sesuai ketentuan perundang-undangan.',
                ],
            authorities: officialsSettings.kades_authorities || 'Menetapkan kebijakan desa, mengelola keuangan & aset desa, serta mengangkat dan memberhentikan perangkat desa.',
        },
        {
            position: bpdPos,
            name: bpdName,
            category: bpdCategory,
            basis: officialsSettings.bpd_basis || 'Permendagri No. 110/2016',
            icon: Landmark,
            summary: officialsSettings.bpd_summary || 'Lembaga perwakilan permusyawaratan warga desa yang berkedudukan sebagai mitra kerja sejajar Pemerintah Desa dalam fungsi legislasi dan pengawasan.',
            tasks: Array.isArray(officialsSettings.bpd_tasks_data) && officialsSettings.bpd_tasks_data.length > 0
                ? officialsSettings.bpd_tasks_data
                : [
                    'Membahas dan menyepakati rancangan Peraturan Desa bersama Kepala Desa.',
                    'Menampung, menghimpun, mengelola, dan menyalurkan aspirasi masyarakat desa secara objektif.',
                    'Melakukan pengawasan kinerja Kepala Desa dalam pelaksanaan APBDes dan kebijakan desa.',
                    'Menyelenggarakan Musyawarah Desa (Musdes) tahunan dan musyawarah perencanaan pembangunan.',
                ],
            authorities: officialsSettings.bpd_authorities || 'Mengawasi pelaksanaan peraturan desa & APBDes, serta meminta keterangan penyelenggaraan pemerintahan desa.',
        },
        ...(rawBawahan.length > 0 ? rawBawahan.map((item) => ({
            position: item.position,
            name: item.name,
            category: item.category || 'Perangkat Desa',
            basis: item.basis || 'Permendagri No. 84/2015',
            icon: getIconComponent(item.icon, Briefcase),
            summary: item.summary || item.role_desc || 'Aparatur pelaksana urusan pemerintah desa.',
            tasks: Array.isArray(item.tasks) ? item.tasks : [],
            authorities: item.authorities || 'Melaksanakan urusan kedinasan dan pelayanan masyarakat sesuai bidang tugasnya.',
        })) : [
            {
                position: 'Sekretaris Desa',
                name: 'RIDUWAN HADI P',
                category: 'Pimpinan Sekretariat Desa',
                basis: 'Permendagri No. 84/2015 Pasal 7',
                icon: Briefcase,
                summary: 'Koordinator administrasi desa yang membantu Kepala Desa dalam bidang ketatausahaan, keuangan, kepegawaian, dan pelayanan perkantoran.',
                tasks: [
                    'Mengoordinasikan penyusunan kebijakan perencanaan dan program kerja pemerintah desa.',
                    'Mengoordinasikan urusan ketatausahaan, surat-menyurat, arsip dokumen resmi, dan ekspedisi desa.',
                    'Mengoordinasikan pengelolaan keuangan desa dan penyusunan laporan pertanggungjawaban realisasi APBDes (LPJ).',
                    'Mengoordinasikan urusan umum, perlengkapan inventaris, dan rumah tangga kantor desa.',
                ],
                authorities: 'Memverifikasi kelengkapan administrasi dan mengendalikan pelaksanaan kegiatan perangkat kesekretariatan.',
            },
            {
                position: 'Kaur Kesejahteraan Rakyat (Kesra)',
                name: 'AINUN NAJIB',
                category: 'Perangkat Desa / Urusan Staf',
                basis: 'Permendagri No. 84/2015 Pasal 9',
                icon: HeartHandshake,
                summary: 'Unsur staf sekretariat yang bertugas membantu Sekretaris Desa dalam pelaksanaan urusan pelayanan sosial dan kesejahteraan masyarakat.',
                tasks: [
                    'Melaksanakan pelayanan bidang keagamaan, sosial budaya, pendidikan, dan pembinaan kepemudaan.',
                    'Pencatatan dan pendataan keluarga pra-sejahtera, bantuan sosial (PKH, BLT, BPNT), dan data kesehatan warga.',
                    'Memfasilitasi kegiatan kemasyarakatan, posyandu balita & lansia, serta bantuan tanggap darurat sosial.',
                    'Menyiapkan bahan laporan pelaksanaan urusan kesejahteraan masyarakat desa.',
                ],
                authorities: 'Verifikasi usulan bantuan sosial kemasyarakatan dan fasilitasi program jaminan kesejahteraan warga.',
            },
            {
                position: 'Ketua LPM',
                name: 'SUNARTO',
                category: 'Lembaga Kemasyarakatan Desa (LKD)',
                basis: 'Permendagri No. 18/2018',
                icon: Building2,
                summary: 'Wadah partisipasi masyarakat yang bertugas merencanakan pembangunan secara partisipatif dan menggerakkan swadaya gotong royong warga.',
                tasks: [
                    'Menyusun rencana pembangunan secara partisipatif bersama warga dalam Musrenbangdes.',
                    'Menggerakkan swadaya dan semangat gotong royong masyarakat dalam pembangunan fisik desa.',
                    'Meningkatkan kualitas sumber daya manusia dan memfasilitasi pemberdayaan ekonomi lokal.',
                    'Menampung aspirasi masyarakat dalam bidang pembangunan infrastruktur dan lingkungan.',
                ],
                authorities: 'Memberikan masukan teknis perencanaan pembangunan dan memobilisasi gotong royong swadaya masyarakat.',
            },
            {
                position: 'Ketua Satlinmas',
                name: 'ISMAIL EFENDI',
                category: 'Satuan Perlindungan Masyarakat',
                basis: 'Permendagri No. 26/2020',
                icon: ShieldAlert,
                summary: 'Satuan tugas garda terdepan perlindungan masyarakat dalam memelihara ketenteraman, ketertiban umum, dan kesiapsiagaan bencana desa.',
                tasks: [
                    'Membantu penanganan ketenteraman, ketertiban umum, dan keamanan lingkungan desa.',
                    'Membantu penanggulangan dan evakuasi dini saat terjadi bencana alam atau keadaan darurat.',
                    'Mendukung pengamanan kegiatan sosial warga, pengajian, hajatan, dan agenda Pemilu/Pilkades.',
                    'Mengkoordinasikan pos ronda malam (siskamling) bersama warga masyarakat.',
                ],
                authorities: 'Tindakan pengamanan preventif awal dan koordinasi penanganan situasi darurat bersama Babinsa & Bhabinkamtibmas.',
            },
            {
                position: 'Kepala Dusun (Kasun) Karangwungu',
                name: 'SUJIANTO',
                category: 'Pelaksana Kewilayahan',
                basis: 'Permendagri No. 84/2015 Pasal 10',
                icon: MapPin,
                summary: 'Unsur pembantu Kepala Desa sebagai satuan tugas kewilayahan yang mengampu wilayah Dusun Karangwungu.',
                tasks: [
                    'Membina ketenteraman, ketertiban, dan perlindungan warga di tingkat dusun.',
                    'Mengkoordinasikan pelaksanaan pembangunan dan pemeliharaan sarana prasarana dusun.',
                    'Menjadi jembatan pelayanan administrasi warga dusun ke balai desa.',
                    'Mendorong keaktifan warga dusun dalam kegiatan gotong royong dan musyawarah.',
                ],
                authorities: 'Pengawasan ketertiban wilayah dusun dan mediasi musyawarah kekeluargaan antarwarga dusun.',
            },
        ]),
    ];

    // Photo card component untuk Bagan Visual
    const OfficialCard = ({ person, accent = false, compact = false, className = '' }) => (
        <div
            className={`group rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col ${
                accent ? 'ring-2 ring-amber-400/90 shadow-red-950/40' : ''
            } ${compact ? 'border border-red-400/25' : ''} ${className}`}
        >
            {/* Photo */}
            <div className={`relative w-full overflow-hidden bg-zinc-950 ${compact ? 'aspect-[4/3] sm:aspect-[16/11]' : 'aspect-[4/3]'}`}>
                <img
                    src={person.photo || avatarUrl(person.name)}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent" />
                <div className={`absolute ${compact ? 'bottom-1.5 left-1.5 right-1.5 sm:bottom-2.5 sm:left-2.5 sm:right-2.5' : 'bottom-2 left-2 right-2 sm:bottom-2.5 sm:left-2.5 sm:right-2.5'}`}>
                    <span className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-amber-300 font-bold shadow-xs ${
                        compact ? 'px-1.5 py-0.5 text-[8px] sm:text-[9.5px]' : 'px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[9px] sm:text-[10px]'
                    }`}>
                        {person.icon && <person.icon className={`${compact ? 'h-2 w-2 sm:h-3 sm:w-3' : 'h-2.5 w-2.5 sm:h-3 sm:w-3'} shrink-0`} />}
                        {!person.icon && (accent ? <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400 shrink-0" /> : <Landmark className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400 shrink-0" />)}
                        <span className="truncate">{person.position}</span>
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className={`space-y-1 sm:space-y-1.5 flex-1 flex flex-col ${compact ? 'p-2 sm:p-3.5' : accent ? 'p-3 sm:p-4' : 'p-2.5 sm:p-4'}`}>
                <h4 className={`font-bold group-hover:text-amber-300 transition-colors leading-tight ${
                    accent ? 'text-sm sm:text-lg font-black' : compact ? 'text-[11px] sm:text-sm' : 'text-xs sm:text-sm'
                }`}>
                    {person.name}
                </h4>
                <p className={`text-amber-300/80 font-semibold truncate ${compact ? 'text-[8.5px] sm:text-[10px]' : 'text-[9.5px] sm:text-[11px]'}`}>
                    {person.category}
                </p>
                <p className={`text-red-100/70 leading-relaxed mt-auto pt-0.5 ${
                    compact ? 'text-[8px] sm:text-[10px] line-clamp-2' : accent ? 'text-[9.5px] sm:text-[11px] line-clamp-3 sm:line-clamp-none' : 'text-[9px] sm:text-[11px] line-clamp-2 sm:line-clamp-none'
                }`}>
                    {person.roleDesc}
                </p>
            </div>
        </div>
    );

    return (
        <AppLayout>
            <SeoHead
                title="Struktur Organisasi Desa Karangwungu"
                description="Bagan Struktur Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Karangwungu, BPD, dan Lembaga Desa, Kecamatan Karanggeneng, Kabupaten Lamongan."
                keywords="Struktur Organisasi Desa Karangwungu, BPD Karangwungu, Kepala Desa Sunarto, Perangkat Desa Karangwungu, SOTK Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Struktur Organisasi', url: '/profil/perangkat-desa' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah & Lembaga Desa"
                    title="Struktur Organisasi Desa Karangwungu"
                    subtitle="Susunan Organisasi dan Tata Kerja (SOTK) Pemerintah Desa, Badan Permusyawaratan Desa (BPD), dan Lembaga Kemasyarakatan."
                />

                {/* View Toggle Bar */}
                <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
                            <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                {viewMode === 'chart' ? 'Bagan Struktur SOTK & Hierarki' : 'Tupoksi & Profil Jabatan Resmi'}
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {viewMode === 'chart'
                                    ? 'Bagan visual koordinasi dan hubungan kerja Pemerintah Desa Karangwungu'
                                    : 'Rincian tugas pokok, fungsi, dan kewenangan resmi berdasarkan regulasi Permendagri'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 text-xs font-semibold">
                        <button
                            onClick={() => setViewMode('chart')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                viewMode === 'chart'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                        >
                            <GitFork className="h-3.5 w-3.5" />
                            <span>Bagan Visual</span>
                        </button>
                        <button
                            onClick={() => setViewMode('tupoksi')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                viewMode === 'tupoksi'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                            }`}
                        >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Tupoksi & Wewenang</span>
                        </button>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 2. VIEW MODE 1: BAGAN VISUAL                                 */}
                {/* ============================================================ */}
                {viewMode === 'chart' && (
                    <div className="space-y-8">
                        {/* PIMPINAN: BPD (KIRI) <---> KEPALA DESA (KANAN) */}
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between gap-2.5 sm:gap-4 md:gap-6">
                                {/* Ketua BPD (Kiri - Lebih kecil) */}
                                <div className="flex-[5] min-w-0 md:w-64 lg:w-72 md:flex-initial shrink-0">
                                    <OfficialCard person={structureData.bpd} compact />
                                </div>

                                {/* Icon Koordinasi Langsung di Tengah-Tengah Card (Tanpa Background Rounded) */}
                                <div className="flex flex-1 items-center justify-center px-1 sm:px-2">
                                    <div className="hidden sm:block flex-1 h-px border-t-2 border-dashed border-red-500/40" />
                                    <ArrowRightLeft className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0 mx-1 sm:mx-2" />
                                    <div className="hidden sm:block flex-1 h-px border-t-2 border-dashed border-red-500/40" />
                                </div>

                                {/* Kepala Desa (Kanan - Lebih besar & menonjol) */}
                                <div className="flex-[7] min-w-0 md:w-80 lg:w-88 md:flex-initial shrink-0">
                                    <OfficialCard person={structureData.kades} accent />
                                </div>
                            </div>
                        </div>

                        {/* BAWAHAN KEPALA DESA */}
                        <div className="space-y-5">
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-md bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 aspect-square">
                                        <Building2 className="h-3.5 w-3.5" />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                                        Perangkat & Lembaga di bawah Kepala Desa
                                    </h3>
                                </div>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Unsur Pelaksana & Kewilayahan
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
                                {structureData.bawahanKades.map((person, i) => (
                                    <OfficialCard key={i} person={person} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================ */}
                {/* 3. VIEW MODE 2: TUPOKSI & RINCIAN JABATAN RESMI              */}
                {/* ============================================================ */}
                {viewMode === 'tupoksi' && (
                    <div className="space-y-6">
                        {/* Information Banner */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-800 via-red-900 to-zinc-950 text-white shadow-md border border-red-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                                    <Scale className="h-4 w-4 shrink-0" />
                                    <span>Landasan Hukum Tata Kelola & Struktur Desa</span>
                                </div>
                                <p className="text-xs text-red-100/80 leading-relaxed">
                                    Mengacu pada UU No. 6/2014 tentang Desa, Permendagri No. 84/2015 tentang SOTK Pemerintah Desa, dan Permendagri No. 110/2016 tentang BPD.
                                </p>
                            </div>
                            <span className="shrink-0 px-3 py-1 rounded-full bg-black/40 border border-amber-400/40 text-amber-300 text-[11px] font-bold self-start sm:self-auto">
                                7 Posisi Jabatan
                            </span>
                        </div>

                        {/* List Detail Tupoksi Per Jabatan */}
                        <div className="space-y-4">
                            {tupoksiList.map((item, idx) => {
                                const IconComponent = item.icon;
                                return (
                                    <div
                                        key={idx}
                                        className={`group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-6 space-y-4 border ${
                                            item.accent ? 'border-amber-400/60 ring-1 ring-amber-400/50' : 'border-red-500/30'
                                        }`}
                                    >
                                        {/* Header Row: Profil Pejabat & Regulasi */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-white/20 shadow-xs">
                                                    <img
                                                        src={avatarUrl(item.name)}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 border border-white/15 text-amber-300 text-[10px] font-bold">
                                                            <IconComponent className="h-3 w-3" />
                                                            <span>{item.position}</span>
                                                        </span>
                                                        <span className="text-[10px] text-red-200/70 font-semibold">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors mt-0.5">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Regulasi Badge */}
                                            <div className="self-start sm:self-auto">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border border-white/10 text-red-200 text-[10px] font-medium">
                                                    <ShieldCheck className="h-3 w-3 text-amber-400" />
                                                    <span>Dasar: {item.basis}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Deskripsi Peran Umum */}
                                        <p className="text-xs text-red-100/90 leading-relaxed">
                                            {item.summary}
                                        </p>

                                        {/* Dua Kolom: Tugas Pokok & Wewenang Kunci */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
                                            {/* Tugas Pokok (7 cols) */}
                                            <div className="md:col-span-8 p-3.5 sm:p-4 rounded-xl bg-black/25 border border-white/10 space-y-2">
                                                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                                                    Tugas Pokok & Tanggung Jawab
                                                </span>
                                                <ul className="space-y-1.5 text-xs text-red-100/90">
                                                    {item.tasks.map((task, tIdx) => (
                                                        <li key={tIdx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                                            <span className="leading-snug">{task}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Wewenang & Fungsi Kunci (4 cols) */}
                                            <div className="md:col-span-4 p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 flex flex-col justify-between">
                                                <div>
                                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                                                        Wewenang & Fungsi Kunci
                                                    </span>
                                                    <p className="text-xs text-red-100/80 leading-relaxed">
                                                        {item.authorities}
                                                    </p>
                                                </div>
                                                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-300/80 font-semibold">
                                                    <span>Status: Jabatan Aktif</span>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
