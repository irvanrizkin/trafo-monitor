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

        $voltages = Voltage::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(voltage_r) as voltage_r,
            AVG(voltage_s) as voltage_s,
            AVG(voltage_t) as voltage_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $voltagesRaw = Voltage::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgVoltageR = $voltagesRaw->avg('voltage_r');
        $avgVoltageS = $voltagesRaw->avg('voltage_s');
        $avgVoltageT = $voltagesRaw->avg('voltage_t');

        $currents = Current::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(current_r) as current_r,
            AVG(current_s) as current_s,
            AVG(current_t) as current_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $currentsRaw = Current::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgCurrentR = $currentsRaw->avg('current_r');
        $avgCurrentS = $currentsRaw->avg('current_s');
        $avgCurrentT = $currentsRaw->avg('current_t');

        $frequencies = Frequency::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(frequency_r) as frequency_r,
            AVG(frequency_s) as frequency_s,
            AVG(frequency_t) as frequency_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $frequenciesRaw = Frequency::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgFrequencyR = $frequenciesRaw->avg('frequency_r');
        $avgFrequencyS = $frequenciesRaw->avg('frequency_s');
        $avgFrequencyT = $frequenciesRaw->avg('frequency_t');

        return Inertia::render('Chart/ChartVIF', [
            'trafo' => $trafo,
            'voltages' => $voltages,
            'currents' => $currents,
            'frequencies' => $frequencies,
            'avgVoltageR' => $avgVoltageR,
            'avgVoltageS' => $avgVoltageS,
            'avgVoltageT' => $avgVoltageT,
            'avgCurrentR' => $avgCurrentR,
            'avgCurrentS' => $avgCurrentS,
            'avgCurrentT' => $avgCurrentT,
            'avgFrequencyR' => $avgFrequencyR,
            'avgFrequencyS' => $avgFrequencyS,
            'avgFrequencyT' => $avgFrequencyT,
            'date' => $date,
        ]);
    }

    public function getChartPQSPF($trafoId, $date) {
        $trafo = Trafo::find($trafoId);

        $powers = Power::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(power_r) as power_r,
            AVG(power_s) as power_s,
            AVG(power_t) as power_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $powersRaw = Power::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgPowerR = $powersRaw->avg('power_r');
        $avgPowerS = $powersRaw->avg('power_s');
        $avgPowerT = $powersRaw->avg('power_t');

        $reactivePowers = ReactivePower::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(reactive_power_r) as reactive_power_r,
            AVG(reactive_power_s) as reactive_power_s,
            AVG(reactive_power_t) as reactive_power_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $reactivePowersRaw = ReactivePower::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgReactivePowerR = $reactivePowersRaw->avg('reactive_power_r');
        $avgReactivePowerS = $reactivePowersRaw->avg('reactive_power_s');
        $avgReactivePowerT = $reactivePowersRaw->avg('reactive_power_t');

        $apparentPowers = ApparentPower::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(apparent_power_r) as apparent_power_r,
            AVG(apparent_power_s) as apparent_power_s,
            AVG(apparent_power_t) as apparent_power_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $apparentPowersRaw = ApparentPower::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgApparentPowerR = $apparentPowersRaw->avg('apparent_power_r');
        $avgApparentPowerS = $apparentPowersRaw->avg('apparent_power_s');
        $avgApparentPowerT = $apparentPowersRaw->avg('apparent_power_t');

        $powerFactors = PowerFactor::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(power_factor_r) as power_factor_r,
            AVG(power_factor_s) as power_factor_s,
            AVG(power_factor_t) as power_factor_t'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $powerFactorsRaw = PowerFactor::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $avgPowerFactorR = $powerFactorsRaw->avg('power_factor_r');
        $avgPowerFactorS = $powerFactorsRaw->avg('power_factor_s');
        $avgPowerFactorT = $powerFactorsRaw->avg('power_factor_t');

        return Inertia::render('Chart/ChartPQSPF', [
            'trafo' => $trafo,
            'powers' => $powers,
            'reactivePowers' => $reactivePowers,
            'apparentPowers' => $apparentPowers,
            'powerFactors' => $powerFactors,
            'avgPowerR' => $avgPowerR,
            'avgPowerS' => $avgPowerS,
            'avgPowerT' => $avgPowerT,
            'avgReactivePowerR' => $avgReactivePowerR,
            'avgReactivePowerS' => $avgReactivePowerS,
            'avgReactivePowerT' => $avgReactivePowerT,
            'avgApparentPowerR' => $avgApparentPowerR,
            'avgApparentPowerS' => $avgApparentPowerS,
            'avgApparentPowerT' => $avgApparentPowerT,
            'avgPowerFactorR' => $avgPowerFactorR,
            'avgPowerFactorS' => $avgPowerFactorS,
            'avgPowerFactorT' => $avgPowerFactorT,
            'date' => $date,
        ]);
    }

    public function getChartTHDIHD($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }

    public function getChartIHD($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }

    public function getChartPKA($trafoId, $date)
    {
        $trafo = Trafo::find($trafoId);

        $powerLosses = PowerLoss::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(power_loss) as power_loss'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $powerLossesRaw = PowerLoss::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $maxPowerLoss = $powerLossesRaw->max('power_loss');
        $avgPowerLoss = $powerLossesRaw->avg('power_loss');
        $minPowerLoss = $powerLossesRaw->min('power_loss');

        $kFactors = KFactor::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(k_factor) as k_factor'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $kFactorsRaw = KFactor::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $maxKFactor = $kFactorsRaw->max('k_factor');
        $avgKFactor = $kFactorsRaw->avg('k_factor');
        $minKFactor = $kFactorsRaw->min('k_factor');

        $triplenCurrents = TriplenCurrent::selectRaw('DATE(created_at) as date, HOUR(created_at) as hour,
            AVG(triplen_current) as triplen_current'
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->groupBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->orderBy(DB::raw('DATE(created_at), HOUR(created_at)'))
            ->get();

        $triplenCurrentsRaw = TriplenCurrent::where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->get();
        $maxTriplenCurrent = $triplenCurrentsRaw->max('triplen_current');
        $avgTriplenCurrent = $triplenCurrentsRaw->avg('triplen_current');
        $minTriplenCurrent = $triplenCurrentsRaw->min('triplen_current');

        return Inertia::render('Chart/ChartPKA', [
            'trafo' => $trafo,
            'powerLosses' => $powerLosses,
            'kFactors' => $kFactors,
            'triplenCurrents' => $triplenCurrents,
            'maxPowerLoss' => $maxPowerLoss,
            'avgPowerLoss' => $avgPowerLoss,
            'minPowerLoss' => $minPowerLoss,
            'maxKFactor' => $maxKFactor,
            'avgKFactor' => $avgKFactor,
            'minKFactor' => $minKFactor,
            'maxTriplenCurrent' => $maxTriplenCurrent,
            'avgTriplenCurrent' => $avgTriplenCurrent,
            'minTriplenCurrent' => $minTriplenCurrent,
            'date' => $date,
        ]);
    }

    public function getChartAnalysis($trafoId, $date) {
        return Inertia::render('ComingSoon');
    }
}
