import { Dispatch, FC, SetStateAction, useState } from "react";
import mapboxgl from "mapbox-gl";

import Geocoder from "../../geocoder/react";

interface IProps {
    mapboxAccessToken: string
    setStateCredentials: Dispatch<SetStateAction<any>>
    stateCredentials: any,
    objectKey: string
};

export const WebLocationInput:FC<IProps> = ({ mapboxAccessToken, setStateCredentials, stateCredentials, objectKey }) => {
    const [results, setResults] = useState<mapboxgl.MapboxGeoJSONFeature[]>([]);
    const [hideAutocomplete, setHideAutocomplete] = useState(true);
    const [geocoderQuery, setGeocoderQuery] = useState('');

    const handleCredentials = (value: string) => {
        setStateCredentials({ ...stateCredentials, [objectKey]: value })
        setGeocoderQuery(value);
    };

    return (
        <div onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
        <Geocoder setResults={setResults} accessToken={mapboxAccessToken} geocoderQuery={geocoderQuery} setGeocoderQuery={setGeocoderQuery} placeholder={objectKey} />
        <ul>
          {!hideAutocomplete ? results.map((result: any) => (
            <li key={result.id} onClick={() => handleCredentials(result.place_name)}>{result.place_name}</li>
          )) : null}
        </ul>
      </div>
    );
}