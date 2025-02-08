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
            ['rule_name' => 'power', 'category' => 'pqspf', 'max_value' => 400],
            ['rule_name' => 'power_factor', 'category' => 'pqspf', 'max_value' => 1],
        ];

        foreach ($maxValues as $maxValue) {
            MaxValue::create($maxValue);
        }
    }
}