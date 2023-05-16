import { FC, useRef } from '@travel-tailor/functions'
import { useMapbox } from '@travel-tailor/hooks';

import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'


interface IProps {
  mapboxApiAccessToken: string
  addresse: string
}

export const Mapbox = ({ mapboxApiAccessToken, addresse }: IProps) => {

  const mapContainer = useRef<HTMLDivElement>(null);

  useMapbox(mapContainer, mapboxApiAccessToken, addresse);
  
  return (
    <div ref={mapContainer} />
  )
}