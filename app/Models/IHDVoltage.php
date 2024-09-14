<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IHDVoltage extends Model
{
    use HasFactory;

    protected $fillable = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'h8',
        'h9',
        'h10',
        'h11',
        'h12',
        'h13',
        'h14',
        'h15',
        'h16',
        'h17',
        'h18',
        'h19',
        'h20',
        'h21',
    ];

    protected $casts = [
        'h1' => 'array',
        'h2' => 'array',
        'h3' => 'array',
        'h4' => 'array',
        'h5' => 'array',
        'h6' => 'array',
        'h7' => 'array',
        'h8' => 'array',
        'h9' => 'array',
        'h10' => 'array',
        'h11' => 'array',
        'h12' => 'array',
        'h13' => 'array',
        'h14' => 'array',
        'h15' => 'array',
        'h16' => 'array',
        'h17' => 'array',
        'h18' => 'array',
        'h19' => 'array',
        'h20' => 'array',
        'h21' => 'array',
    ];
}
