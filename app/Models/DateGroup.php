<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DateGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'trafo_id',
        'date_group',
    ];
}
