// app/not-found.tsx
"use client";

import { Empty, Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#000",
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span style={{color:"#fff"}}>404 - Page Not Found</span>}
      >
        <Link href="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </Empty>
    </div>
  );
}
