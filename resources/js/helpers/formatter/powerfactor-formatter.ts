import { amber, green, grey, red } from "@mui/material/colors";

export function powerFactorFormatter(status: string) {
    if (status === 'normal') {
        return {
            color: green[500],
            text: 'Ideal'
        }
    }
    if (status === 'warning') {
        return {
            color: amber[500],
            text: 'Lagging'
        }
    }
    if (status === 'danger') {
        return {
            color: red[300],
            text: 'Leading'
        }
    }
    return {
        color: grey[500],
        text: '-'
    }
}