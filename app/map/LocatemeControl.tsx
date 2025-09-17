'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';

/**
 * LeftSideControls (minimal-change version)
 * - Adds ONE button under the default zoom control: 📍 Locate Me
 * - Uses an emoji "📍" as the user-location marker (divIcon)
 * - Moves popup above the marker so it DOES NOT cover the icon
 * - Replaces previous user marker on subsequent clicks (no duplicates)
 */
export default function LeftSideControls() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const Custom = L.Control.extend({
      options: { position: 'topleft' as L.ControlPosition },
      onAdd: () => {
        const container = L.DomUtil.create('div', 'leaflet-bar ff-left-controls');

        // 📍 Locate button
        const locateBtn = L.DomUtil.create('a', 'ff-btn', container);
        // Replace emoji with SVG icon
        locateBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" 
              width="18" height="18" viewBox="0 0 24 24" 
              fill="none" stroke="black" stroke-width="2" 
              stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <line x1="12" y1="2" x2="12" y2="5"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
            <line x1="2" y1="12" x2="5" y2="12"/>
            <line x1="19" y1="12" x2="22" y2="12"/>
          </svg>
        `;
        locateBtn.href = '#';
        locateBtn.title = 'Locate me';


        // Prevent map interactions from being hijacked
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        // Keep a single user marker instance in this closure
        let currentMarker: L.Marker | null = null;

        // Click: locate user
        L.DomEvent.on(locateBtn, 'click', (e) => {
          L.DomEvent.preventDefault(e);

          const safeZoom = Math.max(map.getZoom(), 12); // small guard against over-zoom
          const fallback = () => map.locate({ setView: true, maxZoom: safeZoom });

          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const latlng = L.latLng(pos.coords.latitude, pos.coords.longitude);

                // 📍 Emoji icon as marker; popup anchored ABOVE the icon
                const userIcon = L.divIcon({
                  className: 'custom-user-location',
                  html: '<div style="font-size:32px;line-height:1">📍</div>',
                  iconSize: [64, 64],
                  iconAnchor: [11, 22],      // bottom-center of the emoji
                  popupAnchor: [0, -10],     // move popup above the tip 
                });

                
                if (currentMarker) {
                  map.removeLayer(currentMarker);
                }

                currentMarker = L.marker(latlng, { 
                  icon: userIcon,
                  zIndexOffset: 2000
                })
                  .addTo(map)
                  .bindPopup('You are here', {
                    offset: L.point(0, 0),
                    autoPan: true,
                    closeButton: true,
                  })
                  .openPopup();

                map.setView(latlng, safeZoom, { animate: true });
              },
              () => fallback(),
              { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
          } else {
            fallback();
          }
        });

        // Inline styles so you don’t need extra CSS
        injectOnce();

        return container;
      },
    });

    const control = new Custom();
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

/* ---------- One-time CSS injector for the control look ---------- */
let injected = false;
function injectOnce() {
  if (injected) return;
  injected = true;
  const css = `
  .leaflet-bar.ff-left-controls {
    margin-top: 4px;              /* stacks right under the default zoom control */
    display: flex;
    flex-direction: column;
  }
  .leaflet-bar.ff-left-controls .ff-btn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: flex;                
    align-items: center;          
    justify-content: center;      
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #ccc;
    text-decoration: none;
    font-size: 16px;              
    color: #000;
    cursor: pointer;
    padding: 0;                  
  }
  .leaflet-bar.ff-left-controls .ff-btn:last-child {
    border-bottom: none;
  }
  .leaflet-bar.ff-left-controls .ff-btn:hover {
    background: #f4f4f4;
  }`;
  const style = document.createElement('style');
  style.setAttribute('data-ff-left-controls', 'true');
  style.textContent = css;
  document.head.appendChild(style);
}
