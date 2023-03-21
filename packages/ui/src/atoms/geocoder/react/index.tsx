import React, { useMemo, useState } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  onResultSelected: (result: any) => void;
  accessToken: string;
}

const Geocoder: React.FC<Props> = ({ onResultSelected, accessToken }) => {
    mapboxgl.accessToken = accessToken;;
  const [query, setQuery] = useState("");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    onResultSelected(data.features);
  };

  useMemo(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <input type="text" value={query} placeholder="Location" onChange={handleQueryChange} />
    </div>
  );
};

export default Geocoder;