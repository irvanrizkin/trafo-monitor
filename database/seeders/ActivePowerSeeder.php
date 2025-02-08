<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class ActivePowerSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'active_power_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 323.9,
            ],
            [
                'parameter_name' => 'active_power_r',
                'status' => 'warning',
                'min' => 324,
                'max' => 380,
            ],
            [
                'parameter_name' => 'active_power_r',
                'status' => 'danger',
                'min' => 380.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'active_power_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 323.9,
            ],
            [
                'parameter_name' => 'active_power_s',
                'status' => 'warning',
                'min' => 324,
                'max' => 380,
            ],
            [
                'parameter_name' => 'active_power_s',
                'status' => 'danger',
                'min' => 380.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'active_power_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 323.9,
            ],
            [
                'parameter_name' => 'active_power_t',
                'status' => 'warning',
                'min' => 324,
                'max' => 380,
            ],
            [
                'parameter_name' => 'active_power_t',
                'status' => 'danger',
                'min' => 380.1,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}