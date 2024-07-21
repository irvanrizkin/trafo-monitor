import {Box, Container, Typography} from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";
import {MetricProps} from "@/types";
import ParameterCardGroup from "@/Components/Parameter/ParameterCardGroup";

export default function Metric(props: MetricProps) {
    const data = {
        labels: props.metrics.map((metric) => new Date(metric.created_at).toLocaleDateString()),
        datasets: [
            {
                label: props.property,
                data: props.metrics.map((metric) => metric.value),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
    );

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" textAlign="center" sx={{ mb: 0.5 }}>
                    <b>{props.trafo.name}</b>
                </Typography>
                <Typography variant="h5" textAlign="center" color="text.secondary" sx={{ mb: 2 }}>
                    <b>{props.property}</b>
                </Typography>
                <ParameterCardGroup
                    min={props.min}
                    count={props.count}
                    max={props.max}
                />
                <Box
                    sx={{ my: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Bar data={data} />
                </Box>
            </Box>
        </Container>
    )
}
