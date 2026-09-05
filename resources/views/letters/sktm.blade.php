<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $title ?? 'Surat Keterangan Tidak Mampu' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 15mm 20mm 15mm 20mm;
        }

        body {
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 11pt;
            line-height: 1.4;
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
            margin-bottom: 22px;
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
            margin-bottom: 8px;
            line-height: 1.5;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 20px;
            margin-bottom: 14px;
            font-size: 10.5pt;
            line-height: 1.55;
        }

        .data-table td {
            vertical-align: top;
            padding: 2px 0;
        }

        .data-table td.col-label {
            width: 165px;
        }

        .data-table td.col-colon {
            width: 18px;
            text-align: center;
        }

        .closing-paragraph {
            text-align: justify;
            text-indent: 35px;
            margin-top: 14px;
            margin-bottom: 30px;
            line-height: 1.55;
        }

        .signature-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .signature-box {
            width: 45%;
            text-align: center;
            vertical-align: top;
            font-size: 10.5pt;
            line-height: 1.4;
        }

        .signature-space {
            height: 65px;
        }

        .kades-name {
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
        }
    </style>
</head>
<body>

    <!-- KOP SURAT RESMI -->
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
        <div class="letter-title">SURAT KETERANGAN TIDAK MAMPU</div>
        <div class="letter-number">
            Nomor : {{ $letter_number ?? ('... / ... / ... / ' . ($year ?? date('Y'))) }}
        </div>
    </div>

    <!-- PARAGRAF PEMBUKA (PEJABAT) -->
    <p class="content-paragraph">
        Yang bertanda tangan dibawah ini :
    </p>
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong>{{ $kades_name ?? 'H. SUNARTO' }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">Jabatan</td>
            <td class="col-colon">:</td>
            <td>{{ $kades_title ?? 'Kepala Desa Karangwungu' }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan</td>
        </tr>
    </table>

    <!-- KETERANGAN WARGA PEMOHON -->
    <p class="content-paragraph">
        Dengan ini menerangkan bahwa :
    </p>
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong style="text-transform: uppercase;">{{ $citizen_name }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">NIK</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_nik }}</td>
        </tr>
        <tr>
            <td class="col-label">Tempat Tgl Lahir</td>
            <td class="col-colon">:</td>
            <td>{{ $birth_place_date }}</td>
        </tr>
        @if(!empty($gender))
        <tr>
            <td class="col-label">Jenis Kelamin</td>
            <td class="col-colon">:</td>
            <td>{{ $gender }}</td>
        </tr>
        @endif
        <tr>
            <td class="col-label">Pekerjaan</td>
            <td class="col-colon">:</td>
            <td>{{ $occupation ?? 'Mengurus Rumah Tangga' }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_address }}</td>
        </tr>
        <tr>
            <td class="col-label">Agama</td>
            <td class="col-colon">:</td>
            <td>{{ $religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="col-label">Kewarganegaraan</td>
            <td class="col-colon">:</td>
            <td>Indonesia</td>
        </tr>
        <tr>
            <td class="col-label">Keterangan</td>
            <td class="col-colon">:</td>
            <td style="text-align: justify;">
                Bahwa orang tersebut adalah benar-benar warga Desa Karangwungu yang tergolong keluarga <strong>Tidak Mampu</strong>, dan surat keterangan ini dibuat untuk keperluan <strong>{{ $purpose }}</strong>.
            </td>
        </tr>
    </table>

    <!-- PARAGRAF PENUTUP -->
    <p class="closing-paragraph">
        Demikian Surat Keterangan ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.
    </p>

    <!-- TANDA TANGAN & PENGESAHAN -->
    <table class="signature-table">
        <tr>
            <!-- Kolom kosong sebelah kiri -->
            <td style="width: 55%;"></td>

            <!-- Bagian Tanda Tangan Kades -->
            <td class="signature-box">
                <div>Karangwungu, {{ $letter_date }}</div>
                <div style="margin-top: 2px;">Mengetahui,</div>
                <div style="font-weight: bold; margin-bottom: 95px;">Kepala Desa Karangwungu</div>

                <div class="kades-name">
                    {{ $kades_name ?? 'H. SUNARTO' }}
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
