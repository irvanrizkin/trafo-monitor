import {Button, Stack} from "@mui/material";
import {ButtonEndHrefProps} from "@/types/component";
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ButtonEndHref({href, text, icon, sx}: ButtonEndHrefProps) {
    return <Stack direction="row" justifyContent="end" sx={sx}>
        <Button
            href={"javascript:window.location.reload(true)"}
            variant="contained"
            endIcon={<RefreshIcon />}
            sx={{ mb: 2, mx: 2 }}>
            {"Refresh"}
        </Button>
        <Button
            href={href}
            variant="contained"
            endIcon={icon}
            sx={{ mb: 2 }}>
            {text}
        </Button>
    </Stack>
}
