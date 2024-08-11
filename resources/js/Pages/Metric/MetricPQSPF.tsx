import {MetricPQSPFProps} from "@/types/metric";
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";

export default function ({ trafo, date, powers, reactivePowers, apparentPowers, powerFactors }: MetricPQSPFProps) {
    const columnsPower: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'power_r', headerName: 'R'},
        { field: 'power_s', headerName: 'S'},
        { field: 'power_t', headerName: 'T'},
    ]

    const columnsReactivePower: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'reactive_power_r', headerName: 'R'},
        { field: 'reactive_power_s', headerName: 'S'},
        { field: 'reactive_power_t', headerName: 'T'},
    ]

    const columnsApparentPower: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'apparent_power_r', headerName: 'R'},
        { field: 'apparent_power_s', headerName: 'S'},
        { field: 'apparent_power_t', headerName: 'T'},
    ]

    const columnsPowerFactor: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'power_factor_r', headerName: 'R'},
        { field: 'power_factor_s', headerName: 'S'},
        { field: 'power_factor_t', headerName: 'T'},
    ]

    const columnGroupPower: GridColumnGroupingModel = [
        {
            groupId: 'Power',
            children: [{ field: 'power_r' }, { field: 'power_s' }, { field: 'power_t' }]
        }
    ]

    const columnGroupReactivePower: GridColumnGroupingModel = [
        {
            groupId: 'Reactive Power',
            children: [{ field: 'reactive_power_r' }, { field: 'reactive_power_s' }, { field: 'reactive_power_t' }]
        }
    ]

    const columnGroupApparentPower: GridColumnGroupingModel = [
        {
            groupId: 'Apparent Power',
            children: [{ field: 'apparent_power_r' }, { field: 'apparent_power_s' }, { field: 'apparent_power_t' }]
        }
    ]

    const columnGroupPowerFactor: GridColumnGroupingModel = [
        {
            groupId: 'Power Factor',
            children: [{ field: 'power_factor_r' }, { field: 'power_factor_s' }, { field: 'power_factor_t' }]
        }
    ]

    const rowsPower = powers.map((power) => {
        return {
            id: power.id,
            createdAt: new Date(power.created_at).toLocaleString(),
            power_r: power.power_r,
            power_s: power.power_s,
            power_t: power.power_t,
        }
    });

    const rowsReactivePower = reactivePowers.map((reactivePower) => {
        return {
            id: reactivePower.id,
            createdAt: new Date(reactivePower.created_at).toLocaleString(),
            reactive_power_r: reactivePower.reactive_power_r,
            reactive_power_s: reactivePower.reactive_power_s,
            reactive_power_t: reactivePower.reactive_power_t,
        }
    });

    const rowsApparentPower = apparentPowers.map((apparentPower) => {
        return {
            id: apparentPower.id,
            createdAt: new Date(apparentPower.created_at).toLocaleString(),
            apparent_power_r: apparentPower.apparent_power_r,
            apparent_power_s: apparentPower.apparent_power_s,
            apparent_power_t: apparentPower.apparent_power_t,
        }
    });

    const rowsPowerFactor = powerFactors.map((powerFactor) => {
        return {
            id: powerFactor.id,
            createdAt: new Date(powerFactor.created_at).toLocaleString(),
            power_factor_r: powerFactor.power_factor_r,
            power_factor_s: powerFactor.power_factor_s,
            power_factor_t: powerFactor.power_factor_t,
        }
    });

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Metric PQSPF
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 6 }}>
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
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupPower}
                            rows={rowsPower}
                            columns={columnsPower}
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
                            columnGroupingModel={columnGroupReactivePower}
                            rows={rowsReactivePower}
                            columns={columnsReactivePower}
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
                            columnGroupingModel={columnGroupApparentPower}
                            rows={rowsApparentPower}
                            columns={columnsApparentPower}
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
                            columnGroupingModel={columnGroupPowerFactor}
                            rows={rowsPowerFactor}
                            columns={columnsPowerFactor}
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
