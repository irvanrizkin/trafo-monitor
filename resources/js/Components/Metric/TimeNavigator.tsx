import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

export default function TimeNavigator({
    timestamp,
    enableBefore,
    enableNext,
    onBefore,
    onNext
}: {
    timestamp: string,
    enableBefore: boolean,
    enableNext: boolean,
    onBefore: () => void,
    onNext: () => void
}) {
    const date = new Date(timestamp);

    return <Stack direction={"row"} sx={{ justifyContent: 'space-between' }}>
        <IconButton
            onClick={() => onBefore()}
            disabled={!enableBefore}
        >
            <NavigateBefore />
        </IconButton>
        <Box>
            <Typography variant='h2' align='center'>{date.toLocaleTimeString()}</Typography>
            <Typography variant='h6' align='center'>{date.toLocaleDateString()}</Typography>
        </Box>
        <IconButton
            onClick={() => onNext()}
            disabled={!enableNext}
        >
            <NavigateNext />
        </IconButton>
    </Stack>
}
