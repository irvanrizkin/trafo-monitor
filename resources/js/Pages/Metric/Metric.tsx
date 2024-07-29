import {MetricV1Props} from "@/types";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function Metric({ date, trafo, metrics }: MetricV1Props) {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'current', headerName: 'Current'},
        { field: 'temperature', headerName: 'Temperature'},
        { field: 'voltage', headerName: 'Voltage'},
        { field: 'pressure', headerName: 'Pressure'},
        { field: 'createdAt', headerName: 'Created At', width: 200},
    ]

    const rows = metrics.map((metric) => {
        return {
            id: metric.id,
            current: metric.current,
            temperature: metric.temperature,
            voltage: metric.voltage,
            pressure: metric.pressure,
            createdAt: new Date(metric.created_at).toLocaleString(),
        }
    });

    return (
        <Container maxWidth="lg">
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
            <Stack direction="row" justifyContent="end">
                <Button href={route('chart.data', [trafo.id, date])} variant="contained" endIcon={<ShowChartIcon />} sx={{ mb: 2 }}>
                    Open Chart
                </Button>
            </Stack>
            <DataGrid
                autosizeOptions={{
                    columns: ['current', 'temperature', 'voltage', 'pressure', 'createdAt'],
                    includeOutliers: true,
                    includeHeaders: false,
                }}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </Container>
    )
}
