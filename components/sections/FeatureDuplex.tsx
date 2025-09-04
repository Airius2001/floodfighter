import Link from "next/link";
import React from "react";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  fontFamily:"sans-serif" 
};

export function FeatureDuplex() {
  return (
    <section style={{ backgroundColor:"#000"}}>
      <div
        className="feature-grid"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0px 16px",
          display: "grid",
          gap: 24,
        }}
      >
        {/* Card 1 */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
            Explore Australia’s Water & Flood Safety
          </h3>
          <p style={{ color: "#4b5563", marginTop: 8, fontSize: 15 }}>
            Discover an interactive map of Australia showing key water reservoirs and official flood warning areas. 
            Stay informed about critical locations that may impact communities, and explore how water management and flood safety are connected across the nation.
          </p>
          <Link
            href="/map"
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "12px 20px",
              borderRadius: 10,
              background: "#111827",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            👉 Click here to view the visual map
          </Link>
        </div>

        {/* Card 2 */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
            Search for the postcode
          </h3>
          <p style={{ color: "#4b5563", marginTop: 8, fontSize: 15 }}>
            Stay safe with live flood updates and safety guidance.
          </p>
          <Link
            href="/check"
            style={{
              marginTop: 16,
              display: "inline-block",
              padding: "12px 20px",
              borderRadius: 10,
              background: "#9ca3af", // unclickable
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
              pointerEvents: "none", // unclickable, todo in next iteration
            }}
          >
            Check Postcode (Todo)
          </Link>
        </div>
        
      </div>

      {/* Responsive columns via CSS only (no JS), so SSR/CSR are identical */}
      <style jsx>{`
        .feature-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .feature-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}

export default FeatureDuplex;