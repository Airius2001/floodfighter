"use client";

import { useState } from "react";
import { Card, Typography, List, Divider, Button, Row, Col, message } from "antd";
import {
  FaHome,
  FaDownload,
  FaShareAlt,
  FaUsers,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaSuitcase,
} from "react-icons/fa";
import jsPDF from "jspdf";

const { Title, Paragraph } = Typography;

export default function FamilyPlan() {
  const [loading, setLoading] = useState(false);

  const planSteps = [
    {
      icon: <FaPhoneAlt size={26} color="#0af" />,
      text: "Prepare an updated emergency contact list (family, neighbors, SES 132 500, Triple Zero 000).",
    },
    {
      icon: <FaMapMarkedAlt size={26} color="#52c41a" />,
      text: "Decide on a safe meeting point (local shelter, high ground, community centre).",
    },
    {
      icon: <FaUsers size={26} color="#faad14" />,
      text: "Plan responsibilities for each family member (who grabs the kit, who helps children/elders/pets).",
    },
    {
      icon: <FaSuitcase size={26} color="#ff4d4f" />,
      text: "Pack and keep an emergency grab-bag ready with food, water, documents, cash, medicine.",
    },
  ];

  // Extra PDF-only plans (not shown in UI)
  const extraPdfPlans = [
    "Keep a waterproof pouch for important documents such as passports, insurance papers, and medical records.",
    "Practice your evacuation route at least once a year with the entire family.",
    "Identify the safest power cut-off points (electricity, gas, water) and learn how to turn them off.",
    "Arrange a communication backup plan in case mobile networks fail (e.g., meeting at a neighbour’s house).",
    "Store extra pet food and supplies to ensure animals are safe during displacement.",
    "Keep a small solar charger or power bank ready for phones and essential devices.",
  ];

  // Generate styled PDF (without autotable)
  const handleDownload = () => {
    setLoading(true);
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Family Flood Plan", 105, 20, { align: "center" });

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      "A step-by-step plan to keep your family safe during floods in Australia.",
      20,
      35
    );

    // Main steps
    let y = 50;
    planSteps.forEach((step, i) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30, 144, 255); // blue for step number
      doc.text(`Step ${i + 1}:`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // black for content
      doc.text(doc.splitTextToSize(step.text, 170), 40, y);

      y += 20; // spacing
    });

    // Divider line
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 10;

    // Extra Plans
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0, 128, 0);
    doc.text("Additional Safety Measures:", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    extraPdfPlans.forEach((plan, i) => {
      const bullet = `• ${plan}`;
      const wrapped = doc.splitTextToSize(bullet, 170);
      doc.text(wrapped, 25, y);
      y += wrapped.length * 7; // adjust spacing dynamically
    });

    // Footer
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Stay prepared, stay safe. — Flood Safety Guide", 105, y, {
      align: "center",
    });

    doc.save("family-flood-plan.pdf");
    setLoading(false);
  };

  // Share feature
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Family Flood Plan",
          text: "Here’s our family flood plan to stay safe and prepared.",
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
              <FaHome size={50} color="#0af" />
              <Title
                level={2}
                style={{ color: "#fff", marginTop: 15, fontWeight: "bold" }}
              >
                Family Flood Plan
              </Title>
              <Paragraph style={{ color: "#aaa", fontSize: 16 }}>
                A step-by-step plan to keep your family safe during floods.
              </Paragraph>
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <List
              itemLayout="horizontal"
              dataSource={planSteps}
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

            <Divider style={{ backgroundColor: "#111" }} />

            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                icon={<FaDownload />}
                style={{ marginRight: 10 }}
                loading={loading}
                onClick={handleDownload}
              >
                Download Plan PDF
              </Button>
              <Button icon={<FaShareAlt />} onClick={handleShare}>
                Share with Family
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
