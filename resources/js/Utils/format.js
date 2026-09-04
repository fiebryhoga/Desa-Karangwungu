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
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export function truncateText(text, length = 120) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}
