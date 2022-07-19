import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultMarker } from "./defaultMarker";
import { popupContent, popupHead, popupText, okText } from "./popupStyles";
import "./Map.css";
import { useEffect, useState } from "react";

//const center = [13.73968457, 100.52317708]
function MapComp(props) {
  const [center, setCenter] = useState({ lat: 13.73968457, lon: 100.52317708 });


  return (
    <MapContainer style={{ width: "100%", height: "38vh" }} center={center} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />


      {props.map.map((marker, index) => (
          <Marker position={[marker.device.lat, marker.device.lon]} icon={defaultMarker} key={index}>
            <Popup className="request-popup">
              <div style={popupContent}>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/149_check_ok-512.png"
                  width="150"
                  height="150"
                  alt="no img"
                />
                <div className="m-2" style={popupHead}>
                  {marker.device.name}
                </div>
                <span style={popupText}>
                  device ID: {marker.device.device_id} <br />
                  abstract : {marker.device.abstract} <br />
                  lat : {marker.device.lat} <br />
                  lon : {marker.device.lon}
                </span>

              </div>
            </Popup>
          </Marker>

      ))}


    </MapContainer >


  );
};

export default MapComp;

