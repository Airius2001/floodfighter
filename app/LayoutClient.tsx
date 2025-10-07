"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import ChatbotWrapper from "@/components/ui/ChatbotWrapper";
import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <div
      style={{
        margin: 0,
        backgroundColor: "#f9fafb",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!isLoginPage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <Navbar />
        </div>
      )}

      <main
        style={{
          flex: 1,
          paddingTop: isLoginPage ? "0" : "64px",
          background: "#e6f0ff",
          paddingBottom: isLoginPage ? "0" : "20px",
        }}
      >
        {children}
      </main>

      {!isLoginPage && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 999,
            }}
          >
            <Footer />
          </div>
          <ChatbotWrapper />
        </>
      )}
    </div>
  );
}
