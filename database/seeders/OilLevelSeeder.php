<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class OilLevelSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'oil_level', 'status' => 'normal', 'min' => 7, 'max' => 100],
            ['parameter_name' => 'oil_level', 'status' => 'warning', 'min' => 3, 'max' => 6.9],
            ['parameter_name' => 'oil_level', 'status' => 'danger', 'min' => 1, 'max' => 2.9],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
