import { useEffect, useRef, useState, useCallback } from 'react';
import { loader } from '@monaco-editor/react';

export const useEditor = (defaultCode: string) => {
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState(defaultCode);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value) setCode(value);
  }, []);

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    });
  }, []);

  return { code, isEditorReady, handleEditorDidMount, handleEditorChange };
};
