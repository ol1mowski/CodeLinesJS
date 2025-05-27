import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../../hooks/useMobileDetect';
import { CodeEditor } from './CodeEditor/CodeEditor.component';
import { PhonePreview } from './PhonePreview/PhonePreview.component';

export const CodePreview = () => {
  const isMobile = useMobileDetect();

  const content = (
    <div className="relative">
      {/* Editor kodu */}
      <div className="relative z-10">
        <CodeEditor />
      </div>

      {/* Podgląd telefonu - pozycjonowany absolutnie */}
      <div className="absolute -bottom-8 -right-8 z-20 hidden lg:block">
        <PhonePreview />
      </div>

      {/* Podgląd telefonu na mobile - pod editorem */}
      <div className="mt-8 lg:hidden">
        <PhonePreview />
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
}; 