import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

const socket = io("https://hire-helper-3.onrender.com", {
  transports: ["polling"],
  upgrade: false,
});

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom colored markers
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const helperIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Auto fit map to show both markers
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 2) {
      map.fitBounds(positions, { padding: [50, 50] });
    }
  }, [positions, map]);
  return null;
}

// Haversine formula
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Tracker({ presenties, role, details }) {
  const [userLocation, setUserLocation] = useState(null);
  const [helperLocation, setHelperLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [eta, setEta] = useState(null);
  const watchIdRef = useRef(null);

  const roomId = presenties?._id;
  const helperId = presenties?.helper;

  // gets user live loc
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });

        // If helper sends location to user
        if (role === "helper") {
          socket.emit("updateLocation", {
            helperId: details?._id,
            latitude,
            longitude,
            roomId
          });

          // it save to backend every 10 seconds
          fetch("https://hire-helper-3.onrender.com/api/HelperAuth/updatelocation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": sessionStorage.getItem("token")
            },
            body: JSON.stringify({ latitude, longitude })
          });
        }
      },
      (err) => console.error("Location error:", err),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [role, roomId, details]);

  // User listens for helper location updates via socket
  useEffect(() => {
    if (role === "user" && roomId) {
      socket.emit("joinRoom", roomId);

      socket.on("helperLocationUpdate", (data) => {
        setHelperLocation({
          latitude: data.latitude,
          longitude: data.longitude
        });
      });

      // Also fetch helpr loc from db
      if (helperId) {
        fetch(`https://hire-helper-3.onrender.com/api/HelperAuth/getlocation/${helperId}`, {
          headers: { "auth-token": sessionStorage.getItem("token") }
        })
          .then(res => res.json())
          .then(data => {
            if (data?.liveLocation?.latitude) {
              setHelperLocation({
                latitude: data.liveLocation.latitude,
                longitude: data.liveLocation.longitude
              });
            }
          });
      }

      return () => socket.off("helperLocationUpdate");
    }
  }, [role, roomId, helperId]);

  //  cal dis and ETA whnver loc changes
  useEffect(() => {
    if (userLocation && helperLocation) {
      const dist = getDistanceKm(
        userLocation.latitude,
        userLocation.longitude,
        helperLocation.latitude,
        helperLocation.longitude
      );
      setDistance(dist.toFixed(2));

      //speeds 
      const walkingMins = Math.ceil((dist / 5) * 60);
      const drivingMins = Math.ceil((dist / 30) * 60);
      setEta({ walking: walkingMins, driving: drivingMins });
    }
  }, [userLocation, helperLocation]);

  const positions = [
    userLocation && [userLocation.latitude, userLocation.longitude],
    helperLocation && [helperLocation.latitude, helperLocation.longitude]
  ].filter(Boolean);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* ETA Card */}
      {distance && eta && (
        <div style={{
          background: "#3399cc",
          color: "white",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center"
        }}>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>
              {distance} km
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>Distance</div>
          </div>

          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>
              ~{eta.driving} min
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              🚗 By vehicle
            </div>
          </div>

          <div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>
              ~{eta.walking} min
            </div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              🚶 Walking
            </div>
          </div>
        </div>
      )}

      {/* loc status mesgs */}
      {!userLocation && (
        <p style={{ color: "#888", textAlign: "center" }}>
          📍 Getting your location...
        </p>
      )}
      {role === "user" && !helperLocation && (
        <p style={{ color: "#888", textAlign: "center" }}>
          ⏳ Waiting for helper to share location...
        </p>
      )}

   
      <MapContainer
        center={userLocation
          ? [userLocation.latitude, userLocation.longitude]
          : [20.5937, 78.9629] // India center default
        }
        zoom={13}
        style={{ height: "400px", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />

        {/*marks ur user */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <b>📍 You are here</b>
            </Popup>
          </Marker>
        )}

        {/* marks ur helpr */}
        {helperLocation && (
          <Marker
            position={[helperLocation.latitude, helperLocation.longitude]}
            icon={helperIcon}
          >
            <Popup>
              <b>🔧 Helper location</b>
              {distance && <p>{distance} km away</p>}
            </Popup>
          </Marker>
        )}

        {/* prodiuces Line between the  user and th hired helper */}
        {positions.length === 2 && (
          <Polyline
            positions={positions}
            color="#3399cc"
            weight={3}
            dashArray="8 8"
          />
        )}

        {/* Auto fit map */}
        {positions.length === 2 && (
          <FitBounds positions={positions} />
        )}
      </MapContainer>

      {/* Legend */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "12px",
        fontSize: "13px",
        color: "#666"
      }}>
        <span>🔵 You</span>
        <span>🔴 Helper</span>
        <span>--- Route</span>
      </div>
    </div>
  );
}

export default Tracker;

