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
        Schema::create('reactive_powers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trafo_id');
            $table->string('topic_name');
            $table->double('reactive_power_r')->default(0);
            $table->double('reactive_power_s')->default(0);
            $table->double('reactive_power_t')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reactive_powers');
    }
};
