import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultMarker } from "./defaultMarker";
import { popupContent, popupHead, popupText, okText } from "./popupStyles";
import "./Map.css";


function MapComp(props) {

  const center = [props.map.lat, props.map.lon]
  return (
    <MapContainer style={{ width: "100%", height: "38vh" }} center={center} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center} icon={defaultMarker}>
        <Popup className="request-popup">
          <div style={popupContent}>
            <img
              src="https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/149_check_ok-512.png"
              width="150"
              height="150"
              alt="no img"
            />
            <div className="m-2" style={popupHead}>
              {props.map.name}
            </div>
            <span style={popupText}>
              device ID: {props.map.device_id} <br />
              abstract : {props.map.abstract} <br />
              lat : {props.map.lat} <br />
              lon : {props.map.lon}
            </span>

          </div>
        </Popup>
      </Marker>
    </MapContainer >
  );
};

export default MapComp;
