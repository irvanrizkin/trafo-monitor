<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
    use HasFactory;

    public static function getStats($column, $trafoId, $date) {
        return self::selectRaw("
            AVG($column) as avg,
            MAX($column) as max,
            MIN($column) as min,
            COUNT($column) as count"
        )
            ->where('trafo_id', $trafoId)
            ->whereDate('created_at', $date)
            ->first();
    }
}
