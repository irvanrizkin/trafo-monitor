import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";

export default function NotFound() {
    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Not Found
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ pt: 6 }}>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h6" noWrap component="div" align="center">
                        Trafo Tidak Ditemukan
                    </Typography>
                </Box>
            </Container>
        </>
    )
}
