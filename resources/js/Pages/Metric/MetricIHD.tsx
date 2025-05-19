import { MetricIHDProps } from "@/types/metric";
import {
    DataGrid,
    GridColDef,
    GridColumnGroupingModel,
} from "@mui/x-data-grid";
import {
    Container,
    Grid,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import OrderTableBody from "@/Components/Metric/OrderTableBody";
import { useState } from "react";
import TimeNavigator from "@/Components/Metric/TimeNavigator";
import { Head } from "@inertiajs/react";

export default function MetricIHD({
    trafo,
    date,
    ihdCurrents,
    ihdVoltages,
}: MetricIHDProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [voltageIndex, setVoltageIndex] = useState(0);
    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={"Metric IHD"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.ihd", [trafo.id])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TimeNavigator
                            timestamp={
                                ihdCurrents[currentIndex]?.created_at || ""
                            }
                            enableBefore={currentIndex > 0}
                            enableNext={currentIndex < ihdCurrents.length - 1}
                            onBefore={() => setCurrentIndex(currentIndex - 1)}
                            onNext={() => setCurrentIndex(currentIndex + 1)}
                        ></TimeNavigator>
                        <TableContainer component={Paper} sx={{ mb: 4 }}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            Individual Harmonics Distortion
                                            Currents (IHDi)
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Orde</TableCell>
                                        <TableCell align="right">R</TableCell>
                                        <TableCell align="right">S</TableCell>
                                        <TableCell align="right">T</TableCell>
                                    </TableRow>
                                </TableHead>
                                <OrderTableBody
                                    key={"h1"}
                                    orderName={"H1"}
                                    order={ihdCurrents[currentIndex]?.h1 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h2"}
                                    orderName={"H2"}
                                    order={ihdCurrents[currentIndex]?.h2 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h3"}
                                    orderName={"H3"}
                                    order={ihdCurrents[currentIndex]?.h3 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h4"}
                                    orderName={"H4"}
                                    order={ihdCurrents[currentIndex]?.h4 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h5"}
                                    orderName={"H5"}
                                    order={ihdCurrents[currentIndex]?.h5 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h6"}
                                    orderName={"H6"}
                                    order={ihdCurrents[currentIndex]?.h6 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h7"}
                                    orderName={"H7"}
                                    order={ihdCurrents[currentIndex]?.h7 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h8"}
                                    orderName={"H8"}
                                    order={ihdCurrents[currentIndex]?.h8 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h9"}
                                    orderName={"H9"}
                                    order={ihdCurrents[currentIndex]?.h9 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h10"}
                                    orderName={"H10"}
                                    order={ihdCurrents[currentIndex]?.h10 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h11"}
                                    orderName={"H11"}
                                    order={ihdCurrents[currentIndex]?.h11 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h12"}
                                    orderName={"H12"}
                                    order={ihdCurrents[currentIndex]?.h12 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h13"}
                                    orderName={"H13"}
                                    order={ihdCurrents[currentIndex]?.h13 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h14"}
                                    orderName={"H14"}
                                    order={ihdCurrents[currentIndex]?.h14 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h15"}
                                    orderName={"H15"}
                                    order={ihdCurrents[currentIndex]?.h15 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h16"}
                                    orderName={"H16"}
                                    order={ihdCurrents[currentIndex]?.h16 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h17"}
                                    orderName={"H17"}
                                    order={ihdCurrents[currentIndex]?.h17 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h18"}
                                    orderName={"H18"}
                                    order={ihdCurrents[currentIndex]?.h18 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h19"}
                                    orderName={"H19"}
                                    order={ihdCurrents[currentIndex]?.h19 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h20"}
                                    orderName={"H20"}
                                    order={ihdCurrents[currentIndex]?.h20 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h21"}
                                    orderName={"H21"}
                                    order={ihdCurrents[currentIndex]?.h21 ?? 0}
                                />
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TimeNavigator
                            timestamp={
                                ihdVoltages[voltageIndex]?.created_at || ""
                            }
                            enableBefore={voltageIndex > 0}
                            enableNext={voltageIndex < ihdVoltages.length - 1}
                            onBefore={() => setVoltageIndex(voltageIndex - 1)}
                            onNext={() => setVoltageIndex(voltageIndex + 1)}
                        ></TimeNavigator>
                        <TableContainer component={Paper} sx={{ mb: 4 }}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={4}>
                                            Individual Harmonics Distortion
                                            Voltages (IHDv)
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Orde</TableCell>
                                        <TableCell align="right">R</TableCell>
                                        <TableCell align="right">S</TableCell>
                                        <TableCell align="right">T</TableCell>
                                    </TableRow>
                                </TableHead>
                                <OrderTableBody
                                    key={"h1"}
                                    orderName={"H1"}
                                    order={ihdVoltages[voltageIndex]?.h1 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h2"}
                                    orderName={"H2"}
                                    order={ihdVoltages[voltageIndex]?.h2 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h3"}
                                    orderName={"H3"}
                                    order={ihdVoltages[voltageIndex]?.h3 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h4"}
                                    orderName={"H4"}
                                    order={ihdVoltages[voltageIndex]?.h4 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h5"}
                                    orderName={"H5"}
                                    order={ihdVoltages[voltageIndex]?.h5 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h6"}
                                    orderName={"H6"}
                                    order={ihdVoltages[voltageIndex]?.h6 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h7"}
                                    orderName={"H7"}
                                    order={ihdVoltages[voltageIndex]?.h7 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h8"}
                                    orderName={"H8"}
                                    order={ihdVoltages[voltageIndex]?.h8 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h9"}
                                    orderName={"H9"}
                                    order={ihdVoltages[voltageIndex]?.h9 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h10"}
                                    orderName={"H10"}
                                    order={ihdVoltages[voltageIndex]?.h10 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h11"}
                                    orderName={"H11"}
                                    order={ihdVoltages[voltageIndex]?.h11 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h12"}
                                    orderName={"H12"}
                                    order={ihdVoltages[voltageIndex]?.h12 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h13"}
                                    orderName={"H13"}
                                    order={ihdVoltages[voltageIndex]?.h13 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h14"}
                                    orderName={"H14"}
                                    order={ihdVoltages[voltageIndex]?.h14 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h15"}
                                    orderName={"H15"}
                                    order={ihdVoltages[voltageIndex]?.h15 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h16"}
                                    orderName={"H16"}
                                    order={ihdVoltages[voltageIndex]?.h16 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h17"}
                                    orderName={"H17"}
                                    order={ihdVoltages[voltageIndex]?.h17 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h18"}
                                    orderName={"H18"}
                                    order={ihdVoltages[voltageIndex]?.h18 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h19"}
                                    orderName={"H19"}
                                    order={ihdVoltages[voltageIndex]?.h19 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h20"}
                                    orderName={"H20"}
                                    order={ihdVoltages[voltageIndex]?.h20 ?? 0}
                                />
                                <OrderTableBody
                                    key={"h21"}
                                    orderName={"H21"}
                                    order={ihdVoltages[voltageIndex]?.h21 ?? 0}
                                />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
