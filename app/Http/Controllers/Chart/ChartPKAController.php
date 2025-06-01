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

        $aggregator = new Aggregator();

        $kFactors = KFactor::where("trafo_id", $trafoId)
            ->orderBy("created_at", "desc")
            ->limit(12)
            ->get();
        $kFactors = $kFactors->reverse()->values();

        $kFactorMetrics = $aggregator->aggregate($kFactors, "k_factor");

        return Inertia::render("Chart/ChartPKA", [
            "trafo" => $trafo,
            "kFactors" => $kFactors,
            "kFactorMetrics" => $kFactorMetrics,
        ]);
    }
}
