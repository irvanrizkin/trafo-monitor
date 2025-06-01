import { MetricPQSPFProps } from "@/types/metric";
import { Container, Grid, Stack, Typography } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridColumnGroupingModel,
} from "@mui/x-data-grid";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import GaugeGroup from "@/Components/Metric/GaugeGroup";
import StaticGaugeGroup from "@/Components/Metric/StaticGaugeGroup";

export default function ({
    trafo,
    date,
    powers,
    reactivePowers,
    apparentPowers,
    powerFactors,
    classifiedData,
    maxValue,
}: MetricPQSPFProps) {
    const columnsPower: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "power_r", headerName: "R" },
        { field: "power_s", headerName: "S" },
        { field: "power_t", headerName: "T" },
    ];

    const columnsReactivePower: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "reactive_power_r", headerName: "R" },
        { field: "reactive_power_s", headerName: "S" },
        { field: "reactive_power_t", headerName: "T" },
    ];

    const columnsApparentPower: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "apparent_power_r", headerName: "R" },
        { field: "apparent_power_s", headerName: "S" },
        { field: "apparent_power_t", headerName: "T" },
    ];

    const columnsPowerFactor: GridColDef[] = [
        { field: "id", headerName: "ID" },
        { field: "createdAt", headerName: "Date", width: 200 },
        { field: "power_factor_r", headerName: "R" },
        { field: "power_factor_s", headerName: "S" },
        { field: "power_factor_t", headerName: "T" },
    ];

    const columnGroupPower: GridColumnGroupingModel = [
        {
            groupId: "Active Power (kW)",
            children: [
                { field: "power_r" },
                { field: "power_s" },
                { field: "power_t" },
            ],
        },
    ];

    const columnGroupReactivePower: GridColumnGroupingModel = [
        {
            groupId: "Reactive Power (VAR)",
            children: [
                { field: "reactive_power_r" },
                { field: "reactive_power_s" },
                { field: "reactive_power_t" },
            ],
        },
    ];

    const columnGroupApparentPower: GridColumnGroupingModel = [
        {
            groupId: "Apparent Power (KVA)",
            children: [
                { field: "apparent_power_r" },
                { field: "apparent_power_s" },
                { field: "apparent_power_t" },
            ],
        },
    ];

    const columnGroupPowerFactor: GridColumnGroupingModel = [
        {
            groupId: "Power Factor (PF)",
            children: [
                { field: "power_factor_r" },
                { field: "power_factor_s" },
                { field: "power_factor_t" },
            ],
        },
    ];

    const rowsPower = powers.map((power) => {
        return {
            id: power.id,
            createdAt: new Date(power.created_at).toLocaleString(),
            power_r: power.power_r,
            power_s: power.power_s,
            power_t: power.power_t,
        };
    });

    const rowsReactivePower = reactivePowers.map((reactivePower) => {
        return {
            id: reactivePower.id,
            createdAt: new Date(reactivePower.created_at).toLocaleString(),
            reactive_power_r: reactivePower.reactive_power_r,
            reactive_power_s: reactivePower.reactive_power_s,
            reactive_power_t: reactivePower.reactive_power_t,
        };
    });

    const rowsApparentPower = apparentPowers.map((apparentPower) => {
        return {
            id: apparentPower.id,
            createdAt: new Date(apparentPower.created_at).toLocaleString(),
            apparent_power_r: apparentPower.apparent_power_r,
            apparent_power_s: apparentPower.apparent_power_s,
            apparent_power_t: apparentPower.apparent_power_t,
        };
    });

    const rowsPowerFactor = powerFactors.map((powerFactor) => {
        return {
            id: powerFactor.id,
            createdAt: new Date(powerFactor.created_at).toLocaleString(),
            power_factor_r: powerFactor.power_factor_r,
            power_factor_s: powerFactor.power_factor_s,
            power_factor_t: powerFactor.power_factor_t,
        };
    });

    return (
        <>
            <AppBarTriple
                startText={"Metric PQSPF"}
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <ButtonEndHref
                    href={route("chart.pqspf", [trafo.id])}
                    text={"Open Chart"}
                    icon={<ShowChartIcon />}
                    sx={{ mt: 4 }}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData?.active_power_r?.value ??
                                        0,
                                    label: "R",
                                    status:
                                        classifiedData?.active_power_r
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.active_power_s?.value ??
                                        0,
                                    label: "S",
                                    status:
                                        classifiedData?.active_power_s
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.active_power_t?.value ??
                                        0,
                                    label: "T",
                                    status:
                                        classifiedData?.active_power_t
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData?.reactive_power_r
                                            ?.value ?? 0,
                                    label: "R",
                                    status:
                                        classifiedData?.reactive_power_r
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.reactive_power_s
                                            ?.value ?? 0,
                                    label: "S",
                                    status:
                                        classifiedData?.reactive_power_s
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.reactive_power_t
                                            ?.value ?? 0,
                                    label: "T",
                                    status:
                                        classifiedData?.reactive_power_t
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupPower}
                            rows={rowsPower}
                            columns={columnsPower}
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
                            columnGroupingModel={columnGroupReactivePower}
                            rows={rowsReactivePower}
                            columns={columnsReactivePower}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData?.apparent_power_r
                                            ?.value ?? 0,
                                    label: "R",
                                    status:
                                        classifiedData?.apparent_power_r
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.apparent_power_s
                                            ?.value ?? 0,
                                    label: "S",
                                    status:
                                        classifiedData?.apparent_power_s
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.apparent_power_t
                                            ?.value ?? 0,
                                    label: "T",
                                    status:
                                        classifiedData?.apparent_power_t
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) => v.rule_name === "power",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StaticGaugeGroup
                            gauges={[
                                {
                                    value:
                                        classifiedData?.power_factor_r?.value ??
                                        0,
                                    label: "R",
                                    status:
                                        classifiedData?.power_factor_r
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) =>
                                                v.rule_name === "power_factor",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.power_factor_s?.value ??
                                        0,
                                    label: "S",
                                    status:
                                        classifiedData?.power_factor_s
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) =>
                                                v.rule_name === "power_factor",
                                        )?.max_value || 0,
                                },
                                {
                                    value:
                                        classifiedData?.power_factor_t?.value ??
                                        0,
                                    label: "T",
                                    status:
                                        classifiedData?.power_factor_t
                                            ?.status ?? "",
                                    maxValue:
                                        maxValue.find(
                                            (v) =>
                                                v.rule_name === "power_factor",
                                        )?.max_value || 0,
                                },
                            ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DataGrid
                            columnGroupingModel={columnGroupApparentPower}
                            rows={rowsApparentPower}
                            columns={columnsApparentPower}
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
                            columnGroupingModel={columnGroupPowerFactor}
                            rows={rowsPowerFactor}
                            columns={columnsPowerFactor}
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
