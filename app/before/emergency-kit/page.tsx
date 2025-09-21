"use client";

import { useState } from "react";
import {
  Card,
  Typography,
  List,
  Button,
  Row,
  Col,
  message,
  Select,
  Form,
  Breadcrumb,
} from "antd";
import {
  FaListAlt,
  FaDownload,
  FaShareAlt,
  FaTint,
  FaUtensils,
  FaLightbulb,
  FaFirstAid,
  FaDog,
  FaBaby,
  FaArrowLeft,
} from "react-icons/fa";
import jsPDF from "jspdf";
import type { ReactElement } from "react";

const { Title, Paragraph } = Typography;

// Define the type of form value
interface FormValues {
  adults?: string;
  children?: string;
  ageOfChildren?: string;
  pets?: string;
}

// Define the type of custom item
interface CustomItem {
  icon: ReactElement;
  text: string;
}

// Define step type
type Step = "intro" | "form" | "checklist";

export default function EmergencyKitPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("intro");
  const [formValues, setFormValues] = useState<FormValues>({});
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);

  const [kitItems, setKitItems] = useState<CustomItem[]>([]);
  const [reminderItems, setReminderItems] = useState<CustomItem[]>([]);

  // Generate breadcrumb items based on the current steps.
  const getBreadcrumbItems = () => {
    const baseItems = [
      {
        title: <span style={{ color: "#1f2937" }}>Home</span>,
      },
      {
        title: (
          <span style={{ color: "#1f2937" }}>Knowledge of Facing Flood</span>
        ),
      },
    ];

    switch (step) {
      case "intro":
        return [
          ...baseItems,
          {
            title: (
              <span style={{ color: "#1e40af", fontWeight: "bold" }}>
                Emergency Kit
              </span>
            ),
          },
        ];
      case "form":
        return [
          ...baseItems,
          {
            title: <span style={{ color: "#1f2937" }}>Emergency Kit</span>,
          },
          {
            title: (
              <span style={{ color: "#1e40af", fontWeight: "bold" }}>
                Family Details
              </span>
            ),
          },
        ];
      case "checklist":
        return [
          ...baseItems,
          {
            title: <span style={{ color: "#1f2937" }}>Emergency Kit</span>,
          },
          {
            title: <span style={{ color: "#1f2937" }}>Family Details</span>,
          },
          {
            title: (
              <span style={{ color: "#1e40af", fontWeight: "bold" }}>
                Your Checklist
              </span>
            ),
          },
        ];
      default:
        return baseItems;
    }
  };

  // optimize generateCustomChecklist
  const generateCustomChecklist = (values: FormValues): void => {
    const kits: CustomItem[] = [];
    const reminders: CustomItem[] = [];

    // Adults
    if (values.adults) {
      const numAdults = values.adults === "3-5" ? 4 : parseInt(values.adults);
      const waterAdultsMin = numAdults * 3 * 3;
      const waterAdultsMax = numAdults * 5 * 3;
      kits.push({
        icon: <FaTint size={28} color="#0af" />,
        text: `Water for Adults: ${waterAdultsMin}–${waterAdultsMax} L (for ${numAdults} adults, 3 days)`,
      });
      kits.push({
        icon: <FaFirstAid size={28} color="#ff4d4f" />,
        text: `Sanitiser & Gloves (for ${numAdults} adults)`,
      });
    }

    // Children
    if (values.children && values.children !== "0") {
      const numChildren =
        values.children === "3+" ? 3 : parseInt(values.children);
      const waterChildrenMin = numChildren * 3 * 3;
      const waterChildrenMax = numChildren * 5 * 3;
      kits.push({
        icon: <FaBaby size={28} color="#eb2f96" />,
        text: `Water for Children: ${waterChildrenMin}–${waterChildrenMax} L + extra 3–5 L for formula/sterilising`,
      });
      kits.push({
        icon: <FaBaby size={28} color="#eb2f96" />,
        text: `Baby items: formula, nappies, wipes, sterilising tablets`,
      });
    }

    // Pets
    if (values.pets && values.pets !== "None") {
      const numPets = values.pets === "2+" ? 2 : parseInt(values.pets);
      const waterPet = numPets * 20 * 0.05 * 3;
      kits.push({
        icon: <FaDog size={28} color="#fa541c" />,
        text: `Water for Pets: ~${waterPet.toFixed(
          1
        )} L (for ${numPets} medium dogs, 3 days)`,
      });
      kits.push({
        icon: <FaDog size={28} color="#fa541c" />,
        text: `Pet food, waterproof bowls, leash, pet-safe disinfectant`,
      });
    }

    // Hygiene & Food
    kits.push({
      icon: <FaFirstAid size={28} color="#ff4d4f" />,
      text: `Hygiene supplies: soap, hand sanitiser, disinfectant, gloves, waste bags`,
    });
    kits.push({
      icon: <FaUtensils size={28} color="#faad14" />,
      text: `Non-perishable food for ${values.adults || 0} adults + ${
        values.children || 0
      } children (3 days)`,
    });

    // Friendly reminders
    reminders.push({
      icon: <FaLightbulb size={28} color="#f5222d" />,
      text: `Keep stored water in sealed containers above flood level`,
    });
    if (values.children !== "0") {
      reminders.push({
        icon: <FaBaby size={28} color="#eb2f96" />,
        text: `Clean children's toys with boiled water`,
      });
    }
    if (values.pets !== "None") {
      reminders.push({
        icon: <FaDog size={28} color="#fa541c" />,
        text: `Never let pets drink floodwater`,
      });
    }

    setKitItems(kits);
    setReminderItems(reminders);
  };

  // create PDF
  const handleDownload = (): void => {
    const doc = new jsPDF();
    let yPosition = 20;

    // title
    doc.setFontSize(18);
    doc.text("Personalized Emergency Kit Checklist", 20, yPosition);
    yPosition += 15;

    // User info
    doc.setFontSize(12);
    doc.text("User Information:", 20, yPosition);
    yPosition += 10;
    doc.text(`- Adults: ${formValues.adults || "N/A"}`, 20, yPosition);
    yPosition += 10;
    doc.text(`- Children: ${formValues.children || "N/A"}`, 20, yPosition);
    yPosition += 10;
    if (formValues.children !== "0") {
      doc.text(
        `- Age of Children: ${formValues.ageOfChildren || "N/A"}`,
        20,
        yPosition
      );
      yPosition += 10;
    }
    doc.text(`- Pets: ${formValues.pets || "N/A"}`, 20, yPosition);
    yPosition += 15;

    // Emergency Kit Items
    doc.setFontSize(14);
    doc.text("Emergency Kit Items:", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    kitItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.text}`, 20, yPosition);
      yPosition += 10;
    });

    yPosition += 10;

    // Friendly Reminders
    doc.setFontSize(14);
    doc.text("Friendly Reminders:", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    reminderItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.text}`, 20, yPosition);
      yPosition += 10;
    });

    // save PDF
    doc.save("personalized-emergency-kit.pdf");
  };

  // share
  const handleShare = async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Emergency Kit Checklist",
          text: "Here's my personalized emergency flood kit checklist.",
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
        background: "#bfd6f8ff",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Breadcrumb Navigation - Global Display */}
      <div
        style={{ marginBottom: 20, maxWidth: 1200, margin: "0 auto 20px auto" }}
      >
        <Breadcrumb
          items={getBreadcrumbItems()}
          separator="→"
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        />
      </div>

      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          {step === "intro" && (
            <Card
              style={{
                background: "#fff",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "30px",
                position: "relative",
              }}
            >
              <Button
                type="text"
                icon={<FaArrowLeft />}
                onClick={() => window.history.back()}
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "#000000ff",
                  zIndex: 10,
                }}
              />

              <Title
                level={2}
                style={{
                  color: "#1e40af",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 20,
                }}
              >
                Why Prepare an Emergency Kit?
              </Title>

              <Paragraph style={{ color: "#1f2937", fontSize: 16 }}>
                Floods and other natural disasters in Australia often happen
                with little warning. During these emergencies, basic services
                such as electricity, clean water, internet, and phone networks
                can be disrupted for hours—or even days.
              </Paragraph>

              <Paragraph style={{ color: "#1f2937", fontSize: 16 }}>
                Roads may also be blocked, making it difficult to buy essential
                items at the last moment. By preparing an{" "}
                <b>Emergency Kit in advance</b>, you ensure that you and your
                family have the necessary supplies to survive, stay healthy, and
                remain in contact during difficult times.
              </Paragraph>

              <Paragraph style={{ color: "#1f2937", fontSize: 16 }}>
                A well-prepared kit can:
                <ul style={{ marginTop: 10 }}>
                  <li>Save valuable time when evacuation is needed.</li>
                  <li>
                    Provide essential resources like clean water, food, and
                    medicines when shops are closed.
                  </li>
                  <li>
                    Reduce stress and panic, because you already have what you
                    need at hand.
                  </li>
                  <li>
                    Protect vulnerable members of your family (children,
                    elderly, pets) with ready access to essentials.
                  </li>
                </ul>
              </Paragraph>

              <Paragraph style={{ color: "#1f2937", fontSize: 16 }}>
                Being prepared isn't just about safety—it's about peace of mind.
                With an emergency kit, you can focus on protecting your loved
                ones instead of worrying about missing supplies.
              </Paragraph>

              <br />
              <Paragraph style={{ color: "#1f2937", fontSize: 16 }}>
                Our website offers you the ability to create a personalized
                emergency kit checklist. Click the button below to build a
                unique and suitable checklist for your family!
              </Paragraph>

              <div style={{ textAlign: "center", marginTop: 30 }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setStep("form")}
                >
                  Create Your Personalized Checklist
                </Button>
              </div>
            </Card>
          )}

          {step === "form" && (
            <Card
              style={{
                background: "#fff",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "30px",
                position: "relative",
              }}
            >
              <Button
                type="text"
                icon={<FaArrowLeft />}
                onClick={() => setStep("intro")}
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  color: "#000000ff",
                  zIndex: 10,
                }}
              />
              <Title
                level={2}
                style={{
                  color: "#1e40af",
                  marginBottom: 20,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Enter Your Family Details
              </Title>
              <Form
                layout="vertical"
                onFinish={(values: FormValues) => {
                  setFormValues(values);
                  generateCustomChecklist(values);
                  setStep("checklist");
                }}
              >
                <Form.Item
                  name="adults"
                  label={
                    <span style={{ color: "#1f2937" }}>Number of Adults</span>
                  }
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3-5", label: "3–5" },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="children"
                  label={
                    <span style={{ color: "#1f2937" }}>Number of Children</span>
                  }
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: "0", label: "0" },
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3+", label: "3+" },
                    ]}
                  />
                </Form.Item>

                <Form.Item shouldUpdate>
                  {({ getFieldValue }) =>
                    getFieldValue("children") !== "0" && (
                      <Form.Item
                        name="ageOfChildren"
                        label={
                          <span style={{ color: "#1f2937" }}>
                            Age of Children
                          </span>
                        }
                        rules={[{ required: true }]}
                      >
                        <Select
                          options={[
                            { value: "Infant (0–2)", label: "Infant (0–2)" },
                            { value: "Young (3–6)", label: "Young (3–6)" },
                            { value: "Older (7–12)", label: "Older (7–12)" },
                          ]}
                        />
                      </Form.Item>
                    )
                  }
                </Form.Item>

                <Form.Item
                  name="pets"
                  label={<span style={{ color: "#1f2937" }}>Pets</span>}
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: "None", label: "None" },
                      { value: "1", label: "1" },
                      { value: "2+", label: "2+" },
                    ]}
                  />
                </Form.Item>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Button type="primary" htmlType="submit" size="large">
                    Generate Checklist
                  </Button>
                </div>
              </Form>
            </Card>
          )}

          {step === "checklist" && (
            <div style={{ position: "relative" }}>
              {/* Return button */}
              <Button
                type="text"
                icon={<FaArrowLeft />}
                onClick={() => setStep("form")}
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 10,
                  color: "#000000ff",
                }}
              />

              <Row justify="center">
                <Col xs={24} md={20} lg={16}>
                  {/* Emergency Kit Items */}
                  <Card
                    style={{
                      background: "#fff",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      padding: "20px",
                      marginBottom: 20,
                    }}
                  >
                    <Title
                      level={3}
                      style={{ color: "#1e40af", textAlign: "center" }}
                    >
                      Emergency Kit Items
                    </Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={kitItems}
                      renderItem={(item) => (
                        <List.Item
                          style={{ borderBottom: "1px solid #f0f0f0" }}
                        >
                          <List.Item.Meta
                            avatar={item.icon}
                            title={
                              <span style={{ color: "#1f2937" }}>
                                {item.text}
                              </span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>

                  {/* Friendly Reminders */}
                  <Card
                    style={{
                      background: "#fff",
                      border: "1px solid #333",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <Title
                      level={3}
                      style={{ color: "#1e40af", textAlign: "center" }}
                    >
                      Friendly Reminders
                    </Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={reminderItems}
                      renderItem={(item) => (
                        <List.Item
                          style={{ borderBottom: "1px solid #f0f0f0" }}
                        >
                          <List.Item.Meta
                            avatar={item.icon}
                            title={
                              <span style={{ color: "#1f2937" }}>
                                {item.text}
                              </span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>

                  {/* Download & Share */}
                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <Button
                      type="primary"
                      icon={<FaDownload />}
                      style={{ marginRight: 10 }}
                      loading={loading}
                      onClick={handleDownload}
                      size="large"
                    >
                      Download Checklist PDF
                    </Button>
                    <Button
                      icon={<FaShareAlt />}
                      style={{ marginRight: 10 }}
                      onClick={handleShare}
                      size="large"
                    >
                      Share to your family
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
