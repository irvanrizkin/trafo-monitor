<?php

use App\Http\Controllers\Chart\ChartAnalysisController;
use App\Http\Controllers\Chart\ChartPKAController;
use App\Http\Controllers\Chart\ChartPQSPFController;
use App\Http\Controllers\Chart\ChartTHDController;
use App\Http\Controllers\Chart\ChartTPOController;
use App\Http\Controllers\Chart\ChartVIFController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\ChartV2Controller;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardV2Controller;
use App\Http\Controllers\MetricController;
use App\Http\Controllers\Metric\MetricAnalyticController;
use App\Http\Controllers\ParameterV2Controller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrafoController;
use App\Http\Controllers\TrafoV2Controller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return redirect()->route("dashboard");
})->middleware(["auth"]);

Route::prefix("v2")
    ->middleware(["auth"])
    ->group(function () {
        Route::get("/dashboard", [DashboardV2Controller::class, "index"])->name(
            "v2.dashboard"
        );

        Route::prefix("trafo")->group(function () {
            Route::get("/create", [TrafoV2Controller::class, "create"])->name(
                "v2.trafo.create"
            );
            Route::post("/", [TrafoV2Controller::class, "store"])->name(
                "v2.trafo.store"
            );
            Route::get("/{id}", [TrafoV2Controller::class, "show"])->name(
                "v2.trafo.show"
            );

            Route::prefix("{id}")->group(function () {
                Route::get("/temperature", [
                    ParameterV2Controller::class,
                    "showTemperature",
                ])->name("v2.trafo.temperature");
                Route::get("/pressure", [
                    ParameterV2Controller::class,
                    "showPressure",
                ])->name("v2.trafo.pressure");
                Route::get("/voltage", [
                    ParameterV2Controller::class,
                    "showVoltage",
                ])->name("v2.trafo.voltage");
                Route::get("/current", [
                    ParameterV2Controller::class,
                    "showCurrent",
                ])->name("v2.trafo.current");
            });
        });

        Route::prefix("chart")->group(function () {
            Route::get("/{trafoId}", [
                ChartV2Controller::class,
                "getChartData",
            ])->name("v2.chart.data");
        });
    });

Route::get("/not-found", function () {
    return Inertia::render("NotFound");
})->name("not-found");

Route::get("/dashboard", [DashboardController::class, "index"])
    ->middleware(["auth"])
    ->name("dashboard");

Route::prefix("trafo")
    ->middleware(["auth"])
    ->group(function () {
        Route::get("/create", [TrafoController::class, "create"])->name(
            "trafo.create"
        );
        Route::post("/", [TrafoController::class, "store"])->name(
            "trafo.store"
        );
        Route::get("/{id}", [TrafoController::class, "showWithDates"])->name(
            "trafo.show"
        );
    });

Route::prefix("metric")
    ->middleware(["auth"])
    ->group(function () {
        Route::get("/{trafoid}/{date}", [
            MetricController::class,
            "getMetrics",
        ])->name("metric.metrics");
        Route::get("/{trafoid}/{date}/vif", [
            MetricController::class,
            "getMetricVIF",
        ])->name("metric.vif");
        Route::get("/{trafoid}/{date}/pqspf", [
            MetricController::class,
            "getMetricPQSPF",
        ])->name("metric.pqspf");
        Route::get("/{trafoid}/{date}/thd-ihd", [
            MetricController::class,
            "getMetricTHDIHD",
        ])->name("metric.thd-ihd");
        Route::get("/{trafoid}/{date}/ihd", [
            MetricController::class,
            "getMetricIHDV2",
        ])->name("metric.ihd");
        Route::get("/{trafoid}/{date}/tpo", [
            MetricController::class,
            "getMetricTPO",
        ])->name("metric.tpo");
        Route::get("/{trafoid}/{date}/pka", [
            MetricController::class,
            "getMetricPKA",
        ])->name("metric.pka");
        Route::get(
            "/{trafoid}/{date}/analisis",
            MetricAnalyticController::class
        )->name("metric.analisis");
        Route::get("/{trafoid}/{date}/export", [
            MetricController::class,
            "exportExcel",
        ])->name("metric.export");
    });

Route::prefix("chart")
    ->middleware(["auth"])
    ->group(function () {
        Route::get("/{trafoid}/{date}/vif", ChartVIFController::class)->name(
            "chart.vif"
        );
        Route::get(
            "/{trafoid}/{date}/pqspf",
            ChartPQSPFController::class
        )->name("chart.pqspf");
        Route::get(
            "/{trafoid}/{date}/thd-ihd",
            ChartTHDController::class
        )->name("chart.thd-ihd");
        Route::get("/{trafoid}/{date}/ihd", [
            ChartController::class,
            "getChartIHDV2",
        ])->name("chart.ihd");
        Route::get("/{trafoid}/{date}/tpo", ChartTPOController::class)->name(
            "chart.tpo"
        );
        Route::get("/{trafoid}/{date}/pka", ChartPKAController::class)->name(
            "chart.pka"
        );
        Route::get("/{trafoid}/analisis", ChartAnalysisController::class)->name(
            "chart.analisis"
        );
    });

Route::middleware("auth")->group(function () {
    Route::get("/profile", [ProfileController::class, "edit"])->name(
        "profile.edit"
    );
    Route::patch("/profile", [ProfileController::class, "update"])->name(
        "profile.update"
    );
    Route::delete("/profile", [ProfileController::class, "destroy"])->name(
        "profile.destroy"
    );
});

require __DIR__ . "/auth.php";
