import {ChartVIFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    rstinLineChart,
    rstinLineChartString,
    rstLineChart,
    rstLineChartString,
    singleLineChart,
    singleLineChartString
} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";

export default function ChartVIF({
                                     trafo,
                                     date,
                                     voltages,
                                     currents,
                                     frequencies,
                                 }: ChartVIFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    const metricAvgVoltage = rstLineChartString(
        {
            labels: voltages.map(voltage => timeMinuteString(new Date(voltage.created_at))),
            rData: voltages.map(voltage => voltage.voltage_r),
            sData: voltages.map(voltage => voltage.voltage_s),
            tData: voltages.map(voltage => voltage.voltage_t),
        }
    );

    console.log('metricAvgVoltage', metricAvgVoltage);

    const metricAvgCurrent = rstinLineChartString(
        {
            labels: currents.map(current => timeMinuteString(new Date(current.created_at))),
            rData: currents.map(current => current.current_r),
            sData: currents.map(current => current.current_s),
            tData: currents.map(current => current.current_t),
            inData: currents.map(current => current.current_in),
        }
    );

    const metricAvgFrequency = singleLineChartString({
        labels: frequencies.map(frequency => timeMinuteString(new Date(frequency.created_at))),
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
                            <Typography variant={"h6"}>Voltage (V)</Typography>
                            <Line data={metricAvgVoltage}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Frequency (f)</Typography>
                            <Line data={metricAvgFrequency}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>Max : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Avg : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>Min : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Typography variant={"h6"}>Current (I)</Typography>
                            <Line data={metricAvgCurrent}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>IN : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
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
