"use client";

import { Chatbot } from "./ChatBot";
import { FooterWithQR } from "./FooterWithQR";
import { usePathname } from "next/navigation";

export default function ChatbotWrapper() {
  const pathname = usePathname();
  if (pathname !== "/home") return null;

  return (
    <>
      <Chatbot />
      <FooterWithQR />
    </>
  );
}
