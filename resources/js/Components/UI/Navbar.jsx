import React, { useState, useEffect, useRef } from "react";
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
    ScrollText,
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
    Loader2,
    ChevronRight,
    Compass,
} from "lucide-react";

export default function Navbar() {
    const { url } = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

    // Mobile Accordion States
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

    // Global Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [liveResults, setLiveResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const searchContainerRef = useRef(null);

    // Dark Mode Theme State
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Reset activeFilter when query changes
    useEffect(() => {
        setActiveFilter("all");
    }, [searchQuery]);

    // Live Debounced Autocomplete for Global Search
    useEffect(() => {
        const q = searchQuery.trim();
        if (q.length < 2) {
            setLiveResults(null);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
                if (res.ok) {
                    const data = await res.json();
                    setLiveResults(data);
                    setShowDropdown(true);
                }
            } catch (err) {
                console.error("Gagal memuat hasil pencarian langsung:", err);
            } finally {
                setIsSearching(false);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Close Dropdown on Outside Click or Escape
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(e.target)
            ) {
                setShowDropdown(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Close Dropdown & Mobile Menu on URL Change
    useEffect(() => {
        setShowDropdown(false);
        setMobileMenuOpen(false);
    }, [url]);

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

    const isServiceActive = () => {
        return (
            isActive("/layanan/ajukan") ||
            isActive("/layanan/surat") ||
            isActive("/layanan/katalog")
        );
    };

    const isMoreActive = () => {
        return (
            isActive("/transparansi") ||
            isActive("/potensi") ||
            isActive("/galeri") ||
            isActive("/kontak") ||
            isActive("/profil/fasilitas") ||
            isActive("/produk-hukum") ||
            (isActive("/layanan") && !isServiceActive())
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setShowDropdown(false);
        setMobileMenuOpen(false);
        router.get("/cari", { q: searchQuery.trim() });
    };

    const getCategoryDetails = (item) => {
        const key = (item.category_key || "").toLowerCase();
        switch (key) {
            case "layanan":
                return {
                    name: "Layanan",
                    badgeClass: "bg-emerald-950/70 text-emerald-300 border-emerald-400/40",
                    iconBg: "bg-emerald-950/70 border-emerald-400/40 text-emerald-300",
                    icon: <FileText className="h-4 w-4" />,
                };
            case "berita":
                return {
                    name: "Berita",
                    badgeClass: "bg-sky-950/70 text-sky-300 border-sky-400/40",
                    iconBg: "bg-sky-950/70 border-sky-400/40 text-sky-300",
                    icon: <Newspaper className="h-4 w-4" />,
                };
            case "regulasi":
                return {
                    name: "Regulasi",
                    badgeClass: "bg-purple-950/70 text-purple-300 border-purple-400/40",
                    iconBg: "bg-purple-950/70 border-purple-400/40 text-purple-300",
                    icon: <Scale className="h-4 w-4" />,
                };
            case "aparatur":
                return {
                    name: "Aparatur",
                    badgeClass: "bg-amber-950/70 text-amber-300 border-amber-400/40",
                    iconBg: "bg-amber-950/70 border-amber-400/40 text-amber-300",
                    icon: <Users className="h-4 w-4" />,
                };
            case "lembaga":
                return {
                    name: "Lembaga",
                    badgeClass: "bg-indigo-950/70 text-indigo-300 border-indigo-400/40",
                    iconBg: "bg-indigo-950/70 border-indigo-400/40 text-indigo-300",
                    icon: <Shield className="h-4 w-4" />,
                };
            case "potensi":
                return {
                    name: "Potensi",
                    badgeClass: "bg-rose-950/70 text-rose-300 border-rose-400/40",
                    iconBg: "bg-rose-950/70 border-rose-400/40 text-rose-300",
                    icon: <Store className="h-4 w-4" />,
                };
            case "transparansi":
                return {
                    name: "APBDes",
                    badgeClass: "bg-teal-950/70 text-teal-300 border-teal-400/40",
                    iconBg: "bg-teal-950/70 border-teal-400/40 text-teal-300",
                    icon: <PieChart className="h-4 w-4" />,
                };
            case "galeri":
                return {
                    name: "Galeri",
                    badgeClass: "bg-pink-950/70 text-pink-300 border-pink-400/40",
                    iconBg: "bg-pink-950/70 border-pink-400/40 text-pink-300",
                    icon: <Image className="h-4 w-4" />,
                };
            default:
                return {
                    name: "Halaman",
                    badgeClass: "bg-black/50 text-amber-300 border-amber-400/40",
                    iconBg: "bg-black/50 border-amber-400/40 text-amber-300",
                    icon: <Compass className="h-4 w-4" />,
                };
        }
    };

    const availableCategories = React.useMemo(() => {
        if (!liveResults || !liveResults.results) return [];
        const map = {};
        liveResults.results.forEach((item) => {
            const k = item.category_key || "halaman";
            const meta = getCategoryDetails(item);
            if (!map[k]) {
                map[k] = { key: k, label: meta.name, count: 0 };
            }
            map[k].count++;
        });
        return Object.values(map);
    }, [liveResults]);

    const displayedResults = React.useMemo(() => {
        if (!liveResults || !liveResults.results) return [];
        if (activeFilter === "all") return liveResults.results;
        return liveResults.results.filter(
            (item) => (item.category_key || "halaman") === activeFilter
        );
    }, [liveResults, activeFilter]);

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
                            className={`py-1 transition-colors relative whitespace-nowrap ${
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
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative whitespace-nowrap ${
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

                        {/* Berita Link */}
                        <Link
                            href="/berita"
                            className={`py-1 transition-colors relative whitespace-nowrap ${
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

                        {/* Informasi Dropdown (Termasuk Produk Hukum & Regulasi Desa) */}
                        <div
                            className="relative"
                            onMouseEnter={() => setMoreDropdownOpen(true)}
                            onMouseLeave={() => setMoreDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer relative whitespace-nowrap ${
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
                                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                                    <div className="rounded-xl border border-red-500/40 bg-gradient-to-b from-red-800 via-red-900 to-red-950 text-white backdrop-blur-xl p-2 shadow-2xl space-y-1">
                                        <Link
                                            href="/produk-hukum"
                                            className="flex items-start gap-2.5 rounded-lg p-2 text-sm hover:bg-black/30 text-red-100 hover:text-amber-300 transition-colors"
                                        >
                                            <Scale className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold text-white">
                                                    Produk Hukum Desa
                                                </div>
                                                <div className="text-xs text-red-200/80">
                                                    Perdes, SK Kepala Desa & Regulasi
                                                </div>
                                            </div>
                                        </Link>
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
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Layanan Highlight Button (Direct Link ke Pengajuan Surat Online) */}
                        <Link
                            href="/layanan/ajukan"
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold tracking-tight transition-all duration-200 shadow-md ${
                                isServiceActive()
                                    ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-red-950 ring-2 ring-amber-300 ring-offset-2 ring-offset-red-800 shadow-amber-400/40"
                                    : "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-200 text-red-950 shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-105 active:scale-95"
                            }`}
                        >
                            <ScrollText className="h-3.5 w-3.5 text-red-950 shrink-0" />
                            <span>Layanan</span>
                        </Link>
                    </div>

                    {/* Right Action: Sleek Inline Pill Search Bar & Theme Toggle */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        {/* Desktop Inline Pill Search Form & Luxury Live Dropdown */}
                        <div ref={searchContainerRef} className="relative hidden md:block">
                            <form
                                onSubmit={handleSearchSubmit}
                                className="flex items-center relative group"
                            >
                                <div className="flex items-center h-9 w-44 lg:w-52 focus-within:w-52 lg:focus-within:w-60 transition-all duration-200 rounded-full bg-black/40 border border-white/20 group-hover:border-amber-400/60 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 px-3 shadow-inner">
                                    {isSearching ? (
                                        <Loader2 className="h-3.5 w-3.5 text-amber-300 animate-spin shrink-0 mr-2" />
                                    ) : (
                                        <Search className="h-3.5 w-3.5 text-amber-300 group-hover:text-amber-200 transition-colors shrink-0 mr-2" />
                                    )}
                                    <input
                                        type="text"
                                        placeholder="Cari informasi..."
                                        value={searchQuery}
                                        onFocus={() => {
                                            if (searchQuery.trim().length >= 2 && liveResults) {
                                                setShowDropdown(true);
                                            }
                                        }}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent text-xs text-white placeholder:text-red-200/70 focus:outline-none"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery("");
                                                setShowDropdown(false);
                                            }}
                                            className="text-red-200 hover:text-white p-0.5 transition-colors cursor-pointer"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Floating Red Batik Live Search Dropdown */}
                            {showDropdown && searchQuery.trim().length >= 2 && (
                                <div className="absolute right-0 top-full mt-2.5 w-[440px] lg:w-[480px] max-w-[calc(100vw-2rem)] rounded-2xl border border-amber-400/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(220,38,38,0.35)] ring-1 ring-amber-400/30 z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
                                    {/* Siluet Motif Batik Tradisional Emas */}
                                    <div
                                        className="absolute inset-0 opacity-[0.20] pointer-events-none bg-repeat"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23fde047'/%3E%3C/svg%3E")`,
                                            backgroundSize: '95px 95px',
                                        }}
                                    />

                                    <div className="relative z-10 flex flex-col">
                                        {/* Top Header */}
                                        <div className="p-3.5 bg-black/25 backdrop-blur-md border-b border-red-500/30 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs shrink-0">
                                                    {isSearching ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    ) : (
                                                        <Search className="h-3.5 w-3.5" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                                                        Pencarian Cepat
                                                    </div>
                                                    <div className="text-xs font-semibold text-white truncate">
                                                        {isSearching ? (
                                                            "Mencari seluruh data desa..."
                                                        ) : (
                                                            <>
                                                                Hasil untuk <span className="text-amber-300 font-bold">"{searchQuery}"</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {liveResults && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-400/40 font-bold text-[11px] shrink-0 shadow-sm">
                                                    {liveResults.total} Ditemukan
                                                </span>
                                            )}
                                        </div>

                                        {/* Category Filter Chips Bar */}
                                        {availableCategories.length > 1 && (
                                            <div className="px-3 py-2 bg-black/35 backdrop-blur-sm border-b border-red-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveFilter("all")}
                                                    className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                                                        activeFilter === "all"
                                                            ? "bg-amber-400 text-red-950 font-bold shadow-md shadow-amber-400/20"
                                                            : "bg-black/30 text-red-100 hover:bg-black/50 hover:text-white border border-white/10"
                                                    }`}
                                                >
                                                    Semua ({liveResults.results.length})
                                                </button>
                                                {availableCategories.map((cat) => (
                                                    <button
                                                        key={cat.key}
                                                        type="button"
                                                        onClick={() => setActiveFilter(cat.key)}
                                                        className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
                                                            activeFilter === cat.key
                                                                ? "bg-amber-400 text-red-950 font-bold shadow-md shadow-amber-400/20"
                                                                : "bg-black/30 text-red-100 hover:bg-black/50 hover:text-white border border-white/10"
                                                        }`}
                                                    >
                                                        {cat.label} ({cat.count})
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Scrollable Results List */}
                                        <div className="max-h-[340px] overflow-y-auto p-1.5 space-y-1">
                                            {isSearching && (!liveResults || liveResults.results.length === 0) ? (
                                                <div className="py-12 flex flex-col items-center justify-center text-red-200/80 text-xs gap-2">
                                                    <Loader2 className="h-6 w-6 animate-spin text-amber-300" />
                                                    <span>Menyisir seluruh informasi desa...</span>
                                                </div>
                                            ) : displayedResults.length > 0 ? (
                                                displayedResults.slice(0, 7).map((item) => {
                                                    const catInfo = getCategoryDetails(item);
                                                    return (
                                                        <Link
                                                            key={item.id}
                                                            href={item.url}
                                                            onClick={() => setShowDropdown(false)}
                                                            className="group flex items-start gap-3 p-2.5 rounded-xl bg-black/25 hover:bg-black/45 active:bg-black/60 border border-white/10 hover:border-amber-400/50 transition-all duration-150 text-left"
                                                        >
                                                            {/* Category Icon */}
                                                            <div
                                                                className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 shadow-sm mt-0.5 ${catInfo.iconBg}`}
                                                            >
                                                                {catInfo.icon}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                                                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                                                                        {item.title}
                                                                    </h4>
                                                                    <span
                                                                        className={`text-[9px] px-2 py-0.5 rounded-full border font-semibold tracking-wide shrink-0 ${catInfo.badgeClass}`}
                                                                    >
                                                                        {catInfo.name}
                                                                    </span>
                                                                </div>

                                                                <p className="text-[11px] text-red-100/80 line-clamp-1 leading-relaxed">
                                                                    {item.description || item.snippet || item.subtitle || "Lihat rincian informasi desa..."}
                                                                </p>

                                                                {(item.badge || item.date) && (
                                                                    <div className="mt-1 flex items-center gap-2 text-[10px]">
                                                                        {item.badge && (
                                                                            <span className="bg-black/30 text-amber-300 px-1.5 py-0.5 rounded border border-amber-400/20 font-medium">
                                                                                {item.badge}
                                                                            </span>
                                                                        )}
                                                                        {item.date && (
                                                                            <span className="text-red-200/70">{item.date}</span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Chevron Arrow */}
                                                            <div className="shrink-0 self-center text-red-300/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all pl-1">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </div>
                                                        </Link>
                                                    );
                                                })
                                            ) : (
                                                <div className="py-10 px-4 text-center">
                                                    <div className="w-12 h-12 rounded-full bg-black/30 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 text-amber-300">
                                                        <Search className="h-5 w-5" />
                                                    </div>
                                                    <p className="text-xs font-bold text-white mb-1">
                                                        Tidak ditemukan hasil untuk "{searchQuery}"
                                                    </p>
                                                    <p className="text-[11px] text-red-200/80 max-w-xs mx-auto mb-3">
                                                        Coba gunakan kata kunci umum seperti:{" "}
                                                        <span className="text-amber-300 font-medium">
                            SKTM, BPD, Perdes, Berita, Pajak, BLT
                                                        </span>
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={handleSearchSubmit}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-amber-400/30 text-xs text-amber-300 transition-colors cursor-pointer"
                                                    >
                                                        <span>Buka Halaman Pencarian</span>
                                                        <ArrowRight className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Footer Bar */}
                                        <div className="p-3 bg-black/30 backdrop-blur-sm border-t border-red-500/30 flex items-center justify-between gap-3">
                                            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-red-200/80">
                                                <span>Tekan</span>
                                                <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/20 text-[10px] text-amber-300 font-mono">
                                                    ↵ Enter
                                                </kbd>
                                                <span>untuk hasil lengkap</span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleSearchSubmit}
                                                className="w-full sm:w-auto ml-auto py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-red-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/40 transition-all cursor-pointer group/btn"
                                            >
                                                <span>Lihat Semua {liveResults?.total ? `(${liveResults.total})` : ""} Hasil</span>
                                                <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform text-red-950" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

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

                    {/* 2. Layanan Online (Mengarah langsung ke Pengajuan Surat) */}
                    <Link
                        href="/layanan/ajukan"
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
                                    className="w-full rounded-xl bg-black/30 border border-white/20 text-white text-xs pl-9 pr-8 py-2.5 focus:outline-none focus:border-amber-400 placeholder:text-red-200/70 shadow-inner"
                                />
                                {isSearching ? (
                                    <Loader2 className="absolute left-3 top-3 h-3.5 w-3.5 text-amber-300 animate-spin" />
                                ) : (
                                    <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-amber-300" />
                                )}
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-3 text-red-200 hover:text-white"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </form>

                            {/* Mobile Live Results if Searching */}
                            {searchQuery.trim().length >= 2 && (
                                <div className="relative rounded-2xl border border-amber-400/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950 p-3 space-y-2.5 shadow-xl overflow-hidden">
                                    {/* Siluet Motif Batik Tradisional Emas */}
                                    <div
                                        className="absolute inset-0 opacity-[0.20] pointer-events-none bg-repeat"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2' fill='%23fde047'/%3E%3C/svg%3E")`,
                                            backgroundSize: '95px 95px',
                                        }}
                                    />

                                    <div className="relative z-10 space-y-2.5">
                                        <div className="flex items-center justify-between text-xs pb-2 border-b border-red-500/30">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10px] uppercase font-bold text-amber-300">Hasil:</span>
                                                <span className="font-bold text-white truncate max-w-[150px]">"{searchQuery}"</span>
                                            </div>
                                            {liveResults && (
                                                <span className="px-2 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-400/40 font-bold text-[10px]">
                                                    {liveResults.total} data
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-1 max-h-64 overflow-y-auto pr-0.5">
                                            {liveResults && liveResults.results.length > 0 ? (
                                                liveResults.results.slice(0, 6).map((item) => {
                                                    const catInfo = getCategoryDetails(item);
                                                    return (
                                                        <Link
                                                            key={item.id}
                                                            href={item.url}
                                                            onClick={() => {
                                                                setMobileMenuOpen(false);
                                                                setSearchQuery("");
                                                            }}
                                                            className="flex items-start gap-2.5 p-2 rounded-xl bg-black/25 hover:bg-black/45 border border-white/10 hover:border-amber-400/30 transition-colors text-left"
                                                        >
                                                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${catInfo.iconBg}`}>
                                                                {catInfo.icon}
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                                                    <div className="text-xs font-bold text-white truncate">
                                                                        {item.title}
                                                                    </div>
                                                                    <span className={`text-[8px] px-1.5 py-0.2 rounded-full border font-semibold shrink-0 ${catInfo.badgeClass}`}>
                                                                        {catInfo.name}
                                                                    </span>
                                                                </div>
                                                                <div className="text-[10px] text-red-100/80 line-clamp-1">
                                                                    {item.description || item.snippet || item.subtitle || "Lihat rincian..."}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })
                                            ) : !isSearching ? (
                                                <p className="text-center py-4 text-xs text-red-200/70">
                                                    Tidak ditemukan informasi terkait.
                                                </p>
                                            ) : (
                                                <div className="text-center py-4 text-xs text-amber-300 flex items-center justify-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Mencari data...</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                handleSearchSubmit(e);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-red-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-black/40 transition-all cursor-pointer"
                                        >
                                            <span>Buka Semua {liveResults?.total ? `(${liveResults.total})` : ""} Hasil</span>
                                            <ArrowRight className="h-3.5 w-3.5 text-red-950" />
                                        </button>
                                    </div>
                                </div>
                            )}

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

                                {/* Accordion 2: Informasi (Termasuk Produk Hukum Desa) */}
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
                                                href="/produk-hukum"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Produk Hukum Desa
                                            </Link>
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
                                                href="/profil/fasilitas"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Fasilitas Umum
                                            </Link>
                                            <Link
                                                href="/kontak"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-3 py-1.5 rounded-md text-xs text-red-100 hover:text-amber-300 hover:bg-black/20"
                                            >
                                                Kontak & Lapor
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Highlighted Layanan CTA in Drawer (Langsung ke Pengajuan Surat) */}
                                <div className="pt-2">
                                    <Link
                                        href="/layanan/ajukan"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-200 text-red-950 font-bold text-xs shadow-lg hover:brightness-105 transition-all group"
                                    >
                                        <span className="flex items-center gap-2">
                                            <ScrollText className="h-4 w-4 text-red-950" />
                                            <span className="text-sm font-bold">Layanan Surat Online</span>
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-red-950 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
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
