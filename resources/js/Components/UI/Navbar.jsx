import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    Menu,
    X,
    ChevronDown,
    Shield,
    FileText,
    PieChart,
    Sparkles,
    Search,
    Building2,
    History as HistoryIcon,
    DollarSign,
    Store,
    Image,
    MessageSquare
} from 'lucide-react';

export default function Navbar() {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const isActive = (path) => {
        if (path === '/' && url === '/') return true;
        if (path !== '/' && url.startsWith(path)) return true;
        return false;
    };

    const isMoreActive = () => {
        return ['/transparansi', '/potensi', '/galeri', '/kontak'].some((p) => url.startsWith(p));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearchOpen(false);
        router.get('/berita', { search: searchQuery.trim() });
    };

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-200">
            {/* Main Navigation Bar - Sleek & Compact Padding */}
            <nav className={`w-full bg-zinc-950/90 backdrop-blur-md border-b border-amber-500/90 transition-all ${
                isScrolled ? 'shadow-md py-1.5 bg-zinc-950/95' : 'py-2'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Brand Logo & Name */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Desa Karangwungu Lamongan"
                            className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden h-11 w-11 items-center justify-center">
                            <Shield className="h-7 w-7 text-amber-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-extrabold text-white leading-tight group-hover:text-amber-400 transition-colors">
                                Desa Karangwungu
                            </span>
                            <span className="text-[11px] text-zinc-400 leading-tight font-medium">
                                Kec. Karanggeneng, Kab. Lamongan
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu - Bersih Tanpa Box / Badge */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
                        <Link
                            href="/"
                            className={`py-1 transition-colors relative ${
                                isActive('/') && url === '/'
                                    ? 'text-amber-400 font-bold'
                                    : 'text-zinc-300 hover:text-amber-300'
                            }`}
                        >
                            <span>Beranda</span>
                            {isActive('/') && url === '/' && (
                                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                            )}
                        </Link>

                        {/* Profil Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setProfileDropdownOpen(true)}
                            onMouseLeave={() => setProfileDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative ${
                                    isActive('/profil')
                                        ? 'text-amber-400 font-bold'
                                        : 'text-zinc-300 hover:text-amber-300'
                                }`}
                            >
                                <span>Profil Desa</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isActive('/profil') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/profil"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Building2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Gambaran Umum</div>
                                                <div className="text-xs text-zinc-400">Letak geografis & batas wilayah</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/sejarah"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <HistoryIcon className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Sejarah & Visi Misi</div>
                                                <div className="text-xs text-zinc-400">Asal-usul & arah pembangunan</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/perangkat-desa"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Shield className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Perangkat Desa</div>
                                                <div className="text-xs text-zinc-400">Struktur organisasi Pemdes</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/demografi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <PieChart className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Data Demografi</div>
                                                <div className="text-xs text-zinc-400">Statistik kependudukan per dusun</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Layanan Online Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesDropdownOpen(true)}
                            onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative ${
                                    isActive('/layanan')
                                        ? 'text-amber-400 font-bold'
                                        : 'text-zinc-300 hover:text-amber-300'
                                }`}
                            >
                                <span>Layanan Online</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isActive('/layanan') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {servicesDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/layanan"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <FileText className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Katalog Layanan Surat</div>
                                                <div className="text-xs text-zinc-400">Persyaratan SKU, Domisili, SKTM, dll</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan/ajukan"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-amber-400">Ajukan Surat Mandiri</div>
                                                <div className="text-xs text-zinc-400">Buat permohonan surat secara daring</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan/lacak"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Search className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Lacak Status Surat</div>
                                                <div className="text-xs text-zinc-400">Cek status kode tiket permohonan</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/berita"
                            className={`py-1 transition-colors relative ${
                                isActive('/berita')
                                    ? 'text-amber-400 font-bold'
                                    : 'text-zinc-300 hover:text-amber-300'
                            }`}
                        >
                            <span>Warta Desa</span>
                            {isActive('/berita') && (
                                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                            )}
                        </Link>

                        {/* Informasi & Lainnya Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setMoreDropdownOpen(true)}
                            onMouseLeave={() => setMoreDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative ${
                                    isMoreActive()
                                        ? 'text-amber-400 font-bold'
                                        : 'text-zinc-300 hover:text-amber-300'
                                }`}
                            >
                                <span>Informasi & Lainnya</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isMoreActive() && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {moreDropdownOpen && (
                                <div className="absolute right-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/transparansi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <DollarSign className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Transparansi APBDes</div>
                                                <div className="text-xs text-zinc-400">Realisasi anggaran & dana desa</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/potensi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Store className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Potensi & UMKM</div>
                                                <div className="text-xs text-zinc-400">Komoditas tambak, tani & produk warga</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/galeri"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <Image className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Galeri Foto Kegiatan</div>
                                                <div className="text-xs text-zinc-400">Dokumentasi pembangunan & acara desa</div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/kontak"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-900 text-zinc-300 hover:text-amber-400 transition-colors"
                                        >
                                            <MessageSquare className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-white">Kontak & Lapor Warga</div>
                                                <div className="text-xs text-zinc-400">Lokasi balai desa & formulir aspirasi</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Action: Integrated Search Bar */}
                    <div className="flex items-center gap-2">
                        {/* Desktop Inline Search Form */}
                        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
                            <input
                                type="text"
                                placeholder="Cari informasi desa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-44 xl:w-56 focus:w-64 transition-all duration-300 pl-8 pr-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-500/60"
                            />
                            <button
                                type="submit"
                                aria-label="Cari"
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                                <Search className="h-3.5 w-3.5" />
                            </button>
                        </form>

                        {/* Mobile menu trigger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Buka menu navigasi utama"
                            className="lg:hidden p-2 rounded-lg text-zinc-300 hover:bg-zinc-900"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden px-4 pt-3 pb-6 space-y-3 border-t border-zinc-800 bg-zinc-950/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                        {/* Mobile Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="relative pb-1">
                            <input
                                type="text"
                                placeholder="Cari informasi desa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                            />
                            <button
                                type="submit"
                                aria-label="Cari"
                                className="absolute left-3 top-2.5 text-zinc-400 hover:text-amber-400 transition-colors"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </form>
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-2 text-base font-semibold transition-colors ${
                                isActive('/') && url === '/' ? 'text-amber-400' : 'text-zinc-200 hover:text-white'
                            }`}
                        >
                            Beranda
                        </Link>

                        {/* Mobile Profil Accordion */}
                        <div>
                            <button
                                onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                                className={`w-full flex items-center justify-between py-2 text-base font-semibold transition-colors ${
                                    isActive('/profil') ? 'text-amber-400' : 'text-zinc-200 hover:text-white'
                                }`}
                            >
                                <span>Profil Desa</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileProfileOpen ? 'rotate-180 text-amber-500' : ''}`} />
                            </button>
                            {mobileProfileOpen && (
                                <div className="pl-4 py-1 space-y-1 border-l-2 border-amber-500/40 ml-2">
                                    <Link
                                        href="/profil"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Gambaran Umum
                                    </Link>
                                    <Link
                                        href="/profil/sejarah"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Sejarah & Visi Misi
                                    </Link>
                                    <Link
                                        href="/profil/perangkat-desa"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Perangkat Desa
                                    </Link>
                                    <Link
                                        href="/profil/demografi"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Data Demografi
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Layanan Accordion */}
                        <div>
                            <button
                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                className={`w-full flex items-center justify-between py-2 text-base font-semibold transition-colors ${
                                    isActive('/layanan') ? 'text-amber-400' : 'text-zinc-200 hover:text-white'
                                }`}
                            >
                                <span>Layanan Online</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-amber-500' : ''}`} />
                            </button>
                            {mobileServicesOpen && (
                                <div className="pl-4 py-1 space-y-1 border-l-2 border-amber-500/40 ml-2">
                                    <Link
                                        href="/layanan"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Katalog Layanan Surat
                                    </Link>
                                    <Link
                                        href="/layanan/ajukan"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-amber-400 font-bold"
                                    >
                                        Ajukan Surat Mandiri
                                    </Link>
                                    <Link
                                        href="/layanan/lacak"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Lacak Status Permohonan
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/berita"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-2 text-base font-semibold transition-colors ${
                                isActive('/berita') ? 'text-amber-400' : 'text-zinc-200 hover:text-white'
                            }`}
                        >
                            Warta Desa
                        </Link>

                        {/* Mobile Informasi & Lainnya Accordion */}
                        <div>
                            <button
                                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                                className={`w-full flex items-center justify-between py-2 text-base font-semibold transition-colors ${
                                    isMoreActive() ? 'text-amber-400' : 'text-zinc-200 hover:text-white'
                                }`}
                            >
                                <span>Informasi & Lainnya</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${mobileMoreOpen ? 'rotate-180 text-amber-500' : ''}`} />
                            </button>
                            {mobileMoreOpen && (
                                <div className="pl-4 py-1 space-y-1 border-l-2 border-amber-500/40 ml-2">
                                    <Link
                                        href="/transparansi"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Transparansi APBDes
                                    </Link>
                                    <Link
                                        href="/potensi"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Potensi & UMKM
                                    </Link>
                                    <Link
                                        href="/galeri"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-amber-400 font-medium"
                                    >
                                        Galeri Foto Kegiatan
                                    </Link>
                                    <Link
                                        href="/kontak"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-1.5 text-sm text-zinc-400 hover:text-amber-400 font-medium"
                                    >
                                        Kontak & Lapor
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Quick Search Modal */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in-50 duration-150">
                    <div
                        className="relative w-full max-w-xl rounded-lg bg-zinc-950 border border-amber-500/40 shadow-2xl p-4 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Search className="h-4 w-4 text-amber-400" />
                                <span>Pencarian Warta & Informasi Desa</span>
                            </h3>
                            <button
                                onClick={() => setSearchOpen(false)}
                                className="p-1 rounded-md text-zinc-400 hover:text-white cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSearchSubmit} className="flex gap-2">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Ketik kata kunci (contoh: BLT, Panen Padi, Tambak, Musrenbang)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <button type="submit" className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-sm font-semibold cursor-pointer">
                                Cari
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}
