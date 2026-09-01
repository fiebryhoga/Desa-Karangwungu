import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import SeoHead from '../Components/SEO/SeoHead';
import Breadcrumb from '../Components/UI/Breadcrumb';
import Button from '../Components/UI/Button';
import Badge from '../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Components/UI/Card';
import { formatDateIndo } from '../Utils/format';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Contact({ feedbacks = [] }) {
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
                title="Kontak & Layanan Pengaduan Warga"
                description="Hubungi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan. Alamat Balai Desa, nomor telepon layanan, serta kanal pengaduan & aspirasi masyarakat."
                keywords="Kontak Balai Desa Karangwungu, Alamat Desa Karangwungu Karanggeneng, Pengaduan Warga Karangwungu Lamongan"
                breadcrumbs={[{ label: 'Kontak & Pengaduan', url: '/kontak' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={[{ label: 'Kontak & Pengaduan', url: '/kontak' }]} />

                {/* Header Title */}
                <div className="my-6">
                    <Badge variant="gold">Hubungi Kami</Badge>
                    <h1 className="text-3xl font-extrabold text-white mt-2">
                        Kontak & Layanan Aspirasi Warga
                    </h1>
                    <p className="text-base text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                        Kami siap melayani kebutuhan informasi dan mendengar masukan konstruktif dari seluruh masyarakat Desa Karangwungu.
                    </p>
                </div>

                {/* Grid: Information + Feedback Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
                    {/* Left Column: Contact Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base text-amber-400">Kantor Balai Desa</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-red-950/80 text-red-400 border border-red-800/40 flex items-center justify-center shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Alamat Resmi:</span>
                                        <p className="text-zinc-400 mt-0.5 leading-relaxed">
                                            Jl. Raya Karangwungu No. 01, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur 62254
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/40 flex items-center justify-center shrink-0">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Telepon / WhatsApp:</span>
                                        <p className="text-zinc-400 mt-0.5">
                                            (0812) 3456-7890
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-red-950/80 text-red-400 border border-red-800/40 flex items-center justify-center shrink-0">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Email Resmi:</span>
                                        <p className="text-zinc-400 mt-0.5">
                                            pemdes@karangwungu-lamongan.desa.id
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-9 w-9 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800/40 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Jam Operasional Pelayanan:</span>
                                        <p className="text-zinc-400 mt-0.5">
                                            Senin - Kamis: 08.00 - 15.30 WIB<br />
                                            Jumat: 08.00 - 14.30 WIB
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interactive Maps Iframe */}
                        <Card className="overflow-hidden">
                            <CardHeader className="p-4 pb-2">
                                <CardTitle className="text-sm text-amber-400">Peta Lokasi Balai Desa</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 h-56 bg-zinc-950">
                                <iframe
                                    title="Peta Lokasi Desa Karangwungu Karanggeneng"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.293417724128!2d112.355112!3d-7.039615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e778fc33246f48f%3A0xbca12a8421d00c3b!2sKarangwungu%2C%20Kec.%20Karang%20Geneng%2C%20Kabupaten%20Lamongan%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Citizen Feedback Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2 text-white">
                                    <MessageSquare className="h-5 w-5 text-amber-400" />
                                    <span>Form Aspirasi & Pengaduan Warga (Lapor Desa)</span>
                                </CardTitle>
                                <CardDescription>
                                    Sampaikan aspirasi, kritik membangun, maupun laporan kondisi fasilitas umum secara langsung kepada Pemdes Karangwungu.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                                Nama Lengkap <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nama Anda"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                                required
                                            />
                                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                                No. HP / WhatsApp / Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="08xxxxxxxxxx atau email"
                                                value={data.contact_info}
                                                onChange={(e) => setData('contact_info', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                                required
                                            />
                                            {errors.contact_info && <p className="text-xs text-red-400 mt-1">{errors.contact_info}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                            Kategori Laporan / Masukan <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                        >
                                            <option value="Saran">Saran & Masukan Pembangunan</option>
                                            <option value="Pelayanan">Kritik & Pelayanan Administrasi</option>
                                            <option value="Infrastruktur">Infrastruktur & Jalan Lingkungan</option>
                                            <option value="Kebersihan">Kebersihan & Lingkungan Hidup</option>
                                            <option value="Keamanan">Ketertiban & Keamanan Warga</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-1">
                                            Isi Pesan Aspirasi / Pengaduan <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tuliskan uraian aspirasi, lokasi spesifik, atau pengaduan Anda dengan jelas dan santun..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                            required
                                        />
                                        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
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

                        {/* Recent Feedback Feed */}
                        {feedbacks.length > 0 && (
                            <div className="space-y-4 pt-4">
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                                    <span>Aspirasi & Respon Pemerintah Desa</span>
                                </h3>

                                <div className="space-y-3">
                                    {feedbacks.map((fb) => (
                                        <Card key={fb.id} className="border-zinc-800 bg-zinc-900/90">
                                            <CardContent className="p-4 space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-amber-400">{fb.name}</span>
                                                    <Badge variant="secondary" className="text-[10px] text-zinc-300 border-zinc-700">{fb.category}</Badge>
                                                </div>
                                                <p className="text-xs text-zinc-300 italic">
                                                    &ldquo;{fb.message}&rdquo;
                                                </p>
                                                {fb.response && (
                                                    <div className="pt-2 border-t border-zinc-800">
                                                        <span className="text-[11px] font-semibold text-amber-400 block mb-0.5">
                                                            Tanggapan Pemdes:
                                                        </span>
                                                        <p className="text-xs text-zinc-300">
                                                            {fb.response}
                                                        </p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
