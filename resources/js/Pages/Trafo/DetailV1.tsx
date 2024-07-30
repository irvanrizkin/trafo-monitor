import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {useState} from "react";
import {TrafoDetailPropsV1} from "@/types";
import GoogleMapReact from "google-map-react";

export default function DetailV1({trafo, dates}: TrafoDetailPropsV1) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const [dateState, setDateState] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setDateState(event.target.value);
    };

    const handleClick = () => {
        console.log(dateState);
        if (dateState === '') return;
        window.location.href = route('metric.metrics', [trafo.id, dateState]);
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Date</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dateState}
                                label="Date"
                                onChange={handleChange}
                            >
                                {dates.map((date, index) => (
                                    <MenuItem key={index} value={date.date}>{date.date}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={dateState === ''}
                            onClick={handleClick}
                        >Show Table</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
