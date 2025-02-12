<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Millis extends Model
{
    use HasFactory;

    protected $fillable = [
        'time_iot',
        'time_server_mqtt',
        'time_server_hosting',
    ];
}
