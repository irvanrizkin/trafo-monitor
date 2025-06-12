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
    rstLineChart,
    rstLineChartString,
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

export default function ChartPKA({
    trafo,
    date,
    kFactors,
    kFactorRMetrics,
    kFactorSMetrics,
    kFactorTMetrics,
}: ChartPKAProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgKFactor = rstLineChartString({
        labels: kFactors.map((kFactor) =>
            timeMinuteString(new Date(kFactor.created_at)),
        ),
        rData: kFactors.map((kFactor) => kFactor.k_factor_r),
        sData: kFactors.map((kFactor) => kFactor.k_factor_s),
        tData: kFactors.map((kFactor) => kFactor.k_factor_t),
    });
    const {
        k_factor_r = 0,
        k_factor_s = 0,
        k_factor_t = 0,
    } = kFactors[kFactors.length - 1] || {};

    return (
        <>
            <AppBarTriple
                startText={"Chart PKA"}
                middleText={trafo ? trafo.name + " - " + trafo.address : ""}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route("trafo.show", [trafo?.id ?? 0])}
                    text={"Back to Detail"}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={12} md={8}>
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
                                <AggregationRST
                                    property={"K Factor"}
                                    rMax={kFactorRMetrics.max}
                                    rMin={kFactorRMetrics.min}
                                    rLatest={k_factor_r}
                                    rAvg={kFactorRMetrics.avg}
                                    sMax={kFactorSMetrics.max}
                                    sMin={kFactorSMetrics.min}
                                    sLatest={k_factor_s}
                                    sAvg={kFactorSMetrics.avg}
                                    tMax={kFactorTMetrics.max}
                                    tMin={kFactorTMetrics.min}
                                    tLatest={k_factor_t}
                                    tAvg={kFactorTMetrics.avg}
                                    maxRTime={timeMinuteString(
                                        new Date(kFactorRMetrics.timeOfMax),
                                    )}
                                    maxSTime={timeMinuteString(
                                        new Date(kFactorSMetrics.timeOfMax),
                                    )}
                                    maxTTime={timeMinuteString(
                                        new Date(kFactorTMetrics.timeOfMax),
                                    )}
                                    minRTime={timeMinuteString(
                                        new Date(kFactorRMetrics.timeOfMin),
                                    )}
                                    minSTime={timeMinuteString(
                                        new Date(kFactorSMetrics.timeOfMin),
                                    )}
                                    minTTime={timeMinuteString(
                                        new Date(kFactorTMetrics.timeOfMin),
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
