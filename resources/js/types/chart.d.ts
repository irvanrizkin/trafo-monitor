import { PageProps, TrafoV1 } from "@/types/index";
import {
    AmbientTemperature,
    Metric,
    MetricApparentPower,
    MetricCurrent,
    MetricFrequency,
    MetricHD,
    MetricIHDCurrentV2,
    MetricIHDVoltageV2,
    MetricKFactor,
    MetricPower,
    MetricPowerFactor,
    MetricPowerLoss,
    MetricReactivePower,
    MetricTHDCurrent,
    MetricTHDVoltage,
    MetricTriplenCurrent,
    MetricVoltage,
    OilLevel,
    Pressure,
    Temperature,
} from "@/types/metric";

export interface Order {
    r: number;
    s: number;
    t: number;
}

export interface AggregationResult {
    max: number;
    avg: number;
    min: number;
    timeOfMax: string;
    timeOfMin: string;
}

export interface ChartMetricHD extends Metric {
    h1: Order;
    h2: Order;
    h3: Order;
    h4: Order;
    h5: Order;
    h6: Order;
    h7: Order;
    h8: Order;
    h9: Order;
    h10: Order;
    h11: Order;
    h12: Order;
    h13: Order;
    h14: Order;
    h15: Order;
}

export type ChartVIFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    voltages: MetricVoltage[];
    currents: MetricCurrent[];
    frequencies: MetricFrequency[];
    voltageRMetrics: AggregationResult;
    voltageSMetrics: AggregationResult;
    voltageTMetrics: AggregationResult;
    currentRMetrics: AggregationResult;
    currentSMetrics: AggregationResult;
    currentTMetrics: AggregationResult;
    currentInMetrics: AggregationResult;
    frequencyMetrics: AggregationResult;
};

export type ChartPQSPFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    powers: MetricPower[];
    reactivePowers: MetricReactivePower[];
    apparentPowers: MetricApparentPower[];
    powerFactors: MetricPowerFactor[];
    powerRMetrics: AggregationResult;
    powerSMetrics: AggregationResult;
    powerTMetrics: AggregationResult;
    reactivePowerRMetrics: AggregationResult;
    reactivePowerSMetrics: AggregationResult;
    reactivePowerTMetrics: AggregationResult;
    apparentPowerRMetrics: AggregationResult;
    apparentPowerSMetrics: AggregationResult;
    apparentPowerTMetrics: AggregationResult;
    powerFactorRMetrics: AggregationResult;
    powerFactorSMetrics: AggregationResult;
    powerFactorTMetrics: AggregationResult;
};

export type ChartTHDIHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    thdVoltages: MetricTHDVoltage[];
    thdCurrents: MetricTHDCurrent[];
    thdVoltageRMetrics: AggregationResult;
    thdVoltageSMetrics: AggregationResult;
    thdVoltageTMetrics: AggregationResult;
    thdCurrentRMetrics: AggregationResult;
    thdCurrentSMetrics: AggregationResult;
    thdCurrentTMetrics: AggregationResult;
};

export type ChartIHDProps = PageProps & {
    trafo: TrafoV1;
    ihdVoltages: MetricHD[];
    ihdCurrents: MetricHD[];
    avgVoltageR: number;
    avgVoltageS: number;
    avgVoltageT: number;
    avgCurrentR: number;
    avgCurrentS: number;
    avgCurrentT: number;
};

export type ChartIHDPropsV2 = PageProps & {
    trafo: TrafoV1;
    ihdVoltages: MetricIHDVoltageV2[];
    ihdCurrents: MetricIHDCurrentV2[];
};

export type ChartTPOProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    temperatures: Temperature[];
    pressures: Pressure[];
    oilLevels: OilLevel[];
    ambientTemperatures: AmbientTemperature[];
    temperatureMetrics: AggregationResult;
    pressureMetrics: AggregationResult;
    oilLevelMetrics: AggregationResult;
    ambientTemperatureMetrics: AggregationResult;
};

export type ChartPKAProps = PageProps & {
    trafo: TrafoV1;
    powerLosses: MetricPowerLoss[];
    kFactors: MetricKFactor[];
    triplenCurrents: MetricTriplenCurrent[];
    powerLossMetrics: AggregationResult;
    kFactorMetrics: AggregationResult;
    triplenCurrentMetrics: AggregationResult;
};

export type ChartHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    title: string;
    harmonicDistortions: ChartMetricHD;
};

// "gisValues" => $gisValues,
// "latestGis" => $latestGis,
// "maxGis" => $maxGis,
// "maxGisTime" => $maxGisTime,
// "minGis" => $minGis,
// "minGisTime" => $minGisTime,

export type ChartAnalyticsProps = PageProps & {
    trafo: TrafoV1;
    gisValues: {
        gis: number;
        created_at: string;
    }[];
    resistiveVoltageDropsR: {
        resistive_voltage_drop_r: number;
        created_at: string;
    }[];
    resistiveVoltageDropsS: {
        resistive_voltage_drop_s: number;
        created_at: string;
    }[];
    resistiveVoltageDropsT: {
        resistive_voltage_drop_t: number;
        created_at: string;
    }[];
    reactiveVoltageDropsR: {
        reactive_voltage_drop_r: number;
        created_at: string;
    }[];
    reactiveVoltageDropsS: {
        reactive_voltage_drop_s: number;
        created_at: string;
    }[];
    reactiveVoltageDropsT: {
        reactive_voltage_drop_t: number;
        created_at: string;
    }[];
    latestGis: number;
    maxGis: number;
    maxGisTime: string;
    minGis: number;
    minGisTime: string;
};
