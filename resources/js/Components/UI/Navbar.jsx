import React, { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { createPortal } from "react-dom";
import {
    Menu,
    X,
    ChevronDown,
    Building2,
    History as HistoryIcon,
    Shield,
    Users,
    PieChart,
    FileText,
    Sparkles,
    Search,
    DollarSign,
    Store,
    Image,
    MessageSquare,
    Sun,
    Moon,
    ArrowRight,
    Home,
    Newspaper,
    LayoutGrid,
    Target,
    Scale,
} from "lucide-react";

export default function Navbar() {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

    // Mobile Accordion States
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

    // Global Search State
    const [searchQuery, setSearchQuery] = useState("");

    // Dark Mode Theme State
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkTheme = () => {
            const isDarkMode =
                document.documentElement.classList.contains("dark") ||
                localStorage.getItem("theme") === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);
            setIsDark(isDarkMode);
            if (isDarkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        checkTheme();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    const isActive = (path) => {
        if (path === "/" && url === "/") return true;
        if (path !== "/" && url.startsWith(path)) return true;
        return false;
    };

    const isMoreActive = () => {
        return (
            isActive("/transparansi") ||
            isActive("/potensi") ||
            isActive("/galeri") ||
            isActive("/kontak")
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.get("/berita", { search: searchQuery.trim() });
    };

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-200">
            {/* Main Navigation Bar - Red Gradient & Golden Batik Silhouette Background */}
            <nav
                className={`relative w-full bg-gradient-to-r from-red-700 via-red-600 to-red-800 dark:from-red-800 dark:via-red-700 dark:to-red-900 text-white border-b border-red-500/50 shadow-lg shadow-red-900/30 transition-all ${
                    isScrolled
                        ? "shadow-xl py-1.5"
                        : "py-2"
                }`}
            >
                {/* Siluet Motif Batik Parang Emas (Contained) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.16] bg-repeat"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23fde047'/%3E%3C/svg%3E")`,
                            backgroundSize: '90px 90px',
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Brand Logo & Name */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Desa Karangwungu Lamongan"
                            className="h-11 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-md"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                            }}
                        />
                        <div className="hidden h-11 w-11 items-center justify-center">
                            <Shield className="h-7 w-7 text-amber-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black text-white leading-tight group-hover:text-amber-300 transition-colors">
                                Desa Karangwungu
                            </span>
                            <span className="text-[11px] text-amber-300 leading-tight font-semibold">
                                Kec. Karanggeneng, Kab. Lamongan
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
                        <Link
                            href="/"
                            className={`py-1 transition-colors relative ${
                                isActive("/") && url === "/"
                                    ? "text-amber-300 font-bold"
                                    : "text-red-100 hover:text-amber-300"
                            }`}
                        >
                            <span>Beranda</span>
                            {isActive("/") && url === "/" && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-xs" />
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
                                    isActive("/profil")
                                        ? "text-amber-300 font-bold"
                                        : "text-red-100 hover:text-amber-300"
                                }`}
                            >
                                <span>Profil Desa</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-80 text-amber-300" />
                                {isActive("/profil") && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-xs" />
                                )}
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-xl border border-red-500/40 bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white backdrop-blur-xl p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/profil"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Building2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Gambaran Umum
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Letak geografis & batas wilayah
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/visi-misi"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Target className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Visi, Misi & Kepemimpinan
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Arah pembangunan & silsilah Kades
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/perangkat-desa"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Shield className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Perangkat Desa
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Struktur organisasi Pemdes
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/lembaga"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Users className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Lembaga & Organisasi Desa
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    BPD, PKK, Karang Taruna, LPM & RT/RW
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/demografi"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <PieChart className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Data Demografi
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Statistik kependudukan per dusun
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Layanan Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesDropdownOpen(true)}
                            onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative ${
                                    isActive("/layanan")
                                        ? "text-amber-300 font-bold"
                                        : "text-red-100 hover:text-amber-300"
                                }`}
                            >
                                <span>Layanan</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-80 text-amber-300" />
                                {isActive("/layanan") && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-xs" />
                                )}
                            </button>

                            {servicesDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-xl border border-red-500/40 bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white backdrop-blur-xl p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/layanan/ajukan"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Sparkles className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Ajukan Surat Mandiri
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Buat permohonan surat secara daring
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan/lacak"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Search className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Lacak Status Surat
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Cek status kode tiket permohonan
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Scale className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Produk Hukum Desa
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Perdes, SK Kepala Desa, Regulasi
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/berita"
                            className={`py-1 transition-colors relative ${
                                isActive("/berita")
                                    ? "text-amber-300 font-bold"
                                    : "text-red-100 hover:text-amber-300"
                            }`}
                        >
                            <span>Berita</span>
                            {isActive("/berita") && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-xs" />
                            )}
                        </Link>

                        {/* Informasi Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setMoreDropdownOpen(true)}
                            onMouseLeave={() => setMoreDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative ${
                                    isMoreActive()
                                        ? "text-amber-300 font-bold"
                                        : "text-red-100 hover:text-amber-300"
                                }`}
                            >
                                <span>Informasi</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-80 text-amber-300" />
                                {isMoreActive() && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 rounded-full shadow-xs" />
                                )}
                            </button>

                            {moreDropdownOpen && (
                                <div className="absolute right-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-xl border border-red-500/40 bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white backdrop-blur-xl p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/transparansi"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <DollarSign className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Transparansi APBDes
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Realisasi anggaran & dana desa
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/potensi"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Store className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Potensi & UMKM
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Komoditas tambak, tani & produk warga
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/galeri"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Image className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Galeri Foto Kegiatan
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Dokumentasi pembangunan & acara desa
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/kontak"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <MessageSquare className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Kontak & Lapor Warga
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Lokasi balai desa & formulir aspirasi
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/fasilitas"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Building2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Fasilitas Umum
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Sarana prasarana & tempat publik
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Action: Sleek Inline Pill Search Bar & Theme Toggle */}
                    <div className="flex items-center gap-2.5">
                        {/* Desktop Inline Pill Search Form */}
                        <form
                            onSubmit={handleSearchSubmit}
                            className="hidden md:flex items-center relative group"
                        >
                            <div className="flex items-center h-9 w-44 lg:w-56 focus-within:w-64 transition-all duration-300 rounded-full bg-black/30 border border-white/20 group-hover:border-amber-400/60 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 px-3 shadow-inner">
                                <Search className="h-3.5 w-3.5 text-amber-300 group-hover:text-amber-200 transition-colors shrink-0 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Cari informasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-xs text-white placeholder:text-red-200/70 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="text-red-200 hover:text-white p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Dark / Light Mode Circular Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Ganti mode gelap/terang"
                            title={
                                isDark
                                    ? "Beralih ke Mode Terang (Putih)"
                                    : "Beralih ke Mode Gelap (Hitam)"
                            }
                            className="h-9 w-9 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 text-amber-300 hover:text-amber-200 border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-180 duration-200" />
                            ) : (
                                <Moon className="h-4 w-4 text-amber-300 animate-in spin-in-180 duration-200" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar (Modern Native App Dock with Elevated Center Action Button) */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-gradient-to-r from-red-700 via-red-600 to-red-800 dark:from-red-800 dark:via-red-700 dark:to-red-900 text-white backdrop-blur-2xl border-t border-red-500/40 shadow-2xl px-2 pt-1 pb-2 safe-area-pb">
                <div className="grid grid-cols-5 items-end justify-around max-w-sm mx-auto">
                    {/* 1. Beranda */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/") && url === "/"
                                ? "text-amber-300 font-bold"
                                : "text-red-200/90 hover:text-white font-medium"
                        }`}
                    >
                        <Home className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Beranda</span>
                    </Link>

                    {/* 2. Layanan Online */}
                    <Link
                        href="/layanan"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/layanan")
                                ? "text-amber-300 font-bold"
                                : "text-red-200/90 hover:text-white font-medium"
                        }`}
                    >
                        <FileText className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Layanan</span>
                    </Link>

                    {/* 3. Highlighted Floating Center Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Buka semua menu navigasi"
                        className="flex flex-col items-center justify-center group cursor-pointer -mb-0.5"
                    >
                        <div className="h-11 w-11 -mt-4 rounded-full bg-amber-400 text-zinc-950 shadow-xl shadow-red-950/50 ring-4 ring-red-950/80 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-active:scale-90">
                            <LayoutGrid className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 mt-0.5 tracking-tight">
                            Menu
                        </span>
                    </button>

                    {/* 4. Warta Desa */}
                    <Link
                        href="/berita"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/berita")
                                ? "text-amber-300 font-bold"
                                : "text-red-200/90 hover:text-white font-medium"
                        }`}
                    >
                        <Newspaper className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Warta</span>
                    </Link>

                    {/* 5. Kontak & Lapor */}
                    <Link
                        href="/kontak"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/kontak")
                                ? "text-amber-300 font-bold"
                                : "text-red-200/90 hover:text-white font-medium"
                        }`}
                    >
                        <MessageSquare className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Kontak</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Off-Canvas Side Drawer Menu via Portal */}
            {mounted && mobileMenuOpen && createPortal(
                <div className="fixed inset-0 z-[9999] lg:hidden">
                    {/* 1. Backdrop Overlay Gelap */}
                    <div
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
                    />

                    {/* 2. Side Drawer Container (Full Height 100vh - Muncul dari Kiri) */}
                    <div className="fixed inset-y-0 left-0 w-[82%] sm:w-80 h-full bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white border-r border-red-500/40 shadow-2xl flex flex-col z-[10000] animate-in slide-in-from-left duration-300 ease-out">
                        {/* Drawer Header */}
                        <div className="p-4 py-2 border-b border-red-500/30 flex items-center justify-between shrink-0 bg-black/20">
                            <div className="flex items-center gap-2.5">
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Logo Desa Karangwungu"
                                    className="h-11 w-auto object-contain drop-shadow-sm"
                                />
                                <div className="flex flex-col">
                                    <span className="text-lg font-black text-white leading-tight">
                                        Desa Karangwungu
                                    </span>
                                    <span className="text-[11px] text-amber-300 leading-tight font-semibold">
                                        Kec. Karanggeneng, Kab. Lamongan
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Tutup menu"
                                className="h-8 w-8 rounded-full flex items-center justify-center text-amber-300 hover:text-white bg-black/30 border border-white/20 transition-colors cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Drawer Body - Scrollable Links */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* Search Bar Inside Drawer */}
                            <form
                                onSubmit={(e) => {
                                    handleSearchSubmit(e);
                                    setMobileMenuOpen(false);
                                }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    placeholder="Cari informasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-xl bg-black/30 border border-white/20 text-white text-xs pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-400 placeholder:text-red-200/70 shadow-inner"
                                />
                                <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-amber-300" />
                            </form>

                            {/* Navigation Links Accordion */}
                            <div className="space-y-1 text-sm font-medium">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                                        isActive("/") && url === "/"
                                            ? "bg-black/30 text-amber-300 font-bold"
                                            : "text-red-100 hover:bg-black/20"
                                    }`}
                                >
                                    <span>Beranda</span>
                                    <ArrowRight className="h-3.5 w-3.5 opacity-60 text-amber-300" />
                                </Link>

                                {/* Accordion 1: Profil Desa */}
                                <div>
                                    <button
                                        onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-red-100 hover:bg-black/20 transition-colors"
                                    >
                                        <span className="font-medium">Profil Desa</span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 text-amber-300 transition-transform ${
                                                mobileProfileOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileProfileOpen && (
                                        <div className="pl-4 space-y-1 pt-1">
                                            <Link
                                                href="/profil"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Gambaran Umum
                                            </Link>
                                            <Link
                                                href="/profil/visi-misi"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Visi, Misi & Kepemimpinan
                                            </Link>
                                            <Link
                                                href="/profil/perangkat-desa"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Perangkat Desa
                                            </Link>
                                            <Link
                                                href="/profil/lembaga"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Lembaga & Organisasi Desa
                                            </Link>
                                            <Link
                                                href="/profil/demografi"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Data Demografi
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Accordion 2: Layanan */}
                                <div>
                                    <button
                                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-red-100 hover:bg-black/20 transition-colors"
                                    >
                                        <span className="font-medium">Layanan</span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 text-amber-300 transition-transform ${
                                                mobileServicesOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileServicesOpen && (
                                        <div className="pl-4 space-y-1 pt-1">
                                            <Link
                                                href="/layanan/ajukan"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs font-bold text-amber-300 hover:bg-black/20"
                                            >
                                                Ajukan Surat Mandiri
                                            </Link>
                                            <Link
                                                href="/layanan/lacak"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Lacak Surat
                                            </Link>
                                            <Link
                                                href="/layanan"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Produk Hukum Desa
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/berita"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                                        isActive("/berita")
                                            ? "bg-black/30 text-amber-300 font-bold"
                                            : "text-red-100 hover:bg-black/20"
                                    }`}
                                >
                                    <span>Berita</span>
                                    <ArrowRight className="h-3.5 w-3.5 opacity-60 text-amber-300" />
                                </Link>

                                {/* Accordion 3: Informasi */}
                                <div>
                                    <button
                                        onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-red-100 hover:bg-black/20 transition-colors"
                                    >
                                        <span className="font-medium">Informasi</span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 text-amber-300 transition-transform ${
                                                mobileMoreOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileMoreOpen && (
                                        <div className="pl-4 space-y-1 pt-1">
                                            <Link
                                                href="/transparansi"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Transparansi APBDes
                                            </Link>
                                            <Link
                                                href="/potensi"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Potensi & UMKM
                                            </Link>
                                            <Link
                                                href="/galeri"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Galeri Foto
                                            </Link>
                                            <Link
                                                href="/kontak"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Kontak & Lapor
                                            </Link>
                                            <Link
                                                href="/profil/fasilitas"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Fasilitas Umum
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}
