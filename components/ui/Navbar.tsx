"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FaMapLocationDot } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi"; // hamburger + close icons
import React, { useEffect, useState } from "react";

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
    color: "#000",
    textDecoration: "none",
    backgroundColor: active ? "rgba(29,78,216,0.08)" : "transparent",
    fontFamily: "sans-serif",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "background 0.2s ease",
  };
}

const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit" },
  { label: "Family Plan", href: "/before/family-plan" },
  { label: "Property Protection", href: "/before/property-protection" },
];
const duringItems = [
  { label: "Safe Shelter", href: "/during/safe-shelter" },
  { label: "Communication", href: "/during/communication" },
  { label: "Protect Yourself", href: "/during/protect-yourself" },
];
const afterItems = [
  { label: "Safety Check", href: "/after/safety-check" },
  { label: "Clean & Disinfection", href: "/after/clean-disinfection" },
  { label: "Mental Support", href: "/after/mental-support" },
];

function HoverMenu({
  title,
  href,
  items,
  active,
}: {
  title: string;
  href: string;
  items: { label: string; href: string }[];
  active: boolean;
}) {
  return (
    <div className="hover-menu">
      <Link href={href} style={navLinkStyle(active)} className="hover-trigger">
        {title}
      </Link>

      <div className="dropdown" role="menu">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="dropdown-item">
            {it.label}
          </Link>
        ))}
      </div>

      <style jsx>{`
        .hover-menu {
          position: relative;
        }
        .hover-trigger {
          display: inline-block;
          cursor: pointer;
        }
        /* Dropdown container */
        .dropdown {
          position: absolute;
          top: calc(100% + 1px);
          left: 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          display: none;
          flex-direction: column;
          min-width: 260px;          /* wider to match pill width */
          padding: 12px;             /* roomy padding like mobile */
          z-index: 60;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
        }
        .hover-menu:hover .dropdown {
          display: flex;
        }

        /* Each item as a pill row */
        .dropdown-item {
          display: block;
          text-decoration: none;
          color: #111827;
          font-weight: 700;
          font-size: 15px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 14px;
          margin: 4px 0;            /* pill spacing */
          transition: background 0.2s ease, border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        /* Hover/active state matches your desktop top nav tone */
        .dropdown-item:hover {
          background: rgba(29, 78, 216, 0.08);
          border-color: #dbeafe;
          box-shadow: 0 6px 16px rgba(29, 78, 216, 0.12);
        }

        /* Hide whole HoverMenu on mobile*/
        @media (max-width: 768px) {
          .hover-menu {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}


function MobileItem({
  href,
  label,
  icon,
  active,
  disabled,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 12,
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    color: "#000",
    background: active ? "rgba(29,78,216,0.08)" : "#f8fafc",
  };
  const disabledStyle: React.CSSProperties = disabled
    ? { color: "#9ca3af", cursor: "not-allowed", pointerEvents: "none", background: "#f3f4f6" }
    : {};
  return (
    <Link href={href} onClick={onClick} style={{ ...base, ...disabledStyle }}>
      <span className="mobile-item-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileSubItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="mobile-subitem">
      {label}
    </Link>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.5 4L3 6.5v13l6.5-2.5 7 2.5L21 18.5v-13l-4.5 1.7-7-2.7z" stroke="#111827" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="14" cy="10" r="1.5" fill="#111827" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" stroke="#6b7280" strokeWidth="1.6" />
      <circle cx="12" cy="10" r="2.5" fill="#6b7280" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isHome = mounted && pathname === "/";
  const isMap = mounted && pathname === "/map";
  const isBefore = mounted && pathname.startsWith("/before");
  const isDuring = mounted && pathname.startsWith("/during");
  const isAfter = mounted && pathname.startsWith("/after");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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
        <Link
          href="/"
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#000",
            textDecoration: "none",
            fontFamily: "sans-serif",
          }}
        >
          Flood Fighter
        </Link>

        <nav className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/" style={navLinkStyle(isHome)}>Home</Link>
          <Link href="/map" style={navLinkStyle(isMap)}>Map visualisation</Link>
          <HoverMenu title="Be prepared before flood" href="/before" items={beforeItems} active={isBefore} />
          <HoverMenu title="Stay safe during flood" href="/during" items={duringItems} active={isDuring} />
          <HoverMenu title="Recover stronger after flood" href="/after" items={afterItems} active={isAfter} />
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen ? "true" : "false"}
          aria-controls="mobile-nav"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          role="navigation"
          aria-label="Mobile navigation"
          className="mobile-nav"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "16px",
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <MobileItem href="/" label="Home" icon={<HomeIcon />} active={isHome} onClick={() => setMenuOpen(false)} />
          <MobileItem href="/map" label="Map Visualisation" icon={<MapIcon />} active={isMap} onClick={() => setMenuOpen(false)} />

          <div className="mobile-section-title">Be prepared before flood</div>
          {beforeItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} onClick={() => setMenuOpen(false)} />
          ))}

          <div className="mobile-section-title">Stay safe during flood</div>
          {duringItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} onClick={() => setMenuOpen(false)} />
          ))}

          <div className="mobile-section-title">Recover stronger after flood</div>
          {afterItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} onClick={() => setMenuOpen(false)} />
          ))}
        </div>
      )}

      {/* SINGLE styled-jsx block in this component */}
      <style jsx>{`
        .mobile-item-icon {
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          flex: 0 0 auto;
        }

        .mobile-subitem {
          text-decoration: none;
          color: #000;
          font-size: 15px;
          padding: 8px 6px;
          border-radius: 8px;
        }

        .mobile-section-title {
          margin-top: 4px;
          font-size: 13px;
          font-weight: 700;
          color: #000;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #000;
          padding: 6px 10px;
          border-radius: 8px;
        }
        .mobile-toggle:hover {
          background: rgba(29, 78, 216, 0.08);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }

        a:focus-visible,
        button:focus-visible {
          outline: 2px solidrgb(0, 0, 0);
          outline-offset: 2px;
          border-radius: 8px;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
