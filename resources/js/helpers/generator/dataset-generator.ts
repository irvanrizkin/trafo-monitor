import {ChartDataset} from "chart.js";

export default function datasetGenerator({
                                             label,
                                             data,
                                             borderColor,
                                         }: {
    label: string,
    data: number[],
    borderColor: string
}): ChartDataset<"line", number[]> {
    return {
        label: label,
        data: data,
        borderColor: borderColor,
        fill: false,
        tension: 0.1
    }
}
