import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint.css";

import { useRef } from "react";

const CodeEditor = () => {
  const editor = useRef<any>();
  const wrapper = useRef<any>();
  const editorWillUnmount = () => {
    if (editor.current && wrapper.current) {
      editor.current.display.wrapper.remove();
      wrapper.current.hydrated = false;
    }
  };
  return (
    <div className="h-[91vh]">
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
