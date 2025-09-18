import React from "react";
import Link from "next/link";
import { Card, Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function SectionCard() {
  return (
    <section
      style={{
        background: "#bfd6f8ff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Title level={1} style={{ color: "#1e3a8a" }}>
            Flood Fighter at a Glance
          </Title>
          <Paragraph
            style={{
              color: "#1f2937",
              fontSize: 20,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            Flood Fighter: Stay Ready, Stay Safe is an interactive website
            designed to help communities prepare before, during, and after
            floods. Unlike existing platforms that focus mainly on alerts, Flood
            Fighter provides clear, practical steps to protect families, keep
            water safe, and maintain hygiene during emergencies.
          </Paragraph>
        </div>

        {/* Card Grid */}
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.85)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                color: "#111",
                height: "100%",
              }}
              hoverable
            >
              <Title level={2} style={{ color: "#1e40af" }}>
                🌊 The Problem We’re Solving
              </Title>
              <Paragraph style={{ color: "#374151", fontSize: 18 }}>
                Floods are among the most frequent and damaging natural
                disasters in Australia. Platforms mainly answer “Is a flood
                coming?” but rarely address: “How do I keep my household’s water
                safe when the flood is here?”
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.85)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                color: "#111",
                height: "100%",
              }}
              hoverable
            >
              <Title level={2} style={{ color: "#1e40af" }}>
                ✅ Our Solution
              </Title>
              <Paragraph style={{ color: "#374151", fontSize: 20 }}>
                Flood Fighter bridges the gap between flood alerts and
                real-world actions with:
              </Paragraph>
              <ul style={{ color: "#374151", paddingLeft: 20, fontSize: 20 }}>
                <li>📍 Interactive Map</li>
                <li>🏠 Local Risk Check</li>
                <li>📖 Guidelines & Resources</li>
                <li>💧 Hygiene & Clean Water Tips</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
