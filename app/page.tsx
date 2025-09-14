"use client";

import { useMemo, useRef, useState } from "react";
import Hero from "@/components/sections/Hero";
import FeatureDuplex from "@/components/sections/FeatureDuplex";
import { Statistics } from "@/components/sections/Statistics";
import FloodFighterUI from "@/components/sections/ProjectDetails";


export default function HomePage() {
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExplore = () => {
    
  };

  const pageWrap: React.CSSProperties = useMemo(
    () => ({
      position: "relative",
      overflow: expanded ? "visible" : "hidden",
      minHeight: "100vh",
      backgroundColor: "#000000ff",
    }),
    [expanded]
  );

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
      <Hero onExplore={handleExplore} />
      {expanded && <div style={revealPanel} ref={contentRef}>
        <FloodFighterUI />
        <Statistics />
      </div>}
    </div>
  );
}
