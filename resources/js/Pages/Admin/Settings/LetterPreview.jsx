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
    Info,
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

const WALI_HAKIM_REASONS = [
    { code: 'a', label: 'a. Wali Nasab tidak ada' },
    { code: 'b', label: 'b. Walinya adhol' },
    { code: 'c', label: 'c. Walinya tidak diketahui keberadaanya' },
    { code: 'd', label: 'd. Walinya tidak dapat dihadirkan /ditemui karena dipenjara' },
    { code: 'e', label: 'e. Wali nasab tidak ada yang beragama islam' },
    { code: 'f', label: 'f. Wali yang akan menikahkan menjadi pengantin itu sendiri' },
];

function buildDefaultWaTemplate({
    citizen_name,
    citizen_nik,
    letter_type,
    letter_id,
    letter_number,
    purpose,
    statusText,
    numberText,
    notesText,
}) {
    const currentYear = new Date().getFullYear();
    const name = citizen_name || 'Bapak/Ibu/Saudara';
    const nik = citizen_nik || '-';
    const isWaliHakim = (letter_type?.toLowerCase().includes('wali') && letter_type?.toLowerCase().includes('hakim')) || letter_type?.toLowerCase() === 'wali-hakim';
    const isDomisiliUsaha = !isWaliHakim && (((letter_type?.toLowerCase().includes('domisili') && letter_type?.toLowerCase().includes('usaha')) || letter_type?.toLowerCase() === 'domisili-usaha' || letter_type?.toLowerCase() === 'sku'));
    const isKuasa = !isWaliHakim && !isDomisiliUsaha && letter_type?.toLowerCase().includes('kuasa');
    const isKematian = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter_type?.toLowerCase().includes('kematian');
    const isWaliNikah = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter_type?.toLowerCase().includes('wali');
    const isKehilangan = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter_type?.toLowerCase().includes('kehilangan');
    const type = isWaliHakim
        ? 'SURAT KETERANGAN WALI HAKIM'
        : (isDomisiliUsaha
            ? 'SURAT KETERANGAN DOMISILI USAHA'
            : (isKuasa
                ? 'SURAT KUASA'
                : (isKematian
                    ? 'SURAT KETERANGAN KEMATIAN'
                    : (isWaliNikah
                        ? 'SURAT KETERANGAN WALI NIKAH'
                        : (isKehilangan
                            ? 'SURAT KETERANGAN KEHILANGAN'
                            : (letter_type?.toUpperCase() || 'SURAT KETERANGAN'))))));
    const idText = letter_id ? `#${letter_id}` : '-';
    const lostItemText = isKehilangan && purpose
        ? `\n*Barang/Dokumen Hilang* : ${purpose}`
        : (isKuasa && purpose
            ? `\n*Keperluan Kuasa* : ${purpose}`
            : (isWaliHakim && purpose
                ? `\n*Keperluan* : ${purpose}`
                : (isKematian && purpose
                    ? `\n*Keperluan* : ${purpose}`
                    : (isWaliNikah && purpose ? `\n*Keterangan* : ${purpose}` : (isDomisiliUsaha && purpose ? `\n*Keperluan* : ${purpose}` : '')))));

    return `*PEMERINTAH KABUPATEN LAMONGAN*
*KECAMATAN KARANGGENENG - DESA KARANGWUNGU*
_Layanan Administrasi Surat Online_
━━━━━━━━━━━━━━━━━━━━

Yth. Bapak/Ibu/Sdr/i: *${name}*
NIK: *${nik}*

Pengajuan surat Anda:
*Jenis Surat* : *${type}*
*ID Permohonan* : *${idText}*${lostItemText}
*Status* : *${statusText}*
*No. Surat* : ${numberText}

${notesText}

_Pesan ini dikirim resmi oleh Admin Pelayanan Desa Karangwungu._`;
}

