import React from "react";
import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaInfoCircle,
  FaHandsHelping,
  FaBookOpen,
} from "react-icons/fa";

export function Statistics() {
  return (
    <section
      style={{
        background: "#000",
        padding: "20px 20px",
        color: "#f9fafb",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section 1 - Impact Stats */}
        
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
            <p style={{ fontSize: 40, fontWeight: 700, color: "#38bdf8" }}>500+</p>
            <p style={{ color: "#d1d5db" }}>Flood-prone zones mapped</p>
          </div>
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#fbbf24" }}>2M+</p>
            <p style={{ color: "#d1d5db" }}>Residents informed</p>
          </div>
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#4ade80" }}>120+</p>
            <p style={{ color: "#d1d5db" }}>Reservoirs & rivers tracked</p>
          </div>
          <div>
            <p style={{ fontSize: 40, fontWeight: 700, color: "#f87171" }}>24/7</p>
            <p style={{ color: "#d1d5db" }}>Live monitoring updates</p>
          </div>
        </div>

        {/* Section 2 - Benefits */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
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
              icon: <FaMapMarkedAlt size={28} color="#38bdf8" />,
              title: "Interactive Flood Maps",
              desc: "Visualize real-time flood zones and water bodies to understand risks nearby.",
            },
            {
              icon: <FaShieldAlt size={28} color="#f87171" />,
              title: "Safety & Preparedness",
              desc: "Step-by-step guides and resources to stay safe during floods.",
            },
            {
              icon: <FaClock size={28} color="#fbbf24" />,
              title: "Real-Time Updates",
              desc: "Timely alerts and updates from trusted agencies to act fast.",
            },
            {
              icon: <FaUsers size={28} color="#4ade80" />,
              title: "Community Recovery",
              desc: "Access support and recovery resources for affected communities.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 28,
                borderRadius: 16,
              }}
            >
              {item.icon}
              <h3 style={{ marginTop: 16, fontSize: 20, fontWeight: 700 }}>
                {item.title}
              </h3>
              <p style={{ color: "#d1d5db", marginTop: 8 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Section 3 - How It Works */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
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
            <FaInfoCircle size={40} color="#38bdf8" />
            <h4 style={{ marginTop: 12 }}>Step 1</h4>
            <p style={{ color: "#d1d5db" }}>Open the map and explore flood zones near you.</p>
          </div>
          <div>
            <FaBookOpen size={40} color="#fbbf24" />
            <h4 style={{ marginTop: 12 }}>Step 2</h4>
            <p style={{ color: "#d1d5db" }}>Read practical safety tips and preparation guides.</p>
          </div>
          <div>
            <FaShieldAlt size={40} color="#f87171" />
            <h4 style={{ marginTop: 12 }}>Step 3</h4>
            <p style={{ color: "#d1d5db" }}>Get alerts and real-time updates during flood events.</p>
          </div>
          <div>
            <FaHandsHelping size={40} color="#4ade80" />
            <h4 style={{ marginTop: 12 }}>Step 4</h4>
            <p style={{ color: "#d1d5db" }}>Find recovery resources and support after floods.</p>
          </div>
        </div>

        {/* Section 4 - Emergency Resources */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
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
          <div style={{ background: "rgba(255,255,255,0.05)", padding: 24, borderRadius: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Government Alerts</h3>
            <p style={{ color: "#d1d5db", marginTop: 8 }}>
              Official warnings from meteorological and emergency services.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: 24, borderRadius: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Preparation Guides</h3>
            <p style={{ color: "#d1d5db", marginTop: 8 }}>
              Handy checklists and steps to prepare your family and property.
            </p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: 24, borderRadius: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Recovery Support</h3>
            <p style={{ color: "#d1d5db", marginTop: 8 }}>
              Access resources to rebuild and apply for community assistance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
