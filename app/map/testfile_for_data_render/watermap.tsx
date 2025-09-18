"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Resolve the issue of the default marker icon not displaying.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface WaterFeature {
  geometry: { x: number; y: number };
  attributes: {
    wstorlname: string;
    total_capacity_ml: number;
    surface_area_m2?: number;
    year_completion?: number;
    state_name?: string;
    total_us_catchment_area_km2?: number;
    [key: string]: any;
  };
}

export default function WaterMap() {
  const [features, setFeatures] = useState<WaterFeature[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://bom-cache-worker.yxin0038.workers.dev/water-data");
    const data = await res.json();
    console.log(data); // debugging 
    setFeatures(data.features);
  };
  fetchData();
}, []);

  return (
    <MapContainer
      center={[-25, 133]}
      zoom={4}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {features.map((feature, idx) => {
        const { x, y } = feature.geometry;
        const attrs = feature.attributes;

        return (
          <Marker key={idx} position={[y, x]}>
            <Popup>
              <div style={{ minWidth: 200 }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{attrs.wstorlname}</h3>
                <p style={{ margin: "2px 0" }}>
                  <b>Capacity:</b> {attrs.total_capacity_ml} ML
                </p>
                {attrs.surface_area_m2 && (
                  <p style={{ margin: "2px 0" }}>
                    <b>Surface Area:</b> {attrs.surface_area_m2.toLocaleString()} m²
                  </p>
                )}
                {attrs.year_completion && (
                  <p style={{ margin: "2px 0" }}>
                    <b>Year Completed:</b> {attrs.year_completion}
                  </p>
                )}
                {attrs.state_name && (
                  <p style={{ margin: "2px 0" }}>
                    <b>State:</b> {attrs.state_name}
                  </p>
                )}
                {attrs.total_us_catchment_area_km2 && (
                  <p style={{ margin: "2px 0" }}>
                    <b>Catchment Area:</b> {attrs.total_us_catchment_area_km2} km²
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
