<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoltageSecond extends Model
{
    use HasFactory;

    protected $connection = 'secondmysql';
    protected $table = 'tegangan';
}
