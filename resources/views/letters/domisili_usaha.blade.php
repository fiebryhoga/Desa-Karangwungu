<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $title ?? 'Surat Keterangan Domisili Usaha' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 22mm 22mm 20mm 22mm;
        }

        body {
            font-family: 'Times New Roman', Times, Georgia, serif;
            font-size: 12pt;
            line-height: 1.45;
            color: #000000;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }

        .text-center { text-align: center; }
        .text-justify { text-align: justify; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .underline { text-decoration: underline; }

        /* Judul Dokumen & Nomor Surat */
        .title-section {
            text-align: center;
            margin-bottom: 24px;
            margin-top: 5px;
        }

        .letter-title {
            font-size: 13.5pt;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 0.5px;
            margin: 0 0 4px 0;
            padding: 0;
            text-transform: uppercase;
        }

        .letter-number {
            font-size: 11.5pt;
            font-weight: normal;
            margin: 0;
            padding: 0;
        }

        .divider-line {
            border-top: 0.75px solid #000000;
            margin-top: 6px;
            margin-bottom: 20px;
        }

        /* Paragraf Pembuka & Penutup */
        p {
            margin: 0 0 10px 0;
            line-height: 1.45;
            font-size: 12pt;
        }

        .opening-text {
            text-align: justify;
            margin-bottom: 14px;
            line-height: 1.4;
        }

        /* Tabel Biodata Pemohon & Keterangan Domisili Usaha */
        .bio-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 0;
            margin-bottom: 16px;
        }

        .bio-table td {
            padding: 3.5px 0;
            vertical-align: top;
            font-size: 12pt;
            line-height: 1.4;
        }

        .bio-table td.label-col {
            width: 140px;
        }

        .bio-table td.separator-col {
            width: 25px;
            text-align: center;
        }

        .bio-table td.val-col {
            width: auto;
            text-align: justify;
        }

        .closing-text {
            margin-top: 14px;
            margin-bottom: 30px;
            line-height: 1.45;
            text-align: justify;
            text-indent: 40px;
        }

        /* Tanda Tangan */
        .sig-container {
            width: 100%;
            margin-top: 25px;
        }

        .sig-box {
            float: right;
            width: 260px;
            text-align: center;
            font-size: 12pt;
            line-height: 1.35;
        }

        .sig-space {
            height: 65px;
        }

        .sig-name {
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
        }

        .clear {
            clear: both;
        }

        .footer-note {
            position: fixed;
            bottom: 5mm;
            left: 22mm;
            right: 22mm;
            font-size: 8pt;
            color: #888888;
            font-family: Arial, sans-serif;
            border-top: 1px dotted #ccc;
            padding-top: 4px;
        }
    </style>
</head>
<body>

    <!-- JUDUL DAN NOMOR SURAT (SESUAI DOKUMEN FISIK ASLI) -->
    <div class="title-section">
        <div class="letter-title">SURAT KETERANGAN DOMISILI USAHA</div>
        <div class="letter-number">NOMOR: {{ $letter_number ?? ('470 / 60 / 413.318.15 / ' . date('Y')) }}</div>
        <div class="divider-line"></div>
    </div>

    <!-- KALIMAT PEMBUKA -->
    <p class="opening-text">
        Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa :
    </p>

    <!-- TABEL BIODATA PEMOHON & KETERANGAN DOMISILI USAHA -->
    <table class="bio-table">
        <tr>
            <td class="label-col">Nama</td>
            <td class="separator-col">:</td>
            <td class="val-col uppercase font-bold">{{ $citizen_name ?? 'SITI MUSLIMAH' }}</td>
        </tr>
        <tr>
            <td class="label-col">NIK</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $citizen_nik ?? '3523176412860003' }}</td>
        </tr>
        <tr>
            <td class="label-col">JenisKelamin</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $gender ?? 'Perempuan' }}</td>
        </tr>
        <tr>
            <td class="label-col">T T L</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $birth_place_date ?? 'Tuban, 24-10-1987' }}</td>
        </tr>
        <tr>
            <td class="label-col">Agama</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="label-col">Kwarganegaraan</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $nationality ?? 'Indonesia' }}</td>
        </tr>
        <tr>
            <td class="label-col">Status</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $marital_status ?? 'Kawin' }}</td>
        </tr>
        <tr>
            <td class="label-col">Pekerjaan</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $occupation ?? 'Wiraswasta' }}</td>
        </tr>
        <tr>
            <td class="label-col">Alamat</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $citizen_address ?? 'Dsn Sundulan RT/RW 002/004 Desa Sumberagung Kec Plumpang Kab Tuban.' }}</td>
        </tr>
        <tr>
            <td class="label-col">Keterangan</td>
            <td class="separator-col">:</td>
            <td class="val-col">
                @if(!empty($description_text))
                    {{ $description_text }}
                @else
                    Orang tersebut diatas benar-benar {{ $stay_status ?? 'Tinggal Di Desa Karangwungu Kec Karanggeneng Kab Lamongan' }}, dan Pada saat ini Usaha yang di milikinya atau di sebut <strong class="font-bold uppercase">{{ $business_name ?? 'PT LIMAN JAYA GRESIK' }}</strong> {{ $business_status_desc ?? 'berpindah Tempat atau Kantor' }} Di {{ $business_address ?? 'Jalan raya Sumberwudi-Maduran Rt 007 Rw 001 Desa Karangwungu Kec Karanggeneng Kab Lamongan' }} .
                @endif
            </td>
        </tr>
    </table>

    <!-- KALIMAT PENUTUP -->
    <p class="closing-text">
        Demikian Surat Keterangan ini dibuat dengan sebenarnya .Sesuai dengan keadaan sekarang untuk dipergunakan sebagaimana mestinya.
    </p>

    <!-- TANDA TANGAN KEPALA DESA -->
    <div class="sig-container">
        <div class="sig-box">
            <div>Karangwungu, {{ $letter_date ?? '25 Februari 2026' }}</div>
            <div class="font-bold" style="text-transform: uppercase; margin-top: 2px;">{{ $kades_title ?? 'KEPALA DESA KARANGWUNGU' }}</div>
            <div class="sig-space"></div>
            <div class="sig-name">{{ $kades_name ?? 'H. SUNARTO' }}</div>
        </div>
        <div class="clear"></div>
    </div>

    @if(!empty($tracking_code))
    <div class="footer-note">
        Dokumen resmi Pelayanan Mandiri Desa Karangwungu | Kode Tracking: <strong>{{ $tracking_code }}</strong> | Dicetak pada: {{ $printed_at ?? date('d-m-Y H:i') }}
    </div>
    @endif

</body>
</html>
