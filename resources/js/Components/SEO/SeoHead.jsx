import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SeoHead({
    title,
    description = 'Portal Resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur. Pusat informasi publik, layanan surat mandiri online, transparansi APBDes, dan potensi desa.',
    keywords = 'Desa Karangwungu, Karangwungu Karanggeneng, Desa Karanggeneng Lamongan, Web Desa Lamongan, Surat Online Desa Karangwungu, APBDes Karangwungu, Bandeng Karangwungu, Wisata Lamongan',
    image = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    type = 'website',
    schemaType = null,
    schemaData = null,
    breadcrumbs = [],
}) {
    const { url, props } = usePage();
    const appUrl = props.app_url || window?.location?.origin || 'https://karangwungu-lamongan.desa.id';
    const currentUrl = `${appUrl}${url}`;
    const pageTitle = title
        ? `${title} - Desa Karangwungu, Karanggeneng, Lamongan`
        : 'Desa Karangwungu - Kec. Karanggeneng, Kab. Lamongan | Portal Resmi';

    // Base GovernmentOrganization Schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOrganization',
        'name': 'Pemerintah Desa Karangwungu',
        'alternateName': 'Pemdes Karangwungu Lamongan',
        'url': appUrl,
        'logo': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
        'description': 'Portal Resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur.',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Jl. Raya Karangwungu No. 01',
            'addressLocality': 'Karanggeneng',
            'addressRegion': 'Kabupaten Lamongan, Jawa Timur',
            'postalCode': '62254',
            'addressCountry': 'ID',
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': -7.0396,
            'longitude': 112.3551,
        },
        'telephone': '+6281234567890',
        'email': 'pemdes@karangwungu-lamongan.desa.id',
    };

    // Breadcrumbs Schema
    const breadcrumbSchema = breadcrumbs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Beranda',
                'item': appUrl,
            },
            ...breadcrumbs.map((b, idx) => ({
                '@type': 'ListItem',
                'position': idx + 2,
                'name': b.label,
                'item': b.url ? `${appUrl}${b.url}` : currentUrl,
            })),
        ],
    } : null;

    // Sitelinks SearchBox WebSite Schema
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'url': appUrl,
        'name': 'Portal Resmi Desa Karangwungu',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': `${appUrl}/berita?search={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Desa Karangwungu Karanggeneng" />
            <meta property="og:locale" content="id_ID" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>

            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>

            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}

            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Head>
    );
}
