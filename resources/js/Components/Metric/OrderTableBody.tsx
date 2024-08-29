import {OrderTableBodyProps} from "@/types/component";
import {TableBody, TableCell, TableRow} from "@mui/material";

export default function OrderTableBody({key, orderName, order}: OrderTableBodyProps) {
    return <TableBody>
        <TableRow
            key={key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {orderName}
            </TableCell>
            <TableCell align="right">{order.r}</TableCell>
            <TableCell align="right">{order.s}</TableCell>
            <TableCell align="right">{order.t}</TableCell>
        </TableRow>
    </TableBody>
}
