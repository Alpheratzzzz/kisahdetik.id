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
        if (! Schema::hasColumn('gallery_items', 'video')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->string('video')->nullable();
            });
        }

        if (! Schema::hasColumn('gallery_items', 'video_type')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->string('video_type')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('gallery_items', 'video_type')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->dropColumn('video_type');
            });
        }

        if (Schema::hasColumn('gallery_items', 'video')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->dropColumn('video');
            });
        }
    }
};
