"use client";

import { Button, Card, Typography, Row, Col, Breadcrumb } from "antd";
import { FaArrowLeft, FaInfoCircle, FaQuoteLeft, FaHome } from "react-icons/fa";
import Image from "next/image";

const { Title, Paragraph, Text } = Typography;

export default function SaveShelter() {
  const handleBack = () => {
    window.history.back();
  };

  const getBreadcrumbItems = () => [
    {
      title: <span style={{ color: "#1f2937" }}>Homepage</span>,
    },
    {
      title: (
        <span style={{ color: "#1f2937" }}>Knowledge Of Facing Flood</span>
      ),
    },
    {
      title: (
        <span style={{ color: "#1e40af", fontWeight: "bold" }}>
          Personal Safety Measures
        </span>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        paddingTop: "20px",
        paddingBottom: "64px",
      }}
    >
      {/* Breadcrumb Navigation - Global Display */}
      <div
        style={{
          position: "absolute",
          top: 95,
          left: 0,
          right: 0,
          zIndex: 10,
          marginBottom: 20,
          maxWidth: 1200,
          margin: "0 auto 20px auto",
        }}
      >
        <Breadcrumb
          items={getBreadcrumbItems()}
          separator="→"
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        />
      </div>

      {/* Back button */}
      <Button
        type="text"
        icon={<FaArrowLeft />}
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 80,
          left: 26,
          color: "#000000ff",
          zIndex: 10,
        }}
      />

      <div style={{ maxWidth: 1200, width: "100%", marginTop: 80 }}>
        {/* Main areas */}
        <Row gutter={[32, 32]} align="top">
          {/* Left: text area */}
          <Col xs={24} md={12}>
            <div>
              <Title level={1} style={{ color: "#1890ff", marginBottom: 10 }}>
                Personal Safety Measures
              </Title>
              <Text strong style={{ fontSize: 18, color: "#333" }}>
                Essential Safety Actions to Remember
              </Text>

              <Paragraph
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#333",
                  marginTop: 20,
                }}
              >
                <li>
                    Assume all floodwater is contaminated — do not drink it,
                    swim in it, or let children and pets near it.
                  </li>
                  <li>
                    Use only bottled or pre-stored safe water. If unsure, boil
                    for 1 minute (rolling boil). If boiling isn’t possible,
                    disinfect clear water with unscented household bleach: 2
                    drops per litre (4 if cloudy), stir and wait 30 minutes.
                  </li>
                  <li>
                    If you must enter floodwater, wear gloves and waterproof
                    boots; avoid walking alone in water and keep communication
                    open.
                  </li>
                  <li>
                    Cover cuts and wounds with waterproof dressings to prevent
                    infection; wash hands with soap and safe water (or use
                    sanitiser when water is limited).
                  </li>
                  <li>
                    Eat only sealed, canned, or dry food; discard anything
                    exposed to floodwater. Clean utensils and food surfaces with
                    safe water and disinfectant before use.
                  </li>
                  <li>
                    If toilets or septic systems fail, use lined bags or buckets
                    for waste; seal and store safely until proper disposal.
                  </li>
                  <li>
                    Follow SES and BOM alerts closely for boil-water advisories
                    and evacuation orders.
                  </li>
              </Paragraph>
            </div>
          </Col>

          {/* right: image area */}
          <Col xs={24} md={12}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 16,
                  padding: 12,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  marginBottom: 20,
                  display: "inline-block",
                }}
              >
                <Image
                  src="/images/personal_safety.png"
                  alt="Personal-safety-measure-image"
                  width={500}
                  height={450}
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Expert Opinion section */}
        <Row style={{ marginTop: 40 }}>
          <Col span={24}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: "1px solid #d9d9d9",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <div>
                  {/* i logo for expert opinion */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <FaInfoCircle
                      style={{ fontSize: 20, color: "#1890ff", marginRight: 8 }}
                    />
                    <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
                      Expert Opinion
                    </Title>
                  </div>

                  <Paragraph
                    style={{
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: "#333",
                      fontStyle: "italic",
                    }}
                  >
                    “During floods, always treat floodwater as contaminated. Do
                    not swim, walk, or let children and pets play in it. Use
                    only bottled or pre-stored safe water; if uncertain, boil it
                    for 1 minute or disinfect with bleach. When cleaning or
                    entering floodwater, wear waterproof boots and gloves, and
                    cover any cuts to prevent infection.”
                  </Paragraph>
                  <Text strong style={{ color: "#666", fontSize: 14 }}>
                    — Adapted from{" "}
                      <a
                        href="https://www.who.int/news-room/questions-and-answers/item/how-do-i-protect-my-health-in-a-flood"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WHO
                      </a>{" "}
                      &{" "}
                      <a
                        href="https://www.health.nsw.gov.au/emergency_preparedness/weather/factsheets/staying-healthy-during-after-floods.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NSW Health
                      </a>
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
