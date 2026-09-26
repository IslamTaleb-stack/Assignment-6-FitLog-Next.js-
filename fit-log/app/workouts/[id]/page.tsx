"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { usePlan } from "@/lib/PlanContext";

export default function WorkoutDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToPlan, addToSaved } = usePlan();

    useEffect(() => {
        getAllWorkouts().then((data) => {
            const found = data.find((w) => String(w.id) === String(id));
            setWorkout(found || null);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="p-12 text-center text-gray-400">Loading…</div>;
    if (!workout) return <div className="p-12 text-center text-gray-400">Workout not found</div>;

    return (
        <div className="pt-24 px-4 md:px-6 pb-16 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">

                {/* Left — Workout Image */}
                <div className="relative rounded-lg overflow-hidden h-[420px]">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Right — Info Panel */}
                <div>
                    {/* 1. NAME — Top, Bold */}
                    <h1 className="text-2xl font-bold uppercase mb-2">{workout.name}</h1>

                    {/* 2. SHORT DESCRIPTION */}
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
                    </p>

                    {/* 3. TAGS */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {workout.muscleGroups?.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-[#CCFF00] text-black text-xs font-bold rounded"
                            >
                                {tag.toUpperCase()}
                            </span>
                        ))}
                    </div>

                    {/* 4. DARK DETAILS BOX — Exact Figma */}
                    <div className="bg-[#111418] rounded-lg overflow-hidden mb-6">
                        <div className="divide-y divide-white/5">
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Equipment</span>
                                <span className="text-white text-sm">{workout.equipment || "Barbell, Bench"}</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Difficulty</span>
                                <span className="text-white text-sm">{workout.difficulty || "Intermediate"}</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Sets</span>
                                <span className="text-white text-sm">{workout.sets || "4"}</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Reps</span>
                                <span className="text-white text-sm">{workout.reps || "6–8"}</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Duration</span>
                                <span className="text-white text-sm">{workout.duration} min</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Calories</span>
                                <span className="text-white text-sm">{workout.caloriesBurned} kcal</span>
                            </div>
                            <div className="flex justify-between px-5 py-3">
                                <span className="text-gray-500 text-xs uppercase tracking-wider">Rating</span>
                                <span className="text-white text-sm">{workout.rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. INSTRUCTIONS — Header white bold, list dark plain */}
                    <div className="mb-8">
                        <h3 className="text-xs uppercase text-white font-bold tracking-wider mb-2">Instructions</h3>
                        <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside font-normal">
                            <li>Lie on the bench with eyes under the bar and feet planted.</li>
                            <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                            <li>Press up in a straight line until elbows lock without bouncing.</li>
                            <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                        </ol>
                    </div>

                    {/* 6. BUTTONS */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="bg-[#CCFF00] text-black px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#b3e600] transition"
                        >
                            + Add to today's plan
                        </button>
                        <button
                            onClick={() => addToSaved(workout)}
                            className="border border-gray-600 px-6 py-2.5 rounded font-semibold text-sm hover:border-white transition flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.315A.5.5 0 0 1 2 15V2z" />
                            </svg>
                            Save for later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}