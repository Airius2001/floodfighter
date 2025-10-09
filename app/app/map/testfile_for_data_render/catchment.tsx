'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface FloodCatchment {
  name: string;
  geometry: {
    rings: number[][][];
  } | null;
}

// Auxiliary components: Automatically adjust the map boundaries based on all coordinates.
function FitBounds({ catchments }: { catchments: FloodCatchment[] }) {
  const map = useMap();

  useEffect(() => {
    const allCoords: [number, number][] = [];
    catchments.forEach((c) => {
      c.geometry?.rings.forEach((ring) => {
        ring.forEach(([lng, lat]) => {
          allCoords.push([lat, lng]); // Leaflet coordinate order
        });
      });
    });
    if (allCoords.length > 0) {
      map.fitBounds(L.latLngBounds(allCoords), { padding: [20, 20] });
    }
  }, [catchments, map]);

  return null;
}

export default function FloodMap() {
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://bom-cache-worker.yxin0038.workers.dev/flood/catchments')
      .then((res) => res.json())
      .then((data) => {
        // Error prevention handling: ensure it is an array, filter out data where geometry is null.
        const features = Array.isArray(data) ? data : [];
        const validCatchments = features.filter((f) => f.geometry && Array.isArray(f.geometry.rings));
        setCatchments(validCatchments);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching catchments:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading flood catchments...</div>;

  return (
    <MapContainer center={[-25, 135]} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FitBounds catchments={catchments} />

      {catchments.map((catchment, idx) =>
        catchment.geometry?.rings.map((ring, rIdx) => (
          <Polygon
            key={`${idx}-${rIdx}`}
            positions={ring.map(([lng, lat]) => [lat, lng])} // Convert to Leaflet coordinates
            color="blue"
            weight={2}
            fillColor="lightblue"
            fillOpacity={0.4}
          >
            <Popup>{catchment.name}</Popup>
          </Polygon>
        ))
      )}
    </MapContainer>
  );
}
