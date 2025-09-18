'use client';

import { useState } from 'react';

export type BasemapKey = 'esriTopo' | 'openTopo' | 'esriImagery' | 'esriNatGeo';

interface MapBasemapControlProps {
  value: BasemapKey;
  onChange: (value: BasemapKey) => void;
}

export default function MapBasemapControl({ value, onChange }: MapBasemapControlProps) {
  const [open, setOpen] = useState(false);
  const containerWidth = 280;

  return (
    <div style={{ position: 'relative', width: containerWidth, minWidth: containerWidth }}>
      {/* Hamburger button to toggle panel */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="map-basemap-controls"
        style={{ ...btnStyle, width: '100%', boxSizing: 'border-box' }}
      >
        {open ? '✕ Basemap' : '☰ Basemap'}
      </button>

      {open && (
        <div
          id="map-basemap-controls"
          style={{ ...panelStyle, width: '100%', boxSizing: 'border-box' }}
        >
          {/* Option list */}
          {basemapOptions.map((opt) => (
            <label
              key={opt.key}
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="basemap"
                value={opt.key}
                checked={value === opt.key}
                onChange={() => onChange(opt.key)}
                style={{ accentColor: '#000' }}
              />
              <span style={{ fontSize: 14, fontWeight: 600 }}>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

const basemapOptions: { key: BasemapKey; label: string }[] = [
  { key: 'esriTopo', label: 'Topographic' },
  { key: 'openTopo', label: 'OpenTopoMap' },
  { key: 'esriImagery', label: 'Satellite' },
  { key: 'esriNatGeo', label: 'National Geographic' },
];

const btnStyle: React.CSSProperties = {
  background: 'white',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: '8px 12px',
  cursor: 'pointer',
  fontWeight: 700,
  color: '#000',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  textAlign: 'left',
};

const panelStyle: React.CSSProperties = {
  marginTop: 8,
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(6px)',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  padding: '12px 14px',
  display: 'grid',
  gap: 12,
  color: '#000',
};
