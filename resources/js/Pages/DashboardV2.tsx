import {Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography} from "@mui/material";
import {DashboardProps} from "@/types";
import TrafoCard from "@/Components/Trafo/TrafoCard";

export default function DashboardV2({ auth, trafos } : DashboardProps ) {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Daftar Trafo
                </Typography>
                <Grid container spacing={2}>
                    {trafos.map((trafo) => (
                        <Grid item key={trafo.id} xs={12} sm={6} md={4}>
                            <TrafoCard trafo={trafo} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
