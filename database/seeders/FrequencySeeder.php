<?php

namespace Database\Seeders;

use App\Models\Threshold;
use Illuminate\Database\Seeder;

class FrequencySeeder extends Seeder
{
    public function run()
    {
        // 7.	Frequensi ijo (48-50) merah (0-48)
        $thresholds = [
            [
                'parameter_name' => 'frequency',
                'status' => 'normal',
                'min' => 48,
                'max' => 50,
            ],
            [
                'parameter_name' => 'frequency',
                'status' => 'danger',
                'min' => 0,
                'max' => 48,
            ],
        ];

        foreach ($thresholds as $threshold) {
            Threshold::create($threshold);
        }
    }
}