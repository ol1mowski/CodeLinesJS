export const navVariants = {
    expanded: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    collapsed: {
      width: "100px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };
  
  export const itemVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    collapsed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  export const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }; 