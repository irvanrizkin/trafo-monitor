<?php

namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\DateGroup;
use App\Models\Frequency;
use App\Models\IHDCurrentV2;
use App\Models\IHDVoltageV2;
use App\Models\KFactor;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\Pressure;
use App\Models\ReactivePower;
use App\Models\Temperature;
use App\Models\THDCurrent;
use App\Models\THDVoltage;
use App\Models\Voltage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MetricMQTTController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $trafoId = $request->route('trafoid');
        $data = $request->all();
        $topic = $data['topic'] ?? null;
        $value = $data['value'] ?? null;
        if (!$topic || !$value) {
            return response()->json([
                'message' => 'Invalid request',
            ], 400);
        }
        switch ($topic) {
            // Voltage
            case 'data1':
                $voltage = Voltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($voltage, 201);
            case 'data2':
                $voltage = Voltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($voltage, 201);
            case 'data3':
                $voltage = Voltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($voltage, 201);
            // Current
            case 'data4':
                $current = Current::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data5':
                $current = Current::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data6':
                $current = Current::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data7':
                $current = Current::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_in' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_in']);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            // Power Factor
            case 'data8':
                $powerFactor = PowerFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_factor_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_factor_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($powerFactor, 201);
            case 'data9':
                $powerFactor = PowerFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_factor_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_factor_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($powerFactor, 201);
            case 'data10':
                $powerFactor = PowerFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_factor_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_factor_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($powerFactor, 201);
            // Apparent Power
            case 'data11':
                $apparentPower = ApparentPower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'apparent_power_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['apparent_power_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($apparentPower, 201);
            case 'data12':
                $apparentPower = ApparentPower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'apparent_power_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['apparent_power_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($apparentPower, 201);
            case 'data13':
                $apparentPower = ApparentPower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'apparent_power_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['apparent_power_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($apparentPower, 201);
            // Active Power
            case 'data14':
                $power = Power::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($power, 201);
            case 'data15':
                $power = Power::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($power, 201);
            case 'data16':
                $power = Power::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'power_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['power_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($power, 201);
            // Reactive Power
            case 'data17':
                $reactivePower = ReactivePower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'reactive_power_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['reactive_power_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($reactivePower, 201);
            case 'data18':
                $reactivePower = ReactivePower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'reactive_power_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['reactive_power_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($reactivePower, 201);
            case 'data19':
                $reactivePower = ReactivePower::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'reactive_power_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['reactive_power_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($reactivePower, 201);
            // Frequency
            case 'data20':
                $frequency = Frequency::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'frequency_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['frequency_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($frequency, 201);
            // THD Voltage
            case 'data21':
                $thdVoltage = THDVoltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            case 'data22':
                $thdVoltage = THDVoltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            case 'data23':
                $thdVoltage = THDVoltage::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            // IHD Voltage R
            case 'data24':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data25':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data26':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data27':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data28':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data29':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data30':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data31':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data32':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data33':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_r_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            // IHD Voltage S
            case 'data34':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data35':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data36':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data37':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data38':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data39':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data40':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data41':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data42':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data43':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_s_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_s_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            // IHD Voltage T
            case 'data44':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data45':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data46':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data47':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data48':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data49':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data50':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data51':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data52':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            case 'data53':
                $ihdVoltage = IHDVoltageV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_t_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['voltage_t_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdVoltage, 201);
            // THD Current
            case 'data54':
                $thdCurrent = THDCurrent::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            case 'data55':
                $thdCurrent = THDCurrent::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            case 'data56':
                $thdCurrent = THDCurrent::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            // IHD Current R
            case 'data57':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data58':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data59':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data60':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data61':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data62':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data63':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data64':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data65':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data67':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_r_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            // IHD Current S
            case 'data68':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data69':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data70':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data71':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data72':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data73':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data74':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data75':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data76':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data77':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_s_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_s_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            // IHD Current T
            case 'data78':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h1' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h1']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data79':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h3' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h3']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data80':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h5' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h5']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data81':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h7' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h7']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data82':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h9' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h9']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data83':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h11' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h11']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data84':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h13' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h13']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data85':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h15' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h15']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data86':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h17' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h17']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            case 'data87':
                $ihdCurrent = IHDCurrentV2::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_t_h19' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['current_t_h19']);
                $this->insertTodayDate($trafoId);
                return response()->json($ihdCurrent, 201);
            // K Factor
            case 'data88':
                $kFactor = KFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'k_factor_r' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['k_factor_r']);
                $this->insertTodayDate($trafoId);
                return response()->json($kFactor, 201);
            case 'data89':
                $kFactor = KFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'k_factor_s' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['k_factor_s']);
                $this->insertTodayDate($trafoId);
                return response()->json($kFactor, 201);
            case 'data90':
                $kFactor = KFactor::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'k_factor_t' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['k_factor_t']);
                $this->insertTodayDate($trafoId);
                return response()->json($kFactor, 201);
            case 'data91':
                $pressure = Pressure::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'pressure' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['pressure']);
                $this->insertTodayDate($trafoId);
                return response()->json($pressure, 201);
            case 'data92':
                $temperature = Temperature::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'temperature' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['temperature']);
                $this->insertTodayDate($trafoId);
                return response()->json($temperature, 201);
            case 'data93':
                $ambientTemperature = AmbientTemperature::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'ambient_temperature' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['ambient_temperature']);
                $this->insertTodayDate($trafoId);
                return response()->json($ambientTemperature, 201);
            case 'data94':
                $oilLevel = OilLevel::upsert([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'oil_level' => $value,
                    'datetime' => Carbon::now()->toDateTimeString(),
                ], ['trafo_id', 'topic_name', 'datetime'], ['oil_level']);
                $this->insertTodayDate($trafoId);
                return response()->json($oilLevel, 201);
            default:
                return response()->json([
                    'message' => 'Invalid topic',
                ], 400);
        }
    }

    public function insertTodayDate($trafoId) {
        $date = Carbon::now()->format('Y-m-d');
        DateGroup::firstOrCreate([
            'trafo_id' => $trafoId,
            'date_group' => $date,
        ]);
    }
}
