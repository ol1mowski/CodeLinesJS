import { motion } from "framer-motion";
import { NavigationButton } from "./NavigationButton.component";
import { NavigationItem } from "./Navigation.types";
import { itemVariants } from "./animations";
import { memo } from "react";

type NavigationSectionProps = {
  title: string;
  items: NavigationItem[];
  isExpanded: boolean;
  activeItem: string;
  onItemClick: (item: NavigationItem) => void;
  index: number;
  isLastSection: boolean;
};

export const NavigationSection = memo(({
  title,
  items,
  isExpanded,
  activeItem,
  onItemClick,
  index,
  isLastSection,
}: NavigationSectionProps) => (
  <motion.div
    key={title}
    className="space-y-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {isExpanded && (
      <motion.h2
        variants={itemVariants}
        initial="collapsed"
        animate="expanded"
        exit="collapsed"
        className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2"
      >
        {title}
      </motion.h2>
    )}
    {items.map((item) => (
      <NavigationButton
        key={item.id}
        icon={item.icon}
        label={item.label}
        isActive={activeItem === item.id}
        isExpanded={isExpanded}
        onClick={() => onItemClick(item)}
      />
    ))}
    {!isLastSection && (
      <div className="mx-3 my-4">
        <div className="border-t border-white/5" />
      </div>
    )}
  </motion.div>
));

NavigationSection.displayName = "NavigationSection"; 