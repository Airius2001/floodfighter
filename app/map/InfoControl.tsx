'use client';

import { useEffect, useState, useCallback } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

export default function InfoControl({
  title = '',
  children,
  controlPosition = 'topleft',
  appendToLocateBar = true,
}: {
  title?: string;
  children?: React.ReactNode;
  controlPosition?: L.ControlPosition;
  appendToLocateBar?: boolean;
}) {
  const map = useMap();
  const [open, setOpen] = useState(false);

  // ESC to close modal
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

    const Custom = L.Control.extend({
      options: { position: controlPosition },
      onAdd: () => {
        let container: HTMLDivElement;
        const existingLocateBar = appendToLocateBar
          ? (document.querySelector(
              '.leaflet-top.leaflet-left .leaflet-bar.ff-left-controls'
            ) as HTMLDivElement | null)
          : null;

        if (existingLocateBar) {
          container = existingLocateBar;
        } else {
          container = L.DomUtil.create('div', 'leaflet-bar ff-info-control');
        }

        const btn = L.DomUtil.create('a', 'ff-btn', container);
        btn.href = '#';
        btn.title = 'Information';
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"></circle>
            <line x1="12" y1="8"  x2="12" y2="8"></line>
            <line x1="12" y1="12" x2="12" y2="16"></line>
          </svg>
        `;

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);
        L.DomEvent.on(btn, 'click', (e) => {
          L.DomEvent.preventDefault(e);
          setOpen(true);
        });

        injectOnce();
        return container;
      },
    });

    const control = new Custom();
    map.addControl(control);
    return () => map.removeControl(control);
  }, [map, controlPosition, appendToLocateBar]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) setOpen(false);
    },
    []
  );

  return (
    <>
      {open && (
        <div className="ff-modal" onClick={handleBackdropClick}>
          <div className="ff-modal-container">
            <button
              type="button"
              className="ff-modal-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="ff-modal-body">
              <h1 className="ff-modal-title">{title || 'Flood Fighter Map Overview'}</h1>
              <div className="ff-modal-content">
                {children ?? (
                  <section>
                    <p>
                      The <strong>Flood Fighter Map</strong> for Australia is an
                      <em> interactive visualization</em> bringing together{" "}
                      <em>basemaps</em>, <em>water storage reservoirs</em>, and{" "}
                      <em>flood catchments</em> to help explore flood-prone
                      regions.
                    </p>

                    <h3>Main Features</h3>
                    <ul>
                      <li>🗺️ Switch between multiple beautiful basemaps.</li>
                      <li>💧 View detailed info on any Water Storage Point.</li>
                      <li>🌊 Hover to highlight flood catchment areas.</li>
                      <li>📍 Locate yourself instantly with the left control.</li>
                      <li>📚 Toggle layers to manage catchments and storages.</li>
                    </ul>

                    <h3>Quick Guide</h3>
                    <ol>
                      <li>Click <strong>Locate Me</strong> to center on your location.</li>
                      <li>Toggle <strong>layers</strong> for different data.</li>
                      <li>Explore <strong>basemap styles</strong> for context.</li>
                      <li>Hover and click on features for more info.</li>
                    </ol>

                    <p className="ff-disclaimer">
                      ⚠️ <strong>Disclaimer</strong>: This tool is for
                      visualization only. Refer to official emergency services
                      during actual events.
                    </p>
                    <p className="ff-source">
                      📊 <strong>Data Sources</strong>:{" "}
                      <a
                        href="https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/flood/National_Flood_Gauge_Network/FeatureServer/1/query"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BOM – National Flood Gauge Network
                      </a>{" "}
                      &{" "}
                      <a
                        href="https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/Australia_Water_Storages/MapServer/0/query"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BOM – Australia Water Storages
                      </a>
                    </p>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------
 * Enhanced UI Styles
 * ------------------------------------------ */
let injectedInfo = false;
function injectOnce() {
  if (injectedInfo) return;
  injectedInfo = true;

  const css = `
  /* Control button */
  .leaflet-bar.ff-info-control .ff-btn,
  .leaflet-bar.ff-left-controls .ff-btn {
    width: 32px;
    height: 32px;
    display: flex; align-items: center; justify-content: center;
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    transition: background 0.3s, transform 0.15s ease;
  }
  .leaflet-bar.ff-info-control .ff-btn:hover,
  .leaflet-bar.ff-left-controls .ff-btn:hover {
    background: #f2f2f2;
    transform: scale(1.05);
  }

  /* Modal backdrop with blur */
  .ff-modal {
    position: fixed; inset: 0;
    background: rgba(10, 10, 10, 0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
    animation: fadeIn 0.4s ease both;
  }

  /* Modal container */
  .ff-modal-container {
    position: relative;
    width: min(900px, 85%);
    max-height: 95vh;
    background: rgba(25, 25, 25, 0.9);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    overflow: hidden;
    animation: slideUp 0.45s ease both;
  }

  /* Close button */
  .ff-modal-close {
    position: absolute;
    top: 16px;
    right: 18px;
    background: rgba(255,255,255,0.1);
    border: none;
    color: #fff;
    font-size: 20px;
    width: 36px; height: 36px;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.25s ease, transform 0.2s ease;
  }
  .ff-modal-close:hover {
    background: rgba(255,255,255,0.25);
    transform: rotate(90deg);
  }

  /* Modal body */
  .ff-modal-body {
    padding: 60px 40px 40px;
    overflow-y: auto;
    color: #eaeaea;
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.7;
  }

  .ff-modal-title {
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
  }

  .ff-modal-content h3 {
    font-size: 20px;
    margin-top: 24px;
    color: #ffd369;
  }

  .ff-modal-content ul, .ff-modal-content ol {
    padding-left: 24px;
  }

  .ff-modal-content li {
    margin: 6px 0;
  }

  .ff-modal-content a {
    color: #89bfff;
    text-decoration: none;
  }
  .ff-modal-content a:hover {
    text-decoration: underline;
  }

  .ff-disclaimer {
    margin-top: 20px;
    color: #ff9b9b;
    font-size: 15px;
  }

  .ff-source {
    margin-top: 12px;
    font-size: 15px;
    color: #aaa;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
