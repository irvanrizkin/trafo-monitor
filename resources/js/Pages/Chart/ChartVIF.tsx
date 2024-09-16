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

export default function ChartVIF({
                                     trafo,
                                     date,
                                     voltages,
                                     currents,
                                     frequencies,
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

    const voltageRAggregation = calculateMetrics(voltages.map(voltage => voltage.voltage_r));
    const voltageSAggregation = calculateMetrics(voltages.map(voltage => voltage.voltage_s));
    const voltageTAggregation = calculateMetrics(voltages.map(voltage => voltage.voltage_t));
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

    const currentRAggregation = calculateMetrics(currents.map(current => current.current_r));
    const currentSAggregation = calculateMetrics(currents.map(current => current.current_s));
    const currentTAggregation = calculateMetrics(currents.map(current => current.current_t));
    const currentInAggregation = calculateMetrics(currents.map(current => current.current_in));
    const { current_r = 0, current_s = 0, current_t = 0, current_in = 0 } = currents[currents.length - 1] || {};

    const metricAvgFrequency = singleLineChartString({
        labels: frequencies.map(frequency => timeMinuteString(new Date(frequency.created_at))),
        data: frequencies.map(frequency => frequency.frequency_r),
        label: 'Frequency',
    });

    const frequencyAggregation = calculateMetrics(frequencies.map(frequency => frequency.frequency_r));
    const { frequency_r = 0 } = frequencies[frequencies.length - 1] || {};

    return (
        <>
            <AppBarTriple
                startText={'Chart VIF'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route('trafo.show', [trafo.id])}
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
                                    rMax={voltageRAggregation.max}
                                    sMax={voltageSAggregation.max}
                                    tMax={voltageTAggregation.max}
                                    rMin={voltageRAggregation.min}
                                    sMin={voltageSAggregation.min}
                                    tMin={voltageTAggregation.min}
                                    rAvg={voltageRAggregation.avg}
                                    sAvg={voltageSAggregation.avg}
                                    tAvg={voltageTAggregation.avg}
                                    rLatest={voltage_r}
                                    sLatest={voltage_s}
                                    tLatest={voltage_t}
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
                            <Typography variant={"h6"}>Frequency (f)</Typography>
                            <Line data={metricAvgFrequency}/>

                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Frequency"}
                                    max={frequencyAggregation.max}
                                    avg={frequencyAggregation.avg}
                                    min={frequencyAggregation.min}
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
                                    rMax={currentRAggregation.max}
                                    sMax={currentSAggregation.max}
                                    tMax={currentTAggregation.max}
                                    inMax={currentInAggregation.max}
                                    rMin={currentRAggregation.min}
                                    sMin={currentSAggregation.min}
                                    tMin={currentTAggregation.min}
                                    inMin={currentInAggregation.min}
                                    rAvg={currentRAggregation.avg}
                                    sAvg={currentSAggregation.avg}
                                    tAvg={currentTAggregation.avg}
                                    inAvg={currentInAggregation.avg}
                                    rLatest={current_r}
                                    sLatest={current_s}
                                    tLatest={current_t}
                                    inLatest={current_in}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/*<GoogleMap*/}
                        {/*    lat={Number(trafo.latitude)}*/}
                        {/*    lng={Number(trafo.longitude)}*/}
                        {/*    title={trafo.name}*/}
                        {/*    height={'700px'}*/}
                        {/*/>*/}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
