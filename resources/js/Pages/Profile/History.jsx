import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import {
    History as HistoryIcon,
    Target,
    Compass,
    Sparkles,
    ScrollText,
    TreePine,
    Layers,
    CheckCircle2,
    ShieldCheck,
    Wheat,
    Fish,
    UserCheck,
    Calendar,
    Award,
    Milestone,
    Landmark,
    Clock,
    User,
} from 'lucide-react';

export default function History() {
    const leaders = [
        {
            order: 12,
            name: 'Elli Susiantoro, S.E',
            period: '2019 – Sekarang',
            role: 'Kepala Desa Aktif',
            note: 'Transformasi digital desa mandiri, transparansi anggaran, dan inovasi pelayanan surat online.',
            isCurrent: true,
        },
        {
            order: 11,
            name: 'Moh. Afan Efendi',
            period: '2013 – 2019',
            role: 'Kepala Desa',
            note: 'Pemberdayaan kelompok tani/petambak dan optimalisasi alokasi dana desa.',
            isCurrent: false,
        },
        {
            order: 10,
            name: 'Suprayitno',
            period: '2007 – 2013',
            role: 'Kepala Desa',
            note: 'Percepatan infrastruktur jalan paving lingkungan dan ketahanan pangan.',
            isCurrent: false,
        },
        {
            order: 9,
            name: 'Drs. H. Abdul Hadi, SH. MH.',
            period: '1990 – 2007',
            role: 'Kepala Desa (17 Tahun Pengabdian)',
            note: 'Modernisasi tata kelola birokrasi desa dan penguatan kelembagaan hukum.',
            isCurrent: false,
        },
        {
            order: 8,
            name: 'Mat Ismail',
            period: '1982 – 1990',
            role: 'Kepala Desa',
            note: 'Ekspansi sektor perikanan tambak dan pemerataan sarana umum.',
            isCurrent: false,
        },
        {
            order: 7,
            name: 'Dulkarim',
            period: '1981 – 1982',
            role: 'Penjabat (Pj) Kepala Desa',
            note: 'Transisi administratif menuju pemilihan kepala desa definitif.',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'Seman',
            period: '1971 – 1981',
            role: 'Kepala Desa',
            note: 'Pengembangan awal saluran irigasi pertanian dan pembangunan jalan desa.',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'Dulkarim',
            period: '1968 – 1971',
            role: 'Penjabat (Pj) Kepala Desa',
            note: 'Menjaga stabilitas dan kesinambungan pelayanan administrasi desa.',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'Samarun',
            period: '1940 – 1968',
            role: 'Kepala Desa (Era Kemerdekaan)',
            note: 'Memimpin di masa transisi kemerdekaan RI & konsolidasi lumbung pangan desa.',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'Ardjo Dipuro',
            period: '1935 – 1940',
            role: 'Kepala Desa',
            note: 'Penguatan ketertiban masyarakat dan pembagian lahan pekarangan.',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'Parelan',
            period: '1933 – 1935',
            role: 'Kepala Desa',
            note: 'Melanjutkan fondasi pemerintahan desa dan sistem pertanian rakyat.',
            isCurrent: false,
        },
        {
            order: 1,
            name: 'Ngarip',
            period: '1912 – 1933',
            role: 'Kepala Desa Ke-1 (Perintis)',
            note: 'Perintis awal pemukiman dan tata kelola desa era awal abad ke-20.',
            isCurrent: false,
        },
    ];

    const missions = [
        {
            number: '01',
            title: 'Digitalisasi & Pelayanan Publik Cepat',
            desc: 'Meningkatkan kualitas pelayanan administrasi publik yang cepat, mudah, ramah, dan berbasis teknologi daring mandiri secara transparan.',
        },
        {
            number: '02',
            title: 'Modernisasi Pertanian & Tambak Modern',
            desc: 'Mendorong produktivitas pertanian padi dan budidaya tambak bandeng/vaname melalui sarana irigasi serta pendampingan kelompok tani.',
        },
        {
            number: '03',
            title: 'Pemerataan Infrastruktur & Sanitasi',
            desc: 'Meningkatkan pemerataan pembangunan infrastruktur jalan poros desa, penerangan umum, dan tata kelola lingkungan yang berkelanjutan.',
        },
        {
            number: '04',
            title: 'Pengembangan UMKM & BUMDes Mandiri',
            desc: 'Menumbuhkembangkan usaha mikro kecil menengah warga dan optimalisasi permodalan unit usaha Badan Usaha Milik Desa.',
        },
        {
            number: '05',
            title: 'Religiusitas, Budaya & Gotong Royong',
            desc: 'Menjaga kelestarian lingkungan hidup, nilai-nilai religiusitas masyarakat, dan keharmonisan sosial berlandaskan kearifan lokal.',
        },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Sejarah, Visi Misi & Jejak Kepemimpinan"
                description="Sejarah asal-usul Desa Karangwungu, Visi Misi pembangunan jangka panjang, serta rekam jejak estafet kepemimpinan kepala desa sejak tahun 1912."
                keywords="Sejarah Desa Karangwungu, Kepala Desa Karangwungu, Visi Misi Karangwungu, Asal Usul Karangwungu Lamongan"
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
                {/* 1. HERO HEADER */}
                <div className="space-y-6">
                    {/* Banner Hero Sejarah dengan Gambar Lanskap Sinematik */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/90 dark:border-zinc-800/90">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')`,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />

                        <div className="relative p-6 sm:p-10 lg:p-14 max-w-3xl space-y-4 sm:space-y-6 text-white">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wide shadow-lg">
                                <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                                <span>Dokumen Sejarah Resmi & Kepemimpinan</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
                                Sejarah, Visi Misi & <br />
                                Estafet Kepemimpinan Desa
                            </h1>

                            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-normal">
                                Mengenal napak tilas berdirinya Desa Karangwungu, nilai kearifan lokal leluhur, arah pembangunan jangka panjang, serta rekam jejak pengabdian 12 kepala desa dari masa ke masa sejak tahun 1912.
                            </p>

                            <div className="flex flex-wrap gap-3 pt-2">
                                <a
                                    href="#sejarah-asal-usul"
                                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all inline-flex items-center gap-1.5"
                                >
                                    <ScrollText className="h-4 w-4 text-amber-400" />
                                    <span>Asal-Usul Desa</span>
                                </a>
                                <a
                                    href="#visi-misi"
                                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all inline-flex items-center gap-1.5"
                                >
                                    <Target className="h-4 w-4 text-red-400" />
                                    <span>Visi & Misi</span>
                                </a>
                                <a
                                    href="#jejak-kepemimpinan"
                                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg transition-all inline-flex items-center gap-1.5"
                                >
                                    <UserCheck className="h-4 w-4 text-amber-300" />
                                    <span>Jejak Kepemimpinan (1912 - Sekarang)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 2. SEKSI ASAL-USUL NAMA & BABAT ALAS (DENGAN GAMBAR VISUAL) */}
                {/* ============================================================ */}
                <div id="sejarah-asal-usul" className="space-y-8 scroll-mt-24">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 dark:bg-red-500/15 text-xs font-bold text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/30">
                            <Milestone className="h-3.5 w-3.5" />
                            <span>Napak Tilas Peradaban Desa</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            Asal-Usul Nama & Sejarah Berdirinya Desa
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Kolom Kiri: Visual Gambar Bertema Pohon Wungu & Kearifan Budaya */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/90 dark:border-zinc-800/90 aspect-[4/3] group">
                                <img
                                    src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80"
                                    alt="Ilustrasi Alam & Pepohonan Asal Usul Desa"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-zinc-950 font-black text-[10px] uppercase tracking-wider">
                                        Falsafah Nama
                                    </span>
                                    <h4 className="text-base font-extrabold leading-tight">
                                        Harmonisasi Tanah Karang & Bunga Wungu
                                    </h4>
                                    <p className="text-xs text-zinc-300">
                                        Simbol keteguhan fondasi tempat tinggal dan keindahan kemakmuran alam.
                                    </p>
                                </div>
                            </div>

                            {/* Kotak Etimologi Visual 2 Kolom */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-2xl bg-gradient-to-b from-red-50/80 via-white to-white dark:from-red-950/40 dark:via-zinc-900 dark:to-zinc-950 border border-red-200/90 dark:border-red-900/50 space-y-1 text-center shadow-xs">
                                    <span className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider block">
                                        &ldquo;Karang&rdquo;
                                    </span>
                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                        Pekarangan Kokoh
                                    </p>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                        Hamparan tanah pemukiman yang kuat untuk bernaung.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50/80 via-white to-white dark:from-amber-950/40 dark:via-zinc-900 dark:to-zinc-950 border border-amber-200/90 dark:border-amber-900/50 space-y-1 text-center shadow-xs">
                                    <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                                        &ldquo;Wungu&rdquo;
                                    </span>
                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                        Pohon Lembayung
                                    </p>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                        Pohon rindang di sekitar mata air babat alas pertama.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Narasi Sejarah Komprehensif */}
                        <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                            <p>
                                Menurut penuturan para sesepuh dan tokoh masyarakat secara turun-temurun, nama <strong>Karangwungu</strong> berakar dari dua kata dalam bahasa Jawa kuno, yaitu <em>&ldquo;Karang&rdquo;</em> yang bermakna pekarangan atau hamparan tanah pemukiman yang kokoh, dan <em>&ldquo;Wungu&rdquo;</em> yang merujuk pada pohon wungu (pohon berkayu kuat dengan bunga berwarna lembayung/ungu yang konon tumbuh subur di sekitar sumber mata air pertama saat pembukaan lahan/babat alas pemukiman).
                            </p>
                            <p>
                                Para pendahulu yang membuka wilayah Karangwungu mendiami kawasan tepi rawa subur yang dialiri percabangan anak sungai Bengawan Solo. Kesuburan tanah aluvial ini menjadikan pemukiman berkembang pesat sebagai sentra lumbung padi dan kemudian bertransformasi menjadi kawasan budidaya tambak perikanan air tawar terkemuka di wilayah Lamongan utara.
                            </p>

                            {/* 3 Tonggak Milestone Sejarah */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-1">
                                    <span className="text-xs font-black text-red-600 dark:text-red-400">1912</span>
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Era Babat Alas</h4>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                        Kepemimpinan awal dan pembagian petak tanah sawah.
                                    </p>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-1">
                                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">1982</span>
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Sentra Tambak</h4>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                        Perluasan komoditas budidaya ikan bandeng & udang.
                                    </p>
                                </div>
                                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-1">
                                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">2019 – Kini</span>
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Desa Mandiri Digital</h4>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                        Pelayanan publik online & transparansi tata kelola.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. SEKSI VISI & 5 MISI STRATEGIS PEMBANGUNAN                 */}
                {/* ============================================================ */}
                <div id="visi-misi" className="space-y-10 scroll-mt-24">
                    {/* Banner Visi Utama */}
                    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-red-950 dark:from-red-900 dark:via-red-950 dark:to-zinc-950 text-white p-8 sm:p-12 shadow-2xl border border-red-500/40">
                        <div className="ambient-glow-gold -top-24 -right-24 opacity-30 pointer-events-none" />

                        <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-xs font-bold text-amber-300">
                                <Target className="h-4 w-4" />
                                <span>VISI DESA KARANGWUNGU</span>
                            </div>

                            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug tracking-tight text-white drop-shadow-md">
                                &ldquo;Terwujudnya Desa Karangwungu yang Religius, Maju, Sejahtera, Transparan, dan Mandiri Berbasis Potensi Pertanian dan Perikanan Tambak.&rdquo;
                            </blockquote>

                            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-zinc-200">
                                    <Wheat className="h-4 w-4 text-amber-400" />
                                    Pertanian Subur
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-zinc-200">
                                    <Fish className="h-4 w-4 text-amber-400" />
                                    Perikanan Tambak Modern
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-zinc-200">
                                    <Sparkles className="h-4 w-4 text-amber-400" />
                                    Pelayanan Publik Cepat
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 5 Kartu Misi Pembangunan */}
                    <div className="space-y-4">
                        <div className="text-center max-w-2xl mx-auto space-y-1">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                                5 Misi Strategis Pembangunan Desa
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                                Langkah konkret pemerintah desa dalam mewujudkan kesejahteraan seluruh lapisan masyarakat.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-2">
                            {missions.map((m, idx) => (
                                <div
                                    key={m.number}
                                    className={`group relative p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-red-500/70 dark:hover:border-amber-500/70 shadow-lg shadow-zinc-950/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                                        idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                                    }`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-md">
                                                {m.number}
                                            </span>
                                            <CheckCircle2 className="h-5 w-5 text-zinc-300 dark:text-zinc-700 group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors" />
                                        </div>
                                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                                            {m.title}
                                        </h4>
                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {m.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 4. SEKSI ESTAFET KEPEMIMPINAN KEPALA DESA (1912 - SEKARANG)  */}
                {/* ============================================================ */}
                <div id="jejak-kepemimpinan" className="space-y-8 scroll-mt-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/15 to-amber-500/15 text-xs font-bold text-red-700 dark:text-amber-400 border border-red-300/60 dark:border-amber-500/30">
                                <Landmark className="h-3.5 w-3.5 text-amber-500" />
                                <span>Rekam Jejak Kepemimpinan (12 Periode)</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                                Silsilah Kepala Desa Karangwungu Dari Masa Ke Masa
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
                                Menghormati jasa dan dedikasi para pemimpin yang telah menorehkan tinta emas pengabdian dalam membangun Desa Karangwungu sejak tahun 1912 hingga era saat ini.
                            </p>
                        </div>
                    </div>

                    {/* Grid 12 Kartu Kepemimpinan Bersih & Berwibawa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                        {leaders.map((leader) => (
                            <div
                                key={leader.order}
                                className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between space-y-4 ${
                                    leader.isCurrent
                                        ? 'bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white shadow-xl shadow-red-950/30 border border-red-500/50'
                                        : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 hover:border-red-500/50 dark:hover:border-amber-500/50 shadow-sm hover:shadow-md'
                                } hover:-translate-y-1`}
                            >
                                <div className="space-y-4">
                                    {/* Header Kartu: Periode & Indikator Status */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono border ${
                                                leader.isCurrent
                                                    ? 'bg-black/35 text-amber-300 border-white/20'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700/80'
                                            }`}
                                        >
                                            <Calendar className="h-3 w-3" />
                                            <span>{leader.period}</span>
                                        </span>

                                        {leader.isCurrent && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span>Menjabat Aktif</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Identitas Nama & Avatar Jabatan */}
                                    <div className="flex items-center gap-3 pt-1">
                                        <div
                                            className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 font-black'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3
                                                className={`text-sm sm:text-base font-extrabold leading-tight truncate ${
                                                    leader.isCurrent
                                                        ? 'text-white'
                                                        : 'text-zinc-900 dark:text-white'
                                                }`}
                                            >
                                                {leader.name}
                                            </h3>
                                            <p
                                                className={`text-xs font-semibold mt-0.5 ${
                                                    leader.isCurrent
                                                        ? 'text-amber-300 font-bold'
                                                        : 'text-red-600 dark:text-amber-400'
                                                }`}
                                            >
                                                {leader.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Catatan Dedikasi */}
                                    <p
                                        className={`text-xs leading-relaxed font-normal ${
                                            leader.isCurrent
                                                ? 'text-red-100/90'
                                                : 'text-zinc-600 dark:text-zinc-400'
                                        }`}
                                    >
                                        {leader.note}
                                    </p>
                                </div>

                                <div
                                    className={`pt-3 border-t text-[10px] flex items-center justify-between ${
                                        leader.isCurrent
                                            ? 'border-white/20 text-red-200'
                                            : 'border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'
                                    }`}
                                >
                                    <span>Pemerintah Desa Karangwungu</span>
                                    <ShieldCheck
                                        className={`h-3.5 w-3.5 ${
                                            leader.isCurrent ? 'text-amber-300' : 'text-zinc-300 dark:text-zinc-700'
                                        }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
