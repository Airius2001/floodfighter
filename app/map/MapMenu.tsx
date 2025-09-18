'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MapMenu() {
  const [open, setOpen] = useState(false);
  const containerWidth = 280;

  return (
    <div style={{ position: 'relative', width: containerWidth, minWidth: containerWidth }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="map-quick-nav"
        style={{ ...btnStyle, width: '100%', boxSizing: 'border-box' }}   // IMPORTANT
      >
        {open ? '✕ Menu' : '☰ Menu'}
      </button>

      {open && (
        <div
          id="map-quick-nav"
          style={{ ...panelStyle, width: '100%', boxSizing: 'border-box' }} // IMPORTANT
        >
          <Link href="/" onClick={() => setOpen(false)} style={itemStyle}>Home</Link>
          <Link href="/before" onClick={() => setOpen(false)} style={itemStyle}>Be prepared before flood</Link>
          <Link href="/during" onClick={() => setOpen(false)} style={itemStyle}>Stay safe during flood</Link>
          <Link href="/after" onClick={() => setOpen(false)} style={itemStyle}>Recover stronger after flood</Link>
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
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  color: '#000',
};

const itemStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000',
  fontWeight: 600,
  fontSize: 14,
  padding: '8px 10px',
  borderRadius: 8,
};
