import {ChartTHDIHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {Bar, Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstBarChart, rstLineChart} from "@/helpers/generator/chart-generator";

export default function ChartTHDIHD({
                                        trafo,
                                        date,
                                        thdVoltages,
                                        thdCurrents,
                                        avgVoltageR = 0,
                                        avgVoltageS = 0,
                                        avgVoltageT = 0,
                                        avgCurrentR = 0,
                                        avgCurrentS = 0,
                                        avgCurrentT = 0,
                                    }: ChartTHDIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricVoltages = rstBarChart({
        labels: thdVoltages.reverse().map(voltage => new Date(voltage.created_at).getMinutes()),
        rData: thdVoltages.reverse().map(voltage => voltage.voltage_r),
        sData: thdVoltages.reverse().map(voltage => voltage.voltage_s),
        tData: thdVoltages.reverse().map(voltage => voltage.voltage_t),
    });

    const metricCurrents = rstBarChart({
        labels: thdCurrents.reverse().map(current => new Date(current.created_at).getMinutes()),
        rData: thdCurrents.reverse().map(current => current.current_r),
        sData: thdCurrents.reverse().map(current => current.current_s),
        tData: thdCurrents.reverse().map(current => current.current_t),
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

    console.log('metricVoltages', metricVoltages)

    return (
        <>
            <AppBarTriple
                startText={'Chart THD IHD'}
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
                            <Typography variant={"h6"}>Total Harmonics Distortion Voltage (THDv)</Typography>
                            <Bar data={metricVoltages}/>
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
                            <Typography variant={"h6"}>Total Harmonics Distortion Current (THDi)</Typography>
                            <Bar data={metricCurrents}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>IR : {Math.round((avgCurrentR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>IS : {Math.round((avgCurrentS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>IT : {Math.round((avgCurrentT + Number.EPSILON) * 100) / 100}</Typography>
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
