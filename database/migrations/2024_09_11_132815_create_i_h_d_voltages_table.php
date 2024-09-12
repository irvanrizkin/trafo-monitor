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
        Schema::create('i_h_d_voltages', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trafo_id');
            $table->string('topic_name');
            $table->json('h1');
            $table->json('h2');
            $table->json('h3');
            $table->json('h4');
            $table->json('h5');
            $table->json('h6');
            $table->json('h7');
            $table->json('h8');
            $table->json('h9');
            $table->json('h10');
            $table->json('h11');
            $table->json('h12');
            $table->json('h13');
            $table->json('h14');
            $table->json('h15');
            $table->json('h16');
            $table->json('h17');
            $table->json('h18');
            $table->json('h19');
            $table->json('h20');
            $table->json('h21');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('i_h_d_voltages');
    }
};