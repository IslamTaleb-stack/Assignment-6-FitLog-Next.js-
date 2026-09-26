"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Default");

  useEffect(() => {
    getAllWorkouts().then((data) => {
      setWorkouts(data);
      setLoading(false);
    });
  }, []);

  let sorted = [...workouts];

  if (sortBy === "Duration") {
    sorted.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === "Calories") {
    sorted.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  } else if (sortBy === "Rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  // "Default" → no sorting, keeps original order = matches Figma ✅

  if (loading) return <div className="p-12 text-center text-gray-400">Loading workouts…</div>;

  return (
    <div>
      <Hero />

      <section id="library" className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold uppercase">THE LIBRARY</h2>
              <p className="text-gray-500 text-sm mt-1">Workouts covering every major muscle group.</p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121212] border border-[#262626] rounded px-3 py-2 text-sm text-white"
            >
              <option value="Default">Sort By: Default</option>
              <option value="Duration">Sort By: Duration</option>
              <option value="Calories">Sort By: Calories</option>
              <option value="Rating">Sort By: Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}