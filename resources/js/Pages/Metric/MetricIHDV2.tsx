import { MetricIHDV2Props } from "@/types/metric";
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
import OrderTableBodyV2 from "@/Components/Metric/OrderTableBodyV2";

export default function MetricIHDV2({
    trafo,
    date,
    ihdCurrents,
    ihdVoltages,
}: MetricIHDV2Props) {
    const [currentIndex, setCurrentIndex] = useState(
        (ihdCurrents?.length ?? 0) - 1,
    );
    const [voltageIndex, setVoltageIndex] = useState(
        (ihdVoltages?.length ?? 0) - 1,
    );
    return (
        <>
            <AppBarTriple
                startText={"Metric IHD"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.ihd", [trafo.id, date])}
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
                                <OrderTableBodyV2
                                    key={"ihd.current.h1"}
                                    orderName={"H1"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h1 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h1 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h1 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h3"}
                                    orderName={"H3"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h3 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h3 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h3 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h5"}
                                    orderName={"H5"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h5 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h5 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h5 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h7"}
                                    orderName={"H7"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h7 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h7 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h7 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h9"}
                                    orderName={"H9"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h9 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h9 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h9 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h11"}
                                    orderName={"H11"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h11 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h11 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h11 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h13"}
                                    orderName={"H13"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h13 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h13 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h13 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h15"}
                                    orderName={"H15"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h15 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h15 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h15 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h17"}
                                    orderName={"H17"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h17 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h17 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h17 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.current.h19"}
                                    orderName={"H19"}
                                    rValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_r_h19 ?? 0
                                    }
                                    sValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_s_h19 ?? 0
                                    }
                                    tValue={
                                        ihdCurrents[currentIndex]
                                            ?.current_t_h19 ?? 0
                                    }
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
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h1"}
                                    orderName={"H1"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h1 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h1 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h1 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h3"}
                                    orderName={"H3"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h3 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h3 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h3 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h5"}
                                    orderName={"H5"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h5 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h5 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h5 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h7"}
                                    orderName={"H7"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h7 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h7 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h7 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h9"}
                                    orderName={"H9"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h9 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h9 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h9 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h11"}
                                    orderName={"H11"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h11 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h11 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h11 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h13"}
                                    orderName={"H13"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h13 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h13 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h13 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h15"}
                                    orderName={"H15"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h15 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h15 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h15 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h17"}
                                    orderName={"H17"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h17 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h17 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h17 ?? 0
                                    }
                                />
                                <OrderTableBodyV2
                                    key={"ihd.voltage.h19"}
                                    orderName={"H19"}
                                    rValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_r_h19 ?? 0
                                    }
                                    sValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_s_h19 ?? 0
                                    }
                                    tValue={
                                        ihdVoltages[voltageIndex]
                                            ?.voltage_t_h19 ?? 0
                                    }
                                />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
