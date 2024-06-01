import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/cobalt.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import { useRef } from "react";

const CodeEditor = () => {
  const editor = useRef();
  const wrapper = useRef();
  const editorWillUnmount = () => {
    editor.current.display.wrapper.remove();
    wrapper.current.hydrated = false;
  };
  return (
    <div className="h-[91vh]">
      <CodeMirror
        ref={wrapper}
        options={{
          lineNumbers: true,
          mode: "javascript",
          theme: "cobalt",
          extraKeys: { "Ctrl-Space": "autocomplete" },
        }}
        editorDidMount={(e) => (editor.current = e)}
        editorWillUnmount={editorWillUnmount}
        className="text-start h-full text-[18px]"
      />
    </div>
  );
};

export default CodeEditor;
