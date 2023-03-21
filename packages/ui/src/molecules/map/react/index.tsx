import { FC, useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../../../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import './index.scss';


interface IProps {
  mapboxApiAccessToken: string
  addresse: string
}

export const WebMapbox: FC<IProps> = ({ mapboxApiAccessToken, addresse }) => {
  mapboxgl.accessToken = mapboxApiAccessToken;

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);

  const [address, setAddress] = useState(addresse);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-122.4194, 37.7749],
        zoom: 12,
      });
  
      geocoder.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        placeholder: 'Search for an address',
      });
  
      setAddress(addresse);
  
      if (map.current && geocoder.current) {
        map.current.addControl(geocoder.current);
      }
  
      if (geocoder.current) {
        geocoder.current.on('result', (event: any) => {
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
      }
    }
  }, [mapContainer]);
  
  return (
    <div style={{ width: '100em', height: '60em' }} ref={mapContainer} />
  )
}
