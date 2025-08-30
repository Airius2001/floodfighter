import Link from "next/link";
import React from "react";

export default function Hero({ onExplore }: { onExplore?: () => void }) {
  const wrap: React.CSSProperties = {
    background: "linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)",
  };
  const inner: React.CSSProperties = {
    maxWidth: 1120,
    margin: "0 auto",
    textAlign: "center",
    padding: "80px 16px",
  };
  const btn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 20px",
    borderRadius: 10,
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    border: 0,
    cursor: "pointer",
  };

  return (
    <section style={wrap}>
      <div style={inner}>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, fontWeight: 800, margin: 0 }}>
          Be Prepared. Stay Safe. Recover Stronger.
        </h1>
        <p style={{ maxWidth: 700, margin: "16px auto 0", color: "#4b5563", fontSize: 18 }}>
          Real-time flood alerts, map-based visual data, and practical knowledge
          to face floods in Australia.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button type="button" onClick={onExplore} style={btn}>
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
}