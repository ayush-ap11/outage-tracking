import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata = {
  title: "Light Buddy — Pune Outage Tracker",
  description:
    "Real-time power outage tracking and reporting for Pune citizens",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-text-primary antialiased">
        <AuthProvider>
          <NavbarWrapper />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
