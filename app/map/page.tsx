'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const CombinedMap = dynamic(() => import('./combined').then((mod) => mod.default), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Australia Flood information Map</h1>
      <div style={{ marginTop: '20px', height: '90vh' }}>
        <CombinedMap />
      </div>
    </div>
  );
}
