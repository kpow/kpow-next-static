import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function DonutMap() {

  return (  
        <MapContainer center={[37.791883, -122.4212]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[37.791883, -122.4212]}>
              <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
          </Marker>
        </MapContainer>
  );
}