<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PowerFactor extends Model
{
    use HasFactory;

    protected $casts = [
        "id" => "integer",
        "trafo_id" => "integer",
        "power_factor_r" => "float",
        "power_factor_s" => "float",
        "power_factor_t" => "float",
        "datetime" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "power_factor_r",
        "power_factor_s",
        "power_factor_t",
        "datetime",
    ];
}
