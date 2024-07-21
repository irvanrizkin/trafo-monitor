import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {ParameterInfoCardProps} from "@/types";

export default function ParameterInfoCard(props: ParameterInfoCardProps) {
    const {title, trafoId, description} = props;
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">
                    <b>{title}</b>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <CardActions>
                    <Button size="small" href={`/v2/trafo/${trafoId}/${title.toLowerCase()}`}>Open Chart</Button>
                </CardActions>
            </CardActions>
        </Card>
    )
}
