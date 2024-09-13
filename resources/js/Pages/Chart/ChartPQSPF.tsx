import {ChartPQSPFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstLineChartString} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";

export default function ChartPQSPF({
                                       trafo,
                                       date,
                                       powers,
                                       reactivePowers,
                                       apparentPowers,
                                       powerFactors,
                                   }: ChartPQSPFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    console.log(powers.length);

    const metricAvgPower = rstLineChartString({
        labels: powers.map(power => timeMinuteString(new Date(power.created_at))),
        rData: powers.map(power => power.power_r),
        sData: powers.map(power => power.power_s),
        tData: powers.map(power => power.power_t),
    });

    const metricAvgReactivePower = rstLineChartString({
        labels: reactivePowers.map(reactivePower => timeMinuteString(new Date(reactivePower.created_at))),
        rData: reactivePowers.map(reactivePower => reactivePower.reactive_power_r),
        sData: reactivePowers.map(reactivePower => reactivePower.reactive_power_s),
        tData: reactivePowers.map(reactivePower => reactivePower.reactive_power_t),
    });

    const metricAvgApparentPower = rstLineChartString({
        labels: apparentPowers.map(apparentPower => timeMinuteString(new Date(apparentPower.created_at))),
        rData: apparentPowers.map(apparentPower => apparentPower.apparent_power_r),
        sData: apparentPowers.map(apparentPower => apparentPower.apparent_power_s),
        tData: apparentPowers.map(apparentPower => apparentPower.apparent_power_t),
    });

    const metricAvgPowerFactor = rstLineChartString({
        labels: powerFactors.map(powerFactor => timeMinuteString(new Date(powerFactor.created_at))),
        rData: powerFactors.map(powerFactor => powerFactor.power_factor_r),
        sData: powerFactors.map(powerFactor => powerFactor.power_factor_s),
        tData: powerFactors.map(powerFactor => powerFactor.power_factor_t),
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
                            <Typography variant={"h6"}>Power (P)</Typography>
                            <Line data={metricAvgPower}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Reactive Power (Q)</Typography>
                            <Line data={metricAvgReactivePower}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
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
                            <Typography variant={"h6"}>Apparent Power (VA)</Typography>
                            <Line data={metricAvgApparentPower}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Power Factor (PF)</Typography>
                            <Line data={metricAvgPowerFactor}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>R : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((0 + Number.EPSILON) * 100) / 100}</Typography>
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
