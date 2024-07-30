import {DashboardProps} from '@/types';
import {Box, Container, Grid, Typography} from "@mui/material";
import TrafoCard from "@/Components/Trafo/TrafoCard";

export default function Dashboard({ trafos }: DashboardProps) {
    return (
        <Container maxWidth={"md"}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Daftar Trafo V1
                </Typography>
                <Grid container spacing={2} mt={1.5}>
                    {trafos.map((trafo) => (
                        <Grid item key={trafo.id} xs={12} sm={6} md={4}>
                            <TrafoCard
                                trafo={trafo}
                                version={1}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
