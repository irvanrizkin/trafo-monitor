<?php

namespace App\Http\Controllers;

use App\Models\DateGroup;
use App\Models\Trafo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrafoController extends Controller
{
    public function showWithDates($id)
    {
        $trafo = Trafo::find($id);
        if (!$trafo) {
            return redirect()->route("not-found");
        }
        $dates = DateGroup::where("trafo_id", $id)
            ->orderByRaw("CAST(date_group AS DATE) ASC")
            ->get();

        return Inertia::render("Trafo/DetailV1", [
            "trafo" => $trafo,
            "dates" => $dates,
        ]);
    }

    public function create()
    {
        return Inertia::render("TrafoCreate/TrafoCreateV1");
    }

    public function store()
    {
        $data = request()->validate([
            "name" => "required",
            "address" => "required",
            "latitude" => "required",
            "longitude" => "required",
        ]);

        Trafo::create($data);

        return redirect()->route("dashboard");
    }
}
