export default function defaultCenter ({
    lat,
    lng,
    zoom,
    isTrafoEmpty,
                                       }: {
    lat: number;
    lng: number;
    zoom: number;
    isTrafoEmpty: boolean;
}) {
    if (isTrafoEmpty) {
        return {
            center: {
                lat: -7.973640723121185,
                lng: 112.63782050691506,
            },
            zoom: 9,
        };
    }
    return {
        center: {
            lat: lat,
            lng: lng,
        },
        zoom: zoom,
    };
}
