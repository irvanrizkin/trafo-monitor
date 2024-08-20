import {ChartTHDIHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import {AppBar, Box, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';

export default function ChartTHDIHD({
                                        trafo,
                                        date,
                                        totalHarmonicDistortions,
                                        thdCurrents,
                                        thdFrequencies,
                                        avgVoltageR,
                                        avgVoltageS,
                                        avgVoltageT,
                                        avgCurrentR,
                                        avgCurrentS,
                                        avgCurrentT,
                                        avgFrequencyR,
                                        avgFrequencyS,
                                        avgFrequencyT
                                    }: ChartTHDIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgTHD: ChartData<"bar", number[], number> = {
        labels: totalHarmonicDistortions.map(thd => thd.hour),
        datasets: [
            {
                label: 'VR',
                data: totalHarmonicDistortions.map(thd => thd.voltage_r),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'VS',
                data: totalHarmonicDistortions.map(thd => thd.voltage_s),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'VT',
                data: totalHarmonicDistortions.map(thd => thd.voltage_t),
                backgroundColor: 'rgb(54, 162, 235)',
            }
        ]
    }

    const metricAvgCurrent: ChartData<"bar", number[], number> = {
        labels: thdCurrents.map(current => current.hour),
        datasets: [
            {
                label: 'IR',
                data: thdCurrents.map(current => current.current_r),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'IS',
                data: thdCurrents.map(current => current.current_s),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'IT',
                data: thdCurrents.map(current => current.current_t),
                backgroundColor: 'rgb(54, 162, 235)',
            }
        ]
    }

    const metricAvgFrequency: ChartData<"bar", number[], number> = {
        labels: thdFrequencies.map(frequency => frequency.hour),
        datasets: [
            {
                label: 'FR',
                data: thdFrequencies.map(frequency => frequency.frequency_r),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'FS',
                data: thdFrequencies.map(frequency => frequency.frequency_s),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'FT',
                data: thdFrequencies.map(frequency => frequency.frequency_t),
                backgroundColor: 'rgb(54, 162, 235)',
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
                        Chart THD IHD
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
                            <Typography variant={"h6"}>THD</Typography>
                            <Bar data={metricAvgTHD}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>VR : {Math.round((avgVoltageR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>VS : {Math.round((avgVoltageS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>VT : {Math.round((avgVoltageT + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Bar data={metricAvgCurrent}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>IR : {Math.round((avgCurrentR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>IS : {Math.round((avgCurrentS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>IT : {Math.round((avgCurrentT + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Bar data={metricAvgFrequency}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>FR : {Math.round((avgFrequencyR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>FS : {Math.round((avgFrequencyS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>FT : {Math.round((avgFrequencyT + Number.EPSILON) * 100) / 100}</Typography>
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
    )
}
