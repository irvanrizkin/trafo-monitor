<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IHDVoltageV2 extends Model
{
    use HasFactory;

    protected $table = 'ihd_voltages';

    protected $fillable = [
        'trafo_id',
        'topic_name',
        'voltage_r_h1',
        'voltage_s_h1',
        'voltage_t_h1',
        'voltage_r_h3',
        'voltage_s_h3',
        'voltage_t_h3',
        'voltage_r_h5',
        'voltage_s_h5',
        'voltage_t_h5',
        'voltage_r_h7',
        'voltage_s_h7',
        'voltage_t_h7',
        'voltage_r_h9',
        'voltage_s_h9',
        'voltage_t_h9',
        'voltage_r_h11',
        'voltage_s_h11',
        'voltage_t_h11',
        'voltage_r_h13',
        'voltage_s_h13',
        'voltage_t_h13',
        'voltage_r_h15',
        'voltage_s_h15',
        'voltage_t_h15',
        'voltage_r_h17',
        'voltage_s_h17',
        'voltage_t_h17',
        'voltage_r_h19',
        'voltage_s_h19',
        'voltage_t_h19',
        'datetime'
    ];
}
