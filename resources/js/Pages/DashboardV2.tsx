import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {DashboardProps} from "@/types";
import TrafoCard from "@/Components/Trafo/TrafoCard";
import GoogleMapReact from "google-map-react";

export default function DashboardV2({ trafos, gpsArray } : DashboardProps ) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const renderMarker = (map: any, maps: any) => {
        const markers = gpsArray.map((gps) => {
            const marker = new maps.Marker({
                position: {
                    lat: Number(gps.latitude),
                    lng: Number(gps.longtitude),
                },
                map,
                title: gps.trafo
            });

            marker.addListener('click', () => {
                window.location.href = route('v2.trafo.show', gps.trafo)
            })
        });
    }

    const defaultProps = {
        center: {
            lat: Number(gpsArray[0].latitude),
            lng: Number(gpsArray[0].longtitude),
        },
        zoom: 9,
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Daftar Trafo V2
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 2,
                    }}
                >
                    <Button sx={{ mx: 2 }} href={route('v2.trafo.create')} variant="contained">Add Trafo</Button>
                    <Button href={route('dashboard')} variant="contained">Go to Version 1</Button>
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
                                version={2}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
