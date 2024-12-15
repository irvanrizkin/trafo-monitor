import { PageProps, TrafoV1 } from "@/types/index";

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
    k_factor_r: number;
    k_factor_s: number;
    k_factor_t: number;
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

export interface MetricTHDVoltage extends Metric {
    voltage_r: number;
    voltage_s: number;
    voltage_t: number;
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
    h16: Order;
    h17: Order;
    h18: Order;
    h19: Order;
    h20: Order;
    h21: Order;
}

export interface MetricIHDCurrentV2 extends Metric {
    current_r_h1: number;
    current_s_h1: number;
    current_t_h1: number;
    current_r_h3: number;
    current_s_h3: number;
    current_t_h3: number;
    current_r_h5: number;
    current_s_h5: number;
    current_t_h5: number;
    current_r_h7: number;
    current_s_h7: number;
    current_t_h7: number;
    current_r_h9: number;
    current_s_h9: number;
    current_t_h9: number;
    current_r_h11: number;
    current_s_h11: number;
    current_t_h11: number;
    current_r_h13: number;
    current_s_h13: number;
    current_t_h13: number;
    current_r_h15: number;
    current_s_h15: number;
    current_t_h15: number;
    current_r_h17: number;
    current_s_h17: number;
    current_t_h17: number;
    current_r_h19: number;
    current_s_h19: number;
    current_t_h19: number;
    datetime: string;
}

export interface MetricIHDVoltageV2 extends Metric {
    voltage_r_h1: number;
    voltage_s_h1: number;
    voltage_t_h1: number;
    voltage_r_h3: number;
    voltage_s_h3: number;
    voltage_t_h3: number;
    voltage_r_h5: number;
    voltage_s_h5: number;
    voltage_t_h5: number;
    voltage_r_h7: number;
    voltage_s_h7: number;
    voltage_t_h7: number;
    voltage_r_h9: number;
    voltage_s_h9: number;
    voltage_t_h9: number;
    voltage_r_h11: number;
    voltage_s_h11: number;
    voltage_t_h11: number;
    voltage_r_h13: number;
    voltage_s_h13: number;
    voltage_t_h13: number;
    voltage_r_h15: number;
    voltage_s_h15: number;
    voltage_t_h15: number;
    voltage_r_h17: number;
    voltage_s_h17: number;
    voltage_t_h17: number;
    voltage_r_h19: number;
    voltage_s_h19: number;
    voltage_t_h19: number;
    datetime: string;
}

export interface Temperature extends Metric {
    temperature: number;
}

export interface Pressure extends Metric {
    pressure: number;
}

export interface OilLevel extends Metric {
    oil_level: number;
}

export interface AmbientTemperature extends Metric {
    ambient_temperature: number;
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
    thdCurrents: MetricTHDCurrent[];
    thdVoltages: MetricTHDVoltage[];
}

export type MetricIHDProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    ihdCurrents: MetricHD[];
    ihdVoltages: MetricHD[];
}

export type MetricIHDV2Props = PageProps & {
    trafo: TrafoV1;
    date: string;
    ihdCurrents: MetricIHDCurrentV2[];
    ihdVoltages: MetricIHDVoltageV2[];
}

export type MetricTPOProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    temperatures: Temperature[];
    pressures: Pressure[];
    oilLevels: OilLevel[];
    ambientTemperatures: AmbientTemperature[];
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
