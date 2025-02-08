<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class KFactorSeeder extends Seeder
{
    public function run()
    {
        $thresholds = [
            [
                'parameter_name' => 'k_factor',
                'status' => 'normal',
                'min' => 0,
                'max' => 0.99,
            ],
            [
                'parameter_name' => 'k_factor',
                'status' => 'warning',
                'min' => 1,
                'max' => 1.19,
            ],
            [
                'parameter_name' => 'k_factor',
                'status' => 'danger',
                'min' => 1.2,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}