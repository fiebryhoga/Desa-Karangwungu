import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import SeoHead from '../Components/SEO/SeoHead';
import PageHeader from '../Components/UI/PageHeader';
import Button from '../Components/UI/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Components/UI/Card';
import { formatDateIndo } from '../Utils/format';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Contact({ feedbacks = [] }) {
    const { props } = usePage();
    const general = props?.general_settings || {};
    const village = props?.village_info || {};

    const address = general.contact_address || village.address || 'Jl. Raya Karangwungu No. 01, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur 62254';
    const phone = general.contact_phone || village.phone || '(0812) 3456-7890';
    const email = general.contact_email || village.email || 'pemdes@karangwungu-lamongan.desa.id';
    const workingHours = general.contact_working_hours || 'Senin – Jumat: 08.00 – 15.30 WIB';
    const mapsUrl = general.contact_maps_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.293417724128!2d112.355112!3d-7.039615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e778fc33246f48f%3A0xbca12a8421d00c3b!2sKarangwungu%2C%20Kec.%20Karang%20Geneng%2C%20Kabupaten%20Lamongan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        contact_info: '',
        category: 'Saran',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout>
            <SeoHead
                title="Kontak & Layanan Pengaduan Warga Desa Karangwungu"
                description="Hubungi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Alamat Balai Desa, nomor telepon layanan, serta kanal pengaduan & aspirasi masyarakat."
                keywords="Kontak Balai Desa Karangwungu, Alamat Desa Karangwungu Karanggeneng, Pengaduan Warga Karangwungu Lamongan"
                breadcrumbs={[{ label: 'Kontak & Pengaduan', url: '/kontak' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Kanal Komunikasi & Pengaduan"
                    title="Kontak & Layanan Aspirasi Warga"
                    subtitle="Kami siap melayani kebutuhan informasi dan mendengar masukan konstruktif dari seluruh masyarakat Desa Karangwungu."
                />

                {/* Grid: Information + Feedback Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
                    {/* Left Column: Contact Cards */}
                    <div className="lg:col-span-5 space-y-5">
                        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md p-5 sm:p-6 space-y-5">
                            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">Kantor Balai Desa</h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Alamat Resmi:</span>
                                        <p className="text-red-100/80 mt-0.5 leading-relaxed">
                                            {address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Telepon / WhatsApp:</span>
                                        <p className="text-red-100/80 mt-0.5 font-bold">
                                            {phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Email Resmi:</span>
                                        <p className="text-red-100/80 mt-0.5">
                                            {email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Jam Operasional Pelayanan:</span>
                                        <p className="text-red-100/80 mt-0.5 whitespace-pre-line">
                                            {workingHours}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Maps Iframe */}
                        <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-red-700 via-red-800 to-red-950 dark:from-red-900/90 dark:via-red-950 dark:to-[#1a0507] text-white shadow-md">
                            <div className="p-4 pb-2">
                                <h3 className="text-sm font-bold text-amber-300">Peta Lokasi Balai Desa</h3>
                            </div>
                            <div className="p-0 h-56 bg-zinc-950">
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

                    {/* Right Column: Citizen Feedback Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-zinc-900 dark:text-white">
                                    <MessageSquare className="h-5 w-5 text-red-600 dark:text-amber-400" />
                                    <span>Form Aspirasi & Pengaduan Warga (Lapor Desa)</span>
                                </CardTitle>
                                <CardDescription className="text-zinc-500 dark:text-zinc-400">
                                    Sampaikan aspirasi, kritik membangun, maupun laporan kondisi fasilitas umum secara langsung kepada Pemdes Karangwungu.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nama Anda"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                                                required
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                No. HP / WhatsApp / Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="08xxxxxxxxxx atau email"
                                                value={data.contact_info}
                                                onChange={(e) => setData('contact_info', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                                                required
                                            />
                                            {errors.contact_info && <p className="text-xs text-red-500 mt-1">{errors.contact_info}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Kategori Laporan / Masukan <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                                        >
                                            <option value="Saran">Saran & Masukan Pembangunan</option>
                                            <option value="Pelayanan">Kritik & Pelayanan Administrasi</option>
                                            <option value="Infrastruktur">Infrastruktur & Jalan Lingkungan</option>
                                            <option value="Kebersihan">Kebersihan & Lingkungan Hidup</option>
                                            <option value="Keamanan">Ketertiban & Keamanan Warga</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                            Isi Pesan Aspirasi / Pengaduan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tuliskan uraian aspirasi, lokasi spesifik, atau pengaduan Anda dengan jelas dan santun..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-400 focus:border-red-500 dark:focus:border-amber-500"
                                            required
                                        />
                                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="red"
                                        size="default"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        <span>{processing ? 'Mengirim...' : 'Kirimkan Aspirasi'}</span>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>


                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
