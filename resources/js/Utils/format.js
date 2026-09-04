export function formatRupiah(number) {
    if (number === null || number === undefined) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
}

export function formatNumberDots(value) {
    if (value === '' || value === null || value === undefined) return '';
    const cleanDigits = String(value).replace(/\D/g, '');
    if (!cleanDigits) return '';
    return cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function parseNumberDots(value) {
    if (value === '' || value === null || value === undefined) return '';
    return String(value).replace(/\D/g, '');
}


export function formatDateIndo(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
    }).format(date);
}

export function formatIndoDateTime(dateStr) {
    if (!dateStr) return '-';
    if (typeof dateStr === 'string' && dateStr.includes('jam')) return dateStr;

    let d;
    if (typeof dateStr === 'string') {
        const safeStr = dateStr.includes('T') ? dateStr : dateStr.replace(' ', 'T');
        d = new Date(safeStr);
    } else {
        d = new Date(dateStr);
    }
    if (isNaN(d.getTime())) return dateStr;

    const formatter = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const parts = formatter.formatToParts(d);
    const getPart = (type) => parts.find((p) => p.type === type)?.value || '';

    const weekday = getPart('weekday');
    const day = getPart('day');
    const month = getPart('month');
    const hour = getPart('hour');
    const minute = getPart('minute');

    return `${weekday}, ${day} ${month} jam ${hour}:${minute}`;
}

export function getIndoDateTimeLocalNow() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const getPart = (type) => parts.find((p) => p.type === type)?.value || '';
    return `${getPart('year')}-${getPart('month')}-${getPart('day')}T${getPart('hour')}:${getPart('minute')}`;
}

export function truncateText(text, length = 120) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}
