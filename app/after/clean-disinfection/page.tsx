"use client";

import { Typography, Row, Col, Card } from "antd";
import {
  MdOutlineCleaningServices,
  MdOutlineHealthAndSafety,
  MdOutlineDeleteSweep,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { GiBroom, GiClothes } from "react-icons/gi";
import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";
import { FaDumpster } from "react-icons/fa";
import { BsFillCloudHazeFill } from "react-icons/bs";

const { Title, Paragraph } = Typography;

export default function CleanDisinfection() {
  const tips = [
    {
      text: "Wear gloves, boots, long sleeves, and a mask to protect yourself from contaminated water, mud, and mould.",
      icon: <MdOutlineHealthAndSafety size={36} color="#0af" />,
    },
    {
      text: "Thoroughly remove all mud, silt, and flood debris completely before beginning disinfection procedures immediately.",
      icon: <GiBroom size={36} color="#0af" />,
    },
    {
      text: "Clean surfaces with warm, soapy water, then apply a bleach solution (1 cup bleach to 4L water).",
      icon: <MdOutlineWaterDrop size={36} color="#0af" />,
    },
    {
      text: "Discard items that cannot be properly cleaned such as mattresses, carpets, and upholstered furniture.",
      icon: <MdOutlineDeleteSweep size={36} color="#0af" />,
    },
    {
      text: "Use fans, dehumidifiers, and natural ventilation to dry all areas completely.",
      icon: <BsFillCloudHazeFill size={36} color="#0af" />,
    },
    {
      text: "Watch for mould growth on walls, ceilings, and furniture. Consult professionals if the area is large.",
      icon: <AiOutlineWarning size={36} color="#0af" />,
    },
    {
      text: "Dispose of contaminated waste according to your local council’s flood clean-up guidelines.",
      icon: <FaDumpster size={36} color="#0af" />,
    },
    {
      text: "Check refrigerators & freezers. Dispose of food that has touched floodwater or lost power for 4+ hrs.",
      icon: <GiClothes size={36} color="#0af" />,
    },
    {
      text: "Disinfect children’s toys, cooking utensils, and food surfaces with boiling water or bleach solution.",
      icon: <AiOutlineCheckCircle size={36} color="#0af" />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(191, 214, 248)", // ✅ white background
        color: "#111", // ✅ all text black
        padding: "3rem 1rem",
      }}
    >
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <MdOutlineCleaningServices size={70} color="#0af" />
            <Title level={2} style={{ color: "#111", marginTop: "1rem" }}>
              Clean & Disinfection
            </Title>
            <Paragraph style={{ color: "#333", fontSize: "1.1rem" }}>
              Steps to sanitize your home after flooding in Australia
            </Paragraph>
          </div>

          {/* Content */}
          <Row gutter={[16, 16]}>
            {tips.map((tip, index) => (
              <Col xs={24} sm={12} key={index} style={{ display: "flex" }}>
                <Card
                  variant="borderless"
                  style={{
                    background: "#f5f5f5",
                    color: "#111",
                    borderRadius: 12,
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>{tip.icon}</div>
                    <Paragraph
                      style={{
                        color: "#111",
                        margin: 0,
                        fontSize: "1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {tip.text}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Footer Info
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Paragraph style={{ color: "#555", fontSize: "0.95rem" }}>
              ℹ️ For detailed guidance, visit{" "}
              <a
                href="https://www.health.gov.au/topics/environmental-health/emergencies/floods"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0af" }}
              >
                Australian Department of Health – Flood Cleaning Advice
              </a>
              .
            </Paragraph>
          </div> */}
        </Col>
      </Row>
    </div>
  );
}
