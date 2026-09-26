import "./globals.css";
import { PlanProvider } from "@/lib/PlanContext";
import Navbar from "@/components/Navbar"; // ✅ Import the separate file

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        <PlanProvider>
          <Navbar /> {/* ✅ Use the client component here */}
          <main className="pt-16">
            {children}
          </main>
        </PlanProvider>
      </body>
    </html>
  );
}