import initSqlJs from "sql.js";

export const runCodeSql = async (sqlTemplate: string, code: string) => {
    const SQL = await initSqlJs({
        // Fetch sql.js wasm file from CDN
        // This way, we don't need to deal with webpack
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      })
      const db = new SQL.Database()
    const res = db.exec(sqlTemplate.replace("{SQL_QUERY_PLACEHOLDER}", code));
    return {
        data: res
    }
}



// DEPRECATED
const executionUrl = "https://emkc.org/api/v2/piston/execute"
export const runCode = async (code: string) => {
    const body = {
        "language": "sql",
        "version": "3.36.0",
        "files": [
            {
                "name": "sql.db",
                "content": code
            }
        ],
        "stdin": "",
        "args": ["1", "2", "3"],
        "compile_timeout": 10000,
        "run_timeout": 3000,
        "compile_cpu_time": 10000,
        "run_cpu_time": 3000,
        "compile_memory_limit": -1,
        "run_memory_limit": -1
    }

    const response = await fetch(executionUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json();
    const isError = data.run.code !== 0
    return {
        isError,
        data: isError ? data.run.stderr : data.run.output

    };
}