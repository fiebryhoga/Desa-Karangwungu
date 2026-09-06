# Karangwungu Village Web - Project Specification & RAB

## Informasi Proyek

* **Nama Project:** Karangwungu Village Web
* **Description:** Portal web resmi dan sistem pelayanan mandiri Desa Karangwungu (Lamongan) berbasis Laravel + React (Inertia.js). Platform mengintegrasikan pusat informasi publik, transparansi desa, promosi potensi lokal (tambak & pertanian), serta layanan pengajuan surat online cepat dengan unduh PDF otomatis.

---

## Project Objectives & Target

### Project Objectives
* **Digitalisasi Surat Mandiri:** Memudahkan warga mengajukan dan melacak surat resmi secara online tanpa antre.
* **Keterbukaan Informasi Publik:** Menyajikan profil, data demografi, warta desa, dan transparansi APBDes secara akurat dan transparan.
* **Promosi Potensi Desa:** Mengenalkan produk UMKM serta komoditas unggulan tambak bandeng dan pertanian padi ke publik luas.
* **Efisiensi Kerja Perangkat:** Mengotomatiskan verifikasi berkas dan pengelolaan konten beranda melalui dashboard admin terpadu.

### Target
* **Warga Desa:** Pengurusan surat selesai dalam hitungan menit dari smartphone.
* **Aparatur Desa:** Pengarsipan digital terpusat dan birokrasi lebih efisien.
* **Sistem:** Website cepat, responsif di semua perangkat, dengan integrasi PDF otomatis dan peta GIS interaktif.

---

## Tech Stack & Design Reference

### Tech Stack
* **Backend:** Laravel Framework, PHP 8.4, Inertia.js (Server Adapter), Eloquent ORM, Barryvdh / Laravel-DomPDF, Laravel Tinker, Laravel Pint, PHPUnit, FakerPHP
* **Frontend:** React, Plus Jakarta Sans, Tailwind CSS, Vite, Lucide React, Leaflet, clsx, Concurrently
* **Database & Storage:** MySQL, Session & Cache Driver, Local File Storage

### Design Reference & Color Theme
* **Design Reference:** Modern GovTech & Smart Village Portal (Card-based UI, Sleek Obsidian Glow, and Nusantara Batik Accents).
* **Color Theme:** Red, Black, Gold, and White accented with subtle texture and batik silhouettes.

---

## Key Features & User Roles

### Key Features
* **E-Surat Mandiri:** Pengajuan online untuk 6+ jenis surat desa (SKU, SKTM, Domisili, dll.) dengan unduh cetak PDF otomatis.
* **Real-time Tracking:** Pelacakan status permohonan surat secara instan hanya dengan NIK atau Kode Tiket.
* **Open Data & Transparansi APBDes:** Publikasi visual grafik anggaran pendapatan & belanja desa.
* **Interactive GIS Map:** Peta batas wilayah desa dan fasilitas umum berbasis Leaflet.
* **Dynamic CMS Dashboard:** Pengaturan tampilan beranda, sambutan kades, slider berita, dan produk unggulan secara fleksibel tanpa koding.
* **Dual Theme:** Mendukung Dark Mode (Obsidian) dan Light Mode yang nyaman di mata.

### User Roles
* **Publik / Warga Desa:** Mengakses informasi publik, mengajukan surat mandiri, dan melacak status berkas.
* **Administrator / Perangkat Desa:** Memvalidasi & memproses berkas surat, mengelola konten warta, potensi UMKM, APBDes, serta konfigurasi website.

---

## Rincian Biaya Pengembangan (RAB)

### 1. Fitur Frontend

