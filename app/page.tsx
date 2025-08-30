"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/sections/Hero";
import FeatureDuplex from "@/components/sections/FeatureDuplex";

export default function HomePage() {
  const [expanded, setExpanded] = useState(false);

  // Static container styles ensure SSR/CSR markup is identical
  const pageWrap: React.CSSProperties = useMemo(
    () => ({
      position: "relative",
      overflow: expanded ? "visible" : "hidden",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    }),
    [expanded]
  );

  // Panel that slides up to reveal the rest of the page
  const revealPanel: React.CSSProperties = useMemo(
    () => ({
      transform: expanded ? "translateY(0)" : "translateY(100vh)",
      transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "transform",
      position: "relative",
      zIndex: 0,
      backgroundColor: "#f9fafb",
    }),
    [expanded]
  );

  return (
    <div style={pageWrap}>
      <Hero onExplore={() => setExpanded(true)} />
      <div style={revealPanel}>
        <FeatureDuplex />
        
      </div>
    </div>
  );
}