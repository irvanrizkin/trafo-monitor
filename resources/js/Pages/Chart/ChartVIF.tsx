import {ChartVIFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    rstinLineChart,
    rstinLineChartString,
    rstLineChart,
    rstLineChartString,
    singleLineChart,
    singleLineChartString
} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import AggregationRST from "@/Components/Chart/AggregationRST";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import AggregationRSTIN from "@/Components/Chart/AggregationRSTIN";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import GoogleMap from "@/Components/Map/GoogleMap";
import getCreatedAt from "@/helpers/analysis/get-createdat";
import {MetricCurrent, MetricFrequency, MetricVoltage} from "@/types/metric";

export default function ChartVIF({
                                     trafo,
                                     voltages,
                                     currents,
                                     frequencies,
                                     voltageRMetrics,
                                     voltageSMetrics,
                                     voltageTMetrics,
                                     currentRMetrics,
                                     currentSMetrics,
                                     currentTMetrics,
                                     currentInMetrics,
                                     frequencyMetrics,
                                 }: ChartVIFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    const metricAvgVoltage = rstLineChartString(
        {
            labels: voltages.map(voltage => timeMinuteString(new Date(voltage.created_at))),
            rData: voltages.map(voltage => voltage.voltage_r),
            sData: voltages.map(voltage => voltage.voltage_s),
            tData: voltages.map(voltage => voltage.voltage_t),
        }
    );
    const { voltage_r = 0, voltage_s = 0, voltage_t = 0 } = voltages[voltages.length - 1] || {};

    const metricAvgCurrent = rstinLineChartString(
        {
            labels: currents.map(current => timeMinuteString(new Date(current.created_at))),
            rData: currents.map(current => current.current_r),
            sData: currents.map(current => current.current_s),
            tData: currents.map(current => current.current_t),
            inData: currents.map(current => current.current_in),
        }
    );
    const { current_r = 0, current_s = 0, current_t = 0, current_in = 0 } = currents[currents.length - 1] || {};

    const metricAvgFrequency = singleLineChartString({
        labels: frequencies.map(frequency => timeMinuteString(new Date(frequency.created_at))),
        data: frequencies.map(frequency => frequency.frequency_r),
        label: 'Frequency',
    });
    const { frequency_r = 0 } = frequencies[frequencies.length - 1] || {};

    return (
        <>
            <AppBarTriple
                startText={'Chart VIF'}
                middleText={trafo ? trafo.name + ' - ' + trafo.address : ''}
                endText={"Last 12 Data"}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route('trafo.show', [trafo?.id ?? 0])}
                    text={'Back to Detail'}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{pb: 2}}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Voltage (V)</Typography>
                            <Line data={metricAvgVoltage}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={voltageRMetrics.max}
                                    sMax={voltageSMetrics.max}
                                    tMax={voltageTMetrics.max}
                                    rMin={voltageRMetrics.min}
                                    sMin={voltageSMetrics.min}
                                    tMin={voltageTMetrics.min}
                                    rAvg={voltageRMetrics.avg}
                                    sAvg={voltageSMetrics.avg}
                                    tAvg={voltageTMetrics.avg}
                                    rLatest={voltage_r}
                                    sLatest={voltage_s}
                                    tLatest={voltage_t}
                                    maxRTime={timeMinuteString(new Date(voltageRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(voltageSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(voltageTMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(voltageRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(voltageSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(voltageTMetrics.timeOfMin))}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Frequency (Hz)</Typography>
                            <Line data={metricAvgFrequency}/>

                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Frequency"}
                                    max={frequencyMetrics.max}
                                    min={frequencyMetrics.min}
                                    avg={frequencyMetrics.avg}
                                    maxTime={timeMinuteString(new Date(frequencyMetrics.timeOfMax))}
                                    minTime={timeMinuteString(new Date(frequencyMetrics.timeOfMin))}
                                    latest={frequency_r}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Current (I)</Typography>
                            <Line data={metricAvgCurrent}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTIN
                                    rMax={currentRMetrics.max}
                                    sMax={currentSMetrics.max}
                                    tMax={currentTMetrics.max}
                                    inMax={currentInMetrics.max}
                                    rMin={currentRMetrics.min}
                                    sMin={currentSMetrics.min}
                                    tMin={currentTMetrics.min}
                                    inMin={currentInMetrics.min}
                                    rAvg={currentRMetrics.avg}
                                    sAvg={currentSMetrics.avg}
                                    tAvg={currentTMetrics.avg}
                                    inAvg={currentInMetrics.avg}
                                    rLatest={current_r}
                                    sLatest={current_s}
                                    tLatest={current_t}
                                    inLatest={current_in}
                                    maxRTime={timeMinuteString(new Date(currentRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(currentSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(currentTMetrics.timeOfMax))}
                                    maxInTime={timeMinuteString(new Date(currentInMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(currentRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(currentSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(currentTMetrics.timeOfMin))}
                                    minInTime={timeMinuteString(new Date(currentInMetrics.timeOfMin))}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo?.latitude ?? 0)}
                            lng={Number(trafo?.longitude ?? 0)}
                            title={trafo?.name ?? ''}
                            height={'700px'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
