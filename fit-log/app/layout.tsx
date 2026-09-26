import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";  // ← Must import this!
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans bg-gray-950 text-white min-h-screen">
        {/* PlanProvider MUST wrap everything */}
        <PlanProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </PlanProvider>
      </body>
    </html>
  );
}