import Link from "next/link";
import React from "react";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 20,
  padding: "32px 28px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
        background: "linear-gradient(135deg, #000 0%, #111827 100%)",
        padding: "80px 0",
      }}
    >
      <div
        className="feature-grid"
        style={{
          margin: "0 auto",
          padding: "0px 20px",
          display: "grid",
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
                color: "#111827",
              }}
            >
              Explore Australia’s Water & Flood Safety
            </h3>
            <p
              style={{
                color: "#4b5563",
                lineHeight: 1.6,
                fontSize: 16,
                marginBottom: 20,
                fontStyle:'italic'
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
              background: "#111827",
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

        {/* Card 2 */}
        <div className="feature-card" style={cardStyle}>
          <div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#111827",
              }}
            >
              Search for the Postcode
            </h3>
            <p
              style={{
                color: "#4b5563",
                lineHeight: 1.6,
                fontSize: 16,
                marginBottom: 20,
                fontStyle:'italic'
              }}
            >
              "Stay safe with live flood updates and guidance tailored for your
              location."
            </p>
          </div>
          <Link
            href="/check"
            className="feature-btn disabled"
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              background: "#9ca3af",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              textAlign: "center",
              textDecoration: "none",
              pointerEvents: "none",
              marginTop: "auto",
            }}
          >
            🔒 Check Postcode (Coming Soon)
          </Link>
        </div>
      </div>

      <style jsx>{`
        .feature-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .feature-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .feature-btn {
          transition: background 0.3s ease, transform 0.2s ease;
          display: inline-block;
        }
        .feature-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }
        .feature-btn.disabled:hover {
          background: #9ca3af;
          transform: none;
        }
      `}</style>
    </section>
  );
}

export default FeatureDuplex;
