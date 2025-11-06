import { Signal, SignalHigh, SignalMedium, LucideIcon } from "lucide-react";
import { QueryExecResult } from "sql.js";

type ChallengeDifficulty = "Easy" | "Medium" | "Hard";

type ChallengeTable = {
    name: string;
    description: string;
    columns: Array<{ name: string; type: string; note?: string }>;
    values: Array<Record<string, string | number>>;
};


type SqlJSResponse = QueryExecResult[];

export type ChallengeContent = {
    slug: string;
    title: string;
    difficulty: ChallengeDifficulty;
    description: string;
    requirements: string[];
    tables: ChallengeTable[];
    sqlTemplate: string;
    defaultQuery: string;
    expectedResult: SqlJSResponse;
};

export const DIFFICULTY_TOKEN: Record<ChallengeDifficulty, { label: string; badge: "success" | "warning" | "destructive", Icon: LucideIcon }> = {
    Easy: { label: "Easy", badge: "success" , Icon: SignalMedium },
    Medium: { label: "Medium", badge: "warning", Icon: SignalHigh },
    Hard: { label: "Hard", badge: "destructive", Icon: Signal },
};

export const CHALLENGE_CATALOG: Array<ChallengeContent> = [
    {
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
                values: [
                    { student_id: 101, student_name: "Amina Chen", score: 98, exam_date: "2024-09-14" },
                    { student_id: 102, student_name: "Leo Nunez", score: 87, exam_date: "2024-09-14" },
                    { student_id: 103, student_name: "Priya Patel", score: 95, exam_date: "2024-09-15" },
                    { student_id: 104, student_name: "Noah Smith", score: 91, exam_date: "2024-09-15" },
                    { student_id: 105, student_name: "Sara Lopez", score: 88, exam_date: "2024-09-16" },
                ],
            },
        ],
        sqlTemplate: `
                CREATE TABLE students (
                student_id INT PRIMARY KEY,
                student_name VARCHAR(100) NOT NULL,
                score INT NOT NULL,
                exam_date DATE NOT NULL
            );

            INSERT INTO students (student_id, student_name, score, exam_date) VALUES
            (101, 'Amina Chen', 98, '2024-09-14'),
            (102, 'Leo Nunez', 87, '2024-09-14'),
            (103, 'Priya Patel', 95, '2024-09-15'),
            (104, 'Noah Smith', 91, '2024-09-15'),
            (105, 'Sara Lopez', 88, '2024-09-16');

            {SQL_QUERY_PLACEHOLDER}
            `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["student_id", "student_name", "score"],
                values: [
                    [101, "Amina Chen", 98],
                    [103, "Priya Patel", 95],
                    [104, "Noah Smith", 91],
                ],
            },
        ]
    },
];