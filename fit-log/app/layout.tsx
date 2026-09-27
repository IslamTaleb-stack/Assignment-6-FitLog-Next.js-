import type { Metadata } from "next";
import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0F] text-white min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}