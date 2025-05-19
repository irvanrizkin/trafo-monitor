import { MetricTHDIHDProps } from "@/types/metric";
import {
    DataGrid,
    GridColDef,
    GridColumnGroupingModel,
} from "@mui/x-data-grid";
import { Container, Grid } from "@mui/material";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import { Head } from "@inertiajs/react";

export default function MetricTHDIHD({
    trafo,
    date,
    thdCurrents,
    thdVoltages,
}: MetricTHDIHDProps) {
    const columnsCurrent: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "current_r", headerName: "IR" },
        { field: "current_s", headerName: "IS" },
        { field: "current_t", headerName: "IT" },
    ];

    const columnsVoltage: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "voltage_r", headerName: "VR" },
        { field: "voltage_s", headerName: "VS" },
        { field: "voltage_t", headerName: "VT" },
    ];

    const columnGroupCurrent: GridColumnGroupingModel = [
        {
            groupId: "Total Harmonic Distortion Current (THDi)",
            children: [
                { field: "current_r" },
                { field: "current_s" },
                { field: "current_t" },
            ],
        },
    ];

    const columnGroupVoltage: GridColumnGroupingModel = [
        {
            groupId: "Total Harmonic Distortion Voltage (THDv)",
            children: [
                { field: "voltage_r" },
                { field: "voltage_s" },
                { field: "voltage_t" },
            ],
        },
    ];

    const rowsCurrent = thdCurrents.map((current) => {
        return {
            id: current.id,
            createdAt: new Date(current.created_at).toLocaleString(),
            current_r: current.current_r,
            current_s: current.current_s,
            current_t: current.current_t,
        };
    });

    const rowsVoltage = thdVoltages.map((voltage) => {
        return {
            id: voltage.id,
            createdAt: new Date(voltage.created_at).toLocaleString(),
            voltage_r: voltage.voltage_r,
            voltage_s: voltage.voltage_s,
            voltage_t: voltage.voltage_t,
        };
    });

    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Metric THD IHD"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.thd-ihd", [trafo.id])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupCurrent}
                            rows={rowsCurrent}
                            columns={columnsCurrent}
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
                            columnGroupingModel={columnGroupVoltage}
                            rows={rowsVoltage}
                            columns={columnsVoltage}
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
