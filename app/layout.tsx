import type { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import './globals.css'

export const metadata = {
  title: "Flood Fighter",
  description: "Be Prepared. Stay Safe. Recover Stronger.",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
        <head>
    <link rel="icon" href="/logo.jpeg" type="image/png" />
  </head>

      <body
        style={{
          margin: 0,
          backgroundColor: "#f9fafb",
          color: "#111827",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* make nav bar to stick at the top */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
          <Navbar />
        </div>

        {/* main content to be scrollable */}
        <main
          style={{
            flex: 1,
            paddingTop: "64px", // leave some space for nav bar
            background: '#000'
          }}
        >
          {children}
        </main>

        {/* footer will be stick at bottom*/}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999 }}>
          <Footer />
        </div>
      </body>
    </html>
  );
}