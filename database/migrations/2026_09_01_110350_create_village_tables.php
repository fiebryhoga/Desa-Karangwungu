<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Berita & Pengumuman Desa
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // Berita, Pengumuman, Agenda, Prestasi
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('author')->default('Pemerintah Desa Karangwungu');
            $table->integer('views')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // Struktur Perangkat Desa
        Schema::create('village_officials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position'); // Kepala Desa, Sekretaris Desa, Kaur, dll
            $table->string('nip')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->integer('order')->default(0);
            $table->text('bio')->nullable();
            $table->timestamps();
        });

        // Permohonan Surat Mandiri / Online Warga
        Schema::create('letter_requests', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_code')->unique(); // e.g. KW-20260901-001
            $table->string('citizen_name');
            $table->string('citizen_nik', 16);
            $table->string('citizen_phone');
            $table->string('citizen_address');
            $table->string('letter_type'); // Surat Keterangan Usaha, Domisili, Tidak Mampu, dll
            $table->text('purpose');
            $table->enum('status', ['pending', 'verified', 'processing', 'completed', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->string('file_download_url')->nullable();
            $table->timestamps();
        });

        // Transparansi APBDes
        Schema::create('apbdes_records', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->enum('type', ['income', 'expense', 'financing']); // Pendapatan, Belanja, Pembiayaan
            $table->string('category_name'); // e.g. Pendapatan Asli Desa, Dana Desa, Bidang Pembangunan
            $table->string('subcategory_name')->nullable();
            $table->bigInteger('budget_amount');
            $table->bigInteger('realized_amount')->default(0);
            $table->timestamps();
        });

        // Potensi & UMKM Desa Karangwungu
        Schema::create('potentials', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // Pertanian, Perikanan Tambak, UMKM, Kerajinan
            $table->text('description');
            $table->string('owner_name')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('price_range')->nullable();
            $table->string('location')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Aspirasi & Pengaduan Warga
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact_info');
            $table->string('category'); // Pelayanan, Infrastruktur, Kebersihan, Keamanan, Saran
            $table->text('message');
            $table->boolean('is_public')->default(true);
            $table->text('response')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
        Schema::dropIfExists('potentials');
        Schema::dropIfExists('apbdes_records');
        Schema::dropIfExists('letter_requests');
        Schema::dropIfExists('village_officials');
        Schema::dropIfExists('posts');
    }
};
