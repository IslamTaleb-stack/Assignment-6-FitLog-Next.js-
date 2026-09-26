"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Workout } from "./types";

interface PlanContextType {
    plan: Workout[];
    saved: Workout[];
    addToPlan: (workout: Workout) => void;
    addToSaved: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
    clearPlan: () => void;
    planTotal: {
        count: number;
        duration: number;
        calories: number;
        avgRating: string;
    };
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);

    function addToPlan(workout: Workout) {
        if (plan.length >= 5) return; // max 5 workouts
        const exists = plan.find(w => w.id === workout.id);
        if (!exists) {
            setPlan([...plan, workout]);
        }
    }

    function addToSaved(workout: Workout) {
        const exists = saved.find(w => w.id === workout.id);
        if (!exists) {
            setSaved([...saved, workout]);
        }
    }

    function removeFromPlan(id: number) {
        setPlan(plan.filter(w => w.id !== id));
    }

    function removeFromSaved(id: number) {
        setSaved(saved.filter(w => w.id !== id));
    }

    function clearPlan() {
        setPlan([]);
    }

    const planTotal = {
        count: plan.length,
        duration: plan.reduce((sum, w) => sum + w.duration, 0),
        calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
        avgRating: plan.length
            ? (plan.reduce((sum, w) => sum + w.rating, 0) / plan.length).toFixed(1)
            : "0.0"
    };

    return (
        <PlanContext.Provider value={{
            plan,
            saved,
            addToPlan,
            addToSaved,
            removeFromPlan,
            removeFromSaved,
            clearPlan,
            planTotal
        }}>
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used inside PlanProvider");
    }
    return context;
}