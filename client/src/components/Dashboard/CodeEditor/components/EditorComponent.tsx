import { Editor } from "@monaco-editor/react";
import { FaSpinner } from "react-icons/fa";

const EditorComponent = ({ code, onChange, onMount, isEditorReady }) => (
  <div className="h-[calc(100%-4rem)] rounded overflow-hidden relative">
    {!isEditorReady && (
      <div className="absolute inset-0 flex items-center justify-center bg-dark/50">
        <FaSpinner className="w-8 h-8 text-js animate-spin" />
      </div>
    )}
    <Editor
      theme="vs-dark"
      language="javascript"
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={onChange}
      onMount={onMount}
    />
  </div>
);

export default EditorComponent; 