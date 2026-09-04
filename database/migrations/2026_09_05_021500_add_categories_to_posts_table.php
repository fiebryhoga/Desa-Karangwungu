<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->json('categories')->nullable()->after('category');
        });

        // Initialize existing rows with their current category as a single-element array
        $posts = DB::table('posts')->select('id', 'category')->get();
        foreach ($posts as $post) {
            if (!empty($post->category)) {
                DB::table('posts')->where('id', $post->id)->update([
                    'categories' => json_encode([$post->category]),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('categories');
        });
    }
};
