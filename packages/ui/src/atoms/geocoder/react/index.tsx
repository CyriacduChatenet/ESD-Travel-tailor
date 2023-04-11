import React, { Dispatch, SetStateAction, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import { GeocoderService } from "@travel-tailor/services";

interface Props {
  setResults: Dispatch<SetStateAction<mapboxgl.MapboxGeoJSONFeature[]>>;
  accessToken: string;
  geocoderQuery: string;
  setGeocoderQuery: Dispatch<SetStateAction<string>>;
  placeholder: string;
  value?: string | number;
}

const Geocoder: React.FC<Props> = ({ setResults, accessToken, geocoderQuery, setGeocoderQuery, placeholder, value }) => {
    mapboxgl.accessToken = accessToken;;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeocoderQuery(event.target.value);
  };

  useMemo(async () => {
    await GeocoderService.searchCity(geocoderQuery, accessToken, setResults);
  }, [geocoderQuery]);

  return (
    <div>
      <input type="text" value={value ? value : geocoderQuery} placeholder={placeholder} onChange={handleQueryChange} />
    </div>
  );
};

export default Geocoder;