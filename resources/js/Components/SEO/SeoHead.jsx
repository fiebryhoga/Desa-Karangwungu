import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SeoHead({
    title,
    description = 'Portal Resmi Pemerintah Desa Karangwungu, Kecamatan Karanggeneng, Kabupaten Lamongan, Jawa Timur. Pusat informasi publik, layanan surat mandiri daring, transparansi APBDes, dan potensi komoditas desa.',
    keywords = 'Desa Karangwungu, Karangwungu Karanggeneng, Desa Karangwungu Lamongan, Portal Desa Karangwungu, Surat Online Karangwungu, APBDes Karangwungu, Potensi Desa Karangwungu, Web Desa Lamongan',
    image = null,
    type = 'website',
    schemaType = null,
    schemaData = null,
    breadcrumbs = [],
    noIndex = false,
}) {
    const { url, props } = usePage();
    const general = props?.general_settings || {};
    const village = props?.village_info || {};

    const appUrl = (props?.app_url || (typeof window !== 'undefined' ? window.location.origin : 'https://karangwungu-lamongan.desa.id')).replace(/\/+$/, '');

    // Helper: Resolve full absolute URL for images and links
    const toAbsoluteUrl = (path, fallback = '/assets/images/hero.jpg') => {
        const target = path || fallback;
        if (!target) return `${appUrl}/assets/images/hero.jpg`;
        if (target.startsWith('http://') || target.startsWith('https://')) {
            return target;
        }
        const cleanPath = target.startsWith('/') ? target : `/${target}`;
        return `${appUrl}${cleanPath}`;
    };

    const absoluteImage = toAbsoluteUrl(image, '/assets/images/hero.jpg');
    const absoluteLogo = toAbsoluteUrl(general?.logo, '/assets/images/logo.png');

    const rawUrl = url || '';
    const cleanPath = rawUrl.split('?')[0];
    const canonicalUrl = `${appUrl}${cleanPath}`;
    const fullUrl = `${appUrl}${rawUrl}`;

    // Dynamic Title formatting
    const villageName = village?.name || general?.site_name || 'Desa Karangwungu';
    const villageSubdistrict = village?.subdistrict || general?.site_subdistrict || 'Kecamatan Karanggeneng';
    const villageRegency = village?.regency || general?.site_regency || 'Kabupaten Lamongan';
    const villageProvince = village?.province || general?.site_province || 'Jawa Timur';
    const villagePostal = village?.postal_code || general?.site_postal_code || '62254';
    const villagePhone = village?.phone || general?.contact_phone || '(0812) 3456-7890';
    const villageEmail = village?.email || general?.contact_email || 'pemdes@karangwungu-lamongan.desa.id';
    const villageAddress = village?.address || general?.contact_address || 'Jl. Raya Karangwungu No. 01, Karanggeneng, Lamongan 62254';
    const villageTagline = village?.tagline || general?.site_tagline || '';

    let pageTitle;
    if (!title || title === 'Beranda' || title === 'Beranda Resmi') {
        pageTitle = `Portal Resmi Pemerintah ${villageName} - ${villageSubdistrict}, ${villageRegency}`;
    } else {
        pageTitle = `${title} - ${villageName}, ${villageSubdistrict}, ${villageRegency}`;
    }

    // Active social media links for structured data
    const sameAsLinks = [
        general?.social_facebook_active !== '0' && general?.social_facebook_url,
        general?.social_instagram_active !== '0' && general?.social_instagram_url,
        general?.social_youtube_active !== '0' && general?.social_youtube_url,
        general?.social_tiktok_active !== '0' && general?.social_tiktok_url,
        general?.social_twitter_active !== '0' && general?.social_twitter_url,
        general?.related_link_1_active !== '0' && (general?.related_link_1_url || 'https://lamongankab.go.id/'),
        general?.related_link_2_active !== '0' && (general?.related_link_2_url || 'https://kemendesa.go.id/'),
    ].filter(Boolean);

    // 1. Base GovernmentOrganization Schema
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOrganization',
        '@id': `${appUrl}/#organization`,
        'name': `Pemerintah ${villageName}`,
        'legalName': `Pemerintah ${villageName}, ${villageSubdistrict}, ${villageRegency}`,
        'alternateName': [`Pemdes Karangwungu`, `Pemerintah Desa Karangwungu`, `Desa Karangwungu`],
        'url': appUrl,
        'logo': {
            '@type': 'ImageObject',
            'url': absoluteLogo,
            'width': 512,
            'height': 512,
        },
        'image': absoluteImage,
        'description': villageTagline || description,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': villageAddress,
            'addressLocality': villageSubdistrict.replace(/^Kecamatan\s+/i, ''),
            'addressRegion': `${villageRegency}, ${villageProvince}`,
            'postalCode': villagePostal,
            'addressCountry': 'ID',
        },
        'geo': {
            '@type': 'GeoCoordinates',
            'latitude': -7.039615,
            'longitude': 112.355112,
        },
        'telephone': villagePhone,
        'email': villageEmail,
        ...(sameAsLinks.length > 0 ? { 'sameAs': sameAsLinks } : {}),
        'contactPoint': [
            {
                '@type': 'ContactPoint',
                'telephone': villagePhone,
                'email': villageEmail,
                'contactType': 'pelayanan publik',
                'areaServed': 'ID',
                'availableLanguage': ['Indonesian', 'Javanese'],
            },
        ],
    };

    // 2. Breadcrumbs Schema
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
                'item': b.url ? toAbsoluteUrl(b.url, '') : canonicalUrl,
            })),
        ],
    } : null;

    // 3. Sitelinks SearchBox WebSite Schema
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${appUrl}/#website`,
        'url': appUrl,
        'name': `Portal Resmi ${villageName}`,
        'alternateName': `Website Desa Karangwungu Lamongan`,
        'inLanguage': 'id-ID',
        'publisher': {
            '@id': `${appUrl}/#organization`,
        },
        'potentialAction': {
            '@type': 'SearchAction',
            'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${appUrl}/cari?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <Head>
            {/* Standard HTML Title & Meta */}
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={`Pemerintah ${villageName}`} />
            <meta
                name="robots"
                content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
            />
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang="id" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            {/* Geo & Local SEO Meta */}
            <meta name="geo.region" content="ID-JI" />
            <meta name="geo.placename" content={`${villageName}, ${villageSubdistrict}, ${villageRegency}`} />
            <meta name="geo.position" content="-7.039615;112.355112" />
            <meta name="ICBM" content="-7.039615, 112.355112" />

            {/* Open Graph / Facebook */}
            <meta property="og:locale" content="id_ID" />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={`Portal Resmi ${villageName}`} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:image:secure_url" content={absoluteImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={pageTitle} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
            <meta name="twitter:image:alt" content={pageTitle} />

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

