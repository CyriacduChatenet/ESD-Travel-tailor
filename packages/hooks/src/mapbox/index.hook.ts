import { RefObject, useEffect, useRef, useState } from "react";
import { MapboxService } from '@travel-tailor/services';

export const useMapbox = (mapContainer: RefObject<HTMLDivElement>, mapboxApiAccessToken: string, addresse: string) => {
    const map = useRef<mapboxgl.Map | any>(null);
    const marker = useRef<mapboxgl.Marker | any>(null);
    const geocoder = useRef<MapboxGeocoder | any>(null);

    const [address, setAddress] = useState(addresse);

    useEffect(() => {
        if (mapContainer.current && !map.current) {
            MapboxService.initMap(mapContainer, map, mapboxApiAccessToken);
            MapboxService.initGeocoder(geocoder);

            setAddress(addresse);

            if (map.current && geocoder.current) {
                MapboxService.addMapControls(map, geocoder);
            }

            if (geocoder.current) {
                MapboxService.geocoderResult(geocoder, map, marker, setAddress, addresse);
            }
        }
    }, [mapContainer]);
};