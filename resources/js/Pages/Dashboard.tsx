import {DashboardPropsV1} from '@/types';
import {AppBar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import TrafoCard from "@/Components/Trafo/TrafoCard";
import GoogleMapReact from "google-map-react";
import {router} from "@inertiajs/react";
import CustomMarker from "@/Components/Map/CustomMarker";
import defaultCenter from "@/helpers/map/default-center";

export default function Dashboard({ trafos }: DashboardPropsV1) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const defaultProps = defaultCenter({
        lat: Number(trafos[0].latitude) ?? -7.973640723121185,
        lng: Number(trafos[0].longitude) ?? 112.63782050691506,
        zoom: 9,
        isTrafoEmpty: trafos.length === 0,
    })

    const logout = () => {
        router.post('logout');
    }

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Trafo Monitoring
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={"xl"} sx={{ pt: 6 }}>
                <Box sx={{ my: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: 2,
                        }}
                    >
                        <Button href={route('trafo.create')} variant="contained">Add Trafo</Button>
                        <Button sx={{ mx: 2 }} href={route('v2.dashboard')} variant="contained">Go to Version 2</Button>
                        <Button onClick={() => logout()} variant="contained">Logout</Button>
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
                            // onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                        >
                            {trafos.map((trafo) => (
                                <CustomMarker
                                    text={trafo.name}
                                    lat={Number(trafo.latitude)}
                                    lng={Number(trafo.longitude)}
                                />
                            ))}
                        </GoogleMapReact>
                    </Box>
                    <Grid container spacing={2} mt={1.5}>
                        {trafos.map((trafo) => (
                            <Grid item key={trafo.id} xs={12} sm={6} md={4} xl={3}>
                                <TrafoCard
                                    trafo={trafo}
                                    version={1}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
