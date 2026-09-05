import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    FileText,
    ArrowLeft,
    CheckCircle2,
    Clock,
    XCircle,
    PackageCheck,
    Printer,
    Save,
    MessageCircle,
    AlertTriangle,
    Loader2,
    Eye,
    Edit3,
    Check,
    Copy,
    Building2,
    RotateCcw,
    Send,
    Sparkles,
    User,
    FileCheck,
    Phone,
    ChevronDown,
    Search,
    Calendar,
    Ban,
    Trash2,
} from 'lucide-react';

const STATUS_MAP = {
    menunggu: {
        label: 'Menunggu',
        badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
        dotBg: 'bg-amber-500',
        icon: Clock,
    },
    bisa_diambil: {
        label: 'Siap Diambil',
        badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
        dotBg: 'bg-blue-500',
        icon: PackageCheck,
    },
    selesai: {
        label: 'Selesai',
        badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        dotBg: 'bg-emerald-500',
        icon: CheckCircle2,
    },
    ditolak: {
        label: 'Ditolak',
        badgeBg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
        dotBg: 'bg-rose-500',
        icon: XCircle,
    },
};

const MONTHS_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

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

function formatAddressString(rt, rw, rest) {
    const rtTrim = (rt || '').trim();
    const rwTrim = (rw || '').trim();
    const restTrim = (rest || '').trim();

    const rtPad = rtTrim ? (/^\d+$/.test(rtTrim) ? rtTrim.padStart(3, '0') : rtTrim) : '';
    const rwPad = rwTrim ? (/^\d+$/.test(rwTrim) ? rwTrim.padStart(3, '0') : rwTrim) : '';

    if (rtPad && rwPad) {
        return `RT ${rtPad} RW ${rwPad} ${restTrim}`;
    }
    if (rtPad || rwPad) {
        return `RT ${rtPad || '001'} RW ${rwPad || '001'} ${restTrim}`;
    }
    return restTrim;
}

function parseInitialAddress(addrStr) {
    const defaultRest = 'Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan';
    if (!addrStr || !addrStr.trim()) {
        return { rt: '003', rw: '001', rest: defaultRest };
    }
    
    const slashMatch = addrStr.match(/RT[\s/]*RW[:\s]*(\d+)[\s/]+(\d+)\s*(.*)/i);
    if (slashMatch) {
        let rest = slashMatch[3]?.trim();
        if (!rest || rest.toLowerCase() === 'desa karangwungu' || !rest.toLowerCase().includes('karanggeneng')) {
            rest = defaultRest;
        }
        return {
            rt: slashMatch[1].padStart(3, '0'),
            rw: slashMatch[2].padStart(3, '0'),
            rest: rest,
        };
    }

    const separateMatch = addrStr.match(/RT\s*[:.\s]?\s*(\d+)\s*RW\s*[:.\s]?\s*(\d+)\s*(.*)/i);
    if (separateMatch) {
        let rest = separateMatch[3]?.trim();
        if (!rest || rest.toLowerCase() === 'desa karangwungu' || !rest.toLowerCase().includes('karanggeneng')) {
            rest = defaultRest;
        }
        return {
            rt: separateMatch[1].padStart(3, '0'),
            rw: separateMatch[2].padStart(3, '0'),
            rest: rest,
        };
    }

    return { rt: '003', rw: '001', rest: addrStr };
}

function parseInitialBirthDate(dateStr) {
    if (!dateStr) return { year: '', month: '', day: '' };
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return {
                year: parts[0],
                month: parts[1].padStart(2, '0'),
                day: parts[2].padStart(2, '0'),
            };
        }
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            return {
                year: String(d.getFullYear()),
                month: String(d.getMonth() + 1).padStart(2, '0'),
                day: String(d.getDate()).padStart(2, '0'),
            };
        }
    } catch {
        // fallback
    }
    return { year: '', month: '', day: '' };
}

function formatBirthDatePreview(birthPlace, birthDateStr) {
    if (!birthDateStr) return birthPlace || '-';
    try {
        const d = new Date(birthDateStr);
        if (isNaN(d.getTime())) return birthPlace || '-';
        const formatted = `${String(d.getDate()).padStart(2, '0')} ${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`;
        return birthPlace ? `${birthPlace}, ${formatted}` : formatted;
    } catch {
        return birthPlace || '-';
    }
}

