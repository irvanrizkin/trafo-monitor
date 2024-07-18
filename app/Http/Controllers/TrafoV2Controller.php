<?php

namespace App\Http\Controllers;

use App\Models\TrafoSecond;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrafoV2Controller extends Controller
{
    public function show($id)
    {
        $trafo = TrafoSecond::find($id);

        return Inertia::render('TrafoV2/Detail', [
            'trafo' => $trafo
        ]);
    }
}
