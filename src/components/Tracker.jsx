//it has to be implemented where we will be using helpers geospatial coordinates so that their live location can be tracked
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Tracker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map("map").setView([0, 0], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!markerRef.current) {
          markerRef.current = L.marker([latitude, longitude])
            .addTo(mapRef.current)
            .bindPopup("Live location 📍")
            .openPopup();
        } else {
          markerRef.current.setLatLng([latitude, longitude]);
        }

        mapRef.current.setView([latitude, longitude], 16);
      },
      (err) => {
        console.error(err);
        alert("Enable location access");
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default Tracker;

