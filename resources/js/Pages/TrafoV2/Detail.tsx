import { Box, Container, Grid, Typography } from "@mui/material";
import { GpsDetailProps, TrafoDetailProps } from "@/types";
import ParameterInfoCard from "@/Components/Detail/ParameterInfoCard";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import GoogleMapReact from "google-map-react";
// import GoogleMap from "google-maps-react-markers";
// const AnyReactComponent = ({text}: {text:string}) => <div>{text}</div>

export default function Detail({ trafo }: TrafoDetailProps, { gps }: GpsDetailProps) {


    console.log(trafo.id);

    const renderMarker = (map: any, maps: any) => {
        const marker = new maps.Marker({
            position: {
                lat: 10.99835602,
                lng: 77.01502627,
            },
            map,
            title: 'test marker'
        });
        return marker;
    }

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Grid container spacing={2} px={2}>
                    <Grid item xs={12} md={6}>
                        {/* <Box
                            sx={{
                                width: '100%',
                            }}
                            component="img"
                            src="https://placehold.co/600x400/png"
                        /> */}
                        <Box
                            sx={{
                                width: '600px',
                                height: '400px',
                            }}
                            component="map"
                        >
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: import.meta.env.MAP_API_KEY }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                            >

                            </GoogleMapReact>
                        </Box>
                        <Typography variant="h4" sx={{ my: 2 }}>
                            <b>{trafo.name}</b>
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" color="text.secondary">
                                    <b>Trafo ID</b>
                                </Typography>
                                <Typography variant="h6">
                                    {trafo.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1" color="text.secondary">
                                    <b>Created Date</b>
                                </Typography>
                                <Typography variant="h6">
                                    {new Date(trafo.created_at).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ParameterInfoCard
                            title="Temperature"
                            description="Tampilkan grafik tren temperatur untuk trafo ini"
                            trafoId={trafo.id}
                        />
                        <ParameterInfoCard
                            title="Voltage"
                            description="Tampilkan grafik tren tegangan untuk trafo ini"
                            trafoId={trafo.id}
                        />
                        <ParameterInfoCard
                            title="Pressure"
                            description="Tampilkan grafik tren tekanan untuk trafo ini"
                            trafoId={trafo.id}
                        />
                        <ParameterInfoCard
                            title="Current"
                            description="Tampilkan grafik tren arus untuk trafo ini"
                            trafoId={trafo.id}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
