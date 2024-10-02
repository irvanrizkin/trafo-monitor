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
        $trafoId = $request->route('trafoid');

        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }

        $aggregator = new Aggregator();

        $voltages = Voltage::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $voltages = $voltages->reverse()->values();
        $currents = Current::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $currents = $currents->reverse()->values();
        $frequencies = Frequency::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $frequencies = $frequencies->reverse()->values();

        $voltageRMetrics = $aggregator->aggregate($voltages, 'voltage_r');
        $voltageSMetrics = $aggregator->aggregate($voltages, 'voltage_s');
        $voltageTMetrics = $aggregator->aggregate($voltages, 'voltage_t');

        $currentRMetrics = $aggregator->aggregate($currents, 'current_r');
        $currentSMetrics = $aggregator->aggregate($currents, 'current_s');
        $currentTMetrics = $aggregator->aggregate($currents, 'current_t');
        $currentInMetrics = $aggregator->aggregate($currents, 'current_in');

        $frequencyMetrics = $aggregator->aggregate($frequencies, 'frequency_r');

        return Inertia::render('Chart/ChartVIF', [
            'trafo' => $trafo,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies,
            'voltageRMetrics' => $voltageRMetrics,
            'voltageSMetrics' => $voltageSMetrics,
            'voltageTMetrics' => $voltageTMetrics,
            'currentRMetrics' => $currentRMetrics,
            'currentSMetrics' => $currentSMetrics,
            'currentTMetrics' => $currentTMetrics,
            'currentInMetrics' => $currentInMetrics,
            'frequencyMetrics' => $frequencyMetrics,
        ]);
    }
}
