"use client";

import { Card, Typography, List, Button, Breadcrumb } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

  // Breadcrumb navigation
  const breadcrumbItems = [
     {
        title: <span style={{ color: "#1f2937", cursor:"pointer" }}>Home</span>,
        onClick: () => router.push("/"),
      },
      {
        title: (
          <span style={{ color: "#1f2937", cursor:"pointer"  }}>Knowledge of Facing Flood</span>
        ),
        onClick: () => router.push("/knowledge"),

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
    maxWidth: "1200px",
    width: "100%",
    alignItems: "stretch", // ✅ Make both sides match height
    flexWrap: "wrap",
  }}
>
  {/* Left side: Image area */}
  <div
    style={{
      flex: "0 0 500px", // fixed width
      borderRadius: 12,
      overflow: "hidden",
      background: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    }}
  >
    <Image
      src="/images/family.png"
      alt="Family Flood Plan"
      width={500}
      height={500}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%", // ✅ fills container height dynamically
      }}
    />
  </div>

  {/* Right side: Information area */}
  <Card
    style={{
      flex: 1,
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      border: "1px solid rgba(255,255,255,0.2)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Title level={2} style={{ color: "#1e40af", marginBottom: 16 }}>
      Family Flood Plan
    </Title>
    <Paragraph style={{ color: "#1f2937", fontSize: 16, marginBottom: 24 }}>
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
