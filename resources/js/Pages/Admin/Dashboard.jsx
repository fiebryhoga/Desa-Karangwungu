import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatDateIndo } from '../../Utils/format';
import {
    FileText,
    Newspaper,
    Sparkles,
    MessageSquare,
    Users,
    Clock,
    CheckCircle2,
    ArrowUpRight,
    TrendingUp,
    Shield,
    ExternalLink,
} from 'lucide-react';

export default function Dashboard({ stats = {}, recentLetters = [], recentPosts = [] }) {
    const { props } = usePage();
    const adminPath = props?.admin_path || 'portal-karangwungu';

    const statCards = [
        {
            title: 'Permohonan Surat',
            value: stats.total_letters || 0,
            badge: `${stats.pending_letters || 0} Perlu Verifikasi`,
            badgeColor: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
            icon: FileText,
            link: '/layanan/lacak',
        },
        {
            title: 'Berita & Pengumuman',
            value: stats.total_posts || 0,
            badge: 'Publikasi Aktif',
            badgeColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
            icon: Newspaper,
            link: '/berita',
        },
        {
            title: 'Potensi & UMKM',
            value: stats.total_potentials || 0,
            badge: 'Direktori Warga',
            badgeColor: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
            icon: Sparkles,
            link: '/potensi',
        },
        {
            title: 'Administrator Aktif',
            value: stats.total_admins || 0,
            badge: 'Pengelola Sistem',
            badgeColor: 'bg-red-400/10 text-red-400 border-red-400/30',
            icon: Users,
            link: `/${adminPath}/users`,
        },
    ];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">Menunggu</span>;
            case 'verified':
            case 'processing':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-400/10 text-blue-400 border border-blue-400/20">Diproses</span>;
            case 'completed':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Selesai</span>;
            case 'rejected':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-400/10 text-red-400 border border-red-400/20">Ditolak</span>;
            default:
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">{status}</span>;
        }
    };

    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-6 sm:space-y-8">
                {/* Welcome Banner */}
                <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-red-950 via-zinc-900 to-zinc-900 border border-red-800/40 relative overflow-hidden shadow-xl">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 max-w-2xl space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-900/60 border border-red-700/50 text-amber-300 text-[11px] font-bold">
                            <Shield className="h-3.5 w-3.5" />
                            <span>Pusat Kendali Administrasi Digital</span>
                        </span>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            Selamat Datang di Portal Admin Desa Karangwungu
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            Kelola data administrasi desa, verifikasi permohonan surat warga, dan pantau publikasi informasi publik secara terpadu, aman, dan transparan.
                        </p>
                    </div>
                </div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={idx}
                                href={card.link}
                                className="group p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-400">
                                        {card.title}
                                    </span>
                                    <div className="p-2 rounded-xl bg-zinc-800/80 text-amber-400 group-hover:text-amber-300 transition-colors">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-black text-white">
                                        {card.value}
                                    </div>
                                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-md text-[10px] font-bold border ${card.badgeColor}`}>
                                        {card.badge}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Two Column Section: Recent Letters & Recent News */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Letters */}
                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-amber-400" />
                                    <span>Permohonan Surat Terbaru</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Aspirasi surat mandiri yang diajukan warga
                                </p>
                            </div>
                            <a
                                href="/layanan/lacak"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                                <span>Lacak</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        {recentLetters.length === 0 ? (
                            <div className="py-8 text-center text-xs text-zinc-500">
                                Belum ada permohonan surat masuk.
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800/80">
                                {recentLetters.map((letter) => (
                                    <div key={letter.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                                        <div className="min-w-0">
                                            <p className="font-bold text-white truncate">
                                                {letter.citizen_name}
                                            </p>
                                            <p className="text-zinc-400 text-[11px] truncate">
                                                {letter.letter_type} &bull; <span className="text-amber-400/90 font-mono">{letter.tracking_code}</span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 flex flex-col items-end gap-1">
                                            {getStatusBadge(letter.status)}
                                            <span className="text-[10px] text-zinc-500">
                                                {formatDateIndo(letter.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Posts */}
                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <div>
                                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-amber-400" />
                                    <span>Publikasi Berita Desa Terakhir</span>
                                </h2>
                                <p className="text-xs text-zinc-400 mt-0.5">
                                    Arsip publikasi artikel dan kegiatan
                                </p>
                            </div>
                            <a
                                href="/berita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                                <span>Lihat Semua</span>
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>

                        {recentPosts.length === 0 ? (
                            <div className="py-8 text-center text-xs text-zinc-500">
                                Belum ada publikasi berita.
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800/80">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                                        <div className="min-w-0">
                                            <p className="font-bold text-white truncate hover:text-amber-300 transition-colors">
                                                {post.title}
                                            </p>
                                            <p className="text-zinc-400 text-[11px]">
                                                Kategori: <span className="text-amber-400/80">{post.category}</span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <span className="text-[10px] text-zinc-500 block">
                                                {formatDateIndo(post.created_at)}
                                            </span>
                                            <span className="text-[10px] text-zinc-400">
                                                {post.views || 0} dibaca
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Shortcuts Bar */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-red-950 text-amber-400 border border-red-800/50">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xs sm:text-sm font-bold text-white">
                                Butuh menambahkan aparatur sebagai Admin?
                            </h3>
                            <p className="text-xs text-zinc-400">
                                Akses menu Manajemen Administrator untuk menambah, mengubah kata sandi, atau mengelola hak akses akun.
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/${adminPath}/users`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-amber-300 text-xs font-bold border border-amber-400/30 transition-all shadow-md cursor-pointer"
                    >
                        Kelola Administrator
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
