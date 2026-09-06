<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $title ?? 'Surat Keterangan Wali Hakim' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 22mm 20mm 22mm;
        }

        body {
            font-family: 'Times New Roman', Times, Georgia, serif;
            font-size: 11.5pt;
            line-height: 1.4;
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
            margin-bottom: 18px;
            margin-top: 5px;
        }

        .letter-title {
            font-size: 13pt;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 0.5px;
            margin: 0 0 4px 0;
            padding: 0;
            text-transform: uppercase;
        }

        .letter-number {
            font-size: 11pt;
            font-weight: normal;
            margin: 0;
            padding: 0;
        }

        .divider-line {
            border-top: 0.75px solid #000000;
            margin-top: 6px;
            margin-bottom: 16px;
        }

        p {
            margin: 0 0 8px 0;
            line-height: 1.4;
            font-size: 11.5pt;
        }

        .opening-text {
            text-align: justify;
            margin-bottom: 8px;
            line-height: 1.35;
        }

        /* Tabel Biodata */
        .bio-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 0;
            margin-bottom: 10px;
        }

        .bio-table td {
            padding: 2.5px 0;
            vertical-align: top;
            font-size: 11.5pt;
            line-height: 1.35;
        }

        .bio-table td.num-col {
            width: 25px;
            text-align: left;
        }

        .bio-table td.label-col {
            width: 175px;
        }

        .bio-table td.separator-col {
            width: 18px;
            text-align: left;
        }

        .bio-table td.val-col {
            width: auto;
            text-align: justify;
        }

        .connect-text {
            margin-top: 6px;
            margin-bottom: 6px;
            line-height: 1.35;
        }

        .reason-header {
            margin-top: 8px;
            margin-bottom: 6px;
            font-size: 11.5pt;
        }

        .reason-list {
            margin: 0 0 14px 22px;
            padding: 0;
            list-style-type: none;
        }

        .reason-item {
            margin-bottom: 2.5px;
            font-size: 11.5pt;
            line-height: 1.3;
        }

        .reason-code {
            display: inline-block;
            width: 24px;
        }

        .reason-chosen {
            font-weight: bold;
        }

        .circle-mark {
            display: inline-block;
            border: 1.5px solid #000000;
            border-radius: 50%;
            padding: 0 4px;
            margin-right: 2px;
            font-weight: bold;
        }

        .closing-text {
            margin-top: 10px;
            margin-bottom: 25px;
            line-height: 1.4;
            text-align: justify;
        }

        /* Tanda Tangan 2 Kolom */
        .sig-container {
            width: 100%;
            margin-top: 20px;
        }

        .sig-col-left {
            float: left;
            width: 48%;
            text-align: center;
            font-size: 11.5pt;
            line-height: 1.3;
        }

        .sig-col-right {
            float: right;
            width: 48%;
            text-align: center;
            font-size: 11.5pt;
            line-height: 1.3;
        }

        .sig-space {
            height: 65px;
        }

        .sig-name {
            font-weight: bold;
            text-decoration: underline;
        }

        .clear {
            clear: both;
        }

        /* Catatan Keterangan Bawah */
        .note-section {
            margin-top: 35px;
            font-size: 11pt;
            line-height: 1.3;
        }

        .note-title {
            font-weight: bold;
            text-decoration: underline;
            margin-bottom: 2px;
        }
    </style>
