<?php namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\PowerFactor;
use App\Models\Pressure;
use App\Models\THDVoltage;
use App\Models\Temperature;
use App\Models\Trafo;
use App\Models\Current;
use App\Services\Analytics\GisService;
use App\Services\ThresholdService;
use Inertia\Inertia;

class MetricAnalyticController extends Controller
{
    public function __invoke($trafoId, $date)
    {
        $trafo = Trafo::find($trafoId);
        if (!$trafo) {
            return redirect()->route("not-found");
        }
        // GIS Calculation
        $gisService = new GisService();
        $gisData = $gisService->getGisData($trafoId);
        $gis = $gisData["latestGis"] ?? 0;

        // Ambient Temperature
        $ambientTemperatures = AmbientTemperature::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestAmbientTemp =
            optional($ambientTemperatures->sortByDesc("created_at")->first())
                ->ambient_temperature ?? 0;

        // Power Factor Calculation
        $powerFactor = PowerFactor::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestPowerFactorR =
            optional($powerFactor->sortByDesc("created_at")->first())
                ->power_factor_r ?? 0;
        $latestPowerFactorS =
            optional($powerFactor->sortByDesc("created_at")->first())
                ->power_factor_s ?? 0;
        $latestPowerFactorT =
            optional($powerFactor->sortByDesc("created_at")->first())
                ->power_factor_t ?? 0;

        // Oil Pressure
        $pressures = Pressure::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestPressure =
            optional($pressures->sortByDesc("created_at")->first())->pressure ??
            0;

        // Oil Temperature
        $temperatures = Temperature::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestTemperature =
            optional($temperatures->sortByDesc("created_at")->first())
                ->temperature ?? 0;

        // THD
        $thd = THDVoltage::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestTHDVoltageR =
            optional($thd->sortByDesc("created_at")->first())->voltage_r ?? 0;
        $latestTHDVoltageS =
            optional($thd->sortByDesc("created_at")->first())->voltage_s ?? 0;
        $latestTHDVoltageT =
            optional($thd->sortByDesc("created_at")->first())->voltage_t ?? 0;

        // Power Loss (I^2 * R)
        // R = V / I
        $currents = Current::where("trafo_id", $trafoId)
            ->whereDate("created_at", $date)
            ->get();

        $latestCurrentR =
            optional($currents->sortByDesc("created_at")->first())->current_r ??
            0;
        $latestCurrentS =
            optional($currents->sortByDesc("created_at")->first())->current_s ??
            0;
        $latestCurrentT =
            optional($currents->sortByDesc("created_at")->first())->current_t ??
            0;

        $highestCurrentR = $currents->max("current_r") ?? 0;
        $highestCurrentS = $currents->max("current_s") ?? 0;
        $highestCurrentT = $currents->max("current_t") ?? 0;

        $powerLossR = $highestCurrentR ** 2 * 0.195;
        $powerLossS = $highestCurrentS ** 2 * 0.195;
        $powerLossT = $highestCurrentT ** 2 * 0.195;

        // Resistive Voltage Drop
        $resistiveVoltageDropR = $latestCurrentR * 0.27;
        $resistiveVoltageDropS = $latestCurrentS * 0.27;
        $resistiveVoltageDropT = $latestCurrentT * 0.27;

        // Reactive Voltage Drop
        $reactiveVoltageDropR = $latestCurrentR * 0.08;
        $reactiveVoltageDropS = $latestCurrentS * 0.08;
        $reactiveVoltageDropT = $latestCurrentT * 0.08;

        // Total Voltage Drop
        $totalVoltageDropR = $highestCurrentR * (0.195 * 0.686 + 0.08 * 0.7315);
        $totalVoltageDropS = $highestCurrentS * (0.195 * 0.686 + 0.08 * 0.7315);
        $totalVoltageDropT = $highestCurrentT * (0.195 * 0.686 + 0.08 * 0.7315);

        $iotData = [
            "gis" => $gis,
            "power_factor_r" => $latestPowerFactorR,
            "power_factor_s" => $latestPowerFactorS,
            "power_factor_t" => $latestPowerFactorT,
            "pressure" => $latestPressure,
            "temperature" => $latestTemperature,
            "ambient_temperature" => $latestAmbientTemp,
            "thd_voltage_r" => $latestTHDVoltageR,
            "thd_voltage_s" => $latestTHDVoltageS,
            "thd_voltage_t" => $latestTHDVoltageT,
            "power_loss_r" => $powerLossR,
            "power_loss_s" => $powerLossS,
            "power_loss_t" => $powerLossT,
            "resistive_voltage_drop_r" => $resistiveVoltageDropR,
            "resistive_voltage_drop_s" => $resistiveVoltageDropS,
            "resistive_voltage_drop_t" => $resistiveVoltageDropT,
            "reactive_voltage_drop_r" => $reactiveVoltageDropR,
            "reactive_voltage_drop_s" => $reactiveVoltageDropS,
            "reactive_voltage_drop_t" => $reactiveVoltageDropT,
            "total_voltage_drop_r" => $totalVoltageDropR,
            "total_voltage_drop_s" => $totalVoltageDropS,
            "total_voltage_drop_t" => $totalVoltageDropT,
        ];

        $classifiedData = ThresholdService::classifyData($iotData);

        return Inertia::render("Metric/MetricAnalysis", [
            "trafo" => $trafo,
            "date" => $date,
            "maxTimeGis" => $gisData["maxTimeGis"] ?? null,
            "classifiedData" => [...$classifiedData],
        ]);
    }
}
