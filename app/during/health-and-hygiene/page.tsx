"use client";

import { AiOutlineHome,} from "react-icons/ai";
import { Button, Card, Typography, Row, Col, Breadcrumb } from "antd";
import { FaArrowLeft, FaInfoCircle, FaQuoteLeft, FaHome } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

export default function SaveShelter() {
  const handleBack = () => {
    window.history.back();
  };

   const router = useRouter()

  const getBreadcrumbItems = () => [
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
          Health And Hygiene
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
        paddingBottom: "64px",
      }}
    >

      <div style={{ maxWidth: 1200, width: "100%", marginTop: 80 }}>
        {/* Main areas */}
        {/* ── Navigation (Back + Breadcrumb) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center", 
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Button
            type="text"
            icon={<FaArrowLeft />}
            onClick={handleBack}
            style={{
              color: "#000",
              padding: "0 8px",
              fontSize: 16,
              height: "auto", 
              lineHeight: "1.4", 
              display: "flex",
              alignItems: "center",
            }}
          >
            Back
          </Button>

          <div style={{ position: "relative", top: "1px" }}>
            <Breadcrumb
              items={[
                { href: "/", title: (<><AiOutlineHome /> Home</>) },
                { href: "/knowledge", title: "Knowledge of Facing Flood" },
                { title: "Health And Hygiene" },
              ]}
              style={{ margin: 0, fontSize: "1rem", lineHeight: "1.4" }}
            />
          </div>
        </div>
        
        <Row gutter={[32, 32]} align="top">
          {/* Left: text area */}
          <Col xs={24} md={12}>
            <div>
              <Title level={1} style={{ color: "#1890ff", marginBottom: 10 }}>
                Health And Hygiene
              </Title>
              <Text strong style={{ fontSize: 18, color: "#333" }}>
                Essential Health and Hygiene Practices
              </Text>

              <Paragraph
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#333",
                  marginTop: 20,
                }}
              >
                <li>
                    Use only bottled or pre-stored safe water. If unsure, boil
                    water for <strong>1 minute (rolling boil)</strong>; if you
                    cannot boil, disinfect clear water with unscented household
                    bleach: <strong>2 drops/L</strong> (clear) or{" "}
                    <strong>4 drops/L</strong> (cloudy), stir, then wait{" "}
                    <strong>30 minutes</strong>.
                  </li>
                  <li>
                    Keep “drinking-only” water <strong>separate</strong> and
                    clearly labelled to prevent cross-use.
                  </li>
                  <li>
                    Wash hands with soap and safe water before eating, after
                    toilet use, and after contact with floodwater; use hand
                    sanitiser when water is limited.
                  </li>
                  <li>
                    Eat only sealed, canned, or dry food.{" "}
                    <strong>Discard</strong> anything touched by floodwater.
                  </li>
                  <li>
                    Clean utensils and food-prep surfaces with <strong>safe</strong>{" "}
                    water and disinfectant before use.
                  </li>
                  <li>
                    If toilets or septic systems fail, use{" "}
                    <strong>lined bags or buckets</strong> for waste; seal and
                    store safely until disposal is possible.
                  </li>
                  <li>
                    Avoid contact with floodwater where possible; cover any
                    cuts with <strong>waterproof dressings</strong>.
                  </li>
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
                  src="/images/health.png"
                  alt="health-and-hygiene"
                  width={500}
                  height={450}
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
                    “Safe water and clean hands save lives in floods. Boil
                    uncertain water for 1 minute or disinfect with household
                    bleach, keep drinking water separate, and discard any food
                    touched by floodwater.”
                  </Paragraph>
                  <Text strong style={{ color: "#666", fontSize: 14 }}>
                    — Adapted from{" "}
                      <a
                        href="https://www.who.int/news-room/questions-and-answers/item/how-do-i-protect-my-health-in-a-flood"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WHO
                      </a>{" "}
                      &{" "}
                      <a
                        href="https://www.health.nsw.gov.au/emergency_preparedness/weather/factsheets/staying-healthy-during-after-floods.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        NSW Health
                      </a>
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
