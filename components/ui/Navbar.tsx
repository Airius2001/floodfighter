"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FaMapLocationDot } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi"; // hamburger + close icons
import { useState } from "react";

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "0 16px",
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 500,
    color: active ? "#1d4ed8" : "#374151",
    textDecoration: "none",
    backgroundColor: active ? "rgba(29,78,216,0.08)" : "transparent",
    fontFamily: "sans-serif",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    gap: 6,
    transition: "background 0.2s ease",
  };
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // auto-close on link click
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #e5e7eb",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={container}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111827",
            textDecoration: "none",
            fontFamily: "sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="/logo-light.png"
            alt="Logo"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "30px",
              border: "2px solid #000",
            }}
          />
          Flood Fighter
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 8 }}>
          <Link
            href="/"
            style={navLinkStyle(pathname === "/")}
          >
            <AiOutlineHome /> Home
          </Link>
          <Link
            href="/map"
            style={navLinkStyle(pathname === "/map")}
          >
            <FaMapLocationDot /> Map Visualisation
          </Link>
          <Link
            href="/check"
            style={{
              ...navLinkStyle(pathname === "/check"),
              pointerEvents: "none",
              cursor: "not-allowed",
              color: "#9ca3af",
            }}
          >
            Check postcode (Todo)
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div
          className="mobile-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: "pointer", display: "none" }}
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="mobile-nav"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "16px",
            background: "rgba(255,255,255,0.98)",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Link
            href="/"
            style={navLinkStyle(pathname === "/")}
            onClick={handleLinkClick}
          >
            <AiOutlineHome /> Home
          </Link>
          <Link
            href="/map"
            style={navLinkStyle(pathname === "/map")}
            onClick={handleLinkClick}
          >
            <FaMapLocationDot /> Map Visualisation
          </Link>
          <Link
            href="/check"
            style={{
              ...navLinkStyle(pathname === "/check"),
              pointerEvents: "none",
              cursor: "not-allowed",
              color: "#9ca3af",
            }}
            onClick={handleLinkClick}
          >
            Check postcode (Todo)
          </Link>
        </div>
      )}

      <style jsx>{`
        /* Hide desktop nav on mobile */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-icon {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
