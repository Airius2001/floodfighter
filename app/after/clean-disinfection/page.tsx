"use client";

import { Typography, Button, Row, Col, Card, Breadcrumb } from "antd";
import {
  AiOutlineHome,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import {
  MdOutlineCleaningServices,
  MdOutlineDeleteSweep,
  MdOutlineWaterDrop,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { GiBroom, GiClothes } from "react-icons/gi";
import { AiOutlineWarning } from "react-icons/ai";
import { FaDumpster } from "react-icons/fa";
import { BsFillCloudHazeFill } from "react-icons/bs";

const { Title, Paragraph, Text } = Typography;

export default function CleanDisinfection() {
  const handleBack = () => {
    window.history.back();
  };

  const tips = [
    {
      text: "Wear gloves, boots, long sleeves, and a mask to protect yourself from contaminated water and mud.",
      icon: <MdOutlineHealthAndSafety size={28} color="#1677ff" />,
    },
    {
      text: "Thoroughly remove all mud, silt completely before beginning disinfection procedures immediately.",
      icon: <GiBroom size={28} color="#1677ff" />,
    },
    {
      text: "Clean surfaces with warm, soapy water, then apply a bleach solution (1 cup bleach to 4L water).",
      icon: <MdOutlineWaterDrop size={28} color="#1677ff" />,
    },
    {
      text: "Discard items that cannot be properly cleaned such as mattresses, carpets, and upholstered furniture.",
      icon: <MdOutlineDeleteSweep size={28} color="#1677ff" />,
    },
    {
      text: "Use fans, dehumidifiers, and natural ventilation to dry all areas completely.",
      icon: <BsFillCloudHazeFill size={28} color="#1677ff" />,
    },
    {
      text: "Watch for mould growth on walls, ceilings, and furniture. Consult professionals if the area is large.",
      icon: <AiOutlineWarning size={28} color="#1677ff" />,
    },
    {
      text: "Dispose of contaminated waste according to your local council’s flood clean-up guidelines.",
      icon: <FaDumpster size={28} color="#1677ff" />,
    },
    {
      text: "Check refrigerators & freezers. Dispose of food that has touched floodwater or lost power for 4+ hrs.",
      icon: <GiClothes size={28} color="#1677ff" />,
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
      {/* Back button */}
      <Button
        type="text"
        icon={<FaArrowLeft />}
        onClick={handleBack}
        style={{
          position: "absolute",
          top: 90,
          left: 26,
          color: "#000000",
          zIndex: 10,
        }}
        aria-label="Go back"
      />

      <Row justify="center">
        <Col xs={24} lg={20} xl={18}>
          {/* ===== Breadcrumb Navigation ===== */}
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <>
                    <AiOutlineHome /> Home
                  </>
                ),
              },
              {
                href: "/knowledge",
                title: "Knowledge of Facing Flood",
              },
              {
                title: "Clean & Disinfection",
              },
            ]}
            style={{
              marginBottom: 24,
              fontSize: "1rem",
            }}
          />

          {/* ===== Layout: left cards + right image ===== */}
          <Row gutter={[32, 32]} align="top">
            {/* Left column */}
            <Col xs={24} md={14} lg={16}>
              <Title
                level={2}
                style={{
                  color: "#1677ff",
                  fontSize: "2rem",
                  marginBottom: 32,
                }}
              >
                Clean & Disinfection
              </Title>
              <Paragraph
                style={{
                  marginBottom: 80,
                  color: "#475467",
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                }}
              >
                Steps to sanitize your home after flooding in Australia.
              </Paragraph>

              {/* Stack all cleaning tips vertically */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {tips.map((t, i) => (
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
                      {t.icon}
                      <Text
                        style={{
                          fontSize: "1.15rem",
                          lineHeight: 1.8,
                          color: "#1F2937",
                        }}
                      >
                        {t.text}
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
                  top: 100,
                }}
              >
                <img
                  src="/images/clean.png"
                  alt="Clean and Disinfection"
                  style={{
                    width: "100%",
                    height: 700,
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
            <AiOutlineCheckCircle style={{ verticalAlign: -3 }} /> Always clean
            and disinfect thoroughly to reduce health risks after flooding.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
