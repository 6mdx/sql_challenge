import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ChallengeWorkspace from "./_components/workspace";

type ChallengeDifficulty = "Easy" | "Medium" | "Hard";

type ChallengeTable = {
    name: string;
    description: string;
    columns: Array<{ name: string; type: string; note?: string }>;
    rows: Array<Record<string, string | number>>;
};

type ResultSet = {
    columns: string[];
    rows: Array<Record<string, string | number>>;
};

type ChallengeContent = {
    slug: string;
    title: string;
    difficulty: ChallengeDifficulty;
    description: string;
    requirements: string[];
    tables: ChallengeTable[];
    defaultQuery: string;
    expectedQuery: string;
    expectedResult: ResultSet;
    incorrectResult: ResultSet;
};

const DIFFICULTY_TOKEN: Record<ChallengeDifficulty, { label: string; badge: "success" | "warning" | "destructive" }> = {
    Easy: { label: "Easy 🟢", badge: "success" },
    Medium: { label: "Medium 🟡", badge: "warning" },
    Hard: { label: "Hard 🔴", badge: "destructive" },
};

const CHALLENGE_CATALOG: Record<string, ChallengeContent> = {
    "challenge-3": {
        slug: "challenge-3",
        title: "Challenge #3 – Top Scoring Students",
        difficulty: "Medium",
        description:
            "Report the students who scored 90 or above in the most recent algorithm exam. Provide their identifiers, names, and scores ranked from highest to lowest.",
        requirements: [
            "Return columns: student_id, student_name, score.",
            "Filter for scores greater than or equal to 90.",
            "Order results by score in descending order, breaking ties alphabetically by student_name.",
            "Assume exam_date represents the exam these scores belong to.",
        ],
        tables: [
            {
                name: "students",
                description: "Holds the latest exam submission per student.",
                columns: [
                    { name: "student_id", type: "INT", note: "Primary key" },
                    { name: "student_name", type: "VARCHAR", note: "Full name" },
                    { name: "score", type: "INT", note: "Exam score (0-100)" },
                    { name: "exam_date", type: "DATE", note: "Submission date" },
                ],
                rows: [
                    { student_id: 101, student_name: "Amina Chen", score: 98, exam_date: "2024-09-14" },
                    { student_id: 102, student_name: "Leo Nunez", score: 87, exam_date: "2024-09-14" },
                    { student_id: 103, student_name: "Priya Patel", score: 95, exam_date: "2024-09-15" },
                    { student_id: 104, student_name: "Noah Smith", score: 91, exam_date: "2024-09-15" },
                    { student_id: 105, student_name: "Sara Lopez", score: 88, exam_date: "2024-09-16" },
                ],
            },
        ],
        defaultQuery: `-- Write your SQL solution below\nSELECT student_id, student_name, score\nFROM students\nWHERE score >= 90\nORDER BY score DESC, student_name ASC;\n`,
        expectedQuery: `SELECT student_id, student_name, score FROM students WHERE score >= 90 ORDER BY score DESC, student_name ASC`,
        expectedResult: {
            columns: ["student_id", "student_name", "score"],
            rows: [
                { student_id: 101, student_name: "Amina Chen", score: 98 },
                { student_id: 103, student_name: "Priya Patel", score: 95 },
                { student_id: 104, student_name: "Noah Smith", score: 91 },
            ],
        },
        incorrectResult: {
            columns: ["student_id", "student_name", "score"],
            rows: [
                { student_id: 101, student_name: "Amina Chen", score: 98 },
                { student_id: 102, student_name: "Leo Nunez", score: 87 },
                { student_id: 103, student_name: "Priya Patel", score: 95 },
                { student_id: 104, student_name: "Noah Smith", score: 91 },
            ],
        },
    },
    "top-scoring-students": {
        slug: "top-scoring-students",
        title: "Challenge #3 – Top Scoring Students",
        difficulty: "Medium",
        description:
            "Report the students who scored 90 or above in the most recent algorithm exam. Provide their identifiers, names, and scores ranked from highest to lowest.",
        requirements: [
            "Return columns: student_id, student_name, score.",
            "Filter for scores greater than or equal to 90.",
            "Order results by score in descending order, breaking ties alphabetically by student_name.",
            "Assume exam_date represents the exam these scores belong to.",
        ],
        tables: [
            {
                name: "students",
                description: "Holds the latest exam submission per student.",
                columns: [
                    { name: "student_id", type: "INT", note: "Primary key" },
                    { name: "student_name", type: "VARCHAR", note: "Full name" },
                    { name: "score", type: "INT", note: "Exam score (0-100)" },
                    { name: "exam_date", type: "DATE", note: "Submission date" },
                ],
                rows: [
                    { student_id: 101, student_name: "Amina Chen", score: 98, exam_date: "2024-09-14" },
                    { student_id: 102, student_name: "Leo Nunez", score: 87, exam_date: "2024-09-14" },
                    { student_id: 103, student_name: "Priya Patel", score: 95, exam_date: "2024-09-15" },
                    { student_id: 104, student_name: "Noah Smith", score: 91, exam_date: "2024-09-15" },
                    { student_id: 105, student_name: "Sara Lopez", score: 88, exam_date: "2024-09-16" },
                ],
            },
        ],
        defaultQuery: `-- Write your SQL solution below\nSELECT student_id, student_name, score\nFROM students\nWHERE score >= 90\nORDER BY score DESC, student_name ASC;\n`,
        expectedQuery: `SELECT student_id, student_name, score FROM students WHERE score >= 90 ORDER BY score DESC, student_name ASC`,
        expectedResult: {
            columns: ["student_id", "student_name", "score"],
            rows: [
                { student_id: 101, student_name: "Amina Chen", score: 98 },
                { student_id: 103, student_name: "Priya Patel", score: 95 },
                { student_id: 104, student_name: "Noah Smith", score: 91 },
            ],
        },
        incorrectResult: {
            columns: ["student_id", "student_name", "score"],
            rows: [
                { student_id: 101, student_name: "Amina Chen", score: 98 },
                { student_id: 102, student_name: "Leo Nunez", score: 87 },
                { student_id: 103, student_name: "Priya Patel", score: 95 },
                { student_id: 104, student_name: "Noah Smith", score: 91 },
            ],
        },
    },
};

