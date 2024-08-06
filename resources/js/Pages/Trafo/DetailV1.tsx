import {
    AppBar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem, Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
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

    const handleClickTable = () => {
        if (dateState === '') return;
        window.location.href = route('metric.metrics', [trafo.id, dateState]);
    }

    const handleClickChart = () => {
        if (dateState === '') return;
        window.location.href = route('chart.data', [trafo.id, dateState]);
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
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Trafo Monitoring
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Box sx={{ my: 4 }}>
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
                            <Typography variant="h4" gutterBottom fontWeight={"bold"}>
                                {trafo.name}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {trafo.address}
                            </Typography>
                            <TableContainer component={Paper} sx={{ mb: 2 }}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Latitude</TableCell>
                                            <TableCell>{trafo.latitude}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Longitude</TableCell>
                                            <TableCell>{trafo.longitude}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>{new Date(trafo.created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography sx={{ mb: 2 }} variant={"h6"}>Pilih Tanggal</Typography>
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        disabled={dateState === ''}
                                        onClick={handleClickTable}
                                    >Buka Tabel</Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        disabled={dateState === ''}
                                        onClick={handleClickChart}
                                    >Buka Grafik</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
