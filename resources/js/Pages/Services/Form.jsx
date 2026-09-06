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
    Calendar,
    Building2,
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

const KEHILANGAN_SUGGESTIONS = [
    { label: 'KTP Asli', text: 'KTP (KARTU TANDA PENDUDUK) asli' },
    { label: 'Buku Nikah', text: 'Buku Nikah' },
    { label: 'Kartu ATM Bank', text: 'Kartu ATM Bank ... a.n. ...' },
    { label: 'Buku Tabungan', text: 'Buku Tabungan Bank ... No. Rek: ... a.n. ...' },
    { label: 'STNK Motor/Mobil', text: 'STNK Sepeda Motor / Mobil No. Pol: ... a.n. ...' },
    { label: 'BPKB Kendaraan', text: 'BPKB Kendaraan Bermotor No. Pol: ... a.n. ...' },
    { label: 'Kartu Keluarga (KK)', text: 'Kartu Keluarga (KK)' },
    { label: 'SIM C / A', text: 'SIM (Surat Izin Mengemudi) Golongan ...' },
    { label: 'Ijazah Asli', text: 'Ijazah Asli Tingkat ... a.n. ...' },
    { label: 'Sertifikat Tanah', text: 'Sertifikat Tanah / Petok D No. ...' },
    { label: 'Dompet / Berkas', text: 'Dompet / Tas berisi dokumen kependudukan penting' },
];

const KUASA_SUGGESTIONS = [
    { label: 'Bantuan Baznas', text: 'pengambilan Bantuan Mustahik dari Baznas.' },
    { label: 'Bansos / PKH / BPNT', text: 'pengambilan Bantuan Sosial (PKH / BPNT / BLT) di kantor penyalur.' },
    { label: 'Buku Tabungan / ATM', text: 'pengurusan dan penarikan tabungan perbankan.' },
    { label: 'Administrasi KTP/KK', text: 'pengurusan dokumen administrasi kependudukan di kantor kecamatan / Disdukcapil.' },
    { label: 'Ijazah / Rapor', text: 'pengambilan berkas ijazah asli dan dokumen kelulusan sekolah.' },
];

export const WALI_HAKIM_REASONS = [
    { code: 'a', label: 'a. Wali Nasab tidak ada' },
    { code: 'b', label: 'b. Walinya adhol' },
    { code: 'c', label: 'c. Walinya tidak diketahui keberadaanya' },
    { code: 'd', label: 'd. Walinya tidak dapat dihadirkan /ditemui karena dipenjara' },
    { code: 'e', label: 'e. Wali nasab tidak ada yang beragama islam' },
    { code: 'f', label: 'f. Wali yang akan menikahkan menjadi pengantin itu sendiri' },
];

