import {ChartIHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";

export default function ChartIHD({
                                     trafo,
                                     date,
                                     individualHarmonicDistortions,
                                     ihdCurrents,
                                     avgVoltageR,
                                     avgVoltageS,
                                     avgVoltageT,
                                     avgCurrentR,
                                     avgCurrentS,
                                     avgCurrentT,
                                 }: ChartIHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricAvgVoltage: ChartData<"bar", number[], number> = {
        labels: individualHarmonicDistortions.map(ihd => ihd.hour),
        datasets: [
            {
                label: 'VR',
                data: individualHarmonicDistortions.map(ihd => ihd.voltage_r),
                backgroundColor: 'rgb(255, 0, 92)',
            },
            {
                label: 'VS',
                data: individualHarmonicDistortions.map(ihd => ihd.voltage_s),
                backgroundColor: 'rgb(255, 246, 0)',
            },
            {
                label: 'VT',
                data: individualHarmonicDistortions.map(ihd => ihd.voltage_t),
                backgroundColor: 'rgb(38, 0, 27)',
            }
        ]
    }

    const metricAvgCurrent: ChartData<"bar", number[], number> = {
        labels: ihdCurrents.map(current => current.hour),
        datasets: [
            {
                label: 'IR',
                data: ihdCurrents.map(current => current.current_r),
                backgroundColor: 'rgb(255, 0, 92)',
            },
            {
                label: 'IS',
                data: ihdCurrents.map(current => current.current_s),
                backgroundColor: 'rgb(255, 246, 0)',
            },
            {
                label: 'IT',
                data: ihdCurrents.map(current => current.current_t),
                backgroundColor: 'rgb(38, 0, 27)',
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
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>IHD</Typography>
                            <Bar data={metricAvgVoltage}/>
                            <Paper sx={{ p: 2 }}>
                                <Typography>VR : {Math.round((avgVoltageR + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>VS : {Math.round((avgVoltageS + Number.EPSILON) * 100) / 100}</Typography>
                                <Typography>VT : {Math.round((avgVoltageT + Number.EPSILON) * 100) / 100}</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
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
