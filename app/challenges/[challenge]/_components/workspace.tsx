'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation } from "@tanstack/react-query";
import { runCodeSql } from "@/lib/runCode";
import { Loader } from "lucide-react";
import { QueryExecResult } from "sql.js";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-sm text-neutral-500">
      Loading editor…
    </div>
  ),
});

type SqlJSResponse = QueryExecResult[];

type ChallengeWorkspaceProps = {
  challenge: {
    title: string;
    sqlTemplate: string;
    defaultQuery: string;
    expectedResult: SqlJSResponse;
  };
};

type RunStatus = "idle" | "success" | "failure" | "error";

export default function ChallengeWorkspace({ challenge }: ChallengeWorkspaceProps) {
  const [query, setQuery] = useState(challenge.defaultQuery);
  const [status, setStatus] = useState<RunStatus>("idle");
  const [hasExecuted, setHasExecuted] = useState(false);
  const [result, setResult] = useState<SqlJSResponse | null>(null);

  // const [db, setDb] = useState<initSqlJs.Database | null>(null);

  useEffect(() => {

  }, []);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      setStatus("idle");
      setHasExecuted(false);
      setResult(null);
      const output = await runCodeSql(challenge.sqlTemplate, query);
      return output.data;
    },
    onSuccess: (data) => {
      console.log("Success executing", data);
      if (JSON.stringify(data) !== JSON.stringify(challenge.expectedResult)) {
        setStatus("failure");
        setResult(data);
        setHasExecuted(true);
        return
      }
      setStatus("success");
      setResult(data);
      setHasExecuted(true);
    },
  })

  // const activeColumns = result?.columns ?? challenge.expectedResult.columns;

  const handleReset = () => {
    setQuery(challenge.defaultQuery);
    setStatus("idle");
    setHasExecuted(false);
    setResult(null);
  };

  return (
    <Card className="h-full border-neutral-200 shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl">SQL Playground</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
          <MonacoEditor
            height={320}
            language="sql"
            theme="vs-dark"
            value={query}
            onChange={(value) => setQuery(value ?? "")}
            options={{
              fontSize: 14,
              fontFamily: 'var(--font-geist-mono)',
              minimap: { enabled: false },
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button disabled={isPending} variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button disabled={isPending} onClick={() => mutate()}>
            {isPending ?
              <>
                <Loader className="mr-2 animate-spin" />
                Running...
              </>
              :
              "Run Query"
            }
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">Result Preview</p>
            {hasExecuted ? (
              status === "success" ? (
                <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                  Matches Expected
                </span>
              ) : (
                <span className="text-xs font-medium uppercase tracking-wide text-rose-600">
                  Review Output
                </span>
              )
            ) : (
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                Awaiting Run
              </span>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
            {result ? (
              <>
                {result.map((table, i) => (
                  <Table key={`table-key-${i}`}>
                    <TableHeader>
                      <TableRow>
                        {table.columns.map((column) => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.values.map((row, j) => (
                        <TableRow key={j}>
                          {row.map((cell, k) => (
                            <TableCell key={k}>{formatCellValue(cell)}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ))}
              </>
            ) : (
              <div className="flex h-40 items-center justify-center text-sm text-neutral-500">
                {isError ?
                  <span className="text-xs font-medium uppercase tracking-wide text-rose-600">Error : {error?.message}</span>
                  :
                  <p>Run your query to see the dataset preview.</p>
                }
              </div>
            )}
          </div>

          {hasExecuted && (
            <div>
              {status === "success" ? (
                <p className="text-sm font-medium text-emerald-600">✅ Correct!</p>
              ) : (
                <p className="text-sm font-medium text-rose-600">❌ Try again!</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function normalizeQuery(input: string): string {
  // Basic normalization so students can focus on SQL logic, not casing or whitespace.
  return input.replace(/\s+/g, " ").replace(/;\s*$/, "").trim().toLowerCase();
}

function formatCellValue(value: number | string | Uint8Array | null | undefined) {
  if (value === undefined) {
    return "—";
  }

  if (typeof value === "number") {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }
  return value;
}
