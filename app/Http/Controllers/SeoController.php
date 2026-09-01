<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Potential;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function sitemap(): Response
    {
        $baseUrl = url('/');
        $posts = Post::orderBy('updated_at', 'desc')->get();
        $potentials = Potential::orderBy('updated_at', 'desc')->get();

        $staticRoutes = [
            ['url' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/profil', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/profil/sejarah', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/perangkat-desa', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/profil/demografi', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/layanan', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/layanan/ajukan', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['url' => $baseUrl . '/layanan/lacak', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/transparansi', 'priority' => '0.9', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/potensi', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['url' => $baseUrl . '/berita', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['url' => $baseUrl . '/kontak', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';

        foreach ($staticRoutes as $route) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($route['url']) . '</loc>';
            $xml .= '<lastmod>' . date('Y-m-d') . '</lastmod>';
            $xml .= '<changefreq>' . $route['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $route['priority'] . '</priority>';
            $xml .= '</url>';
        }

        foreach ($posts as $post) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/berita/' . $post->slug) . '</loc>';
            $xml .= '<lastmod>' . $post->updated_at->format('Y-m-d') . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    public function robots(): Response
    {
        $baseUrl = url('/');
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /admin/\n\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";

        return response($content, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }
}
