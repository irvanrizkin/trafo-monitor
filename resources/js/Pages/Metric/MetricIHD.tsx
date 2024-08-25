import {MetricIHDProps} from "@/types/metric";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";
import {Container, Grid} from "@mui/material";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function MetricIHD({
                                      trafo,
                                      date,
                                      individualHarmonicDistortions,
                                      ihdCurrents,
                                  }: MetricIHDProps) {
    const columnsIHD: GridColDef[] = [
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

    const columnGroupIHD: GridColumnGroupingModel = [
        {
            groupId: 'Individual Harmonic Distortion',
            children: [{ field: 'voltage_r' }, { field: 'voltage_s' }, { field: 'voltage_t' }]
        }
    ]

    const columnGroupCurrent: GridColumnGroupingModel = [
        {
            groupId: 'IHD Current',
            children: [{ field: 'current_r' }, { field: 'current_s' }, { field: 'current_t' }]
        }
    ]

    const rowsVoltage = individualHarmonicDistortions.map((voltage) => {
        return {
            id: voltage.id,
            createdAt: new Date(voltage.created_at).toLocaleString(),
            voltage_r: voltage.voltage_r,
            voltage_s: voltage.voltage_s,
            voltage_t: voltage.voltage_t,
        }
    });

    const rowsCurrent = ihdCurrents.map((current) => {
        return {
            id: current.id,
            createdAt: new Date(current.created_at).toLocaleString(),
            current_r: current.current_r,
            current_s: current.current_s,
            current_t: current.current_t,
        }
    });

    return (
        <>
            <AppBarTriple
                startText={'Metric IHD'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route('chart.ihd', [trafo.id, date])}
                    text={'Open Chart'}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupIHD}
                            rows={rowsVoltage}
                            columns={columnsIHD}
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
                </Grid>
            </Container>
        </>
    )
}
