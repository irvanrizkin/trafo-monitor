<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class ReactivePowerSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'reactive_power_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 200,
            ],
            [
                'parameter_name' => 'reactive_power_r',
                'status' => 'warning',
                'min' => 200.1,
                'max' => 320,
            ],
            [
                'parameter_name' => 'reactive_power_r',
                'status' => 'danger',
                'min' => 320.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'reactive_power_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 200,
            ],
            [
                'parameter_name' => 'reactive_power_s',
                'status' => 'warning',
                'min' => 200.1,
                'max' => 320,
            ],
            [
                'parameter_name' => 'reactive_power_s',
                'status' => 'danger',
                'min' => 320.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'reactive_power_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 200,
            ],
            [
                'parameter_name' => 'reactive_power_t',
                'status' => 'warning',
                'min' => 200.1,
                'max' => 320,
            ],
            [
                'parameter_name' => 'reactive_power_t',
                'status' => 'danger',
                'min' => 320.1,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}