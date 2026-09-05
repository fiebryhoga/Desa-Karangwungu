import React, { useState, useRef, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import PageHeader from '../../Components/UI/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../Components/UI/Card';
import Button from '../../Components/UI/Button';
import {
    Send,
    Search,
    Check,
    CheckCircle2,
    ArrowLeft,
    ExternalLink,
    FileCheck,
    FileText,
    Info,
    Sparkles,
    ChevronDown,
    User,
    ShieldCheck,
    Briefcase,
    Phone,
    Mail,
} from 'lucide-react';

const currentYear = new Date().getFullYear();
const yearsList = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => String(currentYear - i));

const monthsList = [
    { value: '01', label: 'Januari' },
    { value: '02', label: 'Februari' },
    { value: '03', label: 'Maret' },
    { value: '04', label: 'April' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' },
    { value: '08', label: 'Agustus' },
    { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

const commonOccupations = [
    'Belum / Tidak Bekerja',
    'Mengurus Rumah Tangga',
    'Pelajar / Mahasiswa',
    'Pensiunan',
    'Petani / Pekebun',
    'Peternak',
    'Nelayan / Perikanan',
    'Pedagang',
    'Wiraswasta',
    'Karyawan Swasta',
    'Karyawan BUMN / BUMD',
    'Pegawai Negeri Sipil (PNS)',
    'TNI / POLRI',
    'Buruh Harian Lepas',
    'Buruh Tani / Perkebunan',
    'Sopir / Pengemudi',
    'Tukang Kayu / Bangunan',
    'Guru / Dosen',
    'Tenaga Medis / Bidan / Perawat',
    'Perangkat Desa',
];

export default function Form({ service = {}, services = [] }) {
    const isSktm = service?.id === 'sktm' || service?.title?.includes('SKTM') || service?.title?.includes('Tidak Mampu');

    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [customOccupation, setCustomOccupation] = useState('');
    const [isOccupationOpen, setIsOccupationOpen] = useState(false);
    const [occupationSearch, setOccupationSearch] = useState('');
    const occupationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (occupationRef.current && !occupationRef.current.contains(event.target)) {
                setIsOccupationOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOccupationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleSelectJob = (job) => {
        setSelectedOccupation(job);
        setIsOccupationOpen(false);
        setOccupationSearch('');
        if (job === 'Lainnya') {
            setData('occupation', customOccupation);
        } else {
            setData('occupation', job);
        }
    };

    const handleCustomOccupationChange = (e) => {
        const val = e.target.value;
        setCustomOccupation(val);
        setData('occupation', val);
    };

    const filteredOccupations = commonOccupations.filter((job) =>
        job.toLowerCase().includes(occupationSearch.toLowerCase())
    );

    const [addressRt, setAddressRt] = useState('');
    const [addressRw, setAddressRw] = useState('');
    const [addressRest, setAddressRest] = useState('Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan');

    const syncAddress = (curRt, curRw, curRest) => {
        const rtTrim = (curRt !== undefined ? curRt : addressRt || '').trim();
        const rwTrim = (curRw !== undefined ? curRw : addressRw || '').trim();
        const restTrim = (curRest !== undefined ? curRest : addressRest || '').trim();

        const rtPad = rtTrim ? (/^\d+$/.test(rtTrim) ? rtTrim.padStart(3, '0') : rtTrim) : '';
        const rwPad = rwTrim ? (/^\d+$/.test(rwTrim) ? rwTrim.padStart(3, '0') : rwTrim) : '';

        if (rtPad && rwPad) {
            setData('citizen_address', `RT/RW: ${rtPad}/${rwPad} ${restTrim}`);
        } else if (rtPad || rwPad) {
            setData('citizen_address', `RT/RW: ${rtPad || '...'}/${rwPad || '...'} ${restTrim}`);
        } else {
            setData('citizen_address', restTrim);
        }
    };

    const handleRtChange = (val) => {
        const clean = val.replace(/[^0-9]/g, '');
        setAddressRt(clean);
        syncAddress(clean, undefined, undefined);
    };

    const handleRwChange = (val) => {
        const clean = val.replace(/[^0-9]/g, '');
        setAddressRw(clean);
        syncAddress(undefined, clean, undefined);
    };

    const handleAddressRestChange = (val) => {
        setAddressRest(val);
        syncAddress(undefined, undefined, val);
    };

    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');

    const maxDays = (birthYear && birthMonth)
        ? new Date(parseInt(birthYear, 10), parseInt(birthMonth, 10), 0).getDate()
        : 31;
    const daysList = Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0'));

    const handleBirthDateChange = (field, val) => {
        let y = field === 'year' ? val : birthYear;
        let m = field === 'month' ? val : birthMonth;
        let d = field === 'day' ? val : birthDay;

        if (field === 'year') setBirthYear(val);
        if (field === 'month') setBirthMonth(val);
        if (field === 'day') setBirthDay(val);

        if (y && m && d) {
            const maxD = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
            if (parseInt(d, 10) > maxD) {
                d = String(maxD).padStart(2, '0');
                setBirthDay(d);
            }
            setData('birth_date', `${y}-${m}-${d}`);
        } else {
            setData('birth_date', '');
        }
    };

    const formatPreviewBirthDate = () => {
        const monthNames = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        if (birthYear && birthMonth && birthDay) {
            return `${parseInt(birthDay, 10)} ${monthNames[parseInt(birthMonth, 10)]} ${birthYear}`;
        }
        if (birthYear && birthMonth) {
            return `${monthNames[parseInt(birthMonth, 10)]} ${birthYear}`;
        }
        if (birthYear) {
            return `Tahun ${birthYear}`;
        }
        if (data.birth_date) {
            return new Date(data.birth_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        }
        return null;
    };

    const { data, setData, post, processing, errors } = useForm({
        citizen_name: '',
        citizen_nik: '',
        birth_place: '',
        birth_date: '',
        gender: '',
        religion: 'Islam',
        occupation: '',
        citizen_phone: '',
        citizen_email: '',
        citizen_address: '',
        letter_type: service?.title || 'Surat Keterangan Tidak Mampu (SKTM)',
        purpose: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.occupation || !data.occupation.trim()) {
            setIsOccupationOpen(true);
            occupationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
        const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
        const restTrim = addressRest?.trim() || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
        
        if (rtPad && rwPad) {
            data.citizen_address = `RT/RW: ${rtPad}/${rwPad} ${restTrim}`;
        } else {
            data.citizen_address = restTrim;
        }

        post('/layanan/ajukan');
    };

    return (
        <AppLayout>
            <SeoHead
                title={`Formulir ${service?.title || 'Permohonan Surat'} - Pelayanan Mandiri`}
                description={`Ajukan ${service?.title || 'surat keterangan'} Pemerintah Desa Karangwungu secara online dengan data KTP & KK resmi.`}
                keywords={`Formulir ${service?.title}, Buat Surat Desa Karangwungu, Layanan Mandiri Karangwungu`}
                breadcrumbs={[
                    { label: 'Layanan Online', url: '/layanan' },
                    { label: 'Katalog Surat', url: '/layanan/ajukan' },
                    { label: service?.short_name || 'Formulir Surat', url: '#' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
                {/* 1. MASTER PAGE HEADER */}
                <PageHeader
                    badge="Formulir Pelayanan Mandiri Desa"
                    title={`Formulir ${service?.title || 'Permohonan Surat'}`}
                    contentClassName="max-w-5xl"
                    titleClassName="md:whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px]"
                    subtitle="Silakan lengkapi data pemohon di bawah ini dengan benar sesuai data KTP / Kartu Keluarga resmi Anda."
                />

                {/* Main Content Area: Back Navigation + Form Grid */}
                <div className="space-y-3">
                    {/* Back to Catalog Link */}
                    <div>
                        <Link
                            href="/layanan/ajukan"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-amber-400 transition-colors"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Kembali ke Daftar Pilihan Surat</span>
                        </Link>
                    </div>

                    {/* 2. TWO-COLUMN LAYOUT: FORM ON LEFT (8 cols), OFFICIAL A4 PREVIEW ON RIGHT (4 cols) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* LEFT COLUMN (8 cols): FORMULIR PENGAJUAN DATA PEMOHON */}
                    <div className="lg:col-span-8">
                        <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-xl">
                            <CardHeader className="p-6 pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-amber-400 border border-red-100 dark:border-red-900/40">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
                                            Formulir Pengajuan Surat
                                        </CardTitle>
                                        <CardDescription className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                                            Lengkapi data identitas pemohon dan keperluan pengajuan sesuai data e-KTP / KK warga Desa Karangwungu.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 pt-2 space-y-6">
                                <style>{`
                                    .dark input[type="date"]::-webkit-calendar-picker-indicator {
                                        filter: invert(1) brightness(1.25) !important;
                                        cursor: pointer;
                                        opacity: 0.95 !important;
                                        transform: scale(1.2);
                                    }
                                    .dark input[type="date"]::-webkit-calendar-picker-indicator:hover {
                                        filter: invert(1) brightness(1.5) drop-shadow(0 0 3px rgba(255, 255, 255, 0.6)) !important;
                                        opacity: 1 !important;
                                    }
                                    input[type="date"]::-webkit-calendar-picker-indicator {
                                        cursor: pointer;
                                        transform: scale(1.15);
                                    }
                                    input::placeholder, textarea::placeholder {
                                        opacity: 0.55 !important;
                                    }
                                    .dark input::placeholder, .dark textarea::placeholder {
                                        opacity: 0.4 !important;
                                    }
                                `}</style>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* IDENTITAS PEMOHON */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                Identitas Pemohon (Sesuai KTP / KK)
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Nama Lengkap */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Nama Lengkap <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Nur Azizah"
                                                    value={data.citizen_name}
                                                    onChange={(e) => setData('citizen_name', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                                {errors.citizen_name && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.citizen_name}</p>
                                                )}
                                            </div>

                                            {/* NIK */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    NIK (16 Digit Angka) <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    maxLength={16}
                                                    placeholder="3524xxxxxxxxxxxx"
                                                    value={data.citizen_nik}
                                                    onChange={(e) => setData('citizen_nik', e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono tracking-wider text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                                {errors.citizen_nik && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.citizen_nik}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Tempat & Tanggal Lahir */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Lamongan"
                                                    value={data.birth_place}
                                                    onChange={(e) => setData('birth_place', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Tanggal Lahir <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">(Tahun, Bulan, Tgl)</span>
                                                </label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {/* 1. Pilih Tahun Dulu */}
                                                    <div className="relative">
                                                        <select
                                                            value={birthYear}
                                                            onChange={(e) => handleBirthDateChange('year', e.target.value)}
                                                            className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                        >
                                                            <option value="" className="text-zinc-400 dark:text-zinc-500">Tahun</option>
                                                            {yearsList.map((y) => (
                                                                <option key={y} value={y} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                                                                    {y}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 text-zinc-400 dark:text-zinc-500">
                                                            <ChevronDown className="h-3.5 w-3.5" />
                                                        </div>
                                                    </div>

                                                    {/* 2. Pilih Bulan */}
                                                    <div className="relative">
                                                        <select
                                                            value={birthMonth}
                                                            onChange={(e) => handleBirthDateChange('month', e.target.value)}
                                                            className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                        >
                                                            <option value="" className="text-zinc-400 dark:text-zinc-500">Bulan</option>
                                                            {monthsList.map((m) => (
                                                                <option key={m.value} value={m.value} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                                                                    {m.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 text-zinc-400 dark:text-zinc-500">
                                                            <ChevronDown className="h-3.5 w-3.5" />
                                                        </div>
                                                    </div>

                                                    {/* 3. Baru Pilih Tanggal */}
                                                    <div className="relative">
                                                        <select
                                                            value={birthDay}
                                                            onChange={(e) => handleBirthDateChange('day', e.target.value)}
                                                            className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                        >
                                                            <option value="" className="text-zinc-400 dark:text-zinc-500">Tgl</option>
                                                            {daysList.map((d) => (
                                                                <option key={d} value={d} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                                                                    {d}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5 sm:pr-2 text-zinc-400 dark:text-zinc-500">
                                                            <ChevronDown className="h-3.5 w-3.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {errors.birth_date && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.birth_date}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Jenis Kelamin & Agama (Dengan Custom Chevron Down Arrow) */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Jenis Kelamin
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={data.gender}
                                                        onChange={(e) => setData('gender', e.target.value)}
                                                        className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 pr-10 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                        required
                                                    >
                                                        <option value="" className="text-zinc-400 dark:text-zinc-500">-- Pilih Jenis Kelamin --</option>
                                                        <option value="Laki-laki" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Laki-laki</option>
                                                        <option value="Perempuan" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Perempuan</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 dark:text-zinc-500">
                                                        <ChevronDown className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Agama
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={data.religion}
                                                        onChange={(e) => setData('religion', e.target.value)}
                                                        className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 pr-10 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                        required
                                                    >
                                                        <option value="" className="text-zinc-400 dark:text-zinc-500">-- Pilih Agama --</option>
                                                        <option value="Islam" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Islam</option>
                                                        <option value="Kristen" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Kristen</option>
                                                        <option value="Katolik" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Katolik</option>
                                                        <option value="Hindu" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Hindu</option>
                                                        <option value="Buddha" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Buddha</option>
                                                        <option value="Konghucu" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Konghucu</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 dark:text-zinc-500">
                                                        <ChevronDown className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pekerjaan */}
                                        <div ref={occupationRef} className="relative">
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Pekerjaan <span className="text-red-500">*</span>
                                            </label>
                                            
                                            {/* Custom Trigger Button */}
                                            <button
                                                type="button"
                                                onClick={() => setIsOccupationOpen((prev) => !prev)}
                                                className={`w-full flex items-center justify-between rounded-lg border bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-left transition focus:outline-none focus:ring-4 cursor-pointer ${
                                                    isOccupationOpen
                                                        ? 'border-red-500 ring-4 ring-red-500/10 dark:border-amber-400 dark:ring-amber-400/10 bg-white dark:bg-zinc-900'
                                                        : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600'
                                                }`}
                                            >
                                                <span className={data.occupation ? "text-zinc-900 dark:text-zinc-100 font-medium truncate" : "text-zinc-400 dark:text-zinc-500 truncate"}>
                                                    {selectedOccupation === 'Lainnya'
                                                        ? (customOccupation.trim() ? `${customOccupation} (Lainnya)` : 'Lainnya (Ketik Manual)')
                                                        : (selectedOccupation || '-- Pilih Pekerjaan Sesuai KTP --')}
                                                </span>
                                                <ChevronDown className={`h-4 w-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 shrink-0 ml-2 ${isOccupationOpen ? 'rotate-180 text-red-500 dark:text-amber-400' : ''}`} />
                                            </button>

                                            {/* Floating Custom Dropdown Popover */}
                                            {isOccupationOpen && (
                                                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                    {/* Quick Filter Search inside dropdown */}
                                                    <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/50">
                                                        <div className="relative">
                                                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                                                            <input
                                                                type="text"
                                                                placeholder="Ketik untuk mencari pekerjaan..."
                                                                value={occupationSearch}
                                                                onChange={(e) => setOccupationSearch(e.target.value)}
                                                                className="w-full rounded-md bg-white dark:bg-zinc-900 pl-8 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-red-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-red-500/10 dark:focus:ring-amber-400/10"
                                                                onClick={(e) => e.stopPropagation()}
                                                                autoFocus
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Scrollable list */}
                                                    <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 divide-y divide-transparent">
                                                        {filteredOccupations.map((job) => {
                                                            const isSelected = selectedOccupation === job;
                                                            return (
                                                                <button
                                                                    key={job}
                                                                    type="button"
                                                                    onClick={() => handleSelectJob(job)}
                                                                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition text-left cursor-pointer ${
                                                                        isSelected
                                                                            ? 'bg-red-50 text-red-700 font-semibold dark:bg-amber-400/15 dark:text-amber-300'
                                                                            : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
                                                                    }`}
                                                                >
                                                                    <span className="truncate">{job}</span>
                                                                    {isSelected && (
                                                                        <Check className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0 ml-2" />
                                                                    )}
                                                                </button>
                                                            );
                                                        })}

                                                        {filteredOccupations.length === 0 && (
                                                            <div className="px-3 py-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                                                                Tidak ditemukan "{occupationSearch}" di daftar e-KTP.
                                                            </div>
                                                        )}

                                                        {/* Option Lainnya (Ketik Manual) */}
                                                        <div className="pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSelectJob('Lainnya')}
                                                                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition text-left cursor-pointer font-medium ${
                                                                    selectedOccupation === 'Lainnya'
                                                                        ? 'bg-red-100/80 text-red-800 font-semibold dark:bg-amber-400/20 dark:text-amber-200'
                                                                        : 'text-red-600 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-amber-400/10'
                                                                }`}
                                                            >
                                                                <span className="flex items-center gap-1.5">
                                                                    <Sparkles className="h-3.5 w-3.5" />
                                                                    <span>Lainnya (Ketik Manual Sendiri)</span>
                                                                </span>
                                                                {selectedOccupation === 'Lainnya' && (
                                                                    <Check className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0 ml-2" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Input manual jika memilih Lainnya */}
                                            {selectedOccupation === 'Lainnya' && (
                                                <div className="animate-in fade-in slide-in-from-top-1 duration-200 mt-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Ketik pekerjaan sesuai yang tertera di KTP..."
                                                        value={customOccupation}
                                                        onChange={handleCustomOccupationChange}
                                                        className="w-full rounded-lg border border-red-300 dark:border-amber-500/50 bg-white dark:bg-zinc-950/80 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                        autoFocus
                                                    />
                                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                        Silakan tuliskan jenis pekerjaan Anda yang tertera di KTP.
                                                    </p>
                                                </div>
                                            )}

                                            {errors.occupation && (
                                                <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>
                                            )}
                                        </div>

                                        {/* Alamat Pemohon (RT & RW Terpisah, Tanpa Dusun, Sisa Alamat Bisa Diedit) */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                Alamat Tempat Tinggal <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-12 gap-3">
                                                {/* RT */}
                                                <div className="col-span-1 sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        RT <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={3}
                                                        placeholder="003"
                                                        value={addressRt}
                                                        onChange={(e) => handleRtChange(e.target.value)}
                                                        className="w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3 py-2.5 text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>

                                                {/* RW */}
                                                <div className="col-span-1 sm:col-span-2">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        RW <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={3}
                                                        placeholder="001"
                                                        value={addressRw}
                                                        onChange={(e) => handleRwChange(e.target.value)}
                                                        className="w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3 py-2.5 text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>

                                                {/* Desa / Kecamatan / Kabupaten */}
                                                <div className="col-span-2 sm:col-span-8">
                                                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                        Desa, Kecamatan & Kabupaten <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">(Bisa diedit jika perlu)</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan"
                                                        value={addressRest}
                                                        onChange={(e) => handleAddressRestChange(e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {errors.citizen_address && (
                                                <p className="text-xs text-red-500 mt-1">{errors.citizen_address}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* SECTION 2: TUJUAN & KEPERLUAN SURAT */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                Keperluan Pengajuan Surat
                                            </h3>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Tujuan / Alasan Pengajuan <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                placeholder={
                                                    isSktm
                                                        ? 'Contoh: Persyaratan Pengajuan Keringanan Biaya Pendidikan / Beasiswa Sekolah Putra/Putri.'
                                                        : 'Contoh: Untuk persyaratan pengajuan modal usaha KUR BRI Unit Karanggeneng.'
                                                }
                                                value={data.purpose}
                                                onChange={(e) => setData('purpose', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
                                            {errors.purpose && (
                                                <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
                                            )}
                                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5">
                                                Jelaskan secara ringkas dan jelas instansi tujuan atau keperluan pengajuan surat.
                                            </p>
                                        </div>
                                    </div>

                                    {/* SECTION 3: KONTAK YANG BISA DIHUBUNGI */}
                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                Kontak Yang Bisa Dihubungi
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Nomor WhatsApp (Wajib) */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    No. WhatsApp <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    maxLength={15}
                                                    placeholder="08xxxxxxxxxx"
                                                    value={data.citizen_phone}
                                                    onChange={(e) => setData('citizen_phone', e.target.value.replace(/[^0-9]/g, ''))}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                    Gunakan format 08... (tanpa tanda hubung - atau spasi).
                                                </p>
                                                {errors.citizen_phone && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.citizen_phone}</p>
                                                )}
                                            </div>

                                            {/* Alamat Email (Opsional) */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Alamat Email <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">(Opsional)</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="contoh@gmail.com (opsional)"
                                                    value={data.citizen_email}
                                                    onChange={(e) => setData('citizen_email', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                    Bisa dikosongkan jika tidak memiliki alamat email.
                                                </p>
                                                {errors.citizen_email && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.citizen_email}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Keamanan & Validasi Notice */}
                                    <div className="rounded-lg bg-zinc-50/70 dark:bg-zinc-950/40 p-3.5 flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                                        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-zinc-900 dark:text-zinc-200">
                                                Verifikasi Cepat & Resmi Kantor Desa
                                            </p>
                                            <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">
                                                Data diproses oleh petugas pelayanan. Setelah dikirim, Anda akan langsung memperoleh <strong>Kode Tracking</strong> untuk memantau status secara langsung.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Submit Button */}
                                    <div className="pt-1">
                                        <Button
                                            type="submit"
                                            variant="red"
                                            size="lg"
                                            disabled={processing}
                                            className="w-full shadow-md font-semibold text-base py-3"
                                        >
                                            <Send className="h-4 w-4 mr-2" />
                                            <span>
                                                {processing ? 'Sedang Mengirim Permohonan...' : 'Kirim Permohonan Surat Sekarang'}
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN (4 cols): Selected Letter Info, Official A4 Preview, and Help Box */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        {/* 1. Kartu Surat Terpilih */}
                        <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
                            <div>
                                <span className="text-[10px] font-black tracking-widest text-red-600 dark:text-amber-400 uppercase">
                                    Surat Terpilih
                                </span>
                                <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
                                    {service?.title}
                                </h2>
                                {service?.description && (
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                                        {service?.description}
                                    </p>
                                )}
                            </div>

                            {/* Persyaratan (Hanya jika ada) */}
                            {Array.isArray(service?.requirements) && service.requirements.length > 0 && (
                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
                                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                                        <FileCheck className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                        <span>Persyaratan:</span>
                                    </span>
                                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                                        {service.requirements.map((req, idx) => (
                                             <li key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                                <span className="leading-tight">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* 2. Pratinjau / Preview Surat Resmi (Format Dokumen A4 Resmi) */}
                        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Pratinjau Format Surat Resmi</span>
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-sans">
                                    Format A4
                                </span>
                            </div>

                            {/* Lembar Dokumen A4 Resmi (Proporsi Margin Otentik, Font Presisi & 3 Watermark Preview) */}
                            <div className="p-2 sm:p-3 rounded-xl bg-zinc-100/90 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 overflow-x-auto flex justify-center">
                                <div
                                    className="relative w-full bg-white text-black px-6 py-6 sm:px-8 sm:py-8 lg:px-6 lg:py-7 xl:px-7 xl:py-8 rounded-xs border border-zinc-300 shadow-xl select-none overflow-hidden"
                                    style={{ fontFamily: '"Times New Roman", Times, Georgia, serif' }}
                                >
                                    {/* WATERMARK LOGO DESA DI TENGAH */}
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden z-0">
                                        <img
                                            src="/assets/images/logo.png"
                                            alt="Logo Desa Karangwungu"
                                            className="w-36 sm:w-44 lg:w-40 xl:w-44 h-auto object-contain opacity-[0.12] select-none pointer-events-none"
                                            onError={(e) => {
                                                e.target.src = '/assets/images/logo_kop.png';
                                            }}
                                        />
                                    </div>

                                    {/* WATERMARK PREVIEW (SERAGAM & PRESISI) */}
                                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-12 sm:gap-16 select-none overflow-hidden z-10">
                                        <span className="text-red-600/[0.24] font-black text-3xl sm:text-4xl lg:text-3xl xl:text-4xl tracking-[0.2em] uppercase -rotate-25 select-none pointer-events-none">
                                            PREVIEW
                                        </span>
                                        <span className="text-red-600/[0.24] font-black text-3xl sm:text-4xl lg:text-3xl xl:text-4xl tracking-[0.2em] uppercase -rotate-25 select-none pointer-events-none">
                                            PREVIEW
                                        </span>
                                        <span className="text-red-600/[0.24] font-black text-3xl sm:text-4xl lg:text-3xl xl:text-4xl tracking-[0.2em] uppercase -rotate-25 select-none pointer-events-none">
                                            PREVIEW
                                        </span>
                                    </div>

                                    {/* KOP SURAT RESMI (STRUKTUR TABEL PRESISI SESUAI DOKUMEN RESMI) */}
                                    <table className="w-full border-collapse mb-1 relative z-0">
                                        <tbody>
                                            <tr>
                                                <td className="w-8 sm:w-10 text-center align-middle pr-1.5 sm:pr-2">
                                                    <img
                                                        src="/assets/images/logo_kop.png"
                                                        alt="Logo Kabupaten Lamongan"
                                                        className="w-7 sm:w-9 h-auto object-contain mx-auto"
                                                    />
                                                </td>
                                                <td className="text-center align-middle">
                                                    <div className="leading-tight">
                                                        <h4 className="font-bold text-[6.5px] sm:text-[7.5px] tracking-wider uppercase text-black">
                                                            PEMERINTAH KABUPATEN LAMONGAN
                                                        </h4>
                                                        <h4 className="font-bold text-[6px] sm:text-[7px] tracking-wider uppercase text-black mt-0.5">
                                                            KECAMATAN KARANGGENENG
                                                        </h4>
                                                        <h3 className="font-black text-[9px] sm:text-[10.5px] tracking-widest uppercase text-black mt-0.5">
                                                            DESA KARANGWUNGU
                                                        </h3>
                                                        <p className="text-[4.5px] sm:text-[5.2px] italic text-black mt-0.5 whitespace-nowrap">
                                                            Jl. Raya Sumberwudi-Maduran, Desa Karangwungu, Kec. Karanggeneng, Kode Pos 62254
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Garis Ganda Kop Surat Resmi */}
                                    <div className="border-t-[1.5px] border-black mt-1 mb-[1.5px] relative z-0" />
                                    <div className="border-t-[0.75px] border-black mb-2 relative z-0" />

                                    {/* JUDUL DAN NOMOR SURAT */}
                                    <div className="text-center mb-2 relative z-0">
                                        <h4 className="font-bold underline uppercase text-[8px] sm:text-[8.5px] tracking-wide text-black">
                                            SURAT KETERANGAN TIDAK MAMPU
                                        </h4>
                                        <p className="text-[6.5px] sm:text-[7px] text-black mt-0.5">
                                            Nomor : ... / ... / ... / {new Date().getFullYear()}
                                        </p>
                                    </div>

                                    {/* SEKSI 1: PEJABAT PENANDATANGAN */}
                                    <p className="text-[6.5px] sm:text-[7px] text-black mb-1 relative z-0">
                                        Yang bertanda tangan dibawah ini :
                                    </p>
                                    <div className="ml-2 sm:ml-2.5 mb-1.5 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8 font-bold">H. SUNARTO</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Jabatan</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">Kepala Desa Karangwungu</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Alamat</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">Desa Karangwungu, Kec. Karanggeneng, Kab. Lamongan</span>
                                        </div>
                                    </div>

                                    {/* SEKSI 2: DATA PEMOHON */}
                                    <p className="text-[6.5px] sm:text-[7px] text-black mb-1 relative z-0">
                                        Dengan ini menerangkan bahwa :
                                    </p>
                                    <div className="ml-2 sm:ml-2.5 mb-1.5 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8 font-bold uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{data.citizen_nik?.trim() || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Tempat Tgl Lahir</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">
                                                {(() => {
                                                    const bp = data.birth_place?.trim();
                                                    const formattedDate = formatPreviewBirthDate();
                                                    if (bp && formattedDate) return `${bp}, ${formattedDate}`;
                                                    if (bp) return `${bp}, ...`;
                                                    if (formattedDate) return `..., ${formattedDate}`;
                                                    return '...';
                                                })()}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Jenis Kelamin</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{data.gender || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Pekerjaan</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{data.occupation?.trim() || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                            <span className="col-span-1 text-center align-top">:</span>
                                            <span className="col-span-7 sm:col-span-8">
                                                {(() => {
                                                    const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
                                                    const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
                                                    const rest = addressRest?.trim() || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
                                                    if (rtPad && rwPad) {
                                                        return `RT/RW: ${rtPad}/${rwPad} ${rest}`;
                                                    }
                                                    if (rtPad || rwPad) {
                                                        return `RT/RW: ${rtPad || '...'}/${rwPad || '...'} ${rest}`;
                                                    }
                                                    if (data.citizen_address?.trim()) {
                                                        return data.citizen_address.trim();
                                                    }
                                                    return '...';
                                                })()}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{data.religion || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Kewarganegaraan</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">Indonesia</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal align-top">Keterangan</span>
                                            <span className="col-span-1 text-center align-top">:</span>
                                            <span className="col-span-7 sm:col-span-8 text-justify">
                                                Bahwa orang tersebut adalah benar-benar warga Desa Karangwungu yang tergolong keluarga <strong className="font-bold">Tidak Mampu</strong>, dan surat keterangan ini dibuat untuk keperluan <strong className="font-bold">{data.purpose?.trim() || '...'}</strong>.
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-4 my-1.5 leading-relaxed relative z-0">
                                        Demikian Surat Keterangan ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.
                                    </p>

                                    {/* TANDA TANGAN KADES */}
                                    <div className="flex items-end justify-end pt-1 gap-2 relative z-0">
                                        {/* Kanan: Tanda Tangan Kades */}
                                        <div className="text-center text-[6.5px] sm:text-[7px] text-black leading-snug min-w-[110px]">
                                            <p>Karangwungu, 05 September 2026</p>
                                            <p className="mt-0.5">Mengetahui,</p>
                                            <p className="font-semibold">Kepala Desa Karangwungu</p>
                                            <div className="h-14 sm:h-16 flex items-center justify-center">
                                                <span className="text-[5px] text-zinc-400 font-sans italic">
                                                    (Tanda Tangan & Stempel)
                                                </span>
                                            </div>
                                            <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">H. SUNARTO</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Info Bantuan Balai Desa */}
                        <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
                                <Info className="h-4 w-4 text-red-600 dark:text-amber-400 shrink-0" />
                                <span>Butuh Bantuan Pelayanan?</span>
                            </div>
                            <p className="text-[11px] leading-relaxed">
                                Pelayanan Balai Desa Karangwungu buka Senin - Jumat (08.00 - 15.00 WIB). Petugas kami siap membantu proses pengajuan berkas Anda.
                            </p>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-1 font-bold text-red-600 dark:text-amber-400 hover:underline pt-1 text-xs"
                            >
                                <span>Kontak Pelayanan Desa &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
);
}
