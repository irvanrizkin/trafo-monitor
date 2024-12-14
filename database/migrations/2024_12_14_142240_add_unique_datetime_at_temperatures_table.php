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
        Schema::table('temperatures', function (Blueprint $table) {
            $table->string('datetime')->unique();
            $table->double('temperature')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('temperatures', function (Blueprint $table) {
            $table->dropColumn('datetime');
        });
    }
};
