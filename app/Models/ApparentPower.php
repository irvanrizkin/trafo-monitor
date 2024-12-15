<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApparentPower extends Model
{
    use HasFactory;

    protected $fillable = [
        'trafo_id',
        'topic_name',
        'apparent_power_r',
        'apparent_power_s',
        'apparent_power_t',
        'datetime',
    ];
}
