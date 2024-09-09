import {ChartVIFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstLineChart, singleLineChart} from "@/helpers/generator/chart-generator";

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
                                     avgCurrentIN,
                                     maxFrequency,
                                     avgFrequency,
                                     minFrequency,
                                 }: ChartVIFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgVoltage = rstLineChart(
        {
            labels: voltages.map(voltage => voltage.hour),
            rData: voltages.map(voltage => voltage.voltage_r),
            sData: voltages.map(voltage => voltage.voltage_s),
            tData: voltages.map(voltage => voltage.voltage_t),
        }
    );

    const metricAvgCurrent = rstLineChart(
        {
            labels: currents.map(current => current.hour),
            rData: currents.map(current => current.current_r),
            sData: currents.map(current => current.current_s),
            tData: currents.map(current => current.current_t),
        }
    );

    const metricAvgFrequency = singleLineChart({
        labels: frequencies.map(frequency => frequency.hour),
        data: frequencies.map(frequency => frequency.frequency_r),
        label: 'Frequency',
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
                startText={'Chart VIF'}
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
                                <Typography>IN : {Math.round((avgCurrentIN + Number.EPSILON) * 100) / 100}</Typography>
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
                                <Typography>Max : {Math.round((maxFrequency + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((avgFrequency + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((minFrequency + Number.EPSILON) * 100) / 100}</Typography>
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
