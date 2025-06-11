export function commaFormatter(value: any): string {
    const num = parseFloat(value);
    if (
        !isNaN(num) &&
        isFinite(num) &&
        typeof value !== "boolean" &&
        !/[a-zA-Z]/.test(value)
    ) {
        return num.toFixed(5);
    }
    return "0.00000";
}
