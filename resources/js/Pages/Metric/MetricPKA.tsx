import { MetricPKAProps } from "@/types/metric";
import { Container, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import StaticGaugeGroup from "@/Components/Metric/StaticGaugeGroup";

export default function MetricPKA({
    trafo,
    date,
    kFactors,
    classifiedData,
    maxValue,
}: MetricPKAProps) {
    const columnsKFactor: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "k_factor_r", headerName: "R" },
        { field: "k_factor_s", headerName: "S" },
        { field: "k_factor_t", headerName: "T" },
    ];

    const rowsKFactor = kFactors.map((kFactor) => {
        return {
            id: kFactor.id,
            createdAt: new Date(kFactor.created_at).toLocaleString(),
            k_factor_r: kFactor.k_factor_r,
            k_factor_s: kFactor.k_factor_s,
            k_factor_t: kFactor.k_factor_t,
        };
    });

    console.log(classifiedData);

    return (
        <>
            <AppBarTriple
                startText={"Metric PKA"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.pka", [trafo.id])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData?.k_factor_r?.value ?? 0,
                                    label: "R",
                                    status:
                                        classifiedData?.k_factor_r?.status ??
                                        "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "k_factor",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.k_factor_s?.value ?? 0,
                                    label: "S",
                                    status:
                                        classifiedData?.k_factor_s?.status ??
                                        "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "k_factor",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.k_factor_t?.value ?? 0,
                                    label: "T",
                                    status:
                                        classifiedData?.k_factor_t?.status ??
                                        "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "k_factor",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                </Grid>
            </Container>
        </>
    );
}
