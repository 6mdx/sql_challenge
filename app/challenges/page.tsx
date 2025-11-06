"use client";

import { useState } from "react";
import Link from "next/link";
import { CHALLENGE_CATALOG, DIFFICULTY_TOKEN } from "@/lib/challenges";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

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
                    <ChallengeCard key={challenge.slug} challenge={{sloved:true, ...challenge}} />
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


type Challenge = typeof CHALLENGE_CATALOG[number] & { sloved?: boolean };

function ChallengeCard({ challenge }: { challenge: Challenge}) {
    const DifficultyIcon = DIFFICULTY_TOKEN[challenge.difficulty].Icon;
    
    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="">
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <CardDescription className="line-clamp-4">
                    {challenge.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="justify-between">
                <div className="flex items-start gap-2">
                    <Badge variant={DIFFICULTY_TOKEN[challenge.difficulty].badge}>
                        {DIFFICULTY_TOKEN[challenge.difficulty].label}
                        <DifficultyIcon className="ml-1 h-4 w-4" />
                    </Badge>
                    {challenge.sloved && <Badge variant="success">
                        SOLVED <Check />
                    </Badge>}
                </div>
                <Button asChild size="sm">
                    <Link href={`/challenges/${challenge.slug}`}>
                        Start Challenge 
                        <ArrowRight/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}