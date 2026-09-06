<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ $title ?? 'Surat Kuasa' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 20mm 20mm 20mm;
        }

        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
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

        /* Judul Dokumen */
        .title-section {
            text-align: center;
            margin-bottom: 24px;
            margin-top: 10px;
        }

        .letter-title {
            font-size: 14pt;
            font-weight: bold;
            text-decoration: underline;
            letter-spacing: 1.5px;
            margin: 0;
            padding: 0;
            text-transform: uppercase;
        }

        /* Content Paragraphs */
        p {
            margin: 0 0 10px 0;
            line-height: 1.5;
        }

        .party-title {
            font-weight: normal;
            margin-top: 12px;
            margin-bottom: 6px;
        }

        /* Biodata Table */
        .bio-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 0;
            margin-bottom: 12px;
        }

        .bio-table td {
            padding: 3px 0;
            vertical-align: top;
            font-size: 12pt;
            line-height: 1.4;
        }

        .bio-table td.label-col {
            width: 130px;
        }

        .bio-table td.separator-col {
            width: 25px;
            text-align: center;
        }

        .bio-table td.val-col {
            width: auto;
        }

        .give-power-text {
            margin-top: 14px;
            margin-bottom: 14px;
            text-indent: 40px;
        }

        .purpose-text {
            margin-top: 16px;
            margin-bottom: 12px;
            line-height: 1.5;
            text-align: justify;
            text-indent: 40px;
        }

        .closing-text {
            margin-top: 12px;
            margin-bottom: 30px;
            line-height: 1.5;
            text-align: justify;
        }

        /* Signatures Section */
        .sig-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .sig-table td {
            vertical-align: top;
            text-align: center;
            font-size: 12pt;
            line-height: 1.3;
        }

        .sig-space {
            height: 65px;
        }

        .materai-box {
            display: inline-block;
            border: 1px dashed #999;
            padding: 4px 8px;
            font-size: 8pt;
            color: #777;
            border-radius: 4px;
            margin-top: 10px;
        }

        .sig-name {
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
        }

        .know-section {
            width: 100%;
            text-align: center;
            margin-top: 25px;
        }

        .know-title {
            font-size: 12pt;
            margin-bottom: 2px;
        }

        .know-kades {
            font-size: 12pt;
            margin-bottom: 0;
        }

        .footer-note {
            position: fixed;
            bottom: 5mm;
            left: 20mm;
            right: 20mm;
            font-size: 8pt;
            color: #888888;
            font-family: Arial, sans-serif;
            border-top: 1px dotted #ccc;
            padding-top: 4px;
        }
    </style>
</head>
<body>

    <!-- JUDUL SURAT -->
    <div class="title-section">
        <div class="letter-title">SURAT KUASA</div>
    </div>

    <!-- KALIMAT PEMBUKA -->
    <p>Yang bertanda tangan di bawah ini :</p>

    <!-- PIHAK PERTAMA (PEMBERI KUASA) -->
    <div class="party-title">Pihak Pertama</div>
    <table class="bio-table">
        <tr>
            <td class="label-col">Nama</td>
            <td class="separator-col">:</td>
            <td class="val-col uppercase font-bold">{{ $citizen_name ?? '-' }}</td>
        </tr>
        <tr>
            <td class="label-col">NIK</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $citizen_nik ?? '-' }}</td>
        </tr>
        <tr>
            <td class="label-col">Alamat</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $citizen_address ?? 'Desa Karangwungu RT/RW: 003 /001 Kecamatan Karanggeneng, Kabupaten Lamongan.' }}</td>
        </tr>
    </table>

    <!-- KALIMAT PEMBERIAN KUASA -->
    <p class="give-power-text">Dengan ini memberikan kuasa penuh kepada ,</p>

    <!-- PIHAK KEDUA (PENERIMA KUASA) -->
    <div class="party-title">Pihak Kedua</div>
    <table class="bio-table">
        <tr>
            <td class="label-col">Nama</td>
            <td class="separator-col">:</td>
            <td class="val-col uppercase font-bold">{{ $grantee_name ?? '-' }}</td>
        </tr>
        <tr>
            <td class="label-col">NIK</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $grantee_nik ?? '-' }}</td>
        </tr>
        <tr>
            <td class="label-col">Alamat</td>
            <td class="separator-col">:</td>
            <td class="val-col">{{ $grantee_address ?? 'Desa Karangwungu RT/RW: 007/001 Kecamatan Karanggeneng, Kabupaten Lamongan.' }}</td>
        </tr>
    </table>

    <!-- ISI / TUJUAN SURAT KUASA -->
    <p class="purpose-text">
        Surat Kuasa ini kami buat untuk {{ $purpose ?? 'pengambilan Bantuan Mustahik dari Baznas.' }}
    </p>

    <!-- KALIMAT PENUTUP -->
    <p class="closing-text">
        Demikian surat kuasa ini kami buat dengan sebenarnya ,untuk di pergunakan seperlunya.
    </p>

    <!-- TANDA TANGAN PIHAK PERTAMA & PIHAK KEDUA -->
    <table class="sig-table">
        <tr>
            <td style="width: 50%;">
                <div>Penerima Kuasa</div>
                <div class="sig-space"></div>
                <div class="sig-name">{{ $grantee_name ?? 'AINUN NAJIB' }}</div>
            </td>
            <td style="width: 50%;">
                <div>Pemberi Kuasa</div>
                <div class="sig-space">
                    <span class="materai-box">Materai Rp 10.000</span>
                </div>
                <div class="sig-name">{{ $citizen_name ?? 'RAMITEN' }}</div>
            </td>
        </tr>
    </table>

    <!-- MENGETAHUI KEPALA DESA -->
    <div class="know-section">
        <div class="know-title">Mengetahui</div>
        <div class="know-kades">Kepala Desa Karangwungu</div>
        <div class="sig-space" style="height: 60px;"></div>
        <div class="sig-name">{{ $kades_name ?? 'SUNARTO' }}</div>
    </div>

    @if(!empty($tracking_code))
    <div class="footer-note">
        Dokumen resmi Pelayanan Mandiri Desa Karangwungu | Kode Tracking: <strong>{{ $tracking_code }}</strong> | Dicetak pada: {{ $printed_at ?? date('d-m-Y H:i') }}
    </div>
    @endif

</body>
</html>
