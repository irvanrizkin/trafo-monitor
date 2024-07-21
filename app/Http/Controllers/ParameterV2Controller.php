<?php

namespace App\Http\Controllers;

use App\Models\CurrentSecond;
use App\Models\PressureSecond;
use App\Models\TemperatureSecond;
use App\Models\TrafoSecond;
use App\Models\VoltageSecond;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParameterV2Controller extends Controller
{
    private function getMetrics($trafoid, $model, $property)
    {
        $trafo = TrafoSecond::find($trafoid);
        $min = $model::where('trafo_id', $trafoid)
            ->whereNotNull('value')
            ->min('value');
        $max = $model::where('trafo_id', $trafoid)->max('value');
        $count = $model::where('trafo_id', $trafoid)->count();
        $metrics = $model::selectRaw('DATE(created_at) as created_at, AVG(value) as value')
            ->where('trafo_id', $trafoid)
            ->whereNotNull('value')
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        return Inertia::render('MetricV2/Metric', [
            'trafo' => $trafo,
            'min' => $min,
            'max' => $max,
            'count' => $count,
            'metrics' => $metrics,
            'property' => $property
        ]);
    }

    public function showTemperature(Request $request)
    {
        $trafoId = $request->route('id');

        return $this->getMetrics($trafoId, TemperatureSecond::class, 'Temperature');
    }

    public function showPressure(Request $request)
    {
        $trafoId = $request->route('id');

        return $this->getMetrics($trafoId, PressureSecond::class, 'Pressure');
    }

    public function showVoltage(Request $request)
    {
        $trafoId = $request->route('id');

        return $this->getMetrics($trafoId, VoltageSecond::class, 'Voltage');
    }

    public function showCurrent(Request $request)
    {
        $trafoId = $request->route('id');

        return $this->getMetrics($trafoId, CurrentSecond::class, 'Current');
    }
}
