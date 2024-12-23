<?php

namespace App\Http\Controllers;

use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\IHD;
use App\Models\IHDCurrent;
use App\Models\IHDCurrentV2;
use App\Models\IHDVoltage;
use App\Models\IHDVoltageV2;
use App\Models\IndividualHarmonicDistortion;
use App\Models\KFactor;
use App\Models\Metric;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\PowerLoss;
use App\Models\Pressure;
use App\Models\ReactivePower;
use App\Models\Temperature;
use App\Models\THD;
use App\Models\THDCurrent;
use App\Models\THDFrequency;
use App\Models\THDVoltage;
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
        if (!$trafo) {
            return redirect()->route('not-found');
        }
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
        if (!$trafo) {
            return redirect()->route('not-found');
        }
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
        if (!$trafo) {
            return redirect()->route('not-found');
        }
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
        if (!$trafo) {
            return redirect()->route('not-found');
        }
        $thdCurrents = THDCurrent::where('trafo_id', $trafoId)->get();
        $thdVoltages = THDVoltage::where('trafo_id', $trafoId)->get();

        return Inertia::render('Metric/MetricTHDIHD', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Metric THD',
            'chartRoute' => 'chart.thd-ihd',
            'thdCurrents' => $thdCurrents,
            'thdVoltages' => $thdVoltages,
        ]);
    }

    public function getMetricIHD($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }
        $ihd = IHD::where('trafo_id', $trafoId)->latest()->get();
        $ihdVoltage = IHDVoltage::where('trafo_id', $trafoId)->latest()->get();

        return Inertia::render('Metric/MetricIHD', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Metric IHD',
            'chartRoute' => 'chart.ihd',
            'ihdCurrents' => $ihd,
            'ihdVoltages' => $ihdVoltage,
        ]);
    }

    public function getMetricIHDV2($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }
        $ihdCurrents = IHDCurrentV2::where('trafo_id', $trafoId)->get();
        $ihdVoltages = IHDVoltageV2::where('trafo_id', $trafoId)->get();

        return Inertia::render('Metric/MetricIHDV2', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Metric IHD',
            'chartRoute' => 'chart.ihd-v2',
            'ihdCurrents' => $ihdCurrents,
            'ihdVoltages' => $ihdVoltages,
        ]);
    }

    public function getMetricTPO($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }
        $temperatures = Temperature::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $pressures = Pressure::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $oilLevels = OilLevel::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();
        $ambientTemperatures = AmbientTemperature::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        return Inertia::render('Metric/MetricTPO', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Metric TPO',
            'chartRoute' => 'chart.tpo',
            'temperatures' => $temperatures,
            'pressures' => $pressures,
            'oilLevels' => $oilLevels,
            'ambientTemperatures' => $ambientTemperatures
        ]);
    }

    public function getMetricPKA($trafoId, $date) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }
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

    public function storeMetricTHD($trafoId) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return response()->json([
                'message' => 'Trafo not found'
            ], 404);
        }

        $thd = new THD();
        $thd->trafo_id = $trafoId;
        $thd->topic_name = 'THD';
        $thd->h1 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h2 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h3 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h4 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h5 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h6 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h7 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h8 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h9 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h10 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h11 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h12 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h13 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h14 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $thd->h15 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];

        $thd->save();

        return response()->json([
            'message' => 'Dummy THD created successfully'
        ], 201);
    }

    public function storeMetricIHD($trafoId) {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return response()->json([
                'message' => 'Trafo not found'
            ], 404);
        }

       $ihd = new IHD();
        // $ihd = new IHDVoltage();
        $ihd->trafo_id = $trafoId;
        $ihd->topic_name = 'IHD';
        $ihd->h1 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h2 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h3 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h4 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h5 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h6 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h7 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h8 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h9 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h10 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h11 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h12 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h13 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h14 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h15 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h16 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h17 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h18 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h19 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h20 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];
        $ihd->h21 = ['r' => rand(1, 100), 's' => rand(1, 100), 't' => rand(1, 100)];

        $ihd->save();

        return response()->json([
            'message' => 'Dummy IHD created successfully'
        ], 201);
    }
}
