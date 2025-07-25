<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class THDVoltage extends Model
{
    use HasFactory;

    protected $casts = [
        "id" => "integer",
        "trafo_id" => "integer",
        "voltage_r" => "float",
        "voltage_s" => "float",
        "voltage_t" => "float",
        "datetime" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "voltage_r",
        "voltage_s",
        "voltage_t",
        "datetime",
    ];
}
