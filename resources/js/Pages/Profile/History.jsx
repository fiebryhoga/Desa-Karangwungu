import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Target,
    Clock,
    Calendar,
    User,
    CheckCircle2,
    Shield,
    HeartHandshake,
    GraduationCap,
    TrendingUp,
    Building2,
    Award,
    HeartPulse,
    ShieldCheck,
    UserCheck,
    Sparkles,
} from 'lucide-react';

// Siluet Batik Kawung Keraton (Motif Tradisional Keagungan & Kebijaksanaan Nusantara)
const BATIK_PATTERN = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='30' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='30' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='30' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpolygon points='30,26 34,30 30,34 26,30' fill='%23fde047'/%3E%3Ccircle cx='30' cy='19' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='41' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='19' cy='30' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='41' cy='30' r='1.5' fill='%23fde047'/%3E%3Cellipse cx='0' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='60' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='0' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='60' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='0' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='60' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='0' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='60' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Ccircle cx='0' cy='0' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='60' cy='0' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='60' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='60' cy='60' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpolygon points='0,4 4,0 0,-4 -4,0' fill='%23fde047'/%3E%3Cpolygon points='60,4 64,0 60,-4 56,0' fill='%23fde047'/%3E%3Cpolygon points='0,64 4,60 0,56 -4,60' fill='%23fde047'/%3E%3Cpolygon points='60,64 64,60 60,56 56,60' fill='%23fde047'/%3E%3C/svg%3E`;

// Siluet Batik Parang Kencana (Motif Kepemimpinan Tradisional)
const BATIK_LEADERSHIP_PATTERN = `data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-10 10 L10 -10 M35 55 L55 35 M80 100 L100 80' stroke='%23fde047' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-10 55 L55 -10 M35 100 L100 35' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 3'/%3E%3Cpath d='M10 35 Q 25 20, 20 45 T 35 30' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M55 80 Q 70 65, 65 90 T 80 75' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M55 35 Q 70 20, 65 45 T 80 30' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M10 80 Q 25 65, 20 90 T 35 75' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpolygon points='45,45 50,40 55,45 50,50' fill='%23fde047'/%3E%3Cpolygon points='0,0 5,-5 10,0 5,5' fill='%23fde047'/%3E%3Cpolygon points='90,90 95,85 100,90 95,95' fill='%23fde047'/%3E%3Cpolygon points='90,0 95,-5 100,0 95,5' fill='%23fde047'/%3E%3Cpolygon points='0,90 5,85 10,90 5,95' fill='%23fde047'/%3E%3Ccircle cx='25' cy='25' r='2' fill='%23fde047'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%23fde047'/%3E%3Ccircle cx='70' cy='25' r='2' fill='%23fde047'/%3E%3Ccircle cx='25' cy='70' r='2' fill='%23fde047'/%3E%3C/svg%3E`;

