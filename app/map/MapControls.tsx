'use client';

import { useState } from 'react';

interface MapControlsProps {
  showCatchments: boolean;
  setShowCatchments: (value: boolean) => void;
  showWaterPoints: boolean;
  setShowWaterPoints: (value: boolean) => void;
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: '#000', userSelect: 'none' }}>
      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: 76,
          height: 26,
          padding: '2px 8px',
          borderRadius: 9999,
          border: '1px solid #e5e7eb',
          background: checked ? '#000' : '#e5e7eb',
          color: checked ? '#fff' : '#6b7280',
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1,
          boxSizing: 'border-box',
        }}
      >
        {checked ? 'Show' : 'Hide'}
        <span aria-hidden="true" style={{ marginLeft: 8, width: 16, height: 16, borderRadius: '50%', background: '#fff', border: '1px solid #d1d5db', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }} />
      </button>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }} />
    </label>
  );
}

export default function MapControls({
  showCatchments,
  setShowCatchments,
  showWaterPoints,
  setShowWaterPoints,
}: MapControlsProps) {
  const [open, setOpen] = useState(false);
  const containerWidth = 280;

  return (
    <div style={{ position: 'relative', width: containerWidth, minWidth: containerWidth }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="map-layer-controls"
        style={{ ...btnStyle, width: '100%', boxSizing: 'border-box' }} // IMPORTANT
      >
        {open ? '✕ Layers' : '☰ Layers'}
      </button>

      {open && (
        <div
          id="map-layer-controls"
          style={{ ...panelStyle, width: '100%', boxSizing: 'border-box' }} // IMPORTANT
        >
          <Toggle checked={showCatchments} onChange={() => setShowCatchments(!showCatchments)} label="Flood Warning Catchments" />
          <Toggle checked={showWaterPoints} onChange={() => setShowWaterPoints(!showWaterPoints)} label="Water Storage Points" />
        </div>
      )}
    </div>
  );
}

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
