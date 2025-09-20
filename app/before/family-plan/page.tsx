"use client";

import { Card, Typography, List, Button, Breadcrumb } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

const { Title, Paragraph } = Typography;

export default function FamilyPlan() {
  const planSteps = [
    {
      text:
        "Tighten lids and seal inlets on rainwater tanks; disconnect downpipes if flooding is likely; clear gutters and downpipes of debris.",
    },
    {
      text:
        "Check well and bore caps are watertight and above expected flood level; install or check backflow protection.",
    },
    {
      text:
        "Fill clean containers with mains water; store sealed containers on shelves above flood level.",
    },
    {
      text:
        "Stock unscented household bleach, purification tablets, soap, sanitiser, and gloves.",
    },
    {
      text:
        "Prepare sterile water, nappies, wipes, and sterilising tablets if you have children.",
    },
    {
      text:
        "Store at least 3 days of drinking water for pets; keep pet food sealed in waterproof containers.",
    },
    {
      text: "Secure lids on toilets and septic systems.",
    },
    {
      text:
        "Pack an emergency hygiene kit: bottled water, wipes, gloves, sanitary products, and waste bags.",
    },
    {
      text:
        "Sign up for BOM and SES flood alerts; confirm evacuation routes.",
    },
  ];

  // Breadcrumb navigation
  const breadcrumbItems = [
    {
      title: <span style={{ color: "#1f2937" }}>Homepage</span>,
    },
    {
      title: (
        <span style={{ color: "#1f2937" }}>Knowledge of Facing Flood</span>
      ),
    },
    {
      title: (
        <span style={{ color: "#1e40af", fontWeight: "bold" }}>
          Family Flood Plan
        </span>
      ),
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        background: "#bfd6f8ff",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Back button */}
      <Button
        type="text"
        icon={<FaArrowLeft />}
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#000000ff",
          zIndex: 10,
        }}
      />

      {/* Breadcrumb navigation */}
      <div
        style={{ marginBottom: 20, maxWidth: 1200, margin: "0 auto 20px auto" }}
      >
        <Breadcrumb
          items={breadcrumbItems}
          separator="→"
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        />
      </div>

      {/* Main content area */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 120px)",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            maxWidth: "1000px",
            width: "100%",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Left side: Image area */}
          <div
            style={{
              width: "500px",
              height: "500px",
              background: "#eee",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // transform: "translateX(-140px) translateY(-40px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            }}
          >
            <Image
              src="/images/family.png"
              alt="Family Flood Plan"
              width={400}
              height={400}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>

          {/* Right side: Information area */}
          <Card
            style={{
              borderRadius: 12,
              flex: 1,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Title level={2} style={{ color: "#1e40af", marginBottom: 16 }}>
              Family Flood Plan
            </Title>
            <Paragraph
              style={{ color: "#1f2937", fontSize: 16, marginBottom: 24 }}
            >
              A detailed plan for you to follow, easy to facing flood
            </Paragraph>

            <List
              dataSource={planSteps}
              renderItem={(item, index) => (
                <List.Item
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    padding: "16px 0",
                  }}
                >
                  <List.Item.Meta
                    title={
                      <span style={{ color: "#1f2937", fontSize: 16 }}>
                        <strong style={{ color: "#1e40af" }}>
                          Step {index + 1}:
                        </strong>{" "}
                        {item.text.replace(/^Step \d+: /, "")}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
