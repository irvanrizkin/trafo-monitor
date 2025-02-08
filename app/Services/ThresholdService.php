<?php

namespace App\Services;

use App\Models\Threshold;

class ThresholdService {
    public static function classifyData($iotData) {
        $thresholds = Threshold::all()->groupBy('parameter_name');
        $classifiedData = [];

        foreach ($iotData as $parameter => $value) {
            if (!isset($thresholds[$parameter])) {
                continue;
            }
            $status = '-';

            foreach ($thresholds[$parameter] as $threshold) {
                if ($value >= $threshold->min && $value <= $threshold->max) {
                    $status = $threshold->status;
                    break;
                }
            }

            $classifiedData[$parameter] = [
                'value' => $value,
                'status' => $status,
            ];
        }

        return $classifiedData;
    }
}
