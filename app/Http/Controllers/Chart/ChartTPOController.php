<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helpers\Aggregator;
use App\Models\AmbientTemperature;
use App\Models\OilLevel;
use App\Models\Pressure;
use App\Models\Temperature;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartTPOController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $trafoId = $request->route('trafoid');
        $date = $request->route('date');

        $trafo = Trafo::find($trafoId);

        $aggregator = new Aggregator();

        $temperatures = Temperature::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $pressures = Pressure::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $oilLevels = OilLevel::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $ambientTemperatures = AmbientTemperature::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $temperatureMetrics = $aggregator->aggregate($temperatures, 'temperature');
        $pressureMetrics = $aggregator->aggregate($pressures, 'pressure');
        $oilLevelMetrics = $aggregator->aggregate($oilLevels, 'oil_level');
        $ambientTemperatureMetrics = $aggregator->aggregate($ambientTemperatures, 'ambient_temperature');

        return Inertia::render('Chart/ChartTPO', [
            'trafo' => $trafo,
            'date' => $date,
            'temperatures' => $temperatures,
            'pressures' => $pressures,
            'oilLevels' => $oilLevels,
            'ambientTemperatures' => $ambientTemperatures,
            'temperatureMetrics' => $temperatureMetrics,
            'pressureMetrics' => $pressureMetrics,
            'oilLevelMetrics' => $oilLevelMetrics,
            'ambientTemperatureMetrics' => $ambientTemperatureMetrics,
        ]);
    }
}
