<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IHDCurrentV2 extends Model
{
    use HasFactory;

    protected $table = "ihd_currents";

    protected $casts = [
        "trafo_id" => "integer",
        "current_r_h1" => "double",
        "current_s_h1" => "double",
        "current_t_h1" => "double",
        "current_r_h3" => "double",
        "current_s_h3" => "double",
        "current_t_h3" => "double",
        "current_r_h5" => "double",
        "current_s_h5" => "double",
        "current_t_h5" => "double",
        "current_r_h7" => "double",
        "current_s_h7" => "double",
        "current_t_h7" => "double",
        "current_r_h9" => "double",
        "current_s_h9" => "double",
        "current_t_h9" => "double",
        "current_r_h11" => "double",
        "current_s_h11" => "double",
        "current_t_h11" => "double",
        "current_r_h13" => "double",
        "current_s_h13" => "double",
        "current_t_h13" => "double",
        "current_r_h15" => "double",
        "current_s_h15" => "double",
        "current_t_h15" => "double",
        "current_r_h17" => "double",
        "current_s_h17" => "double",
        "current_t_h17" => "double",
        "current_r_h19" => "double",
        "current_s_h19" => "double",
        "current_t_h19" => "double",
        "created_at" => "datetime",
        "updated_at" => "datetime",
    ];

    protected $fillable = [
        "trafo_id",
        "topic_name",
        "current_r_h1",
        "current_s_h1",
        "current_t_h1",
        "current_r_h3",
        "current_s_h3",
        "current_t_h3",
        "current_r_h5",
        "current_s_h5",
        "current_t_h5",
        "current_r_h7",
        "current_s_h7",
        "current_t_h7",
        "current_r_h9",
        "current_s_h9",
        "current_t_h9",
        "current_r_h11",
        "current_s_h11",
        "current_t_h11",
        "current_r_h13",
        "current_s_h13",
        "current_t_h13",
        "current_r_h15",
        "current_s_h15",
        "current_t_h15",
        "current_r_h17",
        "current_s_h17",
        "current_t_h17",
        "current_r_h19",
        "current_s_h19",
        "current_t_h19",
        "datetime",
    ];
}
