import mapboxgl from 'mapbox-gl';
import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMap = (mapContainer: RefObject<HTMLDivElement>, map: MutableRefObject<mapboxgl.Map>, mapboxApiAccessToken: string) => {
    mapboxgl.accessToken = mapboxApiAccessToken;
    map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.4194, 37.7749],
        zoom: 12,
      });
};

const initGeocoder = (geocoder: MutableRefObject<MapboxGeocoder>) => {
    geocoder.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        placeholder: 'Search for an address',
      });
};

const addMapControls = (map: MutableRefObject<mapboxgl.Map>, geocoder: MutableRefObject<MapboxGeocoder>) => {
    map.current.addControl(geocoder.current);
};

const geocoderResult = (
    geocoder: MutableRefObject<MapboxGeocoder>, 
    map: MutableRefObject<mapboxgl.Map>, 
    marker: MutableRefObject<mapboxgl.Marker>, 
    setAddress: Dispatch<SetStateAction<string>>, 
    addresse: string) => {

    geocoder.current.on('result', (event: { result: { place_name: string, center: any}}) => {
        const coordinates = event.result.center;
        setAddress(event.result.place_name);
        map.current?.flyTo({ center: coordinates });
        if (marker.current) {
          marker.current.setLngLat(coordinates);
        } else {
          marker.current = new mapboxgl.Marker().setLngLat(coordinates).addTo(map.current!);
        }
      });
      
      geocoder.current.query(addresse);
};

export const MapboxService = {
    initMap,
    initGeocoder,
    addMapControls,
    geocoderResult,
};