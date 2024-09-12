import {ChartPQSPFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstLineChart} from "@/helpers/generator/chart-generator";

export default function ChartPQSPF({
                                       trafo,
                                       date,
                                       powers,
                                       reactivePowers,
                                       apparentPowers,
                                       powerFactors,
                                       avgPowerR,
                                       avgPowerS,
                                       avgPowerT,
                                       avgReactivePowerR,
                                       avgReactivePowerS,
                                       avgReactivePowerT,
                                       avgApparentPowerR,
                                       avgApparentPowerS,
                                       avgApparentPowerT,
                                       avgPowerFactorR,
                                       avgPowerFactorS,
                                       avgPowerFactorT,
                                   }: ChartPQSPFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    const metricAvgPower = rstLineChart({
        labels: powers.map(power => power.hour),
        rData: powers.map(power => power.power_r),
        sData: powers.map(power => power.power_s),
        tData: powers.map(power => power.power_t),
    });

    const metricAvgReactivePower = rstLineChart({
        labels: reactivePowers.map(reactivePower => reactivePower.hour),
        rData: reactivePowers.map(reactivePower => reactivePower.reactive_power_r),
        sData: reactivePowers.map(reactivePower => reactivePower.reactive_power_s),
        tData: reactivePowers.map(reactivePower => reactivePower.reactive_power_t),
    });

    const metricAvgApparentPower = rstLineChart({
        labels: apparentPowers.map(apparentPower => apparentPower.hour),
        rData: apparentPowers.map(apparentPower => apparentPower.apparent_power_r),
        sData: apparentPowers.map(apparentPower => apparentPower.apparent_power_s),
        tData: apparentPowers.map(apparentPower => apparentPower.apparent_power_t),
    });

    const metricAvgPowerFactor = rstLineChart({
        labels: powerFactors.map(powerFactor => powerFactor.hour),
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
                                <Typography>R : {Math.round((avgPowerR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgPowerS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgPowerT + Number.EPSILON) * 100) / 100}</Typography>
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
                                <Typography>R : {Math.round((avgReactivePowerR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgReactivePowerS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgReactivePowerT + Number.EPSILON) * 100) / 100}</Typography>
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
                                <Typography>R : {Math.round((avgApparentPowerR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgApparentPowerS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgApparentPowerT + Number.EPSILON) * 100) / 100}</Typography>
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
                                <Typography>R : {Math.round((avgPowerFactorR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>S : {Math.round((avgPowerFactorS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>T : {Math.round((avgPowerFactorT + Number.EPSILON) * 100) / 100}</Typography>
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
