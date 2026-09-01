import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Button from '../../Components/UI/Button';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../Components/UI/Card';
import { Send, FileText, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export default function Request({ defaultType = 'sku' }) {
    const letterTypeMapping = {
        sku: 'Surat Keterangan Usaha (SKU)',
        domisili: 'Surat Keterangan Domisili',
        sktm: 'Surat Keterangan Tidak Mampu (SKTM)',
        kelahiran: 'Surat Keterangan Kelahiran',
        kematian: 'Surat Keterangan Kematian',
        'pengantar-nikah': 'Surat Pengantar Nikah (N1-N4)',
        kehilangan: 'Surat Pengantar Kehilangan',
    };

    const initialLetterType = letterTypeMapping[defaultType] || 'Surat Keterangan Usaha (SKU)';

    const { data, setData, post, processing, errors, reset } = useForm({
        citizen_name: '',
        citizen_nik: '',
        citizen_phone: '',
        citizen_address: '',
        letter_type: initialLetterType,
        purpose: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/layanan/ajukan');
    };

    return (
        <AppLayout>
            <SeoHead
                title="Formulir Pengajuan Surat Mandiri Online"
                description="Ajukan permohonan surat keterangan desa secara online. Mudah, cepat, dan transparan untuk seluruh masyarakat Desa Karangwungu, Lamongan."
                keywords="Pengajuan Surat Desa Online, Buat Surat Desa Karangwungu, Layanan Mandiri Karangwungu Lamongan"
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Ajukan Surat Online', url: '/layanan/ajukan' },
                ]}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        { label: 'Layanan Online', url: '/layanan' },
                        { label: 'Ajukan Surat Online', url: '/layanan/ajukan' },
                    ]}
                />

                <div className="my-6">
                    <Badge variant="red">Pelayanan Mandiri</Badge>
                    <h1 className="text-3xl font-extrabold text-white mt-2">
                        Formulir Permohonan Surat Online
                    </h1>
                    <p className="text-base text-zinc-300 mt-1 leading-relaxed">
                        Silakan lengkapi data pemohon di bawah ini dengan benar sesuai data KTP / KK Anda.
                    </p>
                </div>

                <div className="my-8">
                    <Card className="border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-lg text-amber-400">Data Pemohon & Keperluan</CardTitle>
                            <CardDescription>
                                Setelah form dikirimkan, Anda akan memperoleh <strong className="text-white">Kode Tracking</strong> untuk memantau proses verifikasi berkas oleh perangkat desa.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Jenis Surat */}
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                        Jenis Surat yang Diajukan <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={data.letter_type}
                                        onChange={(e) => setData('letter_type', e.target.value)}
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                        required
                                    >
                                        <option value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</option>
                                        <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                                        <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
                                        <option value="Surat Keterangan Kelahiran">Surat Keterangan Kelahiran</option>
                                        <option value="Surat Keterangan Kematian">Surat Keterangan Kematian</option>
                                        <option value="Surat Pengantar Nikah (N1-N4)">Surat Pengantar Nikah (N1-N4)</option>
                                        <option value="Surat Pengantar Kehilangan">Surat Pengantar Kehilangan</option>
                                    </select>
                                    {errors.letter_type && (
                                        <p className="text-xs text-red-400 mt-1">{errors.letter_type}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Nama Lengkap */}
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                            Nama Lengkap (Sesuai KTP) <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Budi Prasetyo"
                                            value={data.citizen_name}
                                            onChange={(e) => setData('citizen_name', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                            required
                                        />
                                        {errors.citizen_name && (
                                            <p className="text-xs text-red-400 mt-1">{errors.citizen_name}</p>
                                        )}
                                    </div>

                                    {/* NIK */}
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                            NIK (16 Digit Angka) <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            maxLength={16}
                                            placeholder="3524xxxxxxxxxxxx"
                                            value={data.citizen_nik}
                                            onChange={(e) => setData('citizen_nik', e.target.value.replace(/\D/g, ''))}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                            required
                                        />
                                        {errors.citizen_nik && (
                                            <p className="text-xs text-red-400 mt-1">{errors.citizen_nik}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* No Telepon / WhatsApp */}
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                            Nomor WhatsApp / HP Aktif <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="081234567890"
                                            value={data.citizen_phone}
                                            onChange={(e) => setData('citizen_phone', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                            required
                                        />
                                        {errors.citizen_phone && (
                                            <p className="text-xs text-red-400 mt-1">{errors.citizen_phone}</p>
                                        )}
                                    </div>

                                    {/* Alamat */}
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                            Alamat Lengkap (RT/RW / Dusun) <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="RT 02 RW 01 Dusun Krajan"
                                            value={data.citizen_address}
                                            onChange={(e) => setData('citizen_address', e.target.value)}
                                            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                            required
                                        />
                                        {errors.citizen_address && (
                                            <p className="text-xs text-red-400 mt-1">{errors.citizen_address}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Keperluan / Tujuan Surat */}
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-200 mb-1.5">
                                        Keperluan / Tujuan Pembuatan Surat <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Contoh: Untuk persyaratan pengajuan modal usaha KUR BRI Unit Karanggeneng."
                                        value={data.purpose}
                                        onChange={(e) => setData('purpose', e.target.value)}
                                        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                                        required
                                    />
                                    {errors.purpose && (
                                        <p className="text-xs text-red-400 mt-1">{errors.purpose}</p>
                                    )}
                                </div>

                                <div className="p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2.5">
                                    <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                    <span>
                                        Dengan menekan tombol Kirim Permohonan, Anda menyatakan bahwa data yang diisi adalah benar dan dapat dipertanggungjawabkan sesuai hukum yang berlaku.
                                    </span>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant="red"
                                        size="lg"
                                        disabled={processing}
                                        className="w-full shadow-lg"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        <span>{processing ? 'Sedang Mengirim Permohonan...' : 'Kirim Permohonan Surat'}</span>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
