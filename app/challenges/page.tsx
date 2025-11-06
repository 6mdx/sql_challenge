"use client";

import { useState } from "react";
import { CHALLENGE_CATALOG } from "@/lib/challenges";
import { Button } from "@/components/ui/button";import { ChallengeCard } from "./_components/challenge-card";
;

type DifficultyFilter = "All" | "Easy" | "Medium" | "Hard";

export default function Challenges() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>("All");

    const filteredChallenges = CHALLENGE_CATALOG.filter((challenge) => {
        if (selectedDifficulty === "All") return true;
        return challenge.difficulty === selectedDifficulty;
    });

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">SQL Challenges</h1>
                <p className="text-muted-foreground">
                    Practice your SQL skills with our collection of challenges
                </p>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-8 flex flex-wrap gap-2">
                <span className="text-sm font-medium mr-2 flex items-center">Filter by difficulty:</span>
                {(["All", "Easy", "Medium", "Hard"] as DifficultyFilter[]).map((difficulty) => (
                    <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty)}
                    >
                        {difficulty}
                    </Button>
                ))}
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.slug} challenge={challenge} />
                ))}
            </div>

            {/* Empty State */}
            {filteredChallenges.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        No challenges found for this difficulty level.
                    </p>
                </div>
            )}
        </div>
    );
}
