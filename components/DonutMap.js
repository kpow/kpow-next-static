import React from "react";
import {
  usePaginatedQuery,
  useQueryCache,
  ReactQueryCacheProvider,
  QueryCache
} from 'react-query';
import fetchDonuts from '../api/fetchDonuts.js';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function DonutMap() {

  const {
    status,
    resolvedData,
    latestData,
    error,
    isFetching,
  } = usePaginatedQuery(['donuts', 1, 100], fetchDonuts, {})

  return (  
        <MapContainer center={[37.791883, -122.4212]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {resolvedData &&
              resolvedData.bizData.map((article) => (                     
                <Marker 
                  key={article.name} 
                  position={[article.coordinates.latitude, article.coordinates.longitude]}
                >
                    <Popup>
                    {article.name}
                    </Popup>
                </Marker>))
          } 

        </MapContainer>
        
  );
}