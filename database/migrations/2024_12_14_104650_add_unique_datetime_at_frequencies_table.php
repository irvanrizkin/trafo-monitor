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
        Schema::table('frequencies', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('frequency_r')->default(0)->change();
            $table->double('frequency_s')->default(0)->change();
            $table->double('frequency_t')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('frequecies', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
