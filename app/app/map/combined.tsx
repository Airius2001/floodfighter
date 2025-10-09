'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, Tooltip } from 'react-leaflet';
import { Spin, Switch } from 'antd';
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

/** basemap registry */
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

// Convert the reservoir returned by the Worker (GeoJSON) to the ArcGIS-like shape you use
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

// Convert flood GeoJSON to your ArcGIS-like shape
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
function ClearSelectionOnMapClick({ onClear }: { onClear: () => void }) {
  const map = useMap();

  useEffect(() => {
    const handler = () => onClear();
    map.on('click', handler);
    return () => {
      map.off('click', handler);
    };
  }, [map, onClear]);

  return null;
}

// Fit map bounds to data (kept as-is)
function FitBoundsOnce({
  waterPoints,
  catchments,
}: {
  waterPoints: WaterFeature[];
  catchments: FloodCatchment[];
}) {
  const map = useMap();
  const fitDoneRef = useRef(false);

  useEffect(() => {
    if (fitDoneRef.current) return; // If it has already been executed, it will not be executed

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
      fitDoneRef.current = true; // The tag is executed only once
    }
  }, [map, waterPoints, catchments]);

  return null;
}


interface CombinedMapProps {
  showWater: boolean;
  showFlood: boolean;
  basemap: BasemapKey;
}

/* ----------------------- NEW: incremental paged fetch ----------------------- */

