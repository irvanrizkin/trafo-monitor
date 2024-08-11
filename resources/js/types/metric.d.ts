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

export type MetricVIFProps = PageProps & {
    trafo: TrafoV1;
    date: string;
    voltages: MetricVoltage[];
    currents: MetricCurrent[];
    frequencies: MetricFrequency[];
}
