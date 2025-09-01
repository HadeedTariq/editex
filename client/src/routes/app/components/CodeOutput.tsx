import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { projectItemApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";

interface CodeOutputType {
  sourceCode: string;
  fileId: string | undefined;
}

const CodeOutput = ({ sourceCode, fileId }: CodeOutputType) => {
  const [output, setOutput] = useState<[] | null>(null);
  const [isError, setIsError] = useState(false);
  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: [`executecurrentProjectOpenFileCode${fileId}`],
    mutationFn: async () => {
      const { data } = await projectItemApi.post("executeCode", {
        code: sourceCode,
      });
      return data;
    },
    onSuccess: (data: any) => {
      setOutput(data.run.output.split("\n"));
      setIsError(!!data.run.stderr);
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
          disabled={isLoading}
        >
          <Play />
        </Button>
      </div>
      <div>
        {output
          ? output.map((line, i) => (
              <p
                key={i}
                className={`text-start ${isError ? "text-red-400" : ""}`}
              >
                {line}
              </p>
            ))
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default CodeOutput;