// one page
async function fetchPage(
  baseUrl: string,
  where: string,
  offset: number,
  pageSize = 200
) {
  const url =
    `${baseUrl}` +
    (baseUrl.includes('?') ? '&' : '?') +
    `where=${encodeURIComponent(where)}&resultRecordCount=${pageSize}&resultOffset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return (await res.json()) as { features?: any[] };
}

// all pages, incrementally
async function fetchAllPagedIncremental(
  baseUrl: string,
  where: string,
  onChunk: (features: any[]) => void,
  pageSize = 200,
  maxPages = 999
) {
  let offset = 0;
  for (let i = 0; i < maxPages; i++) {
    const { features = [] } = await fetchPage(baseUrl, where, offset, pageSize);
    if (!features.length) break;
    onChunk(features);
    if (features.length < pageSize) break;
    offset += pageSize;
  }
}

/* -------------------------- Component: CombinedMap -------------------------- */

export default function CombinedMap({ showWater, showFlood, basemap }: CombinedMapProps) {
  const [waterPoints, setWaterPoints] = useState<WaterFeature[]>([]);
  const [catchments, setCatchments] = useState<FloodCatchment[]>([]);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReservoir, setSelectedReservoir] = useState<number | null>(null);

  // Worker base URLs
  const WATER_BASE = 'https://bom-cache-worker.yxin0038.workers.dev/water';
  const FLOOD_BASE = 'https://bom-cache-worker.yxin0038.workers.dev/flood';

  // State loading order: VIC first, other background filling
  const STATES_ORDER = ['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

  // water with full name; flood with state abbreviation (named after your data)
  const stateCodeToFullName: Record<string, string> = {
    VIC: 'Victoria',
    NSW: 'New South Wales',
    QLD: 'Queensland',
    SA: 'South Australia',
    WA: 'Western Australia',
    TAS: 'Tasmania',
    NT: 'Northern Territory',
    ACT: 'Australian Capital Territory',
  };

  // Incremental addition
  const pushWater = (features: any[]) => {
    const adapted = adaptWaterGeoJSON({ features });
    setWaterPoints((prev) => [...prev, ...adapted]);
  };
  const pushFlood = (features: any[]) => {
    const adapted = adaptFloodGeoJSON({ features });
    setCatchments((prev) => [...prev, ...adapted]);
  };

  // Phase 1: Victoria only, show the map first
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await fetchAllPagedIncremental(
          WATER_BASE,
          `state_name = '${stateCodeToFullName.VIC}'`,
          (features) => { if (!cancelled) pushWater(features); }
        );

        await fetchAllPagedIncremental(
          FLOOD_BASE,
          `state_code = 'VIC'`,
          (features) => { if (!cancelled) pushFlood(features); }
        );

        if (!cancelled) setLoading(false); 
      } catch (e) {
        console.error(e);
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase 2: The background increment pulls other states
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const rest = STATES_ORDER.filter(s => s !== 'VIC');

      for (const s of rest) {
        // water
        const full = stateCodeToFullName[s];
        await fetchAllPagedIncremental(
          WATER_BASE,
          `state_name = '${full}'`,
          (features) => { if (!cancelled) pushWater(features); }
        );

        // flood
        await fetchAllPagedIncremental(
          FLOOD_BASE,
          `state_code = '${s}'`,
          (features) => { if (!cancelled) pushFlood(features); }
        );

        if (cancelled) break;
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Spin size="large" />
        <p style={{ marginTop: 10 }}>Loading Map...</p>
      </div>
    );

  return (
    <MapContainer
      // Giving Victoria a suitable perspective from the beginning, 
      // FitBounds will be further fitted when the first batch arrives
      center={[-37.5, 144.5]}
      zoom={6}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* basemap */}
      <TileLayer
        key={basemap}
        url={BASEMAPS[basemap].url}
        attribution={BASEMAPS[basemap].attribution}
        maxZoom={BASEMAPS[basemap].maxZoom}
        maxNativeZoom={BASEMAPS[basemap].maxNativeZoom}
      />

      <LocatemeControl />

      <InfoControl title=" ">
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
          <li><strong>Water Storage Points</strong>: Click any pin to view details; the selected Water Storage Points is highlighted.</li>
          <li><strong>Flood Catchments</strong>: Catchment boundaries are shown; <em>hover</em> to emphasize the hovered catchment.</li>
          <li><strong>Your Location</strong>: Use the left control to find where you are on the map.</li>
          <li><strong>Legend & Layers</strong>: Use the right panel to understand symbols and toggle <em>Flood Warning Catchments</em> and <em>Water Storage Points</em>.</li>
        </ul>

        <h3>How to use</h3>
        <ol>
          <li>Click the left-side <strong>Locate me</strong> button to zoom to your position.</li>
          <li>Use the right-side <strong>Layers</strong> toggles to show/hide catchments and reservoirs.</li>
          <li>Try different <strong>Basemaps</strong> from the Basemap panel to change the background style.</li>
          <li><strong>Click</strong> a Water Storage Point pin for details; <strong>hover</strong> a catchment to highlight it.</li>
        </ol>

        <p className="ff-disclaimer">
          ⚠️ <strong>Disclaimer</strong>: This map is for informational purposes only.
          Always consult official sources and emergency services for critical decisions.
        </p>
        <p className="ff-source" style={{marginBottom:'10px'}}>
          📊 <strong>Data Sources</strong>:  
          Flood Gauge Network & Water Storage Points from  
          <a href="https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/flood/National_Flood_Gauge_Network/FeatureServer/1/query" target="_blank" rel="noopener noreferrer">
            BOM ArcGIS – National Flood Gauge Network
          </a>  
          and  
          <a href="https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/Australia_Water_Storages/MapServer/0/query" target="_blank" rel="noopener noreferrer">
            BOM ArcGIS – Australia Water Storages
          </a>.
        </p>
      </section>
      </InfoControl>

      {/* Fit to current loaded data */}
      <FitBoundsOnce waterPoints={waterPoints} catchments={catchments} />

      {/* water (reservoirs) */}
      {showWater &&
        waterPoints.map((wp, idx) => (
          <Marker
            key={idx}
            position={[wp.geometry.y, wp.geometry.x]}
            icon={selectedReservoir === idx ? reservoirIconSelected : reservoirIcon}
            zIndexOffset={selectedReservoir === idx ? 1200 : 0}
            eventHandlers={{
              click: (e) => {
                e.originalEvent?.stopPropagation?.();
                setSelectedReservoir(idx);
              },
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <h3>{wp.attributes.wstorlname}</h3>
                <p><b>Capacity:</b> {wp.attributes.total_capacity_ml} ML</p>
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

      {/* flood (catchments) */}
      {showFlood &&
        catchments.map((c, idx) =>
          c.geometry?.rings.map((ring, rIdx) => {
            const keyId = `${idx}-${rIdx}`;
            const isHovered = hoveredKey === keyId;

            const baseStyle = {
              color: 'blue',
              weight: 1,
              fillColor: 'lightblue',
              fillOpacity: 0.35,
            };

            const hoverStyle = {
              color: '#ff2d55',
              weight: 3,
              dashArray: '6 3',
              fillColor: '#ffd1dd',
              fillOpacity: 0.7,
            };

            const style = isHovered ? hoverStyle : baseStyle;

            return (
              <Polygon
                key={keyId}
                positions={ring.map(([lng, lat]) => [lat, lng] as [number, number])}
                pathOptions={{
                  ...style,
                  interactive: true,
                  bubblingMouseEvents: false,
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    setHoveredKey(keyId);
                    (e.target as L.Path).bringToFront();
                  },
                  mouseout: () => setHoveredKey((prev) => (prev === keyId ? null : prev)),
                }}
              >
                <Tooltip sticky>{c.name}</Tooltip>
              </Polygon>
            );
          })
        )}

      {/* click empty map to clear selection */}
      <ClearSelectionOnMapClick onClear={() => setSelectedReservoir(null)} />
    </MapContainer>
  );
}
