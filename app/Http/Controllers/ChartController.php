<?php

namespace App\Http\Controllers;

use App\Models\Current;
use App\Models\Frequency;
use App\Models\Metric;
use App\Models\Trafo;
use App\Models\Voltage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChartController extends Controller
{
    public function getChartData($trafoId, $date) {
        $trafo = Trafo::find($trafoId);

        $metricsAvg = Metric::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(temperature) as temperature,
            AVG(voltage) as voltage,
            AVG(current) as current,
            AVG(pressure) as pressure'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $metrics = Metric::latest()
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->take(10)
            ->get();

        $temperature = Metric::getStats('temperature', $trafoId, $date);
        $voltage = Metric::getStats('voltage', $trafoId, $date);
        $current = Metric::getStats('current', $trafoId, $date);
        $pressure = Metric::getStats('pressure', $trafoId, $date);

        return Inertia::render('Chart/Chart', [
            'trafo' => $trafo,
            'metrics' => $metrics,
            'metricsAvg' => $metricsAvg,
            'temperature' => $temperature,
            'voltage' => $voltage,
            'current' => $current,
            'pressure' => $pressure,
            'date' => $date,
        ]);
    }

    public function getChartVIF($trafoId, $date) {
        $trafo = Trafo::find($trafoId);

        $voltages = Voltage::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(voltage_r) as voltage_r,
            AVG(voltage_s) as voltage_s,
            AVG(voltage_t) as voltage_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $voltagesRaw = Voltage::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgVoltageR = $voltagesRaw->avg('voltage_r');
        $avgVoltageS = $voltagesRaw->avg('voltage_s');
        $avgVoltageT = $voltagesRaw->avg('voltage_t');

        $currents = Current::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(current_r) as current_r,
            AVG(current_s) as current_s,
            AVG(current_t) as current_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $currentsRaw = Current::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgCurrentR = $currentsRaw->avg('current_r');
        $avgCurrentS = $currentsRaw->avg('current_s');
        $avgCurrentT = $currentsRaw->avg('current_t');

        $frequencies = Frequency::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(frequency_r) as frequency_r,
            AVG(frequency_s) as frequency_s,
            AVG(frequency_t) as frequency_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $frequenciesRaw = Frequency::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgFrequencyR = $frequenciesRaw->avg('frequency_r');
        $avgFrequencyS = $frequenciesRaw->avg('frequency_s');
        $avgFrequencyT = $frequenciesRaw->avg('frequency_t');

        return Inertia::render('Chart/ChartVIF', [
            'trafo' => $trafo,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies,
            'avgVoltageR' => $avgVoltageR,
            'avgVoltageS' => $avgVoltageS,
            'avgVoltageT' => $avgVoltageT,
            'avgCurrentR' => $avgCurrentR,
            'avgCurrentS' => $avgCurrentS,
            'avgCurrentT' => $avgCurrentT,
            'avgFrequencyR' => $avgFrequencyR,
            'avgFrequencyS' => $avgFrequencyS,
            'avgFrequencyT' => $avgFrequencyT,
            'date' => $date,
        ]);
    }
}
