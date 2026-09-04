<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('apbdes_records', function (Blueprint $table) {
            $table->string('code', 20)->nullable()->after('subcategory_name');
        });

        // Backfill existing records
        $records = DB::table('apbdes_records')->get();
        foreach ($records as $record) {
            $code = null;
            if (preg_match('/\(([^)]+)\)/', $record->category_name, $matches)) {
                $code = strtoupper(trim($matches[1]));
            }
            if (!$code && $record->type === 'income') {
                $code = 'LAIN';
            }
            if ($code) {
                DB::table('apbdes_records')->where('id', $record->id)->update(['code' => $code]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apbdes_records', function (Blueprint $table) {
            $table->dropColumn('code');
        });
    }
};
