<?php

namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\ApparentPower;
use App\Models\Current;
use App\Models\DateGroup;
use App\Models\Frequency;
use App\Models\OilLevel;
use App\Models\Power;
use App\Models\PowerFactor;
use App\Models\Pressure;
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
            // Frequency
            case 'data20':
                $frequency = Frequency::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'frequency_r' => $value,
                    'frequency_s' => $value,
                    'frequency_t' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($frequency, 201);
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
            case 'data18':
                $oilLevel = OilLevel::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'ambient_temperature' => $value,
                ]);
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
