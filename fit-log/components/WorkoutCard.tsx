import Image from "next/image";  // ← Keep this import
import Link from "next/link";
import type { Workout } from "@/lib/types";

interface Props {
  workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
  return (
    <Link href={`/workouts/${workout.id}`} className="block group">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition">
        
        {/* Card Image — with unoptimized */}
        <div className="relative h-48 w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized  // ← Magic line — no domain block!
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Rest stays exactly the same */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="text-xs px-2 py-1 bg-gray-800 rounded-full uppercase"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="font-bold uppercase text-lg mb-2">{workout.name}</h3>
          <p className="text-gray-400 text-sm mb-3">{workout.equipment}</p>

          <div className="flex gap-4 text-sm text-gray-300">
            <span>⏱️ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}