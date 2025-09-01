"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const container: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 16px",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: active ? "#1d4ed8" : "#374151",
    textDecoration: "none",
    backgroundColor: active ? "rgba(29,78,216,0.08)" : "transparent",
    fontFamily:"sans-serif"
  };
}

export function Navbar() {
  const pathname = usePathname();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={container}>
        <Link href="/" style={{ fontSize: 18, fontWeight: 700, color: "#111827", textDecoration: "none", fontFamily:"sans-serif"}}>
          Flood Fighter
        </Link>
        <nav style={{ display: "flex", gap: 8 }}>
          <Link href="/" style={navLinkStyle(pathname === "/")}>Home</Link>
          <Link href="/map" style={navLinkStyle(pathname === "/map")}>Map visualisation</Link>
          <Link href="/check" style={navLinkStyle(pathname === "/check")}>Check postcode</Link>
        </nav>
      </div>
    </header>
  );
}