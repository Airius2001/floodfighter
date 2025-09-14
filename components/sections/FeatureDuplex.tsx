import Link from "next/link";
import React from "react";

const cardStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.08)", // translucent card
  backdropFilter: "blur(12px)", // glassmorphism blur
  borderRadius: 20,
  padding: "32px 28px",
  border: "1px solid rgba(255, 255, 255, 0.15)", // subtle border
  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  fontFamily: "Inter, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.3s ease",
};

export function FeatureDuplex() {
  return (
    <section
      style={{
        background: "#000",
        padding: "80px 0",
      }}
    >
      <div
        className="feature-grid"
        style={{
          margin: "0 auto",
          padding: "0px 20px",
          display: "grid",
          width: '50%',
          gap: 32,
        }}
      >
        {/* Card 1 */}
        <div className="feature-card" style={cardStyle}>
          <div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#f9fafb", // light heading
              }}
            >
              Explore Australia’s Water & Flood Safety
            </h3>
            <p
              style={{
                color: "#d1d5db", // muted gray text
                lineHeight: 1.6,
                fontSize: 16,
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              "Discover an interactive map of Australia showing key water
              reservoirs and official flood warning areas. Stay informed about
              critical locations that may impact communities, and explore how
              water management and flood safety are connected across the nation."
            </p>
          </div>
          <Link
            href="/map"
            className="feature-btn"
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              textAlign: "center",
              textDecoration: "none",
              marginTop: "auto",
            }}
          >
            👉 View Interactive Map
          </Link>
        </div>
      </div>

      <style jsx>{`
        .feature-grid {
          grid-template-columns: 1fr;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
        }

        .feature-btn {
          transition: background 0.3s ease, transform 0.2s ease;
          display: inline-block;
        }
        .feature-btn:hover {
          background: #1e40af;
          transform: translateY(-2px);
        }
        .feature-btn.disabled:hover {
          background: #6b7280;
          transform: none;
        }
      `}</style>
    </section>
  );
}

export default FeatureDuplex;
