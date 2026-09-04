<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PotentialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeoController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TransparencyController;
use Illuminate\Support\Facades\Route;

// SEO Routes
Route::get('/sitemap.xml', [SeoController::class, 'sitemap'])->name('seo.sitemap');
Route::get('/robots.txt', [SeoController::class, 'robots'])->name('seo.robots');

// Beranda (Home)
Route::get('/', [HomeController::class, 'index'])->name('home');

// Profil Desa Karangwungu
Route::prefix('profil')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/visi-misi', [ProfileController::class, 'visionMission'])->name('profile.vision-mission');
    Route::get('/kepemimpinan', [ProfileController::class, 'leadership'])->name('profile.leadership');
    Route::get('/perangkat-desa', [ProfileController::class, 'officials'])->name('profile.officials');
    Route::get('/lembaga', [ProfileController::class, 'organizations'])->name('profile.organizations');
    Route::get('/lembaga/{id}', [ProfileController::class, 'organizationShow'])->name('profile.organizations.show');
    Route::get('/demografi', [ProfileController::class, 'demographics'])->name('profile.demographics');
    Route::get('/fasilitas', [ProfileController::class, 'facilities'])->name('profile.facilities');
});

// Fasilitas Umum & Lembaga Alias
Route::get('/fasilitas', [ProfileController::class, 'facilities'])->name('facilities.index');
Route::get('/lembaga', [ProfileController::class, 'organizations'])->name('organizations.index');
Route::get('/lembaga/{id}', [ProfileController::class, 'organizationShow'])->name('organizations.show');

// Layanan Warga & Persuratan Online
Route::prefix('layanan')->group(function () {
    Route::get('/', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/ajukan', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/ajukan', [ServiceController::class, 'store'])->name('services.store');
    Route::get('/lacak', [ServiceController::class, 'track'])->name('services.track');
});

// Transparansi APBDes
Route::get('/transparansi', [TransparencyController::class, 'index'])->name('transparency.index');

// Potensi & UMKM Desa
Route::get('/potensi', [PotentialController::class, 'index'])->name('potentials.index');
Route::get('/potensi/{slug}', [PotentialController::class, 'show'])->name('potentials.show');

// Galeri Dokumentasi & Foto Desa
Route::get('/galeri', [GalleryController::class, 'index'])->name('gallery.index');

// Berita & Pengumuman
Route::get('/berita', [NewsController::class, 'index'])->name('news.index');
Route::get('/berita/{slug}', [NewsController::class, 'show'])->name('news.show');
Route::post('/berita/{slug}/komentar', [CommentController::class, 'store'])->name('news.comment.store');

// Kontak, Lokasi & Pengaduan
Route::get('/kontak', [ContactController::class, 'index'])->name('contact.index');
Route::post('/kontak', [ContactController::class, 'store'])->name('contact.store');

// ==========================================
// BACKEND & ADMINISTRATOR ROUTES (HARDENED)
// ==========================================

// Honeypot & Scanner Blocker: Return 404 for commonly scanned paths
Route::any('/admin', fn () => abort(404));
Route::any('/administrator', fn () => abort(404));
Route::any('/wp-admin', fn () => abort(404));
Route::any('/wp-login.php', fn () => abort(404));
Route::any('/cpanel', fn () => abort(404));
Route::any('/panel', fn () => abort(404));

// Dynamic Secret Admin Path (Configurable via ADMIN_PATH in .env)
$adminPath = config('app.admin_path', 'portal-karangwungu');

// Secret Entrance Root
Route::get("/{$adminPath}", function () use ($adminPath) {
    return auth()->check()
        ? redirect()->route('admin.dashboard')
        : redirect()->route('admin.login');
});

// Admin Guest Authentication (No Public Register, No Forgot Password)
Route::prefix($adminPath)->group(function () {
    Route::get('/login', [\App\Http\Controllers\Admin\AuthController::class, 'create'])->name('admin.login');
    Route::post('/login', [\App\Http\Controllers\Admin\AuthController::class, 'store'])->name('admin.login.store');
});

// Default Laravel auth middleware fallback
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');

