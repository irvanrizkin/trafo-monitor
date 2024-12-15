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
        Schema::table('power_factors', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('power_factor_r')->default(0)->change();
            $table->double('power_factor_s')->default(0)->change();
            $table->double('power_factor_t')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('power_factors', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
