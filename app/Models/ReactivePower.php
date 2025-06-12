<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactivePower extends Model
{
    use HasFactory;

    protected $casts = [
        "id" => "integer",
        "trafo_id" => "integer",
        "reactive_power_r" => "float",
        "reactive_power_s" => "float",
        "reactive_power_t" => "float",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "reactive_power_r",
        "reactive_power_s",
        "reactive_power_t",
    ];
}
