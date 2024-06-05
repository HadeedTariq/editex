import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint.css";

import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFile, setCurrentProjectOpenFiles } from "../reducer/appReducer";
import { useAppRouter } from "../hooks/useAppRouter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CodeEditor = () => {
  const editor = useRef<any>();
  const wrapper = useRef<any>();
  const dispatch = useDispatch();
  const { currentProjectOpenFiles } = useAppRouter();
  const navigate = useNavigate();
  const editorWillUnmount = () => {
    if (editor.current && wrapper.current) {
      editor.current.display.wrapper.remove();
      wrapper.current.hydrated = false;
    }
  };
  const { filename, id } = useParams();

  useEffect(() => {
    if (filename) {
      dispatch(setCurrentProjectOpenFiles(filename));
    }
  }, [filename]);

  return (
    <div className="h-[91vh] flex flex-col">
      <div className="h-[50px] w-full flex justify-start">
        {currentProjectOpenFiles?.map((file) => (
          <Button
            key={file}
            variant={"link"}
            className={`
          ${filename === file && "bg-gray-200 dark:bg-gray-700"} gap-6`}>
            <p onClick={() => navigate(`/project/${id}/js/${file}`)}>{file}</p>
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

      <CodeMirror
        ref={wrapper}
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
