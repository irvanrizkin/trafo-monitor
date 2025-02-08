<?php

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class VoltageDropSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'resistive_voltage_drop_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_r',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_r',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_s',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_s',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_t',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'resistive_voltage_drop_t',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_r',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_r',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_s',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_s',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_t',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'reactive_voltage_drop_t',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'total_voltage_drop_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'total_voltage_drop_r',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'total_voltage_drop_r',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'total_voltage_drop_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'total_voltage_drop_s',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'total_voltage_drop_s',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'total_voltage_drop_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.5,
            ],
            [
                'parameter_name' => 'total_voltage_drop_t',
                'status' => 'warning',
                'min' => 0.6,
                'max' => 1,
            ],
            [
                'parameter_name' => 'total_voltage_drop_t',
                'status' => 'danger',
                'min' => 1.1,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}