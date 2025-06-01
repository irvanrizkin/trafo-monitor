import { amber, deepOrange, green, grey, red } from "@mui/material/colors";

export default function statusFormatterColor(status: string) {
    if (status === "normal") {
        return green[500];
    }
    if (status === "warning") {
        return amber[500];
    }
    if (status === "alert") {
        return deepOrange[500];
    }
    if (status === "danger") {
        return red[300];
    }
    return grey[500];
}
