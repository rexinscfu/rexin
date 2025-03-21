import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayout } from "@/components/layout/RootLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Firmware Engineer & Hardware Creator",
  description: "Professional portfolio showcasing firmware engineering, low-level development, hardware creation, and electronic repair expertise.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
