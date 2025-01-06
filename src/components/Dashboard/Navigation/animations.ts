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
    width: "72px",
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