<?php

namespace App\Http\Controllers;

use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $trafos = Trafo::all();
        $mapApiKey = env('MAP_API_KEY', '');

        return Inertia::render('Dashboard', [
            'trafos' => $trafos,
            'mapApiKey' => $mapApiKey,
        ]);
    }
}
