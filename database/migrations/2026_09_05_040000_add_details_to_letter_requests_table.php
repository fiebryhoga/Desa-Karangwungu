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
        Schema::table('letter_requests', function (Blueprint $table) {
            $table->string('letter_number')->nullable()->after('letter_type');
            $table->string('birth_place')->nullable()->after('citizen_nik');
            $table->date('birth_date')->nullable()->after('birth_place');
            $table->string('gender')->nullable()->after('birth_date');
            $table->string('religion')->default('Islam')->after('gender');
            $table->string('occupation')->nullable()->after('religion');
            $table->json('extra_data')->nullable()->after('admin_notes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('letter_requests', function (Blueprint $table) {
            $table->dropColumn([
                'letter_number',
                'birth_place',
                'birth_date',
                'gender',
                'religion',
                'occupation',
                'extra_data',
            ]);
        });
    }
};
