import GaugeGroup from "@/Components/Metric/GaugeGroup";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { MetricTPOProps } from "@/types/metric";
import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function MetricTPO({trafo, date}: MetricTPOProps) {
    const columnsTemperature: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'temperature', headerName: 'Temperature (°C)', width: 200},
    ]

    const columnsPressure: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'pressure', headerName: 'Pressure (BAR)', width: 120},
    ]

    const columnsOilLevel: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'oil_level', headerName: 'Oil Level'},
    ]

    const columnsAmbientTemperature: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'ambient_temperature', headerName: 'Ambient Temperature (°C)', width: 200},
    ]

    return (
        <>
            <AppBarTriple
                startText={'Metric TPO'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route('chart.tpo', [trafo.id, date])}
                    text={'Open Chart'}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[[0]]}
                            labels={['Temperature']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[[0]]}
                            labels={['Pressure']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={[]}
                            columns={columnsTemperature}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={[]}
                            columns={columnsPressure}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[[0]]}
                            labels={['Oil Level']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[[0]]}
                            labels={['Ambient Temp']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={[]}
                            columns={columnsOilLevel}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={[]}
                            columns={columnsAmbientTemperature}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
