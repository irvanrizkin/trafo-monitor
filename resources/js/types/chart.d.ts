import {PageProps, TrafoV1} from "@/types/index";

export interface AveragedMetric {
    date: string;
    hour: number;
}

export interface AveragedMetricVoltage extends AveragedMetric {
    voltage_r: number;
    voltage_s: number;
    voltage_t: number;
}

export interface AveragedMetricCurrent extends AveragedMetric {
    current_r: number;
    current_s: number;
    current_t: number;
}

export interface AveragedMetricFrequency extends AveragedMetric {
    frequency_r: number;
    frequency_s: number;
    frequency_t: number;
}

export interface AveragedMetricPower extends AveragedMetric {
    power_r: number;
    power_s: number;
    power_t: number;
}

export interface AveragedMetricReactivePower extends AveragedMetric {
    reactive_power_r: number;
    reactive_power_s: number;
    reactive_power_t: number;
}

export interface AveragedMetricApparentPower extends AveragedMetric {
    apparent_power_r: number;
    apparent_power_s: number;
    apparent_power_t: number;
}

export interface AveragedMetricPowerFactor extends AveragedMetric {
    power_factor_r: number;
    power_factor_s: number;
    power_factor_t: number;
}

export type ChartVIFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    voltages: AveragedMetricVoltage[];
    currents: AveragedMetricCurrent[];
    frequencies: AveragedMetricFrequency[];
    avgVoltageR: number;
    avgVoltageS: number;
    avgVoltageT: number;
    avgCurrentR: number;
    avgCurrentS: number;
    avgCurrentT: number;
    avgFrequencyR: number;
    avgFrequencyS: number;
    avgFrequencyT: number;
}

export type ChartPQSPFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    powers: AveragedMetricPower[];
    reactivePowers: AveragedMetricReactivePower[];
    apparentPowers: AveragedMetricApparentPower[];
    powerFactors: AveragedMetricPowerFactor[];
    avgPowerR: number;
    avgPowerS: number;
    avgPowerT: number;
    avgReactivePowerR: number;
    avgReactivePowerS: number;
    avgReactivePowerT: number;
    avgApparentPowerR: number;
    avgApparentPowerS: number;
    avgApparentPowerT: number;
    avgPowerFactorR: number;
    avgPowerFactorS: number;
    avgPowerFactorT: number;
}
