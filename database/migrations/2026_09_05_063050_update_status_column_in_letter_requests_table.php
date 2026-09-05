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
        // Alter status column to VARCHAR(50) so it accepts: 'menunggu', 'bisa_diambil', 'selesai', 'ditolak'
        DB::statement("ALTER TABLE letter_requests MODIFY COLUMN status VARCHAR(50) NOT NULL DEFAULT 'menunggu'");

        // Standardize existing records to the 4 user-defined statuses
        DB::table('letter_requests')->whereIn('status', ['pending'])->update(['status' => 'menunggu']);
        DB::table('letter_requests')->whereIn('status', ['verified', 'processing', 'ready'])->update(['status' => 'bisa_diambil']);
        DB::table('letter_requests')->whereIn('status', ['completed'])->update(['status' => 'selesai']);
        DB::table('letter_requests')->whereIn('status', ['rejected'])->update(['status' => 'ditolak']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('letter_requests')->where('status', 'menunggu')->update(['status' => 'pending']);
        DB::table('letter_requests')->where('status', 'bisa_diambil')->update(['status' => 'processing']);
        DB::table('letter_requests')->where('status', 'selesai')->update(['status' => 'completed']);
        DB::table('letter_requests')->where('status', 'ditolak')->update(['status' => 'rejected']);

        DB::statement("ALTER TABLE letter_requests MODIFY COLUMN status ENUM('pending', 'verified', 'processing', 'completed', 'rejected') NOT NULL DEFAULT 'pending'");
    }
};
