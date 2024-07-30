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
            'gps' => $gps,
        ]);
    }

    public function create() {
        return Inertia::render('TrafoCreate/TrafoCreateV2');
    }

    public function store() {
        $data = request()->validate([
            'name' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        TrafoSecond::create(
            [
                'name' => $data['name'],
            ]
        );
        GpsSecond::create(
            [
                'trafo' => TrafoSecond::latest()->first()->id,
                'latitude' => $data['latitude'],
                'longtitude' => $data['longitude'],
            ]
        );

        return redirect()->route('v2.dashboard');
    }
}
