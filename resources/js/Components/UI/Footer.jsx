import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Shield,
    MapPin,
    Phone,
    Mail,
    Clock,
    ExternalLink,
    ChevronRight,
    Sparkles,
    MessageCircle,
} from 'lucide-react';
import {
    InstagramIcon,
    FacebookIcon,
    YoutubeIcon,
    TiktokIcon,
    TwitterIcon,
} from '@/Components/UI/SocialIcons';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { props } = usePage();
    const general = props?.general_settings || {};
    const village = props?.village_info || {};

    const address = general.contact_address || village.address || 'Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254';
    const phone = general.contact_phone || village.phone || '(0812) 3456-7890';
    const email = general.contact_email || village.email || 'pemdes@karangwungu-lamongan.desa.id';
    const workingHours = general.contact_working_hours || 'Senin – Jumat: 08.00 – 15.30 WIB';
    const tagline = general.site_tagline || village.tagline || 'Portal resmi informasi publik dan pelayanan administrasi daring Pemerintah Desa Karangwungu dalam mewujudkan tata kelola desa yang transparan, maju, agamis, dan melayani.';
    const rawWa = general.contact_whatsapp ? general.contact_whatsapp.replace(/[^0-9]/g, '') : '6281234567890';
    const waUrl = general.social_whatsapp_url || `https://wa.me/${rawWa}?text=Halo%20Admin%20Desa%20Karangwungu`;

    return (
        <footer className="relative bg-gradient-to-b from-red-700 via-red-800 to-red-900 dark:from-red-800 dark:via-red-850 dark:to-red-950 text-red-100 border-t border-red-500/50 shadow-2xl transition-colors overflow-hidden">
            {/* 1. Siluet Motif Batik Parang & Mega Mendung Tradisional Emas */}
            <div
                className="absolute inset-0 opacity-[0.10] pointer-events-none bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2.2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='2' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4.5' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4.5' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2.5' fill='%23fde047'/%3E%3C/svg%3E")`,
                    backgroundSize: '70px 70px',
                }}
            />

            {/* 2. TOP QUICK HELP STRIP */}
            <div className="relative z-10 border-b border-red-500/30 bg-black/25 backdrop-blur-md py-4 sm:py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 text-left w-full sm:w-auto">
                        <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/20 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                            <MessageCircle className="h-4.5 w-4.5" />
                        </div>
                        <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white">
                                Pusat Bantuan & Layanan Warga
                            </h4>
                            <p className="text-[11px] sm:text-xs text-red-200/90">
                                Konsultasi syarat surat dan informasi langsung dengan tim admin desa.
                            </p>
                        </div>
                    </div>

                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer shrink-0"
                    >
                        <MessageCircle className="h-4 w-4" />
                        <span>Hubungi WhatsApp Desa</span>
                    </a>
                </div>
            </div>

            {/* 3. MAIN NAVIGATION */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
                    {/* Col 1: Profil & Identitas Resmi (4 cols di desktop) */}
                    <div className="lg:col-span-4 space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/assets/images/logo.png"
                                alt="Logo Desa Karangwungu"
                                className="h-11 sm:h-14 lg:h-16 w-auto object-contain shrink-0 drop-shadow-md"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden h-10 w-10 items-center justify-center">
                                <Shield className="h-6 w-6 text-amber-300" />
                            </div>
                            <div>
                                <h3 className="text-sm sm:text-base lg:text-lg font-black text-white leading-tight">
                                    {general.site_name || 'Pemerintah Desa Karangwungu'}
                                </h3>
                                <p className="text-[11px] sm:text-xs text-amber-300 font-semibold mt-0.5">
                                    {general.site_subdistrict || 'Kec. Karanggeneng'}, {general.site_regency || 'Kab. Lamongan'}
                                </p>
                            </div>
                        </div>

                        <p className="hidden sm:block text-xs sm:text-sm text-red-100/90 leading-relaxed font-normal">
                            {tagline}
                        </p>

                        {/* Social Media Links Active List */}
                        <div className="flex items-center gap-2 pt-1 flex-wrap">
                            {general.social_whatsapp_active === '1' && (
                                <a
                                    href={general.social_whatsapp_url || waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp Desa"
                                    className="h-8 w-8 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-400/30 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                </a>
                            )}
                            {general.social_instagram_active === '1' && general.social_instagram_url && (
                                <a
                                    href={general.social_instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Instagram Desa"
                                    className="h-8 w-8 rounded-lg bg-pink-600/30 hover:bg-pink-600 border border-pink-400/30 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <InstagramIcon className="h-4 w-4" />
                                </a>
                            )}
                            {general.social_facebook_active === '1' && general.social_facebook_url && (
                                <a
                                    href={general.social_facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Facebook Desa"
                                    className="h-8 w-8 rounded-lg bg-blue-600/30 hover:bg-blue-600 border border-blue-400/30 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <FacebookIcon className="h-4 w-4" />
                                </a>
                            )}
                            {general.social_youtube_active === '1' && general.social_youtube_url && (
                                <a
                                    href={general.social_youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="YouTube Desa"
                                    className="h-8 w-8 rounded-lg bg-red-600/30 hover:bg-red-600 border border-red-400/30 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <YoutubeIcon className="h-4 w-4" />
                                </a>
                            )}
                            {general.social_tiktok_active === '1' && general.social_tiktok_url && (
                                <a
                                    href={general.social_tiktok_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="TikTok Desa"
                                    className="h-8 w-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <TiktokIcon className="h-4 w-4" />
                                </a>
                            )}
                            {general.social_twitter_active === '1' && general.social_twitter_url && (
                                <a
                                    href={general.social_twitter_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="X (Twitter) Desa"
                                    className="h-8 w-8 rounded-lg bg-sky-600/30 hover:bg-sky-600 border border-sky-400/30 text-white flex items-center justify-center transition-all hover:scale-105"
                                >
                                    <TwitterIcon className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Navigasi Links: 2 Kolom Berdampingan di Mobile (Jelajah Desa & Layanan Publik) */}
                    <div className="grid grid-cols-2 gap-4 lg:contents">
                        {/* Col 2: Jelajah Profil Desa (2 cols di desktop) */}
                        <div className="lg:col-span-2 space-y-2.5 sm:space-y-3.5">
                            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white border-b sm:border-0 border-red-500/30 pb-1 sm:pb-0">
                                Jelajah Desa
                            </h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li>
                                    <Link href="/profil" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Profil Desa</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/visi-misi" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Visi, Misi & Kepemimpinan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/perangkat-desa" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Perangkat Desa</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/lembaga" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Lembaga Desa</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/demografi" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Data Demografi</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profil/fasilitas" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Fasilitas Umum</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/potensi" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Potensi & UMKM</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/galeri" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Galeri Foto</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Layanan & Informasi (3 cols di desktop) */}
                        <div className="lg:col-span-3 space-y-2.5 sm:space-y-3.5">
                            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white border-b sm:border-0 border-red-500/30 pb-1 sm:pb-0">
                                Layanan Publik
                            </h4>
                            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                                <li>
                                    <Link href="/layanan" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Katalog Surat</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/layanan/ajukan" className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors">
                                        <Sparkles className="h-3 w-3 shrink-0 text-amber-300" />
                                        <span>Ajukan Surat</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/layanan/tracking" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Lacak Berkas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/berita" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>Warta Berita</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/transparansi" className="text-red-100 hover:text-amber-300 flex items-center gap-1 transition-colors">
                                        <ChevronRight className="h-3 w-3 text-amber-400 shrink-0" />
                                        <span>APBDes</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Col 4: Kontak & Jam Operasional (3 cols di desktop) */}
                    <div className="lg:col-span-3 space-y-3 sm:space-y-3.5 pt-2 sm:pt-0 border-t sm:border-0 border-red-500/30">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                            Kontak & Balai Desa
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm text-red-100">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-3.5 w-3.5 text-amber-300 shrink-0 mt-0.5" />
                                <span className="leading-tight text-[11px] sm:text-xs">
                                    {address}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                <span className="text-white font-bold text-xs">{phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                <span className="truncate text-xs text-red-200">{email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-red-200/90 pt-0.5">
                                <Clock className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                                <span>{workingHours}</span>
                            </div>
                        </div>

                        {/* External Portal Links */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] flex-wrap">
                            {general.related_link_1_active === '1' && general.related_link_1_url && (
                                <a
                                    href={general.related_link_1_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-md bg-black/30 hover:bg-black/50 text-amber-300 border border-white/15 inline-flex items-center gap-1 transition-colors shadow-xs"
                                >
                                    <span>{general.related_link_1_name || 'Pemkab Lamongan'}</span>
                                    <ExternalLink className="h-2.5 w-2.5 text-amber-400" />
                                </a>
                            )}
                            {general.related_link_2_active === '1' && general.related_link_2_url && (
                                <a
                                    href={general.related_link_2_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-md bg-black/30 hover:bg-black/50 text-amber-300 border border-white/15 inline-flex items-center gap-1 transition-colors shadow-xs"
                                >
                                    <span>{general.related_link_2_name || 'Kemendesa'}</span>
                                    <ExternalLink className="h-2.5 w-2.5 text-amber-400" />
                                </a>
                            )}
                            {general.related_link_3_active === '1' && general.related_link_3_url && (
                                <a
                                    href={general.related_link_3_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-md bg-black/30 hover:bg-black/50 text-amber-300 border border-white/15 inline-flex items-center gap-1 transition-colors shadow-xs"
                                >
                                    <span>{general.related_link_3_name || 'Kemendagri'}</span>
                                    <ExternalLink className="h-2.5 w-2.5 text-amber-400" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM BAR: COPYRIGHT */}
            <div className="relative z-10 border-t border-red-500/30 bg-black/35 py-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-red-200/90 text-center sm:text-left">
                    <p>
                        &copy; {currentYear} <strong className="text-white">{general.site_name || 'Pemerintah Desa Karangwungu'}</strong>, {general.site_subdistrict || 'Kec. Karanggeneng'}, {general.site_regency || 'Kab. Lamongan'}.
                    </p>
                    <p className="flex items-center justify-center gap-2.5">
                        <Link href="/kontak" className="hover:text-amber-300 text-red-200 transition-colors">
                            Bantuan
                        </Link>
                        <span>&bull;</span>
                        <Link href="/transparansi" className="hover:text-amber-300 text-red-200 transition-colors">
                            Transparansi
                        </Link>
                        <span>&bull;</span>
                        <a href="/sitemap.xml" target="_blank" className="hover:text-amber-300 text-red-200 transition-colors">
                            Sitemap
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
