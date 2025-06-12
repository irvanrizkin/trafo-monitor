import { ChartTPOProps } from "@/types/chart";
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import GoogleMapReact from "google-map-react";
import "chart.js/auto";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    singleLineChart,
    singleLineChartString,
} from "@/helpers/generator/chart-generator";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import GoogleMap from "@/Components/Map/GoogleMap";
import timeMinuteString from "@/helpers/converter/date-time";
import calculateMetrics from "@/helpers/analysis/calculate-metric";
import getCreatedAt from "@/helpers/analysis/get-createdat";
import {
    AmbientTemperature,
    OilLevel,
    Pressure,
    Temperature,
} from "@/types/metric";

export default function ChartTPO({
    trafo,
    date,
    temperatures,
    pressures,
    oilLevels,
    ambientTemperatures,
    temperatureMetrics,
    pressureMetrics,
    oilLevelMetrics,
    ambientTemperatureMetrics,
}: ChartTPOProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    const metricTemperature = singleLineChartString({
        labels: temperatures.map((temperature) =>
            timeMinuteString(new Date(temperature.created_at)),
        ),
        data: temperatures.map((temperature) => temperature.temperature),
        label: "Temperature",
    });
    const { temperature = 0 } = temperatures[temperatures.length - 1] || {};

    const metricPressure = singleLineChartString({
        labels: pressures.map((pressure) =>
            timeMinuteString(new Date(pressure.created_at)),
        ),
        data: pressures.map((pressure) => pressure.pressure),
        label: "Pressure",
    });
    const { pressure = 0 } = pressures[pressures.length - 1] || {};

    const metricOilLevel = singleLineChartString({
        labels: oilLevels.map((oilLevel) =>
            timeMinuteString(new Date(oilLevel.created_at)),
        ),
        data: oilLevels.map((oilLevel) => oilLevel.oil_level),
        label: "Oil Level",
    });
    const { oil_level = 0 } = oilLevels[oilLevels.length - 1] || {};

    const metricAmbientTemperature = singleLineChartString({
        labels: ambientTemperatures.map((ambientTemperature) =>
            timeMinuteString(new Date(ambientTemperature.created_at)),
        ),
        data: ambientTemperatures.map(
            (ambientTemperature) => ambientTemperature.ambient_temperature,
        ),
        label: "Ambient Temperature",
    });
    const { ambient_temperature = 0 } =
        ambientTemperatures[ambientTemperatures.length - 1] || {};

    return (
        <>
            <AppBarTriple
                startText={"Chart TPO"}
                middleText={trafo ? trafo.name + " - " + trafo.address : ""}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route("trafo.show", [trafo?.id ?? 0])}
                    text={"Back to Detail"}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{ pb: 2 }}>
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
                            <Typography variant={"h6"}>
                                Oil Temperature (°C)
                            </Typography>
                            <Line data={metricTemperature} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Temperature"}
                                    max={temperatureMetrics.max}
                                    avg={temperatureMetrics.avg}
                                    min={temperatureMetrics.min}
                                    latest={temperature}
                                    maxTime={timeMinuteString(
                                        new Date(temperatureMetrics.timeOfMax),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(temperatureMetrics.timeOfMin),
                                    )}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{ px: 2, mt: 3 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>
                                Pressure (BAR)
                            </Typography>
                            <Line data={metricPressure} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Pressure"}
                                    max={pressureMetrics.max}
                                    avg={pressureMetrics.avg}
                                    min={pressureMetrics.min}
                                    latest={pressure}
                                    maxTime={timeMinuteString(
                                        new Date(pressureMetrics.timeOfMax),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(pressureMetrics.timeOfMin),
                                    )}
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
                            <Line data={metricOilLevel} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Oil Level"}
                                    max={oilLevelMetrics.max}
                                    avg={oilLevelMetrics.avg}
                                    min={oilLevelMetrics.min}
                                    latest={oil_level}
                                    maxTime={timeMinuteString(
                                        new Date(oilLevelMetrics.timeOfMax),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(oilLevelMetrics.timeOfMin),
                                    )}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{ px: 2, mt: 3 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>
                                Ambient Temperature (°C)
                            </Typography>
                            <Line data={metricAmbientTemperature} />
                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Ambient Temp"}
                                    max={ambientTemperatureMetrics.max}
                                    avg={ambientTemperatureMetrics.avg}
                                    min={ambientTemperatureMetrics.min}
                                    latest={ambient_temperature}
                                    maxTime={timeMinuteString(
                                        new Date(
                                            ambientTemperatureMetrics.timeOfMax,
                                        ),
                                    )}
                                    minTime={timeMinuteString(
                                        new Date(
                                            ambientTemperatureMetrics.timeOfMin,
                                        ),
                                    )}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <GoogleMap
                            lat={Number(trafo?.latitude ?? 0)}
                            lng={Number(trafo?.longitude ?? 0)}
                            title={trafo?.name ?? ""}
                            height={"700px"}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
