"use client";

import dynamic from "next/dynamic";

const WaterMap = dynamic(() => import("../map/watermap"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Australia reservoir map distribution</h1>
      <WaterMap />
    </div>
  );
}
