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
        {/* make nav bar to stick at the top */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
          <Navbar />
        </div>

        {/* main content to be scrollable */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: "64px", // leave some space for nav bar
            paddingBottom: "64px", // leave some space for footer bar
          }}
        >
          {children}
        </main>

        {/* footer will be stick at bottom*/}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}