export default function LetterPreview({
    letter,
    kades_name = 'H. SUNARTO',
    kades_title = 'Kepala Desa Karangwungu',
}) {
    const { admin_path } = usePage().props;
    const adminPath = admin_path || 'admin-karangwungu';
    const isWaliHakim = (letter.letter_type?.toLowerCase().includes('wali') && letter.letter_type?.toLowerCase().includes('hakim')) || letter.letter_type?.toLowerCase() === 'wali-hakim';
    const isDomisiliUsaha = !isWaliHakim && (((letter.letter_type?.toLowerCase().includes('domisili') && letter.letter_type?.toLowerCase().includes('usaha')) || letter.letter_type?.toLowerCase() === 'domisili-usaha' || letter.letter_type?.toLowerCase() === 'sku'));
    const isKuasa = !isWaliHakim && !isDomisiliUsaha && letter.letter_type?.toLowerCase().includes('kuasa');
    const isKematian = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter.letter_type?.toLowerCase().includes('kematian');
    const isWaliNikah = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter.letter_type?.toLowerCase().includes('wali');
    const isKehilangan = !isWaliHakim && !isDomisiliUsaha && !isKuasa && letter.letter_type?.toLowerCase().includes('kehilangan');
    const letterCode = letter.id;
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => String(currentYear - i));

    const handleApplyKehilanganSuggestion = (itemText) => {
        const current = (form.purpose || '').trim();
        if (!current) {
            setForm((prev) => ({ ...prev, purpose: itemText }));
        } else if (current.toLowerCase().includes(itemText.toLowerCase())) {
            // Already present
        } else {
            setForm((prev) => ({ ...prev, purpose: `${current}, ${itemText}` }));
        }
    };

    const handleApplyKuasaSuggestion = (itemText) => {
        setForm((prev) => ({ ...prev, purpose: itemText }));
    };

    // Normalize status: ensure 'pending' is handled as 'menunggu'
    const normalizedStatus = (letter.status === 'pending' || !letter.status) ? 'menunggu' : letter.status;
    // Default letter number if empty and already processed
    const initialLetterNumber = letter.letter_number || (normalizedStatus === 'menunggu' ? '' : (isWaliHakim ? `470/38/413.318.15/${currentYear}` : (isDomisiliUsaha ? `470 / 60 / 413.318.15 / ${currentYear}` : (isKematian ? `141 / 001 / 413.318.15 / ${currentYear}` : `470 / 001 / 413.318.15 / ${currentYear}`))));

    const initialAddressParsed = parseInitialAddress(letter.citizen_address);
    const initialBirthDateParsed = parseInitialBirthDate(letter.birth_date);

    const [birthYear, setBirthYear] = useState(initialBirthDateParsed.year);
    const [birthMonth, setBirthMonth] = useState(initialBirthDateParsed.month);
    const [birthDay, setBirthDay] = useState(initialBirthDateParsed.day);

    const initialDeathDateParsed = (() => {
        const dStr = letter.extra_data?.death_date || '';
        if (!dStr) return { year: '', month: '', day: '' };
        const parts = dStr.split(/[\/\-]/);
        if (parts.length === 3) {
            if (parts[0].length === 4) {
                return { year: parts[0], month: parts[1].padStart(2, '0'), day: parts[2].padStart(2, '0') };
            }
            return { day: parts[0].padStart(2, '0'), month: parts[1].padStart(2, '0'), year: parts[2] };
        }
        return { year: '', month: '', day: '' };
    })();

    const [deathYear, setDeathYear] = useState(initialDeathDateParsed.year);
    const [deathMonth, setDeathMonth] = useState(initialDeathDateParsed.month);
    const [deathDay, setDeathDay] = useState(initialDeathDateParsed.day);

    const deathMaxDays = (deathYear && deathMonth)
        ? new Date(parseInt(deathYear, 10), parseInt(deathMonth, 10), 0).getDate()
        : 31;
    const deathDaysList = Array.from({ length: deathMaxDays }, (_, i) => String(i + 1).padStart(2, '0'));

    const handleDeathDateChange = (field, val) => {
        let y = field === 'year' ? val : deathYear;
        let m = field === 'month' ? val : deathMonth;
        let d = field === 'day' ? val : deathDay;

        if (field === 'year') setDeathYear(val);
        if (field === 'month') setDeathMonth(val);
        if (field === 'day') setDeathDay(val);

        if (y && m && d) {
            const maxD = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
            if (parseInt(d, 10) > maxD) {
                d = String(maxD).padStart(2, '0');
                setDeathDay(d);
            }
            handleExtraDataChange('death_date', `${d}/${m}/${y}`);
        } else {
            handleExtraDataChange('death_date', '');
        }
    };

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
        extra_data: {
            nationality: letter.extra_data?.nationality || 'Indonesia',
            marital_status: letter.extra_data?.marital_status || 'Kawin',
            stay_status: letter.extra_data?.stay_status || 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan',
            business_name: letter.extra_data?.business_name || (letter.extra_data?.usaha_nama || 'PT LIMAN JAYA GRESIK'),
            business_status_desc: letter.extra_data?.business_status_desc || 'berpindah Tempat atau Kantor',
            business_address: letter.extra_data?.business_address || (letter.extra_data?.usaha_alamat || 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan'),
            description_text: letter.extra_data?.description_text || '',
            catin_relation: letter.extra_data?.catin_relation || 'Saudara Kandung',
            bride_name: letter.extra_data?.bride_name || '',
            bride_nik: letter.extra_data?.bride_nik || '',
            bride_birth_place_date: letter.extra_data?.bride_birth_place_date || '',
            bride_religion: letter.extra_data?.bride_religion || 'Islam',
            bride_address: letter.extra_data?.bride_address || '',
            groom_name: letter.extra_data?.groom_name || '',
            groom_nik: letter.extra_data?.groom_nik || '',
            groom_birth_place_date: letter.extra_data?.groom_birth_place_date || '',
            groom_religion: letter.extra_data?.groom_religion || 'Islam',
            groom_address: letter.extra_data?.groom_address || '',
            death_date: letter.extra_data?.death_date || '',
            death_cause: letter.extra_data?.death_cause || 'Karena Sakit',
            death_place: letter.extra_data?.death_place || 'Di rumah dan di semayamkan di Desa Karangwungu',
            grantee_name: letter.extra_data?.grantee_name || '',
            grantee_nik: letter.extra_data?.grantee_nik || '',
            grantee_address: letter.extra_data?.grantee_address || '',
            // Khusus Wali Hakim
            reason_code: letter.extra_data?.reason_code || 'a',
            bride_father_name: letter.extra_data?.bride_father_name || '',
            groom_father_name: letter.extra_data?.groom_father_name || '',
            groom_nationality: letter.extra_data?.groom_nationality || 'Indonesia',
            groom_occupation: letter.extra_data?.groom_occupation || 'Karyawan Swasta',
            kua_title: letter.extra_data?.kua_title || 'Kepala KUA Kecamatan Karanggeneng',
            kua_name: letter.extra_data?.kua_name || 'H.MOH KHOIRUL ANAM, M.Ag',
            ...(letter.extra_data || {}),
        },
    });

    const handleExtraDataChange = (field, val) => {
        setForm((prev) => ({
            ...prev,
            extra_data: {
                ...(prev.extra_data || {}),
                [field]: val,
            },
        }));
    };

    const initialGranteeAddressParsed = parseInitialAddress(letter.extra_data?.grantee_address || '');
    const [granteeRt, setGranteeRt] = useState(initialGranteeAddressParsed.rt || '007');
    const [granteeRw, setGranteeRw] = useState(initialGranteeAddressParsed.rw || '001');
    const [granteeRest, setGranteeRest] = useState(initialGranteeAddressParsed.rest || 'Desa Karangwungu Kecamatan Karanggeneng, Kabupaten Lamongan');

    const syncGranteeAddress = (curRt, curRw, curRest) => {
        const rtTrim = (curRt !== undefined ? curRt : granteeRt || '').trim();
        const rwTrim = (curRw !== undefined ? curRw : granteeRw || '').trim();
        const restTrim = (curRest !== undefined ? curRest : granteeRest || '').trim();

        const rtPad = rtTrim ? (/^\d+$/.test(rtTrim) ? rtTrim.padStart(3, '0') : rtTrim) : '';
        const rwPad = rwTrim ? (/^\d+$/.test(rwTrim) ? rwTrim.padStart(3, '0') : rwTrim) : '';

        let addr = '';
        if (rtPad && rwPad) {
            addr = `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
        } else if (rtPad || rwPad) {
            addr = `Desa Karangwungu RT/RW: ${rtPad || '...'}/${rwPad || '...'} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
        } else {
            addr = restTrim;
        }
        handleExtraDataChange('grantee_address', addr);
    };

    const handleGranteeRtChange = (val) => {
        const clean = val.replace(/[^0-9]/g, '');
        setGranteeRt(clean);
        syncGranteeAddress(clean, undefined, undefined);
    };

    const handleGranteeRwChange = (val) => {
        const clean = val.replace(/[^0-9]/g, '');
        setGranteeRw(clean);
        syncGranteeAddress(undefined, clean, undefined);
    };

    const handleGranteeRestChange = (val) => {
        setGranteeRest(val);
        syncGranteeAddress(undefined, undefined, val);
    };

    // Editable WhatsApp Notification Template
    const [waTemplate, setWaTemplate] = useState(() => {
        return buildDefaultWaTemplate({
            citizen_name: letter.citizen_name,
            citizen_nik: letter.citizen_nik,
            letter_type: letter.letter_type,
            letter_id: letter.id,
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
            letter_id: letter.id,
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
            letter_id: letter.id,
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
        <AdminLayout title={`Edit & Pertinjau Surat #${letter.id}`}>
            <Head title={`Edit & Pertinjau - ${letter.citizen_name} (#${letter.id})`} />

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
                            <span>ID: <strong className="font-mono text-zinc-800 dark:text-zinc-200">#{letter.id}</strong></span>
                            <button
                                type="button"
                                onClick={() => handleCopy(letter.id)}
                                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                                title="Salin ID"
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
                                            {isKuasa
                                                ? 'Identitas Pihak Pertama (Pemberi Kuasa)'
                                                : (isKematian
                                                    ? 'Identitas Almarhum / Almarhumah (Sesuai KTP / KK)'
                                                    : (isWaliNikah ? 'Identitas Wali Nikah (Sesuai KTP / KK)' : 'Identitas Pemohon (Sesuai KTP / KK)'))}
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
                                                value={form.citizen_name}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_name: e.target.value }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
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
                                                value={form.citizen_nik}
                                                onChange={(e) => setForm((prev) => ({ ...prev, citizen_nik: e.target.value.replace(/[^0-9]/g, '') }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm font-mono tracking-wider text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />
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
                                                value={form.extra_data?.bride_father_name || ''}
                                                onChange={(e) => handleExtraDataChange('bride_father_name', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                            />
                                        </div>
                                    )}

                                    {/* Tempat & Tanggal Lahir */}
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
                                    )}
                                </>
                            )}

                                    {/* Alamat Tempat Tinggal (RT, RW, Desa/Kec/Kab) */}
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
                                    </div>

                                    {/* Khusus Surat Wali Nikah: Status Perkawinan & Hubungan dengan Catin */}
                                    {isWaliNikah && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Status Perkawinan Wali <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    value={form.extra_data?.marital_status || 'Kawin'}
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
                                                    Hubungan Dengan Catin <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Saudara Kandung / Ayah Kandung / Paman"
                                                    value={form.extra_data?.catin_relation || ''}
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
                                            <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                    value={form.extra_data?.grantee_name || ''}
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
                                                    value={form.extra_data?.grantee_nik || ''}
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
                                                <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                        value={form.extra_data?.bride_name || ''}
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
                                                        value={form.extra_data?.bride_nik || ''}
                                                        onChange={(e) => handleExtraDataChange('bride_nik', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-mono"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Tempat & Tanggal Lahir <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Lamongan, 15-07-1999"
                                                        value={form.extra_data?.bride_birth_place_date || ''}
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
                                                        value={form.extra_data?.bride_religion || 'Islam'}
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
                                                    value={form.extra_data?.bride_address || ''}
                                                    onChange={(e) => handleExtraDataChange('bride_address', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* SUBSECTION: DATA CALON MEMPELAI PRIA */}
                                        <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                        value={form.extra_data?.groom_name || ''}
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
                                                        value={form.extra_data?.groom_nik || ''}
                                                        onChange={(e) => handleExtraDataChange('groom_nik', e.target.value)}
                                                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10 font-mono"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                        Tempat & Tanggal Lahir <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Contoh: Blitar, 14-02-1993"
                                                        value={form.extra_data?.groom_birth_place_date || ''}
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
                                                        value={form.extra_data?.groom_religion || 'Islam'}
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
                                                    value={form.extra_data?.groom_address || ''}
                                                    onChange={(e) => handleExtraDataChange('groom_address', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {isKematian && (
                                    <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                {form.extra_data?.death_date && (
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                                        Terpilih: <strong className="text-zinc-800 dark:text-zinc-200">{form.extra_data.death_date}</strong>
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
                                                    value={form.extra_data?.death_cause || 'Karena Sakit'}
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
                                                            className="text-[11px] py-0.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition cursor-pointer font-medium"
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
                                                value={form.extra_data?.death_place || 'Di rumah dan di semayamkan di Desa Karangwungu'}
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
                                            <User className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                    value={form.extra_data?.groom_name || ''}
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
                                                    value={form.extra_data?.groom_father_name || ''}
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
                                                    value={form.extra_data?.groom_birth_place_date || ''}
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
                                                    value={form.extra_data?.groom_occupation || ''}
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
                                                    value={form.extra_data?.groom_nationality || 'Indonesia'}
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
                                                    value={form.extra_data?.groom_religion || 'Islam'}
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
                                                value={form.extra_data?.groom_address || ''}
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
                                                    const isSelected = (form.extra_data?.reason_code || 'a') === reason.code;
                                                    return (
                                                        <div
                                                            key={reason.code}
                                                            onClick={() => handleExtraDataChange('reason_code', reason.code)}
                                                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                                                isSelected
                                                                    ? 'bg-amber-500/10 border-amber-500 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                                                                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="admin_reason_code"
                                                                value={reason.code}
                                                                checked={isSelected}
                                                                onChange={() => handleExtraDataChange('reason_code', reason.code)}
                                                                className="mt-0.5 h-4 w-4 text-amber-600 focus:ring-amber-500 dark:focus:ring-amber-400 border-zinc-300 dark:border-zinc-700"
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

                                        {/* DATA PEJABAT KUA KECAMATAN KARANGGENENG */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Jabatan Pejabat Mengetahui (KUA)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.extra_data?.kua_title || 'Kepala KUA Kecamatan Karanggeneng'}
                                                    onChange={(e) => handleExtraDataChange('kua_title', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Nama Pejabat Kepala KUA
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.extra_data?.kua_name || 'H.MOH KHOIRUL ANAM, M.Ag'}
                                                    onChange={(e) => handleExtraDataChange('kua_name', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* KHUSUS SURAT KETERANGAN DOMISILI USAHA: FORM DATA USAHA & DOMISILI */}
                                {isDomisiliUsaha && (
                                    <div className="space-y-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                    value={form.extra_data?.business_name || ''}
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
                                                    value={form.extra_data?.business_status_desc || 'berpindah Tempat atau Kantor'}
                                                    onChange={(e) => handleExtraDataChange('business_status_desc', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {['berpindah Tempat atau Kantor', 'berdomisili dan beroperasi', 'membuka cabang / unit usaha baru'].map((st, idx) => (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => handleExtraDataChange('business_status_desc', st)}
                                                            className="text-[11px] py-0.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition cursor-pointer font-medium"
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
                                                value={form.extra_data?.business_address || ''}
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
                                                    value={form.extra_data?.stay_status || 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan'}
                                                    onChange={(e) => handleExtraDataChange('stay_status', e.target.value)}
                                                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5">
                                                    Status Perkawinan Pemohon
                                                </label>
                                                <select
                                                    value={form.extra_data?.marital_status || 'Kawin'}
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
                                                value={form.extra_data?.description_text || ''}
                                                onChange={(e) => handleExtraDataChange('description_text', e.target.value)}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                            />
                                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                                                Jika dikosongkan, narasi di surat akan otomatis tercetak: &quot;Orang tersebut diatas benar-benar {form.extra_data?.stay_status || '...'}, dan Pada saat ini Usaha yang di milikinya atau di sebut {form.extra_data?.business_name || '...'} {form.extra_data?.business_status_desc || '...'} Di {form.extra_data?.business_address || '...'} .&quot;
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* SUBSECTION: KEPERLUAN PENGAJUAN SURAT (TIDAK ADA PADA SURAT KEMATIAN) */}
                                {!isKematian && (
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4 text-amber-500 dark:text-amber-400" />
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
                                                {isWaliHakim ? 'Keperluan / Keterangan Surat' : (isDomisiliUsaha ? 'Tujuan / Keperluan Surat Keterangan' : (isKuasa ? 'Surat Kuasa ini kami buat untuk ...' : (isWaliNikah ? 'Catatan Tambahan Surat' : (isKehilangan ? 'Barang / Dokumen yang Hilang' : 'Tujuan / Alasan Pengajuan'))))} <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                placeholder={
                                                    isWaliHakim
                                                        ? 'Contoh: Permohonan pernikahan dengan Wali Hakim di KUA Kecamatan Karanggeneng.'
                                                        : (isDomisiliUsaha
                                                            ? 'Contoh: Persyaratan kelengkapan administrasi perbankan / pembukaan rekening kantor / legalitas perpajakan usaha.'
                                                            : isKuasa
                                                                ? 'Contoh: pengambilan Bantuan Mustahik dari Baznas.'
                                                                : isWaliNikah
                                                                    ? 'Contoh: Menjadi wali nikah calon pengantin wanita an. Dita Yuli Wulandari yang akan menikah dengan Fauzi Indra Wiyanto di KUA Sanankulon Blitar.'
                                                                    : isKehilangan
                                                                        ? `Tuliskan rincian barang/dokumen yang hilang selengkap mungkin.\nContoh:\n- KTP (Kartu Tanda Penduduk) asli a.n. Dodi Setyo Purwanto\n- Buku Nikah No. 123/45/V/2018 a.n. Suami & Istri\n- Kartu ATM Bank BRI a.n. Dodi Setyo Purwanto (hilang di sekitar Pasar Karanggeneng)\n- STNK Sepeda Motor Honda Beat No. Pol: S 1234 ABC a.n. Dodi Setyo Purwanto\n- Buku Tabungan Bank Jatim No. Rekening: 0123456789 a.n. Dodi Setyo Purwanto`
                                                                        : 'Contoh: Persyaratan Pengajuan Keringanan Biaya Pendidikan / Beasiswa Sekolah Putra/Putri.')
                                                }
                                                value={form.purpose}
                                                onChange={(e) => setForm((prev) => ({ ...prev, purpose: e.target.value }))}
                                                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400/60 dark:placeholder-zinc-500/50 transition focus:border-red-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:focus:border-amber-400 dark:focus:ring-amber-400/10"
                                                required
                                            />

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
                                                    Di surat akan tertulis: <em>&quot;Surat Kuasa ini kami buat untuk {form.purpose || '...'}&quot;</em>
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

                                    {isWaliHakim ? (
                                        <div className="relative z-0 text-black leading-relaxed">
                                            {/* JUDUL DAN NOMOR SURAT (PERSIS DOKUMEN FISIK ASLI) */}
                                            <div className="text-center mt-2 mb-2.5">
                                                <h4 className="font-bold underline uppercase text-[10px] sm:text-[11px] tracking-wide text-black mb-0.5">
                                                    SURAT KETERANGAN WALI HAKIM
                                                </h4>
                                                <div className="text-[7.5px] sm:text-[8.5px] text-black">
                                                    Nomor : {form.letter_number?.trim() || `470/38/413.318.15/${currentYear}`}
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
                                                    <span className="col-span-6 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : 'SUSI WANTORO SARI'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">2.</span>
                                                    <span className="col-span-4 font-normal">Binti</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.bride_father_name?.trim() || '................................................................'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">3.</span>
                                                    <span className="col-span-4 font-normal">Tempat/Tgl. Lahir/Umur</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">
                                                        {(() => {
                                                            const bp = form.birth_place?.trim() || 'Lamongan';
                                                            const formatted = formatBirthDatePreview(null, form.birth_date);
                                                            if (formatted && formatted !== '-') return `${bp}, ${formatted}`;
                                                            return `${bp}, 24 Mei 1998`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">4.</span>
                                                    <span className="col-span-4 font-normal">Warga Negara</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">5.</span>
                                                    <span className="col-span-4 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">6.</span>
                                                    <span className="col-span-4 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.occupation || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">7.</span>
                                                    <span className="col-span-4 font-normal align-top">Alamat/Tempat tinggal</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-6 text-justify">
                                                        {form.citizen_address?.trim() || 'Desa Karangwungu RT 002 RW 001 Kec Karanggeneng'}
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
                                                    <span className="col-span-6 font-bold uppercase">{form.extra_data?.groom_name?.trim() ? form.extra_data.groom_name.toUpperCase() : 'MUCHAMMAD DHANIEL IBRAHIM AL THOHIRI'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">2.</span>
                                                    <span className="col-span-4 font-normal">Bin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.groom_father_name?.trim() || 'Moch Tohir'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">3.</span>
                                                    <span className="col-span-4 font-normal">Tempat/Tgl. Lahir/Umur</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.groom_birth_place_date?.trim() || 'Gresik, 28 Maret 1998'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">4.</span>
                                                    <span className="col-span-4 font-normal">Warga Negara</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.groom_nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">5.</span>
                                                    <span className="col-span-4 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.groom_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">6.</span>
                                                    <span className="col-span-4 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-6">{form.extra_data?.groom_occupation || 'Karyawan Swasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5">
                                                    <span className="col-span-1">7.</span>
                                                    <span className="col-span-4 font-normal align-top">Alamat/Tempat tinggal</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-6 text-justify">{form.extra_data?.groom_address?.trim() || 'RT 005 RW 003 Indro Kebomas Gresik'}</span>
                                                </div>
                                            </div>

                                            {/* KLAUSUL ALASAN WALI HAKIM (A - F) */}
                                            <p className="text-[7px] sm:text-[7.8px] mt-2 mb-1 text-black">
                                                Adalah dengan <strong>WALI HAKIM</strong> karena :
                                            </p>

                                            <div className="ml-2 mb-2 space-y-0.5 text-[6.8px] sm:text-[7.5px] text-black">
                                                {WALI_HAKIM_REASONS.map((r) => {
                                                    const isSelected = (form.extra_data?.reason_code || 'a') === r.code;
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
                                                    <div>{form.extra_data?.kua_title || 'Kepala KUA Kecamatan Karanggeneng'}</div>
                                                    <div className="h-9 sm:h-11"></div>
                                                    <div className="font-bold underline uppercase">{form.extra_data?.kua_name || 'H.MOH KHOIRUL ANAM, M.Ag'}</div>
                                                </div>
                                                <div>
                                                    <div>Lamongan. {formatLetterDatePreview(form.letter_date)}</div>
                                                    <div>Kepala Desa /Lurah:</div>
                                                    <div className="h-9 sm:h-11"></div>
                                                    <div className="font-bold underline uppercase">{kades_name || 'SUNARTO'}</div>
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
                                                    NOMOR: {form.letter_number?.trim() || `470 / 60 / 413.318.15 / ${currentYear}`}
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
                                                    <span className="col-span-8 sm:col-span-8.5 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : 'SITI MUSLIMAH'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 font-mono">{form.citizen_nik?.trim() || '3523176412860003'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{form.gender || 'Perempuan'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">T T L</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">
                                                        {(() => {
                                                            const bPlace = form.birth_place?.trim() || 'Tuban';
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
                                                    <span className="col-span-8 sm:col-span-8.5">{form.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Kwarganegaraan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{form.extra_data?.nationality || 'Indonesia'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Status</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{form.extra_data?.marital_status || 'Kawin'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5">{form.occupation || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 text-justify">
                                                        {form.citizen_address?.trim() || 'Dsn Sundulan RT/RW 002/004 Desa Sumberagung Kec Plumpang Kab Tuban.'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1 pt-0.5">
                                                    <span className="col-span-3 sm:col-span-2.5 font-normal align-top">Keterangan</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-8.5 text-justify leading-relaxed">
                                                        {form.extra_data?.description_text?.trim() ? (
                                                            form.extra_data.description_text.trim()
                                                        ) : (
                                                            <>
                                                                Orang tersebut diatas benar-benar {form.extra_data?.stay_status || 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan'}, dan Pada saat ini Usaha yang di milikinya atau di sebut <strong className="font-bold uppercase">{form.extra_data?.business_name || 'PT LIMAN JAYA GRESIK'}</strong> {form.extra_data?.business_status_desc || 'berpindah Tempat atau Kantor'} Di {form.extra_data?.business_address || 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan'} .
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
                                                    <div>Karangwungu, {formatLetterDate(form.letter_date)}</div>
                                                    <div className="font-bold uppercase mt-0.5">{kades_title || 'KEPALA DESA KARANGWUNGU'}</div>
                                                    <div className="h-10 sm:h-12"></div>
                                                    <div className="font-bold underline uppercase">{kades_name || 'H. SUNARTO'}</div>
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
                                                    <span className="col-span-8 sm:col-span-9 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : 'RAMITEN'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-mono">{form.citizen_nik?.trim() || '3524184101780001'}</span>
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
                                                            if (form.citizen_address?.trim()) return form.citizen_address.trim();
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
                                                    <span className="col-span-8 sm:col-span-9 font-bold uppercase">{form.extra_data?.grantee_name?.trim() ? form.extra_data.grantee_name.toUpperCase() : 'AINUN NAJIB'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-8 sm:col-span-9 font-mono">{form.extra_data?.grantee_nik?.trim() || '6402132707970007'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-3 sm:col-span-2 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-8 sm:col-span-9">
                                                        {(() => {
                                                            const rtPad = granteeRt?.trim() ? (/^\d+$/.test(granteeRt.trim()) ? granteeRt.trim().padStart(3, '0') : granteeRt.trim()) : '';
                                                            const rwPad = granteeRw?.trim() ? (/^\d+$/.test(granteeRw.trim()) ? granteeRw.trim().padStart(3, '0') : granteeRw.trim()) : '';
                                                            if (rtPad && rwPad) return `Desa Karangwungu RT/RW: ${rtPad}/${rwPad} Kecamatan Karanggeneng, Kabupaten Lamongan.`;
                                                            if (form.extra_data?.grantee_address?.trim()) return form.extra_data.grantee_address.trim();
                                                            return 'Desa Karangwungu RT/RW: 007/001 Kecamatan Karanggeneng, Kabupaten Lamongan.';
                                                        })()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* KALIMAT TUJUAN KUASA */}
                                            <p className="text-[6.8px] sm:text-[7.8px] indent-6 sm:indent-8 my-3 text-black leading-relaxed">
                                                Surat Kuasa ini kami buat untuk {form.purpose?.trim() || 'pengambilan Bantuan Mustahik dari Baznas.'}
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
                                                    <p className="font-bold underline uppercase">{form.extra_data?.grantee_name?.trim() ? form.extra_data.grantee_name.toUpperCase() : 'AINUN NAJIB'}</p>
                                                </div>
                                                <div>
                                                    <p>Pemberi Kuasa</p>
                                                    <div className="h-10 sm:h-12 flex flex-col items-center justify-center">
                                                        <span className="text-[5px] px-1 py-0.5 border border-dashed border-zinc-400 text-zinc-500 rounded-xs font-sans">
                                                            Materai Rp 10.000
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : 'RAMITEN'}</p>
                                                </div>
                                            </div>

                                            {/* TANDA TANGAN MENGETAHUI KADES */}
                                            <div className="text-center text-[6.8px] sm:text-[7.8px] text-black pt-1">
                                                <p>Mengetahui</p>
                                                <p className="font-semibold">{kades_title || 'Kepala Desa Karangwungu'}</p>
                                                <div className="h-10 sm:h-12 flex items-center justify-center">
                                                    <span className="text-[5px] text-zinc-400 font-sans italic">(Tanda Tangan & Stempel)</span>
                                                </div>
                                                <p className="font-bold underline uppercase">{kades_name || 'SUNARTO'}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
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
                                            {isKematian ? 'SURAT KETERANGAN KEMATIAN' : (isWaliNikah ? 'SURAT KETERANGAN WALI NIKAH' : (isKehilangan ? 'SURAT KETERANGAN KEHILANGAN' : (letter.letter_type?.toUpperCase() || 'SURAT KETERANGAN TIDAK MAMPU')))}
                                        </h4>
                                        <p className="text-[6.5px] sm:text-[7px] text-black mt-0.5">
                                            {isKematian ? 'NOMOR: ' : 'Nomor : '}{form.letter_number || (isKematian ? `141 / 001 / 413.318.15 / ${currentYear}` : `... / ... / ... / ${currentYear}`)}
                                        </p>
                                    </div>

                                    {isKematian ? (
                                        <>
                                            {/* PARAGRAF PEMBUKA SESUAI FORMAT FOTO FISIK DESA KARANGWUNGU */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black mb-1.5 relative z-0 leading-relaxed text-justify">
                                                Yang bertandatangan dibawah ini, Kepala Desa Karangwungu, Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan bahwa,
                                            </p>

                                            {/* TABEL DATA ALMARHUM / ALMARHUMAH */}
                                            <div className="ml-2 sm:ml-2.5 mb-2 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.gender || 'Perempuan'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat Taggal Lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = form.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatBirthDatePreview(null, form.birth_date);
                                                            if (formattedDate && formattedDate !== '-') return `${bp},${formattedDate}`;
                                                            return `${bp}, 10-02-1972`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {form.citizen_address?.trim() || 'Desa Karangwungu Rt 004 Rw 001 kec.Karanggeneng Kab Lamongan'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* TELAH MENINGGAL DUNIA PADA */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black mb-1.5 mt-2 relative z-0 font-normal">
                                                Telah Meninggal Dunia pada :
                                            </p>

                                            {/* TABEL RINCIAN KEMATIAN */}
                                            <div className="ml-2 sm:ml-2.5 mb-2 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tanggal</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.death_date || '16/07/2022'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Sebab Kematian</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold underline">{form.extra_data?.death_cause || 'Karena Sakit'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Tempat Kematian</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {form.extra_data?.death_place || 'Di rumah dan di semayamkan di Desa Karangwungu'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify my-2 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.
                                            </p>

                                            {/* TANDA TANGAN TUNGGAL KEPALA DESA */}
                                            <div className="flex items-end justify-end pt-3 relative z-0">
                                                <div className="text-center text-[6.5px] sm:text-[7px] text-black leading-snug min-w-[120px]">
                                                    <p className="underline decoration-1 underline-offset-2">Karangwungu, {formatLetterDatePreview(form.letter_date)}</p>
                                                    <p className="mt-1">Kepala Desa Karangwungu</p>
                                                    <div className="h-14 sm:h-16 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">{kades_name}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : isWaliNikah ? (
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
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase underline">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{form.citizen_nik?.trim() || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = form.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatBirthDatePreview(null, form.birth_date);
                                                            if (formattedDate && formattedDate !== '-') return `${bp}, ${formattedDate}`;
                                                            return `${bp}, ...`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Jenis Kelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.gender || 'Laki-laki'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Status Perkawinan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.marital_status || 'Kawin'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {form.citizen_address?.trim() || '...'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Hubungan Dengan Catin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.catin_relation || 'Saudara Kandung'}</span>
                                                </div>
                                            </div>

                                            {/* SUBJUDUL KETERANGAN */}
                                            <div className="text-center my-1 relative z-0">
                                                <span className="font-bold underline uppercase text-[7px] sm:text-[7.5px] tracking-wide text-black">
                                                    KETERANGAN
                                                </span>
                                            </div>

                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify mb-1 leading-relaxed relative z-0">
                                                Bahwa orang tersebut diatas benar-benar warga Desa Karangwungu {(() => {
                                                    const match = (form.citizen_address || '').match(/(RT\s*[:.\s]?\s*\d+\s*RW\s*[:.\s]?\s*\d+)/i);
                                                    return match ? match[1] : (addressRt && addressRw ? `Rt. ${addressRt.padStart(3, '0')} Rw. ${addressRw.padStart(3, '0')}` : 'Rt. 001 Rw. 001');
                                                })()} Kec. Karanggeneng Kab. Lamongan dan akan menjadi Wali Nikah seorang yang bernama :
                                            </p>

                                            {/* TABEL BIODATA CATIN WANITA */}
                                            <div className="ml-2 sm:ml-2.5 mb-1 text-[6.5px] sm:text-[7px] text-black space-y-0.5 leading-snug relative z-0">
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Nama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{form.extra_data?.bride_name?.trim() ? form.extra_data.bride_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono">{form.extra_data?.bride_nik || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.bride_birth_place_date || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.bride_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.bride_address || '...'}</span>
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
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{form.extra_data?.groom_name?.trim() ? form.extra_data.groom_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono">{form.extra_data?.groom_nik || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Tempat tanggal lahir</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.groom_birth_place_date || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.groom_religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.extra_data?.groom_address || '...'}</span>
                                                </div>
                                            </div>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-4 my-1 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini di buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.
                                            </p>

                                            {/* DUA KOLOM TANDA TANGAN */}
                                            <div className="grid grid-cols-2 pt-1 gap-2 relative z-0 text-black text-[6.5px] sm:text-[7px] leading-snug">
                                                <div className="text-center">
                                                    <p className="invisible">Karangwungu, {formatLetterDatePreview(form.letter_date)}</p>
                                                    <p className="mt-0.5">Pemohon</p>
                                                    <div className="h-10 sm:h-12 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[6.5px] sm:text-[7px]">{form.citizen_name || '...'}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p>Karangwungu, {formatLetterDatePreview(form.letter_date)}</p>
                                                    <p className="font-semibold mt-0.5">Kepala Desa Karangwungu</p>
                                                    <div className="h-10 sm:h-12 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[6.5px] sm:text-[7px]">{kades_name}</p>
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
                                                    <span className="col-span-7 sm:col-span-8 font-bold uppercase">{form.citizen_name?.trim() ? form.citizen_name.toUpperCase() : '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">JenisKelamin</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.gender || 'Laki-laki'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">TTL</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {(() => {
                                                            const bp = form.birth_place?.trim() || 'Lamongan';
                                                            const formattedDate = formatBirthDatePreview(null, form.birth_date);
                                                            if (formattedDate && formattedDate !== '-') return `${bp}, ${formattedDate}`;
                                                            return `${bp}, ...`;
                                                        })()}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Agama</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.religion || 'Islam'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Kwarganegaraan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">Indonesia</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">Pekerjaan</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8">{form.occupation?.trim() || 'Wiraswasta'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal">NIK</span>
                                                    <span className="col-span-1 text-center">:</span>
                                                    <span className="col-span-7 sm:col-span-8 font-mono tracking-wide">{form.citizen_nik?.trim() || '...'}</span>
                                                </div>
                                                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                                                    <span className="col-span-4 sm:col-span-3 font-normal align-top">Alamat</span>
                                                    <span className="col-span-1 text-center align-top">:</span>
                                                    <span className="col-span-7 sm:col-span-8">
                                                        {form.citizen_address?.trim() || '...'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* PARAGRAF KETERANGAN KEHILANGAN */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify my-2 leading-relaxed relative z-0">
                                                Nama tersebut diatas adalah benar bahwa warga Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan. Dengan ini menerangkan bahwa yang bersangkutan telah kehilangan berupa <strong className="font-bold">{form.purpose?.trim() ? form.purpose.toUpperCase() : 'KTP (KARTU TANDA PENDUDUK)'}</strong>
                                            </p>

                                            {/* PARAGRAF PENUTUP */}
                                            <p className="text-[6.5px] sm:text-[7px] text-black text-justify indent-4 my-1.5 leading-relaxed relative z-0">
                                                Demikian Surat Keterangan ini dibuat dengan sebenarnya. Sesuai dengan keadaan sekarang untuk dipergunakan sebagai manamestinya.
                                            </p>

                                            {/* TANDA TANGAN KADES KEHILANGAN */}
                                            <div className="flex items-end justify-end pt-1 gap-2 relative z-0">
                                                <div className="text-center text-[6.5px] sm:text-[7px] text-black leading-snug min-w-[110px]">
                                                    <p>Karangwungu, {formatLetterDatePreview(form.letter_date)}</p>
                                                    <p className="font-bold uppercase mt-0.5">KEPALA DESA KARANGWUNGU</p>
                                                    <div className="h-14 sm:h-16 flex items-center justify-center">
                                                        <span className="text-[5px] text-zinc-400 font-sans italic">
                                                            (Tanda Tangan & Stempel)
                                                        </span>
                                                    </div>
                                                    <p className="font-bold underline uppercase text-[7px] sm:text-[7.5px]">{kades_name}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* SEKSI 1: PEJABAT PENANDATANGAN (SKTM) */}
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

                                            {/* SEKSI 2: DATA PEMOHON (SKTM) */}
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

                                            {/* TANDA TANGAN KADES (SKTM) */}
                                            <div className="flex items-end justify-end pt-1 gap-2 relative z-0">
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
                                        </>
                                    )}
                                </>
                            )}
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
                                Apakah permohonan surat atas nama <strong className="text-zinc-900 dark:text-white">{form.citizen_name}</strong> (ID: <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">#{letter.id}</span>) sudah selesai diverifikasi dan siap diambil di Balai Desa?
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
                                Permohonan atas nama <strong className="text-zinc-900 dark:text-white">{form.citizen_name}</strong> (ID: <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">#{letter.id}</span>) akan dialihkan ke status <strong>Ditolak</strong>.
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                                💡 Berkas yang ditolak akan tersimpan selama 7 hari sebelum dihapus permanen otomatis oleh sistem, atau dapat dipulihkan sewaktu-waktu.
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                Alasan / Catatan Penolakan:
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
                                Apakah Anda yakin ingin menghapus permanen permohonan surat ID{' '}
                                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                                    #{letter.id}
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
