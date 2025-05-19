import { ChartPKAProps } from "@/types/chart";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import { ChartData } from "chart.js";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import datasetGenerator from "@/helpers/generator/dataset-generator";
import { blue } from "@mui/material/colors";
import {
    singleLineChart,
    singleLineChartString,
} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRST from "@/Components/Chart/AggregationRST";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import GoogleMap from "@/Components/Map/GoogleMap";
import getCreatedAt from "@/helpers/analysis/get-createdat";
import {
    MetricKFactor,
    MetricPowerLoss,
    MetricTriplenCurrent,
} from "@/types/metric";
import { Head } from "@inertiajs/react";

export default function ChartPKA({
    trafo,
    powerLosses,
    kFactors,
    triplenCurrents,
    powerLossMetrics,
    kFactorMetrics,
    triplenCurrentMetrics,
}: ChartPKAProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgPowerLoss = singleLineChartString({
        labels: powerLosses.map((powerLoss) =>
            timeMinuteString(new Date(powerLoss.created_at)),
        ),
        data: powerLosses.map((powerLoss) => powerLoss.power_loss),
        label: "Power Loss",
    });
    const { power_loss = 0 } = powerLosses[powerLosses.length - 1] || {};

    const metricAvgKFactor = singleLineChartString({
        labels: kFactors.map((kFactor) =>
            timeMinuteString(new Date(kFactor.created_at)),
        ),
        data: kFactors.map((kFactor) => kFactor.k_factor),
        label: "K Factor",
    });
    const { k_factor = 0 } = kFactors[kFactors.length - 1] || {};

    const metricAvgTriplenCurrent = singleLineChartString({
        labels: triplenCurrents.map((triplenCurrent) =>
            timeMinuteString(new Date(triplenCurrent.created_at)),
        ),
        data: triplenCurrents.map(
            (triplenCurrent) => triplenCurrent.triplen_current,
        ),
        label: "Triplen Current",
    });
    const { triplen_current = 0 } =
        triplenCurrents[triplenCurrents.length - 1] || {};

    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Chart PKA"}
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
                            <Typography variant={"h6"}>Power Loss</Typography>
                            <Line data={metricAvgPowerLoss} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Power Loss"}
                                    max={powerLossMetrics.max}
                                    avg={powerLossMetrics.avg}
                                    min={powerLossMetrics.min}
                                    latest={power_loss}
                                    maxTime={timeMinuteString(
                                        new Date(powerLossMetrics.timeOfMax),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(powerLossMetrics.timeOfMin),
                                    )}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>
                                Triplen Current
                            </Typography>
                            <Line data={metricAvgTriplenCurrent} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Triplen Current"}
                                    max={triplenCurrentMetrics.max}
                                    avg={triplenCurrentMetrics.avg}
                                    min={triplenCurrentMetrics.min}
                                    latest={triplen_current}
                                    maxTime={timeMinuteString(
                                        new Date(
                                            triplenCurrentMetrics.timeOfMax,
                                        ),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(
                                            triplenCurrentMetrics.timeOfMin,
                                        ),
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
                            <Typography variant={"h6"}>K Factor</Typography>
                            <Line data={metricAvgKFactor} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"K Factor"}
                                    max={kFactorMetrics.max}
                                    avg={kFactorMetrics.avg}
                                    min={kFactorMetrics.min}
                                    latest={k_factor}
                                    maxTime={timeMinuteString(
                                        new Date(kFactorMetrics.timeOfMax),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(kFactorMetrics.timeOfMin),
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
