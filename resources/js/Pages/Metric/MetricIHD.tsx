import {MetricIHDProps} from "@/types/metric";
import {DataGrid, GridColDef, GridColumnGroupingModel} from "@mui/x-data-grid";
import {Container, Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import OrderTableBody from "@/Components/Metric/OrderTableBody";

export default function MetricIHD({
                                      trafo,
                                      date,
                                      ihdCurrents,
                                      ihdVoltages
                                  }: MetricIHDProps) {
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
                        <TableContainer component={Paper} sx={{ mb: 4 }}>
                            <Table size='medium'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            Individual Harmonics Distortion Currents (IHDi)
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Orde</TableCell>
                                        <TableCell align="right">R</TableCell>
                                        <TableCell align="right">S</TableCell>
                                        <TableCell align="right">T</TableCell>
                                    </TableRow>
                                </TableHead>
                                <OrderTableBody key={'h1'} orderName={'H1'} order={ihdCurrents[0].h1} />
                                <OrderTableBody key={'h2'} orderName={'H2'} order={ihdCurrents[0].h2} />
                                <OrderTableBody key={'h3'} orderName={'H3'} order={ihdCurrents[0].h3} />
                                <OrderTableBody key={'h4'} orderName={'H4'} order={ihdCurrents[0].h4} />
                                <OrderTableBody key={'h5'} orderName={'H5'} order={ihdCurrents[0].h5} />
                                <OrderTableBody key={'h6'} orderName={'H6'} order={ihdCurrents[0].h6} />
                                <OrderTableBody key={'h7'} orderName={'H7'} order={ihdCurrents[0].h7} />
                                <OrderTableBody key={'h8'} orderName={'H8'} order={ihdCurrents[0].h8} />
                                <OrderTableBody key={'h9'} orderName={'H9'} order={ihdCurrents[0].h9} />
                                <OrderTableBody key={'h10'} orderName={'H10'} order={ihdCurrents[0].h10} />
                                <OrderTableBody key={'h11'} orderName={'H11'} order={ihdCurrents[0].h11} />
                                <OrderTableBody key={'h12'} orderName={'H12'} order={ihdCurrents[0].h12} />
                                <OrderTableBody key={'h13'} orderName={'H13'} order={ihdCurrents[0].h13} />
                                <OrderTableBody key={'h14'} orderName={'H14'} order={ihdCurrents[0].h14} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h15} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h16} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h17} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h18} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h19} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h20} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h21} />

                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TableContainer component={Paper} sx={{ mb: 4 }}>
                            <Table size='medium'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            Individual Harmonics Distortion Voltages (IHDv)
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Orde</TableCell>
                                        <TableCell align="right">R</TableCell>
                                        <TableCell align="right">S</TableCell>
                                        <TableCell align="right">T</TableCell>
                                    </TableRow>
                                </TableHead>
                                <OrderTableBody key={'h1'} orderName={'H1'} order={ihdVoltages[0].h1} />
                                <OrderTableBody key={'h2'} orderName={'H2'} order={ihdVoltages[0].h2} />
                                <OrderTableBody key={'h3'} orderName={'H3'} order={ihdVoltages[0].h3} />
                                <OrderTableBody key={'h4'} orderName={'H4'} order={ihdVoltages[0].h4} />
                                <OrderTableBody key={'h5'} orderName={'H5'} order={ihdVoltages[0].h5} />
                                <OrderTableBody key={'h6'} orderName={'H6'} order={ihdVoltages[0].h6} />
                                <OrderTableBody key={'h7'} orderName={'H7'} order={ihdVoltages[0].h7} />
                                <OrderTableBody key={'h8'} orderName={'H8'} order={ihdVoltages[0].h8} />
                                <OrderTableBody key={'h9'} orderName={'H9'} order={ihdVoltages[0].h9} />
                                <OrderTableBody key={'h10'} orderName={'H10'} order={ihdVoltages[0].h10} />
                                <OrderTableBody key={'h11'} orderName={'H11'} order={ihdVoltages[0].h11} />
                                <OrderTableBody key={'h12'} orderName={'H12'} order={ihdVoltages[0].h12} />
                                <OrderTableBody key={'h13'} orderName={'H13'} order={ihdVoltages[0].h13} />
                                <OrderTableBody key={'h14'} orderName={'H14'} order={ihdVoltages[0].h14} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdVoltages[0].h15} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h16} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h17} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h18} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h19} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h20} />
                                <OrderTableBody key={'h15'} orderName={'H15'} order={ihdCurrents[0].h21} />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
