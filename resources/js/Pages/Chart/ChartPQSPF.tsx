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
import getCreatedAt from "@/helpers/analysis/get-createdat";
import {MetricApparentPower, MetricPower, MetricPowerFactor, MetricReactivePower} from "@/types/metric";

export default function ChartPQSPF({
                                       trafo,
                                       powers,
                                       reactivePowers,
                                       apparentPowers,
                                       powerFactors,
                                       powerRMetrics,
                                       powerSMetrics,
                                       powerTMetrics,
                                       reactivePowerRMetrics,
                                       reactivePowerSMetrics,
                                       reactivePowerTMetrics,
                                       apparentPowerRMetrics,
                                       apparentPowerSMetrics,
                                       apparentPowerTMetrics,
                                       powerFactorRMetrics,
                                       powerFactorSMetrics,
                                       powerFactorTMetrics,
                                   }: ChartPQSPFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    const metricAvgPower = rstLineChartString({
        labels: powers.map(power => timeMinuteString(new Date(power.created_at))),
        rData: powers.map(power => power.power_r),
        sData: powers.map(power => power.power_s),
        tData: powers.map(power => power.power_t),
    });
    const { power_r = 0, power_s = 0, power_t = 0 } = powers[powers.length - 1] || {};

    const metricAvgReactivePower = rstLineChartString({
        labels: reactivePowers.map(reactivePower => timeMinuteString(new Date(reactivePower.created_at))),
        rData: reactivePowers.map(reactivePower => reactivePower.reactive_power_r),
        sData: reactivePowers.map(reactivePower => reactivePower.reactive_power_s),
        tData: reactivePowers.map(reactivePower => reactivePower.reactive_power_t),
    });
    const { reactive_power_r = 0, reactive_power_s = 0, reactive_power_t = 0 } = reactivePowers[reactivePowers.length - 1] || {};

    const metricAvgApparentPower = rstLineChartString({
        labels: apparentPowers.map(apparentPower => timeMinuteString(new Date(apparentPower.created_at))),
        rData: apparentPowers.map(apparentPower => apparentPower.apparent_power_r),
        sData: apparentPowers.map(apparentPower => apparentPower.apparent_power_s),
        tData: apparentPowers.map(apparentPower => apparentPower.apparent_power_t),
    });
    const { apparent_power_r = 0, apparent_power_s = 0, apparent_power_t = 0 } = apparentPowers[apparentPowers.length - 1] || {};

    const metricAvgPowerFactor = rstLineChartString({
        labels: powerFactors.map(powerFactor => timeMinuteString(new Date(powerFactor.created_at))),
        rData: powerFactors.map(powerFactor => powerFactor.power_factor_r),
        sData: powerFactors.map(powerFactor => powerFactor.power_factor_s),
        tData: powerFactors.map(powerFactor => powerFactor.power_factor_t),
    });
    const { power_factor_r = 0, power_factor_s = 0, power_factor_t = 0 } = powerFactors[powerFactors.length - 1] || {};

    return (
        <>
            <AppBarTriple
                startText={'Chart PQSPF'}
                middleText={trafo ? trafo.name + ' - ' + trafo.address : ''}
                endText={"Last 12 Data"}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route('trafo.show', [trafo?.id ?? 0])}
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
                            <Typography variant={"h6"}>Active Power (W)</Typography>
                            <Line data={metricAvgPower}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={powerRMetrics.max}
                                    sMax={powerSMetrics.max}
                                    tMax={powerTMetrics.max}
                                    rMin={powerRMetrics.min}
                                    sMin={powerSMetrics.min}
                                    tMin={powerTMetrics.min}
                                    rAvg={powerRMetrics.avg}
                                    sAvg={powerSMetrics.avg}
                                    tAvg={powerTMetrics.avg}
                                    rLatest={power_r}
                                    sLatest={power_s}
                                    tLatest={power_t}
                                    maxRTime={timeMinuteString(new Date(powerRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(powerSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(powerTMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(powerRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(powerSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(powerTMetrics.timeOfMin))}
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
                            <Typography variant={"h6"}>Reactive Power (VA)</Typography>
                            <Line data={metricAvgReactivePower}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={reactivePowerRMetrics.max}
                                    sMax={reactivePowerSMetrics.max}
                                    tMax={reactivePowerTMetrics.max}
                                    rMin={reactivePowerRMetrics.min}
                                    sMin={reactivePowerSMetrics.min}
                                    tMin={reactivePowerTMetrics.min}
                                    rAvg={reactivePowerRMetrics.avg}
                                    sAvg={reactivePowerSMetrics.avg}
                                    tAvg={reactivePowerTMetrics.avg}
                                    rLatest={reactive_power_r}
                                    sLatest={reactive_power_s}
                                    tLatest={reactive_power_t}
                                    maxRTime={timeMinuteString(new Date(reactivePowerRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(reactivePowerSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(reactivePowerTMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(reactivePowerRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(reactivePowerSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(reactivePowerTMetrics.timeOfMin))}
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
                                    rMax={apparentPowerRMetrics.max}
                                    sMax={apparentPowerSMetrics.max}
                                    tMax={apparentPowerTMetrics.max}
                                    rMin={apparentPowerRMetrics.min}
                                    sMin={apparentPowerSMetrics.min}
                                    tMin={apparentPowerTMetrics.min}
                                    rAvg={apparentPowerRMetrics.avg}
                                    sAvg={apparentPowerSMetrics.avg}
                                    tAvg={apparentPowerTMetrics.avg}
                                    rLatest={apparent_power_r}
                                    sLatest={apparent_power_s}
                                    tLatest={apparent_power_t}
                                    maxRTime={timeMinuteString(new Date(apparentPowerRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(apparentPowerSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(apparentPowerTMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(apparentPowerRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(apparentPowerSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(apparentPowerTMetrics.timeOfMin))}
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
                                    rMax={powerFactorRMetrics.max}
                                    sMax={powerFactorSMetrics.max}
                                    tMax={powerFactorTMetrics.max}
                                    rMin={powerFactorRMetrics.min}
                                    sMin={powerFactorSMetrics.min}
                                    tMin={powerFactorTMetrics.min}
                                    rAvg={powerFactorRMetrics.avg}
                                    sAvg={powerFactorSMetrics.avg}
                                    tAvg={powerFactorTMetrics.avg}
                                    rLatest={power_factor_r}
                                    sLatest={power_factor_s}
                                    tLatest={power_factor_t}
                                    maxRTime={timeMinuteString(new Date(powerFactorRMetrics.timeOfMax))}
                                    maxSTime={timeMinuteString(new Date(powerFactorSMetrics.timeOfMax))}
                                    maxTTime={timeMinuteString(new Date(powerFactorTMetrics.timeOfMax))}
                                    minRTime={timeMinuteString(new Date(powerFactorRMetrics.timeOfMin))}
                                    minSTime={timeMinuteString(new Date(powerFactorSMetrics.timeOfMin))}
                                    minTTime={timeMinuteString(new Date(powerFactorTMetrics.timeOfMin))}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo?.latitude ?? 0)}
                            lng={Number(trafo?.longitude ?? 0)}
                            title={trafo?.name ?? ''}
                            height={'700px'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
