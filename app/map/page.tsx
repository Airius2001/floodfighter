'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import MapMenu from './MapMenu';
import MapControls from './MapControls';
import MapBasemapControl from './MapBasemapControl'; // hamburger-style basemap control

// Load the map client-side only to avoid SSR issues with Leaflet
const CombinedMap = dynamic(() => import('./combined').then((m) => m.default), {
  ssr: false,
});

// The basemap keys must match what <combined.tsx> understands
type BasemapKey = 'esriTopo' | 'openTopo' | 'esriImagery' | 'esriNatGeo';

export default function Page() {
  // Layer toggles
  const [showWaterPoints, setShowWaterPoints] = useState(true);
  const [showCatchments, setShowCatchments] = useState(true);

  // Current basemap
  const [basemap, setBasemap] = useState<BasemapKey>('esriNatGeo');

  // Lock body scroll when map is full screen
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Shared layout for the floating stack
  const stackStyle: React.CSSProperties = {
    position: 'fixed',
    right: 16,
    bottom: 36,
    zIndex: 1200,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingRight: 'env(safe-area-inset-right)',
    paddingTop: 'env(safe-area-inset-top)',
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      {/* Map canvas */}
      <CombinedMap showWater={showWaterPoints} showFlood={showCatchments} basemap={basemap} />

      {/* Floating controls: Menu / Layers / Basemap */}
      <div style={stackStyle}>
        {/* Menu (unchanged) */}
        <MapMenu />

        {/* Layers (prop names must match MapControls.tsx) */}
        <MapControls
          showCatchments={showCatchments}
          setShowCatchments={setShowCatchments}
          showWaterPoints={showWaterPoints}
          setShowWaterPoints={setShowWaterPoints}
        />

        {/* Basemap - hamburger button with an expandable list */}
        <MapBasemapControl value={basemap} onChange={setBasemap} />
      </div>
    </div>
  );
}
