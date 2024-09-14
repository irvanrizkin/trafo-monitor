import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {AggregationRSTOnlyProps} from "@/types/component";

export default function AggregationRSTOnly({
                                           rMax,
                                           sMax,
                                           tMax,
                                           rMin,
                                           sMin,
                                           tMin,
                                           rAvg,
                                           sAvg,
                                           tAvg,
                                       }: AggregationRSTOnlyProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
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
                </TableBody>
            </Table>
        </TableContainer>
    )
}
