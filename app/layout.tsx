import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata = {
  title: "Flood Fighter",
  description: "Be Prepared. Stay Safe. Recover Stronger.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          backgroundColor: "#f9fafb",
          color: "#111827",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 固定在顶部 */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
          <Navbar />
        </div>

        {/* 中间可滚动的主内容 */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: "64px", // 留出 Navbar 高度
            paddingBottom: "64px", // 留出 Footer 高度
          }}
        >
          {children}
        </main>

        {/* 固定在底部 */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}