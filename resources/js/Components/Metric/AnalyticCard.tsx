import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Props } from "@/types";
import { Icon } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

type AnalyticCardProps = Props & {
    parameter: string;
    value: number;
    detail: string;
    color: string;
};

export default function AnalyticCard(props: AnalyticCardProps) {
    const { parameter, value, detail, color } = props;

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        gutterBottom
                        sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                        {parameter}
                    </Typography>
                    <Icon
                        component={CircleIcon}
                        sx={{
                            color: color,
                        }}
                    />
                </div>
                <Typography variant="h5" component="div">
                    {(value ?? 0).toFixed(5)}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    {detail}
                </Typography>
            </CardContent>
        </Card>
    );
}
