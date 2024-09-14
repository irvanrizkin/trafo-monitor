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

export type AggregationRSTProps = Props & {
    rMax: number;
    sMax: number;
    tMax: number;
    rMin: number;
    sMin: number;
    tMin: number;
    rAvg: number;
    sAvg: number;
    tAvg: number;
    rLatest: number;
    sLatest: number;
    tLatest: number;
}

export type AggregationRSTOnlyProps = Props & {
    rMax: number;
    sMax: number;
    tMax: number;
    rMin: number;
    sMin: number;
    tMin: number;
    rAvg: number;
    sAvg: number;
    tAvg: number;
}

export type AggregationRSTINProps = Props & {
    rMax: number;
    sMax: number;
    tMax: number;
    inMax: number;
    rMin: number;
    sMin: number;
    tMin: number;
    inMin: number;
    rAvg: number;
    sAvg: number;
    tAvg: number;
    inAvg: number;
    rLatest: number;
    sLatest: number;
    tLatest: number;
    inLatest: number;
}

export type AggregationSingleProps = Props & {
    property: string;
    max: number;
    min: number;
    avg: number;
    latest: number;
}

export type GoogleMapProps = Props & {
    lat: number;
    lng: number;
    title: string;
    height: string;
}
