import { MetricHDProps, MetricTHDIHDProps } from "@/types/metric";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import {
    Container,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
} from "@mui/material";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import OrderTableBody from "@/Components/Metric/OrderTableBody";
import { Head } from "@inertiajs/react";

export default function MetricHD({
    trafo,
    date,
    title,
    chartRoute,
    harmonicDistortions,
}: MetricHDProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <>
            <Head title={trafo?.name ?? ""} />
            <AppBarTriple
                startText={title}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route(chartRoute, [trafo.id, date])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <TableContainer
                    component={Paper}
                    sx={{
                        mb: 4,
                        maxWidth: isDesktop ? "50%" : "100%",
                        mx: "auto",
                    }}
                >
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={1}>
                                    Country
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    Details
                                </TableCell>
                                <TableCell>Orde</TableCell>
                                <TableCell align="right">R</TableCell>
                                <TableCell align="right">S</TableCell>
                                <TableCell align="right">T</TableCell>
                            </TableRow>
                        </TableHead>
                        <OrderTableBody
                            key={"h1"}
                            orderName={"H1"}
                            order={harmonicDistortions.h1}
                        />
                        <OrderTableBody
                            key={"h2"}
                            orderName={"H2"}
                            order={harmonicDistortions.h2}
                        />
                        <OrderTableBody
                            key={"h3"}
                            orderName={"H3"}
                            order={harmonicDistortions.h3}
                        />
                        <OrderTableBody
                            key={"h4"}
                            orderName={"H4"}
                            order={harmonicDistortions.h4}
                        />
                        <OrderTableBody
                            key={"h5"}
                            orderName={"H5"}
                            order={harmonicDistortions.h5}
                        />
                        <OrderTableBody
                            key={"h6"}
                            orderName={"H6"}
                            order={harmonicDistortions.h6}
                        />
                        <OrderTableBody
                            key={"h7"}
                            orderName={"H7"}
                            order={harmonicDistortions.h7}
                        />
                        <OrderTableBody
                            key={"h8"}
                            orderName={"H8"}
                            order={harmonicDistortions.h8}
                        />
                        <OrderTableBody
                            key={"h9"}
                            orderName={"H9"}
                            order={harmonicDistortions.h9}
                        />
                        <OrderTableBody
                            key={"h10"}
                            orderName={"H10"}
                            order={harmonicDistortions.h10}
                        />
                        <OrderTableBody
                            key={"h11"}
                            orderName={"H11"}
                            order={harmonicDistortions.h11}
                        />
                        <OrderTableBody
                            key={"h12"}
                            orderName={"H12"}
                            order={harmonicDistortions.h12}
                        />
                        <OrderTableBody
                            key={"h13"}
                            orderName={"H13"}
                            order={harmonicDistortions.h13}
                        />
                        <OrderTableBody
                            key={"h14"}
                            orderName={"H14"}
                            order={harmonicDistortions.h14}
                        />
                        <OrderTableBody
                            key={"h15"}
                            orderName={"H15"}
                            order={harmonicDistortions.h15}
                        />
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}