export default function Form({ service = {}, services = [] }) {
    const isWaliHakim = service?.id === 'wali-hakim' || (service?.title?.toLowerCase().includes('wali') && service?.title?.toLowerCase().includes('hakim'));
    const isDomisiliUsaha = !isWaliHakim && (service?.id === 'domisili-usaha' || service?.id === 'sku' || service?.title?.toLowerCase().includes('domisili usaha') || service?.title?.toLowerCase().includes('usaha'));
    const isKuasa = !isWaliHakim && !isDomisiliUsaha && (service?.id === 'kuasa' || service?.id === 'surat-kuasa' || service?.title?.toLowerCase().includes('kuasa'));
    const isKematian = !isWaliHakim && !isDomisiliUsaha && !isKuasa && (service?.id === 'kematian' || service?.title?.toLowerCase().includes('kematian'));
    const isWaliNikah = !isWaliHakim && !isDomisiliUsaha && !isKuasa && (service?.id === 'wali-nikah' || service?.title?.toLowerCase().includes('wali'));
    const isSktm = !isWaliHakim && !isDomisiliUsaha && !isKuasa && !isWaliNikah && !isKematian && (service?.id === 'sktm' || service?.title?.includes('SKTM') || service?.title?.includes('Tidak Mampu'));
    const isKehilangan = !isWaliHakim && !isDomisiliUsaha && !isKuasa && !isWaliNikah && !isKematian && (service?.id === 'kehilangan' || service?.title?.toLowerCase().includes('kehilangan'));

    const handleApplyKehilanganSuggestion = (itemText) => {
        const current = (data.purpose || '').trim();
        if (!current) {
            setData('purpose', itemText);
        } else if (current.toLowerCase().includes(itemText.toLowerCase())) {
            // Already present
        } else {
            setData('purpose', `${current}, ${itemText}`);
        }
    };

    const handleApplyKuasaSuggestion = (itemText) => {
        setData('purpose', itemText);
    };

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
        gender: isWaliHakim ? 'Perempuan' : (isWaliNikah ? 'Laki-laki' : (isKematian ? 'Perempuan' : (isDomisiliUsaha ? 'Perempuan' : ''))),
        religion: 'Islam',
        occupation: isWaliHakim ? 'Wiraswasta' : (isDomisiliUsaha ? 'Wiraswasta' : ''),
        citizen_phone: '',
        citizen_email: '',
        citizen_address: '',
        letter_type: service?.title || (isWaliHakim ? 'Surat Keterangan Wali Hakim' : (isDomisiliUsaha ? 'Surat Keterangan Domisili Usaha' : (isKuasa ? 'Surat Kuasa' : (isWaliNikah ? 'Surat Keterangan Wali Nikah' : (isKematian ? 'Surat Keterangan Kematian' : 'Surat Keterangan Tidak Mampu (SKTM)'))))),
        purpose: '',
        extra_data: {
            nationality: 'Indonesia',
            marital_status: 'Kawin',
            stay_status: 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan',
            business_name: '',
            business_status_desc: 'berpindah Tempat atau Kantor',
            business_address: 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan',
            description_text: '',
            catin_relation: 'Saudara Kandung',
            bride_name: '',
            bride_nik: '',
            bride_birth_place_date: '',
            bride_religion: 'Islam',
            bride_address: '',
            groom_name: '',
            groom_nik: '',
            groom_birth_place_date: '',
            groom_religion: 'Islam',
            groom_address: '',
            death_date: '',
            death_cause: 'Karena Sakit',
            death_place: 'Di rumah dan di semayamkan di Desa Karangwungu',
            grantee_name: '',
            grantee_nik: '',
            grantee_address: '',
            // Khusus Wali Hakim
            reason_code: 'a',
            bride_father_name: '',
            groom_father_name: '',
            groom_nationality: 'Indonesia',
            groom_occupation: 'Karyawan Swasta',
            kua_title: 'Kepala KUA Kecamatan Karanggeneng',
            kua_name: 'H.MOH KHOIRUL ANAM, M.Ag',
        },
    });

    const handleExtraDataChange = (field, val) => {
        setData('extra_data', {
            ...(data.extra_data || {}),
            [field]: val,
        });
    };

    const [granteeRt, setGranteeRt] = useState('');
    const [granteeRw, setGranteeRw] = useState('');
    const [granteeRest, setGranteeRest] = useState('Desa Karangwungu Kecamatan Karanggeneng, Kabupaten Lamongan');

    const syncGranteeAddress = (curRt, curRw, curRest) => {
        const rtTrim = (curRt !== undefined ? curRt : granteeRt || '').trim();
        const rwTrim = (curRw !== undefined ? curRw : granteeRw || '').trim();
        const restTrim = (curRest !== undefined ? curRest : granteeRest || '').trim();

        const rtPad = rtTrim ? (/^\d+$/.test(rtTrim) ? rtTrim.padStart(3, '0') : rtTrim) : '';
        const rwPad = rwTrim ? (/^\d+$/.test(rwTrim) ? rwTrim.padStart(3, '0') : rwTrim) : '';

        let addr = '';
        if (rtPad && rwPad) {
            addr = `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
        } else if (restTrim) {
            addr = restTrim;
        }
        handleExtraDataChange('grantee_address', addr);
    };

    const handleGranteeRtChange = (val) => {
        setGranteeRt(val);
        syncGranteeAddress(val, undefined, undefined);
    };

    const handleGranteeRwChange = (val) => {
        setGranteeRw(val);
        syncGranteeAddress(undefined, val, undefined);
    };

    const handleGranteeRestChange = (val) => {
        setGranteeRest(val);
        syncGranteeAddress(undefined, undefined, val);
    };

    const [deathYear, setDeathYear] = useState('');
    const [deathMonth, setDeathMonth] = useState('');
    const [deathDay, setDeathDay] = useState('');

    const deathMaxDays = (deathYear && deathMonth)
        ? new Date(parseInt(deathYear, 10), parseInt(deathMonth, 10), 0).getDate()
        : 31;
    const deathDaysList = Array.from({ length: deathMaxDays }, (_, i) => String(i + 1).padStart(2, '0'));

    const handleDeathDateChange = (dayVal, monthVal, yearVal) => {
        const d = (dayVal !== undefined ? dayVal : deathDay)?.trim();
        const m = (monthVal !== undefined ? monthVal : deathMonth)?.trim();
        const y = (yearVal !== undefined ? yearVal : deathYear)?.trim();

        if (d && m && y) {
            const numD = parseInt(d, 10);
            const numM = parseInt(m, 10);
            const numY = parseInt(y, 10);
            const daysInM = new Date(numY, numM, 0).getDate();
            if (numD > daysInM) {
                setDeathDay(String(daysInM).padStart(2, '0'));
                handleExtraDataChange('death_date', `${String(daysInM).padStart(2, '0')}/${m}/${y}`);
                return;
            }
            handleExtraDataChange('death_date', `${d}/${m}/${y}`);
        } else {
            handleExtraDataChange('death_date', '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isWaliNikah && !isKematian && !isKuasa && !isDomisiliUsaha && !isWaliHakim && (!data.occupation || !data.occupation.trim())) {
            setIsOccupationOpen(true);
            occupationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
        const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
        const restTrim = addressRest?.trim() || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
        
        if (rtPad && rwPad) {
            data.citizen_address = `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} ${restTrim.replace(/^(desa karangwungu|rt\s*\d+\s*rw\s*\d+)\s*/i, '')}`;
        } else {
            data.citizen_address = restTrim;
        }

        if (isWaliHakim) {
            if (!data.gender) data.gender = 'Perempuan';
            if (!data.occupation) data.occupation = 'Wiraswasta';
            if (!data.purpose || !data.purpose.trim()) {
                const bride = data.citizen_name || 'Calon Mempelai Wanita';
                const groom = data.extra_data?.groom_name || 'Calon Mempelai Pria';
                const rObj = WALI_HAKIM_REASONS.find(r => r.code === data.extra_data?.reason_code);
                const rText = rObj ? rObj.label : 'Wali Nasab tidak ada';
                data.purpose = `Permohonan Wali Hakim pernikahan ${bride} dengan ${groom} (${rText})`;
            }
        } else if (isDomisiliUsaha) {
            if (!data.gender) data.gender = 'Perempuan';
            if (!data.occupation) data.occupation = 'Wiraswasta';
            if (!data.purpose || !data.purpose.trim()) {
                data.purpose = 'persyaratan kelengkapan administrasi dan legalitas domisili usaha.';
            }
        } else if (isKuasa) {
            if (!data.gender) data.gender = 'Perempuan';
            if (!data.occupation) data.occupation = 'Wiraswasta / Pekerja';
            if (!data.purpose || !data.purpose.trim()) {
                data.purpose = 'pengambilan Bantuan Mustahik dari Baznas.';
            }
        } else if (isWaliNikah) {
            if (!data.gender) data.gender = 'Laki-laki';
            if (!data.occupation) data.occupation = 'Wiraswasta / Pekerja';
            if (!data.purpose || !data.purpose.trim()) {
                const bName = data.extra_data?.bride_name || 'Calon Mempelai Wanita';
                const gName = data.extra_data?.groom_name || 'Calon Mempelai Pria';
                const rel = data.extra_data?.catin_relation || 'Wali';
                data.purpose = `Wali Nikah (${rel}) bagi ${bName} yang akan menikah dengan ${gName}`;
            }
        } else if (isKematian) {
            if (!data.gender) data.gender = 'Perempuan';
            if (!data.occupation) data.occupation = 'Tidak Bekerja';
            if (!data.purpose || !data.purpose.trim()) {
                const dDate = data.extra_data?.death_date || '-';
                const dCause = data.extra_data?.death_cause || 'Karena Sakit';
                data.purpose = `Surat Keterangan Kematian atas nama ${data.citizen_name || 'Almarhum/Almarhumah'} yang meninggal pada tanggal ${dDate} disebabkan ${dCause}`;
            }
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
                                                {isWaliHakim
                                                    ? 'Identitas Calon Pengantin Wanita (Perempuan)'
                                                    : (isKuasa
                                                        ? 'Data Pihak Pertama (Pemberi Kuasa)'
                                                        : (isKematian
                                                            ? 'Identitas Almarhum / Almarhumah (Sesuai KTP / KK)'
                                                            : (isWaliNikah ? 'Identitas Wali Nikah (Sesuai KTP / KK)' : 'Identitas Pemohon (Sesuai KTP / KK)')))}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Nama Lengkap */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    {isWaliHakim ? 'Nama Calon Pengantin Wanita (Perempuan)' : (isKuasa ? 'Nama Lengkap Pemberi Kuasa' : (isKematian ? 'Nama Lengkap Almarhum / Almarhumah' : 'Nama Lengkap'))} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder={isWaliHakim ? 'Contoh: Susi Wantoro Sari' : (isKuasa ? 'Contoh: RAMITEN' : (isKematian ? 'Contoh: KAMINEM' : (isWaliNikah ? 'Contoh: ERIK SETIAWAN' : 'Contoh: Nur Azizah')))}
                                                    value={data.citizen_name}
                                                    onChange={(e) => setData('citizen_name', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-bold uppercase"
                                                    required
                                                />
                                                {errors.citizen_name && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.citizen_name}</p>
                                                )}
                                            </div>

                                            {/* NIK */}
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    {isWaliHakim ? 'NIK Calon Pengantin Wanita (16 Digit)' : (isKuasa ? 'NIK Pemberi Kuasa (16 Digit)' : (isKematian ? 'NIK Almarhum / Almarhumah (16 Digit)' : 'NIK (16 Digit Angka)'))} <span className="text-red-500">*</span>
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

                                        {/* Khusus Wali Hakim: Nama Ayah Calon Wanita (Binti) */}
                                        {isWaliHakim && (
                                            <div className="mt-3">
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Nama Ayah Kandung Calon Pengantin Wanita (Binti)
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Moch Tohir (atau biarkan kosong titik-titik jika tidak diketahui)"
                                                    value={data.extra_data?.bride_father_name || ''}
                                                    onChange={(e) => handleExtraDataChange('bride_father_name', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                            </div>
                                        )}

                                        {/* Tempat & Tanggal Lahir (Hanya jika bukan Surat Kuasa) */}
                                        {!isKuasa && (
                                            <>
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
                                        {!isKematian && (
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
                                        )}
                                    </>
                                )}

                                        {/* Alamat Pemohon (RT & RW Terpisah, Tanpa Dusun, Sisa Alamat Bisa Diedit) */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                {isKuasa ? 'Alamat Lengkap Pemberi Kuasa' : (isKematian ? 'Alamat Terakhir Almarhum / Almarhumah' : 'Alamat Tempat Tinggal')} <span className="text-red-500">*</span>
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

                                        {/* Khusus Surat Wali Nikah: Status Perkawinan & Hubungan dengan Catin */}
                                        {isWaliNikah && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Status Perkawinan Wali <span className="text-red-500">*</span>
                                                    </label>
                                                    <select
                                                        value={data.extra_data?.marital_status || 'Kawin'}
                                                        onChange={(e) => handleExtraDataChange('marital_status', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    >
                                                        <option value="Kawin">Kawin</option>
                                                        <option value="Belum Kawin">Belum Kawin</option>
                                                        <option value="Cerai Hidup">Cerai Hidup</option>
                                                        <option value="Cerai Mati">Cerai Mati</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Hubungan Dengan Calon Pengantin <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Saudara Kandung / Ayah Kandung / Paman"
                                                        value={data.extra_data?.catin_relation || ''}
                                                        onChange={(e) => handleExtraDataChange('catin_relation', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* KHUSUS SURAT KUASA: FORM DATA PIHAK KEDUA (PENERIMA KUASA) */}
                                    {isKuasa && (
                                        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                    Data Pihak Kedua (Penerima Kuasa)
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Nama Lengkap Penerima Kuasa <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: AINUN NAJIB"
                                                        value={data.extra_data?.grantee_name || ''}
                                                        onChange={(e) => handleExtraDataChange('grantee_name', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        NIK Penerima Kuasa (16 Digit) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        maxLength={16}
                                                        placeholder="Contoh: 6402132707970007"
                                                        value={data.extra_data?.grantee_nik || ''}
                                                        onChange={(e) => handleExtraDataChange('grantee_nik', e.target.value.replace(/[^0-9]/g, ''))}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Alamat Penerima Kuasa */}
                                            <div className="space-y-2">
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                    Alamat Lengkap Penerima Kuasa <span className="text-red-500">*</span>
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
                                                            placeholder="007"
                                                            value={granteeRt}
                                                            onChange={(e) => handleGranteeRtChange(e.target.value)}
                                                            className="w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3 py-2.5 text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
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
                                                            value={granteeRw}
                                                            onChange={(e) => handleGranteeRwChange(e.target.value)}
                                                            className="w-full text-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3 py-2.5 text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        />
                                                    </div>

                                                    {/* Desa / Kecamatan / Kabupaten */}
                                                    <div className="col-span-2 sm:col-span-8">
                                                        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                                                            Desa, Kecamatan & Kabupaten <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-normal">(Bisa diedit jika di luar Karangwungu)</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Desa Karangwungu Kecamatan Karanggeneng, Kabupaten Lamongan"
                                                            value={granteeRest}
                                                            onChange={(e) => handleGranteeRestChange(e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* KHUSUS WALI NIKAH: FORM DATA CALON PENGANTIN */}
                                    {isWaliNikah && (
                                        <>
                                            {/* SUBSECTION: DATA CALON PENGANTIN WANITA */}
                                            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                        Data Calon Pengantin Wanita (Yang Dinikahkan)
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Nama Lengkap Catin Wanita <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: DITA YULI WULANDARI"
                                                            value={data.extra_data?.bride_name || ''}
                                                            onChange={(e) => handleExtraDataChange('bride_name', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-bold uppercase"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            NIK Catin Wanita <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={16}
                                                            placeholder="3504145507990002"
                                                            value={data.extra_data?.bride_nik || ''}
                                                            onChange={(e) => handleExtraDataChange('bride_nik', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-mono"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Tempat & Tanggal Lahir Catin Wanita <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: Lamongan, 15-07-1999"
                                                            value={data.extra_data?.bride_birth_place_date || ''}
                                                            onChange={(e) => handleExtraDataChange('bride_birth_place_date', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Agama Catin Wanita
                                                        </label>
                                                        <select
                                                            value={data.extra_data?.bride_religion || 'Islam'}
                                                            onChange={(e) => handleExtraDataChange('bride_religion', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        >
                                                            <option value="Islam">Islam</option>
                                                            <option value="Kristen">Kristen</option>
                                                            <option value="Katolik">Katolik</option>
                                                            <option value="Hindu">Hindu</option>
                                                            <option value="Buddha">Buddha</option>
                                                            <option value="Konghucu">Konghucu</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Alamat Lengkap Catin Wanita <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Dsn. Sumberjo RT 003 RW 002 Desa Sumberjo Kec. Sanankulon Kab. Blitar"
                                                        value={data.extra_data?.bride_address || ''}
                                                        onChange={(e) => handleExtraDataChange('bride_address', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* SUBSECTION: DATA CALON MEMPELAI PRIA */}
                                            <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                        Data Calon Mempelai Pria (Calon Suami)
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Nama Lengkap Catin Pria <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: FAUZI INDRA WIYANTO"
                                                            value={data.extra_data?.groom_name || ''}
                                                            onChange={(e) => handleExtraDataChange('groom_name', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-bold uppercase"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            NIK Catin Pria <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            maxLength={16}
                                                            placeholder="3505071402930003"
                                                            value={data.extra_data?.groom_nik || ''}
                                                            onChange={(e) => handleExtraDataChange('groom_nik', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-mono"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Tempat & Tanggal Lahir Catin Pria <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Contoh: Blitar, 14-02-1993"
                                                            value={data.extra_data?.groom_birth_place_date || ''}
                                                            onChange={(e) => handleExtraDataChange('groom_birth_place_date', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                            Agama Catin Pria
                                                        </label>
                                                        <select
                                                            value={data.extra_data?.groom_religion || 'Islam'}
                                                            onChange={(e) => handleExtraDataChange('groom_religion', e.target.value)}
                                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        >
                                                            <option value="Islam">Islam</option>
                                                            <option value="Kristen">Kristen</option>
                                                            <option value="Katolik">Katolik</option>
                                                            <option value="Hindu">Hindu</option>
                                                            <option value="Buddha">Buddha</option>
                                                            <option value="Konghucu">Konghucu</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Alamat Lengkap Catin Pria <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Dsn. Sumberjo RT 003 RW 002 Desa Sumberjo Kec. Sanankulon Kab. Blitar"
                                                        value={data.extra_data?.groom_address || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_address', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* KHUSUS SURAT KETERANGAN KEMATIAN: RINCIAN KEMATIAN */}
                                    {isKematian && (
                                        <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                    Rincian Waktu & Tempat Meninggal Dunia
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Tanggal Meninggal Dunia <span className="text-red-500">*</span> <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">(Tahun, Bulan, Tgl)</span>
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {/* 1. Pilih Tahun Dulu */}
                                                        <div className="relative">
                                                            <select
                                                                value={deathYear}
                                                                onChange={(e) => handleDeathDateChange('year', e.target.value)}
                                                                className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                                required
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
                                                                value={deathMonth}
                                                                onChange={(e) => handleDeathDateChange('month', e.target.value)}
                                                                className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                                required
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
                                                                value={deathDay}
                                                                onChange={(e) => handleDeathDateChange('day', e.target.value)}
                                                                className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-2 sm:px-2.5 py-2.5 pr-6 sm:pr-7 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
                                                                required
                                                            >
                                                                <option value="" className="text-zinc-400 dark:text-zinc-500">Tgl</option>
                                                                {deathDaysList.map((d) => (
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
                                                    {data.extra_data?.death_date && (
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                                            Terpilih: <strong className="text-zinc-800 dark:text-zinc-200">{data.extra_data.death_date}</strong>
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Sebab Kematian <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Karena Sakit / Usia Lanjut"
                                                        value={data.extra_data?.death_cause || 'Karena Sakit'}
                                                        onChange={(e) => handleExtraDataChange('death_cause', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {['Karena Sakit', 'Usia Lanjut', 'Sakit Menahun', 'Kecelakaan Lalu Lintas', 'Mendadak'].map((cause, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => handleExtraDataChange('death_cause', cause)}
                                                                className="text-[11px] py-0.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-red-50 hover:border-red-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition cursor-pointer font-medium"
                                                            >
                                                                + {cause}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Tempat Kematian & Pemakaman <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Di rumah dan di semayamkan di Desa Karangwungu"
                                                    value={data.extra_data?.death_place || 'Di rumah dan di semayamkan di Desa Karangwungu'}
                                                    onChange={(e) => handleExtraDataChange('death_place', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* KHUSUS SURAT KETERANGAN WALI HAKIM: FORM DATA CALON PRIA & PILIHAN ALASAN WALI HAKIM */}
                                    {isWaliHakim && (
                                        <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                    Data Calon Pengantin Pria (Laki-laki yang Akan Menikahi)
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Nama Calon Pengantin Pria <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Muchammad Dhaniel Ibrahim Al Thohiri"
                                                        value={data.extra_data?.groom_name || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_name', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-bold uppercase"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Nama Ayah Kandung Pria (Bin) <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Moch Tohir"
                                                        value={data.extra_data?.groom_father_name || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_father_name', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Tempat, Tanggal Lahir / Umur Calon Pria <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Gresik, 28 Maret 1998"
                                                        value={data.extra_data?.groom_birth_place_date || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_birth_place_date', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Pekerjaan Calon Pria <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Karyawan Swasta"
                                                        value={data.extra_data?.groom_occupation || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_occupation', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Warga Negara Calon Pria
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.extra_data?.groom_nationality || 'Indonesia'}
                                                        onChange={(e) => handleExtraDataChange('groom_nationality', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Agama Calon Pria
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.extra_data?.groom_religion || 'Islam'}
                                                        onChange={(e) => handleExtraDataChange('groom_religion', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Alamat / Tempat Tinggal Calon Pria <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: RT 005 RW 003 Indro Kebomas Gresik"
                                                    value={data.extra_data?.groom_address || ''}
                                                    onChange={(e) => handleExtraDataChange('groom_address', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                            </div>

                                            {/* ALASAN WALI HAKIM (A - F) */}
                                            <div className="pt-2">
                                                <label className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                                                    Pilih Alasan Menggunakan WALI HAKIM <span className="text-red-500">*</span>
                                                </label>
                                                <div className="space-y-2">
                                                    {WALI_HAKIM_REASONS.map((reason) => {
                                                        const isSelected = (data.extra_data?.reason_code || 'a') === reason.code;
                                                        return (
                                                            <div
                                                                key={reason.code}
                                                                onClick={() => handleExtraDataChange('reason_code', reason.code)}
                                                                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                                                    isSelected
                                                                        ? 'bg-red-50/80 dark:bg-red-950/40 border-red-400 dark:border-red-700 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                                                                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                                                                }`}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="reason_code"
                                                                    value={reason.code}
                                                                    checked={isSelected}
                                                                    onChange={() => handleExtraDataChange('reason_code', reason.code)}
                                                                    className="mt-0.5 h-4 w-4 text-red-600 focus:ring-red-500 dark:focus:ring-amber-400 border-zinc-300 dark:border-zinc-700"
                                                                />
                                                                <span className="text-xs sm:text-sm leading-relaxed">{reason.label}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2">
                                                    * Pilihan alasan yang Anda tentukan akan otomatis dilingkari (O) pada format blangko surat resmi KUA Karanggeneng & Kepala Desa.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* KHUSUS SURAT KETERANGAN DOMISILI USAHA: FORM DATA USAHA & DOMISILI */}
                                    {isDomisiliUsaha && (
                                        <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                    Data Usaha & Domisili di Desa Karangwungu
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Nama Usaha / Perusahaan / Badan Usaha <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: PT LIMAN JAYA GRESIK"
                                                        value={data.extra_data?.business_name || ''}
                                                        onChange={(e) => handleExtraDataChange('business_name', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-bold uppercase"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Status Keberadaan Tempat / Kantor Usaha
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: berpindah Tempat atau Kantor"
                                                        value={data.extra_data?.business_status_desc || 'berpindah Tempat atau Kantor'}
                                                        onChange={(e) => handleExtraDataChange('business_status_desc', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    />
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {['berpindah Tempat atau Kantor', 'berdomisili dan beroperasi', 'membuka cabang / unit usaha baru'].map((st, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => handleExtraDataChange('business_status_desc', st)}
                                                                className="text-[11px] py-0.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-red-50 hover:border-red-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition cursor-pointer font-medium"
                                                            >
                                                                + {st}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Alamat Tempat / Kantor Usaha di Desa Karangwungu <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan"
                                                    value={data.extra_data?.business_address || ''}
                                                    onChange={(e) => handleExtraDataChange('business_address', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Status Tempat Tinggal Pemohon
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan"
                                                        value={data.extra_data?.stay_status || 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan'}
                                                        onChange={(e) => handleExtraDataChange('stay_status', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Status Perkawinan Pemohon
                                                    </label>
                                                    <select
                                                        value={data.extra_data?.marital_status || 'Kawin'}
                                                        onChange={(e) => handleExtraDataChange('marital_status', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    >
                                                        <option value="Kawin">Kawin</option>
                                                        <option value="Belum Kawin">Belum Kawin</option>
                                                        <option value="Cerai Hidup">Cerai Hidup</option>
                                                        <option value="Cerai Mati">Cerai Mati</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Kustomisasi Paragraf Keterangan Domisili Usaha <span className="text-[11px] text-zinc-400 font-normal">(Opsional)</span>
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Kosongkan jika ingin memakai susunan narasi otomatis standar desa seperti di surat fisik"
                                                    value={data.extra_data?.description_text || ''}
                                                    onChange={(e) => handleExtraDataChange('description_text', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                                                    Jika dikosongkan, narasi di surat akan otomatis tercetak: &quot;Orang tersebut diatas benar-benar {data.extra_data?.stay_status || '...'}, dan Pada saat ini Usaha yang di milikinya atau di sebut {data.extra_data?.business_name || '...'} {data.extra_data?.business_status_desc || '...'} Di {data.extra_data?.business_address || '...'} .&quot;
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION: TUJUAN & KEPERLUAN SURAT (TIDAK ADA PADA SURAT KEMATIAN) */}
                                    {!isKematian && (
                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center gap-2">
                                                <FileCheck className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                    {isWaliHakim ? 'Keperluan / Keterangan Tambahan Wali Hakim' : (isDomisiliUsaha ? 'Tujuan / Keperluan Surat Domisili Usaha' : (isWaliNikah ? 'Catatan Perwalian Nikah' : (isKehilangan ? 'Rincian Barang / Dokumen Hilang' : (isKuasa ? 'Keperluan / Wewenang Surat Kuasa' : 'Keperluan Pengajuan Surat'))))}
                                                </h3>
                                            </div>

                                            {isKuasa && (
                                                <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/80 dark:border-zinc-800">
                                                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                                        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                        <span>Pilihan Cepat Keperluan Kuasa (Klik untuk memilih):</span>
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {KUASA_SUGGESTIONS.map((sug, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => handleApplyKuasaSuggestion(sug.text)}
                                                                className="text-xs py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white hover:bg-red-50 hover:border-red-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all flex items-center gap-1 cursor-pointer font-medium"
                                                            >
                                                                <span className="text-red-500 dark:text-amber-400 font-bold">+</span>
                                                                <span>{sug.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {isKehilangan && (
                                                <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/80 dark:border-zinc-800">
                                                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                                        <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                                                        <span>Pilihan Cepat Jenis Dokumen / Barang (Klik untuk menambahkan):</span>
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                                        {KEHILANGAN_SUGGESTIONS.map((sug, idx) => (
                                                            <button
                                                                key={idx}
                                                                type="button"
                                                                onClick={() => handleApplyKehilanganSuggestion(sug.text)}
                                                                className="text-xs py-1 px-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white hover:bg-red-50 hover:border-red-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all flex items-center gap-1 cursor-pointer font-medium"
                                                            >
                                                                <span className="text-red-500 dark:text-amber-400 font-bold">+</span>
                                                                <span>{sug.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    {isWaliHakim ? 'Keperluan / Keterangan Surat' : (isDomisiliUsaha ? 'Tujuan / Keperluan Surat Keterangan' : (isKuasa ? 'Surat Kuasa ini kami buat untuk ...' : (isWaliNikah ? 'Catatan Tambahan Pengajuan' : (isKehilangan ? 'Barang / Dokumen yang Hilang' : 'Tujuan / Alasan Pengajuan'))))} <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder={
                                                        isWaliHakim
                                                            ? 'Contoh: Permohonan pernikahan dengan Wali Hakim di KUA Kecamatan Karanggeneng.'
                                                            : (isDomisiliUsaha
                                                                ? 'Contoh: Persyaratan kelengkapan administrasi perbankan / pembukaan rekening kantor / legalitas perpajakan usaha.'
                                                                : (isKuasa
                                                                    ? 'Contoh: pengambilan Bantuan Mustahik dari Baznas.'
                                                                    : (isWaliNikah
                                                                        ? 'Contoh: Menjadi wali nikah calon pengantin wanita an. Dita Yuli Wulandari yang akan menikah dengan Fauzi Indra Wiyanto di KUA Sanankulon Blitar.'
                                                                        : (isKehilangan
                                                                            ? `Tuliskan rincian barang/dokumen yang hilang selengkap mungkin.\nContoh:\n- KTP (Kartu Tanda Penduduk) asli a.n. Dodi Setyo Purwanto\n- Buku Nikah No. 123/45/V/2018 a.n. Suami & Istri\n- Kartu ATM Bank BRI a.n. Dodi Setyo Purwanto (hilang di sekitar Pasar Karanggeneng)\n- STNK Sepeda Motor Honda Beat No. Pol: S 1234 ABC a.n. Dodi Setyo Purwanto\n- Buku Tabungan Bank Jatim No. Rekening: 0123456789 a.n. Dodi Setyo Purwanto`
                                                                            : (isSktm
                                                                                ? 'Contoh: Persyaratan Pengajuan Keringanan Biaya Pendidikan / Beasiswa Sekolah Putra/Putri.'
                                                                                : 'Contoh: Untuk persyaratan pengajuan modal usaha KUR BRI Unit Karanggeneng.')))))
                                                    }
                                                    value={data.purpose}
                                                    onChange={(e) => setData('purpose', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                                {errors.purpose && (
                                                    <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
                                                )}

                                                {isWaliHakim ? (
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                                                        Keterangan keperluan ini digunakan sebagai arsip kelengkapan data pelayanan surat KUA Karanggeneng.
                                                    </p>
                                                ) : isDomisiliUsaha ? (
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                                                        Keperluan ini digunakan sebagai arsip kelengkapan data pelayanan surat desa.
                                                    </p>
                                                ) : isKuasa ? (
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
                                                        Di surat akan tertulis: <em>&quot;Surat Kuasa ini kami buat untuk {data.purpose || '...'}&quot;</em>
                                                    </p>
                                                ) : isKehilangan ? (
                                                    <div className="mt-2.5 p-3 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-zinc-600 dark:text-zinc-300 space-y-1.5">
                                                        <div className="font-bold text-zinc-900 dark:text-amber-300 flex items-center gap-1.5">
                                                            <Info className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                                                            <span>Petunjuk Pengisian Rincian Barang / Dokumen Hilang:</span>
                                                        </div>
                                                        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                                                            <li><strong>Bisa Untuk Barang Apapun</strong>: KTP, Buku Nikah, Kartu ATM Bank, Buku Tabungan, STNK/BPKB, SIM, Ijazah, atau barang berharga lainnya.</li>
                                                            <li><strong>Cantumkan Atas Nama (a.n.)</strong>: Tuliskan nama pemilik sah yang tertera di barang atau dokumen yang hilang.</li>
                                                            <li><strong>Keterangan Tempat / Waktu (Bila Ada)</strong>: Anda juga bisa menambahkan lokasi kehilangan (misal: <em>hilang di sekitar Pasar Karanggeneng atau jalan raya</em>) dan nomor dokumen jika ingat.</li>
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5">
                                                        Jelaskan secara ringkas dan jelas instansi tujuan atau keperluan pengajuan surat.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION 3: KONTAK YANG BISA DIHUBUNGI */}
                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                                                {isKematian ? 'Kontak Pelapor / Ahli Waris (WhatsApp)' : 'Kontak Yang Bisa Dihubungi'}
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

                                    {isWaliHakim ? (
                                        <div className="relative z-0 text-black leading-relaxed">
                                            {/* JUDUL DAN NOMOR SURAT (PERSIS DOKUMEN FISIK ASLI) */}
                                            <div className="text-center mt-2 mb-2.5">
                                                <h4 className="font-bold underline uppercase text-[10px] sm:text-[11px] tracking-wide text-black mb-0.5">
                                                    SURAT KETERANGAN WALI HAKIM
                                                </h4>
                                                <div className="text-[7.5px] sm:text-[8.5px] text-black">
                                                    Nomor : 470/38/413.318.15/{currentYear}
                                                </div>
                                                <div className="border-t border-black mt-1.5 mb-2"></div>
                                            </div>

                                            {/* KALIMAT PEMBUKA */}
                                            <p className="text-[7px] sm:text-[7.8px] mb-2 text-black text-justify leading-normal">
                                                Yang bertanda tangan di bawah ini, Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa seorang Perempuan :
                                            </p>

                                            {/* TABEL DATA CALON PENGANTIN WANITA (PEREMPUAN) */}
                                            <div className="mb-2 text-[6.8px] sm:text-[7.5px] text-black space-y-0.5">
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">1.</span>
                                                    <span className="col-span-4 font-normal">N a m a</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6 font-bold uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : 'SUSI WANTORO SARI'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">2.</span>
                                                    <span className="col-span-4 font-normal">Binti</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.bride_father_name?.trim() || '................................................................'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">3.</span>
                                                    <span className="col-span-4 font-normal">Tempat/Tgl. Lahir/Umur</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">
                                                        {(() => {
                                                            const bPlace = data.birth_place?.trim() || 'Lamongan';
                                                            const bDateStr = formatPreviewBirthDate() || '24 Mei 1998';
                                                            return `${bPlace}, ${bDateStr}`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">4.</span>
                                                    <span className="col-span-4 font-normal">Warga Negara</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">5.</span>
                                                    <span className="col-span-4 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">6.</span>
                                                    <span className="col-span-4 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.occupation || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">7.</span>
                                                    <span className="col-span-4 font-normal align-top">Alamat/Tempat tinggal</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-6 text-justify">
                                                        {(() => {
                                                            const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
                                                            const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
                                                            const rest = addressRest?.trim() || 'Desa Karangwungu RT 002 RW 001 Kec Karanggeneng';
                                                            if (rtPad && rwPad) return `Desa Karangwungu RT ${rtPad} RW ${rwPad} Kec Karanggeneng`;
                                                            if (data.citizen_address?.trim()) return data.citizen_address.trim();
                                                            return rest;
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* KALIMAT PENGHUBUNG */}
                                            <p className="text-[7px] sm:text-[7.8px] my-1.5 text-black">
                                                Yang akan dinikah oleh seorang laki-laki bernama :
                                            </p>

                                            {/* TABEL DATA CALON PENGANTIN PRIA (LAKI-LAKI) */}
                                            <div className="mb-2 text-[6.8px] sm:text-[7.5px] text-black space-y-0.5">
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">1.</span>
                                                    <span className="col-span-4 font-normal">N a m a</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6 font-bold uppercase">{data.extra_data?.groom_name?.trim() ? data.extra_data.groom_name.toUpperCase() : 'MUCHAMMAD DHANIEL IBRAHIM AL THOHIRI'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">2.</span>
                                                    <span className="col-span-4 font-normal">Bin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.groom_father_name?.trim() || 'Moch Tohir'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">3.</span>
                                                    <span className="col-span-4 font-normal">Tempat/Tgl. Lahir/Umur</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.groom_birth_place_date?.trim() || 'Gresik, 28 Maret 1998'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">4.</span>
                                                    <span className="col-span-4 font-normal">Warga Negara</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.groom_nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">5.</span>
                                                    <span className="col-span-4 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.groom_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">6.</span>
                                                    <span className="col-span-4 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{data.extra_data?.groom_occupation || 'Karyawan Swasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">7.</span>
                                                    <span className="col-span-4 font-normal align-top">Alamat/Tempat tinggal</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-6 text-justify">{data.extra_data?.groom_address?.trim() || 'RT 005 RW 003 Indro Kebomas Gresik'}</span>
                                                </div>
                                            </div>

                                            {/* KLAUSUL ALASAN WALI HAKIM (A - F) */}
                                            <p className="text-[7px] sm:text-[7.8px] mt-2 mb-1 text-black">
                                                Adalah dengan <strong>WALI HAKIM</strong> karena :
                                            </p>

                                            <div className="ml-2 mb-2 space-y-0.5 text-[6.8px] sm:text-[7.5px] text-black">
                                                {WALI_HAKIM_REASONS.map((r) => {
                                                    const isSelected = (data.extra_data?.reason_code || 'a') === r.code;
                                                    return (
                                                        <div key={r.code} className={`flex items-start gap-1 leading-tight ${isSelected ? 'font-bold' : ''}`}>
                                                            <span className="w-5 shrink-0">
                                                                {isSelected ? (
                                                                    <span className="inline-block border border-black rounded-full px-0.5 leading-none font-bold">
                                                                        {r.code}.
                                                                    </span>
                                                                ) : (
                                                                    `${r.code}.`
                                                                )}
                                                            </span>
                                                            <span>{r.label.substring(3)}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* KALIMAT PENUTUP */}
                                            <p className="text-[7px] sm:text-[7.8px] my-2 text-black text-justify leading-normal">
                                                Demikian Surat Keterangan ini kami buat dengan sebenarnya dan dapat digunakan dimana perlu.
                                            </p>

                                            {/* TANDA TANGAN DUA PIHAK (KUA & KADES) */}
                                            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[6.8px] sm:text-[7.5px] text-black">
                                                <div>
                                                    <div>Mengetahui</div>
                                                    <div>Kepala KUA Kecamatan Karanggeneng</div>
                                                    <div className="h-9 sm:h-11"></div>
                                                    <div className="font-bold underline uppercase">H.MOH KHOIRUL ANAM, M.Ag</div>
                                                </div>
                                                <div>
                                                    <div>Lamongan. {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                                    <div>Kepala Desa /Lurah:</div>
                                                    <div className="h-9 sm:h-11"></div>
                                                    <div className="font-bold underline uppercase">SUNARTO</div>
                                                </div>
                                            </div>

                                            {/* KETERANGAN BAWAH */}
                                            <div className="mt-3 text-[6.5px] sm:text-[7px] text-black">
                                                <div className="font-bold underline">KETERANGAN :</div>
                                                <div>Yang dimaksud, harap dilingkari (O)\</div>
                                            </div>
                                        </div>
                                    ) : isDomisiliUsaha ? (
                                        <div className="relative z-0 text-black leading-relaxed">
                                            {/* JUDUL SURAT KETERANGAN DOMISILI USAHA & NOMOR (SESUAI DOKUMEN FISIK) */}
                                            <div className="text-center mt-2 mb-3">
                                                <h4 className="font-bold underline uppercase text-[10px] sm:text-[11px] tracking-wide text-black mb-0.5">
                                                    SURAT KETERANGAN DOMISILI USAHA
                                                </h4>
                                                <div className="text-[7.5px] sm:text-[8.5px] text-black">
                                                    NOMOR: 470 / 60 / 413.318.15 / {currentYear}
                                                </div>
                                                <div className="border-t border-black mt-1.5 mb-2.5"></div>
                                            </div>

                                            {/* KALIMAT PEMBUKA */}
                                            <p className="text-[7px] sm:text-[8px] mb-2.5 text-black text-justify leading-normal">
                                                Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa :
                                            </p>

                                            {/* TABEL BIODATA PEMOHON & KETERANGAN DOMISILI USAHA */}
                                            <div className="mb-3 text-[7px] sm:text-[8px] text-black space-y-1">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 font-bold uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : 'SITI MUSLIMAH'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 font-mono">{data.citizen_nik?.trim() || '3523176412860003'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{data.gender || 'Perempuan'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">T T L</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">
                                                        {(() => {
                                                            const bPlace = data.birth_place?.trim() || 'Tuban';
                                                            const bD = birthDay ? String(birthDay).padStart(2, '0') : '24';
                                                            const bM = birthMonth ? String(birthMonth).padStart(2, '0') : '10';
                                                            const bY = birthYear || '1987';
                                                            return `${bPlace}, ${bD}-${bM}-${bY}`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{data.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Kwarganegaraan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{data.extra_data?.nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Status</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{data.extra_data?.marital_status || 'Kawin'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{data.occupation || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 text-justify">
                                                        {(() => {
                                                            const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
                                                            const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
                                                            const rest = addressRest?.trim() || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
                                                            if (rtPad && rwPad) return `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} ${rest.replace(/^(desa karangwungu|rt\s*\d+\s*rw\s*\d+)\s*/i, '')}`;
                                                            if (data.citizen_address?.trim()) return data.citizen_address.trim();
                                                            return 'Dsn Sundulan RT/RW 002/004 Desa Sumberagung Kec Plumpang Kab Tuban.';
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1 pt-0.5">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal align-top">Keterangan</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 text-justify leading-relaxed">
                                                        {data.extra_data?.description_text?.trim() ? (
                                                            data.extra_data.description_text.trim()
                                                        ) : (
                                                            <>
                                                                Orang tersebut diatas benar-benar {data.extra_data?.stay_status || 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan'}, dan Pada saat ini Usaha yang di milikinya atau di sebut <strong className="font-bold uppercase">{data.extra_data?.business_name || 'PT LIMAN JAYA GRESIK'}</strong> {data.extra_data?.business_status_desc || 'berpindah Tempat atau Kantor'} Di {data.extra_data?.business_address || 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan'} .
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* KALIMAT PENUTUP */}
                                            <p className="text-[7px] sm:text-[8px] indent-6 sm:indent-8 my-3 text-black text-justify leading-normal">
                                                Demikian Surat Keterangan ini dibuat dengan sebenarnya .Sesuai dengan keadaan sekarang untuk dipergunakan sebagaimana mestinya.
                                            </p>

                                            {/* TANDA TANGAN KADES */}
                                            <div className="mt-4 flex justify-end">
                                                <div className="w-[125px] sm:w-[155px] text-center text-[7px] sm:text-[8px] text-black">
                                                    <div>Karangwungu, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                                    <div className="font-bold uppercase mt-0.5">KEPALA DESA KARANGWUNGU</div>
                                                    <div className="h-10 sm:h-12"></div>
                                                    <div className="font-bold underline uppercase">H. SUNARTO</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : isKuasa ? (
                                        <div className="relative z-0 text-black leading-relaxed">
                                            {/* JUDUL SURAT KUASA (SESUAI FOTO FISIK) */}
                                            <div className="text-center mt-3 mb-4">
                                                <h4 className="font-bold underline uppercase text-[9.5px] sm:text-[10.5px] tracking-wider text-black">
                                                    SURAT KUASA
                                                </h4>
                                            </div>

                                            {/* KALIMAT PEMBUKA */}
                                            <p className="text-[6.8px] sm:text-[7.8px] mb-2 text-black">
                                                Yang bertanda tangan di bawah ini :
                                            </p>

                                            {/* PIHAK PERTAMA */}
                                            <div className="text-[6.8px] sm:text-[7.8px] text-black mb-1 font-medium">
                                                Pihak Pertama
                                            </div>
                                            <div className="ml-0 mb-3 text-[6.8px] sm:text-[7.8px] text-black space-y-1">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-bold uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : 'RAMITEN'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-mono">{data.citizen_nik?.trim() || '3524184101780001'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-9">
                                                        {(() => {
                                                            const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
                                                            const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
                                                            const rest = addressRest?.trim() || 'Desa Karangwungu RT/RW: 003 /001 Kecamatan Karanggeneng, Kabupaten Lamongan.';
                                                            if (rtPad && rwPad) return `Desa Karangwungu RT/RW: ${rtPad} /${rwPad} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
                                                            if (data.citizen_address?.trim()) return data.citizen_address.trim();
                                                            return rest;
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* KALIMAT PEMBERIAN KUASA */}
                                            <p className="text-[6.8px] sm:text-[7.8px] indent-6 sm:indent-8 my-2.5 text-black">
                                                Dengan ini memberikan kuasa penuh kepada ,
                                            </p>

                                            {/* PIHAK KEDUA */}
                                            <div className="text-[6.8px] sm:text-[7.8px] text-black mb-1 font-medium">
                                                Pihak Kedua
                                            </div>
                                            <div className="ml-0 mb-3 text-[6.8px] sm:text-[7.8px] text-black space-y-1">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-bold uppercase">{data.extra_data?.grantee_name?.trim() ? data.extra_data.grantee_name.toUpperCase() : 'AINUN NAJIB'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-mono">{data.extra_data?.grantee_nik?.trim() || '6402132707970007'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-9">
                                                        {(() => {
                                                            const rtPad = granteeRt?.trim() ? (/^\d+$/.test(granteeRt.trim()) ? granteeRt.trim().padStart(3, '0') : granteeRt.trim()) : '';
                                                            const rwPad = granteeRw?.trim() ? (/^\d+$/.test(granteeRw.trim()) ? granteeRw.trim().padStart(3, '0') : granteeRw.trim()) : '';
                                                            if (rtPad && rwPad) return `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
                                                            if (data.extra_data?.grantee_address?.trim()) return data.extra_data.grantee_address.trim();
                                                            return 'Desa Karangwungu RT/RW: 007/001 Kecamatan Karanggeneng, Kabupaten Lamongan.';
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* KALIMAT TUJUAN KUASA */}
                                            <p className="text-[6.8px] sm:text-[7.8px] indent-6 sm:indent-8 my-3 text-black leading-relaxed">
                                                Surat Kuasa ini kami buat untuk {data.purpose?.trim() || 'pengambilan Bantuan Mustahik dari Baznas.'}
                                            </p>

                                            {/* KALIMAT PENUTUP */}
                                            <p className="text-[6.8px] sm:text-[7.8px] mb-6 text-black leading-relaxed">
                                                Demikian surat kuasa ini kami buat dengan sebenarnya ,untuk di pergunakan seperlunya.
                                            </p>

                                            {/* TANDA TANGAN PIHAK PERTAMA & KEDUA */}
                                            <div className="grid grid-cols-2 gap-4 text-center text-[6.8px] sm:text-[7.8px] text-black mb-5">
                                                <div>
                                                    <p>Penerima Kuasa</p>
                                                    <div className="h-10 sm:h-12 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">(Tanda Tangan)</span>
                                                    </div>
                                                    <p className="font-bold underline uppercase">{data.extra_data?.grantee_name?.trim() ? data.extra_data.grantee_name.toUpperCase() : 'AINUN NAJIB'}</p>
                                                </div>
                                                <div>
                                                    <p>Pemberi Kuasa</p>
                                                    <div className="h-10 sm:h-12 flex flex-col items-center justify-center">
                                                        <span className="text-[5px] px-1 py-0.5 border border-dashed border-zinc-400 text-zinc-500 rounded-xs font-sans">
                                                            Materai Rp 10.000
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : 'RAMITEN'}</p>
                                                </div>
                                            </div>

                                            {/* TANDA TANGAN MENGETAHUI KADES */}
                                            <div className="text-center text-[6.8px] sm:text-[7.8px] text-black pt-1">
                                                <p>Mengetahui</p>
                                                <p className="font-semibold">Kepala Desa Karangwungu</p>
                                                <div className="h-10 sm:h-12 flex items-center justify-center">
                                                    <span className="text-[5px] text-zinc-400 font-sans italic">(Tanda Tangan & Stempel)</span>
                                                </div>
                                                <p className="font-bold underline uppercase">SUNARTO</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
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
                                            {isWaliNikah
                                                ? 'SURAT KETERANGAN WALI NIKAH'
                                                : (isKehilangan
                                                    ? 'SURAT KETERANGAN KEHILANGAN'
                                                    : (isKematian
                                                        ? 'SURAT KETERANGAN KEMATIAN'
                                                        : 'SURAT KETERANGAN TIDAK MAMPU'))}
                                        </h4>
                                        <p className="text-[6.5px] sm:text-[7px] text-black mt-0.5">
                                            Nomor : {isKematian ? `141 / ... / 413.318.15 / ${new Date().getFullYear()}` : (isWaliNikah ? `470 / ... / 413.318.15 / ${new Date().getFullYear()}` : `... / ... / ... / ${new Date().getFullYear()}`)}
                                        </p>
                                    </div>

                                    {isWaliNikah ? (
                                        <>
                                            {/* PARAGRAF PEMBUKA SESUAI FORMAT FOTO FISIK DESA KARANGWUNGU */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black mb-1 relative z-0 leading-relaxed text-justify">
                                                Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan menerangkan bahwa :
                                            </p>

                                            {/* TABEL BIODATA WALI NIKAH */}
                                            <div className="ml-2 sm:ml-2.5 mb-1 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase underline">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{data.citizen_nik?.trim() || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = data.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatPreviewBirthDate();
                                                            if (formattedDate) return `${bp}, ${formattedDate}`;
                                                            return `${bp}, ...`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Jenis Kelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.gender || 'Laki-laki'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Status Perkawinan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.marital_status || 'Kawin'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const rtPad = addressRt?.trim() ? (/^\d+$/.test(addressRt.trim()) ? addressRt.trim().padStart(3, '0') : addressRt.trim()) : '';
                                                            const rwPad = addressRw?.trim() ? (/^\d+$/.test(addressRw.trim()) ? addressRw.trim().padStart(3, '0') : addressRw.trim()) : '';
                                                            const rest = addressRest?.trim() || 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
                                                            if (rtPad && rwPad) return `RT ${rtPad} RW ${rwPad} ${rest}`;
                                                            if (rtPad || rwPad) return `RT ${rtPad || '...'} RW ${rwPad || '...'} ${rest}`;
                                                            if (data.citizen_address?.trim()) return data.citizen_address.trim();
                                                            return '...';
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Hubungan Dengan Catin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.catin_relation || 'Saudara Kandung'}</span>
                                                </div>
                                            </div>

                                            {/* SUBJUDUL KETERANGAN */}
                                            <div className="text-center my-1 relative z-0">
                                                <span className="font-bold underline uppercase text-[7px] sm:text-[7.5px] tracking-wide text-black">
                                                    KETERANGAN
                                                </span>
                                            </div>

                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify mb-1 leading-relaxed relative z-0">
                                                Bahwa orang tersebut diatas benar-benar warga Desa Karangwungu {addressRt && addressRw ? `Rt. ${addressRt.padStart(3, '0')} Rw. ${addressRw.padStart(3, '0')}` : 'Rt. 001 Rw. 001'} Kec. Karanggeneng Kab. Lamongan dan akan menjadi Wali Nikah seorang yang bernama :
                                            </p>

                                            {/* TABEL BIODATA CATIN WANITA */}
                                            <div className="ml-2 sm:ml-2.5 mb-1 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{data.extra_data?.bride_name?.trim() ? data.extra_data.bride_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono">{data.extra_data?.bride_nik || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.bride_birth_place_date || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.bride_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.bride_address || '...'}</span>
                                                </div>
                                            </div>

                                            <p className="text-[6.5px] sm:text-[7px] text-black my-0.5 relative z-0">
                                                Yang akan menikah dengan :
                                            </p>

                                            {/* TABEL BIODATA CATIN PRIA */}
                                            <div className="ml-2 sm:ml-2.5 mb-1 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{data.extra_data?.groom_name?.trim() ? data.extra_data.groom_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono">{data.extra_data?.groom_nik || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.groom_birth_place_date || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.groom_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.groom_address || '...'}</span>
                                                </div>
                                            </div>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-4 my-1 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini di buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.
                                            </p>

                                            {/* DUA KOLOM TANDA TANGAN */}
                                            <div className="grid grid-cols-2 pt-1 gap-2 relative z-0 text-black text-[6.5px] sm:text-[7px] leading-snug">
                                                <div className="text-center">
                                                    <p className="invisible">Karangwungu, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                    <p className="mt-0.5">Pemohon</p>
                                                    <div className="h-10 sm:h-12 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[6.5px] sm:text-[7px]">{data.citizen_name || '...'}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p>Karangwungu, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                    <p className="font-semibold mt-0.5">Kepala Desa Karangwungu</p>
                                                    <div className="h-10 sm:h-12 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[6.5px] sm:text-[7px]">SUNARTO</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : isKehilangan ? (
                                        <>
                                            {/* PARAGRAF PEMBUKA SESUAI FORMAT FOTO FISIK DESA KARANGWUNGU */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black mb-1.5 relative z-0 leading-relaxed text-justify">
                                                Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa :
                                            </p>

                                            {/* TABEL BIODATA PEMOHON SESUAI URUTAN DOKUMEN FISIK */}
                                            <div className="ml-2 sm:ml-2.5 mb-1.5 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.gender || 'Laki-laki'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">TTL</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = data.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatPreviewBirthDate();
                                                            if (formattedDate) return `${bp}, ${formattedDate}`;
                                                            return `${bp}, ...`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Kwarganegaraan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">Indonesia</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.occupation?.trim() || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{data.citizen_nik?.trim() || '...'}</span>
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
                                            </div>

                                            {/* PARAGRAF KETERANGAN KEHILANGAN */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify my-2 leading-relaxed relative z-0">
                                                Nama tersebut diatas adalah benar bahwa warga Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan. Dengan ini menerangkan bahwa yang bersangkutan telah kehilangan berupa <strong className="font-bold">{data.purpose?.trim() ? data.purpose.toUpperCase() : 'KTP (KARTU TANDA PENDUDUK)'}</strong>
                                            </p>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-4 my-1.5 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini dibuat dengan sebenarnya. Sesuai dengan keadaan sekarang untuk dipergunakan sebagai manamestinya.
                                            </p>

                                            {/* TANDA TANGAN KADES KEHILANGAN */}
                                            <div className="flex items-end justify-end pt-1 gap-2 relative z-0">
                                                <div className="text-center text-[6.5px] sm:text-[7px] text-black leading-snug min-w-[110px]">
                                                    <p>Karangwungu, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                    <p className="font-bold uppercase mt-0.5">KEPALA DESA KARANGWUNGU</p>
                                                    <div className="h-14 sm:h-16 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">SUNARTO</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : isKematian ? (
                                        <>
                                            {/* PARAGRAF PEMBUKA SESUAI FORMAT FOTO FISIK DESA KARANGWUNGU */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black mb-1.5 relative z-0 leading-relaxed text-justify indent-3">
                                                Yang bertandatangan dibawah ini, Kepala Desa Karangwungu, Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan bahwa,
                                            </p>

                                            {/* TABEL BIODATA ALMARHUM / ALMARHUMAH */}
                                            <div className="ml-2 sm:ml-2.5 mb-1.5 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase underline">{data.citizen_name?.trim() ? data.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.gender || 'Perempuan'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat Tanggal Lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = data.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatPreviewBirthDate();
                                                            if (formattedDate) return `${bp}, ${formattedDate}`;
                                                            return `${bp}, ...`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.religion || 'Islam'}</span>
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
                                                                return `Desa Karangwungu Rt ${rtPad} Rw ${rwPad} kec.Karanggeneng Kab Lamongan`;
                                                            }
                                                            if (data.citizen_address?.trim()) {
                                                                return data.citizen_address.trim();
                                                            }
                                                            return 'Desa Karangwungu Rt 004 Rw 001 kec.Karanggeneng Kab Lamongan';
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* PEMISAH KEMATIAN */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black my-1 font-normal relative z-0">
                                                Telah Meninggal Dunia pada :
                                            </p>

                                            {/* TABEL RINCIAN KEMATIAN */}
                                            <div className="ml-2 sm:ml-2.5 mb-1.5 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tanggal</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.death_date || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Sebab Kematian</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold">{data.extra_data?.death_cause || 'Karena Sakit'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Tempat Kematian</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{data.extra_data?.death_place || 'Di rumah dan di semayamkan di Desa Karangwungu'}</span>
                                                </div>
                                            </div>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-3 my-1.5 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.
                                            </p>

                                            {/* TANDA TANGAN KEPALA DESA */}
                                            <div className="flex items-end justify-end pt-1 gap-2 relative z-0">
                                                <div className="text-center text-[6.5px] sm:text-[7px] text-black leading-snug min-w-[110px]">
                                                    <p>Karangwungu, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                    <p className="font-semibold mt-0.5">Kepala Desa Karangwungu</p>
                                                    <div className="h-12 sm:h-14 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">H. SUNARTO</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </>
                            )}
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
