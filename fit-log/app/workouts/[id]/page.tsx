"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import { usePlan } from "@/lib/PlanContext";
import type { Workout } from "@/lib/types";

export default function WorkoutDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToPlan, addToSaved } = usePlan();

    const [workout, setWorkout] = useState<Workout | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const data = await getWorkoutById(params.id as string);
                setWorkout(data);
            } catch (err) {
                console.log("Error loading workout:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [params.id]);

    if (loading) {
        return <div className="p-12 text-center">Loading workout...</div>;
    }

    if (!workout) {
        return <div className="p-12 text-center">Workout not found.</div>;
    }

    return (
        <div className="min-h-screen px-4 md:px-8 py-12">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 text-lime-400 hover:text-lime-300"
            >
                ← Back to Workouts
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left — Image */}
                <div className="bg-gray-900 rounded-xl p-4">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        width={500}
                        height={400}
                        unoptimized
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>

                {/* Right — Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold uppercase">{workout.name}</h1>

                    <div className="flex flex-wrap gap-2">
                        {workout.muscleGroups.map((muscle) => (
                            <span
                                key={muscle}
                                className="px-3 py-1 bg-lime-400/10 text-lime-400 rounded-full text-sm"
                            >
                                {muscle}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-400">{workout.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <p className="text-gray-500 text-sm">Duration</p>
                            <p className="font-bold">{workout.duration} min</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Calories</p>
                            <p className="font-bold">{workout.caloriesBurned} kcal</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Sets</p>
                            <p className="font-bold">{workout.sets}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Rating</p>
                            <p className="font-bold">{workout.rating} / 5</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm mb-1">Difficulty</p>
                        <p className="font-bold">{workout.difficulty}</p>
                    </div>

                    <div>
                        <p className="text-gray-500 text-sm mb-1">Reps</p>
                        <p className="font-bold">{workout.reps}</p>
                    </div>

                    {/* Instructions */}
                    <div className="pt-4">
                        <h3 className="font-bold text-lg mb-2">Instructions</h3>
                        <ul className="list-disc list-inside text-gray-400 space-y-2">
                            {workout.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6">
                        <button
                            onClick={() => addToPlan(workout)}
                            className="bg-lime-400 text-black px-6 py-3 rounded font-semibold hover:bg-lime-300 transition"
                        >
                            Add to Plan
                        </button>
                        <button
                            onClick={() => addToSaved(workout)}
                            className="border border-gray-600 px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}