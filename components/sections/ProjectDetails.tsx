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
        <Rainfall />
      </div>
    </section>
  );
}
