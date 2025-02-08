<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class TemperatureSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'temperature', 'status' => 'normal', 'min' => 0, 'max' => 69],
            ['parameter_name' => 'temperature', 'status' => 'warning', 'min' => 70, 'max' => 79],
            ['parameter_name' => 'temperature', 'status' => 'danger', 'min' => 80, 'max' => 1000],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
