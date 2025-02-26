import { useCallback } from 'react';

export const useFileOperations = () => {
  const saveToFile = useCallback((code: string) => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code_${new Date().toISOString().slice(0,10)}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return { saveToFile };
}; 