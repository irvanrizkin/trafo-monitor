<?php

namespace App\Http\Controllers;

use App\Models\GpsSecond;
use App\Models\TrafoSecond;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrafoV2Controller extends Controller
{
    public function show($id)
    {
        $trafo = TrafoSecond::find($id);
        $gps = GpsSecond::where('trafo', $id)->first();

        return Inertia::render('TrafoV2/Detail', [
            'trafo' => $trafo,
            'gps' => $gps
        ]);
    }
}
