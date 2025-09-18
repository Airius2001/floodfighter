'use client';

import { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

/**
 * InfoControl
 * - Renders an "information" button as a true Leaflet control.
 * - If a `.leaflet-bar.ff-left-controls` (your Locate bar) exists, the button is
 *   appended into that SAME bar so spacing matches zoom/locate exactly.
 * - Clicking opens a fullscreen modal with about text.
 */
export default function InfoControl({
  title = '',
  children,
  controlPosition = 'topleft', // 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  appendToLocateBar = true,     // try to append into existing locate bar for perfect spacing
}: {
  title?: string;
  children?: React.ReactNode;
  controlPosition?: L.ControlPosition;
  appendToLocateBar?: boolean;
}) {
  const map = useMap();
  const [open, setOpen] = useState(false);

  // ESC key closes the modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!map) return;

    // Define a Leaflet control so it stacks correctly with other controls.
    const Custom = L.Control.extend({
      options: { position: controlPosition },
      onAdd: () => {
        // If a locate bar exists, append our button to it so spacing is identical.
        let container: HTMLDivElement;

        const existingLocateBar =
          appendToLocateBar
            ? (document.querySelector(
                '.leaflet-top.leaflet-left .leaflet-bar.ff-left-controls'
              ) as HTMLDivElement | null)
            : null;

        if (existingLocateBar) {
          container = existingLocateBar; // reuse the same bar
        } else {
          // Fallback: create our own bar (spacing will follow Leaflet defaults)
          container = L.DomUtil.create('div', 'leaflet-bar ff-info-control');
        }

        // Create the Info button (same size/look as Leaflet buttons)
        const btn = L.DomUtil.create('a', 'ff-btn', container);
        btn.href = '#';
        btn.title = 'Information';
        // Minimal "info" SVG icon for crisp rendering
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="12" y1="8"  x2="12" y2="8"></line>
            <line x1="12" y1="12" x2="12" y2="16"></line>
          </svg>
        `;

        // Prevent map from intercepting clicks/scrolls on the control
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.on(btn, 'click', (e) => {
          L.DomEvent.preventDefault(e);
          setOpen(true);
        });

        injectOnce(); // ensure CSS styles exist

        return container;
      },
    });

    const control = new Custom();
    map.addControl(control);

    // Cleanup must return a function (TypeScript-safe)
    return () => {
      map.removeControl(control);
    };
  }, [map, controlPosition, appendToLocateBar]);

  // Close when clicking the dark backdrop (but not the inner content)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) setOpen(false);
    },
    []
  );

  return (
    <>
      {open && (
        <div
          className="ff-modal"
          role="dialog"
          aria-modal="true"
          onClick={handleBackdropClick}
        >
          <button
            type="button"
            className="ff-modal-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ✖
          </button>

          <div className="ff-modal-body">
            <h1 className="ff-modal-title">{title}</h1>
            <div className="ff-modal-content">
              {children ?? (
                <>
                  <section>
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
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------
 * One-time CSS for the control button and fullscreen modal
 * ----------------------------------------------------------- */
let injectedInfo = false;
function injectOnce() {
  if (injectedInfo) return;
  injectedInfo = true;

  const css = `
  /* Control button (Leaflet bar look & exact size) */
  .leaflet-bar.ff-info-control .ff-btn,
  .leaflet-bar.ff-left-controls .ff-btn { /* also matches your existing left bar buttons */
    width:30px; height:30px;
    display:flex; align-items:center; justify-content:center;
    background:#fff; border-bottom:1px solid #ccc;
    text-decoration:none; cursor:pointer; padding:0;
  }
  .leaflet-bar.ff-info-control .ff-btn:hover,
  .leaflet-bar.ff-left-controls .ff-btn:hover { background:#f4f4f4; }

  /* Fullscreen overlay: keep it above all leaflet panes/controls */
  .ff-modal{
    position:fixed; inset:0;
    background:rgba(0,0,0,0.6);
    z-index:100000; /* higher than any map UI */
  }

  /* Top-right close button */
  .ff-modal-close{
    position:absolute; top:16px; right:18px;
    background:transparent; border:none; color:#fff;
    font-size:22px; line-height:1; cursor:pointer; z-index:100001;
  }

  /* Layout similar to your reference: left-aligned copy */
  .ff-modal-body{
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:flex-start;
    padding-left:clamp(24px, 6vw, 80px); padding-right:clamp(24px, 6vw, 80px);
  }
  .ff-modal-title{
    position:absolute; top:32px; left:clamp(24px, 6vw, 80px);
    color:#fff; font-size:28px; font-weight:700; margin:0;
  }
  .ff-modal-content{
    color:#eaeaea; max-width:min(900px, 90vw);
    line-height:1.65; font-size:16px;
  }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
