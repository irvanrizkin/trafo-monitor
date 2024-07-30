import {Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import { Trafo } from "@/types";

export default function TrafoCard({ trafo, version }: { trafo: Trafo, version: number }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {trafo.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(trafo.created_at).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={
                    version === 1
                        ? route('trafo.show', trafo.id)
                        : route('v2.trafo.show', trafo.id)
                }>More Info</Button>
            </CardActions>
        </Card>
    );
}