| Fitur Frontend | Deskripsi Singkat | Biaya (Rp) |
| :--- | :--- | :--- |
| **Layouting - Navbar, Header, Footer** | Struktur navigasi global, header responsif, menu dropdown, dan footer identitas desa | 100.000 |
| **Dual Theme (Light and Dark Mode)** | Toggle tema Obsidian Dark & Clean Light dengan transisi warna halus | 100.000 |
| **Smart Searching** | Fitur pencarian cepat terintegrasi untuk berita, profil, dan layanan desa | 40.000 |
| **Beranda - Hero Section** | Banner utama dinamis, headline visual, narasi pembuka, dan tombol CTA | 30.000 |
| **Beranda - Profile Kepala Desa** | Sambutan Kades, kutipan resmi, foto pimpinan, dan profil singkat | 15.000 |
| **Beranda - Selayang Pandang** | Kartu sorotan ringkas potensi unggulan pertanian, tambak, dan UMKM warga | 15.000 |
| **Beranda - Section Berita** | Headline slider otomatis & kartu warta kabar desa terbaru | 15.000 |
| **Beranda - Section UMKM** | Showcase produk komoditas dan etalase UMKM warga desa | 15.000 |
| **Beranda - Section Layanan** | Jalan pintas pengajuan surat online & widget cek lacak resi tiket | 15.000 |
| **Profile Desa - Gambaran Umum** | Narasi profil desa, batas wilayah & integrasi peta interaktif Leaflet GIS | 160.000 |
| **Profile Desa - Visi Misi & Sejarah Kepemimpinan** | Tampilan visi misi dan timeline riwayat kepala desa lintas periode | 40.000 |
| **Profile Desa - Aparatur / Perangkat Desa** | Struktur organisasi, profil foto, jabatan, dan tupoksi pamong desa | 40.000 |
| **Profile Desa - Lembaga Desa (Index)** | Katalog daftar lembaga desa (BPD, LPMD, Karang Taruna, PKK, dll.) | 40.000 |
| **Profile Desa - Lembaga Desa (Show)** | Detail profil lembaga, struktur kepengurusan, dan program kerja aktif | 80.000 |
| **Profile Desa - Data Demografi** | Visualisasi statistik kependudukan, piramida usia, pekerjaan & dusun | 80.000 |
| **Berita - Berita (Index)** | Halaman katalog warta dengan filter kategori, pagination, dan pencarian | 40.000 |
| **Berita - Berita (Show)** | Halaman detail artikel, tanggal, pembaca, galeri berita, dan komentar | 80.000 |
| **Informasi - APBDes** | Visualisasi anggaran pendapatan, belanja, dan pembiayaan transparan | 120.000 |
| **Informasi - UMKM (Index)** | Katalog direktori produk, komoditas panen, dan aneka usaha mandiri warga | 40.000 |
| **Informasi - UMKM (Show)** | Detail spesifikasi produk, galeri foto, estimasi harga, dan kontak penjual | 80.000 |
| **Informasi - Galeri (Index)** | Album dokumentasi kegiatan pemerintahan dan foto momen warga desa | 40.000 |
| **Informasi - Galeri (Show)** | Tampilan detail album kegiatan, preview foto resolusi penuh & caption | 80.000 |
| **Informasi - Kontak** | Form kritik, saran pengaduan warga, lokasi kantor balai desa & maps | 15.000 |
| **Informasi - Fasilitas (Index)** | Direktori fasilitas umum (pendidikan, kesehatan, olahraga, ibadah) | 40.000 |
| **Layanan - Pengajuan Surat** | Form mandiri dinamis multi-syarat untuk berbagai jenis surat desa | 300.000 |
| **Layanan - Lacak Surat** | Antarmuka pelacakan riwayat & progres surat via NIK atau Kode Tiket | 15.000 |
| **Layanan - SK** | Halaman katalog unduhan Surat Keputusan (SK) dan produk hukum desa | 40.000 |
| **Error, Blank Page** | Halaman responsif kustom untuk status 404 Not Found & 500 Server Error | 15.000 |
| **Subtotal Frontend** | | **Rp 1.555.000** |

---

### 2. Fitur Backend

