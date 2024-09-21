import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AggregationRSTINProps, AggregationRSTProps} from "@/types/component";

export default function AggregationRSTIN({
                                             rMax,
                                             sMax,
                                             tMax,
                                             inMax,
                                             rMin,
                                             sMin,
                                             tMin,
                                             inMin,
                                             rAvg,
                                             sAvg,
                                             tAvg,
                                             inAvg,
                                             rLatest,
                                             sLatest,
                                             tLatest,
                                             inLatest,
                                             maxRTime,
                                             maxSTime,
                                             maxTTime,
                                             maxInTime,
                                             minRTime,
                                             minSTime,
                                             minTTime,
                                             minInTime
                                         }: AggregationRSTINProps) {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                {/* Table Header */}
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>R</TableCell>
                        <TableCell>S</TableCell>
                        <TableCell>T</TableCell>
                        <TableCell>IN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>MAX</TableCell>
                        <TableCell>{rMax}</TableCell>
                        <TableCell>{sMax}</TableCell>
                        <TableCell>{tMax}</TableCell>
                        <TableCell>{inMax}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MAX TIME</TableCell>
                        <TableCell>{maxRTime}</TableCell>
                        <TableCell>{maxSTime}</TableCell>
                        <TableCell>{maxTTime}</TableCell>
                        <TableCell>{maxInTime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>AVG</TableCell>
                        <TableCell>{Math.round((rAvg + Number.EPSILON) * 100) / 100}</TableCell>
                        <TableCell>{Math.round((sAvg + Number.EPSILON) * 100) / 100}</TableCell>
                        <TableCell>{Math.round((tAvg + Number.EPSILON) * 100) / 100}</TableCell>
                        <TableCell>{Math.round((inAvg + Number.EPSILON) * 100) / 100}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MIN</TableCell>
                        <TableCell>{rMin}</TableCell>
                        <TableCell>{sMin}</TableCell>
                        <TableCell>{tMin}</TableCell>
                        <TableCell>{inMin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MIN TIME</TableCell>
                        <TableCell>{minRTime}</TableCell>
                        <TableCell>{minSTime}</TableCell>
                        <TableCell>{minTTime}</TableCell>
                        <TableCell>{minInTime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>LATEST</TableCell>
                        <TableCell>{rLatest}</TableCell>
                        <TableCell>{sLatest}</TableCell>
                        <TableCell>{tLatest}</TableCell>
                        <TableCell>{inLatest}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
