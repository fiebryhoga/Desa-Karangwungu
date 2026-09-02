import React from "react";
import { Link } from "@inertiajs/react";
import {
    Wheat,
    Users,
    ArrowRight,
    MapPin,
    Building2,
    Home as HomeIcon,
    User,
    UserCheck,
    Fish,
    LandPlot,
} from "lucide-react";

function AnimatedNumber({ value, duration = 1500 }) {
    const [count, setCount] = React.useState(0);
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    React.useEffect(() => {
        if (!hasAnimated) return;

        const target =
            typeof value === "number" ? value : parseFloat(value) || 0;
        const isDecimal = !Number.isInteger(target);
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1,
            );
            // Smooth ease out cubic formula
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * target;

            setCount(
                isDecimal
                    ? parseFloat(current.toFixed(1))
                    : Math.floor(current),
            );

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        window.requestAnimationFrame(step);
    }, [hasAnimated, value, duration]);

    return (
        <span ref={ref}>
            {typeof count === "number" ? count.toLocaleString("id-ID") : count}
        </span>
    );
}

export default function OverviewSection({ stats = {} }) {
    const demographicMetrics = [
        {
            label: "Kepala Keluarga",
            value: stats.total_families || 985,
            suffix: "KK",
            icon: HomeIcon,
        },
        {
            label: "Total Jiwa",
            value: stats.total_citizens || 3482,
            suffix: "Jiwa",
            icon: Users,
        },
        {
            label: "Laki-Laki",
            value: stats.male_citizens || 1724,
            suffix: "Jiwa",
            icon: User,
        },
        {
            label: "Perempuan",
            value: stats.female_citizens || 1758,
            suffix: "Jiwa",
            icon: UserCheck,
        },
        {
            label: "Luas Wilayah",
            value: stats.total_area_ha || 245.8,
            suffix: "Ha",
            icon: LandPlot,
        },
        {
            label: "Sawah Pertanian",
            value: stats.agriculture_area_ha || 160.5,
            suffix: "Ha",
            icon: Wheat,
        },
        {
            label: "Tambak Perikanan",
            value: stats.fishery_area_ha || 52.3,
            suffix: "Ha",
            icon: Fish,
        },
        {
            label: "Rukun Tetangga",
            value: stats.total_rt || 14,
            suffix: "RT",
            icon: Building2,
        },
    ];

    return (
        <section
            id="selayang-pandang"
            className="relative py-8 sm:py-12 lg:py-14 overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
                {/* 1. Main 2-Column Split: Editorial Narrative & Bento Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* LEFT COLUMN: Narrative Editorial & Info */}
                    <div className="lg:col-span-6 space-y-5">
                        {/* Section Pill Badge */}
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/10 dark:bg-white/5 backdrop-blur-md border border-zinc-300/70 dark:border-white/15 text-[11px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-500 shrink-0 animate-pulse" />
                                <span>Selayang Pandang Desa</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                Mengenal Lebih Dekat{" "}
                                <br className="hidden sm:inline" />
                                Desa Karangwungu
                            </h2>
                            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                                <MapPin className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                <span>
                                    Kecamatan Karanggeneng, Kabupaten Lamongan
                                </span>
                            </div>
                        </div>

                        {/* Narrative Paragraph (Justified & Clean) */}
                        <div className="font-normal space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-justify">
                            <p>
                                <strong>Desa Karangwungu</strong> adalah salah
                                satu dari 18 desa di Kecamatan Karanggeneng,
                                Kabupaten Lamongan, dengan mayoritas penduduk
                                beragama Islam dan beragam mata pencaharian
                                seperti petani, petambak, pedagang, PNS, hingga
                                wirausaha.
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Wilayah pertaniannya terdiri dari sawah dan
                                tambak yang menghasilkan dua kali panen padi dan
                                satu kali palawija, atau dua kali panen ikan dan
                                satu kali padi setiap tahun. Terletak strategis
                                di jalur jalan kolektor primer Lamongan -
                                Gresik.
                            </p>
                        </div>

                        {/* CTA Link */}
                        <div className="pt-2">
                            <Link
                                href="/profil"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-red-900/30 transition-all hover:scale-[1.02] border border-red-600 cursor-pointer"
                            >
                                <span>Jelajahi Profil & Sejarah Desa</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Bento Gallery Showcase */}
                    <div className="lg:col-span-6">
                        <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                            {/* Card 1: Large Featured (Panen Sawah) */}
                            <div className="col-span-2 relative rounded-2xl overflow-hidden aspect-[16/7] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                <img
                                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                                    alt="Pertanian Sawah Padi Karangwungu"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                                        Pertanian Unggul
                                    </span>
                                    <h4 className="text-sm sm:text-base font-bold text-white leading-tight mt-0.5">
                                        Hamparan Sawah Padi & Ketahanan Pangan
                                    </h4>
                                </div>
                            </div>

                            {/* Card 2: Tambak Perikanan */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                <img
                                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                                    alt="Budidaya Tambak Bandeng"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                                    <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                                        Tambak Modern
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">
                                        Budidaya Bandeng & Udang
                                    </h4>
                                </div>
                            </div>

                            {/* Card 3: UMKM & Guyub Rukun */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 group shadow-md">
                                <img
                                    src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80"
                                    alt="UMKM Kreatif & Guyub Warga"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4 text-white">
                                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                                        UMKM & Warga
                                    </span>
                                    <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">
                                        Wirausaha & Guyub Rukun
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Compact Red Gradient Demographic Metrics Strip */}
                <div className="pt-3.5 sm:pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white">
                            Statistik Demografi & Wilayah Desa
                        </h3>
                        <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                            Data Terverifikasi 2026
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-2.5">
                        {demographicMetrics.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group relative p-2.5 sm:p-3 rounded-lg bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Top Row: Label & Icon */}
                                    <div className="flex items-center justify-between gap-1">
                                        <span className="text-[10px] sm:text-[11px] font-semibold text-red-100 truncate">
                                            {item.label}
                                        </span>
                                        <IconComponent className="h-3.5 w-3.5 text-amber-300 shrink-0 group-hover:scale-110 transition-transform" />
                                    </div>

                                    {/* Bottom Row: Number & Suffix */}
                                    <div className="mt-1.5 flex items-baseline gap-1">
                                        <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                                            <AnimatedNumber
                                                value={item.value}
                                            />
                                        </span>
                                        <span className="text-[10px] font-bold text-amber-300">
                                            {item.suffix}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
