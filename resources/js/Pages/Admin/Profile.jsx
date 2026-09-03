import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatDateIndo } from '../../Utils/format';
import {
    User,
    KeyRound,
    Lock,
    Mail,
    Shield,
    CheckCircle2,
    Eye,
    EyeOff,
    Save,
} from 'lucide-react';

export default function Profile({ user = {} }) {
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
        profileForm.patch('/admin/profile', {
            preserveScroll: true,
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put('/admin/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AdminLayout title="Profil & Kata Sandi">
            <div className="max-w-4xl space-y-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                        <KeyRound className="h-6 w-6 text-amber-400" />
                        <span>Pengaturan Akun & Keamanan</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Perbarui informasi profil dan ganti kata sandi akun administrator Anda secara berkala.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form 1: Data Profil */}
                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
                        <div className="border-b border-zinc-800 pb-3">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-400" />
                                <span>Informasi Akun</span>
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Identitas aparatur pengelola sistem
                            </p>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Username Login <span className="text-amber-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profileForm.data.username}
                                    onChange={(e) => profileForm.setData('username', e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
                                />
                                {profileForm.errors.username && (
                                    <p className="text-[11px] text-red-400 mt-1">{profileForm.errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Nama Lengkap <span className="text-amber-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                />
                                {profileForm.errors.name && (
                                    <p className="text-[11px] text-red-400 mt-1">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                                    Hak Akses (Role)
                                </label>
                                <div className="px-3 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
                                    <span className="capitalize">{user.role || 'Admin'}</span>
                                    <Shield className="h-3.5 w-3.5 text-amber-400" />
                                </div>
                                <span className="text-[10px] text-zinc-500 mt-1 block">
                                    Tingkat akses hanya dapat diubah oleh Superadmin.
                                </span>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 mb-1">
                                    Terdaftar Pada
                                </label>
                                <div className="px-3 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400">
                                    {formatDateIndo(user.created_at)}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="h-3.5 w-3.5" />
                                    <span>{profileForm.processing ? 'Menyimpan...' : 'Perbarui Profil'}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Form 2: Ganti Password Pribadi */}
                    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-5">
                        <div className="border-b border-zinc-800 pb-3">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2">
                                <Lock className="h-4 w-4 text-amber-400" />
                                <span>Ganti Kata Sandi Pribadi</span>
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                Amankan akun Anda dengan kata sandi yang kuat
                            </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Kata Sandi Saat Ini
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-3 pr-9 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                                        className="absolute right-2.5 top-3 text-zinc-500 hover:text-zinc-300"
                                    >
                                        {showCurrentPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                                {passwordForm.errors.current_password && (
                                    <p className="text-[11px] text-red-400 mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Kata Sandi Baru
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPass ? 'text' : 'password'}
                                        required
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="Minimal 6 karakter"
                                        className="w-full px-3 pr-9 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPass(!showNewPass)}
                                        className="absolute right-2.5 top-3 text-zinc-500 hover:text-zinc-300"
                                    >
                                        {showNewPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="text-[11px] text-red-400 mt-1">{passwordForm.errors.password}</p>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <KeyRound className="h-3.5 w-3.5" />
                                    <span>{passwordForm.processing ? 'Menyimpan...' : 'Ganti Kata Sandi'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
