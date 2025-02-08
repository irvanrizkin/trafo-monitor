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
use App\Models\MaxValue;
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
use App\Services\ThresholdService;
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

        $vifMaxValues = MaxValue::where('category', 'vif')->get();

        $latestVoltageR = optional($voltages->sortByDesc('created_at')->first())->voltage_r ?? 0;
        $latestVoltageS = optional($voltages->sortByDesc('created_at')->first())->voltage_s ?? 0;
        $latestVoltageT = optional($voltages->sortByDesc('created_at')->first())->voltage_t ?? 0;

        $latestCurrentR = optional($currents->sortByDesc('created_at')->first())->current_r ?? 0;
        $latestCurrentS = optional($currents->sortByDesc('created_at')->first())->current_s ?? 0;
        $latestCurrentT = optional($currents->sortByDesc('created_at')->first())->current_t ?? 0;
        $latestCurrentIN = optional($currents->sortByDesc('created_at')->first())->current_in ?? 0;

        $latestFrequency = optional($frequencies->sortByDesc('created_at')->first())->frequency_r ?? 0;

        $iotData = [
            'voltage_r' => $latestVoltageR,
            'voltage_s' => $latestVoltageS,
            'voltage_t' => $latestVoltageT,
            'current_r' => $latestCurrentR,
            'current_s' => $latestCurrentS,
            'current_t' => $latestCurrentT,
            'current_in' => $latestCurrentIN,
            'frequency' => $latestFrequency,
        ];

        $classifiedData = ThresholdService::classifyData($iotData);

        return Inertia::render('Metric/MetricVIF', [
            'trafo' => $trafo,
            'date' => $date,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies,
            'classifiedData' => $classifiedData,
            'maxValue' => $vifMaxValues,
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

        $pqspfMaxValues = MaxValue::where('category', 'pqspf')->get();

        $latestPowerR = optional($powers->sortByDesc('created_at')->first())->power_r ?? 0;
        $latestPowerS = optional($powers->sortByDesc('created_at')->first())->power_s ?? 0;
        $latestPowerT = optional($powers->sortByDesc('created_at')->first())->power_t ?? 0;

        $latestReactivePowerR = optional($reactivePowers->sortByDesc('created_at')->first())->reactive_power_r ?? 0;
        $latestReactivePowerS = optional($reactivePowers->sortByDesc('created_at')->first())->reactive_power_s ?? 0;
        $latestReactivePowerT = optional($reactivePowers->sortByDesc('created_at')->first())->reactive_power_t ?? 0;

        $latestApparentPowerR = optional($apparentPowers->sortByDesc('created_at')->first())->apparent_power_r ?? 0;
        $latestApparentPowerS = optional($apparentPowers->sortByDesc('created_at')->first())->apparent_power_s ?? 0;
        $latestApparentPowerT = optional($apparentPowers->sortByDesc('created_at')->first())->apparent_power_t ?? 0;

        $latestPowerFactorR = optional($powerFactors->sortByDesc('created_at')->first())->power_factor_r ?? 0;
        $latestPowerFactorS = optional($powerFactors->sortByDesc('created_at')->first())->power_factor_s ?? 0;
        $latestPowerFactorT = optional($powerFactors->sortByDesc('created_at')->first())->power_factor_t ?? 0;

        $iotData = [
            'active_power_r' => $latestPowerR,
            'active_power_s' => $latestPowerS,
            'active_power_t' => $latestPowerT,
            'reactive_power_r' => $latestReactivePowerR,
            'reactive_power_s' => $latestReactivePowerS,
            'reactive_power_t' => $latestReactivePowerT,
            'apparent_power_r' => $latestApparentPowerR,
            'apparent_power_s' => $latestApparentPowerS,
            'apparent_power_t' => $latestApparentPowerT,
            'power_factor_r' => $latestPowerFactorR,
            'power_factor_s' => $latestPowerFactorS,
            'power_factor_t' => $latestPowerFactorT,
        ];

        $classifiedData = ThresholdService::classifyData($iotData);

        return Inertia::render('Metric/MetricPQSPF', [
            'trafo' => $trafo,
            'date' => $date,
            'powers' => $powers,
            'reactivePowers' => $reactivePowers,
            'apparentPowers' => $apparentPowers,
            'powerFactors' => $powerFactors,
            'classifiedData' => $classifiedData,
            'maxValue' => $pqspfMaxValues,
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

        $tpoMaxValues = MaxValue::where('category', 'tpo')->get();

        $latestTemperature = optional($temperatures->sortByDesc('created_at')->first())->temperature ?? 0;
        $latestPressure = optional($pressures->sortByDesc('created_at')->first())->pressure ?? 0;
        $latestOilLevel = optional($oilLevels->sortByDesc('created_at')->first())->oil_level ?? 0;
        $latestAmbientTemperature = optional($ambientTemperatures->sortByDesc('created_at')->first())->ambient_temperature ?? 0;

        $iotData = [
            'temperature' => $latestTemperature,
            'pressure' => $latestPressure,
            'oil_level' => $latestOilLevel,
            'ambient_temperature' => $latestAmbientTemperature,
        ];

        $classifiedData = ThresholdService::classifyData($iotData);

        return Inertia::render('Metric/MetricTPO', [
            'trafo' => $trafo,
            'date' => $date,
            'title' => 'Metric TPO',
            'chartRoute' => 'chart.tpo',
            'temperatures' => $temperatures,
            'pressures' => $pressures,
            'oilLevels' => $oilLevels,
            'ambientTemperatures' => $ambientTemperatures,
            'classifiedData' => $classifiedData,
            'maxValue' => $tpoMaxValues,
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
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route('not-found');
        }
        // GIS Calculation
        $ambientTemperatures = AmbientTemperature::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestAmbientTemp = optional($ambientTemperatures->sortByDesc('created_at')->first())->ambient_temperature ?? 0;

        $gis = $latestAmbientTemp + 30;

        // Power Factor Calculation
        $powerFactor = PowerFactor::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestPowerFactorR = optional($powerFactor->sortByDesc('created_at')->first())->power_factor_r ?? 0;
        $latestPowerFactorS = optional($powerFactor->sortByDesc('created_at')->first())->power_factor_s ?? 0;
        $latestPowerFactorT = optional($powerFactor->sortByDesc('created_at')->first())->power_factor_t ?? 0;

        // Oil Pressure
        $pressures = Pressure::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestPressure = optional($pressures->sortByDesc('created_at')->first())->pressure ?? 0;

        // Oil Temperature
        $temperatures = Temperature::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestTemperature = optional($temperatures->sortByDesc('created_at')->first())->temperature ?? 0;

        // THD
        $thd = THDVoltage::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestTHDVoltageR = optional($thd->sortByDesc('created_at')->first())->voltage_r ?? 0;
        $latestTHDVoltageS = optional($thd->sortByDesc('created_at')->first())->voltage_s ?? 0;
        $latestTHDVoltageT = optional($thd->sortByDesc('created_at')->first())->voltage_t ?? 0;

        // Power Loss (I^2 * R)
        // R = V / I
        $currents = Current::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestCurrentR = optional($currents->sortByDesc('created_at')->first())->current_r ?? 0;
        $latestCurrentS = optional($currents->sortByDesc('created_at')->first())->current_s ?? 0;
        $latestCurrentT = optional($currents->sortByDesc('created_at')->first())->current_t ?? 0;

        $voltages = Voltage::where('trafo_id', $trafoId)->whereDate('created_at', $date)->get();

        $latestVoltageR = optional($voltages->sortByDesc('created_at')->first())->voltage_r ?? 0;
        $latestVoltageS = optional($voltages->sortByDesc('created_at')->first())->voltage_s ?? 0;
        $latestVoltageT = optional($voltages->sortByDesc('created_at')->first())->voltage_t ?? 0;

        $powerLossR = $latestCurrentR ** 2 * $latestVoltageR / $latestCurrentR;
        $powerLossS = $latestCurrentS ** 2 * $latestVoltageS / $latestCurrentS;
        $powerLossT = $latestCurrentT ** 2 * $latestVoltageT / $latestCurrentT;

        // Resistive Voltage Drop
        $resistiveVoltageDropR = $latestCurrentR * $latestVoltageR / $latestCurrentR;
        $resistiveVoltageDropS = $latestCurrentS * $latestVoltageS / $latestCurrentS;
        $resistiveVoltageDropT = $latestCurrentT * $latestVoltageT / $latestCurrentT;

        // Reactive Voltage Drop
        $reactiveVoltageDropR = $latestCurrentR * 0.02;
        $reactiveVoltageDropS = $latestCurrentS * 0.02;
        $reactiveVoltageDropT = $latestCurrentT * 0.02;

        // Total Voltage Drop
        $totalVoltageDropR = $latestCurrentR * sqrt($resistiveVoltageDropR ** 2 + $reactiveVoltageDropR ** 2);
        $totalVoltageDropS = $latestCurrentS * sqrt($resistiveVoltageDropS ** 2 + $reactiveVoltageDropS ** 2);
        $totalVoltageDropT = $latestCurrentT * sqrt($resistiveVoltageDropT ** 2 + $reactiveVoltageDropT ** 2);

        $iotData = [
            'gis' => $gis,
            'power_factor_r' => $latestPowerFactorR,
            'power_factor_s' => $latestPowerFactorS,
            'power_factor_t' => $latestPowerFactorT,
            'pressure' => $latestPressure,
            'temperature' => $latestTemperature,
            'ambient_temperature' => $latestAmbientTemp,
            'thd_voltage_r' => $latestTHDVoltageR,
            'thd_voltage_s' => $latestTHDVoltageS,
            'thd_voltage_t' => $latestTHDVoltageT,
            'power_loss_r' => $powerLossR,
            'power_loss_s' => $powerLossS,
            'power_loss_t' => $powerLossT,
            'resistive_voltage_drop_r' => $resistiveVoltageDropR,
            'resistive_voltage_drop_s' => $resistiveVoltageDropS,
            'resistive_voltage_drop_t' => $resistiveVoltageDropT,
            'reactive_voltage_drop_r' => $reactiveVoltageDropR,
            'reactive_voltage_drop_s' => $reactiveVoltageDropS,
            'reactive_voltage_drop_t' => $reactiveVoltageDropT,
            'total_voltage_drop_r' => $totalVoltageDropR,
            'total_voltage_drop_s' => $totalVoltageDropS,
            'total_voltage_drop_t' => $totalVoltageDropT,
        ];

        $classifiedData = ThresholdService::classifyData($iotData);

        return Inertia::render('Metric/MetricAnalysis', [
            'trafo' => $trafo,
            'date' => $date,
            'classifiedData' => $classifiedData,
        ]);
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
