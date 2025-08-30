import { Editor } from "@monaco-editor/react";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFile, updateProjectCode } from "../reducer/appReducer";
import { useAppRouter } from "../hooks/useAppRouter";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { projectItemApi } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import CodeOutput from "./CodeOutput";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const { currentProjectOpenFile, currentProjectOpenFileCode } = useAppRouter();

  const navigate = useNavigate();
  const { filename, id } = useParams();
  const [searchParams] = useSearchParams();
  const fileId = searchParams.get("fileId");

  const handleEditorChange = (value: string) => {
    dispatch(
      updateProjectCode({
        code: value as string,
        fileId: currentProjectOpenFileCode?.fileId as string,
        fileName: currentProjectOpenFileCode?.fileName as string,
        projectId: currentProjectOpenFileCode?.projectId as string,
        parentId: currentProjectOpenFileCode?.parentId || undefined,
      })
    );
  };

  // ! Save file code
  const { mutate: saveCode, isPending } = useMutation({
    mutationKey: [`savecurrentProjectOpenFileCode${fileId}`],
    mutationFn: async () => {
      const { data } = await projectItemApi.post("saveCode", {
        code: currentProjectOpenFileCode?.code,
        fileId,
      });
      return data;
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message || "Code saved successfully",
      });
    },
    onError: () => {
      toast({
        title: "Something wrong happen on the server side",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-[91vh] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="h-[50px] w-full flex justify-start">
          {currentProjectOpenFile && (
            <Button
              key={currentProjectOpenFile.name}
              variant={"link"}
              className={`
          ${
            filename === currentProjectOpenFile.name &&
            "bg-gray-200 dark:bg-gray-700"
          } gap-6 my-1`}
            >
              <p>{currentProjectOpenFile.name}</p>
              <X
                className="hover:text-green-400 text-green-500"
                size={18}
                onClick={() => {
                  dispatch(removeFile());
                  navigate(`/projects/${id}`);
                }}
              />
            </Button>
          )}
        </div>
        <Button
          variant={"edit"}
          onClick={() => saveCode()}
          className="mx-2"
          title="Save"
          disabled={isPending}
        >
          <Save />
        </Button>
      </div>
      <div className="flex max-[700px]:flex-col">
        <div className="w-[60%] max-[700px]:w-[100%] h-[90vh] max-[700px]:h-[60vh]">
          <Editor
            defaultLanguage="javascript"
            value={currentProjectOpenFileCode?.code}
            onChange={(val) => handleEditorChange(val as string)}
            theme="vs-dark"
            options={{
              fontSize: 18,
              minimap: {
                enabled: false,
              },
              contextmenu: false,
              lineHeight: 26,
            }}
          />
        </div>
        <CodeOutput sourceCode={currentProjectOpenFileCode?.code as string} />
      </div>
    </div>
  );
};

export default CodeEditor;