function formatLetterDatePreview(dateStr) {
    if (!dateStr) return '05 September 2026';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const y = parts[0];
            const m = parseInt(parts[1], 10) - 1;
            const d = parts[2].padStart(2, '0');
            return `${d} ${MONTHS_ID[m] || ''} ${y}`;
        }
        const dt = new Date(dateStr);
        if (!isNaN(dt.getTime())) {
            return `${String(dt.getDate()).padStart(2, '0')} ${MONTHS_ID[dt.getMonth()]} ${dt.getFullYear()}`;
        }
    } catch {
        // fallback
    }
    return dateStr;
}

function buildDefaultWaTemplate({
    citizen_name,
    citizen_nik,
    letter_type,
    tracking_code,
    letter_number,
    purpose,
}) {
    const currentYear = new Date().getFullYear();
    const name = citizen_name || 'Bapak/Ibu/Saudara';
    const nik = citizen_nik || '-';
    const type = letter_type?.toUpperCase() || 'SURAT KETERANGAN';
    const code = tracking_code || '-';
    const num = letter_number || `470 / ... / 413.318.15 / ${currentYear}`;
    const purp = purpose || '-';

    return `*PEMERINTAH KABUPATEN LAMONGAN*
*KECAMATAN KARANGGENENG - DESA KARANGWUNGU*
_Layanan Administrasi Surat Online_
━━━━━━━━━━━━━━━━━━━━

Yth. Bapak/Ibu/Sdr/i: *${name}*
NIK: *${nik}*

Pemberitahuan dari Pemerintah Desa Karangwungu mengenai permohonan surat:
*Jenis Surat* : ${type}
*Kode Lacak* : ${code}

Dengan ini kami menginformasikan bahwa surat permohonan Anda *BISA DIPROSES LEBIH LANJUT* dan dipersilahkan untuk mengambil surat di Balai Desa Karangwungu.

Silakan datang mengambil lembar surat fisik pada jam pelayanan:
*Tempat* : Meja Pelayanan Balai Desa Karangwungu
*Waktu* : Senin - Jumat (08.00 - 15.00 WIB)
*Catatan* : Harap membawa KTP Asli pemohon untuk verifikasi berkas saat pengambilan.

Terima kasih atas kerja samanya.

Hormat kami,
*Pemerintah Desa Karangwungu*`;
}

