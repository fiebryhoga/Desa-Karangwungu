<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $title ?? 'Surat Keterangan Kehilangan' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 15mm 20mm 15mm 20mm;
        }

        body {
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 11pt;
            line-height: 1.45;
            color: #000000;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0;
        }

        .header-logo {
            width: 80px;
            vertical-align: middle;
            text-align: center;
            padding-right: 12px;
        }

        .header-logo img {
            width: 78px;
            height: auto;
            max-height: 95px;
        }

        .header-text {
            text-align: center;
            vertical-align: middle;
        }

        .header-text h3 {
            margin: 0;
            font-size: 14pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 1.25;
            text-transform: uppercase;
        }

        .header-text h2 {
            margin: 0;
            font-size: 13pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 1.25;
            text-transform: uppercase;
        }

        .header-text h1 {
            margin: 1px 0 0 0;
            font-size: 17pt;
            font-weight: bold;
            letter-spacing: 1.5px;
            line-height: 1.2;
            text-transform: uppercase;
        }

        .header-text p {
            margin: 4px 0 0 0;
            font-size: 9pt;
            font-style: italic;
            line-height: 1.3;
        }

        /* Garis ganda kop surat khas dinas */
        .kop-line-thick {
            border-top: 2.5px solid #000000;
            margin-top: 8px;
            margin-bottom: 1.5px;
        }

        .kop-line-thin {
            border-top: 1px solid #000000;
            margin-bottom: 20px;
        }

        .letter-title-box {
            text-align: center;
            margin-bottom: 20px;
        }

        .letter-title {
            font-size: 12.5pt;
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .letter-number {
            font-size: 10.5pt;
            margin-top: 3px;
        }

        .content-paragraph {
            text-align: justify;
            margin-bottom: 10px;
            line-height: 1.55;
            font-size: 11pt;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 20px;
            margin-bottom: 14px;
            font-size: 11pt;
            line-height: 1.6;
        }

        .data-table td {
            vertical-align: top;
            padding: 2.5px 0;
        }

        .data-table td.col-label {
            width: 170px;
        }

        .data-table td.col-colon {
            width: 20px;
            text-align: center;
        }

        .lost-paragraph {
            text-align: justify;
            margin-top: 14px;
            margin-bottom: 12px;
            line-height: 1.55;
            font-size: 11pt;
        }

        .closing-paragraph {
            text-align: justify;
            text-indent: 35px;
            margin-top: 14px;
            margin-bottom: 28px;
            line-height: 1.55;
            font-size: 11pt;
        }

        .signature-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .signature-box {
            width: 50%;
            text-align: center;
            vertical-align: top;
            font-size: 11pt;
            line-height: 1.4;
        }

        .signature-space {
            height: 75px;
        }

        .kades-name {
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
        }
    </style>
</head>
<body>

    <!-- KOP SURAT RESMI DESA KARANGWUNGU -->
    <table class="header-table">
        <tr>
            <td class="header-logo">
                @if(!empty($logo_base64))
                    <img src="{{ $logo_base64 }}" alt="Logo Lamongan">
                @elseif(file_exists(public_path('assets/images/logo_kop_sm.png')))
                    <img src="{{ public_path('assets/images/logo_kop_sm.png') }}" alt="Logo Lamongan">
                @elseif(file_exists(public_path('assets/images/logo_kop.png')))
                    <img src="{{ public_path('assets/images/logo_kop.png') }}" alt="Logo Lamongan">
                @endif
            </td>
            <td class="header-text">
                <h3>PEMERINTAH KABUPATEN LAMONGAN</h3>
                <h2>KECAMATAN KARANGGENENG</h2>
                <h1>DESA KARANGWUNGU</h1>
                <p>Jl. Raya Sumberwudi-Maduran, Desa Karangwungu, Kec. Karanggeneng, Kode Pos 62254</p>
            </td>
        </tr>
    </table>

    <!-- GARIS GANDA KOP SURAT -->
    <div class="kop-line-thick"></div>
    <div class="kop-line-thin"></div>

    <!-- JUDUL DAN NOMOR SURAT -->
    <div class="letter-title-box">
        <div class="letter-title">SURAT KETERANGAN KEHILANGAN</div>
        <div class="letter-number">
            Nomor : {{ $letter_number ?? ('... / ... / ... / ' . ($year ?? date('Y'))) }}
        </div>
    </div>

    <!-- PARAGRAF PEMBUKA SESUAI DOKUMEN RESMI DESA KARANGWUNGU -->
    <p class="content-paragraph">
        Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan, menerangkan dengan sebenarnya bahwa :
    </p>

    <!-- TABEL BIODATA PEMOHON SESUAI FORMAT FOTO DOKUMEN FISIK -->
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong style="text-transform: uppercase;">{{ $citizen_name }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">JenisKelamin</td>
            <td class="col-colon">:</td>
            <td>{{ $gender ?? 'Laki-laki' }}</td>
        </tr>
        <tr>
            <td class="col-label">TTL</td>
            <td class="col-colon">:</td>
            <td>{{ $birth_place_date }}</td>
        </tr>
        <tr>
            <td class="col-label">Agama</td>
            <td class="col-colon">:</td>
            <td>{{ $religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="col-label">Kwarganegaraan</td>
            <td class="col-colon">:</td>
            <td>Indonesia</td>
        </tr>
        <tr>
            <td class="col-label">Pekerjaan</td>
            <td class="col-colon">:</td>
            <td>{{ $occupation ?? 'Wiraswasta' }}</td>
        </tr>
        <tr>
            <td class="col-label">NIK</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_nik }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_address }}</td>
        </tr>
    </table>

    <!-- PARAGRAF KETERANGAN KEHILANGAN SESUAI FORMAT FOTO DOKUMEN FISIK -->
    <p class="lost-paragraph">
        Nama tersebut diatas adalah benar bahwa warga Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan. Dengan ini menerangkan bahwa yang bersangkutan telah kehilangan berupa <strong>{!! nl2br(e(strtoupper($purpose ?? 'KTP (KARTU TANDA PENDUDUK)'))) !!}</strong>
    </p>

    <!-- PARAGRAF PENUTUP SESUAI FORMAT FOTO DOKUMEN FISIK -->
    <p class="closing-paragraph">
        Demikian Surat Keterangan ini dibuat dengan sebenarnya. Sesuai dengan keadaan sekarang untuk dipergunakan sebagai manamestinya.
    </p>

    <!-- TANDA TANGAN & PENGESAHAN KEPALA DESA -->
    <table class="signature-table">
        <tr>
            <!-- Kolom kosong sebelah kiri -->
            <td style="width: 50%;"></td>

            <!-- Bagian Tanda Tangan Kades Karangwungu -->
            <td class="signature-box">
                <div>Karangwungu, {{ $letter_date }}</div>
                <div style="font-weight: bold; margin-top: 4px; text-transform: uppercase;">
                    KEPALA DESA KARANGWUNGU
                </div>

                <div class="signature-space"></div>

                <div class="kades-name">
                    {{ $kades_name ?? 'SUNARTO' }}
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
