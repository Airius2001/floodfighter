import React from "react";
import Orb from "../../src/blocks/Backgrounds/Orb/Orb";
import { FaArrowRight } from "react-icons/fa6";

export default function Hero({ onExplore }: { onExplore?: () => void }) {
  const wrap: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "600px",
    overflow: "hidden",
    backgroundColor: "#bfd6f8ff",
  };

  const inner: React.CSSProperties = {
    position: "relative",
    // zIndex: 1,
    margin: "0 auto",
    textAlign: "center",
    padding: "200px 16px",
  };

  return (
    <section style={wrap}>
      {/* Orb background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={204}
          forceHoverState={false}
        />
      </div>

      {/* Content */}
      <div style={inner}>
        {/* pointerEvents: none make title not obstruct Orb */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            pointerEvents: "none",
            fontFamily: "sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: 60,
              lineHeight: 1.1,
              fontWeight: 800,
              margin: 25,
              color: "#1e3a8a",
            }}
          >
            Flood Fighter
          </h1>

          <h2
            style={{
              fontSize: 30,
              lineHeight: 1.1,
              fontWeight: 500,
              margin: 20,
              color: "#1f2937",
            }}
          >
            Be Prepared. Stay Safe. Recover Stronger.
          </h2>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 20,
              /* recover pointerEvents, make button works */
              pointerEvents: "auto",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
