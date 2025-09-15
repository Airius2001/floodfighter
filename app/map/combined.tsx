'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

// Convert the reservoir returned by the Worker to the GeoJSON → existing ArcGIS style
function adaptWaterGeoJSON(geojson: any): WaterFeature[] {
  if (!geojson || !geojson.features) return [];
  return geojson.features.map((f: any) => ({
    geometry: { x: f.geometry.coordinates[0], y: f.geometry.coordinates[1] },
    attributes: {
      wstorlname: f.properties.wstorlname,
      total_capacity_ml: f.properties.total_capacity_ml,
      surface_area_m2: f.properties.surface_area_m2,
      year_completion: f.properties.year_completion,
      state_name: f.properties.state_name,
      total_us_catchment_area_km2: f.properties.total_us_catchment_area_km2,
    },
  }));
}

// Convert the flood returned by the Worker to the GeoJSON → existing ArcGIS style
function adaptFloodGeoJSON(geojson: any): FloodCatchment[] {
  if (!geojson || !geojson.features) return [];
  return geojson.features.map((f: any) => {
    let rings: number[][][] = [];
    if (f.geometry.type === 'Polygon') {
      rings = f.geometry.coordinates.map((ring: number[][]) =>
        ring.map(([lng, lat]) => [lng, lat])
      );
    } else if (f.geometry.type === 'MultiPolygon') {
      rings = f.geometry.coordinates.flat().map((ring: number[][]) =>
        ring.map(([lng, lat]) => [lng, lat])
      );
    }
    return {
      name: f.properties?.name || 'Unnamed',
      geometry: { rings },
    };
  });
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
  showWater: boolean;
  showFlood: boolean;
}

export default function CombinedMap({ showWater, showFlood }: CombinedMapProps) {
  const [waterPoints, setWaterPoints] = useState<WaterFeature[]>([]);
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://bom-cache-worker.yxin0038.workers.dev/water?where=1=1&resultRecordCount=200')
      .then((res) => res.json())
      .then((data) => setWaterPoints(adaptWaterGeoJSON(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('https://bom-cache-worker.yxin0038.workers.dev/flood?where=1=1&resultRecordCount=200')
      .then((res) => res.json())
      .then((data) => {
        setCatchments(adaptFloodGeoJSON(data));
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <div>Loading map...</div>;

  return (
    <MapContainer center={[-25, 133]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds waterPoints={waterPoints} catchments={catchments} />

      {showWater &&
        waterPoints.map((wp, idx) => (
          <Marker key={idx} position={[wp.geometry.y, wp.geometry.x]}>
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
            >
              <Popup>{c.name}</Popup>
            </Polygon>
          ))
        )}
    </MapContainer>
  );
}
