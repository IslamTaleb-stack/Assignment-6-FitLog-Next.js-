"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/PlanContext";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 border-b border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/assets/logo.png"
                    alt="FitLog Logo"
                    width={28}
                    height={28}
                />
                <span className="text-lg font-bold tracking-wider">FITLOG</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex gap-8">
                <Link
                    href="/"
                    className={`${pathname === "/"
                        ? "text-lime-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                        }`}
                >
                    Workout
                </Link>
                <Link
                    href="/my-plan"
                    className={`${pathname === "/my-plan"
                        ? "text-lime-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                        }`}
                >
                    My Plan
                </Link>
            </div>

            {/* Badges / Counters */}
            <div className="flex gap-3">
                <Link
                    href="/my-plan"
                    className="px-3 py-1 rounded-full text-sm bg-lime-300 text-black font-medium"
                >
                    Plan {plan.length}
                </Link>
                <Link
                    href="/my-plan"
                    className="px-3 py-1 rounded-full text-sm border border-gray-500 text-gray-300"
                >
                    Saved {saved.length}
                </Link>
            </div>
        </nav>
    );
}