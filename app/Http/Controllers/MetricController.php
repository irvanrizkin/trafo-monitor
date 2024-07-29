<?php

namespace App\Http\Controllers;

use App\Models\Metric;
use App\Models\Trafo;
use Inertia\Inertia;

class MetricController extends Controller
{
    public function getMetrics($trafoid, $date)
    {
        $trafo = Trafo::find($trafoid);
        $metrics = Metric::where('trafo_id', $trafoid)
            ->whereDate('created_at', $date)
            ->get();

        return Inertia::render('Metric/Metric', [
            'date' => $date,
            'trafo' => $trafo,
            'metrics' => $metrics,
        ]);
    }
}
