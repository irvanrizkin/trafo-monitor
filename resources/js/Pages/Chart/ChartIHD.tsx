import {ChartIHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {rstBarChartString} from "@/helpers/generator/chart-generator";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import AggregationRSTOnly from "@/Components/Chart/AggregationRSTOnly";

export default function ChartIHD({
                                     trafo,
                                     date,
                                     ihdVoltages,
                                     ihdCurrents,
                                 }: ChartIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const ihdVoltageR = [
        ihdVoltages[0].h1.r ?? 0,
        ihdVoltages[0].h2.r ?? 0,
        ihdVoltages[0].h3.r ?? 0,
        ihdVoltages[0].h4.r ?? 0,
        ihdVoltages[0].h5.r ?? 0,
        ihdVoltages[0].h6.r ?? 0,
        ihdVoltages[0].h7.r ?? 0,
        ihdVoltages[0].h8.r ?? 0,
        ihdVoltages[0].h9.r ?? 0,
        ihdVoltages[0].h10.r ?? 0,
        ihdVoltages[0].h11.r ?? 0,
        ihdVoltages[0].h12.r ?? 0,
        ihdVoltages[0].h13.r ?? 0,
        ihdVoltages[0].h14.r ?? 0,
        ihdVoltages[0].h15.r ?? 0,
        ihdVoltages[0].h16.r ?? 0,
        ihdVoltages[0].h17.r ?? 0,
        ihdVoltages[0].h18.r ?? 0,
        ihdVoltages[0].h19.r ?? 0,
        ihdVoltages[0].h20.r ?? 0,
        ihdVoltages[0].h21.r ?? 0,
    ]

    const ihdVoltageS = [
        ihdVoltages[0].h1.s ?? 0,
        ihdVoltages[0].h2.s ?? 0,
        ihdVoltages[0].h3.s ?? 0,
        ihdVoltages[0].h4.s ?? 0,
        ihdVoltages[0].h5.s ?? 0,
        ihdVoltages[0].h6.s ?? 0,
        ihdVoltages[0].h7.s ?? 0,
        ihdVoltages[0].h8.s ?? 0,
        ihdVoltages[0].h9.s ?? 0,
        ihdVoltages[0].h10.s ?? 0,
        ihdVoltages[0].h11.s ?? 0,
        ihdVoltages[0].h12.s ?? 0,
        ihdVoltages[0].h13.s ?? 0,
        ihdVoltages[0].h14.s ?? 0,
        ihdVoltages[0].h15.s ?? 0,
        ihdVoltages[0].h16.s ?? 0,
        ihdVoltages[0].h17.s ?? 0,
        ihdVoltages[0].h18.s ?? 0,
        ihdVoltages[0].h19.s ?? 0,
        ihdVoltages[0].h20.s ?? 0,
        ihdVoltages[0].h21.s ?? 0,
    ]

    const ihdVoltageT = [
        ihdVoltages[0].h1.t ?? 0,
        ihdVoltages[0].h2.t ?? 0,
        ihdVoltages[0].h3.t ?? 0,
        ihdVoltages[0].h4.t ?? 0,
        ihdVoltages[0].h5.t ?? 0,
        ihdVoltages[0].h6.t ?? 0,
        ihdVoltages[0].h7.t ?? 0,
        ihdVoltages[0].h8.t ?? 0,
        ihdVoltages[0].h9.t ?? 0,
        ihdVoltages[0].h10.t ?? 0,
        ihdVoltages[0].h11.t ?? 0,
        ihdVoltages[0].h12.t ?? 0,
        ihdVoltages[0].h13.t ?? 0,
        ihdVoltages[0].h14.t ?? 0,
        ihdVoltages[0].h15.t ?? 0,
        ihdVoltages[0].h16.t ?? 0,
        ihdVoltages[0].h17.t ?? 0,
        ihdVoltages[0].h18.t ?? 0,
        ihdVoltages[0].h19.t ?? 0,
        ihdVoltages[0].h20.t ?? 0,
        ihdVoltages[0].h21.t ?? 0,
    ]

    const ihdCurrentR = [
        ihdCurrents[0].h1.r ?? 0,
        ihdCurrents[0].h2.r ?? 0,
        ihdCurrents[0].h3.r ?? 0,
        ihdCurrents[0].h4.r ?? 0,
        ihdCurrents[0].h5.r ?? 0,
        ihdCurrents[0].h6.r ?? 0,
        ihdCurrents[0].h7.r ?? 0,
        ihdCurrents[0].h8.r ?? 0,
        ihdCurrents[0].h9.r ?? 0,
        ihdCurrents[0].h10.r ?? 0,
        ihdCurrents[0].h11.r ?? 0,
        ihdCurrents[0].h12.r ?? 0,
        ihdCurrents[0].h13.r ?? 0,
        ihdCurrents[0].h14.r ?? 0,
        ihdCurrents[0].h15.r ?? 0,
        ihdCurrents[0].h16.r ?? 0,
        ihdCurrents[0].h17.r ?? 0,
        ihdCurrents[0].h18.r ?? 0,
        ihdCurrents[0].h19.r ?? 0,
        ihdCurrents[0].h20.r ?? 0,
        ihdCurrents[0].h21.r ?? 0,
    ]

    const ihdCurrentS = [
        ihdCurrents[0].h1.s ?? 0,
        ihdCurrents[0].h2.s ?? 0,
        ihdCurrents[0].h3.s ?? 0,
        ihdCurrents[0].h4.s ?? 0,
        ihdCurrents[0].h5.s ?? 0,
        ihdCurrents[0].h6.s ?? 0,
        ihdCurrents[0].h7.s ?? 0,
        ihdCurrents[0].h8.s ?? 0,
        ihdCurrents[0].h9.s ?? 0,
        ihdCurrents[0].h10.s ?? 0,
        ihdCurrents[0].h11.s ?? 0,
        ihdCurrents[0].h12.s ?? 0,
        ihdCurrents[0].h13.s ?? 0,
        ihdCurrents[0].h14.s ?? 0,
        ihdCurrents[0].h15.s ?? 0,
        ihdCurrents[0].h16.s ?? 0,
        ihdCurrents[0].h17.s ?? 0,
        ihdCurrents[0].h18.s ?? 0,
        ihdCurrents[0].h19.s ?? 0,
        ihdCurrents[0].h20.s ?? 0,
        ihdCurrents[0].h21.s ?? 0,
    ]

    const ihdCurrentT = [
        ihdCurrents[0].h1.t ?? 0,
        ihdCurrents[0].h2.t ?? 0,
        ihdCurrents[0].h3.t ?? 0,
        ihdCurrents[0].h4.t ?? 0,
        ihdCurrents[0].h5.t ?? 0,
        ihdCurrents[0].h6.t ?? 0,
        ihdCurrents[0].h7.t ?? 0,
        ihdCurrents[0].h8.t ?? 0,
        ihdCurrents[0].h9.t ?? 0,
        ihdCurrents[0].h10.t ?? 0,
        ihdCurrents[0].h11.t ?? 0,
        ihdCurrents[0].h12.t ?? 0,
        ihdCurrents[0].h13.t ?? 0,
        ihdCurrents[0].h14.t ?? 0,
        ihdCurrents[0].h15.t ?? 0,
        ihdCurrents[0].h16.t ?? 0,
        ihdCurrents[0].h17.t ?? 0,
        ihdCurrents[0].h18.t ?? 0,
        ihdCurrents[0].h19.t ?? 0,
        ihdCurrents[0].h20.t ?? 0,
        ihdCurrents[0].h21.t ?? 0,
    ]

    const metricAvgVoltage = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: ihdVoltageR,
        sData: ihdVoltageS,
        tData: ihdVoltageT,
    })

    const ihdVoltageRAggregation = calculateMetrics(ihdVoltageR);
    const ihdVoltageSAggregation = calculateMetrics(ihdVoltageS);
    const ihdVoltageTAggregation = calculateMetrics(ihdVoltageT);

    const metricAvgCurrent = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: ihdCurrentR,
        sData: ihdCurrentS,
        tData: ihdCurrentT,
    })

    const ihdCurrentRAggregation = calculateMetrics(ihdCurrentR);
    const ihdCurrentSAggregation = calculateMetrics(ihdCurrentS);
    const ihdCurrentTAggregation = calculateMetrics(ihdCurrentT);

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
                startText={'Chart IHD'}
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
                            <Typography variant={"h6"}>Individual Harmonics Distortion Voltage (IHDv)</Typography>
                            <Bar data={metricAvgVoltage}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTOnly
                                    rMax={ihdVoltageRAggregation.max}
                                    sMax={ihdVoltageSAggregation.max}
                                    tMax={ihdVoltageTAggregation.max}
                                    rAvg={ihdVoltageRAggregation.avg}
                                    sAvg={ihdVoltageSAggregation.avg}
                                    tAvg={ihdVoltageTAggregation.avg}
                                    rMin={ihdVoltageRAggregation.min}
                                    sMin={ihdVoltageSAggregation.min}
                                    tMin={ihdVoltageTAggregation.min}
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
                            <Typography variant={"h6"}>Individual Harmonics Distortion Current (IHDi)</Typography>
                            <Bar data={metricAvgCurrent}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTOnly
                                    rMax={ihdCurrentRAggregation.max}
                                    sMax={ihdCurrentSAggregation.max}
                                    tMax={ihdCurrentTAggregation.max}
                                    rAvg={ihdCurrentRAggregation.avg}
                                    sAvg={ihdCurrentSAggregation.avg}
                                    tAvg={ihdCurrentTAggregation.avg}
                                    rMin={ihdCurrentRAggregation.min}
                                    sMin={ihdCurrentSAggregation.min}
                                    tMin={ihdCurrentTAggregation.min}
                                />
                            </Container>
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
