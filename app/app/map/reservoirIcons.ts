/**
 * Reservoir pin SVG (normal state: blue, 32x40)
 * NOTE: Colors are now inlined on each element (no <style> / className).
 *       Geometry (paths/coordinates) is unchanged.
 */
export const reservoirPinSVG = `
<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Outer pin -->
  <path fill="#2A89FF"
        d="M16 1 C8.5 1 3 6.8 3 13.8 C3 23.2 16 39 16 39
           C16 39 29 23.2 29 13.8 C29 6.8 23.5 1 16 1 Z"/>

  <!-- White inner circle -->
  <circle cx="16" cy="14" r="9.6" fill="#FFFFFF"/>

  <!-- Trapezoid dam (left vertical, right slanted) -->
  <!-- Bottom wider: from x=9 to x=14; Top narrower: from x=9 to x=13 -->
  <path fill="#2A89FF" stroke="#2A89FF"
        d="M9 10 L13 10 L16 19 L9 19 Z" />

  <!-- Two longer wave lines to the right -->
  <path d="M16 15 q1.8 1.2 3.6 0 q1.8 -1.2 3.6 0"
        fill="none" stroke="#2A89FF" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M16 18 q1.8 1.2 3.6 0 q1.8 -1.2 3.6 0"
        fill="none" stroke="#2A89FF" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`;

/**
 * Reservoir pin SVG (selected state: pink, 40x48)
 * NOTE: Colors are inlined; geometry unchanged.
 */
export const reservoirPinSelectedSVG = `
<svg width="40" height="48" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Outer pin -->
  <path fill="#FF2D55"
        d="M16 1 C8.5 1 3 6.8 3 13.8 C3 23.2 16 39 16 39
           C16 39 29 23.2 29 13.8 C29 6.8 23.5 1 16 1 Z"/>

  <circle cx="16" cy="14" r="9.6" fill="#FFFFFF"/>

  <!-- Trapezoid dam (left vertical, right slanted) -->
  <!-- Bottom wider: from x=9 to x=14; Top narrower: from x=9 to x=13 -->
  <path fill="#FF2D55" stroke="#FF2D55"
        d="M9 10 L13 10 L16 19 L9 19 Z" />

  <!-- Two longer wave lines to the right -->
  <path d="M16 15 q1.8 1.2 3.6 0 q1.8 -1.2 3.6 0"
        fill="none" stroke="#FF2D55" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M16 18 q1.8 1.2 3.6 0 q1.8 -1.2 3.6 0"
        fill="none" stroke="#FF2D55" stroke-width="1.2" stroke-linecap="round"/>
</svg>
`;

