import { ChartIHDProps, ChartIHDPropsV2 } from "@/types/chart";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import { rstBarChartString } from "@/helpers/generator/chart-generator";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRSTOnly from "@/Components/Chart/AggregationRSTOnly";
import GoogleMap from "@/Components/Map/GoogleMap";
import { Head } from "@inertiajs/react";

export default function ChartIHD({
    trafo,
    ihdVoltages,
    ihdCurrents,
}: ChartIHDPropsV2) {
    const ihdVoltageR = [
        ihdVoltages[0]?.voltage_r_h1 ?? 0,
        ihdVoltages[0]?.voltage_r_h3 ?? 0,
        ihdVoltages[0]?.voltage_r_h5 ?? 0,
        ihdVoltages[0]?.voltage_r_h7 ?? 0,
        ihdVoltages[0]?.voltage_r_h9 ?? 0,
        ihdVoltages[0]?.voltage_r_h11 ?? 0,
        ihdVoltages[0]?.voltage_r_h13 ?? 0,
        ihdVoltages[0]?.voltage_r_h15 ?? 0,
        ihdVoltages[0]?.voltage_r_h17 ?? 0,
        ihdVoltages[0]?.voltage_r_h19 ?? 0,
    ];

    const ihdVoltageS = [
        ihdVoltages[0]?.voltage_s_h1 ?? 0,
        ihdVoltages[0]?.voltage_s_h3 ?? 0,
        ihdVoltages[0]?.voltage_s_h5 ?? 0,
        ihdVoltages[0]?.voltage_s_h7 ?? 0,
        ihdVoltages[0]?.voltage_s_h9 ?? 0,
        ihdVoltages[0]?.voltage_s_h11 ?? 0,
        ihdVoltages[0]?.voltage_s_h13 ?? 0,
        ihdVoltages[0]?.voltage_s_h15 ?? 0,
        ihdVoltages[0]?.voltage_s_h17 ?? 0,
        ihdVoltages[0]?.voltage_s_h19 ?? 0,
    ];

    const ihdVoltageT = [
        ihdVoltages[0]?.voltage_t_h1 ?? 0,
        ihdVoltages[0]?.voltage_t_h3 ?? 0,
        ihdVoltages[0]?.voltage_t_h5 ?? 0,
        ihdVoltages[0]?.voltage_t_h7 ?? 0,
        ihdVoltages[0]?.voltage_t_h9 ?? 0,
        ihdVoltages[0]?.voltage_t_h11 ?? 0,
        ihdVoltages[0]?.voltage_t_h13 ?? 0,
        ihdVoltages[0]?.voltage_t_h15 ?? 0,
        ihdVoltages[0]?.voltage_t_h17 ?? 0,
        ihdVoltages[0]?.voltage_t_h19 ?? 0,
    ];

    const ihdCurrentR = [
        ihdCurrents[0]?.current_r_h1 ?? 0,
        ihdCurrents[0]?.current_r_h3 ?? 0,
        ihdCurrents[0]?.current_r_h5 ?? 0,
        ihdCurrents[0]?.current_r_h7 ?? 0,
        ihdCurrents[0]?.current_r_h9 ?? 0,
        ihdCurrents[0]?.current_r_h11 ?? 0,
        ihdCurrents[0]?.current_r_h13 ?? 0,
        ihdCurrents[0]?.current_r_h15 ?? 0,
        ihdCurrents[0]?.current_r_h17 ?? 0,
        ihdCurrents[0]?.current_r_h19 ?? 0,
    ];

    const ihdCurrentS = [
        ihdCurrents[0]?.current_s_h1 ?? 0,
        ihdCurrents[0]?.current_s_h3 ?? 0,
        ihdCurrents[0]?.current_s_h5 ?? 0,
        ihdCurrents[0]?.current_s_h7 ?? 0,
        ihdCurrents[0]?.current_s_h9 ?? 0,
        ihdCurrents[0]?.current_s_h11 ?? 0,
        ihdCurrents[0]?.current_s_h13 ?? 0,
        ihdCurrents[0]?.current_s_h15 ?? 0,
        ihdCurrents[0]?.current_s_h17 ?? 0,
        ihdCurrents[0]?.current_s_h19 ?? 0,
    ];

    const ihdCurrentT = [
        ihdCurrents[0]?.current_t_h1 ?? 0,
        ihdCurrents[0]?.current_t_h3 ?? 0,
        ihdCurrents[0]?.current_t_h5 ?? 0,
        ihdCurrents[0]?.current_t_h7 ?? 0,
        ihdCurrents[0]?.current_t_h9 ?? 0,
        ihdCurrents[0]?.current_t_h11 ?? 0,
        ihdCurrents[0]?.current_t_h13 ?? 0,
        ihdCurrents[0]?.current_t_h15 ?? 0,
        ihdCurrents[0]?.current_t_h17 ?? 0,
        ihdCurrents[0]?.current_t_h19 ?? 0,
    ];

    const metricAvgVoltage = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: ihdVoltageR,
        sData: ihdVoltageS,
        tData: ihdVoltageT,
    });

    const ihdVoltageRAggregation = calculateMetrics(ihdVoltageR);
    const ihdVoltageSAggregation = calculateMetrics(ihdVoltageS);
    const ihdVoltageTAggregation = calculateMetrics(ihdVoltageT);

    const metricAvgCurrent = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: ihdCurrentR,
        sData: ihdCurrentS,
        tData: ihdCurrentT,
    });

    const ihdCurrentRAggregation = calculateMetrics(ihdCurrentR);
    const ihdCurrentSAggregation = calculateMetrics(ihdCurrentS);
    const ihdCurrentTAggregation = calculateMetrics(ihdCurrentT);

    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Chart IHD"}
                middleText={trafo.name + " - " + trafo.address}
                endText={"Latest Data"}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route("trafo.show", [trafo.id])}
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
                                Individual Harmonics Distortion Voltage (IHDv)
                            </Typography>
                            <Bar data={metricAvgVoltage} />
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTOnly
                                    rMax={ihdVoltageRAggregation.max}
                                    sMax={ihdVoltageSAggregation.max}
                                    tMax={ihdVoltageTAggregation.max}
                                    rAvg={ihdVoltageRAggregation.avg}
                                    sAvg={ihdVoltageSAggregation.avg}
                                    tAvg={ihdVoltageTAggregation.avg}
                                    rMin={ihdVoltageRAggregation.min}
                                    sMin={ihdVoltageSAggregation.min}
                                    tMin={ihdVoltageTAggregation.min}
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
                                Individual Harmonics Distortion Current (IHDi)
                            </Typography>
                            <Bar data={metricAvgCurrent} />
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTOnly
                                    rMax={ihdCurrentRAggregation.max}
                                    sMax={ihdCurrentSAggregation.max}
                                    tMax={ihdCurrentTAggregation.max}
                                    rAvg={ihdCurrentRAggregation.avg}
                                    sAvg={ihdCurrentSAggregation.avg}
                                    tAvg={ihdCurrentTAggregation.avg}
                                    rMin={ihdCurrentRAggregation.min}
                                    sMin={ihdCurrentSAggregation.min}
                                    tMin={ihdCurrentTAggregation.min}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo.latitude)}
                            lng={Number(trafo.longitude)}
                            title={trafo.name}
                            height={"700px"}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
