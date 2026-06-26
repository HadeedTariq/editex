import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { projectItemApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import {
  Play,
  Terminal,
  Timer,
  MemoryStick,
  CircleCheckBig,
  CircleX,
  Activity,
  Cpu,
} from "lucide-react";
import { useEffect, useState } from "react";

interface CodeOutputType {
  sourceCode: string;
  fileId: string | undefined;
}

interface CodeExecutionResult {
  output: string;
  error: string;
  status: "success" | "error";
  exit_code: number;
  signal: string | null;
  time: string;
  memory: string;
  total: string;
}

const CodeOutput = ({ sourceCode, fileId }: CodeOutputType) => {
  const [execution, setExecution] = useState<CodeExecutionResult | null>(null);
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: [`executecurrentProjectOpenFileCode${fileId}`],
    mutationFn: async () => {
      const { data } = await projectItemApi.post("executeCode", {
        code: sourceCode,
      });
      return data;
    },
    onSuccess: (data: CodeExecutionResult) => {
      setExecution(data);

      toast({
        title: "Code executed successfully",
      });
    },
    onError: (err: ServerError) => {
      toast({
        title:
          err.response.data.message ||
          "Something wrong happen on the server side",
        variant: "destructive",
      });
    },
  });

  const runCode = () => {
    mutate();
  };

  useEffect(() => {
    setExecution(null);
  }, [sourceCode]);

  return (
    <div className="flex h-full w-[40%] flex-col rounded-xl border bg-background shadow-sm max-[700px]:w-full">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <h2 className="text-sm font-semibold tracking-wide">
            Execution Output
          </h2>
        </div>

        <Button
          onClick={runCode}
          disabled={isLoading}
          variant="project"
          size="sm"
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {isLoading ? "Running..." : "Run Code"}
        </Button>
      </div>

      {execution && (
        <div className="grid grid-cols-2 gap-3 border-b p-5 xl:grid-cols-4">
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Activity className="h-4 w-4" />
              Status
            </div>

            <Badge
              variant={
                execution.status === "success" ? "default" : "destructive"
              }
            >
              {execution.status}
            </Badge>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Timer className="h-4 w-4" />
              Execution
            </div>

            <p className="font-semibold">{execution.time}s</p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <MemoryStick className="h-4 w-4" />
              Memory
            </div>

            <p className="font-semibold">
              {(Number(execution.memory) / 1024).toFixed(1)} KB
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Cpu className="h-4 w-4" />
              Exit Code
            </div>

            <p className="font-semibold">{execution.exit_code}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-muted/20 p-5">
        {!execution ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <Terminal className="h-10 w-10 text-muted-foreground" />

            <div>
              <h3 className="font-medium">Ready to Execute</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Click the <span className="font-medium">Run Code</span> button
                to compile and execute your program.
              </p>
            </div>
          </div>
        ) : (
          <>
            {execution.error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
                <CircleX className="h-5 w-5" />
                <span>{execution.error}</span>
              </div>
            )}

            {!execution.error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-500">
                <CircleCheckBig className="h-5 w-5" />
                <span>Execution completed successfully.</span>
              </div>
            )}

            <div className="overflow-auto rounded-lg border bg-black p-4 font-mono text-sm text-green-400">
              {execution.output.trim().length ? (
                execution.output
                  .trimEnd()
                  .split("\n")
                  .map((line, index) => <div key={index}>{line}</div>)
              ) : (
                <span className="text-gray-500">
                  Program completed without producing any output.
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CodeOutput;
