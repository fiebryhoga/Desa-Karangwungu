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
        Schema::table('potentials', function (Blueprint $table) {
            $table->text('content')->nullable()->after('description');
            $table->string('operating_hours')->nullable()->after('location');
            $table->string('certification')->nullable()->after('operating_hours');
            $table->string('production_capacity')->nullable()->after('certification');
            $table->string('min_order')->nullable()->after('production_capacity');
            $table->json('features')->nullable()->after('min_order');
            $table->json('gallery')->nullable()->after('features');
            $table->string('gmaps_url')->nullable()->after('gallery');
            $table->string('contact_whatsapp')->nullable()->after('contact_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('potentials', function (Blueprint $table) {
            $table->dropColumn([
                'content',
                'operating_hours',
                'certification',
                'production_capacity',
                'min_order',
                'features',
                'gallery',
                'gmaps_url',
                'contact_whatsapp',
            ]);
        });
    }
};
