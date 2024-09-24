import {GaugeGroupProps} from "@/types/component";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import {Stack, Typography} from "@mui/material";
import { amber, green, red } from "@mui/material/colors";

export default function GaugeGroup({
                                       gauges,
                                       labels,
                                       isOverride = false,
                                       overrideColor = (value: number) => green[300],
                                   }: GaugeGroupProps) {
    function colorPercentage({
        minValue,
        value,
        maxValue,
    }: {
        minValue: number,
        value: number,
        maxValue: number,
    }) {
        const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
        if (percentage < 50) {
            return green[300];
        }
        if (percentage < 80) {
            return amber[300];
        }
        return red[300];
    }

    return <Stack
        direction={{  xs: 'row' }}
        spacing={{ xs: 1, md: 3 }}
        sx={{
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {gauges.map((gauge, index) => (
            <Stack key={index} sx={{
                alignItems: 'center',
            }}>
                <Typography align='center'>{labels[index]}</Typography>
                <Gauge
                    width={100}
                    height={100}
                    value={gauge[gauge.length - 1] || 0} // Using the last element in the array
                    valueMin={0}
                    valueMax={Math.max(...gauge)}
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: isOverride ? overrideColor(gauge[gauge.length - 1]) : colorPercentage({
                            minValue: Math.min(...gauge),
                            value: gauge[gauge.length - 1],
                            maxValue: Math.max(...gauge),
                          }),
                        },
                      })}
                />
            </Stack>
        ))}
    </Stack>
}
