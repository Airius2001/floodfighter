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
          Mental And Emotional Wellbeing
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
                Mental And Emontional Wellbeing
              </Title>
              <Text strong style={{ fontSize: 18, color: "#333" }}>
                Stay Calm, Stay Strong
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
                    It’s normal to feel shock, fear, sadness or anger after a
                    flood—these feelings usually ease with time. Reach out early
                    for support if they persist.
                  </li>
                  <li>
                    Stay connected: talk to family, friends, neighbours or a
                    GP. Use community and helpline supports such as{" "}
                    <a
                      href="https://www.beyondblue.org.au/mental-health/natural-disasters"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Beyond Blue (1300 22 4636)
                    </a>{" "}
                    or{" "}
                    <a
                      href="https://www.redcross.org.au/emergencies/coping-after-a-crisis/returning-home-and-coping-after-a-crisis/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Australian Red Cross
                    </a>
                    .
                  </li>
                  <li>
                    Limit doom-scrolling: set specific check-in times for news
                    and stick to trusted sources to reduce anxiety.
                  </li>
                  <li>
                    Keep simple routines where possible—regular meals, movement,
                    and consistent sleep/wake times help your brain recover.
                  </li>
                  <li>
                    Help children feel safe: explain what’s happening in simple,
                    honest terms; keep them close; maintain routines; limit
                    distressing media.
                  </li>
                  <li>
                    Try brief grounding tools: slow breathing (inhale 4s, exhale
                    6s) for a few minutes, gentle stretching, short walks, or
                    naming five things you can see/hear/feel.
                  </li>
                  <li>
                    Set small, achievable tasks (tidy one area, call one person)
                    to rebuild a sense of control and progress.
                  </li>
                  <li>
                    Know urgent supports in your state:{" "}
                    <a
                      href="https://www.qld.gov.au/emergency/dealing-disasters/disaster-types/flood/flood-health-and-safety"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      QLD Health flood health & safety
                    </a>
                    ,{" "}
                    <a
                      href="https://www.nsw.gov.au/emergency/recovery/mental-health-support"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      NSW mental health disaster support
                    </a>
                    . If there is immediate danger, call{" "}
                    <strong>000</strong>.
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
                  src="/Mental-And-Emontional-Wellbeing.jpg"
                  alt="Mental-And-Emontional-Wellbeinge"
                  width={500}
                  height={320}
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
                     “After floods, strong emotions are common. Stay connected,
                    keep a simple routine, limit distressing media, and use slow
                    breathing or short walks to calm the body. If distress
                    persists or affects daily life, reach out to services like
                    Beyond Blue or your GP.”
                  </Paragraph>
                  <Text strong style={{ color: "#666", fontSize: 14 }}>
                    — Adapted from{" "}
                      <a
                        href="https://www.beyondblue.org.au/mental-health/natural-disasters"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Beyond Blue
                      </a>
                      ,{" "}
                      <a
                        href="https://www.redcross.org.au/how-disasters-impact-mental-health/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Australian Red Cross
                      </a>
                      ,{" "}
                      <a
                        href="https://www.who.int/health-topics/floods/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WHO
                      </a>
                      ,{" "}
                      <a
                        href="https://www.qld.gov.au/emergency/dealing-disasters/disaster-types/flood/flood-health-and-safety"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        QLD Government
                      </a>{" "}
                      &{" "}
                      <a
                        href="https://www.nsw.gov.au/emergency/recovery/mental-health-support"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NSW Government
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
