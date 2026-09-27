'use client'; 

import Link from "next/link";
import { usePlan } from "@/lib/PlanContext";

export default function Navbar() {
    const { plan, saved } = usePlan();

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-black/90 z-50 border-b border-gray-800">
            {/* Logo */}
            <Link href="/" className="font-bold text-lg">FITLOG</Link>

            {/* Middle Links */}
            <div className="flex gap-8">
                <Link href="/" className="text-sm hover:text-[#CCFF00] transition-colors">Workouts</Link>
                <Link href="/my-plan" className="text-sm hover:text-[#CCFF00] transition-colors">My Plan</Link>
            </div>

            {/* Right Side — Counters */}
            <div className="flex gap-3">
                <Link
                    href="/my-plan"
                    className="bg-[#CCFF00] text-black px-3 py-1 rounded-full text-xs font-semibold"
                >
                    Plan {plan.length}
                </Link>
                <span className="border border-[#CCFF00]/40 text-[#CCFF00] px-3 py-1 rounded-full text-xs font-semibold">
                    Saved {saved.length}
                </span>
            </div>
        </nav>
    );
}