"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  message,
  Empty,
  Spin,
  Row,
  Col,
  Switch,
} from "antd";
import dynamic from "next/dynamic";
import axios from "axios";
import {
  BsFillPinMapFill
} from "react-icons/bs";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { MdOutlineGpsFixed } from "react-icons/md";

const { Title, Text } = Typography;

// ✅ Dynamically import Ant Design Charts (disable SSR)
const Line = dynamic(() => import("@ant-design/charts").then((mod) => mod.Line), {
  ssr: false,
});
const Column = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Column),
  { ssr: false }
);

export default function CheckPostcodePage() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [chartType, setChartType] = useState<"line" | "bar">("line"); // 👈 toggle chart type

  const fetchData = async () => {
    if (!postcode) {
      message.warning("Please enter a postcode");
      return;
    }

    try {
      setLoading(true);

      // Call Geo API
      const geoRes = await axios.get("http://localhost:3000/geo", {
        params: { postcode },
      });
      setLocation(geoRes.data);

      // Call Weather API
      const weatherRes = await axios.get("http://localhost:3000/weather", {
        params: {
          lat: geoRes.data.latitude,
          lon: geoRes.data.longitude,
        },
      });
      setWeather(weatherRes.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "low":
        return {
          color: "green",
          icon: <FaCheckCircle style={{ marginRight: 8, color: "green" }} />,
        };
      case "medium":
        return {
          color: "orange",
          icon: (
            <FaExclamationTriangle style={{ marginRight: 8, color: "orange" }} />
          ),
        };
      case "high":
        return {
          color: "red",
          icon: <FaTimesCircle style={{ marginRight: 8, color: "red" }} />,
        };
      default:
        return {
          color: "#555",
          icon: <FaExclamationTriangle style={{ marginRight: 8 }} />,
        };
    }
  };

  const { color, icon } = getStatusStyle(weather?.status);

  const chartData =
    weather?.timeline.map((t: any) => ({
      time: t.time.slice(11, 16),
      precipitation: t.precipitation ?? 0,
    })) || [];

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 900,
        margin: "0 auto",
        minHeight: "100vh"
      }}
    >
      <Card>
        <div style={{ marginBottom: "10px" }}>
          <Title level={3}>🌊 Flood Fighter – Check Flood Risk</Title>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <Input
            placeholder="Enter Australian postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <Button type="primary" loading={loading} onClick={fetchData}>
            Check
          </Button>
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              flexDirection: "column",
            }}
          >
            <Spin size="large" style={{ marginBottom: 10 }} />
            <p>Loading Statistics...</p>
          </div>
        ) : (
          <>
            {location && weather ? (
              <div>
                <h4
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                    fontWeight: "600",
                    color,
                    margin: "10px 0",
                  }}
                >
                  {icon} Flood Status: {weather.status}
                </h4>
                <Card
                  className="info-card"
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    marginBottom: 20,
                  }}
                >
                  <Row gutter={16} align="middle">
                    {/* Left Side Info */}
                    <Col xs={24} md={16}>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <FaMapMarkerAlt
                          style={{ color: "#1890ff", marginRight: 8 }}
                        />
                        <strong>Postcode : </strong>{" "}
                        <Text>{location.location.split(",")[0]}</Text>
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <MdOutlineGpsFixed
                          style={{ color: "green", marginRight: 8 }}
                        />
                        <strong>Latitude : </strong>{" "}
                        <Text>{weather.latitude}</Text>
                      </p>
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <MdOutlineGpsFixed
                          style={{ color: "red", marginRight: 8 }}
                        />
                        <strong>Longitude : </strong>{" "}
                        <Text>{weather.longitude}</Text>
                      </p>
                      <p>
                        <BsFillPinMapFill
                          style={{
                            color: "orange",
                            marginRight: 8,
                            marginTop: 5,
                          }}
                        />
                        <strong>Location : </strong>{" "}
                        <Text>
                          {location.location
                            .split(",")
                            .slice(1)
                            .join(", ")
                            .trim()}
                        </Text>
                      </p>
                    </Col>

                    {/* Right Side Note Box */}
                    <Col xs={24} md={8}>
                      <Card
                        size="small"
                        title="Precipitation Levels"
                        style={{
                          borderLeft: "4px solid #1890ff",
                          background: "#fafafa",
                          borderRadius: 8,
                        }}
                      >
                        <p>
                          <Text type="success">&lt; 1 Low</Text>
                        </p>
                        <p>
                          <Text type="warning">&gt; 1 Medium</Text>
                        </p>
                        <p>
                          <Text type="danger">&gt; 2 Risk</Text>
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </Card>

                {/* Switch to toggle chart type */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ marginRight: 8 }}>Bar</span>
                  <Switch
                    checked={chartType === "line"}
                    onChange={(checked) =>
                      setChartType(checked ? "line" : "bar")
                    }
                  />
                  <span style={{ marginLeft: 8 }}>Line</span>
                </div>

                {/* Chart */}
                {chartType === "line" ? (
                  <Line
                    data={chartData}
                    xField="time"
                    yField="precipitation"
                    smooth
                    point={{ size: 4, shape: "circle" }}
                    color="blue"
                    yAxis={{ title: { text: "Precipitation (mm)" } }}
                    xAxis={{ title: { text: "Time (hours)" } }}
                    height={350}
                  />
                ) : (
                  <Column
                    data={chartData}
                    xField="time"
                    yField="precipitation"
                    color="blue"
                    columnStyle={{ radius: [4, 4, 0, 0] }}
                    yAxis={{ title: { text: "Precipitation (mm)" } }}
                    xAxis={{ title: { text: "Time (hours)" } }}
                    height={350}
                  />
                )}
              </div>
            ) : (
              <Empty description={"Check Flood Status based on Post Code"} />
            )}
          </>
        )}
      </Card>
    </div>
  );
}
