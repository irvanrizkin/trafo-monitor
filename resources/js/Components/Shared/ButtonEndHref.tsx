import {Button, Stack} from "@mui/material";
import {ButtonEndHrefProps} from "@/types/component";

export default function ButtonEndHref({href, text, icon, sx}: ButtonEndHrefProps) {
    return <Stack direction="row" justifyContent="end" sx={sx}>
        <Button
            href={href}
            variant="contained"
            endIcon={icon}
            sx={{ mb: 2 }}>
            {text}
        </Button>
    </Stack>
}
