import React from "react";
import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaUsers,
  FaInfoCircle,
  FaHandsHelping,
  FaBookOpen,
} from "react-icons/fa";

export function Statistics() {
  return (
    <section
      style={{
        background: "#bfd6f8ff",
        padding: "20px 20px",
        color: "#1f2937",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
            marginBottom: 50,
            textAlign: "center",
            paddingTop: "20px",
          }}
        >
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#1e40af" }}>
              500+
            </p>
            <p style={{ color: "#374151" }}>Flood-prone zones mapped</p>
          </div>
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#ca8a04" }}>
              2M+
            </p>
            <p style={{ color: "#374151" }}>Residents informed</p>
          </div>
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#15803d" }}>
              120+
            </p>
            <p style={{ color: "#374151" }}>Reservoirs & rivers tracked</p>
          </div>
        </div>

        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
            color: "#1e3a8a",
          }}
        >
          Why Use Our Map?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 32,
            marginBottom: 50,
          }}
        >
          {[
            {
              icon: <FaMapMarkedAlt size={28} color="#1e40af" />,
              title: "Interactive Flood Maps",
              desc: "Visualize real-time flood zones and water bodies to understand risks nearby.",
            },
            {
              icon: <FaShieldAlt size={28} color="#b91c1c" />,
              title: "Safety & Preparedness",
              desc: "Step-by-step guides and resources to stay safe during floods.",
            },
            {
              icon: <FaUsers size={28} color="#15803d" />,
              title: "Community Recovery",
              desc: "Access support and recovery resources for affected communities.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.85)",
                padding: 28,
                borderRadius: 16,
                color: "#111",
              }}
            >
              {item.icon}
              <h3
                style={{
                  marginTop: 16,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#374151", marginTop: 8 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
            color: "#1e3a8a",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          <div>
            <FaInfoCircle size={40} color="#1e40af" />
            <h4 style={{ marginTop: 12, color: "#1f2937" }}>Step 1</h4>
            <p style={{ color: "#374151" }}>
              Open the map and explore flood zones near you.
            </p>
          </div>
          <div>
            <FaBookOpen size={40} color="#ca8a04" />
            <h4 style={{ marginTop: 12, color: "#1f2937" }}>Step 2</h4>
            <p style={{ color: "#374151" }}>
              Read practical safety tips and preparation guides.
            </p>
          </div>
          <div>
            <FaHandsHelping size={40} color="#15803d" />
            <h4 style={{ marginTop: 12, color: "#1f2937" }}>Step 3</h4>
            <p style={{ color: "#374151" }}>
              Find recovery resources and support after floods.
            </p>
          </div>
        </div>

        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 40,
            color: "#1e3a8a",
          }}
        >
          Emergency Resources
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            marginBottom: 50,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
              Government Alerts
            </h3>
            <p style={{ color: "#374151", marginTop: 8 }}>
              Official warnings from meteorological and emergency services.
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
              Preparation Guides
            </h3>
            <p style={{ color: "#374151", marginTop: 8 }}>
              Handy checklists and steps to prepare your family and property.
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.85)",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b" }}>
              Recovery Support
            </h3>
            <p style={{ color: "#374151", marginTop: 8 }}>
              Access resources to rebuild and apply for community assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
