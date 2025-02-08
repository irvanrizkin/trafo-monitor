<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class PressureSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'pressure', 'status' => 'normal', 'min' => 0.2, 'max' => 0.4],
            ['parameter_name' => 'pressure', 'status' => 'warning', 'min' => 0.5, 'max' => 0.7],
            ['parameter_name' => 'pressure', 'status' => 'danger', 'min' => 0.8, 'max' => 1000],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
