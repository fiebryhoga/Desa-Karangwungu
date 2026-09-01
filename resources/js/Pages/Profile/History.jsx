import React from 'react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../Components/UI/Card';
import { BookOpen, Target, CheckCircle2, Award, History as HistoryIcon } from 'lucide-react';

export default function History() {
    return (
        <AppLayout>
            <SeoHead
                title="Sejarah & Visi Misi"
                description="Asal usul sejarah berdirinya Desa Karangwungu, Karanggeneng, Lamongan serta Visi dan Misi arah pembangunan jangka panjang desa."
                keywords="Sejarah Desa Karangwungu, Asal Usul Karangwungu, Visi Misi Karangwungu Lamongan"
                breadcrumbs={[
                    { label: 'Profil Desa', url: '/profil' },
                    { label: 'Sejarah & Visi Misi', url: '/profil/sejarah' },
                ]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        { label: 'Profil Desa', url: '/profil' },
                        { label: 'Sejarah & Visi Misi', url: '/profil/sejarah' },
                    ]}
                />

                <div className="my-6">
                    <Badge variant="secondary">Dokumen Resmi</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                        Sejarah & Visi Misi Desa Karangwungu
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Mengenal jejak sejarah leluhur, nilai-nilai kearifan lokal, serta arah tujuan pembangunan Desa Karangwungu, Karanggeneng, Lamongan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
                    {/* Left Column: Asal Usul & Sejarah */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HistoryIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Asal-Usul Nama Desa Karangwungu</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
                                <p>
                                    Menurut penuturan para sesepuh dan tokoh masyarakat secara turun-temurun, nama <strong>Karangwungu</strong> berakar dari dua kata dalam bahasa Jawa kuno, yaitu <em>&ldquo;Karang&rdquo;</em> yang bermakna pekarangan atau hamparan tanah pemukiman yang kokoh, dan <em>&ldquo;Wungu&rdquo;</em> yang merujuk pada pohon wungu (pohon berkayu kuat dengan bunga berwarna lembayung/ungu yang konon tumbuh subur di sekitar sumber mata air pertama saat pembukaan lahan/babat alas pemukiman).
                                </p>
                                <p>
                                    Para pendahulu yang membuka wilayah Karangwungu mendiami kawasan tepi rawa subur yang dialiri percabangan anak sungai Bengawan Solo. Kesuburan tanahnya menjadikan pemukiman ini berkembang pesat sebagai sentra lumbung padi dan kemudian berkembang menjadi kawasan budidaya tambak perikanan air tawar terkemuka di Lamongan utara.
                                </p>
                                <p>
                                    Semangat kebersamaan (*gotong-royong*) dan religiusitas yang ditanamkan para sesepuh terus diwariskan hingga kini sebagai modal sosial utama dalam membangun kemandirian ekonomi desa.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Visi & Misi */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-zinc-300 dark:border-zinc-700 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                                    <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    <span>Visi Desa Karangwungu</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <blockquote className="p-4 rounded-md bg-zinc-100 dark:bg-zinc-800 text-sm font-semibold text-zinc-800 dark:text-zinc-200 border-l-4 border-emerald-500 italic leading-relaxed">
                                    &ldquo;Terwujudnya Desa Karangwungu yang Religius, Maju, Sejahtera, Transparan, dan Mandiri Berbasis Potensi Pertanian dan Perikanan Tambak.&rdquo;
                                </blockquote>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                                    <span>Misi Pembangunan Desa</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span>Meningkatkan kualitas pelayanan administrasi publik yang cepat, mudah, ramah, dan berbasis teknologi digital.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span>Mendorong produktivitas pertanian padi dan perikanan tambak melalui modernisasi sarana irigasi serta pendampingan kelompok tani/petambak.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span>Meningkatkan pemerataan pembangunan infrastruktur jalan lingkungan, sanitasi, dan penerangan desa.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span>Menumbuhkembangkan usaha mikro kecil menengah (UMKM) dan optimalisasi Badan Usaha Milik Desa (BUMDes).</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                        <span>Menjaga kelestarian lingkungan hidup dan kerukunan kehidupan beragama masyarakat.</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
