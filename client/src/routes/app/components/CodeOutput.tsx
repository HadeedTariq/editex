import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { executeCode } from "@/lib/api";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

interface CodeOutputType {
  sourceCode: string;
}

const CodeOutput = ({ sourceCode }: CodeOutputType) => {
  const [output, setOutput] = useState<[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOutput(null);
  }, [sourceCode]);

  return (
    <div className="flex w-[40%]  flex-col h-[100%]  max-[700px]:w-[100%]  overflow-y-scroll">
      <div className="flex items-center justify-between">
        <Badge variant="outline">Output</Badge>
        <Button
          title="Run"
          variant={"project"}
          onClick={runCode}
          size={"sm"}
          disabled={isLoading}>
          <Play />
        </Button>
      </div>
      <div>
        {output
          ? output.map((line, i) => (
              <p
                key={i}
                className={`text-start ${isError ? "text-red-400" : ""}`}>
                {line}
              </p>
            ))
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default CodeOutput;
