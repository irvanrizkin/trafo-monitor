<?php

namespace App\Http\Controllers;

use App\Models\GpsSecond;
use App\Models\TrafoSecond;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardV2Controller extends Controller
{
    public function index()
    {
        $trafos = TrafoSecond::all();
        $gpsArray = GpsSecond::all();

        return Inertia::render('DashboardV2', [
            'trafos' => $trafos,
            'gpsArray' => $gpsArray,
        ]);
    }
}
