<?php

namespace App\Http\Controllers;

use App\Models\Millis;
use Illuminate\Http\Request;

class MillisController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'time_iot' => 'nullable',
            'time_server_mqtt' => 'nullable',
        ]);

        Millis::create([
            'time_iot' => $data['time_iot'],
            'time_server_mqtt' => $data['time_server_mqtt'],
            'time_server_hosting' => strval((int)(microtime(true)*1000)),
        ]);

        return response()->json(['message' => 'Millis data created successfully']);
    }
}
