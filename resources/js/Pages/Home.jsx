import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import SeoHead from '../Components/SEO/SeoHead';
import HeroSection from '../Components/Home/HeroSection';
import WelcomeSection from '../Components/Home/WelcomeSection';
import OverviewSection from '../Components/Home/OverviewSection';
import ServicesSection from '../Components/Home/ServicesSection';
import PotentialsAndNewsSection from '../Components/Home/PotentialsAndNewsSection';

export default function Home({
    latestPosts = [],
    headOfficial,
    potentials = [],
    stats = {},
    apbdes_summary = {},
    heroImage = '/assets/images/hero.jpg',
}) {
    return (
        <AppLayout>
            <SeoHead
                title="Beranda Resmi"
                description="Website Resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur. Informasi transparansi APBDes, pelayanan surat online mandiri, potensi perikanan tambak & pertanian."
                keywords="Desa Karangwungu, Karangwungu Karanggeneng, Karangwungu Lamongan, Pemdes Karangwungu, Surat Online Karangwungu, Berita Karangwungu"
            />

            {/* SEKSI 1: HERO SECTION FULL SATU LAYAR */}
            <HeroSection heroImage={heroImage} />

            {/* SEKSI 2: SAMBUTAN KEPALA DESA & VISI MISI */}
            <WelcomeSection headOfficial={headOfficial} />

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 dark:via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 3: SELAYANG PANDANG DESA & DEMOGRAFI */}
            <OverviewSection stats={stats} />

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 dark:via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 4: PRODUK UNGGULAN & WARTA DESA TERPADU */}
            <PotentialsAndNewsSection
                potentials={potentials}
                latestPosts={latestPosts}
            />

            {/* Seamless Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-px bg-gradient-to-r from-transparent via-red-500/20 dark:via-amber-500/20 to-transparent" />
            </div>

            {/* SEKSI 5: LAYANAN MANDIRI ONLINE (PALING BAWAH) */}
            <ServicesSection />
        </AppLayout>
    );
}
