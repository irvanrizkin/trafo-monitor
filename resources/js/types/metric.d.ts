import {PageProps, TrafoV1} from "@/types/index";

export interface Metric {
    id: number;
    trafo_id: number;
    topic_name: string;
    created_at: string;
}

export interface MetricVoltage extends Metric {
    voltage_r: number;
    voltage_s: number;
    voltage_t: number;
}

export interface MetricCurrent extends Metric {
    current_r: number;
    current_s: number;
    current_t: number;
}

export interface MetricFrequency extends Metric {
    frequency_r: number;
    frequency_s: number;
    frequency_t: number;
}

export interface MetricPower extends Metric {
    power_r: number;
    power_s: number;
    power_t: number;
}

export interface MetricReactivePower extends Metric {
    reactive_power_r: number;
    reactive_power_s: number;
    reactive_power_t: number;
}

export interface MetricApparentPower extends Metric {
    apparent_power_r: number;
    apparent_power_s: number;
    apparent_power_t: number;
}

export interface MetricPowerFactor extends Metric {
    power_factor_r: number;
    power_factor_s: number;
    power_factor_t: number;
}

export type MetricVIFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    voltages: MetricVoltage[];
    currents: MetricCurrent[];
    frequencies: MetricFrequency[];
}

export type MetricPQSPFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    powers: MetricPower[];
    reactivePowers: MetricReactivePower[];
    apparentPowers: MetricApparentPower[];
    powerFactors: MetricPowerFactor[];
}
