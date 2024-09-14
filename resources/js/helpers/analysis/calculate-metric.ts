export default function calculateMetrics(metrics: number[]) {
    const values = metrics.filter(metric => metric !== null);
    const total = values.reduce((acc, value) => acc + value, 0);
    return {
        max: Math.max(...values),
        min: Math.min(...values),
        avg: total / values.length,
    };
}
