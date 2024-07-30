<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrafoSecond extends Model
{
    use HasFactory;

    protected $connection = 'secondmysql';
    protected $table = 'trafo';

    protected $fillable = [
        'name',
        'address',
    ];
}
