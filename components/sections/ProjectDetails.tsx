import React from "react";
import Link from "next/link";
import { Card, Row, Col, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

export default function SectionCard() {
  return (
    <section
      style={{
        background: "#000",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Title level={1} style={{ color: "#fff" }}>
            Flood Fighter at a Glance
          </Title>
          <Paragraph style={{ color: "#d1d5db", fontSize: 20, maxWidth: 800, margin: "0 auto" }}>
            Flood Fighter: Stay Ready, Stay Safe is an interactive website designed to help
            communities prepare before, during, and after floods. Unlike existing platforms that
            focus mainly on alerts, Flood Fighter provides clear, practical steps to protect
            families, keep water safe, and maintain hygiene during emergencies.
          </Paragraph>
        </div>

        {/* Card Grid */}
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                height: "100%",
              }}
              hoverable
            >
              <Title level={2} style={{ color: "#fff" }}>
                🌊 The Problem We’re Solving
              </Title>
              <Paragraph style={{ color: "#ccc", fontSize: 18 }}>
                Floods are among the most frequent and damaging natural disasters in Australia. 
                Platforms mainly answer “Is a flood coming?” but rarely address: 
                “How do I keep my household’s water safe when the flood is here?”
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#fff",
                height: "100%",
              }}
              hoverable
            >
              <Title level={2} style={{ color: "#fff" }}>
                ✅ Our Solution
              </Title>
              <Paragraph style={{ color: "#ccc",fontSize: 20}}>
                Flood Fighter bridges the gap between flood alerts and real-world actions with: 
              </Paragraph>
              <ul style={{ color: "#ccc", paddingLeft: 20,fontSize: 20 }}>
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
