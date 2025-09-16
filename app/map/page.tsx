'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import MapControls from './MapControls';
import MapMenu from './MapMenu';

const CombinedMap = dynamic(() => import('./combined').then((m) => m.default), {
  ssr: false,
});

export default function MapPage() {
  const [showCatchments, setShowCatchments] = useState(true);
  const [showWaterPoints, setShowWaterPoints] = useState(true);

  // lock body scroll on this full-screen page
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <CombinedMap loading={loading} setLoading={setLoading} showFlood={showCatchments} showWater={showWaterPoints} />

      {/* Floating stack on the top-right for both menus */}
      {!loading && 
      <div
        style={{
          position: 'fixed',
          bottom: 5,
          right:10,
          zIndex: 1200,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          paddingRight: 'env(safe-area-inset-right)',
          paddingTop: 'env(safe-area-inset-top)',
        }}
      >
        {/* <MapMenu /> */}
        <MapControls
          showCatchments={showCatchments}
          setShowCatchments={setShowCatchments}
          showWaterPoints={showWaterPoints}
          setShowWaterPoints={setShowWaterPoints}
        />
      </div>}
    </div>
  );
}
