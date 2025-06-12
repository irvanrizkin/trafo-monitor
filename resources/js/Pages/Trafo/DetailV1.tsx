import {
    AppBar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Toolbar,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TrafoDetailPropsV1 } from "@/types";
import GoogleMap from "@/Components/Map/GoogleMap";

export default function DetailV1({ trafo, dates }: TrafoDetailPropsV1) {
    const dataCategories = [
        { id: "vif", name: "Data 1 : V, I , dan F" },
        { id: "pqspf", name: "Data 2 : P, Q, S dan PF" },
        { id: "thd-ihd", name: "Data 3 : TOTAL HARMONICS DISTORTION" },
        { id: "ihd", name: "Data 4 : INDIVIDUAL HARMONICS DISTORTION" },
        {
            id: "tpo",
            name: "Data 5 : T, P, LV MINYAK, DAN AMBIENT TEMPERATURE",
        },
        { id: "pka", name: "Data 6 : K FACTOR" },
        { id: "analisis", name: "Data 7 : ANALISIS" },
    ];
    const [dateState, setDateState] = useState("");
    const [tableCategoryState, setTableCategoryState] = useState("");
    const [chartCategoryState, setChartCategoryState] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setDateState(event.target.value);
    };

    const handleChangeTableCategory = (event: SelectChangeEvent) => {
        setTableCategoryState(event.target.value);
    };

    const handleChangeChartCategory = (event: SelectChangeEvent) => {
        setChartCategoryState(event.target.value);
    };

    useEffect(() => {
        if (tableCategoryState) {
            window.location.href = route(`metric.${tableCategoryState}`, [
                trafo.id,
                dateState,
            ]);
        }
    }, [tableCategoryState, route, trafo.id, dateState]);

    useEffect(() => {
        if (chartCategoryState) {
            window.location.href = route(`chart.${chartCategoryState}`, [
                trafo.id,
                dateState,
            ]);
        }
    }, [chartCategoryState, route, trafo.id, dateState]);

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Trafo Monitoring
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Box sx={{ my: 4 }}>
                    <Grid container spacing={2} px={2}>
                        <Grid item xs={12} md={6}>
                            <GoogleMap
                                lat={Number(trafo.latitude)}
                                lng={Number(trafo.longitude)}
                                title={trafo.name}
                                height={"650px"}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                fontWeight={"bold"}
                            >
                                {trafo.name}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {trafo.address}
                            </Typography>
                            <TableContainer component={Paper} sx={{ mb: 2 }}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Latitude</TableCell>
                                            <TableCell>
                                                {trafo.latitude}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Longitude</TableCell>
                                            <TableCell>
                                                {trafo.longitude}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Created At</TableCell>
                                            <TableCell>
                                                {new Date(
                                                    trafo.created_at,
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography sx={{ mb: 2 }} variant={"h6"}>
                                Pilih Tanggal
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="demo-simple-select-label">
                                    Date
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dateState}
                                    label="Date"
                                    onChange={handleChange}
                                >
                                    {dates.map((date, index) => (
                                        <MenuItem
                                            key={index}
                                            value={date.date_group}
                                        >
                                            {date.date_group}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        disabled={dateState === ""}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Table
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={tableCategoryState}
                                            label="Date"
                                            onChange={handleChangeTableCategory}
                                        >
                                            {dataCategories.map(
                                                (dataCategory, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={dataCategory.id}
                                                    >
                                                        {dataCategory.name}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        disabled={dateState === ""}
                                    >
                                        <InputLabel id="demo-simple-select-label">
                                            Chart
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={chartCategoryState}
                                            label="Date"
                                            onChange={handleChangeChartCategory}
                                        >
                                            {dataCategories.map(
                                                (dataCategory, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={dataCategory.id}
                                                    >
                                                        {dataCategory.name}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Typography sx={{ mb: 2, mt: 2 }} variant={"h6"}>
                                Ekspor Data
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={dateState === ""}
                                href={route("metric.export", [
                                    trafo.id,
                                    dateState,
                                ])}
                            >
                                Simpan Sebagai Excel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}
