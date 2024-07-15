<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PressureSecond extends Model
{
    use HasFactory;

    protected $connection = 'secondmysql';
    protected $table = 'tekanan';
}
