<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\Current;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartAnalysisController extends Controller
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

        // Get 5 latest ambient temperatures
        $ambientTemperatures = AmbientTemperature::where("trafo_id", $trafoId)
            ->orderBy("created_at", "desc")
            ->take(5)
            ->get();

        // Calculate GIS for each ambient temperature
        $gisValues = $ambientTemperatures->map(function ($temperature) {
            return [
                "gis" => $temperature->ambient_temperature + 30, // Example GIS calculation
                "created_at" => $temperature->created_at,
            ];
        });

        // Get the latest GIS value
        $latestGis = $gisValues->first()["gis"] ?? 0;
        // Get the maximum GIS value and its time
        $maxGis = $gisValues->max("gis");
        $maxGisTime =
            $gisValues->where("gis", $maxGis)->first()["created_at"] ?? null;
        // Get the minimum GIS value and its time
        $minGis = $gisValues->min("gis");
        $minGisTime =
            $gisValues->where("gis", $minGis)->first()["created_at"] ?? null;

        // Resistive Voltage Drop (RVD) calculation
        $currents = Current::where("trafo_id", $trafoId)
            ->orderBy("created_at", "desc")
            ->take(5)
            ->get();

        $resistiveVoltageDropsR = $currents->map(function ($current) {
            return [
                "resistive_voltage_drop_r" => $current->current_r * 0.27,
                "created_at" => $current->created_at,
            ];
        });
        $resistiveVoltageDropsS = $currents->map(function ($current) {
            return [
                "resistive_voltage_drop_s" => $current->current_s * 0.27,
                "created_at" => $current->created_at,
            ];
        });
        $resistiveVoltageDropsT = $currents->map(function ($current) {
            return [
                "resistive_voltage_drop_t" => $current->current_t * 0.27,
                "created_at" => $current->created_at,
            ];
        });

        // Reactive Voltage Drop (RVD) calculation
        $reactiveVoltageDropsR = $currents->map(function ($current) {
            return [
                "reactive_voltage_drop_r" => $current->current_r * 0.08,
                "created_at" => $current->created_at,
            ];
        });
        $reactiveVoltageDropsS = $currents->map(function ($current) {
            return [
                "reactive_voltage_drop_s" => $current->current_s * 0.08,
                "created_at" => $current->created_at,
            ];
        });
        $reactiveVoltageDropsT = $currents->map(function ($current) {
            return [
                "reactive_voltage_drop_t" => $current->current_t * 0.08,
                "created_at" => $current->created_at,
            ];
        });

        return Inertia::render("Chart/ChartAnalysis", [
            "trafo" => $trafo,
            "gisValues" => $gisValues,
            "latestGis" => $latestGis,
            "maxGis" => $maxGis,
            "maxGisTime" => $maxGisTime,
            "minGis" => $minGis,
            "minGisTime" => $minGisTime,
            "resistiveVoltageDropsR" => $resistiveVoltageDropsR,
            "resistiveVoltageDropsS" => $resistiveVoltageDropsS,
            "resistiveVoltageDropsT" => $resistiveVoltageDropsT,
            "reactiveVoltageDropsR" => $reactiveVoltageDropsR,
            "reactiveVoltageDropsS" => $reactiveVoltageDropsS,
            "reactiveVoltageDropsT" => $reactiveVoltageDropsT,
        ]);
    }
}
