<?php

namespace App\Http\Controllers;

use App\Models\IHD;
use App\Models\IHDCurrentV2;
use App\Models\IHDVoltage;
use App\Models\IHDVoltageV2;
use App\Models\Metric;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChartController extends Controller
{
    public function getChartData($trafoId, $date)
    {
        $trafo = Trafo::find($trafoId);

        $metricsAvg = Metric::selectRaw(
            'DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(temperature) as temperature,
            AVG(voltage) as voltage,
            AVG(current) as current,
            AVG(pressure) as pressure'
        )
            ->where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->groupBy(DB::raw("DATE(created_at), HOUR(created_at)"))
            ->orderBy(DB::raw("DATE(created_at), HOUR(created_at)"))
            ->get();

        $metrics = Metric::latest()
            ->where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->take(10)
            ->get();

        $temperature = Metric::getStats("temperature", $trafoId, $date);
        $voltage = Metric::getStats("voltage", $trafoId, $date);
        $current = Metric::getStats("current", $trafoId, $date);
        $pressure = Metric::getStats("pressure", $trafoId, $date);

        return Inertia::render("Chart/Chart", [
            "trafo" => $trafo,
            "metrics" => $metrics,
            "metricsAvg" => $metricsAvg,
            "temperature" => $temperature,
            "voltage" => $voltage,
            "current" => $current,
            "pressure" => $pressure,
            "date" => $date,
        ]);
    }

    public function getChartIHD($trafoId)
    {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route("not-found");
        }
        $ihd = IHD::where("trafo_id", $trafoId)->latest()->get();
        $ihdVoltages = IHDVoltage::where("trafo_id", $trafoId)->latest()->get();

        return Inertia::render("Chart/ChartIHD", [
            "trafo" => $trafo,
            "title" => "Chart IHD",
            "ihdCurrents" => $ihd,
            "ihdVoltages" => $ihdVoltages,
        ]);
    }

    public function getChartIHDV2($trafoId, $date)
    {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route("not-found");
        }

        $ihdVoltages = IHDVoltageV2::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();
        $ihdCurrents = IHDCurrentV2::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        return Inertia::render("Chart/ChartIHDV2", [
            "trafo" => $trafo,
            "title" => "Chart IHD",
            "ihdVoltages" => $ihdVoltages,
            "ihdCurrents" => $ihdCurrents,
        ]);
    }

    public function getChartAnalysis($trafoId)
    {
        return Inertia::render("ComingSoon");
    }
}
