import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {ParameterInfoCardProps} from "@/types";

export default function ParameterInfoCard(props: ParameterInfoCardProps) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">
                    <b>{props.title}</b>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <CardActions>
                    <Button size="small">Open Chart</Button>
                </CardActions>
            </CardActions>
        </Card>
    )
}