export default function LetterPreview({
    letter,
    kades_name = 'H. SUNARTO',
    kades_title = 'Kepala Desa Karangwungu',
}) {
    const { admin_path } = usePage().props;
    const adminPath = admin_path || 'portal-karangwungu';
    const letterCode = letter.tracking_code || letter.id;
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => String(currentYear - i));

    // Normalize status: ensure 'pending' is handled as 'menunggu'
    const normalizedStatus = (letter.status === 'pending' || !letter.status) ? 'menunggu' : letter.status;
    // Default letter number if empty and already processed
    const initialLetterNumber = letter.letter_number || (normalizedStatus === 'menunggu' ? '' : `470 / 001 / 413.318.15 / ${currentYear}`);

    const initialAddressParsed = parseInitialAddress(letter.citizen_address);
    const initialBirthDateParsed = parseInitialBirthDate(letter.birth_date);

    const [birthYear, setBirthYear] = useState(initialBirthDateParsed.year);
    const [birthMonth, setBirthMonth] = useState(initialBirthDateParsed.month);
    const [birthDay, setBirthDay] = useState(initialBirthDateParsed.day);

    const [addressRt, setAddressRt] = useState(initialAddressParsed.rt);
    const [addressRw, setAddressRw] = useState(initialAddressParsed.rw);
    const [addressRest, setAddressRest] = useState(initialAddressParsed.rest);

    const [selectedOccupation, setSelectedOccupation] = useState(() => {
        const occ = letter.occupation || '';
        if (commonOccupations.includes(occ)) {
            return occ;
        }
        return occ ? 'Lainnya' : '';
    });
    const [customOccupation, setCustomOccupation] = useState(() => {
        const occ = letter.occupation || '';
        return commonOccupations.includes(occ) ? '' : occ;
    });

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
            setForm((prev) => ({ ...prev, occupation: customOccupation }));
        } else {
            setForm((prev) => ({ ...prev, occupation: job }));
        }
    };

    const handleCustomOccupationChange = (e) => {
        const val = e.target.value;
        setCustomOccupation(val);
        setForm((prev) => ({ ...prev, occupation: val }));
    };

    const filteredOccupations = commonOccupations.filter((job) =>
        job.toLowerCase().includes(occupationSearch.toLowerCase())
    );

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
            setForm((prev) => ({ ...prev, birth_date: `${y}-${m}-${d}` }));
        } else {
            setForm((prev) => ({ ...prev, birth_date: '' }));
        }
    };

    const initialFullAddress = formatAddressString(
        initialAddressParsed.rt,
        initialAddressParsed.rw,
        initialAddressParsed.rest
    );

    const syncAddress = (curRt, curRw, curRest) => {
        const fullAddress = formatAddressString(
            curRt !== undefined ? curRt : addressRt,
            curRw !== undefined ? curRw : addressRw,
            curRest !== undefined ? curRest : addressRest
        );
        setForm((prev) => ({ ...prev, citizen_address: fullAddress }));
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

    const todayYmd = () => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Editable form state for citizen input and letter number
    const [form, setForm] = useState({
        status: normalizedStatus,
        letter_number: initialLetterNumber,
        letter_date: letter.letter_date || todayYmd(),
        admin_notes: letter.admin_notes || '',
        citizen_name: letter.citizen_name || '',
        citizen_nik: letter.citizen_nik || '',
        birth_place: letter.birth_place || '',
        birth_date: letter.birth_date || '',
        gender: letter.gender || 'Laki-laki',
        religion: letter.religion || 'Islam',
        occupation: letter.occupation || 'Wiraswasta',
        citizen_phone: letter.citizen_phone || '',
        citizen_email: letter.citizen_email || '',
        citizen_address: initialFullAddress,
        purpose: letter.purpose || '',
    });

    // Editable WhatsApp Notification Template
    const [waTemplate, setWaTemplate] = useState(() => {
        return buildDefaultWaTemplate({
            citizen_name: letter.citizen_name,
            citizen_nik: letter.citizen_nik,
            letter_type: letter.letter_type,
            tracking_code: letter.tracking_code,
            letter_number: initialLetterNumber,
            purpose: letter.purpose,
        });
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSiapDiambilModal, setShowSiapDiambilModal] = useState(false);
    const [showSelesaiModal, setShowSelesaiModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState(
        'Berkas persyaratan belum lengkap atau data tidak valid. Silakan hubungi kantor balai desa.'
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);
    const [copiedWa, setCopiedWa] = useState(false);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleCopyWaText = () => {
        navigator.clipboard.writeText(waTemplate);
        setCopiedWa(true);
        setTimeout(() => setCopiedWa(false), 2000);
    };

    // Reset WA template to auto-generated from current inputs
    const handleResetWaTemplate = () => {
        const fresh = buildDefaultWaTemplate({
            citizen_name: form.citizen_name,
            citizen_nik: form.citizen_nik,
            letter_type: letter.letter_type,
            tracking_code: letter.tracking_code,
            letter_number: form.letter_number,
            purpose: form.purpose,
        });
        setWaTemplate(fresh);
    };

    // Handle Form Save (Citizen data & Letter Number)
    const handleSave = (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        router.put(
            `/${adminPath}/settings/letters/${letterCode}`,
            {
                ...form,
                admin_notes: waTemplate,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    // Confirm Siap Diambil
    const handleConfirmSiapDiambil = () => {
        setIsSubmitting(true);
        const updatedStatus = 'bisa_diambil';
        const assignedNumber = form.letter_number?.trim() || `470 / 001 / 413.318.15 / ${currentYear}`;
        const updatedForm = {
            ...form,
            status: updatedStatus,
            letter_number: assignedNumber,
        };
        setForm(updatedForm);

        // Update WA template with final letter number
        const freshWa = buildDefaultWaTemplate({
            citizen_name: updatedForm.citizen_name,
            citizen_nik: updatedForm.citizen_nik,
            letter_type: letter.letter_type,
            tracking_code: letter.tracking_code,
            letter_number: assignedNumber,
            purpose: updatedForm.purpose,
        });
        setWaTemplate(freshWa);

        router.put(
            `/${adminPath}/settings/letters/${letterCode}`,
            {
                ...updatedForm,
                admin_notes: freshWa,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    setShowSiapDiambilModal(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                    setShowSiapDiambilModal(false);
                },
            }
        );
    };

    // Confirm Selesai
    const handleConfirmSelesai = () => {
        setIsSubmitting(true);
        const updatedStatus = 'selesai';
        setForm((prev) => ({ ...prev, status: updatedStatus }));

        router.put(
            `/${adminPath}/settings/letters/${letterCode}`,
            {
                ...form,
                status: updatedStatus,
                admin_notes: 'Surat telah selesai dan diambil oleh pemohon di Balai Desa Karangwungu.',
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    setShowSelesaiModal(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                    setShowSelesaiModal(false);
                },
            }
        );
    };

    // Confirm Tolak Permohonan
    const handleConfirmReject = () => {
        setIsSubmitting(true);
        const updatedStatus = 'ditolak';
        setForm((prev) => ({ ...prev, status: updatedStatus, admin_notes: rejectReason }));

        router.post(
            `/${adminPath}/settings/letters/${letterCode}/reject`,
            {
                admin_notes: rejectReason,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    setShowRejectModal(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                    setShowRejectModal(false);
                },
            }
        );
    };

    // Restore back to Menunggu
    const handleRestorePreview = () => {
        setIsSubmitting(true);
        const updatedStatus = 'menunggu';
        setForm((prev) => ({ ...prev, status: updatedStatus }));

        router.post(
            `/${adminPath}/settings/letters/${letterCode}/restore`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    // Permanent Delete
    const handleConfirmDelete = () => {
        setIsSubmitting(true);
        router.delete(`/${adminPath}/settings/letters/${letterCode}`, {
            onSuccess: () => {
                setIsSubmitting(false);
                setShowDeleteModal(false);
            },
            onError: () => {
                setIsSubmitting(false);
                setShowDeleteModal(false);
            },
        });
    };

    // WhatsApp link generator using the editable template
    const getWhatsAppUrl = () => {
        if (!form.citizen_phone) return '#';
        let clean = form.citizen_phone.replace(/[^0-9]/g, '');
        if (clean.startsWith('0')) clean = '62' + clean.slice(1);
        const text = encodeURIComponent(waTemplate);
        return `https://wa.me/${clean}?text=${text}`;
    };

    const currentStatusCfg = STATUS_MAP[form.status] || STATUS_MAP.menunggu;
    const StatusIcon = currentStatusCfg.icon;

    return (
        <AdminLayout title={`Edit & Pertinjau Surat - ${letter.tracking_code}`}>
            <Head title={`Edit & Pertinjau - ${letter.citizen_name} (${letter.tracking_code})`} />

            <div className="space-y-6">
                {/* 1. Header with Breadcrumbs & Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-1">
                        <Link
                            href={`/${adminPath}/settings/letters`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-red-700 dark:hover:text-amber-400 transition-colors mb-1"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Kembali ke Daftar Permohonan</span>
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-3">
                            <span>Edit & Proses Permohonan Surat</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${currentStatusCfg.badgeBg}`}>
                                <StatusIcon className="h-3.5 w-3.5 shrink-0" />
                                <span>{currentStatusCfg.label}</span>
                            </span>
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span>Kode: <strong className="font-mono text-zinc-800 dark:text-zinc-200">{letter.tracking_code}</strong></span>
                            <button
                                type="button"
                                onClick={() => handleCopy(letter.tracking_code)}
                                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                                title="Salin kode"
                            >
                                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                            <span>•</span>
                            <span>Diajukan: {letter.created_at} ({letter.created_at_human})</span>
                        </div>
                    </div>
                </div>

                {/* 2. Main 2-Column Section: Form Editor (Left) vs Compact Mini Preview (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT: Full Form Editor (7 or 8 Cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                        <form onSubmit={handleSave} className="space-y-6">
                            {/* Card 1: Nomor Registrasi & Template Pesan WhatsApp - Ditampilkan saat surat sudah diproses (bisa_diambil / selesai) */}
                            {form.status !== 'menunggu' && form.status !== 'ditolak' && (
                                <div className="p-5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-4">
                                    <div className="flex items-center gap-2.5 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                                        <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400">
                                            <Building2 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white">
                                                Nomor Registrasi Surat & Template Pesan WhatsApp
                                            </h3>
                                            <p className="text-[11px] text-zinc-400">
                                                Nomor surat resmi desa dan draf pemberitahuan untuk warga
                                            </p>
                                        </div>
                                    </div>

                                    {/* Nomor Registrasi Surat & Tanggal Surat */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Nomor Registrasi Surat Desa */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                                <span>Nomor Registrasi Surat *</span>
                                                <span className="text-[10px] font-mono text-zinc-400 font-normal">
                                                    .../.../.../{currentYear}
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={form.letter_number}
                                                onChange={(e) => setForm({ ...form, letter_number: e.target.value })}
                                                placeholder={`Contoh: 470/001/413.318.15/${currentYear}`}
                                                className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400/60 dark:placeholder-zinc-500/50 focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all"
                                            />
                                            <span className="text-[10px] text-zinc-400 block">
                                                Tercetak pada kop surat & disematkan ke pesan WA.
                                            </span>
                                        </div>

                                        {/* Tanggal Surat / Dicetak */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                                    <span>Tanggal Surat / Dicetak *</span>
                                                </span>
                                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                                                    Default: Hari ini
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                value={form.letter_date}
                                                onChange={(e) => setForm({ ...form, letter_date: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg text-xs font-medium bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all"
                                            />
                                            <span className="text-[10px] text-zinc-400 block">
                                                Tertulis: <strong>Karangwungu, {formatLetterDatePreview(form.letter_date)}</strong>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Template Pesan Notifikasi WhatsApp */}
                                    <div className="space-y-1.5 pt-1">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                                <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                <span>Template Pesan Pemberitahuan WhatsApp (Bisa Diedit)</span>
                                            </label>
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={handleResetWaTemplate}
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-0.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                                    title="Sinkronkan ulang teks pesan dengan data pemohon terbaru"
                                                >
                                                    <RotateCcw className="h-3 w-3" />
                                                    <span>Sinkronkan Ulang</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCopyWaText}
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-0.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                                                    title="Salin isi pesan ke clipboard"
                                                >
                                                    {copiedWa ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                                                    <span>{copiedWa ? 'Tersalin' : 'Salin Pesan'}</span>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea
                                            rows={8}
                                            value={waTemplate}
                                            onChange={(e) => setWaTemplate(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-lg text-xs font-mono leading-relaxed bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400/60 dark:placeholder-zinc-500/50 focus:ring-2 focus:ring-red-600 dark:focus:ring-amber-400 transition-all"
                                            placeholder="Ketik atau sesuaikan pesan pemberitahuan untuk warga..."
                                        />
                                        <span className="text-[10px] text-zinc-400 block">
                                            Pesan ini yang akan otomatis terkirim saat Anda menekan tombol <strong>Kirim Pesan WA</strong> di kanan atas pertinjau.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Card 2: Formulir Pengajuan Surat (Identik dengan Form.jsx) */}
                            <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-6">
                                {/* Header */}
                                <div className="flex items-start gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400 shrink-0">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                                            Formulir Pengajuan Surat
                                        </h2>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                                            Lengkapi data identitas pemohon dan keperluan pengajuan sesuai data e-KTP / KK warga Desa Karangwungu.
                                        </p>
                                    </div>
                                </div>

                                {/* SUBSECTION 1: IDENTITAS PEMOHON (SESUAI KTP / KK) */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                value={form.citizen_name}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_name: e.target.value }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
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
                                                value={form.citizen_nik}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_nik: e.target.value.replace(/[^0-9]/g, '') }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono tracking-wider text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
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
                                                value={form.birth_place}
                                                onChange={(e) => setForm((prev) => ({ ...prev, birth_place: e.target.value }))}
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
                                        </div>
                                    </div>

                                    {/* Jenis Kelamin & Agama */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Jenis Kelamin
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={form.gender}
                                                    onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}
                                                    className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 pr-10 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
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
                                                    value={form.religion}
                                                    onChange={(e) => setForm((prev) => ({ ...prev, religion: e.target.value }))}
                                                    className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 pr-10 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 cursor-pointer"
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
                                            <span className={form.occupation ? "text-zinc-900 dark:text-zinc-100 font-medium truncate" : "text-zinc-400 dark:text-zinc-500 truncate"}>
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
                                                    Silakan tuliskan jenis pekerjaan pemohon yang tertera di KTP.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Alamat Tempat Tinggal (RT, RW, Desa/Kec/Kab) */}
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
                                    </div>
                                </div>

                                {/* SUBSECTION 2: KEPERLUAN PENGAJUAN SURAT */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-2">
                                        <FileCheck className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                            placeholder="Contoh: Persyaratan Pengajuan Keringanan Biaya Pendidikan / Beasiswa Sekolah Putra/Putri."
                                            value={form.purpose}
                                            onChange={(e) => setForm((prev) => ({ ...prev, purpose: e.target.value }))}
                                            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                            required
                                        />
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1.5">
                                            Jelaskan secara ringkas dan jelas instansi tujuan atau keperluan pengajuan surat.
                                        </p>
                                    </div>
                                </div>

                                {/* SUBSECTION 3: KONTAK YANG BISA DIHUBUNGI */}
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                value={form.citizen_phone}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_phone: e.target.value.replace(/[^0-9]/g, '') }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                Gunakan format 08... (tanpa tanda hubung - atau spasi).
                                            </p>
                                        </div>

                                        {/* Alamat Email (Opsional) */}
                                        <div>
                                            <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                Alamat Email <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">(Opsional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="contoh@gmail.com (opsional)"
                                                value={form.citizen_email}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_email: e.target.value }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                            />
                                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                                                Bisa dikosongkan jika tidak memiliki alamat email.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Submit Button (rounded-lg) */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-lg shadow-red-950/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Menyimpan Perubahan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        <span>Simpan Semua Perubahan & Data Pemohon</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Compact Mini Preview & Contextual Actions */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-4 lg:sticky lg:top-20">
                        {/* Aksi & Proses Surat Panel (rounded-lg) */}
                        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                    Aksi & Proses Permohonan
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold border ${currentStatusCfg.badgeBg}`}>
                                    <StatusIcon className="h-3 w-3 shrink-0" />
                                    <span>{currentStatusCfg.label}</span>
                                </span>
                            </div>

                            {/* CASE 1: Status MENUNGGU -> [Jadikan Siap Diambil], [Simpan Perubahan], [Tolak] */}
                            {form.status === 'menunggu' && (
                                <div className="space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowSiapDiambilModal(true)}
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                                    >
                                        <PackageCheck className="h-4 w-4 shrink-0" />
                                        <span>Jadikan Siap Diambil</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                                                <span>Menyimpan...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-3.5 w-3.5 shrink-0" />
                                                <span>Simpan Perubahan</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowRejectModal(true)}
                                        disabled={isSubmitting}
                                        className="w-full py-2 px-3 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                        <Ban className="h-3.5 w-3.5" />
                                        <span>Tolak Permohonan</span>
                                    </button>
                                </div>
                            )}

                            {/* CASE 2: Status DITOLAK -> [Pulihkan ke Menunggu] & [Hapus Permanen] */}
                            {form.status === 'ditolak' && (
                                <div className="space-y-2.5">
                                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-800 dark:text-rose-300 space-y-1">
                                        <span className="font-bold flex items-center gap-1.5">
                                            <Ban className="h-3.5 w-3.5 text-rose-600" />
                                            Permohonan Ditolak
                                        </span>
                                        <p className="text-[11px] text-rose-700/90 dark:text-rose-300/90 leading-relaxed">
                                            {form.admin_notes || 'Berkas ditolak oleh admin desa.'}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleRestorePreview}
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                                    >
                                        <RotateCcw className="h-4 w-4 shrink-0" />
                                        <span>Pulihkan ke Menunggu</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(true)}
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4 shrink-0" />
                                        <span>Hapus Permanen</span>
                                    </button>
                                </div>
                            )}

                            {/* CASE 3: Status BISA_DIAMBIL / SELESAI -> Aksi Terstruktur Rapi */}
                            {(form.status === 'bisa_diambil' || form.status === 'selesai') && (
                                <div className="space-y-2.5">
                                    {/* Tombol Utama: Kirim Pesan WA (Lebar Penuh) */}
                                    {form.citizen_phone ? (
                                        <a
                                            href={getWhatsAppUrl()}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                                            title="Kirim pesan notifikasi WhatsApp resmi ke nomor pemohon"
                                        >
                                            <Send className="h-4 w-4 shrink-0" />
                                            <span>Kirim Pesan WA ke Pemohon</span>
                                        </a>
                                    ) : (
                                        <div className="w-full py-2 px-3 rounded-lg text-center text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                                            Nomor WhatsApp belum diisi
                                        </div>
                                    )}

                                    {/* Baris Tombol Aksi: Cetak PDF & Tandai Selesai / Simpan */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <a
                                            href={`/${adminPath}/settings/letters/${letterCode}/pdf`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
                                        >
                                            <Printer className="h-3.5 w-3.5 text-red-600 dark:text-amber-400 shrink-0" />
                                            <span>Cetak PDF</span>
                                        </a>

                                        {form.status === 'bisa_diambil' ? (
                                            <button
                                                type="button"
                                                onClick={() => setShowSelesaiModal(true)}
                                                disabled={isSubmitting}
                                                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                                                title="Tandai surat telah diambil oleh warga"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                                <span>Tandai Selesai</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                disabled={isSubmitting}
                                                className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                                                        <span>Menyimpan...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="h-3.5 w-3.5 shrink-0" />
                                                        <span>Simpan Perubahan</span>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Tombol Simpan Perubahan Data jika status masih bisa_diambil */}
                                    {form.status === 'bisa_diambil' && (
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            disabled={isSubmitting}
                                            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-amber-400/30 hover:brightness-110 shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
                                                    <span>Menyimpan Perubahan...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-3.5 w-3.5 shrink-0" />
                                                    <span>Simpan Perubahan Data</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 2. Pratinjau / Preview Surat Resmi (Format Dokumen A4 Resmi Sesuai Form.jsx) */}
                        <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-red-600 dark:text-amber-400" />
                                    <span>Pratinjau Format Surat Resmi</span>
                                </span>
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20 font-sans">
                                    Format A4
                                </span>
                            </div>

                            {/* Lembar Dokumen A4 Resmi (Proporsi Margin Otentik, Font Presisi & 3 Watermark Preview) */}
                            <div className="p-2 sm:p-3 rounded-lg bg-zinc-100/90 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 overflow-x-auto flex justify-center">
                                <div
                                    className="relative w-full bg-white text-black px-6 py-6 sm:px-8 sm:py-8 lg:px-6 lg:py-7 xl:px-7 xl:py-8 rounded-lg border border-zinc-300 shadow-xl select-none overflow-hidden"
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

                                    {/* KOP SURAT RESMI */}
                                    <table className="w-full border-collapse mb-1 relative z-0">
                                        <tbody>
                                            <tr>
                                                <td className="w-8 sm:w-10 text-center align-middle pr-1.5 sm:pr-2">
                                                    <img
                                                        src="/assets/images/logo_kop.png"
                                                        alt="Logo Kabupaten Lamongan"
                                                        className="w-7 sm:w-9 h-auto object-contain mx-auto"
                                                        onError={(e) => {
                                                            e.target.src = '/assets/images/logo.png';
                                                        }}
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
                                            {letter.letter_type?.toUpperCase() || 'SURAT KETERANGAN TIDAK MAMPU'}
                                        </h4>
                                        <p className="text-[6.5px] sm:text-[7px] text-black mt-0.5">
                                            Nomor : {form.letter_number || `... / ... / ... / ${currentYear}`}
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
                                            <span className="col-span-7 sm:col-span-8 font-bold">{kades_name}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Jabatan</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{kades_title}</span>
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
                                            <span className="col-span-7 sm:col-span-8 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{form.citizen_nik?.trim() || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Tempat Tgl Lahir</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">
                                                {(() => {
                                                    const bp = form.birth_place?.trim();
                                                    const formattedDate = formatBirthDatePreview(null, form.birth_date);
                                                    if (bp && formattedDate && formattedDate !== '-') return `${bp}, ${formattedDate}`;
                                                    if (bp) return `${bp}, ...`;
                                                    if (formattedDate && formattedDate !== '-') return `..., ${formattedDate}`;
                                                    return '...';
                                                })()}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Jenis Kelamin</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{form.gender || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Pekerjaan</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{form.occupation?.trim() || '...'}</span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                            <span className="col-span-1 text-center align-top">:</span>
                                            <span className="col-span-7 sm:col-span-8">
                                                {form.citizen_address?.trim() || '...'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                            <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                            <span className="col-span-1 text-center">:</span>
                                            <span className="col-span-7 sm:col-span-8">{form.religion || '...'}</span>
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
                                                Bahwa orang tersebut adalah benar-benar warga Desa Karangwungu yang tergolong keluarga <strong className="font-bold">Tidak Mampu</strong>, dan surat keterangan ini dibuat untuk keperluan <strong className="font-bold">{form.purpose?.trim() || '...'}</strong>.
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
                                            <p>Karangwungu, {formatLetterDatePreview(form.letter_date)}</p>
                                            <p className="mt-0.5">Mengetahui,</p>
                                            <p className="font-semibold">{kades_title}</p>
                                            <div className="h-14 sm:h-16 flex items-center justify-center">
                                                <span className="text-[5px] text-zinc-400 font-sans italic">
                                                    (Tanda Tangan & Stempel)
                                                </span>
                                            </div>
                                            <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">{kades_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Helper status notice */}
                        <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                            <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5 text-red-600 dark:text-amber-400" />
                                <span>Alur Pelayanan Surat</span>
                            </div>
                            <p className="leading-snug">
                                {form.status === 'menunggu' && 'Permohonan berstatus menunggu verifikasi. Periksa data pemohon di formulir, lalu tekan tombol Siap Diambil bila berkas telah diproses.'}
                                {form.status === 'bisa_diambil' && 'Surat siap diambil di Balai Desa. Silakan tekan Kirim Pesan WA untuk memberitahukan warga.'}
                                {form.status === 'selesai' && 'Dokumen telah selesai dan diserahkan kepada pemohon.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Modal Konfirmasi: Ubah Menjadi Siap Diambil (rounded-lg) */}
            {showSiapDiambilModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 w-fit">
                            <PackageCheck className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Konfirmasi Surat Siap Diambil
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah permohonan surat atas nama <strong className="text-zinc-900 dark:text-white">{form.citizen_name}</strong> (Kode: <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{letter.tracking_code}</span>) sudah selesai diverifikasi dan siap diambil di Balai Desa?
                            </p>

                            {/* Input Nomor Surat & Tanggal Registrasi */}
                            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                        <span>Nomor Registrasi Surat Desa</span>
                                        <span className="text-[10px] font-mono text-zinc-400 font-normal">
                                            .../.../.../{currentYear}
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.letter_number}
                                        onChange={(e) => setForm({ ...form, letter_number: e.target.value })}
                                        placeholder={`Contoh: 470/001/413.318.15/${currentYear}`}
                                        className="w-full px-3 py-2 rounded-lg text-xs font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-[10px] text-zinc-400 block">
                                        Bisa dikosongkan untuk memakai penomoran otomatis desa.
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                                        <span>Tanggal Surat / Dicetak</span>
                                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Default: Hari ini</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={form.letter_date}
                                        onChange={(e) => setForm({ ...form, letter_date: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <p className="text-[11px] text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 p-2.5 rounded-lg border border-blue-200/60 dark:border-blue-800/40">
                                💡 Setelah dikonfirmasi, status akan diperbarui menjadi <strong>Siap Diambil</strong>. Bagian <strong>Nomor Registrasi Surat & Template Pesan WhatsApp</strong> akan otomatis muncul dan tombol <strong>Kirim Pesan WA</strong> akan aktif.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowSiapDiambilModal(false)}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmSiapDiambil}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        <span>Ya, Tandai Siap Diambil</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Modal Konfirmasi: Tandai Selesai (rounded-lg) */}
            {showSelesaiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-fit">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Tandai Surat Telah Selesai Diambil
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah warga pemohon (<strong className="text-zinc-900 dark:text-white">{form.citizen_name}</strong>) sudah datang ke Balai Desa dan mengambil lembar surat fisik resminya?
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowSelesaiModal(false)}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmSelesai}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        <span>Ya, Tandai Selesai</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. Modal Konfirmasi: Tolak Permohonan Surat */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Ban className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Tolak Permohonan Surat?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Permohonan atas nama <strong className="text-zinc-900 dark:text-white">{form.citizen_name}</strong> (Kode: <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{letter.tracking_code}</span>) akan dialihkan ke status <strong>Ditolak</strong>.
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                💡 Berkas yang ditolak akan tersimpan selama 7 hari sebelum dihapus permanen otomatis oleh sistem, atau dapat dipulihkan sewaktu-waktu.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Alasan / Catatan Penolakan (Tampil pada portal lacak warga):
                            </label>
                            <textarea
                                rows={3}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-rose-500"
                                placeholder="Contoh: Berkas persyaratan belum lengkap atau data KTP tidak valid..."
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmReject}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <Ban className="h-3.5 w-3.5" />
                                        <span>Ya, Tolak Permohonan</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. Modal Konfirmasi: Hapus Permanen */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
                    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 w-fit">
                            <Trash2 className="h-6 w-6" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                                Hapus Permanen Permohonan Surat?
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Apakah Anda yakin ingin menghapus permanen permohonan surat dengan kode{' '}
                                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                                    {letter.tracking_code}
                                </span>{' '}
                                atas nama <span className="font-bold">{form.citizen_name}</span>?
                            </p>
                            <p className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50/60 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                                ⚠️ Tindakan ini akan menghapus data selamanya dari basis data dan <strong>tidak dapat dibatalkan</strong>.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={isSubmitting}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        <span>Menghapus...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-3.5 w-3.5" />
                                        <span>Ya, Hapus Permanen</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
