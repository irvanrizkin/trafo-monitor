<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Helpers\Aggregator;
use App\Models\ApparentPower;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\ReactivePower;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartPQSPFController extends Controller
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

        $powers = Power::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $reactivePowers = ReactivePower::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $apparentPowers = ApparentPower::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $powerFactors = PowerFactor::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $last12Powers = $powers
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12ReactivePowers = $reactivePowers
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12ApparentPowers = $apparentPowers
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $last12PowerFactors = $powerFactors
            ->sortBy("created_at")
            ->slice(-12)
            ->values();

        $powerRMetrics = $aggregator->aggregate($powers, "power_r");
        $powerSMetrics = $aggregator->aggregate($powers, "power_s");
        $powerTMetrics = $aggregator->aggregate($powers, "power_t");

        $reactivePowerRMetrics = $aggregator->aggregate(
            $reactivePowers,
            "reactive_power_r"
        );
        $reactivePowerSMetrics = $aggregator->aggregate(
            $reactivePowers,
            "reactive_power_s"
        );
        $reactivePowerTMetrics = $aggregator->aggregate(
            $reactivePowers,
            "reactive_power_t"
        );

        $apparentPowerRMetrics = $aggregator->aggregate(
            $apparentPowers,
            "apparent_power_r"
        );
        $apparentPowerSMetrics = $aggregator->aggregate(
            $apparentPowers,
            "apparent_power_s"
        );
        $apparentPowerTMetrics = $aggregator->aggregate(
            $apparentPowers,
            "apparent_power_t"
        );

        $powerFactorRMetrics = $aggregator->aggregate(
            $powerFactors,
            "power_factor_r"
        );
        $powerFactorSMetrics = $aggregator->aggregate(
            $powerFactors,
            "power_factor_s"
        );
        $powerFactorTMetrics = $aggregator->aggregate(
            $powerFactors,
            "power_factor_t"
        );

        return Inertia::render("Chart/ChartPQSPF", [
            "trafo" => $trafo,
            "date" => $date,
            "powers" => $last12Powers,
            "reactivePowers" => $last12ReactivePowers,
            "apparentPowers" => $last12ApparentPowers,
            "powerFactors" => $last12PowerFactors,
            "powerRMetrics" => $powerRMetrics,
            "powerSMetrics" => $powerSMetrics,
            "powerTMetrics" => $powerTMetrics,
            "reactivePowerRMetrics" => $reactivePowerRMetrics,
            "reactivePowerSMetrics" => $reactivePowerSMetrics,
            "reactivePowerTMetrics" => $reactivePowerTMetrics,
            "apparentPowerRMetrics" => $apparentPowerRMetrics,
            "apparentPowerSMetrics" => $apparentPowerSMetrics,
            "apparentPowerTMetrics" => $apparentPowerTMetrics,
            "powerFactorRMetrics" => $powerFactorRMetrics,
            "powerFactorSMetrics" => $powerFactorSMetrics,
            "powerFactorTMetrics" => $powerFactorTMetrics,
        ]);
    }
}
