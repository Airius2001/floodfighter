"use client";

import { Typography, Button, Row, Col, Card, Breadcrumb } from "antd";
import {
  AiOutlineHome,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import {
  MdOutlineHealthAndSafety,
  MdOutlineWarning,
} from "react-icons/md";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import { GiElectric, GiGasStove, GiBrokenWall } from "react-icons/gi";

const { Title, Paragraph, Text } = Typography;

export default function SafetyCheck() {
  const handleBack = () => {
    window.history.back();
  };

  // Safety tips list
  const bullets = [
    {
      icon: <GiBrokenWall size={28} color="#1677ff" />,
      text:
        "Check for structural damage before entering — look for cracks, leaning walls, or sagging roofs.",
    },
    {
      icon: <GiElectric size={28} color="#1677ff" />,
      text:
        "Stay away from downed power lines or wet switchboards. Do not use electricity until inspected.",
    },
    {
      icon: <MdOutlineHealthAndSafety size={28} color="#1677ff" />,
      text:
        "Do not turn on appliances or gas until checked by a licensed professional.",
    },
    {
      icon: <GiGasStove size={28} color="#1677ff" />,
      text:
        "Ventilate the home to remove gas, fuel, or chemical fumes before staying inside.",
    },
    {
      icon: <MdOutlineWarning size={28} color="#1677ff" />,
      text:
        "If anything feels unsafe, do not enter. Contact local authorities or emergency services.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(240, 242, 245)",
        padding: "32px 16px",
      }}
    >
     
      <Row justify="center">
        <Col xs={24} lg={20} xl={18}>
          {/* ── Navigation (Back + Breadcrumb) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center", 
              gap: 12,
              marginBottom: 24,
            }}
          >
            <Button
              type="text"
              icon={<FaArrowLeft />}
              onClick={handleBack}
              style={{
                color: "#000",
                padding: "0 8px",
                fontSize: 16,
                height: "auto", 
                lineHeight: "1.4", 
                display: "flex",
                alignItems: "center",
              }}
            >
              Back
            </Button>
  
            <div style={{ position: "relative", top: "1px" }}>
              <Breadcrumb
                items={[
                  { href: "/", title: (<><AiOutlineHome /> Home</>) },
                  { href: "/knowledge", title: "Knowledge of Facing Flood" },
                  { title: "Safety Check" },
                ]}
                style={{ margin: 0, fontSize: "1rem", lineHeight: "1.4" }}
              />
            </div>
          </div>

          {/* ===== Top Layout: left content + right image ===== */}
          <Row gutter={[32, 32]} align="top">
            {/* Left column: all text + cards */}
            <Col xs={24} md={14} lg={16}>
              <Title level={2} style={{ color: "#1677ff", fontSize: "2rem", marginBottom: 32, }}>
                Safety Check
              </Title>
              <Paragraph
                style={{
                  marginBottom: 80,
                  color: "#475467",
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                }}
              >
                Taking safety precautions before re-entering your home after a
                flood is essential.
              </Paragraph>

              {/* Stack all safety tip cards vertically */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {bullets.map((b, i) => (
                  <Card
                    key={i}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      boxShadow:
                        "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
                      padding: "1rem 1.2rem",
                    }}
                    styles={{
                      body: { padding: 0 },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                      }}
                    >
                      {b.icon}
                      <Text
                        style={{
                          fontSize: "1.15rem",
                          lineHeight: 1.8,
                          color: "#1F2937",
                        }}
                      >
                        {b.text}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>

            {/* Right column: image */}
            <Col xs={24} md={10} lg={8}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
                  padding: 10,
                  position: "sticky",
                  top: 100, // keeps image visible when scrolling
                }}
              >
                <img
                  src="/images/safety.png"
                  alt="Safety Check"
                  style={{
                    width: "100%",
                    height: 450,
                    objectFit: "cover",
                    borderRadius: 12,
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/images/placeholder-16x9.jpg";
                  }}
                />
              </div>
            </Col>
          </Row>

          {/* ===== Footer Note ===== */}
          <Paragraph
            style={{
              textAlign: "center",
              color: "#667085",
              marginTop: 40,
              fontSize: "1.05rem",
            }}
          >
            <AiOutlineCheckCircle style={{ verticalAlign: -3 }} /> Always
            prioritise personal safety before starting any clean-up.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
