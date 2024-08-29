import {PageProps, TrafoV1} from "@/types/index";

export interface Metric {
    id: number;
    trafo_id: number;
    topic_name: string;
    created_at: string;
}

export interface Order {
    r: number;
    s: number;
    t: number;
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
    current_in: number;
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

export interface MetricPowerLoss extends Metric {
    power_loss: number;
}

export interface MetricKFactor extends Metric {
    k_factor: number;
}

export interface MetricTriplenCurrent extends Metric {
    triplen_current: number;
}

export interface MetricTotalHarmonicDistortion extends Metric {
    voltage_r: number;
    voltage_s: number;
    voltage_t: number;
}

export interface MetricTHDCurrent extends Metric {
    current_r: number;
    current_s: number;
    current_t: number;
}

export interface MetricTHDFrequency extends Metric {
    frequency_r: number;
    frequency_s: number;
    frequency_t: number;
}

export interface MetricIndividualHarmonicDistortion extends Metric {
    voltage_r: number;
    voltage_s: number;
    voltage_t: number;
}

export interface MetricIHDCurrent extends Metric {
    current_r: number;
    current_s: number;
    current_t: number;
}

export interface MetricHD extends Metric {
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

export type MetricTHDIHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    totalHarmonicDistortions: MetricTotalHarmonicDistortion[];
    thdCurrents: MetricTHDCurrent[];
    thdFrequencies: MetricTHDFrequency[];
}

export type MetricIHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    individualHarmonicDistortions: MetricIndividualHarmonicDistortion[];
    ihdCurrents: MetricIHDCurrent[];
}

export type MetricPKAProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    powerLosses: MetricPowerLoss[];
    kFactors: MetricKFactor[];
    triplenCurrents: MetricTriplenCurrent[];
}

export type MetricHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    title: string;
    chartRoute: string;
    harmonicDistortions: MetricHD;
}
