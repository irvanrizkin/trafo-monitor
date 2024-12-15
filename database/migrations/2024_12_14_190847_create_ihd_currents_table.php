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
        Schema::create('ihd_currents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('trafo_id');
            $table->string('topic_name');
            for ($i = 1; $i <= 19; $i += 2) {
                $table->double("current_r_h$i")->default(0);
                $table->double("current_s_h$i")->default(0);
                $table->double("current_t_h$i")->default(0);
            }
            $table->timestamps();
            $table->string('datetime')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ihd_currents');
    }
};
