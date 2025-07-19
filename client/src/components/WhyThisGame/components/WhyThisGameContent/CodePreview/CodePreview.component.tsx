import { motion } from 'framer-motion';
import { useMobileDetect } from '../../../../hooks/useMobileDetect.hook';
import { CodeEditor } from './CodeEditor/CodeEditor.component';
import { PhonePreview } from './PhonePreview/PhonePreview.component';

export const CodePreview = () => {
  const isMobile = useMobileDetect();

  const content = (
    <div className="relative">
      <div className="relative z-10">
        <CodeEditor />
      </div>

      <div className="absolute -bottom-8 -right-8 z-20 hidden lg:block">
        <PhonePreview />
      </div>

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