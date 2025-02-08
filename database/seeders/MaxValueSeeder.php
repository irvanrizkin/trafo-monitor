<?php

namespace Database\Seeders;

use App\Models\MaxValue;
use Illuminate\Database\Seeder;

class MaxValueSeeder extends Seeder
{
    public function run()
    {
        $maxValues = [
            ['rule_name' => 'voltage', 'category' => 'vif', 'max_value' => 500],
            ['rule_name' => 'current', 'category' => 'vif', 'max_value' => 200],
            ['rule_name' => 'frequency', 'category' => 'vif', 'max_value' => 100],
        ];

        foreach ($maxValues as $maxValue) {
            MaxValue::create($maxValue);
        }
    }
}