<?php

namespace App\Http\Controllers;

use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\KFactor;
use App\Models\Metric;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\PowerLoss;
use App\Models\ReactivePower;
use App\Models\THDCurrent;
use App\Models\THDFrequency;
use App\Models\TotalHarmonicDistortion;
use App\Models\Trafo;
use App\Models\TriplenCurrent;
use App\Models\Voltage;
use Inertia\Inertia;

class MetricController extends Controller
{
    public function getMetrics($trafoid, $date)
    {
        $trafo = Trafo::find($trafoid);
        $metrics = Metric::where('trafo_id', $trafoid)
            ->whereDate('created_at', $date)
            ->get();

        return Inertia::render('Metric/Metric', [
            'date' => $date,
            'trafo' => $trafo,
            'metrics' => $metrics,
        ]);
    }

    public function getMetricVIF($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $voltages = Voltage::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $currents = Current::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $frequencies = Frequency::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        return Inertia::render('Metric/MetricVIF', [
            'trafo' => $trafo,
            'date' => $date,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies
        ]);
    }

    public function getMetricPQSPF($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $powers = Power::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $reactivePowers = ReactivePower::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $apparentPowers = ApparentPower::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $powerFactors = PowerFactor::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        return Inertia::render('Metric/MetricPQSPF', [
            'trafo' => $trafo,
            'date' => $date,
            'powers' => $powers,
            'reactivePowers' => $reactivePowers,
            'apparentPowers' => $apparentPowers,
            'powerFactors' => $powerFactors
        ]);
    }

    public function getMetricTHDIHD($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $totalHarmonicDistortions = TotalHarmonicDistortion::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $thdCurrents = THDCurrent::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $thdFrequencies = THDFrequency::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();

        return Inertia::render('Metric/MetricTHDIHD', [
            'trafo' => $trafo,
            'date' => $date,
            'totalHarmonicDistortions' => $totalHarmonicDistortions,
            'thdCurrents' => $thdCurrents,
            'thdFrequencies' => $thdFrequencies
        ]);
    }

    public function getMetricIHD($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }

    public function getMetricPKA($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        $powerLosses = PowerLoss::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $kFactors = KFactor::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $triplenCurrents = TriplenCurrent::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        return Inertia::render('Metric/MetricPKA', [
            'trafo' => $trafo,
            'date' => $date,
            'powerLosses' => $powerLosses,
            'kFactors' => $kFactors,
            'triplenCurrents' => $triplenCurrents
        ]);
    }

    public function getMetricAnalysis($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }
}
