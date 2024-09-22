import GaugeGroup from "@/Components/Metric/GaugeGroup";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { MetricTPOProps } from "@/types/metric";
import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {amber, green, red} from "@mui/material/colors";

export default function MetricTPO({
    trafo,
    date,
    temperatures,
    pressures,
    oilLevels,
    ambientTemperatures,
                                  }: MetricTPOProps) {
    const columnsTemperature: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'temperature', headerName: 'Oil Temperature (°C)', width: 200},
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

    const rowsTemperature = temperatures.map((temperature) => {
        return {
            id: temperature.id,
            createdAt: new Date(temperature.created_at).toLocaleString(),
            temperature: temperature.temperature,
        }
    });

    const rowsPressure = pressures.map((pressure) => {
        return {
            id: pressure.id,
            createdAt: new Date(pressure.created_at).toLocaleString(),
            pressure: pressure.pressure,
        }
    });

    const rowsOilLevel = oilLevels.map((oilLevel) => {
        return {
            id: oilLevel.id,
            createdAt: new Date(oilLevel.created_at).toLocaleString(),
            oil_level: oilLevel.oil_level,
        }
    });

    const rowsAmbientTemperature = ambientTemperatures.map((ambientTemperature) => {
        return {
            id: ambientTemperature.id,
            createdAt: new Date(ambientTemperature.created_at).toLocaleString(),
            ambient_temperature: ambientTemperature.ambient_temperature,
        }
    });

    const temperature = [...temperatures.map((temperature) => temperature.temperature)];
    const pressure = [...pressures.map((pressure) => pressure.pressure)];
    const oilLevel = [...oilLevels.map((oilLevel) => oilLevel.oil_level)];
    const ambientTemperature = [...ambientTemperatures.map((ambientTemperature) => ambientTemperature.ambient_temperature)];

    const overrideOilLevel = (value: number) => {
        if (value === 9) {
            return green[300];
        }
        if (value >= 6 && value <= 8) {
            return amber[300];
        }
        if (value >= 1 && value <= 5) {
            return red[300];
        }
        return red[300];
    }

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
                            gauges={[temperature]}
                            labels={['Oil Temp']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[pressure]}
                            labels={['Pressure']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={rowsTemperature}
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
                            rows={rowsPressure}
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
                            gauges={[oilLevel]}
                            isOverride={true}
                            overrideColor={overrideOilLevel}
                            labels={['Oil Level']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[ambientTemperature]}
                            labels={['Ambient Temp']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            rows={rowsOilLevel}
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
                            rows={rowsAmbientTemperature}
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
