import {DashboardPropsV1} from '@/types';
import {Box, Container, Grid, Typography} from "@mui/material";
import TrafoCard from "@/Components/Trafo/TrafoCard";
import GoogleMapReact from "google-map-react";

export default function Dashboard({ trafos, mapApiKey }: DashboardPropsV1) {
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
