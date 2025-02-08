<?php

use Illuminate\Database\Seeder;

class SeedAll extends Seeder
{
    public function run()
    {
        $this->call([
            GisSeeder::class,
            PowerFactorSeeder::class,
            PowerLossSeeder::class,
            PressureSeeder::class,
            TemperatureSeeder::class,
            THDVoltageSeeder::class,
            VoltageDropSeeder::class,
        ]);
    }
}