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
        Schema::table('voltages', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('voltage_r')->default(0)->change();
            $table->double('voltage_s')->default(0)->change();
            $table->double('voltage_t')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voltages', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
