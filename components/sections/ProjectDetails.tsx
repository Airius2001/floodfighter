"use client";
import React from "react";
import Link from "next/link";
import { Card, Row, Col, Typography } from "antd";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import Rainfall from "./Rainfall";

const { Title, Paragraph } = Typography;

export default function SectionCard() {
  // 1️⃣ create data
  const [rainfallData, setRainfallData] = useState([]);

  // 2️⃣ useEffect read public/data/rainfall.json
  useEffect(() => {
    fetch("/data/rainfall.json")
      .then((res) => res.json())
      .then((json) => setRainfallData(json))
      .catch((err) => console.error("Failed to load rainfall data:", err));
  }, []);

  return (
    <section
      style={{
        background: "#bfd6f8ff",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <Title level={1} style={{ color: "#1e3a8a" }}>
            Flood Fighter at a Glance
          </Title>
          <Paragraph
            style={{
              color: "#1f2937",
              fontSize: 20,
              maxWidth: 800,
              margin: "0 auto",
            }}
          >
            Flood Fighter: Stay Ready, Stay Safe is an interactive website
            designed to help communities prepare before, during, and after
            floods. Unlike existing platforms that focus mainly on alerts, Flood
            Fighter provides clear, practical steps to protect families, keep
            water safe, and maintain hygiene during emergencies.
          </Paragraph>
        </div>
        <Rainfall />
      </div>
    </section>
  );
}
