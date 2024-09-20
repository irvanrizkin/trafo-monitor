import {ChartDataset} from "chart.js";

export default function datasetGenerator({
                                             label,
                                             data,
                                             color,
                                         }: {
    label: string,
    data: number[],
    color: string
}): ChartDataset<"line", number[]> {
    return {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color,
        fill: false,
        tension: 0.1
    }
}
