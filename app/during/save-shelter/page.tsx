"use client";

import { useState } from "react";
import { Button, Card, Typography, Space, Row, Col, message } from "antd";
import { FaHome, FaShieldAlt, FaWater, FaHandsHelping } from "react-icons/fa";

const { Title, Paragraph } = Typography;

export default function SaveShelter() {
  const [actionMessage, setActionMessage] = useState("");

  const handleLocateShelter = () => {
    setActionMessage("Searching for nearby safe shelters...");
    message.info("Finding nearby shelters...");
    // Placeholder: Add actual location/fetch logic here
  };

  const handlePrepareShelter = () => {
    setActionMessage("Preparing your shelter checklist...");
    message.success("Shelter checklist prepared!");
    // Placeholder: Add actual checklist logic here
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 900,
          width: "100%",
          backgroundColor: "#111",
          borderRadius: 12,
          border: "1px solid #333",
        }}
        bodyStyle={{ padding: "40px" }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6} className="flex-center" style={{ textAlign: "center" }}>
            <FaHome size={60} color="#0af" />
          </Col>
          <Col xs={24} md={18}>
            <Title level={2} style={{ color: "#0af" }}>
              Save Shelter
            </Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              Protect yourself and your loved ones during floods by staying in
              designated safe shelters. Knowing how to reach and prepare a
              shelter in advance can save lives.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              Key steps for shelter safety include:
            </Paragraph>
            <ul style={{ color: "#fff", marginLeft: 20 }}>
              <li>
                <FaShieldAlt style={{ marginRight: 8 }} />
                Identify nearby designated shelters in your area.
              </li>
              <li>
                <FaWater style={{ marginRight: 8 }} />
                Ensure the shelter is above flood levels and accessible.
              </li>
              <li>
                <FaHandsHelping style={{ marginRight: 8 }} />
                Keep emergency supplies: water, food, first aid, and blankets.
              </li>
              <li>
                Stay informed with flood alerts and local emergency instructions.
              </li>
            </ul>

            {actionMessage && (
              <Paragraph style={{ marginTop: 20, color: "#0af" }}>
                {actionMessage}
              </Paragraph>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
