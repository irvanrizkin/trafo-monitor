import {Props} from "@/types/index";
import React from "react";
import {SxProps, Theme} from "@mui/material";
import {Order} from "@/types/metric";

export type AppBarTripleProps = Props & {
    startText: string;
    middleText: string;
    endText: string;
}

export type ButtonEndHrefProps = Props & {
    href: string;
    text: string;
    icon: React.ReactNode;
    sx: SxProps<Theme> | undefined;
}

export type OrderTableBodyProps = Props & {
    key: React.Key;
    orderName: string;
    order: Order;
}

export type GaugeGroupProps = Props & {
    gauges: number[][]
    labels: string[]
}
