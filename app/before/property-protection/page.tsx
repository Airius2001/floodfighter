"use client";

import { Card, Typography, List, Button, Breadcrumb } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

const { Title, Paragraph } = Typography;

export default function FamilyPlan() {
  const planSteps = [
    {
      text:
        "Clear drains, gutters, and downpipes to ensure water can flow away from the house.",
    },
    {
      text:
        "Prepare sandbags or temporary flood barriers for doors, garage entries, and low vents.",
    },
    {
      text:
        "Move valuables, furniture, appliances, and important documents to higher levels.",
    },
    {
      text:
        "Seal or cover low-level vents and gaps; check and secure doors, windows, and weather seals.",
    },
    {
      text:
        "Ensure electrical pumps, wiring, and switchboards are protected from water; switch off power at the mains if advised.",
    },
    {
      text:
        "Check wells/bores and external pumps: caps should be watertight and above expected flood level; confirm backflow protection.",
    },
    {
      text:
        "Secure lids on toilets, septic tanks, and sewage access points to prevent overflow/backflow.",
    },
    {
      text:
        "Relocate household chemicals, fuels, and gas bottles to safe elevated locations; store tightly sealed.",
    },
    {
      text:
        "Create safe access/egress routes; keep paths clear for evacuation and emergency access.",
    },
  ];

  // Breadcrumb navigation
  const breadcrumbItems = [
    {
      title: <span style={{ color: "#1f2937" }}>Home</span>,
    },
    {
      title: (
        <span style={{ color: "#1f2937" }}>Knowledge of Facing Flood</span>
      ),
    },
    {
      title: (
        <span style={{ color: "#1e40af", fontWeight: "bold" }}>
          Property Protection
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
      {/* back button */}
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
              height: "400px",
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
              src="/images/property.png"
              alt="Property Protection"
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
              Property Protection
            </Title>
            <Paragraph
              style={{ color: "#1f2937", fontSize: 16, marginBottom: 24 }}
            >
              Things to protect your home and belongings from flood damage
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
