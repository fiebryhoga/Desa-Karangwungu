import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import {
    Target,
    Clock,
    Calendar,
    User,
    Users,
    CheckCircle2,
    Check,
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
import { getIconComponent } from '@/Utils/iconRegistry';

// Siluet Batik Kawung Keraton (Motif Tradisional Keagungan & Kebijaksanaan Nusantara)
const BATIK_PATTERN = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='30' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='30' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='30' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Ccircle cx='30' cy='30' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpolygon points='30,26 34,30 30,34 26,30' fill='%23fde047'/%3E%3Ccircle cx='30' cy='19' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='41' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='19' cy='30' r='1.5' fill='%23fde047'/%3E%3Ccircle cx='41' cy='30' r='1.5' fill='%23fde047'/%3E%3Cellipse cx='0' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='60' cy='19' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='0' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='60' cy='41' rx='6.5' ry='11' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='0' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='19' cy='60' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='0' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Cellipse cx='41' cy='60' rx='11' ry='6.5' fill='none' stroke='%23fde047' stroke-width='1.3'/%3E%3Ccircle cx='0' cy='0' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='60' cy='0' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='0' cy='60' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Ccircle cx='60' cy='60' r='18' fill='none' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 2'/%3E%3Cpolygon points='0,4 4,0 0,-4 -4,0' fill='%23fde047'/%3E%3Cpolygon points='60,4 64,0 60,-4 56,0' fill='%23fde047'/%3E%3Cpolygon points='0,64 4,60 0,56 -4,60' fill='%23fde047'/%3E%3Cpolygon points='60,64 64,60 60,56 56,60' fill='%23fde047'/%3E%3C/svg%3E`;

// Siluet Batik Parang Kencana (Motif Kepemimpinan & Ksatria Jawa - Khusus Sejarah Kepemimpinan)
const BATIK_LEADERSHIP_PATTERN = `data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-10 10 L10 -10 M35 55 L55 35 M80 100 L100 80' stroke='%23fde047' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M-10 55 L55 -10 M35 100 L100 35' stroke='%23fde047' stroke-width='1' stroke-dasharray='2 3'/%3E%3Cpath d='M10 35 Q 25 20, 20 45 T 35 30' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M55 80 Q 70 65, 65 90 T 80 75' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M55 35 Q 70 20, 65 45 T 80 30' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpath d='M10 80 Q 25 65, 20 90 T 35 75' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3Cpolygon points='45,45 50,40 55,45 50,50' fill='%23fde047'/%3E%3Cpolygon points='0,0 5,-5 10,0 5,5' fill='%23fde047'/%3E%3Cpolygon points='90,90 95,85 100,90 95,95' fill='%23fde047'/%3E%3Cpolygon points='90,0 95,-5 100,0 95,5' fill='%23fde047'/%3E%3Cpolygon points='0,90 5,85 10,90 5,95' fill='%23fde047'/%3E%3Ccircle cx='25' cy='25' r='2' fill='%23fde047'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%23fde047'/%3E%3Ccircle cx='70' cy='25' r='2' fill='%23fde047'/%3E%3Ccircle cx='25' cy='70' r='2' fill='%23fde047'/%3E%3C/svg%3E`;

export default function VisionMission({ visionMission = {} }) {
    // 8 Silsilah Resmi Kepala Desa Karangwungu (Urutan Terbaru di Atas - Tema Merah Hitam Kuning/Emas)
    const defaultLeaders = [
        {
            order: 8,
            name: 'Sunarto',
            period: '2020 – 2026',
            role: 'Kepala Desa Ke-8 (Periode II)',
            isCurrent: true,
        },
        {
            order: 7,
            name: 'Sunarto',
            period: '2014 – 2019',
            role: 'Kepala Desa Ke-7 (Periode I)',
            isCurrent: false,
        },
        {
            order: 6,
            name: 'Abdul Wahab',
            period: '2008 – 2013',
            role: 'Kepala Desa Ke-6',
            isCurrent: false,
        },
        {
            order: 5,
            name: 'Matardjo. AS',
            period: '2002 – 2007',
            role: 'Kepala Desa Ke-5',
            isCurrent: false,
        },
        {
            order: 4,
            name: 'Kanan',
            period: '1993 – 2001',
            role: 'Kepala Desa Ke-4',
            isCurrent: false,
        },
        {
            order: 3,
            name: 'Matardjo. AS',
            period: '1984 – 1992',
            role: 'Kepala Desa Ke-3',
            isCurrent: false,
        },
        {
            order: 2,
            name: 'Saedjan',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-2',
            isCurrent: false,
        },
        {
            order: 1,
            name: 'H. Ali Sariban',
            period: 'Seumur Hidup',
            role: 'Kepala Desa Ke-1 (Perintis)',
            isCurrent: false,
        },
    ];

    // 4 Misi Resmi Pembangunan Desa Karangwungu
    const defaultMissions = [
        {
            number: '01',
            category: 'Sosial & Keagamaan',
            title: 'Kehidupan Beragama & Sosial',
            desc: 'Meningkatkan Kualitas Kehidupan Beragama, Sosial Budaya dan Ketentraman Masyarakat;',
            icon: 'HeartHandshake',
            badge: 'Prioritas Strategis',
        },
        {
            number: '02',
            category: 'Pendidikan & Kesehatan',
            title: 'Pendidikan & Kesehatan SDM',
            desc: 'Meningkatkan Kualitas Pendidikan, Kesehatan dan Sumberdaya Manusia;',
            icon: 'GraduationCap',
            badge: 'Prioritas Strategis',
        },
        {
            number: '03',
            category: 'Ekonomi Pedesaan',
            title: 'Pembangunan Ekonomi Pedesaan',
            desc: 'Meningkatkan Pembangunan Ekonomi Pedesaan, dan Kesejahteraan Masyarakat;',
            icon: 'TrendingUp',
            badge: 'Prioritas Strategis',
        },
        {
            number: '04',
            category: 'Tata Kelola Pemerintahan',
            title: 'Profesionalisme Aparatur',
            desc: 'Meningkatkan Kualitas dan Profesionalisme Aparatur dalam Tata Kelola Pemerintahan, Pembangunan dan Pelayanan pada Masyarakat;',
            icon: 'Building2',
            badge: 'Prioritas Strategis',
        },
    ];

    const visionBadge = visionMission.vision_badge || 'Visi Resmi Pemerintah Desa Karangwungu';
    const visionText =
        visionMission.vision_text ||
        'Terwujudnya Masyarakat Desa Karangwungu Yang Berakhlak Mulia, Sehat, Sejahtera dan Bermartabat Dalam Naungan Pemerintah Desa Yang Demokratis dan Amanah';

    const Pillar1Icon = getIconComponent(visionMission.vision_pillar_1_icon, Award);
    const pillar1Text = visionMission.vision_pillar_1_text || 'Berakhlak Mulia';

    const Pillar2Icon = getIconComponent(visionMission.vision_pillar_2_icon, HeartPulse);
    const pillar2Text = visionMission.vision_pillar_2_text || 'Sehat & Bugar';

    const Pillar3Icon = getIconComponent(visionMission.vision_pillar_3_icon, ShieldCheck);
    const pillar3Text = visionMission.vision_pillar_3_text || 'Masyarakat Sejahtera';

    const Pillar4Icon = getIconComponent(visionMission.vision_pillar_4_icon, UserCheck);
    const pillar4Text = visionMission.vision_pillar_4_text || 'Demokratis & Amanah';

    const missions =
        visionMission.missions_data && visionMission.missions_data.length > 0
            ? visionMission.missions_data
            : defaultMissions;

    const leaders =
        visionMission.leaders_data && visionMission.leaders_data.length > 0
            ? visionMission.leaders_data
            : defaultLeaders;

    return (
        <AppLayout>
            <SeoHead
                title="Visi, Misi & Kepemimpinan Desa Karangwungu"
                description="Visi, 4 Misi Strategis Pembangunan, dan Sejarah Silsilah 8 Periode Kepemimpinan Kepala Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan."
                keywords="Visi Misi Desa Karangwungu, Kepala Desa Karangwungu, Sunarto Kepala Desa, Profil Karangwungu"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Visi, Misi & Kepemimpinan', url: '/profil/visi-misi' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
                {/* 1. PAGE HEADER */}
                <PageHeader
                    badge="Pemerintah Desa Karangwungu"
                    title="Visi, Misi & Kepemimpinan Desa"
                    subtitle="Arah kebijakan jangka panjang dan rekam jejak estafet kepemimpinan Kepala Desa Karangwungu dari masa ke masa."
                />

                {/* ============================================================ */}
                {/* 2. SEKSI VISI & MISI DESA                                    */}
                {/* ============================================================ */}
                <div id="visi-misi" className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-xs shrink-0 aspect-square">
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
                    <div className="relative w-full rounded-2xl overflow-hidden border border-red-500/30 dark:border-red-900/50 bg-gradient-to-br from-[#74151e] via-[#561017] to-[#38080f] dark:from-[#2d070b] dark:via-[#160406] dark:to-[#0a0304] text-white shadow-2xl p-6 sm:p-8 lg:p-10 group">
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
                                        <span>{visionBadge}</span>
                                    </div>
                                </div>

                                <blockquote className="text-base sm:text-xl lg:text-2xl font-black leading-relaxed sm:leading-relaxed text-white tracking-wide drop-shadow-sm">
                                    "{visionText}"
                                </blockquote>
                            </div>

                            {/* Kolom Kanan: 4 Pilar Strategis dalam format 2x2 Grid */}
                            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-3.5">
                                {/* Pilar 1 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <Pillar1Icon className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar I</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            {pillar1Text}
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 2 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <Pillar2Icon className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar II</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            {pillar2Text}
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 3 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <Pillar3Icon className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar III</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            {pillar3Text}
                                        </span>
                                    </div>
                                </div>

                                {/* Pilar 4 */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] group/pilar text-center">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/25 via-red-600/20 to-transparent border border-amber-400/30 text-amber-300 flex items-center justify-center shadow-inner group-hover/pilar:scale-110 group-hover/pilar:border-amber-400 transition-transform">
                                        <Pillar4Icon className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 block">Pilar IV</span>
                                        <span className="text-xs sm:text-[13px] font-bold text-white group-hover/pilar:text-amber-300 transition-colors leading-snug block">
                                            {pillar4Text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4 Misi Strategis (Dynamic Responsive Grid - Tema Khas Karangwungu) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {missions.map((m, idx) => {
                            const IconComponent = getIconComponent(m.icon, Target);
                            const numStr = m.number || String(idx + 1).padStart(2, '0');
                            return (
                                <div
                                    key={m.id || m.number || idx}
                                    className="relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-[#74151e] via-[#561017] to-[#38080f] dark:from-[#2a080d] dark:via-[#160507] dark:to-[#0a0203] text-white border border-red-500/30 hover:border-amber-400/60 shadow-xl hover:shadow-2xl hover:shadow-red-950/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4 group"
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
                {/* 3. SEKSI SEJARAH KEPEMIMPINAN (KARTU MERAH-HITAM-EMAS)       */}
                {/* ============================================================ */}
                <div id="jejak-kepemimpinan" className="space-y-8 pt-4">
                    {/* Centered Reference Header */}
                    <div className="max-w-2xl mx-auto text-center space-y-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-zinc-950 border border-red-500/40 text-amber-300 flex items-center justify-center mx-auto shadow-sm">
                            <Users className="h-5 w-5" />
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                Sejarah Kepemimpinan
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                                Daftar nama-nama yang pernah menjabat sebagai Kepala Desa Karangwungu dari masa ke masa.
                            </p>
                        </div>
                    </div>

                    {/* Timeline List (Cards in Red-Black-Gold Gradient Theme) */}
                    <div className="max-w-3xl mx-auto px-3 sm:px-6">
                        <div className="relative space-y-5 sm:space-y-6">
                            {/* Garis Vertikal Timeline Presisi di Tengah (Pancer Sejajar) */}
                            <div className="absolute left-[16px] sm:left-[18px] top-6 bottom-6 w-0.5 bg-red-500/50 dark:bg-red-500/40 -translate-x-1/2 pointer-events-none" />

                            {leaders.map((leader, idx) => (
                                <div key={leader.id || leader.order || idx} className="relative flex items-center gap-3.5 sm:gap-5 group">
                                    {/* Circular Number Node on the Line (Presisi Pancer Sejajar) */}
                                    <div
                                        className={`shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10 ${
                                            leader.isCurrent
                                                ? 'bg-amber-400 text-zinc-950 border-2 border-red-600 ring-4 ring-amber-400/30 scale-110 font-black'
                                                : 'bg-gradient-to-br from-red-700 via-red-800 to-red-950 border-2 border-red-500/80 text-amber-300 group-hover:scale-110 group-hover:border-amber-400 font-bold'
                                        }`}
                                    >
                                        <span className="text-xs sm:text-sm leading-none font-bold">
                                            {leader.order}
                                        </span>
                                    </div>

                                    {/* Leader Card (Signature Royal Red & Gold Gradient with Siluet Batik Parang) */}
                                    <div
                                        className={`relative overflow-hidden flex-1 min-w-0 p-3.5 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md group/card ${
                                            leader.isCurrent
                                                ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 border-2 border-amber-400 shadow-xl shadow-red-950/40'
                                                : 'bg-gradient-to-r from-red-800 via-red-900 to-red-950 border-red-500/40 hover:border-amber-400/70 hover:shadow-lg hover:shadow-red-950/30'
                                        }`}
                                    >
                                        {/* Siluet Batik Parang Kencana (Motif Kepemimpinan) */}
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-15 mix-blend-screen bg-repeat group-hover/card:opacity-20 transition-opacity duration-300"
                                            style={{
                                                backgroundImage: `url("${BATIK_LEADERSHIP_PATTERN}")`,
                                                backgroundSize: '90px 90px',
                                            }}
                                        />

                                        {/* Subtle Highlight Glow for Current Leader */}
                                        {leader.isCurrent && (
                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5" />
                                        )}

                                        {/* Name & Role */}
                                        <div className="space-y-1 min-w-0 relative z-10">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3
                                                    className={`text-base sm:text-lg font-bold tracking-tight ${
                                                        leader.isCurrent
                                                            ? 'text-white font-black'
                                                            : 'text-white group-hover/card:text-amber-300 transition-colors'
                                                    }`}
                                                >
                                                    {leader.name}
                                                </h3>
                                                {leader.isCurrent && (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 text-amber-300 border border-amber-400/50 text-[10px] font-bold shrink-0 shadow-xs">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                                                        <span>Menjabat Aktif</span>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-red-200/90 font-medium">
                                                {leader.role}
                                            </p>
                                        </div>

                                        {/* Period Pill Badge (Gold Accent on Dark) */}
                                        <div
                                            className={`self-start sm:self-auto shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border shadow-xs relative z-10 transition-all ${
                                                leader.isCurrent
                                                    ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold'
                                                    : 'bg-black/50 text-amber-300 border-amber-400/30 group-hover/card:border-amber-400/60'
                                            }`}
                                        >
                                            {leader.period}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
