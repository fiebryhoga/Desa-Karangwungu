import React, { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import SeoHead from '../Components/SEO/SeoHead';
import PageHeader from '../Components/UI/PageHeader';
import { formatDateIndo } from '../Utils/format';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageSquare,
    CheckCircle2,
    ExternalLink,
    ShieldCheck,
    MessageCircle,
    Building2,
    FileText,
    ArrowRight,
    Sparkles,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';

export default function Contact({ feedbacks = [] }) {
    const { props } = usePage();
    const general = props?.general_settings || {};
    const village = props?.village_info || {};
    const flash = props?.flash || {};

    const address = general.contact_address || village.address || 'Jl. Raya Karangwungu No. 01, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur 62254';
    const phone = general.contact_phone || village.phone || '(0812) 3456-7890';
    const email = general.contact_email || village.email || 'pemdes@karangwungu-lamongan.desa.id';
    const workingHours = general.contact_working_hours || 'Senin – Jumat: 08.00 – 15.30 WIB';
    const mapsUrl = general.contact_maps_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.293417724128!2d112.355112!3d-7.039615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e778fc33246f48f%3A0xbca12a8421d00c3b!2sKarangwungu%2C%20Kec.%20Karang%20Geneng%2C%20Kabupaten%20Lamongan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid';

    // Format phone for direct WhatsApp link
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    const waNumber = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent('Halo Pemdes Karangwungu, saya ingin bertanya terkait pelayanan desa.')}` : null;

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        contact_info: '',
        category: 'Saran & Masukan Pembangunan',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmitted(true);
            },
        });
    };

    const CATEGORIES = [
        { id: 'Saran & Masukan Pembangunan', label: 'Saran & Pembangunan' },
        { id: 'Kritik & Pelayanan Administrasi', label: 'Pelayanan Publik' },
        { id: 'Infrastruktur & Fasilitas Umum', label: 'Infrastruktur' },
        { id: 'Kebersihan & Lingkungan Hidup', label: 'Lingkungan' },
        { id: 'Ketertiban & Keamanan Warga', label: 'Ketertiban & Keamanan' },
    ];

    return (
        <AppLayout>
            <SeoHead
                title="Kontak & Layanan Pengaduan Warga Desa Karangwungu"
                description="Hubungi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Alamat Balai Desa, nomor telepon layanan, serta kanal pengaduan & aspirasi masyarakat."
                keywords="Kontak Balai Desa Karangwungu, Alamat Desa Karangwungu Karanggeneng, Pengaduan Warga Karangwungu Lamongan, Lapor Desa Karangwungu"
                breadcrumbs={[{ label: 'Kontak & Pengaduan', url: '/kontak' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Kanal Komunikasi & Pengaduan"
                    title="Kontak & Layanan Aspirasi Warga"
                    subtitle="Pemerintah Desa Karangwungu siap melayani kebutuhan informasi warga serta mendengarkan aspirasi dan masukan konstruktif demi pembangunan desa yang lebih baik."
                />

                {/* 2. TOP QUICK ACTION PILLARS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Card 1: WhatsApp Pelayanan Cepat */}
                    <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    Respon Cepat
                                </span>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    WhatsApp Pelayanan
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Konsultasi dan konfirmasi persyaratan administrasi warga secara langsung.
                                </p>
                            </div>
                        </div>

                        {waUrl ? (
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                            >
                                <span>Hubungi via WhatsApp</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        ) : (
                            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                {phone}
                            </span>
                        )}
                    </div>

                    {/* Card 2: Layanan Mandiri Online */}
                    <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-red-500/40 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-red-500/20">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                    Layanan Mandiri
                                </span>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    Permohonan Surat Online
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Ajukan SKU, Domisili, SKTM, atau pengantar nikah secara online dari rumah.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/layanan/ajukan"
                            className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                            <span>Buat Surat Online</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Card 3: Jam Layanan Kantor */}
                    <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                    Tatap Muka
                                </span>
                                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                    Jam Pelayanan Kantor
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    {workingHours}
                                </p>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Buka Setiap Hari Kerja</span>
                        </div>
                    </div>
                </div>

                {/* 3. MAIN SPLIT SECTION: CONTACT INFO & LAPOR DESA FORM */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Official Office Information & Map */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Office Details Card */}
                        <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xs space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="space-y-0.5">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                        Pemerintah Desa
                                    </span>
                                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                                        Kantor Balai Desa
                                    </h3>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                                    <Building2 className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-5 text-xs">
                                {/* Alamat */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                                        <MapPin className="w-4 h-4 text-red-600 dark:text-amber-400" />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                                            Alamat Resmi
                                        </span>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                {/* Telepon / WhatsApp */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                                        <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                                            Telepon & WhatsApp
                                        </span>
                                        <p className="text-zinc-800 dark:text-zinc-200 font-semibold">
                                            {phone}
                                        </p>
                                        {waUrl && (
                                            <a
                                                href={waUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-0.5"
                                            >
                                                <span>Kirim pesan WhatsApp</span>
                                                <ChevronRight className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                                            Email Resmi
                                        </span>
                                        <a
                                            href={`mailto:${email}`}
                                            className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 transition-colors break-all"
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                {/* Jam Kerja */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-700">
                                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div className="space-y-1 min-w-0">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                                            Jam Operasional
                                        </span>
                                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                                            {workingHours}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Maps Card */}
                        <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs overflow-hidden">
                            <div className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-600 dark:text-amber-400" />
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                                        Peta Lokasi Kantor Desa
                                    </h4>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Desa+Karangwungu+Karanggeneng+Lamongan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline cursor-pointer"
                                >
                                    <span>Buka di Maps</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            <div className="h-64 w-full bg-zinc-100 dark:bg-zinc-950 relative">
                                <iframe
                                    title="Peta Lokasi Desa Karangwungu Karanggeneng"
                                    src={mapsUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Citizen Feedback & Aspiration Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 shadow-xs space-y-6">
                            {/* Form Header */}
                            <div className="space-y-1.5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Kanal Lapor Desa</span>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    Form Aspirasi & Pengaduan Warga
                                </h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    Sampaikan aspirasi, saran pembangunan, laporan kerusakan fasilitas, atau kendala pelayanan desa. Laporan Anda akan ditinjau langsung oleh tim pengelola Pemdes Karangwungu.
                                </p>
                            </div>

                            {/* Success Notification */}
                            {(flash?.success || (submitted && recentlySuccessful)) && (
                                <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                                            Aspirasi Berhasil Dikirimkan!
                                        </h4>
                                        <p className="text-xs text-emerald-700 dark:text-emerald-300/90 leading-relaxed">
                                            {flash?.success || 'Terima kasih atas partisipasi dan kepedulian Anda. Aspirasi Anda telah dicatat oleh sistem Pemdes Karangwungu.'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name and Contact */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Ahmad Fauzi"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-500 shadow-2xs font-medium"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-[11px] text-red-500 font-semibold">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            No. HP / WhatsApp / Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: 081234567890"
                                            value={data.contact_info}
                                            onChange={(e) => setData('contact_info', e.target.value)}
                                            className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-500 shadow-2xs font-medium"
                                            required
                                        />
                                        {errors.contact_info && (
                                            <p className="text-[11px] text-red-500 font-semibold">{errors.contact_info}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                        Kategori Aspirasi / Laporan <span className="text-red-500">*</span>
                                    </label>

                                    {/* Category Select Dropdown */}
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-500 shadow-2xs font-medium cursor-pointer"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.id}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-[11px] text-red-500 font-semibold">{errors.category}</p>
                                    )}
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                            Uraian Aspirasi / Pengaduan <span className="text-red-500">*</span>
                                        </label>
                                        <span className="text-[11px] text-zinc-400">
                                            Maks. 1000 karakter
                                        </span>
                                    </div>
                                    <textarea
                                        rows={5}
                                        placeholder="Tuliskan uraian aspirasi, kritik membangun, lokasi spesifik, atau pengaduan Anda dengan jelas dan santun..."
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-red-500 dark:focus:ring-amber-500 shadow-2xs font-medium leading-relaxed"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="text-[11px] text-red-500 font-semibold">{errors.message}</p>
                                    )}
                                </div>

                                {/* Privacy Notice Box */}
                                <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        <strong className="text-zinc-800 dark:text-zinc-200">Kerahasiaan Terjamin:</strong> Identitas dan kontak Anda hanya digunakan oleh perangkat desa untuk verifikasi dan konfirmasi tindak lanjut laporan.
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-800 hover:to-amber-700 text-white text-xs font-bold transition-all shadow-md shadow-red-700/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>{processing ? 'Mengirimkan Aspirasi...' : 'Kirimkan Aspirasi Sekarang'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* 4. PUBLIC FEEDBACKS HIGHLIGHT (IF AVAILABLE) */}
                {Array.isArray(feedbacks) && feedbacks.length > 0 && (
                    <div className="space-y-5 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400">
                                Transparansi Pelayanan
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                Aspirasi & Masukan Warga Terkini
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Ringkasan aspirasi masyarakat yang telah diverifikasi dan masuk dalam kanal komunikasi publik desa.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {feedbacks.map((fb, idx) => (
                                <div
                                    key={fb.id || idx}
                                    className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs space-y-3 flex flex-col justify-between"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                                {fb.category || 'Aspirasi Warga'}
                                            </span>
                                            <span className="text-[10px] text-zinc-400">
                                                {formatDateIndo(fb.created_at)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic line-clamp-3">
                                            "{fb.message}"
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
                                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                            {fb.name ? `${fb.name.slice(0, 1)}***` : 'Warga Desa'}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Tercatat</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
