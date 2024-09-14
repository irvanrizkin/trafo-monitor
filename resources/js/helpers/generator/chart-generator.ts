import {ChartData} from "chart.js";
import datasetGenerator from "@/helpers/generator/dataset-generator";
import {red, amber, grey, blue} from "@mui/material/colors";

export function rstLineChart({
                                 labels,
                                 rData,
                                 sData,
                                 tData,
                             }: {
    labels: number[],
    rData: number[],
    sData: number[],
    tData: number[],
}): ChartData<"line", number[], number> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: 'R',
                data: rData,
                borderColor: red[500],
            }),
            datasetGenerator({
                label: 'S',
                data: sData,
                borderColor: amber[500],
            }),
            datasetGenerator({
                label: 'T',
                data: tData,
                borderColor: grey[900],
            }),
        ]
    }
}

export function rstLineChartString({
                                 labels,
                                 rData,
                                 sData,
                                 tData,
                             }: {
    labels: string[],
    rData: number[],
    sData: number[],
    tData: number[],
}): ChartData<"line", number[], string> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: 'R',
                data: rData,
                borderColor: red[500],
            }),
            datasetGenerator({
                label: 'S',
                data: sData,
                borderColor: amber[500],
            }),
            datasetGenerator({
                label: 'T',
                data: tData,
                borderColor: grey[900],
            }),
        ]
    }
}

export function rstinLineChart({
                                   labels,
                                   rData,
                                   sData,
                                   tData,
                                   inData,
                               }: {
    labels: number[],
    rData: number[],
    sData: number[],
    tData: number[],
    inData: number[],
}): ChartData<"line", number[], number> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: 'R',
                data: rData,
                borderColor: red[500],
            }),
            datasetGenerator({
                label: 'S',
                data: sData,
                borderColor: amber[500],
            }),
            datasetGenerator({
                label: 'T',
                data: tData,
                borderColor: grey[900],
            }),
            datasetGenerator({
                label: 'IN',
                data: inData,
                borderColor: blue[500],
            }),
        ]
    }
}

export function rstinLineChartString({
                                   labels,
                                   rData,
                                   sData,
                                   tData,
                                   inData,
                               }: {
    labels: string[],
    rData: number[],
    sData: number[],
    tData: number[],
    inData: number[],
}): ChartData<"line", number[], string> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: 'R',
                data: rData,
                borderColor: red[500],
            }),
            datasetGenerator({
                label: 'S',
                data: sData,
                borderColor: amber[500],
            }),
            datasetGenerator({
                label: 'T',
                data: tData,
                borderColor: grey[900],
            }),
            datasetGenerator({
                label: 'IN',
                data: inData,
                borderColor: blue[500],
            }),
        ]
    }
}

export function rstBarChart({
                                 labels,
                                 rData,
                                 sData,
                                 tData,
                             }: {
    labels: number[],
    rData: number[],
    sData: number[],
    tData: number[],
}): ChartData<"bar", number[], number> {
    return {
        labels: labels,
        datasets: [
            {
                label: 'R',
                data: rData,
                backgroundColor: red[500],
            },
            {
                label: 'S',
                data: sData,
                backgroundColor: amber[500],
            },
            {
                label: 'T',
                data: tData,
                backgroundColor: grey[500],
            }
        ]
    }
}

export function rstBarChartString({
                                labels,
                                rData,
                                sData,
                                tData,
                            }: {
    labels: string[],
    rData: number[],
    sData: number[],
    tData: number[],
}): ChartData<"bar", number[], string> {
    return {
        labels: labels,
        datasets: [
            {
                label: 'R',
                data: rData,
                backgroundColor: red[500],
            },
            {
                label: 'S',
                data: sData,
                backgroundColor: amber[500],
            },
            {
                label: 'T',
                data: tData,
                backgroundColor: grey[500],
            }
        ]
    }
}

export function singleLineChart({
                                    labels,
                                    data,
                                    label
                                }: {
    labels: number[],
    data: number[]
    label: string
}): ChartData<"line", number[], number> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: label,
                data: data,
                borderColor: blue[500],
            }),
        ]
    }
}

export function singleLineChartString({
                                    labels,
                                    data,
                                    label
                                }: {
    labels: string[],
    data: number[]
    label: string
}): ChartData<"line", number[], string> {
    return {
        labels: labels,
        datasets: [
            datasetGenerator({
                label: label,
                data: data,
                borderColor: blue[500],
            }),
        ]
    }
}
