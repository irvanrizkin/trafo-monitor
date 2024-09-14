import {ChartVIFProps} from "@/types/chart";
import {Box, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import GoogleMapReact from "google-map-react";
import {ChartData} from "chart.js";
import {Line} from "react-chartjs-2";
import 'chart.js/auto';
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import ShowAssignmentIcon from "@mui/icons-material/Assignment";
import ButtonEndHref from "@/Components/Shared/ButtonEndHref";
import {
    rstinLineChart,
    rstinLineChartString,
    rstLineChart,
    rstLineChartString,
    singleLineChart,
    singleLineChartString
} from "@/helpers/generator/chart-generator";
import timeMinuteString from "@/helpers/converter/date-time";
import AggregationRST from "@/Components/Chart/AggregationRST";
import AggregationSingle from "@/Components/Chart/AggregationSingle";
import AggregationRSTIN from "@/Components/Chart/AggregationRSTIN";

export default function ChartVIF({
                                     trafo,
                                     date,
                                     voltages,
                                     currents,
                                     frequencies,
                                 }: ChartVIFProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const theme = useTheme()
    const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'))

    const metricAvgVoltage = rstLineChartString(
        {
            labels: voltages.map(voltage => timeMinuteString(new Date(voltage.created_at))),
            rData: voltages.map(voltage => voltage.voltage_r),
            sData: voltages.map(voltage => voltage.voltage_s),
            tData: voltages.map(voltage => voltage.voltage_t),
        }
    );

    const voltageRMax = Math.max(...voltages.map(voltage => voltage.voltage_r));
    const voltageSMax = Math.max(...voltages.map(voltage => voltage.voltage_s));
    const voltageTMax = Math.max(...voltages.map(voltage => voltage.voltage_t));
    const voltageRMin = Math.min(...voltages.map(voltage => voltage.voltage_r));
    const voltageSMin = Math.min(...voltages.map(voltage => voltage.voltage_s));
    const voltageTMin = Math.min(...voltages.map(voltage => voltage.voltage_t));
    const voltageRAvg = voltages.reduce((acc, voltage) => acc + voltage.voltage_r, 0) / voltages.length;
    const voltageSAvg = voltages.reduce((acc, voltage) => acc + voltage.voltage_s, 0) / voltages.length;
    const voltageTAvg = voltages.reduce((acc, voltage) => acc + voltage.voltage_t, 0) / voltages.length;
    const voltageRLatest = voltages[voltages.length - 1].voltage_r ?? 0;
    const voltageSLatest = voltages[voltages.length - 1].voltage_s ?? 0;
    const voltageTLatest = voltages[voltages.length - 1].voltage_t ?? 0;

    const metricAvgCurrent = rstinLineChartString(
        {
            labels: currents.map(current => timeMinuteString(new Date(current.created_at))),
            rData: currents.map(current => current.current_r),
            sData: currents.map(current => current.current_s),
            tData: currents.map(current => current.current_t),
            inData: currents.map(current => current.current_in),
        }
    );

    const currentRMax = Math.max(...currents.map(current => current.current_r));
    const currentSMax = Math.max(...currents.map(current => current.current_s));
    const currentTMax = Math.max(...currents.map(current => current.current_t));
    const currentInMax = Math.max(...currents.map(current => current.current_in));
    const currentRMin = Math.min(...currents.map(current => current.current_r));
    const currentSMin = Math.min(...currents.map(current => current.current_s));
    const currentTMin = Math.min(...currents.map(current => current.current_t));
    const currentInMin = Math.min(...currents.map(current => current.current_in));
    const currentRAvg = currents.reduce((acc, current) => acc + current.current_r, 0) / currents.length;
    const currentSAvg = currents.reduce((acc, current) => acc + current.current_s, 0) / currents.length;
    const currentTAvg = currents.reduce((acc, current) => acc + current.current_t, 0) / currents.length;
    const currentInAvg = currents.reduce((acc, current) => acc + current.current_in, 0) / currents.length;
    const currentRLatest = currents[currents.length - 1].current_r ?? 0;
    const currentSLatest = currents[currents.length - 1].current_s ?? 0;
    const currentTLatest = currents[currents.length - 1].current_t ?? 0;
    const currentInLatest = currents[currents.length - 1].current_in ?? 0;

    const metricAvgFrequency = singleLineChartString({
        labels: frequencies.map(frequency => timeMinuteString(new Date(frequency.created_at))),
        data: frequencies.map(frequency => frequency.frequency_r),
        label: 'Frequency',
    });

    const frequencyMax = Math.max(...frequencies.map(frequency => frequency.frequency_r));
    const frequencyMin = Math.min(...frequencies.map(frequency => frequency.frequency_r));
    const frequencyAvg = frequencies.reduce((acc, frequency) => acc + frequency.frequency_r, 0) / frequencies.length;
    const frequencyLatest = frequencies[frequencies.length - 1].frequency_r ?? 0;

    const renderMarker = (map: any, maps: any) => {
        return new maps.Marker({
            position: {
                lat: Number(trafo.latitude),
                lng: Number(trafo.longitude),
            },
            map,
            title: 'test marker'
        });
    }

    const defaultProps = {
        center: {
            lat: Number(trafo.latitude),
            lng: Number(trafo.longitude),
        },
        zoom: 15,
    }

    return (
        <>
            <AppBarTriple
                startText={'Chart VIF'}
                middleText={trafo.name + ' - ' + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 8 }}>
                <ButtonEndHref
                    href={route('trafo.show', [trafo.id])}
                    text={'Back to Detail'}
                    icon={<ShowAssignmentIcon />}
                    sx={{ mt: 2 }}
                />
                <Grid container spacing={2} sx={{pb: 2}}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Voltage (V)</Typography>
                            <Line data={metricAvgVoltage}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRST
                                    rMax={voltageRMax}
                                    sMax={voltageSMax}
                                    tMax={voltageTMax}
                                    rMin={voltageRMin}
                                    sMin={voltageSMin}
                                    tMin={voltageTMin}
                                    rAvg={voltageRAvg}
                                    sAvg={voltageSAvg}
                                    tAvg={voltageTAvg}
                                    rLatest={voltageRLatest}
                                    sLatest={voltageSLatest}
                                    tLatest={voltageTLatest}
                                />
                            </Container>
                        </Box>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Frequency (f)</Typography>
                            <Line data={metricAvgFrequency}/>

                            <Container sx={{ p: 2 }}>
                                <AggregationSingle
                                    property={"Frequency"}
                                    max={frequencyMax}
                                    min={frequencyMin}
                                    avg={frequencyAvg}
                                    latest={frequencyLatest}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{px: 2}}
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            flexDirection="column"
                        >
                            <Typography variant={"h6"}>Current (I)</Typography>
                            <Line data={metricAvgCurrent}/>
                            <Container sx={{ p: 2 }}>
                                <AggregationRSTIN
                                    rMax={currentRMax}
                                    sMax={currentSMax}
                                    tMax={currentTMax}
                                    inMax={currentInMax}
                                    rMin={currentRMin}
                                    sMin={currentSMin}
                                    tMin={currentTMin}
                                    inMin={currentInMin}
                                    rAvg={currentRAvg}
                                    sAvg={currentSAvg}
                                    tAvg={currentTAvg}
                                    inAvg={currentInAvg}
                                    rLatest={currentRLatest}
                                    sLatest={currentSLatest}
                                    tLatest={currentTLatest}
                                    inLatest={currentInLatest}
                                />
                            </Container>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ height: '75vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: mapApiKey }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
