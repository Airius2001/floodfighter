'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, Tooltip } from 'react-leaflet';
import LocatemeControl from './LocatemeControl';
import InfoControl from './InfoControl';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { reservoirPinSVG, reservoirPinSelectedSVG } from './reservoirIcons'; 

/**
 * Leaflet icons built from the SVGs 
 */
export const reservoirIcon = L.divIcon({
  className: 'reservoir-pin',
  html: reservoirPinSVG,
  iconSize: [32, 40],
  iconAnchor: [16, 38],
  popupAnchor: [0, -34],
});

export const reservoirIconSelected = L.divIcon({
  className: 'reservoir-pin-selected',
  html: reservoirPinSelectedSVG,
  iconSize: [40, 48],
  iconAnchor: [18, 42],
  popupAnchor: [0, -38],
});


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

/** Added: basemap registry (minimal, no style changes elsewhere) */
const BASEMAPS = {
  esriTopo: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, FAO, NOAA, USGS',
    maxZoom: 12,
    maxNativeZoom: 12,
  },
  openTopo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data © OpenStreetMap contributors, SRTM | Tiles © OpenTopoMap (CC-BY-SA)',
    maxZoom: 12,
    maxNativeZoom: 12,
  },
  esriImagery: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 12,
    maxNativeZoom: 12,
  },
  esriNatGeo: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, National Geographic, DeLorme',
    maxZoom: 12,
    maxNativeZoom: 12,
  },
} as const;
type BasemapKey = keyof typeof BASEMAPS;

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
      name: f.properties?.dist_name || 'Unnamed',
      geometry: { rings },
    };
  });
}

// helper component
function ClearSelectionOnMapClick({
  onClear,
}: {
  onClear: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handler = () => onClear();
    map.on('click', handler);

    // cleanup
    return () => {
      map.off('click', handler);
    };
  }, [map, onClear]);

  return null;
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
  /** Added: current basemap key */
  basemap: BasemapKey;
}



export default function CombinedMap({ showWater, showFlood, basemap }: CombinedMapProps) {
  const [waterPoints, setWaterPoints] = useState<WaterFeature[]>([]);
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);
  // Track which catchment ring is hovered (format: `${idx}-${rIdx}`)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);  
  const [loading, setLoading] = useState(true);
  const [selectedReservoir, setSelectedReservoir] = useState<number | null>(null);

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
      {/* Minimal change: use selected basemap instead of fixed OSM */}
      <TileLayer
        key={basemap}
        url={BASEMAPS[basemap].url}
        attribution={BASEMAPS[basemap].attribution}
        maxZoom={BASEMAPS[basemap].maxZoom}
        maxNativeZoom={BASEMAPS[basemap].maxNativeZoom}
      />

      <LocatemeControl/>
      {/* Left-side: Locate (you already have this), then Info just below it */}
      <InfoControl title="About Flood Fighter">
      <section>
        <h2>What is Map Visualization in Flood Fighter?</h2>
        <p>
          Map Visualization inFlood Fighter is an <strong>interactive map</strong> for Australia that
          brings together <em>basemaps</em>, <em>water storage reservoirs</em>, and
          <em> flood catchments</em>. It helps you explore water infrastructure and
          landscapes related to flood risk.
        </p>

        <h3>Main features</h3>
        <ul>
          <li><strong>Basemaps</strong>: Switch between Topographic, OpenTopoMap, Satellite, and National Geographic styles.</li>
          <li><strong>Reservoirs</strong>: Click any pin to view details; the selected reservoir is highlighted.</li>
          <li><strong>Flood Catchments</strong>: Catchment boundaries are shown; <em>hover</em> to emphasize the hovered catchment.</li>
          <li><strong>Your Location</strong>: Use the left control to find where you are on the map.</li>
          <li><strong>Legend & Layers</strong>: Use the right panel to understand symbols and toggle <em>Flood Warning Catchments</em> and <em>Water Storage Points</em>.</li>
          <li><strong>Preparedness Guides</strong>: Open the Menu for “Be prepared before flood”, “Stay safe during flood”, and “Recover stronger after flood”.</li>
        </ul>

        <h3>How to use</h3>
        <ol>
          <li>Click the left-side <strong>Locate</strong> button 📍 to zoom to your position.</li>
          <li>Use the right-side <strong>Layers</strong> toggles to show/hide catchments and reservoirs.</li>
          <li>Try different <strong>Basemaps</strong> from the Basemap panel to change the background style.</li>
          <li><strong>Click</strong> a reservoir pin for details; <strong>hover</strong> a catchment to highlight it.</li>
          <li>Open the <strong>Menu</strong> for practical tips before/during/after floods.</li>
        </ol>

        <p className="ff-disclaimer">
          ⚠️ <strong>Disclaimer</strong>: This map is for informational purposes only.
          Always consult official sources and emergency services for critical decisions.
        </p>
      </section>
      </InfoControl>

      <FitBounds waterPoints={waterPoints} catchments={catchments} />

      {showWater &&
        waterPoints.map((wp, idx) => (
          <Marker 
            key={idx} 
            position={[wp.geometry.y, wp.geometry.x]} 
            icon={selectedReservoir === idx ? reservoirIconSelected : reservoirIcon}
            zIndexOffset={selectedReservoir === idx ? 1200 : 0}
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation?.(); // avoid map-click clearing first
                setSelectedReservoir(idx);
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
          c.geometry?.rings.map((ring, rIdx) => {
            const keyId = `${idx}-${rIdx}`;
            const isHovered = hoveredKey === keyId;

            // Strong & obvious hover style
            const baseStyle = {
              color: 'blue',
              weight: 1,
              fillColor: 'lightblue',
              fillOpacity: 0.35,
            };

            const hoverStyle = {
              color: '#ff2d55',        // vivid pink stroke
              weight: 3,               // thicker border
              dashArray: '6 3',        // dashed stroke on hover
              fillColor: '#ffd1dd',    // light pink fill
              fillOpacity: 0.70,
            };

            const style = isHovered ? hoverStyle : baseStyle;

            return (
              <Polygon
                key={keyId}
                positions={ring.map(([lng, lat]) => [lat, lng] as [number, number])}
                // All Leaflet Path options go into pathOptions
                pathOptions={{
                  ...style,
                  interactive: true,
                  bubblingMouseEvents: false, // put here, not as a top-level prop
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    setHoveredKey(keyId);
                    (e.target as L.Path).bringToFront(); // ensure it's on top
                  },
                  mouseout: (e) => {
                    setHoveredKey((prev) => (prev === keyId ? null : prev));
                  },
                }}
              >
                {/* Hover feedback that's impossible to miss */}
                <Tooltip sticky>{c.name}</Tooltip>
              </Polygon>
            );
          })
        )}
        <ClearSelectionOnMapClick onClear={() => setSelectedReservoir(null)} />
    </MapContainer>
    
  );
}
