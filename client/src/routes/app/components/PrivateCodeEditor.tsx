import { Editor } from "@monaco-editor/react";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFile,
  setCurrentProjectOpenFiles,
  updateProjectCode,
} from "../reducer/appReducer";
import { useAppRouter } from "../hooks/useAppRouter";
import { Button } from "@/components/ui/button";
import { GitMerge, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { projectApi } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import PrivateCodeOutput from "./PrivateCodeOutput";

const PrivateCodeEditor = () => {
  const dispatch = useDispatch();
  const { currentProjectOpenFiles, projectCode } = useAppRouter();

  const navigate = useNavigate();
  const { filename, fileId, id } = useParams();
  const FileCode = projectCode?.filesCode.find(
    (fileCode) => fileCode.fileId === fileId
  );

  useEffect(() => {
    if (filename && fileId) {
      dispatch(setCurrentProjectOpenFiles({ _id: fileId, name: filename }));
    }
  }, [filename, fileId]);
  const handleEditorChange = (value: string) => {
    dispatch(
      updateProjectCode({
        code: value as string,
        fileId: fileId || "",
      })
    );
  };

  // ! Merging request
  const { mutate: mergeRequest, isPending } = useMutation({
    mutationKey: [`mergeRequest`],
    mutationFn: async () => {
      const { data } = await projectApi.post("mergeRequest", {
        code: FileCode?.code,
        fileId,
        projectId: id,
      });
      return data;
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message || "Merge Request Send",
      });
    },
  });

  return (
    <div className="h-[91vh] flex flex-col">
      <div className="flex justify-between items-center">
        <div className="h-[50px] w-full flex justify-start">
          {currentProjectOpenFiles?.map((file) => (
            <Button
              key={file.name}
              variant={"link"}
              className={`
          ${filename === file.name && "bg-gray-200 dark:bg-gray-700"} gap-6`}>
              <p
                onClick={() =>
                  navigate(`/privateProject/${id}/js/${file.name}/${file._id}`)
                }>
                {file.name}
              </p>
              <X
                className="hover:text-green-400 text-green-500 "
                size={18}
                onClick={() => {
                  dispatch(removeFile(file));
                  navigate(-1);
                }}
              />
            </Button>
          ))}
        </div>
        <Button
          variant={"edit"}
          onClick={() => mergeRequest()}
          className="mx-2"
          title="Merge-Request"
          disabled={isPending}>
          <GitMerge />
        </Button>
      </div>
      <div className="flex max-[700px]:flex-col">
        <div className="w-[60%] max-[700px]:w-[100%] h-[90vh] max-[700px]:h-[50vh]">
          <Editor
            defaultLanguage="javascript"
            value={FileCode?.code}
            onChange={(val) => handleEditorChange(val as string)}
            theme="vs-dark"
            options={{
              fontSize: 18,
              minimap: {
                enabled: false,
              },
              contextmenu: false,
            }}
          />
        </div>
        <PrivateCodeOutput sourceCode={FileCode?.code as string} />
      </div>
    </div>
  );
};

export default PrivateCodeEditor;