<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class VoltageSeeder extends Seeder
{
    public function run()
    {
        // V (Tegangan) ijo (198-231) kuning ( 231-250 dan 198-190) merah ( 190 kebawah dan 250 keatas) 
        $thresholds = [
            [
                'parameter_name' => 'voltage_r',
                'status' => 'normal',
                'min' => 198,
                'max' => 231,
            ],
            [
                'parameter_name' => 'voltage_r',
                'status' => 'warning',
                'min' => 231,
                'max' => 250,
            ],
            [
                'parameter_name' => 'voltage_r',
                'status' => 'warning',
                'min' => 190,
                'max' => 198,
            ],
            [
                'parameter_name' => 'voltage_r',
                'status' => 'danger',
                'min' => 250,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'voltage_r',
                'status' => 'danger',
                'min' => 0,
                'max' => 190,
            ],
            [
                'parameter_name' => 'voltage_s',
                'status' => 'normal',
                'min' => 198,
                'max' => 231,
            ],
            [
                'parameter_name' => 'voltage_s',
                'status' => 'warning',
                'min' => 231,
                'max' => 250,
            ],
            [
                'parameter_name' => 'voltage_s',
                'status' => 'warning',
                'min' => 190,
                'max' => 198,
            ],
            [
                'parameter_name' => 'voltage_s',
                'status' => 'danger',
                'min' => 250,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'voltage_s',
                'status' => 'danger',
                'min' => 0,
                'max' => 190,
            ],
            [
                'parameter_name' => 'voltage_t',
                'status' => 'normal',
                'min' => 198,
                'max' => 231,
            ],
            [
                'parameter_name' => 'voltage_t',
                'status' => 'warning',
                'min' => 231,
                'max' => 250,
            ],
            [
                'parameter_name' => 'voltage_t',
                'status' => 'warning',
                'min' => 190,
                'max' => 198,
            ],
            [
                'parameter_name' => 'voltage_t',
                'status' => 'danger',
                'min' => 250,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'voltage_t',
                'status' => 'danger',
                'min' => 0,
                'max' => 190,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}