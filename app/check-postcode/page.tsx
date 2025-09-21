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
  Tooltip,
} from "antd";
import dynamic from "next/dynamic";
import axios from "axios";
import { BsFillPinMapFill } from "react-icons/bs";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { MdOutlineGpsFixed } from "react-icons/md";
import { Timer } from "lucide-react";
import { FaRankingStar } from "react-icons/fa6";

const { Title, Text } = Typography;

const Line = dynamic(() => import("@ant-design/charts").then((mod) => mod.Line), {
  ssr: false,
});
const Column = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Column),
  { ssr: false }
);
const Pie = dynamic(() => import("@ant-design/charts").then((mod) => mod.Pie), {
  ssr: false,
});

export default function CheckPostcodePage() {
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  const fetchData = async () => {
    if (!postcode) {
      message.warning("Please enter a postcode");
      return;
    }

    try {
      setLoading(true);

      const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${postcode}&polygon_geojson=1&format=jsonv2`);
      console.log(geoRes.data[0])
      setLocation(geoRes.data[0]);

      const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: geoRes.data[0].lat,
        longitude: geoRes.data[0].lon,
        hourly: "precipitation",
        timezone: "auto",
      },
    });

    // 3. Process same as backend logic
    const hours = weatherRes.data.hourly.time;
    const precip = weatherRes.data.hourly.precipitation;

    const timeline = hours.map((t: string, i: number) => {
      const mm = precip[i];
      let risk = "Low";
      if (mm > 3) risk = "High";
      else if (mm > 1.5) risk = "Medium";
      return { time: t, precipitation: mm, risk };
    });

    const overallRisk = timeline.some((t: { risk: string; }) => t.risk === "High")
      ? "High (Danger)"
      : timeline.some((t: { risk: string; }) => t.risk === "Medium")
      ? "Medium"
      : "Low";

    setWeather({
      latitude: geoRes.data[0].lat,
      longitude: geoRes.data[0].lon,
      status: overallRisk,
      timeline,
      raw: weatherRes.data,
    });
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
      case "high (danger)":
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
  weather?.timeline
    .filter((t: any) => t.precipitation && t.precipitation > 0)
    .map((t: any) => {
      const date = new Date(t.time);
      const formatted = `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getHours()}:00`;
      return { time: formatted, precipitation: t.precipitation };
    }) || [];


  const getPieData = () => {
    if (!chartData.length) return [];

    let low = 0, medium = 0, high = 0;
    chartData.forEach((item: any) => {
      const val = Number(item.precipitation) || 0;
      if (val <= 1.5) low++;
      else if (val <= 2) medium++;
      else high++;
    });

    return [
      { type: "Low Risk", value: low },
      { type: "Medium Risk", value: medium },
      { type: "High Risk", value: high },
    ];
  };


  return (
    <div
      style={{
        padding: 30,
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: "100vh",
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
        <FaMapMarkerAlt style={{ color: "#1890ff", marginRight: 8 }} />
        <strong>Postcode : </strong>{" "}
        <Text>{location?.display_name?.split(",")[0]}</Text>
      </p>

      <p style={{ display: "flex", alignItems: "center" }}>
        <MdOutlineGpsFixed style={{ color: "green", marginRight: 8 }} />
        <strong>Latitude : </strong>{" "}
        <Text>{weather.latitude}</Text>
      </p>

      <p style={{ display: "flex", alignItems: "center" }}>
        <MdOutlineGpsFixed style={{ color: "red", marginRight: 8 }} />
        <strong>Longitude : </strong>{" "}
        <Text>{weather.longitude}</Text>
      </p>

      <p>
        <BsFillPinMapFill
          style={{ color: "orange", marginRight: 8, marginTop: 5 }}
        />
        <strong>Location : </strong>{" "}
        <Text>{location?.display_name?.split(",").slice(1).join(", ").trim()}</Text>
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
          <Tooltip title="Indicates a safe level with minimal concern.">
            <Text type="success" style={{ cursor: "pointer" }}>
              &lt; 1 Low
            </Text>
          </Tooltip>
        </p>

        <p>
          <Tooltip title="Moderate caution required, monitor closely.">
            <Text type="warning" style={{ cursor: "pointer" }}>
              &gt; 1.5 Medium
            </Text>
          </Tooltip>
        </p>

        <p>
          <Tooltip title="High risk, immediate action may be needed.">
            <Text type="danger" style={{ cursor: "pointer" }}>
              &gt; 2 Risk
            </Text>
          </Tooltip>
        </p>
      </Card>
    </Col>

  </Row>
</Card>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                  <Button.Group>
                    <Button
                      type={chartType === "bar" ? "primary" : "default"}
                      onClick={() => setChartType("bar")}
                    >
                      Bar
                    </Button>
                    <Button
                      type={chartType === "line" ? "primary" : "default"}
                      onClick={() => setChartType("line")}
                    >
                      Line
                    </Button>
                    <Button
                      type={chartType === "pie" ? "primary" : "default"}
                      onClick={() => setChartType("pie")}
                    >
                      Pie
                    </Button>
                  </Button.Group>
                </div>

                {chartType === "line" && (
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
                )}
                {chartType === "bar" && (
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
                {chartType === "pie" && (
                  <Card style={{ marginTop: 20 }}>
                    <Title level={4}>📊 Risk Distribution</Title>
                    <Pie
                      data={getPieData()}
                      angleField="value"
                      colorField="type"
                      radius={0.9}
                      innerRadius={0.2}
                      startAngle={0}
                      endAngle={Math.PI * 2}
                      label={{
                        type: "inner",
                        content: ({ percent, type }: any) =>
                          `${type}\n${(percent * 100).toFixed(0)}%`,
                        style: {
                          fontSize: 12,
                          fontWeight: 700,
                          textAlign: "center",
                        },
                      }}
                      tooltip={false}
                      color={["#52c41a", "#faad14", "#f5222d"]}
                      legend={{ position: "bottom" }}
                      height={350}
                    />
                  </Card>
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
