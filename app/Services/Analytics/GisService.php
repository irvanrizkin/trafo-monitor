<?php

namespace App\Services\Analytics;

use App\Models\AmbientTemperature;
use Illuminate\Support\Collection;

class GisService
{
    private function calculateGis(float $ambientTemperature): float
    {
        return $ambientTemperature + 30;
    }

    private function getLatestAmbientTemperature(): ?AmbientTemperature
    {
        return AmbientTemperature::latest()->first();
    }

    private function getLastFiveAmbientTemperatures(): array
    {
        return AmbientTemperature::latest()->take(5)->get()->toArray();
    }

    private function getGisForLatestAmbientTemperature(): ?float
    {
        $latestAmbientTemperature = $this->getLatestAmbientTemperature();

        if ($latestAmbientTemperature) {
            return $this->calculateGis(
                $latestAmbientTemperature->ambient_temperature
            );
        }

        return null;
    }

    private function getGisForLastFiveAmbientTemperatures(): array
    {
        $lastFiveAmbientTemperatures = $this->getLastFiveAmbientTemperatures();
        $gisValues = [];

        foreach ($lastFiveAmbientTemperatures as $temperature) {
            $gisValues[] = [
                "gis" => $this->calculateGis(
                    $temperature["ambient_temperature"]
                ),
                "created_at" => $temperature["created_at"],
            ];
        }

        return $gisValues;
    }

    private function getMaxAndMaxTimeGisForLastFiveAmbientTemperatures()
    {
        $lastFiveAmbientTemperatures = new Collection(
            $this->getGisForLastFiveAmbientTemperatures()
        );

        if ($lastFiveAmbientTemperatures->isEmpty()) {
            return null;
        }

        $maxGisEntry = $lastFiveAmbientTemperatures->sortByDesc("gis")->first();

        if (!$maxGisEntry) {
            return null;
        }

        return [
            "maxGis" => $maxGisEntry["gis"],
            "maxTime" => $maxGisEntry["created_at"],
        ];
    }

    public function getGisData(): array
    {
        $latestGis = $this->getGisForLatestAmbientTemperature();
        $maxTimeGis = $this->getMaxAndMaxTimeGisForLastFiveAmbientTemperatures();

        return [
            "latestGis" => $latestGis,
            "maxTimeGis" => $maxTimeGis,
        ];
    }
}
