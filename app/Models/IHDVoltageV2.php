<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IHDVoltageV2 extends Model
{
    use HasFactory;

    protected $table = "ihd_voltages";

    protected $casts = [
        "trafo_id" => "integer",
        "voltage_r_h1" => "double",
        "voltage_s_h1" => "double",
        "voltage_t_h1" => "double",
        "voltage_r_h3" => "double",
        "voltage_s_h3" => "double",
        "voltage_t_h3" => "double",
        "voltage_r_h5" => "double",
        "voltage_s_h5" => "double",
        "voltage_t_h5" => "double",
        "voltage_r_h7" => "double",
        "voltage_s_h7" => "double",
        "voltage_t_h7" => "double",
        "voltage_r_h9" => "double",
        "voltage_s_h9" => "double",
        "voltage_t_h9" => "double",
        "voltage_r_h11" => "double",
        "voltage_s_h11" => "double",
        "voltage_t_h11" => "double",
        "voltage_r_h13" => "double",
        "voltage_s_h13" => "double",
        "voltage_t_h13" => "double",
        "voltage_r_h15" => "double",
        "voltage_s_h15" => "double",
        "voltage_t_h15" => "double",
        "voltage_r_h17" => "double",
        "voltage_s_h17" => "double",
        "voltage_t_h17" => "double",
        "voltage_r_h19" => "double",
        "voltage_s_h19" => "double",
        "voltage_t_h19" => "double",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "voltage_r_h1",
        "voltage_s_h1",
        "voltage_t_h1",
        "voltage_r_h3",
        "voltage_s_h3",
        "voltage_t_h3",
        "voltage_r_h5",
        "voltage_s_h5",
        "voltage_t_h5",
        "voltage_r_h7",
        "voltage_s_h7",
        "voltage_t_h7",
        "voltage_r_h9",
        "voltage_s_h9",
        "voltage_t_h9",
        "voltage_r_h11",
        "voltage_s_h11",
        "voltage_t_h11",
        "voltage_r_h13",
        "voltage_s_h13",
        "voltage_t_h13",
        "voltage_r_h15",
        "voltage_s_h15",
        "voltage_t_h15",
        "voltage_r_h17",
        "voltage_s_h17",
        "voltage_t_h17",
        "voltage_r_h19",
        "voltage_s_h19",
        "voltage_t_h19",
        "datetime",
    ];
}
