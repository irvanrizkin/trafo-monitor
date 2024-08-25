import {MetricTHDIHDProps} from "@/types/metric";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";
import {Container, Grid} from "@mui/material";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";

export default function MetricTHDIHD({
                                         trafo,
                                         date,
                                         totalHarmonicDistortions,
                                         thdCurrents,
                                         thdFrequencies
                                     }: MetricTHDIHDProps) {
    const columnsTHD: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'voltage_r', headerName: 'VR'},
        { field: 'voltage_s', headerName: 'VS'},
        { field: 'voltage_t', headerName: 'VT'},
    ]

    const columnsCurrent: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'current_r', headerName: 'IR'},
        { field: 'current_s', headerName: 'IS'},
        { field: 'current_t', headerName: 'IT'},
    ]

    const columnsFrequency: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'frequency_r', headerName: 'FR'},
        { field: 'frequency_s', headerName: 'FS'},
        { field: 'frequency_t', headerName: 'FT'},
    ]

    const columnGroupTHD: GridColumnGroupingModel = [
        {
            groupId: 'Total Harmonic Distortion',
            children: [{ field: 'voltage_r' }, { field: 'voltage_s' }, { field: 'voltage_t' }]
        }
    ]

    const columnGroupCurrent: GridColumnGroupingModel = [
        {
            groupId: 'Current',
            children: [{ field: 'current_r' }, { field: 'current_s' }, { field: 'current_t' }]
        }
    ]

    const columnGroupFrequency: GridColumnGroupingModel = [
        {
            groupId: 'Frequency',
            children: [{ field: 'frequency_r' }, { field: 'frequency_s' }, { field: 'frequency_t' }]
        }
    ]

    const rowsTHD = totalHarmonicDistortions.map((thd) => {
        return {
            id: thd.id,
            createdAt: new Date(thd.created_at).toLocaleString(),
            voltage_r: thd.voltage_r,
            voltage_s: thd.voltage_s,
            voltage_t: thd.voltage_t,
        }
    });

    const rowsCurrent = thdCurrents.map((current) => {
        return {
            id: current.id,
            createdAt: new Date(current.created_at).toLocaleString(),
            current_r: current.current_r,
            current_s: current.current_s,
            current_t: current.current_t,
        }
    });

    const rowsFrequency = thdFrequencies.map((frequency) => {
        return {
            id: frequency.id,
            createdAt: new Date(frequency.created_at).toLocaleString(),
            frequency_r: frequency.frequency_r,
            frequency_s: frequency.frequency_s,
            frequency_t: frequency.frequency_t,
        }
    });

    return (
        <>
            <AppBarTriple
                startText={'Metric THD IHD'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route('chart.thd-ihd', [trafo.id, date])}
                    text={'Open Chart'}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupTHD}
                            rows={rowsTHD}
                            columns={columnsTHD}
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
                    <Grid item xs={12}>
                        <DataGrid
                            columnGroupingModel={columnGroupFrequency}
                            rows={rowsFrequency}
                            columns={columnsFrequency}
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
