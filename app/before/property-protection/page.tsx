"use client";

import { useState } from "react";
import { Card, Typography, List, Divider, Button, Row, Col, message } from "antd";
import {
  FaShieldAlt,
  FaDownload,
  FaShareAlt,
  FaWater,
  FaBoxOpen,
  FaPlug,
  FaHammer,
  FaTree,
} from "react-icons/fa";
import jsPDF from "jspdf";

const { Title, Paragraph } = Typography;

export default function PropertyProtection() {
  const [loading, setLoading] = useState(false);

  const protectionSteps = [
    {
      icon: <FaWater size={28} color="#0af" />,
      text: "Elevate electrical appliances and power outlets above potential flood levels.",
    },
    {
      icon: <FaBoxOpen size={28} color="#52c41a" />,
      text: "Store valuables and important documents in waterproof containers.",
    },
    {
      icon: <FaPlug size={28} color="#ff4d4f" />,
      text: "Install backflow valves to prevent sewage from entering your home.",
    },
    {
      icon: <FaHammer size={28} color="#faad14" />,
      text: "Seal foundation cracks and gaps to reduce water entry points.",
    },
    {
      icon: <FaTree size={28} color="#13c2c2" />,
      text: "Maintain gutters, drains, and clear debris to improve water flow.",
    },
  ];

  // Generate styled PDF
  const handleDownload = () => {
    setLoading(true);
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Property Protection Plan", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      "Steps to protect your home and belongings from flood damage in Australia.",
      20,
      35
    );

    let y = 50;
    protectionSteps.forEach((step, i) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30, 144, 255);
      doc.text(`Step ${i + 1}:`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const wrapped = doc.splitTextToSize(step.text, 170);
      doc.text(wrapped, 40, y);
      y += wrapped.length * 7 + 10;
    });

    y += 10;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Stay safe: Regular maintenance is key to reducing flood damage.", 20, y);

    doc.save("property-protection.pdf");
    setLoading(false);
  };

  // Share feature
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Property Protection Plan",
          text: "Steps to protect your home and belongings from flood damage.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        message.success("Plan link copied to clipboard!");
      }
    } catch (err) {
      message.error("Sharing failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        padding: "50px 20px",
      }}
    >
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Card
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "30px",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <FaShieldAlt size={50} color="#0af" />
              <Title
                level={2}
                style={{ color: "#fff", marginTop: 15, fontWeight: "bold" }}
              >
                Property Protection
              </Title>
              <Paragraph style={{ color: "#aaa", fontSize: 16 }}>
                Practical steps to safeguard your home and reduce flood damage.
              </Paragraph>
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <List
              itemLayout="horizontal"
              dataSource={protectionSteps}
              renderItem={(item) => (
                <List.Item style={{ borderBottom: "1px solid #222" }}>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={
                      <span style={{ color: "#fff", fontSize: 16 }}>
                        {item.text}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
