import {Box, Button, Container, Grid, Typography} from "@mui/material";
import { TrafoDetailProps } from "@/types";
import ParameterInfoCard from "@/Components/Detail/ParameterInfoCard";
import GoogleMapReact from "google-map-react";

export default function Detail({ trafo, gps }: TrafoDetailProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    console.log(gps);

    const renderMarker = (map: any, maps: any) => {
        return new maps.Marker({
            position: {
                lat: Number(gps.latitude),
                lng: Number(gps.longtitude),
            },
            map,
            title: 'test marker'
        });
    }

    const defaultProps = {
        center: {
            lat: Number(gps.latitude),
            lng: Number(gps.longtitude),
        },
        zoom: 15,
    }

    const handleClick = () => {
        window.location.href = route('v2.chart.data', [trafo.id]);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Box sx={{
                    mb: 2,
                    px: 2,
                }}>
                    <Typography variant="h4" sx={{ my: 2 }}>
                        <b>{trafo.name}</b>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Trafo ID</b>
                    </Typography>
                    <Typography variant="h6">
                        {trafo.id}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Created Date</b>
                    </Typography>
                    <Typography variant="h6">
                        {new Date(trafo.created_at).toLocaleString()}
                    </Typography>
                </Box>
                <Grid container spacing={2} px={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '650px',
                                display: 'flex'
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
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleClick}
                        >Show Chart</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
