import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Building2,
    MapPin,
    Clock,
    Phone,
    Shield,
    HeartPulse,
    GraduationCap,
    Landmark,
    Trophy,
    ShoppingBag,
    Sparkles,
    CheckCircle2,
    ExternalLink,
    Search,
    ChevronDown,
    Check,
} from 'lucide-react';

export default function Facilities() {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [isOtherOpen, setIsOtherOpen] = useState(false);
    const otherDropdownRef = useRef(null);

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
        'Pemerintahan & Layanan',
        'Ibadah & Keagamaan',
        'Kesehatan & Posyandu',
        'Pendidikan',
        'Olahraga & Publik',
        'Pertanian & Ekonomi',
    ];

    // Tampilkan 5 pill utama, sisanya masuk ke 'Lainnya'
    const primaryCategories = categories.slice(0, 5);
    const otherCategories = categories.slice(5);
    const isOtherSelected = otherCategories.includes(selectedCategory);

    const facilitiesData = [
        {
            id: 1,
            name: 'Kantor Balai Desa & Pendopo Karangwungu',
            category: 'Pemerintahan & Layanan',
            location: 'Jl. Raya Karangwungu No. 01, Dusun Krajan',
            hours: 'Senin – Jumat: 08.00 – 15.30 WIB',
            phone: '(0812) 3456-7890',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
            description: 'Pusat pelayanan administrasi publik, kependudukan, musyawarah desa (Musrenbangdes), dan pertemuan warga.',
            features: ['Pelayanan Administrasi & Surat', 'Pendopo Serbaguna', 'Ruang Rapat BPD & LPM', 'Akses WiFi Publik Desa'],
        },
        {
            id: 2,
            name: 'Puskesdes & Polindes Karangwungu',
            category: 'Kesehatan & Posyandu',
            location: 'Kompleks Balai Desa, Dusun Krajan',
            hours: 'Senin – Sabtu: 08.00 – 13.00 WIB (Darurat 24 Jam)',
            phone: '(0813) 9988-7766',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
            description: 'Fasilitas layanan kesehatan primer desa, konsultasi bidan desa, imunisasi balita, dan pemeriksaan kesehatan lansia.',
            features: ['Pemeriksaan Umum & Bidan', 'Posyandu Balita & Lansia', 'Ruang Rawat Tindakan Pertama', 'Ambulans Siaga Desa'],
        },
        {
            id: 3,
            name: 'Masjid Jami’ Karangwungu',
            category: 'Ibadah & Keagamaan',
            location: 'Dusun Krajan (Pusat Desa)',
            hours: 'Terbuka 24 Jam',
            phone: '(0857) 1122-3344',
            image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
            description: 'Pusat peribadatan utama umat Islam, pengajian rutin warga, peringatan hari besar Islam (PHBI), dan madrasah diniyah.',
            features: ['Ruang Utama Sholat Ber-AC', 'Area Wudhu Bersih & Luas', 'Tempat Parkir Luas', 'Perpustakaan Masjid'],
        },
        {
            id: 4,
            name: 'SD Negeri Karangwungu',
            category: 'Pendidikan',
            location: 'Jl. Pendidikan No. 04, Dusun Karangwungu Timur',
            hours: 'Senin – Sabtu: 07.00 – 13.00 WIB',
            phone: '(0812) 5544-3322',
            image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
            description: 'Institusi pendidikan dasar formal pencetak generasi unggul berprestasi dan berkarakter akhlak mulia.',
            features: ['Ruang Kelas Representatif', 'Laboratorium Komputer', 'Perpustakaan Sekolah', 'Lapangan Olahraga'],
        },
        {
            id: 5,
            name: 'Lapangan Olahraga & Ruang Terbuka Hijau (RTH)',
            category: 'Olahraga & Publik',
            location: 'Blok Lapangan, Dusun Karangwungu Barat',
            hours: 'Setiap Hari: 06.00 – 18.00 WIB',
            phone: 'Pengelola Karang Taruna Desa',
            image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
            description: 'Fasilitas sarana olahraga sepak bola, voli, jogging track, senam mingguan warga, dan panggung pertunjukan rakyat.',
            features: ['Lapangan Sepak Bola Standar', 'Lapangan Bola Voli', 'Jogging Track', 'Area Main Anak & Santai'],
        },
        {
            id: 6,
            name: 'Sentra Pemasaran Ikan Bandeng & Hasil Tambak',
            category: 'Pertanian & Ekonomi',
            location: 'Dusun Sumberagung (Dekat Kawasan Tambak)',
            hours: 'Setiap Hari: 05.00 – 12.00 WIB',
            phone: 'Gapoktan / Kelompok Pembudidaya Ikan',
            image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
            description: 'Pusat pelelangan dan distribusi hasil panen bandeng segar, udang vaname, serta produk olahan UMKM desa.',
            features: ['Timbangan Digital Bersama', 'Tempat Penyimpanan Es & Cold Box', 'Akses Truk Pengangkut', 'Kios Pemasaran UMKM'],
        },
        {
            id: 7,
            name: 'Tempat Pengelolaan Sampah (TPS3R) Mandiri',
            category: 'Pemerintahan & Layanan',
            location: 'Bantaran Timur Dusun Karangwungu',
            hours: 'Senin – Sabtu: 07.30 – 16.00 WIB',
            phone: 'Unit Pengelola Kebersihan Desa',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
            description: 'Pusat pemilahan sampah organik dan anorganik, pembuatan pupuk kompos pertanian, serta bank sampah desa.',
            features: ['Mesin Pencacah Organik', 'Pengolahan Pupuk Kompos', 'Bank Sampah Daur Ulang', 'Armada Motor Roda Tiga'],
        },
        {
            id: 8,
            name: 'Pintu Air & Saluran Irigasi Primer Pertanian',
            category: 'Pertanian & Ekonomi',
            location: 'Blok Sawah Tengah & Saluran Induk Irigasi',
            hours: 'Pengawasan Petugas Pintu Air 24 Jam',
            phone: 'Himpunan Petani Pemakai Air (HIPPA)',
            image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
            description: 'Infrastruktur pengendali debit air penunjang irigasi persawahan dan sirkulasi air tambak bandeng warga.',
            features: ['Pintu Bendung Otomatis', 'Saluran Beton Primer', 'Pengukur Ketinggian Air', 'Pos Jaga HIPPA Desa'],
        },
    ];

    const filteredFacilities = facilitiesData.filter((item) => {
        const matchesCategory =
            selectedCategory === 'Semua' || item.category === selectedCategory;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <AppLayout>
            <SeoHead
                title="Fasilitas Umum & Sarana Prasarana Desa Karangwungu"
                description="Daftar sarana prasarana dan fasilitas umum Desa Karangwungu, Kecamatan Karanggeneng, Lamongan. Kantor Balai Desa, Puskesdes, Masjid, Sekolah, Lapangan Olahraga, dan Sentra Pemasaran Ikan."
                keywords="Fasilitas Umum Karangwungu, Balai Desa Karangwungu, Puskesdes Karangwungu, Sarana Prasarana Desa Karangwungu Lamongan"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Fasilitas Umum', url: '/profil/fasilitas' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Sarana & Prasarana Publik"
                    title="Fasilitas Umum Desa Karangwungu"
                    subtitle="Informasi lengkap sarana prasarana pelayanan masyarakat, tempat ibadah, fasilitas kesehatan, pendidikan, ruang terbuka publik, serta infrastruktur pertanian."
                />

                {/* 2. FILTER & SEARCH TOOLBAR */}
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
                                    <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                        <div className="px-2.5 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 mb-1">
                                            Kategori Lainnya
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
                            placeholder="Cari fasilitas umum..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400"
                        />
                    </div>
                </div>

                {/* 3. FACILITIES GRID */}
                {filteredFacilities.length === 0 ? (
                    <div className="p-12 rounded-2xl bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 text-center space-y-2">
                        <p className="text-base font-bold text-zinc-700 dark:text-zinc-300">
                            Tidak ada fasilitas umum ditemukan.
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Silakan coba kata kunci lain atau pilih kategori Semua.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredFacilities.map((item) => (
                            <div
                                key={item.id}
                                className="group rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Image Container */}
                                    <div className="h-48 w-full overflow-hidden bg-zinc-950 relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-amber-300 text-[10px] font-bold shadow-xs">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="p-5 space-y-3">
                                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs text-red-100/80 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Info Rows */}
                                        <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-red-200/70">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-amber-300 shrink-0 mt-0.5" />
                                                <span>{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                                <span>{item.hours}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                                <span>{item.phone}</span>
                                            </div>
                                        </div>

                                        {/* Features List */}
                                        <div className="pt-2 border-t border-white/10">
                                            <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider block mb-1.5">
                                                Sarana Tersedia
                                            </span>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-red-100/90">
                                                {item.features.map((feat, idx) => (
                                                    <span key={idx} className="inline-flex items-center gap-1.5">
                                                        <span className="h-1 w-1 rounded-full bg-amber-400 shrink-0" />
                                                        <span>{feat}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 pt-3 border-t border-white/10 text-xs font-bold flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Fasilitas Aktif Beroperasi</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