</head>
<body>

    <!-- JUDUL DAN NOMOR SURAT (SESUAI DOKUMEN FISIK ASLI) -->
    <div class="title-section">
        <div class="letter-title">SURAT KETERANGAN WALI HAKIM</div>
        <div class="letter-number">Nomor : {{ $letter_number ?? ('470 / 38 / 413.318.15 / ' . date('Y')) }}</div>
        <div class="divider-line"></div>
    </div>

    <!-- KALIMAT PEMBUKA -->
    <p class="opening-text">
        Yang bertanda tangan di bawah ini, Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa seorang Perempuan :
    </p>

    <!-- DATA CALON PENGANTIN WANITA (PEREMPUAN) -->
    <table class="bio-table">
        <tr>
            <td class="num-col">1.</td>
            <td class="label-col">N a m a</td>
            <td class="separator-col">:</td>
            <td class="val-col font-bold">{{ $bride_name ?? 'Susi Wantoro Sari' }}</td>
        </tr>
        <tr>
            <td class="num-col">2.</td>
            <td class="label-col">Binti</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_father_name ?? '................................................................' }}</td>
        </tr>
        <tr>
            <td class="num-col">3.</td>
            <td class="label-col">Tempat/Tgl. Lahir/Umur</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_birth_place_date ?? 'Lamongan, 24 Mei 1998' }}</td>
        </tr>
        <tr>
            <td class="num-col">4.</td>
            <td class="label-col">Warga Negara</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_nationality ?? 'Indonesia' }}</td>
        </tr>
        <tr>
            <td class="num-col">5.</td>
            <td class="label-col">Agama</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="num-col">6.</td>
            <td class="label-col">Pekerjaan</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_occupation ?? 'Wiraswasta' }}</td>
        </tr>
        <tr>
            <td class="num-col">7.</td>
            <td class="label-col">Alamat/Tempat tinggal</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $bride_address ?? 'Desa Karangwungu RT 002 RW 001 Kec Karanggeneng' }}</td>
        </tr>
    </table>

    <!-- KALIMAT PENGHUBUNG -->
    <p class="connect-text">
        Yang akan dinikah oleh seorang laki-laki bernama :
    </p>

    <!-- DATA CALON PENGANTIN PRIA (LAKI-LAKI) -->
    <table class="bio-table">
        <tr>
            <td class="num-col">1.</td>
            <td class="label-col">N a m a</td>
            <td class="separator-col">:</td>
            <td class="val-col font-bold">{{ $groom_name ?? 'Muchammad Dhaniel Ibrahim Al Thohiri' }}</td>
        </tr>
        <tr>
            <td class="num-col">2.</td>
            <td class="label-col">Bin</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_father_name ?? 'Moch Tohir' }}</td>
        </tr>
        <tr>
            <td class="num-col">3.</td>
            <td class="label-col">Tempat/Tgl. Lahir/Umur</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_birth_place_date ?? 'Gresik, 28 Maret 1998' }}</td>
        </tr>
        <tr>
            <td class="num-col">4.</td>
            <td class="label-col">Warga Negara</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_nationality ?? 'Indonesia' }}</td>
        </tr>
        <tr>
            <td class="num-col">5.</td>
            <td class="label-col">Agama</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="num-col">6.</td>
            <td class="label-col">Pekerjaan</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_occupation ?? 'Karyawan Swasta' }}</td>
        </tr>
        <tr>
            <td class="num-col">7.</td>
            <td class="label-col">Alamat/Tempat tinggal</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $groom_address ?? 'RT 005 RW 003 Indro Kebomas Gresik' }}</td>
        </tr>
    </table>

    <!-- KLAUSUL ALASAN WALI HAKIM -->
    @php
        $selectedReason = strtolower($reason_code ?? 'a');
    @endphp
    <p class="reason-header">
        Adalah dengan <strong>WALI HAKIM</strong> karena :
    </p>

    <div class="reason-list">
        <div class="reason-item {{ in_array($selectedReason, ['a', 'wali nasab tidak ada']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['a', 'wali nasab tidak ada']))
                    <span class="circle-mark">a.</span>
                @else
                    a.
                @endif
            </span>
            Wali Nasab tidak ada
        </div>
        <div class="reason-item {{ in_array($selectedReason, ['b', 'walinya adhol', 'adhol']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['b', 'walinya adhol', 'adhol']))
                    <span class="circle-mark">b.</span>
                @else
                    b.
                @endif
            </span>
            Walinya adhol
        </div>
        <div class="reason-item {{ in_array($selectedReason, ['c', 'walinya tidak diketahui keberadaanya', 'tidak diketahui']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['c', 'walinya tidak diketahui keberadaanya', 'tidak diketahui']))
                    <span class="circle-mark">c.</span>
                @else
                    c.
                @endif
            </span>
            Walinya tidak diketahui keberadaanya
        </div>
        <div class="reason-item {{ in_array($selectedReason, ['d', 'dipenjara']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['d', 'dipenjara']))
                    <span class="circle-mark">d.</span>
                @else
                    d.
                @endif
            </span>
            Walinya tidak dapat dihadirkan /ditemui karena dipenjara
        </div>
        <div class="reason-item {{ in_array($selectedReason, ['e', 'beda agama', 'bukan islam']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['e', 'beda agama', 'bukan islam']))
                    <span class="circle-mark">e.</span>
                @else
                    e.
                @endif
            </span>
            Wali nasab tidak ada yang beragama islam
        </div>
        <div class="reason-item {{ in_array($selectedReason, ['f', 'pengantin itu sendiri']) ? 'reason-chosen' : '' }}">
            <span class="reason-code">
                @if(in_array($selectedReason, ['f', 'pengantin itu sendiri']))
                    <span class="circle-mark">f.</span>
                @else
                    f.
                @endif
            </span>
            Wali yang akan menikahkan menjadi pengantin itu sendiri
        </div>
    </div>

    <!-- KALIMAT PENUTUP -->
    <p class="closing-text">
        Demikian Surat Keterangan ini kami buat dengan sebenarnya dan dapat digunakan dimana perlu.
    </p>

    <!-- TANDA TANGAN DUA PIHAK (KUA & KADES) -->
    <div class="sig-container">
        <div class="sig-col-left">
            <div>Mengetahui</div>
            <div>&nbsp;</div>
            <div>{{ $kua_title ?? 'Kepala KUA Kecamatan Karanggeneng' }}</div>
            <div class="sig-space"></div>
            <div class="sig-name">{{ $kua_name ?? 'H.MOH KHOIRUL ANAM, M.Ag' }}</div>
        </div>

        <div class="sig-col-right">
            <div>Lamongan. {{ $letter_date ?? '16 Maret 2026' }}</div>
            <div>&nbsp;</div>
            <div>Kepala Desa /Lurah:</div>
            <div class="sig-space"></div>
            <div class="sig-name">{{ $kades_name ?? 'SUNARTO' }}</div>
        </div>

        <div class="clear"></div>
    </div>

    <!-- KETERANGAN BAWAH -->
    <div class="note-section">
        <div class="note-title">KETERANGAN :</div>
        <div>Yang dimaksud, harap dilingkari (O)\</div>
    </div>

</body>
</html>
