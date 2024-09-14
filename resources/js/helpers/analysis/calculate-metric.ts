export default function calculateMetrics(metrics: number[]) {
    if (metrics.length === 0) {
        return {
            max: 0,
            min: 0,
            avg: 0,
        };
    }
    const values = metrics.filter(metric => metric !== null);
    const total = values.reduce((acc, value) => acc + value, 0);
    return {
        max: Math.max(...values),
        min: Math.min(...values),
        avg: total / values.length,
    };
}
