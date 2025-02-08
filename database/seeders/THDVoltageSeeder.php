<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class THDVoltageSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'thd_voltage_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 4.9,
            ],
            [
                'parameter_name' => 'thd_voltage_r',
                'status' => 'warning',
                'min' => 5,
                'max' => 8,
            ],
            [
                'parameter_name' => 'thd_voltage_r',
                'status' => 'danger',
                'min' => 8.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'thd_voltage_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 4.9,
            ],
            [
                'parameter_name' => 'thd_voltage_s',
                'status' => 'warning',
                'min' => 5,
                'max' => 8,
            ],
            [
                'parameter_name' => 'thd_voltage_s',
                'status' => 'danger',
                'min' => 8.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'thd_voltage_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 4.9,
            ],
            [
                'parameter_name' => 'thd_voltage_t',
                'status' => 'warning',
                'min' => 5,
                'max' => 8,
            ],
            [
                'parameter_name' => 'thd_voltage_t',
                'status' => 'danger',
                'min' => 8.1,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}