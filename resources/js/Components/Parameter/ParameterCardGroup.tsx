import {Card, CardContent, Grid, Typography} from "@mui/material";
import {ParameterCardGroupProps} from "@/types";

export default function ParameterCardGroup(props: ParameterCardGroupProps){
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            <b>Min</b>
                        </Typography>
                        <Typography variant="h4" textAlign="center">
                            <b>{props.min === null ? '?' : props.min}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            <b>Count</b>
                        </Typography>
                        <Typography variant="h4" textAlign="center">
                            <b>{props.count === null ? '?' : props.count}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                            <b>Max</b>
                        </Typography>
                        <Typography variant="h4" textAlign="center">
                            <b>{props.max === null ? '?' : props.max}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
