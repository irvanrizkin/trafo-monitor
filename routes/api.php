<?php

use App\Http\Controllers\Metric\MetricMQTTController;
use App\Http\Controllers\MetricController;
use App\Http\Controllers\MillisController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/user", function (Request $request) {
    return $request->user();
})->middleware("auth:sanctum");

Route::prefix("metric")->group(function () {
    Route::post("/mqtt", MetricMQTTController::class)->name(
        "metric.mqtt.store"
    );
    Route::post("/{trafoid}/ihd", [
        MetricController::class,
        "storeMetricIHD",
    ])->name("metric.ihd.store");
});

Route::post("/millis", [MillisController::class, "store"])->name(
    "millis.store"
);