// Protected Admin System (auth + AdminSecurityMiddleware)
Route::prefix($adminPath)->middleware(['auth', \App\Http\Middleware\AdminSecurityMiddleware::class])->group(function () {
    // Logout
    Route::post('/logout', [\App\Http\Controllers\Admin\AuthController::class, 'destroy'])->name('admin.logout');

    // Dashboard Overview
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    // Konfigurasi Website (Beranda / Landing Page, dll)
    Route::get('/settings/dashboard', [\App\Http\Controllers\Admin\DashboardSettingController::class, 'index'])->name('admin.settings.dashboard');
    Route::post('/settings/dashboard', [\App\Http\Controllers\Admin\DashboardSettingController::class, 'update'])->name('admin.settings.dashboard.update');

    // Konfigurasi Umum & Kontak Balai Desa
    Route::get('/settings/general', [\App\Http\Controllers\Admin\GeneralSettingController::class, 'index'])->name('admin.settings.general');
    Route::post('/settings/general', [\App\Http\Controllers\Admin\GeneralSettingController::class, 'update'])->name('admin.settings.general.update');

    // Konfigurasi Gambaran Umum & Peta Spasial Desa
    Route::get('/settings/overview', [\App\Http\Controllers\Admin\OverviewSettingController::class, 'index'])->name('admin.settings.overview');
    Route::post('/settings/overview', [\App\Http\Controllers\Admin\OverviewSettingController::class, 'update'])->name('admin.settings.overview.update');

    // Konfigurasi Visi, Misi & Kepemimpinan
    Route::get('/settings/vision-mission', [\App\Http\Controllers\Admin\VisionMissionSettingController::class, 'index'])->name('admin.settings.vision-mission');
    Route::post('/settings/vision-mission', [\App\Http\Controllers\Admin\VisionMissionSettingController::class, 'update'])->name('admin.settings.vision-mission.update');

    // Konfigurasi Perangkat Desa & SOTK
    Route::get('/settings/officials', [\App\Http\Controllers\Admin\OfficialSettingController::class, 'index'])->name('admin.settings.officials');
    Route::post('/settings/officials', [\App\Http\Controllers\Admin\OfficialSettingController::class, 'update'])->name('admin.settings.officials.update');

    // Konfigurasi Demografi & Statistik Kependudukan
    Route::get('/settings/demographics', [\App\Http\Controllers\Admin\DemographicSettingController::class, 'index'])->name('admin.settings.demographics');
    Route::post('/settings/demographics', [\App\Http\Controllers\Admin\DemographicSettingController::class, 'update'])->name('admin.settings.demographics.update');

    // Konfigurasi Lembaga & Organisasi Kemasyarakatan
    Route::get('/settings/organizations', [\App\Http\Controllers\Admin\OrganizationSettingController::class, 'index'])->name('admin.settings.organizations');
    Route::post('/settings/organizations', [\App\Http\Controllers\Admin\OrganizationSettingController::class, 'update'])->name('admin.settings.organizations.update');
    Route::post('/settings/organizations/upload-logo', [\App\Http\Controllers\Admin\OrganizationSettingController::class, 'uploadLogo'])->name('admin.settings.organizations.upload_logo');
    Route::post('/settings/organizations/upload-banner', [\App\Http\Controllers\Admin\OrganizationSettingController::class, 'uploadBanner'])->name('admin.settings.organizations.upload_banner');

    // Konfigurasi Transparansi APBDes Per Tahun
    Route::get('/settings/apbdes', [\App\Http\Controllers\Admin\ApbdesSettingController::class, 'index'])->name('admin.settings.apbdes');
    Route::post('/settings/apbdes', [\App\Http\Controllers\Admin\ApbdesSettingController::class, 'update'])->name('admin.settings.apbdes.update');
    Route::post('/settings/apbdes/year', [\App\Http\Controllers\Admin\ApbdesSettingController::class, 'storeYear'])->name('admin.settings.apbdes.store_year');
    Route::delete('/settings/apbdes/year/{year}', [\App\Http\Controllers\Admin\ApbdesSettingController::class, 'destroyYear'])->name('admin.settings.apbdes.destroy_year');

    // Profile & Ganti Password Mandiri
    Route::get('/profile', [\App\Http\Controllers\Admin\AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\Admin\AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::put('/profile/password', [\App\Http\Controllers\Admin\AdminProfileController::class, 'updatePassword'])->name('admin.profile.password');

    // Manajemen Administrator (Internal dalam sistem)
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users.index');
    Route::post('/users', [\App\Http\Controllers\Admin\UserController::class, 'store'])->name('admin.users.store');
    Route::patch('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('admin.users.update');
    Route::put('/users/{user}/password', [\App\Http\Controllers\Admin\UserController::class, 'updatePassword'])->name('admin.users.password');
    Route::delete('/users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.users.destroy');
});
