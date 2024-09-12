import {ChartTPOProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {singleLineChart} from "@/helpers/generator/chart-generator";

export default function ChartTPO({
                                       trafo,
                                       date,
                                   }: ChartTPOProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const metricTemperature = singleLineChart({
        labels: [],
        data: [],
        label: 'Temperature',
    });

    const metricPressure = singleLineChart({
        labels: [],
        data: [],
        label: 'Pressure',
    });

    const metricOilLevel = singleLineChart({
        labels: [],
        data: [],
        label: 'Oil Level',
    });

    const metricAmbientTemperature = singleLineChart({
        labels: [],
        data: [],
        label: 'Ambient Temperature',
    });

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
                startText={'Chart PQSPF'}
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
                            sx={{
                                px: 2,
                                mt: onlyMediumScreen ? 3 : 0,
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Temperature (°C)</Typography>
                            <Line data={metricTemperature}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Pressure (p)</Typography>
                            <Line data={metricPressure}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                px: 2,
                                mt: onlyMediumScreen ? 3 : 0,
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Oil Level</Typography>
                            <Line data={metricOilLevel}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Ambient Temperature (°C)</Typography>
                            <Line data={metricAmbientTemperature}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
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
