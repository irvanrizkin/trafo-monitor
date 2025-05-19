import { ChartTHDIHDProps } from "@/types/chart";
import { ChartData } from "chart.js";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    rstBarChart,
    rstBarChartString,
    rstLineChart,
} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRST from "@/Components/Chart/AggregationRST";
import GoogleMap from "@/Components/Map/GoogleMap";
import getCreatedAt from "@/helpers/analysis/get-createdat";
import { MetricTHDCurrent, MetricTHDVoltage } from "@/types/metric";
import { Head } from "@inertiajs/react";

export default function ChartTHDIHD({
    trafo,
    thdVoltages,
    thdCurrents,
    thdVoltageRMetrics,
    thdVoltageSMetrics,
    thdVoltageTMetrics,
    thdCurrentRMetrics,
    thdCurrentSMetrics,
    thdCurrentTMetrics,
}: ChartTHDIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricVoltages = rstBarChartString({
        labels: thdVoltages.map((voltage) =>
            timeMinuteString(new Date(voltage.created_at)),
        ),
        rData: thdVoltages.map((voltage) => voltage.voltage_r),
        sData: thdVoltages.map((voltage) => voltage.voltage_s),
        tData: thdVoltages.map((voltage) => voltage.voltage_t),
    });
    const {
        voltage_r = 0,
        voltage_s = 0,
        voltage_t = 0,
    } = thdVoltages[thdVoltages.length - 1] || {};

    const metricCurrents = rstBarChartString({
        labels: thdCurrents.map((current) =>
            timeMinuteString(new Date(current.created_at)),
        ),
        rData: thdCurrents.map((current) => current.current_r),
        sData: thdCurrents.map((current) => current.current_s),
        tData: thdCurrents.map((current) => current.current_t),
    });
    const {
        current_r = 0,
        current_s = 0,
        current_t = 0,
    } = thdCurrents[thdCurrents.length - 1] || {};

    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Chart THD"}
                middleText={trafo ? trafo.name + " - " + trafo.address : ""}
                endText={"Last 12 Data"}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route("trafo.show", [trafo?.id ?? 0])}
                    text={"Back to Detail"}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>
                                Total Harmonics Distortion Voltage (THDv)
                            </Typography>
                            <Bar data={metricVoltages} />
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={thdVoltageRMetrics.max}
                                    sMax={thdVoltageSMetrics.max}
                                    tMax={thdVoltageTMetrics.max}
                                    rMin={thdVoltageRMetrics.min}
                                    sMin={thdVoltageSMetrics.min}
                                    tMin={thdVoltageTMetrics.min}
                                    rAvg={thdVoltageRMetrics.avg}
                                    sAvg={thdVoltageSMetrics.avg}
                                    tAvg={thdVoltageTMetrics.avg}
                                    rLatest={voltage_r}
                                    sLatest={voltage_s}
                                    tLatest={voltage_t}
                                    maxRTime={timeMinuteString(
                                        new Date(thdVoltageRMetrics.timeOfMax),
                                    )}
                                    maxSTime={timeMinuteString(
                                        new Date(thdVoltageSMetrics.timeOfMax),
                                    )}
                                    maxTTime={timeMinuteString(
                                        new Date(thdVoltageTMetrics.timeOfMax),
                                    )}
                                    minRTime={timeMinuteString(
                                        new Date(thdVoltageRMetrics.timeOfMin),
                                    )}
                                    minSTime={timeMinuteString(
                                        new Date(thdVoltageSMetrics.timeOfMin),
                                    )}
                                    minTTime={timeMinuteString(
                                        new Date(thdVoltageTMetrics.timeOfMin),
                                    )}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>
                                Total Harmonics Distortion Current (THDi)
                            </Typography>
                            <Bar data={metricCurrents} />
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={thdCurrentRMetrics.max}
                                    sMax={thdCurrentSMetrics.max}
                                    tMax={thdCurrentTMetrics.max}
                                    rMin={thdCurrentRMetrics.min}
                                    sMin={thdCurrentSMetrics.min}
                                    tMin={thdCurrentTMetrics.min}
                                    rAvg={thdCurrentRMetrics.avg}
                                    sAvg={thdCurrentSMetrics.avg}
                                    tAvg={thdCurrentTMetrics.avg}
                                    rLatest={current_r}
                                    sLatest={current_s}
                                    tLatest={current_t}
                                    maxRTime={timeMinuteString(
                                        new Date(thdCurrentRMetrics.timeOfMax),
                                    )}
                                    maxSTime={timeMinuteString(
                                        new Date(thdCurrentSMetrics.timeOfMax),
                                    )}
                                    maxTTime={timeMinuteString(
                                        new Date(thdCurrentTMetrics.timeOfMax),
                                    )}
                                    minRTime={timeMinuteString(
                                        new Date(thdCurrentRMetrics.timeOfMin),
                                    )}
                                    minSTime={timeMinuteString(
                                        new Date(thdCurrentSMetrics.timeOfMin),
                                    )}
                                    minTTime={timeMinuteString(
                                        new Date(thdCurrentTMetrics.timeOfMin),
                                    )}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo?.latitude ?? 0)}
                            lng={Number(trafo?.longitude ?? 0)}
                            title={trafo?.name ?? ""}
                            height={"700px"}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
