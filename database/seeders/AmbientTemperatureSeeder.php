<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class AmbientTemperatureSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'ambient_temperature', 'status' => 'normal', 'min' => 15, 'max' => 35],
            ['parameter_name' => 'ambient_temperature', 'status' => 'warning', 'min' => 35.1, 'max' => 40],
            ['parameter_name' => 'ambient_temperature', 'status' => 'danger', 'min' => 40.1, 'max' => 1000],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
