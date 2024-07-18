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

export type Props<T extends Record<string, unknown> = Record<string, unknown>> = T;

export type ParameterInfoCardProps = Props & {
    title: string;
    description: string;
};
