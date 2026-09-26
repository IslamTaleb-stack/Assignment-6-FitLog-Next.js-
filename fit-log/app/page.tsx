"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getAllWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Duration");

  // Fetch workouts from API
  useEffect(() => {
    getAllWorkouts()
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading workouts:", err);
        setLoading(false);
      });
  }, []);

  // Sort logic
  let sortedWorkouts = [...workouts];
  if (sortBy === "Duration") {
    sortedWorkouts.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === "Calories") {
    sortedWorkouts.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  } else if (sortBy === "Rating") {
    sortedWorkouts.sort((a, b) => b.rating - a.rating);
  }

  if (loading) {
    return <div className="p-12 text-center">Loading workouts…</div>;
  }

  return (
    <div>
      <Hero />

      {/* Library Section */}
      <section id="library" className="px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold uppercase">THE LIBRARY</h2>
            <p className="text-gray-400 mt-2">Workouts covering every major muscle group.</p>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-4 py-2"
          >
            <option value="Duration">Sort by: Duration</option>
            <option value="Calories">Sort by: Calories</option>
            <option value="Rating">Sort by: Rating</option>
          </select>
        </div>

        {/* Workout Cards Grid */}
        {workouts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No workouts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}