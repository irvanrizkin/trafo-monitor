import statusFormatterColor from "@/helpers/formatter/status-formatter-color";
import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";

interface StaticGaugeGroupProps {
	gauges: {
		value: number,
		label: string,
		status: string,
		maxValue: number,
	}[],
}

export default function StaticGaugeGroup({
	gauges,
}: StaticGaugeGroupProps) {
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
                <Typography align='center'>{gauge.label}</Typography>
                <Gauge
                    width={100}
                    height={100}
										value={gauge.value}
                    valueMin={0}
                    valueMax={gauge.maxValue}
                    sx={(theme) => ({
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: statusFormatterColor(gauge.status),
                        },
                      })}
                />
            </Stack>
        ))}
    </Stack>
}
