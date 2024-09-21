export default function getCreatedAt<T>(
    metrics: T[],
    metricField: keyof T,
    created_at: keyof T,
){
    // Find the object with the extreme (min or max) metric value
    const maxMetricObject = metrics.reduce((extreme, metric) => {
        return (metric[metricField] > extreme[metricField]) ? metric : extreme;
    });
    const minMetricObject = metrics.reduce((extreme, metric) => {
        return (metric[metricField] < extreme[metricField]) ? metric : extreme;
    })

    const maxResult = maxMetricObject[created_at] as string;
    const minResult = minMetricObject[created_at] as string;

    return {
        max: maxResult,
        min: minResult,
    }
}
