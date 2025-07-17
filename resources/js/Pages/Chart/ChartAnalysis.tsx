import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    Container,
    Grid,
    Box,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import GoogleMap from "@/Components/Map/GoogleMap";
import { ChartAnalyticsProps } from "@/types/chart";
import { singleLineChartString } from "@/helpers/generator/chart-generator";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function ChartAnalysis({
    trafo,
    gisValues,
    latestGis,
    maxGis,
    maxGisTime,
    minGis,
    minGisTime,
    resistiveVoltageDropsR,
    resistiveVoltageDropsS,
    resistiveVoltageDropsT,
    reactiveVoltageDropsR,
    reactiveVoltageDropsS,
    reactiveVoltageDropsT,
}: ChartAnalyticsProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

    const gisChart = singleLineChartString({
        labels: gisValues.map((gis) =>
            new Date(gis.created_at).toLocaleString(),
        ),
        data: gisValues.map((gis) => gis.gis),
        label: "GIS",
    });

    const resistiveVoltageDropRChart = singleLineChartString({
        labels: resistiveVoltageDropsR.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: resistiveVoltageDropsR.map(
            (drop) => drop.resistive_voltage_drop_r,
        ),
        label: "Resistive Voltage Drop R",
    });

    const resistiveVoltageDropSChart = singleLineChartString({
        labels: resistiveVoltageDropsS.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: resistiveVoltageDropsS.map(
            (drop) => drop.resistive_voltage_drop_s,
        ),
        label: "Resistive Voltage Drop S",
    });

    const resistiveVoltageDropTChart = singleLineChartString({
        labels: resistiveVoltageDropsT.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: resistiveVoltageDropsT.map(
            (drop) => drop.resistive_voltage_drop_t,
        ),
        label: "Resistive Voltage Drop T",
    });

    const reactiveVoltageDropRChart = singleLineChartString({
        labels: reactiveVoltageDropsR.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: reactiveVoltageDropsR.map((drop) => drop.reactive_voltage_drop_r),
        label: "Reactive Voltage Drop R",
    });

    const reactiveVoltageDropSChart = singleLineChartString({
        labels: reactiveVoltageDropsS.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: reactiveVoltageDropsS.map((drop) => drop.reactive_voltage_drop_s),
        label: "Reactive Voltage Drop S",
    });

    const reactiveVoltageDropTChart = singleLineChartString({
        labels: reactiveVoltageDropsT.map((drop) =>
            new Date(drop.created_at).toLocaleString(),
        ),
        data: reactiveVoltageDropsT.map((drop) => drop.reactive_voltage_drop_t),
        label: "Reactive Voltage Drop T",
    });

    const theme = useTheme();
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <AppBarTriple
                startText={"Chart Analysis"}
                middleText={trafo ? trafo.name + " - " + trafo.address : ""}
                endText={"Analysis"}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route("trafo.show", [trafo?.id ?? 0])}
                    text={"Back to Detail"}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{ pb: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
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
                            <Typography variant={"h6"}>GIS</Typography>
                            <Line
                                data={gisChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "GIS",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
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
                                Resistive Voltage Drop S
                            </Typography>
                            <Line
                                data={resistiveVoltageDropSChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Resistive Voltage Drop S",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
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
                                Reactive Voltage Drop R
                            </Typography>
                            <Line
                                data={reactiveVoltageDropRChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Reactive Voltage Drop R",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
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
                                Reactive Voltage Drop T
                            </Typography>
                            <Line
                                data={reactiveVoltageDropTChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Reactive Voltage Drop T",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <GoogleMap
                            lat={Number(trafo?.latitude ?? 0)}
                            lng={Number(trafo?.longitude ?? 0)}
                            title={trafo?.name ?? ""}
                            height={"700px"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
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
                                Resistive Voltage Drop R
                            </Typography>
                            <Line
                                data={resistiveVoltageDropRChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Resistive Voltage Drop R",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
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
                                Resistive Voltage Drop T
                            </Typography>
                            <Line
                                data={resistiveVoltageDropTChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Resistive Voltage Drop T",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
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
                                Reactive Voltage Drop S
                            </Typography>
                            <Line
                                data={reactiveVoltageDropSChart}
                                options={{
                                    scales: {
                                        x: {
                                            title: {
                                                text: "Time",
                                                display: true,
                                            },
                                        },
                                        y: {
                                            title: {
                                                text: "Reactive Voltage Drop S",
                                                display: true,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
