import {AppBarTripleProps} from "@/types/component";
import {AppBar, Toolbar, Typography} from "@mui/material";

export default function AppBarTriple({ startText, middleText, endText }: AppBarTripleProps) {
    return <AppBar>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
                {startText}
            </Typography>
            <Typography variant="h6" noWrap component="div">
                {middleText}
            </Typography>
            <Typography variant="h6" noWrap component="div">
                {endText}
            </Typography>
        </Toolbar>
    </AppBar>
}
