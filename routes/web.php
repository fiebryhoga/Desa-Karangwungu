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
    Route::get('/demografi', [ProfileController::class, 'demographics'])->name('profile.demographics');
    Route::get('/fasilitas', [ProfileController::class, 'facilities'])->name('profile.facilities');
});

// Fasilitas Umum & Lembaga Alias
Route::get('/fasilitas', [ProfileController::class, 'facilities'])->name('facilities.index');
Route::get('/lembaga', [ProfileController::class, 'organizations'])->name('organizations.index');

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
// BACKEND & ADMINISTRATOR ROUTES
// ==========================================

// Redirect shortcuts: /admin and /administrator
Route::get('/admin', function () {
    return auth()->check()
        ? redirect()->route('admin.dashboard')
        : redirect()->route('admin.login');
});
Route::get('/administrator', function () {
    return auth()->check()
        ? redirect()->route('admin.dashboard')
        : redirect()->route('admin.login');
});

// Admin Guest Authentication (No Public Register, No Forgot Password)
Route::prefix('admin')->group(function () {
    Route::get('/login', [\App\Http\Controllers\Admin\AuthController::class, 'create'])->name('admin.login');
    Route::get('/masuk', [\App\Http\Controllers\Admin\AuthController::class, 'create']);
    Route::post('/login', [\App\Http\Controllers\Admin\AuthController::class, 'store'])->name('admin.login.store');
});

// Named route 'login' so Laravel's default Auth middleware redirects here
Route::get('/login', fn () => redirect()->route('admin.login'))->name('login');

// Protected Admin System (auth middleware)
Route::prefix('admin')->middleware(['auth'])->group(function () {
    // Logout
    Route::post('/logout', [\App\Http\Controllers\Admin\AuthController::class, 'destroy'])->name('admin.logout');

    // Dashboard Overview
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

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
