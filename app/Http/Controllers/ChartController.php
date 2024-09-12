<?php

namespace App\Http\Controllers;

use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\Frequency;
use App\Models\IHD;
use App\Models\IHDCurrent;
use App\Models\IHDVoltage;
use App\Models\IndividualHarmonicDistortion;
use App\Models\KFactor;
use App\Models\Metric;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\PowerLoss;
use App\Models\ReactivePower;
use App\Models\THD;
use App\Models\THDCurrent;
use App\Models\THDFrequency;
use App\Models\THDVoltage;
use App\Models\TotalHarmonicDistortion;
use App\Models\Trafo;
use App\Models\TriplenCurrent;
use App\Models\Voltage;
use Carbon\Carbon;
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
        $oneHourAgo = Carbon::now()->subHour();

        $voltages = Voltage::where('trafo_id', $trafoId)
            ->where('created_at', '>=', $oneHourAgo)
            ->get();

        $currents = Current::where('trafo_id', $trafoId)
            ->where('created_at', '>=', $oneHourAgo)
            ->get();

        $frequencies = Frequency::where('trafo_id', $trafoId)
            ->where('created_at', '>=', $oneHourAgo)
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
        $trafo = Trafo::find($trafoId);
        $thdCurrents = THDCurrent::latest()->where('trafo_id', $trafoId)->take(12)->get();
        $thdVoltages = THDVoltage::latest()->where('trafo_id', $trafoId)->take(12)->get();

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

        return Inertia::render('Chart/ChartTPO', [
            'trafo' => $trafo,
            'date' => $date,
        ]);
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