| Fitur Backend | Deskripsi Singkat | Biaya (Rp) |
| :--- | :--- | :--- |
| **Fondasi Sistem & Database** | Perancangan Database Schema, Relasi Tabel, Migrations, dan Seeders | 100.000 |
| **Pengaturan Global (General Settings)** | API/Handler Data Desa (Identitas, Logo, Kontak, Medsos untuk Header & Footer) | 20.000 |
| **Autentikasi & Keamanan Admin** | Login, Logout, Session Guard, Middleware Proteksi, Hash Password & Keamanan CSRF | 20.000 |
| **Profil Admin** | Update Profil Admin & Ganti Password | 20.000 |
| **Dashboard Admin** | Agregasi Data Counter (Total Surat Masuk, Berita, UMKM, APBDes, & Quick Status) | 60.000 |
| **Beranda (Home Backend)** | API Agregator Data Beranda (Slider/Hero, Highlight Berita, Cuplikan UMKM, Sambutan Kades) | 40.000 |
| **Profil Desa - Gambaran Umum** | CRUD & Storage data gambaran umum, peta wilayah, dan batas desa | 40.000 |
| **Profil Desa - Visi Misi & Kepemimpinan** | CRUD Visi, Misi, serta Riwayat Kepemimpinan Kades | 40.000 |
| **Profil Desa - Aparatur Desa** | CRUD Perangkat/Aparatur Desa + Upload & Resize Foto Resmi | 40.000 |
| **Profil Desa - Lembaga Desa** | CRUD Master Lembaga Desa, Pengurus, dan Program Kerja | 40.000 |
| **Profil Desa - Data Demografi** | CRUD & Kalkulasi Otomatis Statistik Kependudukan (Dusun, Usia, Agama, Pekerjaan) | 40.000 |
| **Berita - CMS & Manajemen Artikel** | CRUD Berita, Auto Slug, Upload Thumbnail, Manajemen Kategori, & View Counter | 80.000 |
| **Berita - Sistem Komentar** | Penyimpanan Komentar Pembaca, Anti-spam dasar, & Moderasi Komentar | 20.000 |
| **Informasi - APBDes & Transparansi** | Pengelolaan Data APBDes (Pendapatan, Belanja, Pembiayaan per Tahun Anggaran) | 60.000 |
| **Informasi - Produk Hukum & SK** | CRUD Dokumen Produk Hukum / Surat Keputusan (SK) + Upload PDF | 40.000 |
| **Informasi - Fasilitas Desa** | CRUD Data Fasilitas & Sarana Prasarana Desa | 40.000 |
| **Informasi - UMKM & Potensi Desa** | CRUD Data Usaha/Produk Warga, Kontak Penjual, Harga, & Upload Foto Produk | 40.000 |
| **Informasi - Galeri Kegiatan** | Pengelolaan Album & Multi-upload Foto/Video Kegiatan Desa | 40.000 |
| **Informasi - Kritik, Saran & Kontak** | Penyimpanan Pesan Masuk Warga (Inbox Feedback) & Status Dibaca | 20.000 |
| **Layanan - Pengajuan Surat (Core Warga)** | Validasi Input, Generate Kode Tracking Unik, Upload Syarat KTP/KK, & Simpan Permohonan | 250.000 |
| **Layanan - Tracking Surat** | Pencarian & Validasi Status Permohonan Surat berdasarkan Kode Tracking / NIK | 20.000 |
| **Layanan - Verifikasi & Kelola Admin** | Alur Status Surat (Menunggu, Diproses, Bisa Diambil, Selesai, Ditolak) + Catatan Admin | 40.000 |
| **Layanan - PDF Generation Engine** | Template Render Cetak PDF Resmi Presisi Ukuran Kertas & Blangko (Wali Hakim, Kuasa, Kematian, Domisili Usaha, SKTM, dll.) | 120.000 |
| **Layanan - Integrasi WhatsApp Notif** | Generator Link / Template Pesan WhatsApp Resmi ke Pemohon Surat | 20.000 |
| **Manajemen User Admin** | CRUD Akun Pengguna / Operator Desa | 40.000 |
| **SEO & Sitemap Backend** | Dynamic Meta Tags, Open Graph data generator, & Sitemap.xml generator | 40.000 |
| **Subtotal Backend** | | **Rp 1.350.000** |

---

### 3. Infrastruktur & Hosting

| Layanan | Deskripsi Singkat | Biaya (Rp) |
| :--- | :--- | :--- |
| **Premium Shared Hosting + Free Domain (2 Tahun)** | Penyediaan server cloud SSD, SSL Security (HTTPS), setup nama domain resmi desa, konfigurasi email & database selama 2 tahun | 780.000 |
| **Subtotal Hosting** | | **Rp 780.000** |

---

## Ringkasan Total Anggaran

| Kategori Komponen | Total Biaya |
| :--- | :--- |
| **Fitur Frontend (28 Item)** | Rp 1.555.000 |
| **Fitur Backend & Keamanan (26 Item)** | Rp 1.350.000 |
| **Hosting & Domain (2 Tahun)** | Rp 780.000 |
| **TOTAL KESELURUHAN** | **Rp 3.685.000** |
