"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { BsShieldCheck, BsChatDots } from "react-icons/bs";
import { MdOutlineCleaningServices } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";

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
    gap: 8,
    transition: "background 0.2s ease",
  };
}

const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit", icon: <AiOutlineCheckCircle /> },
  { label: "Family Plan", href: "/before/family-plan", icon: <BsChatDots /> },
  { label: "Property Protection", href: "/before/property-protection", icon: <BsShieldCheck /> },
];
const duringItems = [
  { label: "Safe Shelter", href: "/during/save-shelter", icon: <BsShieldCheck /> },
  { label: "Communication", href: "/during/communication", icon: <BsChatDots /> },
  { label: "Protect Yourself", href: "/during/protect-yourself", icon: <AiOutlineCheckCircle /> },
];
const afterItems = [
  { label: "Safety Check", href: "/after/safety-check", icon: <AiOutlineCheckCircle /> },
  { label: "Clean & Disinfection", href: "/after/clean-disinfection", icon: <MdOutlineCleaningServices /> },
  { label: "Mental Support", href: "/after/mental-support", icon: <BsChatDots /> },
];

function AntdDropdownMenu({
  title,
  href,
  items,
  active,
  icon,
}: {
  title: string;
  href: string;
  items: { label: string; href: string; icon: React.ReactNode }[];
  active: boolean;
  icon: React.ReactNode;
}) {
  const menu = (
    <Menu
      items={items.map((it) => ({
        key: it.href,
        label: (
          <Link href={it.href} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {it.icon} {it.label}
          </Link>
        ),
      }))}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <Link href={href} style={navLinkStyle(active)}>
        {icon} {title}
      </Link>
    </Dropdown>
  );
}

function MobileItem({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 12,
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    color: "#000",
    background: active ? "rgba(29,78,216,0.08)" : "#f8fafc",
  };
  return (
    <Link href={href} onClick={onClick} style={base}>
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileSubItem({
  href,
  label,
  icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="mobile-subitem">
      {icon}
      <span style={{ marginLeft: 8 }}>{label}</span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isMap = mounted && pathname === "/map";
  const isPostCode = mounted && pathname === "/check-postcode";
  const isBefore = mounted && pathname.startsWith("/before");
  const isDuring = mounted && pathname.startsWith("/during");
  const isAfter = mounted && pathname.startsWith("/after");

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
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="/logo.jpeg"
            style={{
              height: "42px",
              width: "42px",
              borderRadius: "50%",
              border: "2px solid #000",
              marginRight: 8,
            }}
          />
          Flood Fighter
        </Link>

        <nav className="desktop-nav" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/map" style={navLinkStyle(isMap)}>
            <FaMapLocationDot /> Map Visualisation
          </Link>
           <Link href="/check-postcode" style={navLinkStyle(isPostCode)}>
            <FaLocationDot /> Check Postcode
          </Link>
          <AntdDropdownMenu title="Before Flood" href="/before" items={beforeItems} active={isBefore} icon={<BsShieldCheck />} />
          <AntdDropdownMenu title="During Flood" href="/during" items={duringItems} active={isDuring} icon={<AiOutlineCheckCircle />} />
          <AntdDropdownMenu title="After Flood" href="/after" items={afterItems} active={isAfter} icon={<MdOutlineCleaningServices />} /> 
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <MobileItem href="/map" label="Map" icon={<FaMapLocationDot />} active={isMap} onClick={() => setMenuOpen(false)} />
           <MobileItem href="/check-postcode" label="Check PostCode" icon={<FaLocationDot />} active={isPostCode} onClick={() => setMenuOpen(false)} />

          <div className="mobile-section-title">Before Flood</div>
          {beforeItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} icon={it.icon} onClick={() => setMenuOpen(false)} />
          ))}

          <div className="mobile-section-title">During Flood</div>
          {duringItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} icon={it.icon} onClick={() => setMenuOpen(false)} />
          ))}

          <div className="mobile-section-title">After Flood</div>
          {afterItems.map((it) => (
            <MobileSubItem key={it.href} href={it.href} label={it.label} icon={it.icon} onClick={() => setMenuOpen(false)} />
          ))} 
        </div>
      )}

      <style jsx>{`
        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px 16px;
          background: #fff;
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        .mobile-subitem {
          display: flex;
          align-items: center;
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 500;
          border-radius: 10px;
          text-decoration: none;
          color: #111;
          background: #f9fafb;
          transition: background 0.2s ease;
        }
        .mobile-subitem:hover {
          background: rgba(29, 78, 216, 0.08);
        }
        .mobile-section-title {
          margin-top: 14px;
          margin-bottom: 4px;
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          padding-left: 4px;
          border-left: 3px solid #2563eb;
        }
        .mobile-toggle {
          display: none;
          color: #000;
          background: transparent;
          border: none;
          font-size: 26px;
          cursor: pointer;
          padding: 6px 10px;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
