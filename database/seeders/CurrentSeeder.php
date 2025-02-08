<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class CurrentSeeder extends Seeder
{
    public function run()
    {
        // 2.	(Arus) ijo (5-100) kuning ( 100-110) merah (0-5 dan 110 keatas)
        $thresholds = [
            [
                'parameter_name' => 'current_r',
                'status' => 'normal',
                'min' => 5,
                'max' => 100,
            ],
            [
                'parameter_name' => 'current_r',
                'status' => 'warning',
                'min' => 100,
                'max' => 110,
            ],
            [
                'parameter_name' => 'current_r',
                'status' => 'danger',
                'min' => 0,
                'max' => 5,
            ],
            [
                'parameter_name' => 'current_r',
                'status' => 'danger',
                'min' => 110,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'current_s',
                'status' => 'normal',
                'min' => 5,
                'max' => 100,
            ],
            [
                'parameter_name' => 'current_s',
                'status' => 'warning',
                'min' => 100,
                'max' => 110,
            ],
            [
                'parameter_name' => 'current_s',
                'status' => 'danger',
                'min' => 0,
                'max' => 5,
            ],
            [
                'parameter_name' => 'current_s',
                'status' => 'danger',
                'min' => 110,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'current_t',
                'status' => 'normal',
                'min' => 5,
                'max' => 100,
            ],
            [
                'parameter_name' => 'current_t',
                'status' => 'warning',
                'min' => 100,
                'max' => 110,
            ],
            [
                'parameter_name' => 'current_t',
                'status' => 'danger',
                'min' => 0,
                'max' => 5,
            ],
            [
                'parameter_name' => 'current_t',
                'status' => 'danger',
                'min' => 110,
                'max' => 1000,
            ],
            [
                'parameter_name' => 'current_in',
                'status' => 'normal',
                'min' => 5,
                'max' => 100,
            ],
            [
                'parameter_name' => 'current_in',
                'status' => 'warning',
                'min' => 100,
                'max' => 110,
            ],
            [
                'parameter_name' => 'current_in',
                'status' => 'danger',
                'min' => 0,
                'max' => 5,
            ],
            [
                'parameter_name' => 'current_in',
                'status' => 'danger',
                'min' => 110,
                'max' => 1000,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}