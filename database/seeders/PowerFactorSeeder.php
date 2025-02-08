<?php

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class PowerFactorSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            ['parameter_name' => 'power_factor_r', 'status' => 'warning', 'min' => 0.85, 'max' => 0.93],
            ['parameter_name' => 'power_factor_r', 'status' => 'normal', 'min' => 0.94, 'max' => 0.95],
            ['parameter_name' => 'power_factor_r', 'status' => 'danger', 'min' => 0.96, 'max' => 1000],
            ['parameter_name' => 'power_factor_s', 'status' => 'warning', 'min' => 0.85, 'max' => 0.93],
            ['parameter_name' => 'power_factor_s', 'status' => 'normal', 'min' => 0.94, 'max' => 0.95],
            ['parameter_name' => 'power_factor_s', 'status' => 'danger', 'min' => 0.96, 'max' => 1000],
            ['parameter_name' => 'power_factor_t', 'status' => 'warning', 'min' => 0.85, 'max' => 0.93],
            ['parameter_name' => 'power_factor_t', 'status' => 'normal', 'min' => 0.94, 'max' => 0.95],
            ['parameter_name' => 'power_factor_t', 'status' => 'danger', 'min' => 0.96, 'max' => 1000],
        ];
        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}
