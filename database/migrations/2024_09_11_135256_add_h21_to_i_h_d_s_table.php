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
        Schema::table('i_h_d_s', function (Blueprint $table) {
            $table->json('h16')->after('h15');
            $table->json('h17')->after('h16');
            $table->json('h18')->after('h17');
            $table->json('h19')->after('h18');
            $table->json('h20')->after('h19');
            $table->json('h21')->after('h20');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('i_h_d_s', function (Blueprint $table) {
            $table->dropColumn('h15');
            $table->dropColumn('h16');
            $table->dropColumn('h17');
            $table->dropColumn('h18');
            $table->dropColumn('h19');
            $table->dropColumn('h20');
            $table->dropColumn('h21');
        });
    }
};
