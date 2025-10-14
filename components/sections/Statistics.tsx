import React from "react";
import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaUsers,
  FaInfoCircle,
  FaHandsHelping,
  FaBookOpen,
} from "react-icons/fa";
import Link from "next/link";
import Magnet from "../../src/magnet/Magnet";

export function Statistics() {
  return (
    <section
      style={{
        background: "rgb(191, 214, 248)",
        padding: "60px 20px",
        color: "#1f2937",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ======= Statistics Section ======= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          {[
            {
              number: "500+",
              label: "Flood-prone zones mapped",
              color: "#1e3a8a",
            },
            { number: "2M+", label: "Residents informed", color: "#ca8a04" },
            {
              number: "120+",
              label: "Reservoirs & rivers tracked",
              color: "#15803d",
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 20,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                padding: 30,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
            >
              <p
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  color: stat.color,
                  marginBottom: 6,
                }}
              >
                {stat.number}
              </p>
              <p style={{ color: "#374151", fontSize: 16 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ======= Why Use Our Map ======= */}
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: 40,
          }}
        >
          Why Use Our Map?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 36,
            marginBottom: 60,
          }}
        >
          {[
            {
              icon: <FaMapMarkedAlt size={32} color="#1e40af" />,
              title: "Interactive Flood Maps",
              desc: "Visualize real-time flood zones and track water body levels instantly.",
            },
            {
              icon: <FaShieldAlt size={32} color="#b91c1c" />,
              title: "Safety & Preparedness",
              desc: "Stay informed with alerts, survival checklists, and live safety tips.",
            },
            {
              icon: <FaUsers size={32} color="#15803d" />,
              title: "Community Recovery",
              desc: "Collaborate with local volunteers and access recovery resources.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                borderRadius: 18,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                padding: 28,
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
              }}
            >
              <div style={{ marginBottom: 12 }}>{item.icon}</div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 10,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#374151", fontSize: 15 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ======= How It Works ======= */}
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: 40,
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 36,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          {[
            {
              icon: <FaInfoCircle size={42} color="#1e40af" />,
              step: "Step 1",
              desc: "Open the map to explore flood status near your area.",
              link: "/map",
            },
            {
              icon: <FaBookOpen size={42} color="#ca8a04" />,
              step: "Step 2",
              desc: "Follow easy safety tips and family preparation guides.",
              link: "/knowledge",
            },
            {
              icon: <FaHandsHelping size={42} color="#15803d" />,
              step: "Step 3",
              desc: "Find help centers and recovery resources post-floods.",
              link: "/check-postcode",
            },
          ].map((step, i) => (
            <div key={i} style={{ maxWidth: 320, margin: "0 auto" }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
                }}
              >
                {step.icon}
              </div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 6,
                  color: "#1f2937",
                }}
              >
                {step.step}
              </h4>
              <p style={{ color: "#374151", fontSize: 15 }}>{step.desc}</p>

              {/* Button */}
              <Magnet padding={50} disabled={false} magnetStrength={2}>
                <Link href={step.link}>
                  <button
                    style={{
                      marginTop: 12,
                      backgroundColor: "#1e40af",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1d4ed8")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1e40af")
                    }
                  >
                    Explore More →
                  </button>
                </Link>
              </Magnet>
            </div>
          ))}
        </div>

        {/* ======= Powerful tools ======= */}
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: 40,
          }}
        >
          Powerful tools
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}
        >
          {[
            {
              title: "Emergency Kit",
              desc: "Create your own personalized checklists and instructions to protect your home and family.",
              link: "/before/emergency-kit",
            },
            {
              title: "Quiz sections",
              desc: "Strengthen your flood knowledge by taking our quiz and become a professional flood fighter.",
              link: "/quiz",
            },
          ].map((res, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.9)",
                padding: 28,
                borderRadius: 14,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 8,
                }}
              >
                {res.title}
              </h3>
              <p style={{ color: "#374151", fontSize: 15 }}>{res.desc}</p>

              {/* Button */}
              <Magnet padding={50} disabled={false} magnetStrength={2}>
                <Link href={res.link}>
                  <button
                    style={{
                      marginTop: 12,
                      backgroundColor: "#1e40af",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1d4ed8")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1e40af")
                    }
                  >
                    Explore More →
                  </button>
                </Link>
              </Magnet>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
