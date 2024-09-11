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

export default function ChartIHD({
                                     trafo,
                                     date,
                                     ihdVoltages,
                                     ihdCurrents,
                                     avgVoltageR = 0,
                                     avgVoltageS = 0,
                                     avgVoltageT = 0,
                                     avgCurrentR = 0,
                                     avgCurrentS = 0,
                                     avgCurrentT = 0,
                                 }: ChartIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    console.log('ihdVoltages', ihdVoltages);

    const metricAvgVoltage = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: [
            ihdVoltages[0].h1.r,
            ihdVoltages[0].h2.r,
            ihdVoltages[0].h3.r,
            ihdVoltages[0].h4.r,
            ihdVoltages[0].h5.r,
            ihdVoltages[0].h6.r,
            ihdVoltages[0].h7.r,
            ihdVoltages[0].h8.r,
            ihdVoltages[0].h9.r,
            ihdVoltages[0].h10.r,
            ihdVoltages[0].h11.r,
            ihdVoltages[0].h12.r,
            ihdVoltages[0].h13.r,
            ihdVoltages[0].h14.r,
            ihdVoltages[0].h15.r,
            ihdVoltages[0].h16.r,
            ihdVoltages[0].h17.r,
            ihdVoltages[0].h18.r,
            ihdVoltages[0].h19.r,
            ihdVoltages[0].h20.r,
            ihdVoltages[0].h21.r,
        ],
        sData: [
            ihdVoltages[0].h1.s,
            ihdVoltages[0].h2.s,
            ihdVoltages[0].h3.s,
            ihdVoltages[0].h4.s,
            ihdVoltages[0].h5.s,
            ihdVoltages[0].h6.s,
            ihdVoltages[0].h7.s,
            ihdVoltages[0].h8.s,
            ihdVoltages[0].h9.s,
            ihdVoltages[0].h10.s,
            ihdVoltages[0].h11.s,
            ihdVoltages[0].h12.s,
            ihdVoltages[0].h13.s,
            ihdVoltages[0].h14.s,
            ihdVoltages[0].h15.s,
            ihdVoltages[0].h16.s,
            ihdVoltages[0].h17.s,
            ihdVoltages[0].h18.s,
            ihdVoltages[0].h19.s,
            ihdVoltages[0].h20.s,
            ihdVoltages[0].h21.s,
        ],
        tData: [
            ihdVoltages[0].h1.t,
            ihdVoltages[0].h2.t,
            ihdVoltages[0].h3.t,
            ihdVoltages[0].h4.t,
            ihdVoltages[0].h5.t,
            ihdVoltages[0].h6.t,
            ihdVoltages[0].h7.t,
            ihdVoltages[0].h8.t,
            ihdVoltages[0].h9.t,
            ihdVoltages[0].h10.t,
            ihdVoltages[0].h11.t,
            ihdVoltages[0].h12.t,
            ihdVoltages[0].h13.t,
            ihdVoltages[0].h14.t,
            ihdVoltages[0].h15.t,
            ihdVoltages[0].h16.t,
            ihdVoltages[0].h17.t,
            ihdVoltages[0].h18.t,
            ihdVoltages[0].h19.t,
            ihdVoltages[0].h20.t,
            ihdVoltages[0].h21.t,
        ],
    })

    const metricAvgCurrent = rstBarChartString({
        labels: Array.from({ length: 21 }, (_, i) => `H${i + 1}`),
        rData: [
            ihdCurrents[0].h1.r,
            ihdCurrents[0].h2.r,
            ihdCurrents[0].h3.r,
            ihdCurrents[0].h4.r,
            ihdCurrents[0].h5.r,
            ihdCurrents[0].h6.r,
            ihdCurrents[0].h7.r,
            ihdCurrents[0].h8.r,
            ihdCurrents[0].h9.r,
            ihdCurrents[0].h10.r,
            ihdCurrents[0].h11.r,
            ihdCurrents[0].h12.r,
            ihdCurrents[0].h13.r,
            ihdCurrents[0].h14.r,
            ihdCurrents[0].h15.r,
            ihdCurrents[0].h16.r,
            ihdCurrents[0].h17.r,
            ihdCurrents[0].h18.r,
            ihdCurrents[0].h19.r,
            ihdCurrents[0].h20.r,
            ihdCurrents[0].h21.r,
        ],
        sData: [
            ihdCurrents[0].h1.s,
            ihdCurrents[0].h2.s,
            ihdCurrents[0].h3.s,
            ihdCurrents[0].h4.s,
            ihdCurrents[0].h5.s,
            ihdCurrents[0].h6.s,
            ihdCurrents[0].h7.s,
            ihdCurrents[0].h8.s,
            ihdCurrents[0].h9.s,
            ihdCurrents[0].h10.s,
            ihdCurrents[0].h11.s,
            ihdCurrents[0].h12.s,
            ihdCurrents[0].h13.s,
            ihdCurrents[0].h14.s,
            ihdCurrents[0].h15.s,
            ihdCurrents[0].h16.s,
            ihdCurrents[0].h17.s,
            ihdCurrents[0].h18.s,
            ihdCurrents[0].h19.s,
            ihdCurrents[0].h20.s,
            ihdCurrents[0].h21.s,
        ],
        tData: [
            ihdCurrents[0].h1.t,
            ihdCurrents[0].h2.t,
            ihdCurrents[0].h3.t,
            ihdCurrents[0].h4.t,
            ihdCurrents[0].h5.t,
            ihdCurrents[0].h6.t,
            ihdCurrents[0].h7.t,
            ihdCurrents[0].h8.t,
            ihdCurrents[0].h9.t,
            ihdCurrents[0].h10.t,
            ihdCurrents[0].h11.t,
            ihdCurrents[0].h12.t,
            ihdCurrents[0].h13.t,
            ihdCurrents[0].h14.t,
            ihdCurrents[0].h15.t,
            ihdCurrents[0].h16.t,
            ihdCurrents[0].h17.t,
            ihdCurrents[0].h18.t,
            ihdCurrents[0].h19.t,
            ihdCurrents[0].h20.t,
            ihdCurrents[0].h21.t,
        ],
    })

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
                            <Typography variant={"h6"}>IHD Voltage</Typography>
                            <Bar data={metricAvgVoltage}/>
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
                            <Typography variant={"h6"}>IHD Current</Typography>
                            <Bar data={metricAvgCurrent}/>
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
