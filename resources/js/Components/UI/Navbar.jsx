import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Home,
    LayoutGrid,
    Newspaper,
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
    MessageSquare,
    Sun,
    Moon,
} from "lucide-react";

export default function Navbar() {
    const { url } = usePage();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    useEffect(() => {
        setMounted(true);
        // Initialize theme state from DOM
        const isDarkMode = document.documentElement.classList.contains("dark");
        setIsDark(isDarkMode);

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
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
        return ["/transparansi", "/potensi", "/galeri", "/kontak"].some((p) =>
            url.startsWith(p),
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.get("/berita", { search: searchQuery.trim() });
    };

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-200">
            {/* Main Navigation Bar - Sleek & Compact Padding (Tanpa Border Bawah) */}
            <nav
                className={`w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-all ${
                    isScrolled
                        ? "shadow-md py-1.5 bg-white/95 dark:bg-zinc-950/95"
                        : "py-2"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Brand Logo & Name */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/assets/images/logo.png"
                            alt="Logo Desa Karangwungu Lamongan"
                            className="h-11 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-sm"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                            }}
                        />
                        <div className="hidden h-11 w-11 items-center justify-center">
                            <Shield className="h-7 w-7 text-red-600 dark:text-amber-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-extrabold text-zinc-900 dark:text-white leading-tight group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                                Desa Karangwungu
                            </span>
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight font-medium">
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
                                    ? "text-red-600 dark:text-amber-400 font-bold"
                                    : "text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-300"
                            }`}
                        >
                            <span>Beranda</span>
                            {isActive("/") && url === "/" && (
                                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-red-600 dark:bg-amber-400 rounded-full" />
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
                                        ? "text-red-600 dark:text-amber-400 font-bold"
                                        : "text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-300"
                                }`}
                            >
                                <span>Profil Desa</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isActive("/profil") && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-red-600 dark:bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {profileDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/profil"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Building2 className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Gambaran Umum
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Letak geografis & batas
                                                    wilayah
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/sejarah"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <HistoryIcon className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Sejarah & Visi Misi
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Asal-usul & arah pembangunan
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/perangkat-desa"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Shield className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Perangkat Desa
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Struktur organisasi Pemdes
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/profil/demografi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <PieChart className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Data Demografi
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Statistik kependudukan per
                                                    dusun
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
                                        ? "text-red-600 dark:text-amber-400 font-bold"
                                        : "text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-300"
                                }`}
                            >
                                <span>Layanan</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isActive("/layanan") && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-red-600 dark:bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {servicesDropdownOpen && (
                                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/layanan"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <FileText className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Katalog Layanan Surat
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Persyaratan SKU, Domisili,
                                                    SKTM, dll
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan/ajukan"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-red-600 dark:text-amber-400">
                                                    Ajukan Surat Mandiri
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Buat permohonan surat secara
                                                    daring
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/layanan/lacak"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Search className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Lacak Status Surat
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Cek status kode tiket
                                                    permohonan
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
                                    ? "text-red-600 dark:text-amber-400 font-bold"
                                    : "text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-300"
                            }`}
                        >
                            <span>Berita</span>
                            {isActive("/berita") && (
                                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-red-600 dark:bg-amber-400 rounded-full" />
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
                                        ? "text-red-600 dark:text-amber-400 font-bold"
                                        : "text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-300"
                                }`}
                            >
                                <span>Informasi</span>
                                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                {isMoreActive() && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-red-600 dark:bg-amber-400 rounded-full" />
                                )}
                            </button>

                            {moreDropdownOpen && (
                                <div className="absolute right-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/transparansi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <DollarSign className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Transparansi APBDes
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Realisasi anggaran & dana
                                                    desa
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/potensi"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Store className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Potensi & UMKM
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Komoditas tambak, tani &
                                                    produk warga
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/galeri"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <Image className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Galeri Foto Kegiatan
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Dokumentasi pembangunan &
                                                    acara desa
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            href="/kontak"
                                            className="flex items-start gap-2.5 rounded-md p-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                                        >
                                            <MessageSquare className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-semibold text-zinc-900 dark:text-white">
                                                    Kontak & Lapor Warga
                                                </div>
                                                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    Lokasi balai desa & formulir
                                                    aspirasi
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
                            <div className="flex items-center h-9 w-44 lg:w-56 focus-within:w-64 transition-all duration-300 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 focus-within:border-red-500/80 dark:focus-within:border-amber-400/80 focus-within:ring-2 focus-within:ring-red-500/15 dark:focus-within:ring-amber-400/15 px-3 shadow-xs">
                                <Search className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors shrink-0 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Cari informasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
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
                            className="h-9 w-9 rounded-full flex items-center justify-center bg-zinc-100/90 hover:bg-zinc-200/90 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 text-zinc-700 dark:text-amber-400 hover:text-red-600 dark:hover:text-amber-300 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-xs"
                        >
                            {isDark ? (
                                <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-180 duration-200" />
                            ) : (
                                <Moon className="h-4 w-4 text-zinc-700 animate-in spin-in-180 duration-200" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation Bar (Modern Native App Dock with Elevated Center Action Button) */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-t border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-2 pt-1 pb-2 safe-area-pb">
                <div className="grid grid-cols-5 items-end justify-around max-w-sm mx-auto">
                    {/* 1. Beranda */}
                    <Link
                        href="/"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/") && url === "/"
                                ? "text-red-600 dark:text-red-400 font-bold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium"
                        }`}
                    >
                        <Home className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Beranda</span>
                        {isActive("/") && url === "/" && (
                            <span className="h-1 w-1 rounded-full bg-red-600 dark:bg-red-400 mt-0.5 animate-in fade-in zoom-in" />
                        )}
                    </Link>

                    {/* 2. Layanan Online */}
                    <Link
                        href="/layanan"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/layanan")
                                ? "text-red-600 dark:text-red-400 font-bold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium"
                        }`}
                    >
                        <FileText className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Layanan</span>
                        {isActive("/layanan") && (
                            <span className="h-1 w-1 rounded-full bg-red-600 dark:bg-red-400 mt-0.5 animate-in fade-in zoom-in" />
                        )}
                    </Link>

                    {/* 3. Highlighted Floating Center Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Buka semua menu navigasi"
                        className="flex flex-col items-center justify-center group cursor-pointer -mb-0.5"
                    >
                        <div className="h-11 w-11 -mt-4 rounded-full bg-gradient-to-tr from-red-600 via-red-600 to-rose-500 text-white shadow-lg shadow-red-600/30 ring-4 ring-white dark:ring-zinc-950 flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-active:scale-90">
                            <LayoutGrid className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 tracking-tight">
                            Menu
                        </span>
                    </button>

                    {/* 4. Warta Desa */}
                    <Link
                        href="/berita"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/berita")
                                ? "text-red-600 dark:text-red-400 font-bold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium"
                        }`}
                    >
                        <Newspaper className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Warta</span>
                        {isActive("/berita") && (
                            <span className="h-1 w-1 rounded-full bg-red-600 dark:bg-red-400 mt-0.5 animate-in fade-in zoom-in" />
                        )}
                    </Link>

                    {/* 5. Kontak & Lapor */}
                    <Link
                        href="/kontak"
                        className={`flex flex-col items-center justify-center py-1 rounded-lg transition-all duration-200 ${
                            isActive("/kontak")
                                ? "text-red-600 dark:text-red-400 font-bold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium"
                        }`}
                    >
                        <MessageSquare className="h-5 w-5 mb-0.5 transition-transform active:scale-90" />
                        <span className="text-[10px] tracking-tight">Kontak</span>
                        {isActive("/kontak") && (
                            <span className="h-1 w-1 rounded-full bg-red-600 dark:bg-red-400 mt-0.5 animate-in fade-in zoom-in" />
                        )}
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
                    <div className="fixed inset-y-0 left-0 w-[82%] sm:w-80 h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col z-[10000] animate-in slide-in-from-left duration-300 ease-out">
                        {/* Drawer Header */}
                        <div className="p-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-white dark:bg-zinc-950">
                            <div className="flex items-center gap-2.5">
                                <img
                                    src="/assets/images/logo.png"
                                    alt="Logo Desa Karangwungu"
                                    className="h-11 w-auto object-contain drop-shadow-sm"
                                />
                                <div className="flex flex-col">
                                    <span className="text-lg font-extrabold text-zinc-900 dark:text-white leading-tight">
                                        Desa Karangwungu
                                    </span>
                                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight font-medium">
                                        Kec. Karanggeneng, Kab. Lamongan
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Tutup menu"
                                className="h-8 w-8 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 transition-colors cursor-pointer"
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
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-400"
                                />
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                            </form>

                            {/* Nav Links */}
                            <div className="space-y-1">
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                        isActive("/") && url === "/"
                                            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 font-bold"
                                            : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    <span>Beranda</span>
                                </Link>

                                {/* Accordion: Profil Desa */}
                                <div>
                                    <button
                                        onClick={() =>
                                            setMobileProfileOpen(
                                                !mobileProfileOpen,
                                            )
                                        }
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                                            isActive("/profil")
                                                ? "text-red-600 dark:text-amber-400 font-bold"
                                                : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        }`}
                                    >
                                        <span>Profil Desa</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                mobileProfileOpen
                                                    ? "rotate-180 text-red-600 dark:text-amber-500"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileProfileOpen && (
                                        <div className="pl-4 py-1 space-y-1 border-l-2 border-red-500/40 dark:border-amber-500/40 ml-4 my-1">
                                            <Link
                                                href="/profil"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Gambaran Umum & Wilayah
                                            </Link>
                                            <Link
                                                href="/profil/sejarah"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Sejarah & Visi Misi
                                            </Link>
                                            <Link
                                                href="/profil/perangkat-desa"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Struktur Perangkat Desa
                                            </Link>
                                            <Link
                                                href="/profil/demografi"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Data Demografi Kependudukan
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Accordion: Layanan */}
                                <div>
                                    <button
                                        onClick={() =>
                                            setMobileServicesOpen(
                                                !mobileServicesOpen,
                                            )
                                        }
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                                            isActive("/layanan")
                                                ? "text-red-600 dark:text-amber-400 font-bold"
                                                : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        }`}
                                    >
                                        <span>Layanan</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                mobileServicesOpen
                                                    ? "rotate-180 text-red-600 dark:text-amber-500"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileServicesOpen && (
                                        <div className="pl-4 py-1 space-y-1 border-l-2 border-red-500/40 dark:border-amber-500/40 ml-4 my-1">
                                            <Link
                                                href="/layanan"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Katalog Surat Administrasi
                                            </Link>
                                            <Link
                                                href="/layanan/ajukan"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-red-600 dark:text-amber-400 font-bold"
                                            >
                                                Ajukan Surat Mandiri
                                            </Link>
                                            <Link
                                                href="/layanan/lacak"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Lacak Status Permohonan
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Berita */}
                                <Link
                                    href="/berita"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                        isActive("/berita")
                                            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 font-bold"
                                            : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                                >
                                    <span>Berita</span>
                                </Link>

                                {/* Accordion: Informasi */}
                                <div>
                                    <button
                                        onClick={() =>
                                            setMobileMoreOpen(!mobileMoreOpen)
                                        }
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                                            isMoreActive()
                                                ? "text-red-600 dark:text-amber-400 font-bold"
                                                : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        }`}
                                    >
                                        <span>Informasi</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-200 ${
                                                mobileMoreOpen
                                                    ? "rotate-180 text-red-600 dark:text-amber-500"
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                    {mobileMoreOpen && (
                                        <div className="pl-4 py-1 space-y-1 border-l-2 border-red-500/40 dark:border-amber-500/40 ml-4 my-1">
                                            <Link
                                                href="/transparansi"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Transparansi APBDes
                                            </Link>
                                            <Link
                                                href="/potensi"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Potensi & UMKM Desa
                                            </Link>
                                            <Link
                                                href="/galeri"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Galeri Foto Kegiatan
                                            </Link>
                                            <Link
                                                href="/kontak"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="block py-1.5 px-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 font-medium"
                                            >
                                                Kontak & Balai Desa
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 space-y-3 shrink-0">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    Tema Tampilan
                                </span>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer shadow-xs"
                                >
                                    {isDark ? (
                                        <>
                                            <Sun className="h-3.5 w-3.5 text-amber-400" />
                                            <span>Mode Terang</span>
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="h-3.5 w-3.5 text-zinc-700" />
                                            <span>Mode Gelap</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}
