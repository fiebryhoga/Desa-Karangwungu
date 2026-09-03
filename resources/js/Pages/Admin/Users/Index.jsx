import React, { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { formatDateIndo } from '../../../Utils/format';
import {
    Users,
    UserPlus,
    Search,
    KeyRound,
    Edit3,
    Trash2,
    Shield,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    X,
    Eye,
    EyeOff,
} from 'lucide-react';

export default function UsersIndex({ users = { data: [] }, filters = {} }) {
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;

    const [search, setSearch] = useState(filters.search || '');
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalUser, setEditModalUser] = useState(null);
    const [passwordModalUser, setPasswordModalUser] = useState(null);
    const [deleteModalUser, setDeleteModalUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form: Create Admin
    const createForm = useForm({
        name: '',
        username: '',
        password: '',
        role: 'admin',
        is_active: true,
    });

    // Form: Edit Admin
    const editForm = useForm({
        name: '',
        username: '',
        role: 'admin',
        is_active: true,
    });

    // Form: Reset Password Admin
    const passwordForm = useForm({
        password: '',
    });

    // Search filter
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search }, { preserveState: true });
    };

    // Open Edit Modal
    const openEditModal = (user) => {
        setEditModalUser(user);
        editForm.setData({
            name: user.name,
            username: user.username || '',
            role: user.role,
            is_active: Boolean(user.is_active),
        });
    };

    // Submit Create
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/users', {
            onSuccess: () => {
                setCreateModalOpen(false);
                createForm.reset();
            },
        });
    };

    // Submit Edit
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editModalUser) return;
        editForm.patch(`/admin/users/${editModalUser.id}`, {
            onSuccess: () => {
                setEditModalUser(null);
                editForm.reset();
            },
        });
    };

    // Submit Password Reset
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!passwordModalUser) return;
        passwordForm.put(`/admin/users/${passwordModalUser.id}/password`, {
            onSuccess: () => {
                setPasswordModalUser(null);
                passwordForm.reset();
            },
        });
    };

    // Submit Delete
    const handleDeleteSubmit = () => {
        if (!deleteModalUser) return;
        router.delete(`/admin/users/${deleteModalUser.id}`, {
            onSuccess: () => setDeleteModalUser(null),
        });
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'superadmin':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-400/10 text-amber-300 border border-amber-400/30">Superadmin</span>;
            case 'admin':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-400/10 text-blue-400 border border-blue-400/30">Admin Desa</span>;
            case 'operator':
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">Operator</span>;
            default:
                return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">{role}</span>;
        }
    };

    return (
        <AdminLayout title="Manajemen Administrator">
            <div className="space-y-6">
                {/* Header & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                            <Users className="h-6 w-6 text-amber-400" />
                            <span>Manajemen Administrator</span>
                        </h1>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Kelola akun, penugasan hak akses, dan penggantian kata sandi seluruh admin pengelola.
                        </p>
                    </div>

                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:from-red-600 hover:to-red-900 text-amber-300 text-xs font-bold border border-amber-400/40 shadow-md cursor-pointer transition-all shrink-0"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Tambah Admin Baru</span>
                    </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Cari nama atau username..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </form>
                    <span className="text-xs text-zinc-400">
                        Total: <strong className="text-white">{users.total || users.data?.length || 0}</strong> akun administrator
                    </span>
                </div>

                {/* Users Table */}
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-wider text-[10px] font-bold border-b border-zinc-800">
                                <tr>
                                    <th className="py-3.5 px-4 sm:px-6">Administrator</th>
                                    <th className="py-3.5 px-4">Hak Akses (Role)</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Terdaftar Sejak</th>
                                    <th className="py-3.5 px-4 sm:px-6 text-right">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/70">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-zinc-500">
                                            Tidak ada administrator yang cocok dengan pencarian.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => {
                                        const isSelf = user.id === currentUserId;
                                        return (
                                            <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                                                <td className="py-3.5 px-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-xl bg-red-950/90 border border-red-800 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-white flex items-center gap-1.5">
                                                                <span>{user.name}</span>
                                                                {isSelf && (
                                                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                                                                        Anda
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="font-mono text-amber-400 text-[11px] font-bold block mt-0.5">
                                                                @{user.username || 'admin'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    {getRoleBadge(user.role)}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    {user.is_active ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            <span>Aktif</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-400">
                                                            <XCircle className="h-3 w-3" />
                                                            <span>Nonaktif</span>
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-4 text-zinc-400 text-[11px]">
                                                    {formatDateIndo(user.created_at)}
                                                </td>
                                                <td className="py-3.5 px-4 sm:px-6 text-right">
                                                    <div className="inline-flex items-center gap-1">
                                                        {/* Reset Password */}
                                                        <button
                                                            onClick={() => setPasswordModalUser(user)}
                                                            title="Ganti Password"
                                                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 hover:text-amber-300 border border-zinc-700 cursor-pointer"
                                                        >
                                                            <KeyRound className="h-3.5 w-3.5" />
                                                        </button>

                                                        {/* Edit User */}
                                                        <button
                                                            onClick={() => openEditModal(user)}
                                                            title="Edit Data"
                                                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-blue-400 hover:text-blue-300 border border-zinc-700 cursor-pointer"
                                                        >
                                                            <Edit3 className="h-3.5 w-3.5" />
                                                        </button>

                                                        {/* Delete User */}
                                                        {!isSelf && (
                                                            <button
                                                                onClick={() => setDeleteModalUser(user)}
                                                                title="Hapus Akun"
                                                                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-950 text-red-400 hover:text-red-300 border border-red-900/60 cursor-pointer"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL 1: TAMBAH ADMIN BARU */}
                {createModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                        <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <UserPlus className="h-4 w-4 text-amber-400" />
                                    <span>Tambah Administrator Baru</span>
                                </h3>
                                <button
                                    onClick={() => setCreateModalOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Username Login <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.username}
                                        onChange={(e) => createForm.setData('username', e.target.value)}
                                        placeholder="Contoh: admin_desa (tanpa spasi)"
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
                                    />
                                    {createForm.errors.username && <p className="text-[11px] text-red-400 mt-0.5">{createForm.errors.username}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Nama Lengkap <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="Nama aparatur desa"
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    {createForm.errors.name && <p className="text-[11px] text-red-400 mt-0.5">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Kata Sandi Awal
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            placeholder="Minimal 6 karakter"
                                            className="w-full px-3 pr-9 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300"
                                        >
                                            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                    {createForm.errors.password && <p className="text-[11px] text-red-400 mt-0.5">{createForm.errors.password}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Peran / Hak Akses (Role)
                                    </label>
                                    <select
                                        value={createForm.data.role}
                                        onChange={(e) => createForm.setData('role', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                    >
                                        <option value="admin">Admin Desa (Standar)</option>
                                        <option value="superadmin">Superadmin (Akses Penuh)</option>
                                        <option value="operator">Operator (Layanan & Konten)</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="create_is_active"
                                        checked={createForm.data.is_active}
                                        onChange={(e) => createForm.setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-red-600"
                                    />
                                    <label htmlFor="create_is_active" className="text-xs text-zinc-300 cursor-pointer">
                                        Akun langsung aktif dan dapat digunakan login
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setCreateModalOpen(false)}
                                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {createForm.processing ? 'Menyimpan...' : 'Simpan Akun'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL 2: EDIT ADMIN */}
                {editModalUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                        <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Edit3 className="h-4 w-4 text-blue-400" />
                                    <span>Edit Administrator</span>
                                </h3>
                                <button
                                    onClick={() => setEditModalUser(null)}
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <form onSubmit={handleEditSubmit} className="space-y-3.5">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Username Login <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.username}
                                        onChange={(e) => editForm.setData('username', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600 font-mono"
                                    />
                                    {editForm.errors.username && <p className="text-[11px] text-red-400 mt-0.5">{editForm.errors.username}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Nama Lengkap <span className="text-amber-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                    />
                                    {editForm.errors.name && <p className="text-[11px] text-red-400 mt-0.5">{editForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Peran / Hak Akses (Role)
                                    </label>
                                    <select
                                        value={editForm.data.role}
                                        onChange={(e) => editForm.setData('role', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                                    >
                                        <option value="admin">Admin Desa (Standar)</option>
                                        <option value="superadmin">Superadmin (Akses Penuh)</option>
                                        <option value="operator">Operator (Layanan & Konten)</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="checkbox"
                                        id="edit_is_active"
                                        checked={editForm.data.is_active}
                                        onChange={(e) => editForm.setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-red-600"
                                    />
                                    <label htmlFor="edit_is_active" className="text-xs text-zinc-300 cursor-pointer">
                                        Status Akun Aktif
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setEditModalUser(null)}
                                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL 3: GANTI KATA SANDI OLEH ADMIN */}
                {passwordModalUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                        <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <KeyRound className="h-4 w-4 text-amber-400" />
                                    <span>Ganti Kata Sandi</span>
                                </h3>
                                <button
                                    onClick={() => setPasswordModalUser(null)}
                                    className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <p className="text-xs text-zinc-400">
                                Tetapkan kata sandi baru untuk administrator <strong className="text-white">{passwordModalUser.name}</strong> (@{passwordModalUser.username || 'admin'}).
                            </p>

                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                        Kata Sandi Baru
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            placeholder="Minimal 6 karakter"
                                            className="w-full px-3 pr-9 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-2.5 text-zinc-500 hover:text-zinc-300"
                                        >
                                            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                    {passwordForm.errors.password && <p className="text-[11px] text-red-400 mt-0.5">{passwordForm.errors.password}</p>}
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setPasswordModalUser(null)}
                                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                                    >
                                        {passwordForm.processing ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL 4: KONFIRMASI HAPUS ADMIN */}
                {deleteModalUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                        <div className="relative w-full max-w-sm rounded-2xl bg-zinc-900 border border-red-900/60 p-6 shadow-2xl space-y-4 text-center">
                            <div className="h-12 w-12 rounded-full bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
                                <ShieldAlert className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-white">
                                    Hapus Akun Administrator?
                                </h3>
                                <p className="text-xs text-zinc-400">
                                    Apakah Anda yakin ingin menghapus akun <strong className="text-white">{deleteModalUser.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <button
                                    onClick={() => setDeleteModalUser(null)}
                                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleDeleteSubmit}
                                    className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
                                >
                                    Ya, Hapus Akun
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
