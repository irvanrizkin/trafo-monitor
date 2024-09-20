import {ChartTPOProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Line} from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {singleLineChart} from "@/helpers/generator/chart-generator";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import GoogleMap from "@/Components/Map/GoogleMap";

export default function ChartTPO({
                                       trafo,
                                       date,
                                   }: ChartTPOProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    const metricTemperature = singleLineChart({
        labels: [],
        data: [],
        label: 'Temperature',
    });

    const metricPressure = singleLineChart({
        labels: [],
        data: [],
        label: 'Pressure',
    });

    const metricOilLevel = singleLineChart({
        labels: [],
        data: [],
        label: 'Oil Level',
    });

    const metricAmbientTemperature = singleLineChart({
        labels: [],
        data: [],
        label: 'Ambient Temperature',
    });

    return (
        <>
            <AppBarTriple
                startText={'Chart TPO'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route('trafo.show', [trafo.id])}
                    text={'Back to Detail'}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{pb: 2}}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                px: 2,
                                mt: onlyMediumScreen ? 3 : 0,
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Temperature (°C)</Typography>
                            <Line data={metricTemperature}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Temperature"}
                                    max={0}
                                    avg={0}
                                    min={0}
                                    latest={0}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Pressure (BAR)</Typography>
                            <Line data={metricPressure}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Pressure"}
                                    max={0}
                                    avg={0}
                                    min={0}
                                    latest={0}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                px: 2,
                                mt: onlyMediumScreen ? 3 : 0,
                            }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Oil Level</Typography>
                            <Line data={metricOilLevel}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Oil Level"}
                                    max={0}
                                    avg={0}
                                    min={0}
                                    latest={0}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2, mt: 3}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Ambient Temperature (°C)</Typography>
                            <Line data={metricAmbientTemperature}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Ambient Temp"}
                                    max={0}
                                    avg={0}
                                    min={0}
                                    latest={0}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo.latitude)}
                            lng={Number(trafo.longitude)}
                            title={trafo.name}
                            height={'700px'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
