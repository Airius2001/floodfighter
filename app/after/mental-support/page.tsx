"use client";

/**
 * Mental Support Page
 * ---------------------------------------------------------
 * Matches the layout and visual hierarchy of the "Safety Check" page.
 * Includes:
 *  - Top navigation (Back + Breadcrumb)
 *  - Left column (Title, Description, Tip Cards)
 *  - Right column (Sticky Image)
 *  - Bottom section: "Resources & Support" white card
 */

import React from "react";
import { Typography, Button, Row, Col, Card, Breadcrumb } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import {
  BsChatDots,
  BsJournalBookmark,
  BsInfoCircle,
} from "react-icons/bs";
import { MdOutlineSelfImprovement, MdOutlineGroups } from "react-icons/md";
import { RiPsychotherapyLine } from "react-icons/ri";

const { Title, Paragraph, Text } = Typography;

/** A small reusable tip card (icon + message). */
function TipCard({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
        padding: "1rem 1.2rem",
      }}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        {/* Icon container */}
        <span
          style={{
            height: 32,
            width: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            background: "#EEF4FF",
            boxShadow: "inset 0 0 0 1px #D6E4FF",
            color: "#1677ff",
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {icon}
        </span>

        {/* Text content */}
        <Text style={{ fontSize: "1.15rem", lineHeight: 1.8, color: "#1F2937" }}>
          {children}
        </Text>
      </div>
    </Card>
  );
}

/** Main page component */
export default function MentalSupportPage() {
  const handleBack = () => window.history.back();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgb(240, 242, 245)", // same gray background as other pages
        padding: "32px 16px",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        {/* ── Navigation (Back + Breadcrumb) ───────────────────────────── */}
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
                { title: "Mental Support" },
              ]}
              style={{ margin: 0, fontSize: "1rem", lineHeight: "1.4" }}
            />
          </div>
        </div>


        {/* ── Two-column layout (Text + Image) ────────────────────────── */}
        <Row gutter={[32, 32]} align="top">
          {/* Left column */}
          <Col xs={24} md={14} lg={16}>
            <Title
              level={2}
              style={{ color: "#1677ff", fontSize: "2rem", marginBottom: 32 }}
            >
              Mental Support
            </Title>

            <Paragraph
              style={{
                marginBottom: 80,
                color: "#475467",
                fontSize: "1.15rem",
                lineHeight: 1.8,
              }}
            >
              Taking care of your mental health after a flood is just as
              important as physical recovery.
            </Paragraph>

            {/* Tip list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <TipCard icon={<BsChatDots />}>
                Talk to family and friends about your experiences to release stress.
              </TipCard>

              <TipCard icon={<RiPsychotherapyLine />}>
                Seek professional counseling if you feel overwhelmed.
              </TipCard>

              <TipCard icon={<MdOutlineSelfImprovement />}>
                Practice relaxation techniques like deep breathing or meditation.
              </TipCard>

              <TipCard icon={<MdOutlineGroups />}>
                Join local community support groups for shared healing.
              </TipCard>

              <TipCard icon={<BsJournalBookmark />}>
                Keep a journal to process your thoughts and emotions.
              </TipCard>
            </div>
          </Col>

          {/* Right column (Sticky Image) */}
          <Col xs={24} md={10} lg={8}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 6px 20px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
                padding: 10,
                position: "sticky",
                top: 100,
              }}
            >
              <img
                src="/images/mental support.png"
                alt="Mental Support"
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

        {/* ── Bottom Section: Resources & Support ─────────────────────── */}
        <Card
              style={{
                marginTop: 32,
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
      </div>
    </div>
  );
}
