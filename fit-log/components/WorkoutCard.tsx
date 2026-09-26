import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/types";

interface Props {
    workout: Workout;
}

export default function WorkoutCard({ workout }: Props) {
    return (
        <Link href={`/workouts/${workout.id}`} className="block group">
            <div className="bg-[#121212] rounded-lg overflow-hidden border-none">
                {/* Image — fills full width, no rounding on top */}
                <div className="relative h-40 w-full">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Content — exact Figma spacing */}
                <div className="p-4">
                    {/* Tags — multiple side-by-side, lime bg black text */}
                    {/* Tags — shows 1, 2, or 3 exactly like Figma */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {workout.muscleGroups?.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-[#CCFF00] text-black text-xs font-bold rounded"
                            >
                                {tag.toUpperCase()}
                            </span>
                        ))}
                    </div>

                    {/* Workout Name */}
                    <h3 className="font-bold uppercase text-white text-sm mb-1">
                        {workout.name}
                    </h3>

                    {/* Equipment */}
                    <p className="text-gray-400 text-xs mb-3">
                        {workout.equipment}
                    </p>

                    {/* Stats — with icons exactly like Figma */}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>⏱ {workout.duration} min</span>
                        <span>🔥 {workout.caloriesBurned} kcal</span>
                        <span>⭐ {workout.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}