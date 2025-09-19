"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaMapLocationDot, FaLocationDot } from "react-icons/fa6";
import { BsChatDots } from "react-icons/bs";
import { ChevronDown } from "lucide-react";

// Material UI
import {
  Menu,
  MenuItem,
  Button,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ------------------- Nav Data -------------------
const beforeItems = [
  {
    label: "Emergency Kit",
    href: "/before/emergency-kit",
    icon: <AiOutlineCheckCircle />,
  },
  {
    label: "Family Flood Plan",
    href: "/before/family-plan",
    icon: <BsChatDots />,
  },
  {
    label: "Property Protection",
    href: "/before/property-protection",
    icon: <BsShieldCheck />,
  },
];
const duringItems = [
  {
    label: "Safe Shelter",
    href: "/during/save-shelter",
    icon: <BsShieldCheck />,
  },
  {
    label: "Communication",
    href: "/during/communication",
    icon: <BsChatDots />,
  },
  {
    label: "Protect Yourself",
    href: "/during/protect-yourself",
    icon: <AiOutlineCheckCircle />,
  },
];
const afterItems = [
  {
    label: "Safety Check",
    href: "/after/safety-check",
    icon: <AiOutlineCheckCircle />,
  },
  {
    label: "Clean & Disinfection",
    href: "/after/clean-disinfection",
    icon: <MdOutlineCleaningServices />,
  },
  {
    label: "Mental Support",
    href: "/after/mental-support",
    icon: <BsChatDots />,
  },
];

// ------------------- Style Helper -------------------
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

// ------------------- Navbar -------------------
export function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [openflood, setOpenflood] = useState(false);

  // Material UI Menu control
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mobile menu control
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

        {/* Desktop Nav */}
        <nav
          className="desktop-nav"
          style={{ display: "flex", gap: 8, alignItems: "center" }}
        >
          {/* Knowledge of Facing Flood (MUI Menu) */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Add a main button that can be clicked to jump to another page. */}
            <Link
              href="/knowledge"
              style={{
                ...navLinkStyle(mounted && pathname.startsWith("/knowledge")),
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <BsShieldCheck /> Knowledge of Facing Flood
            </Link>

            {/* 下拉按钮 */}
            <Button
              id="knowledge-button"
              aria-controls={open ? "knowledge-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
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
              id="knowledge-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "knowledge-button" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* Before Flood */}
              <Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>
                Before Flood
              </Typography>
              {beforeItems.map((it) => (
                <MenuItem key={it.href} onClick={handleClose}>
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
              <Divider />

              {/* During Flood */}
              <Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>
                During Flood
              </Typography>
              {duringItems.map((it) => (
                <MenuItem key={it.href} onClick={handleClose}>
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
              <Divider />

              {/* After Flood */}
              <Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>
                After Flood
              </Typography>
              {afterItems.map((it) => (
                <MenuItem key={it.href} onClick={handleClose}>
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

          <Link
            href="/map"
            style={navLinkStyle(mounted && pathname === "/map")}
          >
            <FaMapLocationDot /> Map Visualisation
          </Link>
          <Link
            href="/check-postcode"
            style={navLinkStyle(mounted && pathname === "/check-postcode")}
          >
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
          <Link
            href="/knowledge"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            <BsShieldCheck /> Knowledge of Facing Flood
          </Link>

          <Link
            href="/map"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            <FaMapLocationDot /> Map
          </Link>
          <Link
            href="/check-postcode"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            <FaLocationDot /> Check PostCode
          </Link>

          {/* Accordion for Knowledge */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Before Flood</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {beforeItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-subitem"
                >
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>During Flood</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {duringItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-subitem"
                >
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>After Flood</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {afterItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-subitem"
                >
                  {it.icon} {it.label}
                </Link>
              ))}
            </AccordionDetails>
          </Accordion>
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
        .mobile-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          padding: 12px;
          text-decoration: none;
          border-radius: 8px;
          color: #000;
          background: #f8fafc;
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
