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
        $trafoId = $request->route('trafoid');

        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }

        $aggregator = new Aggregator();

        $thdCurrents = THDCurrent::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $thdCurrents = $thdCurrents->reverse()->values();
        $thdVoltages = THDVoltage::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $thdVoltages = $thdVoltages->reverse()->values();

        $thdCurrentRMetrics = $aggregator->aggregate($thdCurrents, 'current_r');
        $thdCurrentSMetrics = $aggregator->aggregate($thdCurrents, 'current_s');
        $thdCurrentTMetrics = $aggregator->aggregate($thdCurrents, 'current_t');

        $thdVoltageRMetrics = $aggregator->aggregate($thdVoltages, 'voltage_r');
        $thdVoltageSMetrics = $aggregator->aggregate($thdVoltages, 'voltage_s');
        $thdVoltageTMetrics = $aggregator->aggregate($thdVoltages, 'voltage_t');

        return Inertia::render('Chart/ChartTHDIHD', [
            'trafo' => $trafo,
            'thdCurrents' => $thdCurrents,
            'thdVoltages' => $thdVoltages,
            'thdCurrentRMetrics' => $thdCurrentRMetrics,
            'thdCurrentSMetrics' => $thdCurrentSMetrics,
            'thdCurrentTMetrics' => $thdCurrentTMetrics,
            'thdVoltageRMetrics' => $thdVoltageRMetrics,
            'thdVoltageSMetrics' => $thdVoltageSMetrics,
            'thdVoltageTMetrics' => $thdVoltageTMetrics,
        ]);
    }
}
