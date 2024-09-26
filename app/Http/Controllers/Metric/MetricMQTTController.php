<?php

namespace App\Http\Controllers\Metric;

use App\Http\Controllers\Controller;
use App\Models\AmbientTemperature;
use App\Models\DateGroup;
use App\Models\Frequency;
use App\Models\OilLevel;
use App\Models\Pressure;
use App\Models\Temperature;
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
