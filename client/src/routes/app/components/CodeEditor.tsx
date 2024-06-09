import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint.css";

import { SetStateAction, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFile,
  setCurrentProjectOpenFiles,
  updateProjectCode,
} from "../reducer/appReducer";
import { useAppRouter } from "../hooks/useAppRouter";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { itemApi } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

const CodeEditor = () => {
  const editor = useRef<any>();
  const wrapper = useRef<any>();
  const dispatch = useDispatch();
  const { currentProjectOpenFiles, projectCode } = useAppRouter();

  const navigate = useNavigate();
  const editorWillUnmount = () => {
    if (editor.current && wrapper.current) {
      editor.current.display.wrapper.remove();
      wrapper.current.hydrated = false;
    }
  };
  const { filename, fileId, id } = useParams();
  const FileCode = projectCode?.filesCode.find(
    (fileCode) => fileCode.fileId === fileId
  );

  useEffect(() => {
    if (filename && fileId) {
      dispatch(setCurrentProjectOpenFiles({ _id: fileId, name: filename }));
    }
  }, [filename, fileId]);
  const handleEditorChange = (
    _: any,
    __: any,
    value: SetStateAction<string>
  ) => {
    dispatch(
      updateProjectCode({
        code: value as string,
        fileId: fileId || "",
      })
    );
  };

  // ! Save file code
  const { mutate: saveCode, isPending } = useMutation({
    mutationKey: [`saveFileCode${fileId}`],
    mutationFn: async () => {
      const { data } = await itemApi.post("saveCode", {
        code: FileCode?.code,
        fileId,
      });
      return data;
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message || "Code saved successfully",
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
                  navigate(`/project/${id}/html/${file.name}/${file._id}`)
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
          onClick={() => saveCode()}
          disabled={isPending}>
          <Save />
        </Button>
      </div>

      <CodeMirror
        ref={wrapper}
        value={FileCode?.code}
        onChange={handleEditorChange}
        options={{
          lineNumbers: true,
          mode: "javascript",
          theme: "gruvbox-dark",
          extraKeys: { "Ctrl-Space": "autocomplete" },
          linerWrapping: true,
          lint: true,
          autoCloseBrackets: true,
          lineHighlight: {
            from: 1,
            to: 10,
          },
        }}
        editorDidMount={(e) => (editor.current = e)}
        editorWillUnmount={editorWillUnmount}
        className="text-start h-full text-[18px]"
      />
    </div>
  );
};

export default CodeEditor;
