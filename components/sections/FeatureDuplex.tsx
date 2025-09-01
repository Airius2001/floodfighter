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
            Map-based visual data
          </h3>
          <p style={{ color: "#4b5563", marginTop: 8, fontSize: 15 }}>
            Explore live rainfall and flood extents on an interactive map to assess risk.
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
            Go explore the live datasets
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
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Check Postcode
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