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

export interface Gps {
    id: number;
    trafo: string;
    latitude: string;
    longtitude: string;
    created_at: string;
    updated_at: string;
}

export interface Metric {
    created_at: string;
    value: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type DashboardProps = PageProps & {
    trafos: Trafo[];
};

export type TrafoDetailProps = PageProps & {
    trafo: Trafo;
};

export type GpsDetailProps = PageProps & {
    gps: Gps;
}

export type MetricProps = PageProps & {
    trafo: Trafo;
    metrics: Metric[];
    min: number;
    count: number;
    max: number;
    property: string;
};

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
