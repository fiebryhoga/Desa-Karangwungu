import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Users,
    Landmark,
    HeartHandshake,
    Flame,
    Building2,
    ShieldAlert,
    Home,
    Wheat,
    Fish,
    Search,
    ChevronDown,
    Check,
    CheckCircle2,
    Scale,
    Sparkles,
    Calendar,
    Phone,
    MapPin,
    ArrowRight,
    X,
} from 'lucide-react';

export default function Organizations() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const [activeModalOrg, setActiveModalOrg] = useState(null);
    const otherDropdownRef = useRef(null);

    // Helper: generate placeholder avatar URL with royal red / amber gold
    const avatarUrl = (name) =>
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f1d1d&color=fcd34d&size=256&bold=true&font-size=0.35`;

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (otherDropdownRef.current && !otherDropdownRef.current.contains(event.target)) {
                setIsOtherOpen(false);
            }
        };
        if (isOtherOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOtherOpen]);

    const categories = [
        'Semua',
        'BPD',
        'PKK',
        'Karang Taruna',
        'LPM',
        'Satlinmas',
        'RT / RW',
        'Kelompok Tani & Tambak',
    ];

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(selectedCategory);

    // Data Lengkap Lembaga / Organisasi Kemasyarakatan Desa Karangwungu
    const organizationsData = [
        {
            id: 'bpd',
            name: 'Badan Permusyawaratan Desa (BPD)',
            shortName: 'BPD',
            tagline: 'Lembaga Legislasi, Permusyawaratan & Pengawasan Desa',
            category: 'BPD',
            legalBasis: 'UU No. 6/2014 & Permendagri No. 110/2016',
            leader: {
                name: 'ALI NASIHIN, SH',
                role: 'Ketua BPD',
                phone: '0812-3456-7891',
            },
            icon: Landmark,
            image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
            memberCount: '5 Anggota',
            description: 'Lembaga perwakilan warga desa yang berkedudukan sejajar sebagai mitra strategis Pemerintah Desa dalam menyepakati Peraturan Desa, menampung aspirasi, dan mengawasi jalannya APBDes.',
            programs: [
                'Penyelenggaraan Musyawarah Desa (Musdes) dan Musrenbangdes tahunan.',
                'Pembahasan dan persetujuan bersama Rancangan Peraturan Desa (Perdes).',
                'Pengawasan realisasi anggaran pendapatan dan belanja desa (APBDes).',
                'Penyaluran aspirasi, aduan, dan usulan pembangunan dari seluruh warga.',
            ],
            structure: [
                { role: 'Ketua', name: 'ALI NASIHIN, SH' },
                { role: 'Wakil Ketua', name: 'M. SHOLIKHIN' },
                { role: 'Sekretaris', name: 'AHMAD RIFAI' },
                { role: 'Bidang Pemerintahan', name: 'SUTRISNO' },
                { role: 'Bidang Pembangunan', name: 'ZAINAL ABIDIN' },
            ],
        },
        {
            id: 'pkk',
            name: 'Tim Penggerak PKK (Pemberdayaan Kesejahteraan Keluarga)',
            shortName: 'PKK',
            tagline: 'Gerakan Pemberdayaan Perempuan & Ketahanan Keluarga',
            category: 'PKK',
            legalBasis: 'Permendagri No. 36/2020',
            leader: {
                name: 'Hj. NUR LAILI',
                role: 'Ketua TP-PKK Desa',
                phone: '0813-9876-5432',
            },
            icon: HeartHandshake,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
            memberCount: '35 Kader Aktif',
            description: 'Organisasi kemasyarakatan yang memberdayakan kaum perempuan dalam mengelola 10 Program Pokok PKK demi mewujudkan keluarga sehat, berpendidikan, sejahtera, dan mandiri.',
            programs: [
                'Pelaksanaan Posyandu Balita, Ibu Hamil, dan Posyandu Lansia rutin bulanan.',
                'Pencegahan stunting melalui penyuluhan gizi seimbang & MP-ASI sehat.',
                'Pelatihan keterampilan tata boga, pemanfaatan pekarangan (Hatinya PKK).',
                'Pembinaan kelompok Dasawisma di seluruh lingkungan RT Desa Karangwungu.',
            ],
            structure: [
                { role: 'Ketua TP-PKK', name: 'Hj. NUR LAILI' },
                { role: 'Sekretaris', name: 'SITI AMINAH, S.Pd' },
                { role: 'Bendahara', name: 'SRI WAHYUNI' },
                { role: 'Ketua Pokja I (Pancasila & Gotong Royong)', name: 'KHOIRIYAH' },
                { role: 'Ketua Pokja II (Pendidikan & Keterampilan)', name: 'ENI SURYANI' },
                { role: 'Ketua Pokja III (Pangan & Sandang)', name: 'FATIMAH' },
                { role: 'Ketua Pokja IV (Kesehatan & Lingkungan)', name: 'Bdn. RINAWATI' },
            ],
        },
        {
            id: 'karang-taruna',
            name: 'Karang Taruna "Wungu Sakti"',
            shortName: 'Karang Taruna',
            tagline: 'Wadah Kreativitas, Olahraga & Kepeloporan Pemuda Desa',
            category: 'Karang Taruna',
            legalBasis: 'Permensos No. 25/2019',
            leader: {
                name: 'MUHAMMAD FAHRUDIN',
                role: 'Ketua Karang Taruna',
                phone: '0857-1234-5678',
            },
            icon: Flame,
            image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
            memberCount: '48 Pemuda Aktif',
            description: 'Organisasi kepemudaan yang menjadi lokomotif penggerak bakat olahraga, kreativitas seni, kepeloporan sosial kemanusiaan, dan partisipasi pemuda dalam pembangunan perdesaan.',
            programs: [
                'Penyelenggaraan turnamen olahraga tahunan (Voli & Sepak Bola Karangwungu Cup).',
                'Kepanitiaan peringatan HUT RI, karnaval budaya, dan malam tirakatan kemerdekaan.',
                'Aksi tanggap peduli bencana alam, bakti sosial, dan santunan anak yatim.',
                'Pelatihan kewirausahaan pemuda dan optimalisasi media digital desa.',
            ],
            structure: [
                { role: 'Ketua', name: 'MUHAMMAD FAHRUDIN' },
                { role: 'Wakil Ketua', name: 'DIMAS PRASETYO' },
                { role: 'Sekretaris', name: 'ANGGA SAPUTRA' },
                { role: 'Bendahara', name: 'BAYU PERMANA' },
                { role: 'Sie Olahraga', name: 'FERRY IRAWAN' },
                { role: 'Sie Seni & Budaya', name: 'ILHAM MAULANA' },
                { role: 'Sie Humas & Publikasi', name: 'REZA ADITYA' },
            ],
        },
        {
            id: 'lpm',
            name: 'Lembaga Pemberdayaan Masyarakat (LPM)',
            shortName: 'LPM',
            tagline: 'Penggerak Swadaya & Perencanaan Pembangunan Partisipatif',
            category: 'LPM',
            legalBasis: 'Permendagri No. 18/2018',
            leader: {
                name: 'SUNARTO',
                role: 'Ketua LPM',
                phone: '0812-4567-8901',
            },
            icon: Building2,
            image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
            memberCount: '12 Pengurus',
            description: 'Lembaga yang bertugas menyusun aspirasi pembangunan bersama masyarakat secara partisipatif dan menggerakkan semangat gotong royong swadaya dalam pelaksanaan proyek desa.',
            programs: [
                'Penyusunan usulan skala prioritas infrastruktur pada Musrenbangdes.',
                'Mobilisasi gotong royong warga dalam normalisasi saluran dan jalan lingkungan.',
                'Pengawasan partisipatif mutu fisik pembangunan sarana prasarana desa.',
                'Fasilitasi pemberdayaan potensi ekonomi masyarakat perdesaan.',
            ],
            structure: [
                { role: 'Ketua', name: 'SUNARTO' },
                { role: 'Sekretaris', name: 'SUGIYANTO' },
                { role: 'Bendahara', name: 'KASDI' },
                { role: 'Seksi Pembangunan Fisik', name: 'WARNO' },
                { role: 'Seksi Ekonomi & Koperasi', name: 'DUL JALIL' },
            ],
        },
        {
            id: 'satlinmas',
            name: 'Satuan Perlindungan Masyarakat (Satlinmas)',
            shortName: 'Satlinmas',
            tagline: 'Garda Ketenteraman, Ketertiban & Kesiapsiagaan Bencana',
            category: 'Satlinmas',
            legalBasis: 'Permendagri No. 26/2020',
            leader: {
                name: 'ISMAIL EFENDI',
                role: 'Komandan Linmas',
                phone: '0852-3344-5566',
            },
            icon: ShieldAlert,
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
            memberCount: '18 Anggota Siaga',
            description: 'Satuan tugas garda depan yang membantu memelihara keamanan lingkungan warga, ketertiban umum, penanggulangan bencana, serta pengamanan kegiatan sosial keagamaan desa.',
            programs: [
                'Pengkoordinasian jadwal siskamling ronda malam di pos-pos kamling desa.',
                'Pengamanan agenda Pemilu, Pilkades, salat hari raya, dan hajatan warga.',
                'Kesiapsiagaan tanggap darurat banjir musim hujan dan evakuasi dini.',
                'Koordinasi keamanan bersama Babinsa (Koramil) dan Bhabinkamtibmas (Polsek).',
            ],
            structure: [
                { role: 'Komandan Regu (Danru)', name: 'ISMAIL EFENDI' },
                { role: 'Wakil Danru', name: 'SUTOYO' },
                { role: 'Danpos Dusun Krajan', name: 'KARTO' },
                { role: 'Danpos Dusun Wungu', name: 'LEGIMAN' },
                { role: 'Danpos Dusun Karangan', name: 'SUMARDI' },
            ],
        },
        {
            id: 'rtrw',
            name: 'Rukun Warga (RW) & Rukun Tetangga (RT 01 – RT 07)',
            shortName: 'RT / RW',
            tagline: 'Garda Pelayanan & Kerukunan Warga Tingkat Terdepan',
            category: 'RT / RW',
            legalBasis: 'Permendagri No. 18/2018',
            leader: {
                name: 'SUWANDI',
                role: 'Ketua RW 01',
                phone: '0813-2233-4455',
            },
            icon: Home,
            image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80',
            memberCount: '1 RW & 7 RT',
            description: 'Lembaga kemasyarakatan paling dekat dengan kehidupan warga sehari-hari yang melayani administrasi pengantar surat, membina kerukunan tetangga, dan memelihara ketertiban lingkungan.',
            programs: [
                'Penerbitan surat pengantar administrasi kependudukan bagi warga.',
                'Penyelenggaraan kerja bakti kebersihan selokan dan lingkungan RT.',
                'Pengelolaan jimpitan beras, iuran rukun kematian, dan arisan warga.',
                'Penyampaian pengumuman dan sosialisasi program pemerintah desa.',
            ],
            structure: [
                { role: 'Ketua RW 01', name: 'SUWANDI' },
                { role: 'Ketua RT 01', name: 'SUTOPO' },
                { role: 'Ketua RT 02', name: 'WARSONO' },
                { role: 'Ketua RT 03', name: 'KUSNADI' },
                { role: 'Ketua RT 04', name: 'MAT SHOLIHIN' },
                { role: 'Ketua RT 05', name: 'SUHARTO' },
                { role: 'Ketua RT 06', name: 'JUMADI' },
                { role: 'Ketua RT 07', name: 'SUPRAPTO' },
            ],
        },
        {
            id: 'poktan',
            name: 'Kelompok Tani (Poktan "Makmur Tani")',
            shortName: 'Kelompok Tani',
            tagline: 'Wadah Petani Padi, Palawija & Ketahanan Pangan Desa',
            category: 'Kelompok Tani & Tambak',
            legalBasis: 'UU No. 19/2013 tentang Perlindungan Petani',
            leader: {
                name: 'KASNO',
                role: 'Ketua Poktan Makmur Tani',
                phone: '0821-3344-7788',
            },
            icon: Wheat,
            image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
            memberCount: '85 Petani Anggota',
            description: 'Wadah musyawarah dan koordinasi para petani sawah Karangwungu dalam pengaturan pola tanam, penyaluran pupuk bersubsidi, mekanisasi alsintan, dan pemeliharaan saluran irigasi pertanian.',
            programs: [
                'Pengaturan jadwal tanam serempak untuk pencegahan serangan hama padi.',
                'Verifikasi dan penyaluran alokasi pupuk bersubsidi sesuai e-RDKK.',
                'Kerja sama irigasi air sawah bersama Himpunan Petani Pemakai Air (HIPPA).',
                'Pemasaran gabah panen raya dan benih padi varietas unggul.',
            ],
            structure: [
                { role: 'Ketua', name: 'KASNO' },
                { role: 'Sekretaris', name: 'MUSTOFA' },
                { role: 'Bendahara', name: 'SUBARI' },
                { role: 'Koordinator Alsintan', name: 'PARDI' },
                { role: 'Koordinator HIPPA Irigasi', name: 'SARKOWI' },
            ],
        },
        {
            id: 'pokdakan',
            name: 'Kelompok Pembudidaya Ikan (Pokdakan "Mina Karangwungu")',
            shortName: 'Pokdakan Tambak',
            tagline: 'Sentra Sinergi Petambak Bandeng & Udang Vaname',
            category: 'Kelompok Tani & Tambak',
            legalBasis: 'Permen KP No. 67/2016',
            leader: {
                name: 'H. SULAIMAN',
                role: 'Ketua Pokdakan Mina Karangwungu',
                phone: '0812-7788-9900',
            },
            icon: Fish,
            image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
            memberCount: '42 Petambak',
            description: 'Kelompok usaha perikanan tambak yang menaungi para petambak air payau di Desa Karangwungu untuk pengadaan bibit benur berkualitas, standarisasi tambak ramah lingkungan, dan kestabilan harga jual.',
            programs: [
                'Penyediaan benur udang vaname dan nener bandeng tersertifikasi.',
                'Penerapan teknik budidaya semi-intensif dan pemantauan salinitas air.',
                'Pengelolaan sentra penimbangan dan cold-box penyimpanan panen.',
                'Kemitraan pasokan ikan segar ke pasar ikan Lamongan dan produsen olahan.',
            ],
            structure: [
                { role: 'Ketua', name: 'H. SULAIMAN' },
                { role: 'Sekretaris', name: 'ACHMAD FAUZI' },
                { role: 'Bendahara', name: 'SUKADI' },
                { role: 'Koordinator Pakan & Benih', name: 'H. NASRUL' },
                { role: 'Koordinator Distribusi Pasar', name: 'M. TOHA' },
            ],
        },
    ];

    // Filter Logic
    const filteredOrganizations = organizationsData.filter((org) => {
        const matchesCategory =
            selectedCategory === 'Semua' || org.category === selectedCategory;
        const matchesSearch =
            searchQuery.trim() === '' ||
            org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout>
            <SeoHead
                title="Lembaga & Organisasi Kemasyarakatan Desa Karangwungu"
                description="Daftar Lembaga dan Organisasi Kemasyarakatan Desa Karangwungu: BPD, PKK, Karang Taruna, LPM, Satlinmas, RT/RW, Kelompok Tani, dan Pembudidaya Ikan Tambak."
                keywords="Lembaga Desa Karangwungu, BPD Karangwungu, Karang Taruna Karangwungu, PKK Karangwungu Lamongan, LPM Karangwungu, RT RW Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Lembaga & Organisasi', url: '/profil/lembaga' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Mitra & Kemasyarakatan Desa"
                    title="Lembaga & Organisasi Desa Karangwungu"
                    subtitle="Wadah aspirasi, musyawarah perwakilan warga, pemberdayaan perempuan, kepemudaan, gotong royong swadaya, serta ketertiban lingkungan Desa Karangwungu."
                />

                {/* 2. CATEGORY FILTER & SEARCH TOOLBAR */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Filter Pills (5 Utama + 1 Lainnya Dropdown) */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {primaryCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}

                        {/* Tombol ke-6: Lainnya + Dropdown Menu */}
                        {otherCategories.length > 0 && (
                            <div className="relative" ref={otherDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsOtherOpen(!isOtherOpen)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                        isOtherSelected
                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/40 shadow-xs'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700'
                                    }`}
                                >
                                    <span>{isOtherSelected ? selectedCategory : 'Lainnya'}</span>
                                    <ChevronDown
                                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                            isOtherOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {isOtherOpen && (
                                    <div className="absolute left-0 mt-2 w-52 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                        <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                            Lembaga Lainnya
                                        </div>
                                        {otherCategories.map((cat) => {
                                            const isCatActive = selectedCategory === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCategory(cat);
                                                        setIsOtherOpen(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                                        isCatActive
                                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 font-bold'
                                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-amber-400'
                                                    }`}
                                                >
                                                    <span>{cat}</span>
                                                    {isCatActive && (
                                                        <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Search Box */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-red-600 dark:text-amber-400" />
                        <input
                            type="text"
                            placeholder="Cari lembaga atau pengurus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400"
                        />
                    </div>
                </div>

                {/* 3. ORGANIZATIONS GRID */}
                {filteredOrganizations.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-2">
                        <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                            Tidak ada lembaga atau organisasi ditemukan.
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Silakan coba kata kunci lain atau pilih kategori Semua.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {filteredOrganizations.map((org) => {
                            const IconComponent = org.icon;
                            return (
                                <div
                                    key={org.id}
                                    className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between border border-red-500/30"
                                >
                                    <div>
                                        {/* Header Image with Overlay */}
                                        <div className="h-44 sm:h-48 w-full overflow-hidden bg-zinc-950 relative">
                                            <img
                                                src={org.image}
                                                alt={org.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-red-950/95 via-red-950/40 to-transparent" />

                                            {/* Top Badges */}
                                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                                                <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-bold shadow-xs inline-flex items-center gap-1.5">
                                                    <IconComponent className="h-3 w-3" />
                                                    <span>{org.category}</span>
                                                </span>
                                                <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/90 text-[9.5px] font-medium">
                                                    {org.memberCount}
                                                </span>
                                            </div>

                                            {/* Title inside bottom of photo */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors leading-tight drop-shadow-xs">
                                                    {org.name}
                                                </h3>
                                                <p className="text-[11px] text-amber-300/90 font-medium line-clamp-1 mt-0.5">
                                                    {org.tagline}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-4 sm:p-5 space-y-3.5">
                                            {/* Ketua / Pimpinan Bar */}
                                            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-zinc-900 shrink-0 border border-white/20">
                                                        <img
                                                            src={avatarUrl(org.leader.name)}
                                                            alt={org.leader.name}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-[9.5px] text-amber-300/80 font-bold uppercase tracking-wider block">
                                                            {org.leader.role}
                                                        </span>
                                                        <h4 className="text-xs sm:text-sm font-black text-white">
                                                            {org.leader.name}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Aktif Menjabat" />
                                            </div>

                                            {/* Deskripsi */}
                                            <p className="text-xs text-red-100/85 leading-relaxed line-clamp-2">
                                                {org.description}
                                            </p>

                                            {/* Program Kerja Unggulan */}
                                            <div className="space-y-1.5 pt-1">
                                                <span className="text-[10px] font-bold text-amber-300/90 uppercase tracking-wider block">
                                                    Fokus & Agenda Kegiatan
                                                </span>
                                                <ul className="space-y-1 text-xs text-red-100/90">
                                                    {org.programs.slice(0, 3).map((prog, pIdx) => (
                                                        <li key={pIdx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                                            <span className="text-[11px] leading-snug">{prog}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer: Dasar Hukum & Tombol Detail Struktur */}
                                    <div className="p-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                                        <span className="text-[10px] text-red-200/70 truncate max-w-[180px] sm:max-w-xs">
                                            Dasar: {org.legalBasis}
                                        </span>
                                        <button
                                            onClick={() => setActiveModalOrg(org)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-amber-300 text-xs font-bold border border-white/15 hover:border-amber-400/50 transition-all cursor-pointer shrink-0"
                                        >
                                            <span>Lihat Pengurus</span>
                                            <ArrowRight className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 4. MODAL POPUP: DETAIL STRUKTUR KEPENGURUSAN */}
                {activeModalOrg && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                        <div
                            className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-gradient-to-b from-red-800 via-red-900 to-zinc-950 text-white shadow-2xl border border-red-500/50 p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                                <div>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-black/40 text-amber-300 text-[10px] font-bold border border-white/15 mb-1">
                                        {activeModalOrg.category}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                                        {activeModalOrg.name}
                                    </h3>
                                    <p className="text-xs text-red-200/80 mt-0.5">
                                        Dasar Hukum: {activeModalOrg.legalBasis}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveModalOrg(null)}
                                    className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-zinc-300 hover:text-white border border-white/10 cursor-pointer shrink-0"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Pimpinan Utama */}
                            <div className="p-3.5 rounded-xl bg-black/40 border border-amber-400/30 flex items-center gap-3.5">
                                <div className="h-12 w-12 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/20">
                                    <img
                                        src={avatarUrl(activeModalOrg.leader.name)}
                                        alt={activeModalOrg.leader.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                                        Pimpinan Lembaga
                                    </span>
                                    <h4 className="text-sm font-black text-white">
                                        {activeModalOrg.leader.name}
                                    </h4>
                                    <p className="text-xs text-red-200/80">
                                        {activeModalOrg.leader.role}
                                    </p>
                                </div>
                            </div>

                            {/* Daftar Struktur Pengurus */}
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                                    Susunan Pengurus & Anggota
                                </span>
                                <div className="space-y-1.5">
                                    {activeModalOrg.structure.map((item, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="flex items-center justify-between p-2.5 rounded-lg bg-black/25 border border-white/10 text-xs"
                                        >
                                            <span className="font-medium text-red-200/80">{item.role}</span>
                                            <span className="font-bold text-white text-right">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agenda Lengkap */}
                            <div className="space-y-2 pt-1 border-t border-white/10">
                                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                                    Program & Tugas Pokok
                                </span>
                                <ul className="space-y-1.5 text-xs text-red-100/90">
                                    {activeModalOrg.programs.map((prog, pIdx) => (
                                        <li key={pIdx} className="flex items-start gap-2">
                                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                                            <span className="leading-snug">{prog}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Close Button */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setActiveModalOrg(null)}
                                    className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                                >
                                    Tutup Rincian
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
