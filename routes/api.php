<?php

use App\Http\Controllers\MetricController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('metric')->group(function () {
    Route::post('/{trafoid}/thd', [MetricController::class, 'storeMetricTHD'])
        ->name('metric.thd.store');
    Route::post('/{trafoid}/ihd', [MetricController::class, 'storeMetricIHD'])
        ->name('metric.ihd.store');
});
