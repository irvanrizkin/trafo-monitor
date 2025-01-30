<?php

namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\DateGroup;
use App\Models\Frequency;
use App\Models\IHDCurrentV2;
use App\Models\IHDVoltageV2;
use App\Models\KFactor;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\Pressure;
use App\Models\ReactivePower;
use App\Models\Temperature;
use App\Models\THDCurrent;
use App\Models\THDVoltage;
use App\Models\Voltage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MetricMQTTController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $trafoId = $request->route('trafoid');
        
        $validatedData = $request->validate([
            '*.table' => 'required|string',
            '*.data' => 'required|array',
        ]);

        $this->insertTodayDate($trafoId);

        foreach ($validatedData as $entry) {
            $table = $entry['table'];
            $data = $entry['data'];

            if (isset($this->modelMap[$table])) {
                $model = $this->modelMap[$table];
                $model::create($data);
            }
        }

        return response()->json(['message' => 'Data stored successfully'], 201);
    }

    public function insertTodayDate($trafoId) {
        $date = Carbon::now()->format('Y-m-d');
        DateGroup::firstOrCreate([
            'trafo_id' => $trafoId,
            'date_group' => $date,
        ]);
    }

    protected $modelMap = [
        'voltages' => Voltage::class,
        'currents' => Current::class,
        'power_factors' => PowerFactor::class,
        'apparent_powers' => ApparentPower::class,
        'powers' => Power::class,
        'reactive_powers' => ReactivePower::class,
        'frequencies' => Frequency::class,
        'thd_voltages' => THDVoltage::class,
        'ihd_voltages' => IHDVoltageV2::class,
        'thd_currents' => THDCurrent::class,
        'ihd_currents' => IHDCurrentV2::class,
        'k_factors' => KFactor::class,
        'pressures' => Pressure::class,
        'temperatures' => Temperature::class,
        'oil_levels' => OilLevel::class,
        'ambient_temperatures' => AmbientTemperature::class,
    ];
}
