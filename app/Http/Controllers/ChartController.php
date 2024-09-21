<?php

namespace App\Http\Controllers;

use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\IHD;
use App\Models\IHDVoltage;
use App\Models\KFactor;
use App\Models\Metric;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\PowerLoss;
use App\Models\Pressure;
use App\Models\ReactivePower;
use App\Models\Temperature;
use App\Models\THDCurrent;
use App\Models\THDVoltage;
use App\Models\Trafo;
use App\Models\TriplenCurrent;
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

        $voltages = Voltage::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $currents = Current::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $frequencies = Frequency::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('Chart/ChartVIF', [
            'trafo' => $trafo,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies,
            'date' => $date,
        ]);
    }

    public function getChartPQSPF($trafoId, $date) {
        $trafo = Trafo::find($trafoId);

        $powers = Power::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $reactivePowers = ReactivePower::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $apparentPowers = ApparentPower::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $powerFactors = PowerFactor::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('Chart/ChartPQSPF', [
            'trafo' => $trafo,
            'powers' => $powers,
            'reactivePowers' => $reactivePowers,
            'apparentPowers' => $apparentPowers,
            'powerFactors' => $powerFactors,
            'date' => $date,
        ]);
    }

    public function getChartTHDIHD($trafoId, $date) {
        $trafo = Trafo::find($trafoId);

        $thdCurrents = THDCurrent::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $thdVoltages = THDVoltage::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('Chart/ChartTHDIHD', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Chart THD',
            'thdCurrents' => $thdCurrents,
            'thdVoltages' => $thdVoltages,
        ]);
    }

    public function getChartIHD($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $ihd = IHD::where('trafo_id', $trafoId)->latest()->get();
        $ihdVoltages = IHDVoltage::where('trafo_id', $trafoId)->latest()->get();

        return Inertia::render('Chart/ChartIHD', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Chart IHD',
            'ihdCurrents' => $ihd,
            'ihdVoltages' => $ihdVoltages,
        ]);
    }

    public function getChartTPO($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $temperatures = Temperature::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $pressures = Pressure::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $oilLevels = OilLevel::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();
        $ambientTemperatures = AmbientTemperature::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('Chart/ChartTPO', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Chart TPO',
            'temperatures' => $temperatures,
            'pressures' => $pressures,
            'oilLevels' => $oilLevels,
            'ambientTemperatures' => $ambientTemperatures,
        ]);
    }

    public function getChartPKA($trafoId, $date)
    {
        $trafo = Trafo::find($trafoId);

        $powerLosses = PowerLoss::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $kFactors = KFactor::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        $triplenCurrents = TriplenCurrent::where('trafo_id', $trafoId)
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('Chart/ChartPKA', [
            'trafo' => $trafo,
            'powerLosses' => $powerLosses,
            'kFactors' => $kFactors,
            'triplenCurrents' => $triplenCurrents,
            'date' => $date,
        ]);
    }

    public function getChartAnalysis($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }
}
