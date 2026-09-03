import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatDateIndo } from '../../Utils/format';
import {
    KeyRound,
    User,
    Lock,
    Shield,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff,
    Save,
    Clock,
    Activity,
    ShieldAlert,
    Laptop,
} from 'lucide-react';

export default function Profile({ user = {}, activityLogs = [] }) {
    const { admin_path } = usePage().props;
    const adminPath = admin_path || 'portal-karangwungu';

    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    // Profile form
    const profileForm = useForm({
        name: user.name || '',
        username: user.username || '',
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.patch(`/${adminPath}/profile`, {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put(`/${adminPath}/profile/password`, {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    const getActionBadge = (action) => {
        switch (action) {
            case 'login_success':
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                        Login Berhasil
                    </span>
                );
            case 'login_failed_bad_credentials':
            case 'login_failed_invalid_pin':
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-400/10 text-red-400 border border-red-400/20">
                        Percobaan Gagal
                    </span>
                );
            case 'login_rate_limited':
            case 'session_hijack_blocked':
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        Diblokir Keamanan
                    </span>
                );
            case 'password_changed':
            case 'admin_password_reset':
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        Ganti Kata Sandi
                    </span>
                );
            case 'admin_created':
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-400/10 text-blue-400 border border-blue-400/20">
                        Tambah Admin
                    </span>
                );
            default:
                return (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-700/50 text-zinc-300 border border-zinc-600">
                        {action}
                    </span>
                );
        }
    };

    return (
        <AdminLayout title="Profil & Keamanan Akun">
            <div className="max-w-4xl space-y-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                        <KeyRound className="h-6 w-6 text-amber-500" />
                        <span>Pengaturan Akun & Keamanan Berlapis</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Kelola data profil, ganti kata sandi berkala, dan pantau log audit keamanan sesi Anda.
                    </p>
                </div>

                {/* Security Advisory Alert */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                            <ShieldAlert className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                                Portal Terproteksi dengan Jalur URL Rahasia & Anti Brute-Force
                            </h4>
                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5">
                                Akses panel dialihkan ke <code className="text-amber-700 dark:text-amber-400 font-mono font-bold">/{adminPath}</code> dan jalur standar <code className="text-zinc-500 font-mono">/admin</code> telah diblokir menjadi 404.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form 1: Data Profil */}
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-5 shadow-xs">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" />
                                <span>Informasi Akun</span>
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Identitas aparatur pengelola sistem
                            </p>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Username Login <span className="text-amber-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profileForm.data.username}
                                    onChange={(e) => profileForm.setData('username', e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
                                />
                                {profileForm.errors.username && (
                                    <p className="text-[11px] text-red-500 mt-1">{profileForm.errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Nama Lengkap <span className="text-amber-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                {profileForm.errors.name && (
                                    <p className="text-[11px] text-red-500 mt-1">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                                    Hak Akses (Role)
                                </label>
                                <div className="px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                    <span className="capitalize">{user.role || 'Admin'}</span>
                                    <Shield className="h-3.5 w-3.5 text-amber-500" />
                                </div>
                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 block">
                                    Tingkat akses hanya dapat diubah oleh Superadmin.
                                </span>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="h-3.5 w-3.5" />
                                    <span>{profileForm.processing ? 'Menyimpan...' : 'Simpan Profil'}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Form 2: Ganti Password Mandiri */}
                    <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-5 shadow-xs">
                        <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                <Lock className="h-4 w-4 text-amber-500" />
                                <span>Ganti Kata Sandi</span>
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Disarankan mengganti kata sandi secara berkala
                            </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Kata Sandi Saat Ini <span className="text-amber-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        placeholder="Ketik kata sandi saat ini"
                                        className="w-full px-3 pr-9 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                                        className="absolute right-2.5 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                    >
                                        {showCurrentPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                                {passwordForm.errors.current_password && (
                                    <p className="text-[11px] text-red-500 mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Kata Sandi Baru <span className="text-amber-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        className="w-full px-3 pr-9 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPass(!showNewPass)}
                                        className="absolute right-2.5 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                    >
                                        {showNewPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="text-[11px] text-red-500 mt-1">{passwordForm.errors.password}</p>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <KeyRound className="h-3.5 w-3.5" />
                                    <span>{passwordForm.processing ? 'Menyimpan...' : 'Ganti Kata Sandi'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Audit Trail: Log Aktivitas Keamanan */}
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-emerald-500" />
                            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                                Catatan Audit Keamanan Sesi Terbaru
                            </h3>
                        </div>
                        <span className="text-[11px] text-zinc-500">10 Entri Terakhir</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                                <tr>
                                    <th className="py-2.5 px-3">Aktivitas</th>
                                    <th className="py-2.5 px-3">Alamat IP</th>
                                    <th className="py-2.5 px-3">Keterangan</th>
                                    <th className="py-2.5 px-3 text-right">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                                {activityLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-6 text-center text-zinc-400 dark:text-zinc-500">
                                            Belum ada catatan aktivitas keamanan.
                                        </td>
                                    </tr>
                                ) : (
                                    activityLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors">
                                            <td className="py-3 px-3">
                                                {getActionBadge(log.action)}
                                            </td>
                                            <td className="py-3 px-3 font-mono text-zinc-700 dark:text-zinc-300 text-[11px]">
                                                {log.ip_address}
                                            </td>
                                            <td className="py-3 px-3 text-zinc-500 dark:text-zinc-400 text-[11px]">
                                                {log.details || '-'}
                                            </td>
                                            <td className="py-3 px-3 text-right text-zinc-500 dark:text-zinc-400 text-[11px] whitespace-nowrap">
                                                {formatDateIndo(log.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
