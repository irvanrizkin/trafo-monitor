export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Trafo {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface TrafoV1 {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    created_at: string;
    updated_at: string;
}

export interface Gps {
    id: number;
    trafo: string;
    latitude: string;
    longtitude: string;
}

export interface Metric {
    created_at: string;
    value: number;
}

export interface MetricV1 {
    id: number;
    hour: number;
    trafo_id: string;
    topic_name: string;
    current: number;
    temperature: number;
    voltage: number;
    pressure: number;
    created_at: number;
}

export interface Date {
    date: string;
}

export interface MetricAggregate {
    min: number;
    count: number;
    max: number;
    avg: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type DashboardProps = PageProps & {
    trafos: Trafo[];
    gpsArray: Gps[];
};

export type DashboardPropsV1 = PageProps & {
    trafos: TrafoV1[];
};

export type TrafoDetailProps = PageProps & {
    trafo: Trafo;
    gps: Gps;
};

export type TrafoDetailPropsV1 = PageProps & {
    trafo: TrafoV1;
    dates: Date[];
}

export type MetricProps = PageProps & {
    trafo: Trafo;
    metrics: Metric[];
    min: number;
    count: number;
    max: number;
    property: string;
};

export type MetricV1Props = PageProps & {
    date: string;
    trafo: TrafoV1;
    metrics: MetricV1[];
};

export type ChartProps = PageProps & {
    trafo: TrafoV1;
    metricsAvg: MetricV1[];
    metrics: MetricV1[];
    temperature: MetricAggregate;
    pressure: MetricAggregate;
    voltage: MetricAggregate;
    current: MetricAggregate;
    date: string;
}

export type ChartV2Props = PageProps & {
    trafo: Trafo;
    temperatures: Metric[];
    pressures: Metric[];
    voltages: Metric[];
    currents: Metric[];
}

export type Props<T extends Record<string, unknown> = Record<string, unknown>> = T;

export type ParameterInfoCardProps = Props & {
    title: string;
    description: string;
    trafoId: number;
};

export type ParameterCardGroupProps = Props & {
    min: number;
    count: number;
    max: number;
}
