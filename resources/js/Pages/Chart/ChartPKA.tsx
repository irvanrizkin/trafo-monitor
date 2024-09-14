import {ChartPKAProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import datasetGenerator from "@/helpers/generator/dataset-generator";
import {blue} from "@mui/material/colors";
import {singleLineChart, singleLineChartString} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRST from "@/Components/Chart/AggregationRST";
import AggregationSingle from "@/Components/Chart/AggregationSingle";

export default function ChartPKA({
                                     trafo,
                                     date,
                                     powerLosses,
                                     kFactors,
                                     triplenCurrents,
                                 }: ChartPKAProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgPowerLoss = singleLineChartString({
        labels: powerLosses.map(powerLoss => timeMinuteString(new Date(powerLoss.created_at))),
        data: powerLosses.map(powerLoss => powerLoss.power_loss),
        label: 'Power Loss',
    });

    const powerLossAggregation = calculateMetrics(powerLosses.map(powerLoss => powerLoss.power_loss));
    const { power_loss = 0 } = powerLosses[powerLosses.length - 1] || {};

    const metricAvgKFactor = singleLineChartString({
        labels: kFactors.map(kFactor => timeMinuteString(new Date(kFactor.created_at))),
        data: kFactors.map(kFactor => kFactor.k_factor),
        label: 'K Factor',
    });

    const kFactorAggregation = calculateMetrics(kFactors.map(kFactor => kFactor.k_factor));
    const { k_factor = 0 } = kFactors[kFactors.length - 1] || {};

    const metricAvgTriplenCurrent = singleLineChartString({
        labels: triplenCurrents.map(triplenCurrent => timeMinuteString(new Date(triplenCurrent.created_at))),
        data: triplenCurrents.map(triplenCurrent => triplenCurrent.triplen_current),
        label: 'Triplen Current',
    });

    const triplenCurrentAggregation = calculateMetrics(triplenCurrents.map(triplenCurrent => triplenCurrent.triplen_current));
    const { triplen_current = 0 } = triplenCurrents[triplenCurrents.length - 1] || {};

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
                startText={'Chart PKA'}
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
                            <Typography variant={"h6"}>Power Loss</Typography>
                            <Line data={metricAvgPowerLoss}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Power Loss"}
                                    max={powerLossAggregation.max}
                                    avg={powerLossAggregation.avg}
                                    min={powerLossAggregation.min}
                                    latest={power_loss}
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
                            <Typography variant={"h6"}>Triplen Current</Typography>
                            <Line data={metricAvgTriplenCurrent}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Triplen Current"}
                                    max={triplenCurrentAggregation.max}
                                    avg={triplenCurrentAggregation.avg}
                                    min={triplenCurrentAggregation.min}
                                    latest={triplen_current}
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
                            <Typography variant={"h6"}>K Factor</Typography>
                            <Line data={metricAvgKFactor}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"K Factor"}
                                    max={kFactorAggregation.max}
                                    avg={kFactorAggregation.avg}
                                    min={kFactorAggregation.min}
                                    latest={k_factor}
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
    );
}
