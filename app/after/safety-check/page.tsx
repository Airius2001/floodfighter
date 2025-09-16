"use client";

import { Typography, Row, Col, Card, Divider } from "antd";
import { AiOutlineCheckCircle } from "react-icons/ai";

const { Title, Paragraph } = Typography;

export default function SafetyCheck() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "3rem 1rem",
      }}
    >
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <AiOutlineCheckCircle size={60} color="#0af" />
            <Title level={2} style={{ color: "#fff", marginTop: "1rem" }}>
              Safety Check
            </Title>
            <Paragraph style={{ color: "#aaa", fontSize: "1.1rem" }}>
              Ensure safety before re-entering your home
            </Paragraph>
          </div>

          {/* Content Cards */}
          <Row gutter={[16, 16]}>
            {[
              "Check for structural damage before entering",
              "Avoid downed power lines and report them",
              "Do not use electrical appliances until inspected",
              "Ventilate the area to remove gas or fumes",
            ].map((tip, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  bordered={false}
                  style={{
                    background: "#111",
                    color: "#fff",
                    borderRadius: 12,
                    height: "100%",
                  }}
                >
                  <Paragraph style={{ color: "#fff", fontSize: "1rem" }}>
                    {tip}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider style={{ borderColor: "#333", margin: "3rem 0" }} />

          {/* Footer Info */}
          <Paragraph
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: "0.95rem",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            ⚠️ Always prioritize your safety before beginning flood recovery. If
            you are unsure, contact local authorities or emergency services for
            assistance.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
