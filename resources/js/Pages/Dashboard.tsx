import {DashboardPropsV1} from '@/types';
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import TrafoCard from "@/Components/Trafo/TrafoCard";
import GoogleMapReact from "google-map-react";

export default function Dashboard({ trafos }: DashboardPropsV1) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const renderMarker = (map: any, maps: any) => {
        const markers = trafos.map((trafo) => {
            const marker = new maps.Marker({
                position: {
                    lat: Number(trafo.latitude),
                    lng: Number(trafo.longitude),
                },
                map,
                title: trafo.id,
            });

            marker.addListener('click', () => {
                window.location.href = route('trafo.show', trafo.id)
            })
        });
    }

    const defaultProps = {
        center: {
            lat: Number(trafos[0].latitude),
            lng: Number(trafos[0].longitude),
        },
        zoom: 9,
    }

    return (
        <Container maxWidth={"md"}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Daftar Trafo V1
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 2,
                    }}
                >
                    <Button sx={{ mx: 2 }} href={route('trafo.create')} variant="contained">Add Trafo</Button>
                    <Button href={route('v2.dashboard')} variant="contained">Go to Version 2</Button>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '400px',
                        display: 'flex',
                    }}
                    component="map"
                >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: mapApiKey }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                    >

                    </GoogleMapReact>
                </Box>
                <Grid container spacing={2} mt={1.5}>
                    {trafos.map((trafo) => (
                        <Grid item key={trafo.id} xs={12} sm={6} md={4}>
                            <TrafoCard
                                trafo={trafo}
                                version={1}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
