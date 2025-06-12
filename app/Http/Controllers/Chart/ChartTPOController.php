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
        $trafoId = $request->route("trafoid");

        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route("not-found");
        }

        $date = $request->route("date");

        $aggregator = new Aggregator();

        $temperatures = Temperature::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $pressures = Pressure::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $oilLevels = OilLevel::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $ambientTemperatures = AmbientTemperature::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $last12Temperatures = $temperatures
            ->sortBy("created_at")
            ->slice(-12)
            ->values();
        $last12Pressures = $pressures
            ->sortBy("created_at")
            ->slice(-12)
            ->values();
        $last12OilLevels = $oilLevels
            ->sortBy("created_at")
            ->slice(-12)
            ->values();
        $last12AmbientTemperatures = $ambientTemperatures
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $temperatureMetrics = $aggregator->aggregate(
            $temperatures,
            "temperature"
        );
        $pressureMetrics = $aggregator->aggregate($pressures, "pressure");
        $oilLevelMetrics = $aggregator->aggregate($oilLevels, "oil_level");
        $ambientTemperatureMetrics = $aggregator->aggregate(
            $ambientTemperatures,
            "ambient_temperature"
        );

        return Inertia::render("Chart/ChartTPO", [
            "trafo" => $trafo,
            "date" => $date,
            "temperatures" => $last12Temperatures,
            "pressures" => $last12Pressures,
            "oilLevels" => $last12OilLevels,
            "ambientTemperatures" => $last12AmbientTemperatures,
            "temperatureMetrics" => $temperatureMetrics,
            "pressureMetrics" => $pressureMetrics,
            "oilLevelMetrics" => $oilLevelMetrics,
            "ambientTemperatureMetrics" => $ambientTemperatureMetrics,
        ]);
    }
}
