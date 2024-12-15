import { OrderTableBodyV2Props } from "@/types/component";
import {TableBody, TableCell, TableRow} from "@mui/material";

export default function OrderTableBodyV2({key, orderName, rValue, sValue, tValue}: OrderTableBodyV2Props) {
    return <TableBody>
        <TableRow
            key={key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {orderName}
            </TableCell>
            <TableCell align="right">{rValue}</TableCell>
            <TableCell align="right">{sValue}</TableCell>
            <TableCell align="right">{tValue}</TableCell>
        </TableRow>
    </TableBody>
}
