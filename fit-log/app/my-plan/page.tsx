"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/lib/PlanContext";
import type { Workout } from "@/lib/types";

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#CCFF00] text-black px-6 py-3 rounded-lg font-semibold text-sm shadow-lg flex items-center gap-3">
            <span>{message}</span>
            <button onClick={onClose} className="text-black/60 hover:text-black">✕</button>
        </div>
    );
}

export default function MyPlanPage() {
    const { plan, saved, planTotal, removeFromPlan, removeFromSaved, isLoaded } = usePlan();
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [doneIds, setDoneIds] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<"duration" | "name" | "calories">("duration");
    const [toast, setToast] = useState<string | null>(null);

    const baseList = activeTab === "plan" ? plan : saved;

    const displayList = useMemo(() => {
        return [...baseList].sort((a, b) => {
            if (sortBy === "duration") return a.duration - b.duration;
            if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
            if (sortBy === "name") return a.name.localeCompare(b.name);
            return 0;
        });
    }, [baseList, sortBy]);

    const hasItems = displayList.length > 0;

    // ✅ MARK AS DONE — Only change button + show toast. DO NOT remove card.
    const handleMarkDone = (id: number, name: string) => {
        if (!doneIds.includes(id)) {
            setDoneIds(prev => [...prev, id]);
            setToast(`✓ ${name} marked as done!`);
            setTimeout(() => setToast(null), 3000);
        }
    };

    // ✅ REMOVE — Only this removes the card + show toast
    const handleRemove = (id: number, name: string) => {
        if (activeTab === "plan") {
            removeFromPlan(id);
        } else {
            removeFromSaved(id);
        }
        setDoneIds(prev => prev.filter(i => i !== id));
        setToast(`✕ ${name} removed`);
        setTimeout(() => setToast(null), 3000);
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center text-white">
                Loading workouts…
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            {toast && <Toast message={toast} onClose={() => setToast(null)} />}

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold uppercase tracking-wide mb-1">MY PLAN</h1>
                    <p className="text-gray-500 text-sm mb-4">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <div className="text-2xl font-bold text-white">{planTotal.count}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Exercises</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{planTotal.duration}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Minutes</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{planTotal.calories}</div>
                            <div className="text-xs text-gray-500 uppercase mt-1">Calories</div>
                        </div>
                    </div>

                    <div className="flex gap-8 mb-4 mt-4">
                        <button
                            onClick={() => setActiveTab("plan")}
                            className={`cursor-pointer text-sm uppercase transition pb-2 border-b-2 ${activeTab === "plan"
                                    ? "text-[#CCFF00] border-[#CCFF00] font-bold"
                                    : "text-gray-500 border-transparent hover:text-white hover:font-bold"
                                }`}
                        >
                            <span className="block py-1">Today's Plan</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`cursor-pointer text-sm uppercase transition pb-2 border-b-2 ${activeTab === "saved"
                                    ? "text-[#CCFF00] border-[#CCFF00] font-bold"
                                    : "text-gray-500 border-transparent hover:text-white hover:font-bold"
                                }`}
                        >
                            <span className="block py-1">Saved</span>
                        </button>
                    </div>

                    <div className="flex justify-end -mt-10 mb-2 relative z-10">
                        <select
                            className="cursor-pointer bg-[#121218] border border-gray-700 rounded px-3 py-1.5 text-xs text-gray-400 focus:outline-none"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        >
                            <option value="duration">Sort By: Duration</option>
                            <option value="name">Sort By: Name</option>
                            <option value="calories">Sort By: Calories</option>
                        </select>
                    </div>
                </div>

                <div className="bg-[#121218] rounded-lg border border-gray-800 p-4">
                    {!hasItems && (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-semibold uppercase mb-2">NOTHING HERE YET</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Browse the library and add a lift to get today moving.
                            </p>
                            <Link
                                href="/"
                                className="cursor-pointer inline-block bg-[#CCFF00] text-black px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#b3e600] transition"
                            >
                                Go to workouts
                            </Link>
                        </div>
                    )}

                    {hasItems && (
                        <div className="flex flex-col">
                            {displayList.map((workout) => (
                                <WorkoutRow
                                    key={workout.id}
                                    workout={workout}
                                    activeTab={activeTab}
                                    isMarkedDone={doneIds.includes(workout.id as number)}
                                    onMarkDone={() => handleMarkDone(workout.id as number, workout.name)}
                                    onRemove={() => handleRemove(workout.id as number, workout.name)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function WorkoutRow({
    workout,
    activeTab,
    isMarkedDone,
    onMarkDone,
    onRemove,
}: {
    workout: Workout;
    activeTab: "plan" | "saved";
    isMarkedDone: boolean;
    onMarkDone: () => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex items-center gap-3 bg-[#1A1A22] p-3 border-b border-gray-700/50 last:border-b-0 hover:bg-[#1f1f2a] transition">
            <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm uppercase tracking-wide truncate">{workout.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                    {workout.equipment?.split(",")[0] || "—"}
                </p>
                <div className="flex gap-2 mt-1 text-xs text-gray-400">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>⭐ {workout.rating}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                    href={`/workouts/${workout.id}`}
                    className="cursor-pointer text-xs text-gray-400 hover:text-white px-2.5 py-1.5 border border-gray-600 rounded transition"
                >
                    View Details
                </Link>

                {activeTab === "plan" ? (
                    <>
                        {/* ✅ MARK AS DONE — Button changes + Toast — CARD STAYS HERE */}
                        <button
                            onClick={onMarkDone}
                            className={`cursor-pointer px-3 py-1.5 rounded text-xs font-semibold transition whitespace-nowrap ${isMarkedDone
                                    ? "bg-green-600 text-white"
                                    : "bg-[#CCFF00] text-black hover:bg-[#b3e600]"
                                }`}
                        >
                            {isMarkedDone ? "✓ Done" : "Mark as Done"}
                        </button>

                        {/* ✅ REMOVE BUTTON — ONLY THIS removes the card */}
                        <button
                            onClick={onRemove}
                            className="cursor-pointer text-gray-500 hover:text-red-400 text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/10 transition"
                            title="Remove"
                        >
                            ✕
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href={`/workouts/${workout.id}`}
                            className="cursor-pointer text-xs text-gray-400 hover:text-white px-2.5 py-1.5 border border-gray-600 rounded transition"
                        >
                            View Details
                        </Link>
                        <button
                            onClick={onRemove}
                            className="cursor-pointer text-gray-500 hover:text-red-400 text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-500/10 transition"
                            title="Remove"
                        >
                            ✕
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}