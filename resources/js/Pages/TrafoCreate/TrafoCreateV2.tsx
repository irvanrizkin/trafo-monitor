import {Box, Button, Container, FormControl, TextField, Typography} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function TrafoCreateV2 () {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showMap, setShowMap] = useState(false);

    const changeMarker = (lat: number, lng: number) => {
        setLatitude(lat.toString());
        setLongitude(lng.toString());
    }

    const handleSubmit = () => {
        if (name === '' || latitude === '' || longitude === '') return;
        router.post(route('v2.trafo.store'), {
            name: name,
            latitude: latitude,
            longitude: longitude,
        });
    }

    return (
        <Container maxWidth={"md"}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Tambah Trafo
                </Typography>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        label="Name"
                        id="nameText"
                        sx={{ mb: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Latitude"
                        id="latitudeText"
                        sx={{ mb: 2 }}
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Longitude"
                        id="longitudeText"
                        sx={{ mb: 2 }}
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: 2,
                    }}
                >
                    <Button sx={{ mx: 2 }} onClick={() => setShowMap(true)} variant="contained">Show Map</Button>
                    <Button onClick={() => handleSubmit()} variant="contained">Add</Button>
                </Box>
                {showMap && <Box
                    sx={{
                        width: '100%',
                        height: '400px',
                        display: 'flex',
                    }}
                    component="map"
                >
                    <GoogleMapReact
                        bootstrapURLKeys={{key: mapApiKey}}
                        yesIWantToUseGoogleMapApiInternals
                        onClick={(e) => {
                            changeMarker(e.lat, e.lng);
                        }}
                        defaultCenter={
                            {
                                lat: -7.983670703541934,
                                lng: 112.65018012605573,
                            }
                        }
                        defaultZoom={10}
                    >
                    </GoogleMapReact>
                </Box>}
            </Box>
        </Container>
    )
}
