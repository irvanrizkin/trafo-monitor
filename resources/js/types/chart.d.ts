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
