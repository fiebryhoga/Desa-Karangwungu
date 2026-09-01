import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import SeoHead from '../Components/SEO/SeoHead';
import Button from '../Components/UI/Button';
import Badge from '../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Components/UI/Card';
import { formatRupiah, formatDateIndo } from '../Utils/format';
import {
    Users,
    MapPin,
    Shield,
    FileText,
    Sparkles,
    ChevronRight,
    Search,
    ArrowRight,
    Fish,
    Sprout,
    Calendar,
    Eye,
    Clock,
    CheckCircle,
    Building2
} from 'lucide-react';

export default function Home({
    latestPosts = [],
    headOfficial,
    potentials = [],
    stats = {},
    apbdes_summary = {},
    heroImage = '/assets/images/hero.jpg',
}) {
    return (
        <AppLayout>
            <SeoHead
                title="Beranda Resmi"
                description="Website Resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur. Informasi transparansi APBDes, pelayanan surat online mandiri, potensi perikanan tambak & pertanian."
                keywords="Desa Karangwungu, Karangwungu Karanggeneng, Karangwungu Lamongan, Pemdes Karangwungu, Surat Online Karangwungu, Berita Karangwungu"
            />

            {/* ============================================================ */}
            {/* SEKSI 1: HERO SECTION FULL SATU LAYAR (100VH)                */}
            {/* ============================================================ */}
            <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden border-b border-amber-500/20">
                {/* 1. Gambar Background Utama */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
                    style={{
                        backgroundImage: `url('${heroImage}')`,
                    }}
                />

                {/* 2. Sleek Transparent Overlay Gradien (Gambar Terang & Terlihat Jelas) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/20" />

                {/* Spacer Atas */}
                <div className="hidden sm:block sm:h-6" />

                {/* 4. Konten Hero Utama */}
                <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 my-auto">
                    <div className="max-w-3xl space-y-6">
                        {/* Top Municipality Eyebrow - Clean & Frameless */}
                        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-amber-400 drop-shadow-md">
                            <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0"></span>
                            <span>Pemerintah Kabupaten Lamongan &bull; Kecamatan Karanggeneng</span>
                        </div>

                        {/* Grand Title - Solid White */}
                        <div className="space-y-1">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] drop-shadow-lg">
                                Website Resmi <br />
                                Desa Karangwungu
                            </h1>
                        </div>

                        {/* Narrative Description */}
                        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-2xl font-normal drop-shadow-md">
                            Mewujudkan tata kelola desa yang transparan, pelayanan surat mandiri cepat, masyarakat religius, serta berdaya saing berbasis potensi pertanian dan perikanan tambak modern.
                        </p>

                        {/* Tombol Aksi Utama - Harmonis & Elegan */}
                        <div className="flex flex-wrap items-center gap-3.5 pt-3">
                            <Link
                                href="/layanan/ajukan"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-semibold shadow-xl hover:shadow-red-900/40 transition-all border border-red-600/50"
                            >
                                <Sparkles className="h-4 w-4 text-amber-300" />
                                <span>Ajukan Surat Mandiri</span>
                            </Link>

                            <Link
                                href="/layanan/lacak"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-950/70 hover:bg-zinc-900/90 text-amber-400 hover:text-amber-300 text-sm font-semibold shadow-xl border border-amber-500/40 hover:border-amber-400 transition-all backdrop-blur-md"
                            >
                                <Search className="h-4 w-4" />
                                <span>Lacak Status Surat</span>
                            </Link>

                            <Link
                                href="/profil"
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                            >
                                <span>Tentang Desa</span>
                                <ChevronRight className="h-4 w-4 text-zinc-400" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 5. Bottom Scroll Guide Indicator */}
                <div className="relative pb-6 text-center">
                    <a
                        href="#sambutan"
                        className="inline-flex flex-col items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors group"
                    >
                        <span className="text-[11px] font-medium opacity-80">Jelajahi Profil Desa</span>
                        <div className="h-7 w-4 rounded-full border border-zinc-700 flex items-start justify-center p-1 group-hover:border-amber-500/60 transition-colors">
                            <div className="h-1.5 w-1 rounded-full bg-amber-400 animate-bounce" />
                        </div>
                    </a>
                </div>
            </section>

            {/* Seamless Divider */}
            <div id="sambutan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 3: SAMBUTAN KEPALA DESA & VISI MISI */}
            <section className="relative py-16 overflow-hidden">
                <div className="ambient-glow-red top-1/2 -right-24 opacity-30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Photo Column */}
                        <div className="lg:col-span-4 flex flex-col items-center">
                            <div className="relative w-64 h-80 rounded-lg overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-zinc-950">
                                <img
                                    src={headOfficial?.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'}
                                    alt={headOfficial?.name || 'Kepala Desa Karangwungu'}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4 text-center text-white">
                                    <h3 className="font-bold text-sm leading-tight text-white">
                                        {headOfficial?.name || 'H. Moh. Suhartono, S.Sos'}
                                    </h3>
                                    <p className="text-xs text-amber-400 font-medium">Kepala Desa Karangwungu</p>
                                </div>
                            </div>
                        </div>

                        {/* Speech Content Column */}
                        <div className="lg:col-span-8 space-y-4">
                            <Badge variant="gold">Sambutan Kepala Desa</Badge>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                                Membangun Desa Karangwungu yang Modern, Guyub Rukun, dan Sejahtera
                            </h2>
                            <div className="text-sm sm:text-base text-zinc-300 space-y-3 leading-relaxed">
                                <p>
                                    <em>Assalamu’alaikum Warahmatullahi Wabarakatuh.</em>
                                </p>
                                <p>
                                    Selamat datang di portal resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Website ini kami hadirkan sebagai bentuk komitmen keterbukaan informasi publik, modernisasi pelayanan administrasi kependudukan, dan wadah promosi potensi desa.
                                </p>
                                <p>
                                    Kami mengajak seluruh warga desa Karangwungu baik yang berdomisili di desa maupun di perantauan untuk bersama-sama berpartisipasi memajukan desa tercinta kita melalui pemanfaatan teknologi digital ini.
                                </p>
                            </div>

                            <div className="pt-2 flex flex-wrap gap-4">
                                <Button href="/profil/sejarah" variant="red" size="default">
                                    <span>Visi, Misi & Sejarah</span>
                                    <ArrowRight className="h-4 w-4 ml-1.5" />
                                </Button>
                                <Button href="/profil/perangkat-desa" variant="outline" size="default" className="border-amber-500/40 text-zinc-200 hover:text-amber-400">
                                    <span>Struktur Perangkat Desa</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 4: LAYANAN MANDIRI ONLINE */}
            <section className="relative py-16 overflow-hidden">
                <div className="ambient-glow-gold -top-20 -left-20 opacity-30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <Badge variant="red">Pelayanan Publik</Badge>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                                Layanan Surat Online Mandiri
                            </h2>
                            <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                                Ajukan pembuatan surat keterangan desa dari mana saja tanpa antre. Cepat, transparan, dan dapat dipantau statusnya.
                            </p>
                        </div>
                        <Button href="/layanan" variant="outline" size="sm" className="border-amber-500/40 text-zinc-200 hover:text-amber-400">
                            <span>Lihat Semua Layanan</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-md hover:border-amber-500/50 transition-all">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-red-950/80 text-red-400 border border-red-800/40 flex items-center justify-center mb-2">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <CardTitle>Surat Keterangan Usaha (SKU)</CardTitle>
                                <CardDescription>
                                    Untuk pengajuan modal KUR bank, legalitas usaha toko, perikanan tambak, maupun pertanian.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button href="/layanan/ajukan?type=sku" variant="red" size="sm" className="w-full">
                                    <span>Ajukan Sekarang</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-md hover:border-amber-500/50 transition-all">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/40 flex items-center justify-center mb-2">
                                    <Users className="h-5 w-5" />
                                </div>
                                <CardTitle>Surat Keterangan Domisili</CardTitle>
                                <CardDescription>
                                    Keterangan tempat tinggal resmi bagi warga Karangwungu maupun warga pendatang.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button href="/layanan/ajukan?type=domisili" variant="red" size="sm" className="w-full">
                                    <span>Ajukan Sekarang</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-md hover:border-amber-500/50 transition-all">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-red-950/80 text-red-400 border border-red-800/40 flex items-center justify-center mb-2">
                                    <Shield className="h-5 w-5" />
                                </div>
                                <CardTitle>Surat Keterangan Tidak Mampu</CardTitle>
                                <CardDescription>
                                    Pengajuan beasiswa pendidikan sekolah/kuliah, bantuan kesehatan, dan jaminan sosial.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button href="/layanan/ajukan?type=sktm" variant="red" size="sm" className="w-full">
                                    <span>Ajukan Sekarang</span>
                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Quick Tracking Widget */}
                    <div className="mt-8 p-6 rounded-lg bg-zinc-900/80 border border-amber-500/40 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                        <div className="flex items-center gap-3">
                            <Search className="h-8 w-8 text-amber-400 shrink-0" />
                            <div>
                                <h4 className="text-base font-bold text-white">
                                    Sudah Pernah Mengajukan Surat?
                                </h4>
                                <p className="text-xs sm:text-sm text-zinc-400">
                                    Masukkan kode tracking untuk memantau proses verifikasi dan kesiapan dokumen Anda.
                                </p>
                            </div>
                        </div>
                        <Button href="/layanan/lacak" variant="gold" size="default" className="shrink-0 w-full md:w-auto">
                            <span>Lacak Permohonan</span>
                            <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 5: BERITA & INFORMASI TERKINI */}
            <section className="relative py-16 overflow-hidden">
                <div className="ambient-glow-red -bottom-20 -right-20 opacity-30" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <Badge variant="gold">Kabar Terkini</Badge>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                                Warta & Pengumuman Desa
                            </h2>
                            <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                                Informasi kegiatan pemerintahan, pembangunan infrastruktur, pertanian, dan kemasyarakatan.
                            </p>
                        </div>
                        <Button href="/berita" variant="outline" size="sm" className="border-amber-500/40 text-zinc-200 hover:text-amber-400">
                            <span>Lihat Semua Berita</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestPosts.slice(0, 3).map((post) => (
                            <Card key={post.id} className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-md overflow-hidden flex flex-col group hover:border-amber-500/50 transition-all hover:shadow-xl">
                                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="default" className="bg-black/90 backdrop-blur-sm text-amber-300 border border-amber-500/40 text-[11px]">
                                            {post.category}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="flex-1 pb-2">
                                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                            {formatDateIndo(post.published_at)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3.5 w-3.5" />
                                            {post.views}x
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-base group-hover:text-amber-400 transition-colors">
                                        <Link href={`/berita/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-2">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>

                                <CardFooter className="pt-2">
                                    <Link
                                        href={`/berita/${post.slug}`}
                                        className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>Baca Selengkapnya</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 6: POTENSI UNGGULAN DESA */}
            <section className="relative py-16 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <Badge variant="gold">Ekonomi Kreatif</Badge>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                                Potensi & Produk Unggulan Karangwungu
                            </h2>
                            <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                                Menampilkan hasil komoditas tambak ikan bandeng, pertanian padi sawah, serta kreasi produk UMKM warga desa.
                            </p>
                        </div>
                        <Button href="/potensi" variant="outline" size="sm" className="border-amber-500/40 text-zinc-200 hover:text-amber-400">
                            <span>Jelajahi Produk</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {potentials.map((item) => (
                            <Card key={item.id} className="bg-zinc-900/70 border-zinc-800/80 backdrop-blur-md overflow-hidden flex flex-col hover:border-amber-500/50 transition-all hover:shadow-xl">
                                <div className="h-44 w-full overflow-hidden bg-zinc-950">
                                    <img
                                        src={item.image || 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80'}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <CardHeader className="flex-1 p-4 pb-2">
                                    <Badge variant="secondary" className="w-fit mb-1.5 text-[11px] text-amber-400 border-amber-500/30 font-semibold">
                                        {item.category}
                                    </Badge>
                                    <CardTitle className="text-sm font-bold line-clamp-2">
                                        {item.title}
                                    </CardTitle>
                                    <p className="text-xs text-amber-400 font-bold mt-1">
                                        {item.price_range}
                                    </p>
                                    <CardDescription className="text-xs line-clamp-2 mt-1.5">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="p-4 pt-1">
                                    <span className="text-[11px] text-zinc-400">
                                        Oleh: {item.owner_name}
                                    </span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 7: TRANSPARANSI APBDES BANNER */}
            <section className="relative py-16 overflow-hidden">
                <div className="ambient-glow-red -bottom-24 left-1/4 opacity-40" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-4">
                            <Badge variant="gold">
                                Transparansi Anggaran
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                                Transparansi APBDes Tahun Anggaran 2026
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                                Pengelolaan Keuangan Desa Karangwungu diselenggarakan secara terbuka, tertib, dan dapat dipertanggungjawabkan untuk kemakmuran seluruh masyarakat.
                            </p>
                            <div className="pt-2">
                                <Button href="/transparansi" variant="red" size="default">
                                    <span>Lihat Rincian APBDes Lengkap</span>
                                    <ArrowRight className="h-4 w-4 ml-1.5 text-amber-300" />
                                </Button>
                            </div>
                        </div>

                        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-amber-500/40 shadow-xl">
                                <span className="text-xs text-amber-400 font-semibold">Total Anggaran Pendapatan</span>
                                <p className="text-xl font-bold text-white mt-1">
                                    {formatRupiah(apbdes_summary.income || 1715000000)}
                                </p>
                                <div className="mt-3 text-xs text-zinc-400 flex justify-between">
                                    <span>Realisasi:</span>
                                    <span className="font-bold text-amber-400">
                                        {formatRupiah(apbdes_summary.realized_income || 1327250000)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-red-500/40 shadow-xl">
                                <span className="text-xs text-red-400 font-semibold">Total Anggaran Belanja</span>
                                <p className="text-xl font-bold text-white mt-1">
                                    {formatRupiah(apbdes_summary.expense || 1715000000)}
                                </p>
                                <div className="mt-3 text-xs text-zinc-400 flex justify-between">
                                    <span>Realisasi:</span>
                                    <span className="font-bold text-red-400">
                                        {formatRupiah(apbdes_summary.realized_expense || 1327250000)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
