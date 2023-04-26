import { FC, useRef } from '@travel-tailor/functions'
import { useMapbox } from '@travel-tailor/hooks';

import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import '../../../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import styles from './style.module.scss';


interface IProps {
  mapboxApiAccessToken: string
  addresse: string
}

export const WebMapbox: FC<IProps> = ({ mapboxApiAccessToken, addresse }) => {

  const mapContainer = useRef<HTMLDivElement>(null);

  useMapbox(mapContainer, mapboxApiAccessToken, addresse);
  
  return (
    <div className={styles.map} ref={mapContainer} />
  )
}
