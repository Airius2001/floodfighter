'use client';

import { useState } from 'react';
import { reservoirPinSVG, reservoirPinSelectedSVG } from './reservoirIcons'; 

/** Fixed sizes to align all items perfectly */
const ICON_BOX = 24; 
const ROW_H = 28;    

export default function LegendControl() {
  const [open, setOpen] = useState(false);
  const containerWidth = 280;

  return (
    <div style={{ position: 'relative', width: containerWidth, minWidth: containerWidth }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="map-legend-panel"
        style={{ ...btnStyle, width: '100%', boxSizing: 'border-box' }}
      >
        {open ? '✕ Legend' : '☰ Legend'}
      </button>

      {open && (
        <div
          id="map-legend-panel"
          role="region"
          aria-label="Map legend"
          style={{ ...panelStyle, width: '100%', boxSizing: 'border-box' }}
        >
          {/* Your location: 📍 emoji */}
          <LegendItem
            label="Your location"
            renderIcon={() => (
              <span style={iconBoxStyle}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>📍</span>
              </span>
            )}
          />

          {/* Water storage points (normal) */}
          <LegendItem
            label="Water storage points"
            renderIcon={() => (
              <span
                style={iconBoxStyle}
                dangerouslySetInnerHTML={{ __html: reservoirPinSVG }}
              />
            )}
          />

          {/* Water storage points (selected) */}
          <LegendItem
            label="Water storage points (selected)"
            renderIcon={() => (
              <span
                style={iconBoxStyle}
                dangerouslySetInnerHTML={{ __html: reservoirPinSelectedSVG }}
              />
            )}
          />

          {/* Flood warning catchment: blue dashed + filled */}
          <LegendItem
            label="Flood warning catchment"
            renderIcon={() => (
              <span style={iconBoxStyle}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: '2px dashed #1565c0',
                    background: '#bbdefb',
                    boxSizing: 'border-box',
                    display: 'inline-block',
                  }}
                />
              </span>
            )}
          />

          {/* Catchment hovered: pink dashed + filled */}
          <LegendItem
            label="Catchment (hovered)"
            renderIcon={() => (
              <span style={iconBoxStyle}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    border: '2px dashed #ff2d55',
                    background: '#ffc1e3',
                    boxSizing: 'border-box',
                    display: 'inline-block',
                  }}
                />
              </span>
            )}
          />
        </div>
      )}
    </div>
  );
}

/** Legend item row */
function LegendItem({
  label,
  renderIcon,
}: {
  label: string;
  renderIcon: () => React.ReactNode;
}) {
  return (
    <div style={rowStyle}>
      {renderIcon()}
      <span style={legendTextStyle}>{label}</span>
    </div>
  );
}

/* ---------- Shared styles ---------- */

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
  gap: 8,
  color: '#000',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  minHeight: ROW_H,
};

const iconBoxStyle: React.CSSProperties = {
  width: ICON_BOX,
  height: ICON_BOX,
  flex: `0 0 ${ICON_BOX}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const legendTextStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
};
