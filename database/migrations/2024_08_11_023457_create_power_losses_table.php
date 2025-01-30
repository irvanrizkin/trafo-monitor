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
        Schema::create('power_losses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trafo_id')->default(0);
            $table->string('topic_name')->default(0);
            $table->double('power_loss')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('power_losses');
    }
};
