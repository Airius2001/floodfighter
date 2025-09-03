"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Resolve the issue of the default marker icon not displaying
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface WaterFeature {
  geometry: { x: number; y: number };
  attributes: { WaterBody: string; CapacityML: number };
}

export default function WaterMap() {
  const [features, setFeatures] = useState<WaterFeature[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/water-data"); // NestJS back-end interface (only for localhost, didn't deploy backend yet)
      const data = await res.json();
      setFeatures(data.features);
    };
    fetchData();
  }, []);

  return (
    <MapContainer center={[-25, 133]} zoom={4} style={{ height: "90vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {features.map((feature, idx) => {
        const { x, y } = feature.geometry;
        return (
          <Marker key={idx} position={[y, x]}>
            <Popup>
              <b>{feature.attributes.WaterBody}</b>
              <br />
              Capacity: {feature.attributes.CapacityML} ML
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
