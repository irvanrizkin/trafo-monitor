import {ChartProps} from "@/types";
import {Box, Container, Grid, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';

export default function Chart({ metrics, trafo, date }: ChartProps) {
    const dataTemperature = {
        labels: metrics.map((metric) => metric.hour),
        datasets: [
            {
                label: 'Temperature',
                data: metrics.map((metric) => metric.temperature),
                fill: false,
                backgroundColor: 'rgb(94, 22, 117)',
                borderColor: 'rgba(94, 22, 117, 0.2)',
            }
        ]
    }

    const dataPressure = {
        labels: metrics.map((metric) => metric.hour),
        datasets: [
            {
                label: 'Pressure',
                data: metrics.map((metric) => metric.pressure),
                fill: false,
                backgroundColor: 'rgb(51, 115, 87)',
                borderColor: 'rgba(51, 115, 87, 0.2)',
            }
        ]
    }

    const dataVoltage = {
        labels: metrics.map((metric) => metric.hour),
        datasets: [
            {
                label: 'Voltage',
                data: metrics.map((metric) => metric.voltage),
                fill: false,
                backgroundColor: 'rgb(238, 66, 102)',
                borderColor: 'rgba(238, 66, 102, 0.2)',
            }
        ]
    }

    const dataCurrent = {
        labels: metrics.map((metric) => metric.hour),
        datasets: [
            {
                label: 'Current',
                data: metrics.map((metric) => metric.current),
                fill: false,
                backgroundColor: 'rgb(53, 114, 239)',
                borderColor: 'rgba(53, 114, 239, 0.2)',
            }
        ]
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" textAlign="center" sx={{ mb: 0.5 }}>
                    <b>{trafo.name}</b>
                </Typography>
                <Typography variant="h5" textAlign="center" sx={{ mb: 0.5 }}>
                    <b>{trafo.address}</b>
                </Typography>
                <Typography variant="h5" textAlign="center" sx={{ mb: 0.5 }}>
                    <b>{date}</b>
                </Typography>
            </Box>
            <Box
                sx={{ my: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h6" textAlign="center" sx={{ mb: 0.5 }}>
                            <b>Temperature</b>
                        </Typography>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Line data={dataTemperature} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h6" textAlign="center" sx={{ mb: 0.5 }}>
                            <b>Pressure</b>
                        </Typography>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Line data={dataPressure} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h6" textAlign="center" sx={{ mb: 0.5 }}>
                            <b>Voltage</b>
                        </Typography>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Line data={dataVoltage} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h6" textAlign="center" sx={{ mb: 0.5 }}>
                            <b>Current</b>
                        </Typography>
                        <Box
                            sx={{ px: 2 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Line data={dataCurrent} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
