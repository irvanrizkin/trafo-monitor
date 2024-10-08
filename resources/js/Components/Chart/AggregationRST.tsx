import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AggregationRSTProps} from "@/types/component";

export default function AggregationRST({
                                           rMax,
                                           sMax,
                                           tMax,
                                           rMin,
                                           sMin,
                                           tMin,
                                           rAvg,
                                           sAvg,
                                           tAvg,
                                           rLatest,
                                           sLatest,
                                           tLatest,
                                           maxRTime,
                                           maxSTime,
                                           maxTTime,
                                           minRTime,
                                           minSTime,
                                           minTTime
                                       }: AggregationRSTProps) {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>MAX</TableCell>
                        <TableCell>{rMax}</TableCell>
                        <TableCell>{sMax}</TableCell>
                        <TableCell>{tMax}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MAX TIME</TableCell>
                        <TableCell>{maxRTime}</TableCell>
                        <TableCell>{maxSTime}</TableCell>
                        <TableCell>{maxTTime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>AVG</TableCell>
                        <TableCell>{Math.round((rAvg + Number.EPSILON) * 100) / 100}</TableCell>
                        <TableCell>{Math.round((sAvg + Number.EPSILON) * 100) / 100}</TableCell>
                        <TableCell>{Math.round((tAvg + Number.EPSILON) * 100) / 100}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MIN</TableCell>
                        <TableCell>{rMin}</TableCell>
                        <TableCell>{sMin}</TableCell>
                        <TableCell>{tMin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>MIN TIME</TableCell>
                        <TableCell>{minRTime}</TableCell>
                        <TableCell>{minSTime}</TableCell>
                        <TableCell>{minTTime}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>LATEST</TableCell>
                        <TableCell>{rLatest}</TableCell>
                        <TableCell>{sLatest}</TableCell>
                        <TableCell>{tLatest}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
