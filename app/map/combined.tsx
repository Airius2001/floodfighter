'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Spin, Switch } from 'antd';

// Fix default marker icon
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

// Fit map bounds to data
function FitBounds({
  waterPoints,
  catchments,
}: {
  waterPoints: WaterFeature[];
  catchments: FloodCatchment[];
}) {
  const map = useMap();


  useEffect(() => {
    const allCoords: [number, number][] = [];

    waterPoints.forEach((wp) => {
      allCoords.push([wp.geometry.y, wp.geometry.x]);
    });

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

interface CombinedMapProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
  showWater: boolean;
  showFlood: boolean;
}

export default function CombinedMap({ showWater, showFlood, loading, setLoading }: CombinedMapProps) {
  const [waterPoints, setWaterPoints] = useState<WaterFeature[]>([]);
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);

  useEffect(() => {
    fetch('https://floodfighterbackend.onrender.com/water-data')
      .then((res) => res.json())
      .then((data) => setWaterPoints(data.features || []))
      .catch(console.error);
  }, []);

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
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: 'column',
          alignItems: "center",
        }}
      >
        <Spin className="activity-spinner" size="large" />
        <p style={{ marginTop: 10, color: '#fff' }}>Loading Map...</p>
      </div>
    );

  return (
    <MapContainer center={[-25, 133]} zoom={8} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds waterPoints={waterPoints} catchments={catchments} />

      {showWater &&
        waterPoints.map((wp, idx) => (
          <Marker key={idx} position={[wp.geometry.y, wp.geometry.x]}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.openPopup();
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.closePopup();
              },
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <h3>{wp.attributes.wstorlname}</h3>
                <p>
                  <b>Capacity:</b> {wp.attributes.total_capacity_ml} ML
                </p>
                {wp.attributes.surface_area_m2 && (
                  <p>Surface Area: {wp.attributes.surface_area_m2.toLocaleString()} m²</p>
                )}
                {wp.attributes.year_completion && <p>Year Completed: {wp.attributes.year_completion}</p>}
                {wp.attributes.state_name && <p>State: {wp.attributes.state_name}</p>}
                {wp.attributes.total_us_catchment_area_km2 && (
                  <p>Catchment Area: {wp.attributes.total_us_catchment_area_km2} km²</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

      {showFlood &&
        catchments.map((c, idx) =>
          c.geometry?.rings.map((ring, rIdx) => (
            <Polygon
              key={`${idx}-${rIdx}`}
              positions={ring.map(([lng, lat]) => [lat, lng])}
              color="blue"
              fillColor="lightblue"
              fillOpacity={0.4}
              eventHandlers={{
                mouseover: (e) => {
                  const popup = L.popup({
                    closeButton: false,
                    autoClose: false,
                    closeOnClick: false,
                  })
                    .setLatLng(e.latlng)
                    .setContent(c.name);
                  popup.addTo(e.target._map); // attach popup to map
                  (e.target as any)._hoverPopup = popup; // store reference for later
                },
                mouseout: (e) => {
                  const popup = (e.target as any)._hoverPopup;
                  if (popup) {
                    popup.remove();
                  }
                },
              }}
            />

          ))
        )}

    </MapContainer>
  );
}
