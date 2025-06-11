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

        // Voltage Metrics
        $maxVoltageR = $voltages->sortByDesc("voltage_r")->first();
        $maxVoltageS = $voltages->sortByDesc("voltage_s")->first();
        $maxVoltageT = $voltages->sortByDesc("voltage_t")->first();

        $minVoltageR = $voltages->sortBy("voltage_r")->first();
        $minVoltageS = $voltages->sortBy("voltage_s")->first();
        $minVoltageT = $voltages->sortBy("voltage_t")->first();

        $avgVoltageR = $voltages->avg("voltage_r");
        $avgVoltageS = $voltages->avg("voltage_s");
        $avgVoltageT = $voltages->avg("voltage_t");

        // Current Metrics
        $maxCurrentR = $currents->sortByDesc("current_r")->first();
        $maxCurrentS = $currents->sortByDesc("current_s")->first();
        $maxCurrentT = $currents->sortByDesc("current_t")->first();
        $maxCurrentIn = $currents->sortByDesc("current_in")->first();

        $minCurrentR = $currents->sortBy("current_r")->first();
        $minCurrentS = $currents->sortBy("current_s")->first();
        $minCurrentT = $currents->sortBy("current_t")->first();
        $minCurrentIn = $currents->sortBy("current_in")->first();

        $avgCurrentR = $currents->avg("current_r");
        $avgCurrentS = $currents->avg("current_s");
        $avgCurrentT = $currents->avg("current_t");
        $avgCurrentIn = $currents->avg("current_in");

        // Frequency Metrics
        $maxFrequency = $frequencies->sortByDesc("frequency_r")->first();

        $minFrequency = $frequencies->sortBy("frequency_r")->first();

        $avgFrequency = $frequencies->avg("frequency_r");

        return Inertia::render("Chart/ChartVIF", [
            "trafo" => $trafo,
            "voltages" => $voltages->sortBy("created_at")->slice(-12),
            "currents" => $currents->sortBy("created_at")->slice(-12),
            "frequencies" => $frequencies->sortBy("created_at")->slice(-12),
            "voltageRMetrics" => [
                "max" => $maxVoltageR ? $maxVoltageR->voltage_r : 0,
                "min" => $minVoltageR ? $minVoltageR->voltage_r : 0,
                "avg" => $avgVoltageR,
                "timeOfMax" => $maxVoltageR ? $maxVoltageR->created_at : 0,
                "timeOfMin" => $minVoltageR ? $minVoltageR->created_at : 0,
            ],
            "voltageSMetrics" => [
                "max" => $maxVoltageS ? $maxVoltageS->voltage_s : 0,
                "min" => $minVoltageS ? $minVoltageS->voltage_s : 0,
                "avg" => $avgVoltageS,
                "timeOfMax" => $maxVoltageS ? $maxVoltageS->created_at : 0,
                "timeOfMin" => $minVoltageS ? $minVoltageS->created_at : 0,
            ],
            "voltageTMetrics" => [
                "max" => $maxVoltageT ? $maxVoltageT->voltage_t : 0,
                "min" => $minVoltageT ? $minVoltageT->voltage_t : 0,
                "avg" => $avgVoltageT,
                "timeOfMax" => $maxVoltageT ? $maxVoltageT->created_at : 0,
                "timeOfMin" => $minVoltageT ? $minVoltageT->created_at : 0,
            ],
            "currentRMetrics" => [
                "max" => $maxCurrentR ? $maxCurrentR->current_r : 0,
                "min" => $minCurrentR ? $minCurrentR->current_r : 0,
                "avg" => $avgCurrentR,
                "timeOfMax" => $maxCurrentR ? $maxCurrentR->created_at : 0,
                "timeOfMin" => $minCurrentR ? $minCurrentR->created_at : 0,
            ],
            "currentSMetrics" => [
                "max" => $maxCurrentS ? $maxCurrentS->current_s : 0,
                "min" => $minCurrentS ? $minCurrentS->current_s : 0,
                "avg" => $avgCurrentS,
                "timeOfMax" => $maxCurrentS ? $maxCurrentS->created_at : 0,
                "timeOfMin" => $minCurrentS ? $minCurrentS->created_at : 0,
            ],
            "currentTMetrics" => [
                "max" => $maxCurrentT ? $maxCurrentT->current_t : 0,
                "min" => $minCurrentT ? $minCurrentT->current_t : 0,
                "avg" => $avgCurrentT,
                "timeOfMax" => $maxCurrentT ? $maxCurrentT->created_at : 0,
                "timeOfMin" => $minCurrentT ? $minCurrentT->created_at : 0,
            ],
            "currentInMetrics" => [
                "max" => $maxCurrentIn ? $maxCurrentIn->current_in : 0,
                "min" => $minCurrentIn ? $minCurrentIn->current_in : 0,
                "avg" => $avgCurrentIn,
                "timeOfMax" => $maxCurrentIn ? $maxCurrentIn->created_at : 0,
                "timeOfMin" => $minCurrentIn ? $minCurrentIn->created_at : 0,
            ],
            "frequencyMetrics" => [
                "max" => $maxFrequency ? $maxFrequency->frequency_r : 0,
                "min" => $minFrequency ? $minFrequency->frequency_r : 0,
                "avg" => $avgFrequency,
                "timeOfMax" => $maxFrequency ? $maxFrequency->created_at : 0,
                "timeOfMin" => $minFrequency ? $minFrequency->created_at : 0,
            ],
        ]);
    }
}
