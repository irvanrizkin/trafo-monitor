<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\Trafo;
use App\Models\Voltage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Helpers\Aggregator;

class ChartVIFController extends Controller
{
    public function __invoke(Request $request)
    {
        $trafoId = $request->route("trafoid");

        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route("not-found");
        }

        $date = $request->route("date");

        $aggregator = new Aggregator();

        $voltages = Voltage::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $currents = Current::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $frequencies = Frequency::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $last12Voltages = $voltages
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12Currents = $currents
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12Frequencies = $frequencies
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $voltageRMetrics = $aggregator->aggregate($voltages, "voltage_r");
        $voltageSMetrics = $aggregator->aggregate($voltages, "voltage_s");
        $voltageTMetrics = $aggregator->aggregate($voltages, "voltage_t");

        $currentRMetrics = $aggregator->aggregate($currents, "current_r");
        $currentSMetrics = $aggregator->aggregate($currents, "current_s");
        $currentTMetrics = $aggregator->aggregate($currents, "current_t");
        $currentInMetrics = $aggregator->aggregate($currents, "current_in");

        $frequencyMetrics = $aggregator->aggregate($frequencies, "frequency_r");

        return Inertia::render("Chart/ChartVIF", [
            "trafo" => $trafo,
            "date" => $date,
            "voltages" => $last12Voltages,
            "currents" => $last12Currents,
            "frequencies" => $last12Frequencies,
            "voltageRMetrics" => $voltageRMetrics,
            "voltageSMetrics" => $voltageSMetrics,
            "voltageTMetrics" => $voltageTMetrics,
            "currentRMetrics" => $currentRMetrics,
            "currentSMetrics" => $currentSMetrics,
            "currentTMetrics" => $currentTMetrics,
            "currentInMetrics" => $currentInMetrics,
            "frequencyMetrics" => $frequencyMetrics,
        ]);
    }
}
