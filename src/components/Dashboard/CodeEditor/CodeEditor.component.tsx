import { memo } from "react";
import { motion } from "framer-motion";

export const CodeEditor = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-space text-js">
          Edytor Kodu JavaScript
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <div className="bg-dark/50 rounded-lg p-4 border border-js/10">
          <h2 className="text-xl font-bold text-js mb-4">Edytor</h2>

        </div>

        <div className="bg-dark/50 rounded-lg p-4 border border-js/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-js">Konsola</h2>
            <button className="px-4 py-2 bg-js text-dark font-medium rounded hover:bg-js/90 transition-colors">
              Uruchom
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

CodeEditor.displayName = "CodeEditor"; 