"use client";

import { useState } from "react";
import { Card, Typography, Space, Row, Col, Button, message } from "antd";
import { FaInfoCircle, FaWater, FaExclamationTriangle, FaHandsHelping } from "react-icons/fa";

const { Title, Paragraph } = Typography;

export default function ProtectYourself() {
  const [actionMessage, setActionMessage] = useState("");

  const handleFloodTips = () => {
    setActionMessage("Displaying important flood safety tips...");
    message.info("Check the latest flood safety tips!");
  };

  const handleEmergencyHelp = () => {
    setActionMessage("Contacting emergency help resources...");
    message.success("Emergency help resources ready!");
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
            <FaInfoCircle size={60} color="#0af" />
          </Col>
          <Col xs={24} md={18}>
            <Title level={2} style={{ color: "#0af" }}>
              Protect Yourself
            </Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              During floods, it is crucial to stay safe by avoiding hazards and taking preventive measures.
              Knowledge and preparation can significantly reduce risk.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              Key safety measures:
            </Paragraph>
            <ul style={{ color: "#fff", marginLeft: 20 }}>
              <li>
                <FaExclamationTriangle style={{ marginRight: 8 }} />
                Avoid walking or driving through floodwaters – even shallow water can be dangerous.
              </li>
              <li>
                <FaWater style={{ marginRight: 8 }} />
                Move to higher ground and stay away from rivers, drains, or flooded areas.
              </li>
              <li>
                <FaHandsHelping style={{ marginRight: 8 }} />
                Keep emergency supplies ready: water, food, first aid kit, and essential documents.
              </li>
              <li>
                Stay updated with local flood alerts and emergency instructions.
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
