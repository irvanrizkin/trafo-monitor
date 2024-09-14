import {ChartTHDIHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {Bar, Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstBarChart, rstBarChartString, rstLineChart} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRST from "@/Components/Chart/AggregationRST";

export default function ChartTHDIHD({
                                        trafo,
                                        date,
                                        thdVoltages,
                                        thdCurrents,
                                    }: ChartTHDIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricVoltages = rstBarChartString({
        labels: thdVoltages.map(voltage => timeMinuteString(new Date(voltage.created_at))),
        rData: thdVoltages.map(voltage => voltage.voltage_r),
        sData: thdVoltages.map(voltage => voltage.voltage_s),
        tData: thdVoltages.map(voltage => voltage.voltage_t),
    });

    const voltageRAggregation = calculateMetrics(thdVoltages.map(voltage => voltage.voltage_r));
    const voltageSAggregation = calculateMetrics(thdVoltages.map(voltage => voltage.voltage_s));
    const voltageTAggregation = calculateMetrics(thdVoltages.map(voltage => voltage.voltage_t));
    const { voltage_r = 0, voltage_s = 0, voltage_t = 0 } = thdVoltages[thdVoltages.length - 1] || {};

    const metricCurrents = rstBarChartString({
        labels: thdCurrents.map(current => timeMinuteString(new Date(current.created_at))),
        rData: thdCurrents.map(current => current.current_r),
        sData: thdCurrents.map(current => current.current_s),
        tData: thdCurrents.map(current => current.current_t),
    });

    const currentRAggregation = calculateMetrics(thdCurrents.map(current => current.current_r));
    const currentSAggregation = calculateMetrics(thdCurrents.map(current => current.current_s));
    const currentTAggregation = calculateMetrics(thdCurrents.map(current => current.current_t));
    const { current_r = 0, current_s = 0, current_t = 0 } = thdCurrents[thdCurrents.length - 1] || {};

    const renderMarker = (map: any, maps: any) => {
        return new maps.Marker({
            position: {
                lat: Number(trafo.latitude),
                lng: Number(trafo.longitude),
            },
            map,
            title: 'test marker'
        });
    }

    const defaultProps = {
        center: {
            lat: Number(trafo.latitude),
            lng: Number(trafo.longitude),
        },
        zoom: 15,
    }

    return (
        <>
            <AppBarTriple
                startText={'Chart THD IHD'}
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
                            <Typography variant={"h6"}>Total Harmonics Distortion Voltage (THDv)</Typography>
                            <Bar data={metricVoltages}/>
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
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Total Harmonics Distortion Current (THDi)</Typography>
                            <Bar data={metricCurrents}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={currentRAggregation.max}
                                    sMax={currentSAggregation.max}
                                    tMax={currentTAggregation.max}
                                    rMin={currentRAggregation.min}
                                    sMin={currentSAggregation.min}
                                    tMin={currentTAggregation.min}
                                    rAvg={currentRAggregation.avg}
                                    sAvg={currentSAggregation.avg}
                                    tAvg={currentTAggregation.avg}
                                    rLatest={current_r}
                                    sLatest={current_s}
                                    tLatest={current_t}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ height: '75vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: mapApiKey }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
