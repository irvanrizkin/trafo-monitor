<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpsSecond extends Model
{
    use HasFactory;

    protected $connection='secondmysql';
    protected $table='gps';

    protected $fillable = [
        'trafo',
        'latitude',
        'longtitude',
    ];
}
