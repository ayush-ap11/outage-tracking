import type { ReactNode } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

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
      </head>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <AuthProvider>
          <NavbarWrapper />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
