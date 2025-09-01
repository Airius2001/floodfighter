import React from "react";
import Orb from "../../src/blocks/Backgrounds/Orb/Orb";

export default function Hero({ onExplore }: { onExplore?: () => void }) {
  const wrap: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "600px",
    overflow: "hidden",
    backgroundColor: "#000",
  };

  const inner: React.CSSProperties = {
    position: "relative",
    // zIndex: 1,
    maxWidth: 1120,
    margin: "0 auto",
    textAlign: "center",
    padding: "200px 16px",
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
      {/* Orb background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={283}
          forceHoverState={false}
        />
      </div>

      {/* Content */}
      <div style={inner}>
        {/* pointerEvents: none make title not obstruct Orb */}
        <div style={{ position: "relative", zIndex: 3, pointerEvents: "none", fontFamily:"sans-serif" }}>
          <h1
            style={{
              fontSize: 50,
              lineHeight: 1.1,
              fontWeight: 800,
              margin: 0,
              color: "white",
            }}
          >
            Flood Fighter
          </h1>

          <h2
            style={{
              fontSize: 25,
              lineHeight: 1.1,
              fontWeight: 500,
              margin: 20,
              color: "grey",
            }}
          >
            Be Prepared. Stay Safe. Recover Stronger.
          </h2>

          <p
            style={{
              maxWidth: 700,
              margin: "16px auto 0",
              color: "#ddd",
              fontSize: 18,
            }}
          >
            Map-based visual data and practical knowledge to face floods in
            Australia.
          </p>


          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 20,
              /* recover pointerEvents, make button works */
              pointerEvents: "auto",
            }}
          >
            <button type="button" onClick={onExplore} style={btn}>
              Explore More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
