<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ $title ?? 'Surat Keterangan Wali Nikah' }}</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 12mm 20mm 12mm 20mm;
        }

        body {
            font-family: "Times New Roman", Times, Georgia, serif;
            font-size: 10.5pt;
            line-height: 1.38;
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
            font-size: 13.5pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 1.25;
            text-transform: uppercase;
        }

        .header-text h2 {
            margin: 0;
            font-size: 12.5pt;
            font-weight: bold;
            letter-spacing: 0.5px;
            line-height: 1.25;
            text-transform: uppercase;
        }

        .header-text h1 {
            margin: 1px 0 0 0;
            font-size: 16.5pt;
            font-weight: bold;
            letter-spacing: 1.5px;
            line-height: 1.2;
            text-transform: uppercase;
        }

        .header-text p {
            margin: 3px 0 0 0;
            font-size: 8.5pt;
            font-style: italic;
            line-height: 1.3;
        }

        /* Garis ganda kop surat khas dinas */
        .kop-line-thick {
            border-top: 2.5px solid #000000;
            margin-top: 6px;
            margin-bottom: 1.5px;
        }

        .kop-line-thin {
            border-top: 1px solid #000000;
            margin-bottom: 14px;
        }

        .letter-title-box {
            text-align: center;
            margin-bottom: 12px;
        }

        .letter-title {
            font-size: 12pt;
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .letter-number {
            font-size: 10pt;
            margin-top: 2px;
        }

        .content-paragraph {
            text-align: justify;
            margin-bottom: 6px;
            line-height: 1.42;
            font-size: 10.5pt;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 15px;
            margin-bottom: 8px;
            font-size: 10.5pt;
            line-height: 1.4;
        }

        .data-table td {
            vertical-align: top;
            padding: 1.5px 0;
        }

        .data-table td.col-label {
            width: 190px;
        }

        .data-table td.col-colon {
            width: 18px;
            text-align: center;
        }

        .subheading-box {
            text-align: center;
            margin-top: 8px;
            margin-bottom: 6px;
        }

        .subheading-text {
            font-size: 11pt;
            font-weight: bold;
            text-decoration: underline;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .connector-text {
            margin-top: 6px;
            margin-bottom: 4px;
            font-size: 10.5pt;
        }

        .closing-paragraph {
            text-align: justify;
            text-indent: 30px;
            margin-top: 8px;
            margin-bottom: 16px;
            line-height: 1.42;
            font-size: 10.5pt;
        }

        .signature-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }

        .signature-box {
            width: 50%;
            text-align: center;
            vertical-align: top;
            font-size: 10.5pt;
            line-height: 1.35;
        }

        .signature-space {
            height: 60px;
        }

        .name-underline {
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
        <div class="letter-title">SURAT KETERANGAN WALI NIKAH</div>
        <div class="letter-number">
            Nomor : {{ $letter_number ?? ('... / ... / ... / ' . ($year ?? date('Y'))) }}
        </div>
    </div>

    <!-- PARAGRAF PEMBUKA SESUAI DOKUMEN ASLI DESA KARANGWUNGU -->
    <p class="content-paragraph">
        Yang bertanda tangan dibawah ini Kepala Desa Karangwungu Kecamatan Karanggeneng Kabupaten Lamongan menerangkan bahwa :
    </p>

    <!-- BAGIAN I: DATA WALI NIKAH -->
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong class="name-underline">{{ $citizen_name }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">NIK</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_nik }}</td>
        </tr>
        <tr>
            <td class="col-label">Tempat tanggal lahir</td>
            <td class="col-colon">:</td>
            <td>{{ $birth_place_date }}</td>
        </tr>
        <tr>
            <td class="col-label">Jenis Kelamin</td>
            <td class="col-colon">:</td>
            <td>{{ $gender ?? 'Laki-laki' }}</td>
        </tr>
        <tr>
            <td class="col-label">Agama</td>
            <td class="col-colon">:</td>
            <td>{{ $religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="col-label">Status Perkawinan</td>
            <td class="col-colon">:</td>
            <td>{{ $marital_status ?? 'Kawin' }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>{{ $citizen_address }}</td>
        </tr>
        <tr>
            <td class="col-label">Hubungan Dengan Catin</td>
            <td class="col-colon">:</td>
            <td>{{ $catin_relation ?? 'Saudara Kandung' }}</td>
        </tr>
    </table>

    <!-- SUB-JUDUL KETERANGAN -->
    <div class="subheading-box">
        <span class="subheading-text">KETERANGAN</span>
    </div>

    <p class="content-paragraph">
        Bahwa orang tersebut diatas benar-benar warga Desa Karangwungu {{ $wali_rt_rw ?? '' }} Kec. Karanggeneng Kab. Lamongan dan akan menjadi Wali Nikah seorang yang bernama :
    </p>

    <!-- BAGIAN II: DATA CALON PENGANTIN WANITA (YANG DINIKAHKAN) -->
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong style="text-transform: uppercase;">{{ $bride_name ?? '...' }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">NIK</td>
            <td class="col-colon">:</td>
            <td>{{ $bride_nik ?? '...' }}</td>
        </tr>
        <tr>
            <td class="col-label">Tempat tanggal lahir</td>
            <td class="col-colon">:</td>
            <td>{{ $bride_birth_place_date ?? '...' }}</td>
        </tr>
        <tr>
            <td class="col-label">Agama</td>
            <td class="col-colon">:</td>
            <td>{{ $bride_religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>{{ $bride_address ?? '...' }}</td>
        </tr>
    </table>

    <!-- PENGHUBUNG CALON SUAMI -->
    <p class="connector-text">
        Yang akan menikah dengan :
    </p>

    <!-- BAGIAN III: DATA CALON MEMPELAI PRIA -->
    <table class="data-table">
        <tr>
            <td class="col-label">Nama</td>
            <td class="col-colon">:</td>
            <td><strong style="text-transform: uppercase;">{{ $groom_name ?? '...' }}</strong></td>
        </tr>
        <tr>
            <td class="col-label">NIK</td>
            <td class="col-colon">:</td>
            <td>{{ $groom_nik ?? '...' }}</td>
        </tr>
        <tr>
            <td class="col-label">Tempat tanggal lahir</td>
            <td class="col-colon">:</td>
            <td>{{ $groom_birth_place_date ?? '...' }}</td>
        </tr>
        <tr>
            <td class="col-label">Agama</td>
            <td class="col-colon">:</td>
            <td>{{ $groom_religion ?? 'Islam' }}</td>
        </tr>
        <tr>
            <td class="col-label">Alamat</td>
            <td class="col-colon">:</td>
            <td>{{ $groom_address ?? '...' }}</td>
        </tr>
    </table>

    <!-- PARAGRAF PENUTUP -->
    <p class="closing-paragraph">
        Demikian Surat Keterangan ini di buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.
    </p>

    <!-- TANDA TANGAN DUA KOLOM: PEMOHON & KEPALA DESA -->
    <table class="signature-table">
        <tr>
            <td class="signature-box">
                &nbsp;
            </td>
            <td class="signature-box">
                Karangwungu, {{ $letter_date ?? date('d F Y') }}
            </td>
        </tr>
        <tr>
            <td class="signature-box">
                Pemohon
                <div class="signature-space"></div>
                <strong class="name-underline">{{ $citizen_name }}</strong>
            </td>
            <td class="signature-box">
                Kepala Desa Karangwungu
                <div class="signature-space"></div>
                <strong class="name-underline">{{ $kades_name }}</strong>
            </td>
        </tr>
    </table>

</body>
</html>
