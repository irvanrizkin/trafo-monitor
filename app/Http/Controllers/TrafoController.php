<?php

namespace App\Http\Controllers;

use App\Models\Metric;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TrafoController extends Controller
{
    public function showWithDates($id) {
        $trafo = Trafo::find($id);
        $dates = Metric::selectRaw('DATE(created_at) as date')
            ->where('trafo_id', $id)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        return Inertia::render('Trafo/DetailV1', [
            'trafo' => $trafo,
            'dates' => $dates,
        ]);
    }
}
