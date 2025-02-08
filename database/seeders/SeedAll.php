<?php

namespace Database\Seeders;

use Database\Seeders\ActivePowerSeeder;
use Database\Seeders\AmbientTemperatureSeeder;
use Database\Seeders\ApparentPowerSeeder;
use Database\Seeders\CurrentSeeder;
use Database\Seeders\FrequencySeeder;
use Database\Seeders\GisSeeder;
use Database\Seeders\KFactorSeeder;
use Database\Seeders\MaxValueSeeder;
use Database\Seeders\OilLevelSeeder;
use Database\Seeders\PowerFactorSeeder;
use Database\Seeders\PowerLossSeeder;
use Database\Seeders\PressureSeeder;
use Database\Seeders\ReactivePowerSeeder;
use Database\Seeders\TemperatureSeeder;
use Database\Seeders\THDVoltageSeeder;
use Database\Seeders\VoltageDropSeeder;
use Database\Seeders\VoltageSeeder;
use Illuminate\Database\Seeder;

class SeedAll extends Seeder
{
    public function run()
    {
        $this->call([
            ActivePowerSeeder::class,
            AmbientTemperatureSeeder::class,
            ApparentPowerSeeder::class,
            CurrentSeeder::class,
            FrequencySeeder::class,
            GisSeeder::class,
            KFactorSeeder::class,
            MaxValueSeeder::class,
            OilLevelSeeder::class,
            PowerFactorSeeder::class,
            PowerLossSeeder::class,
            PressureSeeder::class,
            ReactivePowerSeeder::class,
            TemperatureSeeder::class,
            THDVoltageSeeder::class,
            VoltageDropSeeder::class,
            VoltageSeeder::class,
        ]);
    }
}