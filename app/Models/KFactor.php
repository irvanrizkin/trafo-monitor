<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'trafo_id',
        'topic_name',
        'k_factor_r',
        'k_factor_s',
        'k_factor_t',
        'datetime'
    ];
}
