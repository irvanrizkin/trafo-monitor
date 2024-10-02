<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helpers\Aggregator;
use App\Models\KFactor;
use App\Models\PowerLoss;
use App\Models\Trafo;
use App\Models\TriplenCurrent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartPKAController extends Controller
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

        $powerLosses = PowerLoss::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $powerLosses = $powerLosses->reverse()->values();

        $kFactors = KFactor::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $kFactors = $kFactors->reverse()->values();

        $triplenCurrents = TriplenCurrent::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $triplenCurrents = $triplenCurrents->reverse()->values();

        $powerLossMetrics = $aggregator->aggregate($powerLosses, 'power_loss');
        $kFactorMetrics = $aggregator->aggregate($kFactors, 'k_factor');
        $triplenCurrentMetrics = $aggregator->aggregate($triplenCurrents, 'triplen_current');

        return Inertia::render('Chart/ChartPKA', [
            'trafo' => $trafo,
            'powerLosses' => $powerLosses,
            'kFactors' => $kFactors,
            'triplenCurrents' => $triplenCurrents,
            'powerLossMetrics' => $powerLossMetrics,
            'kFactorMetrics' => $kFactorMetrics,
            'triplenCurrentMetrics' => $triplenCurrentMetrics,
        ]);
    }
}