export default function History() {
    // 8 Silsilah Resmi Kepala Desa Karangwungu (1912 - Sekarang)
    const leaders = [
        {
            order: 1,
            name: 'H. ALI SARIBAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-1',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'SAEDJAN',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-2',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'MATARDJO. AS',
            period: '1984 – 1992',
            role: 'Kepala Desa Ke-3',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'KANAN',
            period: '1993 – 2001',
            role: 'Kepala Desa Ke-4',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'MATARDJO. AS',
            period: '2002 – 2007',
            role: 'Kepala Desa Ke-5',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'ABDUL WAHAB',
            period: '2008 – 2013',
            role: 'Kepala Desa Ke-6',
            isCurrent: false,
        },
        {
            order: 7,
            name: 'SUNARTO',
            period: '2014 – 2019',
            role: 'Kepala Desa Ke-7 (Periode I)',
            isCurrent: false,
        },
        {
            order: 8,
            name: 'SUNARTO',
            period: '2020 – 2026',
            role: 'Kepala Desa Ke-8 (Periode II)',
            isCurrent: true,
        },
    ];

    // 4 Misi Resmi Pembangunan Desa
    const missions = [
        {
            number: '01',
            category: 'Sosial & Keagamaan',
            title: 'Kehidupan Beragama & Sosial',
            desc: 'Meningkatkan Kualitas Kehidupan Beragama, Sosial Budaya dan Ketentraman Masyarakat;',
            icon: HeartHandshake,
            badge: 'Prioritas Pembangunan',
        },
        {
            number: '02',
            category: 'Pendidikan & Kesehatan',
            title: 'Pendidikan & Kesehatan SDM',
            desc: 'Meningkatkan Kualitas Pendidikan, Kesehatan dan Sumberdaya Manusia;',
            icon: GraduationCap,
            badge: 'Prioritas Pembangunan',
        },
        {
            number: '03',
            category: 'Ekonomi Pedesaan',
            title: 'Pembangunan Ekonomi Pedesaan',
            desc: 'Meningkatkan Pembangunan Ekonomi Pedesaan, dan Kesejahteraan Masyarakat;',
            icon: TrendingUp,
            badge: 'Prioritas Pembangunan',
        },
        {
            number: '04',
            category: 'Tata Kelola Pemerintahan',
            title: 'Profesionalisme Aparatur',
            desc: 'Meningkatkan Kualitas dan Profesionalisme Aparatur dalam Tata Kelola Pemerintahan, Pembangunan dan Pelayanan pada Masyarakat;',
            icon: Building2,
            badge: 'Prioritas Pembangunan',
        },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Visi, Misi & Kepemimpinan Desa Karangwungu"
                description="Informasi visi misi pembangunan jangka panjang serta silsilah estafet kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                keywords="Visi Misi Desa Karangwungu, Kepala Desa Karangwungu, Sunarto Kepala Desa"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Visi, Misi & Kepemimpinan', url: '/profil/sejarah' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12">
                {/* 1. PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Visi, Misi & Kepemimpinan Desa"
                    subtitle="Arah kebijakan pembangunan jangka panjang dan silsilah kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                />

                {/* ============================================================ */}
                {/* 2. SEKSI VISI & MISI DESA                                    */}
                {/* ============================================================ */}
                <div id="visi-misi" className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                            <Target className="h-4 w-4" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                Visi & Misi Pembangunan
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Arah kebijakan jangka panjang dan langkah nyata pelayanan masyarakat Desa Karangwungu
                            </p>
                        </div>
                    </div>

                    {/* Banner Visi Utama (Full Width dengan Split Layout: Visi di Kiri, 4 Pilar di Kanan) */}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-red-500/30 dark:border-red-900/50 bg-gradient-to-br from-[#2d070b] via-[#160406] to-[#0a0304] text-white shadow-2xl p-6 sm:p-8 lg:p-10 group">
                        {/* Traditional Golden Nusantara Batik Kawung Silhouette Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.11] dark:opacity-[0.14] bg-repeat pointer-events-none mix-blend-screen"
                            style={{
                                backgroundImage: `url("${BATIK_PATTERN}")`,
                                backgroundSize: '60px 60px',
                            }}
                        />

                        {/* Ambient Background Lighting Flares */}
                        <div className="absolute -top-24 -left-20 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Split 2-Kolom: Kiri Visi Utama, Kanan 4 Pilar */}
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                            {/* Kolom Kiri: Badge & Pernyataan Visi */}
                            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                                <div className="flex justify-center lg:justify-start">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-red-950/70 to-amber-500/15 border border-amber-400/35 text-amber-300 text-[11px] font-black tracking-widest uppercase shadow-md shadow-amber-950/30 backdrop-blur-md">
                                        <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0 aspect-square animate-pulse" />
                                        <span>VISI RESMI PEMERINTAH DESA KARANGWUNGU</span>
                                    </div>
                                </div>

                                <blockquote className="text-base sm:text-xl lg:text-2xl font-black leading-relaxed sm:leading-relaxed text-white tracking-wide drop-shadow-sm">
                                    "Terwujudnya Masyarakat Desa Karangwungu Yang Berakhlak Mulia, Sehat, Sejahtera dan Bermartabat Dalam Naungan Pemerintah Desa Yang Demokratis dan Amanah"
                                </blockquote>
                            </div>

                            {/* Kolom Kanan: 4 Pilar Strategis dalam format 2x2 Grid */}
                            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5">
                                {/* Pilar 1 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <Award className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar I</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            Berakhlak Mulia
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 2 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <HeartPulse className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar II</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            Sehat & Bugar
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 3 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <ShieldCheck className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar III</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            Masyarakat Sejahtera
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 4 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <UserCheck className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar IV</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            Demokratis & Amanah
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4 Misi Strategis (Dynamic Responsive Grid - Tema Khas Karangwungu) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {missions.map((m, idx) => {
                            const IconComponent = m.icon;
                            const numStr = m.number || String(idx + 1).padStart(2, '0');
                            return (
                                <div
                                    key={m.number || idx}
                                    className="relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-[#2a080d] via-[#160507] to-[#0a0203] text-white border border-red-500/30 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-red-950/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4 group"
                                >
                                    {/* Full Traditional Nusantara Batik Silhouette Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12] pointer-events-none mix-blend-screen bg-repeat group-hover:opacity-[0.14] transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `url("${BATIK_PATTERN}")`,
                                            backgroundSize: '55px 55px',
                                        }}
                                    />

                                    {/* Ambient Glowing Flare */}
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

                                    <div className="space-y-4 relative z-10">
                                        {/* Top Header: Icon Crest & Golden Pill Number */}
                                        <div className="flex items-center justify-between">
                                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-red-950 text-amber-300 border border-amber-400/35 flex items-center justify-center shadow-lg shadow-red-950/50 group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-red-700/30 transition-all duration-300">
                                                <IconComponent className="h-5 w-5 text-amber-300" />
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-black/50 border border-amber-400/30 font-mono font-black text-xs text-amber-300 tracking-wider shadow-xs">
                                                MISI {numStr}
                                            </span>
                                        </div>

                                        {/* Category & Title */}
                                        <div className="space-y-1.5">
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                <span>{m.category}</span>
                                            </div>
                                            <h3 className="text-base sm:text-[17px] font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                                                {m.title}
                                            </h3>
                                        </div>

                                        {/* Description Framed with Accent Line */}
                                        <div className="border-l-2 border-red-500/40 pl-3 py-0.5">
                                            <p className="text-xs text-zinc-300/90 leading-relaxed text-left">
                                                {m.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer Tag */}
                                    <div className="pt-3.5 border-t border-white/10 flex items-center justify-between relative z-10">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-red-950/60 to-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold shadow-xs">
                                            <Sparkles className="h-3 w-3 text-amber-400" />
                                            <span>{m.badge || 'Prioritas Strategis'}</span>
                                        </div>
                                        <div className="h-2 w-2 rounded-full bg-amber-400/40 group-hover:bg-amber-400 group-hover:scale-125 transition-all shadow-xs" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. SEKSI SILSILAH KEPEMIMPINAN (8 PERIODE KEPALA DESA)       */}
                {/* ============================================================ */}
                <div id="jejak-kepemimpinan" className="space-y-6">
                    <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs">
                                <Clock className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                                    Silsilah Kepala Desa Karangwungu
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    Rekam jejak 8 periode kepemimpinan desa dari masa ke masa
                                </p>
                            </div>
                        </div>

                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                            8 Periode
                        </span>
                    </div>

                    {/* 4-Column Grid of 8 Leaders (2 Rows of 4) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {leaders.map((leader) => (
                            <div
                                key={leader.order}
                                className={`relative overflow-hidden rounded-xl p-4 sm:p-5 transition-all flex flex-col justify-between space-y-3 shadow-md ${
                                    leader.isCurrent
                                        ? 'bg-gradient-to-b from-red-800 via-red-900 to-zinc-950 text-white border-2 border-amber-400 shadow-xl shadow-red-950/40'
                                        : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-xs hover:border-red-500/40 dark:hover:border-amber-400/40'
                                }`}
                            >
                                {leader.isCurrent && (
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen bg-repeat"
                                        style={{
                                            backgroundImage: `url("${BATIK_LEADERSHIP_PATTERN}")`,
                                            backgroundSize: '80px 80px',
                                        }}
                                    />
                                )}
                                <div className="space-y-3 relative z-10">
                                    {/* Header: Period & Status */}
                                    <div className="flex items-center justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                                                leader.isCurrent
                                                    ? 'bg-black/40 text-amber-300 border-white/20'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                                            }`}
                                        >
                                            <Calendar className="h-3 w-3" />
                                            <span>{leader.period}</span>
                                        </span>

                                        {leader.isCurrent ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/40 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                <span>Aktif</span>
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                                                #{leader.order}
                                            </span>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <div className="flex items-center gap-2.5 pt-1">
                                        <div
                                            className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 font-black'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                                            }`}
                                        >
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3
                                                className={`text-xs sm:text-sm font-bold truncate ${
                                                    leader.isCurrent
                                                        ? 'text-white'
                                                        : 'text-zinc-900 dark:text-white'
                                                }`}
                                            >
                                                {leader.name}
                                            </h3>
                                            <p
                                                className={`text-[11px] font-medium ${
                                                    leader.isCurrent
                                                        ? 'text-amber-300 font-bold'
                                                        : 'text-zinc-500 dark:text-zinc-400'
                                                }`}
                                            >
                                                {leader.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`pt-2.5 border-t text-[10px] flex items-center justify-between ${
                                        leader.isCurrent
                                            ? 'border-white/20 text-zinc-300'
                                            : 'border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'
                                    }`}
                                >
                                    <span>Pemerintah Desa</span>
                                    <Shield
                                        className={`h-3 w-3 ${
                                            leader.isCurrent ? 'text-amber-300' : 'text-zinc-300 dark:text-zinc-600'
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
