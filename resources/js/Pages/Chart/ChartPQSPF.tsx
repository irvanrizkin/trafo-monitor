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
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationRST from "@/Components/Chart/AggregationRST";
import GoogleMap from "@/Components/Map/GoogleMap";

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

    const powerRAggregation = calculateMetrics(powers.map(power => power.power_r));
    const powerSAggregation = calculateMetrics(powers.map(power => power.power_s));
    const powerTAggregation = calculateMetrics(powers.map(power => power.power_t));
    const { power_r = 0, power_s = 0, power_t = 0 } = powers[powers.length - 1] || {};

    const metricAvgReactivePower = rstLineChartString({
        labels: reactivePowers.map(reactivePower => timeMinuteString(new Date(reactivePower.created_at))),
        rData: reactivePowers.map(reactivePower => reactivePower.reactive_power_r),
        sData: reactivePowers.map(reactivePower => reactivePower.reactive_power_s),
        tData: reactivePowers.map(reactivePower => reactivePower.reactive_power_t),
    });

    const reactivePowerRAggregation = calculateMetrics(reactivePowers.map(reactivePower => reactivePower.reactive_power_r));
    const reactivePowerSAggregation = calculateMetrics(reactivePowers.map(reactivePower => reactivePower.reactive_power_s));
    const reactivePowerTAggregation = calculateMetrics(reactivePowers.map(reactivePower => reactivePower.reactive_power_t));
    const { reactive_power_r = 0, reactive_power_s = 0, reactive_power_t = 0 } = reactivePowers[reactivePowers.length - 1] || {};

    const metricAvgApparentPower = rstLineChartString({
        labels: apparentPowers.map(apparentPower => timeMinuteString(new Date(apparentPower.created_at))),
        rData: apparentPowers.map(apparentPower => apparentPower.apparent_power_r),
        sData: apparentPowers.map(apparentPower => apparentPower.apparent_power_s),
        tData: apparentPowers.map(apparentPower => apparentPower.apparent_power_t),
    });

    const apparentPowerRAggregation = calculateMetrics(apparentPowers.map(apparentPower => apparentPower.apparent_power_r));
    const apparentPowerSAggregation = calculateMetrics(apparentPowers.map(apparentPower => apparentPower.apparent_power_s));
    const apparentPowerTAggregation = calculateMetrics(apparentPowers.map(apparentPower => apparentPower.apparent_power_t));
    const { apparent_power_r = 0, apparent_power_s = 0, apparent_power_t = 0 } = apparentPowers[apparentPowers.length - 1] || {};

    const metricAvgPowerFactor = rstLineChartString({
        labels: powerFactors.map(powerFactor => timeMinuteString(new Date(powerFactor.created_at))),
        rData: powerFactors.map(powerFactor => powerFactor.power_factor_r),
        sData: powerFactors.map(powerFactor => powerFactor.power_factor_s),
        tData: powerFactors.map(powerFactor => powerFactor.power_factor_t),
    });

    const powerFactorRAggregation = calculateMetrics(powerFactors.map(powerFactor => powerFactor.power_factor_r));
    const powerFactorSAggregation = calculateMetrics(powerFactors.map(powerFactor => powerFactor.power_factor_s));
    const powerFactorTAggregation = calculateMetrics(powerFactors.map(powerFactor => powerFactor.power_factor_t));
    const { power_factor_r = 0, power_factor_s = 0, power_factor_t = 0 } = powerFactors[powerFactors.length - 1] || {};

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
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Power (P)</Typography>
                            <Line data={metricAvgPower}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={powerRAggregation.max}
                                    sMax={powerSAggregation.max}
                                    tMax={powerTAggregation.max}
                                    rMin={powerRAggregation.min}
                                    sMin={powerSAggregation.min}
                                    tMin={powerTAggregation.min}
                                    rAvg={powerRAggregation.avg}
                                    sAvg={powerSAggregation.avg}
                                    tAvg={powerTAggregation.avg}
                                    rLatest={power_r}
                                    sLatest={power_s}
                                    tLatest={power_t}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Reactive Power (Q)</Typography>
                            <Line data={metricAvgReactivePower}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={reactivePowerRAggregation.max}
                                    sMax={reactivePowerSAggregation.max}
                                    tMax={reactivePowerTAggregation.max}
                                    rMin={reactivePowerRAggregation.min}
                                    sMin={reactivePowerSAggregation.min}
                                    tMin={reactivePowerTAggregation.min}
                                    rAvg={reactivePowerRAggregation.avg}
                                    sAvg={reactivePowerSAggregation.avg}
                                    tAvg={reactivePowerTAggregation.avg}
                                    rLatest={reactive_power_r}
                                    sLatest={reactive_power_s}
                                    tLatest={reactive_power_t}
                                />
                            </Container>
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
                            <Typography variant={"h6"}>Apparent Power (VA)</Typography>
                            <Line data={metricAvgApparentPower}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={apparentPowerRAggregation.max}
                                    sMax={apparentPowerSAggregation.max}
                                    tMax={apparentPowerTAggregation.max}
                                    rMin={apparentPowerRAggregation.min}
                                    sMin={apparentPowerSAggregation.min}
                                    tMin={apparentPowerTAggregation.min}
                                    rAvg={apparentPowerRAggregation.avg}
                                    sAvg={apparentPowerSAggregation.avg}
                                    tAvg={apparentPowerTAggregation.avg}
                                    rLatest={apparent_power_r}
                                    sLatest={apparent_power_s}
                                    tLatest={apparent_power_t}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Power Factor (PF)</Typography>
                            <Line data={metricAvgPowerFactor}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={powerFactorRAggregation.max}
                                    sMax={powerFactorSAggregation.max}
                                    tMax={powerFactorTAggregation.max}
                                    rMin={powerFactorRAggregation.min}
                                    sMin={powerFactorSAggregation.min}
                                    tMin={powerFactorTAggregation.min}
                                    rAvg={powerFactorRAggregation.avg}
                                    sAvg={powerFactorSAggregation.avg}
                                    tAvg={powerFactorTAggregation.avg}
                                    rLatest={power_factor_r}
                                    sLatest={power_factor_s}
                                    tLatest={power_factor_t}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo.latitude)}
                            lng={Number(trafo.longitude)}
                            title={trafo.name}
                            height={'700px'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
