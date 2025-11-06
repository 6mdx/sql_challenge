import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ScoreStore = {
    solved: Record<string, "Easy" | "Medium" | "Hard">
    setSolved: (challengeSlug: string, difficulty: "Easy" | "Medium" | "Hard") => void
}

export const useScoreStore = create<ScoreStore>()(
    persist(
        (set, get) => ({
            solved: {},
            setSolved: (challengeSlug, difficulty) => set({ solved: { ...get().solved, [challengeSlug]: difficulty } }),
        }),
        {
            name: 'score-store', // name of the item in the storage (must be unique)
        },
    ),
)
