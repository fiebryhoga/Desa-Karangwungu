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
        Schema::table('apbdes_records', function (Blueprint $table) {
            $table->string('icon', 50)->nullable()->after('code');
        });

        // Backfill default icons for existing expense categories
        $records = \Illuminate\Support\Facades\DB::table('apbdes_records')->where('type', 'expense')->get();
        foreach ($records as $record) {
            $icon = 'Layers';
            $lower = strtolower($record->category_name);
            if (str_contains($lower, 'pembangunan')) $icon = 'Hammer';
            elseif (str_contains($lower, 'pemerintahan')) $icon = 'Landmark';
            elseif (str_contains($lower, 'bencana')) $icon = 'AlertTriangle';
            elseif (str_contains($lower, 'pemberdayaan')) $icon = 'Users';
            elseif (str_contains($lower, 'pembinaan')) $icon = 'HeartHandshake';

            \Illuminate\Support\Facades\DB::table('apbdes_records')->where('id', $record->id)->update(['icon' => $icon]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apbdes_records', function (Blueprint $table) {
            $table->dropColumn('icon');
        });
    }
};
