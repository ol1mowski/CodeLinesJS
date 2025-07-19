import { motion } from 'framer-motion';
import { memo } from 'react';

export const LoadingScreen = memo(() => {
  const codeLines = [
    'const codelines = {',
    '  name: "CodeLinesJS",',
    '  language: "JavaScript",',
    '  status: "loading...",',
    '  features: [',
    '    "Interactive Learning",',
    '    "Code Challenges",',
    '    "Real-time Progress"',
    '  ]',
    '};',
    '',
    'await initializeApp();',
    'console.log("🚀 Ready to code!");'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-dark via-dark-medium to-dark relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-js/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-js/15 rounded-full blur-lg"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-js/20 rounded-full blur-md"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-dark-800/80 backdrop-blur-sm border border-js/20 rounded-2xl p-8 shadow-2xl shadow-js/10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              variants={pulseVariants}
              animate="animate"
              className="text-6xl mb-4"
            >
              ⚡
            </motion.div>
            <h1 className="text-3xl font-bold text-js mb-2 font-space">
              CodeLinesJS
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Inicjalizacja aplikacji...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark-900/50 border border-js/10 rounded-lg p-6 mb-6 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-500 text-xs">loading.js</span>
            </div>
            
            <div className="space-y-1">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  variants={lineVariants}
                  className="text-gray-300"
                >
                  <span className="text-gray-600 mr-2">{String(index + 1).padStart(2, ' ')}</span>
                  <span className={line.includes('const') || line.includes('await') ? 'text-blue-400' : 
                                 line.includes('"') ? 'text-green-400' : 
                                 line.includes('console') ? 'text-yellow-400' : 
                                 line.includes('🚀') ? 'text-js' : 'text-gray-300'}>
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div
              variants={spinnerVariants}
              animate="animate"
              className="relative mb-4"
            >
              <div className="w-12 h-12 border-4 border-js/20 border-t-js rounded-full"></div>
              <motion.div
                className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-js/60 rounded-full"
                animate={{
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1 }}
              className="w-full bg-dark-700 rounded-full h-2 mb-2"
            >
              <motion.div
                className="bg-gradient-to-r from-js to-js/60 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, delay: 1 }}
              />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="text-js/80 text-sm font-mono"
            >
              Ładowanie komponentów...
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute -top-4 -right-4 text-js/30 text-2xl"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {`{}`}
        </motion.div>
        
        <motion.div
          className="absolute -bottom-4 -left-4 text-js/30 text-2xl"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          {`[]`}
        </motion.div>
      </div>
    </div>
  );
});
