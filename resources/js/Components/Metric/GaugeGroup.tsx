import {GaugeGroupProps} from "@/types/component";
import {Gauge} from "@mui/x-charts";
import {Stack, Typography} from "@mui/material";

export default function GaugeGroup({gauges, labels}: GaugeGroupProps) {
    return <Stack
        direction={{  xs: 'row' }}
        spacing={{ xs: 1, md: 3 }}
        sx={{
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        {gauges.map((gauge, index) => (
            <Stack key={index}>
                <Typography align='center'>{labels[index]}</Typography>
                <Gauge
                    width={100}
                    height={100}
                    value={gauge[gauge.length - 1] || 0} // Using the last element in the array
                    valueMin={Math.min(...gauge)}
                    valueMax={Math.max(...gauge)}
                />
            </Stack>
        ))}
    </Stack>
}
