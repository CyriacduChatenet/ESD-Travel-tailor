import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  onResultSelected: (result: any) => void;
  accessToken: string;
  geocoderQuery: string;
  setGeocoderQuery: Dispatch<SetStateAction<string>>;
}

const Geocoder: React.FC<Props> = ({ onResultSelected, accessToken, geocoderQuery, setGeocoderQuery }) => {
    mapboxgl.accessToken = accessToken;;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeocoderQuery(event.target.value);
  };

  const handleSearch = async () => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      geocoderQuery
    )}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    onResultSelected(data.features);
  };

  useMemo(() => {
    handleSearch();
  }, [geocoderQuery]);

  return (
    <div>
      <input type="text" value={geocoderQuery} placeholder="Location" onChange={handleQueryChange} />
    </div>
  );
};

export default Geocoder;