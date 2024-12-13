<?php

namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\Current;
use App\Models\DateGroup;
use App\Models\Frequency;
use App\Models\OilLevel;
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
            case 'data4':
                $frequency = Frequency::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'frequency_r' => $value,
                    'frequency_s' => $value,
                    'frequency_t' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($frequency, 201);
            case 'data5':
                $lastCurrent = Current::where('trafo_id', $trafoId)->latest()->first();
                $current = Current::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $value,
                    'current_s' => $lastCurrent?->current_s ?? 0,
                    'current_t' => $lastCurrent?->current_t ?? 0,
                    'current_in' => $lastCurrent?->current_in ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data6':
                $lastCurrent = Current::where('trafo_id', $trafoId)->latest()->first();
                $current = Current::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $lastCurrent?->current_r ?? 0,
                    'current_s' => $value,
                    'current_t' => $lastCurrent?->current_t ?? 0,
                    'current_in' => $lastCurrent?->current_in ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data7':
                $lastCurrent = Current::where('trafo_id', $trafoId)->latest()->first();
                $current = Current::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $lastCurrent?->current_r ?? 0,
                    'current_s' => $lastCurrent?->current_s ?? 0,
                    'current_t' => $value,
                    'current_in' => $lastCurrent?->current_in ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data8':
                $lastCurrent = Current::where('trafo_id', $trafoId)->latest()->first();
                $current = Current::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $lastCurrent?->current_r ?? 0,
                    'current_s' => $lastCurrent?->current_s ?? 0,
                    'current_t' => $lastCurrent?->current_t ?? 0,
                    'current_in' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($current, 201);
            case 'data9':
                $lastTHDVoltage = THDVoltage::where('trafo_id', $trafoId)->latest()->first();
                $thdVoltage = THDVoltage::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r' => $value,
                    'voltage_s' => $lastTHDVoltage?->voltage_s ?? 0,
                    'voltage_t' => $lastTHDVoltage?->voltage_t ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            case 'data10':
                $lastTHDVoltage = THDVoltage::where('trafo_id', $trafoId)->latest()->first();
                $thdVoltage = THDVoltage::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r' => $lastTHDVoltage?->voltage_r ?? 0,
                    'voltage_s' => $value,
                    'voltage_t' => $lastTHDVoltage?->voltage_t ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            case 'data11':
                $lastTHDVoltage = THDVoltage::where('trafo_id', $trafoId)->latest()->first();
                $thdVoltage = THDVoltage::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'voltage_r' => $lastTHDVoltage?->voltage_r ?? 0,
                    'voltage_s' => $lastTHDVoltage?->voltage_s ?? 0,
                    'voltage_t' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdVoltage, 201);
            case 'data12':
                $lastTHDCurrent = THDCurrent::where('trafo_id', $trafoId)->latest()->first();
                $thdCurrent = THDCurrent::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $value,
                    'current_s' => $lastTHDCurrent?->current_s ?? 0,
                    'current_t' => $lastTHDCurrent?->current_t ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            case 'data13':
                $lastTHDCurrent = THDCurrent::where('trafo_id', $trafoId)->latest()->first();
                $thdCurrent = THDCurrent::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $lastTHDCurrent?->current_r ?? 0,
                    'current_s' => $value,
                    'current_t' => $lastTHDCurrent?->current_t ?? 0,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            case 'data14':
                $lastTHDCurrent = THDCurrent::where('trafo_id', $trafoId)->latest()->first();
                $thdCurrent = THDCurrent::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'current_r' => $lastTHDCurrent?->current_r ?? 0,
                    'current_s' => $lastTHDCurrent?->current_s ?? 0,
                    'current_t' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($thdCurrent, 201);
            case 'data15':
                $pressure = Pressure::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'pressure' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($pressure, 201);
            case 'data16':
                $temperature = Temperature::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'temperature' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($temperature, 201);
            case 'data17':
                $ambientTemp = AmbientTemperature::create([
                    'trafo_id' => $trafoId,
                    'topic_name' => $topic,
                    'ambient_temperature' => $value,
                ]);
                $this->insertTodayDate($trafoId);
                return response()->json($ambientTemp, 201);
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
