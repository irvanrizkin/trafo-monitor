<?php

namespace App\Http\Controllers\Helpers;

class Aggregator
{
    public function aggregate($data, $field)
    {
        $maxValue = $data->max($field);
        $minValue = $data->min($field);
        $avgValue = $data->avg($field);
        $timeOfMax = optional($data->where($field, $maxValue)->first())->created_at ?? 0;
        $timeOfMin = optional($data->where($field, $minValue)->first())->created_at ?? 0;

        return [
            'max' => $maxValue,
            'min' => $minValue,
            'avg' => $avgValue,
            'timeOfMax' => $timeOfMax,
            'timeOfMin' => $timeOfMin,
        ];
    }
}
