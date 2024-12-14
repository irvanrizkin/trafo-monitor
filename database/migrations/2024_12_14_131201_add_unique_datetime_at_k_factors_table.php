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
        Schema::table('k_factors', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('k_factor_r');
            $table->double('k_factor_s');
            $table->double('k_factor_t');
            $table->double('k_factor')->default(0)->change();
            $table->double('k_factor_r')->default(0)->change();
            $table->double('k_factor_s')->default(0)->change();
            $table->double('k_factor_t')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('k_factors', function (Blueprint $table) {
            $table->dropColumn('datetime');
            $table->dropColumn('k_factor_r');
            $table->dropColumn('k_factor_s');
            $table->dropColumn('k_factor_t');
        });
    }
};
