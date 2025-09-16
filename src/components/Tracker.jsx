import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Tracker = () => {
  useEffect(() => {
    // If map is already initialized, remove it
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    const map = L.map("map").setView([28.6139, 77.2090], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([28.6139, 77.2090])
      .addTo(map)
      .bindPopup("You are here 📍")
      .openPopup();

    return () => {
      map.remove(); // cleanup on unmount
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default Tracker;
