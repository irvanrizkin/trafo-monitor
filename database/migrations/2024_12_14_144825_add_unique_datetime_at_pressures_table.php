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
        Schema::table('pressures', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('pressure')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pressures', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
