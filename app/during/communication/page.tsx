"use client";

import { useState } from "react";
import { Card, Typography, Space, Row, Col, Button, message } from "antd";
import { FaComments, FaWifi, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const { Title, Paragraph } = Typography;

export default function Communication() {
  const [actionMessage, setActionMessage] = useState("");

  const handleCheckAlerts = () => {
    setActionMessage("Checking latest flood alerts...");
    message.info("Fetching latest emergency communication alerts!");
  };

  const handleContactHelp = () => {
    setActionMessage("Connecting you to emergency contacts...");
    message.success("Emergency contact resources are ready!");
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
            <FaComments size={60} color="#0af" />
          </Col>
          <Col xs={24} md={18}>
            <Title level={2} style={{ color: "#0af" }}>
              Communication
            </Title>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              Staying connected during floods is essential for safety. Ensure you have multiple ways to receive updates and contact help when needed.
            </Paragraph>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color:"#fff" }}>
              Effective communication strategies include:
            </Paragraph>
            <ul style={{ color: "#fff", marginLeft: 20 }}>
              <li>
                <FaWifi style={{ marginRight: 8 }} />
                Keep your devices charged and have backup power sources.
              </li>
              <li>
                <FaPhoneAlt style={{ marginRight: 8 }} />
                Maintain a list of emergency contacts and share your location with family.
              </li>
              <li>
                <FaEnvelope style={{ marginRight: 8 }} />
                Sign up for local flood alerts and notifications.
              </li>
              <li>
                Use multiple communication channels: SMS, social media, radio, or apps.
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
