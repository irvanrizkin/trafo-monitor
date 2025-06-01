import AnalyticCard from "@/Components/Metric/AnalyticCard";
import AppBarTriple from "@/Components/Shared/AppBarTriple";
import { powerFactorFormatter } from "@/helpers/formatter/powerfactor-formatter";
import statusFormatterColor from "@/helpers/formatter/status-formatter-color";
import statusFormatterText from "@/helpers/formatter/status-formatter-text";
import { MetricAnalysisProps } from "@/types/metric";
import { Container, Grid } from "@mui/material";

export default function MetricAnalysis(props: MetricAnalysisProps) {
    const { trafo, date, classifiedData } = props;
    const {
        power_factor_r: powerFactorR,
        power_factor_s: powerFactorS,
        power_factor_t: powerFactorT,
        ambient_temperature: ambientTemperature,
        thd_voltage_r: thdVoltageR,
        thd_voltage_s: thdVoltageS,
        thd_voltage_t: thdVoltageT,
        power_loss_r: powerLossR,
        power_loss_s: powerLossS,
        power_loss_t: powerLossT,
        resistive_voltage_drop_r: resistiveVoltageDropR,
        resistive_voltage_drop_s: resistiveVoltageDropS,
        resistive_voltage_drop_t: resistiveVoltageDropT,
        reactive_voltage_drop_r: reactiveVoltageDropR,
        reactive_voltage_drop_s: reactiveVoltageDropS,
        reactive_voltage_drop_t: reactiveVoltageDropT,
        total_voltage_drop_r: totalVoltageDropR,
        total_voltage_drop_s: totalVoltageDropS,
        total_voltage_drop_t: totalVoltageDropT,
    } = classifiedData;

    console.log("classifiedData", classifiedData);

    return (
        <>
            <AppBarTriple
                startText="Analisis"
                middleText={trafo.name + " - " + trafo.address}
                endText={date}
            />
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
                    <Grid item xs={12}>
                        <AnalyticCard
                            parameter="GIS"
                            value={classifiedData?.gis?.value ?? 0}
                            detail={statusFormatterText(
                                classifiedData?.gis?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                classifiedData?.gis?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Resistif R"
                            value={resistiveVoltageDropR?.value ?? 0}
                            detail={statusFormatterText(
                                resistiveVoltageDropR?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                resistiveVoltageDropR?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Reaktif R"
                            value={reactiveVoltageDropR?.value ?? 0}
                            detail={statusFormatterText(
                                reactiveVoltageDropR?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                reactiveVoltageDropR?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Total R"
                            value={totalVoltageDropR?.value ?? 0}
                            detail={statusFormatterText(
                                totalVoltageDropR?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                totalVoltageDropR?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Resistif S"
                            value={resistiveVoltageDropS?.value ?? 0}
                            detail={statusFormatterText(
                                resistiveVoltageDropS?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                resistiveVoltageDropS?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Reaktif S"
                            value={reactiveVoltageDropS?.value ?? 0}
                            detail={statusFormatterText(
                                reactiveVoltageDropS?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                reactiveVoltageDropS?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Total S"
                            value={totalVoltageDropS?.value ?? 0}
                            detail={statusFormatterText(
                                totalVoltageDropS?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                totalVoltageDropS?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Resistif T"
                            value={resistiveVoltageDropT?.value ?? 0}
                            detail={statusFormatterText(
                                resistiveVoltageDropT?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                resistiveVoltageDropT?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Reaktif T"
                            value={reactiveVoltageDropT?.value ?? 0}
                            detail={statusFormatterText(
                                reactiveVoltageDropT?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                reactiveVoltageDropT?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Drop Tegangan Total T"
                            value={totalVoltageDropT?.value ?? 0}
                            detail={statusFormatterText(
                                totalVoltageDropT?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                totalVoltageDropT?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Factor R"
                            value={powerFactorR?.value ?? 0}
                            detail={
                                powerFactorFormatter(powerFactorR?.status ?? "")
                                    .text
                            }
                            color={
                                powerFactorFormatter(powerFactorR?.status ?? "")
                                    .color
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Factor S"
                            value={powerFactorS?.value ?? 0}
                            detail={
                                powerFactorFormatter(powerFactorS?.status ?? "")
                                    .text
                            }
                            color={
                                powerFactorFormatter(powerFactorS?.status ?? "")
                                    .color
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Factor T"
                            value={powerFactorT?.value ?? 0}
                            detail={
                                powerFactorFormatter(powerFactorT?.status ?? "")
                                    .text
                            }
                            color={
                                powerFactorFormatter(powerFactorT?.status ?? "")
                                    .color
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="THD Tegangan R"
                            value={thdVoltageR?.value ?? 0}
                            detail={statusFormatterText(
                                thdVoltageR?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                thdVoltageR?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="THD Tegangan S"
                            value={thdVoltageS?.value ?? 0}
                            detail={statusFormatterText(
                                thdVoltageS?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                thdVoltageS?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="THD Tegangan T"
                            value={thdVoltageT?.value ?? 0}
                            detail={statusFormatterText(
                                thdVoltageT?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                thdVoltageT?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Tegangan R"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Tegangan S"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Tegangan T"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Arus R"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Arus S"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="IHD Arus T"
                            value={0}
                            detail="Data belum dianalisis"
                            color={statusFormatterColor("unknown")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AnalyticCard
                            parameter="Tekanan Minyak"
                            value={classifiedData?.pressure?.value ?? 0}
                            detail={statusFormatterText(
                                classifiedData?.pressure?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                classifiedData?.pressure?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AnalyticCard
                            parameter="Suhu Minyak"
                            value={classifiedData?.temperature?.value ?? 0}
                            detail={statusFormatterText(
                                classifiedData?.temperature?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                classifiedData?.temperature?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AnalyticCard
                            parameter="Ambient Temperature"
                            value={ambientTemperature?.value ?? 0}
                            detail={statusFormatterText(
                                ambientTemperature?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                ambientTemperature?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Loss R"
                            value={powerLossR?.value ?? 0}
                            detail={statusFormatterText(
                                powerLossR?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                powerLossR?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Loss S"
                            value={powerLossS?.value ?? 0}
                            detail={statusFormatterText(
                                powerLossS?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                powerLossS?.status ?? "",
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <AnalyticCard
                            parameter="Power Loss T"
                            value={powerLossT?.value ?? 0}
                            detail={statusFormatterText(
                                powerLossT?.status ?? "",
                            )}
                            color={statusFormatterColor(
                                powerLossT?.status ?? "",
                            )}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
