"use client";

import { Card, Typography, List, Divider, Row, Col } from "antd";
import {
  BsChatDots,
  BsHeartPulse,
  BsPeople,
  BsJournalCheck,
} from "react-icons/bs";
import { MdSelfImprovement } from "react-icons/md";

const { Title, Paragraph } = Typography;

export default function MentalSupport() {
  const tips = [
    {
      icon: <BsChatDots size={28} color="#0af" />,
      text: "Talk to family and friends about your experiences to release stress.",
    },
    {
      icon: <BsHeartPulse size={28} color="#ff4d4f" />,
      text: "Seek professional counseling if you feel overwhelmed.",
    },
    {
      icon: <MdSelfImprovement size={28} color="#52c41a" />,
      text: "Practice relaxation techniques like deep breathing or meditation.",
    },
    {
      icon: <BsPeople size={28} color="#faad14" />,
      text: "Join local community support groups for shared healing.",
    },
    {
      icon: <BsJournalCheck size={28} color="#13c2c2" />,
      text: "Keep a journal to process your thoughts and emotions.",
    },
  ];

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
              <BsChatDots size={50} color="#0af" />
              <Title
                level={2}
                style={{ color: "#fff", marginTop: 15, fontWeight: "bold" }}
              >
                Mental Support
              </Title>
              <Paragraph style={{ color: "#aaa", fontSize: 16 }}>
                Taking care of your mental health after a flood is just as
                important as physical recovery.
              </Paragraph>
            </div>

            <Divider style={{ backgroundColor: "#333" }} />

            <List
              itemLayout="horizontal"
              dataSource={tips}
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

            <Divider style={{ backgroundColor: "#333" }} />

            <Paragraph
              style={{
                color: "#ccc",
                fontStyle: "italic",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              🌱 Remember: Healing takes time — reach out, stay connected, and
              take small steps every day.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
