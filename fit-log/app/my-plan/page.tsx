"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/lib/PlanContext";
import type { Workout } from "@/lib/types";

export default function MyPlanPage() {
    const { plan, saved, planTotal, removeFromPlan, removeFromSaved } = usePlan();
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

    // Which list to show based on tab
    const displayList = activeTab === "plan" ? plan : saved;
    const hasItems = displayList.length > 0;

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            {/* Main Container */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">MY PLAN</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Cap off this list for today. Finish them, then load more.
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                            <div className="text-3xl font-bold text-white">{planTotal.count}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Exercises</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">{planTotal.duration}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Minutes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">{planTotal.calories}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Calories</div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-0 mb-6">
                        <button
                            onClick={() => setActiveTab("plan")}
                            className={`px-5 py-2 text-sm font-semibold uppercase transition ${activeTab === "plan"
                                    ? "bg-[#CCFF00] text-black rounded-t"
                                    : "bg-transparent text-gray-500 border-b-2 border-transparent hover:border-gray-700"
                                }`}
                        >
                            Today's Plan
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-5 py-2 text-sm font-semibold uppercase transition ${activeTab === "saved"
                                    ? "bg-[#CCFF00] text-black rounded-t"
                                    : "bg-transparent text-gray-500 border-b-2 border-transparent hover:border-gray-700"
                                }`}
                        >
                            Saved
                        </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex justify-end mb-4">
                        <select className="bg-[#121218] border border-gray-700 rounded px-3 py-1.5 text-xs text-gray-400 focus:outline-none">
                            <option>Sort By: Duration</option>
                            <option>Sort By: Name</option>
                            <option>Sort By: Calories</option>
                        </select>
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-[#121218] rounded-lg border border-gray-800 p-6">
                    {/* === EMPTY STATE === */}
                    {!hasItems && (
                        <div className="py-16 text-center">
                            <h3 className="text-lg font-semibold uppercase mb-2">NOTHING HERE YET</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Browse the library and add to fill today's routine.
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-[#CCFF00] text-black px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#b3e600] transition"
                            >
                                GO TO WORKOUTS
                            </Link>
                        </div>
                    )}

                    {/* === FILLED STATE === */}
                    {hasItems && (
                        <div className="space-y-4">
                            {displayList.map((workout) => (
                                <WorkoutRow
                                    key={workout.id}
                                    workout={workout}
                                    activeTab={activeTab}
                                    onRemove={() =>
                                        activeTab === "plan"
                                            ? removeFromPlan(workout.id as number)
                                            : removeFromSaved(workout.id as number)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Reusable Row Component
function WorkoutRow({
    workout,
    activeTab,
    onRemove,
}: {
    workout: Workout;
    activeTab: "plan" | "saved";
    onRemove: () => void;
}) {
    return (
        <div className="flex items-center gap-4 bg-[#1A1A22] rounded p-4 border border-gray-700/50 hover:border-gray-600 transition">
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm uppercase tracking-wide truncate">{workout.name}</h4>
                <p className="text-xs text-gray-500 mt-1">
                    {workout.equipment?.split(",")[0] || "—"}
                </p>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>⭐ {workout.rating}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                    href={`/workouts/${workout.id}`}
                    className="text-xs text-gray-400 hover:text-white px-3 py-1.5 border border-gray-600 rounded transition"
                >
                    View Details
                </Link>

                {activeTab === "plan" ? (
                    <button
                        className="bg-[#CCFF00] text-black px-4 py-1.5 rounded text-xs font-semibold hover:bg-[#b3e600] transition"
                    >
                        Mark as Done
                    </button>
                ) : (
                    <button
                        onClick={onRemove}
                        className="text-gray-400 hover:text-red-400 px-2 py-1.5 text-xs transition"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}