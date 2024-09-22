import {MetricVIFProps} from "@/types/metric";
import {Box, Container, Grid, Stack, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {Gauge, gaugeClasses} from "@mui/x-charts";
import GaugeGroup from "@/Components/Metric/GaugeGroup";

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
        { field: 'current_in', headerName: 'IN' },
    ]

    const columnsFrequency: GridColDef[] = [
        { field: 'id', headerName: 'ID'},
        { field: 'createdAt', headerName: 'Date', width: 200},
        { field: 'frequency_r', headerName: 'Frequency (Hz)', width: 120},
    ]

    const columnGroupVoltage: GridColumnGroupingModel = [
        {
            groupId: 'Voltage (V)',
            children: [{ field: 'voltage_r' }, { field: 'voltage_s' }, { field: 'voltage_t' }]
        }
    ]

    const columnGroupCurrent: GridColumnGroupingModel = [
        {
            groupId: 'Current (I)',
            children: [{ field: 'current_r' }, { field: 'current_s' }, { field: 'current_t' }, { field: 'current_in' }]
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
            current_in: current.current_in,
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

    const voltageR = [...voltages.map(v => v.voltage_r)];
    const voltageS = [...voltages.map(v => v.voltage_s)];
    const voltageT = [...voltages.map(v => v.voltage_t)];

    const currentR = [...currents.map(c => c.current_r)];
    const currentS = [...currents.map(c => c.current_s)];
    const currentT = [...currents.map(c => c.current_t)];

    const frequency = [...frequencies.map(f => f.frequency_r)];

    return (
        <>
            <AppBarTriple
                startText={'Metric VIF'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route('chart.vif', [trafo.id, date])}
                    text={'Open Chart'}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[voltageR, voltageS, voltageT]}
                            labels={['R', 'S', 'T']}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <GaugeGroup
                            gauges={[currentR, currentS, currentT]}
                            labels={['R', 'S', 'T']}
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
                        <GaugeGroup
                            gauges={[frequency]}
                            labels={['Frequency']}
                            isOverride={true}
                            upperSafeThreshold={50.5}
                            lowerSafeThreshold={49.5}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid
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
