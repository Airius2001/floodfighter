"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Switch, Select } from "antd";

const { Option } = Select;

export function Rainfall() {
  const [rainfallData, setRainfallData] = useState<
    { year: string; Total: number }[]
  >([]);
  const [showLineChart, setShowLineChart] = useState(false);
  const [fromYear, setFromYear] = useState<string | null>(null);
  const [toYear, setToYear] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://floodfighterbackend-uc7p.onrender.com/rainfall")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((d: any) => ({
          year: d.year,
          Total: d.total ?? 0,
        }));
        setRainfallData(formatted);

        // Set default from and to year
        if (formatted.length > 0) {
          setFromYear(formatted[0].year);
          setToYear(formatted[formatted.length - 1].year);
        }
      })
      .catch((err) => console.error("Failed to load rainfall data:", err));
  }, []);

  const handleLearnMore = () => {
    window.open(
      "https://www.ga.gov.au/education/natural-hazards/flood",
      "_blank"
    );
  };

  // Filter data based on selected years
  const filteredData = rainfallData.filter((d) => {
    const yearNum = parseInt(d.year);
    return (
      (!fromYear || yearNum >= parseInt(fromYear)) &&
      (!toYear || yearNum <= parseInt(toYear))
    );
  });

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #000 0%, #111827 100%)",
        padding: "20px 0",
        borderRadius: '12px'
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 1.5rem",
        }}
      >
        <h1 style={{color:'#fff', textAlign:'center', marginBottom:20}}>
            Australian annual mean rainfall
        </h1>
        <h4
          style={{
            fontSize: "28px",
            marginBottom: "2rem",
            color: "#ffffffff",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          Australia's national, 2024's area-averaged rainfall total was 602 mm,{" "}
          <span style={{ color: "red", fontSize: "50px" }}>28%</span> above the
          1961–1990 average of 466 mm.
        </h4>

        {/* Chart switch */}
        <div style={{
          marginBottom: "1rem", color: "#fff", display: "flex", gap: "1rem", alignItems: "center",
          justifyContent: "end",
          width: "100%",
          marginRight: "10px"
        }}>
          <Switch
            checkedChildren="Line"
            unCheckedChildren="Bar"
            onChange={(checked) => setShowLineChart(checked)}
            style={{ backgroundColor: showLineChart ? 'rgb(59, 130, 246)' : 'gray' }}

          />

          {/* Year filter dropdowns */}
          {rainfallData.length > 0 && (
            <>
              <span>From:</span>
              <Select
                value={fromYear}
                onChange={(val) => setFromYear(val)}
                style={{ width: 100 }}
              >
                {rainfallData.map((d) => (
                  <Option key={d.year} value={d.year}>
                    {d.year}
                  </Option>
                ))}
              </Select>

              <span>To:</span>
              <Select
                value={toYear}
                onChange={(val) => setToYear(val)}
                style={{ width: 100 }}
              >
                {rainfallData.map((d) => (
                  <Option key={d.year} value={d.year}>
                    {d.year}
                  </Option>
                ))}
              </Select>
            </>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: "1200px",
            gap: "2rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* left side explanation */}
          <div
            style={{
              flex: "1 1 300px",
              color: "#fff",
              fontSize: "18px",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
              fontFamily: "sans-serif",
              marginRight: "20px",
            }}
          >
            <p>
              In recent years, Australia's precipitation has clearly increased
              compared to the historical average (1961–1990), especially with
              more frequent fluctuations in rainfall in certain areas.
            </p>
            <p>
              This means that the risk of flooding is increasing, making it
              particularly important for residents living in flood-prone areas
              to be informed about flood-related information and response
              strategies in advance.
            </p>
            <p>
              Click the button below to access the 'Knowledge about facing
              flood' page for practical flood prevention tips and guidelines:
            </p>

            <button
              onClick={handleLearnMore}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "20px",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              Go to learn Flood knowledge
            </button>
          </div>

          {/* right side chart */}
          <div
            style={{
              flex: "1 1 300px",
              height: "450px",
              background: "#1f2937",
              padding: "1rem",
              borderRadius: "16px",
            }}
          >
            {filteredData.length > 0 ? (
              showLineChart ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid stroke="#444" strokeDasharray="4 4" />
                    <XAxis
                      dataKey="year"
                      stroke="#fff"
                      label={{ value: "Year", position: "insideBottom", offset: -5, fill: "#fff" }}
                    />
                    <YAxis
                      stroke="#fff"
                      label={{
                        value: "Rainfall Total (mm)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#fff",
                        textAnchor: "middle",
                      }}
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        value != null ? Math.round(value) : "No data"
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="Total"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>

                    <XAxis dataKey="year" stroke="#fff">
                      <Label
                        value="Year"
                        offset={-5}
                        position="insideBottom"
                        style={{ fill: "#fff" }}
                      />
                    </XAxis>

                    <YAxis stroke="#fff">
                      <Label
                        value="Rainfall Total (mm)"
                        angle={-90}
                        position="insideLeft"
                        style={{ fill: "#fff", textAnchor: "middle" }}
                      />
                    </YAxis>

                    <Tooltip
                      formatter={(value: number) => [Math.round(value), "Total"]}
                    />
                    <Bar
                      dataKey="Total"
                      fill="#3b82f6"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )
            ) : (
              <p
                style={{
                  color: "#fff",
                  textAlign: "center",
                  paddingTop: "150px",
                }}
              >
                Loading chart...
              </p>
            )}

            {/* Add citation source */}
            <div
              style={{
                textAlign: "left",
                fontSize: "12px",
                color: "#9ca3af",
                paddingRight: "0.5rem",
                marginTop:'20px'
              }}
            >
              Data Source By:{" "}
              <a
                href="https://www.bom.gov.au/web01/ncc/www/cli_chg/timeseries/rain/0112/aus/latest.txt"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#93c5fd",
                  textDecoration: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                Bureau of Meteorology
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Rainfall;
