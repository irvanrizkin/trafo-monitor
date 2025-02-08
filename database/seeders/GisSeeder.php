<?php

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class GisSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'gis', 'status' => 'normal', 'min' => 0, 'max' => 69],
            ['parameter_name' => 'gis', 'status' => 'warning', 'min' => 70, 'max' => 79],
            ['parameter_name' => 'gis', 'status' => 'danger', 'min' => 80, 'max' => 1000],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
