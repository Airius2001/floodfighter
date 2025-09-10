'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { FaMapLocationDot } from 'react-icons/fa6';

const CombinedMap = dynamic(() => import('./combined').then((mod) => mod.default), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1><FaMapLocationDot /> Australia Flood Information Map</h1>
      <div style={{ marginTop: '20px', height: '90vh', marginBottom:'50px' }}>
        <CombinedMap />
      </div>
    </div>
  );
}
