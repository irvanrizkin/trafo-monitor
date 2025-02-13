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

export type OrderTableBodyV2Props = Props & {
    key: React.Key;
    orderName: string;
    rValue: number;
    sValue: number;
    tValue: number;
}

export type GaugeGroupProps = Props & {
    gauges: number[][]
    labels: string[],
    isOverride?: boolean,
    overrideColor?: (value: number) => string,
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
    maxRTime: string;
    maxSTime: string;
    maxTTime: string;
    minRTime: string;
    minSTime: string;
    minTTime: string;
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
    maxRTime: string;
    maxSTime: string;
    maxTTime: string;
    maxInTime: string;
    minRTime: string;
    minSTime: string;
    minTTime: string;
    minInTime: string;
}

export type AggregationSingleProps = Props & {
    property: string;
    max: number;
    min: number;
    avg: number;
    latest: number;
    maxTime: string;
    minTime: string;
}

export type GoogleMapProps = Props & {
    lat: number;
    lng: number;
    title: string;
    height: string;
}
