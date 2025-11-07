import { ChallengeContent, DIFFICULTY_TOKEN } from "@/lib/challenges";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useScoreStore } from "@/lib/useScoreStore";

export function ChallengeCard({ challenge }: { challenge: ChallengeContent }) {
    const DifficultyIcon = DIFFICULTY_TOKEN[challenge.difficulty].Icon;
    const { solved } = useScoreStore()
    return (
        <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
            <CardHeader className="">
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <CardDescription className="line-clamp-4">
                    {challenge.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="sm:justify-between flex-col gap-1 w-full sm:flex-row ">
                <div className="flex items-start self-start sm:self-center gap-2">
                    <Badge variant={DIFFICULTY_TOKEN[challenge.difficulty].badge}>
                        {DIFFICULTY_TOKEN[challenge.difficulty].label}
                        <DifficultyIcon className="ml-1 h-4 w-4" />
                    </Badge>
                    {solved[challenge.slug] && <Badge variant="success">
                        SOLVED <Check />
                    </Badge>}
                </div>
                <Button asChild size="sm" className="self-end sm:self-center">
                    <Link href={`/challenges/${challenge.slug}`}>
                        Start Challenge
                        <ArrowRight />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}