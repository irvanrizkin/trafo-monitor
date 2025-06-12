<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Power extends Model
{
    use HasFactory;

    protected $casts = [
        "id" => "integer",
        "trafo_id" => "integer",
        "power_r" => "float",
        "power_s" => "float",
        "power_t" => "float",
        "datetime" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "power_r",
        "power_s",
        "power_t",
        "datetime",
    ];
}
