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
                Text needs to be fill in
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
                  src="/personal-safety-measure.jpg"
                  alt="Personal-safety-measure-image"
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
                    "Text to fill in expert opinion"
                  </Paragraph>
                  <Text strong style={{ color: "#666", fontSize: 14 }}>
                    — Name of the expert
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
