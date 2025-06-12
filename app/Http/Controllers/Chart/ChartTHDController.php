<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helpers\Aggregator;
use App\Models\THDCurrent;
use App\Models\THDVoltage;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartTHDController extends Controller
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

        $thdCurrents = THDCurrent::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $thdVoltages = THDVoltage::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $last12THDCurrents = $thdCurrents
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12THDVoltages = $thdVoltages
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $thdCurrentRMetrics = $aggregator->aggregate($thdCurrents, "current_r");
        $thdCurrentSMetrics = $aggregator->aggregate($thdCurrents, "current_s");
        $thdCurrentTMetrics = $aggregator->aggregate($thdCurrents, "current_t");

        $thdVoltageRMetrics = $aggregator->aggregate($thdVoltages, "voltage_r");
        $thdVoltageSMetrics = $aggregator->aggregate($thdVoltages, "voltage_s");
        $thdVoltageTMetrics = $aggregator->aggregate($thdVoltages, "voltage_t");

        return Inertia::render("Chart/ChartTHDIHD", [
            "trafo" => $trafo,
            "date" => $date,
            "thdCurrents" => $last12THDCurrents,
            "thdVoltages" => $last12THDVoltages,
            "thdCurrentRMetrics" => $thdCurrentRMetrics,
            "thdCurrentSMetrics" => $thdCurrentSMetrics,
            "thdCurrentTMetrics" => $thdCurrentTMetrics,
            "thdVoltageRMetrics" => $thdVoltageRMetrics,
            "thdVoltageSMetrics" => $thdVoltageSMetrics,
            "thdVoltageTMetrics" => $thdVoltageTMetrics,
        ]);
    }
}
