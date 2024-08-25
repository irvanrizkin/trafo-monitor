import {MetricVIFProps} from "@/types/metric";
import {Container, Grid} from "@mui/material";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";
import AppBarTriple from "@/Components/Shared/AppBarTriple";

export default function Metric({ trafo, date, voltages, currents, frequencies }: MetricVIFProps) {
    const columnsVoltage: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'voltage_r', headerName: 'R'},
        { field: 'voltage_s', headerName: 'S'},
        { field: 'voltage_t', headerName: 'T'},
    ]

    const columnsCurrent: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'current_r', headerName: 'R'},
        { field: 'current_s', headerName: 'S'},
        { field: 'current_t', headerName: 'T'},
    ]

    const columnsFrequency: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'frequency_r', headerName: 'R'},
        { field: 'frequency_s', headerName: 'S'},
        { field: 'frequency_t', headerName: 'T'},
    ]

    const columnGroupVoltage: GridColumnGroupingModel = [
        {
            groupId: 'Voltage',
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

    const rowsVoltage = voltages.map((voltage) => {
        return {
            id: voltage.id,
            createdAt: new Date(voltage.created_at).toLocaleString(),
            voltage_r: voltage.voltage_r,
            voltage_s: voltage.voltage_s,
            voltage_t: voltage.voltage_t,
        }
    });

    const rowsCurrent = currents.map((current) => {
        return {
            id: current.id,
            createdAt: new Date(current.created_at).toLocaleString(),
            current_r: current.current_r,
            current_s: current.current_s,
            current_t: current.current_t,
        }
    });

    const rowsFrequency = frequencies.map((frequency) => {
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
                startText={'Metric VIF'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Grid container spacing={2} sx={{ my: 4 }}>
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
