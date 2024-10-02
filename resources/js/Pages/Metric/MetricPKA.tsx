import {MetricPKAProps} from "@/types/metric";
import {Container, Grid} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import GaugeGroup from "@/Components/Metric/GaugeGroup";

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
        { field: 'triplen_current', headerName: 'Triplen Harmonics', width: 150},
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

    const powerLoss = [...powerLosses.map((powerLoss) => powerLoss.power_loss)];
    const kFactor = [...kFactors.map((kFactor) => kFactor.k_factor)];
    const triplenCurrent = [...triplenCurrents.map((triplenCurrent) => triplenCurrent.triplen_current)];

    return (
        <>
            <AppBarTriple
                startText={'Metric PKA'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route('chart.pka', [trafo.id])}
                    text={'Open Chart'}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[powerLoss]}
                            labels={['Power Loss']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[kFactor]}
                            labels={['K Factor']}
                        />
                    </Grid>
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
                        <GaugeGroup
                            gauges={[triplenCurrent]}
                            labels={['Triplen Harmonics']}
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
