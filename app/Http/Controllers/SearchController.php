<?php

namespace App\Http\Controllers;

use App\Models\ApbdesRecord;
use App\Models\Gallery;
use App\Models\LegalProduct;
use App\Models\Post;
use App\Models\Potential;
use App\Models\SiteSetting;
use App\Models\VillageOfficial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Render the full search results page.
     */
    public function index(Request $request): Response
    {
        $query = trim((string) $request->query('q', ''));
        $category = trim((string) $request->query('category', 'all'));

        $allResults = $query !== '' ? $this->performSearch($query) : [];

        // Compute counts per category
        $counts = [
            'all' => count($allResults),
            'berita' => 0,
            'layanan' => 0,
            'regulasi' => 0,
            'aparatur' => 0,
            'lembaga' => 0,
            'potensi' => 0,
            'galeri' => 0,
            'transparansi' => 0,
            'halaman' => 0,
        ];

        foreach ($allResults as $item) {
            $catKey = $item['category_key'] ?? 'halaman';
            if (isset($counts[$catKey])) {
                $counts[$catKey]++;
            }
        }

        // Filter by category if selected
        $filteredResults = $allResults;
        if ($category !== 'all' && isset($counts[$category])) {
            $filteredResults = array_values(array_filter($allResults, function ($item) use ($category) {
                return ($item['category_key'] ?? '') === $category;
            }));
        }

        $popularSearches = [
            'Surat Keterangan Tidak Mampu (SKTM)',
            'Peraturan Desa (Perdes)',
            'Kepala Desa & Perangkat',
            'Badan Permusyawaratan Desa (BPD)',
            'Transparansi APBDes',
            'Bantuan Langsung Tunai (BLT-DD)',
            'Potensi UMKM & Pertanian',
            'Galeri Dokumentasi Desa',
        ];

        return Inertia::render('Search/Index', [
            'query' => $query,
            'category' => $category,
            'results' => $filteredResults,
            'counts' => $counts,
            'popularSearches' => $popularSearches,
        ]);
    }

    /**
     * Fast JSON API for real-time navbar live search autocomplete.
     */
    public function apiSearch(Request $request): JsonResponse
    {
        $query = trim((string) $request->query('q', ''));

        if ($query === '') {
            return response()->json([
                'query' => '',
                'results' => [],
                'total' => 0,
            ]);
        }

        $results = $this->performSearch($query, 25);

        return response()->json([
            'query' => $query,
            'results' => $results,
            'total' => count($results),
        ]);
    }

    /**
     * Global unified search across all web entities without exception.
     */
    protected function performSearch(string $term, int $limitPerType = 10): array
    {
        $results = [];
        $lowerTerm = strtolower($term);

        // 1. BERITA & PENGUMUMAN (Post)
        try {
            $postQuery = Post::query();

            // If user explicitly searches "berita" or "kabar" or "artikel", include all latest news
            if (in_array($lowerTerm, ['berita', 'kabar', 'artikel', 'pengumuman', 'warta', 'informasi'])) {
                $posts = $postQuery->orderBy('published_at', 'desc')
                    ->take($limitPerType)
                    ->get();
            } else {
                $posts = $postQuery->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")
                        ->orWhere('excerpt', 'like', "%{$term}%")
                        ->orWhere('content', 'like', "%{$term}%")
                        ->orWhere('category', 'like', "%{$term}%");
                })
                ->orderBy('published_at', 'desc')
                ->take($limitPerType)
                ->get();
            }

            foreach ($posts as $post) {
                $results[] = [
                    'id' => 'post-' . $post->id,
                    'title' => $post->title,
                    'category' => 'Berita & Artikel',
                    'category_key' => 'berita',
                    'badge' => $post->categories_list[0] ?? 'Berita',
                    'description' => Str::limit(strip_tags($post->excerpt ?: $post->content), 130),
                    'url' => route('news.show', $post->slug),
                    'date' => $post->published_at ? $post->published_at->translatedFormat('d M Y') : null,
                    'icon' => 'Newspaper',
                ];
            }
        } catch (\Throwable $e) {
            \Log::error('Search Post Error: ' . $e->getMessage());
        }

        // 2. LAYANAN PERSURATAN (Letter Services)
        try {
            $services = ServiceController::getAvailableLetterServices();
            foreach ($services as $service) {
                $matchTitle = str_contains(strtolower($service['title']), $lowerTerm);
                $matchShort = str_contains(strtolower($service['short_name']), $lowerTerm);
                $matchDesc = str_contains(strtolower($service['description']), $lowerTerm);

                // Specific keyword synonyms for civil registry services
                $synonyms = [
                    'sktm' => ['tidak mampu', 'miskin', 'beasiswa', 'kip', 'prasejahtera', 'bantuan'],
                    'domisili-usaha' => ['usaha', 'sku', 'dagang', 'toko', 'perusahaan', 'kredit', 'bank'],
                    'kematian' => ['mati', 'meninggal', 'wafat', 'akta kematian', 'almarhum'],
                    'kehilangan' => ['hilang', 'ktp hilang', 'kk hilang', 'polsek', 'surat jalan'],
                    'wali-nikah' => ['nikah', 'kawin', 'manten', 'wali', 'kua', 'pengantin'],
                    'wali-hakim' => ['wali hakim', 'kua', 'nikah'],
                    'kuasa' => ['kuasa', 'pelimpahan', 'wakil'],
                ];

                $matchSynonym = false;
                if (isset($synonyms[$service['id']])) {
                    foreach ($synonyms[$service['id']] as $syn) {
                        if (str_contains($syn, $lowerTerm) || str_contains($lowerTerm, $syn)) {
                            $matchSynonym = true;
                            break;
                        }
                    }
                }

                if ($matchTitle || $matchShort || $matchDesc || $matchSynonym) {
                    $results[] = [
                        'id' => 'service-' . $service['id'],
                        'title' => $service['title'],
                        'category' => 'Layanan Persuratan',
                        'category_key' => 'layanan',
                        'badge' => 'Layanan Online',
                        'description' => Str::limit($service['description'], 130),
                        'url' => route('services.create.form', $service['id']),
                        'date' => 'Formulir Online',
                        'icon' => 'FileText',
                    ];
                }
            }
        } catch (\Throwable $e) {
        }

        // 3. PRODUK HUKUM & REGULASI (LegalProduct)
        try {
            $legalProducts = LegalProduct::active()
                ->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")
                        ->orWhere('document_number', 'like', "%{$term}%")
                        ->orWhere('description', 'like', "%{$term}%")
                        ->orWhere('document_type', 'like', "%{$term}%")
                        ->orWhere('year', 'like', "%{$term}%");
                })
                ->orderBy('year', 'desc')
                ->take($limitPerType)
                ->get();

            foreach ($legalProducts as $lp) {
                $results[] = [
                    'id' => 'legal-' . $lp->id,
                    'title' => $lp->title,
                    'category' => 'Produk Hukum & Regulasi',
                    'category_key' => 'regulasi',
                    'badge' => $lp->document_type,
                    'description' => Str::limit(($lp->document_number ? $lp->document_number . ' — ' : '') . ($lp->description ?: 'Dokumen regulasi resmi Pemerintah Desa Karangwungu.'), 130),
                    'url' => $lp->file_url ? route('services.legal-products.download', $lp->id) : route('services.index'),
                    'date' => 'Tahun ' . $lp->year,
                    'icon' => 'Scale',
                ];
            }
        } catch (\Throwable $e) {
        }

        // 4. APARATUR DESA (VillageOfficial & SiteSetting Kades/BPD)
        try {
            $officials = VillageOfficial::where(function ($q) use ($term) {
                $q->where('name', 'like', "%{$term}%")
                    ->orWhere('position', 'like', "%{$term}%")
                    ->orWhere('bio', 'like', "%{$term}%");
            })
            ->take($limitPerType)
            ->get();

            foreach ($officials as $off) {
                $results[] = [
                    'id' => 'official-' . $off->id,
                    'title' => $off->name,
                    'category' => 'Aparatur & Lembaga',
                    'category_key' => 'aparatur',
                    'badge' => $off->position,
                    'description' => Str::limit($off->position . ' Pemerintah Desa Karangwungu. ' . ($off->bio ?: 'Aparatur resmi pelaksana pelayanan masyarakat.'), 130),
                    'url' => route('profile.officials'),
                    'date' => 'Pemerintah Desa',
                    'icon' => 'UserCheck',
                ];
            }

            // Also search Kades & BPD specifically
            $kadesName = SiteSetting::get('kades_name', 'Elli Susiantoro, SE');
            $kadesPos = SiteSetting::get('kades_position', 'Kepala Desa');
            if (str_contains(strtolower($kadesName), $lowerTerm) || str_contains(strtolower($kadesPos), $lowerTerm) || str_contains('kepala desa lurah kades', $lowerTerm)) {
                $results[] = [
                    'id' => 'kades-official',
                    'title' => $kadesName,
                    'category' => 'Aparatur & Lembaga',
                    'category_key' => 'aparatur',
                    'badge' => $kadesPos,
                    'description' => 'Kepala Desa Karangwungu, pemimpin tertinggi penyelenggaraan tata kelola pemerintahan dan pembangunan desa.',
                    'url' => route('profile.officials'),
                    'date' => 'Pemerintah Desa',
                    'icon' => 'UserCheck',
                ];
            }

            $bpdName = SiteSetting::get('bpd_name', 'ALI NASIHIN, SH');
            $bpdPos = SiteSetting::get('bpd_position', 'Ketua BPD');
            if (str_contains(strtolower($bpdName), $lowerTerm) || str_contains(strtolower($bpdPos), $lowerTerm) || str_contains('bpd permusyawaratan desa', $lowerTerm)) {
                $results[] = [
                    'id' => 'bpd-official',
                    'title' => $bpdName,
                    'category' => 'Aparatur & Lembaga',
                    'category_key' => 'aparatur',
                    'badge' => $bpdPos,
                    'description' => 'Ketua Badan Permusyawaratan Desa (BPD) Karangwungu, mitra strategis Pemerintah Desa dalam legislasi dan pengawasan.',
                    'url' => route('profile.officials'),
                    'date' => 'Badan Permusyawaratan Desa',
                    'icon' => 'UserCheck',
                ];
            }
        } catch (\Throwable $e) {
        }

        // 5. LEMBAGA DESA (Organizations)
        try {
            $rawOrgs = SiteSetting::get('organizations_list');
            $orgs = is_array($rawOrgs) ? $rawOrgs : (is_string($rawOrgs) ? json_decode($rawOrgs, true) : []);

            if (empty($orgs)) {
                $orgs = [
                    ['id' => 'bpd', 'name' => 'Badan Permusyawaratan Desa', 'shortName' => 'BPD', 'tagline' => 'Mitra Legislasi & Aspirasi Warga'],
                    ['id' => 'lpm', 'name' => 'Lembaga Pemberdayaan Masyarakat', 'shortName' => 'LPM', 'tagline' => 'Pemberdayaan & Partisipasi Pembangunan'],
                    ['id' => 'pkk', 'name' => 'Pemberdayaan Kesejahteraan Keluarga', 'shortName' => 'PKK', 'tagline' => 'Gerakan Perempuan & Keluarga Sehat'],
                    ['id' => 'karang-taruna', 'name' => 'Karang Taruna Karya Muda', 'shortName' => 'Karang Taruna', 'tagline' => 'Wadah Kreativitas & Kepemudaan Desa'],
                    ['id' => 'satlinmas', 'name' => 'Satuan Perlindungan Masyarakat', 'shortName' => 'Satlinmas', 'tagline' => 'Ketenteraman & Ketertiban Warga'],
                    ['id' => 'rt-rw', 'name' => 'Rukun Tetangga & Rukun Warga', 'shortName' => 'RT / RW', 'tagline' => 'Pelayanan Terdepan Lingkungan Warga'],
                ];
            }

            foreach ($orgs as $org) {
                $matchName = str_contains(strtolower($org['name'] ?? ''), $lowerTerm);
                $matchShort = str_contains(strtolower($org['shortName'] ?? ''), $lowerTerm);
                $matchTag = str_contains(strtolower($org['tagline'] ?? ''), $lowerTerm);
                $matchDesc = str_contains(strtolower($org['description'] ?? ''), $lowerTerm);

                if ($matchName || $matchShort || $matchTag || $matchDesc) {
                    $results[] = [
                        'id' => 'org-' . ($org['id'] ?? Str::slug($org['name'])),
                        'title' => ($org['name'] ?? 'Lembaga Desa') . (!empty($org['shortName']) ? ' (' . $org['shortName'] . ')' : ''),
                        'category' => 'Aparatur & Lembaga',
                        'category_key' => 'lembaga',
                        'badge' => $org['shortName'] ?? 'Lembaga Desa',
                        'description' => Str::limit($org['tagline'] ?? $org['description'] ?? 'Lembaga kemasyarakatan Desa Karangwungu.', 130),
                        'url' => route('profile.organizations.show', $org['id'] ?? 'bpd'),
                        'date' => 'Lembaga Desa',
                        'icon' => 'Building2',
                    ];
                }
            }
        } catch (\Throwable $e) {
        }

        // 6. POTENSI DESA & UMKM (Potential)
        try {
            $potentials = Potential::where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                    ->orWhere('category', 'like', "%{$term}%")
                    ->orWhere('description', 'like', "%{$term}%")
                    ->orWhere('content', 'like', "%{$term}%")
                    ->orWhere('owner_name', 'like', "%{$term}%");
            })
            ->take($limitPerType)
            ->get();

            foreach ($potentials as $pot) {
                $results[] = [
                    'id' => 'pot-' . $pot->id,
                    'title' => $pot->title,
                    'category' => 'Potensi Desa & UMKM',
                    'category_key' => 'potensi',
                    'badge' => $pot->category ?: 'Potensi Desa',
                    'description' => Str::limit($pot->description ?: strip_tags($pot->content), 130),
                    'url' => route('potential.show', $pot->slug),
                    'date' => 'Potensi Desa',
                    'icon' => 'TrendingUp',
                ];
            }
        } catch (\Throwable $e) {
        }

        // 7. GALERI DOKUMENTASI (Gallery)
        try {
            $galQuery = Gallery::where('is_published', true);

            if (in_array($lowerTerm, ['galeri', 'foto', 'album', 'dokumentasi', 'kegiatan'])) {
                $galleries = $galQuery->orderBy('date', 'desc')
                    ->take($limitPerType)
                    ->get();
            } else {
                $galleries = $galQuery->where(function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%")
                        ->orWhere('description', 'like', "%{$term}%")
                        ->orWhere('category', 'like', "%{$term}%")
                        ->orWhere('location', 'like', "%{$term}%");
                })
                ->orderBy('date', 'desc')
                ->take($limitPerType)
                ->get();
            }

            foreach ($galleries as $gal) {
                $results[] = [
                    'id' => 'gal-' . $gal->id,
                    'title' => $gal->title,
                    'category' => 'Galeri & Dokumentasi',
                    'category_key' => 'galeri',
                    'badge' => $gal->category ?: 'Album Foto',
                    'description' => Str::limit($gal->description ?: 'Dokumentasi album kegiatan resmi Desa Karangwungu.', 130),
                    'url' => !empty($gal->slug) ? route('gallery.show', $gal->slug) : route('gallery.index'),
                    'date' => $gal->date ? date('d M Y', strtotime($gal->date)) : null,
                    'icon' => 'Image',
                ];
            }
        } catch (\Throwable $e) {
            \Log::error('Search Gallery Error: ' . $e->getMessage());
        }

        // 8. TRANSPARANSI APBDES (ApbdesRecord)
        try {
            $apbdes = ApbdesRecord::where(function ($q) use ($term) {
                $q->where('category_name', 'like', "%{$term}%")
                    ->orWhere('subcategory_name', 'like', "%{$term}%")
                    ->orWhere('type', 'like', "%{$term}%")
                    ->orWhere('code', 'like', "%{$term}%");
            })
            ->take($limitPerType)
            ->get();

            foreach ($apbdes as $rec) {
                $results[] = [
                    'id' => 'apbdes-' . $rec->id,
                    'title' => $rec->subcategory_name ?: $rec->category_name,
                    'category' => 'Transparansi APBDes',
                    'category_key' => 'transparansi',
                    'badge' => 'APBDes ' . $rec->year,
                    'description' => 'Realisasi: Rp ' . number_format($rec->realized_amount, 0, ',', '.') . ' dari Anggaran Rp ' . number_format($rec->budget_amount, 0, ',', '.') . ' (' . ucfirst($rec->type) . ')',
                    'url' => route('transparency.index', ['year' => $rec->year]),
                    'date' => 'TA ' . $rec->year,
                    'icon' => 'PieChart',
                ];
            }
        } catch (\Throwable $e) {
        }

        // 9. HALAMAN & PROFIL RESMI DESA (Static Pages & Menu)
        $officialPages = [
            [
                'title' => 'Visi & Misi Desa Karangwungu',
                'description' => 'Landasan cita, arah pembangunan, dan program strategis Pemerintah Desa Karangwungu menuju desa mandiri dan sejahtera.',
                'keywords' => 'visi misi rencana pembangunan cita-cita target haluan kerja',
                'url' => route('profile.vision-mission'),
                'badge' => 'Profil Desa',
            ],
            [
                'title' => 'Sejarah & Asal-usul Desa Karangwungu',
                'description' => 'Napak tilas berdirinya Desa Karangwungu dari masa ke masa, silsilah kepemimpinan Kepala Desa, serta kearifan lokal.',
                'keywords' => 'sejarah asal usul babad cerita tempo dulu masa lampau pendiri',
                'url' => route('profile.history'),
                'badge' => 'Profil Desa',
            ],
            [
                'title' => 'Struktur Organisasi & Tata Kerja (SOTK)',
                'description' => 'Susunan pengurus dan aparatur Pemerintah Desa Karangwungu, Badan Permusyawaratan Desa (BPD), dan tupoksi resmi.',
                'keywords' => 'struktur organisasi aparatur perangkat pamong sotk jabatan tugas fungsi',
                'url' => route('profile.officials'),
                'badge' => 'Pemerintahan',
            ],
            [
                'title' => 'Data Wilayah & Demografi Kependudukan',
                'description' => 'Informasi statistik penduduk, kelompok usia, mata pencaharian, batas wilayah, dan persebaran warga Karangwungu.',
                'keywords' => 'demografi penduduk statistik jumlah warga laki perempuan lansia balita profesi pekerjaan',
                'url' => route('profile.demographics'),
                'badge' => 'Statistik Desa',
            ],
            [
                'title' => 'Riwayat Kepemimpinan Kepala Desa',
                'description' => 'Daftar kepala desa yang pernah memimpin Desa Karangwungu beserta masa bakti dan capaian kepemimpinan.',
                'keywords' => 'kepemimpinan kades mantan kades riwayat lurah',
                'url' => route('profile.leadership'),
                'badge' => 'Profil Desa',
            ],
            [
                'title' => 'Fasilitas & Sarana Prasarana Desa',
                'description' => 'Sarana publik desa meliputi Balai Desa, sarana kesehatan (Polindes/Pustu), pendidikan, tempat ibadah, dan olahraga.',
                'keywords' => 'fasilitas sarana prasarana gedung balai pustu posyandu masjid lapangan sekolah pasar',
                'url' => route('facilities.index'),
                'badge' => 'Sarana Publik',
            ],
            [
                'title' => 'Lacak Status Permohonan Surat',
                'description' => 'Cek dan pantau proses verifikasi dokumen persuratan mandiri Anda secara online menggunakan kode tracking.',
                'keywords' => 'lacak tracking cek permohonan status surat berkas verifikasi',
                'url' => route('services.track'),
                'badge' => 'Layanan Publik',
            ],
            [
                'title' => 'Katalog Produk Hukum & Regulasi Desa',
                'description' => 'Dokumentasi resmi Peraturan Desa (Perdes), Keputusan Kepala Desa (SK), dan produk hukum keterbukaan informasi publik.',
                'keywords' => 'produk hukum perdes sk kades regulasi peraturan undang jdih',
                'url' => route('services.index'),
                'badge' => 'JDIH Desa',
            ],
            [
                'title' => 'Kontak Resmi & Lokasi Kantor Balai Desa',
                'description' => 'Alamat kantor balai desa, jam pelayanan kerja, nomor WhatsApp pengaduan warga, email resmi, dan peta lokasi Google Maps.',
                'keywords' => 'kontak alamat kantor balai desa pengaduan call center nomor telepon wa email lokasi',
                'url' => route('contact.index'),
                'badge' => 'Kontak & Bantuan',
            ],
        ];

        foreach ($officialPages as $page) {
            $matchTitle = str_contains(strtolower($page['title']), $lowerTerm);
            $matchDesc = str_contains(strtolower($page['description']), $lowerTerm);
            $matchKey = str_contains(strtolower($page['keywords']), $lowerTerm);

            if ($matchTitle || $matchDesc || $matchKey) {
                $results[] = [
                    'id' => 'page-' . Str::slug($page['title']),
                    'title' => $page['title'],
                    'category' => 'Halaman & Menu',
                    'category_key' => 'halaman',
                    'badge' => $page['badge'],
                    'description' => $page['description'],
                    'url' => $page['url'],
                    'date' => 'Halaman Resmi',
                    'icon' => 'Compass',
                ];
            }
        }

        return $results;
    }
}
