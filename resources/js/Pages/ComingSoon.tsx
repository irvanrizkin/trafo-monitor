import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";

export default function ComingSoon() {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Coming Soon
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h6" noWrap component="div" align="center">
                        Fitur masih dalam pengembangan
                    </Typography>
                </Box>
            </Container>
        </>
    )
}
