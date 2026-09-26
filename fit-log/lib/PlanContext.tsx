"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Workout } from "./types";

interface PlanContextType {
    plan: Workout[];
    saved: Workout[];
    isLoaded: boolean;
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
    // ✅ Initialize DIRECTLY from localStorage — no delay
    const [plan, setPlan] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const data = localStorage.getItem("fitlog-plan");
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    });

    const [saved, setSaved] = useState<Workout[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const data = localStorage.getItem("fitlog-saved");
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // ✅ Auto-save whenever data changes
    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }, [plan, isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }, [saved, isLoaded]);

    function addToPlan(workout: Workout) {
        setPlan((prev) => {
            if (prev.length >= 5) return prev;
            if (prev.find((w) => w.id === workout.id)) return prev;
            return [...prev, workout];
        });
    }

    function addToSaved(workout: Workout) {
        setSaved((prev) => {
            if (prev.find((w) => w.id === workout.id)) return prev;
            return [...prev, workout];
        });
    }

    function removeFromPlan(id: number) {
        setPlan((prev) => prev.filter((w) => w.id !== id));
    }

    function removeFromSaved(id: number) {
        setSaved((prev) => prev.filter((w) => w.id !== id));
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
            : "0.0",
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                isLoaded,
                addToPlan,
                addToSaved,
                removeFromPlan,
                removeFromSaved,
                clearPlan,
                planTotal,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) throw new Error("usePlan must be used inside PlanProvider");
    return context;
}