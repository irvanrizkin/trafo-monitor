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
        Schema::create('triplen_currents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trafo_id');
            $table->string('topic_name');
            $table->double('triplen_current')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('triplen_currents');
    }
};
