<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReactivePower extends Model
{
    use HasFactory;

    protected $fillable = [
        'trafo_id',
        'topic_name',
        'reactive_power_r',
        'reactive_power_s',
        'reactive_power_t',
    ];
}
