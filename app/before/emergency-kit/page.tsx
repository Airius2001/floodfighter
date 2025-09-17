"use client";

import { useState } from "react";
import { Card, Typography, List, Divider, Button, Row, Col, message } from "antd";
import {
  FaListAlt,
  FaDownload,
  FaShareAlt,
  FaTint,
  FaUtensils,
  FaLightbulb,
  FaBatteryFull,
  FaFirstAid,
  FaMobileAlt,
  FaMoneyBillWave,
  FaUserShield
} from "react-icons/fa";
import jsPDF from "jspdf";

const { Title, Paragraph } = Typography;

export default function EmergencyKit() {
  const [loading, setLoading] = useState(false);

  const items = [
    { icon: <FaTint size={28} color="#0af" />, text: "Drinking Water (3 days supply)" },
    { icon: <FaUtensils size={28} color="#faad14" />, text: "Non-perishable Food (3 days supply)" },
    { icon: <FaLightbulb size={28} color="#f5222d" />, text: "Flashlight & Extra Bulbs" },
    { icon: <FaBatteryFull size={28} color="#52c41a" />, text: "Spare Batteries & Power Bank" },
    { icon: <FaFirstAid size={28} color="#ff4d4f" />, text: "First Aid Kit with Medicines" },
    { icon: <FaMobileAlt size={28} color="#13c2c2" />, text: "Charged Mobile Phone & Charger" },
    { icon: <FaMoneyBillWave size={28} color="#a0d911" />, text: "Cash & Important Documents" },
    { icon: <FaUserShield size={28} color="#722ed1" />, text: "Warm Clothes & Blankets" },
  ];

  // Generate PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Emergency Kit Checklist", 20, 20);
    doc.setFontSize(12);

    items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.text}`, 20, 40 + index * 10);
    });

    doc.save("emergency-kit-checklist.pdf");
  };

  // Share feature
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Emergency Kit Checklist",
          text: "Here’s the emergency flood kit checklist you should prepare.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        message.success("Checklist link copied to clipboard!");
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
              <FaListAlt size={50} color="#0af" />
              <Title
                level={2}
                style={{ color: "#fff", marginTop: 15, fontWeight: "bold" }}
              >
                Emergency Kit Checklist
              </Title>
              <Paragraph style={{ color: "#aaa", fontSize: 16 }}>
                Essential supplies to keep you and your family safe during floods in Australia.
              </Paragraph>
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <List
              itemLayout="horizontal"
              dataSource={items}
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
                Download Checklist PDF
              </Button>
              <Button icon={<FaShareAlt />} onClick={handleShare}>
                Share to your family
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
