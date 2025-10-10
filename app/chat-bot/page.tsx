"use client";

import { Empty, Spin } from "antd";
import React, { useState, useRef, useEffect } from "react";

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const API_KEY = "AIzaSyB9KTqvUcfHr9_LMSrc7ux41xfegAOVokw";
  const MODEL = "gemini-2.0-flash";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const handleSend = async () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `
        You are an assistant that ONLY answers questions in and about Australia. Do not provide unrelated answers.
        
        User question: "${userMessage}"
      `;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I can only answer Australia flood and rainfall related queries.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px 100px",
        height:'100vh'
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 24,
          color: "#f8fafc",
        }}
      >
        Australia Flood & Rainfall Assistant
      </h2>

      {/* Chat Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          maxHeight:'60vh',
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16,
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          overflowY: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          scrollBehavior: "smooth",
        }}
      >
        {messages.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              marginTop: "20%",
              fontStyle: "italic",
            }}
          >
            <Empty description=""/>
            Ask me about floods, rainfall, or safety in Australia
          </p>
        )}

        {messages.map((msg, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      justifyContent:
        msg.role === "user" ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      gap: "8px",
      animation: "fadeIn 0.3s ease",
      marginBottom: "10px",
    }}
  >
    {/* AI avatar (left side) */}
    {msg.role === "assistant" && (
      <img
        src="/ai.jpg"
        alt="AI Avatar"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    )}

    {/* Chat bubble */}
    <div
      style={{
        background:
          msg.role === "user"
            ? "linear-gradient(135deg, #2563eb, #3b82f6)"
            : "rgba(255,255,255,0.1)",
        padding: "10px 14px",
        borderRadius:
          msg.role === "user"
            ? "16px 16px 4px 16px"
            : "16px 16px 16px 4px",
        color: "white",
        maxWidth: "75%",
        lineHeight: 1.5,
        boxShadow:
          msg.role === "user"
            ? "0 2px 6px rgba(59,130,246,0.4)"
            : "0 2px 6px rgba(255,255,255,0.1)",
      }}
    >
      {msg.text}
    </div>

    {/* User avatar (right side) */}
    {msg.role === "user" && (
      <img
        src="/user.png"
        alt="User Avatar"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          objectFit: "cover",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    )}
  </div>
))}

        {loading && (
          <p
            style={{
              textAlign: "left",
              opacity: 0.7,
              fontStyle: "italic",
              marginTop: 10,
            }}
          >
            <Spin className="activity-spinner "/>&nbsp;Thinking…
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input fixed at bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 30,
          left: 0,
          right: 0,
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          display: "flex",
          justifyContent: "center",
          padding: "14px 16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
            maxWidth: 800,
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              outline: "none",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              border: "none",
              color: "white",
              padding: "12px 20px",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 2px 6px rgba(37,99,235,0.4)",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
