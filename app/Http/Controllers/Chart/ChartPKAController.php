<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helpers\Aggregator;
use App\Models\KFactor;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartPKAController extends Controller
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

        $kFactors = KFactor::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $last12KFactors = $kFactors
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $kFactorRMetrics = $aggregator->aggregate($kFactors, "k_factor_r");
        $kFactorSMetrics = $aggregator->aggregate($kFactors, "k_factor_s");
        $kFactorTMetrics = $aggregator->aggregate($kFactors, "k_factor_t");

        return Inertia::render("Chart/ChartPKA", [
            "trafo" => $trafo,
            "kFactors" => $last12KFactors,
            "kFactorRMetrics" => $kFactorRMetrics,
            "kFactorSMetrics" => $kFactorSMetrics,
            "kFactorTMetrics" => $kFactorTMetrics,
        ]);
    }
}
