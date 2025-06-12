<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class THDCurrent extends Model
{
    use HasFactory;

    protected $casts = [
        "id" => "integer",
        "trafo_id" => "integer",
        "current_r" => "float",
        "current_s" => "float",
        "current_t" => "float",
        "datetime" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "current_r",
        "current_s",
        "current_t",
        "datetime",
    ];
}
