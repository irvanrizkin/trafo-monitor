import {MetricPKAProps} from "@/types/metric";
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export default function MetricPKA({trafo, date, powerLosses, kFactors, triplenCurrents}: MetricPKAProps) {
    const columnsPowerLoss: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'power_loss', headerName: 'Power Loss'},
    ]

    const columnsKFactor: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'k_factor', headerName: 'K Factor'},
    ]

    const columnsTriplenCurrent: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'triplen_current', headerName: 'Triplen Current', width: 150},
    ]

    const rowsPowerLoss = powerLosses.map((powerLoss) => {
        return {
            id: powerLoss.id,
            createdAt: new Date(powerLoss.created_at).toLocaleString(),
            power_loss: powerLoss.power_loss,
        }
    });

    const rowsKFactor = kFactors.map((kFactor) => {
        return {
            id: kFactor.id,
            createdAt: new Date(kFactor.created_at).toLocaleString(),
            k_factor: kFactor.k_factor,
        }
    });

    const rowsTriplenCurrent = triplenCurrents.map((triplenCurrent) => {
        return {
            id: triplenCurrent.id,
            createdAt: new Date(triplenCurrent.created_at).toLocaleString(),
            triplen_current: triplenCurrent.triplen_current,
        }
    });

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Metric PKA
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
                            rows={rowsPowerLoss}
                            columns={columnsPowerLoss}
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
                            rows={rowsKFactor}
                            columns={columnsKFactor}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid
                            rows={rowsTriplenCurrent}
                            columns={columnsTriplenCurrent}
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
    )
}
