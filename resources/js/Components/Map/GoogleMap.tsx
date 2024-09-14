import GoogleMapReact from "google-map-react";
import {GoogleMapProps} from "@/types/component";
import {Box} from "@mui/material";

export default function GoogleMap({ lat, lng, title, height }: GoogleMapProps) {
    const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
    const defaultProps = {
        center: {
            lat: lat,
            lng: lng,
        },
        zoom: 15,
    }

    const renderMarker = (map: any, maps: any) => {
        return new maps.Marker({
            position: {
                lat: lat,
                lng: lng,
            },
            map,
            title: title
        });
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: height,
                display: 'flex'
            }}
            component="map"
        >
            <GoogleMapReact
                bootstrapURLKeys={{ key: mapApiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
            />
        </Box>
    )
}
