import {ChartProps} from "@/types";
import {
    Box,
    Card,
    CardContent,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import {Bar, Line} from "react-chartjs-2";
import 'chart.js/auto';
import GoogleMapReact from "google-map-react";
import {useState} from "react";

export default function Chart({metrics, trafo, date, metricsAvg, temperature, pressure, voltage, current}: ChartProps) {
    const [property, setProperty] = useState('pressure');
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const metricChart = {
        labels: metrics.reverse().map((metric) => new Date(metric.created_at).toLocaleTimeString()),
        datasets: [
            {
                label: "Metric",
                data: metrics.map((metric) => {
                    if (property === 'temperature') return metric.temperature;
                    if (property === 'pressure') return metric.pressure;
                    if (property === 'voltage') return metric.voltage;
                    if (property === 'current') return metric.current;
                    return metric.pressure;
                }),
                fill: false,
                backgroundColor: 'rgb(94, 22, 117)',
                borderColor: 'rgba(94, 22, 117, 0.2)',
            }
        ]
    }

    const metricAvgChart = {
        labels: metricsAvg.map((metric) => metric.hour),
        datasets: [
            {
                label: "Metric",
                data: metricsAvg.map((metric) => {
                    if (property === 'temperature') return metric.temperature;
                    if (property === 'pressure') return metric.pressure;
                    if (property === 'voltage') return metric.voltage;
                    if (property === 'current') return metric.current;
                    return metric.pressure;
                }),
                fill: false,
                backgroundColor: 'rgb(94, 22, 117)',
                borderColor: 'rgba(94, 22, 117, 0.2)',
            }
        ]
    }

    const aggregateResult = (property: string) => {
        if (property === 'temperature') return temperature;
        if (property === 'pressure') return pressure;
        if (property === 'voltage') return voltage;
        if (property === 'current') return current;
        return pressure;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProperty(event.target.value);
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
        <Container maxWidth="xl">
            <Grid container spacing={2} sx={{py: 2}}>
                <Grid item xs={12} md={2}>
                    <Card>
                        <CardContent>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Parameter</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="pressure"
                                    name="radio-buttons-group"
                                    value={property}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="pressure" control={<Radio/>} label="Pressure"/>
                                    <FormControlLabel value="temperature" control={<Radio/>} label="Temperature"/>
                                    <FormControlLabel value="voltage" control={<Radio/>} label="Voltage"/>
                                    <FormControlLabel value="current" control={<Radio/>} label="Current"/>
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '500px',
                            display: 'flex'
                        }}
                        component="map"
                    >
                        <GoogleMapReact
                            bootstrapURLKeys={{key: mapApiKey}}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({map, maps}) => renderMarker(map, maps)}
                        >

                        </GoogleMapReact>
                    </Box>
                    <Grid container spacing={2} sx={{py: 2}}>
                        <Grid item md={6}>
                            <Card sx={{mb: 2}}>
                                <CardContent sx={{textAlign: 'center'}}>
                                    <Typography variant={"h5"}>Average</Typography>
                                    <Typography
                                        variant={"h3"}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >{Math.round(aggregateResult(property).avg * 100) / 100}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{textAlign: 'center'}}>
                                    <Typography variant={"h5"}>Count</Typography>
                                    <Typography
                                        variant={"h3"}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >{aggregateResult(property).count}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6}>
                            <Card sx={{mb: 2}}>
                                <CardContent sx={{textAlign: 'center'}}>
                                    <Typography variant={"h5"}>Min</Typography>
                                    <Typography
                                        variant={"h3"}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >{aggregateResult(property).min}</Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{textAlign: 'center'}}>
                                    <Typography variant={"h5"}>Max</Typography>
                                    <Typography
                                        variant={"h3"}
                                        sx={{
                                            fontWeight: 'bold'
                                        }}
                                    >{aggregateResult(property).max}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card sx={{mb: 2}}>
                        <CardContent>
                            <Box
                                sx={{px: 2}}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Bar data={metricChart}/>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{px: 2}}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Line data={metricAvgChart}/>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
