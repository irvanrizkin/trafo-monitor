import {ChartPQSPFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";

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

    const metricAvgPower: ChartData<"line", number[], number> = {
        labels: powers.map(power => power.hour),
        datasets: [
            {
                label: 'R',
                data: powers.map(power => power.power_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: powers.map(power => power.power_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: powers.map(power => power.power_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
                tension: 0.1
            }
        ]
    }

    const metricAvgReactivePower: ChartData<"line", number[], number> = {
        labels: reactivePowers.map(reactivePower => reactivePower.hour),
        datasets: [
            {
                label: 'R',
                data: reactivePowers.map(reactivePower => reactivePower.reactive_power_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: reactivePowers.map(reactivePower => reactivePower.reactive_power_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: reactivePowers.map(reactivePower => reactivePower.reactive_power_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
                tension: 0.1
            }
        ]
    }

    const metricAvgApparentPower: ChartData<"line", number[], number> = {
        labels: apparentPowers.map(apparentPower => apparentPower.hour),
        datasets: [
            {
                label: 'R',
                data: apparentPowers.map(apparentPower => apparentPower.apparent_power_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: apparentPowers.map(apparentPower => apparentPower.apparent_power_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: apparentPowers.map(apparentPower => apparentPower.apparent_power_t),
                fill: false,
                borderColor: 'rgb(38, 0, 27)',
                tension: 0.1
            }
        ]
    }

    const metricAvgPowerFactor: ChartData<"line", number[], number> = {
        labels: powerFactors.map(powerFactor => powerFactor.hour),
        datasets: [
            {
                label: 'R',
                data: powerFactors.map(powerFactor => powerFactor.power_factor_r),
                fill: false,
                borderColor: 'rgb(255, 0, 92)',
                tension: 0.1
            },
            {
                label: 'S',
                data: powerFactors.map(powerFactor => powerFactor.power_factor_s),
                fill: false,
                borderColor: 'rgb(255, 246, 0)',
                tension: 0.1
            },
            {
                label: 'T',
                data: powerFactors.map(powerFactor => powerFactor.power_factor_t),
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
                            <Typography variant={"h6"}>Power</Typography>
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
                            <Typography variant={"h6"}>Reactive Power</Typography>
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
                            <Typography variant={"h6"}>Apparent Power</Typography>
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
                            <Typography variant={"h6"}>Power Factor</Typography>
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
