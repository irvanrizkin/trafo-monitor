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

        return Inertia::render('Dashboard', [
            'trafos' => $trafos,
        ]);
    }
}
