import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./VetLocator.css"; // Import custom CSS file for design

// Component to update the map view dynamically with slower animation
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 3.5 }); // Slower animation
  }, [center, zoom, map]);
  return null;
};

const VetLocator = () => {
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lon: 78.9629 }); // Default to India's geographic center
  const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level
  const [location, setLocation] = useState("");
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentCoordinates({ lat: latitude, lon: longitude });
          setMapCenter({ lat: latitude, lon: longitude });
          setZoomLevel(13); // Initial zoom for the user's location
          await fetchVets(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Failed to get current location. Please allow location access.");
        }
      );
    };
    fetchCurrentLocation();
  }, []);

  const fetchVets = async (lat, lon) => {
    try {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];
        (
          node["amenity"="veterinary"](around:20000,${lat},${lon});
          node["healthcare"="veterinary"](around:20000,${lat},${lon});
          node["office"="veterinary"](around:20000,${lat},${lon});
        );
        out;`;

      const response = await axios.get(overpassUrl, { timeout: 10000 });
      if (response.data && response.data.elements) {
        const vetData = response.data.elements;
        setVets(vetData);

        // Find the nearest vet
        const nearestVet = vetData
          .map((vet) => ({
            ...vet,
            distance: calculateDistance(lat, lon, vet.lat, vet.lon),
          }))
          .sort((a, b) => a.distance - b.distance)[0];

        // Zoom to the nearest vet if found
        if (nearestVet) {
          setMapCenter({ lat: nearestVet.lat, lon: nearestVet.lon });
          setZoomLevel(15); // Zoom closer to the nearest vet
        }
      } else {
        setVets([]);
        console.warn("No veterinary hospitals found in the response.");
      }
    } catch (error) {
      console.error("Error fetching veterinary hospital data:", error);
      alert("Failed to fetch veterinary hospital data. Please try again.");
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.target.id === "searchButton") {
      if (!location.trim()) {
        alert("Please enter a location.");
        return;
      }

      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

        if (!apiKey) {
          alert("API key for OpenWeather is missing.");
          setLoading(false);
          return;
        }

        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          location
        )}&limit=1&appid=${apiKey}`;

        const response = await axios.get(geocodeUrl, { timeout: 10000 });

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setMapCenter({ lat, lon });
          setZoomLevel(13); // Zoom to the searched location
          await fetchVets(lat, lon);
        } else {
          alert("Location not found. Please try a different search term.");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        alert("Failed to fetch location data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="vet-locator-container">
      <div className="sidebar">
        <h1>Vet Locator</h1>
        <div className="search-bar">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Enter location (e.g., city or town)"
          />
          <button id="searchButton" onClick={handleSearch}>Search</button>
        </div>
        <div className="nearby-list">
          <h3>Nearby Veterinary Hospitals:</h3>
          {loading && <p>Loading...</p>}
          {vets.length > 0 ? (
            <ul>
              {vets.map((vet, index) => (
                <li key={index}>
                  <strong>Name:</strong> {vet.tags?.name || "Not available"}
                  <br />
                  <strong>Location:</strong> Lat: {vet.lat}, Lon: {vet.lon}
                </li>
              ))}
            </ul>
          ) : (
            <p>No veterinary hospitals found nearby.</p>
          )}
        </div>
        <Link to="/">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>

      <MapContainer
        center={[mapCenter.lat, mapCenter.lon]}
        zoom={zoomLevel}
        className="map-container"
      >
        <MapUpdater center={[mapCenter.lat, mapCenter.lon]} zoom={zoomLevel} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {currentCoordinates && (
          <Marker position={[currentCoordinates.lat, currentCoordinates.lon]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {vets.map((vet, index) => (
          <Marker key={index} position={[vet.lat, vet.lon]}>
            <Popup>{vet.tags?.name || "Veterinary Hospital"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VetLocator;