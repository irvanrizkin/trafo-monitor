import {blue} from "@mui/material/colors";
import {CSSProperties} from "react";

export default function CustomMarker(props: { text: string, lat: number, lng: number }) {
    const K_WIDTH = 40;
    const K_HEIGHT = 40;

    const style: CSSProperties = {
        position: 'absolute',
        left: -K_WIDTH / 2,
        top: -K_HEIGHT / 2,

        border: `5px solid ${blue[500]}`,
        backgroundColor: 'white',
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 4
    }

    return <div style={style}>{props.text}</div>
}
