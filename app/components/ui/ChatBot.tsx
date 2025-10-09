"use client";

import React, { useRef, useState } from "react";
import { Modal, Button } from "antd";
import { MessageCircleCodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";


export function Chatbot() {

    const router = useRouter()
  return (
    <>
      {/* QR Button */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          left: 0,
          right: 10,
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
        onClick={() => router.push("/chat-bot")}
          style={{
            position: "absolute",
            right: 30,
            bottom: 70,
            background: "white",
            borderRadius: "50%",
            width: 50,
            height: 50,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MessageCircleCodeIcon size={22} color="#1e3a8a" />
        </div>
      </div>

    </>
  );
}
