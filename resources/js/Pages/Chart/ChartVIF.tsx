import {ChartVIFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";

export default function ChartVIF({
                                     trafo,
                                     date,
                                     voltages,
                                     currents,
                                     frequencies,
                                     avgVoltageR,
                                     avgVoltageS,
                                     avgVoltageT,
                                     avgCurrentR,
                                     avgCurrentS,
                                     avgCurrentT,
                                     avgFrequencyR,
                                     avgFrequencyS,
                                     avgFrequencyT
                                 }: ChartVIFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgVoltage: ChartData<"line", number[], number> = {
        labels: voltages.map(voltage => voltage.hour),
        datasets: [
            {
                label: 'R',
                data: voltages.map(voltage => voltage.voltage_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: voltages.map(voltage => voltage.voltage_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: voltages.map(voltage => voltage.voltage_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
                tension: 0.1
            }
        ]
    }

    const metricAvgCurrent: ChartData<"line", number[], number> = {
        labels: currents.map(current => current.hour),
        datasets: [
            {
                label: 'R',
                data: currents.map(current => current.current_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: currents.map(current => current.current_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: currents.map(current => current.current_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
                tension: 0.1
            }
        ]
    }

    const metricAvgFrequency: ChartData<"line", number[], number> = {
        labels: frequencies.map(frequency => frequency.hour),
        datasets: [
            {
                label: 'R',
                data: frequencies.map(frequency => frequency.frequency_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: frequencies.map(frequency => frequency.frequency_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: frequencies.map(frequency => frequency.frequency_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
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
            <AppBarTriple
                startText={'Chart VIF'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <Grid container spacing={2} sx={{py: 2, mt: 2}}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Voltage</Typography>
                            <Line data={metricAvgVoltage}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((avgVoltageR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgVoltageS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgVoltageT + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Line data={metricAvgCurrent}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((avgCurrentR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgCurrentS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgCurrentT + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Line data={metricAvgFrequency}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((avgFrequencyR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgFrequencyS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgFrequencyT + Number.EPSILON) * 100) / 100}</Typography>
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