const FALLBACK_CHALLENGE = CHALLENGE_CATALOG["challenge-3"];

export default async function ChallengePage({
    params,
}: {
    params: Promise<{ challenge: string }>;
}) {
    const { challenge: challengeSlug } = await params
    const slug = challengeSlug.toLowerCase() ?? "";
    const challenge =
        CHALLENGE_CATALOG[slug] ?? CHALLENGE_CATALOG[`challenge-${slug}`] ?? FALLBACK_CHALLENGE;
    const difficultyToken = DIFFICULTY_TOKEN[challenge.difficulty];

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
            <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-8">
                    <div className="space-y-2">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                            SQL Challenge
                        </p>
                        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
                            {challenge.title}
                        </h1>
                    </div>
                    <Badge variant="outline">{difficultyToken.label}</Badge>
                </header>

                <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Challenge Overview</CardTitle>
                                <CardDescription>{challenge.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                        Requirements
                                    </h3>
                                    <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                                        {challenge.requirements.map((requirement) => (
                                            <li key={requirement} className="flex gap-2">
                                                <span className="text-neutral-400">•</span>
                                                <span>{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sample Dataset</CardTitle>
                                <CardDescription>
                                    Preview the schema and seeded rows you can query against.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                {challenge.tables.map((table) => (
                                    <div key={table.name} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-base font-semibold text-neutral-900">
                                                    {table.name}
                                                </h3>
                                                <p className="text-sm text-neutral-600">{table.description}</p>
                                            </div>
                                        </div>

                                        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Columns
                                            </div>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-1/3">Name</TableHead>
                                                        <TableHead className="w-1/3">Type</TableHead>
                                                        <TableHead>Notes</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {table.columns.map((column) => (
                                                        <TableRow key={column.name}>
                                                            <TableCell className="font-medium text-neutral-900">
                                                                {column.name}
                                                            </TableCell>
                                                            <TableCell>{column.type}</TableCell>
                                                            <TableCell className="text-neutral-600">
                                                                {column.note ?? "—"}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                                                Sample Rows
                                            </div>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        {table.columns.map((column) => (
                                                            <TableHead key={column.name}>{column.name}</TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {table.rows.map((row, index) => (
                                                        <TableRow key={`${table.name}-${index}`}>
                                                            {table.columns.map((column) => (
                                                                <TableCell key={column.name}>
                                                                    {row[column.name]}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    <ChallengeWorkspace challenge={challenge} />
                </div>
            </div>
        </div>
    );
}