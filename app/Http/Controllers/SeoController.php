<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Post;
use App\Models\Potential;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function sitemap(): Response
    {
        $baseUrl = rtrim(url('/'), '/');
        $posts = Post::orderBy('published_at', 'desc')->get();
        $potentials = Potential::orderBy('updated_at', 'desc')->get();
        $galleries = Gallery::where('is_published', true)->orderBy('updated_at', 'desc')->get();

        $staticRoutes = [
            ['url' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/profil', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/profil/visi-misi', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/sejarah', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/kepemimpinan', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/perangkat-desa', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/lembaga', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/demografi', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/fasilitas', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/layanan', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/layanan/surat', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/layanan/ajukan', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/produk-hukum', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/transparansi', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/potensi', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/galeri', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/berita', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/kontak', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        $resolveImageUrl = function (?string $path) use ($baseUrl): ?string {
            if (empty($path)) {
                return null;
            }
            if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
                return $path;
            }
            return $baseUrl . '/' . ltrim($path, '/');
        };

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' . "\n";
        $xml .= '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ' . "\n";
        $xml .= '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

        // 1. Static Core Routes
        foreach ($staticRoutes as $route) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars($route['url'], ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
            $xml .= "    <changefreq>" . $route['changefreq'] . "</changefreq>\n";
            $xml .= "    <priority>" . $route['priority'] . "</priority>\n";
            $xml .= "  </url>\n";
        }

        // 2. Dynamic News / Posts
        foreach ($posts as $post) {
            $postUrl = $baseUrl . '/berita/' . $post->slug;
            $imageUrl = $resolveImageUrl($post->image);
            $lastmod = $post->updated_at ? $post->updated_at->format('Y-m-d') : date('Y-m-d');

            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars($postUrl, ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= "    <lastmod>" . $lastmod . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            if ($imageUrl) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($imageUrl, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                $xml .= "      <image:title>" . htmlspecialchars($post->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                $xml .= "    </image:image>\n";
            }
            $xml .= "  </url>\n";
        }

        // 3. Dynamic Potentials & UMKM
        foreach ($potentials as $potential) {
            $potentialUrl = $baseUrl . '/potensi/' . $potential->slug;
            $imageUrl = $resolveImageUrl($potential->image);
            $lastmod = $potential->updated_at ? $potential->updated_at->format('Y-m-d') : date('Y-m-d');

            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars($potentialUrl, ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= "    <lastmod>" . $lastmod . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            if ($imageUrl) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($imageUrl, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                $xml .= "      <image:title>" . htmlspecialchars($potential->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                $xml .= "    </image:image>\n";
            }
            $xml .= "  </url>\n";
        }

        // 4. Dynamic Photo Galleries
        foreach ($galleries as $gallery) {
            $galleryUrl = $baseUrl . '/galeri/' . $gallery->slug;
            $imageUrl = $resolveImageUrl($gallery->image);
            $lastmod = $gallery->updated_at ? $gallery->updated_at->format('Y-m-d') : date('Y-m-d');

            $xml .= "  <url>\n";
            $xml .= "    <loc>" . htmlspecialchars($galleryUrl, ENT_XML1, 'UTF-8') . "</loc>\n";
            $xml .= "    <lastmod>" . $lastmod . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            if ($imageUrl) {
                $xml .= "    <image:image>\n";
                $xml .= "      <image:loc>" . htmlspecialchars($imageUrl, ENT_XML1, 'UTF-8') . "</image:loc>\n";
                $xml .= "      <image:title>" . htmlspecialchars($gallery->title, ENT_XML1, 'UTF-8') . "</image:title>\n";
                $xml .= "    </image:image>\n";
            }
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'X-Robots-Tag' => 'noindex, follow',
        ]);
    }

    public function robots(): Response
    {
        $baseUrl = rtrim(url('/'), '/');
        $adminPath = config('app.admin_path', 'admin-karangwungu');

        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Allow: /assets/\n";
        $content .= "Allow: /storage/\n";
        $content .= "Allow: /build/\n";
        $content .= "Disallow: /{$adminPath}/\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /portal-karangwungu/\n";
        $content .= "Disallow: /administrator/\n";
        $content .= "Disallow: /layanan/surat/pdf/\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /_debugbar/\n\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }
}

