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
        Schema::create('legal_products', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul / Tentang
            $table->string('slug')->nullable()->unique();
            $table->string('document_type'); // Keputusan Kepala Desa (SK), Peraturan Desa (Perdes), Peraturan Bersama, Keputusan BPD
            $table->string('document_number'); // e.g. Nomor 04 Tahun 2026
            $table->integer('year'); // e.g. 2026
            $table->date('effective_date')->nullable(); // Tanggal penetapan / berlaku
            $table->enum('status', ['active', 'amended', 'repealed'])->default('active'); // Berlaku, Diubah, Dicabut
            $table->text('description')->nullable(); // Ringkasan isi
            $table->string('file_url')->nullable(); // Path PDF / berkas
            $table->string('file_name')->nullable(); // Nama file asli
            $table->string('file_size')->nullable(); // Ukuran file (e.g. 1.2 MB)
            $table->integer('download_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_products');
    }
};
