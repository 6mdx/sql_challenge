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
import { CHALLENGE_CATALOG, DIFFICULTY_TOKEN } from "@/lib/challenges";
import { notFound } from "next/navigation";

export default async function ChallengePage({
    params,
}: {
    params: Promise<{ challenge: string }>;
}) {
    const { challenge: challengeSlug } = await params
    const slug = challengeSlug.toLowerCase() ?? "";
    const challenge = CHALLENGE_CATALOG.find((c) => c.slug === slug);
    if(!challenge) {
        notFound()
    };
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
                                                    {table.values.map((row, index) => (
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