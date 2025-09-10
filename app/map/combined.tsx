'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Spin, Switch } from 'antd';

// Fix the issue of default marker icon not displaying.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
  };
}

interface FloodCatchment {
  name: string;
  geometry: { rings: number[][][] } | null;
}

// Auxiliary component: automatically adjust map boundaries
function FitBounds({ waterPoints, catchments }: { waterPoints: WaterFeature[]; catchments: FloodCatchment[] }) {
  const map = useMap();

  useEffect(() => {
    const allCoords: [number, number][] = [];

    // Reservoir point
    waterPoints.forEach((wp) => {
      allCoords.push([wp.geometry.y, wp.geometry.x]);
    });

    // Flood Polygon
    catchments.forEach((c) => {
      c.geometry?.rings.forEach((ring) => {
        ring.forEach(([lng, lat]) => allCoords.push([lat, lng]));
      });
    });

    if (allCoords.length) {
      map.fitBounds(L.latLngBounds(allCoords), { padding: [20, 20] });
    }
  }, [waterPoints, catchments, map]);

  return null;
}

export default function CombinedMap() {
  const [waterPoints, setWaterPoints] = useState<WaterFeature[]>([]);
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);
  const [loading, setLoading] = useState(true);

  const [showWater, setShowWater] = useState(true);
  const [showFlood, setShowFlood] = useState(true);

  // Loading reservoir points
  useEffect(() => {
    fetch('https://floodfighterbackend.onrender.com/water-data')
      .then((res) => res.json())
      .then((data) => {
        setWaterPoints(data.features || []);
      })
      .catch(console.error);
  }, []);

  // Load flood area
  useEffect(() => {
    fetch('https://floodfighterbackend.onrender.com/flood')
      .then((res) => res.json())
      .then((data) => {
        const features = Array.isArray(data) ? data : [];
        setCatchments(features.filter((f) => f.geometry && Array.isArray(f.geometry.rings)));
        setLoading(false);
      })
      .catch(console.error);
  }, []);

if (loading)
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: "center",
      }}
    >
      <Spin size="large" />
      <p>Loading Map...</p>
    </div>
  );
  
  return (
    <div>

<div style={{ marginBottom: "10px", display:'flex', flexWrap:'wrap',  gap: "8px" }}>
  <label style={{ marginRight: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
    <Switch
      checked={showFlood}
      onChange={() => setShowFlood(!showFlood)}
      checkedChildren="Show"
      unCheckedChildren="Hide"
      style={{ backgroundColor: showFlood ? "#000" : "#9ca3af" }}
    />
    <span>Flood Warning Catchments</span>
  </label>

  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <Switch
      checked={showWater}
      onChange={() => setShowWater(!showWater)}
      checkedChildren="Show"
      unCheckedChildren="Hide"
      style={{ backgroundColor: showWater ? "#000" : "#9ca3af" }}
    />
    <span>Water Storage Points</span>
  </label>
</div>


      <MapContainer center={[-25, 133]} zoom={4} style={{ height: '90vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FitBounds waterPoints={waterPoints} catchments={catchments} />

        {/* Reservoir Marker */}
        {showWater &&
          waterPoints.map((wp, idx) => (
            <Marker key={idx} position={[wp.geometry.y, wp.geometry.x]}>
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <h3>{wp.attributes.wstorlname}</h3>
                  <p>
                    <b>Capacity:</b> {wp.attributes.total_capacity_ml} ML
                  </p>
                  {wp.attributes.surface_area_m2 && <p>Surface Area: {wp.attributes.surface_area_m2.toLocaleString()} m²</p>}
                  {wp.attributes.year_completion && <p>Year Completed: {wp.attributes.year_completion}</p>}
                  {wp.attributes.state_name && <p>State: {wp.attributes.state_name}</p>}
                  {wp.attributes.total_us_catchment_area_km2 && <p>Catchment Area: {wp.attributes.total_us_catchment_area_km2} km²</p>}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* flood Polygon */}
        {showFlood &&
          catchments.map((c, idx) =>
            c.geometry?.rings.map((ring, rIdx) => (
              <Polygon
                key={`${idx}-${rIdx}`}
                positions={ring.map(([lng, lat]) => [lat, lng])}
                color="blue"
                fillColor="lightblue"
                fillOpacity={0.4}
              >
                <Popup>{c.name}</Popup>
              </Polygon>
            ))
          )}
      </MapContainer>
    </div>
  );
}
