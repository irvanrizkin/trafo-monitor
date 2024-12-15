<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OilLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'trafo_id',
        'topic_name',
        'oil_level',
        'datetime'
    ];
}
