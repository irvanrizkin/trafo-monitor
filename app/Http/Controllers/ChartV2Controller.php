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

class ChartV2Controller extends Controller
{
    public function getChartData($trafoId) {
        $trafo = TrafoSecond::find($trafoId);
        $temperatures = $this->getAveragedByModel(TemperatureSecond::class, $trafoId);
        $pressures = $this->getAveragedByModel(PressureSecond::class, $trafoId);
        $voltages = $this->getAveragedByModel(VoltageSecond::class, $trafoId);
        $currents = $this->getAveragedByModel(CurrentSecond::class, $trafoId);

        return Inertia::render('ChartV2/ChartV2', [
            'trafo' => $trafo,
            'temperatures' => $temperatures,
            'pressures' => $pressures,
            'voltages' => $voltages,
            'currents' => $currents,
        ]);
    }

    private function getAveragedByModel($model, $trafoId) {
        return $model::selectRaw('DATE(created_at) as created_at, AVG(value) as value')
            ->where('trafo_id', $trafoId)
            ->whereNotNull('value')
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();
    }
}
