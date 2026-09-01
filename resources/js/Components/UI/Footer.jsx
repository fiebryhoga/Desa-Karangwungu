import React from 'react';
import { Link } from '@inertiajs/react';
import { Shield, MapPin, Phone, Mail, Clock, ExternalLink, ChevronRight, FileCode, Sparkles } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-zinc-300 border-t border-amber-500/20 transition-colors">
            {/* Top Main Footer Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Col 1: Profil & Identitas Desa (4 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3.5">
                            <img
                                src="/assets/images/logo.png"
                                alt="Logo Desa Karangwungu"
                                className="h-16 sm:h-18 w-auto object-contain shrink-0 drop-shadow-md"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden h-12 w-12 items-center justify-center">
                                <Shield className="h-7 w-7 text-amber-400" />
                            </div>
                            <div>
                                <h4 className="text-base font-extrabold text-white leading-tight">
                                    Desa Karangwungu
                                </h4>
                                <p className="text-xs text-amber-400/90 leading-tight font-medium">
                                    Kec. Karanggeneng, Kab. Lamongan
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Portal informasi resmi dan pelayanan publik daring Pemerintah Desa Karangwungu guna mewujudkan tata kelola desa yang transparan, akuntabel, agamis, dan melayani masyarakat secara prima.
                        </p>

                        <div className="pt-2 text-xs text-zinc-400 space-y-1.5 border-t border-zinc-800">
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Status Desa: <strong className="text-zinc-200">Desa Berkembang Menuju Mandiri</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2 w-2 rounded-full bg-red-500 shrink-0"></span>
                                <span>Kode Kemendagri: <strong className="text-zinc-200">35.24.10.2008</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Kode Pos: <strong className="text-zinc-200">62254</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: Jelajah Desa (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-sm font-bold text-amber-400">
                            Jelajah Desa
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/profil" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Gambaran Umum</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil/sejarah" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Sejarah & Visi Misi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil/perangkat-desa" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Perangkat Desa</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil/demografi" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Data Demografi</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/potensi" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Potensi & UMKM</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/galeri" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Galeri Foto Kegiatan</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Layanan & Informasi (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold text-amber-400">
                            Layanan & Transparansi
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/layanan" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Katalog Layanan Surat</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/layanan/ajukan" className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium">
                                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                    <span>Ajukan Surat Mandiri</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/layanan/lacak" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Lacak Status Permohonan</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/transparansi" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Transparansi APBDes</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/berita" className="text-zinc-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                                    <ChevronRight className="h-3.5 w-3.5 text-red-500" />
                                    <span>Warta & Pengumuman</span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/sitemap.xml"
                                    target="_blank"
                                    className="text-zinc-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors pt-1"
                                >
                                    <FileCode className="h-3.5 w-3.5 text-amber-400/70" />
                                    <span>Peta Situs (Sitemap XML)</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Alamat & Kontak Resmi (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <h4 className="text-sm font-bold text-amber-400">
                            Kontak & Pelayanan
                        </h4>
                        <div className="space-y-3 text-sm text-zinc-400">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    Jl. Raya Karangwungu No. 01, Kec. Karanggeneng, Kab. Lamongan, Jawa Timur 62254
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                                <span className="text-zinc-200 font-medium">(0812) 3456-7890</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                                <span>pemdes@karangwungu-lamongan.desa.id</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                <div className="text-xs space-y-0.5">
                                    <p>Senin - Kamis: 08.00 - 15.30 WIB</p>
                                    <p>Jumat: 08.00 - 14.30 WIB</p>
                                </div>
                            </div>
                        </div>

                        {/* External Portal Links */}
                        <div className="pt-2">
                            <span className="text-xs font-semibold text-zinc-400 block mb-2">Tautan Resmi Terkait:</span>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <a
                                    href="https://lamongankab.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-amber-500/40 inline-flex items-center gap-1 transition-colors"
                                >
                                    <span>Pemkab Lamongan</span>
                                    <ExternalLink className="h-3 w-3 text-amber-400/80" />
                                </a>
                                <a
                                    href="https://kemendesa.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-amber-500/40 inline-flex items-center gap-1 transition-colors"
                                >
                                    <span>Kemendesa RI</span>
                                    <ExternalLink className="h-3 w-3 text-amber-400/80" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright */}
            <div className="border-t border-zinc-900 bg-black/80 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 text-center md:text-left">
                    <p>
                        &copy; {currentYear} <strong>Pemerintah Desa Karangwungu</strong>, Kecamatan Karanggeneng, Kabupaten Lamongan. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                    <p className="flex items-center justify-center gap-4">
                        <Link href="/kontak" className="hover:text-amber-400 transition-colors">
                            Pusat Bantuan & Pengaduan
                        </Link>
                        <span>&bull;</span>
                        <Link href="/transparansi" className="hover:text-amber-400 transition-colors">
                            Akuntabilitas Publik
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
