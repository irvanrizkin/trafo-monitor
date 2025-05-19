import GaugeGroup from "@/Components/Metric/GaugeGroup";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { MetricTPOProps } from "@/types/metric";
import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { amber, green, red } from "@mui/material/colors";
import StaticGaugeGroup from "@/Components/Metric/StaticGaugeGroup";
import { Head } from "@inertiajs/react";

export default function MetricTPO({
    trafo,
    date,
    temperatures,
    pressures,
    oilLevels,
    ambientTemperatures,
    classifiedData,
    maxValue,
}: MetricTPOProps) {
    const columnsTemperature: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        {
            field: "temperature",
            headerName: "Oil Temperature (°C)",
            width: 200,
        },
    ];

    const columnsPressure: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "pressure", headerName: "Pressure (BAR)", width: 120 },
    ];

    const columnsOilLevel: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "oil_level", headerName: "Oil Level" },
    ];

    const columnsAmbientTemperature: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        {
            field: "ambient_temperature",
            headerName: "Ambient Temperature (°C)",
            width: 200,
        },
    ];

    const rowsTemperature = temperatures.map((temperature) => {
        return {
            id: temperature.id,
            createdAt: new Date(temperature.created_at).toLocaleString(),
            temperature: temperature.temperature,
        };
    });

    const rowsPressure = pressures.map((pressure) => {
        return {
            id: pressure.id,
            createdAt: new Date(pressure.created_at).toLocaleString(),
            pressure: pressure.pressure,
        };
    });

    const rowsOilLevel = oilLevels.map((oilLevel) => {
        return {
            id: oilLevel.id,
            createdAt: new Date(oilLevel.created_at).toLocaleString(),
            oil_level: oilLevel.oil_level,
        };
    });

    const rowsAmbientTemperature = ambientTemperatures.map(
        (ambientTemperature) => {
            return {
                id: ambientTemperature.id,
                createdAt: new Date(
                    ambientTemperature.created_at,
                ).toLocaleString(),
                ambient_temperature: ambientTemperature.ambient_temperature,
            };
        },
    );

    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Metric TPO"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.tpo", [trafo.id])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        {/* <GaugeGroup
                            gauges={[temperature]}
                            labels={['Oil Temp']}
                        /> */}
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData.temperature?.value ?? 0,
                                    label: "Oil Temp",
                                    status:
                                        classifiedData.temperature?.status ?? 0,
                                    maxValue:
                                        maxValue.find(
                                            (v) =>
                                                v.rule_name === "temperature",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value: classifiedData.pressure?.value ?? 0,
                                    label: "Pressure",
                                    status:
                                        classifiedData.pressure?.status ?? 0,
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "pressure",
                                        )?.max_value || 0,
                                },
                            ]}
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
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value: classifiedData.oil_level?.value ?? 0,
                                    label: "Oil Level",
                                    status:
                                        classifiedData.oil_level?.status ?? 0,
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "oil_level",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData.ambient_temperature
                                            ?.value ?? 0,
                                    label: "Ambient Temp",
                                    status:
                                        classifiedData.ambient_temperature
                                            ?.status ?? 0,
                                    maxValue:
                                        maxValue.find(
                                            (v) =>
                                                v.rule_name ===
                                                "ambient_temperature",
                                        )?.max_value || 0,
                                },
                            ]}
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
