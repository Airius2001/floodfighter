import type { ReactNode } from "react";
import "./globals.css";
import LayoutClient from "./LayoutClient";

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
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
