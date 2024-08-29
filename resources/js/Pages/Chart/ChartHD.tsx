import {ChartHDProps} from "@/types/chart";
import {ChartData} from "chart.js";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import {Bar} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import 'chart.js/auto';

export default function MetricHD({
                                     trafo,
                                     date,
                                     title,
                                     harmonicDistortions
                                 }: ChartHDProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const {
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        h7,
        h8,
        h9,
        h10,
        h11,
        h12,
        h13,
        h14,
        h15,
    } = harmonicDistortions

    const metricHD: ChartData<"bar", number[], string> = {
        labels: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15'],
        datasets: [
            {
                label: 'R',
                data: [
                    h1.r,
                    h2.r,
                    h3.r,
                    h4.r,
                    h5.r,
                    h6.r,
                    h7.r,
                    h8.r,
                    h9.r,
                    h10.r,
                    h11.r,
                    h12.r,
                    h13.r,
                    h14.r,
                    h15.r,
                ],
                backgroundColor: 'rgb(255, 0, 92)'
            },
            {
                label: 'S',
                data: [
                    h1.s,
                    h2.s,
                    h3.s,
                    h4.s,
                    h5.s,
                    h6.s,
                    h7.s,
                    h8.s,
                    h9.s,
                    h10.s,
                    h11.s,
                    h12.s,
                    h13.s,
                    h14.s,
                    h15.s,
                ],
                backgroundColor: 'rgb(255, 246, 0)'
            },
            {
                label: 'T',
                data: [
                    h1.t,
                    h2.t,
                    h3.t,
                    h4.t,
                    h5.t,
                    h6.t,
                    h7.t,
                    h8.t,
                    h9.t,
                    h10.t,
                    h11.t,
                    h12.t,
                    h13.t,
                    h14.t,
                    h15.t,
                ],
                backgroundColor: 'rgb(38, 0, 27)'
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
                startText={title}
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
                <Grid container spacing={2} sx={{mt: isMobile ? 2 : 15}}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>{title}</Typography>
                            <Bar data={metricHD}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: '370px', width: '100%' }}>
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
