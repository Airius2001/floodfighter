"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

export function FeatureDuplex() {
  // 1️⃣ create data
  const [rainfallData, setRainfallData] = useState([]);

  // 2️⃣ useEffect read public/data/rainfall.json
  useEffect(() => {
    fetch("/data/rainfall.json")
      .then((res) => res.json())
      .then((json) => setRainfallData(json))
      .catch((err) => console.error("Failed to load rainfall data:", err));
  }, []);

  // Handle button click event
  const handleLearnMore = () => {
    // Here you can add the logic to navigate to the flood knowledge page.
    alert("Redirecting to Flood Response Knowledge page...(TODO)");
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #000 0%, #111827 100%)",
        padding: "80px 0",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "1rem",
          paddingBottom: "1.5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        {/* title */}
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            marginBottom: "4.5rem",
            color: "#ffffffff",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          Australia's national, 2024's area-averaged rainfall total was 602 mm,{" "}
          <span style={{ color: "red", fontSize: "50px" }}>28%</span> above the
          1961–1990 average of 466 mm.
        </h1>

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
              more frequent fluctuations in rainfall in certain areas. This
              means that the risk of flooding is increasing, making it
              particularly important for residents living in flood-prone areas
              to be informed about flood-related information and response
              strategies in advance.
            </p>
            <p>
              We strongly recommend that every Australian resident pay attention
              to flooding issues and actively learn how to face and respond to
              floods so that they can make timely and informed decisions in
              emergency situations.
            </p>
            <p>
              Click the button below to access the 'Knowledge about facing
              flood' page for practical flood prevention tips and guidelines:
            </p>

            {/* Add button */}
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
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              Go to learn Flood knowledge
            </button>
          </div>

          {/* right side bar chart */}
          <div
            style={{
              flex: "1 1 300px",
              height: "450px",
              background: "#1f2937",
              padding: "1rem",
              borderRadius: "16px",
            }}
          >
            {rainfallData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallData}>
                  {/* chart title */}
                  <text
                    x="50%"
                    y={10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fill: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Australian annual mean rainfall
                  </text>

                  {/* <CartesianGrid strokeDasharray="3 3" stroke="#374151" /> */}

                  {/* X-axis + name */}
                  <XAxis dataKey="year" stroke="#fff">
                    <Label
                      value="Year"
                      offset={-5}
                      position="insideBottom"
                      style={{ fill: "#fff" }}
                    />
                  </XAxis>

                  {/* Y-axis + name */}
                  <YAxis stroke="#fff">
                    <Label
                      value="Rainfall Total (mm)"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: "#fff", textAnchor: "middle" }}
                    />
                  </YAxis>

                  <Tooltip />
                  <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
                fontStyle: "italic",
                marginTop: "0.5rem",
                paddingRight: "0.5rem",
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
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
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

export default FeatureDuplex;
