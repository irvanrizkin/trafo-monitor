<?php

namespace App\Http\Controllers\Helpers;

class Aggregator
{
    public function aggregate($data, $field)
    {
        $maxValue = $data->sortByDesc($field)->first();
        $minValue = $data->sortBy($field)->first();
        $avgValue = $data->avg($field);

        return [
            "max" => $maxValue ? $maxValue->$field : 0,
            "min" => $minValue ? $minValue->$field : 0,
            "avg" => $avgValue,
            "timeOfMax" => $maxValue ? $maxValue->created_at : 0,
            "timeOfMin" => $minValue ? $minValue->created_at : 0,
        ];
    }
}
