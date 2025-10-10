"use client";

/**
 * After → Mental Support
 * - Meets Acceptance Criteria 5.2:
 *   Given user selects module → When system loads → Then show hotlines, consultation channels, and grants info.
 */

import { Button, Card, Typography, Row, Col, Breadcrumb } from "antd";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

export default function MentalHealthAfter() {
  const router = useRouter();

  const handleBack = () => {
    window.history.back();
  };

  // Breadcrumb: Home → Knowledge of Facing Flood → Mental Health & Community Support
  const getBreadcrumbItems = () => [
    {
      title: <span style={{ color: "#1f2937", cursor: "pointer" }}>Home</span>,
      onClick: () => router.push("/"),
    },
    {
      title: (
        <span style={{ color: "#1f2937", cursor: "pointer" }}>
          Knowledge of Facing Flood
        </span>
      ),
      onClick: () => router.push("/knowledge"),
    },
    {
      title: (
        <span style={{ color: "#1e40af", fontWeight: "bold" }}>
          Mental Support
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
      {/* Breadcrumb (under navbar) */}
      <div
        style={{
          position: "absolute",
          top: 95,
          left: 0,
          right: 0,
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto 20px auto",
          padding: "0 20px",
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
          color: "#000000",
          zIndex: 10,
        }}
        aria-label="Go back"
      />

      <div style={{ maxWidth: 1200, width: "100%", marginTop: 80 }}>
        {/* Main layout */}
        <Row gutter={[32, 32]} align="top">
          {/* Left: title + bullets */}
          <Col xs={24} md={12}>
            <div>
              <Title level={1} style={{ color: "#1890ff", marginBottom: 10 }}>
                Mental Support
              </Title>
              <Text strong style={{ fontSize: 18, color: "#333" }}>
                Taking care of your mental health after a flood is just as important as physical recovery.
              </Text>

              <div
                style={{
                  marginTop: 20,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#333",
                }}
              >
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  <li style={{ marginBottom: 12 }}>
                    <span style={{ color: "#00bcd4", marginRight: 8 }}>💬</span>
                    Talk to family and friends about your experiences to release stress.
                  </li>
                  <li style={{ marginBottom: 12 }}>
                    <span style={{ color: "#e53935", marginRight: 8 }}>❤️</span>
                    Seek professional counseling if you feel overwhelmed.
                  </li>
                  <li style={{ marginBottom: 12 }}>
                    <span style={{ color: "#4caf50", marginRight: 8 }}>🧘</span>
                    Practice relaxation techniques like deep breathing or meditation.
                  </li>
                  <li style={{ marginBottom: 12 }}>
                    <span style={{ color: "#ffb300", marginRight: 8 }}>👥</span>
                    Join local community support groups for shared healing.
                  </li>
                  <li style={{ marginBottom: 12 }}>
                    <span style={{ color: "#00acc1", marginRight: 8 }}>📘</span>
                    Keep a journal to process your thoughts and emotions.
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          {/* Right: image */}
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
                  src="/images/mental support.png"
                  alt="Mental support"
                  width={500}
                  height={300}
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    display: "block",
                  }}
                  priority
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Resources & Support (replaces Expert Opinion) */}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <FaInfoCircle
                      style={{ fontSize: 20, color: "#1890ff", marginRight: 8 }}
                      aria-hidden
                    />
                    <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
                      Resources & Support
                    </Title>
                  </div>

                  {/* Hotlines */}
                  <Title level={4} style={{ marginTop: 0 }}>
                    24/7 Hotlines
                  </Title>
                  <ul style={{ paddingLeft: 20, fontSize: 16, lineHeight: 1.7 }}>
                    <li>
                      <strong>Lifeline:</strong> 13 11 14 — Crisis support &
                      suicide prevention.
                    </li>
                    <li>
                      <strong>Beyond Blue:</strong> 1300 22 4636 — Mental health
                      support for anxiety, depression, disaster recovery.
                    </li>
                    <li>
                      <strong>Emergency:</strong> 000 — Immediate danger.
                    </li>
                  </ul>

                  {/* Consultation channels */}
                  <Title level={4} style={{ marginTop: 16 }}>
                    Consultation Channels
                  </Title>
                  <ul style={{ paddingLeft: 20, fontSize: 16, lineHeight: 1.7 }}>
                    <li>
                      <a
                        href="https://www.redcross.org.au/how-disasters-impact-mental-health/"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue"
                      >
                        Australian Red Cross
                      </a>{" "}
                      — Community recovery, coping guides, outreach.
                    </li>
                    <li>
                      <a
                        href="https://www.healthdirect.gov.au/mental-health-helplines"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue"
                      >
                        Healthdirect Helplines
                      </a>{" "}
                      — Find local phone/online counselling.
                    </li>
                    <li>
                      <a
                        href="https://www.qld.gov.au/emergency/dealing-disasters/disaster-types/flood/flood-health-and-safety"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue"
                      >
                        QLD Health: Flood health & safety
                      </a>{" "}
                      |{" "}
                      <a
                        href="https://www.nsw.gov.au/emergency/recovery/mental-health-support"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="blue"
                      >
                        NSW Disaster Mental Health
                      </a>
                    </li>
                  </ul>

                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
