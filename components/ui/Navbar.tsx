"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineCleaningServices, MdOutlineWaterDrop } from "react-icons/md";
import { FaMapLocationDot, FaLocationDot, FaRegClock } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";
import { ChevronDown } from "lucide-react";

import {
  Menu,
  MenuItem,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ------------------- Nav Data -------------------
const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit", icon: <AiOutlineCheckCircle /> },
  { label: "Family Flood Plan", href: "/before/family-plan", icon: <BsChatDots /> },
  { label: "Property Protection", href: "/before/property-protection", icon: <BsShieldCheck /> },
];

const duringItems = [
  
  { label: "Personal Safety Measures", href: "/during/personal-safety-measures", icon: <AiOutlineCheckCircle /> },
  { label: "Health & Hygiene", href: "/during/health-and-hygiene", icon: <BsShieldCheck /> },
  { label: "Mental & Emotional Wellbeing", href: "/during/mental-and-emotional-wellbeing", icon: <BsChatDots /> },
];

const afterItems = [
  { label: "Safety Check", href: "/after/safety-check", icon: <AiOutlineCheckCircle /> },
  { label: "Clean & Disinfection", href: "/after/clean-disinfection", icon: <MdOutlineCleaningServices /> },
  { label: "Mental Support", href: "/after/mental-support", icon: <BsChatDots /> },
];

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

export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Separate anchor states for each dropdown
  const [beforeAnchor, setBeforeAnchor] = useState<null | HTMLElement>(null);
  const [duringAnchor, setDuringAnchor] = useState<null | HTMLElement>(null);
  const [afterAnchor, setAfterAnchor] = useState<null | HTMLElement>(null);

  const beforeOpen = Boolean(beforeAnchor);
  const duringOpen = Boolean(duringAnchor);
  const afterOpen = Boolean(afterAnchor);

  const [menuOpen, setMenuOpen] = useState(false);

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
      <div
        style={{
          margin: "0 auto",
          padding: "0 16px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
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
          {/* Before Flood */}
          <div
            onMouseEnter={(e) => setBeforeAnchor(e.currentTarget)}
            onMouseLeave={() => setBeforeAnchor(null)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              href="/knowledge"
              style={{
                ...navLinkStyle(mounted && pathname.startsWith("/before")),
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <FaRegClock  size={20}/> Before Flood
            </Link>
            <Button
              style={{
                textTransform: "none",
                minWidth: "auto",
                padding: "10px 6px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#000",
              }}
            >
              <ChevronDown size={16} />
            </Button>

            <Menu
              id="before-menu"
              anchorEl={beforeAnchor}
              open={beforeOpen}
              onClose={() => setBeforeAnchor(null)}
              MenuListProps={{ onMouseLeave: () => setBeforeAnchor(null) }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              disableScrollLock
            >
              <div style={{marginTop:'10px'}}></div>
              {beforeItems.map((it) => (
                <MenuItem key={it.href} onClick={() => setBeforeAnchor(null)}>
                  <Link
                    href={it.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#000",
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    {it.icon} {it.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* During Flood */}
          <div
            onMouseEnter={(e) => setDuringAnchor(e.currentTarget)}
            onMouseLeave={() => setDuringAnchor(null)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              href="/knowledge"
              style={{
                ...navLinkStyle(mounted && pathname.startsWith("/during")),
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <MdOutlineWaterDrop  size={20}/> During Flood
            </Link>
            <Button
              style={{
                textTransform: "none",
                minWidth: "auto",
                padding: "10px 6px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#000",
              }}
            >
              <ChevronDown size={16} />
            </Button>

            <Menu
              id="during-menu"
              anchorEl={duringAnchor}
              open={duringOpen}
              onClose={() => setDuringAnchor(null)}
              MenuListProps={{ onMouseLeave: () => setDuringAnchor(null) }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              disableScrollLock
            >
              <div style={{marginTop:'10px'}}></div>
              {duringItems.map((it) => (
                <MenuItem key={it.href} onClick={() => setDuringAnchor(null)}>
                  <Link
                    href={it.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#000",
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    {it.icon} {it.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* After Flood */}
          <div
            onMouseEnter={(e) => setAfterAnchor(e.currentTarget)}
            onMouseLeave={() => setAfterAnchor(null)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link
              href="/knowledge"
              style={{
                ...navLinkStyle(mounted && pathname.startsWith("/after")),
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <BsShieldCheck size={20}/> After Flood
            </Link>
            <Button
              style={{
                textTransform: "none",
                minWidth: "auto",
                padding: "10px 6px",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "#000",
              }}
            >
              <ChevronDown size={16} />
            </Button>

            <Menu
              id="after-menu"
              anchorEl={afterAnchor}
              open={afterOpen}
              onClose={() => setAfterAnchor(null)}
              MenuListProps={{ onMouseLeave: () => setAfterAnchor(null) }}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              disableScrollLock
            >
              <div style={{marginTop:'10px'}}></div>
              {afterItems.map((it) => (
                <MenuItem key={it.href} onClick={() => setAfterAnchor(null)}>
                  <Link
                    href={it.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#000",
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    {it.icon} {it.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </div>

          {/* Other Nav Items */}
          <Link href="/map" style={navLinkStyle(mounted && pathname === "/map")}>
            <FaMapLocationDot /> Map Visualisation
          </Link>
          <Link href="/check-postcode" style={navLinkStyle(mounted && pathname === "/check-postcode")}>
            <FaLocationDot /> Check Postcode
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            color: "#000",
            background: "transparent",
            border: "none",
            fontSize: 26,
            cursor: "pointer",
            padding: "6px 10px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="mobile-nav">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Before Flood</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'flex', flexDirection:'column', gap:"10px"}}>
              {beforeItems.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="mobile-subitem">
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>During Flood</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'flex', flexDirection:'column', gap:"10px"}}>
              {duringItems.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="mobile-subitem">
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>After Flood</Typography>
            </AccordionSummary>
            <AccordionDetails style={{display:'flex', flexDirection:'column', gap:"10px"}}>
              {afterItems.map((it) => (
                <Link key={it.href} href={it.href} onClick={() => setMenuOpen(false)} className="mobile-subitem">
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>

          <Link href="/map" style={navLinkStyle(mounted && pathname === "/map")}>
            <FaMapLocationDot /> Map Visualisation
          </Link>
          <Link href="/check-postcode" style={navLinkStyle(mounted && pathname === "/check-postcode")}>
            <FaLocationDot /> Check Postcode
          </Link>
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
          display: block;
          padding: 8px 12px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          color: #111;
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
