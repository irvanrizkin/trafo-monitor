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
        Schema::create('millis', function (Blueprint $table) {
            $table->id();
            $table->string('time_iot')->nullable();
            $table->string('time_server_mqtt')->nullable();
            $table->string('time_server_hosting')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('millis');
    }
};
