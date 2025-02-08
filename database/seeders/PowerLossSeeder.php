<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class PowerLossSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'power_loss_r',
                'status' => 'normal',
                'min' => 0,
                'max' => 1,
            ],
            [
                'parameter_name' => 'power_loss_r',
                'status' => 'warning',
                'min' => 1.1,
                'max' => 2,
            ],
            [
                'parameter_name' => 'power_loss_r',
                'status' => 'danger',
                'min' => 2.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'power_loss_s',
                'status' => 'normal',
                'min' => 0,
                'max' => 1,
            ],
            [
                'parameter_name' => 'power_loss_s',
                'status' => 'warning',
                'min' => 1.1,
                'max' => 2,
            ],
            [
                'parameter_name' => 'power_loss_s',
                'status' => 'danger',
                'min' => 2.1,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'power_loss_t',
                'status' => 'normal',
                'min' => 0,
                'max' => 1,
            ],
            [
                'parameter_name' => 'power_loss_t',
                'status' => 'warning',
                'min' => 1.1,
                'max' => 2,
            ],
            [
                'parameter_name' => 'power_loss_t',
                'status' => 'danger',
                'min' => 2.1,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}