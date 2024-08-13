import {ChartPKAProps} from "@/types/chart";
import {AppBar, Box, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import 'chart.js/auto';

export default function ChartPKA({
                                     trafo,
                                     date,
                                     powerLosses,
                                     kFactors,
                                     triplenCurrents,
                                     maxPowerLoss,
                                     avgPowerLoss,
                                     minPowerLoss,
                                     maxKFactor,
                                     avgKFactor,
                                     minKFactor,
                                     maxTriplenCurrent,
                                     avgTriplenCurrent,
                                     minTriplenCurrent,
                                 }: ChartPKAProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgPowerLoss: ChartData<"line", number[], number> = {
        labels: powerLosses.map(powerLoss => powerLoss.hour),
        datasets: [
            {
                label: 'Power Loss',
                data: powerLosses.map(powerLoss => powerLoss.power_loss),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

    const metricAvgKFactor: ChartData<"line", number[], number> = {
        labels: kFactors.map(kFactor => kFactor.hour),
        datasets: [
            {
                label: 'K Factor',
                data: kFactors.map(kFactor => kFactor.k_factor),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

    const metricAvgTriplenCurrent: ChartData<"line", number[], number> = {
        labels: triplenCurrents.map(triplenCurrent => triplenCurrent.hour),
        datasets: [
            {
                label: 'Triplen Current',
                data: triplenCurrents.map(triplenCurrent => triplenCurrent.triplen_current),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    }

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
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Chart PKA
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h3" textAlign="center" sx={{ mb: 0.5 }}>
                        <b>{trafo.name}</b>
                    </Typography>
                    <Typography variant="h5" textAlign="center" sx={{ mb: 0.5 }}>
                        <b>{trafo.address}</b>
                    </Typography>
                    <Typography variant="h5" textAlign="center" sx={{ mb: 0.5 }}>
                        <b>{date}</b>
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{py: 2}}>
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
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((maxPowerLoss + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((avgPowerLoss + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((minPowerLoss + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
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
                            <Typography variant={"h6"}>Current</Typography>
                            <Line data={metricAvgKFactor}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((maxKFactor + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((avgKFactor + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((minKFactor + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
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
                            <Typography variant={"h6"}>Frequency</Typography>
                            <Line data={metricAvgTriplenCurrent}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((maxTriplenCurrent + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((avgTriplenCurrent + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((minTriplenCurrent + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ height: '35vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: mapApiKey }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                    />
                </Box>
            </Container>
        </>
    );
}
